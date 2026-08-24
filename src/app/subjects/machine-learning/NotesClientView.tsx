"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  GraduationCap, 
  Sparkles
} from "lucide-react";
import { TopicItem } from "@/lib/topics";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NotesClientViewProps {
  topics: TopicItem[];
  currentSlug: string;
}

export function NotesClientView({ topics, currentSlug }: NotesClientViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTopics, setCompletedTopics] = useState<string[]>(["simple-linear-regression"]);

  const activeTopic = topics.find((t) => t.slug === currentSlug) || topics[1] || topics[0];

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.prerequisites.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeIndex = topics.findIndex((t) => t.slug === activeTopic.slug);
  const prevTopic = activeIndex > 0 ? topics[activeIndex - 1] : null;
  const nextTopic = activeIndex < topics.length - 1 ? topics[activeIndex + 1] : null;

  const toggleComplete = (slug: string) => {
    setCompletedTopics((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isCompleted = completedTopics.includes(activeTopic.slug);
  const progressPercent = Math.round((completedTopics.length / topics.length) * 100);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              title="Back to Landing Page"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-2 text-xs text-muted-foreground hidden sm:flex">
              <Link href="/" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <span className="font-semibold text-foreground">Epoch</span>
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span>Subjects</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-accent font-medium">Machine Learning</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
              <span className="text-accent font-semibold">{completedTopics.length}/{topics.length}</span>
              <span>Topics Done</span>
              <div className="h-1.5 w-16 bg-border rounded-full overflow-hidden ml-1">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => toggleComplete(activeTopic.slug)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isCompleted
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-border bg-secondary hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isCompleted ? "Completed" : "Mark as Done"}
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="mx-auto flex max-w-[1600px] relative z-20">
        {/* Left Sidebar: Topics Navigation */}
        <aside className="w-80 shrink-0 border-r border-border bg-secondary p-4 hidden lg:block min-h-[calc(100vh-57px)] sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                Subject Module
              </div>
              <h2 className="text-lg font-semibold text-foreground mt-1">Machine Learning</h2>
              <p className="text-xs text-muted-foreground mt-0.5">5 Core Topics • Comprehensive Study Notes</p>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full rounded-full border border-border bg-secondary pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Topic List */}
            <nav className="space-y-1.5 pt-2">
              {filteredTopics.map((t, idx) => {
                const isActive = t.slug === activeTopic.slug;
                const isDone = completedTopics.includes(t.slug);

                return (
                  <Link
                    key={t.slug}
                    href={`/subjects/machine-learning/${t.slug}`}
                    className={`group block p-3 rounded-[2rem] border transition-all text-left ${
                      isActive
                        ? "border-accent bg-background paper-card shadow-xs"
                        : "border-border bg-secondary hover:bg-accent/10 hover:border-accent/50 paper-inner"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Topic 0{idx + 1}
                      </span>
                      {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-accent" />}
                    </div>

                    <h3 className={`text-xs font-semibold mt-1 line-clamp-1 ${
                      isActive ? "text-accent" : "text-foreground group-hover:text-foreground"
                    }`}>
                      {t.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                      <span className={`px-1.5 py-0.5 rounded border ${
                        t.difficulty === "Beginner"
                          ? "bg-accent/10 text-accent border-accent/20"
                          : t.difficulty === "Intermediate"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}>
                        {t.difficulty}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        {t.readTime}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Center Main Reader Content */}
        <main className="flex-grow p-4 sm:p-8 max-w-4xl mx-auto overflow-hidden">
          {/* Header Metadata Card */}
          <div className="rounded-[2rem] border border-border bg-card p-6 mb-8 paper-card shadow-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                {activeTopic.moduleName} • Module 0{activeIndex + 1}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  {activeTopic.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold text-foreground mt-4 tracking-tight">
              {activeTopic.title}
            </h1>

            {/* Prerequisites */}
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <GraduationCap className="h-4 w-4 text-accent" />
                Prerequisite Topics
              </div>
              <p className="text-xs text-muted-foreground bg-secondary p-3 rounded-[1.5rem] border border-border">
                {activeTopic.prerequisites}
              </p>
            </div>

            {/* Learning Outcomes */}
            {activeTopic.learningOutcomes && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <BookOpen className="h-4 w-4 text-accent" />
                  Learning Outcomes
                </div>
                <p className="text-xs text-foreground bg-accent/5 border border-accent/20 p-3 rounded-[1.5rem] leading-relaxed">
                  {activeTopic.learningOutcomes}
                </p>
              </div>
            )}

            {/* Quick Section Anchor Pills */}
            {activeTopic.sections.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  Jump to Section
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeTopic.sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                    >
                      {sec.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rendered Markdown Body with KaTeX */}
          <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10 paper-card mb-8">
            <MarkdownViewer content={activeTopic.content} />
          </div>

          {/* Bottom Topic Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            {prevTopic ? (
              <Link
                href={`/subjects/machine-learning/${prevTopic.slug}`}
                className="w-full sm:w-auto flex items-center gap-3 p-4 rounded-full border border-border bg-secondary hover:border-accent/50 hover:bg-accent transition-all group text-left"
              >
                <ArrowLeft className="h-4 w-4 text-accent transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Previous Topic
                  </span>
                  <span className="text-xs font-semibold text-foreground line-clamp-1">{prevTopic.title}</span>
                </div>
              </Link>
            ) : <div />}

            {nextTopic ? (
              <Link
                href={`/subjects/machine-learning/${nextTopic.slug}`}
                className="w-full sm:w-auto flex items-center justify-end gap-3 p-4 rounded-full border border-border bg-secondary hover:border-accent/50 hover:bg-accent transition-all group text-right"
              >
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Next Topic
                  </span>
                  <span className="text-xs font-semibold text-foreground line-clamp-1">{nextTopic.title}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            ) : <div />}
          </div>
        </main>

        {/* Right Sidebar: Table of Contents Anchors */}
        {activeTopic.sections.length > 0 && (
          <aside className="w-64 shrink-0 border-l border-border bg-secondary p-4 hidden xl:block min-h-[calc(100vh-57px)] sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
            <div className="space-y-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                On This Page
              </span>
              <nav className="space-y-1.5">
                {activeTopic.sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="block w-full text-left text-xs text-muted-foreground hover:text-accent py-1 transition-colors line-clamp-2"
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
