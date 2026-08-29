"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Bookmark,
  Maximize,
  Minimize,
  Menu,
  X,
  Share2,
  Check
} from "lucide-react";
import { TopicItem } from "@/lib/topics";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NotesClientViewProps {
  topics: TopicItem[];
  currentSlug: string;
  subject?: "machine-learning" | "deep-learning" | "nlp" | "python-libraries";
  subjectTitle?: string;
}

export function NotesClientView({ topics, currentSlug, subject = "machine-learning", subjectTitle = "Machine Learning" }: NotesClientViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeTopic = topics.find((t) => t.slug === currentSlug) || topics[0];

  // Handle case where no topics are available
  if (!activeTopic) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading topics...</p>
        </div>
      </div>
    );
  }

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

  const toggleBookmark = (slug: string) => {
    setBookmarkedTopics((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const copyPageLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isCompleted = completedTopics.includes(activeTopic.slug);
  const isBookmarked = bookmarkedTopics.includes(activeTopic.slug);

  // Ensure body scroll is preserved
  useEffect(() => {
    document.body.style.overflowY = "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [focusMode]);

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans ${focusMode ? "focus-mode" : ""}`}>
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          {/* Left: Back Pill */}
          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="group flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/40 hover:bg-secondary hover:text-foreground transition-all shadow-xs"
              title="Back to Subjects"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all" />
              <span className="font-medium">Subjects</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
              <span className="font-semibold text-foreground">{subjectTitle}</span>
            </Link>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComplete(activeTopic.slug)}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                isCompleted
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-border bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              title={isCompleted ? "Marked as done" : "Mark as done"}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isCompleted ? "Done" : "Mark Done"}</span>
            </button>

            <button
              onClick={() => toggleBookmark(activeTopic.slug)}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                isBookmarked
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "border-border bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={() => setFocusMode(!focusMode)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              title={focusMode ? "Exit Focus Mode" : "Focus Mode"}
            >
              {focusMode ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
              <span>{focusMode ? "Exit Focus" : "Focus"}</span>
            </button>

            <ThemeToggle />

            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground lg:hidden"
              aria-label="Toggle Topic List"
            >
              {mobileDrawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="mx-auto flex max-w-[1600px] relative z-20 min-h-[calc(100vh-57px)]">
        {/* Left Sidebar: Topics Navigation (Desktop) */}
        <aside className={`w-80 shrink-0 border-r border-border/80 bg-secondary/40 p-4 hidden lg:block sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto transition-all ${focusMode ? "!hidden" : ""}`}>
          <div className="space-y-4">
            {/* Module Title & Progress */}
            <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-xs">
              <div className="flex items-center gap-2 text-accent text-[11px] font-bold uppercase tracking-wider">
                <BookOpen className="h-3.5 w-3.5" />
                Subject Module
              </div>                    <h2 className="text-base font-bold text-foreground mt-1">{subjectTitle}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {topics.length} Core Topics • Study Notes
              </p>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium mb-1">
                  <span>Progress</span>
                  <span>{completedTopics.length} / {topics.length} Done</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300 rounded-full"
                    style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full rounded-full border border-border bg-card pl-9 pr-8 py-2 text-xs text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Topic List */}
            <nav className="space-y-2 pt-1">
              {filteredTopics.map((t, idx) => {
                const isActive = t.slug === activeTopic.slug;
                const isDone = completedTopics.includes(t.slug);
                const isBookmarkedTopic = bookmarkedTopics.includes(t.slug);

                return (
                  <Link
                    key={t.slug}
                    href={`/subjects/${subject}/${t.slug}`}
                    className={`group block p-3 rounded-2xl border transition-all text-left ${
                      isActive
                        ? "border-accent/60 bg-card shadow-xs ring-1 ring-accent/20"
                        : "border-border/60 bg-card/50 hover:bg-card hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Topic 0{idx + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isBookmarkedTopic && <Bookmark className="h-3 w-3 text-amber-500 fill-current" />}
                        {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-accent" />}
                      </div>
                    </div>

                    <h3 className={`text-xs font-semibold mt-1 line-clamp-1 ${
                      isActive ? "text-accent font-bold" : "text-foreground group-hover:text-accent transition-colors"
                    }`}>
                      {t.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                      <span className={`px-1.5 py-0.5 rounded-full border text-[9px] font-medium ${
                        t.difficulty === "Beginner"
                          ? "bg-accent/10 text-accent border-accent/20"
                          : t.difficulty === "Intermediate"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}>
                        {t.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
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

        {/* Mobile Drawer (Topics Navigation) */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-4/5 max-w-sm bg-background border-r border-border h-full p-4 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="h-4 w-4" />
                    Machine Learning Notes
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-full text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics..."
                    className="w-full rounded-full border border-border bg-secondary pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                </div>

                {/* Topics Links */}
                <nav className="space-y-2">
                  {filteredTopics.map((t, idx) => {
                    const isActive = t.slug === activeTopic.slug;
                    const isDone = completedTopics.includes(t.slug);

                    return (
                      <Link
                        key={t.slug}
                        href={`/subjects/${subject}/${t.slug}`}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`block p-3 rounded-xl border text-left transition-all ${
                          isActive
                            ? "border-accent bg-accent/5 font-semibold text-accent"
                            : "border-border bg-card text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Topic 0{idx + 1}</span>
                          {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-accent" />}
                        </div>
                        <div className="text-xs font-medium">{t.title}</div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
          </div>
        )}

        {/* Center Reader Area - Centered Layout */}
        <main className="flex-1 flex justify-center px-4 sm:px-8 py-8 w-full min-w-0">
          <div className="w-full max-w-4xl mx-auto space-y-6">
            
            {/* Markdown Main Body Card */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-xs">
              <MarkdownViewer content={activeTopic.content} />
            </div>

            {/* Bottom Prev / Next Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {prevTopic ? (
                <Link                    href={`/subjects/${subject}/${prevTopic.slug}`}
                  className="group flex items-center gap-3.5 p-4 rounded-2xl border border-border/80 bg-card hover:border-accent/50 hover:bg-accent/5 transition-all text-left shadow-xs"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Previous Topic
                    </span>
                    <span className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                      {prevTopic.title}
                    </span>
                  </div>
                </Link>
              ) : <div />}

              {nextTopic ? (
                <Link                    href={`/subjects/${subject}/${nextTopic.slug}`}
                  className="group flex items-center justify-end gap-3.5 p-4 rounded-2xl border border-border/80 bg-card hover:border-accent/50 hover:bg-accent/5 transition-all text-right shadow-xs sm:col-start-2"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Next Topic
                    </span>
                    <span className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                      {nextTopic.title}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ) : null}
            </div>

          </div>
        </main>
      </div>

      <style jsx global>{`
        body.focus-mode {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
        }
        .focus-mode aside {
          display: none !important;
        }
        .focus-mode main {
          max-width: 100% !important;
          width: 100% !important;
          padding: 2rem 1rem !important;
        }
        .focus-mode main > div {
          max-width: 100% !important;
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}