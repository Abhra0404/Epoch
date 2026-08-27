"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  Search,
  X,
  Layers,
  Code2,
  FlaskConical,
  Lightbulb,
  Zap,
  BookOpen,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { projects, domains, difficulties, type Difficulty } from "@/lib/projects/data";

const difficultyConfig: Record<Difficulty, { icon: React.ElementType; color: string }> = {
  Beginner: { icon: Lightbulb, color: "text-emerald-600" },
  Intermediate: { icon: Code2, color: "text-blue-600" },
  Advanced: { icon: Zap, color: "text-purple-600" },
  Research: { icon: FlaskConical, color: "text-amber-600" },
};

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesDomain = !selectedDomain || p.domains.includes(selectedDomain);
    const matchesDifficulty = !selectedDifficulty || p.difficulty === selectedDifficulty;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.domains.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesDifficulty && matchesSearch;
  });

  const hasFilters = selectedDomain || selectedDifficulty || searchQuery;

  const clearFilters = () => {
    setSelectedDomain(null);
    setSelectedDifficulty(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto py-8">
          <span className="inline-block rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
            Project Ideas
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Build what you learn.
          </h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Turn AI/ML concepts into real-world projects that strengthen your skills, portfolio, and research experience.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════
            BROWSE PROJECTS
        ═══════════════════════════════════════════════ */}
        <section id="browse" className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Browse Projects
            </h2>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills, domains..."
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

          {/* Filters */}
          <div className="space-y-4 mb-8">
            {/* Domains */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono">
                Domain
              </p>
              <div className="flex flex-wrap gap-1.5">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                      selectedDomain === domain
                        ? "bg-foreground text-background"
                        : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono">
                Difficulty
              </p>
              <div className="flex flex-wrap gap-1.5">
                {difficulties.map((diff) => {
                  const config = difficultyConfig[diff];
                  const Icon = config.icon;
                  return (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                        selectedDifficulty === diff
                          ? "bg-foreground text-background"
                          : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs text-muted-foreground mb-4 font-mono">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </p>

          {/* ═══════════════════════════════════════════════
              FEATURED PROJECTS BY DIFFICULTY
          ═══════════════════════════════════════════════ */}
          {(hasFilters ? [selectedDifficulty || "Beginner"] : difficulties).map((diff) => {
            const diffProjects = filteredProjects.filter((p) => p.difficulty === diff);
            if (diffProjects.length === 0) return null;

            const config = difficultyConfig[diff];
            const Icon = config.icon;

            return (
              <div key={diff} className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`h-4 w-4 ${config.color}`} />
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {diff}
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary border border-border rounded-full px-2 py-0.5">
                    {diffProjects.length}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {diffProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="paper-card p-5 group hover:border-foreground/20 transition-all flex flex-col"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h4>

                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {project.overview}
                      </p>

                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Layers className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {project.type}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No projects match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-xs font-bold text-foreground hover:text-accent transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
