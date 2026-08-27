"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Library, 
  GraduationCap,
  Book,
  FileText,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { totalBookCount } from "@/lib/resources/books";
import { totalArticleCount } from "@/lib/resources/articles";
import { totalCourseCount } from "@/lib/resources/courses";

const categories = [
  {
    href: "/resources/courses",
    title: "Courses",
    description: "University lectures, online programs, and structured learning paths",
    icon: GraduationCap,
    count: totalCourseCount,
  },
  {
    href: "/resources/books",
    title: "Books",
    description: "Textbooks, reference materials, and comprehensive guides",
    icon: Book,
    count: totalBookCount,
  },
  {
    href: "/resources/articles",
    title: "Articles & Documentation",
    description: "Research papers, documentation, tutorials, and blog posts",
    icon: FileText,
    count: totalArticleCount,
  },
  {
    href: "/projects",
    title: "Project Ideas",
    description: "Hands-on projects to practice and apply what you've learned",
    icon: Lightbulb,
    count: 12,
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto py-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10">
              <Library className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Resource Library
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Curated resources organized by type to support your learning journey in AI and Machine Learning.
          </p>
        </section>

        {/* Category Cards */}
        <section className="mt-12 grid gap-5 sm:grid-cols-2 pb-16">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.href}
                href={category.href}
                className="paper-card group p-6 transition-all hover:border-foreground/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {category.title}
                      </h2>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {category.count} {category.count === 1 ? "resource" : "resources"}
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
