import { useState, useRef, useEffect } from 'react';
import {
  Brain,
  ChevronDown,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Mic,
  MicOff,
  Paperclip,
  Radio,
  SendHorizontal,
  Square,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type {
  ChatAttachment,
  ChatMessage,
  ChatThread,
  LLMProvider,
  MnemosyneMemory,
  RecalledContext,
  WorkspaceSettings,
} from '../types/index';
import { MarkdownRenderer } from './MarkdownRenderer';
import { blobToBase64 } from '../lib/audio';

interface ChatWorkspaceProps {
  thread: ChatThread | null;
  activeProvider: LLMProvider;
  activeModel: string;
  settings: WorkspaceSettings;
  onUpdateSettings: (updates: Partial<WorkspaceSettings>) => void;
  onCreateAndSend: (
    message: string,
    attachments: ChatAttachment[],
    options?: { regenerate?: boolean }
  ) => Promise<void>;
  streamingMessage: {
    content: string;
    reasoning: string;
    recalled?: RecalledContext;
    consolidated?: MnemosyneMemory[];
  } | null;
  isStreaming: boolean;
  onStopStreaming: () => void;
  onOpenLiveCall: () => void;
  onOpenMnemosyne: () => void;
}

const STARTER_PROMPTS = [
  {
    title: 'MNEMOSYNE MEMORY SYNC',
    prompt:
      'Review active directives in Mnemosyne OS and propose a modular architecture for a self-hosted voice terminal.',
  },
  {
    title: 'MULTIMODAL RECON',
    prompt:
      'Attach a system diagram, screenshot, or source file for a line-by-line tactical code and security audit.',
  },
  {
    title: 'REALTIME PIPELINE',
    prompt:
      'Compare WebSocket 16kHz PCM streaming against WebRTC for low-latency Deepgram + Fish Audio voice synthesis.',
  },
];

export function ChatWorkspace({
  thread,
  activeProvider,
  activeModel,
  settings,
  onUpdateSettings,
  onCreateAndSend,
  streamingMessage,
  isStreaming,
  onStopStreaming,
  onOpenLiveCall,
  onOpenMnemosyne,
}: ChatWorkspaceProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceAutoReply, setVoiceAutoReply] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedRecalls, setExpandedRecalls] = useState<Record<string, boolean>>({});
  const [expandedReasoning, setExpandedReasoning] = useState<Record<string, boolean>>({});
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastAutoSpokenIdRef = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread?.messages.length, streamingMessage?.content]);

  useEffect(() => {
    if (!voiceAutoReply || isStreaming || !thread || thread.messages.length === 0) return;
    const lastMsg = thread.messages[thread.messages.length - 1];
    if (
      lastMsg.role === 'assistant' &&
      lastMsg.content.trim() &&
      lastAutoSpokenIdRef.current !== lastMsg.id
    ) {
      lastAutoSpokenIdRef.current = lastMsg.id;
      void handlePlayTts(lastMsg.id, lastMsg.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread?.messages, isStreaming, voiceAutoReply]);

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files) return;
    const next: ChatAttachment[] = [];
    for (const file of Array.from(files)) {
      const isTextLike =
        file.type.startsWith('text/') ||
        /\.(md|txt|json|csv|ts|tsx|js|jsx|py|rs|go|yaml|yml|toml|sql|html|css)$/i.test(
          file.name
        );

      if (isTextLike) {
        const textContent = await file.text();
        next.push({
          id: crypto.randomUUID(),
          name: file.name,
          mimeType: file.type || 'text/plain',
          size: file.size,
          dataBase64: '',
          textContent: textContent.slice(0, 40000),
        });
      } else {
        const dataBase64 = await blobToBase64(file);
        const previewUrl = file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined;
        next.push({
          id: crypto.randomUUID(),
          name: file.name,
          mimeType: file.type || 'application/octet-stream',
          size: file.size,
          dataBase64,
          previewUrl,
        });
      }
    }
    setAttachments((prev) => [...prev, ...next]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;
    setErrorBanner(null);
    const textToSend = input.trim();
    const attached = [...attachments];
    setInput('');
    setAttachments([]);
    try {
      await onCreateAndSend(textToSend, attached);
    } catch (err) {
      setErrorBanner(err instanceof Error ? err.message : 'Failed to send dispatch');
    }
  };

  const toggleVoiceDictation = async () => {
    setErrorBanner(null);
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : undefined,
      });
      audioChunksRef.current = [];

      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        if (blob.size < 200) return;

        setIsTranscribing(true);
        try {
          const audioBase64 = await blobToBase64(blob);
          const res = await fetch('/api/stt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64,
              mimeType: blob.type || 'audio/webm',
              provider: settings.sttProvider,
            }),
          });
          const data = (await res.json()) as { transcript?: string; error?: string };
          if (!res.ok) {
            throw new Error(data.error || 'Transcription failed');
          }
          if (data.transcript) {
            setInput((prev) => (prev ? `${prev} ${data.transcript}` : data.transcript!));
          }
        } catch (err) {
          setErrorBanner(err instanceof Error ? err.message : 'Speech-to-text failed');
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setErrorBanner('Microphone permission required for voice comms.');
    }
  };

  const handlePlayTts = async (msgId: string, content: string) => {
    setErrorBanner(null);
    if (playingMessageId === msgId) {
      activeAudioRef.current?.pause();
      activeAudioRef.current = null;
      setPlayingMessageId(null);
      return;
    }

    activeAudioRef.current?.pause();
    setPlayingMessageId(msgId);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: content,
          provider: settings.ttsProvider,
        }),
      });
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || 'TTS synthesis failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      activeAudioRef.current = audio;
      audio.onended = () => {
        setPlayingMessageId(null);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setPlayingMessageId(null);
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch (err) {
      setPlayingMessageId(null);
      setErrorBanner(err instanceof Error ? err.message : 'TTS playback error');
    }
  };

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleRegenerate = async () => {
    if (!thread || thread.messages.length === 0 || isStreaming) return;
    const lastUser = [...thread.messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    await onCreateAndSend(lastUser.content, lastUser.attachments ?? [], {
      regenerate: true,
    });
  };

  const messages: ChatMessage[] = thread?.messages ?? [];

  return (
    <div
      className="flex-1 flex flex-col min-h-0 bg-[#0a0b08] relative font-mono"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        void handleFilesSelected(e.dataTransfer.files);
      }}
    >
      {/* Subtle CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-15 z-0" />

      {/* Messages Viewport */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && !streamingMessage ? (
            <div className="py-10 sm:py-16 space-y-8">
              <div className="bg-[#091517] border border-[#005a63]/50 rounded-lg p-6 relative shadow-[inset_0_0_20px_rgba(0,240,255,0.03)]">
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyber-cyan opacity-45" />
                <div className="text-[10px] tracking-widest text-cyber-cyan/70 uppercase mb-2">
                  Tactical Terminal Ready · Mnemosyne OS Online
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-cyber-cyan">
                  Self-hosted multimodal dispatch &amp; persistent memory node.
                </h1>
                <p className="text-xs sm:text-sm text-cyan-100/75 mt-2 leading-relaxed max-w-2xl">
                  Route inference across Gemini, NanoGPT, DeepSeek, or OpenAI. Configure your API
                  keys inside API Keys &amp; Audio, ground sessions in Mnemosyne OS, or launch a
                  full-duplex Live Comms channel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {STARTER_PROMPTS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setInput(item.prompt)}
                    className="text-left p-4 rounded-lg border border-olive-drab/45 bg-[#12140e] hover:border-olive-bright/70 hover:bg-[#171a12] transition-colors cursor-pointer flex flex-col justify-between gap-2"
                  >
                    <span className="text-[11px] font-bold tracking-widest text-olive-bright">
                      {item.title}
                    </span>
                    <span className="text-xs text-stone-400 leading-relaxed">
                      {item.prompt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const recalledCount =
                  (msg.recalled?.memories.length ?? 0) +
                  (msg.recalled?.vaultChunks.length ?? 0);
                const consolidatedCount = msg.consolidatedMemories?.length ?? 0;
                const recallOpen = expandedRecalls[msg.id] ?? false;
                const reasonOpen = expandedReasoning[msg.id] ?? false;
                const isLastAssistant = !isUser && idx === messages.length - 1;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col space-y-1.5 ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    {/* Sender Identity */}
                    <span className="text-[10px] tracking-widest text-stone-500 uppercase px-1">
                      {isUser
                        ? 'Operator'
                        : `AI Dispatch · ${msg.model || activeModel}`}
                    </span>

                    {isUser ? (
                      <div className="max-w-2xl bg-olive-drab/15 border border-olive-drab/45 text-stone-200 rounded-lg p-3.5 text-sm font-mono whitespace-pre-wrap">
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2.5">
                            {msg.attachments.map((att) => (
                              <div
                                key={att.id}
                                className="rounded overflow-hidden border border-olive-drab/50 bg-[#0d0e0a]"
                              >
                                {att.previewUrl ||
                                (att.mimeType.startsWith('image/') && att.dataBase64) ? (
                                  <img
                                    src={
                                      att.previewUrl ||
                                      `data:${att.mimeType};base64,${att.dataBase64}`
                                    }
                                    alt={att.name}
                                    referrerPolicy="no-referrer"
                                    className="max-h-48 max-w-[240px] object-cover"
                                  />
                                ) : (
                                  <div className="px-2.5 py-1.5 text-xs flex items-center gap-1.5 text-olive-bright">
                                    <FileText className="w-3.5 h-3.5" />
                                    <span className="truncate max-w-[160px]">{att.name}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        <div>{msg.content}</div>
                      </div>
                    ) : (
                      <div className="max-w-3xl w-full bg-[#091517] border border-[#005a63]/50 rounded-lg p-5 text-sm font-mono relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,240,255,0.03),0_0_15px_rgba(0,240,255,0.02)]">
                        {/* Corner Decorative Cyber Accent */}
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45" />

                        {/* Mnemosyne & Consolidation Strip */}
                        {(recalledCount > 0 || consolidatedCount > 0) && (
                          <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] text-cyber-cyan/75">
                            {recalledCount > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedRecalls((p) => ({ ...p, [msg.id]: !recallOpen }))
                                }
                                className="inline-flex items-center gap-1 hover:text-cyber-cyan cursor-pointer"
                              >
                                <Brain className="w-3.5 h-3.5" />
                                <span>
                                  MNEMOSYNE RECALLED {recalledCount}{' '}
                                  {recalledCount === 1 ? 'ITEM' : 'ITEMS'}
                                </span>
                                {recallOpen ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </button>
                            )}
                            {consolidatedCount > 0 && (
                              <button
                                type="button"
                                onClick={onOpenMnemosyne}
                                className="text-olive-bright hover:underline cursor-pointer"
                              >
                                +{consolidatedCount} MEMORY COMMITTED
                              </button>
                            )}
                          </div>
                        )}

                        {recallOpen && msg.recalled && (
                          <div className="mb-3 rounded border border-[#005a63]/50 bg-[#060f11] p-3 text-xs space-y-1.5">
                            {msg.recalled.memories.map((m) => (
                              <div key={m.id} className="text-cyan-100/80">
                                <span className="text-olive-bright uppercase mr-2">
                                  [{m.tier}]
                                </span>
                                <span>{m.content}</span>
                              </div>
                            ))}
                            {msg.recalled.vaultChunks.map((c) => (
                              <div key={c.id} className="text-cyan-200/60">
                                <span className="text-cyber-cyan mr-2">
                                  [{c.docTitle} #{c.index + 1}]
                                </span>
                                <span className="line-clamp-2">{c.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.reasoning && (
                          <div className="mb-3 rounded border border-[#005a63]/40 bg-[#060e10]">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedReasoning((p) => ({ ...p, [msg.id]: !reasonOpen }))
                              }
                              className="w-full px-3 py-1.5 flex items-center justify-between text-[11px] text-cyber-cyan/70 cursor-pointer"
                            >
                              <span>REASONING TRACE</span>
                              {reasonOpen ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </button>
                            {reasonOpen && (
                              <div className="px-3 pb-3 pt-2 border-t border-[#005a63]/30 text-xs text-cyan-200/70 whitespace-pre-wrap leading-relaxed">
                                {msg.reasoning}
                              </div>
                            )}
                          </div>
                        )}

                        <MarkdownRenderer content={msg.content} />

                        {/* Tactical Footer Actions */}
                        <div className="mt-4 pt-3 border-t border-[#005a63]/25 flex flex-wrap items-center justify-between gap-2 text-[10px] text-cyber-cyan/55">
                          <span className="uppercase tracking-wider">
                            {(msg.provider || activeProvider)} // {msg.model || activeModel}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => void handlePlayTts(msg.id, msg.content)}
                              className={`hover:text-cyber-cyan transition-colors cursor-pointer uppercase ${
                                playingMessageId === msg.id ? 'text-cyber-cyan font-bold' : ''
                              }`}
                            >
                              {playingMessageId === msg.id ? 'STOP AUDIO' : 'SPEAK'}
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleCopy(msg.id, msg.content)}
                              className="hover:text-cyber-cyan transition-colors cursor-pointer uppercase"
                            >
                              {copiedId === msg.id ? 'COPIED' : 'COPY'}
                            </button>
                            {isLastAssistant && !isStreaming && (
                              <button
                                type="button"
                                onClick={() => void handleRegenerate()}
                                className="hover:text-cyber-cyan transition-colors cursor-pointer uppercase"
                              >
                                REGEN
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Streaming AI Dispatch */}
              {streamingMessage && (
                <div className="flex flex-col space-y-1.5 items-start">
                  <span className="text-[10px] tracking-widest text-cyber-cyan/70 uppercase px-1">
                    AI Dispatch · Streaming ({activeModel})
                  </span>
                  <div className="max-w-3xl w-full bg-[#091517] border border-[#005a63]/60 rounded-lg p-5 text-sm font-mono relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,240,255,0.04)]">
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-60" />
                    {streamingMessage.recalled &&
                      streamingMessage.recalled.memories.length +
                        streamingMessage.recalled.vaultChunks.length >
                        0 && (
                        <div className="mb-2.5 text-[11px] text-cyber-cyan/75 inline-flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5" />
                          <span>
                            MNEMOSYNE ACTIVE (
                            {streamingMessage.recalled.memories.length +
                              streamingMessage.recalled.vaultChunks.length}
                            )
                          </span>
                        </div>
                      )}
                    {streamingMessage.reasoning && (
                      <div className="mb-3 rounded border border-[#005a63]/40 bg-[#060e10] p-3 text-xs text-cyan-200/70 whitespace-pre-wrap">
                        {streamingMessage.reasoning}
                      </div>
                    )}
                    <MarkdownRenderer
                      content={streamingMessage.content || 'Awaiting stream packets...'}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Error Banner */}
      {errorBanner && (
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pb-2 relative z-10">
          <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded border border-red-500/50 bg-red-950/50 text-xs text-red-300">
            <span>{errorBanner}</span>
            <button
              type="button"
              onClick={() => setErrorBanner(null)}
              className="p-0.5 hover:opacity-75 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* CONTROL INPUT (Fixed Bottom Console) */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-4 pt-2 relative z-10">
        <div className="relative bg-[#141710] border border-olive-drab/50 focus-within:border-olive-bright rounded-lg p-2 transition-all shadow-[0_0_15px_rgba(76,88,54,0.1)]">
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-2.5 py-1 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs"
                >
                  {att.previewUrl ? (
                    <ImageIcon className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-olive-bright shrink-0" />
                  )}
                  <span className="truncate max-w-[140px] text-stone-300">{att.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(att.id)}
                    className="text-stone-500 hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Action Buttons */}
            <div className="flex items-center gap-1 pb-0.5">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,audio/*,application/pdf,.txt,.md,.json,.csv,.ts,.tsx,.js,.py"
                className="hidden"
                onChange={(e) => {
                  void handleFilesSelected(e.target.files);
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 rounded transition-colors cursor-pointer"
                title="Attach Files"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => void toggleVoiceDictation()}
                className={`p-2 rounded transition-colors cursor-pointer ${
                  isRecording
                    ? 'bg-red-500/20 text-red-400'
                    : 'text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15'
                }`}
                title={`Voice Dictation (${settings.sttProvider})`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({ useMnemosyneInChat: !settings.useMnemosyneInChat })
                }
                title="Toggle Mnemosyne OS memory"
                className={`p-2 rounded transition-colors cursor-pointer ${
                  settings.useMnemosyneInChat
                    ? 'text-olive-bright bg-olive-drab/20'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                <Brain className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setVoiceAutoReply((v) => !v)}
                title="Auto-Speak Replies"
                className={`p-2 rounded transition-colors cursor-pointer ${
                  voiceAutoReply
                    ? 'text-cyber-cyan bg-[#091517]'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                {voiceAutoReply ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Text Input */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              rows={1}
              placeholder={
                isTranscribing
                  ? 'Transcribing audio packet...'
                  : 'Awaiting dispatch...'
              }
              className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-sm py-2 text-stone-200 placeholder-stone-600 font-mono resize-none max-h-36"
            />

            <button
              type="button"
              onClick={onOpenLiveCall}
              title="Open Live Voice Comms"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#005a63]/50 bg-[#091517] hover:border-cyber-cyan/70 text-cyber-cyan text-[11px] font-bold tracking-wider cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>COMMS</span>
            </button>

            {isStreaming ? (
              <button
                type="button"
                onClick={onStopStreaming}
                className="bg-red-900/50 hover:bg-red-800/70 text-red-200 px-4 py-2 rounded text-xs font-bold tracking-widest flex items-center gap-2 border border-red-500/40 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5" />
                <span>ABORT</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={!input.trim() && attachments.length === 0}
                className="bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 px-4 py-2 rounded text-xs font-bold tracking-widest flex items-center gap-2 border border-olive-bright/30 transition-all hover:shadow-[0_0_10px_rgba(143,168,92,0.3)] cursor-pointer"
              >
                <span>SEND</span>
                <SendHorizontal className="w-3.5 h-3.5 text-olive-bright" />
              </button>
            )}
          </div>
        </div>

        {/* Utility Readout */}
        <div className="flex justify-between text-[10px] text-stone-600 px-2 mt-2 font-mono tracking-wider uppercase">
          <span>
            STT: {settings.sttProvider} · TTS: {settings.ttsProvider}
          </span>
          <span>
            MNEMOSYNE: {settings.useMnemosyneInChat ? 'ENGAGED' : 'BYPASSED'}
          </span>
        </div>
      </div>
    </div>
  );
}
