<script lang="ts">
  import {
    Brain,
    Database,
    Pencil,
    FileUp,
    Pin,
    PinOff,
    Plus,
    Search,
    Trash2,
    Check,
    X,
  } from 'lucide-svelte';
  import type { MemoryTier, MnemosyneMemory } from '../../types/index';
  import {
    memories,
    refreshWorkspace,
    vaultDocs,
  } from '#lib/stores/workspace';

  const TIERS: Array<{ id: 'all' | MemoryTier; label: string }> = [
    { id: 'all', label: 'ALL TIERS' },
    { id: 'core', label: 'CORE' },
    { id: 'episodic', label: 'EPISODIC' },
    { id: 'semantic', label: 'SEMANTIC' },
    { id: 'procedural', label: 'PROCEDURAL' },
  ];

  let activeTab = $state<'memories' | 'vault'>('memories');
  let tierFilter = $state<'all' | MemoryTier>('all');
  let search = $state('');

  let newTier = $state<MemoryTier>('episodic');
  let newContent = $state('');
  let newPinned = $state(false);
  let creating = $state(false);

  let editingId = $state<string | null>(null);
  let editContent = $state('');
  let editTier = $state<MemoryTier>('episodic');

  let vaultTitle = $state('');
  let vaultText = $state('');
  let uploadingVault = $state(false);
  let fileInputEl: HTMLInputElement | undefined = $state();

  let filteredMemories = $derived(
    $memories.filter((m) => {
      const matchesTier = tierFilter === 'all' || m.tier === tierFilter;
      const matchesSearch =
        !search.trim() ||
        m.content.toLowerCase().includes(search.toLowerCase()) ||
        m.keywords.some((k) => k.includes(search.toLowerCase()));
      return matchesTier && matchesSearch;
    })
  );

  let tierCounts = $derived({
    core: $memories.filter((m) => m.tier === 'core').length,
    episodic: $memories.filter((m) => m.tier === 'episodic').length,
    semantic: $memories.filter((m) => m.tier === 'semantic').length,
    procedural: $memories.filter((m) => m.tier === 'procedural').length,
  });

  async function handleCreateMemory(e: SubmitEvent) {
    e.preventDefault();
    if (!newContent.trim() || creating) return;
    creating = true;
    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: newTier,
          content: newContent.trim(),
          pinned: newPinned,
          salience: newPinned ? 0.95 : 0.75,
        }),
      });
      if (res.ok) {
        newContent = '';
        newPinned = false;
        await refreshWorkspace();
      }
    } finally {
      creating = false;
    }
  }

  async function handleTogglePin(mem: MnemosyneMemory) {
    await fetch(`/api/memories/${mem.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinned: !mem.pinned }),
    });
    await refreshWorkspace();
  }

  async function handleSaveEdit(id: string) {
    if (!editContent.trim()) return;
    await fetch(`/api/memories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent.trim(), tier: editTier }),
    });
    editingId = null;
    await refreshWorkspace();
  }

  async function handleDeleteMemory(id: string) {
    await fetch(`/api/memories/${id}`, { method: 'DELETE' });
    await refreshWorkspace();
  }

  async function handleVaultFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    uploadingVault = true;
    try {
      for (const file of Array.from(files)) {
        const text = await file.text();
        if (!text.trim()) continue;
        await fetch('/api/vault', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: file.name,
            mimeType: file.type || 'text/plain',
            content: text,
          }),
        });
      }
      await refreshWorkspace();
    } finally {
      uploadingVault = false;
    }
  }

  async function handlePasteVault(e: SubmitEvent) {
    e.preventDefault();
    if (!vaultTitle.trim() || !vaultText.trim() || uploadingVault) return;
    uploadingVault = true;
    try {
      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: vaultTitle.trim(),
          mimeType: 'text/markdown',
          content: vaultText.trim(),
        }),
      });
      if (res.ok) {
        vaultTitle = '';
        vaultText = '';
        await refreshWorkspace();
      }
    } finally {
      uploadingVault = false;
    }
  }

  async function handleDeleteVault(id: string) {
    await fetch(`/api/vault/${id}`, { method: 'DELETE' });
    await refreshWorkspace();
  }
</script>

<div class="flex-1 overflow-y-auto px-2.5 sm:px-8 py-3 sm:py-6 bg-[#0a0b08] relative font-mono">
  <div class="absolute inset-0 pointer-events-none crt-scanlines opacity-15"></div>

  <div class="max-w-5xl mx-auto space-y-4 sm:space-y-6 relative z-10">
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-olive-drab/40"
    >
      <div>
        <h1 class="text-base sm:text-xl font-bold tracking-wider text-olive-bright uppercase">
          Mnemosyne OS
        </h1>
        <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-0.5 leading-snug">
          Persistent cognitive memory graph and chunked Knowledge Vault across all models.
        </p>
      </div>

      <div
        class="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded border border-olive-drab/45 bg-[#12140e] w-full sm:w-auto"
      >
        <button
          type="button"
          onclick={() => (activeTab = 'memories')}
          class="h-8 sm:h-auto px-3 py-1 rounded text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap {activeTab === 'memories'
            ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
            : 'text-stone-400 hover:text-stone-200'}"
        >
          <Brain class="w-3.5 h-3.5" />
          <span>MEMORY ({$memories.length})</span>
        </button>
        <button
          type="button"
          onclick={() => (activeTab = 'vault')}
          class="h-8 sm:h-auto px-3 py-1 rounded text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap {activeTab === 'vault'
            ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
            : 'text-stone-400 hover:text-stone-200'}"
        >
          <Database class="w-3.5 h-3.5" />
          <span>VAULT ({$vaultDocs.length})</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
      {#each ['core', 'episodic', 'semantic', 'procedural'] as const as tier}
        <div class="rounded-lg border border-olive-drab/40 bg-[#12140e] px-3 sm:px-4 py-2.5 sm:py-3">
          <div class="text-[10px] tracking-wider uppercase text-stone-400">
            {tier} Tier
          </div>
          <div class="text-lg sm:text-2xl font-bold text-cyber-cyan tabular-nums mt-0.5">
            {tierCounts[tier]}
          </div>
        </div>
      {/each}
    </div>

    {#if activeTab === 'memories'}
      <div class="space-y-4 sm:space-y-6">
        <form
          onsubmit={handleCreateMemory}
          class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3 sm:p-4 space-y-2.5"
        >
          <div class="text-[11px] font-bold tracking-wider text-olive-bright uppercase">
            Commit New Memory Node
          </div>
          <div class="flex flex-col sm:flex-row gap-2">
            <select
              bind:value={newTier}
              class="h-9 px-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
            >
              <option value="core">CORE DIRECTIVE</option>
              <option value="episodic">EPISODIC EVENT</option>
              <option value="semantic">SEMANTIC FACT</option>
              <option value="procedural">PROCEDURAL RULE</option>
            </select>
            <input
              type="text"
              bind:value={newContent}
              placeholder="Enter standalone memory directive or preference..."
              class="flex-1 h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
            />
            <div class="flex items-center justify-between sm:justify-start gap-2.5">
              <label class="h-9 inline-flex items-center gap-1.5 px-2 text-xs text-stone-300 cursor-pointer select-none">
                <input type="checkbox" bind:checked={newPinned} class="accent-[#8fa85c] w-3.5 h-3.5" />
                <span>PIN</span>
              </label>
              <button
                type="submit"
                disabled={!newContent.trim() || creating}
                class="flex-1 sm:flex-initial h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold inline-flex items-center justify-center gap-1.5 border border-olive-bright/30 cursor-pointer whitespace-nowrap uppercase"
              >
                <Plus class="w-3.5 h-3.5 text-olive-bright" />
                <span>Commit</span>
              </button>
            </div>
          </div>
        </form>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div class="flex items-center gap-1 p-1 rounded border border-olive-drab/40 bg-[#12140e] overflow-x-auto no-scrollbar max-w-full">
            {#each TIERS as t}
              <button
                type="button"
                onclick={() => (tierFilter = t.id)}
                class="h-7 px-2.5 rounded text-[10.5px] font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 {tierFilter === t.id
                  ? 'bg-[#3d462c] text-olive-bright'
                  : 'text-stone-400 hover:text-stone-200'}"
              >
                {t.label}
              </button>
            {/each}
          </div>

          <div class="relative w-full sm:w-64">
            <Search class="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              bind:value={search}
              placeholder="Filter memories..."
              class="w-full h-9 pl-8 pr-3 rounded border border-olive-drab/45 bg-[#12140e] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
            />
          </div>
        </div>

        {#if filteredMemories.length === 0}
          <div class="rounded-lg border border-olive-drab/40 bg-[#12140e] p-6 sm:p-10 text-center space-y-1.5">
            <div class="text-xs font-bold text-stone-300 uppercase">
              No memories match filter
            </div>
            <p class="font-prose text-xs text-stone-500">
              Run dispatches with Mnemosyne engaged or commit a memory above.
            </p>
          </div>
        {:else}
          <div class="divide-y divide-olive-drab/25 rounded-lg border border-[#005a63]/50 bg-[#091517]">
            {#each filteredMemories as mem (mem.id)}
              {@const isEditing = editingId === mem.id}
              <div class="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                <div class="flex-1 min-w-0 space-y-1">
                  <div class="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] text-stone-400">
                    <span class="font-bold uppercase text-olive-bright">{mem.tier}</span>
                    <span aria-hidden="true">·</span>
                    <span>{mem.sourceType.toUpperCase()}</span>
                    <span aria-hidden="true">·</span>
                    <span class="tabular-nums text-cyber-cyan/80">
                      {Math.round(mem.salience * 100)}%
                    </span>
                    {#if mem.pinned}
                      <span aria-hidden="true">·</span>
                      <span class="text-amber-400 font-bold">PINNED</span>
                    {/if}
                    <span aria-hidden="true">·</span>
                    <span class="tabular-nums">
                      {new Date(mem.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {#if isEditing}
                    <div class="flex flex-col sm:flex-row gap-2 pt-1">
                      <select
                        bind:value={editTier}
                        class="h-9 px-2.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200"
                      >
                        <option value="core">CORE</option>
                        <option value="episodic">EPISODIC</option>
                        <option value="semantic">SEMANTIC</option>
                        <option value="procedural">PROCEDURAL</option>
                      </select>
                      <input
                        type="text"
                        bind:value={editContent}
                        class="flex-1 h-9 px-3 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200"
                      />
                      <div class="flex items-center gap-1.5">
                        <button
                          type="button"
                          onclick={() => void handleSaveEdit(mem.id)}
                          aria-label="Save edit"
                          class="w-8 h-8 flex items-center justify-center rounded bg-[#3d462c] text-olive-bright cursor-pointer"
                        >
                          <Check class="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onclick={() => (editingId = null)}
                          aria-label="Cancel edit"
                          class="w-8 h-8 flex items-center justify-center rounded bg-stone-800 text-stone-300 cursor-pointer"
                        >
                          <X class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  {:else}
                    <p class="font-prose text-[13.5px] sm:text-[13px] text-cyan-100 leading-relaxed break-words">{mem.content}</p>
                  {/if}
                </div>

                {#if !isEditing}
                  <div class="flex items-center justify-end gap-1 shrink-0">
                    <button
                      type="button"
                      onclick={() => void handleTogglePin(mem)}
                      title={mem.pinned ? 'Unpin' : 'Pin always'}
                      aria-label={mem.pinned ? 'Unpin memory' : 'Pin memory'}
                      class="w-8 h-8 flex items-center justify-center rounded transition-colors cursor-pointer {mem.pinned
                        ? 'text-amber-400 hover:bg-amber-950/40'
                        : 'text-stone-400 hover:text-olive-bright'}"
                    >
                      {#if mem.pinned}
                        <PinOff class="w-3.5 h-3.5" />
                      {:else}
                        <Pin class="w-3.5 h-3.5" />
                      {/if}
                    </button>
                    <button
                      type="button"
                      onclick={() => {
                        editingId = mem.id;
                        editContent = mem.content;
                        editTier = mem.tier;
                      }}
                      title="Edit"
                      aria-label="Edit memory"
                      class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-cyber-cyan cursor-pointer"
                    >
                      <Pencil class="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onclick={() => void handleDeleteMemory(mem.id)}
                      title="Purge"
                      aria-label="Purge memory"
                      class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {:else}
      <div class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6">
          <div
            class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 flex flex-col justify-between gap-3.5"
          >
            <div>
              <h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">
                Index Local Documents
              </h2>
              <p class="font-prose text-[13px] sm:text-xs text-stone-400 mt-1 leading-relaxed">
                Upload markdown specs, source code, JSON schemas, or text files for automatic RAG
                chunk indexing across chat and live comms.
              </p>
            </div>
            <input
              bind:this={fileInputEl}
              type="file"
              multiple
              accept=".txt,.md,.json,.csv,.ts,.tsx,.js,.py,.yaml,.yml,.sql,.svelte"
              class="hidden"
              onchange={(e) => {
                const target = e.currentTarget;
                void handleVaultFile(target.files);
                target.value = '';
              }}
            />
            <button
              type="button"
              disabled={uploadingVault}
              onclick={() => fileInputEl?.click()}
              class="w-full py-5 px-3 rounded border border-dashed border-olive-drab/60 hover:border-olive-bright flex flex-col items-center justify-center gap-1.5 text-xs text-stone-300 transition-colors cursor-pointer text-center"
            >
              <FileUp class="w-5 h-5 text-olive-bright" />
              <span>
                {uploadingVault ? 'INDEXING...' : 'SELECT .MD, .TXT, .JSON, OR CODE'}
              </span>
            </button>
          </div>

          <form
            onsubmit={handlePasteVault}
            class="rounded-lg border border-olive-drab/45 bg-[#12140e] p-3.5 sm:p-5 space-y-2.5"
          >
            <h2 class="text-xs font-bold tracking-wider text-olive-bright uppercase">
              Add Reference Note
            </h2>
            <input
              type="text"
              bind:value={vaultTitle}
              placeholder="Document title..."
              class="w-full h-9 px-3 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
            />
            <textarea
              bind:value={vaultText}
              rows={4}
              placeholder="Paste architecture notes or specs..."
              class="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={!vaultTitle.trim() || !vaultText.trim() || uploadingVault}
              class="w-full sm:w-auto h-9 px-4 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold border border-olive-bright/30 cursor-pointer uppercase"
            >
              Index into Vault
            </button>
          </form>
        </div>

        {#if $vaultDocs.length === 0}
          <div class="rounded-lg border border-olive-drab/40 bg-[#12140e] p-6 sm:p-10 text-center text-xs text-stone-500 uppercase">
            Knowledge Vault Empty
          </div>
        {:else}
          <div class="divide-y divide-olive-drab/25 rounded-lg border border-[#005a63]/50 bg-[#091517]">
            {#each $vaultDocs as doc (doc.id)}
              <div class="p-3 sm:p-4 flex items-center justify-between gap-2.5">
                <div class="min-w-0 space-y-0.5">
                  <div class="font-prose text-[13.5px] sm:text-xs font-semibold text-cyber-cyan truncate">{doc.title}</div>
                  <div class="text-[10.5px] text-stone-400 tabular-nums">
                    {doc.chunkCount} CHUNKS · {(doc.size / 1024).toFixed(1)} KB ·{' '}
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  type="button"
                  onclick={() => void handleDeleteVault(doc.id)}
                  aria-label="Delete document"
                  class="w-8 h-8 flex items-center justify-center rounded text-stone-400 hover:text-red-400 cursor-pointer shrink-0"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
