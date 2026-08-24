"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

// ─── Network layout ──────────────────────────────────────────────────
const LAYERS = [
  { n: 3, labels: ["x₁", "x₂", "x₃"], title: "Input" },
  { n: 5, labels: [] as string[], title: "Hidden" },
  { n: 4, labels: [] as string[], title: "Hidden" },
  { n: 2, labels: ["ŷ₁", "ŷ₂"], title: "Output" },
];

const W = 360;
const H = 290;
const R = 11; // node radius

interface NodeData {
  id: string;
  x: number;
  y: number;
  label: string;
  li: number;
  ni: number;
}
interface EdgeData {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

function buildGraph(): { nodes: NodeData[]; edges: EdgeData[]; xs: number[] } {
  const xs = LAYERS.map((_, i) => 52 + (i * (W - 88)) / (LAYERS.length - 1));

  const nodes: NodeData[] = LAYERS.flatMap((layer, li) => {
    const vGap = Math.min(54, (H - 70) / Math.max(layer.n - 1, 1));
    const totalH = (layer.n - 1) * vGap;
    const startY = (H - totalH) / 2;
    return Array.from({ length: layer.n }, (_, ni) => ({
      id: `${li}-${ni}`,
      x: xs[li],
      y: layer.n === 1 ? H / 2 : startY + ni * vGap,
      label: layer.labels[ni] ?? "",
      li,
      ni,
    }));
  });

  let idx = 0;
  const edges: EdgeData[] = [];
  for (let li = 0; li < LAYERS.length - 1; li++) {
    const fromLayer = nodes.filter((n) => n.li === li);
    const toLayer = nodes.filter((n) => n.li === li + 1);
    for (const f of fromLayer) {
      for (const t of toLayer) {
        edges.push({
          key: `${f.id}-${t.id}`,
          x1: f.x,
          y1: f.y,
          x2: t.x,
          y2: t.y,
          delay: (idx++ * 0.13) % 3.5,
        });
      }
    }
  }

  return { nodes, edges, xs };
}

// ─── Signal pulse dot traveling along an edge ────────────────────────
function Pulse({ x1, y1, x2, y2, delay }: Omit<EdgeData, "key">) {
  return (
    <motion.circle
      r={2.4}
      style={{ fill: "var(--foreground)" }}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 0.85,
        delay,
        repeat: Infinity,
        repeatDelay: 3.2,
        ease: "easeInOut",
        times: [0, 0.12, 0.88, 1],
      }}
    />
  );
}

// ─── Floating math formula chips ────────────────────────────────────
const CHIPS: Array<{
  text: string;
  style: React.CSSProperties;
  delay: number;
}> = [
  { text: "∇L(θ)", style: { top: "11%", left: "5%" }, delay: 0 },
  { text: "σ(z)", style: { top: "9%", right: "5%" }, delay: 0.6 },
  { text: "W·x + b", style: { bottom: "13%", left: "22%" }, delay: 1.1 },
  { text: "ReLU", style: { bottom: "11%", right: "7%" }, delay: 1.7 },
];

// ─── Main component ──────────────────────────────────────────────────
export function HeroVisual() {
  const { nodes, edges, xs } = useMemo(buildGraph, []);

  // Animate every 3rd edge to keep visual clean
  const pulseEdges = useMemo(
    () => edges.filter((_, i) => i % 3 === 0),
    [edges]
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        height: 340,
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(120,113,108,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating math chips */}
      {CHIPS.map((chip) => (
        <motion.span
          key={chip.text}
          className="absolute z-20 rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold backdrop-blur-sm"
          style={{
            ...chip.style,
            borderColor: "var(--border)",
            background: "var(--background)",
            color: "var(--muted-foreground)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay: chip.delay, duration: 0.5 },
            y: {
              delay: chip.delay,
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {chip.text}
        </motion.span>
      ))}

      {/* Neural Network SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ padding: "24px" }}
      >
        {/* Static edges */}
        {edges.map((e) => (
          <line
            key={e.key}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="var(--border)"
            strokeWidth={0.9}
          />
        ))}

        {/* Animated signal pulses */}
        {pulseEdges.map(({ key, ...e }) => (
          <Pulse key={`pulse-${key}`} {...e} />
        ))}

        {/* Nodes */}
        {nodes.map((node) => {
          const isIO = node.li === 0 || node.li === LAYERS.length - 1;
          return (
            <g key={node.id}>
              {/* Pulsing ring on input & output nodes */}
              {isIO && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={R}
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeWidth={0.8}
                  animate={{ r: [R, R + 8], opacity: [0.45, 0] }}
                  transition={{
                    duration: 2.4,
                    delay: node.ni * 0.38,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={R}
                style={{
                  fill: "var(--background)",
                  stroke: "var(--border)",
                }}
                strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                  delay: node.li * 0.1 + node.ni * 0.055,
                }}
              />

              {/* Inner activation dot (hidden nodes only) */}
              {!isIO && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={3.2}
                  style={{ fill: "var(--muted-foreground)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: node.li * 0.1 + node.ni * 0.055 + 0.18,
                  }}
                />
              )}

              {/* Node label (input + output only) */}
              {node.label && (
                <motion.text
                  x={node.li === 0 ? node.x - R - 5 : node.x + R + 5}
                  y={node.y + 4}
                  textAnchor={node.li === 0 ? "end" : "start"}
                  fontSize={9}
                  fontFamily="ui-monospace,SFMono-Regular,monospace"
                  style={{ fill: "var(--muted-foreground)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: node.li * 0.1 + 0.35 }}
                >
                  {node.label}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Layer title labels */}
        {LAYERS.map((layer, li) => (
          <motion.text
            key={`title-${li}`}
            x={xs[li]}
            y={H - 8}
            textAnchor="middle"
            fontSize={7.5}
            letterSpacing={1}
            fontFamily="system-ui,sans-serif"
            fontWeight={600}
            style={{ fill: "var(--muted-foreground)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 + li * 0.1 }}
          >
            {layer.title.toUpperCase()}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}
