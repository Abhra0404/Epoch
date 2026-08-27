"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Lightbulb, 
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <ChevronLeft className="h-3 w-3 rotate-180" />
          <span className="text-foreground font-semibold">Project Ideas</span>
        </nav>

        {/* Header */}
        <section className="text-center max-w-3xl mx-auto py-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10">
              <Lightbulb className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Project Ideas
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Hands-on projects to practice and apply what you've learned.
          </p>
        </section>

        {/* Empty State */}
        <section className="mt-16 flex flex-col items-center justify-center py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 mb-6">
            <Lightbulb className="h-10 w-10 text-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            No project ideas yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md text-center">
            Hands-on project ideas and guides will appear here.
          </p>
          <Link
            href="/resources"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary transition-all"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to Resources
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
