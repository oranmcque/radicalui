import { writable, derived, get } from 'svelte/store';
import type {
  AppStatePayload,
  ChatAttachment,
  ChatMessage,
  ChatThread,
  ImageAspectRatio,
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
import {
  chatSessionService,
  createSafeSessionId,
  type ChatSession,
  type SessionStorageStatus,
} from '#lib/services/chatSessionService';
import {
  generateImage,
  resolveImageSize,
} from '#lib/services/imageGenerationService';

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

export const threads = writable<ChatThread[]>([]);
export const activeThreadId = writable<string | null>(null);
export const sessionStorageStatus = writable<SessionStorageStatus>(
  chatSessionService.getStorageStatus()
);
export const memories = writable<MnemosyneMemory[]>([]);
export const vaultDocs = writable<VaultDocument[]>([]);
export const settings = writable<WorkspaceSettings>({ ...DEFAULT_SETTINGS });
export const settingsLoaded = writable<boolean>(false);
export const storageConfig = writable<StorageConfigPublic | null>(null);
export const providers = writable<ProviderStatus[]>([]);
export const models = writable<ModelOption[]>([]);
export const serverOnline = writable<boolean>(true);
export const isStreaming = writable<boolean>(false);
export const isGeneratingImage = writable<boolean>(false);
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
let sessionSubscriptionsBound = false;

/**
 * Loads previously persisted chat sessions from ChatSessionService
 * and subscribes reactive stores to session and storage-mode updates.
 */
export function initLocalSessions(): void {
  if (typeof window === 'undefined') return;
  if (!sessionSubscriptionsBound) {
    sessionSubscriptionsBound = true;
    chatSessionService.subscribeSessions((sessions) => {
      threads.set(sessions);
    });
    chatSessionService.subscribeStatus((status) => {
      sessionStorageStatus.set(status);
    });
  } else {
    threads.set(chatSessionService.listSessions());
    sessionStorageStatus.set(chatSessionService.getStorageStatus());
  }

  const savedActiveId = chatSessionService.getActiveSessionId();
  if (savedActiveId) {
    activeThreadId.set(savedActiveId);
  }
}

export function selectSession(id: string): ChatSession | null {
  const session = chatSessionService.getSession(id);
  if (!session) return null;
  chatSessionService.setActiveSessionId(session.id);
  activeThreadId.set(session.id);
  return session;
}

export async function saveSessionLocallyAndSync(
  session: Partial<ChatSession> & { id: string }
): Promise<ChatSession> {
  const saved = chatSessionService.saveSession(session);
  try {
    await fetch(`/api/threads/${saved.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: saved.title,
        provider: saved.provider,
        model: saved.model,
      }),
    });
  } catch {
    // Local persistence already succeeded via ChatSessionService
  }
  return saved;
}

export async function refreshWorkspace(): Promise<void> {
  initLocalSessions();
  try {
    const [stateRes, provRes, storageRes] = await Promise.all([
      fetch('/api/state', { cache: 'no-store' }),
      fetch('/api/providers/status', { cache: 'no-store' }),
      fetch('/api/storage/config', { cache: 'no-store' }).catch(() => null),
    ]);

    if (provRes.ok) {
      const provData = (await provRes.json()) as {
        providers: ProviderStatus[];
        models: ModelOption[];
      };
      providers.set(provData.providers);
      models.set(provData.models);
    }

    if (storageRes && storageRes.ok) {
      const storageData = (await storageRes.json()) as StorageConfigPublic;
      storageConfig.set(storageData);
    }

    if (!stateRes.ok) throw new Error('State unavailable');
    const data = (await stateRes.json()) as AppStatePayload;
    const mergedSessions = chatSessionService.mergeSessions(data.threads);
    threads.set(mergedSessions);
    memories.set(data.memories);
    vaultDocs.set(data.vaultDocs);
    settings.set(data.settings);
    settingsLoaded.set(true);

    const currentId = get(activeThreadId) ?? chatSessionService.getActiveSessionId();
    if (currentId && mergedSessions.some((t) => t.id === currentId)) {
      activeThreadId.set(currentId);
      chatSessionService.setActiveSessionId(currentId);
    } else {
      const nextId = mergedSessions[0]?.id ?? null;
      activeThreadId.set(nextId);
      chatSessionService.setActiveSessionId(nextId);
    }
    serverOnline.set(true);
  } catch {
    serverOnline.set(false);
  }
}

export async function updateSettings(
  updates: Partial<WorkspaceSettings>
): Promise<void> {
  settings.update((prev) => ({ ...prev, ...updates }));
  const res = await fetch('/api/settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (res.ok) {
    const saved = (await res.json()) as WorkspaceSettings;
    settings.set(saved);
    settingsLoaded.set(true);
  }
}

export async function selectModel(
  provider: LLMProvider,
  modelId: string
): Promise<void> {
  await updateSettings({ activeProvider: provider, activeModel: modelId });
  const tid = get(activeThreadId);
  if (tid) {
    const existing = chatSessionService.getSession(tid);
    if (existing) {
      chatSessionService.saveSession({
        ...existing,
        provider,
        model: modelId,
        updatedAt: new Date().toISOString(),
      });
    }
    try {
      await fetch(`/api/threads/${tid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, model: modelId }),
      });
    } catch {
      // Session change is already persisted locally
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
      const created = (await res.json()) as ChatThread;
      const saved = chatSessionService.saveSession(created);
      chatSessionService.setActiveSessionId(saved.id);
      activeThreadId.set(saved.id);
      return saved;
    }
  } catch {
    // Fall back to local session creation via ChatSessionService
  }

  const now = new Date().toISOString();
  const localSaved = chatSessionService.saveSession({
    id: createSafeSessionId(),
    title: 'New Dispatch',
    provider,
    model,
    messages: [],
    createdAt: now,
    updatedAt: now,
  });
  chatSessionService.setActiveSessionId(localSaved.id);
  activeThreadId.set(localSaved.id);
  return localSaved;
}

export async function deleteThreadById(id: string): Promise<void> {
  const currentActive = get(activeThreadId);
  chatSessionService.deleteSession(id);
  if (currentActive === id) {
    const nextId = chatSessionService.getActiveSessionId();
    activeThreadId.set(nextId);
  }
  try {
    await fetch(`/api/threads/${id}`, { method: 'DELETE' });
  } catch {
    // Local session already removed
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
      id: createSafeSessionId(),
      role: 'user',
      content: message,
      attachments,
      createdAt: new Date().toISOString(),
    };
    const existing = chatSessionService.getSession(targetThreadId);
    if (existing) {
      const derivedTitle =
        existing.title === 'New Dispatch' && message.trim()
          ? message.trim().slice(0, 48)
          : existing.title;
      chatSessionService.saveSession({
        ...existing,
        title: derivedTitle,
        updatedAt: optimisticUser.createdAt,
        messages: [...existing.messages, optimisticUser],
      });
    } else {
      threads.update((prev) =>
        prev.map((t) =>
          t.id === targetThreadId
            ? { ...t, messages: [...t.messages, optimisticUser] }
            : t
        )
      );
    }
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
      const errJson = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      throw new Error(errJson.error || `HTTP ${response.status}`);
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
            const current = chatSessionService.getSession(targetThreadId);
            if (current) {
              chatSessionService.saveSession({
                ...current,
                title: event.threadTitle || current.title,
                updatedAt: finalMsg.createdAt || new Date().toISOString(),
                messages: [...current.messages, finalMsg],
              });
            } else {
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
            }
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

export async function generateChatImage(
  prompt: string,
  aspectRatio: ImageAspectRatio = '1:1',
  options?: { retryMessageId?: string }
): Promise<void> {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) return;

  let targetThreadId = get(activeThreadId);
  if (!targetThreadId) {
    const created = await createNewThread();
    targetThreadId = created.id;
  }

  const now = new Date().toISOString();
  const size = resolveImageSize(aspectRatio);
  const assistantMsgId = options?.retryMessageId || createSafeSessionId();
  const imageItemId = createSafeSessionId();

  const existing = chatSessionService.getSession(targetThreadId);
  if (existing) {
    let nextMessages: ChatMessage[];
    if (options?.retryMessageId) {
      nextMessages = existing.messages.map((m) =>
        m.id === assistantMsgId
          ? {
              ...m,
              content: '',
              generatedImage: {
                id: imageItemId,
                prompt: cleanPrompt,
                aspectRatio,
                size,
                status: 'loading' as const,
                createdAt: now,
              },
            }
          : m
      );
    } else {
      const userMsg: ChatMessage = {
        id: createSafeSessionId(),
        role: 'user',
        content: `/image [${aspectRatio}] ${cleanPrompt}`,
        createdAt: now,
      };
      const assistantPlaceholder: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        model: 'image-gen',
        createdAt: now,
        generatedImage: {
          id: imageItemId,
          prompt: cleanPrompt,
          aspectRatio,
          size,
          status: 'loading',
          createdAt: now,
        },
      };
      nextMessages = [...existing.messages, userMsg, assistantPlaceholder];
    }

    const derivedTitle =
      existing.title === 'New Dispatch'
        ? `IMG: ${cleanPrompt.slice(0, 42)}`
        : existing.title;

    chatSessionService.saveSession({
      ...existing,
      title: derivedTitle,
      updatedAt: now,
      messages: nextMessages,
    });
  }

  isGeneratingImage.set(true);
  try {
    const result = await generateImage({
      prompt: cleanPrompt,
      aspectRatio,
      size,
    });

    const latest = chatSessionService.getSession(targetThreadId);
    if (latest) {
      chatSessionService.saveSession({
        ...latest,
        updatedAt: result.createdAt,
        messages: latest.messages.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: result.revisedPrompt
                  ? `Generated image (${result.aspectRatio} · ${result.size}).`
                  : '',
                generatedImage: {
                  id: result.id,
                  prompt: cleanPrompt,
                  aspectRatio: result.aspectRatio,
                  size: result.size,
                  url: result.imageUrl,
                  revisedPrompt: result.revisedPrompt,
                  status: 'ready',
                  createdAt: result.createdAt,
                },
              }
            : m
        ),
      });
    }
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : 'Image generation failed.';
    const latest = chatSessionService.getSession(targetThreadId);
    if (latest) {
      chatSessionService.saveSession({
        ...latest,
        updatedAt: new Date().toISOString(),
        messages: latest.messages.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: '',
                generatedImage: {
                  id: imageItemId,
                  prompt: cleanPrompt,
                  aspectRatio,
                  size,
                  status: 'error',
                  error: errMessage,
                  createdAt: now,
                },
              }
            : m
        ),
      });
    }
  } finally {
    isGeneratingImage.set(false);
  }
}
