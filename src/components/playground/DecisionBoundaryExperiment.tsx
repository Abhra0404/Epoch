"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

type Classifier = "logistic" | "svm" | "knn";

interface Point {
  x: number;
  y: number;
  label: number;
}

const initialPoints: Point[] = [
  { x: 25, y: 30, label: 0 }, { x: 35, y: 20, label: 0 },
  { x: 20, y: 40, label: 0 }, { x: 30, y: 35, label: 0 },
  { x: 15, y: 25, label: 0 }, { x: 40, y: 30, label: 0 },
  { x: 70, y: 60, label: 1 }, { x: 80, y: 70, label: 1 },
  { x: 65, y: 75, label: 1 }, { x: 75, y: 55, label: 1 },
  { x: 85, y: 65, label: 1 }, { x: 60, y: 80, label: 1 },
];

function logisticScore(x: number, y: number, points: Point[]): number {
  const w1 = points.reduce((s, p) => s + (p.label === 1 ? 1 : -1) * (x - p.x), 0) / points.length;
  const w2 = points.reduce((s, p) => s + (p.label === 1 ? 1 : -1) * (y - p.y), 0) / points.length;
  const b = points.reduce((s, p) => s + (p.label === 1 ? -1 : 1) * (p.x * p.x + p.y * p.y), 0) / (2 * points.length);
  return 1 / (1 + Math.exp(-(w1 * x + w2 * y + b)));
}

function knnClassify(x: number, y: number, points: Point[], k: number): number {
  const sorted = [...points].sort((a, b) =>
    Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y)
  );
  const neighbors = sorted.slice(0, k);
  return neighbors.filter((n) => n.label === 1).length > k / 2 ? 1 : 0;
}

export function DecisionBoundaryExperiment() {
  const [classifier, setClassifier] = useState<Classifier>("logistic");
  const [kNeighbors, setKNeighbors] = useState(3);
  const [resolution] = useState(20);

  const boundaryPixels = useMemo(() => {
    const pixels: { x: number; y: number; label: number }[] = [];
    const step = 100 / resolution;
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const cx = i * step + step / 2;
        const cy = j * step + step / 2;
        let label: number;
        if (classifier === "logistic") {
          label = logisticScore(cx, cy, initialPoints) > 0.5 ? 1 : 0;
        } else if (classifier === "knn") {
          label = knnClassify(cx, cy, initialPoints, kNeighbors);
        } else {
          label = logisticScore(cx, cy, initialPoints) > 0.5 ? 1 : 0;
        }
        pixels.push({ x: i * step, y: j * step, label });
      }
    }
    return pixels;
  }, [classifier, kNeighbors, resolution]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Controls
            </span>
            <button onClick={() => { setClassifier("logistic"); setKNeighbors(3); }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Classifier</label>
              <div className="space-y-2">
                {(["logistic", "svm", "knn"] as Classifier[]).map((c) => (
                  <button key={c} onClick={() => setClassifier(c)}
                    className={`w-full rounded-xl p-3 text-left border transition-all ${
                      classifier === c
                        ? "bg-accent/10 border-accent text-accent"
                        : "bg-secondary border-border text-muted-foreground"
                    }`}>
                    <div className="font-bold text-sm capitalize">
                      {c === "knn" ? "k-NN" : c === "logistic" ? "Logistic Regression" : "Linear SVM"}
                    </div>
                    <div className="text-[10px] mt-1 opacity-80">
                      {c === "logistic" && "Probabilistic linear classifier"}
                      {c === "svm" && "Maximum-margin separator (shown as logistic approximation)"}
                      {c === "knn" && "Instance-based, votes from k nearest neighbors"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {classifier === "knn" && (
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>k (Neighbors)</span>
                  <span className="text-accent font-mono">{kNeighbors}</span>
                </div>
                <input type="range" min="1" max="9" step="2" value={kNeighbors}
                  onChange={(e) => setKNeighbors(parseInt(e.target.value))}
                  className="mt-2 w-full accent-accent" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Dataset: </span>
            12 points, 2 classes in 2D.
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Decision Boundary</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {classifier === "knn" ? `k-NN (k=${kNeighbors})` : classifier === "logistic" ? "Logistic Regression" : "Linear SVM"}
            </p>
          </div>
          <Link href="/subjects/machine-learning/simple-linear-regression"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 300 300" className="w-full h-auto max-w-md mx-auto">
            {/* Background regions */}
            {boundaryPixels.map((px, i) => (
              <rect key={i} x={px.x * 3} y={px.y * 3} width={300 / resolution + 1} height={300 / resolution + 1}
                fill={px.label === 1 ? "var(--accent)" : "var(--background)"}
                opacity={px.label === 1 ? 0.12 : 0.4} />
            ))}

            {/* Data points */}
            {initialPoints.map((p, i) => (
              <React.Fragment key={i}>
                <circle cx={p.x * 3} cy={p.y * 3} r="7"
                  fill={p.label === 1 ? "var(--accent)" : "var(--background)"}
                  stroke="var(--foreground)" strokeWidth="1.5" />
                <text x={p.x * 3} y={p.y * 3 + 3} textAnchor="middle" fontSize="8"
                  fill={p.label === 1 ? "var(--background)" : "var(--foreground)"}
                  fontWeight="bold">
                  {p.label === 1 ? "+" : "−"}
                </text>
              </React.Fragment>
            ))}

            <text x="8" y="295" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">x₁</text>
            <text x="5" y="15" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">x₂</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground" /> Class 0
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Class 1
          </span>
        </div>
      </div>
    </div>
  );
}
