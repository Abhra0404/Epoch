"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sliders, RotateCcw, ArrowRight, Play, Pause } from "lucide-react";
import Link from "next/link";

interface GANState {
  epoch: number;
  genLoss: number;
  discLoss: number;
  realMeans: number[];
  fakeMeans: number[];
}

export function GANTrainingExperiment() {
  const [genLR, setGenLR] = useState(0.001);
  const [discLR, setDiscLR] = useState(0.0005);
  const [noiseDim, setNoiseDim] = useState(4);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<GANState[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const step = useCallback(() => {
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      const epoch = last ? last.epoch + 1 : 0;

      // Simple GAN dynamics simulation
      const balance = last ? (last.discLoss - last.genLoss) : 0;
      const modeCollapse = noiseDim < 3 ? 0.15 : 0;

      // Generator improves when disc is too good
      const genDelta = -balance * genLR * 80 + (Math.random() - 0.5) * 0.02;
      const genLoss = Math.max(0.05, Math.min(2, (last?.genLoss ?? 1.0) + genDelta + modeCollapse * 0.01));

      // Discriminator adjusts
      const discDelta = balance * discLR * 120 + (Math.random() - 0.5) * 0.015;
      const discLoss = Math.max(0.05, Math.min(2, (last?.discLoss ?? 0.5) + discDelta));

      // Track mode collapse: fake distribution means
      const nModes = noiseDim >= 3 ? 3 : 1;
      const fakeMeans = Array.from({ length: nModes }, (_, i) =>
        (last?.fakeMeans[i] ?? (i * 2 - 2)) + (Math.random() - 0.5) * 0.3 * (1 - modeCollapse)
      );
      const realMeans = Array.from({ length: 3 }, (_, i) => i * 2 - 2);

      return [...prev, { epoch, genLoss, discLoss, realMeans, fakeMeans }].slice(-80);
    });
  }, [genLR, discLR, noiseDim]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(step, 200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, step]);

  const reset = () => {
    setRunning(false);
    setHistory([]);
  };

  const latest = history[history.length - 1];
  const toSvgX = (epoch: number, maxEpoch: number) => (epoch / Math.max(maxEpoch, 1)) * 400;
  const toSvgY = (loss: number) => 160 - (loss / 2.2) * 160;

  const maxEpoch = latest ? latest.epoch : 1;

  const genPath = history.map((h, i) =>
    `${i === 0 ? "M" : "L"}${toSvgX(h.epoch, maxEpoch)},${toSvgY(h.genLoss)}`
  ).join(" ");

  const discPath = history.map((h, i) =>
    `${i === 0 ? "M" : "L"}${toSvgX(h.epoch, maxEpoch)},${toSvgY(h.discLoss)}`
  ).join(" ");

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Controls
            </span>
            <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Generator LR</span>
                <span className="text-accent font-mono">{genLR}</span>
              </div>
              <input type="range" min="0.0001" max="0.01" step="0.0001" value={genLR}
                onChange={(e) => setGenLR(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Discriminator LR</span>
                <span className="text-accent font-mono">{discLR}</span>
              </div>
              <input type="range" min="0.0001" max="0.01" step="0.0001" value={discLR}
                onChange={(e) => setDiscLR(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Noise Dimension</span>
                <span className="text-accent font-mono">{noiseDim}</span>
              </div>
              <input type="range" min="1" max="8" step="1" value={noiseDim}
                onChange={(e) => setNoiseDim(parseInt(e.target.value))}
                className="mt-2 w-full accent-accent" />
              <p className="mt-1 text-[10px] text-muted-foreground">
                Lower dim → risk of mode collapse.
              </p>
            </div>

            <button onClick={() => setRunning((r) => !r)}
              className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold border transition-colors ${
                running
                  ? "bg-accent/10 border-accent text-accent"
                  : "bg-secondary border-border text-foreground hover:bg-accent/10"
              }`}>
              {running ? <><Pause className="inline h-3 w-3 mr-1" /> Pause</> : <><Play className="inline h-3 w-3 mr-1" /> Train GAN</>}
            </button>
          </div>
        </div>

        {latest && (
          <div className="mt-6 pt-4 border-t border-border text-[11px] space-y-1">
            <p>Epoch: <span className="font-bold text-accent font-mono">{latest.epoch}</span></p>
            <p>Gen Loss: <span className="font-bold font-mono text-foreground">{latest.genLoss.toFixed(4)}</span></p>
            <p>Disc Loss: <span className="font-bold font-mono text-foreground">{latest.discLoss.toFixed(4)}</span></p>
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">GAN Training Dynamics</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Watch the generator and discriminator compete
            </p>
          </div>
          <Link href="/research/papers/generative-adversarial-nets"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 400 180" className="w-full h-auto">
            {[0, 40, 80, 120, 160].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--border)" strokeWidth="0.5" opacity="0.4" />
            ))}
            {genPath && <path d={genPath} fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {discPath && <path d={discPath} fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeDasharray="6,3" />}
            <text x="8" y="14" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">Loss</text>
            <text x="350" y="175" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">Epoch →</text>
          </svg>
        </div>

        {/* Legend + Distribution */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-accent" /> Generator
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-muted-foreground border-dashed" style={{ borderTop: "2px dashed var(--muted-foreground)", height: 0 }} /> Discriminator
            </span>
          </div>

          {latest && (
            <div className="rounded-xl border border-border bg-background p-3">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Output Distribution</p>
              <div className="flex items-end gap-1 h-8">
                {latest.fakeMeans.map((m, i) => (
                  <div key={i} className="flex-1 rounded-t bg-accent/40 transition-all"
                    style={{ height: `${Math.min(100, Math.max(10, (m + 3) * 15))}%` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
