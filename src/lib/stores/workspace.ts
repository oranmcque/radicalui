import { writable, derived, get } from 'svelte/store';
import type {
  AppStatePayload,
  ChatAttachment,
  ChatMessage,
  ChatThread,
  LLMProvider,
  MnemosyneMemory,
  ModelOption,
  ProviderStatus,
  RecalledContext,
  StorageConfigPublic,
  VaultDocument,
  WebSearchSource,
  WorkspaceSettings,
} from '../../types/index';
import { generateUUID, safeParseJson } from '#lib/uuid';

export const DEFAULT_SETTINGS: WorkspaceSettings = {
  activeProvider: 'gemini',
  activeModel: 'gemini-4-hydrogen',
  voicePipeline: 'gemini-live',
  sttProvider: 'gemini',
  ttsProvider: 'gemini',
  fishVoiceId: '',
  deepgramSttModel: 'nova-2',
  deepgramTtsVoice: 'aura-asteria-en',
  geminiVoice: 'Zephyr',
  systemPrompt:
    'You are Pheonikz UI, a self-hosted multimodal intelligence running inside Mnemosyne OS. Be direct, technically rigorous, and leverage recalled memories naturally without reciting memory IDs unless asked.',
  autoConsolidateMemory: true,
  useMnemosyneInChat: true,
  useWebSearchInChat: true,
  searchProvider: 'gemini-native',
  searxngBaseUrl: 'http://localhost:8888',
  customSearchUrl: '',
  customSearchMethod: 'GET',
  maxSearchResults: 5,
};

export const DEFAULT_MODELS: ModelOption[] = [
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
    id: 'gpt-4o',
    label: 'OpenAI GPT-4o',
    provider: 'openai',
    contextWindow: '128K',
    supportsVision: true,
    supportsAudio: false,
    supportsReasoning: false,
    description: 'OpenAI flagship multimodal chat model.',
  },
];

export const DEFAULT_STORAGE_CONFIG: StorageConfigPublic = {
  mode: 'local',
  mountedPath: '',
  remoteUrl: '',
  remoteUsername: '',
  hasRemotePassword: false,
  hasRemoteToken: false,
  remoteMethod: 'PUT',
  autoSyncRemote: true,
  activeStoreFile: './data/aetheris-store.json',
  lastSyncedAt: null,
  lastSyncError: null,
  storeSizeBytes: 0,
};

export const threads = writable<ChatThread[]>([]);
export const activeThreadId = writable<string | null>(null);
export const memories = writable<MnemosyneMemory[]>([]);
export const vaultDocs = writable<VaultDocument[]>([]);
export const settings = writable<WorkspaceSettings>({ ...DEFAULT_SETTINGS });
export const storageConfig = writable<StorageConfigPublic>({ ...DEFAULT_STORAGE_CONFIG });
export const providers = writable<ProviderStatus[]>([]);
export const models = writable<ModelOption[]>([...DEFAULT_MODELS]);
export const serverOnline = writable<boolean>(false);
export const isStreaming = writable<boolean>(false);
export const streamingMessage = writable<{
  content: string;
  reasoning: string;
  recalled?: RecalledContext;
  consolidated?: MnemosyneMemory[];
  webSearching?: boolean;
  webSearchQuery?: string;
  webSearchProvider?: string;
  webSearchError?: string;
  webSources?: WebSearchSource[];
} | null>(null);

export const activeThread = derived(
  [threads, activeThreadId],
  ([$threads, $activeThreadId]) =>
    $threads.find((t) => t.id === $activeThreadId) ?? null
);

let abortController: AbortController | null = null;
let refreshInFlight: Promise<boolean> | null = null;

async function safeFetchJson<T>(url: string, timeoutMs = 8000): Promise<T | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return await safeParseJson<T>(res);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function refreshWorkspace(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    try {
      const [stateData, provData, storageData] = await Promise.all([
        safeFetchJson<AppStatePayload>('/api/state', 8000),
        safeFetchJson<{ providers: ProviderStatus[]; models: ModelOption[] }>(
          '/api/providers/status',
          8000
        ),
        safeFetchJson<StorageConfigPublic>('/api/storage/config', 8000),
      ]);

      if (provData) {
        if (Array.isArray(provData.providers)) {
          providers.set(provData.providers);
        }
        if (Array.isArray(provData.models) && provData.models.length > 0) {
          models.set(provData.models);
        }
      }

      if (storageData && typeof storageData.mode === 'string') {
        storageConfig.set(storageData);
      }

      if (stateData && typeof stateData === 'object') {
        if (Array.isArray(stateData.threads)) {
          threads.set(stateData.threads);
          const currentId = get(activeThreadId);
          if (currentId && stateData.threads.some((t) => t.id === currentId)) {
            activeThreadId.set(currentId);
          } else {
            activeThreadId.set(stateData.threads[0]?.id ?? null);
          }
        }
        if (Array.isArray(stateData.memories)) {
          memories.set(stateData.memories);
        }
        if (Array.isArray(stateData.vaultDocs)) {
          vaultDocs.set(stateData.vaultDocs);
        }
        if (stateData.settings && typeof stateData.settings === 'object') {
          settings.set({ ...DEFAULT_SETTINGS, ...stateData.settings });
        }

        serverOnline.set(true);
        return true;
      }

      serverOnline.set(false);
      return false;
    } catch {
      serverOnline.set(false);
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export async function updateSettings(
  updates: Partial<WorkspaceSettings>
): Promise<void> {
  settings.update((prev) => ({ ...prev, ...updates }));
  try {
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const saved = await safeParseJson<WorkspaceSettings>(res);
      if (saved) {
        settings.set({ ...DEFAULT_SETTINGS, ...saved });
        serverOnline.set(true);
      }
    }
  } catch {
    // Keep optimistic client-side setting update when running statically / offline
  }
}

export async function selectModel(
  provider: LLMProvider,
  modelId: string
): Promise<void> {
  await updateSettings({ activeProvider: provider, activeModel: modelId });
  const tid = get(activeThreadId);
  if (tid) {
    threads.update((prev) =>
      prev.map((t) => (t.id === tid ? { ...t, provider, model: modelId } : t))
    );
    try {
      await fetch(`/api/threads/${tid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, model: modelId }),
      });
    } catch {
      // Keep local selection when backend is unreachable
    }
  }
}

export async function createNewThread(): Promise<ChatThread> {
  const s = get(settings);
  const provider = s.activeProvider || 'gemini';
  const model = s.activeModel || 'gemini-4-hydrogen';

  try {
    const res = await fetch('/api/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model }),
    });
    if (res.ok) {
      const created = await safeParseJson<ChatThread>(res);
      if (created && created.id) {
        threads.update((prev) => [created, ...prev]);
        activeThreadId.set(created.id);
        serverOnline.set(true);
        return created;
      }
    }
  } catch {
    // Fall back to local thread creation in standalone static mode
  }

  const now = new Date().toISOString();
  const localThread: ChatThread = {
    id: generateUUID(),
    title: 'New Dispatch',
    provider,
    model,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
  threads.update((prev) => [localThread, ...prev]);
  activeThreadId.set(localThread.id);
  return localThread;
}

export async function deleteThreadById(id: string): Promise<void> {
  const currentActive = get(activeThreadId);
  threads.update((prev) => {
    const remaining = prev.filter((t) => t.id !== id);
    if (currentActive === id) {
      activeThreadId.set(remaining[0]?.id ?? null);
    }
    return remaining;
  });

  try {
    await fetch(`/api/threads/${id}`, { method: 'DELETE' });
  } catch {
    // Local removal already applied
  }
}

export async function sendChatMessage(
  message: string,
  attachments: ChatAttachment[],
  options?: { regenerate?: boolean }
): Promise<void> {
  const s = get(settings);

  let targetThreadId = get(activeThreadId);
  if (!targetThreadId) {
    const created = await createNewThread();
    targetThreadId = created.id;
  }

  if (!options?.regenerate) {
    const optimisticUser: ChatMessage = {
      id: generateUUID(),
      role: 'user',
      content: message,
      attachments,
      createdAt: new Date().toISOString(),
    };
    threads.update((prev) =>
      prev.map((t) =>
        t.id === targetThreadId
          ? { ...t, messages: [...t.messages, optimisticUser] }
          : t
      )
    );
  }

  isStreaming.set(true);
  streamingMessage.set({ content: '', reasoning: '' });
  abortController = new AbortController();

  try {
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal,
      body: JSON.stringify({
        threadId: targetThreadId,
        message,
        attachments,
        provider: s.activeProvider,
        model: s.activeModel,
        useMnemosyne: s.useMnemosyneInChat,
        useWebSearch: s.useWebSearchInChat,
      }),
    });

    if (!response.ok || !response.body) {
      const errJson = await safeParseJson<{ error?: string }>(response);
      serverOnline.set(false);
      throw new Error(
        errJson?.error ||
          `Backend API unavailable (HTTP ${response.status}). Run the Express backend server to enable live LLM streaming.`
      );
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/event-stream')) {
      serverOnline.set(false);
      throw new Error(
        'Backend /api/chat/stream did not return an event stream (static preview mode).'
      );
    }

    serverOnline.set(true);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let accContent = '';
    let accReasoning = '';

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
        if (!payloadStr) continue;
        try {
          const event = JSON.parse(payloadStr) as {
            type: string;
            text?: string;
            query?: string;
            provider?: string;
            sources?: WebSearchSource[];
            recalled?: RecalledContext;
            memories?: MnemosyneMemory[];
            message?: ChatMessage | string;
            threadTitle?: string;
          };

          if (event.type === 'mnemosyne_recall' && event.recalled) {
            streamingMessage.update((prev) =>
              prev ? { ...prev, recalled: event.recalled } : prev
            );
          } else if (event.type === 'web_search_start') {
            streamingMessage.update((prev) =>
              prev
                ? {
                    ...prev,
                    webSearching: true,
                    webSearchQuery: event.query,
                    webSearchProvider: event.provider,
                    webSearchError: undefined,
                  }
                : prev
            );
          } else if (event.type === 'web_search_results') {
            streamingMessage.update((prev) =>
              prev
                ? {
                    ...prev,
                    webSearching: false,
                    webSearchQuery: event.query,
                    webSearchProvider: event.provider ?? prev.webSearchProvider,
                    webSources: event.sources ?? [],
                  }
                : prev
            );
          } else if (event.type === 'web_search_error') {
            streamingMessage.update((prev) =>
              prev
                ? {
                    ...prev,
                    webSearching: false,
                    webSearchError:
                      typeof event.message === 'string' ? event.message : 'Search error',
                  }
                : prev
            );
          } else if (event.type === 'reasoning' && event.text) {
            accReasoning += event.text;
            streamingMessage.update((prev) =>
              prev ? { ...prev, reasoning: accReasoning } : prev
            );
          } else if (event.type === 'delta' && event.text) {
            accContent += event.text;
            streamingMessage.update((prev) =>
              prev ? { ...prev, content: accContent } : prev
            );
          } else if (
            event.type === 'mnemosyne_consolidated' &&
            event.memories
          ) {
            memories.update((prev) => [...event.memories!, ...prev]);
            streamingMessage.update((prev) =>
              prev ? { ...prev, consolidated: event.memories } : prev
            );
          } else if (
            event.type === 'done' &&
            event.message &&
            typeof event.message !== 'string'
          ) {
            const finalMsg = event.message;
            threads.update((prev) =>
              prev.map((t) =>
                t.id === targetThreadId
                  ? {
                      ...t,
                      title: event.threadTitle || t.title,
                      messages: [...t.messages, finalMsg],
                    }
                  : t
              )
            );
          } else if (event.type === 'error') {
            throw new Error(
              typeof event.message === 'string' ? event.message : 'Stream error'
            );
          }
        } catch (innerErr) {
          if (
            innerErr instanceof Error &&
            innerErr.message !== 'Unexpected end of JSON input'
          ) {
            throw innerErr;
          }
        }
      }
    }
  } finally {
    isStreaming.set(false);
    streamingMessage.set(null);
    abortController = null;
  }
}

export function stopStreaming(): void {
  abortController?.abort();
  isStreaming.set(false);
  streamingMessage.set(null);
}
