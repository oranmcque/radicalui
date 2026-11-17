import { useState, useRef } from 'react';
import {
  Brain,
  Database,
  Edit3,
  FileUp,
  Pin,
  PinOff,
  Plus,
  Search,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import type { MemoryTier, MnemosyneMemory, VaultDocument } from '../types/index';

interface MnemosyneConsoleProps {
  memories: MnemosyneMemory[];
  vaultDocs: VaultDocument[];
  onRefreshState: () => Promise<void>;
}

const TIERS: Array<{ id: 'all' | MemoryTier; label: string }> = [
  { id: 'all', label: 'ALL TIERS' },
  { id: 'core', label: 'CORE' },
  { id: 'episodic', label: 'EPISODIC' },
  { id: 'semantic', label: 'SEMANTIC' },
  { id: 'procedural', label: 'PROCEDURAL' },
];

export function MnemosyneConsole({
  memories,
  vaultDocs,
  onRefreshState,
}: MnemosyneConsoleProps) {
  const [activeTab, setActiveTab] = useState<'memories' | 'vault'>('memories');
  const [tierFilter, setTierFilter] = useState<'all' | MemoryTier>('all');
  const [search, setSearch] = useState('');

  const [newTier, setNewTier] = useState<MemoryTier>('episodic');
  const [newContent, setNewContent] = useState('');
  const [newPinned, setNewPinned] = useState(false);
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTier, setEditTier] = useState<MemoryTier>('episodic');

  const [vaultTitle, setVaultTitle] = useState('');
  const [vaultText, setVaultText] = useState('');
  const [uploadingVault, setUploadingVault] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMemories = memories.filter((m) => {
    const matchesTier = tierFilter === 'all' || m.tier === tierFilter;
    const matchesSearch =
      !search.trim() ||
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      m.keywords.some((k) => k.includes(search.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  const tierCounts = {
    core: memories.filter((m) => m.tier === 'core').length,
    episodic: memories.filter((m) => m.tier === 'episodic').length,
    semantic: memories.filter((m) => m.tier === 'semantic').length,
    procedural: memories.filter((m) => m.tier === 'procedural').length,
  };

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim() || creating) return;
    setCreating(true);
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
        setNewContent('');
        setNewPinned(false);
        await onRefreshState();
      }
    } finally {
      setCreating(false);
    }
  };

  const handleTogglePin = async (mem: MnemosyneMemory) => {
    await fetch(`/api/memories/${mem.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinned: !mem.pinned }),
    });
    await onRefreshState();
  };

  const handleSaveEdit = async (id: string) => {
    if (!editContent.trim()) return;
    await fetch(`/api/memories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent.trim(), tier: editTier }),
    });
    setEditingId(null);
    await onRefreshState();
  };

  const handleDeleteMemory = async (id: string) => {
    await fetch(`/api/memories/${id}`, { method: 'DELETE' });
    await onRefreshState();
  };

  const handleVaultFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingVault(true);
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
      await onRefreshState();
    } finally {
      setUploadingVault(false);
    }
  };

  const handlePasteVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaultTitle.trim() || !vaultText.trim() || uploadingVault) return;
    setUploadingVault(true);
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
        setVaultTitle('');
        setVaultText('');
        await onRefreshState();
      }
    } finally {
      setUploadingVault(false);
    }
  };

  const handleDeleteVault = async (id: string) => {
    await fetch(`/api/vault/${id}`, { method: 'DELETE' });
    await onRefreshState();
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 bg-[#0a0b08] relative font-mono">
      <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-15" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-olive-drab/40">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-olive-bright uppercase">
              Mnemosyne OS
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Persistent cognitive memory graph and chunked Knowledge Vault across all models.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded border border-olive-drab/45 bg-[#12140e] self-start">
            <button
              type="button"
              onClick={() => setActiveTab('memories')}
              className={`px-3 py-1.5 rounded text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'memories'
                  ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>MEMORY ({memories.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vault')}
              className={`px-3 py-1.5 rounded text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'vault'
                  ? 'bg-[#3d462c] text-olive-bright border border-olive-bright/30'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>VAULT ({vaultDocs.length})</span>
            </button>
          </div>
        </div>

        {/* Tier Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(['core', 'episodic', 'semantic', 'procedural'] as const).map((tier) => (
            <div
              key={tier}
              className="rounded-lg border border-olive-drab/40 bg-[#12140e] px-4 py-3"
            >
              <div className="text-[10px] tracking-widest uppercase text-stone-400">
                {tier} Tier
              </div>
              <div className="text-2xl font-bold text-cyber-cyan tabular-nums mt-1">
                {tierCounts[tier]}
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'memories' ? (
          <div className="space-y-6">
            {/* Commit New Memory */}
            <form
              onSubmit={handleCreateMemory}
              className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-4 space-y-3"
            >
              <div className="text-xs font-bold tracking-widest text-olive-bright uppercase">
                Commit New Memory Node
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={newTier}
                  onChange={(e) => setNewTier(e.target.value as MemoryTier)}
                  className="px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
                >
                  <option value="core">CORE DIRECTIVE</option>
                  <option value="episodic">EPISODIC EVENT</option>
                  <option value="semantic">SEMANTIC FACT</option>
                  <option value="procedural">PROCEDURAL RULE</option>
                </select>
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter standalone memory directive or preference..."
                  className="flex-1 px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                />
                <label className="inline-flex items-center gap-2 px-2 py-2 text-xs text-stone-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newPinned}
                    onChange={(e) => setNewPinned(e.target.checked)}
                    className="accent-[#8fa85c]"
                  />
                  <span>PIN</span>
                </label>
                <button
                  type="submit"
                  disabled={!newContent.trim() || creating}
                  className="px-4 py-2 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold inline-flex items-center justify-center gap-1.5 border border-olive-bright/30 cursor-pointer whitespace-nowrap uppercase"
                >
                  <Plus className="w-4 h-4 text-olive-bright" />
                  <span>Commit</span>
                </button>
              </div>
            </form>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1 p-1 rounded border border-olive-drab/40 bg-[#12140e]">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTierFilter(t.id)}
                    className={`px-3 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      tierFilter === t.id
                        ? 'bg-[#3d462c] text-olive-bright'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter memories..."
                  className="w-full pl-8 pr-3 py-1.5 rounded border border-olive-drab/45 bg-[#12140e] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                />
              </div>
            </div>

            {/* Memories List */}
            {filteredMemories.length === 0 ? (
              <div className="rounded-lg border border-olive-drab/40 bg-[#12140e] p-10 text-center space-y-2">
                <div className="text-xs font-bold text-stone-300 uppercase">
                  No memories match filter
                </div>
                <p className="text-[11px] text-stone-500">
                  Run dispatches with Mnemosyne engaged or commit a memory above.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-olive-drab/25 rounded-lg border border-[#005a63]/50 bg-[#091517]">
                {filteredMemories.map((mem) => {
                  const isEditing = editingId === mem.id;
                  return (
                    <div key={mem.id} className="p-4 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
                          <span className="font-bold uppercase text-olive-bright">
                            {mem.tier}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>SOURCE: {mem.sourceType.toUpperCase()}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums text-cyber-cyan/80">
                            SALIENCE {Math.round(mem.salience * 100)}%
                          </span>
                          {mem.pinned && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-400 font-bold">PINNED</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {new Date(mem.updatedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {isEditing ? (
                          <div className="flex flex-col sm:flex-row gap-2 pt-1">
                            <select
                              value={editTier}
                              onChange={(e) => setEditTier(e.target.value as MemoryTier)}
                              className="px-2.5 py-1.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200"
                            >
                              <option value="core">CORE</option>
                              <option value="episodic">EPISODIC</option>
                              <option value="semantic">SEMANTIC</option>
                              <option value="procedural">PROCEDURAL</option>
                            </select>
                            <input
                              type="text"
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded border border-olive-drab/50 bg-[#0d0e0a] text-xs text-stone-200"
                            />
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => void handleSaveEdit(mem.id)}
                                className="p-1.5 rounded bg-[#3d462c] text-olive-bright cursor-pointer"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="p-1.5 rounded bg-stone-800 text-stone-300 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-cyan-100 leading-relaxed">{mem.content}</p>
                        )}
                      </div>

                      {!isEditing && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => void handleTogglePin(mem)}
                            title={mem.pinned ? 'Unpin' : 'Pin always'}
                            className={`p-1.5 rounded transition-colors cursor-pointer ${
                              mem.pinned
                                ? 'text-amber-400 hover:bg-amber-950/40'
                                : 'text-stone-500 hover:text-olive-bright'
                            }`}
                          >
                            {mem.pinned ? (
                              <PinOff className="w-4 h-4" />
                            ) : (
                              <Pin className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(mem.id);
                              setEditContent(mem.content);
                              setEditTier(mem.tier);
                            }}
                            title="Edit"
                            className="p-1.5 rounded text-stone-500 hover:text-cyber-cyan cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDeleteMemory(mem.id)}
                            title="Purge"
                            className="p-1.5 rounded text-stone-500 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Knowledge Vault Tab */
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-5 flex flex-col justify-between gap-4">
                <div>
                  <h2 className="text-xs font-bold tracking-widest text-olive-bright uppercase">
                    Index Local Documents
                  </h2>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Upload markdown specs, source code, JSON schemas, or text files for automatic
                    RAG chunk indexing across chat and live comms.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.md,.json,.csv,.ts,.tsx,.js,.py,.yaml,.yml,.sql"
                  className="hidden"
                  onChange={(e) => {
                    void handleVaultFile(e.target.files);
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  disabled={uploadingVault}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-6 rounded border border-dashed border-olive-drab/60 hover:border-olive-bright flex flex-col items-center justify-center gap-2 text-xs text-stone-300 transition-colors cursor-pointer"
                >
                  <FileUp className="w-5 h-5 text-olive-bright" />
                  <span>
                    {uploadingVault ? 'INDEXING...' : 'SELECT .MD, .TXT, .JSON, OR CODE'}
                  </span>
                </button>
              </div>

              <form
                onSubmit={handlePasteVault}
                className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-5 space-y-3"
              >
                <h2 className="text-xs font-bold tracking-widest text-olive-bright uppercase">
                  Add Reference Note
                </h2>
                <input
                  type="text"
                  value={vaultTitle}
                  onChange={(e) => setVaultTitle(e.target.value)}
                  placeholder="Document title..."
                  className="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
                />
                <textarea
                  value={vaultText}
                  onChange={(e) => setVaultText(e.target.value)}
                  rows={4}
                  placeholder="Paste architecture notes or specs..."
                  className="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright resize-none"
                />
                <button
                  type="submit"
                  disabled={!vaultTitle.trim() || !vaultText.trim() || uploadingVault}
                  className="px-4 py-2 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-xs font-bold border border-olive-bright/30 cursor-pointer uppercase"
                >
                  Index into Vault
                </button>
              </form>
            </div>

            {vaultDocs.length === 0 ? (
              <div className="rounded-lg border border-olive-drab/40 bg-[#12140e] p-10 text-center text-xs text-stone-500 uppercase">
                Knowledge Vault Empty
              </div>
            ) : (
              <div className="divide-y divide-olive-drab/25 rounded-lg border border-[#005a63]/50 bg-[#091517]">
                {vaultDocs.map((doc) => (
                  <div key={doc.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="min-w-0 space-y-1">
                      <div className="text-xs font-bold text-cyber-cyan truncate">
                        {doc.title}
                      </div>
                      <div className="text-[11px] text-stone-400 tabular-nums">
                        {doc.chunkCount} CHUNKS · {(doc.size / 1024).toFixed(1)} KB ·{' '}
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDeleteVault(doc.id)}
                      className="p-2 rounded text-stone-500 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
