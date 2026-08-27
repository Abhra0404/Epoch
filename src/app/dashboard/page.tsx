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
  Download,
  Plus
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "bookmarks" | "settings">("overview");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Profile Banner Header */}
        <section className="paper-card-elevated p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 border-2 border-accent text-accent font-display text-2xl font-bold">
                <User className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Your Dashboard
                  </h1>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Track your learning progress across subjects
                </p>
              </div>
            </div>

            {/* Streak Counter Widget */}
            <div className="flex items-center gap-3 rounded-[1.5rem] bg-secondary border border-border p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">0 Day Streak</div>
                <div className="text-[11px] text-muted-foreground">Start learning to build your streak</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Completed Topics</span>
              <div className="mt-1 text-2xl font-bold font-mono text-accent">0</div>
            </div>

            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Time Learned</span>
              <div className="mt-1 text-2xl font-bold font-mono text-foreground">0 hrs</div>
            </div>

            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Active Path</span>
              <div className="mt-1 text-xs font-bold text-muted-foreground">None selected</div>
            </div>

            <div className="paper-inner p-4 rounded-[1.5rem] border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Path Progress</span>
              <div className="mt-1 text-2xl font-bold font-mono text-muted-foreground">0%</div>
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
            Bookmarks
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
                  Browse Topics <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary border border-border mb-4">
                  <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground">No completed topics yet</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                  Start reading topics to track your progress here
                </p>
                <Link
                  href="/subjects/machine-learning"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold text-accent hover:bg-accent/20 transition-all"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Start Learning
                </Link>
              </div>
            </div>

            {/* Skill Domain Mastery Breakdown */}
            <div className="paper-card p-6 lg:col-span-5">
              <h3 className="font-display text-lg font-bold text-foreground pb-4 border-b border-border">
                Skill Mastery Matrix
              </h3>

              <div className="mt-8 flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary border border-border mb-4">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground">No skill data yet</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                  Complete topics to see your skill mastery breakdown
                </p>
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

            <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary border border-border mb-4">
                <Bookmark className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">No bookmarks yet</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                Bookmark topics and resources to save them for later
              </p>
              <Link
                href="/resources"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold text-accent hover:bg-accent/20 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                Browse Resources
              </Link>
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
                  placeholder="Enter your display name"
                  className="w-full rounded-full border border-border bg-secondary px-4 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Primary Learning Goal</label>
                <select className="w-full rounded-full border border-border bg-secondary px-4 py-2 text-xs text-foreground focus:border-accent focus:outline-none">
                  <option value="">Select a learning goal</option>
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
