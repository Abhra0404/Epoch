"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Check, Copy } from "lucide-react";

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="prose max-w-none space-y-6 text-muted-foreground leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mt-8 mb-4 border-b border-border pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return (
              <h2
                id={id}
                className="group flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 pt-6 border-t border-border"
              >
                <span className="text-accent font-mono text-lg">#</span>
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground my-4">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/70">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 space-y-2 text-sm md:text-base text-muted-foreground list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm md:text-base leading-relaxed text-muted-foreground marker:text-foreground">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-foreground bg-foreground/10 px-5 py-4 rounded-[1.5rem] my-6 text-sm text-foreground italic shadow-xs">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border bg-secondary shadow-xs">
              <table className="w-full text-left text-xs md:text-sm text-muted-foreground border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary text-foreground font-semibold uppercase text-xs tracking-wider border-b border-border">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-secondary/60 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-muted-foreground border-t border-border">
              {children}
            </td>
          ),
          hr: () => <hr className="my-8 border-border" />,
          code: ({ className, children, ...props }) => {
            const codeString = String(children).replace(/\n$/, "");
            const isBlock = className || codeString.includes("\n");

            if (isBlock) {
              return (
                <div className="relative my-6 rounded-md border border-border bg-secondary overflow-hidden shadow-md">
                  <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border text-xs text-muted-foreground font-mono">
                    <span>Code Snippet</span>
                    <button
                      onClick={() => handleCopy(codeString)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copiedCode === codeString ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-muted-foreground/70" />
                          <span className="text-foreground font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-foreground leading-relaxed">
                    <code>{codeString}</code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="rounded-md bg-secondary border border-border px-1.5 py-0.5 text-xs md:text-sm font-mono text-muted-foreground/70"
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
