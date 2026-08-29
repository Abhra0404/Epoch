"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Sliders, RotateCcw, ArrowRight, Play, Pause } from "lucide-react";
import Link from "next/link";

interface KMeansPoint {
  x: number;
  y: number;
  cluster: number;
}

const CLUSTER_COLORS = [
  "#000000", "#6366f1", "#f43f5e", "#10b981",
  "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899",
];

function generatePoints(n: number, k: number): KMeansPoint[] {
  const centers = Array.from({ length: k }, () => ({
    x: Math.random() * 300 + 50,
    y: Math.random() * 200 + 20,
  }));
  return Array.from({ length: n }, () => {
    const c = centers[Math.floor(Math.random() * centers.length)];
    return {
      x: c.x + (Math.random() - 0.5) * 120,
      y: c.y + (Math.random() - 0.5) * 100,
      cluster: -1,
    };
  });
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function KMeansExperiment() {
  const [k, setK] = useState(3);
  const [points, setPoints] = useState<KMeansPoint[]>(() => generatePoints(60, 3));
  const [centroids, setCentroids] = useState<{ x: number; y: number }[]>([]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  // Initialize / reset
  const reset = useCallback(() => {
    const pts = generatePoints(60, k);
    setPoints(pts);
    // Pick k random points as initial centroids
    const shuffled = [...pts].sort(() => Math.random() - 0.5);
    setCentroids(shuffled.slice(0, k).map((p) => ({ x: p.x, y: p.y })));
    setStep(0);
    setRunning(false);
  }, [k]);

  useEffect(() => {
    reset();
  }, [k, reset]);

  // K-means step
  const stepKMeans = useCallback(() => {
    if (centroids.length === 0) return;

    // Assign
    const assigned = points.map((p) => {
      let minD = Infinity, minC = 0;
      centroids.forEach((c, ci) => {
        const d = dist(p, c);
        if (d < minD) { minD = d; minC = ci; }
      });
      return { ...p, cluster: minC };
    });

    // Update centroids
    const newCentroids = Array.from({ length: k }, (_, ci) => {
      const members = assigned.filter((p) => p.cluster === ci);
      if (members.length === 0) return centroids[ci];
      return {
        x: members.reduce((s, p) => s + p.x, 0) / members.length,
        y: members.reduce((s, p) => s + p.y, 0) / members.length,
      };
    });

    setPoints(assigned);
    setCentroids(newCentroids);
    setStep((s) => s + 1);
  }, [points, centroids, k]);

  // Auto-run
  useEffect(() => {
    if (!running) return;
    const id = setInterval(stepKMeans, 500);
    return () => clearInterval(id);
  }, [running, stepKMeans]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Controls
            </span>
            <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors" title="Reset">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Number of Clusters (k)</span>
                <span className="text-accent font-mono">{k}</span>
              </div>
              <input
                type="range" min="2" max="8" step="1" value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={stepKMeans}
                className="flex-1 rounded-xl px-3 py-2.5 text-xs font-bold border bg-secondary border-border text-foreground hover:bg-accent/10 transition-colors"
              >
                Step Once
              </button>
              <button
                onClick={() => setRunning((r) => !r)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-xs font-bold border transition-colors ${
                  running
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-secondary border-border text-foreground hover:bg-accent/10"
                }`}
              >
                {running ? <Pause className="inline h-3 w-3 mr-1" /> : <Play className="inline h-3 w-3 mr-1" />}
                {running ? "Pause" : "Auto-Run"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
          <p>Step: <span className="font-bold text-accent font-mono">{step}</span></p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {centroids.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-md bg-secondary border border-border px-2 py-0.5 text-[10px] font-mono">
                <span className="h-2 w-2 rounded-full" style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }} />
                C{i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">K-Means Clustering</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              k = {k} · Step {step} · {points.length} points
            </p>
          </div>
          <Link
            href="/subjects/machine-learning/decision-tree-fundamentals"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
          >
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 400 260" className="w-full h-auto">
            {/* Points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x} cy={p.y}
                r="4"
                fill={p.cluster >= 0 ? CLUSTER_COLORS[p.cluster % CLUSTER_COLORS.length] : "var(--muted-foreground)"}
                opacity="0.7"
              />
            ))}

            {/* Centroids */}
            {centroids.map((c, i) => (
              <React.Fragment key={i}>
                <circle cx={c.x} cy={c.y} r="8" fill="none" stroke={CLUSTER_COLORS[i % CLUSTER_COLORS.length]} strokeWidth="2" />
                <circle cx={c.x} cy={c.y} r="3" fill={CLUSTER_COLORS[i % CLUSTER_COLORS.length]} />
              </React.Fragment>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
