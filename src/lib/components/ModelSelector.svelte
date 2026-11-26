<script lang="ts">
  import { ChevronDown, Check, Eye, Mic, Sparkles } from 'lucide-svelte';
  import type { LLMProvider, ModelOption, ProviderStatus } from '../../types/index';

  interface Props {
    models: ModelOption[];
    providers: ProviderStatus[];
    activeProvider: LLMProvider;
    activeModel: string;
    onSelect: (provider: LLMProvider, modelId: string) => void;
  }

  let { models, providers, activeProvider, activeModel, onSelect }: Props = $props();

  let open = $state(false);
  let containerEl: HTMLDivElement | undefined = $state();

  const PROVIDER_LABELS: Record<LLMProvider, string> = {
    gemini: 'GOOGLE GEMINI',
    nanogpt: 'NANOGPT',
    deepseek: 'DEEPSEEK',
    openai: 'OPENAI',
  };

  const grouped: LLMProvider[] = ['gemini', 'nanogpt', 'deepseek', 'openai'];

  let currentModel = $derived(
    models.find((m) => m.id === activeModel && m.provider === activeProvider) ||
      models.find((m) => m.id === activeModel) ||
      models[0]
  );

  function isProviderConfigured(providerId: LLMProvider): boolean {
    return providers.find((p) => p.id === providerId)?.configured ?? false;
  }

  $effect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerEl && !containerEl.contains(e.target as Node)) {
        open = false;
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  });
</script>

<div bind:this={containerEl} class="relative min-w-0">
  <button
    type="button"
    onclick={() => (open = !open)}
    class="inline-flex items-center gap-1.5 px-2 sm:px-3 h-8 sm:h-[34px] rounded border border-olive-drab/50 bg-[#141710] hover:border-olive-bright/60 text-[11px] sm:text-xs font-mono text-stone-200 transition-colors cursor-pointer whitespace-nowrap max-w-[175px] sm:max-w-none"
  >
    <span class="truncate text-olive-bright font-semibold">
      {currentModel?.label ?? activeModel}
    </span>
    <span class="text-[10px] text-stone-500 hidden sm:inline uppercase tracking-wider">
      {PROVIDER_LABELS[activeProvider]}
    </span>
    <ChevronDown class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-olive-bright/80 shrink-0" />
  </button>

  {#if open}
    <div
      class="fixed left-2.5 right-2.5 top-12 sm:absolute sm:left-0 sm:right-auto sm:top-full sm:mt-2 sm:w-[360px] max-h-[65dvh] sm:max-h-[440px] overflow-y-auto rounded border border-olive-drab/60 bg-[#12140e] shadow-[0_10px_30px_rgba(0,0,0,0.85)] z-50 p-2"
    >
      {#each grouped as providerKey}
        {@const groupModels = models.filter((m) => m.provider === providerKey)}
        {@const configured = isProviderConfigured(providerKey)}
        <div class="mb-2 last:mb-0">
          <div
            class="flex items-center justify-between px-2.5 py-1.5 text-[10px] tracking-widest uppercase border-b border-olive-drab/20"
          >
            <span class="font-bold text-olive-bright">
              {PROVIDER_LABELS[providerKey]}
            </span>
            <span class={configured ? 'text-emerald-400' : 'text-amber-400'}>
              {configured ? 'ONLINE' : 'KEY UNSET'}
            </span>
          </div>
          <div class="space-y-0.5 pt-1">
            {#each groupModels as model}
              {@const selected =
                model.id === activeModel && model.provider === activeProvider}
              <button
                type="button"
                onclick={() => {
                  onSelect(model.provider, model.id);
                  open = false;
                }}
                class="w-full min-h-[48px] text-left px-2.5 py-2 rounded transition-colors flex items-start justify-between gap-2 cursor-pointer border {selected
                  ? 'bg-[#091517] border-[#005a63]/60 text-cyber-cyan'
                  : 'border-transparent hover:bg-olive-drab/15 text-stone-300'}"
              >
                <div class="min-w-0">
                  <div class="flex items-center gap-2 text-xs font-semibold">
                    <span class="truncate">{model.label}</span>
                    <span class="text-[10px] font-mono text-stone-500 tabular-nums shrink-0">
                      {model.contextWindow}
                    </span>
                  </div>
                  <p class="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    {model.description}
                  </p>
                  <div class="flex items-center gap-2.5 mt-1 text-[10px] text-stone-500">
                    {#if model.supportsVision}
                      <span class="inline-flex items-center gap-1">
                        <Eye class="w-3 h-3" /> VISION
                      </span>
                    {/if}
                    {#if model.supportsAudio}
                      <span class="inline-flex items-center gap-1">
                        <Mic class="w-3 h-3" /> AUDIO
                      </span>
                    {/if}
                    {#if model.supportsReasoning}
                      <span class="inline-flex items-center gap-1">
                        <Sparkles class="w-3 h-3" /> REASONING
                      </span>
                    {/if}
                  </div>
                </div>
                {#if selected}
                  <Check class="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
