"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

type KernelName = "edge-h" | "edge-v" | "blur" | "sharpen" | "emboss" | "custom";

const kernels: Record<KernelName, number[]> = {
  "edge-h": [1, 0, -1, 1, 0, -1, 1, 0, -1],
  "edge-v": [1, 1, 1, 0, 0, 0, -1, -1, -1],
  "blur": [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
  sharpen: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  emboss: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
  custom: [0, 0, 0, 0, 1, 0, 0, 0, 0],
};

const kernelLabels: Record<KernelName, string> = {
  "edge-h": "Horizontal Edge",
  "edge-v": "Vertical Edge",
  blur: "Gaussian Blur",
  sharpen: "Sharpen",
  emboss: "Emboss",
  custom: "Identity",
};

// Generate a synthetic image grid
function generateImage(size: number): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < size; y++) {
    const row: number[] = [];
    for (let x = 0; x < size; x++) {
      // Create a pattern with shapes
      const cx = x / size, cy = y / size;
      let v = 0.3;
      // Circle
      if (Math.hypot(cx - 0.5, cy - 0.5) < 0.25) v += 0.5;
      // Rectangle
      if (cx > 0.1 && cx < 0.35 && cy > 0.6 && cy < 0.9) v += 0.3;
      // Diagonal line
      if (Math.abs(cx + cy - 1.2) < 0.04) v += 0.4;
      // Add some noise
      v += (Math.sin(x * 7.3 + y * 11.1) * 0.5 + 0.5) * 0.1;
      row.push(Math.max(0, Math.min(1, v)));
    }
    grid.push(row);
  }
  return grid;
}

function convolve(image: number[][], kernel: number[]): number[][] {
  const size = image.length;
  const kSize = 3;
  const out: number[][] = [];
  for (let y = 0; y < size; y++) {
    const row: number[] = [];
    for (let x = 0; x < size; x++) {
      let sum = 0;
      for (let ky = 0; ky < kSize; ky++) {
        for (let kx = 0; kx < kSize; kx++) {
          const iy = Math.min(size - 1, Math.max(0, y + ky - 1));
          const ix = Math.min(size - 1, Math.max(0, x + kx - 1));
          sum += image[iy][ix] * kernel[ky * kSize + kx];
        }
      }
      row.push(sum);
    }
    out.push(row);
  }
  return out;
}

export function ConvolutionalFilterExperiment() {
  const [kernelName, setKernelName] = useState<KernelName>("edge-h");
  const [customValues, setCustomValues] = useState<number[]>([0, 0, 0, 0, 1, 0, 0, 0, 0]);

  const gridSize = 24;
  const image = useMemo(() => generateImage(gridSize), []);

  const activeKernel = kernelName === "custom" ? customValues : kernels[kernelName];

  const output = useMemo(() => convolve(image, activeKernel), [image, activeKernel]);

  // Normalize output for display
  const minVal = Math.min(...output.flat());
  const maxVal = Math.max(...output.flat());
  const range = maxVal - minVal || 1;

  const toGray = (v: number) => Math.round(((v - minVal) / range) * 255);

  const updateCustom = (idx: number, val: number) => {
    const newVals = [...customValues];
    newVals[idx] = val;
    setCustomValues(newVals);
  };

  const cellSize = Math.floor(360 / gridSize);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="paper-card p-6 lg:col-span-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Sliders className="h-4 w-4" /> Filter Controls
            </span>
            <button onClick={() => { setKernelName("edge-h"); setCustomValues([0, 0, 0, 0, 1, 0, 0, 0, 0]); }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Preset Filters</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(kernels) as KernelName[]).map((k) => (
                  <button key={k} onClick={() => setKernelName(k)}
                    className={`rounded-xl px-3 py-2 text-[11px] font-semibold border transition-all ${
                      kernelName === k
                        ? "bg-accent/10 border-accent text-accent"
                        : "bg-secondary border-border text-muted-foreground"
                    }`}>
                    {kernelLabels[k]}
                  </button>
                ))}
              </div>
            </div>

            {/* Kernel display */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">Kernel Matrix</label>
              <div className="grid grid-cols-3 gap-1 max-w-[180px]">
                {activeKernel.map((v, i) => (
                  <div key={i} className="text-center">
                    {kernelName === "custom" ? (
                      <input type="number" step="0.5" value={v}
                        onChange={(e) => updateCustom(i, parseFloat(e.target.value) || 0)}
                        className="w-full rounded-md border border-border bg-secondary px-1 py-1 text-[10px] font-mono text-center text-foreground focus:border-accent/50 focus:outline-none" />
                    ) : (
                      <div className="rounded-md border border-border bg-secondary px-1 py-1 text-[10px] font-mono text-center text-muted-foreground">
                        {typeof v === "number" ? (Math.abs(v) < 1 && v !== 0 ? v.toFixed(2) : v) : v}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">How it works: </span>
            A 3×3 kernel slides across the image, computing a weighted sum at each position.
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Convolution Output</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {kernelLabels[kernelName]} · {gridSize}×{gridSize} image
            </p>
          </div>
          <Link href="/research/papers/deep-residual-learning-for-image-recognition"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 text-center">Input</p>
            <div className="rounded-2xl border border-border bg-secondary p-3 overflow-hidden flex justify-center">
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`, gap: "1px" }}>
                {image.flat().map((v, i) => (
                  <div key={i} style={{
                    width: cellSize, height: cellSize,
                    backgroundColor: `rgb(${Math.round(v * 255)}, ${Math.round(v * 255)}, ${Math.round(v * 255)})`,
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 text-center">Output</p>
            <div className="rounded-2xl border border-border bg-secondary p-3 overflow-hidden flex justify-center">
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`, gap: "1px" }}>
                {output.flat().map((v, i) => {
                  const g = toGray(v);
                  return (
                    <div key={i} style={{
                      width: cellSize, height: cellSize,
                      backgroundColor: `rgb(${g}, ${g}, ${g})`,
                    }} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
