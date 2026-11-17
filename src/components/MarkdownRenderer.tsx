import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match?.[1] || 'text';
  const codeText = String(children ?? '').replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="my-3 overflow-hidden rounded border border-[#005a63]/60 bg-[#050c0e] text-cyan-100">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-[#005a63]/40 bg-[#071114] text-[11px] text-cyber-cyan/70">
        <span className="font-mono uppercase tracking-wider">{lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-cyber-cyan/70 hover:text-cyber-cyan transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-olive-bright" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-[12.5px] leading-relaxed font-mono text-cyan-50">
        <code>{codeText}</code>
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="chat-markdown text-[13.5px] text-cyan-100 break-words font-mono">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const isBlock = Boolean(className) || String(children).includes('\n');
            if (!isBlock) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-[#004c54]/45 border border-[#005a63]/40 text-[12px] font-mono text-cyber-cyan"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return <CodeBlock className={className}>{children}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
