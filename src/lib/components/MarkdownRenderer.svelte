<script lang="ts">
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';

  interface Props {
    content: string;
  }

  let { content }: Props = $props();

  let html = $derived.by(() => {
    const raw = marked.parse(content || '', { gfm: true, breaks: true }) as string;
    return DOMPurify.sanitize(raw);
  });
</script>

<div class="chat-markdown text-cyan-100 break-words">
  {@html html}
</div>

<style>
  .chat-markdown :global(pre) {
    margin: 0.65rem 0;
    padding: 0.7rem 0.85rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(0, 90, 99, 0.6);
    background-color: #050c0e;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.55;
    color: #ecfeff;
  }

  .chat-markdown :global(:not(pre) > code) {
    padding: 0.1rem 0.35rem;
    border-radius: 0.25rem;
    background-color: rgba(0, 76, 84, 0.45);
    border: 1px solid rgba(0, 90, 99, 0.4);
    font-family: var(--font-mono);
    font-size: 12px;
    color: #00f0ff;
    word-break: break-word;
  }
</style>
