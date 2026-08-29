"use client";

import React, { useState, useMemo } from "react";
import { Sliders, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Point {
  x: number;
  y: number;
}

const defaultPoints: Point[] = [
  { x: 1, y: 2.1 },
  { x: 2, y: 3.9 },
  { x: 3, y: 5.8 },
  { x: 4, y: 8.3 },
  { x: 5, y: 10.1 },
  { x: 6, y: 11.7 },
  { x: 7, y: 14.2 },
  { x: 8, y: 15.8 },
  { x: 9, y: 17.9 },
  { x: 10, y: 20.3 },
];

export function LinearRegressionExperiment() {
  const [slope, setSlope] = useState(2.0);
  const [intercept, setIntercept] = useState(0.0);
  const [points, setPoints] = useState<Point[]>(defaultPoints);

  const mse = useMemo(() => {
    const n = points.length;
    if (n === 0) return 0;
    return points.reduce((sum, p) => {
      const predicted = slope * p.x + intercept;
      return sum + (p.y - predicted) ** 2;
    }, 0) / n;
  }, [slope, intercept, points]);

  const mae = useMemo(() => {
    const n = points.length;
    if (n === 0) return 0;
    return points.reduce((sum, p) => {
      const predicted = slope * p.x + intercept;
      return sum + Math.abs(p.y - predicted);
    }, 0) / n;
  }, [slope, intercept, points]);

  // SVG coordinates
  const xMin = 0, xMax = 11, yMin = -2, yMax = 24;
  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * 400;
  const toSvgY = (y: number) => 220 - ((y - yMin) / (yMax - yMin)) * 220;

  const lineY1 = slope * xMin + intercept;
  const lineY2 = slope * xMax + intercept;

  const addRandomPoint = () => {
    const x = Math.round(Math.random() * 10 + 1);
    const y = Math.round((slope * x + intercept + (Math.random() - 0.5) * 4) * 10) / 10;
    setPoints((prev) => [...prev, { x, y: Math.max(-1, y) }]);
  };

  const removeLastPoint = () => {
    setPoints((prev) => prev.slice(0, -1));
  };

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
              onClick={() => {
                setSlope(2.0);
                setIntercept(0.0);
                setPoints(defaultPoints);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Slope (m)</span>
                <span className="text-accent font-mono">{slope.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="5"
                step="0.1"
                value={slope}
                onChange={(e) => setSlope(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span>Intercept (b)</span>
                <span className="text-accent font-mono">{intercept.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={intercept}
                onChange={(e) => setIntercept(parseFloat(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={addRandomPoint}
                className="flex-1 rounded-xl px-3 py-2 text-xs font-semibold border bg-secondary border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                + Add Point
              </button>
              <button
                onClick={removeLastPoint}
                className="flex-1 rounded-xl px-3 py-2 text-xs font-semibold border bg-secondary border-border text-muted-foreground hover:text-foreground transition-colors"
                disabled={points.length === 0}
              >
                − Remove
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">Equation: </span>
            <code className="bg-secondary px-1.5 py-0.5 rounded text-accent font-mono text-[10px]">
              ŷ = {slope.toFixed(2)}x + {intercept.toFixed(2)}
            </code>
          </p>
        </div>
      </div>

      {/* Visualization + Results */}
      <div className="paper-card p-6 lg:col-span-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Line Fit Visualization
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              MSE: <span className="font-bold font-mono text-accent">{mse.toFixed(4)}</span>
              {" · "}MAE: <span className="font-bold font-mono text-accent">{mae.toFixed(4)}</span>
              {" · "}{points.length} points
            </p>
          </div>
          <Link
            href="/subjects/machine-learning/simple-linear-regression"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
          >
            Learn More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* SVG */}
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 overflow-hidden">
          <svg viewBox="0 0 400 220" className="w-full h-auto">
            {/* Grid */}
            {[0, 50, 100, 150, 200].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--border)" strokeWidth="0.5" opacity="0.4" />
            ))}

            {/* Residual lines */}
            {points.map((p, i) => {
              const predicted = slope * p.x + intercept;
              const px = toSvgX(p.x);
              const pyData = toSvgY(p.y);
              const pyPred = toSvgY(predicted);
              return (
                <line
                  key={i}
                  x1={px} y1={pyData} x2={px} y2={pyPred}
                  stroke="var(--accent)" strokeWidth="1" opacity="0.25" strokeDasharray="2,2"
                />
              );
            })}

            {/* Regression line */}
            <line
              x1={toSvgX(xMin)} y1={toSvgY(lineY1)}
              x2={toSvgX(xMax)} y2={toSvgY(lineY2)}
              stroke="var(--accent)" strokeWidth="2" opacity="0.8"
            />

            {/* Data points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={toSvgX(p.x)} cy={toSvgY(p.y)}
                r="4" fill="var(--foreground)" opacity="0.7"
              />
            ))}

            <text x="8" y="14" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">y</text>
            <text x="370" y="215" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">x</text>
          </svg>
        </div>

        {/* Metrics */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="paper-inner p-4 rounded-2xl border border-border text-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">MSE</span>
            <div className="mt-1 text-2xl font-bold font-mono text-accent">{mse.toFixed(4)}</div>
          </div>
          <div className="paper-inner p-4 rounded-2xl border border-border text-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">MAE</span>
            <div className="mt-1 text-2xl font-bold font-mono text-accent">{mae.toFixed(4)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
