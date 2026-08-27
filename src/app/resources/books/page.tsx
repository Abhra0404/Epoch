"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Book, 
  Search, 
  X,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { booksBySubcategory } from "@/lib/resources/books";

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBooksBySubcategory = Object.entries(booksBySubcategory).reduce(
    (acc, [subcategory, books]) => {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[subcategory] = filtered;
      }
      return acc;
    },
    {} as Record<string, typeof booksBySubcategory[string]>
  );

  const filteredCount = Object.values(filteredBooksBySubcategory).reduce(
    (sum, books) => sum + books.length,
    0
  );

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
          <span className="text-foreground font-semibold">Books</span>
        </nav>

        {/* Search */}
        <section className="mt-2 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title, author, or category..."
              className="w-full rounded-full border border-border bg-card pl-10 pr-10 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        {/* Search Results Count */}
        {searchQuery && (
          <section className="mt-4 text-center">
            <span className="text-xs font-semibold text-muted-foreground">
              {filteredCount} {filteredCount === 1 ? "book" : "books"} found
            </span>
          </section>
        )}

        {/* Book List */}
        <section className="mt-8 pb-16">
          {Object.entries(filteredBooksBySubcategory).map(([subcategory, books]) => (
            <div key={subcategory} className="mb-10">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 border border-foreground/10">
                  <Book className="h-4 w-4 text-foreground" />
                </div>
                <h2 className="text-base font-bold text-foreground">{subcategory}</h2>
                <span className="text-[11px] font-semibold text-muted-foreground bg-secondary border border-border rounded-full px-2 py-0.5">
                  {books.length}
                </span>
              </div>

              {/* Books List */}
              <div className="space-y-2 ml-11">
                {books.map((book, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 py-3 px-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-xs font-mono text-muted-foreground mt-0.5 shrink-0 w-5 text-right">
                      {idx + 1}.
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {book.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(filteredBooksBySubcategory).length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 mb-4">
                <Book className="h-8 w-8 text-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                No books match your search
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different search term
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
