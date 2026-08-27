"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { timelineMilestones } from "@/lib/research/data";

export default function TimelinePage() {
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
          <span className="text-foreground font-semibold">Timeline</span>
        </nav>

        <section className="text-center max-w-3xl mx-auto py-6">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            AI Research Timeline
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            A chronological journey through the milestones that shaped modern AI.
          </p>
        </section>

        <section className="mt-16 pb-16">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {timelineMilestones.map((milestone) => (
                <Link
                  key={milestone.year}
                  href={`/research/papers/${milestone.slug}`}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background group-hover:border-foreground group-hover:bg-foreground/5 transition-all shrink-0">
                    <span className="text-xs font-bold font-mono text-foreground">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore papers <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
