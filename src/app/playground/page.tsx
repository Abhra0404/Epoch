"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Play,
  ArrowRight,
  ArrowUpRight,
  Clock,
  BarChart3,
  Brain,
  Sparkles,
  Eye,
  MessageSquare,
  BookOpen,
  Code2,
  FlaskConical,
  Compass,
} from "lucide-react";
import Link from "next/link";
import {
  experiments,
  categories,
  getFeaturedExperiment,
  type Category,
} from "@/lib/playground/data";

const categoryIcons: Record<Category, React.ElementType> = {
  "Machine Learning": BarChart3,
  "Deep Learning": Brain,
  NLP: MessageSquare,
  "Computer Vision": Eye,
  "Generative AI": Sparkles,
};

const difficultyColor: Record<string, string> = {
  Beginner: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-rose-600 dark:text-rose-400",
};

export default function PlaygroundPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const featured = getFeaturedExperiment();

  const filtered =
    activeCategory === "All"
      ? experiments.filter((e) => !e.featured)
      : experiments.filter(
          (e) => !e.featured && e.category === activeCategory
        );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto py-8">
          <span className="inline-block rounded-full bg-foreground/5 border border-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
            Interactive Lab
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Build intuition by doing.
          </h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Tune parameters, watch algorithms respond in real time, and connect
            every experiment back to the theory behind it.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════
            CATEGORY FILTERS
        ═══════════════════════════════════════════════ */}
        <section className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              activeCategory === "All"
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* ═══════════════════════════════════════════════
            FEATURED EXPERIMENT
        ═══════════════════════════════════════════════ */}
        {activeCategory === "All" && featured && (
          <section className="mt-12">
            <Link
              href={`/playground/${featured.slug}`}
              className="block paper-card-elevated p-8 sm:p-10 group hover:border-foreground/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
                  Featured
                </span>
                <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {featured.category}
                </span>
                <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {featured.duration}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {featured.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {featured.longDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background group-hover:bg-foreground/90 transition-colors">
                  <Play className="h-3.5 w-3.5" />
                  Open Playground
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className={`text-xs font-semibold ${difficultyColor[featured.difficulty]}`}>
                  {featured.difficulty}
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            EXPERIMENT GRID
        ═══════════════════════════════════════════════ */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {activeCategory === "All" ? "Explore Playgrounds" : activeCategory}
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              {filtered.length} experiment{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((exp) => {
              const Icon = categoryIcons[exp.category];
              return (
                <Link
                  key={exp.slug}
                  href={`/playground/${exp.slug}`}
                  className="paper-card p-6 group hover:border-foreground/20 transition-all flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                        {exp.category}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary mb-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <h3 className="font-display text-base font-bold tracking-tight group-hover:text-accent transition-colors">
                      {exp.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold ${difficultyColor[exp.difficulty]}`}>
                        {exp.difficulty}
                      </span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        {exp.duration}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-foreground flex items-center gap-1">
                      Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">
                No experiments in this category yet.
              </p>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════
            CONNECT BACK TO EPOCH
        ═══════════════════════════════════════════════ */}
        <section className="mt-20 pb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Never stuck in an isolated experiment
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Every playground links back to the wider Epoch ecosystem — learn the
              theory, practice in the lab, test your knowledge, and explore the
              original research.
            </p>
          </div>

          <div className="paper-card-elevated p-8 sm:p-10">
            {/* Tree header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 bg-border max-w-16" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                A typical experiment flow
              </span>
              <div className="h-px flex-1 bg-border max-w-16" />
            </div>

            {/* Tree layout */}
            <div className="flex flex-col items-center">
              {/* Root node */}
              <div className="rounded-2xl border border-border bg-secondary px-6 py-3 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-foreground">Playground Experiment</span>
              </div>

              {/* Vertical stem */}
              <div className="h-8 w-px bg-border" />

              {/* Branches */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                {[
                  {
                    label: "Learn",
                    desc: "Structured notes with math & code",
                    href: "/learn",
                    icon: BookOpen,
                  },
                  {
                    label: "Practice",
                    desc: "Tune parameters in this lab",
                    href: "/playground",
                    icon: FlaskConical,
                  },
                  {
                    label: "Interview",
                    desc: "Test your understanding",
                    href: "/learn",
                    icon: MessageSquare,
                  },
                  {
                    label: "Build",
                    desc: "Apply it in a project",
                    href: "/projects",
                    icon: Code2,
                  },
                  {
                    label: "Research",
                    desc: "Read the original paper",
                    href: "/research",
                    icon: Compass,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group relative flex flex-col items-center text-center"
                    >
                      {/* Horizontal connector (hidden on first/last for cleaner look) */}
                      {i === 0 && (
                        <div className="absolute top-0 left-1/2 h-px bg-border hidden lg:block" style={{ width: "calc(100% - 2rem)" }} />
                      )}

                      {/* Node */}
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card group-hover:border-foreground/30 transition-colors">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>

                      <ArrowRight className="mt-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
