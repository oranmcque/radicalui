<script lang="ts">
  import {
    Volume2,
    CircleCheck,
    CircleAlert,
    KeyRound,
    Trash2,
    Save,
    Globe,
    Radar,
    Loader2,
    HardDrive,
    Cloud,
    FolderOpen,
    Upload,
    Download,
  } from 'lucide-svelte';
  import type {
    ProviderStatus,
    STTProvider,
    SearchProvider,
    StorageConfigPublic,
    StorageMode,
    TTSProvider,
  } from '../../types/index';
  import {
    parseJsonSafe,
    providers,
    refreshWorkspace,
    settings,
    settingsLoaded,
    storageConfig,
    updateSettings,
  } from '#lib/stores/workspace';

  type EditableKeyId =
    | 'parallel'
    | 'deepgram'
    | 'fishaudio'
    | 'nanogpt'
    | 'deepseek'
    | 'openai'
    | 'brave'
    | 'tavily'
    | 'custom_search';

  const EDITABLE_PROVIDERS: Array<{ id: EditableKeyId; placeholder: string }> = [
    { id: 'deepgram', placeholder: 'Paste Deepgram API key (Token)...' },
    { id: 'fishaudio', placeholder: 'Paste Fish Audio Bearer API key...' },
    { id: 'nanogpt', placeholder: 'Paste NanoGPT API key...' },
    { id: 'deepseek', placeholder: 'Paste DeepSeek API key (sk-...)...' },
    { id: 'openai', placeholder: 'Paste OpenAI API key (sk-...)...' },
    {
      id: 'parallel',
      placeholder: 'Paste Parallel API key (optional — anonymous MCP active)...',
    },
  ];

  const SEARCH_PROVIDERS: Array<{
    id: SearchProvider;
    label: string;
    shortLabel: string;
    detail: string;
  }> = [
    {
      id: 'gemini-native',
      label: 'Gemini Native (Google Search)',
      shortLabel: 'GEMINI NATIVE',
      detail: 'Native googleSearch tool & grounding citations on Gemini models (env GEMINI_API_KEY).',
    },
    {
      id: 'searxng',
      label: 'SearXNG (Self-Hosted)',
      shortLabel: 'SEARXNG',
      detail: 'Queries your local/LAN SearXNG JSON API ({SEARXNG_BASE_URL}/search?format=json).',
    },
    {
      id: 'brave',
      label: 'Brave Search',
      shortLabel: 'BRAVE',
      detail: 'Independent web search REST API using BRAVE_API_KEY.',
    },
    {
      id: 'tavily',
      label: 'Tavily',
      shortLabel: 'TAVILY',
      detail: 'AI-ready search & content extraction API using TAVILY_API_KEY.',
    },
    {
      id: 'custom',
      label: 'Custom Endpoint',
      shortLabel: 'CUSTOM',
      detail: 'Sends GET or POST to CUSTOM_SEARCH_URL with optional Bearer token.',
    },
    {
      id: 'parallel',
      label: 'Parallel MCP',
      shortLabel: 'PARALLEL MCP',
      detail: 'Streamable HTTP MCP search via mcp.parallel.ai/mcp.',
    },
  ];

  const STORAGE_MODES: Array<{
    id: StorageMode;
    label: string;
    subtitle: string;
  }> = [
    {
      id: 'local',
      label: 'Local Workspace',
      subtitle: 'Default ./data/aetheris-store.json on VPS disk.',
    },
    {
      id: 'mounted',
      label: 'Mounted Local / Hetzner Box',
      subtitle: 'Direct atomic writes to a mounted VPS path (e.g. /mnt/hetzner-box/pheonikz via SSHFS/CIFS).',
    },
    {
      id: 'webdav',
      label: 'WebDAV (Hetzner / Cloud)',
      subtitle: 'HTTPS WebDAV sync (https://uXXXXXX.your-storagebox.de/...) with local cache.',
    },
    {
      id: 'remote-http',
      label: 'External / Cloud HTTP',
      subtitle: 'PUT/POST JSON sync to any external REST, R2, or S3 gateway with optional Bearer token.',
    },
  ];

  // Storage Backend state
  let storageModeDraft = $state<StorageMode>($storageConfig?.mode ?? 'local');
  let mountedPathDraft = $state($storageConfig?.mountedPath ?? '/mnt/hetzner-box/pheonikz');
  let remoteUrlDraft = $state($storageConfig?.remoteUrl ?? '');
  let remoteUsernameDraft = $state($storageConfig?.remoteUsername ?? '');
  let remotePasswordDraft = $state('');
  let remoteTokenDraft = $state('');
  let remoteMethodDraft = $state<'PUT' | 'POST'>($storageConfig?.remoteMethod ?? 'PUT');
  let autoSyncRemoteDraft = $state($storageConfig?.autoSyncRemote ?? true);
  let migrateDataDraft = $state(true);
  let preferExistingDraft = $state(false);
  let storageSyncedInit = $state(false);
  let testingStorage = $state(false);
  let savingStorage = $state(false);
  let syncingStorage = $state<'push' | 'pull' | null>(null);
  let storageFeedback = $state<{
    ok: boolean;
    message: string;
    latencyMs?: number;
  } | null>(null);

  $effect(() => {
    if ($storageConfig && !storageSyncedInit) {
      storageModeDraft = $storageConfig.mode;
      mountedPathDraft = $storageConfig.mountedPath || '/mnt/hetzner-box/pheonikz';
      remoteUrlDraft = $storageConfig.remoteUrl || '';
      remoteUsernameDraft = $storageConfig.remoteUsername || '';
      remoteMethodDraft = $storageConfig.remoteMethod || 'PUT';
      autoSyncRemoteDraft = $storageConfig.autoSyncRemote ?? true;
      storageSyncedInit = true;
    }
  });

  // Web Recon & Audio state
  let testingTts = $state(false);
  let testError = $state<string | null>(null);
  let systemPromptDraft = $state($settings?.systemPrompt ?? '');
  let fishVoiceDraft = $state($settings?.fishVoiceId ?? '');
  let searxngUrlDraft = $state($settings?.searxngBaseUrl ?? 'http://localhost:8888');
  let customSearchUrlDraft = $state($settings?.customSearchUrl ?? '');
  let customSearchMethodDraft = $state<'GET' | 'POST'>(
    $settings?.customSearchMethod ?? 'GET'
  );
  let maxSearchResultsDraft = $state<number>($settings?.maxSearchResults ?? 5);
  let reconSavedToast = $state(false);
  let testingRecon = $state(false);
  let reconTestResult = $state<{
    ok: boolean;
    message: string;
    sampleTitle?: string;
    latencyMs?: number;
  } | null>(null);
  let savedToast = $state(false);
  let draftsSynced = $state(false);

  $effect(() => {
    if ($settingsLoaded && !draftsSynced) {
      systemPromptDraft = $settings.systemPrompt ?? '';
      fishVoiceDraft = $settings.fishVoiceId ?? '';
      searxngUrlDraft = $settings.searxngBaseUrl ?? 'http://localhost:8888';
      customSearchUrlDraft = $settings.customSearchUrl ?? '';
      customSearchMethodDraft = $settings.customSearchMethod ?? 'GET';
      maxSearchResultsDraft = $settings.maxSearchResults ?? 5;
      draftsSynced = true;
    }
  });

  let keyDrafts = $state<Record<EditableKeyId, string>>({
    parallel: '',
    deepgram: '',
    fishaudio: '',
    nanogpt: '',
    deepseek: '',
    openai: '',
    brave: '',
    tavily: '',
    custom_search: '',
  });
  let savingKeyId = $state<EditableKeyId | null>(null);
  let keyFeedback = $state<string | null>(null);

  let geminiStatus = $derived($providers.find((p) => p.id === 'gemini'));
  let braveStatus = $derived($providers.find((p) => p.id === 'brave'));
  let tavilyStatus = $derived($providers.find((p) => p.id === 'tavily'));
  let customSearchKeyStatus = $derived($providers.find((p) => p.id === 'custom_search'));

  function formatBytes(bytes: number): string {
    if (!bytes || bytes < 1024) return `${bytes || 0} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  async function handleTestStorage() {
    testingStorage = true;
    storageFeedback = null;
    try {
      const res = await fetch('/api/storage/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: storageModeDraft,
          mountedPath: mountedPathDraft.trim(),
          remoteUrl: remoteUrlDraft.trim(),
          remoteUsername: remoteUsernameDraft.trim(),
          remotePassword: remotePasswordDraft || undefined,
          remoteToken: remoteTokenDraft.trim() || undefined,
          remoteMethod: remoteMethodDraft,
        }),
      });
      const data = await parseJsonSafe<{
        ok?: boolean;
        message?: string;
        latencyMs?: number;
      }>(res);
      if (!data) {
        storageFeedback = {
          ok: false,
          message: 'Backend server unreachable. Start with npm start or npm run preview so /api/storage/* is active.',
        };
        return;
      }
      storageFeedback = {
        ok: Boolean(res.ok && data.ok),
        message: data.message || (res.ok ? 'Storage verified.' : 'Storage check failed.'),
        latencyMs: data.latencyMs,
      };
    } catch (err) {
      storageFeedback = {
        ok: false,
        message: err instanceof Error ? err.message : 'Storage probe failed.',
      };
    } finally {
      testingStorage = false;
    }
  }

  async function handleSaveStorageConfig(opts?: {
    clearRemotePassword?: boolean;
    clearRemoteToken?: boolean;
  }) {
    savingStorage = true;
    storageFeedback = null;
    try {
      const res = await fetch('/api/storage/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: storageModeDraft,
          mountedPath: mountedPathDraft.trim(),
          remoteUrl: remoteUrlDraft.trim(),
          remoteUsername: remoteUsernameDraft.trim(),
          remotePassword: remotePasswordDraft || undefined,
          clearRemotePassword: opts?.clearRemotePassword,
          remoteToken: remoteTokenDraft.trim() || undefined,
          clearRemoteToken: opts?.clearRemoteToken,
          remoteMethod: remoteMethodDraft,
          autoSyncRemote: autoSyncRemoteDraft,
          migrateData: migrateDataDraft,
          preferExistingOnTarget: preferExistingDraft,
        }),
      });
      const data = await parseJsonSafe<{
        config?: StorageConfigPublic;
        notice?: string;
        error?: string;
      }>(res);
      if (data?.config) {
        storageConfig.set(data.config);
      }
      if (!res.ok || !data) {
        storageFeedback = {
          ok: false,
          message:
            data?.error ||
            'Backend server unreachable. Start with npm start or npm run preview to apply VPS / Hetzner storage.',
        };
        return;
      }
      remotePasswordDraft = '';
      remoteTokenDraft = '';
      await refreshWorkspace();
      storageFeedback = {
        ok: true,
        message: data.notice || 'Storage backend updated.',
      };
    } catch (err) {
      storageFeedback = {
        ok: false,
        message: err instanceof Error ? err.message : 'Failed to save storage config.',
      };
    } finally {
      savingStorage = false;
    }
  }

  async function handleStorageSync(direction: 'push' | 'pull') {
    syncingStorage = direction;
    storageFeedback = null;
    try {
      const res = await fetch('/api/storage/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction }),
      });
      const data = await parseJsonSafe<{
        ok?: boolean;
        notice?: string;
        error?: string;
        config?: StorageConfigPublic;
      }>(res);
      if (data?.config) {
        storageConfig.set(data.config);
      }
      if (!res.ok || !data) {
        storageFeedback = {
          ok: false,
          message:
            data?.error ||
            `Backend server unreachable. Start with npm start or npm run preview to ${direction} storage.`,
        };
        return;
      }
      if (direction === 'pull') {
        await refreshWorkspace();
      }
      storageFeedback = {
        ok: true,
        message: data.notice || `Storage ${direction} completed.`,
      };
    } catch (err) {
      storageFeedback = {
        ok: false,
        message: err instanceof Error ? err.message : `Storage ${direction} failed.`,
      };
    } finally {
      syncingStorage = null;
    }
  }

  async function handleSaveProviderKey(providerId: EditableKeyId, keyVal: string) {
    savingKeyId = providerId;
    keyFeedback = null;
    try {
      const res = await fetch('/api/providers/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: providerId, apiKey: keyVal }),
      });
      const data = await parseJsonSafe<{ providers?: ProviderStatus[]; error?: string }>(res);
      if (res.ok && data?.providers) {
        providers.set(data.providers);
        keyDrafts = { ...keyDrafts, [providerId]: '' };
        keyFeedback = keyVal.trim()
          ? `${providerId.toUpperCase()} credential committed to server vault.`
          : `${providerId.toUpperCase()} vault credential cleared.`;
      } else {
        keyFeedback =
          data?.error ||
          'Backend server offline — run npm start or npm run preview to save credentials to the server vault.';
      }
    } catch {
      keyFeedback =
        'Backend server offline — run npm start or npm run preview to save credentials to the server vault.';
    } finally {
      savingKeyId = null;
    }
  }

  async function handleSaveReconSettings() {
    const clampedMax = Math.min(20, Math.max(1, Number(maxSearchResultsDraft) || 5));
    maxSearchResultsDraft = clampedMax;
    await updateSettings({
      searxngBaseUrl: searxngUrlDraft.trim() || 'http://localhost:8888',
      customSearchUrl: customSearchUrlDraft.trim(),
      customSearchMethod: customSearchMethodDraft,
      maxSearchResults: clampedMax,
    });
    reconSavedToast = true;
    setTimeout(() => (reconSavedToast = false), 1800);
  }

  async function handleTestReconConnection() {
    testingRecon = true;
    reconTestResult = null;
    try {
      const clampedMax = Math.min(20, Math.max(1, Number(maxSearchResultsDraft) || 5));
      await updateSettings({
        searxngBaseUrl: searxngUrlDraft.trim() || 'http://localhost:8888',
        customSearchUrl: customSearchUrlDraft.trim(),
        customSearchMethod: customSearchMethodDraft,
        maxSearchResults: clampedMax,
      });
      const res = await fetch('/api/search/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: $settings.searchProvider,
          searxngBaseUrl: searxngUrlDraft.trim() || 'http://localhost:8888',
          customSearchUrl: customSearchUrlDraft.trim(),
          customSearchMethod: customSearchMethodDraft,
          maxSearchResults: clampedMax,
        }),
      });
      const data = await parseJsonSafe<{
        ok?: boolean;
        message?: string;
        sampleTitle?: string;
        latencyMs?: number;
      }>(res);
      if (!data) {
        reconTestResult = {
          ok: false,
          message: 'Backend server unreachable. Run npm start or npm run preview to test Web Recon.',
        };
        return;
      }
      reconTestResult = {
        ok: Boolean(res.ok && data.ok),
        message: data.message || (res.ok ? 'Connection verified.' : 'Connection failed.'),
        sampleTitle: data.sampleTitle,
        latencyMs: data.latencyMs,
      };
    } catch (err) {
      reconTestResult = {
        ok: false,
        message: err instanceof Error ? err.message : 'Test request failed.',
      };
    } finally {
      testingRecon = false;
    }
  }

  async function handleSaveTextConfigs() {
    await updateSettings({
      systemPrompt: systemPromptDraft,
      fishVoiceId: fishVoiceDraft,
    });
    savedToast = true;
    setTimeout(() => (savedToast = false), 1800);
  }

  async function handleTestSpeech() {
    testError = null;
    testingTts = true;
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'Tactical audio link operational. Mnemosyne memory core standing by.',
          provider: $settings.ttsProvider,
          fishVoiceId: fishVoiceDraft,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Voice test failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play();
    } catch (err) {
      testError = err instanceof Error ? err.message : 'TTS test failed';
    } finally {
      testingTts = false;
    }
  }
</script>

  <div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">
    <div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15"></div>

    <div class="max-w-5xl mx-auto space-y-5 sm:space-y-7 relative z-10">
      <div class="pb-3 sm:pb-4 border-b border-olive-drab/40">
        <h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">
          Settings · Storage, Recon, Keys &amp; Audio
        </h1>
        <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-1 leading-snug">
          Route all Mnemosyne OS &amp; UI persistence to a mounted Hetzner Storage Box or remote
          cloud endpoint, configure Web Recon, and manage server-side credentials.
        </p>
      </div>

      <!-- Persistent Storage Backend (Hetzner Storage Box / Mounted / WebDAV / Cloud) -->
      <section class="rounded-lg border border-olive-bright/45 bg-[#12140e] p-3.5 sm:p-5 space-y-4 relative">
        <div
          class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-olive-bright opacity-55"
        ></div>

        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
          <div>
            <div
              class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-olive-bright uppercase"
            >
              <HardDrive class="w-4 h-4 shrink-0" />
              <span>Persistent Storage Backend</span>
            </div>
            <p class="font-prose text-[12.5px] sm:text-xs text-stone-400 mt-1 leading-snug">
              Store threads, Mnemosyne memories, Knowledge Vault docs, settings, and vault keys on
              your mounted Hetzner Storage Box (Contabo VPS) or sync remotely via WebDAV / HTTP.
            </p>
          </div>
          <button
            type="button"
            disabled={testingStorage}
            onclick={() => void handleTestStorage()}
            class="w-full sm:w-auto h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded border border-[#005a63]/65 bg-[#091517] hover:border-cyber-cyan disabled:opacity-50 text-[11px] font-bold text-cyber-cyan tracking-wider uppercase cursor-pointer shrink-0"
          >
            {#if testingStorage}
              <Loader2 class="w-3.5 h-3.5 animate-spin" />
              <span>TESTING...</span>
            {:else}
              <Radar class="w-3.5 h-3.5" />
              <span>Test Storage</span>
            {/if}
          </button>
        </div>

        <!-- Active Storage Readout -->
        {#if $storageConfig}
          <div
            class="rounded border border-olive-drab/40 bg-[#0d0e0a] px-3 py-2 flex flex-wrap items-center justify-between gap-1.5 text-[10.5px]"
          >
            <div class="flex flex-wrap items-center gap-1.5 min-w-0">
              <span class="px-1.5 py-0.5 rounded bg-olive-drab/30 text-olive-bright font-bold uppercase">
                {$storageConfig.mode}
              </span>
              <span class="text-stone-300 truncate max-w-full sm:max-w-md" title={$storageConfig.activeStoreFile}>
                {$storageConfig.activeStoreFile}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2.5 text-[10px] text-stone-400 uppercase tabular-nums">
              <span>{formatBytes($storageConfig.storeSizeBytes)}</span>
              {#if $storageConfig.lastSyncedAt}
                <span>SYNCED {new Date($storageConfig.lastSyncedAt).toLocaleTimeString()}</span>
              {/if}
            </div>
          </div>

          {#if $storageConfig.lastSyncError}
            <div class="px-3 py-2 rounded border border-amber-500/50 bg-amber-950/35 font-prose text-xs text-amber-300 flex items-center gap-2">
              <CircleAlert class="w-4 h-4 shrink-0" />
              <span>{$storageConfig.lastSyncError}</span>
            </div>
          {/if}
        {/if}

        {#if storageFeedback}
          <div
            class="px-3 py-2 rounded border font-prose text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 {storageFeedback.ok
              ? 'border-emerald-500/50 bg-emerald-950/35 text-emerald-300'
              : 'border-red-500/50 bg-red-950/45 text-red-300'}"
          >
            <div class="flex items-start gap-2">
              {#if storageFeedback.ok}
                <CircleCheck class="w-4 h-4 shrink-0 mt-0.5" />
              {:else}
                <CircleAlert class="w-4 h-4 shrink-0 mt-0.5" />
              {/if}
              <span>{storageFeedback.message}</span>
            </div>
            {#if storageFeedback.latencyMs !== undefined}
              <span class="font-mono text-[10px] opacity-80 tabular-nums shrink-0">
                {storageFeedback.latencyMs} ms
              </span>
            {/if}
          </div>
        {/if}

        <!-- Storage Mode Selector -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {#each STORAGE_MODES as sm (sm.id)}
            {@const selected = storageModeDraft === sm.id}
            <button
              type="button"
              onclick={() => {
                storageModeDraft = sm.id;
                storageFeedback = null;
              }}
              class="text-left p-2.5 sm:p-3 rounded border transition-colors cursor-pointer {selected
                ? 'border-olive-bright bg-olive-drab/25 text-olive-bright shadow-[0_0_12px_rgba(143,168,92,0.14)]'
                : 'border-olive-drab/40 bg-[#0d0e0a] text-stone-300 hover:border-olive-bright/60'}"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5">
                  {#if sm.id === 'mounted'}
                    <FolderOpen class="w-3.5 h-3.5 shrink-0" />
                  {:else if sm.id === 'webdav' || sm.id === 'remote-http'}
                    <Cloud class="w-3.5 h-3.5 shrink-0" />
                  {:else}
                    <HardDrive class="w-3.5 h-3.5 shrink-0" />
                  {/if}
                  <span>{sm.label}</span>
                </span>
                {#if selected}
                  <span class="w-2 h-2 rounded-full bg-olive-bright shrink-0"></span>
                {/if}
              </div>
              <p class="font-prose text-[11.5px] text-stone-400 mt-1 leading-snug">{sm.subtitle}</p>
            </button>
          {/each}
        </div>

        <!-- Mode-Specific Storage Settings -->
        {#if storageModeDraft === 'mounted'}
          <div class="space-y-2.5 pt-2 border-t border-olive-drab/30">
            <div class="space-y-1">
              <label for="mounted-storage-path" class="block text-[10.5px] text-stone-300 uppercase">
                Mounted Storage Box Path (Absolute Path on VPS)
              </label>
              <input
                id="mounted-storage-path"
                type="text"
                bind:value={mountedPathDraft}
                placeholder="/mnt/hetzner-box/pheonikz"
                class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
              />
              <span class="block font-prose text-[11.5px] text-stone-500 leading-snug">
                Point to your mounted Hetzner Storage Box folder (SSHFS, CIFS/SMB, or rclone mount on
                Contabo). Writes atomically to <code class="font-mono text-[11px] text-olive-bright">pheonikz-store.json</code> inside this path.
              </span>
            </div>
          </div>
        {:else if storageModeDraft === 'webdav'}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-olive-drab/30">
            <div class="space-y-1 md:col-span-2">
              <label for="webdav-url" class="block text-[10.5px] text-stone-300 uppercase">
                WebDAV Target File URL (Hetzner Storage Box / Nextcloud)
              </label>
              <input
                id="webdav-url"
                type="url"
                bind:value={remoteUrlDraft}
                placeholder="https://uXXXXXX.your-storagebox.de/pheonikz/pheonikz-store.json"
                class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
              />
            </div>

            <div class="space-y-1">
              <label for="webdav-user" class="block text-[10.5px] text-stone-300 uppercase">
                WebDAV Username
              </label>
              <input
                id="webdav-user"
                type="text"
                autocomplete="off"
                bind:value={remoteUsernameDraft}
                placeholder="uXXXXXX or sub-account username"
                class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
              />
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between gap-2">
                <label for="webdav-pass" class="block text-[10.5px] text-stone-300 uppercase">
                  WebDAV Password (Write-Only)
                </label>
                {#if $storageConfig?.hasRemotePassword}
                  <span class="text-[10px] text-emerald-400 font-bold">SAVED</span>
                {/if}
              </div>
              <div class="flex items-center gap-1.5">
                <input
                  id="webdav-pass"
                  type="password"
                  autocomplete="off"
                  bind:value={remotePasswordDraft}
                  placeholder={$storageConfig?.hasRemotePassword
                    ? '•••••••••••••••• (leave blank to keep)'
                    : 'Paste Hetzner Storage Box password...'}
                  class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                />
                {#if $storageConfig?.hasRemotePassword}
                  <button
                    type="button"
                    disabled={savingStorage}
                    onclick={() => void handleSaveStorageConfig({ clearRemotePassword: true })}
                    title="Clear saved WebDAV password"
                    aria-label="Clear saved WebDAV password"
                    class="w-9 h-9 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                {/if}
              </div>
            </div>

            <label class="md:col-span-2 inline-flex items-center gap-2 font-prose text-xs text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={autoSyncRemoteDraft}
                class="accent-[#8fa85c] w-3.5 h-3.5 shrink-0"
              />
              <span>Auto-sync to WebDAV on every write (keeps local write-through cache)</span>
            </label>
          </div>
        {:else if storageModeDraft === 'remote-http'}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-olive-drab/30">
            <div class="space-y-1 md:col-span-2">
              <label for="remote-http-url" class="block text-[10.5px] text-stone-300 uppercase">
                External / Cloud Storage Endpoint URL
              </label>
              <div class="flex gap-2">
                <select
                  aria-label="Remote storage HTTP write method"
                  bind:value={remoteMethodDraft}
                  class="h-9 w-24 px-2.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright shrink-0"
                >
                  <option value="PUT">PUT</option>
                  <option value="POST">POST</option>
                </select>
                <input
                  id="remote-http-url"
                  type="url"
                  bind:value={remoteUrlDraft}
                  placeholder="https://storage-gateway.example.com/pheonikz-store.json"
                  class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                />
              </div>
            </div>

            <div class="space-y-1 md:col-span-2">
              <div class="flex items-center justify-between gap-2">
                <label for="remote-http-token" class="block text-[10.5px] text-stone-300 uppercase">
                  Bearer Token (Optional, Write-Only)
                </label>
                {#if $storageConfig?.hasRemoteToken}
                  <span class="text-[10px] text-emerald-400 font-bold">SAVED</span>
                {/if}
              </div>
              <div class="flex items-center gap-1.5">
                <input
                  id="remote-http-token"
                  type="password"
                  autocomplete="off"
                  bind:value={remoteTokenDraft}
                  placeholder={$storageConfig?.hasRemoteToken
                    ? '•••••••••••••••• (leave blank to keep)'
                    : 'Optional Authorization: Bearer token...'}
                  class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                />
                {#if $storageConfig?.hasRemoteToken}
                  <button
                    type="button"
                    disabled={savingStorage}
                    onclick={() => void handleSaveStorageConfig({ clearRemoteToken: true })}
                    title="Clear saved Bearer token"
                    aria-label="Clear saved Bearer token"
                    class="w-9 h-9 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                {/if}
              </div>
            </div>

            <label class="md:col-span-2 inline-flex items-center gap-2 font-prose text-xs text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={autoSyncRemoteDraft}
                class="accent-[#8fa85c] w-3.5 h-3.5 shrink-0"
              />
              <span>Auto-sync to external endpoint on every write (keeps local write-through cache)</span>
            </label>
          </div>
        {/if}

        <!-- Migration & Action Controls -->
        <div class="pt-2.5 border-t border-olive-drab/30 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-prose text-xs text-stone-300">
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={migrateDataDraft}
                class="accent-[#8fa85c] w-3.5 h-3.5"
              />
              <span>Migrate current data on save</span>
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                bind:checked={preferExistingDraft}
                class="accent-[#8fa85c] w-3.5 h-3.5"
              />
              <span>Load existing store on target</span>
            </label>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            {#if $storageConfig && $storageConfig.mode !== 'local'}
              <button
                type="button"
                disabled={syncingStorage !== null}
                onclick={() => void handleStorageSync('push')}
                class="flex-1 sm:flex-initial h-8 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] hover:border-olive-bright text-stone-200 hover:text-olive-bright text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload class="w-3.5 h-3.5" />
                <span>{syncingStorage === 'push' ? 'PUSHING...' : 'Push Now'}</span>
              </button>
              <button
                type="button"
                disabled={syncingStorage !== null}
                onclick={() => void handleStorageSync('pull')}
                class="flex-1 sm:flex-initial h-8 px-3 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-cyber-cyan text-[11px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download class="w-3.5 h-3.5" />
                <span>{syncingStorage === 'pull' ? 'PULLING...' : 'Pull'}</span>
              </button>
            {/if}
            <button
              type="button"
              disabled={savingStorage}
              onclick={() => void handleSaveStorageConfig()}
              class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-50 border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider uppercase cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              {#if savingStorage}
                <Loader2 class="w-3.5 h-3.5 animate-spin text-olive-bright" />
                <span>APPLYING...</span>
              {:else}
                <Save class="w-3.5 h-3.5 text-olive-bright" />
                <span>Apply Storage Target</span>
              {/if}
            </button>
          </div>
        </div>
      </section>

      <!-- Modular Web Search / Recon Configuration -->
      <section class="rounded-lg border border-[#005a63]/55 bg-[#091517]/75 p-3.5 sm:p-5 space-y-4 relative">
        <div
          class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-45"
        ></div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div
              class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-cyber-cyan uppercase"
            >
              <Globe class="w-4 h-4 shrink-0" />
              <span>Web Search / Recon Configuration</span>
            </div>
            <p class="font-prose text-[12.5px] sm:text-xs text-cyan-100/70 mt-1 leading-snug">
              Choose the active search backend injected into Dispatch prompts and Live Comms.
            </p>
          </div>
          <button
            type="button"
            disabled={testingRecon}
            onclick={() => void handleTestReconConnection()}
            class="w-full sm:w-auto h-8 inline-flex items-center justify-center gap-1.5 px-3.5 rounded border border-cyber-cyan/60 bg-[#061214] hover:bg-[#0d2226] disabled:opacity-50 text-[11px] font-bold text-cyber-cyan tracking-wider uppercase cursor-pointer shrink-0"
          >
            {#if testingRecon}
              <Loader2 class="w-3.5 h-3.5 animate-spin" />
              <span>PROBING...</span>
            {:else}
              <Radar class="w-3.5 h-3.5" />
              <span>Test Connection</span>
            {/if}
          </button>
        </div>

        {#if reconTestResult}
          <div
            class="px-3 py-2 rounded border font-prose text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 {reconTestResult.ok
              ? 'border-emerald-500/50 bg-emerald-950/35 text-emerald-300'
              : 'border-red-500/50 bg-red-950/45 text-red-300'}"
          >
            <div class="flex items-start gap-2">
              {#if reconTestResult.ok}
                <CircleCheck class="w-4 h-4 shrink-0 mt-0.5" />
              {:else}
                <CircleAlert class="w-4 h-4 shrink-0 mt-0.5" />
              {/if}
              <div>
                <div class="font-semibold">{reconTestResult.message}</div>
                {#if reconTestResult.sampleTitle}
                  <div class="text-[11.5px] opacity-80 mt-0.5">
                    Sample: {reconTestResult.sampleTitle}
                  </div>
                {/if}
              </div>
            </div>
            {#if reconTestResult.latencyMs !== undefined}
              <span class="font-mono text-[10px] uppercase tracking-wider opacity-80 shrink-0 tabular-nums">
                {reconTestResult.latencyMs} ms
              </span>
            {/if}
          </div>
        {/if}

        <!-- Active Search Provider Selector -->
        <div class="space-y-1.5">
          <span class="block text-[10.5px] text-cyan-100/75 uppercase tracking-wider">
            Active Recon Provider
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {#each SEARCH_PROVIDERS as sp (sp.id)}
              {@const active = $settings.searchProvider === sp.id}
              <button
                type="button"
                onclick={() => {
                  reconTestResult = null;
                  void updateSettings({ searchProvider: sp.id });
                }}
                class="text-left p-2.5 sm:p-3 rounded border transition-colors cursor-pointer {active
                  ? 'border-cyber-cyan bg-[#0c2328] text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.12)]'
                  : 'border-olive-drab/40 bg-[#10130d] text-stone-300 hover:border-olive-bright/60'}"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[11px] font-bold uppercase tracking-wide">{sp.label}</span>
                  {#if active}
                    <span class="w-2 h-2 rounded-full bg-cyber-cyan shrink-0"></span>
                  {/if}
                </div>
                <p class="font-prose text-[11.5px] text-stone-400 mt-1 leading-snug">{sp.detail}</p>
              </button>
            {/each}
          </div>
        </div>

        <!-- Persistent Recon Endpoint & Limit Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#005a63]/35">
          <!-- SEARXNG_BASE_URL -->
          <div class="space-y-1">
            <label for="searxng-url" class="block text-[10.5px] text-stone-300 uppercase">
              SEARXNG_BASE_URL (Self-Hosted)
            </label>
            <input
              id="searxng-url"
              type="url"
              bind:value={searxngUrlDraft}
              placeholder="http://localhost:8888"
              class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-cyber-cyan"
            />
            <span class="block font-prose text-[11px] text-stone-500">
              Queries {'{SEARXNG_BASE_URL}'}/search?q={'{query}'}&amp;format=json server-side.
            </span>
          </div>

          <!-- MAX_SEARCH_RESULTS -->
          <div class="space-y-1">
            <label for="max-search-results" class="block text-[10.5px] text-stone-300 uppercase">
              MAX_SEARCH_RESULTS (Default: 5)
            </label>
            <input
              id="max-search-results"
              type="number"
              min="1"
              max="20"
              bind:value={maxSearchResultsDraft}
              class="w-full h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-cyber-cyan"
            />
            <span class="block font-prose text-[11px] text-stone-500">
              Maximum sources injected into LLM context &amp; displayed as receipt chips (1–20).
            </span>
          </div>

          <!-- CUSTOM_SEARCH_URL + Method -->
          <div class="space-y-1 md:col-span-2">
            <label for="custom-search-url" class="block text-[10.5px] text-stone-300 uppercase">
              CUSTOM_SEARCH_URL &amp; HTTP Method
            </label>
            <div class="flex gap-2">
              <select
                aria-label="Custom search HTTP method"
                bind:value={customSearchMethodDraft}
                class="h-9 w-24 px-2.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-cyber-cyan shrink-0"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
              <input
                id="custom-search-url"
                type="url"
                bind:value={customSearchUrlDraft}
                placeholder={'https://your-search-proxy.local/search?q={query} or POST JSON endpoint'}
                class="flex-1 min-w-0 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <!-- BRAVE_API_KEY -->
          <div class="rounded border border-olive-drab/40 bg-[#12140e] p-3 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-stone-200 uppercase">BRAVE_API_KEY</span>
              <span
                class="inline-flex items-center gap-1 text-[10px] font-bold {braveStatus?.configured
                  ? 'text-emerald-400'
                  : 'text-amber-400'}"
              >
                {#if braveStatus?.configured}
                  <CircleCheck class="w-3 h-3" />
                  <span>{braveStatus.source === 'vault' ? 'VAULT ACTIVE' : 'ENV ACTIVE'}</span>
                {:else}
                  <CircleAlert class="w-3 h-3" />
                  <span>UNSET</span>
                {/if}
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <input
                type="password"
                autocomplete="off"
                bind:value={keyDrafts.brave}
                placeholder={braveStatus?.configured
                  ? '•••••••••••••••• (replace key)'
                  : 'Paste Brave Search token...'}
                class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
              />
              <button
                type="button"
                disabled={!keyDrafts.brave.trim() || savingKeyId === 'brave'}
                onclick={() => void handleSaveProviderKey('brave', keyDrafts.brave)}
                class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold border border-olive-bright/30 cursor-pointer shrink-0"
              >
                SAVE
              </button>
              {#if braveStatus?.source === 'vault'}
                <button
                  type="button"
                  disabled={savingKeyId === 'brave'}
                  onclick={() => void handleSaveProviderKey('brave', '')}
                  aria-label="Clear Brave key"
                  class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              {/if}
            </div>
          </div>

          <!-- TAVILY_API_KEY -->
          <div class="rounded border border-olive-drab/40 bg-[#12140e] p-3 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-stone-200 uppercase">TAVILY_API_KEY</span>
              <span
                class="inline-flex items-center gap-1 text-[10px] font-bold {tavilyStatus?.configured
                  ? 'text-emerald-400'
                  : 'text-amber-400'}"
              >
                {#if tavilyStatus?.configured}
                  <CircleCheck class="w-3 h-3" />
                  <span>{tavilyStatus.source === 'vault' ? 'VAULT ACTIVE' : 'ENV ACTIVE'}</span>
                {:else}
                  <CircleAlert class="w-3 h-3" />
                  <span>UNSET</span>
                {/if}
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <input
                type="password"
                autocomplete="off"
                bind:value={keyDrafts.tavily}
                placeholder={tavilyStatus?.configured
                  ? '•••••••••••••••• (replace key)'
                  : 'Paste Tavily API key (tvly-...)...'}
                class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
              />
              <button
                type="button"
                disabled={!keyDrafts.tavily.trim() || savingKeyId === 'tavily'}
                onclick={() => void handleSaveProviderKey('tavily', keyDrafts.tavily)}
                class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold border border-olive-bright/30 cursor-pointer shrink-0"
              >
                SAVE
              </button>
              {#if tavilyStatus?.source === 'vault'}
                <button
                  type="button"
                  disabled={savingKeyId === 'tavily'}
                  onclick={() => void handleSaveProviderKey('tavily', '')}
                  aria-label="Clear Tavily key"
                  class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              {/if}
            </div>
          </div>

          <!-- CUSTOM_SEARCH_API_KEY -->
          <div class="rounded border border-olive-drab/40 bg-[#12140e] p-3 space-y-2 md:col-span-2">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-stone-200 uppercase">
                CUSTOM_SEARCH_API_KEY (Bearer Token)
              </span>
              <span
                class="inline-flex items-center gap-1 text-[10px] font-bold {customSearchKeyStatus?.configured
                  ? 'text-emerald-400'
                  : 'text-stone-400'}"
              >
                {#if customSearchKeyStatus?.configured}
                  <CircleCheck class="w-3 h-3" />
                  <span>
                    {customSearchKeyStatus.source === 'vault' ? 'VAULT ACTIVE' : 'ENV ACTIVE'}
                  </span>
                {:else}
                  <span>OPTIONAL</span>
                {/if}
              </span>
            </div>
            <div class="flex items-center gap-1.5">
              <input
                type="password"
                autocomplete="off"
                bind:value={keyDrafts.custom_search}
                placeholder={customSearchKeyStatus?.configured
                  ? '•••••••••••••••• (replace Bearer token)'
                  : 'Optional Bearer token for CUSTOM_SEARCH_URL...'}
                class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
              />
              <button
                type="button"
                disabled={!keyDrafts.custom_search.trim() || savingKeyId === 'custom_search'}
                onclick={() => void handleSaveProviderKey('custom_search', keyDrafts.custom_search)}
                class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold border border-olive-bright/30 cursor-pointer shrink-0"
              >
                SAVE
              </button>
              {#if customSearchKeyStatus?.source === 'vault'}
                <button
                  type="button"
                  disabled={savingKeyId === 'custom_search'}
                  onclick={() => void handleSaveProviderKey('custom_search', '')}
                  aria-label="Clear custom search key"
                  class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              {/if}
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-end gap-2 pt-1">
          {#if reconSavedToast}
            <span class="text-xs text-cyber-cyan text-center sm:text-left">
              RECON PARAMETERS SAVED
            </span>
          {/if}
          <button
            type="button"
            onclick={() => void handleSaveReconSettings()}
            class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider uppercase cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <Save class="w-3.5 h-3.5 text-olive-bright" />
            <span>Save Recon Config</span>
          </button>
        </div>
      </section>

      <!-- API Credentials Vault -->
      <section class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div
            class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-olive-bright uppercase"
          >
            <KeyRound class="w-4 h-4" />
            <span>Server-Side Credential Vault</span>
          </div>
          {#if keyFeedback}
            <span class="font-prose text-xs text-cyber-cyan">{keyFeedback}</span>
          {/if}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {#if geminiStatus}
            <div
              class="rounded-lg border border-[#005a63]/50 bg-[#091517] p-3.5 space-y-1.5 relative"
            >
              <div
                class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-45"
              ></div>
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-bold text-cyber-cyan uppercase">
                  {geminiStatus.name}
                </span>
                <span
                  class="inline-flex items-center gap-1 text-[10.5px] font-bold {geminiStatus.configured
                    ? 'text-emerald-400'
                    : 'text-amber-400'}"
                >
                  {#if geminiStatus.configured}
                    <CircleCheck class="w-3.5 h-3.5" />
                    <span>ENV ACTIVE</span>
                  {:else}
                    <CircleAlert class="w-3.5 h-3.5" />
                    <span>ENV UNSET</span>
                  {/if}
                </span>
              </div>
              <p class="font-prose text-[12px] text-cyan-100/75 leading-snug">
                {geminiStatus.note}
              </p>
              <div class="text-[10px] text-cyber-cyan/60 pt-0.5">
                RUNTIME SECRET ({geminiStatus.envVar})
              </div>
            </div>
          {/if}

          {#each EDITABLE_PROVIDERS as item (item.id)}
            {@const info = $providers.find((p) => p.id === item.id)}
            {@const configured = info?.configured ?? false}
            {@const source = info?.source ?? 'none'}
            <div class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-bold text-stone-200 uppercase">
                  {info?.name ?? item.id}
                </span>
                <span
                  class="inline-flex items-center gap-1 text-[10.5px] font-bold {configured
                    ? 'text-emerald-400'
                    : item.id === 'parallel'
                      ? 'text-cyber-cyan'
                      : 'text-amber-400'}"
                >
                  {#if configured}
                    <CircleCheck class="w-3.5 h-3.5" />
                    <span>{source === 'vault' ? 'VAULT ACTIVE' : 'ENV ACTIVE'}</span>
                  {:else if item.id === 'parallel'}
                    <CircleCheck class="w-3.5 h-3.5" />
                    <span>ANONYMOUS</span>
                  {:else}
                    <CircleAlert class="w-3.5 h-3.5" />
                    <span>UNSET</span>
                  {/if}
                </span>
              </div>
              <p class="font-prose text-[12px] text-stone-400 leading-snug">{info?.note}</p>
              <div class="flex items-center gap-1.5 pt-0.5">
                <input
                  type="password"
                  autocomplete="off"
                  bind:value={keyDrafts[item.id]}
                  placeholder={configured
                    ? '•••••••••••••••• (replace key)'
                    : item.placeholder}
                  class="flex-1 min-w-0 h-8 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                />
                <button
                  type="button"
                  disabled={!keyDrafts[item.id].trim() || savingKeyId === item.id}
                  onclick={() => void handleSaveProviderKey(item.id, keyDrafts[item.id])}
                  class="h-8 px-2.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[10.5px] font-bold inline-flex items-center justify-center gap-1 border border-olive-bright/30 cursor-pointer shrink-0"
                >
                  <Save class="w-3 h-3 text-olive-bright" />
                  <span>SAVE</span>
                </button>
                {#if source === 'vault'}
                  <button
                    type="button"
                    disabled={savingKeyId === item.id}
                    onclick={() => void handleSaveProviderKey(item.id, '')}
                    title="Clear saved key from vault"
                    aria-label="Clear saved key"
                    class="w-8 h-8 flex items-center justify-center rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>

      <!-- STT & TTS Pipeline -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6">
        <div class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-3.5">
          <h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">
            Speech-to-Text (Dictation &amp; Call)
          </h2>

          <div class="space-y-1.5">
            <span class="block text-[10.5px] text-stone-400 uppercase">Active STT Engine</span>
            <div class="grid grid-cols-2 gap-2">
              {#each ['deepgram', 'gemini'] as STTProvider[] as id}
                <button
                  type="button"
                  onclick={() => void updateSettings({ sttProvider: id })}
                  class="h-9 px-2.5 rounded border text-[11px] font-bold transition-colors cursor-pointer {$settings.sttProvider === id
                    ? 'border-olive-bright bg-olive-drab/25 text-olive-bright'
                    : 'border-olive-drab/35 text-stone-400 hover:text-stone-200'}"
                >
                  {id === 'deepgram' ? 'DEEPGRAM NOVA' : 'GEMINI TRANSCRIBE'}
                </button>
              {/each}
            </div>
          </div>

          <div class="space-y-1">
            <label for="dg-stt-model" class="block text-[10.5px] text-stone-400 uppercase">
              Deepgram Model
            </label>
            <select
              id="dg-stt-model"
              value={$settings.deepgramSttModel}
              onchange={(e) =>
                void updateSettings({ deepgramSttModel: e.currentTarget.value })}
              class="w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
            >
              <option value="nova-2">nova-2 (Balanced low-latency)</option>
              <option value="nova-3">nova-3 (High accuracy)</option>
              <option value="enhanced">enhanced</option>
            </select>
          </div>
        </div>

        <div class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-3.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">
              Text-to-Speech (Reply &amp; Call)
            </h2>
            <button
              type="button"
              disabled={testingTts}
              onclick={() => void handleTestSpeech()}
              class="h-8 inline-flex items-center gap-1.5 px-2.5 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-[10.5px] font-bold text-cyber-cyan cursor-pointer"
            >
              <Volume2 class="w-3.5 h-3.5" />
              <span>{testingTts ? 'SYNTHESIZING...' : 'TEST VOICE'}</span>
            </button>
          </div>

          {#if testError}
            <div class="font-prose text-xs text-red-400">{testError}</div>
          {/if}

          <div class="space-y-1.5">
            <span class="block text-[10.5px] text-stone-400 uppercase">Active TTS Engine</span>
            <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
              {#each ['fishaudio', 'deepgram', 'gemini'] as TTSProvider[] as id}
                <button
                  type="button"
                  onclick={() => void updateSettings({ ttsProvider: id })}
                  class="h-9 px-2 rounded border text-[10.5px] font-bold transition-colors cursor-pointer {$settings.ttsProvider === id
                    ? 'border-olive-bright bg-olive-drab/25 text-olive-bright'
                    : 'border-olive-drab/35 text-stone-400 hover:text-stone-200'}"
                >
                  {id === 'fishaudio'
                    ? 'FISH AUDIO'
                    : id === 'deepgram'
                      ? 'DEEPGRAM'
                      : 'GEMINI TTS'}
                </button>
              {/each}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="space-y-1">
              <label for="gemini-voice" class="block text-[10.5px] text-stone-400 uppercase">
                Gemini Voice
              </label>
              <select
                id="gemini-voice"
                value={$settings.geminiVoice}
                onchange={(e) => void updateSettings({ geminiVoice: e.currentTarget.value })}
                class="w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
              >
                <option value="Zephyr">Zephyr</option>
                <option value="Kore">Kore</option>
                <option value="Puck">Puck</option>
                <option value="Charon">Charon</option>
                <option value="Fenrir">Fenrir</option>
              </select>
            </div>
            <div class="space-y-1">
              <label for="dg-tts-voice" class="block text-[10.5px] text-stone-400 uppercase">
                Deepgram Aura Voice
              </label>
              <select
                id="dg-tts-voice"
                value={$settings.deepgramTtsVoice}
                onchange={(e) =>
                  void updateSettings({ deepgramTtsVoice: e.currentTarget.value })}
                class="w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
              >
                <option value="aura-asteria-en">aura-asteria-en</option>
                <option value="aura-orion-en">aura-orion-en</option>
                <option value="aura-luna-en">aura-luna-en</option>
                <option value="aura-arcas-en">aura-arcas-en</option>
              </select>
            </div>
          </div>

          <div class="space-y-1">
            <label for="fish-voice-id" class="block text-[10.5px] text-stone-400 uppercase">
              Fish Audio Reference Voice ID (Optional)
            </label>
            <input
              id="fish-voice-id"
              type="text"
              bind:value={fishVoiceDraft}
              placeholder="Blank for default or paste Fish Audio reference_id"
              class="w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
            />
          </div>
        </div>
      </section>

      <!-- System Persona -->
      <section class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">
              System Directive &amp; Consolidation
            </h2>
            <p class="font-prose text-[12px] text-stone-400 mt-0.5 leading-snug">
              Base persona injected alongside Mnemosyne OS context across all dispatches.
            </p>
          </div>
          <label class="inline-flex items-center gap-2 font-prose text-xs text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={$settings.autoConsolidateMemory}
              onchange={(e) =>
                void updateSettings({
                  autoConsolidateMemory: e.currentTarget.checked,
                })}
              class="accent-[#8fa85c] w-3.5 h-3.5"
            />
            <span>Auto-consolidate memories</span>
          </label>
        </div>
        <textarea
          bind:value={systemPromptDraft}
          rows={4}
          class="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
        ></textarea>
        <div class="flex flex-col sm:flex-row sm:items-center justify-end gap-2">
          {#if savedToast}
            <span class="text-xs text-olive-bright text-center sm:text-left">CONFIGURATION COMMITTED</span>
          {/if}
          <button
            type="button"
            onclick={() => void handleSaveTextConfigs()}
            class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider cursor-pointer uppercase"
          >
            Save Directives
          </button>
        </div>
      </section>
    </div>
  </div>
