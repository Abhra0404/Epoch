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
  ArrowRight,
  GraduationCap,
  Book,
  File,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

interface ResourceItem {
  id: string;
  title: string;
  author: string;
  category: "Courses" | "Books" | "Articles & Docs" | "Project Ideas";
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
    category: "Books",
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
    category: "Books",
    level: "Advanced",
    description: "Comprehensive textbook covering linear algebra, deep feedforward networks, optimization algorithms, and generative models.",
    tags: ["Deep Learning", "Optimization", "Neural Networks"],
    url: "https://www.deeplearningbook.org/",
    upvotes: 412,
    linkedTopicSlug: "loss-function-and-gradient-descent"
  },
  {
    id: "3",
    title: "The Elements of Statistical Learning",
    author: "Trevor Hastie, Robert Tibshirani, Jerome Friedman",
    category: "Books",
    level: "Advanced",
    description: "Rigorous statistical perspective on data mining, inference, lasso shrinkage, and ensemble trees.",
    tags: ["Statistics", "Lasso", "Random Forests"],
    url: "https://hastie.su.domains/ElemStatLearn/",
    upvotes: 215,
    linkedTopicSlug: "ridge-and-lasso-regularization"
  },
  {
    id: "4",
    title: "Stanford CS229: Machine Learning Lecture Series",
    author: "Andrew Ng (Stanford University)",
    category: "Courses",
    level: "Beginner",
    description: "World-famous lecture series covering supervised learning, SVMs, kernel methods, learning theory, and reinforcement learning.",
    tags: ["Supervised ML", "Stanford", "Lecture Series"],
    url: "https://cs229.stanford.edu/",
    upvotes: 580,
    linkedTopicSlug: "simple-linear-regression"
  },
  {
    id: "5",
    title: "Fast.ai: Practical Deep Learning for Coders",
    author: "Jeremy Howard & Rachel Thomas",
    category: "Courses",
    level: "Beginner",
    description: "Top-down hands-on course building state-of-the-art vision and NLP models using PyTorch & fastai library.",
    tags: ["Hands-on PyTorch", "Practical ML", "Vision"],
    url: "https://course.fast.ai/",
    upvotes: 389,
  },
  {
    id: "6",
    title: "MIT 6.S191: Intro to Deep Learning",
    author: "Alexander Amini & Ava Soleimany (MIT)",
    category: "Courses",
    level: "Beginner",
    description: "Fast-paced introduction to deep learning methods with applications to computer vision, NLP, and biology.",
    tags: ["Deep Learning", "MIT", "Introductory"],
    url: "http://introtodeeplearning.com/",
    upvotes: 267,
  },
  {
    id: "7",
    title: "Attention Is All You Need",
    author: "Ashish Vaswani et al. (Google Brain / Research)",
    category: "Articles & Docs",
    level: "Advanced",
    description: "Landmark 2017 research paper introducing the Transformer model based entirely on self-attention mechanisms.",
    tags: ["Transformers", "Attention", "NLP"],
    url: "https://arxiv.org/abs/1706.03762",
    upvotes: 620,
  },
  {
    id: "8",
    title: "PyTorch Documentation & Tutorials",
    author: "Meta AI & Open Source Contributors",
    category: "Articles & Docs",
    level: "Intermediate",
    description: "Official documentation, tutorials, and API references for PyTorch tensor computation and dynamic neural networks.",
    tags: ["PyTorch", "Documentation", "Tutorials"],
    url: "https://pytorch.org/tutorials/",
    upvotes: 295,
  },
  {
    id: "9",
    title: "Hugging Face Transformers Documentation",
    author: "Hugging Face Community",
    category: "Articles & Docs",
    level: "Intermediate",
    description: "Comprehensive guides for using pretrained models, tokenizers, and pipelines for NLP, vision, and audio tasks.",
    tags: ["Transformers", "LLMs", "Documentation"],
    url: "https://huggingface.co/docs/transformers/index",
    upvotes: 490,
  },
  {
    id: "10",
    title: "Build a Neural Network from Scratch",
    author: "Epoch AI Platform",
    category: "Project Ideas",
    level: "Beginner",
    description: "Implement a multilayer perceptron with backpropagation using only NumPy. Understand forward/backward pass mechanics.",
    tags: ["NumPy", "Backpropagation", "From Scratch"],
    url: "#",
    upvotes: 156,
    linkedTopicSlug: "logistic-regression-and-the-sigmoid-function"
  },
  {
    id: "11",
    title: "End-to-End House Price Prediction Pipeline",
    author: "Epoch AI Platform",
    category: "Project Ideas",
    level: "Intermediate",
    description: "Build a production-grade ML pipeline: data cleaning, feature engineering, model training, evaluation, and deployment.",
    tags: ["Scikit-learn", "Pipeline", "Deployment"],
    url: "#",
    upvotes: 234,
    linkedTopicSlug: "regression-evaluation"
  },
  {
    id: "12",
    title: "Fine-tune a Transformer for Text Classification",
    author: "Epoch AI Platform",
    category: "Project Ideas",
    level: "Advanced",
    description: "Use Hugging Face Transformers to fine-tune BERT/RoBERTa on a custom dataset with LoRA adapters.",
    tags: ["Transformers", "LoRA", "Fine-tuning"],
    url: "#",
    upvotes: 189,
    linkedTopicSlug: "loss-function-and-gradient-descent"
  },
  {
    id: "13",
    title: "Implement Decision Tree & Random Forest from Scratch",
    author: "Epoch AI Platform",
    category: "Project Ideas",
    level: "Intermediate",
    description: "Code Gini impurity, information gain, bootstrap sampling, and ensemble voting without using Scikit-learn.",
    tags: ["Decision Trees", "Ensemble", "From Scratch"],
    url: "#",
    upvotes: 178,
    linkedTopicSlug: "decision-tree-fundamentals"
  },
  {
    id: "14",
    title: "Reproduce 'Attention Is All You Need' in PyTorch",
    author: "Epoch AI Platform",
    category: "Project Ideas",
    level: "Advanced",
    description: "Build the Transformer architecture from the ground up: multi-head attention, positional encoding, and training loop.",
    tags: ["Transformers", "PyTorch", "Reproduction"],
    url: "#",
    upvotes: 312,
  },
];

const categoryConfig = {
  "Courses": { icon: GraduationCap, color: "text-gray-900", bg: "bg-gray-900/10", border: "border-gray-900/20" },
  "Books": { icon: Book, color: "text-gray-900", bg: "bg-gray-900/10", border: "border-gray-900/20" },
  "Articles & Docs": { icon: File, color: "text-gray-900", bg: "bg-gray-900/10", border: "border-gray-900/20" },
  "Project Ideas": { icon: Lightbulb, color: "text-gray-900", bg: "bg-gray-900/10", border: "border-gray-900/20" },
} as const;

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["1", "4"]);
  const [upvotedIds, setUpvotedIds] = useState<string[]>(["2", "7"]);

  const filteredResources = resources.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
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
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Curated AI & ML Resource Index
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            The best textbooks, university lecture series, landmark research papers, and hands-on project ideas curated for your learning path.
          </p>
        </section>

        {/* Filter Controls */}
        <section className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Courses", "Books", "Articles & Docs", "Project Ideas"].map((cat) => {
              const Icon = categoryConfig[cat as keyof typeof categoryConfig]?.icon || BookOpen;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all border ${
                    isSelected
                      ? "bg-gray-900/15 text-gray-900 border-gray-900/40 shadow-xs"
                      : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, authors..."
              className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
            const catConfig = categoryConfig[item.category];

            return (
              <div
                key={item.id}
                className="paper-card group flex flex-col justify-between p-6 transition-all hover:border-gray-900/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${catConfig.bg} ${catConfig.color} ${catConfig.border}`}>
                      <catConfig.icon className="h-3 w-3" />
                      {item.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleUpvote(item.id)}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border transition-all ${
                          isUpvoted
                            ? "bg-gray-900/15 text-gray-900 border-gray-900/30"
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
                            ? "bg-gray-900/15 text-gray-900 border-gray-900/30"
                            : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                        }`}
                        title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                      >
                        <Bookmark className="h-3.5 w-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-gray-900 transition-colors">
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
                      className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 hover:underline"
                    >
                      Linked Epoch Note
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : <div />} 

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-800 dark:text-white"
                  >
                    Open Resource
                    <ExternalLink className="h-3 w-3 text-gray-900" />
                  </a>
                </div>
              </div>
            );
          })}
        </section>
        
        {filteredResources.length === 0 && (
          <section className="mt-12 text-center py-12">
            <p className="text-muted-foreground">No resources found matching your criteria.</p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}