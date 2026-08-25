"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Check, Copy, Terminal, Hash, BookOpen, Layers, CheckCircle2 } from "lucide-react";

interface MarkdownViewerProps {
  content: string;
}

function stripWordCount(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    return node
      .replace(/\s*\([\d–\-]+\s*words.*?\)/gi, "")
      .replace(/\s*\(\d+\s*words\s*max\)/gi, "")
      .replace(/\s*\([^)]*words[^)]*\)/gi, "")
      .trim();
  }
  if (Array.isArray(node)) {
    return node.map((item) => stripWordCount(item));
  }
  return node;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div className="markdown-viewer prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2 mb-6 pb-4 border-b border-border/80">
              {stripWordCount(children)}
            </h1>
          ),
          h2: ({ children }) => {
            const cleanText = String(stripWordCount(children));
            const id = cleanText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return (
              <h2
                id={id}
                className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-10 mb-4 pt-6 border-t border-border/80"
              >
                {cleanText}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 mb-2">
              {stripWordCount(children)}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-foreground mt-5 mb-2">
              {stripWordCount(children)}
            </h4>
          ),
          p: ({ children }) => {
            const cleaned = stripWordCount(children);
            const str = typeof cleaned === "string" ? cleaned : "";
            // Check if paragraph contains key metadata at top of notes
            if (str.startsWith("TOPIC:") || str.startsWith("PREREQUISITE TOPICS:") || str.startsWith("LEARNING OUTCOMES:")) {
              return (
                <div className="my-3 p-3.5 rounded-2xl border border-border/60 bg-secondary/40 text-xs sm:text-sm text-muted-foreground leading-relaxed flex items-baseline gap-2">
                  <span className="shrink-0 font-bold text-foreground">{str.split(":")[0]}:</span>
                  <span>{str.split(":").slice(1).join(":")}</span>
                </div>
              );
            }
            return (
              <p className="text-base sm:text-[17px] leading-relaxed text-muted-foreground/90 my-4 font-normal">
                {cleaned}
              </p>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/80">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 text-base sm:text-[17px] text-muted-foreground/90 list-disc list-outside pl-6">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 space-y-2 text-base sm:text-[17px] text-muted-foreground/90 list-decimal list-outside pl-6">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed marker:text-accent marker:font-bold pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-2xl border-l-4 border-accent bg-accent/5 p-5 text-base text-foreground font-medium leading-relaxed shadow-2xs">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm text-muted-foreground border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary/80 text-foreground font-semibold uppercase text-[11px] tracking-wider border-b border-border/80">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border/60">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-secondary/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 sm:px-6 py-3.5 font-bold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 sm:px-6 py-3.5 text-muted-foreground font-normal border-t border-border/40">
              {children}
            </td>
          ),
          hr: () => null,
          code: ({ className, children, ...props }) => {
            const codeString = String(children).replace(/\n$/, "");
            const isBlock = className || codeString.includes("\n");
            
            // Extract language name if present (e.g. language-python -> Python)
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1].toUpperCase() : "CODE";

            if (isBlock) {
              return (
                <div className="my-6 rounded-2xl border border-border/80 bg-secondary/80 overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-secondary border-b border-border/60 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5 text-accent" />
                      <span className="font-semibold text-foreground tracking-wide text-[11px]">{language}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(codeString)}
                      className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                    >
                      {copiedCode === codeString ? (
                        <>
                          <Check className="h-3 w-3 text-accent" />
                          <span className="text-accent font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-foreground leading-relaxed bg-card/40">
                    <code>{codeString}</code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="rounded-md bg-secondary border border-border/60 px-1.5 py-0.5 text-xs sm:text-sm font-mono text-foreground font-medium"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
