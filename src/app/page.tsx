import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Play,
  Library,
  FileCode2,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Zap,
  Route,
  Sigma,
  FileText,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";
import { getAllTopics } from "@/lib/topics";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroVisual } from "@/components/ui/hero-visual";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Epoch — AI & ML Learning Platform",
  description:
    "The structured path through Machine Learning, Deep Learning, Mathematics, and MLOps. Math-aware notes, visual roadmaps, interactive playgrounds, and landmark research explained.",
};

const platformFeatures = [
  {
    label: "Learn",
    title: "Structured subject modules",
    desc: "Six domain areas — ML, Deep Learning, Math, MLOps, NLP, and Vision — with difficulty-graded topic libraries.",
    icon: BookOpen,
    href: "/learn",
    color: "text-stone-900 dark:text-stone-100",
  },
  {
    label: "Roadmaps",
    title: "Sequential career paths",
    desc: "DAG-based skill flows from first principles to production. Toggle milestones as you go.",
    icon: Compass,
    href: "/roadmaps",
    color: "text-stone-900 dark:text-stone-100",
  },
  {
    label: "Playground",
    title: "Interactive ML simulators",
    desc: "Tune learning rates, regularization strength, and class distributions live in the browser.",
    icon: Play,
    href: "/playground",
    color: "text-stone-900 dark:text-stone-100",
  },
  {
    label: "Resources",
    title: "Vetted external index",
    desc: "Bishop, Goodfellow, Stanford CS229, fast.ai, PyTorch and more — rated, tagged, and bookmarkable.",
    icon: Library,
    href: "/resources",
    color: "text-stone-900 dark:text-stone-100",
  },
  {
    label: "Research",
    title: "Seminal papers decoded",
    desc: "Transformers, ResNet, Adam, LoRA. Plain-English intuition + KaTeX equations + minimal PyTorch.",
    icon: FileCode2,
    href: "/research",
    color: "text-stone-900 dark:text-stone-100",
  },
  {
    label: "Dashboard",
    title: "Track your progress",
    desc: "Streaks, skill mastery bars, completed topics, and saved resources all in one place.",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-stone-900 dark:text-stone-100",
  },
];

const methodCards = [
  {
    title: "Prerequisites first",
    description:
      "Every note opens with the concepts you need to know, eliminating dead ends before they happen.",
    icon: Route,
  },
  {
    title: "Math with worked examples",
    description:
      "Definitions, notation, and hand-solvable calculations are kept side-by-side so formulas stay grounded.",
    icon: Sigma,
  },
  {
    title: "Reader-ready structure",
    description:
      "Topics split into searchable sections: outcomes, prerequisites, derivations, examples, and code notes.",
    icon: FileText,
  },
];

const stats = [
  { value: "19+", label: "Topics in library" },
  { value: "4", label: "Career roadmaps" },
  { value: "3", label: "Interactive simulators" },
  { value: "5+", label: "Papers explained" },
];

const testimonials = [
  {
    quote:
      "Finally a resource that shows you the gradient derivation and the NumPy code on the same page. I stopped tab-hopping.",
    name: "Priya S.",
    role: "ML Engineer @ Startup",
  },
  {
    quote:
      "The roadmaps are opinionated in the best way. They told me exactly what to learn next when I had no idea.",
    name: "Luca M.",
    role: "PhD Student, Applied Math",
  },
  {
    quote:
      "Gradient descent playground is insane — you really feel the difference between 0.01 and 0.9 learning rate.",
    name: "Aisha K.",
    role: "Data Scientist",
  },
];

export default function Home() {
  const topics = getAllTopics();
  const featuredTopics = topics.slice(0, 5);
  const beginnerCount = topics.filter((t) => t.difficulty === "Beginner").length;
  const intermediateCount = topics.filter((t) => t.difficulty === "Intermediate").length;
  const advancedCount = topics.filter((t) => t.difficulty === "Advanced").length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="mx-auto flex min-h-[calc(100svh-9rem)] max-w-7xl items-center px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 xl:gap-24">

          {/* ── Left column: copy ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex w-fit items-center gap-3 border-l-2 border-foreground pl-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              A clearer path through AI & ML
            </div>

            {/* Headline */}
            <h1 className="mt-7 font-display text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight leading-[1.08] text-foreground">
              From First Principles <br /> to Frontier AI.
              <br />
              <span className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-muted-foreground font-normal">
                Go Beyond the Black Box.
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="mt-6 max-w-xl text-base sm:text-[1.0625rem] leading-relaxed text-muted-foreground">
              Epoch connects mathematical derivations to working code, wraps them
              in opinionated career roadmaps, and gives you interactive
              playgrounds to build real intuition — not just familiarity.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-stone-800 px-7 py-3.5 text-sm font-bold text-stone-50 transition-opacity hover:opacity-80 dark:bg-stone-200 dark:text-stone-900"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/roadmaps"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
              >
                View Roadmaps
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-6 text-xs text-muted-foreground">
              Free to use · No sign-up required to read notes
            </p>
          </div>

          {/* ── Right column: neural network visual ── */}
          <div className="w-full">
            <HeroVisual />
          </div>

        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold tracking-tight">{value}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 PLATFORM ENVIRONMENTS ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Platform Suite
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Six environments, one coherent system.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Each environment is designed to reinforce the others — read a note,
            run it in the playground, follow the roadmap, check the research.
          </p>
        </div>

        <div className="grid gap-px border border-border rounded-[2rem] overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-3">
          {platformFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.label}
                href={feat.href}
                className="group relative bg-card p-7 transition-colors hover:bg-secondary flex flex-col justify-between min-h-52"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {feat.title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold tracking-tight">
                    {feat.label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── METHOD SECTION ───────────────────────────────────────── */}
      <section className="paper-feature-section py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="paper-feature-inner p-8 sm:p-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Study Method
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  Built for reading,
                  <br />
                  not skimming.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Machine learning tutorials often throw equations at you without
                  context, or code without theory. Epoch forces both to live
                  together — every topic follows the same principled structure.
                </p>
                <Link
                  href="/subjects/machine-learning"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-800 px-6 py-3 text-xs font-bold text-stone-50 hover:opacity-80 transition-opacity dark:bg-stone-200 dark:text-stone-900"
                >
                  Read a sample note
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {methodCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="paper-card p-5 flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold tracking-tight">
                          {i + 1}. {card.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-700 bg-stone-800 px-8 sm:px-14 py-14 sm:py-20 text-center shadow-lg">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Ready to start?
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-stone-50 leading-tight">
              Learn ML the way it
              <br />
              was meant to be learned.
            </h2>
            <p className="mt-5 text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              Start with simple linear regression or jump into transformers. The
              platform meets you where you are.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Explore Learn Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/roadmaps"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-7 py-3.5 text-sm font-bold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Pick a Roadmap
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
