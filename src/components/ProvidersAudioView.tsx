import { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, KeyRound, Trash2, Save } from 'lucide-react';
import type {
  ProviderStatus,
  STTProvider,
  TTSProvider,
  WorkspaceSettings,
} from '../types/index';

interface ProvidersAudioViewProps {
  providers: ProviderStatus[];
  settings: WorkspaceSettings;
  onUpdateSettings: (updates: Partial<WorkspaceSettings>) => Promise<void>;
  onRefreshProviders: (nextProviders: ProviderStatus[]) => void;
}

type EditableKeyId = 'deepgram' | 'fishaudio' | 'nanogpt' | 'deepseek' | 'openai';

const EDITABLE_PROVIDERS: Array<{ id: EditableKeyId; placeholder: string }> = [
  { id: 'deepgram', placeholder: 'Paste Deepgram API key (Token)...' },
  { id: 'fishaudio', placeholder: 'Paste Fish Audio Bearer API key...' },
  { id: 'nanogpt', placeholder: 'Paste NanoGPT API key...' },
  { id: 'deepseek', placeholder: 'Paste DeepSeek API key (sk-...)...' },
  { id: 'openai', placeholder: 'Paste OpenAI API key (sk-...)...' },
];

export function ProvidersAudioView({
  providers,
  settings,
  onUpdateSettings,
  onRefreshProviders,
}: ProvidersAudioViewProps) {
  const [testingTts, setTestingTts] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);
  const [systemPromptDraft, setSystemPromptDraft] = useState(settings.systemPrompt);
  const [fishVoiceDraft, setFishVoiceDraft] = useState(settings.fishVoiceId);
  const [savedToast, setSavedToast] = useState(false);

  const [keyDrafts, setKeyDrafts] = useState<Record<EditableKeyId, string>>({
    deepgram: '',
    fishaudio: '',
    nanogpt: '',
    deepseek: '',
    openai: '',
  });
  const [savingKeyId, setSavingKeyId] = useState<EditableKeyId | null>(null);
  const [keyFeedback, setKeyFeedback] = useState<string | null>(null);

  const handleSaveProviderKey = async (providerId: EditableKeyId, keyVal: string) => {
    setSavingKeyId(providerId);
    setKeyFeedback(null);
    try {
      const res = await fetch('/api/providers/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: providerId, apiKey: keyVal }),
      });
      if (res.ok) {
        const data = (await res.json()) as { providers: ProviderStatus[] };
        onRefreshProviders(data.providers);
        setKeyDrafts((prev) => ({ ...prev, [providerId]: '' }));
        setKeyFeedback(
          keyVal.trim()
            ? `${providerId.toUpperCase()} credential committed to server vault.`
            : `${providerId.toUpperCase()} vault credential cleared.`
        );
      }
    } finally {
      setSavingKeyId(null);
    }
  };

  const handleSaveTextConfigs = async () => {
    await onUpdateSettings({
      systemPrompt: systemPromptDraft,
      fishVoiceId: fishVoiceDraft,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 1800);
  };

  const handleTestSpeech = async () => {
    setTestError(null);
    setTestingTts(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'Tactical audio link operational. Mnemosyne memory core standing by.',
          provider: settings.ttsProvider,
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
      setTestError(err instanceof Error ? err.message : 'TTS test failed');
    } finally {
      setTestingTts(false);
    }
  };

  const geminiStatus = providers.find((p) => p.id === 'gemini');

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 bg-[#0a0b08] relative font-mono">
      <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-15" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="pb-4 border-b border-olive-drab/40">
          <h1 className="text-xl font-bold tracking-wider text-olive-bright uppercase">
            API Key Vault &amp; Audio Routing
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Store third-party API credentials securely on your self-hosted server and configure STT
            / TTS speech pipelines.
          </p>
        </div>

        {/* API Credentials Vault */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-olive-bright uppercase">
              <KeyRound className="w-4 h-4" />
              <span>Server-Side Credential Vault</span>
            </div>
            {keyFeedback && (
              <span className="text-xs text-cyber-cyan">{keyFeedback}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gemini Environment Status (read-only per runtime security) */}
            {geminiStatus && (
              <div className="rounded-lg border border-[#005a63]/50 bg-[#091517] p-4 space-y-2 relative">
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyber-cyan opacity-45" />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-cyber-cyan uppercase">
                    {geminiStatus.name}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      geminiStatus.configured ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {geminiStatus.configured ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ENV ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>ENV UNSET</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-cyan-100/70 leading-relaxed">
                  {geminiStatus.note}
                </p>
                <div className="text-[10px] text-cyber-cyan/60 pt-1">
                  MANAGED VIA RUNTIME ENVIRONMENT SECRET ({geminiStatus.envVar})
                </div>
              </div>
            )}

            {/* Editable Self-Hosted Provider Credentials */}
            {EDITABLE_PROVIDERS.map(({ id, placeholder }) => {
              const info = providers.find((p) => p.id === id);
              const configured = info?.configured ?? false;
              const source = info?.source ?? 'none';
              return (
                <div
                  key={id}
                  className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-200 uppercase">
                      {info?.name ?? id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        configured ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {configured ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{source === 'vault' ? 'VAULT ACTIVE' : 'ENV ACTIVE'}</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>UNCONFIGURED</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {info?.note}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="password"
                      autoComplete="off"
                      value={keyDrafts[id]}
                      onChange={(e) =>
                        setKeyDrafts((prev) => ({ ...prev, [id]: e.target.value }))
                      }
                      placeholder={
                        configured ? '•••••••••••••••• (enter new key to replace)' : placeholder
                      }
                      className="flex-1 min-w-0 px-3 py-1.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-olive-bright"
                    />
                    <button
                      type="button"
                      disabled={!keyDrafts[id].trim() || savingKeyId === id}
                      onClick={() => void handleSaveProviderKey(id, keyDrafts[id])}
                      className="px-3 py-1.5 rounded bg-[#3d462c] hover:bg-[#4c5836] disabled:opacity-40 text-stone-100 text-[11px] font-bold inline-flex items-center gap-1 border border-olive-bright/30 cursor-pointer shrink-0"
                    >
                      <Save className="w-3 h-3 text-olive-bright" />
                      <span>SAVE</span>
                    </button>
                    {source === 'vault' && (
                      <button
                        type="button"
                        disabled={savingKeyId === id}
                        onClick={() => void handleSaveProviderKey(id, '')}
                        title="Clear saved key from vault"
                        className="p-1.5 rounded border border-red-500/30 text-red-400 hover:bg-red-950/50 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Speech-to-Text & Text-to-Speech Pipeline */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-5 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-olive-bright uppercase">
              Speech-to-Text (Dictation &amp; Modular Call)
            </h2>

            <div className="space-y-2">
              <label className="block text-[11px] text-stone-400 uppercase">
                Active STT Engine
              </label>
              <div className="flex gap-2">
                {(['deepgram', 'gemini'] as STTProvider[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => void onUpdateSettings({ sttProvider: id })}
                    className={`flex-1 py-2 px-3 rounded border text-xs font-bold transition-colors cursor-pointer ${
                      settings.sttProvider === id
                        ? 'border-olive-bright bg-olive-drab/25 text-olive-bright'
                        : 'border-olive-drab/35 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {id === 'deepgram' ? 'DEEPGRAM NOVA' : 'GEMINI TRANSCRIBE'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-stone-400 uppercase">
                Deepgram Model
              </label>
              <select
                value={settings.deepgramSttModel}
                onChange={(e) => void onUpdateSettings({ deepgramSttModel: e.target.value })}
                className="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
              >
                <option value="nova-2">nova-2 (Balanced low-latency)</option>
                <option value="nova-3">nova-3 (High accuracy)</option>
                <option value="enhanced">enhanced</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-widest text-olive-bright uppercase">
                Text-to-Speech (Reply &amp; Voice Call)
              </h2>
              <button
                type="button"
                disabled={testingTts}
                onClick={() => void handleTestSpeech()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#005a63]/60 bg-[#091517] hover:border-cyber-cyan text-[11px] font-bold text-cyber-cyan cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{testingTts ? 'SYNTHESIZING...' : 'TEST VOICE'}</span>
              </button>
            </div>

            {testError && <div className="text-xs text-red-400">{testError}</div>}

            <div className="space-y-2">
              <label className="block text-[11px] text-stone-400 uppercase">
                Active TTS Engine
              </label>
              <div className="flex gap-2">
                {(['fishaudio', 'deepgram', 'gemini'] as TTSProvider[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => void onUpdateSettings({ ttsProvider: id })}
                    className={`flex-1 py-2 px-2 rounded border text-[11px] font-bold transition-colors cursor-pointer ${
                      settings.ttsProvider === id
                        ? 'border-olive-bright bg-olive-drab/25 text-olive-bright'
                        : 'border-olive-drab/35 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {id === 'fishaudio'
                      ? 'FISH AUDIO'
                      : id === 'deepgram'
                        ? 'DEEPGRAM AURA'
                        : 'GEMINI TTS'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] text-stone-400 uppercase">
                  Gemini Voice
                </label>
                <select
                  value={settings.geminiVoice}
                  onChange={(e) => void onUpdateSettings({ geminiVoice: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
                >
                  <option value="Zephyr">Zephyr</option>
                  <option value="Kore">Kore</option>
                  <option value="Puck">Puck</option>
                  <option value="Charon">Charon</option>
                  <option value="Fenrir">Fenrir</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] text-stone-400 uppercase">
                  Deepgram Aura Voice
                </label>
                <select
                  value={settings.deepgramTtsVoice}
                  onChange={(e) => void onUpdateSettings({ deepgramTtsVoice: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
                >
                  <option value="aura-asteria-en">aura-asteria-en</option>
                  <option value="aura-orion-en">aura-orion-en</option>
                  <option value="aura-luna-en">aura-luna-en</option>
                  <option value="aura-arcas-en">aura-arcas-en</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] text-stone-400 uppercase">
                Fish Audio Reference Voice ID (Optional)
              </label>
              <input
                type="text"
                value={fishVoiceDraft}
                onChange={(e) => setFishVoiceDraft(e.target.value)}
                placeholder="Blank for default or paste Fish Audio reference_id"
                className="w-full px-3 py-2 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200"
              />
            </div>
          </div>
        </section>

        {/* System Persona */}
        <section className="rounded-lg border border-olive-drab/45 bg-[#12140e] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-olive-bright uppercase">
                System Directive &amp; Mnemosyne Consolidation
              </h2>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Base persona injected alongside Mnemosyne OS context across all dispatches.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoConsolidateMemory}
                onChange={(e) =>
                  void onUpdateSettings({ autoConsolidateMemory: e.target.checked })
                }
                className="accent-[#8fa85c]"
              />
              <span>Auto-consolidate memories</span>
            </label>
          </div>

          <textarea
            value={systemPromptDraft}
            onChange={(e) => setSystemPromptDraft(e.target.value)}
            rows={4}
            className="w-full px-3.5 py-2.5 rounded border border-olive-drab/45 bg-[#0d0e0a] text-xs text-stone-200 focus:outline-none focus:border-olive-bright"
          />

          <div className="flex items-center justify-end gap-3">
            {savedToast && (
              <span className="text-xs text-olive-bright">CONFIGURATION COMMITTED</span>
            )}
            <button
              type="button"
              onClick={() => void handleSaveTextConfigs()}
              className="px-4 py-2 rounded bg-[#3d462c] hover:bg-[#4c5836] border border-olive-bright/30 text-stone-100 text-xs font-bold tracking-wider cursor-pointer uppercase"
            >
              Save Directives
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
