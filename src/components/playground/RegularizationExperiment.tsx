"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

type RegType = "l1" | "l2";

const rawWeights = [4.5, -3.2, 0.8, -0.4, 2.1, -1.7, 0.3, -2.9];

export function RegularizationExperiment() {
  const [lambdaVal, setLambdaVal] = useState(2.0);
  const [regType, setRegType] = useState<RegType>("l2");

  const regWeights = useMemo(() => {
    return rawWeights.map((w) => {
      if (regType === "l1") {
        const shrink = Math.max(0, Math.abs(w) - lambdaVal * 0.5);
        return Math.sign(w) * shrink;
      } else {
        return w / (1 + lambdaVal * 0.5);
      }
    });
  }, [lambdaVal, regType]);

  const l1Count = regWeights.filter((w) => Math.abs(w) < 0.001).length;
  const maxWeight = Math.max(...rawWeights.map(Math.abs));
  const toBarWidth = (w: number) => Math.min(100, (Math.abs(w) / maxWeight) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Penalty Controls
            </span>
            <button
              onClick={() => { setLambdaVal(2.0); setRegType("l2"); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Penalty Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setRegType("l1")}
                  className={`rounded-xl p-3 text-left border transition-all ${
                    regType === "l1" ? "bg-accent/10 border-accent text-accent" : "bg-secondary border-border text-muted-foreground"
                  }`}>
                  <div className="font-bold text-sm">L1 (Lasso)</div>
                  <div className="text-[10px] mt-1 opacity-80">Sparse — sets weights to zero.</div>
                </button>
                <button onClick={() => setRegType("l2")}
                  className={`rounded-xl p-3 text-left border transition-all ${
                    regType === "l2" ? "bg-accent/10 border-accent text-accent" : "bg-secondary border-border text-muted-foreground"
                  }`}>
                  <div className="font-bold text-sm">L2 (Ridge)</div>
                  <div className="text-[10px] mt-1 opacity-80">Shrinks weights smoothly.</div>
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>λ (Strength)</span>
                <span className="text-accent font-mono">{lambdaVal.toFixed(1)}</span>
              </div>
              <input type="range" min="0" max="8" step="0.1" value={lambdaVal}
                onChange={(e) => setLambdaVal(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent" />
              <p className="mt-1 text-[10px] text-muted-foreground">
                Higher λ = stronger regularization penalty.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            {regType === "l1" ? (
              <>Zeroed weights: <span className="font-bold text-accent font-mono">{l1Count}</span> / {rawWeights.length}</>
            ) : (
              <>All weights shrunk by factor <span className="font-bold text-accent font-mono">(1 + {lambdaVal.toFixed(1)} × 0.5)⁻¹</span></>
            )}
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Coefficient Shrinkage
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {regType === "l1" ? "Lasso" : "Ridge"} · λ = {lambdaVal.toFixed(1)}
            </p>
          </div>
          <Link
            href="/subjects/machine-learning/ridge-and-lasso-regularization"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
          >
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {rawWeights.map((origW, idx) => {
            const regW = regWeights[idx];
            const isZero = Math.abs(regW) < 0.001;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="font-sans font-semibold text-muted-foreground">w&#8321;&#8315;&#772;{idx + 1}</span>
                  <span>
                    <span className="text-muted-foreground">{origW}</span>
                    {" → "}
                    <span className={`font-bold ${isZero ? "text-rose-500" : "text-accent"}`}>
                      {regW.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="h-3 w-full bg-background rounded-full overflow-hidden relative">
                  {/* Original weight (faded) */}
                  <div className="absolute inset-y-0 left-0 bg-foreground/10 rounded-full transition-all"
                    style={{ width: `${toBarWidth(origW)}%` }} />
                  {/* Regularized weight */}
                  <div className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${
                    isZero ? "bg-rose-500/60" : "bg-accent"
                  }`} style={{ width: `${toBarWidth(regW)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
