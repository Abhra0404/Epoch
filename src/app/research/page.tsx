"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  FileText,
  Lightbulb,
  Code2,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Play,
  Layers,
  Zap,
  Target,
  FlaskConical,
  Filter,
  BookMarked,
} from "lucide-react";
import Link from "next/link";
import {
  researchAreas,
  papers,
  featuredPaper,
  timelineMilestones,
} from "@/lib/research/data";

const filterTabs = ["Trending", "Recent", "Foundational", "Reproductions"] as const;

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("Trending");

  const filteredPapers = papers.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const latestPapers = [...papers].sort((a, b) => b.year - a.year).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════
            1. HERO
        ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto py-8">
          <span className="inline-block rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
            Research
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Explore the ideas shaping AI.
          </h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Discover important papers, understand the concepts behind them, reproduce the results, and follow where the research leads.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers, topics, authors, architectures..."
              className="w-full rounded-full border border-border bg-card pl-12 pr-12 py-4 text-sm text-foreground placeholder-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/5 shadow-sm"
            />
            <Search className="absolute left-4.5 top-4 h-4.5 w-4.5 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeFilter === tab
                    ? "bg-foreground text-background"
                    : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Search Results */}
        {searchQuery && (
          <section className="mt-8 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground">
                {filteredPapers.length} result{filteredPapers.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
              </h2>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {filteredPapers.map((paper) => (
                <Link
                  key={paper.slug}
                  href={`/research/papers/${paper.slug}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-all group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                      {paper.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {paper.authors} · {paper.year} · {paper.conference}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              {filteredPapers.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No papers found matching your search.
                </p>
              )}
            </div>
          </section>
        )}

        {!searchQuery && (
          <>
            {/* ═══════════════════════════════════════════════
                2. RESEARCH AREAS
            ═══════════════════════════════════════════════ */}
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Research Areas
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {researchAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/research?area=${area.slug}`}
                    className="paper-card p-4 group hover:border-foreground/20 transition-all"
                  >
                    <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                      {area.name}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {area.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════
                3. FEATURED PAPERS
            ═══════════════════════════════════════════════ */}
            <section className="mt-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Featured Papers
                </h2>
              </div>

              {/* Main Featured Paper */}
              <Link
                href={`/research/papers/${featuredPaper.slug}`}
                className="block paper-card-elevated p-8 group hover:border-foreground/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Featured
                  </span>
                  <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Foundational
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {featuredPaper.title}
                </h3>

                <p className="mt-1 text-sm font-mono text-muted-foreground">
                  {featuredPaper.authors} · {featuredPaper.year} · {featuredPaper.conference}
                </p>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {featuredPaper.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredPaper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background group-hover:bg-foreground/90 transition-colors">
                    Explore Paper <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary transition-colors">
                    Read Paper <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </Link>

              {/* Smaller Featured Cards */}
              <div className="mt-4 grid sm:grid-cols-3 gap-4">
                {papers
                  .filter((p) => p.slug !== featuredPaper.slug && p.foundaional)
                  .slice(0, 3)
                  .map((paper) => (
                    <Link
                      key={paper.slug}
                      href={`/research/papers/${paper.slug}`}
                      className="paper-card p-5 group hover:border-foreground/20 transition-all"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                        {paper.area}
                      </span>
                      <h4 className="mt-2 font-display text-base font-bold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                        {paper.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground font-mono">
                        {paper.authors} · {paper.year}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {paper.tldr}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-bold text-foreground">
                        Explore <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════
                4. RESEARCH TIMELINE
            ═══════════════════════════════════════════════ */}
            <section className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  AI Research Timeline
                </h2>
              </div>

              <div className="paper-card p-8 overflow-x-auto">
                <div className="flex items-start gap-0 min-w-[700px]">
                  {timelineMilestones.map((milestone, idx) => (
                    <React.Fragment key={milestone.year}>
                      <Link
                        href={`/research/papers/${milestone.slug}`}
                        className="flex flex-col items-center text-center group cursor-pointer flex-1 min-w-[80px]"
                      >
                        <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-wider">
                          {milestone.year}
                        </span>
                        <div className="mt-2 h-3 w-3 rounded-full border-2 border-foreground bg-background group-hover:bg-foreground transition-colors" />
                        <p className="mt-2 text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                          {milestone.title}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground max-w-[100px] leading-relaxed hidden sm:block">
                          {milestone.description}
                        </p>
                      </Link>
                      {idx < timelineMilestones.length - 1 && (
                        <div className="flex-shrink-0 w-8 h-[2px] bg-border mt-[2.1rem] self-start" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════
                5. PAPER → CONCEPT → IMPLEMENTATION
            ═══════════════════════════════════════════════ */}
            <section className="mt-20">
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  From Papers to Practice
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
                  Every paper connects to concepts, and every concept leads to implementation.
                </p>
              </div>

              <div className="paper-card-elevated p-8 sm:p-10">
                <div className="grid sm:grid-cols-3 gap-8">
                  {/* Stage 1: Paper */}
                  <div className="text-center sm:text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10 sm:mx-0 mx-auto">
                      <FileText className="h-5 w-5 text-foreground" />
                    </div>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground font-mono">
                      Paper
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold text-foreground">
                      Attention Is All You Need
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Vaswani et al. · 2017
                    </p>
                  </div>

                  {/* Stage 2: Concepts */}
                  <div className="text-center sm:text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10 sm:mx-0 mx-auto">
                      <Lightbulb className="h-5 w-5 text-foreground" />
                    </div>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground font-mono">
                      Concepts
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      {["Attention", "Self-Attention", "Positional Encoding", "Multi-Head Attention"].map(
                        (concept) => (
                          <span
                            key={concept}
                            className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                          >
                            {concept}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Stage 3: Implementation */}
                  <div className="text-center sm:text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10 sm:mx-0 mx-auto">
                      <Code2 className="h-5 w-5 text-foreground" />
                    </div>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground font-mono">
                      Implementation
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold text-foreground">
                      Build a Transformer
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      From scratch in PyTorch
                    </p>
                  </div>
                </div>

                {/* Flow arrows (visible on sm+) */}
                <div className="hidden sm:flex items-center justify-center gap-4 mt-8">
                  <div className="h-px flex-1 bg-border" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="h-px flex-1 bg-border" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="/research/papers/attention-is-all-you-need"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors"
                  >
                    Explore the workflow <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════
                7. LATEST RESEARCH
            ═══════════════════════════════════════════════ */}
            <section className="mt-20 pb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Latest Research
                </h2>
              </div>

              <div className="space-y-1">
                {latestPapers.map((paper) => (
                  <Link
                    key={paper.slug}
                    href={`/research/papers/${paper.slug}`}
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                        {paper.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-muted-foreground font-mono">
                          {paper.authors} · {paper.year}
                        </span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          {paper.area}
                        </span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          {paper.difficulty}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/research/papers"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors"
                >
                  Browse all papers <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ExternalLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
