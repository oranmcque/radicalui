<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import {
    Brain,
    Globe,
    KeyRound,
    Plus,
    Radio,
    Search,
    Terminal,
    Trash2,
    PanelLeftClose,
  } from 'lucide-svelte';
  import type { ChatThread } from '../../types/index';

  interface Props {
    threads: ChatThread[];
    activeThreadId: string | null;
    memoryCount: number;
    vaultCount: number;
    serverOnline: boolean;
    onSelectThread: (id: string) => void;
    onNewThread: () => void;
    onDeleteThread: (id: string) => void;
    onCollapse: () => void;
    onNavigate?: () => void;
  }

  let {
    threads,
    activeThreadId,
    memoryCount,
    vaultCount,
    serverOnline,
    onSelectThread,
    onNewThread,
    onDeleteThread,
    onCollapse,
    onNavigate,
  }: Props = $props();

  let search = $state('');

  let filtered = $derived(
    threads.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
  );
</script>

<aside
  class="w-full md:w-72 shrink-0 h-full flex flex-col justify-between border-r border-olive-drab/40 bg-[#12140e] p-3.5 pb-safe font-mono"
>
  <div class="flex flex-col min-h-0 flex-1">
    <!-- Brand & Collapse -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-olive-bright font-black text-lg tracking-wider select-none">
          PHEONIKZ UI
        </h1>
        <span class="text-olive-drab text-[10px] tracking-widest block -mt-0.5 uppercase">
          Mnemosyne Tactical Node
        </span>
      </div>
      <button
        type="button"
        onclick={onCollapse}
        aria-label="Collapse sidebar"
        class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer"
      >
        <PanelLeftClose class="w-4 h-4" />
      </button>
    </div>

    <!-- New Dispatch Button -->
    <button
      type="button"
      onclick={() => {
        onNewThread();
        onNavigate?.();
      }}
      class="w-full h-9 bg-[#3d462c] hover:bg-[#4c5836] active:scale-[0.98] transition-all text-stone-100 font-bold px-3.5 rounded border border-olive-bright/30 hover:border-olive-bright/60 flex items-center justify-center gap-2 mb-4 shadow-[0_0_15px_rgba(143,168,92,0.15)] cursor-pointer text-xs tracking-wider uppercase"
    >
      <Plus class="w-4 h-4 text-olive-bright" />
      <span>New Dispatch</span>
    </button>

    <!-- Tactical Modules -->
    <div class="space-y-1 mb-4">
      <div
        class="flex items-center gap-2 px-2 text-olive-bright text-[10px] tracking-widest font-bold mb-1 uppercase"
      >
        <Terminal class="w-3 h-3" />
        <span>Command Modules</span>
      </div>

      <a
        href="/search"
        onclick={() => onNavigate?.()}
        class="w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors {page.url.pathname === '/search'
          ? 'text-cyber-cyan bg-[#091517] border-[#005a63]/60'
          : 'text-stone-300 hover:text-cyber-cyan hover:bg-[#091517] border-transparent hover:border-[#005a63]/50'}"
      >
        <span class="inline-flex items-center gap-2">
          <Globe class="w-3.5 h-3.5 text-cyber-cyan" />
          <span class="font-prose font-medium text-[13px]">Web Recon</span>
        </span>
        <span class="text-[10px] text-cyber-cyan/70">MODULAR</span>
      </a>

      <a
        href="/live"
        onclick={() => onNavigate?.()}
        class="w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors {page.url.pathname === '/live'
          ? 'text-cyber-cyan bg-[#091517] border-[#005a63]/60'
          : 'text-stone-300 hover:text-cyber-cyan hover:bg-[#091517] border-transparent hover:border-[#005a63]/50'}"
      >
        <span class="inline-flex items-center gap-2">
          <Radio class="w-3.5 h-3.5 text-cyber-cyan" />
          <span class="font-prose font-medium text-[13px]">Live Voice Comms</span>
        </span>
        <span class="text-[10px] text-cyber-cyan/70">REALTIME</span>
      </a>

      <a
        href="/mnemosyne"
        onclick={() => onNavigate?.()}
        class="w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors {page.url.pathname === '/mnemosyne'
          ? 'text-olive-bright bg-olive-drab/20 border-olive-bright/40'
          : 'text-stone-300 hover:text-olive-bright hover:bg-olive-drab/15 border-transparent hover:border-olive-drab/40'}"
      >
        <span class="inline-flex items-center gap-2">
          <Brain class="w-3.5 h-3.5 text-olive-bright" />
          <span class="font-prose font-medium text-[13px]">Mnemosyne OS</span>
        </span>
        <span class="text-[10px] tabular-nums text-olive-bright/80">
          {memoryCount} · {vaultCount}
        </span>
      </a>

      <a
        href="/vault"
        onclick={() => onNavigate?.()}
        class="w-full h-9 text-left text-xs px-2.5 rounded flex items-center justify-between border transition-colors {page.url.pathname === '/vault'
          ? 'text-olive-bright bg-olive-drab/20 border-olive-bright/40'
          : 'text-stone-300 hover:text-olive-bright hover:bg-olive-drab/15 border-transparent hover:border-olive-drab/40'}"
      >
        <span class="inline-flex items-center gap-2">
          <KeyRound class="w-3.5 h-3.5 text-olive-bright" />
          <span class="font-prose font-medium text-[13px]">Settings &amp; Vault</span>
        </span>
        <span class="text-[10px] text-stone-500">CONFIG</span>
      </a>
    </div>

    <!-- Search Threads -->
    <div class="mb-3">
      <div class="relative">
        <Search class="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          bind:value={search}
          placeholder="Filter dispatches..."
          class="w-full h-9 pl-8 pr-2.5 text-xs rounded border border-olive-drab/40 bg-[#0d0e0a] text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
        />
      </div>
    </div>

    <!-- Dispatch History -->
    <div class="text-[10px] tracking-widest uppercase text-stone-500 px-2 mb-1.5 font-bold">
      Dispatch Logs
    </div>
    <div class="flex-1 overflow-y-auto space-y-1 pr-0.5 min-h-0">
      {#if filtered.length === 0}
        <div class="px-2 py-6 text-[11px] text-stone-600 text-center">
          {search ? 'NO MATCHING LOGS' : 'NO ACTIVE DISPATCHES'}
        </div>
      {:else}
        {#each filtered as thread (thread.id)}
          {@const active = thread.id === activeThreadId && page.url.pathname === '/'}
          <div
            class="group flex items-center justify-between gap-1 px-2.5 py-1.5 rounded text-xs transition-colors border {active
              ? 'text-olive-bright bg-olive-drab/15 border-olive-bright/40'
              : 'text-stone-400 hover:text-stone-200 hover:bg-olive-drab/10 border-transparent'}"
          >
            <button
              type="button"
              onclick={() => {
                onSelectThread(thread.id);
                onNavigate?.();
                void goto('/');
              }}
              class="flex-1 min-w-0 py-0.5 flex flex-col justify-center text-left cursor-pointer"
            >
              <div class="truncate font-prose font-medium text-[13px] leading-snug">{thread.title}</div>
              <div class="text-[10px] text-stone-500 truncate mt-0.5 tabular-nums">
                {thread.model} · {thread.messages.length} msgs
              </div>
            </button>
            <button
              type="button"
              onclick={(e) => {
                e.stopPropagation();
                onDeleteThread(thread.id);
              }}
              aria-label="Delete thread"
              class="w-7 h-7 flex items-center justify-center opacity-70 md:opacity-0 md:group-hover:opacity-100 rounded text-stone-500 hover:text-red-400 transition-opacity cursor-pointer shrink-0"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <!-- Footer Server Link Status -->
  <div class="border-t border-olive-drab/25 pt-2.5 mt-2.5 flex items-center justify-between text-[11px]">
    <div class="flex items-center gap-2">
      <span
        class="inline-block w-2 h-2 rounded-full {serverOnline
          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
          : 'bg-red-500'}"
      ></span>
      <span
        class="font-bold uppercase tracking-wider {serverOnline
          ? 'text-emerald-400'
          : 'text-red-400'}"
      >
        {serverOnline ? 'Server: Online' : 'Server: Offline'}
      </span>
    </div>
    <span class="text-[10px] text-stone-500">LOCAL</span>
  </div>
</aside>
