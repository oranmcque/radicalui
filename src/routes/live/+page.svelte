<script lang="ts">
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import {
    Brain,
    Camera,
    CameraOff,
    Mic,
    MicOff,
    PhoneCall,
    PhoneOff,
    Radio,
    SendHorizontal,
    Square,
  } from 'lucide-svelte';
  import {
    GaplessPcmPlayer,
    blobToBase64,
    computeRms,
    float32ToPcm16Base64,
  } from '#lib/audio';
  import type { MnemosyneMemory, VoicePipelineMode } from '../../types/index';
  import {
    activeThreadId,
    refreshWorkspace,
    settings,
    updateSettings,
  } from '#lib/stores/workspace';

  interface LiveTranscriptItem {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    createdAt: string;
  }

  interface LiveMemoryActivity {
    id: string;
    action: 'recall' | 'save' | 'search';
    summary: string;
    timestamp: string;
  }

  let pipeline = $state<VoicePipelineMode>($settings?.voicePipeline ?? 'gemini-live');
  let callStatus = $state<'idle' | 'connecting' | 'connected'>('idle');
  let micMuted = $state(false);
  let cameraOn = $state(false);
  let aiSpeaking = $state(false);
  let vadState = $state<'listening' | 'speech' | 'processing' | 'speaking'>('listening');
  let transcript = $state<LiveTranscriptItem[]>([]);
  let memoryFeed = $state<LiveMemoryActivity[]>([]);
  let textInject = $state('');
  let errorMessage = $state<string | null>(null);
  let elapsedSeconds = $state(0);
  let savingCall = $state(false);

  let canvasEl: HTMLCanvasElement | undefined = $state();
  let videoEl: HTMLVideoElement | undefined = $state();

  let ws: WebSocket | null = null;
  let player: GaplessPcmPlayer | null = null;
  let inputCtx: AudioContext | null = null;
  let inputAnalyser: AnalyserNode | null = null;
  let micStream: MediaStream | null = null;
  let videoStream: MediaStream | null = null;
  let videoInterval: number | null = null;
  let processor: ScriptProcessorNode | null = null;
  let modularAudio: HTMLAudioElement | null = null;
  let modularThreadId: string | null = null;

  $effect(() => {
    if (callStatus !== 'connected') {
      elapsedSeconds = 0;
      return;
    }
    const timer = window.setInterval(() => {
      elapsedSeconds += 1;
    }, 1000);
    return () => window.clearInterval(timer);
  });

  $effect(() => {
    const canvas = canvasEl;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let rafId = 0;
    const freqBuffer = new Uint8Array(64);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (callStatus === 'connected') {
        if (aiSpeaking && player) {
          player.getFrequencyData(freqBuffer);
        } else if (inputAnalyser && !micMuted) {
          inputAnalyser.getByteFrequencyData(freqBuffer);
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
  });

  function appendTranscript(
    role: 'user' | 'assistant',
    chunk: string,
    replaceLast?: boolean
  ) {
    if (!chunk) return;
    const last = transcript[transcript.length - 1];
    if (last && last.role === role && !replaceLast) {
      transcript = [
        ...transcript.slice(0, -1),
        { ...last, text: `${last.text}${chunk}` },
      ];
    } else {
      transcript = [
        ...transcript,
        {
          id: crypto.randomUUID(),
          role,
          text: chunk.trimStart(),
          createdAt: new Date().toISOString(),
        },
      ];
    }
  }

  function stopCamera() {
    if (videoInterval) {
      window.clearInterval(videoInterval);
      videoInterval = null;
    }
    videoStream?.getTracks().forEach((t) => t.stop());
    videoStream = null;
    if (videoEl) videoEl.srcObject = null;
    cameraOn = false;
  }

  async function cleanupCallResources() {
    stopCamera();
    if (processor) {
      processor.disconnect();
      processor = null;
    }
    micStream?.getTracks().forEach((t) => t.stop());
    micStream = null;
    if (inputCtx && inputCtx.state !== 'closed') {
      await inputCtx.close();
      inputCtx = null;
    }
    if (player) {
      await player.close();
      player = null;
    }
    if (ws) {
      ws.close();
      ws = null;
    }
    modularAudio?.pause();
    modularAudio = null;
    aiSpeaking = false;
  }

  onDestroy(() => {
    void cleanupCallResources();
  });

  function handleInterrupt() {
    if (player) player.interrupt();
    if (modularAudio) {
      modularAudio.pause();
      modularAudio = null;
      aiSpeaking = false;
      vadState = 'listening';
    }
  }

  async function runModularTurn(audioBlob: Blob) {
    if (!$settings) return;
    vadState = 'processing';
    try {
      const audioBase64 = await blobToBase64(audioBlob);
      const sttRes = await fetch('/api/stt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          mimeType: audioBlob.type || 'audio/webm',
          provider: $settings.sttProvider,
        }),
      });
      const sttData = (await sttRes.json()) as {
        transcript?: string;
        error?: string;
      };
      if (!sttRes.ok) throw new Error(sttData.error || 'STT failed');
      const userText = (sttData.transcript || '').trim();
      if (!userText) {
        vadState = 'listening';
        return;
      }

      transcript = [
        ...transcript,
        {
          id: crypto.randomUUID(),
          role: 'user',
          text: userText,
          createdAt: new Date().toISOString(),
        },
      ];

      await executeModularLLMAndTTS(userText);
    } catch (err) {
      errorMessage =
        err instanceof Error ? err.message : 'Modular voice turn failed';
      vadState = 'listening';
    }
  }

  async function executeModularLLMAndTTS(userText: string) {
    if (!$settings) return;
    vadState = 'processing';
    if (!modularThreadId) {
      const tRes = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: $settings.activeProvider,
          model: $settings.activeModel,
          title: `Comms · ${new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`,
        }),
      });
      const tData = (await tRes.json()) as { id: string };
      modularThreadId = tData.id;
    }

    const chatRes = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        threadId: modularThreadId,
        message: `${userText}\n\n(Note: Respond concisely as spoken voice dialogue.)`,
        provider: $settings.activeProvider,
        model: $settings.activeModel,
        useMnemosyne: true,
        useWebSearch: $settings.useWebSearchInChat,
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
            query?: string;
            sources?: unknown[];
            recalled?: { memories: MnemosyneMemory[] };
            memories?: MnemosyneMemory[];
            message?: string;
          };
          if (ev.type === 'delta' && ev.text) {
            assistantReply += ev.text;
          } else if (ev.type === 'web_search_results' && ev.sources?.length) {
            memoryFeed = [
              {
                id: crypto.randomUUID(),
                action: 'search',
                summary: `Searched web "${ev.query ?? ''}" (${ev.sources.length} hits)`,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...memoryFeed,
            ];
          } else if (
            ev.type === 'mnemosyne_recall' &&
            ev.recalled?.memories.length
          ) {
            memoryFeed = [
              {
                id: crypto.randomUUID(),
                action: 'recall',
                summary: `Recalled ${ev.recalled.memories.length} memories for context`,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...memoryFeed,
            ];
          } else if (
            ev.type === 'mnemosyne_consolidated' &&
            ev.memories?.length
          ) {
            memoryFeed = [
              {
                id: crypto.randomUUID(),
                action: 'save',
                summary: ev.memories[0].content,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...memoryFeed,
            ];
          } else if (ev.type === 'error') {
            throw new Error(ev.message || 'Model error');
          }
        } catch {
          // ignore partial frames
        }
      }
    }

    if (!assistantReply.trim()) {
      vadState = 'listening';
      return;
    }

    transcript = [
      ...transcript,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: assistantReply,
        createdAt: new Date().toISOString(),
      },
    ];

    vadState = 'speaking';
    aiSpeaking = true;
    const ttsRes = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: assistantReply,
        provider: $settings.ttsProvider,
      }),
    });
    if (!ttsRes.ok) {
      const errData = (await ttsRes.json().catch(() => ({}))) as {
        error?: string;
      };
      aiSpeaking = false;
      vadState = 'listening';
      throw new Error(errData.error || 'TTS failed');
    }

    const audioBlob = await ttsRes.blob();
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);
    modularAudio = audio;
    audio.onended = () => {
      aiSpeaking = false;
      vadState = 'listening';
      URL.revokeObjectURL(url);
    };
    audio.onerror = () => {
      aiSpeaking = false;
      vadState = 'listening';
      URL.revokeObjectURL(url);
    };
    await audio.play();
  }

  async function startCall() {
    if (!$settings) return;
    errorMessage = null;
    transcript = [];
    memoryFeed = [];
    modularThreadId = null;
    callStatus = 'connecting';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      micStream = stream;

      inputCtx = new AudioContext({ sampleRate: 16000 });
      const source = inputCtx.createMediaStreamSource(stream);
      inputAnalyser = inputCtx.createAnalyser();
      inputAnalyser.fftSize = 128;
      source.connect(inputAnalyser);

      if (pipeline === 'gemini-live') {
        player = new GaplessPcmPlayer((speaking) => {
          aiSpeaking = speaking;
        });
        await player.resume();

        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        ws = new WebSocket(
          `${protocol}//${location.host}/ws/live-call?voice=${encodeURIComponent(
            $settings.geminiVoice
          )}`
        );

        ws.onmessage = (ev) => {
          const msg = JSON.parse(ev.data) as {
            type: string;
            data?: string;
            text?: string;
            message?: string;
            action?: 'recall' | 'save' | 'search';
            query?: string;
            resultsCount?: number;
            memory?: MnemosyneMemory;
            memories?: MnemosyneMemory[];
          };

          if (msg.type === 'ready') {
            callStatus = 'connected';
          } else if (msg.type === 'audio' && msg.data) {
            player?.enqueueBase64Pcm(msg.data);
          } else if (msg.type === 'interrupted') {
            player?.interrupt();
          } else if (msg.type === 'input_transcript' && msg.text) {
            appendTranscript('user', msg.text);
          } else if (msg.type === 'output_transcript' && msg.text) {
            appendTranscript('assistant', msg.text);
          } else if (msg.type === 'mnemosyne_recall' && msg.memories?.length) {
            memoryFeed = [
              {
                id: crypto.randomUUID(),
                action: 'recall',
                summary: `Loaded ${msg.memories.length} core & active memories`,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...memoryFeed,
            ];
          } else if (msg.type === 'mnemosyne_event') {
            if (msg.action === 'recall') {
              memoryFeed = [
                {
                  id: crypto.randomUUID(),
                  action: 'recall',
                  summary: `Searched "${msg.query}" (${
                    msg.memories?.length ?? 0
                  } hits)`,
                  timestamp: new Date().toLocaleTimeString(),
                },
                ...memoryFeed,
              ];
            } else if (msg.action === 'search') {
              memoryFeed = [
                {
                  id: crypto.randomUUID(),
                  action: 'search',
                  summary: `Web search "${msg.query ?? ''}" (${
                    msg.resultsCount ?? 0
                  } hits)`,
                  timestamp: new Date().toLocaleTimeString(),
                },
                ...memoryFeed,
              ];
            } else if (msg.action === 'save' && msg.memory) {
              memoryFeed = [
                {
                  id: crypto.randomUUID(),
                  action: 'save',
                  summary: msg.memory.content,
                  timestamp: new Date().toLocaleTimeString(),
                },
                ...memoryFeed,
              ];
              void refreshWorkspace();
            }
          } else if (msg.type === 'error') {
            errorMessage = msg.message || 'Live Call error';
          }
        };

        ws.onerror = () => {
          errorMessage = 'WebSocket connection error.';
        };

        ws.onclose = () => {
          if (callStatus !== 'idle') {
            callStatus = 'idle';
            void cleanupCallResources();
          }
        };

        processor = inputCtx.createScriptProcessor(4096, 1, 1);
        source.connect(processor);
        processor.connect(inputCtx.destination);
        processor.onaudioprocess = (e) => {
          if (micMuted) return;
          if (!ws || ws.readyState !== WebSocket.OPEN) return;
          const base64 = float32ToPcm16Base64(e.inputBuffer.getChannelData(0));
          ws.send(JSON.stringify({ audio: base64 }));
        };
      } else {
        callStatus = 'connected';
        vadState = 'listening';

        let isSpeechActive = false;
        let lastSpeechTime = 0;
        let activeRecorder: MediaRecorder | null = null;
        let chunks: Blob[] = [];
        let isProcessingTurn = false;

        const beginSegment = () => {
          if (activeRecorder && activeRecorder.state === 'recording') return;
          chunks = [];
          const rec = new MediaRecorder(stream, {
            mimeType: MediaRecorder.isTypeSupported('audio/webm')
              ? 'audio/webm'
              : undefined,
          });
          rec.ondataavailable = (ev) => {
            if (ev.data.size > 0) chunks.push(ev.data);
          };
          rec.onstop = async () => {
            const blob = new Blob(chunks, {
              type: rec.mimeType || 'audio/webm',
            });
            if (blob.size > 800 && callStatus === 'connected') {
              isProcessingTurn = true;
              await runModularTurn(blob);
              isProcessingTurn = false;
            } else {
              vadState = 'listening';
            }
          };
          activeRecorder = rec;
          rec.start();
        };

        processor = inputCtx.createScriptProcessor(2048, 1, 1);
        source.connect(processor);
        processor.connect(inputCtx.destination);
        processor.onaudioprocess = (e) => {
          if (micMuted || isProcessingTurn || callStatus !== 'connected') {
            return;
          }
          const rms = computeRms(e.inputBuffer.getChannelData(0));
          const now = Date.now();
          if (rms > 0.025) {
            lastSpeechTime = now;
            if (!isSpeechActive) {
              isSpeechActive = true;
              vadState = 'speech';
              if (modularAudio) {
                modularAudio.pause();
                modularAudio = null;
                aiSpeaking = false;
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
      callStatus = 'idle';
      errorMessage =
        err instanceof Error ? err.message : 'Unable to start live comms';
      await cleanupCallResources();
    }
  }

  async function endAndSaveCall() {
    const capturedTranscript = [...transcript];
    const savedPipeline = pipeline;
    const savedModularThreadId = modularThreadId;

    await cleanupCallResources();
    callStatus = 'idle';

    if (savedPipeline === 'modular' && savedModularThreadId) {
      await refreshWorkspace();
      activeThreadId.set(savedModularThreadId);
      await goto('/');
      return;
    }

    if (capturedTranscript.length > 0) {
      savingCall = true;
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
          await refreshWorkspace();
          if (data.thread?.id) {
            activeThreadId.set(data.thread.id);
            await goto('/');
          }
        }
      } finally {
        savingCall = false;
      }
    }
  }

  async function toggleCamera() {
    if (cameraOn) {
      stopCamera();
      return;
    }
    try {
      const camStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360 },
      });
      videoStream = camStream;
      if (videoEl) videoEl.srcObject = camStream;
      cameraOn = true;

      const snapCanvas = document.createElement('canvas');
      snapCanvas.width = 640;
      snapCanvas.height = 360;
      const snapCtx = snapCanvas.getContext('2d');

      videoInterval = window.setInterval(() => {
        if (
          pipeline !== 'gemini-live' ||
          callStatus !== 'connected' ||
          !ws ||
          ws.readyState !== WebSocket.OPEN ||
          !videoEl ||
          !snapCtx
        ) {
          return;
        }
        snapCtx.drawImage(videoEl, 0, 0, snapCanvas.width, snapCanvas.height);
        const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.65);
        const base64 = dataUrl.split(',')[1];
        if (base64) {
          ws.send(JSON.stringify({ video: base64 }));
        }
      }, 1000);
    } catch {
      errorMessage = 'Camera permission denied or unavailable.';
    }
  }

  async function sendTextDuringCall() {
    const text = textInject.trim();
    if (!text || callStatus !== 'connected') return;
    textInject = '';

    if (pipeline === 'gemini-live' && ws?.readyState === WebSocket.OPEN) {
      transcript = [
        ...transcript,
        {
          id: crypto.randomUUID(),
          role: 'user',
          text,
          createdAt: new Date().toISOString(),
        },
      ];
      ws.send(JSON.stringify({ text }));
    } else if (pipeline === 'modular') {
      transcript = [
        ...transcript,
        {
          id: crypto.randomUUID(),
          role: 'user',
          text,
          createdAt: new Date().toISOString(),
        },
      ];
      await executeModularLLMAndTTS(text);
    }
  }

  function formatDuration(sec: number): string {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
</script>

{#if $settings}
  <div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">
    <div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15"></div>

    <div class="max-w-6xl mx-auto space-y-4 sm:space-y-6 relative z-10">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-olive-drab/40"
      >
        <div>
          <h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">
            Guerilla Live Comms
          </h1>
          <p class="text-[10.5px] sm:text-xs text-stone-400 mt-0.5 break-words">
            {pipeline === 'gemini-live'
              ? `GEMINI LIVE · VOICE: ${$settings.geminiVoice} · 16KHZ/24KHZ PCM`
              : `MODULAR · STT: ${$settings.sttProvider} → LLM: ${$settings.activeModel} → TTS: ${$settings.ttsProvider}`}
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded border border-olive-drab/45 bg-[#12140e] w-full sm:w-auto"
        >
          <button
            type="button"
            disabled={callStatus !== 'idle'}
            onclick={() => {
              pipeline = 'gemini-live';
              void updateSettings({ voicePipeline: 'gemini-live' });
            }}
            class="h-8 sm:h-auto px-2.5 sm:px-3 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 {pipeline === 'gemini-live'
              ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
              : 'text-stone-400 hover:text-stone-200'}"
          >
            GEMINI LIVE
          </button>
          <button
            type="button"
            disabled={callStatus !== 'idle'}
            onclick={() => {
              pipeline = 'modular';
              void updateSettings({ voicePipeline: 'modular' });
            }}
            class="h-8 sm:h-auto px-2.5 sm:px-3 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 {pipeline === 'modular'
              ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
              : 'text-stone-400 hover:text-stone-200'}"
          >
            DEEPGRAM + FISH
          </button>
        </div>
      </div>

      {#if errorMessage}
        <div
          class="px-3.5 py-2 rounded border border-red-500/50 bg-red-950/50 font-prose text-xs text-red-300"
        >
          {errorMessage}
        </div>
      {/if}

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-stretch">
        <!-- Left: Waveform, Camera & Controls -->
        <div
          class="lg:col-span-5 rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 flex flex-col justify-between gap-3.5 sm:gap-5"
        >
          <div class="flex items-center justify-between text-xs">
            <div class="inline-flex items-center gap-2">
              {#if callStatus === 'connected'}
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {/if}
              <span class="font-bold uppercase tracking-wider text-[11px] sm:text-xs text-olive-bright">
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
            <span class="font-mono tabular-nums text-xs text-cyber-cyan">
              {formatDuration(elapsedSeconds)}
            </span>
          </div>

          <div
            class="relative rounded border border-[#005a63]/50 bg-[#050b0c] overflow-hidden h-36 sm:h-52 flex items-center justify-center"
          >
            <video
              bind:this={videoEl}
              autoplay
              playsinline
              muted
              class="w-full h-full object-cover {cameraOn ? 'block' : 'hidden'}"
            ></video>
            {#if !cameraOn}
              <canvas
                bind:this={canvasEl}
                width={420}
                height={160}
                class="w-full h-28 sm:h-36 px-3 sm:px-6"
              ></canvas>
            {/if}
            {#if cameraOn}
              <div
                class="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/75 border border-cyber-cyan/40 text-[10px] text-cyber-cyan"
              >
                1 FPS VISION FEED
              </div>
            {/if}
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2">
            {#if callStatus === 'idle'}
              <button
                type="button"
                onclick={() => void startCall()}
                class="w-full sm:w-auto h-10 px-5 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/40 text-stone-100 text-xs font-bold tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase shadow-[0_0_15px_rgba(143,168,92,0.2)]"
              >
                <PhoneCall class="w-4 h-4 text-olive-bright" />
                <span>Open Comms Channel</span>
              </button>
            {:else}
              <button
                type="button"
                onclick={() => (micMuted = !micMuted)}
                class="w-10 h-10 rounded border flex items-center justify-center transition-colors cursor-pointer {micMuted
                  ? 'border-red-500/50 bg-red-950/40 text-red-400'
                  : 'border-olive-drab/50 text-stone-200 hover:border-olive-bright'}"
                title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
                aria-label={micMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {#if micMuted}
                  <MicOff class="w-4 h-4" />
                {:else}
                  <Mic class="w-4 h-4" />
                {/if}
              </button>

              {#if pipeline === 'gemini-live'}
                <button
                  type="button"
                  onclick={() => void toggleCamera()}
                  class="w-10 h-10 rounded border flex items-center justify-center transition-colors cursor-pointer {cameraOn
                    ? 'border-cyber-cyan/60 bg-[#091517] text-cyber-cyan'
                    : 'border-olive-drab/50 text-stone-200 hover:border-olive-bright'}"
                  title="Toggle Camera Vision"
                  aria-label="Toggle Camera Vision"
                >
                  {#if cameraOn}
                    <Camera class="w-4 h-4" />
                  {:else}
                    <CameraOff class="w-4 h-4" />
                  {/if}
                </button>
              {/if}

              {#if aiSpeaking}
                <button
                  type="button"
                  onclick={handleInterrupt}
                  class="h-10 px-3 rounded border border-amber-500/50 bg-amber-950/30 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer uppercase"
                >
                  <Square class="w-3.5 h-3.5" />
                  <span>Interrupt</span>
                </button>
              {/if}

              <button
                type="button"
                disabled={savingCall}
                onclick={() => void endAndSaveCall()}
                class="h-10 px-3.5 rounded bg-red-900/70 hover:bg-red-800 border border-red-500/50 text-red-100 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer uppercase"
              >
                <PhoneOff class="w-4 h-4" />
                <span>{savingCall ? 'SAVING...' : 'END & LOG'}</span>
              </button>
            {/if}
          </div>

          <div class="flex items-center gap-1.5 pt-2 border-t border-olive-drab/25">
            <input
              type="text"
              disabled={callStatus !== 'connected'}
              bind:value={textInject}
              onkeydown={(e) => {
                if (e.key === 'Enter') void sendTextDuringCall();
              }}
              placeholder={callStatus === 'connected'
                ? 'Inject text packet mid-call...'
                : 'Open channel to inject text'}
              class="flex-1 min-w-0 h-9 px-3 text-xs rounded border border-olive-drab/45 bg-[#0d0e0a] text-stone-200 disabled:opacity-50 focus:outline-none focus:border-olive-bright"
            />
            <button
              type="button"
              disabled={callStatus !== 'connected' || !textInject.trim()}
              onclick={() => void sendTextDuringCall()}
              aria-label="Send text packet"
              class="w-9 h-9 flex items-center justify-center rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-olive-bright border border-olive-bright/30 cursor-pointer shrink-0"
            >
              <SendHorizontal class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Right: Live Transcript + Mnemosyne Live Feed -->
        <div
          class="lg:col-span-7 rounded-lg border border-[#005a63]/50 bg-[#091517] p-3.5 sm:p-5 flex flex-col min-h-[290px] sm:min-h-[420px] relative"
        >
          <div
            class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45"
          ></div>
          <div class="flex items-center justify-between pb-2.5 border-b border-[#005a63]/35">
            <div
              class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider text-cyber-cyan uppercase"
            >
              <Radio class="w-3.5 h-3.5" />
              <span>Live Comms Transcript</span>
            </div>
            <span class="text-[10.5px] text-cyber-cyan/60 tabular-nums">
              {transcript.length} TURNS
            </span>
          </div>

          <div class="flex-1 overflow-y-auto py-3 space-y-2.5 max-h-[240px] sm:max-h-[300px]">
            {#if transcript.length === 0}
              <div
                class="h-full flex items-center justify-center font-prose text-xs text-cyan-200/50 text-center px-4 py-8"
              >
                Open the comms channel and speak. Barge-in interrupt clears queued audio immediately.
              </div>
            {:else}
              {#each transcript as item (item.id)}
                <div class="space-y-0.5">
                  <div class="text-[10px] uppercase tracking-wider text-stone-500">
                    {item.role === 'user' ? 'Operator' : 'AI Dispatch'}
                  </div>
                  <p
                    class="font-prose text-[13.5px] sm:text-[13px] leading-relaxed {item.role === 'user'
                      ? 'text-olive-bright'
                      : 'text-cyan-100'}"
                  >
                    {item.text}
                  </p>
                </div>
              {/each}
            {/if}
          </div>

          <div class="pt-2.5 border-t border-[#005a63]/35 space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-olive-bright uppercase">
                <Brain class="w-3.5 h-3.5" />
                <span>Mnemosyne OS Live Feed</span>
              </span>
              <span class="text-cyber-cyan/60 tabular-nums text-[10.5px]">
                {memoryFeed.length} EVENTS
              </span>
            </div>
            {#if memoryFeed.length === 0}
              <p class="font-prose text-xs text-cyan-200/45">
                Live memory recalls, web searches, and tool-committed facts appear here.
              </p>
            {:else}
              <div class="max-h-28 overflow-y-auto space-y-1 text-xs">
                {#each memoryFeed as ev (ev.id)}
                  <div class="flex items-start justify-between gap-2 text-cyan-100/80">
                    <span class="font-prose text-xs leading-snug">
                      <span
                        class="font-mono text-[10.5px] uppercase mr-1.5 {ev.action === 'save'
                          ? 'text-olive-bright'
                          : 'text-cyber-cyan'}"
                      >
                        [{ev.action}]
                      </span>
                      {ev.summary}
                    </span>
                    <span class="text-[10px] text-stone-500 tabular-nums shrink-0">
                      {ev.timestamp}
                    </span>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
