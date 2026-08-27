"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, ChevronRight, Search, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { articleCategories, totalArticleCount } from "@/lib/resources/articles";

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = articleCategories
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) =>
          !searchQuery ||
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.articles.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-8">
          <Link href="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Articles & Docs</span>
        </nav>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles and documentation..."
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

        {/* Categories */}
        <div className="space-y-10 pb-16">
          {filteredCategories.map((category) => (
            <section key={category.name}>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-foreground" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {category.name}
                </h2>
                <span className="text-[10px] font-mono text-muted-foreground bg-foreground/5 border border-foreground/10 rounded-full px-2 py-0.5">
                  {category.articles.length}
                </span>
              </div>

              <div className="space-y-2">
                {category.articles.map((article) => (
                  <a
                    key={article.title}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:border-foreground/20 transition-all group"
                  >
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {article.title}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">
                        {article.description}
                      </p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-4" />
                  </a>
                ))}
              </div>
            </section>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No articles match your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-xs font-bold text-foreground hover:text-accent transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Footer count */}
        <div className="pb-10 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            {totalArticleCount} articles & docs
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
