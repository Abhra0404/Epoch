import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllTopics } from "@/lib/topics";
import { 
  BookOpen, 
  Brain, 
  Calculator, 
  Cpu, 
  MessageSquareCode, 
  Eye, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Filter
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Hub | Epoch AI Platform",
  description: "Explore structured subject modules and topic guides across Machine Learning, Deep Learning, Mathematics, and MLOps.",
};

const subjectCategories = [
  {
    id: "ml",
    title: "Machine Learning Foundations",
    description: "Supervised & unsupervised learning algorithms, decision trees, loss functions, and optimization techniques.",
    icon: BookOpen,
    badge: "5 Active Topics",
    status: "Available Now",
    slug: "/subjects/machine-learning",
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "dl",
    title: "Deep Learning & Neural Networks",
    description: "Multilayer Perceptrons, backpropagation dynamics, loss surfaces, activations, PyTorch, and optimization.",
    icon: Brain,
    badge: "8 Modules",
    status: "In Curation",
    slug: "/subjects/machine-learning",
    accent: "text-accent bg-accent/10 border-accent/20",
  },
  {
    id: "math",
    title: "Mathematics for ML",
    description: "Essential matrix calculus, linear transformations, probability distributions, and convex optimization.",
    icon: Calculator,
    badge: "6 Modules",
    status: "Active Notes",
    slug: "/subjects/machine-learning",
    accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "mlops",
    title: "MLOps & Production Systems",
    description: "Containerization, feature stores, experiment tracking with MLflow, model monitoring, and deployment.",
    icon: Cpu,
    badge: "5 Modules",
    status: "Preview",
    slug: "/subjects/machine-learning",
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "nlp",
    title: "NLP & Transformer Models",
    description: "Self-attention mechanisms, tokenization, BERT, GPT architecture, LoRA, and preference alignment.",
    icon: MessageSquareCode,
    badge: "7 Modules",
    status: "Preview",
    slug: "/subjects/machine-learning",
    accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "cv",
    title: "Computer Vision & Spatial AI",
    description: "Convolutional neural networks, residual connections, ViT transformers, segmentation, and diffusion.",
    icon: Eye,
    badge: "6 Modules",
    status: "Preview",
    slug: "/subjects/machine-learning",
    accent: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
];

export default function LearnPage() {
  const topics = getAllTopics();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto py-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-accent shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Curated Knowledge Base
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Master AI & ML through structured subject modules.
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Every module combines intuitive mathematical derivations with clean Python implementations. Select a domain below to dive into the core notes.
          </p>
        </section>

        {/* Domain Cards Grid */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjectCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="paper-card group relative flex flex-col justify-between p-6 transition-all hover:border-accent/40">
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${cat.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                      {cat.status}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{cat.badge}</span>
                  <Link
                    href={cat.slug}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:translate-x-0.5 transition-transform"
                  >
                    Explore Domain
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* All Available Topics Catalog */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent">Topic Library</div>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Machine Learning Foundation Topics
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Readably explained with math formulas, step-by-step algorithms, and Python examples.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/subjects/machine-learning"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#34302D] dark:bg-card dark:text-foreground"
              >
                Open Reader View
                <ArrowRight className="h-3.5 w-3.5 text-accent" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, idx) => (
              <Link
                key={topic.slug}
                href={`/subjects/machine-learning/${topic.slug}`}
                className="paper-card group flex flex-col justify-between p-5 transition-all hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Module 01 • Step 0{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      topic.difficulty === "Beginner"
                        ? "bg-accent/10 text-accent border-accent/20"
                        : topic.difficulty === "Intermediate"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    <span className="font-semibold text-foreground/80">Prerequisites:</span> {topic.prerequisites}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {topic.readTime}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-accent group-hover:translate-x-1 transition-transform">
                    Start Topic
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
