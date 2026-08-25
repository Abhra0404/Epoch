"use client";

import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

interface MarkdownViewerProps {
  content?: string;
  initialContent?: string;
  onContentChange?: (content: string) => void;
  showEditor?: boolean;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content = "",
  initialContent = "",
  onContentChange,
  showEditor,
}) => {
  const activeContent = content || initialContent;
  const [markdown, setMarkdown] = useState<string>(activeContent);
  const [html, setHtml] = useState<string>("");
  const outputRef = useRef<HTMLDivElement>(null);

  // Synchronize internal markdown state when prop changes
  useEffect(() => {
    if (activeContent !== undefined) {
      setMarkdown(activeContent);
    }
  }, [activeContent]);

  const renderMathInText = (text: string): string => {
    // Display math: $$...$$
    let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula, {
          displayMode: true,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {
        return match;
      }
    });

    // Inline math: $...$ (but not $$)
    result = result.replace(/(?<!\$)\$([^\$\n]+)\$(?!\$)/g, (match, formula) => {
      if (formula.includes("\n")) return match;
      try {
        return katex.renderToString(formula, {
          displayMode: false,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {
        return match;
      }
    });

    // LaTeX display: \[...\]
    result = result.replace(/\\\[([\s\S]*?)\\\]/g, (match, formula) => {
      try {
        return katex.renderToString(formula, {
          displayMode: true,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {
        return match;
      }
    });

    // LaTeX inline: \(...\)
    result = result.replace(/\\\((.*?)\\\)/g, (match, formula) => {
      try {
        return katex.renderToString(formula, {
          displayMode: false,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {
        return match;
      }
    });

    return result;
  };

  const renderMarkdown = async (mdText: string) => {
    if (!mdText.trim()) {
      setHtml('<div class="info-box"><span class="info-box-icon">ℹ</span><div>No markdown to render.</div></div>');
      return;
    }

    try {
      // Clean word count notations from headings
      const cleanedMd = mdText
        .replace(/(#+\s+.*?)\s*\([\d–\-]+\s*words.*?\)/gi, "$1")
        .replace(/(#+\s+.*?)\s*\(\d+\s*words\s*max\)/gi, "$1")
        .replace(/(#+\s+.*?)\s*\([^)]*words[^)]*\)/gi, "$1");

      let parsed = await marked.parse(cleanedMd);
      
      // Process LaTeX formulas
      parsed = renderMathInText(parsed);

      // Sanitize HTML
      const sanitized = DOMPurify.sanitize(parsed, {
        ALLOWED_TAGS: [
          "h1", "h2", "h3", "h4", "h5", "h6",
          "p", "br", "strong", "em", "code", "pre",
          "blockquote", "ul", "ol", "li", "table",
          "thead", "tbody", "tr", "th", "td",
          "a", "img", "hr", "div", "span", "section",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style", "id"],
        KEEP_CONTENT: true,
      });

      setHtml(sanitized);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setHtml(`<div style="color: var(--destructive, #ef4444);">Error rendering markdown: ${errorMsg}</div>`);
    }
  };

  useEffect(() => {
    renderMarkdown(markdown);
  }, [markdown]);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdown(value);
    onContentChange?.(value);
  };

  const clearAll = () => {
    setMarkdown("");
    setHtml("");
    onContentChange?.("");
  };

  const copyRendered = async () => {
    try {
      if (outputRef.current) {
        await navigator.clipboard.writeText(outputRef.current.innerHTML);
        alert("HTML copied to clipboard!");
      }
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy to clipboard");
    }
  };

  const isInteractive = showEditor !== undefined ? showEditor : !content;

  return (
    <div className="markdown-viewer-container">
      <style>{`
        .markdown-viewer-container {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          max-width: 100%;
          margin: 0 auto;
        }

        .editor-panel {
          background: var(--surface-1, var(--secondary, #f9f9f7));
          border: 0.5px solid var(--border, #e0e0e0);
          border-radius: var(--radius, 12px);
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .editor-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary, var(--muted-foreground, #666));
        }

        .editor-textarea {
          width: 100%;
          min-height: 250px;
          padding: 1rem;
          border: 0.5px solid var(--border, #e0e0e0);
          border-radius: var(--radius, 8px);
          font-family: var(--font-mono, 'Monaco', 'Courier New', monospace);
          font-size: 13px;
          line-height: 1.6;
          resize: vertical;
          background: var(--surface-2, var(--card, #fff));
          color: var(--text-primary, var(--foreground, #1a1a1a));
          box-sizing: border-box;
        }

        .editor-textarea:focus {
          outline: none;
          border-color: var(--border-strong, var(--ring, #999));
        }

        .button-group {
          display: flex;
          gap: 8px;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 8px 16px;
          border: 0.5px solid var(--border-strong, var(--border, #999));
          border-radius: var(--radius, 8px);
          background: var(--surface-2, var(--card, #fff));
          color: var(--text-primary, var(--foreground, #1a1a1a));
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn:hover {
          background: var(--surface-1, var(--secondary, #f9f9f7));
          border-color: var(--border-stronger, var(--border, #666));
        }

        .btn:active {
          transform: scale(0.98);
        }

        .render-panel {
          width: 100%;
        }

        .markdown-content {
          line-height: 1.8;
          color: var(--text-primary, var(--foreground, #1a1a1a));
        }

        /* Typography */
        .markdown-content h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 2rem 0 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border, #e0e0e0);
        }

        .markdown-content h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 2rem 0 0.8rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border, #e0e0e0);
        }

        .markdown-content h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 1.5rem 0 0.6rem;
        }

        .markdown-content h4 {
          font-size: 16px;
          font-weight: 600;
          margin: 1.2rem 0 0.4rem;
        }

        .markdown-content h5,
        .markdown-content h6 {
          font-size: 15px;
          font-weight: 600;
          margin: 1rem 0 0.4rem;
        }

        .markdown-content p {
          margin-bottom: 1.25rem;
          font-size: 16px;
          line-height: 1.8;
        }

        .markdown-content p:last-child {
          margin-bottom: 0;
        }

        .markdown-content ul,
        .markdown-content ol {
          margin: 1rem 0 1rem 2rem;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
          font-size: 16px;
          line-height: 1.7;
        }

        .markdown-content blockquote {
          margin: 1.5rem 0;
          padding: 0.75rem 1.25rem;
          border-left: 4px solid var(--border-strong, var(--accent, #333));
          background: var(--surface-1, var(--secondary, #f9f9f7));
          border-radius: 0 8px 8px 0;
          color: var(--text-secondary, var(--muted-foreground, #555));
          font-style: italic;
        }

        .markdown-content code {
          background: var(--surface-1, var(--secondary, #f9f9f7));
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono, 'Monaco', 'Courier New', monospace);
          font-size: 13px;
          color: var(--text-primary, var(--foreground, #1a1a1a));
          border: 0.5px solid var(--border, #e0e0e0);
        }

        .markdown-content pre {
          background: var(--surface-1, var(--secondary, #f9f9f7));
          padding: 1rem;
          border-radius: var(--radius, 12px);
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 0.5px solid var(--border, #e0e0e0);
        }

        .markdown-content pre code {
          background: none;
          padding: 0;
          border-radius: 0;
          border: none;
          font-size: 13px;
          line-height: 1.6;
        }

        /* Tables */
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border: 0.5px solid var(--border, #e0e0e0);
          border-radius: var(--radius, 12px);
          overflow: hidden;
        }

        .markdown-content table thead {
          background: var(--surface-1, var(--secondary, #f9f9f7));
        }

        .markdown-content table th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid var(--border, #e0e0e0);
          font-size: 14px;
        }

        .markdown-content table td {
          padding: 12px;
          border-bottom: 0.5px solid var(--border, #e0e0e0);
          font-size: 14px;
        }

        .markdown-content table tr:last-child td {
          border-bottom: none;
        }

        .markdown-content table tbody tr:hover {
          background: var(--surface-1, var(--secondary, #f9f9f7));
        }

        /* Math */
        .katex-display {
          margin: 1.5rem auto;
          padding: 0.75rem 1.25rem;
          width: fit-content;
          max-width: 100%;
          background: var(--surface-1, var(--secondary, #f9f9f7));
          border: 1px solid var(--border, #e0e0e0);
          border-radius: 12px;
          overflow-x: auto;
          box-sizing: border-box;
        }

        .katex {
          font-size: 15px;
          color: var(--text-primary, var(--foreground, #1a1a1a));
        }

        /* Inline math without outer box */
        :not(.katex-display) > .katex {
          background: transparent;
          border: none;
          padding: 0;
          margin: 0 2px;
        }

        /* Links */
        .markdown-content a {
          color: var(--text-accent, #0066cc);
          text-decoration: none;
          border-bottom: 1px solid var(--border-accent, #0066cc);
        }

        .markdown-content a:hover {
          text-decoration: underline;
        }

        /* Horizontal rule */
        .markdown-content hr {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid var(--border-strong, #999);
        }

        /* Images */
        .markdown-content img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: var(--radius, 8px);
        }

        .info-box {
          background: var(--bg-accent, #e6f1fb);
          color: var(--text-accent, #0066cc);
          padding: 1rem;
          border-radius: var(--radius, 8px);
          margin: 1rem 0;
          font-size: 13px;
          display: flex;
          gap: 8px;
          align-items: flex-start;
          border: 1px solid var(--border, #d0e1f9);
        }

        .info-box-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        @media (prefers-color-scheme: dark) {
          .editor-panel {
            background: var(--surface-1, #2a2a2a);
            border-color: var(--border, #404040);
          }

          .editor-textarea {
            background: var(--surface-2, #1a1a1a);
            color: var(--text-primary, #e0e0e0);
            border-color: var(--border, #404040);
          }

          .btn {
            background: var(--surface-2, #1a1a1a);
            color: var(--text-primary, #e0e0e0);
            border-color: var(--border-strong, #555);
          }

          .btn:hover {
            background: var(--surface-1, #2a2a2a);
            border-color: var(--border-stronger, #777);
          }

          .markdown-content code {
            background: var(--surface-1, #2a2a2a);
          }

          .markdown-content pre {
            background: var(--surface-1, #2a2a2a);
            border-color: var(--border, #404040);
          }

          .info-box {
            background: var(--bg-accent, #0c2847);
            color: var(--text-accent, #5ba3f5);
          }
        }
      `}</style>

      {isInteractive && (
        <div className="editor-panel">
          <label className="editor-label">Paste or upload markdown:</label>
          <textarea
            className="editor-textarea"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Paste your markdown here..."
          />
          <div className="button-group">
            <button className="btn" onClick={() => renderMarkdown(markdown)}>
              <span>▶</span>
              Render
            </button>
            <button className="btn" onClick={clearAll}>
              <span>🗑</span>
              Clear
            </button>
            <button className="btn" onClick={copyRendered}>
              <span>📋</span>
              Copy HTML
            </button>
          </div>
        </div>
      )}

      <div className="render-panel">
        <div
          ref={outputRef}
          className="markdown-content"
          dangerouslySetInnerHTML={{
            __html: html || `<div class="info-box"><span class="info-box-icon">ℹ</span><div>Paste markdown above and click Render. Supports tables, math formulas (LaTeX), code blocks, and full markdown syntax.</div></div>`,
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownViewer;
