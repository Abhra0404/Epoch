"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, ChevronRight, Search, X, ExternalLink, Clock, BarChart3, Play, Users } from "lucide-react";
import Link from "next/link";
import { courseCategories, totalCourseCount, type Difficulty, type Cost } from "@/lib/resources/courses";
import { youtubeChannels } from "@/lib/resources/youtube";

const difficultyColors: Record<Difficulty, string> = {
  Beginner: "text-emerald-600 bg-emerald-50",
  Intermediate: "text-blue-600 bg-blue-50",
  Advanced: "text-purple-600 bg-purple-50",
};

const costColors: Record<Cost, string> = {
  Free: "text-emerald-600 bg-emerald-50",
  Paid: "text-amber-600 bg-amber-50",
};

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = courseCategories
    .map((cat) => ({
      ...cat,
      courses: cat.courses.filter(
        (c) =>
          !searchQuery ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.provider.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.courses.length > 0);

  const filteredChannels = youtubeChannels.filter(
    (ch) =>
      !searchQuery ||
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-8">
          <Link href="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Courses</span>
        </nav>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, channels, providers..."
            className="w-full rounded-full border border-border bg-card pl-10 pr-10 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/5"
          />
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-10 pb-16">
          {/* Left Column — Courses (2/3 width) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-foreground" />
              <h2 className="font-display text-lg font-bold text-foreground">
                Courses
              </h2>
              <span className="text-[10px] font-mono text-muted-foreground bg-foreground/5 border border-foreground/10 rounded-full px-2 py-0.5">
                {totalCourseCount}
              </span>
            </div>

            {filteredCategories.map((category) => (
              <section key={category.name}>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {category.name}
                  </h3>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {category.courses.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {category.courses.map((course) => (
                    <a
                      key={course.title}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:border-foreground/20 transition-all group"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                          {course.title}
                        </span>
                        <p className="mt-0.5 text-[10px] font-mono text-muted-foreground">
                          {course.provider}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.05em] ${difficultyColors[course.difficulty]}`}>
                            {course.difficulty}
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.05em] ${costColors[course.cost]}`}>
                            {course.cost}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-4" />
                    </a>
                  ))}
                </div>
              </section>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No courses match your search.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs font-bold text-foreground hover:text-accent transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Right Column — YouTube Channels (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Play className="h-4 w-4 text-foreground" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  YouTube (Hindi)
                </h2>
                <span className="text-[10px] font-mono text-muted-foreground bg-foreground/5 border border-foreground/10 rounded-full px-2 py-0.5">
                  {filteredChannels.length}
                </span>
              </div>

              <div className="space-y-2">
                {filteredChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-border bg-card px-4 py-3 hover:border-foreground/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {channel.name}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                    </div>

                    <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                      {channel.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex flex-wrap gap-1">
                        {channel.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-md bg-foreground/5 border border-foreground/10 px-1.5 py-0.5 text-[8px] font-semibold text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      {channel.subscriberCount && (
                        <span className="flex items-center gap-0.5 text-[9px] font-mono text-muted-foreground ml-auto">
                          <Users className="h-2.5 w-2.5" />
                          {channel.subscriberCount}
                        </span>
                      )}
                    </div>
                  </a>
                ))}

                {filteredChannels.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-xs text-muted-foreground">No channels match your search.</p>
                  </div>
                )}
              </div>

              {/* Footer count */}
              <div className="mt-6 pt-4 border-t border-border">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filteredChannels.length} channels · {totalCourseCount} courses
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
