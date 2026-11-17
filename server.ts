import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import type {
  ChatAttachment,
  ChatMessage,
  LLMProvider,
  MemoryTier,
  MnemosyneMemory,
  STTProvider,
  TTSProvider,
} from './src/types/index.js';
import {
  MODEL_CATALOG,
  consolidateMemoriesFromTurn,
  getProviderStatuses,
  streamChatCompletion,
  synthesizeSpeech,
  transcribeAudio,
} from './server/ai.js';
import { attachWebSocketServers } from './server/live.js';
import {
  addMemory,
  addVaultDocument,
  appendThreadMessage,
  createThread,
  deleteMemory,
  deleteThread,
  deleteVaultDocument,
  formatMnemosyneSystemBlock,
  getPublicAppState,
  getThread,
  loadState,
  recallMnemosyneContext,
  setProviderKey,
  updateMemory,
  updateSettings,
  updateThreadMeta,
  type VaultKeyProvider,
} from './server/store.js';

const PORT = 3000;

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  app.use(express.json({ limit: '25mb' }));

  // Health & Provider Status (read-only env/vault readiness; never returns secret values)
  app.get('/api/providers/status', (_req, res) => {
    res.json({
      providers: getProviderStatuses(),
      models: MODEL_CATALOG,
    });
  });

  // Save/Clear server-persisted 3rd-party API credentials (write-only; returns masked status)
  app.post('/api/providers/keys', (req, res) => {
    const { provider, apiKey } = req.body as {
      provider: VaultKeyProvider;
      apiKey: string;
    };
    const allowed: VaultKeyProvider[] = [
      'deepgram',
      'fishaudio',
      'nanogpt',
      'deepseek',
      'openai',
    ];
    if (!allowed.includes(provider)) {
      res.status(400).json({ error: 'Unsupported credential slot.' });
      return;
    }
    setProviderKey(provider, typeof apiKey === 'string' ? apiKey : '');
    res.json({
      providers: getProviderStatuses(),
      models: MODEL_CATALOG,
    });
  });

  // Full initial workspace state (never includes raw keys)
  app.get('/api/state', (_req, res) => {
    res.json(getPublicAppState());
  });

  // Settings
  app.patch('/api/settings', (req, res) => {
    const updated = updateSettings(req.body ?? {});
    res.json(updated);
  });

  // Threads CRUD
  app.post('/api/threads', (req, res) => {
    const state = loadState();
    const provider = (req.body?.provider as LLMProvider) || state.settings.activeProvider;
    const model = (req.body?.model as string) || state.settings.activeModel;
    const title = req.body?.title as string | undefined;
    const thread = createThread(provider, model, title);
    res.json(thread);
  });

  app.patch('/api/threads/:id', (req, res) => {
    const updated = updateThreadMeta(req.params.id, req.body ?? {});
    if (!updated) {
      res.status(404).json({ error: 'Thread not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/threads/:id', (req, res) => {
    const ok = deleteThread(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Thread not found' });
      return;
    }
    res.json({ deleted: true });
  });

  // Save a completed Live Call transcript as a thread + consolidate memories
  app.post('/api/live-call/save', async (req, res) => {
    try {
      const { transcript, memoriesCount } = req.body as {
        transcript: Array<{ role: 'user' | 'assistant'; text: string; createdAt?: string }>;
        memoriesCount?: number;
      };
      if (!Array.isArray(transcript) || transcript.length === 0) {
        res.status(400).json({ error: 'Transcript is empty.' });
        return;
      }

      const state = loadState();
      const thread = createThread(
        'gemini',
        'gemini-3.8-live',
        `Live Call · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      );

      for (const item of transcript) {
        appendThreadMessage(thread.id, {
          id: crypto.randomUUID(),
          role: item.role,
          content: item.text,
          model: 'gemini-3.8-live',
          provider: 'gemini',
          createdAt: item.createdAt || new Date().toISOString(),
        });
      }

      let consolidated: MnemosyneMemory[] = [];
      if (state.settings.autoConsolidateMemory) {
        const userCombined = transcript
          .filter((t) => t.role === 'user')
          .map((t) => t.text)
          .join(' ');
        const assistantCombined = transcript
          .filter((t) => t.role === 'assistant')
          .map((t) => t.text)
          .join(' ');
        consolidated = await consolidateMemoriesFromTurn(
          userCombined,
          assistantCombined,
          thread.id,
          'live_call'
        );
      }

      res.json({
        thread: getThread(thread.id),
        consolidated,
        inCallMemories: memoriesCount ?? 0,
      });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to save live call' });
    }
  });

  // Streaming Chat SSE Endpoint (Multi-Provider + Multimodal + Mnemosyne OS)
  app.post('/api/chat/stream', async (req, res) => {
    const {
      threadId,
      message,
      attachments = [],
      provider,
      model,
      useMnemosyne = true,
    } = req.body as {
      threadId: string;
      message: string;
      attachments?: ChatAttachment[];
      provider: LLMProvider;
      model: string;
      useMnemosyne?: boolean;
    };

    const thread = getThread(threadId);
    if (!thread) {
      res.status(404).json({ error: 'Thread not found' });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const writeSSE = (payload: Record<string, unknown>) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    try {
      const state = loadState();
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: message || '',
        attachments: attachments.map((a) => ({
          ...a,
          // Keep preview metadata, strip large binary from stored history if textContent exists
          dataBase64: a.mimeType.startsWith('image/') ? a.dataBase64 : '',
        })),
        createdAt: new Date().toISOString(),
      };

      const historyBefore = [...thread.messages];
      appendThreadMessage(threadId, userMessage);
      updateThreadMeta(threadId, { provider, model });

      // 1. Mnemosyne OS Recall
      const recalled = useMnemosyne
        ? recallMnemosyneContext(
            `${message} ${attachments.map((a) => a.name).join(' ')}`,
            6,
            4
          )
        : { memories: [], vaultChunks: [] };

      if (recalled.memories.length > 0 || recalled.vaultChunks.length > 0) {
        writeSSE({ type: 'mnemosyne_recall', recalled });
      }

      const mnemosyneBlock = formatMnemosyneSystemBlock(recalled);
      const systemInstruction = [state.settings.systemPrompt, mnemosyneBlock]
        .filter(Boolean)
        .join('\n\n');

      // 2. Stream LLM completion
      const { fullText, fullReasoning } = await streamChatCompletion({
        res,
        provider,
        model,
        systemInstruction,
        history: historyBefore,
        userText: message || '',
        attachments,
      });

      // 3. Mnemosyne Auto-Consolidation
      let consolidatedMemories: MnemosyneMemory[] = [];
      if (useMnemosyne && state.settings.autoConsolidateMemory && fullText.trim()) {
        consolidatedMemories = await consolidateMemoriesFromTurn(
          message || '',
          fullText,
          threadId,
          'chat'
        );
        if (consolidatedMemories.length > 0) {
          writeSSE({ type: 'mnemosyne_consolidated', memories: consolidatedMemories });
        }
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fullText,
        reasoning: fullReasoning || undefined,
        model,
        provider,
        recalled:
          recalled.memories.length > 0 || recalled.vaultChunks.length > 0
            ? recalled
            : undefined,
        consolidatedMemories:
          consolidatedMemories.length > 0 ? consolidatedMemories : undefined,
        createdAt: new Date().toISOString(),
      };

      appendThreadMessage(threadId, assistantMessage);

      writeSSE({
        type: 'done',
        message: assistantMessage,
        threadTitle: getThread(threadId)?.title,
      });
      res.end();
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : 'Streaming failed';
      writeSSE({ type: 'error', message: errMessage });
      res.end();
    }
  });

  // Speech-to-Text Endpoint (Deepgram or Gemini Transcribe)
  app.post('/api/stt', async (req, res) => {
    try {
      const state = loadState();
      const { audioBase64, mimeType, provider, deepgramModel } = req.body as {
        audioBase64: string;
        mimeType?: string;
        provider?: STTProvider;
        deepgramModel?: string;
      };
      if (!audioBase64) {
        res.status(400).json({ error: 'Missing audioBase64 payload.' });
        return;
      }
      const result = await transcribeAudio({
        audioBase64,
        mimeType: mimeType || 'audio/webm',
        provider: provider || state.settings.sttProvider,
        deepgramModel: deepgramModel || state.settings.deepgramSttModel,
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Transcription failed' });
    }
  });

  // Text-to-Speech Endpoint (Fish Audio, Deepgram Aura, or Gemini 3.8 TTS)
  app.post('/api/tts', async (req, res) => {
    try {
      const state = loadState();
      const { text, provider, fishVoiceId, deepgramVoice, geminiVoice } = req.body as {
        text: string;
        provider?: TTSProvider;
        fishVoiceId?: string;
        deepgramVoice?: string;
        geminiVoice?: string;
      };
      if (!text?.trim()) {
        res.status(400).json({ error: 'Missing text payload.' });
        return;
      }
      const result = await synthesizeSpeech({
        text,
        provider: provider || state.settings.ttsProvider,
        fishVoiceId: fishVoiceId ?? state.settings.fishVoiceId,
        deepgramVoice: deepgramVoice || state.settings.deepgramTtsVoice,
        geminiVoice: geminiVoice || state.settings.geminiVoice,
      });
      res.setHeader('Content-Type', result.mimeType);
      res.setHeader('X-TTS-Provider', result.providerUsed);
      res.send(result.audioBuffer);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'TTS failed' });
    }
  });

  // Mnemosyne OS Memory CRUD
  app.get('/api/memories', (_req, res) => {
    res.json(loadState().memories);
  });

  app.post('/api/memories', (req, res) => {
    const { tier, content, salience, pinned } = req.body as {
      tier: MemoryTier;
      content: string;
      salience?: number;
      pinned?: boolean;
    };
    if (!content?.trim()) {
      res.status(400).json({ error: 'Memory content is required.' });
      return;
    }
    const created = addMemory({
      tier: tier || 'episodic',
      content,
      salience: salience ?? 0.8,
      pinned: Boolean(pinned),
      sourceType: 'manual',
    });
    res.json(created);
  });

  app.patch('/api/memories/:id', (req, res) => {
    const updated = updateMemory(req.params.id, req.body ?? {});
    if (!updated) {
      res.status(404).json({ error: 'Memory not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/memories/:id', (req, res) => {
    const ok = deleteMemory(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Memory not found' });
      return;
    }
    res.json({ deleted: true });
  });

  // Mnemosyne Knowledge Vault
  app.post('/api/vault', (req, res) => {
    const { title, mimeType, content } = req.body as {
      title: string;
      mimeType?: string;
      content: string;
    };
    if (!title?.trim() || !content?.trim()) {
      res.status(400).json({ error: 'Document title and content are required.' });
      return;
    }
    const doc = addVaultDocument(title.trim(), mimeType || 'text/plain', content);
    res.json(doc);
  });

  app.delete('/api/vault/:id', (req, res) => {
    const ok = deleteVaultDocument(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Vault document not found' });
      return;
    }
    res.json({ deleted: true });
  });

  // Attach WebSockets for Live Call (/ws/live-call) & Deepgram Streaming STT (/ws/deepgram-stt)
  attachWebSocketServers(server);

  // Vite dev middleware vs static production build
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Aetheris WebUI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
