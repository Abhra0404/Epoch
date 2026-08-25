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
} from "lucide-react";
import { TopicItem } from "@/lib/topics";
import { MarkdownViewer } from "@/components/MarkdownViewer";

interface NotesClientViewProps {
  topics: TopicItem[];
  currentSlug: string;
}

export function NotesClientView({ topics, currentSlug }: NotesClientViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>([]);
  const [focusMode, setFocusMode] = useState(false);

  const activeTopic = topics.find((t) => t.slug === currentSlug) || topics[1] || topics[0];

  // Handle case where no topics are available (e.g., during build/prerendering)
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

  const isCompleted = completedTopics.includes(activeTopic.slug);
  const isBookmarked = bookmarkedTopics.includes(activeTopic.slug);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Apply focus mode styles to body
  useEffect(() => {
    if (focusMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [focusMode]);

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans ${focusMode ? "focus-mode" : ""}`}>
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
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="mx-auto flex max-w-[1600px] relative z-20">
        {/* Left Sidebar: Topics Navigation */}
        <aside className={`w-80 shrink-0 border-r border-border bg-secondary p-4 hidden lg:block min-h-[calc(100vh-57px)] sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto transition-all ${focusMode ? "w-0 p-0 border-0 hidden" : ""}`}>
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
                const isBookmarkedTopic = bookmarkedTopics.includes(t.slug);

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
                      {isBookmarkedTopic && <Bookmark className="h-3.5 w-3.5 text-amber-500 fill-current" />}
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
        <main className={`flex-grow p-4 sm:p-8 mx-auto overflow-hidden transition-all ${focusMode ? "max-w-none" : "max-w-4xl"}`}>
          <div className="relative">
            {/* Right Side Action Buttons */}
            <div className="fixed right-4 top-20 z-30 flex flex-col gap-2 hidden lg:flex">
              <button
                onClick={() => toggleComplete(activeTopic.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-lg ${
                  isCompleted
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isCompleted ? "Completed" : "Mark as Done"}
              </button>

              <button
                onClick={() => toggleBookmark(activeTopic.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-lg ${
                  isBookmarked
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                    : "border-border bg-background hover:bg-amber-500/10 hover:text-amber-500"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>

              <button
                onClick={() => setFocusMode(!focusMode)}
                className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-lg border-border bg-background hover:bg-accent hover:text-accent-foreground"
              >
                {focusMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                {focusMode ? "Exit Focus" : "Focus Mode"}
              </button>
            </div>

            {/* Mobile Action Buttons (Bottom) */}
            <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              <button
                onClick={() => toggleComplete(activeTopic.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-lg ${
                  isCompleted
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isCompleted ? "Done" : "Mark Done"}
              </button>
              <button
                onClick={() => toggleBookmark(activeTopic.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-lg ${
                  isBookmarked
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                    : "border-border bg-background hover:bg-amber-500/10 hover:text-amber-500"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Bookmark"}
              </button>
              <button
                onClick={() => setFocusMode(!focusMode)}
                className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all shadow-lg border-border bg-background hover:bg-accent hover:text-accent-foreground"
              >
                {focusMode ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                {focusMode ? "Exit" : "Focus"}
              </button>
            </div>

            {/* Rendered Markdown Body with KaTeX */}
            <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-10 paper-card mb-8 lg:pr-20">
              <MarkdownViewer content={activeTopic.content} />
            </div>

            {/* Bottom Topic Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border lg:pr-20">
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
              ) : null}

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
              ) : null}
            </div>
          </div>
        </main>
      </div>
      <style jsx global>{`
        .focus-mode .sticky.top-0 {
          display: none;
        }
        .focus-mode aside.w-80 {
          display: none;
        }
        .focus-mode main {
          max-width: none !important;
          padding: 2rem !important;
        }
        @media (max-width: 1023px) {
          .focus-mode .sticky.top-0 {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}