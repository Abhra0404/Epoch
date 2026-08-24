import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  BookOpen, 
  Brain, 
  Calculator, 
  Cpu, 
  MessageSquareCode, 
  Eye, 
  ArrowRight, 
  Sparkles,
  FileCode,
  Database,
  Bot,
  Zap,
  Layers
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Hub | Epoch AI Platform",
  description: "Explore structured subject modules and topic guides across Machine Learning, Deep Learning, Mathematics, and MLOps.",
};

const subjectGroups = [
  {
    id: "foundations",
    title: "FOUNDATIONS",
    description: "Core prerequisites and fundamental concepts for AI/ML",
    icon: Layers,
    subjects: [
      {
        id: "python-libs",
        title: "Python & ML Tooling",
        description: "NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, and essential data science tooling.",
        icon: FileCode,
        badge: "8 Modules",
        status: "Available Now",
        slug: "/subjects/python-libraries",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "math",
        title: "Mathematics for ML",
        description: "Essential matrix calculus, linear transformations, probability distributions, and convex optimization.",
        icon: Calculator,
        badge: "6 Modules",
        status: "Active Notes",
        slug: "/subjects/machine-learning",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "ml",
        title: "Machine Learning Foundations",
        description: "Supervised & unsupervised learning algorithms, decision trees, loss functions, and optimization techniques.",
        icon: BookOpen,
        badge: "5 Active Topics",
        status: "Available Now",
        slug: "/subjects/machine-learning",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "data-eng",
        title: "Data & Feature Engineering",
        description: "ETL pipelines, feature stores, data validation, feature selection, and production data systems.",
        icon: Database,
        badge: "6 Modules",
        status: "In Curation",
        slug: "/subjects/data-engineering",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
    ],
  },
  {
    id: "deep-learning",
    title: "DEEP LEARNING",
    description: "Neural networks, architectures, and advanced modeling techniques",
    icon: Brain,
    subjects: [
      {
        id: "dl",
        title: "Deep Learning & Neural Networks",
        description: "Multilayer Perceptrons, backpropagation dynamics, loss surfaces, activations, PyTorch, and optimization.",
        icon: Brain,
        badge: "8 Modules",
        status: "In Curation",
        slug: "/subjects/machine-learning",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "nlp",
        title: "NLP & Transformer Models",
        description: "Self-attention mechanisms, tokenization, BERT, GPT architecture, LoRA, and preference alignment.",
        icon: MessageSquareCode,
        badge: "7 Modules",
        status: "Preview",
        slug: "/subjects/machine-learning",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "cv",
        title: "Computer Vision",
        description: "Convolutional neural networks, residual connections, ViT transformers, segmentation, and diffusion.",
        icon: Eye,
        badge: "6 Modules",
        status: "Preview",
        slug: "/subjects/machine-learning",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
    ],
  },
  {
    id: "ai-systems",
    title: "AI SYSTEMS",
    description: "Production deployment, autonomous agents, and operational ML",
    icon: Cpu,
    subjects: [
      {
        id: "gen-ai",
        title: "Generative AI",
        description: "Diffusion models, GANs, VAEs, LLMs, prompt engineering, RAG, and multimodal generation.",
        icon: Sparkles,
        badge: "7 Modules",
        status: "Active Notes",
        slug: "/subjects/generative-ai",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "agentic-ai",
        title: "Agentic AI",
        description: "Autonomous agents, tool use, planning, multi-agent systems, LangChain, and agent orchestration.",
        icon: Bot,
        badge: "5 Modules",
        status: "Preview",
        slug: "/subjects/agentic-ai",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
      {
        id: "mlops",
        title: "MLOps & Production Systems",
        description: "Containerization, feature stores, experiment tracking with MLflow, model monitoring, and deployment.",
        icon: Cpu,
        badge: "5 Modules",
        status: "Preview",
        slug: "/subjects/machine-learning",
        accent: "text-gray-900 bg-gray-900/10 border-gray-900/20",
      },
    ],
  },
];

export default function LearnPage() {

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto py-8">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-gray-900 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Curated Knowledge Base
          </div> */}
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Master AI & ML through structured subject modules.
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Every module combines intuitive mathematical derivations with clean Python implementations. Select a domain below to dive into the core notes.
          </p>
        </section>

        {subjectGroups.map((group) => (
          <section key={group.id} className="mt-16">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-900/20 bg-gray-900/5">
                <group.icon className="h-5 w-5 text-gray-900" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{group.title}</h2>
                <p className="text-xs text-muted-foreground">{group.description}</p>
              </div>
            </div>

            {/* Subject Cards Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.subjects.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="paper-card group relative flex flex-col justify-between p-6 transition-all hover:border-gray-900/40">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${cat.accent}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                          {cat.status}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-gray-900 transition-colors">
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
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 group-hover:translate-x-0.5 transition-transform"
                      >
                        Explore Domain
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
