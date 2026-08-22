"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Code2, 
  TrendingDown, 
  Sigma, 
  Scale, 
  BarChart3,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<"gd" | "reg" | "gini">("gd");

  // -------------------------------------------------------------
  // Simulator 1: Gradient Descent State
  // -------------------------------------------------------------
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [iterations, setIterations] = useState<number>(10);
  const [startWeight, setStartWeight] = useState<number>(-2.5);
  const [funcChoice, setFuncChoice] = useState<"quadratic" | "quartic">("quadratic");

  // Gradient Descent Calculation
  const gdHistory = useMemo(() => {
    const history: { step: number; w: number; loss: number; grad: number }[] = [];
    let w = startWeight;

    for (let i = 0; i <= iterations; i++) {
      let loss = 0;
      let grad = 0;

      if (funcChoice === "quadratic") {
        // f(w) = (w - 3)^2 + 1
        loss = Math.pow(w - 3, 2) + 1;
        grad = 2 * (w - 3);
      } else {
        // f(w) = 0.1 * w^4 - 2 * w^2 + 0.5 * w + 8
        loss = 0.1 * Math.pow(w, 4) - 2 * Math.pow(w, 2) + 0.5 * w + 8;
        grad = 0.4 * Math.pow(w, 3) - 4 * w + 0.5;
      }

      history.push({ step: i, w, loss, grad });
      w = w - learningRate * grad;
    }

    return history;
  }, [learningRate, iterations, startWeight, funcChoice]);

  // -------------------------------------------------------------
  // Simulator 2: Regularization State (L1 vs L2)
  // -------------------------------------------------------------
  const [lambdaVal, setLambdaVal] = useState<number>(2.0);
  const [regType, setRegType] = useState<"l1" | "l2">("l2");
  const rawWeights = [4.5, -3.2, 0.8, -0.4, 2.1];

  const regWeights = useMemo(() => {
    return rawWeights.map((w) => {
      if (regType === "l1") {
        // Soft thresholding: sign(w) * max(0, |w| - lambda)
        const absW = Math.abs(w);
        const shrink = Math.max(0, absW - lambdaVal * 0.5);
        return Math.sign(w) * shrink;
      } else {
        // Ridge shrinkage: w / (1 + lambda)
        return w / (1 + lambdaVal * 0.5);
      }
    });
  }, [lambdaVal, regType]);

  // -------------------------------------------------------------
  // Simulator 3: Gini & Entropy Calculator State
  // -------------------------------------------------------------
  const [class1Count, setClass1Count] = useState<number>(15);
  const [class2Count, setClass2Count] = useState<number>(5);

  const totalSamples = class1Count + class2Count;
  const p1 = totalSamples > 0 ? class1Count / totalSamples : 0;
  const p2 = totalSamples > 0 ? class2Count / totalSamples : 0;

  const giniImpurity = 1 - (p1 * p1 + p2 * p2);
  const entropy =
    totalSamples > 0 && p1 > 0 && p2 > 0
      ? -(p1 * (Math.log2(p1))) - (p2 * (Math.log2(p2)))
      : 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-accent shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive Concept Simulators
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            ML Hyperparameter & Math Playground
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Manipulate parameters in real-time to observe loss optimization, weight shrinkage, and classification split dynamics.
          </p>
        </section>

        {/* Tab Selectors */}
        <section className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab("gd")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all border ${
              activeTab === "gd"
                ? "bg-accent/15 text-accent border-accent/40 shadow-xs"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            }`}
          >
            <TrendingDown className="h-4 w-4" />
            1. Gradient Descent Visualizer
          </button>

          <button
            onClick={() => setActiveTab("reg")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all border ${
              activeTab === "reg"
                ? "bg-accent/15 text-accent border-accent/40 shadow-xs"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Scale className="h-4 w-4" />
            2. Regularization (L1 vs L2)
          </button>

          <button
            onClick={() => setActiveTab("gini")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all border ${
              activeTab === "gini"
                ? "bg-accent/15 text-accent border-accent/40 shadow-xs"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            3. Gini & Entropy Split
          </button>
        </section>

        {/* Tab 1: Gradient Descent Visualizer */}
        {activeTab === "gd" && (
          <section className="mt-8 grid gap-8 lg:grid-cols-12">
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
                      setIterations(10);
                      setStartWeight(-2.5);
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
                        className={`rounded-xl px-3 py-2 text-xs font-semibold border ${
                          funcChoice === "quadratic"
                            ? "bg-accent/10 border-accent text-accent"
                            : "bg-secondary border-border text-muted-foreground"
                        }`}
                      >
                        Convex (Quadratic)
                      </button>
                      <button
                        onClick={() => setFuncChoice("quartic")}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold border ${
                          funcChoice === "quartic"
                            ? "bg-accent/10 border-accent text-accent"
                            : "bg-secondary border-border text-muted-foreground"
                        }`}
                      >
                        Non-Convex (Quartic)
                      </button>
                    </div>
                  </div>

                  {/* Learning Rate Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Learning Rate (α)</span>
                      <span className="text-accent">{learningRate}</span>
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
                      Controls step size along negative gradient vector.
                    </p>
                  </div>

                  {/* Iterations Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Steps / Iterations</span>
                      <span className="text-accent">{iterations}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="1"
                      value={iterations}
                      onChange={(e) => setIterations(parseInt(e.target.value))}
                      className="mt-2 w-full accent-accent"
                    />
                  </div>

                  {/* Starting Weight Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Starting Weight (w₀)</span>
                      <span className="text-accent">{startWeight}</span>
                    </div>
                    <input
                      type="range"
                      min="-4.0"
                      max="6.0"
                      step="0.1"
                      value={startWeight}
                      onChange={(e) => setStartWeight(parseFloat(e.target.value))}
                      className="mt-2 w-full accent-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Formula:</span>{" "}
                  <code className="bg-secondary px-1.5 py-0.5 rounded text-accent font-mono">
                    w_{"{t+1}"} = w_t - α · ∇L(w_t)
                  </code>
                </p>
              </div>
            </div>

            {/* Visual Loss Graph & Trajectory */}
            <div className="paper-card p-6 lg:col-span-8">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Gradient Step Trajectory
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Final Weight: <span className="font-bold text-accent">{gdHistory[gdHistory.length - 1].w.toFixed(4)}</span> | 
                    Final Loss: <span className="font-bold text-accent">{gdHistory[gdHistory.length - 1].loss.toFixed(4)}</span>
                  </p>
                </div>
                <Link
                  href="/subjects/machine-learning/loss-function-and-gradient-descent"
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  Gradient Notes <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Trajectory Table & Metrics */}
              <div className="mt-4 max-h-80 overflow-y-auto rounded-[1.5rem] border border-border bg-secondary p-3">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-semibold">
                      <th className="pb-2 pl-2">Step</th>
                      <th className="pb-2">Weight (w)</th>
                      <th className="pb-2">Gradient (∇L)</th>
                      <th className="pb-2">Loss L(w)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {gdHistory.map((row) => (
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
          </section>
        )}

        {/* Tab 2: Regularization Simulator */}
        {activeTab === "reg" && (
          <section className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="paper-card p-6 lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Scale className="h-4 w-4" /> Penalty Controls
              </span>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">
                    Penalty Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRegType("l1")}
                      className={`rounded-2xl p-4 text-left border transition-all ${
                        regType === "l1"
                          ? "bg-accent/10 border-accent text-accent"
                          : "bg-secondary border-border text-muted-foreground"
                      }`}
                    >
                      <div className="font-bold text-sm">L1 (Lasso)</div>
                      <div className="text-[10px] mt-1 opacity-80">Sets features to exact zero (Sparse).</div>
                    </button>

                    <button
                      onClick={() => setRegType("l2")}
                      className={`rounded-2xl p-4 text-left border transition-all ${
                        regType === "l2"
                          ? "bg-accent/10 border-accent text-accent"
                          : "bg-secondary border-border text-muted-foreground"
                      }`}
                    >
                      <div className="font-bold text-sm">L2 (Ridge)</div>
                      <div className="text-[10px] mt-1 opacity-80">Shrinks weights smoothly toward zero.</div>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Regularization Strength (λ)</span>
                    <span className="text-accent">{lambdaVal}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.2"
                    value={lambdaVal}
                    onChange={(e) => setLambdaVal(parseFloat(e.target.value))}
                    className="mt-2 w-full accent-accent"
                  />
                </div>
              </div>
            </div>

            {/* Weight Bar Chart Comparison */}
            <div className="paper-card p-6 lg:col-span-7">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Coefficient Shrinkage Effect
                </h3>
                <Link
                  href="/subjects/machine-learning/ridge-and-lasso-regularization"
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  Regularization Notes <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {rawWeights.map((origW, idx) => {
                  const regW = regWeights[idx];
                  const origWidth = Math.min(100, Math.abs(origW) * 20);
                  const regWidth = Math.min(100, Math.abs(regW) * 20);

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-sans font-semibold text-muted-foreground">Feature w_{idx + 1}</span>
                        <span>
                          <span className="text-muted-foreground">Original: {origW}</span> →{" "}
                          <span className={`font-bold ${Math.abs(regW) === 0 ? "text-rose-500" : "text-accent"}`}>
                            Regularized: {regW.toFixed(2)}
                          </span>
                        </span>
                      </div>

                      <div className="h-3 w-full bg-secondary rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-accent transition-all duration-300 rounded-full"
                          style={{ width: `${regWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Gini & Entropy Split */}
        {activeTab === "gini" && (
          <section className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="paper-card p-6 lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4" /> Node Sample Counts
              </span>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Class 1 Samples (n₁)</span>
                    <span className="text-accent">{class1Count}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={class1Count}
                    onChange={(e) => setClass1Count(parseInt(e.target.value))}
                    className="mt-2 w-full accent-accent"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Class 2 Samples (n₂)</span>
                    <span className="text-accent">{class2Count}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={class2Count}
                    onChange={(e) => setClass2Count(parseInt(e.target.value))}
                    className="mt-2 w-full accent-accent"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="paper-card p-6 lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground pb-4 border-b border-border">
                  Node Impurity Metrics
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Gini Impurity
                    </span>
                    <div className="mt-2 text-3xl font-bold font-mono text-accent">
                      {giniImpurity.toFixed(4)}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      0 = Pure node, 0.5 = Equal split
                    </p>
                  </div>

                  <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Entropy (Bits)
                    </span>
                    <div className="mt-2 text-3xl font-bold font-mono text-accent">
                      {entropy.toFixed(4)}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      0 = Zero uncertainty, 1.0 = Max entropy
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Class Probabilities: p₁ = {p1.toFixed(2)}, p₂ = {p2.toFixed(2)}</span>
                <Link
                  href="/subjects/machine-learning/decision-tree-fundamentals"
                  className="inline-flex items-center gap-1 font-bold text-accent hover:underline"
                >
                  Decision Tree Notes <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
