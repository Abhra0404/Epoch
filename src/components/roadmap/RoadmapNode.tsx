"use client";

import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Play,
  Star,
  Trophy,
  Circle,
  CheckCircle2,
} from "lucide-react";

const statusConfig = {
  start: {
    icon: Play,
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    ring: "ring-emerald-200",
    iconColor: "text-emerald-600",
    label: "Start Here",
    labelBg: "bg-emerald-100",
    labelText: "text-emerald-700",
  },
  required: {
    icon: Circle,
    bg: "bg-card",
    border: "border-border",
    ring: "ring-foreground/5",
    iconColor: "text-foreground",
    label: null,
    labelBg: "",
    labelText: "",
  },
  recommended: {
    icon: Star,
    bg: "bg-card",
    border: "border-border border-dashed",
    ring: "ring-foreground/5",
    iconColor: "text-muted-foreground",
    label: "Recommended",
    labelBg: "bg-foreground/5",
    labelText: "text-muted-foreground",
  },
  milestone: {
    icon: Trophy,
    bg: "bg-purple-50",
    border: "border-purple-300",
    ring: "ring-purple-200",
    iconColor: "text-purple-600",
    label: "Milestone",
    labelBg: "bg-purple-100",
    labelText: "text-purple-700",
  },
};

const difficultyColors: Record<string, string> = {
  Beginner: "text-emerald-600",
  Intermediate: "text-blue-600",
  Advanced: "text-purple-600",
};

export const RoadmapNodeComponent = memo(function RoadmapNode({
  data,
}: NodeProps) {
  const nodeData = data as unknown as {
    label: string;
    slug?: string;
    difficulty: string;
    duration?: string;
    status: "start" | "required" | "recommended" | "milestone";
    description?: string;
  };

  const config = statusConfig[nodeData.status] || statusConfig.required;
  const Icon = config.icon;

  return (
    <div className="relative">
      {/* Handles for edges */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-foreground !border-2 !border-card"
      />

      {/* Node card */}
      <div
        className={`
          w-[200px] rounded-2xl border bg-card px-4 py-3 cursor-pointer
          hover:shadow-md hover:border-foreground/30 transition-all
          ${config.border} ${config.ring ? `ring-1 ${config.ring}` : ""}
        `}
      >
        {/* Label badge */}
        {config.label && (
          <div className={`inline-flex items-center gap-1 rounded-full ${config.labelBg} px-2 py-0.5 mb-2`}>
            <Icon className={`h-2.5 w-2.5 ${config.iconColor}`} />
            <span className={`text-[8px] font-bold uppercase tracking-[0.1em] ${config.labelText}`}>
              {config.label}
            </span>
          </div>
        )}

        {/* Title */}
        <h4 className="text-[11px] font-bold text-foreground leading-tight">
          {nodeData.label}
        </h4>

        {/* Meta */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-[9px] font-bold uppercase tracking-[0.08em] ${difficultyColors[nodeData.difficulty] || "text-muted-foreground"}`}>
            {nodeData.difficulty}
          </span>
          {nodeData.duration && (
            <>
              <span className="text-[8px] text-muted-foreground">·</span>
              <span className="text-[9px] font-mono text-muted-foreground">
                {nodeData.duration}
              </span>
            </>
          )}
        </div>

        {/* Description preview */}
        {nodeData.description && (
          <p className="mt-1.5 text-[9px] text-muted-foreground leading-relaxed line-clamp-2">
            {nodeData.description}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-foreground !border-2 !border-card"
      />
    </div>
  );
});
