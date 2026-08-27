"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  CheckCircle2,
  Database,
  FlaskConical,
  Lightbulb,
  Zap,
  Target,
  Rocket,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { getProjectBySlug, type Difficulty } from "@/lib/projects/data";

const difficultyConfig: Record<Difficulty, { icon: React.ElementType; color: string; label: string }> = {
  Beginner: { icon: Lightbulb, color: "text-emerald-600", label: "Beginner" },
  Intermediate: { icon: Code2, color: "text-blue-600", label: "Intermediate" },
  Advanced: { icon: Zap, color: "text-purple-600", label: "Advanced" },
  Research: { icon: FlaskConical, color: "text-amber-600", label: "Research" },
};

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const config = difficultyConfig[project.difficulty];
  const DifficultyIcon = config.icon;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-8">
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1 rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${config.color}`}
            >
              <DifficultyIcon className="h-3 w-3" />
              {config.label}
            </span>
            <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              {project.type}
            </span>
            {project.domains.map((d) => (
              <span
                key={d}
                className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
              >
                {d}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">
            {project.overview}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-foreground/5 border border-foreground/10 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background hover:bg-foreground/90 transition-colors">
              Start Building <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-secondary transition-colors">
              <BookOpen className="h-3.5 w-3.5" />
              Read Materials
            </button>
          </div>
        </header>

        <div className="space-y-12">
          {/* Prerequisites */}
          <Section icon={Target} title="Prerequisites">
            <p className="text-xs text-muted-foreground mb-4">
              Topics you should know before starting this project.
            </p>
            <div className="space-y-2">
              {project.prerequisites.map((prereq, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground">{prereq}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Tech Stack */}
          <Section icon={Code2} title="Tech Stack">
            <p className="text-xs text-muted-foreground mb-4">
              Recommended tools and frameworks.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-foreground/5 border border-foreground/10 px-3 py-1.5 text-xs font-mono font-semibold text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          {/* Datasets */}
          <Section icon={Database} title="Datasets">
            <p className="text-xs text-muted-foreground mb-4">
              Suggested datasets and sources.
            </p>
            <div className="space-y-2">
              {project.datasets.map((ds, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-semibold text-foreground">{ds.name}</span>
                    <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                      {ds.source}
                    </span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Section>

          {/* Build Plan */}
          <Section icon={Rocket} title="Build Plan">
            <p className="text-xs text-muted-foreground mb-4">
              Step-by-step implementation milestones.
            </p>
            <div className="space-y-3">
              {project.buildPlan.map((step, i) => (
                <div
                  key={i}
                  className="relative rounded-lg border border-border bg-card px-4 py-3 pl-12"
                >
                  <span className="absolute left-4 top-3 text-[11px] font-mono font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-bold text-foreground">{step.step}</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Evaluation */}
          <Section icon={Target} title="Evaluation">
            <p className="text-xs text-muted-foreground mb-4">
              Metrics and expected results.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {project.evaluation.map((ev, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card p-4 text-center"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    {ev.metric}
                  </p>
                  <p className="text-lg font-bold text-foreground font-mono">{ev.target}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Extensions */}
          <Section icon={Lightbulb} title="Extensions">
            <p className="text-xs text-muted-foreground mb-4">
              Ideas to take the project further.
            </p>
            <div className="space-y-2">
              {project.extensions.map((ext, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{ext}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Related Topics */}
          <Section icon={BookOpen} title="Related Topics">
            <p className="text-xs text-muted-foreground mb-4">
              Links back to Epoch notes and roadmaps.
            </p>
            <div className="space-y-2">
              {project.relatedTopics.map((topic, i) => (
                <Link
                  key={i}
                  href={topic.href}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:border-foreground/20 transition-all group"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {topic.name}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </Section>

          {/* Resources */}
          <Section icon={ExternalLink} title="Resources">
            <p className="text-xs text-muted-foreground mb-4">
              Relevant courses, papers, articles, and documentation.
            </p>
            <div className="space-y-2">
              {project.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:border-foreground/20 transition-all group"
                >
                  <div>
                    <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {res.title}
                    </span>
                    <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                      {res.type}
                    </span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </Section>
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Projects
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}
