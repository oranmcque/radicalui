import { GoogleGenAI, Type } from '@google/genai';
import type { Response } from 'express';
import type {
  ChatAttachment,
  ChatMessage,
  LLMProvider,
  MemoryTier,
  MnemosyneMemory,
  ModelOption,
  ProviderStatus,
  STTProvider,
  TTSProvider,
} from '../src/types/index.js';
import { addMemory, loadState, resolveProviderKey } from './store.js';

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export const MODEL_CATALOG: ModelOption[] = [
  {
    id: 'gemini-4-hydrogen',
    label: 'Gemini 4 Hydrogen',
    provider: 'gemini',
    contextWindow: '1M',
    supportsVision: true,
    supportsAudio: true,
    supportsReasoning: true,
    description: 'Fast multimodal workhorse with native vision, audio, and reasoning.',
  },
  {
    id: 'gemini-3.1-flash-lite',
    label: 'Gemini 3.1 Flash Lite',
    provider: 'gemini',
    contextWindow: '1M',
    supportsVision: true,
    supportsAudio: true,
    supportsReasoning: false,
    description: 'Ultra-low-latency multimodal model ideal for instant voice turns.',
  },
  {
    id: 'chatgpt-4o-latest',
    label: 'NanoGPT · ChatGPT-4o',
    provider: 'nanogpt',
    contextWindow: '128K',
    supportsVision: true,
    supportsAudio: false,
    supportsReasoning: false,
    description: 'Routed via NanoGPT unified OpenAI-compatible gateway.',
  },
  {
    id: 'claude-sonnet-4-5',
    label: 'NanoGPT · Claude Sonnet',
    provider: 'nanogpt',
    contextWindow: '200K',
    supportsVision: true,
    supportsAudio: false,
    supportsReasoning: true,
    description: 'High-precision coding & editorial model via NanoGPT.',
  },
  {
    id: 'deepseek-chat',
    label: 'DeepSeek V3',
    provider: 'deepseek',
    contextWindow: '128K',
    supportsVision: false,
    supportsAudio: false,
    supportsReasoning: false,
    description: 'DeepSeek flagship general and coding chat model.',
  },
  {
    id: 'deepseek-reasoner',
    label: 'DeepSeek R1 Reasoner',
    provider: 'deepseek',
    contextWindow: '128K',
    supportsVision: false,
    supportsAudio: false,
    supportsReasoning: true,
    description: 'Chain-of-thought reasoning model with live thinking trace.',
  },
  {
    id: 'gpt-4o',
    label: 'OpenAI GPT-4o',
    provider: 'openai',
    contextWindow: '128K',
    supportsVision: true,
    supportsAudio: false,
    supportsReasoning: false,
    description: 'OpenAI multimodal flagship model with vision support.',
  },
  {
    id: 'gpt-4.1',
    label: 'OpenAI GPT-4.1',
    provider: 'openai',
    contextWindow: '1M',
    supportsVision: true,
    supportsAudio: false,
    supportsReasoning: true,
    description: 'OpenAI long-context coding and instruction-following model.',
  },
];

export function getProviderStatuses(): ProviderStatus[] {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  const dg = resolveProviderKey('deepgram');
  const fish = resolveProviderKey('fishaudio');
  const nano = resolveProviderKey('nanogpt');
  const deepseek = resolveProviderKey('deepseek');
  const openai = resolveProviderKey('openai');

  return [
    {
      id: 'gemini',
      name: 'Google Gemini & Live API',
      category: 'realtime',
      envVar: 'GEMINI_API_KEY',
      configured: hasGemini,
      source: hasGemini ? 'env' : 'none',
      note: 'Powers Gemini 4 Hydrogen, Gemini Live Call (3.8-live), Transcribe (3.5), and TTS (3.8).',
    },
    {
      id: 'deepgram',
      name: 'Deepgram Speech API',
      category: 'stt',
      envVar: 'DEEPGRAM_API_KEY',
      configured: Boolean(dg.key),
      source: dg.source,
      note: 'Nova-2 / Nova-3 low-latency Speech-to-Text and Aura neural TTS.',
    },
    {
      id: 'fishaudio',
      name: 'Fish Audio API',
      category: 'tts',
      envVar: 'FISHAUDIO_API_KEY',
      configured: Boolean(fish.key),
      source: fish.source,
      note: 'Expressive neural voice cloning & low-latency streaming TTS.',
    },
    {
      id: 'nanogpt',
      name: 'NanoGPT Gateway',
      category: 'llm',
      envVar: 'NANOGPT_API_KEY',
      configured: Boolean(nano.key),
      source: nano.source,
      note: 'Pay-per-request unified router for multi-model inference.',
    },
    {
      id: 'deepseek',
      name: 'DeepSeek API',
      category: 'llm',
      envVar: 'DEEPSEEK_API_KEY',
      configured: Boolean(deepseek.key),
      source: deepseek.source,
      note: 'DeepSeek V3 Chat and R1 Reasoner with streamed reasoning_content.',
    },
    {
      id: 'openai',
      name: 'OpenAI API',
      category: 'llm',
      envVar: 'OPENAI_API_KEY',
      configured: Boolean(openai.key),
      source: openai.source,
      note: 'GPT-4o and GPT-4.1 multimodal completions.',
    },
  ];
}

function writeSSE(res: Response, payload: Record<string, unknown>) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function buildOpenAIMessages(
  systemInstruction: string,
  history: ChatMessage[],
  userText: string,
  attachments: ChatAttachment[]
) {
  const messages: Array<{ role: string; content: unknown }> = [];
  if (systemInstruction.trim()) {
    messages.push({ role: 'system', content: systemInstruction });
  }

  for (const msg of history.slice(-14)) {
    let text = msg.content;
    if (msg.attachments && msg.attachments.length > 0) {
      const textFiles = msg.attachments
        .filter((a) => a.textContent)
        .map((a) => `\n[Attached file ${a.name}]:\n${a.textContent}`)
        .join('\n');
      if (textFiles) text += textFiles;
    }
    messages.push({ role: msg.role, content: text });
  }

  const contentParts: Array<Record<string, unknown>> = [];
  let combinedText = userText;
  for (const att of attachments) {
    if (att.textContent) {
      combinedText += `\n\n[Attached File: ${att.name}]\n${att.textContent}`;
    } else if (att.mimeType.startsWith('image/') && att.dataBase64) {
      contentParts.push({
        type: 'image_url',
        image_url: { url: `data:${att.mimeType};base64,${att.dataBase64}` },
      });
    }
  }

  if (contentParts.length > 0) {
    contentParts.unshift({ type: 'text', text: combinedText || 'Analyze the attached image.' });
    messages.push({ role: 'user', content: contentParts });
  } else {
    messages.push({ role: 'user', content: combinedText });
  }

  return messages;
}

export async function streamChatCompletion(params: {
  res: Response;
  provider: LLMProvider;
  model: string;
  systemInstruction: string;
  history: ChatMessage[];
  userText: string;
  attachments: ChatAttachment[];
}): Promise<{ fullText: string; fullReasoning: string }> {
  const { res, provider, model, systemInstruction, history, userText, attachments } = params;

  if (provider === 'gemini') {
    const ai = getGeminiClient();
    if (!ai) {
      throw new Error('GEMINI_API_KEY is not configured in the server environment.');
    }

    const contents: Array<{ role: 'user' | 'model'; parts: Array<Record<string, unknown>> }> = [];
    for (const msg of history.slice(-16)) {
      const parts: Array<Record<string, unknown>> = [];
      let msgText = msg.content;
      if (msg.attachments) {
        for (const att of msg.attachments) {
          if (att.textContent) {
            msgText += `\n\n[Attached File: ${att.name}]\n${att.textContent}`;
          }
        }
      }
      if (msgText) parts.push({ text: msgText });
      if (parts.length > 0) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts,
        });
      }
    }

    const currentParts: Array<Record<string, unknown>> = [];
    let finalUserText = userText;
    for (const att of attachments) {
      if (att.textContent) {
        finalUserText += `\n\n[Attached File: ${att.name}]\n${att.textContent}`;
      } else if (att.dataBase64 && (att.mimeType.startsWith('image/') || att.mimeType.startsWith('audio/') || att.mimeType === 'application/pdf')) {
        currentParts.push({
          inlineData: {
            mimeType: att.mimeType,
            data: att.dataBase64,
          },
        });
      }
    }
    if (finalUserText.trim() || currentParts.length === 0) {
      currentParts.push({ text: finalUserText || 'Describe or analyze the attachment.' });
    }
    contents.push({ role: 'user', parts: currentParts });

    const stream = await ai.models.generateContentStream({
      model: model || 'gemini-4-hydrogen',
      contents: contents as never,
      config: {
        systemInstruction: systemInstruction || undefined,
      },
    });

    let fullText = '';
    for await (const chunk of stream) {
      const chunkText = chunk.text ?? '';
      if (chunkText) {
        fullText += chunkText;
        writeSSE(res, { type: 'delta', text: chunkText });
      }
    }
    return { fullText, fullReasoning: '' };
  }

  // OpenAI-compatible streaming (NanoGPT, DeepSeek, OpenAI)
  let endpoint = '';
  let apiKey = '';
  if (provider === 'nanogpt') {
    endpoint = 'https://nano-gpt.com/api/v1/chat/completions';
    apiKey = resolveProviderKey('nanogpt').key;
  } else if (provider === 'deepseek') {
    endpoint = 'https://api.deepseek.com/chat/completions';
    apiKey = resolveProviderKey('deepseek').key;
  } else if (provider === 'openai') {
    endpoint = 'https://api.openai.com/v1/chat/completions';
    apiKey = resolveProviderKey('openai').key;
  }

  if (!apiKey) {
    throw new Error(`${provider.toUpperCase()} API key is not configured. Add it in API Vault & Audio.`);
  }

  const messages = buildOpenAIMessages(systemInstruction, history, userText, attachments);
  const upstream = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => upstream.statusText);
    throw new Error(`${provider.toUpperCase()} API error (${upstream.status}): ${errText}`);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';
  let fullReasoning = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line.startsWith('data:')) continue;
      const payloadStr = line.slice(5).trim();
      if (!payloadStr || payloadStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(payloadStr);
        const delta = parsed.choices?.[0]?.delta;
        if (delta?.reasoning_content) {
          fullReasoning += delta.reasoning_content;
          writeSSE(res, { type: 'reasoning', text: delta.reasoning_content });
        }
        if (delta?.content) {
          fullText += delta.content;
          writeSSE(res, { type: 'delta', text: delta.content });
        }
      } catch {
        // Ignore partial JSON frames
      }
    }
  }

  return { fullText, fullReasoning };
}

/**
 * Mnemosyne OS Auto-Consolidation
 * Distills durable user preferences, facts, and project decisions into persistent memory.
 */
export async function consolidateMemoriesFromTurn(
  userText: string,
  assistantText: string,
  threadId: string,
  sourceType: 'chat' | 'live_call' = 'chat'
): Promise<MnemosyneMemory[]> {
  const ai = getGeminiClient();
  if (!ai) return [];
  if (userText.trim().length < 12 && assistantText.trim().length < 20) return [];

  const existing = loadState()
    .memories.slice(0, 15)
    .map((m) => `- ${m.content}`)
    .join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Analyze this conversation turn and extract at most 2 genuinely durable facts, user preferences, project requirements, or decisions worth remembering across future sessions.
Do NOT extract generic chit-chat, greetings, or facts already listed in Existing Memories. If nothing durable was learned, return an empty array [].

Existing Memories:
${existing || '(none)'}

User: ${userText.slice(0, 1800)}
Assistant: ${assistantText.slice(0, 1800)}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tier: {
                type: Type.STRING,
                description: 'One of: core, episodic, semantic, procedural',
              },
              content: {
                type: Type.STRING,
                description: 'Concise 1-sentence standalone memory statement.',
              },
              salience: {
                type: Type.NUMBER,
                description: 'Importance score between 0.4 and 1.0',
              },
            },
            required: ['tier', 'content', 'salience'],
          },
        },
      },
    });

    const parsed = JSON.parse((response.text ?? '[]').trim()) as Array<{
      tier: string;
      content: string;
      salience: number;
    }>;

    const added: MnemosyneMemory[] = [];
    for (const item of parsed.slice(0, 2)) {
      if (!item.content || item.content.trim().length < 8) continue;
      const validTier: MemoryTier =
        item.tier === 'core' ||
        item.tier === 'episodic' ||
        item.tier === 'semantic' ||
        item.tier === 'procedural'
          ? item.tier
          : 'episodic';
      const created = addMemory({
        tier: validTier,
        content: item.content,
        salience: item.salience,
        pinned: false,
        sourceThreadId: threadId,
        sourceType,
      });
      added.push(created);
    }
    return added;
  } catch {
    return [];
  }
}

/**
 * Speech-to-Text Router (Deepgram Nova-2/3 or Gemini 3.5 Transcribe)
 */
export async function transcribeAudio(params: {
  audioBase64: string;
  mimeType: string;
  provider: STTProvider;
  deepgramModel?: string;
}): Promise<{ transcript: string; providerUsed: STTProvider }> {
  const { audioBase64, mimeType, provider, deepgramModel } = params;
  const audioBuffer = Buffer.from(audioBase64, 'base64');

  if (provider === 'deepgram') {
    const dgKey = resolveProviderKey('deepgram').key;
    if (!dgKey) {
      throw new Error('Deepgram API key is not configured. Add it in API Vault or switch STT to Gemini.');
    }
    const model = deepgramModel || 'nova-2';
    const dgRes = await fetch(
      `https://api.deepgram.com/v1/listen?model=${encodeURIComponent(model)}&smart_format=true&punctuate=true`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${dgKey}`,
          'Content-Type': mimeType || 'audio/webm',
        },
        body: audioBuffer,
      }
    );
    if (!dgRes.ok) {
      const errText = await dgRes.text().catch(() => dgRes.statusText);
      throw new Error(`Deepgram STT error (${dgRes.status}): ${errText}`);
    }
    const data = (await dgRes.json()) as {
      results?: { channels?: Array<{ alternatives?: Array<{ transcript?: string }> }> };
    };
    const transcript = data.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? '';
    return { transcript: transcript.trim(), providerUsed: 'deepgram' };
  }

  // Gemini 3.5 Transcribe
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured in server secrets.');
  }
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-transcribe',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType || 'audio/webm',
            data: audioBase64,
          },
        },
        { text: 'Transcribe this audio accurately. Output only the spoken transcript.' },
      ],
    },
  });
  return { transcript: (response.text ?? '').trim(), providerUsed: 'gemini' };
}

/**
 * Text-to-Speech Router (Fish Audio, Deepgram Aura, or Gemini 3.8 Flash Lite TTS)
 */
export async function synthesizeSpeech(params: {
  text: string;
  provider: TTSProvider;
  fishVoiceId?: string;
  deepgramVoice?: string;
  geminiVoice?: string;
}): Promise<{ audioBuffer: Buffer; mimeType: string; providerUsed: TTSProvider }> {
  const { text, provider, fishVoiceId, deepgramVoice, geminiVoice } = params;
  const cleanText = text.replace(/[*_`#>\[\]]/g, '').trim().slice(0, 2400);
  if (!cleanText) {
    throw new Error('Cannot synthesize empty text.');
  }

  if (provider === 'fishaudio') {
    const fishKey = resolveProviderKey('fishaudio').key;
    if (!fishKey) {
      throw new Error('Fish Audio API key is not configured. Add it in API Vault or switch TTS to Gemini.');
    }
    const body: Record<string, unknown> = {
      text: cleanText,
      format: 'mp3',
      latency: 'balanced',
    };
    if (fishVoiceId?.trim()) {
      body.reference_id = fishVoiceId.trim();
    }
    const fishRes = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${fishKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!fishRes.ok) {
      const errText = await fishRes.text().catch(() => fishRes.statusText);
      throw new Error(`Fish Audio TTS error (${fishRes.status}): ${errText}`);
    }
    const arr = await fishRes.arrayBuffer();
    return { audioBuffer: Buffer.from(arr), mimeType: 'audio/mpeg', providerUsed: 'fishaudio' };
  }

  if (provider === 'deepgram') {
    const dgKey = resolveProviderKey('deepgram').key;
    if (!dgKey) {
      throw new Error('Deepgram API key is not configured. Add it in API Vault or switch TTS to Gemini.');
    }
    const voice = deepgramVoice || 'aura-asteria-en';
    const dgRes = await fetch(
      `https://api.deepgram.com/v1/speak?model=${encodeURIComponent(voice)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${dgKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanText }),
      }
    );
    if (!dgRes.ok) {
      const errText = await dgRes.text().catch(() => dgRes.statusText);
      throw new Error(`Deepgram TTS error (${dgRes.status}): ${errText}`);
    }
    const arr = await dgRes.arrayBuffer();
    return { audioBuffer: Buffer.from(arr), mimeType: 'audio/mpeg', providerUsed: 'deepgram' };
  }

  // Gemini 3.8 Flash Lite TTS -> unary returns complete WAV file (audio/wav, 24kHz)
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured in server secrets.');
  }
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-lite-tts',
    contents: [
      {
        role: 'user',
        parts: [{ text: cleanText }],
      },
    ],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: geminiVoice || 'Zephyr' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error('Gemini TTS returned no audio data.');
  }
  return {
    audioBuffer: Buffer.from(base64Audio, 'base64'),
    mimeType: 'audio/wav',
    providerUsed: 'gemini',
  };
}
