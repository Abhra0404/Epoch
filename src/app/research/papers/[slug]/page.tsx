"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  ChevronLeft,
  BookOpen,
  FileText,
  Code2,
  Lightbulb,
  Layers,
  BookMarked,
  ExternalLink,
  ArrowUpRight,
  FlaskConical,
  Target,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPaperBySlug, papers } from "@/lib/research/data";

export default function PaperDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-bold">Paper not found</h1>
          <Link href="/research" className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Research
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPapers = papers
    .filter((p) => p.slug !== paper.slug && (p.area === paper.area || p.tags.some((t) => paper.tags.includes(t))))
    .slice(0, 4);

  const prerequisites = paper.tags.slice(0, 3).map((tag) => ({
    name: tag,
    slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/research" className="hover:text-foreground transition-colors">
            Research
          </Link>
          <ChevronLeft className="h-3 w-3 rotate-180" />
          <span className="text-foreground font-semibold truncate max-w-[200px]">
            {paper.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              {paper.area}
            </span>
            <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {paper.difficulty}
            </span>
            {paper.foundaional && (
              <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Foundational
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {paper.title}
          </h1>

          <p className="mt-2 text-sm font-mono text-muted-foreground">
            {paper.authors} · {paper.year} · {paper.conference}
          </p>

          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {paper.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background hover:bg-foreground/90 transition-colors">
              <FileText className="h-3.5 w-3.5" />
              Read Paper
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary transition-colors">
              <Code2 className="h-3.5 w-3.5" />
              Implementation
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary transition-colors">
              <BookMarked className="h-3.5 w-3.5" />
              Save
            </button>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Content Sections */}
        <div className="py-10 space-y-12">
          {/* TL;DR */}
          <section>
            <SectionHeader icon={Zap} title="TL;DR" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {paper.tldr}
            </p>
          </section>

          {/* Why This Paper Matters */}
          <section>
            <SectionHeader icon={Sparkles} title="Why This Paper Matters" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {paper.description}
            </p>
          </section>

          {/* The Problem */}
          <section>
            <SectionHeader icon={Target} title="The Problem" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              This paper addresses a fundamental limitation in how neural networks process sequential data, proposing a new approach that eliminates the need for recurrence or convolutions while maintaining the ability to capture long-range dependencies.
            </p>
          </section>

          {/* Key Idea */}
          <section>
            <SectionHeader icon={Lightbulb} title="Key Idea" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              The core innovation is the self-attention mechanism, which allows each position in a sequence to attend to all other positions directly. This enables parallel computation and captures dependencies regardless of distance in the sequence.
            </p>
          </section>

          {/* Architecture */}
          <section>
            <SectionHeader icon={Layers} title="Architecture" />
            <div className="paper-card p-6 mt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Transformer consists of an encoder-decoder structure, each built from stacked self-attention and feed-forward layers. Multi-head attention allows the model to jointly attend to information from different representation subspaces.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Encoder", "Decoder", "Multi-Head Attention", "Positional Encoding", "Layer Norm"].map(
                  (component) => (
                    <span
                      key={component}
                      className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                    >
                      {component}
                    </span>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Mathematics */}
          <section>
            <SectionHeader icon={FileText} title="Mathematics" />
            <div className="paper-card p-6 mt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The attention function maps a query and a set of key-value pairs to an output. Scaled dot-product attention computes compatibility between query and keys using dot products, scaled by the dimension of the keys.
              </p>
              <div className="mt-4 rounded-xl bg-secondary border border-border p-4 font-mono text-xs text-foreground">
                Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>)V
              </div>
            </div>
          </section>

          {/* Experiments */}
          <section>
            <SectionHeader icon={FlaskConical} title="Experiments" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              The model was evaluated on machine translation benchmarks (WMT 2014 English-German and English-French), achieving state-of-the-art BLEU scores while being significantly faster to train than previous approaches.
            </p>
          </section>

          {/* Results */}
          <section>
            <SectionHeader icon={Target} title="Results" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Transformer achieved 28.4 BLEU on WMT 2014 English-to-German translation, outperforming all previous models including ensemble systems. Training time was reduced to days on 8 GPUs.
            </p>
          </section>

          {/* Implementation */}
          <section>
            <SectionHeader icon={Code2} title="Implementation" />
            <div className="paper-card p-6 mt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                A step-by-step implementation guide covering multi-head attention, positional encoding, the encoder-decoder architecture, and the training loop with label smoothing.
              </p>
              <div className="mt-4">
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:bg-foreground/90 transition-colors"
                >
                  <Play className="h-3 w-3" />
                  Open in Playground
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Sidebar-like sections */}
        <div className="py-10 grid sm:grid-cols-2 gap-8">
          {/* Prerequisites */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Prerequisites
            </h3>
            <div className="space-y-2">
              {prerequisites.map((prereq) => (
                <div
                  key={prereq.name}
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all"
                >
                  <span className="text-xs font-semibold text-foreground">
                    {prereq.name}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Related Concepts */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Related Concepts
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-foreground/5 border border-foreground/10 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Papers */}
        <section className="pb-16">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Related Papers
          </h3>
          <div className="space-y-2">
            {relatedPapers.map((rp) => (
              <Link
                key={rp.slug}
                href={`/research/papers/${rp.slug}`}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
                    {rp.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {rp.authors} · {rp.year} · {rp.area}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      {title}
    </h2>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
