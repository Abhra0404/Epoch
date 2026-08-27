"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  type NodeMouseHandler,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getRoadmapBySlug, type RoadmapNode as RMN, type Difficulty } from "@/lib/roadmaps/data";
import { RoadmapNodeComponent } from "@/components/roadmap/RoadmapNode";
import { TopicCard } from "@/components/roadmap/TopicCard";

// Layout constants
const NODE_WIDTH = 200;
const VERTICAL_GAP = 80;
const HORIZONTAL_GAP = 260;

function computeLayout(nodes: RMN[], edges: { source: string; target: string }[]): { x: number; y: number }[] {
  // Simple layered layout: assign layers by longest path from root
  const adjacency: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};

  nodes.forEach((n) => {
    adjacency[n.id] = [];
    inDegree[n.id] = 0;
  });

  edges.forEach((e) => {
    adjacency[e.source]?.push(e.target);
    inDegree[e.target] = (inDegree[e.target] || 0) + 1;
  });

  // Topological sort with layering
  const layers: Record<string, number> = {};
  const queue: string[] = [];

  nodes.forEach((n) => {
    if (inDegree[n.id] === 0) {
      queue.push(n.id);
      layers[n.id] = 0;
    }
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentLayer = layers[current];

    for (const neighbor of adjacency[current] || []) {
      layers[neighbor] = Math.max(layers[neighbor] || 0, currentLayer + 1);
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Handle any unvisited nodes
  nodes.forEach((n) => {
    if (layers[n.id] === undefined) {
      layers[n.id] = 0;
    }
  });

  // Group by layer
  const layerGroups: Record<number, string[]> = {};
  Object.entries(layers).forEach(([id, layer]) => {
    if (!layerGroups[layer]) layerGroups[layer] = [];
    layerGroups[layer].push(id);
  });

  // Assign positions
  const positions: Record<string, { x: number; y: number }> = {};
  const maxLayer = Math.max(...Object.keys(layerGroups).map(Number));

  for (let layer = 0; layer <= maxLayer; layer++) {
    const group = layerGroups[layer] || [];
    const y = layer * (120 + VERTICAL_GAP);
    const totalWidth = group.length * NODE_WIDTH + (group.length - 1) * (HORIZONTAL_GAP - NODE_WIDTH);
    const startX = -totalWidth / 2;

    group.forEach((id, i) => {
      positions[id] = {
        x: startX + i * HORIZONTAL_GAP,
        y,
      };
    });
  }

  return nodes.map((n) => positions[n.id] || { x: 0, y: 0 });
}

function RoadmapCanvas({ slug }: { slug: string }) {
  const roadmap = getRoadmapBySlug(slug);
  const [selectedNode, setSelectedNode] = useState<RMN | null>(null);

  const positions = useMemo(
    () => (roadmap ? computeLayout(roadmap.nodes, roadmap.edges) : []),
    [roadmap]
  );

  const initialNodes: Node[] = useMemo(
    () =>
      roadmap
        ? roadmap.nodes.map((n, i) => ({
            id: n.id,
            type: "roadmapNode" as const,
            position: positions[i] || { x: 0, y: 0 },
            zIndex: 1,
            data: { ...n },
          }))
        : [],
    [roadmap, positions]
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      roadmap
        ? roadmap.edges.map((e) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            type: "smoothstep",
            animated: e.type === "recommended",
            style: {
              stroke: e.type === "recommended" ? "#a3a3a3" : "#000",
              strokeWidth: e.type === "recommended" ? 1.5 : 2,
              strokeDasharray: e.type === "recommended" ? "5 5" : undefined,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: e.type === "recommended" ? "#a3a3a3" : "#000",
              width: 16,
              height: 16,
            },
          }))
        : [],
    [roadmap]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes: NodeTypes = useMemo(() => ({ roadmapNode: RoadmapNodeComponent }), []);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const rmn = roadmap?.nodes.find((n) => n.id === node.id);
      if (rmn) setSelectedNode(rmn);
    },
    [roadmap]
  );

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl font-bold">Roadmap not found</h1>
            <Link href="/roadmaps" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" /> All Roadmaps
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />

      {/* Toolbar */}
      <div className="sticky top-16 z-40 mx-auto max-w-7xl w-full px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card/90 backdrop-blur-md px-4 py-2.5 mt-4">
          <nav className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Link href="/roadmaps" className="hover:text-foreground transition-colors">
              All Roadmaps
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">{roadmap.title}</span>
          </nav>
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <span>{roadmap.nodes.length} topics</span>
            <span>·</span>
            <span>{roadmap.duration}</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative h-[calc(100vh-140px)] flex-none">
        <ReactFlow
          className="roadmap-flow"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={2}
          defaultEdgeOptions={{
            type: "smoothstep",
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="#d6d6d6" />
          <Controls
            position="bottom-right"
            className="!rounded-xl !border-border !bg-card !shadow-sm"
          />
          <MiniMap
            position="bottom-left"
            className="!rounded-xl !border-border !bg-card"
            nodeColor={(node) => {
              const status = node.data?.status;
              if (status === "start") return "#22c55e";
              if (status === "milestone") return "#a855f7";
              if (status === "recommended") return "#3b82f6";
              return "#000";
            }}
            maskColor="rgba(247, 247, 244, 0.7)"
          />
        </ReactFlow>

        {/* Topic Card Panel */}
        {selectedNode && (
          <TopicCard node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </div>
    </div>
  );
}

export default function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);

  return (
    <ReactFlowProvider>
      <RoadmapCanvas slug={slug} />
    </ReactFlowProvider>
  );
}
