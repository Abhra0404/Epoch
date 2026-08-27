"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  BookOpen,
  Code2,
  MessageSquare,
  FolderOpen,
  ExternalLink,
  ArrowRight,
  Clock,
  Target,
  Play,
} from "lucide-react";
import { type RoadmapNode } from "@/lib/roadmaps/data";

interface TopicCardProps {
  node: RoadmapNode;
  onClose: () => void;
}

const difficultyConfig: Record<string, { label: string; color: string }> = {
  Beginner: { label: "Beginner", color: "text-emerald-600 bg-emerald-50" },
  Intermediate: { label: "Intermediate", color: "text-blue-600 bg-blue-50" },
  Advanced: { label: "Advanced", color: "text-purple-600 bg-purple-50" },
};

export function TopicCard({ node, onClose }: TopicCardProps) {
  const config = difficultyConfig[node.difficulty] || difficultyConfig.Intermediate;
  const topicUrl = node.slug
    ? `/subjects/${node.subject || "machine-learning"}/${node.slug}`
    : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${config.color}`}>
                  {config.label}
                </span>
                {node.duration && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {node.duration}
                  </span>
                )}
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {node.label}
              </h2>
              {node.description && (
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {node.description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-1.5 rounded-full hover:bg-secondary transition-colors shrink-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Actions */}
          <div className="space-y-2 mb-8">
            {topicUrl && (
              <Link
                href={topicUrl}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 hover:border-foreground/20 hover:bg-secondary transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                  <BookOpen className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                    Read Epoch Notes
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Detailed explanation with examples
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 opacity-60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                <Code2 className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-foreground">
                  Playground
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Interactive code examples
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 opacity-60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                <MessageSquare className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-foreground">
                  Interview Questions
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Common questions and answers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 opacity-60">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                <FolderOpen className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-foreground">
                  Related Projects
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Hands-on project ideas
                </p>
              </div>
            </div>
          </div>

          {/* Start Learning */}
          {topicUrl && (
            <Link
              href={topicUrl}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-foreground text-background py-3 text-sm font-bold hover:bg-foreground/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              Start Learning
            </Link>
          )}

          {/* Resources placeholder */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground mb-3">
              Resources
            </h3>
            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Resources coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
