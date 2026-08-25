"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Clock, AlertCircle } from "lucide-react";

interface Topic {
  slug: string;
  title: string;
  status: string;
}

interface ComingSoonViewProps {
  subjectTitle: string;
  subjectDescription: string;
  topics: Topic[];
}

export function ComingSoonView({ subjectTitle, subjectDescription, topics }: ComingSoonViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTopic = topics[currentIndex];
  const prevTopic = topics[(currentIndex - 1 + topics.length) % topics.length];
  const nextTopic = topics[(currentIndex + 1) % topics.length];

  const goToTopic = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-700 mb-4">
            <AlertCircle className="h-4 w-4" />
            Under Development
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {subjectTitle}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {subjectDescription}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="Topic navigation">
              {topics.map((topic, index) => (
                <Link
                  key={topic.slug}
                  href={`/subjects/computer-vision/${topic.slug}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    index === currentIndex
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToTopic(index);
                  }}
                >
                  <BookOpen className={`h-4 w-4 flex-shrink-0 ${index === currentIndex ? "text-white" : "text-muted-foreground"}`} />
                  <span className="truncate">{topic.title}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-700">
                    {topic.status}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>

          <main className="lg:col-span-2">
            <article className="paper-card p-8">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 mb-6">
                  <AlertCircle className="h-10 w-10 text-amber-500" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {currentTopic.title}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  This topic is currently being curated. Comprehensive notes with mathematical derivations 
                  and Python implementations will be available soon.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Estimated: 12-18 mins read
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    Intermediate Level
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-foreground mb-4">What will be covered:</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-center gap-2">✓ Mathematical foundations and derivations</li>
                  <li className="flex items-center gap-2">✓ Clean, annotated Python implementations</li>
                  <li className="flex items-center gap-2">✓ Visual explanations and diagrams</li>
                  <li className="flex items-center gap-2">✓ Practical examples and use cases</li>
                  <li className="flex items-center gap-2">✓ Common pitfalls and best practices</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Link
                  href={`/subjects/computer-vision/${prevTopic.slug}`}
                  onClick={(e) => { e.preventDefault(); goToTopic(topics.indexOf(prevTopic)); }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous: {prevTopic.title}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} / {topics.length}
                </span>
                <Link
                  href={`/subjects/computer-vision/${nextTopic.slug}`}
                  onClick={(e) => { e.preventDefault(); goToTopic(topics.indexOf(nextTopic)); }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next: {nextTopic.title}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}