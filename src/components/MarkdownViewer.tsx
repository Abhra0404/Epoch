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

  // Decode HTML entities for proper LaTeX rendering
  const decodeHTMLEntities = (text: string): string => {
    const entities: { [key: string]: string } = {
      "&quot;": '"',
      "&apos;": "'",
      "&#39;": "'",
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
    };
    let result = text;
    for (const [entity, char] of Object.entries(entities)) {
      result = result.replace(new RegExp(entity, "g"), char);
    }
    return result;
  };

  const renderMathInText = (text: string): string => {
    // Display math: $$...$$
    let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      try {
        // Decode HTML entities before passing to KaTeX
        const decodedFormula = decodeHTMLEntities(formula);
        return katex.renderToString(decodedFormula, {
          displayMode: true,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {
        return match;
      }
    });

    // Inline math: $...$ (but not $$)
    // Updated pattern to handle LaTeX with escaped newlines (\\) in cases/arrays
    result = result.replace(/(?<!\$)\$([^\$]+?)\$(?!\$)/g, (match, formula) => {
      // Don't process if it contains actual newlines not part of LaTeX
      if (formula.includes("\n") && !formula.includes("\\\\")) return match;
      try {
        // Decode HTML entities before passing to KaTeX
        const decodedFormula = decodeHTMLEntities(formula);
        return katex.renderToString(decodedFormula, {
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
        // Decode HTML entities before passing to KaTeX
        const decodedFormula = decodeHTMLEntities(formula);
        return katex.renderToString(decodedFormula, {
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
        // Decode HTML entities before passing to KaTeX
        const decodedFormula = decodeHTMLEntities(formula);
        return katex.renderToString(decodedFormula, {
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
          // KaTeX tags
          "svg", "path", "line", "rect", "circle", "ellipse", "polygon",
          "foreignObject", "text", "tspan", "g", "defs", "use", "marker",
          "linearGradient", "radialGradient", "stop", "style",
        ],
        ALLOWED_ATTR: [
          "href", "src", "alt", "title", "class", "style", "id",
          // SVG attributes
          "viewBox", "width", "height", "d", "x", "y", "cx", "cy", "r",
          "x1", "y1", "x2", "y2", "points", "fill", "stroke", "stroke-width",
          "xmlns", "xmlns:xlink", "transform", "font-family", "font-size",
          "text-anchor", "dominant-baseline", "data-mml-node", "data-mjx-version",
        ],
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
          padding: 1rem 1.25rem;
          border-left: 3px solid var(--foreground);
          background: color-mix(in srgb, var(--card) 95%, var(--foreground) 5%);
          border-radius: 0 var(--radius, 12px) var(--radius, 12px) 0;
          color: var(--muted-foreground);
          font-style: normal;
        }

        .markdown-content code {
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          padding: 0.15rem 0.4rem;
          border-radius: 0.375rem;
          font-family: var(--font-mono, 'Monaco', 'Courier New', monospace);
          font-size: 0.85em;
          color: var(--foreground);
          border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          font-weight: 500;
        }

        .markdown-content pre {
          background: color-mix(in srgb, var(--card) 93%, var(--foreground) 7%);
          padding: 1.25rem;
          border-radius: var(--radius, 16px);
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid var(--border);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .markdown-content pre code {
          background: transparent;
          padding: 0;
          border-radius: 0;
          border: none;
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--foreground);
        }

        /* Tables */
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border: 1px solid var(--border);
          border-radius: var(--radius, 12px);
          overflow: hidden;
        }

        .markdown-content table thead {
          background: color-mix(in srgb, var(--card) 90%, var(--foreground) 10%);
        }

        .markdown-content table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
          color: var(--foreground);
        }

        .markdown-content table td {
          padding: 12px 16px;
          border-bottom: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
          font-size: 14px;
          color: var(--foreground);
        }

        .markdown-content table tr:last-child td {
          border-bottom: none;
        }

        .markdown-content table tbody tr:hover {
          background: color-mix(in srgb, var(--card) 95%, var(--foreground) 5%);
        }

        /* Math */
        .katex-display {
          margin: 1.5rem auto;
          padding: 1rem 1.5rem;
          width: fit-content;
          max-width: 100%;
          background: color-mix(in srgb, var(--card) 95%, var(--foreground) 5%);
          border: 1px solid var(--border);
          border-radius: var(--radius, 16px);
          overflow-x: auto;
          box-sizing: border-box;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .katex {
          font-size: 1rem;
          color: var(--foreground);
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
          color: var(--foreground);
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 500;
        }

        .markdown-content a:hover {
          opacity: 0.8;
        }

        /* Horizontal rule */
        .markdown-content hr {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid var(--border);
        }

        /* Images */
        .markdown-content img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: var(--radius, 12px);
          border: 1px solid var(--border);
        }

        .info-box {
          background: color-mix(in srgb, var(--card) 90%, var(--foreground) 10%);
          color: var(--foreground);
          padding: 1rem;
          border-radius: var(--radius, 12px);
          margin: 1rem 0;
          font-size: 14px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          border: 1px solid var(--border);
        }

        .info-box-icon {
          flex-shrink: 0;
          margin-top: 2px;
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
