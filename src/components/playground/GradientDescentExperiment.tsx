"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

type FuncChoice = "quadratic" | "quartic";

export function GradientDescentExperiment() {
  const [learningRate, setLearningRate] = useState(0.1);
  const [iterations, setIterations] = useState(15);
  const [startWeight, setStartWeight] = useState(-2.5);
  const [funcChoice, setFuncChoice] = useState<FuncChoice>("quadratic");

  const history = useMemo(() => {
    const h: { step: number; w: number; loss: number; grad: number }[] = [];
    let w = startWeight;
    for (let i = 0; i <= iterations; i++) {
      let loss: number, grad: number;
      if (funcChoice === "quadratic") {
        loss = (w - 3) ** 2 + 1;
        grad = 2 * (w - 3);
      } else {
        loss = 0.1 * w ** 4 - 2 * w ** 2 + 0.5 * w + 8;
        grad = 0.4 * w ** 3 - 4 * w + 0.5;
      }
      h.push({ step: i, w, loss, grad });
      w = w - learningRate * grad;
    }
    return h;
  }, [learningRate, iterations, startWeight, funcChoice]);

  const final = history[history.length - 1];
  const isDiverging = history.some((h) => Math.abs(h.loss) > 1e6);

  // Build SVG path for the loss curve
  const curvePath = useMemo(() => {
    const wMin = -5, wMax = 7;
    const points: string[] = [];
    for (let px = 0; px <= 400; px++) {
      const w = wMin + (px / 400) * (wMax - wMin);
      let loss: number;
      if (funcChoice === "quadratic") {
        loss = (w - 3) ** 2 + 1;
      } else {
        loss = 0.1 * w ** 4 - 2 * w ** 2 + 0.5 * w + 8;
      }
      const x = (px / 400) * 400;
      const y = 200 - (loss / 30) * 200;
      points.push(`${x},${Math.max(0, Math.min(200, y))}`);
    }
    return `M${points.join(" L")}`;
  }, [funcChoice]);

  // Map weight to SVG coordinates
  const weightToSvg = (w: number) => {
    const wMin = -5, wMax = 7;
    const x = ((w - wMin) / (wMax - wMin)) * 400;
    let loss: number;
    if (funcChoice === "quadratic") {
      loss = (w - 3) ** 2 + 1;
    } else {
      loss = 0.1 * w ** 4 - 2 * w ** 2 + 0.5 * w + 8;
    }
    const y = 200 - (loss / 30) * 200;
    return { x: Math.max(0, Math.min(400, x)), y: Math.max(0, Math.min(200, y)) };
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Control Panel */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Controls
            </span>
            <button
              onClick={() => {
                setLearningRate(0.1);
                setIterations(15);
                setStartWeight(-2.5);
                setFuncChoice("quadratic");
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Reset defaults"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {/* Loss Function Select */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Loss Function
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFuncChoice("quadratic")}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold border transition-all ${
                    funcChoice === "quadratic"
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-secondary border-border text-muted-foreground"
                  }`}
                >
                  Convex (Quadratic)
                </button>
                <button
                  onClick={() => setFuncChoice("quartic")}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold border transition-all ${
                    funcChoice === "quartic"
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-secondary border-border text-muted-foreground"
                  }`}
                >
                  Non-Convex (Quartic)
                </button>
              </div>
            </div>

            {/* Learning Rate */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Learning Rate (α)</span>
                <span className="text-accent font-mono">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.9"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
              <p className="mt-1 text-[10px] text-muted-foreground">
                Controls step size along the negative gradient.
              </p>
            </div>

            {/* Iterations */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Steps</span>
                <span className="text-accent font-mono">{iterations}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </div>

            {/* Starting Weight */}
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Start (w₀)</span>
                <span className="text-accent font-mono">{startWeight}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="7"
                step="0.1"
                value={startWeight}
                onChange={(e) => setStartWeight(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">Formula: </span>
            <code className="bg-secondary px-1.5 py-0.5 rounded text-accent font-mono text-[10px]">
              w&#8345;&#8325;&#8321; = w&#8345; - α · ∇L(w&#8345;)
            </code>
          </p>
        </div>
      </div>

      {/* Visualization + Results */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Gradient Step Trajectory
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Final Loss:{" "}
              <span className={`font-bold font-mono ${isDiverging ? "text-rose-500" : "text-accent"}`}>
                {isDiverging ? "Diverged" : final.loss.toFixed(4)}
              </span>
              {" · "}Final w:{" "}
              <span className="font-bold font-mono text-accent">
                {final.w.toFixed(4)}
              </span>
            </p>
          </div>
          <Link
            href="/subjects/machine-learning/loss-function-and-gradient-descent"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
          >
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* SVG Visualization */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 50, 100, 150, 200].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
            ))}

            {/* Loss curve */}
            <path d={curvePath} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.4" />

            {/* Step markers */}
            {history.map((h, i) => {
              const pos = weightToSvg(h.w);
              const isLast = i === history.length - 1;
              return (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <line
                      x1={weightToSvg(history[i - 1].w).x}
                      y1={weightToSvg(history[i - 1].w).y}
                      x2={pos.x}
                      y2={pos.y}
                      stroke="var(--accent)"
                      strokeWidth="1"
                      opacity="0.6"
                      strokeDasharray="3,3"
                    />
                  )}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isLast ? 5 : 3}
                    fill={isLast ? "var(--accent)" : "var(--foreground)"}
                    opacity={isLast ? 1 : 0.5 + (i / history.length) * 0.5}
                  />
                </React.Fragment>
              );
            })}

            {/* Labels */}
            <text x="8" y="14" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">
              Loss
            </text>
            <text x="370" y="195" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">
              w →
            </text>
          </svg>
        </div>

        {/* Trajectory Table */}
        <div className="mt-4 max-h-64 overflow-y-auto rounded-2xl border border-border bg-secondary p-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-semibold">
                <th className="pb-2 pl-2">Step</th>
                <th className="pb-2">Weight</th>
                <th className="pb-2">Gradient</th>
                <th className="pb-2">Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {history.map((row) => (
                <tr key={row.step} className="hover:bg-background/50 font-mono text-[11px]">
                  <td className="py-2 pl-2 font-sans font-bold text-accent">#{row.step}</td>
                  <td className="py-2">{row.w.toFixed(4)}</td>
                  <td className="py-2">{row.grad.toFixed(4)}</td>
                  <td className="py-2 text-foreground font-bold">{row.loss.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
