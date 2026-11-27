import crypto from 'crypto';
import type {
  AppStatePayload,
  ChatMessage,
  ChatThread,
  LLMProvider,
  MemoryTier,
  MnemosyneMemory,
  RecalledContext,
  VaultChunk,
  VaultDocument,
  WorkspaceSettings,
} from '../src/types/index.ts';
import {
  DEFAULT_STORE_FILE,
  readLocalOrMountedStoreRaw,
  writeFileAtomic,
  writeStoreRaw,
} from './storage.ts';

const DEFAULT_SETTINGS: WorkspaceSettings = {
  activeProvider: 'gemini',
  activeModel: 'gemini-4-hydrogen',
  voicePipeline: 'gemini-live',
  sttProvider: process.env.DEEPGRAM_API_KEY ? 'deepgram' : 'gemini',
  ttsProvider: process.env.FISHAUDIO_API_KEY ? 'fishaudio' : 'gemini',
  fishVoiceId: process.env.FISHAUDIO_DEFAULT_VOICE_ID || '',
  deepgramSttModel: 'nova-2',
  deepgramTtsVoice: 'aura-asteria-en',
  geminiVoice: 'Zephyr',
  systemPrompt:
    'You are Pheonikz UI, a self-hosted multimodal intelligence running inside Mnemosyne OS. Be direct, technically rigorous, and leverage recalled memories naturally without reciting memory IDs unless asked.',
  autoConsolidateMemory: true,
  useMnemosyneInChat: true,
  useWebSearchInChat: true,
  searchProvider: 'gemini-native',
  searxngBaseUrl: process.env.SEARXNG_BASE_URL || 'http://localhost:8888',
  customSearchUrl: process.env.CUSTOM_SEARCH_URL || '',
  customSearchMethod: 'GET',
  maxSearchResults: Math.min(20, Math.max(1, Number(process.env.MAX_SEARCH_RESULTS) || 5)),
};

export type VaultKeyProvider =
  | 'deepgram'
  | 'fishaudio'
  | 'nanogpt'
  | 'deepseek'
  | 'openai'
  | 'parallel'
  | 'brave'
  | 'tavily'
  | 'custom_search';

interface PersistedStore extends AppStatePayload {
  providerKeys?: Partial<Record<VaultKeyProvider, string>>;
}

function createInitialState(): PersistedStore {
  const now = new Date().toISOString();
  return {
    threads: [],
    memories: [
      {
        id: crypto.randomUUID(),
        tier: 'core',
        content:
          'Workspace runs Mnemosyne OS with multi-tier persistent memory (Core, Episodic, Semantic, Procedural) and supports flexible switching between Gemini, NanoGPT, DeepSeek, and OpenAI backends.',
        keywords: ['mnemosyne', 'workspace', 'gemini', 'nanogpt', 'deepseek', 'openai', 'memory'],
        salience: 0.95,
        pinned: true,
        sourceType: 'manual',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        tier: 'procedural',
        content:
          'When answering engineering or architecture questions, prefer concise explanations, runnable TypeScript/Python snippets, and explicit trade-offs.',
        keywords: ['engineering', 'architecture', 'typescript', 'python', 'concise', 'code'],
        salience: 0.85,
        pinned: true,
        sourceType: 'manual',
        createdAt: now,
        updatedAt: now,
      },
    ],
    vaultDocs: [],
    settings: { ...DEFAULT_SETTINGS },
  };
}

let cachedState: PersistedStore | null = null;

function parseStoreJson(raw: string): PersistedStore | null {
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedStore>;
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      threads: Array.isArray(parsed.threads) ? parsed.threads : [],
      memories: Array.isArray(parsed.memories) ? parsed.memories : [],
      vaultDocs: Array.isArray(parsed.vaultDocs) ? parsed.vaultDocs : [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      providerKeys: parsed.providerKeys ?? {},
    };
  } catch {
    return null;
  }
}

export function loadState(): PersistedStore {
  if (cachedState) return cachedState;
  const { raw } = readLocalOrMountedStoreRaw();
  if (raw) {
    const parsed = parseStoreJson(raw);
    if (parsed) {
      cachedState = parsed;
      return cachedState;
    }
  }
  cachedState = createInitialState();
  try {
    saveState(cachedState);
  } catch (err) {
    console.warn(
      'Initial workspace state could not be persisted to disk (continuing in-memory):',
      err instanceof Error ? err.message : err
    );
  }
  return cachedState;
}

export function saveState(state: PersistedStore): void {
  cachedState = state;
  writeStoreRaw(JSON.stringify(state, null, 2));
}

export function exportSerializedState(): string {
  return JSON.stringify(loadState(), null, 2);
}

export function reloadStateFromStorage(): PersistedStore {
  cachedState = null;
  return loadState();
}

export function replaceStateFromRawJson(raw: string): PersistedStore {
  const parsed = parseStoreJson(raw);
  if (!parsed) {
    throw new Error('Pulled remote data is not a valid Pheonikz UI / Mnemosyne store.');
  }
  cachedState = parsed;
  writeFileAtomic(DEFAULT_STORE_FILE, JSON.stringify(parsed, null, 2));
  return parsed;
}

const ENV_MAP: Record<VaultKeyProvider, string> = {
  deepgram: 'DEEPGRAM_API_KEY',
  fishaudio: 'FISHAUDIO_API_KEY',
  nanogpt: 'NANOGPT_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  openai: 'OPENAI_API_KEY',
  parallel: 'PARALLEL_API_KEY',
  brave: 'BRAVE_API_KEY',
  tavily: 'TAVILY_API_KEY',
  custom_search: 'CUSTOM_SEARCH_API_KEY',
};

export function resolveProviderKey(provider: VaultKeyProvider): {
  key: string;
  source: 'env' | 'vault' | 'none';
} {
  const state = loadState();
  const vaultVal = state.providerKeys?.[provider]?.trim();
  if (vaultVal) {
    return { key: vaultVal, source: 'vault' };
  }
  const envVal = process.env[ENV_MAP[provider]]?.trim();
  if (envVal) {
    return { key: envVal, source: 'env' };
  }
  return { key: '', source: 'none' };
}

export function setProviderKey(provider: VaultKeyProvider, key: string): void {
  const state = loadState();
  const nextKeys = { ...(state.providerKeys ?? {}) };
  const trimmed = key.trim();
  if (trimmed) {
    nextKeys[provider] = trimmed;
  } else {
    delete nextKeys[provider];
  }
  state.providerKeys = nextKeys;
  saveState(state);
}

export function getPublicAppState(): AppStatePayload {
  const { providerKeys: _omit, ...publicState } = loadState();
  return publicState;
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'can', 'this', 'that', 'these', 'those', 'it', 'its', 'my',
  'your', 'our', 'their', 'what', 'which', 'who', 'whom', 'how', 'when', 'where',
  'why', 'i', 'you', 'we', 'they', 'he', 'she', 'me', 'him', 'her', 'us', 'them',
  'about', 'into', 'than', 'then', 'so', 'if', 'not', 'no', 'yes', 'just', 'like',
]);

export function extractKeywords(text: string): string[] {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9_\-\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  return Array.from(new Set(tokens)).slice(0, 18);
}

/**
 * Mnemosyne OS Recall Engine
 * Ranks persistent memories and Knowledge Vault chunks by keyword overlap,
 * tier priority, salience score, pinned status, and recency.
 */
export function recallMnemosyneContext(
  query: string,
  limitMemories = 6,
  limitVaultChunks = 4
): RecalledContext {
  const state = loadState();
  const queryKeywords = extractKeywords(query);
  const queryLower = query.toLowerCase();

  const tierBoost: Record<MemoryTier, number> = {
    core: 0.35,
    procedural: 0.25,
    semantic: 0.2,
    episodic: 0.15,
  };

  const scoredMemories = state.memories.map((mem) => {
    const memText = mem.content.toLowerCase();
    let overlap = 0;
    for (const kw of queryKeywords) {
      if (mem.keywords.includes(kw) || memText.includes(kw)) {
        overlap += 1;
      }
    }
    const keywordScore =
      queryKeywords.length > 0 ? overlap / Math.max(1, Math.min(queryKeywords.length, 5)) : 0;
    const pinnedScore = mem.pinned ? 0.55 : 0;
    const ageDays = Math.max(
      0,
      (Date.now() - new Date(mem.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    const recencyScore = Math.max(0, 0.2 - ageDays * 0.01);
    const exactMatchBonus = queryLower.length > 4 && memText.includes(queryLower) ? 0.4 : 0;

    const total =
      keywordScore * 1.4 +
      pinnedScore +
      mem.salience * 0.4 +
      tierBoost[mem.tier] +
      recencyScore +
      exactMatchBonus;

    return { mem, score: total, hasOverlap: overlap > 0 };
  });

  const selectedMemories = scoredMemories
    .filter((item) => item.mem.pinned || item.hasOverlap || item.mem.tier === 'core')
    .sort((a, b) => b.score - a.score)
    .slice(0, limitMemories)
    .map((item) => item.mem);

  // Search Knowledge Vault chunks
  const allChunks: { chunk: VaultChunk; score: number }[] = [];
  for (const doc of state.vaultDocs) {
    for (const chunk of doc.chunks) {
      const chunkLower = chunk.text.toLowerCase();
      let overlap = 0;
      for (const kw of queryKeywords) {
        if (chunk.keywords.includes(kw) || chunkLower.includes(kw)) {
          overlap += 1;
        }
      }
      if (overlap > 0) {
        allChunks.push({
          chunk,
          score: overlap / Math.max(1, queryKeywords.length),
        });
      }
    }
  }

  const selectedChunks = allChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, limitVaultChunks)
    .map((item) => item.chunk);

  return {
    memories: selectedMemories,
    vaultChunks: selectedChunks,
  };
}

export function formatMnemosyneSystemBlock(recalled: RecalledContext): string {
  if (recalled.memories.length === 0 && recalled.vaultChunks.length === 0) {
    return '';
  }

  const lines: string[] = ['[MNEMOSYNE OS — ACTIVE MEMORY CONTEXT]'];
  if (recalled.memories.length > 0) {
    lines.push('Recalled Memories:');
    for (const m of recalled.memories) {
      lines.push(`- (${m.tier.toUpperCase()}${m.pinned ? ', PINNED' : ''}) ${m.content}`);
    }
  }
  if (recalled.vaultChunks.length > 0) {
    lines.push('\nKnowledge Vault Excerpts:');
    for (const c of recalled.vaultChunks) {
      lines.push(`- [${c.docTitle} #${c.index + 1}]: ${c.text}`);
    }
  }
  lines.push('[END MNEMOSYNE CONTEXT]');
  return lines.join('\n');
}

export function createThread(provider: LLMProvider, model: string, title?: string): ChatThread {
  const state = loadState();
  const now = new Date().toISOString();
  const thread: ChatThread = {
    id: crypto.randomUUID(),
    title: title || 'New Conversation',
    provider,
    model,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  state.threads.unshift(thread);
  saveState(state);
  return thread;
}

export function getThread(threadId: string): ChatThread | undefined {
  const state = loadState();
  return state.threads.find((t) => t.id === threadId);
}

export function updateThreadMeta(
  threadId: string,
  updates: Partial<Pick<ChatThread, 'title' | 'provider' | 'model'>>
): ChatThread | null {
  const state = loadState();
  const idx = state.threads.findIndex((t) => t.id === threadId);
  if (idx === -1) return null;
  state.threads[idx] = {
    ...state.threads[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveState(state);
  return state.threads[idx];
}

export function appendThreadMessage(threadId: string, message: ChatMessage): ChatThread | null {
  const state = loadState();
  const idx = state.threads.findIndex((t) => t.id === threadId);
  if (idx === -1) return null;
  state.threads[idx].messages.push(message);
  state.threads[idx].updatedAt = new Date().toISOString();

  // Auto-title on first user message
  if (
    state.threads[idx].title === 'New Conversation' &&
    message.role === 'user' &&
    message.content.trim().length > 0
  ) {
    const clean = message.content.replace(/\s+/g, ' ').trim();
    state.threads[idx].title = clean.length > 48 ? `${clean.slice(0, 48)}...` : clean;
  }

  saveState(state);
  return state.threads[idx];
}

export function deleteThread(threadId: string): boolean {
  const state = loadState();
  const prevLen = state.threads.length;
  state.threads = state.threads.filter((t) => t.id !== threadId);
  if (state.threads.length !== prevLen) {
    saveState(state);
    return true;
  }
  return false;
}

export function addMemory(input: {
  tier: MemoryTier;
  content: string;
  salience?: number;
  pinned?: boolean;
  sourceThreadId?: string;
  sourceType: 'chat' | 'live_call' | 'manual' | 'vault';
}): MnemosyneMemory {
  const state = loadState();
  const normalized = input.content.trim();
  // Deduplicate exact or near-identical memories
  const existing = state.memories.find(
    (m) => m.content.toLowerCase() === normalized.toLowerCase()
  );
  if (existing) {
    existing.updatedAt = new Date().toISOString();
    existing.salience = Math.min(1, Math.max(existing.salience, input.salience ?? 0.7));
    saveState(state);
    return existing;
  }

  const now = new Date().toISOString();
  const memory: MnemosyneMemory = {
    id: crypto.randomUUID(),
    tier: input.tier,
    content: normalized,
    keywords: extractKeywords(normalized),
    salience: Math.min(1, Math.max(0.1, input.salience ?? 0.7)),
    pinned: Boolean(input.pinned),
    sourceThreadId: input.sourceThreadId,
    sourceType: input.sourceType,
    createdAt: now,
    updatedAt: now,
  };
  state.memories.unshift(memory);
  saveState(state);
  return memory;
}

export function updateMemory(
  id: string,
  updates: Partial<Pick<MnemosyneMemory, 'tier' | 'content' | 'salience' | 'pinned'>>
): MnemosyneMemory | null {
  const state = loadState();
  const idx = state.memories.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  const nextContent = updates.content !== undefined ? updates.content.trim() : state.memories[idx].content;
  state.memories[idx] = {
    ...state.memories[idx],
    ...updates,
    content: nextContent,
    keywords: extractKeywords(nextContent),
    updatedAt: new Date().toISOString(),
  };
  saveState(state);
  return state.memories[idx];
}

export function deleteMemory(id: string): boolean {
  const state = loadState();
  const prev = state.memories.length;
  state.memories = state.memories.filter((m) => m.id !== id);
  if (state.memories.length !== prev) {
    saveState(state);
    return true;
  }
  return false;
}

export function addVaultDocument(title: string, mimeType: string, contentText: string): VaultDocument {
  const state = loadState();
  const docId = crypto.randomUUID();
  const cleanText = contentText.replace(/\r\n/g, '\n').trim();
  const chunkSize = 800;
  const overlap = 120;
  const chunks: VaultChunk[] = [];

  if (cleanText.length <= chunkSize) {
    chunks.push({
      id: crypto.randomUUID(),
      docId,
      docTitle: title,
      index: 0,
      text: cleanText,
      keywords: extractKeywords(cleanText),
    });
  } else {
    let start = 0;
    let index = 0;
    while (start < cleanText.length) {
      const slice = cleanText.slice(start, start + chunkSize);
      chunks.push({
        id: crypto.randomUUID(),
        docId,
        docTitle: title,
        index,
        text: slice,
        keywords: extractKeywords(slice),
      });
      index += 1;
      start += chunkSize - overlap;
    }
  }

  const doc: VaultDocument = {
    id: docId,
    title,
    mimeType,
    size: Buffer.byteLength(cleanText, 'utf-8'),
    chunkCount: chunks.length,
    chunks,
    createdAt: new Date().toISOString(),
  };

  state.vaultDocs.unshift(doc);
  saveState(state);
  return doc;
}

export function deleteVaultDocument(id: string): boolean {
  const state = loadState();
  const prev = state.vaultDocs.length;
  state.vaultDocs = state.vaultDocs.filter((d) => d.id !== id);
  if (state.vaultDocs.length !== prev) {
    saveState(state);
    return true;
  }
  return false;
}

export function updateSettings(updates: Partial<WorkspaceSettings>): WorkspaceSettings {
  const state = loadState();
  const next: WorkspaceSettings = { ...state.settings, ...updates };
  if (typeof updates.maxSearchResults === 'number' && Number.isFinite(updates.maxSearchResults)) {
    next.maxSearchResults = Math.min(20, Math.max(1, Math.round(updates.maxSearchResults)));
  }
  if (typeof updates.searxngBaseUrl === 'string') {
    next.searxngBaseUrl = updates.searxngBaseUrl.trim() || 'http://localhost:8888';
  }
  if (typeof updates.customSearchUrl === 'string') {
    next.customSearchUrl = updates.customSearchUrl.trim();
  }
  if (updates.customSearchMethod !== undefined) {
    next.customSearchMethod = updates.customSearchMethod === 'POST' ? 'POST' : 'GET';
  }
  state.settings = next;
  saveState(state);
  return state.settings;
}
