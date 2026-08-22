"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Library, 
  BookOpen, 
  Video, 
  FileText, 
  Code2, 
  ExternalLink, 
  Search, 
  Sparkles, 
  ThumbsUp, 
  Bookmark, 
  Check, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

interface ResourceItem {
  id: string;
  title: string;
  author: string;
  type: "Textbook" | "Course" | "Paper" | "Repository";
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  tags: string[];
  url: string;
  upvotes: number;
  linkedTopicSlug?: string;
}

const resources: ResourceItem[] = [
  {
    id: "1",
    title: "Pattern Recognition and Machine Learning",
    author: "Christopher M. Bishop (Microsoft Research)",
    type: "Textbook",
    level: "Intermediate",
    description: "The definitive reference text on Bayesian pattern recognition, linear classification, and graphical models.",
    tags: ["Bayesian ML", "Linear Models", "Probabilistic ML"],
    url: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-PRML-sample.pdf",
    upvotes: 342,
    linkedTopicSlug: "multiple-linear-regression"
  },
  {
    id: "2",
    title: "Deep Learning (The MIT Press)",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    type: "Textbook",
    level: "Advanced",
    description: "Comprehensive textbook covering linear algebra, deep feedforward networks, optimization algorithms, and generative models.",
    tags: ["Deep Learning", "Optimization", "Neural Networks"],
    url: "https://www.deeplearningbook.org/",
    upvotes: 412,
    linkedTopicSlug: "loss-function-and-gradient-descent"
  },
  {
    id: "3",
    title: "Stanford CS229: Machine Learning Lecture Series",
    author: "Andrew Ng (Stanford University)",
    type: "Course",
    level: "Beginner",
    description: "World-famous lecture series covering supervised learning, SVMs, kernel methods, learning theory, and reinforcement learning.",
    tags: ["Supervised ML", "Stanford", "Lecture Series"],
    url: "https://cs229.stanford.edu/",
    upvotes: 580,
    linkedTopicSlug: "simple-linear-regression"
  },
  {
    id: "4",
    title: "Attention Is All You Need",
    author: "Ashish Vaswani et al. (Google Brain / Research)",
    type: "Paper",
    level: "Advanced",
    description: "Landmark 2017 research paper introducing the Transformer model based entirely on self-attention mechanisms.",
    tags: ["Transformers", "Attention", "NLP"],
    url: "https://arxiv.org/abs/1706.03762",
    upvotes: 620,
  },
  {
    id: "5",
    title: "PyTorch Core Engine & Tutorials",
    author: "Meta AI & Open Source Contributors",
    type: "Repository",
    level: "Intermediate",
    description: "Official GitHub repository for PyTorch tensor computation and dynamic neural networks with strong GPU acceleration.",
    tags: ["PyTorch", "Python", "GPU Tensors"],
    url: "https://github.com/pytorch/pytorch",
    upvotes: 295,
  },
  {
    id: "6",
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie, Robert Tibshirani, Jerome Friedman",
    type: "Textbook",
    level: "Advanced",
    description: "Rigorous statistical perspective on data mining, inference, lasso shrinkage, and ensemble trees.",
    tags: ["Statistics", "Lasso", "Random Forests"],
    url: "https://hastie.su.domains/ElemStatLearn/",
    upvotes: 215,
    linkedTopicSlug: "ridge-and-lasso-regularization"
  },
  {
    id: "7",
    title: "Fast.ai: Practical Deep Learning for Coders",
    author: "Jeremy Howard & Rachel Thomas",
    type: "Course",
    level: "Beginner",
    description: "Top-down hands-on course building state-of-the-art vision and NLP models using PyTorch & fastai library.",
    tags: ["Hands-on PyTorch", "Practical ML", "Vision"],
    url: "https://course.fast.ai/",
    upvotes: 389,
  },
  {
    id: "8",
    title: "Hugging Face Transformers Library",
    author: "Hugging Face Community",
    type: "Repository",
    level: "Intermediate",
    description: "State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX with thousands of pretrained models.",
    tags: ["LLMs", "Pretrained Models", "Open Source"],
    url: "https://github.com/huggingface/transformers",
    upvotes: 490,
  }
];

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["1", "3"]);
  const [upvotedIds, setUpvotedIds] = useState<string[]>(["2"]);

  const filteredResources = resources.filter((item) => {
    const matchesType = selectedType === "All" || item.type === selectedType;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesQuery;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleUpvote = (id: string) => {
    setUpvotedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-accent shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Vetted External Resources
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Curated AI & ML Resource Index
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            The best textbooks, university lecture series, landmark research papers, and open-source repositories curated for your learning path.
          </p>
        </section>

        {/* Filter Controls */}
        <section className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Textbook", "Course", "Paper", "Repository"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all border ${
                  selectedType === type
                    ? "bg-accent/15 text-accent border-accent/40 shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, authors..."
              className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </section>

        {/* Resources Grid */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {filteredResources.map((item) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            const isUpvoted = upvotedIds.includes(item.id);
            const displayUpvotes = item.upvotes + (isUpvoted ? 1 : 0);

            return (
              <div
                key={item.id}
                className="paper-card group flex flex-col justify-between p-6 transition-all hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      item.type === "Textbook"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : item.type === "Course"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : item.type === "Paper"
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}>
                      {item.type}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleUpvote(item.id)}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border transition-all ${
                          isUpvoted
                            ? "bg-accent/15 text-accent border-accent/30"
                            : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {displayUpvotes}
                      </button>

                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`p-1.5 rounded-full border transition-all ${
                          isBookmarked
                            ? "bg-accent/15 text-accent border-accent/30"
                            : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                        }`}
                        title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                      >
                        <Bookmark className="h-3.5 w-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    by {item.author}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  {item.linkedTopicSlug ? (
                    <Link
                      href={`/subjects/machine-learning/${item.linkedTopicSlug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                    >
                      Linked Epoch Note
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : <div />}

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#34302D] dark:bg-card dark:text-foreground"
                  >
                    Open Resource
                    <ExternalLink className="h-3 w-3 text-accent" />
                  </a>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
