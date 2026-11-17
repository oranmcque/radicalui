import { useState, useEffect, useRef, useCallback } from 'react';
import { PanelLeftOpen, Radio } from 'lucide-react';
import type {
  AppStatePayload,
  ChatAttachment,
  ChatMessage,
  ChatThread,
  LLMProvider,
  MnemosyneMemory,
  ModelOption,
  ProviderStatus,
  RecalledContext,
  WorkspaceSettings,
} from './types/index';
import { Sidebar } from './components/Sidebar';
import { ModelSelector } from './components/ModelSelector';
import { ChatWorkspace } from './components/ChatWorkspace';
import { LiveCallView } from './components/LiveCallView';
import { MnemosyneConsole } from './components/MnemosyneConsole';
import { ProvidersAudioView } from './components/ProvidersAudioView';

type ActiveView = 'chat' | 'live' | 'mnemosyne' | 'providers';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [serverOnline, setServerOnline] = useState(true);

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [memories, setMemories] = useState<MnemosyneMemory[]>([]);
  const [vaultDocs, setVaultDocs] = useState<AppStatePayload['vaultDocs']>([]);
  const [settings, setSettings] = useState<WorkspaceSettings | null>(null);
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [models, setModels] = useState<ModelOption[]>([]);

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<{
    content: string;
    reasoning: string;
    recalled?: RecalledContext;
    consolidated?: MnemosyneMemory[];
  } | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [stateRes, provRes] = await Promise.all([
        fetch('/api/state'),
        fetch('/api/providers/status'),
      ]);
      if (stateRes.ok) {
        const stateData = (await stateRes.json()) as AppStatePayload;
        setThreads(stateData.threads);
        setMemories(stateData.memories);
        setVaultDocs(stateData.vaultDocs);
        setSettings(stateData.settings);
        setActiveThreadId((prev) =>
          prev && stateData.threads.some((t) => t.id === prev)
            ? prev
            : stateData.threads[0]?.id ?? null
        );
      }
      if (provRes.ok) {
        const provData = (await provRes.json()) as {
          providers: ProviderStatus[];
          models: ModelOption[];
        };
        setProviders(provData.providers);
        setModels(provData.models);
      }
      setServerOnline(stateRes.ok && provRes.ok);
    } catch {
      setServerOnline(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const handleUpdateSettings = async (updates: Partial<WorkspaceSettings>) => {
    setSettings((prev) => (prev ? { ...prev, ...updates } : prev));
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const saved = (await res.json()) as WorkspaceSettings;
      setSettings(saved);
    }
  };

  const handleSelectModel = async (provider: LLMProvider, modelId: string) => {
    await handleUpdateSettings({ activeProvider: provider, activeModel: modelId });
    if (activeThreadId) {
      await fetch(`/api/threads/${activeThreadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, model: modelId }),
      });
      setThreads((prev) =>
        prev.map((t) => (t.id === activeThreadId ? { ...t, provider, model: modelId } : t))
      );
    }
  };

  const handleNewThread = async () => {
    const provider = settings?.activeProvider || 'gemini';
    const model = settings?.activeModel || 'gemini-4-hydrogen';
    const res = await fetch('/api/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, model }),
    });
    if (res.ok) {
      const created = (await res.json()) as ChatThread;
      setThreads((prev) => [created, ...prev]);
      setActiveThreadId(created.id);
      setActiveView('chat');
    }
  };

  const handleDeleteThread = async (id: string) => {
    await fetch(`/api/threads/${id}`, { method: 'DELETE' });
    setThreads((prev) => {
      const remaining = prev.filter((t) => t.id !== id);
      if (activeThreadId === id) {
        setActiveThreadId(remaining[0]?.id ?? null);
      }
      return remaining;
    });
  };

  const handleCreateAndSend = async (
    message: string,
    attachments: ChatAttachment[],
    options?: { regenerate?: boolean }
  ) => {
    if (!settings) return;
    let targetThreadId = activeThreadId;

    if (!targetThreadId) {
      const createRes = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: settings.activeProvider,
          model: settings.activeModel,
        }),
      });
      const created = (await createRes.json()) as ChatThread;
      setThreads((prev) => [created, ...prev]);
      setActiveThreadId(created.id);
      targetThreadId = created.id;
    }

    if (!options?.regenerate) {
      const optimisticUser: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        attachments,
        createdAt: new Date().toISOString(),
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === targetThreadId
            ? { ...t, messages: [...t.messages, optimisticUser] }
            : t
        )
      );
    }

    setIsStreaming(true);
    setStreamingMessage({ content: '', reasoning: '' });
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          threadId: targetThreadId,
          message,
          attachments,
          provider: settings.activeProvider,
          model: settings.activeModel,
          useMnemosyne: settings.useMnemosyneInChat,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to connect to streaming endpoint.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accContent = '';
      let accReasoning = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line.startsWith('data:')) continue;
          const payloadStr = line.slice(5).trim();
          if (!payloadStr) continue;
          try {
            const event = JSON.parse(payloadStr) as {
              type: string;
              text?: string;
              recalled?: RecalledContext;
              memories?: MnemosyneMemory[];
              message?: ChatMessage | string;
              threadTitle?: string;
            };

            if (event.type === 'mnemosyne_recall' && event.recalled) {
              setStreamingMessage((prev) =>
                prev ? { ...prev, recalled: event.recalled } : prev
              );
            } else if (event.type === 'reasoning' && event.text) {
              accReasoning += event.text;
              setStreamingMessage((prev) =>
                prev ? { ...prev, reasoning: accReasoning } : prev
              );
            } else if (event.type === 'delta' && event.text) {
              accContent += event.text;
              setStreamingMessage((prev) =>
                prev ? { ...prev, content: accContent } : prev
              );
            } else if (event.type === 'mnemosyne_consolidated' && event.memories) {
              setMemories((prev) => [...event.memories!, ...prev]);
              setStreamingMessage((prev) =>
                prev ? { ...prev, consolidated: event.memories } : prev
              );
            } else if (event.type === 'done' && event.message && typeof event.message !== 'string') {
              const finalMsg = event.message;
              setThreads((prev) =>
                prev.map((t) =>
                  t.id === targetThreadId
                    ? {
                        ...t,
                        title: event.threadTitle || t.title,
                        messages: [...t.messages, finalMsg],
                      }
                    : t
                )
              );
            } else if (event.type === 'error') {
              throw new Error(
                typeof event.message === 'string' ? event.message : 'Stream error'
              );
            }
          } catch (innerErr) {
            if (innerErr instanceof Error && innerErr.message !== 'Unexpected end of JSON input') {
              throw innerErr;
            }
          }
        }
      }
    } finally {
      setIsStreaming(false);
      setStreamingMessage(null);
      abortControllerRef.current = null;
    }
  };

  const handleStopStreaming = () => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
    setStreamingMessage(null);
  };

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;

  if (!settings) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0a0b08] text-xs font-mono text-olive-bright uppercase tracking-widest">
        Initializing Aetheris Tactical Node...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0a0b08] text-stone-300 font-mono">
      {sidebarOpen && (
        <Sidebar
          threads={threads}
          activeThreadId={activeThreadId}
          memoryCount={memories.length}
          vaultCount={vaultDocs.length}
          serverOnline={serverOnline}
          onSelectThread={(id) => {
            setActiveThreadId(id);
            setActiveView('chat');
          }}
          onNewThread={() => void handleNewThread()}
          onDeleteThread={(id) => void handleDeleteThread(id)}
          onOpenLiveCall={() => setActiveView('live')}
          onOpenMnemosyne={() => setActiveView('mnemosyne')}
          onOpenApiVault={() => setActiveView('providers')}
          onCollapse={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Tactical Command Bar (3 zones, single-line) */}
        <header className="h-14 shrink-0 px-4 sm:px-6 border-b border-olive-drab/40 bg-[#12140e] flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                className="p-2 rounded border border-olive-drab/40 text-olive-bright hover:bg-olive-drab/15 transition-colors cursor-pointer"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            )}
            <span className="text-sm font-black tracking-wider text-olive-bright whitespace-nowrap shrink-0">
              AETHERIS
            </span>
            <ModelSelector
              models={models}
              providers={providers}
              activeProvider={settings.activeProvider}
              activeModel={settings.activeModel}
              onSelect={(prov, modelId) => void handleSelectModel(prov, modelId)}
            />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase">
            {(
              [
                { id: 'chat', label: 'Dispatch' },
                { id: 'live', label: 'Live Comms' },
                { id: 'mnemosyne', label: 'Mnemosyne OS' },
                { id: 'providers', label: 'API Keys & Audio' },
              ] as Array<{ id: ActiveView; label: string }>
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeView === item.id
                    ? 'text-cyber-cyan underline underline-offset-8 decoration-2 decoration-cyber-cyan'
                    : 'text-stone-400 hover:text-olive-bright'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() =>
                activeView === 'live' ? setActiveView('chat') : setActiveView('live')
              }
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#091517] hover:border-cyber-cyan border border-[#005a63]/60 text-cyber-cyan text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{activeView === 'live' ? 'DISPATCH' : 'LIVE COMMS'}</span>
            </button>
          </div>
        </header>

        {/* Mobile View Switcher */}
        <div className="md:hidden flex items-center gap-1 px-3 py-2 border-b border-olive-drab/35 bg-[#12140e] overflow-x-auto">
          {(
            [
              { id: 'chat', label: 'DISPATCH' },
              { id: 'live', label: 'COMMS' },
              { id: 'mnemosyne', label: 'MNEMOSYNE' },
              { id: 'providers', label: 'API KEYS' },
            ] as Array<{ id: ActiveView; label: string }>
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`px-3 py-1 rounded text-[11px] font-bold whitespace-nowrap shrink-0 ${
                activeView === item.id
                  ? 'bg-[#3d462c] text-olive-bright'
                  : 'text-stone-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active View */}
        {activeView === 'chat' && (
          <ChatWorkspace
            thread={activeThread}
            activeProvider={settings.activeProvider}
            activeModel={settings.activeModel}
            settings={settings}
            onUpdateSettings={(u) => void handleUpdateSettings(u)}
            onCreateAndSend={handleCreateAndSend}
            streamingMessage={streamingMessage}
            isStreaming={isStreaming}
            onStopStreaming={handleStopStreaming}
            onOpenLiveCall={() => setActiveView('live')}
            onOpenMnemosyne={() => setActiveView('mnemosyne')}
          />
        )}

        {activeView === 'live' && (
          <LiveCallView
            settings={settings}
            activeProvider={settings.activeProvider}
            activeModel={settings.activeModel}
            onUpdateSettings={(u) => void handleUpdateSettings(u)}
            onSavedThread={(threadId) => {
              setActiveThreadId(threadId);
              setActiveView('chat');
            }}
            onRefreshState={fetchAll}
          />
        )}

        {activeView === 'mnemosyne' && (
          <MnemosyneConsole
            memories={memories}
            vaultDocs={vaultDocs}
            onRefreshState={fetchAll}
          />
        )}

        {activeView === 'providers' && (
          <ProvidersAudioView
            providers={providers}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onRefreshProviders={(nextProviders) => setProviders(nextProviders)}
          />
        )}
      </div>
    </div>
  );
}
