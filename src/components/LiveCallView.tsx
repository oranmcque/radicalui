import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Brain,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  SendHorizontal,
  Square,
  Radio,
} from 'lucide-react';
import type {
  LLMProvider,
  MnemosyneMemory,
  VoicePipelineMode,
  WorkspaceSettings,
} from '../types/index';
import {
  GaplessPcmPlayer,
  blobToBase64,
  computeRms,
  float32ToPcm16Base64,
} from '../lib/audio';

interface LiveTranscriptItem {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: string;
}

interface LiveMemoryActivity {
  id: string;
  action: 'recall' | 'save';
  summary: string;
  timestamp: string;
}

interface LiveCallViewProps {
  settings: WorkspaceSettings;
  activeProvider: LLMProvider;
  activeModel: string;
  onUpdateSettings: (updates: Partial<WorkspaceSettings>) => void;
  onSavedThread: (threadId: string) => void;
  onRefreshState: () => Promise<void>;
}

export function LiveCallView({
  settings,
  activeProvider,
  activeModel,
  onUpdateSettings,
  onSavedThread,
  onRefreshState,
}: LiveCallViewProps) {
  const [pipeline, setPipeline] = useState<VoicePipelineMode>(settings.voicePipeline);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [vadState, setVadState] = useState<'listening' | 'speech' | 'processing' | 'speaking'>('listening');
  const [transcript, setTranscript] = useState<LiveTranscriptItem[]>([]);
  const [memoryFeed, setMemoryFeed] = useState<LiveMemoryActivity[]>([]);
  const [textInject, setTextInject] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [savingCall, setSavingCall] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const playerRef = useRef<GaplessPcmPlayer | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const videoIntervalRef = useRef<number | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const modularAudioRef = useRef<HTMLAudioElement | null>(null);
  const modularThreadIdRef = useRef<string | null>(null);

  const micMutedRef = useRef(false);
  const callStatusRef = useRef(callStatus);
  const pipelineRef = useRef(pipeline);
  micMutedRef.current = micMuted;
  callStatusRef.current = callStatus;
  pipelineRef.current = pipeline;

  useEffect(() => {
    if (callStatus !== 'connected') {
      setElapsedSeconds(0);
      return;
    }
    const timer = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [callStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const freqBuffer = new Uint8Array(64);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (callStatusRef.current === 'connected') {
        if (aiSpeaking && playerRef.current) {
          playerRef.current.getFrequencyData(freqBuffer);
        } else if (inputAnalyserRef.current && !micMutedRef.current) {
          inputAnalyserRef.current.getByteFrequencyData(freqBuffer);
        } else {
          freqBuffer.fill(4);
        }
      } else {
        freqBuffer.fill(4);
      }

      const barCount = 36;
      const gap = 5;
      const barWidth = (width - gap * (barCount - 1)) / barCount;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        const val = freqBuffer[i % freqBuffer.length] / 255;
        const barHeight = Math.max(4, val * (height * 0.78));
        const x = i * (barWidth + gap);
        ctx.fillStyle = aiSpeaking
          ? 'rgba(0, 240, 255, 0.9)'
          : callStatus === 'connected'
            ? 'rgba(143, 168, 92, 0.9)'
            : 'rgba(76, 88, 54, 0.4)';
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [aiSpeaking, callStatus]);

  const appendTranscript = useCallback((role: 'user' | 'assistant', chunk: string, replaceLast?: boolean) => {
    const text = chunk;
    if (!text) return;
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === role && !replaceLast) {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...last,
          text: `${last.text}${text}`,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          role,
          text: text.trimStart(),
          createdAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const stopCamera = useCallback(() => {
    if (videoIntervalRef.current) {
      window.clearInterval(videoIntervalRef.current);
      videoIntervalRef.current = null;
    }
    videoStreamRef.current?.getTracks().forEach((t) => t.stop());
    videoStreamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
  }, []);

  const cleanupCallResources = useCallback(async () => {
    stopCamera();
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    if (inputCtxRef.current && inputCtxRef.current.state !== 'closed') {
      await inputCtxRef.current.close();
      inputCtxRef.current = null;
    }
    if (playerRef.current) {
      await playerRef.current.close();
      playerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    modularAudioRef.current?.pause();
    modularAudioRef.current = null;
    setAiSpeaking(false);
  }, [stopCamera]);

  useEffect(() => {
    return () => {
      void cleanupCallResources();
    };
  }, [cleanupCallResources]);

  const handleInterrupt = () => {
    if (playerRef.current) {
      playerRef.current.interrupt();
    }
    if (modularAudioRef.current) {
      modularAudioRef.current.pause();
      modularAudioRef.current = null;
      setAiSpeaking(false);
      setVadState('listening');
    }
  };

  const runModularTurn = async (audioBlob: Blob) => {
    setVadState('processing');
    try {
      const audioBase64 = await blobToBase64(audioBlob);
      const sttRes = await fetch('/api/stt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          mimeType: audioBlob.type || 'audio/webm',
          provider: settings.sttProvider,
        }),
      });
      const sttData = (await sttRes.json()) as { transcript?: string; error?: string };
      if (!sttRes.ok) throw new Error(sttData.error || 'STT failed');
      const userText = (sttData.transcript || '').trim();
      if (!userText) {
        setVadState('listening');
        return;
      }

      setTranscript((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'user', text: userText, createdAt: new Date().toISOString() },
      ]);

      await executeModularLLMAndTTS(userText);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Modular voice turn failed');
      setVadState('listening');
    }
  };

  const executeModularLLMAndTTS = async (userText: string) => {
    setVadState('processing');
    if (!modularThreadIdRef.current) {
      const tRes = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: activeProvider,
          model: activeModel,
          title: `Comms · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        }),
      });
      const tData = (await tRes.json()) as { id: string };
      modularThreadIdRef.current = tData.id;
    }

    const chatRes = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        threadId: modularThreadIdRef.current,
        message: `${userText}\n\n(Note: Respond concisely as spoken voice dialogue.)`,
        provider: activeProvider,
        model: activeModel,
        useMnemosyne: true,
      }),
    });

    if (!chatRes.ok || !chatRes.body) {
      throw new Error('LLM stream failed');
    }

    const reader = chatRes.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let assistantReply = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith('data:')) continue;
        try {
          const ev = JSON.parse(line.slice(5).trim()) as {
            type: string;
            text?: string;
            recalled?: { memories: MnemosyneMemory[] };
            memories?: MnemosyneMemory[];
            message?: string;
          };
          if (ev.type === 'delta' && ev.text) {
            assistantReply += ev.text;
          } else if (ev.type === 'mnemosyne_recall' && ev.recalled?.memories.length) {
            setMemoryFeed((prev) => [
              {
                id: crypto.randomUUID(),
                action: 'recall',
                summary: `Recalled ${ev.recalled!.memories.length} memories for context`,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...prev,
            ]);
          } else if (ev.type === 'mnemosyne_consolidated' && ev.memories?.length) {
            setMemoryFeed((prev) => [
              {
                id: crypto.randomUUID(),
                action: 'save',
                summary: ev.memories![0].content,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...prev,
            ]);
          } else if (ev.type === 'error') {
            throw new Error(ev.message || 'Model error');
          }
        } catch {
          // ignore partial frames
        }
      }
    }

    if (!assistantReply.trim()) {
      setVadState('listening');
      return;
    }

    setTranscript((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: assistantReply,
        createdAt: new Date().toISOString(),
      },
    ]);

    setVadState('speaking');
    setAiSpeaking(true);
    const ttsRes = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: assistantReply,
        provider: settings.ttsProvider,
      }),
    });
    if (!ttsRes.ok) {
      const errData = (await ttsRes.json().catch(() => ({}))) as { error?: string };
      setAiSpeaking(false);
      setVadState('listening');
      throw new Error(errData.error || 'TTS failed');
    }
    const audioBlob = await ttsRes.blob();
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    modularAudioRef.current = audio;
    audio.onended = () => {
      setAiSpeaking(false);
      setVadState('listening');
      URL.revokeObjectURL(url);
    };
    audio.onerror = () => {
      setAiSpeaking(false);
      setVadState('listening');
      URL.revokeObjectURL(url);
    };
    await audio.play();
  };

  const startCall = async () => {
    setErrorMessage(null);
    setTranscript([]);
    setMemoryFeed([]);
    modularThreadIdRef.current = null;
    setCallStatus('connecting');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      micStreamRef.current = stream;

      const inputCtx = new AudioContext({ sampleRate: 16000 });
      inputCtxRef.current = inputCtx;
      const source = inputCtx.createMediaStreamSource(stream);
      const analyser = inputCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      inputAnalyserRef.current = analyser;

      if (pipeline === 'gemini-live') {
        const player = new GaplessPcmPlayer((speaking) => setAiSpeaking(speaking));
        await player.resume();
        playerRef.current = player;

        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(
          `${protocol}//${location.host}/ws/live-call?voice=${encodeURIComponent(settings.geminiVoice)}`
        );
        wsRef.current = ws;

        ws.onmessage = (ev) => {
          const msg = JSON.parse(ev.data) as {
            type: string;
            data?: string;
            text?: string;
            message?: string;
            action?: 'recall' | 'save';
            query?: string;
            memory?: MnemosyneMemory;
            memories?: MnemosyneMemory[];
          };

          if (msg.type === 'ready') {
            setCallStatus('connected');
          } else if (msg.type === 'audio' && msg.data) {
            player.enqueueBase64Pcm(msg.data);
          } else if (msg.type === 'interrupted') {
            player.interrupt();
          } else if (msg.type === 'input_transcript' && msg.text) {
            appendTranscript('user', msg.text);
          } else if (msg.type === 'output_transcript' && msg.text) {
            appendTranscript('assistant', msg.text);
          } else if (msg.type === 'mnemosyne_recall' && msg.memories?.length) {
            setMemoryFeed((prev) => [
              {
                id: crypto.randomUUID(),
                action: 'recall',
                summary: `Loaded ${msg.memories!.length} core & active memories`,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...prev,
            ]);
          } else if (msg.type === 'mnemosyne_event') {
            if (msg.action === 'recall') {
              setMemoryFeed((prev) => [
                {
                  id: crypto.randomUUID(),
                  action: 'recall',
                  summary: `Searched "${msg.query}" (${msg.memories?.length ?? 0} hits)`,
                  timestamp: new Date().toLocaleTimeString(),
                },
                ...prev,
              ]);
            } else if (msg.action === 'save' && msg.memory) {
              setMemoryFeed((prev) => [
                {
                  id: crypto.randomUUID(),
                  action: 'save',
                  summary: msg.memory!.content,
                  timestamp: new Date().toLocaleTimeString(),
                },
                ...prev,
              ]);
              void onRefreshState();
            }
          } else if (msg.type === 'error') {
            setErrorMessage(msg.message || 'Live Call error');
          }
        };

        ws.onerror = () => {
          setErrorMessage('WebSocket connection error.');
        };

        ws.onclose = () => {
          if (callStatusRef.current !== 'idle') {
            setCallStatus('idle');
            void cleanupCallResources();
          }
        };

        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        source.connect(processor);
        processor.connect(inputCtx.destination);

        processor.onaudioprocess = (e) => {
          if (micMutedRef.current) return;
          if (ws.readyState !== WebSocket.OPEN) return;
          const base64 = float32ToPcm16Base64(e.inputBuffer.getChannelData(0));
          ws.send(JSON.stringify({ audio: base64 }));
        };
      } else {
        setCallStatus('connected');
        setVadState('listening');

        let isSpeechActive = false;
        let lastSpeechTime = 0;
        let activeRecorder: MediaRecorder | null = null;
        let chunks: Blob[] = [];
        let isProcessingTurn = false;

        const beginSegment = () => {
          if (activeRecorder && activeRecorder.state === 'recording') return;
          chunks = [];
          const rec = new MediaRecorder(stream, {
            mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : undefined,
          });
          rec.ondataavailable = (ev) => {
            if (ev.data.size > 0) chunks.push(ev.data);
          };
          rec.onstop = async () => {
            const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
            if (blob.size > 800 && callStatusRef.current === 'connected') {
              isProcessingTurn = true;
              await runModularTurn(blob);
              isProcessingTurn = false;
            } else {
              setVadState('listening');
            }
          };
          activeRecorder = rec;
          rec.start();
        };

        const processor = inputCtx.createScriptProcessor(2048, 1, 1);
        processorRef.current = processor;
        source.connect(processor);
        processor.connect(inputCtx.destination);

        processor.onaudioprocess = (e) => {
          if (micMutedRef.current || isProcessingTurn || callStatusRef.current !== 'connected') {
            return;
          }
          const rms = computeRms(e.inputBuffer.getChannelData(0));
          const now = Date.now();
          if (rms > 0.025) {
            lastSpeechTime = now;
            if (!isSpeechActive) {
              isSpeechActive = true;
              setVadState('speech');
              if (modularAudioRef.current) {
                modularAudioRef.current.pause();
                modularAudioRef.current = null;
                setAiSpeaking(false);
              }
              beginSegment();
            }
          } else if (isSpeechActive && now - lastSpeechTime > 950) {
            isSpeechActive = false;
            if (activeRecorder && activeRecorder.state === 'recording') {
              activeRecorder.stop();
            }
          }
        };
      }
    } catch (err) {
      setCallStatus('idle');
      setErrorMessage(err instanceof Error ? err.message : 'Unable to start live comms');
      await cleanupCallResources();
    }
  };

  const endAndSaveCall = async () => {
    const capturedTranscript = [...transcript];
    const savedPipeline = pipeline;
    await cleanupCallResources();
    setCallStatus('idle');

    if (savedPipeline === 'modular' && modularThreadIdRef.current) {
      await onRefreshState();
      onSavedThread(modularThreadIdRef.current);
      return;
    }

    if (capturedTranscript.length > 0) {
      setSavingCall(true);
      try {
        const res = await fetch('/api/live-call/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript: capturedTranscript,
            memoriesCount: memoryFeed.length,
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { thread?: { id: string } };
          await onRefreshState();
          if (data.thread?.id) {
            onSavedThread(data.thread.id);
          }
        }
      } finally {
        setSavingCall(false);
      }
    }
  };

  const toggleCamera = async () => {
    if (cameraOn) {
      stopCamera();
      return;
    }
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360 },
      });
      videoStreamRef.current = camStream;
      if (videoRef.current) {
        videoRef.current.srcObject = camStream;
      }
      setCameraOn(true);

      const snapCanvas = document.createElement('canvas');
      snapCanvas.width = 640;
      snapCanvas.height = 360;
      const snapCtx = snapCanvas.getContext('2d');

      videoIntervalRef.current = window.setInterval(() => {
        if (
          pipelineRef.current !== 'gemini-live' ||
          callStatusRef.current !== 'connected' ||
          !wsRef.current ||
          wsRef.current.readyState !== WebSocket.OPEN ||
          !videoRef.current ||
          !snapCtx
        ) {
          return;
        }
        snapCtx.drawImage(videoRef.current, 0, 0, snapCanvas.width, snapCanvas.height);
        const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.65);
        const base64 = dataUrl.split(',')[1];
        if (base64) {
          wsRef.current.send(JSON.stringify({ video: base64 }));
        }
      }, 1000);
    } catch {
      setErrorMessage('Camera permission denied or unavailable.');
    }
  };

  const sendTextDuringCall = async () => {
    const text = textInject.trim();
    if (!text || callStatus !== 'connected') return;
    setTextInject('');

    if (pipeline === 'gemini-live' && wsRef.current?.readyState === WebSocket.OPEN) {
      setTranscript((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'user', text, createdAt: new Date().toISOString() },
      ]);
      wsRef.current.send(JSON.stringify({ text }));
    } else if (pipeline === 'modular') {
      setTranscript((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'user', text, createdAt: new Date().toISOString() },
      ]);
      await executeModularLLMAndTTS(text);
    }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 bg-[#0a0b08] relative font-mono">
      <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-15" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Call Header & Pipeline Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-olive-drab/40">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-olive-bright uppercase">
              Guerilla Live Comms
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              {pipeline === 'gemini-live'
                ? `GEMINI 3.8 LIVE · VOICE: ${settings.geminiVoice} · FULL-DUPLEX 16KHZ/24KHZ PCM`
                : `MODULAR LINK · STT: ${settings.sttProvider} → LLM: ${activeModel} → TTS: ${settings.ttsProvider}`}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded border border-olive-drab/45 bg-[#12140e] self-start">
            <button
              type="button"
              disabled={callStatus !== 'idle'}
              onClick={() => {
                setPipeline('gemini-live');
                onUpdateSettings({ voicePipeline: 'gemini-live' });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 ${
                pipeline === 'gemini-live'
                  ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              GEMINI LIVE
            </button>
            <button
              type="button"
              disabled={callStatus !== 'idle'}
              onClick={() => {
                setPipeline('modular');
                onUpdateSettings({ voicePipeline: 'modular' });
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 ${
                pipeline === 'modular'
                  ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              DEEPGRAM + FISH AUDIO
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="px-4 py-2.5 rounded border border-red-500/50 bg-red-950/50 text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Waveform, Camera & Tactical Controls */}
          <div className="lg:col-span-5 rounded-lg border border-olive-drab/45 bg-[#12140e] p-5 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between text-xs">
              <div className="inline-flex items-center gap-2">
                {callStatus === 'connected' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span className="font-bold uppercase tracking-wider text-olive-bright">
                  {callStatus === 'idle'
                    ? 'CHANNEL STANDBY'
                    : callStatus === 'connecting'
                      ? 'ESTABLISHING UPLINK...'
                      : aiSpeaking
                        ? 'AI TRANSMITTING'
                        : pipeline === 'modular'
                          ? `ACTIVE · ${vadState.toUpperCase()}`
                          : 'LISTENING'}
                </span>
              </div>
              <span className="font-mono tabular-nums text-cyber-cyan">
                {formatDuration(elapsedSeconds)}
              </span>
            </div>

            <div className="relative rounded border border-[#005a63]/50 bg-[#050b0c] overflow-hidden h-56 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraOn ? 'block' : 'hidden'}`}
              />
              {!cameraOn && (
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={160}
                  className="w-full h-36 px-6"
                />
              )}
              {cameraOn && (
                <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/75 border border-cyber-cyan/40 text-[10px] text-cyber-cyan">
                  1 FPS VISION FEED
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {callStatus === 'idle' ? (
                <button
                  type="button"
                  onClick={() => void startCall()}
                  className="px-5 py-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/40 text-stone-100 text-xs font-bold tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer uppercase shadow-[0_0_15px_rgba(143,168,92,0.2)]"
                >
                  <PhoneCall className="w-4 h-4 text-olive-bright" />
                  <span>Open Comms Channel</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setMicMuted((m) => !m)}
                    className={`p-3 rounded border transition-colors cursor-pointer ${
                      micMuted
                        ? 'border-red-500/50 bg-red-950/40 text-red-400'
                        : 'border-olive-drab/50 text-stone-200 hover:border-olive-bright'
                    }`}
                    title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
                  >
                    {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {pipeline === 'gemini-live' && (
                    <button
                      type="button"
                      onClick={() => void toggleCamera()}
                      className={`p-3 rounded border transition-colors cursor-pointer ${
                        cameraOn
                          ? 'border-cyber-cyan/60 bg-[#091517] text-cyber-cyan'
                          : 'border-olive-drab/50 text-stone-200 hover:border-olive-bright'
                      }`}
                      title="Toggle Camera Vision"
                    >
                      {cameraOn ? (
                        <Camera className="w-4 h-4" />
                      ) : (
                        <CameraOff className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  {aiSpeaking && (
                    <button
                      type="button"
                      onClick={handleInterrupt}
                      className="px-3.5 py-2.5 rounded border border-amber-500/50 bg-amber-950/30 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer uppercase"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>Interrupt</span>
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={savingCall}
                    onClick={() => void endAndSaveCall()}
                    className="px-4 py-2.5 rounded bg-red-900/70 hover:bg-red-800 border border-red-500/50 text-red-100 text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer uppercase"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>{savingCall ? 'SAVING...' : 'END & LOG'}</span>
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-olive-drab/25">
              <input
                type="text"
                disabled={callStatus !== 'connected'}
                value={textInject}
                onChange={(e) => setTextInject(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void sendTextDuringCall();
                }}
                placeholder={
                  callStatus === 'connected'
                    ? 'Inject text packet mid-call...'
                    : 'Open channel to inject text'
                }
                className="flex-1 px-3 py-2 text-xs rounded border border-olive-drab/45 bg-[#0d0e0a] text-stone-200 disabled:opacity-50 focus:outline-none focus:border-olive-bright"
              />
              <button
                type="button"
                disabled={callStatus !== 'connected' || !textInject.trim()}
                onClick={() => void sendTextDuringCall()}
                className="p-2 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-olive-bright border border-olive-bright/30 cursor-pointer"
              >
                <SendHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Live Transcript + Mnemosyne Live Feed */}
          <div className="lg:col-span-7 rounded-lg border border-[#005a63]/50 bg-[#091517] p-5 flex flex-col min-h-[420px] relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45" />
            <div className="flex items-center justify-between pb-3 border-b border-[#005a63]/35">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyber-cyan uppercase">
                <Radio className="w-4 h-4" />
                <span>Live Comms Transcript</span>
              </div>
              <span className="text-[11px] text-cyber-cyan/60 tabular-nums">
                {transcript.length} TURNS
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[300px]">
              {transcript.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-cyan-200/45 text-center px-6 py-12">
                  OPEN COMMS CHANNEL AND SPEAK. BARGE-IN INTERRUPT CLEARS QUEUED AUDIO IMMEDIATELY.
                </div>
              ) : (
                transcript.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="text-[10px] uppercase tracking-widest text-stone-500">
                      {item.role === 'user' ? 'Operator' : 'AI Dispatch'}
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        item.role === 'user' ? 'text-olive-bright' : 'text-cyan-100'
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#005a63]/35 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-bold text-olive-bright uppercase">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Mnemosyne OS Live Feed</span>
                </span>
                <span className="text-cyber-cyan/60 tabular-nums text-[11px]">
                  {memoryFeed.length} EVENTS
                </span>
              </div>
              {memoryFeed.length === 0 ? (
                <p className="text-[11px] text-cyan-200/45">
                  Live memory recalls and tool-committed facts appear here.
                </p>
              ) : (
                <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs">
                  {memoryFeed.map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-start justify-between gap-2 text-cyan-100/80"
                    >
                      <span>
                        <span
                          className={`uppercase mr-2 ${
                            ev.action === 'save' ? 'text-olive-bright' : 'text-cyber-cyan'
                          }`}
                        >
                          [{ev.action}]
                        </span>
                        {ev.summary}
                      </span>
                      <span className="text-[10px] text-stone-500 tabular-nums shrink-0">
                        {ev.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
