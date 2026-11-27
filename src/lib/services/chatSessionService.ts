import type {
  ChatAttachment,
  ChatMessage,
  ChatThread,
  GeneratedImageItem,
  ImageAspectRatio,
  LLMProvider,
  SearchProvider,
  WebSearchSource,
} from '../../types/index';
import { generateUUID } from '#lib/uuid';

export type ChatSession = ChatThread;

export type SessionStorageMode = 'localStorage' | 'memory';

export interface SessionStorageStatus {
  mode: SessionStorageMode;
  fallbackReason: string | null;
  updatedAt: string;
}

export interface RemoteSyncResult {
  ok: boolean;
  status: 'stub' | 'synced' | 'error';
  message: string;
  sessions?: ChatSession[];
  syncedAt?: string;
}

/**
 * Pluggable remote sync contract so Hetzner Storage Box (WebDAV / mounted API / S3)
 * can be attached later without modifying Sidebar or UI components.
 */
export interface RemoteSessionSyncAdapter {
  readonly name: string;
  syncUp(sessions: ChatSession[]): Promise<RemoteSyncResult>;
  pullDown(): Promise<RemoteSyncResult>;
}

interface PersistedSessionsEnvelope {
  version: 1;
  updatedAt: string;
  sessions: ChatSession[];
}

const SESSIONS_STORAGE_KEY = 'pheonikz:chat_sessions:v1';
const ACTIVE_SESSION_STORAGE_KEY = 'pheonikz:active_session_id:v1';
const VALID_PROVIDERS: ReadonlySet<LLMProvider> = new Set([
  'gemini',
  'nanogpt',
  'deepseek',
  'openai',
]);
const VALID_SEARCH_PROVIDERS: ReadonlySet<SearchProvider> = new Set([
  'gemini-native',
  'searxng',
  'brave',
  'tavily',
  'custom',
  'parallel',
]);
const VALID_ASPECT_RATIOS: ReadonlySet<ImageAspectRatio> = new Set([
  '1:1',
  '16:9',
  '9:16',
  '4:3',
  '3:4',
]);

/**
 * Safe ID helper that never calls `crypto.randomUUID()` directly,
 * ensuring compatibility over plain HTTP (`http://`) contexts.
 */
export function createSafeSessionId(): string {
  return generateUUID();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toIsoDate(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
  }
  return fallback;
}

function sanitizeProvider(value: unknown): LLMProvider {
  if (typeof value === 'string' && VALID_PROVIDERS.has(value as LLMProvider)) {
    return value as LLMProvider;
  }
  return 'gemini';
}

function sanitizeAttachment(raw: unknown): ChatAttachment | null {
  if (!isRecord(raw)) return null;
  const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : 'attachment';
  const mimeType =
    typeof raw.mimeType === 'string' && raw.mimeType.trim()
      ? raw.mimeType.trim()
      : 'application/octet-stream';
  return {
    id:
      typeof raw.id === 'string' && raw.id.trim()
        ? raw.id.trim()
        : createSafeSessionId(),
    name,
    mimeType,
    size: typeof raw.size === 'number' && Number.isFinite(raw.size) ? Math.max(0, raw.size) : 0,
    dataBase64: typeof raw.dataBase64 === 'string' ? raw.dataBase64 : '',
    previewUrl: typeof raw.previewUrl === 'string' ? raw.previewUrl : undefined,
    textContent: typeof raw.textContent === 'string' ? raw.textContent : undefined,
  };
}

function sanitizeWebSource(raw: unknown): WebSearchSource | null {
  if (!isRecord(raw)) return null;
  if (typeof raw.url !== 'string' || !raw.url.trim()) return null;
  return {
    title: typeof raw.title === 'string' && raw.title.trim() ? raw.title.trim() : raw.url.trim(),
    url: raw.url.trim(),
    publishDate:
      typeof raw.publishDate === 'string' || raw.publishDate === null
        ? raw.publishDate
        : undefined,
    excerpt: typeof raw.excerpt === 'string' ? raw.excerpt : '',
    provider: typeof raw.provider === 'string' ? raw.provider : undefined,
  };
}

function sanitizeMessage(raw: unknown): ChatMessage | null {
  if (!isRecord(raw)) return null;
  const role = raw.role === 'user' || raw.role === 'assistant' ? raw.role : null;
  if (!role) return null;

  const now = new Date().toISOString();
  const attachments = Array.isArray(raw.attachments)
    ? raw.attachments
        .map(sanitizeAttachment)
        .filter((a): a is ChatAttachment => a !== null)
    : undefined;

  const webSources = Array.isArray(raw.webSources)
    ? raw.webSources
        .map(sanitizeWebSource)
        .filter((s): s is WebSearchSource => s !== null)
    : undefined;

  const msg: ChatMessage = {
    id:
      typeof raw.id === 'string' && raw.id.trim()
        ? raw.id.trim()
        : createSafeSessionId(),
    role,
    content: typeof raw.content === 'string' ? raw.content : '',
    createdAt: toIsoDate(raw.createdAt, now),
  };

  if (typeof raw.reasoning === 'string' && raw.reasoning.length > 0) {
    msg.reasoning = raw.reasoning;
  }
  if (attachments && attachments.length > 0) {
    msg.attachments = attachments;
  }
  if (typeof raw.model === 'string' && raw.model.trim()) {
    msg.model = raw.model.trim();
  }
  if (typeof raw.provider === 'string' && VALID_PROVIDERS.has(raw.provider as LLMProvider)) {
    msg.provider = raw.provider as LLMProvider;
  }
  if (isRecord(raw.recalled) && Array.isArray(raw.recalled.memories) && Array.isArray(raw.recalled.vaultChunks)) {
    msg.recalled = raw.recalled as unknown as ChatMessage['recalled'];
  }
  if (Array.isArray(raw.consolidatedMemories)) {
    msg.consolidatedMemories = raw.consolidatedMemories as ChatMessage['consolidatedMemories'];
  }
  if (typeof raw.webSearchQuery === 'string' && raw.webSearchQuery.trim()) {
    msg.webSearchQuery = raw.webSearchQuery.trim();
  }
  if (
    typeof raw.webSearchProvider === 'string' &&
    VALID_SEARCH_PROVIDERS.has(raw.webSearchProvider as SearchProvider)
  ) {
    msg.webSearchProvider = raw.webSearchProvider as SearchProvider;
  }
  if (webSources && webSources.length > 0) {
    msg.webSources = webSources;
  }
  if (isRecord(raw.generatedImage)) {
    const g = raw.generatedImage;
    const status =
      g.status === 'loading' || g.status === 'ready' || g.status === 'error'
        ? g.status
        : 'error';
    const aspectRatio =
      typeof g.aspectRatio === 'string' && VALID_ASPECT_RATIOS.has(g.aspectRatio as ImageAspectRatio)
        ? (g.aspectRatio as ImageAspectRatio)
        : '1:1';
    const cleanImg: GeneratedImageItem = {
      id: typeof g.id === 'string' && g.id.trim() ? g.id.trim() : createSafeSessionId(),
      prompt: typeof g.prompt === 'string' ? g.prompt : '',
      aspectRatio,
      size: typeof g.size === 'string' && g.size.trim() ? g.size.trim() : '1024x1024',
      status,
      createdAt: toIsoDate(g.createdAt, now),
    };
    if (typeof g.url === 'string' && g.url.trim()) {
      cleanImg.url = g.url.trim();
    }
    if (typeof g.revisedPrompt === 'string' && g.revisedPrompt.trim()) {
      cleanImg.revisedPrompt = g.revisedPrompt.trim();
    }
    if (typeof g.error === 'string' && g.error.trim()) {
      cleanImg.error = g.error.trim();
    }
    msg.generatedImage = cleanImg;
  }

  return msg;
}

function sanitizeSession(raw: unknown): ChatSession | null {
  if (!isRecord(raw)) return null;
  const now = new Date().toISOString();
  const id =
    typeof raw.id === 'string' && raw.id.trim()
      ? raw.id.trim()
      : createSafeSessionId();
  const title =
    typeof raw.title === 'string' && raw.title.trim()
      ? raw.title.trim().slice(0, 160)
      : 'New Dispatch';
  const provider = sanitizeProvider(raw.provider);
  const model =
    typeof raw.model === 'string' && raw.model.trim()
      ? raw.model.trim()
      : 'gemini-4-hydrogen';
  const createdAt = toIsoDate(raw.createdAt, now);
  const updatedAt = toIsoDate(raw.updatedAt, createdAt);
  const messages = Array.isArray(raw.messages)
    ? raw.messages
        .map(sanitizeMessage)
        .filter((m): m is ChatMessage => m !== null)
    : [];

  return {
    id,
    title,
    provider,
    model,
    createdAt,
    updatedAt,
    messages,
  };
}

function cloneSession(session: ChatSession): ChatSession {
  return {
    ...session,
    messages: session.messages.map((m) => ({
      ...m,
      attachments: m.attachments ? m.attachments.map((a) => ({ ...a })) : undefined,
      webSources: m.webSources ? m.webSources.map((s) => ({ ...s })) : undefined,
      generatedImage: m.generatedImage ? { ...m.generatedImage } : undefined,
    })),
  };
}

/**
 * Strip heavy binary attachment blobs before retrying a quota-exceeded localStorage write,
 * keeping full data intact in memory.
 */
function stripHeavyPayloadsForLocalCache(sessions: ChatSession[]): ChatSession[] {
  return sessions.map((session) => ({
    ...session,
    messages: session.messages.map((msg) => ({
      ...msg,
      attachments: msg.attachments?.map((att) => ({
        ...att,
        dataBase64: att.dataBase64.length > 4096 ? '' : att.dataBase64,
        previewUrl: undefined,
      })),
      generatedImage:
        msg.generatedImage &&
        msg.generatedImage.url &&
        msg.generatedImage.url.startsWith('data:image/') &&
        msg.generatedImage.url.length > 16384
          ? {
              ...msg.generatedImage,
              url: undefined,
              status: 'error' as const,
              error: 'Generated image cached in active tab memory only (exceeded localStorage quota).',
            }
          : msg.generatedImage,
    })),
  }));
}

function describeStorageError(err: unknown): string {
  if (err && typeof err === 'object') {
    const domErr = err as { name?: string; code?: number; message?: string };
    if (
      domErr.name === 'QuotaExceededError' ||
      domErr.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      domErr.code === 22 ||
      domErr.code === 1014
    ) {
      return 'Browser storage quota exceeded';
    }
    if (domErr.name === 'SecurityError') {
      return 'Browser storage blocked in private/restricted mode';
    }
    if (typeof domErr.message === 'string' && domErr.message.trim()) {
      return domErr.message.trim();
    }
  }
  return 'Browser localStorage unavailable';
}

export class ChatSessionService {
  private readonly storageKey: string;
  private readonly activeKey: string;
  private readonly memoryStore = new Map<string, ChatSession>();
  private activeSessionId: string | null = null;
  private storageStatus: SessionStorageStatus = {
    mode: 'localStorage',
    fallbackReason: null,
    updatedAt: new Date().toISOString(),
  };
  private initialized = false;
  private remoteAdapter: RemoteSessionSyncAdapter | null = null;
  private readonly sessionListeners = new Set<(sessions: ChatSession[]) => void>();
  private readonly statusListeners = new Set<(status: SessionStorageStatus) => void>();

  constructor(
    storageKey = SESSIONS_STORAGE_KEY,
    activeKey = ACTIVE_SESSION_STORAGE_KEY
  ) {
    this.storageKey = storageKey;
    this.activeKey = activeKey;
  }

  private getSafeLocalStorage(): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const storage = window.localStorage;
      if (!storage) return null;
      const probeKey = `${this.storageKey}:__probe__`;
      storage.setItem(probeKey, '1');
      storage.removeItem(probeKey);
      return storage;
    } catch (err) {
      this.enterMemoryFallback(describeStorageError(err));
      return null;
    }
  }

  private enterMemoryFallback(reason: string): void {
    const changed =
      this.storageStatus.mode !== 'memory' ||
      this.storageStatus.fallbackReason !== reason;
    this.storageStatus = {
      mode: 'memory',
      fallbackReason: reason,
      updatedAt: new Date().toISOString(),
    };
    if (changed) {
      this.notifyStatusListeners();
    }
  }

  private markLocalStorageHealthy(): void {
    if (this.storageStatus.mode !== 'localStorage' || this.storageStatus.fallbackReason !== null) {
      this.storageStatus = {
        mode: 'localStorage',
        fallbackReason: null,
        updatedAt: new Date().toISOString(),
      };
      this.notifyStatusListeners();
    }
  }

  private ensureInitialized(): void {
    if (this.initialized) return;
    this.initialized = true;

    if (typeof window === 'undefined') {
      return;
    }

    const storage = this.getSafeLocalStorage();
    if (!storage) {
      return;
    }

    try {
      const raw = storage.getItem(this.storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        let rawList: unknown[] = [];

        if (Array.isArray(parsed)) {
          rawList = parsed;
        } else if (isRecord(parsed) && Array.isArray(parsed.sessions)) {
          rawList = parsed.sessions;
        }

        for (const item of rawList) {
          const clean = sanitizeSession(item);
          if (clean) {
            this.memoryStore.set(clean.id, clean);
          }
        }
      }
    } catch {
      // Corrupted JSON in localStorage: clear safely without crashing
      try {
        storage.removeItem(this.storageKey);
      } catch {
        this.enterMemoryFallback('Unable to reset corrupted browser storage');
      }
    }

    try {
      const storedActiveId = storage.getItem(this.activeKey);
      if (storedActiveId && this.memoryStore.has(storedActiveId)) {
        this.activeSessionId = storedActiveId;
      }
    } catch {
      // Ignore active pointer read error
    }
  }

  private persistToBrowser(): void {
    if (typeof window === 'undefined') return;
    if (this.storageStatus.mode === 'memory') {
      // Re-probe localStorage lightly in case space was freed; stay in memory if still blocked
      const probe = this.getSafeLocalStorage();
      if (!probe) return;
    }

    let storage: Storage;
    try {
      storage = window.localStorage;
      if (!storage) {
        this.enterMemoryFallback('Browser localStorage unavailable');
        return;
      }
    } catch (err) {
      this.enterMemoryFallback(describeStorageError(err));
      return;
    }

    const sessions = this.getSortedSessions();
    const envelope: PersistedSessionsEnvelope = {
      version: 1,
      updatedAt: new Date().toISOString(),
      sessions,
    };

    try {
      storage.setItem(this.storageKey, JSON.stringify(envelope));
      if (this.activeSessionId) {
        storage.setItem(this.activeKey, this.activeSessionId);
      } else {
        storage.removeItem(this.activeKey);
      }
      this.markLocalStorageHealthy();
    } catch (err) {
      // Retry once after stripping heavy inline base64 attachment payloads
      try {
        const slimEnvelope: PersistedSessionsEnvelope = {
          version: 1,
          updatedAt: new Date().toISOString(),
          sessions: stripHeavyPayloadsForLocalCache(sessions),
        };
        storage.setItem(this.storageKey, JSON.stringify(slimEnvelope));
        this.markLocalStorageHealthy();
      } catch (retryErr) {
        this.enterMemoryFallback(describeStorageError(retryErr ?? err));
      }
    }
  }

  private getSortedSessions(): ChatSession[] {
    return Array.from(this.memoryStore.values())
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      .map(cloneSession);
  }

  private notifySessionListeners(): void {
    const snapshot = this.getSortedSessions();
    for (const listener of this.sessionListeners) {
      try {
        listener(snapshot);
      } catch {
        // Isolate subscriber errors
      }
    }
  }

  private notifyStatusListeners(): void {
    const snapshot = { ...this.storageStatus };
    for (const listener of this.statusListeners) {
      try {
        listener(snapshot);
      } catch {
        // Isolate subscriber errors
      }
    }
  }

  /**
   * Lists all saved chat sessions sorted by most recently updated.
   */
  listSessions(): ChatSession[] {
    this.ensureInitialized();
    return this.getSortedSessions();
  }

  /**
   * Retrieves a single chat session by ID, or null if not found.
   */
  getSession(id: string): ChatSession | null {
    this.ensureInitialized();
    if (!id) return null;
    const found = this.memoryStore.get(id);
    return found ? cloneSession(found) : null;
  }

  /**
   * Creates or updates a chat session locally (with safe ID assignment and fallback).
   */
  saveSession(session: Partial<ChatSession> & { id?: string }): ChatSession {
    this.ensureInitialized();
    const now = new Date().toISOString();
    const existing = session.id ? this.memoryStore.get(session.id) : undefined;
    const clean = sanitizeSession({
      ...existing,
      ...session,
      id: session.id?.trim() || existing?.id || createSafeSessionId(),
      createdAt: session.createdAt || existing?.createdAt || now,
      updatedAt: session.updatedAt || now,
      messages: session.messages ?? existing?.messages ?? [],
    });

    const finalSession =
      clean ??
      ({
        id: createSafeSessionId(),
        title: 'New Dispatch',
        provider: 'gemini',
        model: 'gemini-4-hydrogen',
        createdAt: now,
        updatedAt: now,
        messages: [],
      } satisfies ChatSession);

    this.memoryStore.set(finalSession.id, finalSession);
    this.persistToBrowser();
    this.notifySessionListeners();
    return cloneSession(finalSession);
  }

  /**
   * Merges server/remote sessions into local storage (matching IDs update to newest).
   */
  mergeSessions(incoming: ChatSession[]): ChatSession[] {
    this.ensureInitialized();
    for (const raw of incoming) {
      const clean = sanitizeSession(raw);
      if (!clean) continue;
      const existing = this.memoryStore.get(clean.id);
      if (!existing) {
        this.memoryStore.set(clean.id, clean);
      } else {
        const incomingTime = Date.parse(clean.updatedAt) || 0;
        const existingTime = Date.parse(existing.updatedAt) || 0;
        if (incomingTime >= existingTime || clean.messages.length >= existing.messages.length) {
          this.memoryStore.set(clean.id, clean);
        }
      }
    }
    this.persistToBrowser();
    this.notifySessionListeners();
    return this.getSortedSessions();
  }

  /**
   * Deletes a chat session by ID.
   */
  deleteSession(id: string): boolean {
    this.ensureInitialized();
    const existed = this.memoryStore.delete(id);
    if (this.activeSessionId === id) {
      const next = this.getSortedSessions()[0]?.id ?? null;
      this.activeSessionId = next;
    }
    if (existed) {
      this.persistToBrowser();
      this.notifySessionListeners();
    }
    return existed;
  }

  getActiveSessionId(): string | null {
    this.ensureInitialized();
    if (this.activeSessionId && this.memoryStore.has(this.activeSessionId)) {
      return this.activeSessionId;
    }
    return this.getSortedSessions()[0]?.id ?? null;
  }

  setActiveSessionId(id: string | null): void {
    this.ensureInitialized();
    this.activeSessionId = id && this.memoryStore.has(id) ? id : id;
    if (typeof window === 'undefined') return;
    try {
      if (this.storageStatus.mode === 'localStorage' && window.localStorage) {
        if (this.activeSessionId) {
          window.localStorage.setItem(this.activeKey, this.activeSessionId);
        } else {
          window.localStorage.removeItem(this.activeKey);
        }
      }
    } catch (err) {
      this.enterMemoryFallback(describeStorageError(err));
    }
  }

  getStorageStatus(): SessionStorageStatus {
    this.ensureInitialized();
    return { ...this.storageStatus };
  }

  subscribeSessions(listener: (sessions: ChatSession[]) => void): () => void {
    this.ensureInitialized();
    this.sessionListeners.add(listener);
    listener(this.getSortedSessions());
    return () => {
      this.sessionListeners.delete(listener);
    };
  }

  subscribeStatus(listener: (status: SessionStorageStatus) => void): () => void {
    this.ensureInitialized();
    this.statusListeners.add(listener);
    listener({ ...this.storageStatus });
    return () => {
      this.statusListeners.delete(listener);
    };
  }

  /**
   * Attaches a future remote storage adapter (e.g., Hetzner Storage Box WebDAV/REST)
   * without requiring any changes to Sidebar or UI components.
   */
  registerRemoteAdapter(adapter: RemoteSessionSyncAdapter | null): void {
    this.remoteAdapter = adapter;
  }

  /**
   * Optional stub hook for pushing local sessions up to Hetzner remote storage.
   */
  async syncUp(): Promise<RemoteSyncResult> {
    this.ensureInitialized();
    const sessions = this.getSortedSessions();
    if (this.remoteAdapter) {
      try {
        return await this.remoteAdapter.syncUp(sessions);
      } catch (err) {
        return {
          ok: false,
          status: 'error',
          message: err instanceof Error ? err.message : 'Remote syncUp failed.',
        };
      }
    }
    return {
      ok: false,
      status: 'stub',
      message: 'Hetzner remote syncUp hook ready (no remote adapter registered yet).',
      sessions,
    };
  }

  /**
   * Optional stub hook for pulling sessions down from Hetzner remote storage
   * and merging them safely into local persistence.
   */
  async pullDown(): Promise<RemoteSyncResult> {
    this.ensureInitialized();
    if (this.remoteAdapter) {
      try {
        const result = await this.remoteAdapter.pullDown();
        if (result.ok && Array.isArray(result.sessions)) {
          const merged = this.mergeSessions(result.sessions);
          return { ...result, sessions: merged };
        }
        return result;
      } catch (err) {
        return {
          ok: false,
          status: 'error',
          message: err instanceof Error ? err.message : 'Remote pullDown failed.',
        };
      }
    }
    return {
      ok: false,
      status: 'stub',
      message: 'Hetzner remote pullDown hook ready (no remote adapter registered yet).',
      sessions: this.getSortedSessions(),
    };
  }
}

export const chatSessionService = new ChatSessionService();
