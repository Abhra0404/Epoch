"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

type Activation = "relu" | "sigmoid" | "tanh";

export function NeuralNetworkExperiment() {
  const [hiddenLayers, setHiddenLayers] = useState(2);
  const [hiddenUnits, setHiddenUnits] = useState(4);
  const [activation, setActivation] = useState<Activation>("relu");
  const [learningRate, setLearningRate] = useState(0.05);

  // Simulate training loss curve based on parameters
  const trainingCurve = useMemo(() => {
    const baseLoss = 2.5;
    const activationPenalty = activation === "sigmoid" ? 0.3 : activation === "tanh" ? 0.1 : 0;
    const depthBonus = hiddenLayers * 0.15;
    const widthBonus = hiddenUnits * 0.05;
    const lrFactor = Math.min(learningRate * 2, 1);

    const points: { epoch: number; loss: number }[] = [];
    for (let i = 0; i <= 50; i++) {
      const progress = i / 50;
      const finalLoss = baseLoss * Math.exp(-(depthBonus + widthBonus + lrFactor - activationPenalty) * 2);
      const loss = finalLoss + (baseLoss - finalLoss) * Math.exp(-progress * (3 + lrFactor * 4));
      points.push({ epoch: i, loss: Math.max(0.01, loss) });
    }
    return points;
  }, [hiddenLayers, hiddenUnits, activation, learningRate]);

  // Decision boundary approximation
  const boundaryComplexity = useMemo(() => {
    return Math.min(10, hiddenLayers * hiddenUnits * (activation === "relu" ? 1.2 : 0.8));
  }, [hiddenLayers, hiddenUnits, activation]);

  const toSvgX = (epoch: number) => (epoch / 50) * 400;
  const toSvgY = (loss: number) => 180 - (loss / 3) * 180;

  const curvePath = useMemo(() => {
    return trainingCurve.map((p, i) => {
      const x = toSvgX(p.epoch);
      const y = toSvgY(p.loss);
      return `${i === 0 ? "M" : "L"}${x},${Math.max(0, Math.min(180, y))}`;
    }).join(" ");
  }, [trainingCurve]);

  const finalLoss = trainingCurve[trainingCurve.length - 1].loss;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Controls
            </span>
            <button
              onClick={() => { setHiddenLayers(2); setHiddenUnits(4); setActivation("relu"); setLearningRate(0.05); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Hidden Layers</span>
                <span className="text-accent font-mono">{hiddenLayers}</span>
              </div>
              <input type="range" min="1" max="5" step="1" value={hiddenLayers}
                onChange={(e) => setHiddenLayers(parseInt(e.target.value))} className="mt-2 w-full accent-accent" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Units per Layer</span>
                <span className="text-accent font-mono">{hiddenUnits}</span>
              </div>
              <input type="range" min="1" max="16" step="1" value={hiddenUnits}
                onChange={(e) => setHiddenUnits(parseInt(e.target.value))} className="mt-2 w-full accent-accent" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Learning Rate</span>
                <span className="text-accent font-mono">{learningRate}</span>
              </div>
              <input type="range" min="0.001" max="0.5" step="0.001" value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))} className="mt-2 w-full accent-accent" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Activation</label>
              <div className="grid grid-cols-3 gap-2">
                {(["relu", "sigmoid", "tanh"] as Activation[]).map((a) => (
                  <button key={a} onClick={() => setActivation(a)}
                    className={`rounded-xl px-2 py-2 text-[11px] font-semibold border transition-all ${
                      activation === a
                        ? "bg-accent/10 border-accent text-accent"
                        : "bg-secondary border-border text-muted-foreground"
                    }`}>
                    {a.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Network architecture display */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">Architecture: </span>
            <code className="bg-secondary px-1.5 py-0.5 rounded text-accent font-mono text-[10px]">
              2 → {Array(hiddenLayers).fill(hiddenUnits).join(" → ")} → 1
            </code>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Total params: <span className="font-bold font-mono text-foreground">
              {2 * hiddenUnits + hiddenLayers * hiddenUnits * hiddenUnits + (hiddenLayers > 0 ? hiddenUnits : 0) + 1}
            </span>
          </p>
        </div>
      </div>

      {/* Visualization + Results */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Training Loss Curve</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Final Loss: <span className="font-bold font-mono text-accent">{finalLoss.toFixed(4)}</span>
              {" · "}Boundary Complexity: <span className="font-bold font-mono text-accent">{boundaryComplexity.toFixed(1)}</span>
            </p>
          </div>
          <Link href="/subjects/deep-learning"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 400 180" className="w-full h-auto">
            {[0, 45, 90, 135, 180].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--border)" strokeWidth="0.5" opacity="0.4" />
            ))}
            <path d={curvePath} fill="none" stroke="var(--accent)" strokeWidth="2" />
            <text x="8" y="14" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">Loss</text>
            <text x="365" y="175" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">Epoch →</text>
          </svg>
        </div>

        {/* Architecture diagram */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Network Architecture</p>
          <svg viewBox="0 0 400 120" className="w-full h-auto">
            {/* Input layer */}
            {[30, 60, 90].map((y) => (
              <React.Fragment key={`in-${y}`}>
                <circle cx="40" cy={y} r="6" fill="var(--foreground)" opacity="0.6" />
                <text x="40" y={y + 3} textAnchor="middle" fontSize="7" fill="var(--background)" fontWeight="bold">x</text>
              </React.Fragment>
            ))}

            {/* Hidden layers */}
            {Array.from({ length: hiddenLayers }).map((_, layerIdx) => {
              const x = 40 + ((layerIdx + 1) / (hiddenLayers + 1)) * 320;
              const displayUnits = Math.min(hiddenUnits, 6);
              const spacing = 100 / (displayUnits + 1);
              return Array.from({ length: displayUnits }).map((_, unitIdx) => {
                const y = 10 + spacing * (unitIdx + 1);
                return (
                  <circle key={`h-${layerIdx}-${unitIdx}`} cx={x} cy={y} r="5"
                    fill="var(--accent)" opacity="0.5" />
                );
              });
            })}

            {/* Output layer */}
            <circle cx="360" cy="60" r="6" fill="var(--foreground)" opacity="0.6" />
            <text x="360" y="63" textAnchor="middle" fontSize="7" fill="var(--background)" fontWeight="bold">y</text>

            {/* Labels */}
            <text x="40" y="115" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)">Input</text>
            <text x="200" y="115" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)">Hidden</text>
            <text x="360" y="115" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)">Output</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
