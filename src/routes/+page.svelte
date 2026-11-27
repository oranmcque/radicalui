<script lang="ts">
  import {
    AlertCircle,
    Brain,
    ChevronDown,
    ChevronRight,
    Download,
    ExternalLink,
    FileText,
    Globe,
    Image as ImageIcon,
    Loader2,
    Maximize2,
    Mic,
    MicOff,
    Paperclip,
    Radio,
    RotateCcw,
    SendHorizontal,
    Sparkles,
    Square,
    Volume2,
    VolumeX,
    X,
  } from 'lucide-svelte';
  import MarkdownRenderer from '#lib/components/MarkdownRenderer.svelte';
  import { blobToBase64 } from '#lib/audio';
  import { generateUUID } from '#lib/uuid';
  import {
    IMAGE_ASPECT_RATIOS,
    getImageApiConfig,
  } from '#lib/services/imageGenerationService';
  import type {
    ChatAttachment,
    GeneratedImageItem,
    ImageAspectRatio,
    SearchProvider,
  } from '../types/index';
  import {
    activeThread,
    generateChatImage,
    isGeneratingImage,
    isStreaming,
    sendChatMessage,
    settings,
    stopStreaming,
    streamingMessage,
    updateSettings,
  } from '#lib/stores/workspace';

  const STARTER_PROMPTS = [
    {
      title: 'MODULAR WEB RECON',
      prompt:
        'Search the web for the latest AI engineering breakthroughs and model releases this week, with source citations.',
    },
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
  ];

  const SEARCH_PROVIDER_LABELS: Record<SearchProvider, string> = {
    'gemini-native': 'GEMINI NATIVE',
    searxng: 'SEARXNG',
    brave: 'BRAVE',
    tavily: 'TAVILY',
    custom: 'CUSTOM',
    parallel: 'PARALLEL',
  };

  let input = $state('');
  let attachments = $state<ChatAttachment[]>([]);
  let isRecording = $state(false);
  let isTranscribing = $state(false);
  let voiceAutoReply = $state(false);
  let playingMessageId = $state<string | null>(null);
  let copiedId = $state<string | null>(null);
  let expandedRecalls = $state<Record<string, boolean>>({});
  let expandedWebSources = $state<Record<string, boolean>>({});
  let expandedReasoning = $state<Record<string, boolean>>({});
  let errorBanner = $state<string | null>(null);
  let imageMode = $state(false);
  let selectedAspectRatio = $state<ImageAspectRatio>('1:1');
  let lightboxImage = $state<GeneratedImageItem | null>(null);
  const imageApiConfigured = getImageApiConfig().configured;

  let fileInputEl: HTMLInputElement | undefined = $state();
  let textareaEl: HTMLTextAreaElement | undefined = $state();
  let bottomEl: HTMLDivElement | undefined = $state();
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let activeAudio: HTMLAudioElement | null = null;
  let lastAutoSpokenId: string | null = null;

  let messages = $derived($activeThread?.messages ?? []);
  let activeReconLabel = $derived(
    SEARCH_PROVIDER_LABELS[$settings.searchProvider ?? 'gemini-native'] ?? 'GEMINI NATIVE'
  );

  function autoResizeTextarea() {
    if (!textareaEl) return;
    textareaEl.style.height = 'auto';
    const nextHeight = Math.min(168, Math.max(54, textareaEl.scrollHeight));
    textareaEl.style.height = `${nextHeight}px`;
  }

  $effect(() => {
    void input;
    autoResizeTextarea();
  });

  function safeExternalUrl(raw: string): string | null {
    try {
      const parsed = new URL(raw);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
        ? parsed.toString()
        : null;
    } catch {
      return null;
    }
  }

  function extractHostLabel(raw: string): string {
    try {
      return new URL(raw).hostname.replace(/^www\./, '');
    } catch {
      return 'source';
    }
  }

  function formatProviderBadge(p?: string): string {
    if (!p) return 'WEB RECON';
    return (
      SEARCH_PROVIDER_LABELS[p as SearchProvider] ??
      p.toUpperCase().replace(/-/g, ' ')
    );
  }

  $effect(() => {
    void messages.length;
    void $streamingMessage?.content;
    bottomEl?.scrollIntoView({ behavior: 'smooth' });
  });

  $effect(() => {
    if (!voiceAutoReply || $isStreaming || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg.role === 'assistant' &&
      lastMsg.content.trim() &&
      lastAutoSpokenId !== lastMsg.id
    ) {
      lastAutoSpokenId = lastMsg.id;
      void handlePlayTts(lastMsg.id, lastMsg.content);
    }
  });

  async function handleFilesSelected(files: FileList | null) {
    if (!files) return;
    const next: ChatAttachment[] = [];
    for (const file of Array.from(files)) {
      const isTextLike =
        file.type.startsWith('text/') ||
        /\.(md|txt|json|csv|ts|tsx|js|jsx|py|rs|go|yaml|yml|toml|sql|html|css|svelte)$/i.test(
          file.name
        );

      if (isTextLike) {
        const textContent = await file.text();
        next.push({
          id: generateUUID(),
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
          id: generateUUID(),
          name: file.name,
          mimeType: file.type || 'application/octet-stream',
          size: file.size,
          dataBase64,
          previewUrl,
        });
      }
    }
    attachments = [...attachments, ...next];
  }

  function removeAttachment(id: string) {
    attachments = attachments.filter((a) => a.id !== id);
  }

  function getAspectClass(ratio: ImageAspectRatio): string {
    switch (ratio) {
      case '16:9':
        return 'aspect-video';
      case '9:16':
        return 'aspect-[9/16] max-w-[260px]';
      case '4:3':
        return 'aspect-[4/3]';
      case '3:4':
        return 'aspect-[3/4] max-w-[320px]';
      default:
        return 'aspect-square max-w-[420px]';
    }
  }

  async function handleDownloadImage(img: GeneratedImageItem) {
    if (!img.url) return;
    const filename = `pheonikz-image-${img.id.slice(0, 8)}.png`;
    try {
      let downloadHref = img.url;
      let objectUrlToRevoke: string | null = null;
      if (!img.url.startsWith('data:')) {
        try {
          const res = await fetch(img.url);
          if (res.ok) {
            const blob = await res.blob();
            objectUrlToRevoke = URL.createObjectURL(blob);
            downloadHref = objectUrlToRevoke;
          }
        } catch {
          // Cross-origin fetch blocked: fall back to direct link download
        }
      }
      const link = document.createElement('a');
      link.href = downloadHref;
      link.download = filename;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (objectUrlToRevoke) {
        setTimeout(() => URL.revokeObjectURL(objectUrlToRevoke!), 1500);
      }
    } catch {
      errorBanner = 'Unable to download image in this browser context.';
    }
  }

  async function handleSend() {
    if ((!input.trim() && attachments.length === 0) || $isStreaming || $isGeneratingImage) return;
    errorBanner = null;
    const textToSend = input.trim();
    const attached = [...attachments];

    const slashMatch = textToSend.match(/^\/(?:image|img)\s+([\s\S]+)$/i);
    if (imageMode || slashMatch) {
      const imgPrompt = (slashMatch ? slashMatch[1] : textToSend).trim();
      if (!imgPrompt) {
        errorBanner = 'Enter a descriptive prompt to generate an image.';
        return;
      }
      input = '';
      if (textareaEl) textareaEl.style.height = '54px';
      try {
        await generateChatImage(imgPrompt, selectedAspectRatio);
      } catch (err) {
        errorBanner = err instanceof Error ? err.message : 'Image generation failed';
      }
      return;
    }

    input = '';
    attachments = [];
    if (textareaEl) textareaEl.style.height = '54px';
    try {
      await sendChatMessage(textToSend, attached);
    } catch (err) {
      errorBanner = err instanceof Error ? err.message : 'Failed to send dispatch';
    }
  }

  async function toggleVoiceDictation() {
    errorBanner = null;
    if (isRecording) {
      mediaRecorder?.stop();
      isRecording = false;
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      errorBanner = 'Microphone capture requires HTTPS or localhost.';
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : undefined,
      });
      audioChunks = [];
      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) audioChunks.push(ev.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunks, {
          type: recorder.mimeType || 'audio/webm',
        });
        if (blob.size < 200) return;
        isTranscribing = true;
        try {
          const audioBase64 = await blobToBase64(blob);
          const res = await fetch('/api/stt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64,
              mimeType: blob.type || 'audio/webm',
              provider: $settings.sttProvider,
            }),
          });
          const data = (await res.json()) as { transcript?: string; error?: string };
          if (!res.ok) throw new Error(data.error || 'Transcription failed');
          if (data.transcript) {
            input = input ? `${input} ${data.transcript}` : data.transcript;
          }
        } catch (err) {
          errorBanner = err instanceof Error ? err.message : 'Speech-to-text failed';
        } finally {
          isTranscribing = false;
        }
      };
      mediaRecorder = recorder;
      recorder.start();
      isRecording = true;
    } catch {
      errorBanner = 'Microphone permission required for voice comms.';
    }
  }

  async function handlePlayTts(msgId: string, content: string) {
    errorBanner = null;
    if (playingMessageId === msgId) {
      activeAudio?.pause();
      activeAudio = null;
      playingMessageId = null;
      return;
    }
    activeAudio?.pause();
    playingMessageId = msgId;
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: content,
          provider: $settings.ttsProvider,
        }),
      });
      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errData.error || 'TTS synthesis failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      activeAudio = audio;
      audio.onended = () => {
        playingMessageId = null;
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        playingMessageId = null;
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch (err) {
      playingMessageId = null;
      errorBanner = err instanceof Error ? err.message : 'TTS playback error';
    }
  }

  async function handleCopy(id: string, text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const tmp = document.createElement('textarea');
        tmp.value = text;
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }
      copiedId = id;
      setTimeout(() => (copiedId = null), 1500);
    } catch {
      errorBanner = 'Clipboard copy blocked in this browser context.';
    }
  }

  async function handleRegenerate() {
    if (messages.length === 0 || $isStreaming) return;
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    errorBanner = null;
    try {
      await sendChatMessage(lastUser.content, lastUser.attachments ?? [], {
        regenerate: true,
      });
    } catch (err) {
      errorBanner = err instanceof Error ? err.message : 'Failed to regenerate dispatch';
    }
  }
</script>

<main
  class="flex-1 flex flex-col min-h-0 bg-[#0a0b08] relative font-mono"
  ondragover={(e) => e.preventDefault()}
  ondrop={(e) => {
    e.preventDefault();
    void handleFilesSelected(e.dataTransfer?.files ?? null);
  }}
>
  <div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15 z-0"></div>

  <!-- Chat Messages Scroll Area -->
  <div class="flex-1 overflow-y-auto px-2.5 sm:px-6 py-3 sm:py-6 relative z-10">
    <div class="max-w-4xl mx-auto space-y-3.5 sm:space-y-6">
      {#if messages.length === 0 && !$streamingMessage}
        <div class="py-2 sm:py-12 space-y-3.5 sm:space-y-7">
          <div
            class="bg-[#091517] border border-[#005a63]/50 rounded-lg p-3.5 sm:p-6 relative shadow-[inset_0_0_20px_rgba(0,240,255,0.03)]"
          >
            <div
              class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45"
            ></div>
            <div class="text-[10px] tracking-wide sm:tracking-widest text-cyber-cyan/75 uppercase mb-1.5">
              Pheonikz UI · Mnemosyne OS + Recon ({activeReconLabel})
            </div>
            <h1 class="text-base sm:text-2xl font-bold tracking-tight sm:tracking-wide text-cyber-cyan leading-snug">
              Self-hosted multimodal dispatch, web recon &amp; memory.
            </h1>
            <p class="font-prose text-[13px] sm:text-sm text-cyan-100/75 mt-1.5 leading-relaxed max-w-2xl">
              Switch seamlessly across Gemini, NanoGPT, DeepSeek, or OpenAI with live search
              grounding, persistent Mnemosyne memory, and real-time voice comms.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
            {#each STARTER_PROMPTS as item}
              <button
                type="button"
                onclick={() => {
                  input = item.prompt;
                  textareaEl?.focus();
                }}
                class="text-left p-3 sm:p-4 rounded-lg border border-olive-drab/45 bg-[#12140e] hover:border-olive-bright/70 hover:bg-[#171a12] transition-colors cursor-pointer flex flex-col justify-between gap-1.5"
              >
                <span class="text-[10.5px] font-bold tracking-wider text-olive-bright uppercase">
                  {item.title}
                </span>
                <span class="font-prose text-[12.5px] sm:text-xs text-stone-400 leading-snug">
                  {item.prompt}
                </span>
              </button>
            {/each}
          </div>
        </div>
      {:else}
        {#each messages as msg, idx (msg.id)}
          {@const isUser = msg.role === 'user'}
          {@const recalledCount =
            (msg.recalled?.memories.length ?? 0) + (msg.recalled?.vaultChunks.length ?? 0)}
          {@const webCount = msg.webSources?.length ?? 0}
          {@const consolidatedCount = msg.consolidatedMemories?.length ?? 0}
          {@const recallOpen = expandedRecalls[msg.id] ?? false}
          {@const webOpen = expandedWebSources[msg.id] ?? false}
          {@const reasonOpen = expandedReasoning[msg.id] ?? false}
          {@const isLastAssistant = !isUser && idx === messages.length - 1}

          <div class="flex flex-col space-y-1 {isUser ? 'items-end' : 'items-start'}">
            <span class="text-[10px] tracking-wide sm:tracking-widest text-stone-500 uppercase px-1">
              {isUser ? 'Operator' : `Dispatch · ${msg.model || $settings.activeModel}`}
            </span>

            {#if isUser}
              <div
                class="max-w-[92%] sm:max-w-2xl bg-olive-drab/15 border border-olive-drab/45 text-stone-200 rounded-lg px-3 py-2 sm:p-3.5 font-prose text-[14.5px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words"
              >
                {#if msg.attachments && msg.attachments.length > 0}
                  <div class="flex flex-wrap gap-1.5 mb-2">
                    {#each msg.attachments as att (att.id)}
                      <div class="rounded overflow-hidden border border-olive-drab/50 bg-[#0d0e0a]">
                        {#if att.previewUrl || (att.mimeType.startsWith('image/') && att.dataBase64)}
                          <img
                            src={att.previewUrl || `data:${att.mimeType};base64,${att.dataBase64}`}
                            alt={att.name}
                            referrerpolicy="no-referrer"
                            class="max-h-44 max-w-full sm:max-w-[240px] object-cover"
                          />
                        {:else}
                          <div class="px-2 py-1 text-[11px] font-mono flex items-center gap-1.5 text-olive-bright">
                            <FileText class="w-3 h-3" />
                            <span class="truncate max-w-[150px]">{att.name}</span>
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {/if}
                <div>{msg.content}</div>
              </div>
            {:else}
              <div
                class="max-w-full sm:max-w-3xl w-full bg-[#091517] border border-[#005a63]/50 rounded-lg p-3 sm:p-5 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,240,255,0.03),0_0_15px_rgba(0,240,255,0.02)]"
              >
                <div
                  class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-45"
                ></div>

                {#if recalledCount > 0 || consolidatedCount > 0}
                  <div class="flex flex-wrap items-center gap-2.5 mb-2.5 text-[10.5px]">
                    {#if recalledCount > 0}
                      <button
                        type="button"
                        onclick={() =>
                          (expandedRecalls = { ...expandedRecalls, [msg.id]: !recallOpen })}
                        class="h-6 inline-flex items-center gap-1 text-cyber-cyan/80 hover:text-cyber-cyan cursor-pointer"
                      >
                        <Brain class="w-3 h-3" />
                        <span>MNEMOSYNE ({recalledCount})</span>
                        {#if recallOpen}
                          <ChevronDown class="w-3 h-3" />
                        {:else}
                          <ChevronRight class="w-3 h-3" />
                        {/if}
                      </button>
                    {/if}
                    {#if consolidatedCount > 0}
                      <span class="text-olive-bright">
                        +{consolidatedCount} SAVED
                      </span>
                    {/if}
                  </div>
                {/if}

                {#if recallOpen && msg.recalled}
                  <div class="mb-2.5 rounded border border-[#005a63]/50 bg-[#060f11] p-2.5 font-prose text-xs space-y-1.5">
                    {#each msg.recalled.memories as m (m.id)}
                      <div class="text-cyan-100/80">
                        <span class="font-mono text-[10px] text-olive-bright uppercase mr-1.5">[{m.tier}]</span>
                        <span>{m.content}</span>
                      </div>
                    {/each}
                    {#each msg.recalled.vaultChunks as c (c.id)}
                      <div class="text-cyan-200/65">
                        <span class="font-mono text-[10px] text-cyber-cyan mr-1.5">[{c.docTitle} #{c.index + 1}]</span>
                        <span class="line-clamp-2">{c.text}</span>
                      </div>
                    {/each}
                  </div>
                {/if}

                {#if msg.reasoning}
                  <div class="mb-2.5 rounded border border-[#005a63]/40 bg-[#060e10]">
                    <button
                      type="button"
                      onclick={() =>
                        (expandedReasoning = { ...expandedReasoning, [msg.id]: !reasonOpen })}
                      class="w-full h-8 px-2.5 flex items-center justify-between text-[10.5px] text-cyber-cyan/75 cursor-pointer"
                    >
                      <span>REASONING TRACE</span>
                      {#if reasonOpen}
                        <ChevronDown class="w-3.5 h-3.5" />
                      {:else}
                        <ChevronRight class="w-3.5 h-3.5" />
                      {/if}
                    </button>
                    {#if reasonOpen}
                      <div
                        class="px-2.5 pb-2.5 pt-2 border-t border-[#005a63]/30 font-prose text-xs text-cyan-200/75 whitespace-pre-wrap leading-relaxed"
                      >
                        {msg.reasoning}
                      </div>
                    {/if}
                  </div>
                {/if}

                {#if msg.generatedImage}
                  {@const genImg = msg.generatedImage}
                  <div class="space-y-2 my-1">
                    {#if genImg.status === 'loading'}
                      <div
                        class="w-full {getAspectClass(genImg.aspectRatio)} rounded border border-[#005a63]/60 bg-[#050d0f] flex flex-col items-center justify-center gap-2.5 p-4 text-center relative overflow-hidden"
                      >
                        <div class="absolute inset-0 crt-scanlines opacity-30 pointer-events-none"></div>
                        <Loader2 class="w-6 h-6 text-cyber-cyan animate-spin relative z-10" />
                        <div class="relative z-10 space-y-1">
                          <div class="text-[11px] font-bold tracking-wider text-cyber-cyan uppercase">
                            Synthesizing Image · {genImg.aspectRatio} ({genImg.size})
                          </div>
                          <p class="font-prose text-xs text-stone-400 line-clamp-2 max-w-md">
                            {genImg.prompt}
                          </p>
                        </div>
                      </div>
                    {:else if genImg.status === 'ready' && genImg.url}
                      <div class="rounded border border-[#005a63]/65 bg-[#050c0e] overflow-hidden">
                        <button
                          type="button"
                          onclick={() => (lightboxImage = genImg)}
                          class="block w-full bg-black/40 cursor-zoom-in focus:outline-none"
                          aria-label="Open full-size generated image preview"
                        >
                          <img
                            src={genImg.url}
                            alt={genImg.prompt}
                            referrerpolicy="no-referrer"
                            class="w-full max-h-[460px] object-contain mx-auto"
                          />
                        </button>
                        <div
                          class="px-2.5 py-2 border-t border-[#005a63]/35 bg-[#071215] flex flex-wrap items-center justify-between gap-2 text-[10px]"
                        >
                          <span class="text-stone-400 uppercase tracking-wider truncate">
                            IMG · {genImg.aspectRatio} · {genImg.size}
                          </span>
                          <div class="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onclick={() => (lightboxImage = genImg)}
                              class="h-7 px-2 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-cyber-cyan inline-flex items-center gap-1 font-bold uppercase cursor-pointer"
                            >
                              <Maximize2 class="w-3 h-3" />
                              <span>View</span>
                            </button>
                            {#if safeExternalUrl(genImg.url)}
                              <a
                                href={safeExternalUrl(genImg.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="h-7 px-2 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-cyber-cyan inline-flex items-center gap-1 font-bold uppercase"
                              >
                                <ExternalLink class="w-3 h-3" />
                                <span>Open</span>
                              </a>
                            {/if}
                            <button
                              type="button"
                              onclick={() => void handleDownloadImage(genImg)}
                              class="h-7 px-2 rounded border border-olive-bright/40 bg-[#3d462c]/70 hover:bg-[#4c5836] text-stone-100 inline-flex items-center gap-1 font-bold uppercase cursor-pointer"
                            >
                              <Download class="w-3 h-3 text-olive-bright" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                        {#if genImg.revisedPrompt || genImg.prompt}
                          <div class="px-2.5 py-1.5 border-t border-[#005a63]/20 font-prose text-[11.5px] text-cyan-100/75 leading-snug">
                            {genImg.revisedPrompt || genImg.prompt}
                          </div>
                        {/if}
                      </div>
                    {:else}
                      <div
                        class="rounded border border-red-500/45 bg-red-950/35 p-3 space-y-2 text-xs"
                      >
                        <div class="flex items-start gap-2 text-red-300">
                          <AlertCircle class="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                          <div class="space-y-0.5 min-w-0">
                            <div class="font-mono text-[10.5px] font-bold uppercase tracking-wider text-red-300">
                              Image Generation Error · {genImg.aspectRatio}
                            </div>
                            <p class="font-prose text-xs text-red-200/90 leading-snug break-words">
                              {genImg.error || 'Image generation failed.'}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center justify-between gap-2 pt-1 border-t border-red-500/20">
                          <span class="font-prose text-[11px] text-stone-400 truncate">
                            Prompt: {genImg.prompt}
                          </span>
                          <button
                            type="button"
                            disabled={$isGeneratingImage}
                            onclick={() =>
                              void generateChatImage(genImg.prompt, genImg.aspectRatio, {
                                retryMessageId: msg.id,
                              })}
                            class="h-7 px-2.5 rounded border border-red-400/45 bg-red-900/40 hover:bg-red-800/50 disabled:opacity-40 text-red-100 text-[10px] font-bold uppercase inline-flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <RotateCcw class="w-3 h-3" />
                            <span>Retry</span>
                          </button>
                        </div>
                      </div>
                    {/if}
                  </div>
                {/if}

                {#if msg.content.trim()}
                  <MarkdownRenderer content={msg.content} />
                {/if}

                <!-- Collapsible Source / Receipt Chips Below Assistant Message -->
                {#if webCount > 0 && msg.webSources}
                  <div class="mt-3 pt-2.5 border-t border-[#005a63]/30 space-y-1.5">
                    <button
                      type="button"
                      onclick={() =>
                        (expandedWebSources = { ...expandedWebSources, [msg.id]: !webOpen })}
                      class="h-6 inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-wide text-cyber-cyan/90 hover:text-cyber-cyan cursor-pointer uppercase"
                    >
                      <Globe class="w-3 h-3" />
                      <span>
                        SOURCES ({webCount}) · {formatProviderBadge(
                          msg.webSearchProvider || msg.webSources[0]?.provider
                        )}
                      </span>
                      {#if webOpen}
                        <ChevronDown class="w-3 h-3" />
                      {:else}
                        <ChevronRight class="w-3 h-3" />
                      {/if}
                    </button>

                    <!-- Compact Source Receipt Chips -->
                    <div class="flex flex-wrap gap-1">
                      {#each msg.webSources as src, sIdx (src.url + sIdx)}
                        {@const href = safeExternalUrl(src.url)}
                        {#if href}
                          <a
                            {href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={src.title}
                            class="inline-flex items-center gap-1 max-w-[180px] sm:max-w-[230px] px-2 py-0.5 rounded border border-[#005a63]/60 bg-[#061114] hover:border-cyber-cyan text-[10px] text-cyan-100/90 hover:text-cyber-cyan transition-colors"
                          >
                            <span class="text-olive-bright font-bold shrink-0">[{sIdx + 1}]</span>
                            <span class="truncate">{extractHostLabel(src.url)}</span>
                            <ExternalLink class="w-2.5 h-2.5 shrink-0 opacity-70" />
                          </a>
                        {/if}
                      {/each}
                    </div>

                    <!-- Expanded Source Details -->
                    {#if webOpen}
                      <div class="rounded border border-[#005a63]/55 bg-[#060f11] p-2.5 text-xs space-y-2">
                        {#each msg.webSources as src, sIdx (src.url + sIdx)}
                          {@const href = safeExternalUrl(src.url)}
                          <div class="border-b border-[#005a63]/25 last:border-b-0 pb-2 last:pb-0">
                            <div class="flex items-start justify-between gap-2">
                              {#if href}
                                <a
                                  {href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="inline-flex items-center gap-1 font-prose font-semibold text-xs text-cyber-cyan hover:underline break-words"
                                >
                                  <span class="font-mono text-[10.5px] text-olive-bright">[{sIdx + 1}]</span>
                                  <span>{src.title}</span>
                                  <ExternalLink class="w-3 h-3 shrink-0" />
                                </a>
                              {:else}
                                <div class="font-prose font-semibold text-xs text-cyber-cyan">
                                  [{sIdx + 1}] {src.title}
                                </div>
                              {/if}
                              {#if src.publishDate}
                                <span class="text-[10px] text-stone-500 tabular-nums shrink-0">
                                  {src.publishDate}
                                </span>
                              {/if}
                            </div>
                            {#if src.excerpt}
                              <p class="font-prose text-[11.5px] text-cyan-100/70 line-clamp-2 mt-1 leading-snug">
                                {src.excerpt}
                              </p>
                            {/if}
                          </div>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/if}

                <div
                  class="mt-3 pt-2 border-t border-[#005a63]/25 flex items-center justify-between gap-2 text-[10px] text-cyber-cyan/55"
                >
                  <span class="uppercase tracking-wide truncate min-w-0">
                    {msg.provider || $settings.activeProvider} // {msg.model || $settings.activeModel}
                  </span>
                  <div class="flex items-center gap-1 shrink-0">
                    {#if msg.content.trim()}
                      <button
                        type="button"
                        onclick={() => void handlePlayTts(msg.id, msg.content)}
                        class="h-7 px-2 rounded hover:text-cyber-cyan hover:bg-[#005a63]/20 transition-colors cursor-pointer uppercase {playingMessageId === msg.id
                          ? 'text-cyber-cyan font-bold'
                          : ''}"
                      >
                        {playingMessageId === msg.id ? 'STOP' : 'SPEAK'}
                      </button>
                    {/if}
                    <button
                      type="button"
                      onclick={() =>
                        void handleCopy(msg.id, msg.content || msg.generatedImage?.prompt || '')}
                      class="h-7 px-2 rounded hover:text-cyber-cyan hover:bg-[#005a63]/20 transition-colors cursor-pointer uppercase"
                    >
                      {copiedId === msg.id ? 'COPIED' : 'COPY'}
                    </button>
                    {#if isLastAssistant && !$isStreaming}
                      <button
                        type="button"
                        onclick={() => void handleRegenerate()}
                        class="h-7 px-2 rounded hover:text-cyber-cyan hover:bg-[#005a63]/20 transition-colors cursor-pointer uppercase"
                      >
                        REGEN
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
            {/if}
          </div>
        {/each}

        {#if $streamingMessage}
          <div class="flex flex-col space-y-1 items-start">
            <span class="text-[10px] tracking-wide sm:tracking-widest text-cyber-cyan/70 uppercase px-1">
              Dispatch · Streaming ({$settings.activeModel})
            </span>
            <div
              class="max-w-full sm:max-w-3xl w-full bg-[#091517] border border-[#005a63]/60 rounded-lg p-3 sm:p-5 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,240,255,0.04)]"
            >
              <div
                class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-60"
              ></div>
              <div class="flex flex-wrap items-center gap-2.5 mb-2 text-[10.5px] text-cyber-cyan/80">
                {#if $streamingMessage.webSearching}
                  <span class="inline-flex items-center gap-1.5 text-cyber-cyan animate-pulse">
                    <Globe class="w-3 h-3" />
                    <span>
                      RECON VIA {formatProviderBadge($streamingMessage.webSearchProvider)}...
                    </span>
                  </span>
                {:else if $streamingMessage.webSources && $streamingMessage.webSources.length > 0}
                  <span class="inline-flex items-center gap-1.5 text-cyber-cyan">
                    <Globe class="w-3 h-3" />
                    <span>
                      RECON ({$streamingMessage.webSources.length}) · {formatProviderBadge(
                        $streamingMessage.webSearchProvider
                      )}
                    </span>
                  </span>
                {:else if $streamingMessage.webSearchError}
                  <span class="inline-flex items-center gap-1.5 text-amber-400">
                    <Globe class="w-3 h-3" />
                    <span>RECON SKIPPED: {$streamingMessage.webSearchError}</span>
                  </span>
                {/if}
                {#if $streamingMessage.recalled && $streamingMessage.recalled.memories.length + $streamingMessage.recalled.vaultChunks.length > 0}
                  <span class="inline-flex items-center gap-1">
                    <Brain class="w-3 h-3" />
                    <span>
                      MNEMOSYNE ({$streamingMessage.recalled.memories.length +
                        $streamingMessage.recalled.vaultChunks.length})
                    </span>
                  </span>
                {/if}
              </div>
              {#if $streamingMessage.reasoning}
                <div
                  class="mb-2.5 rounded border border-[#005a63]/40 bg-[#060e10] p-2.5 font-prose text-xs text-cyan-200/75 whitespace-pre-wrap"
                >
                  {$streamingMessage.reasoning}
                </div>
              {/if}
              <MarkdownRenderer
                content={$streamingMessage.content ||
                  ($streamingMessage.webSearching
                    ? 'Acquiring live web intelligence...'
                    : 'Awaiting stream packets...')}
              />
            </div>
          </div>
        {/if}
      {/if}
      <div bind:this={bottomEl}></div>
    </div>
  </div>

  {#if errorBanner}
    <div class="max-w-4xl w-full mx-auto px-2.5 sm:px-6 pb-1.5 relative z-10">
      <div
        class="flex items-center justify-between gap-2 px-3 py-1.5 rounded border border-red-500/50 bg-red-950/50 text-xs text-red-300"
      >
        <span class="font-prose">{errorBanner}</span>
        <button
          type="button"
          onclick={() => (errorBanner = null)}
          class="w-7 h-7 flex items-center justify-center hover:opacity-75 cursor-pointer shrink-0"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  {/if}

  <!-- SLIM, SPACIOUS PROMPT COMPOSER (Generous Prompt Area + Thin Control Strip) -->
  <div class="max-w-4xl mx-auto w-full px-2 sm:px-6 pb-1.5 sm:pb-3 pt-1 relative z-10">
    <form
      onsubmit={(e) => {
        e.preventDefault();
        void handleSend();
      }}
      class="relative bg-[#141710] border border-olive-drab/55 focus-within:border-olive-bright rounded-lg transition-all shadow-[0_0_15px_rgba(76,88,54,0.1)] overflow-hidden"
    >
      {#if attachments.length > 0}
        <div class="flex flex-wrap gap-1.5 px-2.5 pt-2">
          {#each attachments as att (att.id)}
            <div
              class="flex items-center gap-1.5 px-2 py-0.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-[11px]"
            >
              {#if att.previewUrl}
                <ImageIcon class="w-3 h-3 text-cyber-cyan shrink-0" />
              {:else}
                <FileText class="w-3 h-3 text-olive-bright shrink-0" />
              {/if}
              <span class="truncate max-w-[130px] text-stone-300 font-prose">{att.name}</span>
              <button
                type="button"
                onclick={() => removeAttachment(att.id)}
                aria-label="Remove attachment"
                class="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-red-400 cursor-pointer"
              >
                <X class="w-3 h-3" />
              </button>
            </div>
          {/each}
        </div>
      {/if}

      {#if imageMode}
        <div
          class="flex flex-wrap items-center justify-between gap-1.5 px-2.5 py-1.5 border-b border-olive-drab/25 bg-[#10140d]"
        >
          <div class="flex items-center gap-1 flex-wrap">
            <span class="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-olive-bright uppercase mr-1">
              <Sparkles class="w-3 h-3" />
              <span>RATIO</span>
            </span>
            {#each IMAGE_ASPECT_RATIOS as ratio (ratio.id)}
              <button
                type="button"
                onclick={() => (selectedAspectRatio = ratio.id)}
                title="{ratio.label} ({ratio.size})"
                class="h-6 px-2 rounded border text-[10px] font-bold tracking-wide transition-colors cursor-pointer {selectedAspectRatio === ratio.id
                  ? 'border-olive-bright bg-olive-drab/30 text-olive-bright'
                  : 'border-olive-drab/35 text-stone-400 hover:text-stone-200'}"
              >
                {ratio.label}
              </button>
            {/each}
          </div>
          {#if !imageApiConfigured}
            <span
              title="Set VITE_IMAGE_ENDPOINT and VITE_IMAGE_API_KEY in .env"
              class="text-[9.5px] font-bold uppercase tracking-wider text-amber-400"
            >
              VITE_IMAGE_* UNSET
            </span>
          {/if}
        </div>
      {/if}

      <!-- Generous Auto-Growing Prompt Input -->
      <textarea
        bind:this={textareaEl}
        bind:value={input}
        oninput={autoResizeTextarea}
        onkeydown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
          }
        }}
        rows={2}
        placeholder={isTranscribing
          ? 'Transcribing audio...'
          : imageMode
            ? `Describe an image to generate (${selectedAspectRatio})...`
            : $settings.useWebSearchInChat
              ? `Message Pheonikz (Recon: ${activeReconLabel}) or /image...`
              : 'Message Pheonikz or /image...'}
        class="block w-full bg-transparent border-0 outline-none focus:ring-0 px-3 pt-2 pb-1.5 min-h-[54px] max-h-[168px] text-[15px] sm:text-sm leading-snug text-stone-100 placeholder:text-stone-500 font-prose resize-none"
      ></textarea>

      <!-- Slim, Compact Control Strip -->
      <div
        class="flex items-center justify-between gap-1.5 px-1.5 sm:px-2 py-1 border-t border-olive-drab/25 bg-[#10130d]/70"
      >
        <div class="flex items-center gap-0.5 sm:gap-1 min-w-0">
          <input
            bind:this={fileInputEl}
            type="file"
            multiple
            accept="image/*,audio/*,application/pdf,.txt,.md,.json,.csv,.ts,.tsx,.js,.py,.svelte"
            class="hidden"
            onchange={(e) => {
              const target = e.currentTarget;
              void handleFilesSelected(target.files);
              target.value = '';
            }}
          />
          <button
            type="button"
            onclick={() => fileInputEl?.click()}
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 rounded transition-colors cursor-pointer shrink-0"
            title="Attach Files"
            aria-label="Attach files"
          >
            <Paperclip class="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onclick={() => void toggleVoiceDictation()}
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors cursor-pointer shrink-0 {isRecording
              ? 'bg-red-500/20 text-red-400'
              : 'text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15'}"
            title="Voice Dictation ({$settings.sttProvider})"
            aria-label="Toggle voice dictation"
          >
            {#if isRecording}
              <MicOff class="w-3.5 h-3.5" />
            {:else}
              <Mic class="w-3.5 h-3.5" />
            {/if}
          </button>
          <button
            type="button"
            onclick={() =>
              void updateSettings({ useWebSearchInChat: !$settings.useWebSearchInChat })}
            title="Toggle Web Recon ({activeReconLabel})"
            aria-label="Toggle Web Recon"
            aria-pressed={$settings.useWebSearchInChat}
            class="h-7 px-2 flex items-center gap-1 rounded border text-[10px] font-bold tracking-wide uppercase transition-colors cursor-pointer shrink-0 {$settings.useWebSearchInChat
              ? 'border-cyber-cyan/55 text-cyber-cyan bg-[#091517]'
              : 'border-olive-drab/35 text-stone-500 hover:text-stone-300 bg-transparent'}"
          >
            <span
              class="w-1.5 h-1.5 rounded-full {$settings.useWebSearchInChat
                ? 'bg-cyber-cyan animate-pulse'
                : 'bg-stone-600'}"
            ></span>
            <Globe class="w-3 h-3" />
            <span>RECON</span>
          </button>
          <button
            type="button"
            onclick={() => (imageMode = !imageMode)}
            title="Toggle Image Generation Mode (or type /image <prompt>)"
            aria-label="Toggle Image Generation Mode"
            aria-pressed={imageMode}
            class="h-7 px-2 flex items-center gap-1 rounded border text-[10px] font-bold tracking-wide uppercase transition-colors cursor-pointer shrink-0 {imageMode
              ? 'border-olive-bright/65 text-olive-bright bg-olive-drab/25'
              : 'border-olive-drab/35 text-stone-500 hover:text-stone-300 bg-transparent'}"
          >
            <ImageIcon class="w-3 h-3" />
            <span>IMG</span>
          </button>
          <button
            type="button"
            onclick={() =>
              void updateSettings({ useMnemosyneInChat: !$settings.useMnemosyneInChat })}
            title="Toggle Mnemosyne OS memory"
            aria-label="Toggle Mnemosyne OS memory"
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors cursor-pointer shrink-0 {$settings.useMnemosyneInChat
              ? 'text-olive-bright bg-olive-drab/20'
              : 'text-stone-500 hover:text-stone-300'}"
          >
            <Brain class="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onclick={() => (voiceAutoReply = !voiceAutoReply)}
            title="Auto-Speak Replies"
            aria-label="Toggle auto-speak replies"
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded transition-colors cursor-pointer shrink-0 {voiceAutoReply
              ? 'text-cyber-cyan bg-[#091517]'
              : 'text-stone-500 hover:text-stone-300'}"
          >
            {#if voiceAutoReply}
              <Volume2 class="w-3.5 h-3.5" />
            {:else}
              <VolumeX class="w-3.5 h-3.5" />
            {/if}
          </button>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <a
            href="/live"
            title="Open Live Voice Comms"
            class="hidden sm:inline-flex items-center gap-1 h-7 px-2.5 rounded border border-[#005a63]/50 bg-[#091517] hover:border-cyber-cyan/70 text-cyber-cyan text-[10px] font-bold tracking-wider"
          >
            <Radio class="w-3 h-3" />
            <span>COMMS</span>
          </a>

          {#if $isStreaming}
            <button
              type="button"
              onclick={stopStreaming}
              class="h-7 sm:h-8 bg-red-900/50 hover:bg-red-800/70 text-red-200 px-2.5 sm:px-3.5 rounded text-[10.5px] font-bold tracking-wider flex items-center gap-1 border border-red-500/40 cursor-pointer"
            >
              <Square class="w-3 h-3" />
              <span>ABORT</span>
            </button>
          {:else}
            <button
              type="submit"
              disabled={$isGeneratingImage || (!input.trim() && (imageMode || attachments.length === 0))}
              class="h-7 sm:h-8 bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 px-2.5 sm:px-3.5 rounded text-[10.5px] font-bold tracking-wider flex items-center gap-1.5 border border-olive-bright/35 transition-all cursor-pointer"
            >
              {#if $isGeneratingImage}
                <Loader2 class="w-3 h-3 text-cyber-cyan animate-spin" />
                <span>GEN...</span>
              {:else if imageMode}
                <Sparkles class="w-3 h-3 text-olive-bright" />
                <span>GEN</span>
              {:else}
                <span>SEND</span>
                <SendHorizontal class="w-3 h-3 text-olive-bright" />
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </form>

    <div
      class="flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] text-stone-500 px-1 mt-1 font-mono tracking-wide uppercase"
    >
      <span class="hidden sm:inline">
        STT: {$settings.sttProvider} · TTS: {$settings.ttsProvider}
      </span>
      <div class="flex items-center gap-2 ml-auto sm:ml-0">
        <a
          href="/vault"
          class="hover:underline {$settings.useWebSearchInChat
            ? 'text-cyber-cyan font-semibold'
            : 'text-stone-500'}"
        >
          RECON: {$settings.useWebSearchInChat ? activeReconLabel : 'OFF'}
        </a>
        <span class="text-stone-700">·</span>
        <span>
          MEM: {$settings.useMnemosyneInChat ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  </div>

  {#if lightboxImage && lightboxImage.url}
    <div
      class="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-label="Generated image preview"
      onclick={() => (lightboxImage = null)}
      onkeydown={(e) => {
        if (e.key === 'Escape') lightboxImage = null;
      }}
    >
      <div
        class="max-w-4xl w-full max-h-[90dvh] rounded-lg border border-[#005a63]/70 bg-[#091517] overflow-hidden flex flex-col shadow-2xl"
        onclick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div class="px-3.5 py-2.5 border-b border-[#005a63]/40 flex items-center justify-between gap-2 text-xs">
          <span class="font-bold uppercase tracking-wider text-cyber-cyan truncate">
            Generated Image · {lightboxImage.aspectRatio} ({lightboxImage.size})
          </span>
          <div class="flex items-center gap-1.5 shrink-0">
            {#if safeExternalUrl(lightboxImage.url)}
              <a
                href={safeExternalUrl(lightboxImage.url)}
                target="_blank"
                rel="noopener noreferrer"
                class="h-7 px-2.5 rounded border border-[#005a63]/60 hover:border-cyber-cyan text-cyber-cyan text-[10px] font-bold uppercase inline-flex items-center gap-1"
              >
                <ExternalLink class="w-3 h-3" />
                <span>Open</span>
              </a>
            {/if}
            <button
              type="button"
              onclick={() => lightboxImage && void handleDownloadImage(lightboxImage)}
              class="h-7 px-2.5 rounded border border-olive-bright/40 bg-[#3d462c] hover:bg-[#4c5836] text-stone-100 text-[10px] font-bold uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              <Download class="w-3 h-3 text-olive-bright" />
              <span>Download</span>
            </button>
            <button
              type="button"
              onclick={() => (lightboxImage = null)}
              aria-label="Close preview"
              class="w-7 h-7 rounded border border-olive-drab/40 hover:border-olive-bright text-stone-300 flex items-center justify-center cursor-pointer"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-auto bg-black/50 p-2 sm:p-4 flex items-center justify-center min-h-0">
          <img
            src={lightboxImage.url}
            alt={lightboxImage.prompt}
            referrerpolicy="no-referrer"
            class="max-w-full max-h-[72dvh] object-contain rounded"
          />
        </div>
        {#if lightboxImage.revisedPrompt || lightboxImage.prompt}
          <div class="px-3.5 py-2 border-t border-[#005a63]/30 font-prose text-xs text-cyan-100/80">
            {lightboxImage.revisedPrompt || lightboxImage.prompt}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</main>
