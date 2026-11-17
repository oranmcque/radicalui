export type LLMProvider = 'gemini' | 'nanogpt' | 'deepseek' | 'openai';

export type MemoryTier = 'core' | 'episodic' | 'semantic' | 'procedural';

export type VoicePipelineMode = 'gemini-live' | 'modular';
export type STTProvider = 'deepgram' | 'gemini';
export type TTSProvider = 'fishaudio' | 'deepgram' | 'gemini';

export interface ModelOption {
  id: string;
  label: string;
  provider: LLMProvider;
  contextWindow: string;
  supportsVision: boolean;
  supportsAudio: boolean;
  supportsReasoning: boolean;
  description: string;
}

export interface ProviderStatus {
  id: string;
  name: string;
  category: 'llm' | 'stt' | 'tts' | 'realtime';
  envVar: string;
  configured: boolean;
  source?: 'env' | 'vault' | 'none';
  note: string;
}

export interface ChatAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  dataBase64: string; // raw base64 without data: prefix
  previewUrl?: string;
  textContent?: string;
}

export interface MnemosyneMemory {
  id: string;
  tier: MemoryTier;
  content: string;
  keywords: string[];
  salience: number; // 0.1 to 1.0
  pinned: boolean;
  sourceThreadId?: string;
  sourceType: 'chat' | 'live_call' | 'manual' | 'vault';
  createdAt: string;
  updatedAt: string;
}

export interface VaultChunk {
  id: string;
  docId: string;
  docTitle: string;
  index: number;
  text: string;
  keywords: string[];
}

export interface VaultDocument {
  id: string;
  title: string;
  mimeType: string;
  size: number;
  chunkCount: number;
  chunks: VaultChunk[];
  createdAt: string;
}

export interface RecalledContext {
  memories: MnemosyneMemory[];
  vaultChunks: VaultChunk[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  attachments?: ChatAttachment[];
  model?: string;
  provider?: LLMProvider;
  recalled?: RecalledContext;
  consolidatedMemories?: MnemosyneMemory[];
  createdAt: string;
}

export interface ChatThread {
  id: string;
  title: string;
  provider: LLMProvider;
  model: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface WorkspaceSettings {
  activeProvider: LLMProvider;
  activeModel: string;
  voicePipeline: VoicePipelineMode;
  sttProvider: STTProvider;
  ttsProvider: TTSProvider;
  fishVoiceId: string;
  deepgramSttModel: string;
  deepgramTtsVoice: string;
  geminiVoice: string;
  systemPrompt: string;
  autoConsolidateMemory: boolean;
  useMnemosyneInChat: boolean;
}

export interface AppStatePayload {
  threads: ChatThread[];
  memories: MnemosyneMemory[];
  vaultDocs: VaultDocument[];
  settings: WorkspaceSettings;
}
