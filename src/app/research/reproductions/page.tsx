"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronLeft, ArrowRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import { reproductions } from "@/lib/research/data";

export default function ReproductionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/research" className="hover:text-foreground transition-colors">
            Research
          </Link>
          <ChevronLeft className="h-3 w-3 rotate-180" />
          <span className="text-foreground font-semibold">Reproductions</span>
        </nav>

        <section className="text-center max-w-3xl mx-auto py-6">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Paper Reproductions
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Rebuild influential research and compare your results with the original work.
          </p>
        </section>

        <section className="mt-12 space-y-4 pb-16">
          {reproductions.map((repo) => (
            <div
              key={repo.paperSlug}
              className="paper-card p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  {repo.area}
                </span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {repo.difficulty}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-foreground">
                {repo.paperTitle}
              </h3>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    Progress
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground">
                    {repo.progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all"
                    style={{ width: `${repo.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-secondary border border-border">
                  <p className="text-[10px] text-muted-foreground">Dataset</p>
                  <p className="text-xs font-bold text-foreground font-mono">{repo.dataset}</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary border border-border">
                  <p className="text-[10px] text-muted-foreground">Status</p>
                  <p className={`text-xs font-bold font-mono ${
                    repo.status === "Available"
                      ? "text-emerald-600"
                      : repo.status === "In Progress"
                      ? "text-amber-600"
                      : "text-muted-foreground"
                  }`}>
                    {repo.status}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href={`/research/papers/${repo.paperSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors"
                >
                  {repo.status === "Available"
                    ? "Start Reproduction"
                    : repo.status === "In Progress"
                    ? "Continue Reproduction"
                    : "Coming Soon"}{" "}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
