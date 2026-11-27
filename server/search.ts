import { loadState, resolveProviderKey } from './store.ts';
import { getGeminiClient } from './ai.ts';
import type { SearchProvider, WebSearchSource } from '../src/types/index.ts';

const PARALLEL_MCP_ENDPOINT = 'https://mcp.parallel.ai/mcp';

export interface ParallelSearchResponse {
  searchId?: string;
  sessionId?: string;
  results: WebSearchSource[];
  authMode: 'vault' | 'env' | 'anonymous';
}

export interface ParallelFetchResult {
  url: string;
  title: string | null;
  publishDate: string | null;
  excerpts: string[];
  fullContent?: string | null;
}

export interface ModularSearchResponse {
  provider: SearchProvider;
  query: string;
  results: WebSearchSource[];
  searchId?: string;
  sessionId?: string;
  authMode?: 'vault' | 'env' | 'anonymous';
}

export interface SearchTestResult {
  ok: boolean;
  provider: SearchProvider;
  latencyMs: number;
  resultCount: number;
  sampleTitle?: string;
  message: string;
}

/**
 * Validates that an external URL uses http/https and is not a private/loopback/metadata target.
 */
export function isAllowedPublicUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }
    if (parsed.username || parsed.password) {
      return false;
    }
    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (
      !host ||
      host === 'localhost' ||
      host === '::' ||
      host === '::1' ||
      host.startsWith('::ffff:') ||
      host === '0.0.0.0' ||
      host === 'metadata.google.internal' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      host.startsWith('127.') ||
      host.startsWith('169.254.') ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(host) ||
      /^f[cd][0-9a-f]{2}:/i.test(host) ||
      /^fe[89ab][0-9a-f]:/i.test(host) ||
      (!host.includes('.') && !host.includes(':'))
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a configured self-hosted endpoint (e.g. SearXNG or Custom Endpoint).
 * Allows http/https including localhost/LAN for self-hosted instances, while blocking
 * non-HTTP schemes, embedded credentials, and cloud metadata IPs.
 */
export function isAllowedConfiguredEndpoint(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }
    if (parsed.username || parsed.password) {
      return false;
    }
    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (
      !host ||
      host === 'metadata.google.internal' ||
      host === 'metadata.goog' ||
      host.startsWith('169.254.') ||
      host === 'fd00:ec2::254'
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function isSafeResultUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function sanitizePublicUrl(rawUrl: string): string {
  return isAllowedPublicUrl(rawUrl) ? rawUrl : '';
}

function buildParallelHeaders(): {
  headers: Record<string, string>;
  authMode: 'vault' | 'env' | 'anonymous';
} {
  const resolved = resolveProviderKey('parallel');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };
  if (resolved.key) {
    headers['x-api-key'] = resolved.key;
    headers['Authorization'] = `Bearer ${resolved.key}`;
  }
  return {
    headers,
    authMode: resolved.source === 'none' ? 'anonymous' : resolved.source,
  };
}

function safeJsonParse(raw: string, label: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error(`Unexpected ${label} shape from Parallel MCP.`);
    }
    return parsed as Record<string, unknown>;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Unexpected ')) {
      throw err;
    }
    throw new Error(`Invalid ${label} returned by Parallel MCP.`);
  }
}

function parseMcpJsonRpcBody(rawBody: string): Record<string, unknown> {
  const trimmed = rawBody.trim();
  if (!trimmed) {
    throw new Error('Empty response from Parallel MCP server.');
  }

  if (trimmed.startsWith('event:') || trimmed.includes('\ndata:') || trimmed.startsWith('data:')) {
    const lines = trimmed.split(/\r?\n/);
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (line.startsWith('data:')) {
        const payload = line.slice(5).trim();
        if (payload && payload !== '[DONE]') {
          return safeJsonParse(payload, 'SSE payload');
        }
      }
    }
  }

  return safeJsonParse(trimmed, 'JSON-RPC response');
}

async function callParallelMcpTool<T>(
  toolName: string,
  args: Record<string, unknown>
): Promise<{ data: T; authMode: 'vault' | 'env' | 'anonymous' }> {
  const { headers, authMode } = buildParallelHeaders();
  const res = await fetch(PARALLEL_MCP_ENDPOINT, {
    method: 'POST',
    headers,
    signal: AbortSignal.timeout(22000),
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args,
      },
    }),
  });

  const rawText = await res.text();
  if (!res.ok) {
    throw new Error(`Parallel MCP error (${res.status}): ${rawText.slice(0, 280) || res.statusText}`);
  }

  const rpc = parseMcpJsonRpcBody(rawText);
  if (rpc.error && typeof rpc.error === 'object') {
    const errObj = rpc.error as { message?: string };
    throw new Error(errObj.message || 'Parallel MCP tool call failed.');
  }

  const result = (rpc.result ?? {}) as {
    isError?: boolean;
    structuredContent?: T;
    content?: Array<{ type?: string; text?: string }>;
  };

  if (result.isError) {
    const errText =
      result.content?.map((c) => c.text).filter(Boolean).join(' ') ||
      'Parallel tool returned an error.';
    throw new Error(errText);
  }

  if (result.structuredContent) {
    return { data: result.structuredContent, authMode };
  }

  const textPayload = result.content?.find((c) => typeof c.text === 'string')?.text;
  if (!textPayload) {
    throw new Error('Parallel MCP returned empty tool content.');
  }

  return { data: safeJsonParse(textPayload, 'tool content') as T, authMode };
}

export function deriveSearchQueries(prompt: string): string[] {
  const cleaned = prompt
    .replace(/["'`?¿!()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return [];

  const words = cleaned.split(' ').filter(Boolean);
  const primary = words.slice(0, 6).join(' ');
  const queries = [primary];
  if (words.length > 6) {
    const secondary = words.slice(Math.max(0, words.length - 6)).join(' ');
    if (secondary && secondary !== primary) {
      queries.push(secondary);
    }
  }
  return queries;
}

export async function parallelWebSearch(params: {
  objective: string;
  searchQueries?: string[];
  sessionId?: string;
  maxResults?: number;
}): Promise<ParallelSearchResponse> {
  const objective = params.objective.trim().slice(0, 800);
  if (!objective) {
    throw new Error('Search objective cannot be empty.');
  }

  const normalizedQueries = (
    params.searchQueries && params.searchQueries.length > 0
      ? params.searchQueries
      : deriveSearchQueries(objective)
  )
    .map((q) => q.replace(/["']/g, '').trim().slice(0, 140))
    .filter(Boolean)
    .slice(0, 4);

  if (normalizedQueries.length === 0) {
    normalizedQueries.push(objective.slice(0, 80));
  }

  const args: Record<string, unknown> = {
    objective,
    search_queries: normalizedQueries,
  };
  if (params.sessionId) {
    args.session_id = params.sessionId;
  }

  const { data, authMode } = await callParallelMcpTool<{
    search_id?: string;
    session_id?: string;
    results?: Array<{
      url?: string;
      title?: string | null;
      publish_date?: string | null;
      excerpts?: string[];
    }>;
  }>('web_search', args);

  const limit = Math.min(20, Math.max(1, params.maxResults ?? 8));
  const results: WebSearchSource[] = (data.results ?? [])
    .filter((r) => r.url && isAllowedPublicUrl(r.url))
    .slice(0, limit)
    .map((r) => ({
      title: (r.title || r.url || 'Web Source').trim(),
      url: r.url!,
      publishDate: r.publish_date ?? null,
      excerpt: Array.isArray(r.excerpts)
        ? r.excerpts.slice(0, 2).join('\n\n').slice(0, 1400)
        : '',
      provider: 'parallel',
    }));

  return {
    searchId: data.search_id,
    sessionId: data.session_id,
    results,
    authMode,
  };
}

export async function parallelWebFetch(params: {
  urls: string[];
  objective?: string;
  sessionId?: string;
}): Promise<{ results: ParallelFetchResult[]; authMode: 'vault' | 'env' | 'anonymous' }> {
  const safeUrls = params.urls
    .map((u) => u.trim())
    .filter((u) => isAllowedPublicUrl(u))
    .slice(0, 3);

  if (safeUrls.length === 0) {
    throw new Error('Provide at least one valid public http/https URL.');
  }

  const args: Record<string, unknown> = {
    urls: safeUrls,
  };
  if (params.objective?.trim()) {
    args.objective = params.objective.trim().slice(0, 400);
  }
  if (params.sessionId) {
    args.session_id = params.sessionId;
  }

  const { data, authMode } = await callParallelMcpTool<{
    results?: Array<{
      url?: string;
      title?: string | null;
      publish_date?: string | null;
      excerpts?: string[];
      full_content?: string | null;
    }>;
  }>('web_fetch', args);

  const results: ParallelFetchResult[] = (data.results ?? [])
    .filter((r) => r.url && isAllowedPublicUrl(r.url))
    .map((r) => ({
      url: r.url!,
      title: r.title ?? null,
      publishDate: r.publish_date ?? null,
      excerpts: Array.isArray(r.excerpts) ? r.excerpts : [],
      fullContent: r.full_content ?? null,
    }));

  return { results, authMode };
}

/**
 * 1. SearXNG (Self-Hosted) -> GET {SEARXNG_BASE_URL}/search?q={query}&format=json
 */
export async function searchSearXNG(
  query: string,
  maxResults: number,
  baseUrlOverride?: string
): Promise<WebSearchSource[]> {
  const state = loadState();
  const rawBase = (baseUrlOverride ?? state.settings.searxngBaseUrl ?? 'http://localhost:8888').trim();
  const normalizedBase = rawBase.replace(/\/+$/, '');
  if (!isAllowedConfiguredEndpoint(normalizedBase)) {
    throw new Error('Invalid SEARXNG_BASE_URL. Use a valid http:// or https:// base URL.');
  }

  const endpoint = `${normalizedBase}/search?q=${encodeURIComponent(query)}&format=json`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`SearXNG error (${res.status}): ${errText.slice(0, 220)}`);
  }

  const data = (await res.json()) as {
    results?: Array<{
      title?: string;
      url?: string;
      content?: string;
      snippet?: string;
      publishedDate?: string | null;
    }>;
  };

  return (data.results ?? [])
    .filter((r) => r.url && isSafeResultUrl(r.url))
    .slice(0, maxResults)
    .map((r) => ({
      title: (r.title || r.url || 'SearXNG Result').trim(),
      url: r.url!,
      publishDate: r.publishedDate ?? null,
      excerpt: (r.content || r.snippet || '').trim().slice(0, 1200),
      provider: 'searxng',
    }));
}

/**
 * 2. Brave Search API -> GET https://api.search.brave.com/res/v1/web/search
 */
export async function searchBrave(query: string, maxResults: number): Promise<WebSearchSource[]> {
  const apiKey = resolveProviderKey('brave').key;
  if (!apiKey) {
    throw new Error('BRAVE_API_KEY is not configured. Add it in Vault -> Web Search / Recon.');
  }

  const count = Math.min(20, Math.max(1, maxResults));
  const endpoint = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': apiKey,
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Brave Search error (${res.status}): ${errText.slice(0, 220)}`);
  }

  const data = (await res.json()) as {
    web?: {
      results?: Array<{
        title?: string;
        url?: string;
        description?: string;
        age?: string;
        page_age?: string;
        extra_snippets?: string[];
      }>;
    };
  };

  return (data.web?.results ?? [])
    .filter((r) => r.url && isSafeResultUrl(r.url))
    .slice(0, count)
    .map((r) => {
      const snippetParts = [r.description, ...(r.extra_snippets ?? []).slice(0, 1)].filter(Boolean);
      return {
        title: (r.title || r.url || 'Brave Result').trim(),
        url: r.url!,
        publishDate: r.page_age || r.age || null,
        excerpt: snippetParts.join(' ').trim().slice(0, 1200),
        provider: 'brave',
      };
    });
}

/**
 * 3. Tavily Search API -> POST https://api.tavily.com/search
 */
export async function searchTavily(query: string, maxResults: number): Promise<WebSearchSource[]> {
  const apiKey = resolveProviderKey('tavily').key;
  if (!apiKey) {
    throw new Error('TAVILY_API_KEY is not configured. Add it in Vault -> Web Search / Recon.');
  }

  const count = Math.min(20, Math.max(1, maxResults));
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(18000),
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: count,
      search_depth: 'basic',
      include_answer: false,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Tavily Search error (${res.status}): ${errText.slice(0, 220)}`);
  }

  const data = (await res.json()) as {
    results?: Array<{
      title?: string;
      url?: string;
      content?: string;
      published_date?: string | null;
    }>;
  };

  return (data.results ?? [])
    .filter((r) => r.url && isSafeResultUrl(r.url))
    .slice(0, count)
    .map((r) => ({
      title: (r.title || r.url || 'Tavily Result').trim(),
      url: r.url!,
      publishDate: r.published_date ?? null,
      excerpt: (r.content || '').trim().slice(0, 1200),
      provider: 'tavily',
    }));
}

/**
 * 4. Custom Endpoint -> GET or POST to CUSTOM_SEARCH_URL with optional Bearer token
 */
export async function searchCustomEndpoint(
  query: string,
  maxResults: number,
  options?: { customUrl?: string; method?: 'GET' | 'POST' }
): Promise<WebSearchSource[]> {
  const state = loadState();
  const rawUrl = (options?.customUrl ?? state.settings.customSearchUrl ?? '').trim();
  if (!rawUrl) {
    throw new Error('CUSTOM_SEARCH_URL is not configured. Add it in Vault -> Web Search / Recon.');
  }
  if (!isAllowedConfiguredEndpoint(rawUrl)) {
    throw new Error('Invalid CUSTOM_SEARCH_URL. Must be a valid http:// or https:// endpoint.');
  }

  const method = options?.method ?? state.settings.customSearchMethod ?? 'GET';
  const bearerKey = resolveProviderKey('custom_search').key;
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (bearerKey) {
    headers['Authorization'] = `Bearer ${bearerKey}`;
  }

  let fetchUrl = rawUrl;
  const fetchInit: RequestInit = {
    method,
    headers,
    signal: AbortSignal.timeout(18000),
  };

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json';
    fetchInit.body = JSON.stringify({
      query,
      q: query,
      max_results: maxResults,
      limit: maxResults,
    });
  } else {
    if (rawUrl.includes('{query}')) {
      fetchUrl = rawUrl.replace(/\{query\}/g, encodeURIComponent(query));
    } else {
      const u = new URL(rawUrl);
      if (!u.searchParams.has('q') && !u.searchParams.has('query')) {
        u.searchParams.set('q', query);
      }
      if (!u.searchParams.has('limit') && !u.searchParams.has('max_results')) {
        u.searchParams.set('limit', String(maxResults));
      }
      fetchUrl = u.toString();
    }
  }

  const res = await fetch(fetchUrl, fetchInit);
  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(`Custom Search Endpoint error (${res.status}): ${errText.slice(0, 220)}`);
  }

  const payload = (await res.json()) as unknown;
  const rawItems: Array<Record<string, unknown>> = Array.isArray(payload)
    ? (payload as Array<Record<string, unknown>>)
    : Array.isArray((payload as { results?: unknown[] })?.results)
      ? ((payload as { results: Array<Record<string, unknown>> }).results)
      : Array.isArray((payload as { items?: unknown[] })?.items)
        ? ((payload as { items: Array<Record<string, unknown>> }).items)
        : Array.isArray((payload as { data?: unknown[] })?.data)
          ? ((payload as { data: Array<Record<string, unknown>> }).data)
          : Array.isArray((payload as { web?: { results?: unknown[] } })?.web?.results)
            ? ((payload as { web: { results: Array<Record<string, unknown>> } }).web.results)
            : [];

  return rawItems
    .map((item) => {
      const urlVal = String(item.url ?? item.link ?? item.href ?? '').trim();
      const titleVal = String(item.title ?? item.name ?? urlVal).trim();
      const snippetVal = String(
        item.snippet ?? item.excerpt ?? item.content ?? item.description ?? ''
      ).trim();
      const dateVal =
        typeof item.publishDate === 'string'
          ? item.publishDate
          : typeof item.published_date === 'string'
            ? item.published_date
            : typeof item.date === 'string'
              ? item.date
              : null;
      return {
        title: titleVal || 'Custom Result',
        url: urlVal,
        publishDate: dateVal,
        excerpt: snippetVal.slice(0, 1200),
        provider: 'custom',
      };
    })
    .filter((r) => r.url && isSafeResultUrl(r.url))
    .slice(0, maxResults);
}

/**
 * 5. Gemini Native (Google Search grounding) for non-Gemini LLMs, /api/search, and connection testing
 */
export async function searchGeminiNative(
  query: string,
  maxResults: number
): Promise<WebSearchSource[]> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured in server secrets.');
  }

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Search the web and summarize key verifiable facts for: ${query}`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const meta = response.candidates?.[0]?.groundingMetadata as
    | {
        groundingChunks?: Array<{ web?: { uri?: string; title?: string } }>;
        groundingSupports?: Array<{
          segment?: { text?: string };
          groundingChunkIndices?: number[];
        }>;
      }
    | undefined;

  const chunks = meta?.groundingChunks ?? [];
  const supports = meta?.groundingSupports ?? [];
  const byUrl = new Map<string, WebSearchSource>();
  const indexedUrls: Array<string | null> = [];

  for (const c of chunks) {
    const uri = c.web?.uri;
    if (uri && isSafeResultUrl(uri)) {
      indexedUrls.push(uri);
      if (!byUrl.has(uri)) {
        byUrl.set(uri, {
          title: (c.web?.title || uri).trim(),
          url: uri,
          publishDate: null,
          excerpt: '',
          provider: 'gemini-native',
        });
      }
    } else {
      indexedUrls.push(null);
    }
  }

  for (const sup of supports) {
    const seg = sup.segment?.text?.trim();
    if (!seg || !sup.groundingChunkIndices) continue;
    for (const idx of sup.groundingChunkIndices) {
      const u = indexedUrls[idx];
      if (!u) continue;
      const entry = byUrl.get(u);
      if (entry && entry.excerpt.length < 360) {
        entry.excerpt = entry.excerpt ? `${entry.excerpt} ${seg}`.slice(0, 480) : seg.slice(0, 480);
      }
    }
  }

  const fallbackSummary = (response.text ?? '').trim().slice(0, 500);
  const sources = Array.from(byUrl.values()).slice(0, maxResults);
  if (sources.length > 0 && fallbackSummary) {
    for (const s of sources) {
      if (!s.excerpt) s.excerpt = fallbackSummary;
    }
  }

  return sources;
}

/**
 * Unified Modular Web Recon Dispatcher
 */
export async function executeWebReconSearch(params: {
  query: string;
  provider?: SearchProvider;
  maxResults?: number;
  queries?: string[];
  sessionId?: string;
}): Promise<ModularSearchResponse> {
  const state = loadState();
  const query = params.query.trim().slice(0, 800);
  if (!query) {
    throw new Error('Search query cannot be empty.');
  }

  const provider: SearchProvider = params.provider ?? state.settings.searchProvider ?? 'gemini-native';
  const maxResults = Math.min(
    20,
    Math.max(1, params.maxResults ?? state.settings.maxSearchResults ?? 5)
  );

  if (provider === 'searxng') {
    const results = await searchSearXNG(query, maxResults);
    return { provider, query, results };
  }
  if (provider === 'brave') {
    const results = await searchBrave(query, maxResults);
    return { provider, query, results };
  }
  if (provider === 'tavily') {
    const results = await searchTavily(query, maxResults);
    return { provider, query, results };
  }
  if (provider === 'custom') {
    const results = await searchCustomEndpoint(query, maxResults);
    return { provider, query, results };
  }
  if (provider === 'parallel') {
    const res = await parallelWebSearch({
      objective: query,
      searchQueries: params.queries,
      sessionId: params.sessionId,
      maxResults,
    });
    return {
      provider,
      query,
      results: res.results,
      searchId: res.searchId,
      sessionId: res.sessionId,
      authMode: res.authMode,
    };
  }

  // gemini-native
  const results = await searchGeminiNative(query, maxResults);
  return { provider: 'gemini-native', query, results };
}

/**
 * Live Connection Probe for Vault UI ("Test Connection")
 */
export async function testSearchProviderConnection(params?: {
  provider?: SearchProvider;
  searxngBaseUrl?: string;
  customSearchUrl?: string;
  customSearchMethod?: 'GET' | 'POST';
  maxSearchResults?: number;
}): Promise<SearchTestResult> {
  const state = loadState();
  const provider: SearchProvider = params?.provider ?? state.settings.searchProvider ?? 'gemini-native';
  const maxResults = Math.min(5, Math.max(1, params?.maxSearchResults ?? state.settings.maxSearchResults ?? 5));
  const probeQuery = 'SvelteKit latest release';
  const started = Date.now();

  try {
    let results: WebSearchSource[] = [];
    if (provider === 'searxng') {
      results = await searchSearXNG(probeQuery, maxResults, params?.searxngBaseUrl);
    } else if (provider === 'brave') {
      results = await searchBrave(probeQuery, maxResults);
    } else if (provider === 'tavily') {
      results = await searchTavily(probeQuery, maxResults);
    } else if (provider === 'custom') {
      results = await searchCustomEndpoint(probeQuery, maxResults, {
        customUrl: params?.customSearchUrl,
        method: params?.customSearchMethod,
      });
    } else if (provider === 'parallel') {
      const res = await parallelWebSearch({ objective: probeQuery, maxResults });
      results = res.results;
    } else {
      results = await searchGeminiNative(probeQuery, maxResults);
    }

    const latencyMs = Date.now() - started;
    return {
      ok: true,
      provider,
      latencyMs,
      resultCount: results.length,
      sampleTitle: results[0]?.title,
      message:
        results.length > 0
          ? `Connected to ${provider.toUpperCase()} (${results.length} results in ${latencyMs}ms).`
          : `Connected to ${provider.toUpperCase()} in ${latencyMs}ms (0 results returned for probe).`,
    };
  } catch (err) {
    return {
      ok: false,
      provider,
      latencyMs: Date.now() - started,
      resultCount: 0,
      message: err instanceof Error ? err.message : 'Connection test failed.',
    };
  }
}

export function formatWebSearchSystemBlock(
  query: string,
  sources: WebSearchSource[],
  provider: SearchProvider = 'parallel'
): string {
  if (sources.length === 0) return '';
  const providerLabel = provider.toUpperCase().replace('-', ' ');
  const items = sources
    .map((s, idx) => {
      const dateStr = s.publishDate ? ` (${s.publishDate})` : '';
      const snippet = s.excerpt ? `\n${s.excerpt.slice(0, 900)}` : '';
      return `[${idx + 1}] ${s.title}${dateStr}\nURL: ${s.url}${snippet}`;
    })
    .join('\n\n');

  return `[WEB RECON SEARCH RESULTS via ${providerLabel} for "${query}"]
Use these live web findings to answer accurately with current facts. Cite relevant source titles or URLs inline when helpful.

${items}`;
}
