<script lang="ts">
  import '../index.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import {
    Brain,
    Globe,
    KeyRound,
    Menu,
    MessageSquare,
    PanelLeftOpen,
    Radio,
  } from 'lucide-svelte';
  import Sidebar from '#lib/components/Sidebar.svelte';
  import ModelSelector from '#lib/components/ModelSelector.svelte';
  import {
    activeThreadId,
    createNewThread,
    deleteThreadById,
    memories,
    models,
    providers,
    refreshWorkspace,
    selectModel,
    serverOnline,
    settings,
    threads,
    vaultDocs,
  } from '#lib/stores/workspace';

  let { children } = $props();
  let desktopSidebarOpen = $state(true);
  let mobileDrawerOpen = $state(false);

  onMount(() => {
    void refreshWorkspace();
  });

  async function handleNewDispatch() {
    await createNewThread();
    mobileDrawerOpen = false;
    await goto('/');
  }
</script>

{#if !$settings}
  <div
    class="h-[100dvh] w-full flex items-center justify-center bg-[#0a0b08] text-xs font-mono text-olive-bright uppercase tracking-widest px-4 text-center"
  >
    Initializing Pheonikz UI Tactical Node...
  </div>
{:else}
  <div class="h-[100dvh] w-full flex overflow-hidden bg-[#0a0b08] text-stone-300 font-mono">
    <!-- Desktop Collapsible Sidebar -->
    {#if desktopSidebarOpen}
      <div class="hidden md:flex h-full shrink-0">
        <Sidebar
          threads={$threads}
          activeThreadId={$activeThreadId}
          memoryCount={$memories.length}
          vaultCount={$vaultDocs.length}
          serverOnline={$serverOnline}
          onSelectThread={(id) => activeThreadId.set(id)}
          onNewThread={() => void handleNewDispatch()}
          onDeleteThread={(id) => void deleteThreadById(id)}
          onCollapse={() => (desktopSidebarOpen = false)}
        />
      </div>
    {/if}

    <!-- Mobile Slide-Over Navigation Drawer -->
    {#if mobileDrawerOpen}
      <div
        class="fixed inset-0 z-40 bg-black/75 backdrop-blur-[1px] md:hidden"
        onclick={() => (mobileDrawerOpen = false)}
        role="presentation"
      ></div>
      <div class="fixed inset-y-0 left-0 z-50 w-[84vw] max-w-[300px] md:hidden shadow-2xl">
        <Sidebar
          threads={$threads}
          activeThreadId={$activeThreadId}
          memoryCount={$memories.length}
          vaultCount={$vaultDocs.length}
          serverOnline={$serverOnline}
          onSelectThread={(id) => activeThreadId.set(id)}
          onNewThread={() => void handleNewDispatch()}
          onDeleteThread={(id) => void deleteThreadById(id)}
          onCollapse={() => (mobileDrawerOpen = false)}
          onNavigate={() => (mobileDrawerOpen = false)}
        />
      </div>
    {/if}

    <div class="flex-1 flex flex-col min-w-0 h-full">
      <!-- Top Tactical Command Bar (Slim on mobile, full on desktop) -->
      <header
        class="h-11 md:h-14 shrink-0 px-2.5 sm:px-6 border-b border-olive-drab/40 bg-[#12140e] flex items-center justify-between gap-2 sm:gap-6 pt-safe"
      >
        <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-initial">
          <button
            type="button"
            onclick={() => (mobileDrawerOpen = true)}
            aria-label="Open navigation drawer"
            class="md:hidden w-8 h-8 flex items-center justify-center rounded border border-olive-drab/40 text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer shrink-0"
          >
            <Menu class="w-4 h-4" />
          </button>

          {#if !desktopSidebarOpen}
            <button
              type="button"
              onclick={() => (desktopSidebarOpen = true)}
              aria-label="Expand sidebar"
              class="hidden md:flex p-1.5 rounded text-stone-400 hover:text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer shrink-0"
            >
              <PanelLeftOpen class="w-4 h-4" />
            </button>
          {/if}

          <a
            href="/"
            class="text-[11px] sm:text-sm font-black tracking-wide sm:tracking-wider text-olive-bright whitespace-nowrap shrink-0"
          >
            PHEONIKZ UI
          </a>

          <div class="ml-auto md:ml-0 min-w-0">
            <ModelSelector
              models={$models}
              providers={$providers}
              activeProvider={$settings.activeProvider}
              activeModel={$settings.activeModel}
              onSelect={(prov, modelId) => void selectModel(prov, modelId)}
            />
          </div>
        </div>

        <nav class="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-bold tracking-wider uppercase">
          <a
            href="/"
            class="py-1 transition-colors whitespace-nowrap shrink-0 {page.url.pathname === '/'
              ? 'text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan'
              : 'text-stone-400 hover:text-olive-bright'}"
          >
            Dispatch
          </a>
          <a
            href="/search"
            class="py-1 transition-colors whitespace-nowrap shrink-0 {page.url.pathname === '/search'
              ? 'text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan'
              : 'text-stone-400 hover:text-olive-bright'}"
          >
            Web Recon
          </a>
          <a
            href="/live"
            class="py-1 transition-colors whitespace-nowrap shrink-0 {page.url.pathname === '/live'
              ? 'text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan'
              : 'text-stone-400 hover:text-olive-bright'}"
          >
            Live Comms
          </a>
          <a
            href="/mnemosyne"
            class="py-1 transition-colors whitespace-nowrap shrink-0 {page.url.pathname === '/mnemosyne'
              ? 'text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan'
              : 'text-stone-400 hover:text-olive-bright'}"
          >
            Mnemosyne OS
          </a>
          <a
            href="/vault"
            class="py-1 transition-colors whitespace-nowrap shrink-0 {page.url.pathname === '/vault'
              ? 'text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan'
              : 'text-stone-400 hover:text-olive-bright'}"
          >
            Settings
          </a>
        </nav>

        <div class="hidden md:block shrink-0">
          <a
            href={page.url.pathname === '/live' ? '/' : '/live'}
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#091517] hover:border-cyber-cyan border border-[#005a63]/60 text-cyber-cyan text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0"
          >
            <Radio class="w-3.5 h-3.5" />
            <span>{page.url.pathname === '/live' ? 'DISPATCH' : 'LIVE COMMS'}</span>
          </a>
        </div>
      </header>

      <!-- Route Content -->
      {@render children()}

      <!-- Slim Mobile Bottom Thumb Navigation -->
      <nav
        aria-label="Primary mobile navigation"
        class="md:hidden shrink-0 grid grid-cols-5 border-t border-olive-drab/35 bg-[#12140e] pb-safe z-30"
      >
        <a
          href="/"
          class="h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 {page.url.pathname === '/'
            ? 'text-cyber-cyan border-cyber-cyan bg-[#091517]/50'
            : 'text-stone-400 border-transparent hover:text-olive-bright'}"
        >
          <MessageSquare class="w-4 h-4" />
          <span>Chat</span>
        </a>
        <a
          href="/search"
          class="h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 {page.url.pathname === '/search'
            ? 'text-cyber-cyan border-cyber-cyan bg-[#091517]/50'
            : 'text-stone-400 border-transparent hover:text-olive-bright'}"
        >
          <Globe class="w-4 h-4" />
          <span>Recon</span>
        </a>
        <a
          href="/live"
          class="h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 {page.url.pathname === '/live'
            ? 'text-cyber-cyan border-cyber-cyan bg-[#091517]/50'
            : 'text-stone-400 border-transparent hover:text-olive-bright'}"
        >
          <Radio class="w-4 h-4" />
          <span>Comms</span>
        </a>
        <a
          href="/mnemosyne"
          class="h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 {page.url.pathname === '/mnemosyne'
            ? 'text-cyber-cyan border-cyber-cyan bg-[#091517]/50'
            : 'text-stone-400 border-transparent hover:text-olive-bright'}"
        >
          <Brain class="w-4 h-4" />
          <span>Memory</span>
        </a>
        <a
          href="/vault"
          class="h-12 flex flex-col items-center justify-center gap-0.5 text-[10px] font-prose font-medium transition-colors border-t-2 {page.url.pathname === '/vault'
            ? 'text-cyber-cyan border-cyber-cyan bg-[#091517]/50'
            : 'text-stone-400 border-transparent hover:text-olive-bright'}"
        >
          <KeyRound class="w-4 h-4" />
          <span>Vault</span>
        </a>
      </nav>
    </div>
  </div>
{/if}
