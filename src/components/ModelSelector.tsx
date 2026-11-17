import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Eye, Mic, Sparkles } from 'lucide-react';
import type { LLMProvider, ModelOption, ProviderStatus } from '../types/index';

interface ModelSelectorProps {
  models: ModelOption[];
  providers: ProviderStatus[];
  activeProvider: LLMProvider;
  activeModel: string;
  onSelect: (provider: LLMProvider, modelId: string) => void;
}

const PROVIDER_LABELS: Record<LLMProvider, string> = {
  gemini: 'GOOGLE GEMINI',
  nanogpt: 'NANOGPT',
  deepseek: 'DEEPSEEK',
  openai: 'OPENAI',
};

export function ModelSelector({
  models,
  providers,
  activeProvider,
  activeModel,
  onSelect,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const currentModel =
    models.find((m) => m.id === activeModel && m.provider === activeProvider) ||
    models.find((m) => m.id === activeModel) ||
    models[0];

  const isProviderConfigured = (providerId: LLMProvider) => {
    return providers.find((p) => p.id === providerId)?.configured ?? false;
  };

  const grouped: LLMProvider[] = ['gemini', 'nanogpt', 'deepseek', 'openai'];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded border border-olive-drab/50 bg-[#141710] hover:border-olive-bright/60 text-xs font-mono text-stone-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
      >
        <span className="truncate max-w-[180px] text-olive-bright font-semibold">
          {currentModel?.label ?? activeModel}
        </span>
        <span className="text-[10px] text-stone-500 hidden sm:inline uppercase tracking-wider">
          {PROVIDER_LABELS[activeProvider]}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-olive-bright/80 shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-[360px] max-w-[92vw] max-h-[440px] overflow-y-auto rounded border border-olive-drab/60 bg-[#12140e] shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 p-2">
          {grouped.map((providerKey) => {
            const groupModels = models.filter((m) => m.provider === providerKey);
            const configured = isProviderConfigured(providerKey);
            return (
              <div key={providerKey} className="mb-2 last:mb-0">
                <div className="flex items-center justify-between px-2.5 py-1.5 text-[10px] tracking-widest uppercase border-b border-olive-drab/20">
                  <span className="font-bold text-olive-bright">
                    {PROVIDER_LABELS[providerKey]}
                  </span>
                  <span className={configured ? 'text-emerald-400' : 'text-amber-400'}>
                    {configured ? 'ONLINE' : 'KEY UNSET'}
                  </span>
                </div>
                <div className="space-y-0.5 pt-1">
                  {groupModels.map((model) => {
                    const selected =
                      model.id === activeModel && model.provider === activeProvider;
                    return (
                      <button
                        key={`${model.provider}-${model.id}`}
                        type="button"
                        onClick={() => {
                          onSelect(model.provider, model.id);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded transition-colors flex items-start justify-between gap-2 cursor-pointer border ${
                          selected
                            ? 'bg-[#091517] border-[#005a63]/60 text-cyber-cyan'
                            : 'border-transparent hover:bg-olive-drab/15 text-stone-300'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs font-semibold">
                            <span className="truncate">{model.label}</span>
                            <span className="text-[10px] font-mono text-stone-500 tabular-nums shrink-0">
                              {model.contextWindow}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                            {model.description}
                          </p>
                          <div className="flex items-center gap-2.5 mt-1 text-[10px] text-stone-500">
                            {model.supportsVision && (
                              <span className="inline-flex items-center gap-1">
                                <Eye className="w-3 h-3" /> VISION
                              </span>
                            )}
                            {model.supportsAudio && (
                              <span className="inline-flex items-center gap-1">
                                <Mic className="w-3 h-3" /> AUDIO
                              </span>
                            )}
                            {model.supportsReasoning && (
                              <span className="inline-flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> REASONING
                              </span>
                            )}
                          </div>
                        </div>
                        {selected && <Check className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
