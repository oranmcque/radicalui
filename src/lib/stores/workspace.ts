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

export const threads = writable<ChatThread[]>([]);
export const activeThreadId = writable<string | null>(null);
export const memories = writable<MnemosyneMemory[]>([]);
export const vaultDocs = writable<VaultDocument[]>([]);
export const settings = writable<WorkspaceSettings | null>(null);
export const storageConfig = writable<StorageConfigPublic | null>(null);
export const providers = writable<ProviderStatus[]>([]);
export const models = writable<ModelOption[]>([]);
export const serverOnline = writable<boolean>(true);
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

export async function refreshWorkspace(): Promise<void> {
  try {
    const [stateRes, provRes, storageRes] = await Promise.all([
      fetch('/api/state'),
      fetch('/api/providers/status'),
      fetch('/api/storage/config'),
    ]);

    if (stateRes.ok) {
      const stateData = (await stateRes.json()) as AppStatePayload;
      threads.set(stateData.threads);
      memories.set(stateData.memories);
      vaultDocs.set(stateData.vaultDocs);
      settings.set(stateData.settings);

      const currentId = get(activeThreadId);
      if (currentId && stateData.threads.some((t) => t.id === currentId)) {
        activeThreadId.set(currentId);
      } else {
        activeThreadId.set(stateData.threads[0]?.id ?? null);
      }
    }

    if (provRes.ok) {
      const provData = (await provRes.json()) as {
        providers: ProviderStatus[];
        models: ModelOption[];
      };
      providers.set(provData.providers);
      models.set(provData.models);
    }

    if (storageRes.ok) {
      const stData = (await storageRes.json()) as StorageConfigPublic;
      storageConfig.set(stData);
    }

    serverOnline.set(stateRes.ok && provRes.ok);
  } catch {
    serverOnline.set(false);
  }
}

export async function updateSettings(
  updates: Partial<WorkspaceSettings>
): Promise<void> {
  settings.update((prev) => (prev ? { ...prev, ...updates } : prev));
  const res = await fetch('/api/settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (res.ok) {
    const saved = (await res.json()) as WorkspaceSettings;
    settings.set(saved);
  }
}

export async function selectModel(
  provider: LLMProvider,
  modelId: string
): Promise<void> {
  await updateSettings({ activeProvider: provider, activeModel: modelId });
  const tid = get(activeThreadId);
  if (tid) {
    await fetch(`/api/threads/${tid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model: modelId }),
    });
    threads.update((prev) =>
      prev.map((t) => (t.id === tid ? { ...t, provider, model: modelId } : t))
    );
  }
}

export async function createNewThread(): Promise<ChatThread | null> {
  const s = get(settings);
  const provider = s?.activeProvider || 'gemini';
  const model = s?.activeModel || 'gemini-4-hydrogen';
  const res = await fetch('/api/threads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, model }),
  });
  if (!res.ok) return null;
  const created = (await res.json()) as ChatThread;
  threads.update((prev) => [created, ...prev]);
  activeThreadId.set(created.id);
  return created;
}

export async function deleteThreadById(id: string): Promise<void> {
  await fetch(`/api/threads/${id}`, { method: 'DELETE' });
  const currentActive = get(activeThreadId);
  threads.update((prev) => {
    const remaining = prev.filter((t) => t.id !== id);
    if (currentActive === id) {
      activeThreadId.set(remaining[0]?.id ?? null);
    }
    return remaining;
  });
}

export async function sendChatMessage(
  message: string,
  attachments: ChatAttachment[],
  options?: { regenerate?: boolean }
): Promise<void> {
  const s = get(settings);
  if (!s) return;

  let targetThreadId = get(activeThreadId);
  if (!targetThreadId) {
    const created = await createNewThread();
    if (!created) return;
    targetThreadId = created.id;
  }

  if (!options?.regenerate) {
    const optimisticUser: ChatMessage = {
      id: crypto.randomUUID(),
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
      throw new Error('Failed to connect to streaming endpoint.');
    }

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
