import { useState } from 'react';
import {
  Brain,
  KeyRound,
  Plus,
  Radio,
  Search,
  Terminal,
  Trash2,
  PanelLeftClose,
} from 'lucide-react';
import type { ChatThread } from '../types/index';

interface SidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  memoryCount: number;
  vaultCount: number;
  serverOnline: boolean;
  onSelectThread: (id: string) => void;
  onNewThread: () => void;
  onDeleteThread: (id: string) => void;
  onOpenLiveCall: () => void;
  onOpenMnemosyne: () => void;
  onOpenApiVault: () => void;
  onCollapse: () => void;
}

export function Sidebar({
  threads,
  activeThreadId,
  memoryCount,
  vaultCount,
  serverOnline,
  onSelectThread,
  onNewThread,
  onDeleteThread,
  onOpenLiveCall,
  onOpenMnemosyne,
  onOpenApiVault,
  onCollapse,
}: SidebarProps) {
  const [search, setSearch] = useState('');

  const filtered = threads.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-72 shrink-0 h-full flex flex-col justify-between border-r border-olive-drab/40 bg-[#12140e] p-4 font-mono">
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand & Collapse */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-olive-bright font-black text-xl tracking-wider select-none">
              AETHERIS-UI
            </h1>
            <span className="text-olive-drab text-[10px] tracking-widest block -mt-0.5 uppercase">
              Mnemosyne Tactical Node
            </span>
          </div>
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            className="p-1.5 rounded text-stone-500 hover:text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* New Dispatch Button */}
        <button
          type="button"
          onClick={onNewThread}
          className="w-full bg-[#3d462c] hover:bg-[#4c5836] active:scale-[0.98] transition-all text-stone-100 font-bold py-2.5 px-4 rounded border border-olive-bright/30 hover:border-olive-bright/60 flex items-center justify-center gap-2 mb-6 shadow-[0_0_15px_rgba(143,168,92,0.15)] cursor-pointer text-xs tracking-wider uppercase"
        >
          <Plus className="w-4 h-4 text-olive-bright" />
          <span>New Dispatch</span>
        </button>

        {/* Tactical Modules */}
        <div className="space-y-1 mb-5">
          <div className="flex items-center gap-2 px-2 text-olive-bright text-[11px] tracking-widest font-bold mb-1.5 uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Command Modules</span>
          </div>

          <button
            type="button"
            onClick={onOpenLiveCall}
            className="w-full text-left text-xs text-stone-300 hover:text-cyber-cyan hover:bg-[#091517] px-3 py-2 rounded flex items-center justify-between border border-transparent hover:border-[#005a63]/50 transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Live Voice Comms</span>
            </span>
            <span className="text-[10px] text-cyber-cyan/70">REALTIME</span>
          </button>

          <button
            type="button"
            onClick={onOpenMnemosyne}
            className="w-full text-left text-xs text-stone-300 hover:text-olive-bright hover:bg-olive-drab/15 px-3 py-2 rounded flex items-center justify-between border border-transparent hover:border-olive-drab/40 transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-olive-bright" />
              <span>Mnemosyne OS</span>
            </span>
            <span className="text-[10px] tabular-nums text-olive-bright/80">
              {memoryCount} · {vaultCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenApiVault}
            className="w-full text-left text-xs text-stone-300 hover:text-olive-bright hover:bg-olive-drab/15 px-3 py-2 rounded flex items-center justify-between border border-transparent hover:border-olive-drab/40 transition-colors cursor-pointer"
          >
            <span className="inline-flex items-center gap-2">
              <KeyRound className="w-3.5 h-3.5 text-olive-bright" />
              <span>API Keys & Audio</span>
            </span>
            <span className="text-[10px] text-stone-500">VAULT</span>
          </button>
        </div>

        {/* Search Threads */}
        <div className="mb-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter dispatches..."
              className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded border border-olive-drab/40 bg-[#0d0e0a] text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
            />
          </div>
        </div>

        {/* Dispatch History */}
        <div className="text-[10px] tracking-widest uppercase text-stone-500 px-2 mb-1.5 font-bold">
          Dispatch Logs
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 min-h-0">
          {filtered.length === 0 ? (
            <div className="px-2 py-6 text-[11px] text-stone-600 text-center">
              {search ? 'NO MATCHING LOGS' : 'NO ACTIVE DISPATCHES'}
            </div>
          ) : (
            filtered.map((thread) => {
              const active = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  className={`group flex items-center justify-between gap-1.5 px-2.5 py-2 rounded text-xs transition-colors border ${
                    active
                      ? 'text-olive-bright bg-olive-drab/15 border-olive-bright/40'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-olive-drab/10 border-transparent'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectThread(thread.id)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <div className="truncate font-medium">{thread.title}</div>
                    <div className="text-[10px] text-stone-500 truncate mt-0.5 tabular-nums">
                      {thread.model} · {thread.messages.length} msgs
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteThread(thread.id);
                    }}
                    aria-label="Delete thread"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded text-stone-500 hover:text-red-400 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Server Link Status */}
      <div className="border-t border-olive-drab/25 pt-3 mt-3 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              serverOnline
                ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                : 'bg-red-500'
            }`}
          />
          <span
            className={`font-bold uppercase tracking-wider ${
              serverOnline ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {serverOnline ? 'Server: Online' : 'Server: Offline'}
          </span>
        </div>
        <span className="text-[10px] text-stone-500">LOCAL</span>
      </div>
    </aside>
  );
}
