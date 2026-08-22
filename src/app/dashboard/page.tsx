"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  LayoutDashboard, 
  Flame, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  Bookmark, 
  Sliders, 
  User, 
  Settings, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Download
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "bookmarks" | "settings">("overview");

  const completedTopicsList = [
    { slug: "simple-linear-regression", title: "Simple Linear Regression", date: "2 days ago", readTime: "10 mins" },
    { slug: "multiple-linear-regression", title: "Multiple Linear Regression", date: "3 days ago", readTime: "15 mins" },
    { slug: "loss-function-and-gradient-descent", title: "Loss Function & Gradient Descent", date: "5 days ago", readTime: "15 mins" },
    { slug: "regression-evaluation", title: "Regression Model Evaluation", date: "Yesterday", readTime: "12 mins" },
  ];

  const bookmarkedItems = [
    { title: "Pattern Recognition and Machine Learning", author: "C. Bishop", type: "Textbook" },
    { title: "Attention Is All You Need", author: "Vaswani et al.", type: "Paper" },
    { title: "Ridge & Lasso Regularization", author: "Epoch Notes", type: "Note", slug: "ridge-and-lasso-regularization" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Profile Banner Header */}
        <section className="paper-card-elevated p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 border-2 border-accent text-accent font-display text-2xl font-bold">
                AM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Alex Mercer
                  </h1>
                  <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-0.5 text-xs font-bold text-accent">
                    Pro Learner
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  ML Engineering & Applied Math • Active since August 2026
                </p>
              </div>
            </div>

            {/* Streak Counter Widget */}
            <div className="flex items-center gap-3 rounded-[1.5rem] bg-secondary border border-border p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
                <Flame className="h-5 w-5 fill-current animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">7 Day Streak!</div>
                <div className="text-[11px] text-muted-foreground">Keep learning daily</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Completed Topics</span>
              <div className="mt-1 text-2xl font-bold font-mono text-accent">4 / 5</div>
            </div>

            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Time Learned</span>
              <div className="mt-1 text-2xl font-bold font-mono text-foreground">14.5 hrs</div>
            </div>

            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Active Path</span>
              <div className="mt-1 text-xs font-bold text-accent line-clamp-1">ML Engineer</div>
            </div>

            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Path Progress</span>
              <div className="mt-1 text-2xl font-bold font-mono text-emerald-500">62%</div>
            </div>
          </div>
        </section>

        {/* Dashboard Tabs */}
        <section className="mt-8 flex gap-3 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all border ${
              activeTab === "overview"
                ? "bg-accent/15 text-accent border-accent/40"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Learning Progress
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all border ${
              activeTab === "bookmarks"
                ? "bg-accent/15 text-accent border-accent/40"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Bookmark className="h-4 w-4" />
            Bookmarks ({bookmarkedItems.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all border ${
              activeTab === "settings"
                ? "bg-accent/15 text-accent border-accent/40"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            Profile Settings
          </button>
        </section>

        {/* Tab 1: Overview & Progress */}
        {activeTab === "overview" && (
          <section className="mt-6 grid gap-8 lg:grid-cols-12">
            {/* Completed Topics Timeline */}
            <div className="paper-card p-6 lg:col-span-7">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Completed Topics History
                </h3>
                <Link
                  href="/subjects/machine-learning"
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  Continue Reading <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {completedTopicsList.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/subjects/machine-learning/${item.slug}`}
                    className="flex items-center justify-between p-3.5 rounded-[1.5rem] border border-border bg-secondary hover:border-accent/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Completed {item.date} • {item.readTime}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Skill Domain Mastery Breakdown */}
            <div className="paper-card p-6 lg:col-span-5">
              <h3 className="font-display text-lg font-bold text-foreground pb-4 border-b border-border">
                Skill Mastery Matrix
              </h3>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Mathematics for ML</span>
                    <span className="text-accent font-mono">85%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Supervised Learning</span>
                    <span className="text-accent font-mono">70%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[70%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Deep Learning & Autograd</span>
                    <span className="text-accent font-mono">40%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[40%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">MLOps & Model Serving</span>
                    <span className="text-accent font-mono">30%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[30%]" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Bookmarks */}
        {activeTab === "bookmarks" && (
          <section className="mt-6 paper-card p-6">
            <h3 className="font-display text-lg font-bold text-foreground pb-4 border-b border-border">
              Saved Bookmarked Items
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {bookmarkedItems.map((item, idx) => (
                <div key={idx} className="paper-inner p-4 rounded-[1.5rem] border border-border flex flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                      {item.type}
                    </span>
                    <h4 className="mt-2 font-display text-sm font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.author}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex justify-end">
                    {item.slug ? (
                      <Link
                        href={`/subjects/machine-learning/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                      >
                        Open Note <ArrowRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <Link
                        href="/resources"
                        className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                      >
                        View in Index <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Settings */}
        {activeTab === "settings" && (
          <section className="mt-6 paper-card p-6 max-w-2xl">
            <h3 className="font-display text-lg font-bold text-foreground pb-4 border-b border-border">
              Account & Learning Preferences
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Display Name</label>
                <input
                  type="text"
                  defaultValue="Alex Mercer"
                  className="w-full rounded-full border border-border bg-secondary px-4 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Primary Learning Goal</label>
                <select className="w-full rounded-full border border-border bg-secondary px-4 py-2 text-xs text-foreground focus:border-accent focus:outline-none">
                  <option>Machine Learning Engineer</option>
                  <option>Deep Learning & GenAI Researcher</option>
                  <option>MLOps Systems Engineer</option>
                </select>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-foreground">Export Learning Data</div>
                  <div className="text-[11px] text-muted-foreground">Download your reading progress and bookmarks as JSON</div>
                </div>
                <button
                  onClick={() => alert("Downloading learning progress JSON...")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Data
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
