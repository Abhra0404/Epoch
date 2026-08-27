"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Compass,
  Search,
  X,
  ArrowRight,
  Clock,
  BookOpen,
  Layers,
} from "lucide-react";
import { roadmaps } from "@/lib/roadmaps/data";

const levelColors: Record<string, string> = {
  Beginner: "text-emerald-600",
  Intermediate: "text-blue-600",
  Advanced: "text-purple-600",
};

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoadmaps = roadmaps.filter(
    (r) =>
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommended = filteredRoadmaps.filter((r) => r.level === "Intermediate");
  const allOthers = filteredRoadmaps.filter((r) => r.level !== "Intermediate");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto py-8">
          <span className="inline-block rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
            Roadmaps
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Master AI/ML with structured learning paths.
          </h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Follow curated roadmaps from fundamentals to advanced research. Each node connects directly to Epoch notes, playground, and projects.
          </p>
        </section>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roadmaps..."
            className="w-full rounded-full border border-border bg-card pl-10 pr-10 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/5"
          />
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ═══════════════════════════════════════════════
            RECOMMENDED
        ═══════════════════════════════════════════════ */}
        {recommended.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-lg font-bold tracking-tight mb-4">
              Recommended
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommended.map((roadmap) => (
                <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            ALL ROADMAPS
        ═══════════════════════════════════════════════ */}
        <section className="mb-16">
          <h2 className="font-display text-lg font-bold tracking-tight mb-4">
            Explore Roadmaps
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allOthers.map((roadmap) => (
              <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
            ))}
          </div>

          {filteredRoadmaps.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No roadmaps match your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-xs font-bold text-foreground hover:text-accent transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mb-16 text-center">
          <div className="paper-card-elevated p-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Not sure where to start?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              The ML Engineer roadmap covers the fundamentals most roles require. Start there and branch out.
            </p>
            <div className="mt-6">
              <Link
                href="/roadmaps/ml-engineer"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:bg-foreground/90 transition-colors"
              >
                Start ML Engineer Path <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function RoadmapCard({ roadmap }: { roadmap: typeof roadmaps[0] }) {
  return (
    <Link
      href={`/roadmaps/${roadmap.slug}`}
      className="paper-card p-5 group hover:border-foreground/20 transition-all flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${levelColors[roadmap.level]}`}>
          {roadmap.level}
        </span>
        <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
          <Clock className="h-3 w-3" />
          {roadmap.duration}
        </div>
      </div>

      <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors">
        {roadmap.title}
      </h3>

      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {roadmap.description}
      </p>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-mono text-muted-foreground">
            {roadmap.topicCount} topics
          </span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
