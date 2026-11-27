import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import crypto from 'crypto';
import type { ViteDevServer } from 'vite';
import fs from 'fs';
import type {
  ChatAttachment,
  ChatMessage,
  LLMProvider,
  MemoryTier,
  MnemosyneMemory,
  STTProvider,
  SearchProvider,
  StorageMode,
  TTSProvider,
  WebSearchSource,
} from './src/types/index.ts';
import {
  MODEL_CATALOG,
  consolidateMemoriesFromTurn,
  getProviderStatuses,
  streamChatCompletion,
  synthesizeSpeech,
  transcribeAudio,
} from './server/ai.ts';
import {
  executeWebReconSearch,
  formatWebSearchSystemBlock,
  parallelWebFetch,
  testSearchProviderConnection,
} from './server/search.ts';
import {
  getPublicStorageConfig,
  loadStorageConfig,
  persistStorageConfig,
  pullStoreFromRemote,
  pushStoreToRemote,
  testStorageConnection,
  validateMountedPath,
  validateRemoteStorageUrl,
  writeFileAtomic,
} from './server/storage.ts';
import { attachWebSocketServers } from './server/live.ts';
import {
  addMemory,
  addVaultDocument,
  appendThreadMessage,
  createThread,
  deleteMemory,
  deleteThread,
  deleteVaultDocument,
  exportSerializedState,
  formatMnemosyneSystemBlock,
  getPublicAppState,
  getThread,
  loadState,
  recallMnemosyneContext,
  reloadStateFromStorage,
  replaceStateFromRawJson,
  setProviderKey,
  updateMemory,
  updateSettings,
  updateThreadMeta,
  type VaultKeyProvider,
} from './server/store.ts';

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  app.use(express.json({ limit: '25mb' }));

  // Health & Provider Status (read-only env/vault readiness; never returns secret values)
  const distDir = path.resolve(process.cwd(), 'dist');
  const distIndex = path.join(distDir, 'index.html');
  const hasDistBuild = () => fs.existsSync(distIndex);
  const preferStaticDist =
    (process.env.NODE_ENV === 'production' || process.env.SERVE_STATIC === 'true') &&
    hasDistBuild();

  const viteState: { server: ViteDevServer | null; error: Error | null } = {
    server: null,
    error: null,
  };

  app.get('/api/health', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({
      ok: true,
      mode: preferStaticDist ? 'static' : 'dev',
      viteReady: preferStaticDist || Boolean(viteState.server),
      viteError: viteState.error ? viteState.error.message : null,
      distAvailable: hasDistBuild(),
      uptimeSec: Math.round(process.uptime()),
    });
  });

  app.get('/api/providers/status', (_req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      res.json({
        providers: getProviderStatuses(),
        models: MODEL_CATALOG,
      });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to load provider status',
      });
    }
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
      'parallel',
      'brave',
      'tavily',
      'custom_search',
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
    try {
      res.setHeader('Cache-Control', 'no-store');
      res.json(getPublicAppState());
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to load workspace state',
      });
    }
  });

  // Settings
  app.patch('/api/settings', (req, res) => {
    try {
      const updated = updateSettings(req.body ?? {});
      res.json(updated);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to update settings',
      });
    }
  });

  // Persistent Storage Backend (Local, Mounted Hetzner Storage Box, WebDAV, External HTTP)
  app.get('/api/storage/config', (_req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      res.json(getPublicStorageConfig());
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to load storage config',
      });
    }
  });

  app.post('/api/storage/test', async (req, res) => {
    try {
      const result = await testStorageConnection(req.body ?? {});
      res.status(result.ok ? 200 : 400).json(result);
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: err instanceof Error ? err.message : 'Storage test failed',
      });
    }
  });

  app.post('/api/storage/config', async (req, res) => {
    try {
      const body = (req.body ?? {}) as {
        mode?: StorageMode;
        mountedPath?: string;
        remoteUrl?: string;
        remoteUsername?: string;
        remotePassword?: string;
        clearRemotePassword?: boolean;
        remoteToken?: string;
        clearRemoteToken?: boolean;
        remoteMethod?: 'PUT' | 'POST';
        autoSyncRemote?: boolean;
        migrateData?: boolean;
        preferExistingOnTarget?: boolean;
      };

      const prev = loadStorageConfig();
      const nextMode: StorageMode =
        body.mode === 'mounted' ||
        body.mode === 'webdav' ||
        body.mode === 'remote-http' ||
        body.mode === 'local'
          ? body.mode
          : prev.mode;

      const nextMountedPath =
        body.mountedPath !== undefined ? body.mountedPath.trim() : prev.mountedPath;
      const nextRemoteUrl =
        body.remoteUrl !== undefined ? body.remoteUrl.trim() : prev.remoteUrl;

      if (nextMode === 'mounted') {
        const check = validateMountedPath(nextMountedPath);
        if (!check.ok) {
          res.status(400).json({ error: check.error });
          return;
        }
      } else if (nextMode === 'webdav' || nextMode === 'remote-http') {
        const check = validateRemoteStorageUrl(nextRemoteUrl);
        if (!check.ok) {
          res.status(400).json({ error: check.error });
          return;
        }
      }

      // Capture current in-memory state before switching targets
      const currentSnapshot = exportSerializedState();

      const nextConfig = {
        ...prev,
        mode: nextMode,
        mountedPath: nextMountedPath,
        remoteUrl: nextRemoteUrl,
        remoteUsername:
          body.remoteUsername !== undefined ? body.remoteUsername.trim() : prev.remoteUsername,
        remotePassword: body.clearRemotePassword
          ? ''
          : body.remotePassword && body.remotePassword.trim()
            ? body.remotePassword
            : prev.remotePassword,
        remoteToken: body.clearRemoteToken
          ? ''
          : body.remoteToken && body.remoteToken.trim()
            ? body.remoteToken.trim()
            : prev.remoteToken,
        remoteMethod:
          body.remoteMethod === 'POST' || body.remoteMethod === 'PUT'
            ? body.remoteMethod
            : prev.remoteMethod,
        autoSyncRemote:
          typeof body.autoSyncRemote === 'boolean' ? body.autoSyncRemote : prev.autoSyncRemote,
        lastSyncError: null as string | null,
      };

      let notice = `Storage backend switched to ${nextMode.toUpperCase()}.`;

      if (nextMode === 'mounted') {
        const check = validateMountedPath(nextConfig.mountedPath);
        if (check.ok) {
          const targetExists = fs.existsSync(check.resolvedFile);
          if (body.preferExistingOnTarget && targetExists) {
            persistStorageConfig(nextConfig);
            reloadStateFromStorage();
            notice = `Loaded existing Mnemosyne & UI store from ${check.resolvedFile}.`;
          } else {
            if (body.migrateData !== false || !targetExists) {
              writeFileAtomic(check.resolvedFile, currentSnapshot);
              nextConfig.lastSyncedAt = new Date().toISOString();
            }
            persistStorageConfig(nextConfig);
            reloadStateFromStorage();
            notice = `Migrated & locked all Mnemosyne + UI storage to ${check.resolvedFile}.`;
          }
        }
      } else if (nextMode === 'webdav' || nextMode === 'remote-http') {
        persistStorageConfig(nextConfig);
        if (body.preferExistingOnTarget) {
          const pulled = await pullStoreFromRemote(nextConfig);
          if (pulled.ok) {
            replaceStateFromRawJson(pulled.raw);
            nextConfig.lastSyncedAt = new Date().toISOString();
            nextConfig.lastSyncError = null;
            persistStorageConfig(nextConfig);
            notice = `Loaded existing Mnemosyne & UI store from ${nextMode.toUpperCase()}.`;
          } else {
            // If no remote store exists yet, push current snapshot if migrateData is enabled
            if (body.migrateData !== false) {
              const pushed = await pushStoreToRemote(currentSnapshot, nextConfig);
              if (!pushed.ok) {
                nextConfig.lastSyncError = pushed.message;
                persistStorageConfig(nextConfig);
                res.status(400).json({ error: pushed.message, config: getPublicStorageConfig() });
                return;
              }
              nextConfig.lastSyncedAt = new Date().toISOString();
              persistStorageConfig(nextConfig);
              notice = `Initialized new remote store at ${nextConfig.remoteUrl}.`;
            }
          }
        } else if (body.migrateData !== false) {
          const pushed = await pushStoreToRemote(currentSnapshot, nextConfig);
          if (!pushed.ok) {
            nextConfig.lastSyncError = pushed.message;
            persistStorageConfig(nextConfig);
            res.status(400).json({ error: pushed.message, config: getPublicStorageConfig() });
            return;
          }
          nextConfig.lastSyncedAt = new Date().toISOString();
          nextConfig.lastSyncError = null;
          persistStorageConfig(nextConfig);
          notice = `Saved & pushed full Mnemosyne + UI store to ${nextMode.toUpperCase()}.`;
        }
      } else {
        // local mode
        persistStorageConfig(nextConfig);
        if (body.migrateData !== false) {
          writeFileAtomic(
            path.resolve(process.cwd(), 'data', 'aetheris-store.json'),
            currentSnapshot
          );
        }
        reloadStateFromStorage();
        notice = 'Storage backend set to Local Workspace (./data/aetheris-store.json).';
      }

      res.json({
        config: getPublicStorageConfig(),
        state: getPublicAppState(),
        providers: getProviderStatuses(),
        notice,
      });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to update storage configuration',
      });
    }
  });

  app.post('/api/storage/sync', async (req, res) => {
    try {
      const { direction } = (req.body ?? {}) as { direction?: 'push' | 'pull' };
      const cfg = loadStorageConfig();

      if (direction === 'pull') {
        if (cfg.mode === 'webdav' || cfg.mode === 'remote-http') {
          const pulled = await pullStoreFromRemote();
          if (!pulled.ok) {
            res.status(400).json({ error: pulled.message, config: getPublicStorageConfig() });
            return;
          }
          replaceStateFromRawJson(pulled.raw);
          res.json({
            ok: true,
            notice: `Pulled latest Mnemosyne & UI store from ${cfg.mode.toUpperCase()}.`,
            config: getPublicStorageConfig(),
            state: getPublicAppState(),
            providers: getProviderStatuses(),
          });
          return;
        }
        reloadStateFromStorage();
        res.json({
          ok: true,
          notice: `Reloaded workspace store from ${getPublicStorageConfig().activeStoreFile}.`,
          config: getPublicStorageConfig(),
          state: getPublicAppState(),
          providers: getProviderStatuses(),
        });
        return;
      }

      // push
      const snapshot = exportSerializedState();
      if (cfg.mode === 'webdav' || cfg.mode === 'remote-http') {
        const pushed = await pushStoreToRemote(snapshot);
        if (!pushed.ok) {
          res.status(400).json({ error: pushed.message, config: getPublicStorageConfig() });
          return;
        }
        res.json({
          ok: true,
          notice: pushed.message,
          config: getPublicStorageConfig(),
        });
        return;
      }

      if (cfg.mode === 'mounted') {
        const check = validateMountedPath(cfg.mountedPath);
        if (!check.ok) {
          res.status(400).json({ error: check.error });
          return;
        }
        writeFileAtomic(check.resolvedFile, snapshot);
        cfg.lastSyncedAt = new Date().toISOString();
        cfg.lastSyncError = null;
        persistStorageConfig(cfg);
        res.json({
          ok: true,
          notice: `Flushed full Mnemosyne + UI store to ${check.resolvedFile}.`,
          config: getPublicStorageConfig(),
        });
        return;
      }

      writeFileAtomic(path.resolve(process.cwd(), 'data', 'aetheris-store.json'), snapshot);
      res.json({
        ok: true,
        notice: 'Flushed workspace store to local disk.',
        config: getPublicStorageConfig(),
      });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Storage sync failed',
      });
    }
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

  // Modular Web Recon Search, Connection Test & Page Extraction
  app.post('/api/search', async (req, res) => {
    try {
      const { query, queries, sessionId, provider, maxResults } = req.body as {
        query?: string;
        queries?: string[];
        sessionId?: string;
        provider?: SearchProvider;
        maxResults?: number;
      };
      const objective = (query || '').trim();
      if (!objective) {
        res.status(400).json({ error: 'Search query is required.' });
        return;
      }
      const result = await executeWebReconSearch({
        query: objective,
        provider,
        maxResults,
        queries: Array.isArray(queries) ? queries : undefined,
        sessionId,
      });
      res.json(result);
    } catch (err) {
      res.status(502).json({
        error: err instanceof Error ? err.message : 'Web Recon search failed',
      });
    }
  });

  app.post('/api/search/test', async (req, res) => {
    try {
      const {
        provider,
        searxngBaseUrl,
        customSearchUrl,
        customSearchMethod,
        maxSearchResults,
      } = (req.body ?? {}) as {
        provider?: SearchProvider;
        searxngBaseUrl?: string;
        customSearchUrl?: string;
        customSearchMethod?: 'GET' | 'POST';
        maxSearchResults?: number;
      };
      const result = await testSearchProviderConnection({
        provider,
        searxngBaseUrl,
        customSearchUrl,
        customSearchMethod,
        maxSearchResults,
      });
      res.status(result.ok ? 200 : 400).json(result);
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: err instanceof Error ? err.message : 'Search provider test failed',
      });
    }
  });

  app.post('/api/search/fetch', async (req, res) => {
    try {
      const { url, urls, objective, sessionId } = req.body as {
        url?: string;
        urls?: string[];
        objective?: string;
        sessionId?: string;
      };
      const targetUrls = Array.isArray(urls)
        ? urls
        : url
          ? [url]
          : [];
      if (targetUrls.length === 0) {
        res.status(400).json({ error: 'A valid public http/https URL is required.' });
        return;
      }
      const result = await parallelWebFetch({
        urls: targetUrls,
        objective,
        sessionId,
      });
      res.json(result);
    } catch (err) {
      res.status(400).json({
        error: err instanceof Error ? err.message : 'Web page extraction failed',
      });
    }
  });

  // Streaming Chat SSE Endpoint (Multi-Provider + Multimodal + Mnemosyne OS + Parallel Search)
  app.post('/api/chat/stream', async (req, res) => {
    const {
      threadId,
      message,
      attachments = [],
      provider,
      model,
      useMnemosyne = true,
      useWebSearch,
    } = req.body as {
      threadId: string;
      message: string;
      attachments?: ChatAttachment[];
      provider: LLMProvider;
      model: string;
      useMnemosyne?: boolean;
      useWebSearch?: boolean;
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

      // 2. Modular Web Recon Routing (Gemini Native / SearXNG / Brave / Tavily / Custom / Parallel)
      const shouldSearchWeb =
        (useWebSearch ?? state.settings.useWebSearchInChat) &&
        (message || '').trim().length >= 3;
      const activeSearchProvider: SearchProvider =
        state.settings.searchProvider || 'gemini-native';
      const maxSearchResults = state.settings.maxSearchResults || 5;
      const useGeminiNativeTool =
        shouldSearchWeb &&
        activeSearchProvider === 'gemini-native' &&
        provider === 'gemini';

      let webSources: WebSearchSource[] = [];
      let webSearchBlock = '';
      const webSearchQuery = (message || '').trim();

      if (shouldSearchWeb) {
        writeSSE({
          type: 'web_search_start',
          query: webSearchQuery,
          provider: activeSearchProvider,
        });

        if (!useGeminiNativeTool) {
          try {
            const searchResult = await executeWebReconSearch({
              query: webSearchQuery,
              provider: activeSearchProvider,
              maxResults: maxSearchResults,
            });
            webSources = searchResult.results;
            if (webSources.length > 0) {
              webSearchBlock = formatWebSearchSystemBlock(
                webSearchQuery,
                webSources,
                activeSearchProvider
              );
              writeSSE({
                type: 'web_search_results',
                query: webSearchQuery,
                provider: activeSearchProvider,
                sources: webSources,
              });
            } else {
              writeSSE({
                type: 'web_search_results',
                query: webSearchQuery,
                provider: activeSearchProvider,
                sources: [],
              });
            }
          } catch (searchErr) {
            writeSSE({
              type: 'web_search_error',
              provider: activeSearchProvider,
              message:
                searchErr instanceof Error ? searchErr.message : 'Web Recon search skipped',
            });
          }
        }
      }

      const mnemosyneBlock = formatMnemosyneSystemBlock(recalled);
      const systemInstruction = [
        state.settings.systemPrompt,
        mnemosyneBlock,
        webSearchBlock,
      ]
        .filter(Boolean)
        .join('\n\n');

      // 3. Stream LLM completion
      const { fullText, fullReasoning, groundingSources } = await streamChatCompletion({
        res,
        provider,
        model,
        systemInstruction,
        history: historyBefore,
        userText: message || '',
        attachments,
        enableGeminiGoogleSearch: useGeminiNativeTool,
        maxSearchResults,
      });

      if (useGeminiNativeTool && groundingSources.length > 0) {
        webSources = groundingSources;
      }

      // 4. Mnemosyne Auto-Consolidation
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
        webSearchQuery: webSources.length > 0 ? webSearchQuery : undefined,
        webSearchProvider: webSources.length > 0 ? activeSearchProvider : undefined,
        webSources: webSources.length > 0 ? webSources : undefined,
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

  // Ensure unknown /api/* routes always return JSON instead of SPA HTML
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  // Attach WebSockets for Live Call (/ws/live-call) & Deepgram Streaming STT (/ws/deepgram-stt)
  attachWebSocketServers(server);

  const staticFilesMiddleware = express.static(distDir);
  const serveStaticFallback = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    staticFilesMiddleware(req, res, () => {
      if (hasDistBuild()) {
        res.setHeader('Cache-Control', 'no-cache');
        res.sendFile(distIndex);
        return;
      }
      next();
    });
  };

  // Vite dev middleware vs static production build
  let startViteAfterListen: (() => void) | null = null;

  if (!preferStaticDist) {
    const getViteState = () => viteState;
    let vitePromise: Promise<void> | null = null;

    const ensureVite = (): Promise<void> => {
      if (vitePromise) return vitePromise;
      vitePromise = import('vite')
        .then(({ createServer }) =>
          createServer({
            server: {
              middlewareMode: true,
              hmr: false,
              watch: null,
              allowedHosts: true,
            },
            appType: 'custom',
          })
        )
        .then((vite) => {
          viteState.server = vite;
          console.log('Pheonikz UI Vite dev middleware ready');
        })
        .catch((err) => {
          viteState.error = err instanceof Error ? err : new Error(String(err));
          console.error('Vite dev middleware initialization failed:', viteState.error);
        });
      return vitePromise;
    };

    startViteAfterListen = () => {
      setImmediate(() => {
        void ensureVite();
      });
    };

    app.use(async (req, res, next) => {
      let current = getViteState();
      if (current.error) {
        if (hasDistBuild()) {
          serveStaticFallback(req, res, next);
          return;
        }
        res
          .status(500)
          .setHeader('Cache-Control', 'no-store')
          .send(`Dev server initialization error: ${current.error.message}`);
        return;
      }
      if (!current.server) {
        await Promise.race([
          ensureVite(),
          new Promise<void>((resolve) => setTimeout(resolve, 3500)),
        ]);
        current = getViteState();
      }
      if (current.error) {
        if (hasDistBuild()) {
          serveStaticFallback(req, res, next);
          return;
        }
        res
          .status(500)
          .setHeader('Cache-Control', 'no-store')
          .send(`Dev server initialization error: ${current.error.message}`);
        return;
      }
      if (current.server) {
        current.server.middlewares(req, res, next);
        return;
      }
      if (req.headers.accept?.includes('text/html') || req.path === '/') {
        res
          .status(200)
          .setHeader('Content-Type', 'text/html; charset=utf-8')
          .setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
          .setHeader('Pragma', 'no-cache')
          .send(
            `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pheonikz UI</title></head><body style="background:#0a0b08;color:#8fa85c;font-family:monospace;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;height:100vh;margin:0;padding:16px;text-align:center"><div id="status">INITIALIZING PHEONIKZ UI TACTICAL NODE...</div><div id="detail" style="color:#a8a29e;font-size:12px;max-width:460px">Warming Vite frontend middleware on server. This page will reload automatically.</div><script>(async function poll(){try{const r=await fetch('/api/health',{cache:'no-store'});const d=await r.json();if(d.viteReady){location.reload();return;}if(d.viteError){document.getElementById('status').textContent='NODE INITIALIZATION ERROR';document.getElementById('detail').textContent=d.viteError+' (Tip: run npm run build && NODE_ENV=production npm start on your VPS)';return;}}catch(e){document.getElementById('detail').textContent='Waiting for backend /api/health...';}setTimeout(poll,1500);})();</script></body></html>`
          );
        return;
      }
      await ensureVite();
      current = getViteState();
      if (current.server) {
        current.server.middlewares(req, res, next);
        return;
      }
      next();
    });
  } else {
    app.use(staticFilesMiddleware);
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(distIndex);
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Pheonikz UI server listening on http://0.0.0.0:${PORT} (${preferStaticDist ? 'production static dist/' : 'dev Vite middleware'})`
    );
    startViteAfterListen?.();
  });
}

startServer();
