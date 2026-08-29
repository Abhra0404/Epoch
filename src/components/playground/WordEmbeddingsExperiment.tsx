"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

// Simplified word embedding vectors (3D for visualization)
const embeddingDict: Record<string, [number, number, number]> = {
  king: [0.9, 0.8, 0.3],
  queen: [0.85, 0.9, 0.3],
  man: [0.7, 0.3, 0.2],
  woman: [0.65, 0.4, 0.2],
  cat: [0.2, 0.1, 0.8],
  dog: [0.25, 0.15, 0.85],
  car: [0.1, 0.7, 0.1],
  truck: [0.05, 0.75, 0.15],
  house: [0.3, 0.5, 0.4],
  tree: [0.15, 0.05, 0.7],
  happy: [0.6, 0.2, 0.6],
  sad: [0.4, 0.2, 0.5],
  big: [0.5, 0.6, 0.3],
  small: [0.5, 0.4, 0.3],
  water: [0.1, 0.1, 0.9],
  fire: [0.3, 0.8, 0.2],
  sun: [0.4, 0.9, 0.3],
  moon: [0.35, 0.85, 0.4],
};

const allWords = Object.keys(embeddingDict);

function cosine(a: [number, number, number], b: [number, number, number]): number {
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const magA = Math.sqrt(a[0] ** 2 + a[1] ** 2 + a[2] ** 2);
  const magB = Math.sqrt(b[0] ** 2 + b[1] ** 2 + b[2] ** 2);
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

function analogy(a: string, b: string, c: string): [string, number] | null {
  if (!embeddingDict[a] || !embeddingDict[b] || !embeddingDict[c]) return null;
  const vec: [number, number, number] = [
    embeddingDict[a][0] - embeddingDict[b][0] + embeddingDict[c][0],
    embeddingDict[a][1] - embeddingDict[b][1] + embeddingDict[c][1],
    embeddingDict[a][2] - embeddingDict[b][2] + embeddingDict[c][2],
  ];
  let bestWord = "", bestScore = -1;
  for (const w of allWords) {
    if (w === a || w === b || w === c) continue;
    const score = cosine(vec, embeddingDict[w]);
    if (score > bestScore) {
      bestScore = score;
      bestWord = w;
    }
  }
  return [bestWord, bestScore];
}

export function WordEmbeddingsExperiment() {
  const [queryWord, setQueryWord] = useState("king");
  const [analogyWords, setAnalogyWords] = useState({ a: "king", b: "man", c: "woman" });
  const [showAnalogy, setShowAnalogy] = useState(false);

  const queryVec = embeddingDict[queryWord] || embeddingDict.king;

  const neighbors = useMemo(() => {
    return allWords
      .filter((w) => w !== queryWord)
      .map((w) => ({ word: w, score: cosine(queryVec, embeddingDict[w]) }))
      .sort((a, b) => b.score - a.score);
  }, [queryWord, queryVec]);

  const analogyResult = useMemo(() => {
    return analogy(analogyWords.a, analogyWords.b, analogyWords.c);
  }, [analogyWords]);

  // 2D scatter projection (x,y from embedding)
  const scatterPoints = useMemo(() => {
    return allWords.map((w) => ({
      word: w,
      x: embeddingDict[w][0] * 300 + 50,
      y: embeddingDict[w][1] * 200 + 30,
      isQuery: w === queryWord,
    }));
  }, [queryWord]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Search className="h-4 w-4" /> Explorer
            </span>
            <button onClick={() => { setQueryWord("king"); setShowAnalogy(false); }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Query Word</label>
              <select value={queryWord} onChange={(e) => setQueryWord(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary px-3 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none">
                {allWords.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <button onClick={() => setShowAnalogy(!showAnalogy)}
                className="w-full rounded-xl px-3 py-2.5 text-xs font-bold border bg-secondary border-border text-foreground hover:bg-accent/10 transition-colors">
                {showAnalogy ? "Hide Analogy" : "Try an Analogy"}
              </button>
            </div>

            {showAnalogy && (
              <div className="space-y-3 p-3 rounded-xl border border-border bg-secondary">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  A : B :: C : ?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(["a", "b", "c"] as const).map((key) => (
                    <select key={key} value={analogyWords[key]}
                      onChange={(e) => setAnalogyWords((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="rounded-lg border border-border bg-background px-2 py-1.5 text-[11px] text-foreground focus:border-accent/50 focus:outline-none">
                      {allWords.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  ))}
                </div>
                {analogyResult && (
                  <p className="text-xs text-foreground">
                    {analogyWords.a} - {analogyWords.b} + {analogyWords.c} ={" "}
                    <span className="font-bold text-accent">{analogyResult[0]}</span>
                    <span className="text-muted-foreground ml-1">(sim: {analogyResult[1].toFixed(3)})</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Concept: </span>
            Words with similar meanings are close in vector space. Analogies are linear offsets.
          </p>
        </div>
      </div>

      {/* Visualization + Results */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Nearest Neighbors for &ldquo;{queryWord}&rdquo;
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ranked by cosine similarity
            </p>
          </div>
          <Link href="/research/papers/word2vec"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Scatter plot */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 400 260" className="w-full h-auto">
            {scatterPoints.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.isQuery ? 6 : 3.5}
                  fill={p.isQuery ? "var(--accent)" : "var(--muted-foreground)"}
                  opacity={p.isQuery ? 1 : 0.5} />
                <text x={p.x + (p.isQuery ? 9 : 6)} y={p.y + 3} fontSize={p.isQuery ? "10" : "8"}
                  fill={p.isQuery ? "var(--accent)" : "var(--muted-foreground)"}
                  fontWeight={p.isQuery ? "bold" : "normal"}>
                  {p.word}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Nearest neighbors */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Top Similar Words
          </p>
          <div className="space-y-2">
            {neighbors.slice(0, 8).map(({ word, score }) => (
              <div key={word} className="flex items-center gap-2">
                <button
                  onClick={() => setQueryWord(word)}
                  className="w-16 text-[11px] font-mono text-muted-foreground text-right hover:text-accent transition-colors truncate">
                  {word}
                </button>
                <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${Math.max(2, score * 100)}%` }} />
                </div>
                <span className="w-10 text-[10px] font-mono text-accent text-right">{score.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
