"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface AskEpochProps {
  paperTitle?: string;
}

const defaultSuggestions = [
  "Explain the key contribution",
  "Explain the mathematics",
  "What should I know before reading this?",
  "What papers came after this?",
  "Help me reproduce this paper",
];

export function AskEpoch({ paperTitle }: AskEpochProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const suggestions = paperTitle
    ? [
        "Explain the key contribution",
        "Explain the mathematics",
        "What should I know before reading this?",
        "What papers came after this?",
        "Help me reproduce this paper",
      ]
    : [
        "What paper should I start with?",
        "Explain the Transformer architecture",
        "What are scaling laws?",
        "How do diffusion models work?",
      ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all ${
          isOpen
            ? "bg-foreground text-background"
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
        title="Ask Epoch"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)]">
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10">
                <Sparkles className="h-3.5 w-3.5 text-foreground" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Ask Epoch</p>
                <p className="text-[10px] text-muted-foreground">AI Research Assistant</p>
              </div>
            </div>

            {/* Context */}
            {paperTitle && (
              <div className="px-4 py-2 bg-secondary border-b border-border">
                <p className="text-[10px] text-muted-foreground">Context</p>
                <p className="text-xs font-semibold text-foreground truncate">{paperTitle}</p>
              </div>
            )}

            {/* Suggestions */}
            <div className="px-4 py-3 space-y-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Suggested questions
              </p>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors border border-transparent hover:border-border"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about this paper..."
                  className="flex-1 bg-transparent text-xs text-foreground placeholder-muted-foreground focus:outline-none"
                />
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  disabled={!input.trim()}
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
