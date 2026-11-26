<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Database,
    ExternalLink,
    FileText,
    Globe,
    Loader2,
    MessageSquarePlus,
    Search,
    Sparkles,
  } from 'lucide-svelte';
  import type { SearchProvider, WebSearchSource } from '../../types/index';
  import {
    createNewThread,
    refreshWorkspace,
    sendChatMessage,
    settings,
    updateSettings,
  } from '#lib/stores/workspace';

  interface FetchedPage {
    url: string;
    title: string | null;
    publishDate: string | null;
    excerpts: string[];
  }

  const PROVIDER_OPTIONS: Array<{ id: SearchProvider; label: string }> = [
    { id: 'gemini-native', label: 'Gemini Native' },
    { id: 'searxng', label: 'SearXNG' },
    { id: 'brave', label: 'Brave Search' },
    { id: 'tavily', label: 'Tavily' },
    { id: 'custom', label: 'Custom' },
    { id: 'parallel', label: 'Parallel MCP' },
  ];

  let query = $state('');
  let searching = $state(false);
  let fetchingUrl = $state<string | null>(null);
  let indexingUrl = $state<string | null>(null);
  let sendingToChat = $state(false);
  let errorMsg = $state<string | null>(null);
  let statusNotice = $state<string | null>(null);
  let results = $state<WebSearchSource[]>([]);
  let lastProvider = $state<string>('');
  let fetchedPages = $state<Record<string, FetchedPage>>({});
  let directUrl = $state('');

  let activeProvider = $derived<SearchProvider>(
    $settings?.searchProvider ?? 'gemini-native'
  );

  const QUICK_PROBES = [
    'Latest SvelteKit and Vite release notes',
    'OpenAI DeepSeek Gemini coding benchmarks',
    'Self hosted SearXNG Docker setup tips',
  ];

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

  async function runWebSearch(e?: SubmitEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q || searching) return;
    searching = true;
    errorMsg = null;
    statusNotice = null;
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          provider: activeProvider,
          maxResults: $settings?.maxSearchResults ?? 5,
        }),
      });
      const data = (await res.json()) as {
        results?: WebSearchSource[];
        provider?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || 'Web Recon search failed');
      }
      results = data.results ?? [];
      lastProvider = data.provider ?? activeProvider;
      if (results.length === 0) {
        statusNotice = 'No matching results returned for that query.';
      }
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : 'Internet search failed';
    } finally {
      searching = false;
    }
  }

  async function handleFetchPage(targetUrl: string) {
    const clean = safeExternalUrl(targetUrl.trim());
    if (!clean) {
      errorMsg = 'Enter a valid public http:// or https:// URL.';
      return;
    }
    fetchingUrl = clean;
    errorMsg = null;
    try {
      const res = await fetch('/api/search/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: clean,
          objective: query.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        results?: FetchedPage[];
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || 'Page extraction failed');
      }
      const first = data.results?.[0];
      if (first) {
        fetchedPages = { ...fetchedPages, [clean]: first };
      } else {
        errorMsg = 'Page reader returned no readable content for that URL.';
      }
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : 'Web page fetch failed';
    } finally {
      fetchingUrl = null;
    }
  }

  async function handleIndexToVault(src: WebSearchSource) {
    indexingUrl = src.url;
    statusNotice = null;
    try {
      const fetched = fetchedPages[src.url];
      const bodyText = fetched
        ? fetched.excerpts.join('\n\n')
        : src.excerpt;
      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Web: ${src.title}`.slice(0, 120),
          mimeType: 'text/markdown',
          content: `Source URL: ${src.url}\n${src.publishDate ? `Published: ${src.publishDate}\n` : ''}\n${bodyText}`,
        }),
      });
      if (res.ok) {
        await refreshWorkspace();
        statusNotice = `Indexed "${src.title}" into Mnemosyne Knowledge Vault.`;
      }
    } finally {
      indexingUrl = null;
    }
  }

  async function handleAnalyzeInDispatch() {
    if (results.length === 0 || sendingToChat) return;
    sendingToChat = true;
    try {
      const thread = await createNewThread();
      if (!thread) return;
      const summaryContext = results
        .slice(0, 5)
        .map(
          (r, i) =>
            `${i + 1}. ${r.title}\nURL: ${r.url}\n${r.excerpt.slice(0, 500)}`
        )
        .join('\n\n');
      await goto('/');
      await sendChatMessage(
        `Synthesize these live Web Recon results for "${query.trim()}" and highlight key takeaways with source citations:\n\n${summaryContext}`,
        []
      );
    } finally {
      sendingToChat = false;
    }
  }
</script>

<div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">
  <div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15"></div>
  <div class="max-w-5xl mx-auto space-y-4 sm:space-y-6 relative z-10">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-olive-drab/40"
    >
      <div>
        <h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">
          Web Recon · Modular Search
        </h1>
        <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-0.5 leading-snug">
          Query Gemini Native, SearXNG, Brave, Tavily, Custom Endpoint, or Parallel MCP and index findings into Mnemosyne OS.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select
          aria-label="Active Web Recon provider"
          value={activeProvider}
          onchange={(e) =>
            void updateSettings({
              searchProvider: e.currentTarget.value as SearchProvider,
            })}
          class="flex-1 sm:flex-initial h-8 px-2.5 rounded border border-[#005a63]/60 bg-[#091517] text-[11px] font-bold tracking-wider uppercase text-cyber-cyan focus:outline-none focus:border-cyber-cyan"
        >
          {#each PROVIDER_OPTIONS as opt (opt.id)}
            <option value={opt.id}>{opt.label}</option>
          {/each}
        </select>
        <a
          href="/vault"
          class="h-8 px-2.5 rounded border border-olive-drab/50 bg-[#12140e] text-[11px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 text-olive-bright hover:border-olive-bright transition-colors shrink-0"
        >
          <Globe class="w-3.5 h-3.5" />
          <span>CONFIG</span>
        </a>
      </div>
    </div>

    <!-- Search Bar -->
    <form
      onsubmit={runWebSearch}
      class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3 sm:p-4 space-y-2.5"
    >
      <div class="flex flex-col sm:flex-row gap-2">
        <div class="relative flex-1">
          <Search class="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            bind:value={query}
            placeholder="Search the live internet..."
            class="w-full h-9 pl-9 pr-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
          />
        </div>
        <button
          type="submit"
          disabled={!query.trim() || searching}
          class="h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold tracking-wider inline-flex items-center justify-center gap-2 border border-olive-bright/30 cursor-pointer uppercase"
        >
          {#if searching}
            <Loader2 class="w-3.5 h-3.5 animate-spin text-cyber-cyan" />
            <span>SCANNING...</span>
          {:else}
            <Globe class="w-3.5 h-3.5 text-olive-bright" />
            <span>SEARCH WEB</span>
          {/if}
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-1.5">
        <span class="text-[10px] uppercase tracking-wider text-stone-500">Quick Probes:</span>
        {#each QUICK_PROBES as probe}
          <button
            type="button"
            onclick={() => {
              query = probe;
              void runWebSearch();
            }}
            class="font-prose px-2 py-1 rounded border border-olive-drab/35 bg-[#0d0e0a] hover:border-olive-bright/60 text-[11.5px] text-stone-300 hover:text-olive-bright transition-colors cursor-pointer"
          >
            {probe}
          </button>
        {/each}
      </div>
    </form>

    <!-- Direct URL Extractor -->
    <div class="rounded-lg border border-olive-drab/35 bg-[#12140e] p-3 sm:p-4 space-y-2">
      <div class="text-[10.5px] font-bold tracking-wider text-stone-400 uppercase">
        Direct URL Reader (web_fetch)
      </div>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          bind:value={directUrl}
          placeholder="https://example.com/article"
          class="flex-1 h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
        />
        <button
          type="button"
          disabled={!directUrl.trim() || fetchingUrl !== null}
          onclick={() => void handleFetchPage(directUrl)}
          class="h-9 px-3.5 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan disabled:opacity-40 text-cyber-cyan text-xs font-bold uppercase cursor-pointer inline-flex items-center justify-center gap-1.5"
        >
          <FileText class="w-3.5 h-3.5" />
          <span>{fetchingUrl === directUrl.trim() ? 'READING...' : 'FETCH PAGE'}</span>
        </button>
      </div>
    </div>

    {#if errorMsg}
      <div class="px-3.5 py-2 rounded border border-red-500/50 bg-red-950/50 font-prose text-xs text-red-300">
        {errorMsg}
      </div>
    {/if}

    {#if statusNotice}
      <div class="px-3.5 py-2 rounded border border-olive-bright/50 bg-[#141710] font-prose text-xs text-olive-bright">
        {statusNotice}
      </div>
    {/if}

    <!-- Direct Fetched Page Preview -->
    {#each Object.values(fetchedPages).filter((p) => !results.some((r) => r.url === p.url)) as pageItem (pageItem.url)}
      <div class="rounded-lg border border-[#005a63]/60 bg-[#091517] p-3.5 sm:p-4 space-y-2">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="font-prose text-sm font-semibold text-cyber-cyan break-all">
            {pageItem.title || pageItem.url}
          </div>
          {#if pageItem.publishDate}
            <span class="text-[10px] text-stone-400 tabular-nums">{pageItem.publishDate}</span>
          {/if}
        </div>
        <div class="font-prose space-y-2 text-[13.5px] sm:text-[13px] text-cyan-100/85 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
          {pageItem.excerpts.join('\n\n')}
        </div>
      </div>
    {/each}

    <!-- Results List -->
    {#if results.length > 0}
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div class="text-[11px] text-stone-400 uppercase tracking-wider">
          {results.length} LIVE RESULTS {#if lastProvider}· {lastProvider.toUpperCase()}{/if}
        </div>
        <button
          type="button"
          disabled={sendingToChat}
          onclick={() => void handleAnalyzeInDispatch()}
          class="h-8 px-3.5 rounded bg-[#091517] hover:border-cyber-cyan border border-[#005a63]/60 text-cyber-cyan text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageSquarePlus class="w-3.5 h-3.5" />
          <span>{sendingToChat ? 'DISPATCHING...' : 'Synthesize in Dispatch'}</span>
        </button>
      </div>

      <div class="space-y-3">
        {#each results as item (item.url)}
          {@const href = safeExternalUrl(item.url)}
          {@const fetched = fetchedPages[item.url]}
          <article
            class="rounded-lg border border-[#005a63]/50 bg-[#091517] p-3 sm:p-4 space-y-2 relative"
          >
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div class="min-w-0 space-y-0.5">
                {#if href}
                  <a
                    {href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-prose inline-flex items-center gap-1.5 text-[14.5px] sm:text-sm font-semibold text-cyber-cyan hover:underline break-words leading-snug"
                  >
                    <span>{item.title}</span>
                    <ExternalLink class="w-3.5 h-3.5 shrink-0" />
                  </a>
                {:else}
                  <h2 class="font-prose text-[14.5px] sm:text-sm font-semibold text-cyber-cyan leading-snug">{item.title}</h2>
                {/if}
                <div class="text-[10.5px] text-stone-400 truncate">
                  {item.url}
                  {#if item.publishDate}
                    <span class="ml-1.5 text-olive-bright tabular-nums">· {item.publishDate}</span>
                  {/if}
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={fetchingUrl === item.url}
                  onclick={() => void handleFetchPage(item.url)}
                  class="h-7 px-2.5 rounded border border-olive-drab/50 bg-[#12140e] hover:border-olive-bright text-[10.5px] font-bold text-stone-200 hover:text-olive-bright cursor-pointer inline-flex items-center gap-1 uppercase"
                >
                  <Sparkles class="w-3 h-3" />
                  <span>{fetchingUrl === item.url ? 'READING...' : fetched ? 'REFRESH' : 'READ PAGE'}</span>
                </button>
                <button
                  type="button"
                  disabled={indexingUrl === item.url}
                  onclick={() => void handleIndexToVault(item)}
                  class="h-7 px-2.5 rounded border border-olive-drab/50 bg-[#12140e] hover:border-cyber-cyan text-[10.5px] font-bold text-stone-200 hover:text-cyber-cyan cursor-pointer inline-flex items-center gap-1 uppercase"
                >
                  <Database class="w-3 h-3" />
                  <span>{indexingUrl === item.url ? 'SAVING...' : 'VAULT'}</span>
                </button>
              </div>
            </div>

            {#if fetched}
              <div
                class="font-prose rounded border border-[#005a63]/40 bg-[#060f11] p-2.5 sm:p-3 text-[13.5px] sm:text-[13px] text-cyan-100/85 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto"
              >
                {fetched.excerpts.join('\n\n')}
              </div>
            {:else if item.excerpt}
              <p class="font-prose text-[13.5px] sm:text-[13px] text-cyan-100/80 leading-relaxed whitespace-pre-wrap">
                {item.excerpt}
              </p>
            {/if}
          </article>
        {/each}
      </div>
    {/if}
  </div>
</div>
