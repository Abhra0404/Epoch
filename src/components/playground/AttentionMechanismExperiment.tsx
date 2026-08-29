"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

const defaultSentence = "The cat sat on the mat";

function tokenize(s: string): string[] {
  return s.split(/\s+/).filter(Boolean);
}

function computeAttention(tokens: string[], temperature: number): number[][] {
  const n = tokens.length;
  // Simple deterministic "attention" based on token similarity (cosine-like)
  const seed = tokens.map((t) => {
    let h = 0;
    for (let i = 0; i < t.length; i++) h = ((h << 5) - h + t.charCodeAt(i)) | 0;
    return h;
  });

  const weights: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      // Similarity: same length = high, same first char = high
      let sim = 0;
      if (i === j) sim = 2;
      if (Math.abs(seed[i] % 7) === Math.abs(seed[j] % 7)) sim += 1;
      if (Math.abs((seed[i] % 5) - (seed[j] % 5)) < 2) sim += 0.5;
      // Positional: nearby tokens attend more
      sim += Math.exp(-Math.abs(i - j) * 0.3);
      row.push(sim / temperature);
    }
    // Softmax
    const maxVal = Math.max(...row);
    const expRow = row.map((v) => Math.exp(v - maxVal));
    const sum = expRow.reduce((a, b) => a + b, 0);
    weights.push(expRow.map((v) => v / sum));
  }
  return weights;
}

export function AttentionMechanismExperiment() {
  const [sentence, setSentence] = useState(defaultSentence);
  const [temperature, setTemperature] = useState(1.0);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  const tokens = useMemo(() => tokenize(sentence), [sentence]);
  const attention = useMemo(() => computeAttention(tokens, temperature), [tokens, temperature]);

  const activeRow = selectedToken !== null ? attention[selectedToken] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Controls
            </span>
            <button onClick={() => { setSentence(defaultSentence); setTemperature(1.0); setSelectedToken(null); }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Input Sentence</label>
              <input type="text" value={sentence} onChange={(e) => setSentence(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:border-accent/50 focus:outline-none" />
              <p className="mt-1 text-[10px] text-muted-foreground">
                {tokens.length} tokens. Click a token in the heatmap to inspect.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Temperature</span>
                <span className="text-accent font-mono">{temperature.toFixed(1)}</span>
              </div>
              <input type="range" min="0.1" max="3" step="0.1" value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent" />
              <p className="mt-1 text-[10px] text-muted-foreground">
                Lower = sharper focus, higher = more uniform attention.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Concept: </span>
            Self-attention computes how much each token should &ldquo;attend&rdquo; to every other token.
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Attention Heatmap</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {selectedToken !== null
                ? `Token "${tokens[selectedToken]}" attending to...`
                : "Click a token row to inspect attention weights"}
            </p>
          </div>
          <Link href="/research/papers/attention-is-all-you-need"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Heatmap */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-x-auto">
          <div className="min-w-fit">
            {/* Column headers */}
            <div className="flex">
              <div className="w-20 shrink-0" />
              {tokens.map((t, j) => (
                <div key={j} className="w-16 shrink-0 text-center text-[9px] font-mono text-muted-foreground px-0.5 truncate">
                  {t}
                </div>
              ))}
            </div>

            {/* Rows */}
            {tokens.map((t, i) => (
              <div key={i}
                className={`flex items-center cursor-pointer transition-colors rounded-lg ${
                  selectedToken === i ? "bg-accent/10" : "hover:bg-secondary"
                }`}
                onClick={() => setSelectedToken(selectedToken === i ? null : i)}>
                <div className="w-20 shrink-0 text-[10px] font-mono font-bold text-muted-foreground px-2 truncate">
                  {t}
                </div>
                {attention[i].map((w, j) => (
                  <div key={j}
                    className="w-16 h-8 shrink-0 mx-0.5 my-0.5 rounded-md flex items-center justify-center text-[8px] font-mono font-bold transition-all"
                    style={{
                      backgroundColor: `var(--accent)`,
                      opacity: 0.08 + w * 0.92,
                      color: w > 0.3 ? "var(--background)" : "var(--foreground)",
                    }}>
                    {w.toFixed(2)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Selected token bar chart */}
        {activeRow && selectedToken !== null && (
          <div className="mt-4 rounded-2xl border border-border bg-secondary p-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Attention from &ldquo;{tokens[selectedToken]}&rdquo;
            </p>
            <div className="space-y-2">
              {tokens.map((t, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className="w-16 text-[10px] font-mono text-muted-foreground text-right truncate">{t}</span>
                  <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${activeRow[j] * 100}%` }} />
                  </div>
                  <span className="w-10 text-[10px] font-mono text-accent text-right">{activeRow[j].toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
