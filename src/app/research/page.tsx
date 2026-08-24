"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  FileCode2, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  Sigma, 
  BookOpen, 
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";

interface PaperBreakdown {
  id: string;
  title: string;
  authors: string;
  year: number;
  conference: string;
  domain: "NLP & LLMs" | "Vision" | "Optimization" | "Alignment";
  plainEnglishSummary: string;
  coreInnovation: string;
  keyEquation: string;
  equationDescription: string;
  codeSnippet: string;
  keyTakeaway: string;
  arxivUrl: string;
}

const paperBreakdowns: PaperBreakdown[] = [
  {
    id: "transformer",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    year: 2017,
    conference: "NeurIPS 2017",
    domain: "NLP & LLMs",
    plainEnglishSummary: "Replaces sequential recurrent networks (RNNs) with parallel self-attention. Allows models to weigh relationships between all tokens simultaneously regardless of distance.",
    coreInnovation: "Scaled Dot-Product Self-Attention and Multi-Head Attention blocks.",
    keyEquation: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V",
    equationDescription: "Q (Queries), K (Keys), and V (Values) matrices computed via linear projections. Dividing by sqrt(d_k) prevents vanishing gradients in softmax.",
    codeSnippet: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attn_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attn_weights, V)`,
    keyTakeaway: "Enabled modern LLM architectures (BERT, GPT-4, Llama) by unlocking massive GPU parallelization.",
    arxivUrl: "https://arxiv.org/abs/1706.03762"
  },
  {
    id: "resnet",
    title: "Deep Residual Learning for Image Recognition",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
    year: 2015,
    conference: "CVPR 2016 (Best Paper)",
    domain: "Vision",
    plainEnglishSummary: "Solves the degradation problem where deeper networks performed worse than shallower ones due to vanishing gradients.",
    coreInnovation: "Identity shortcut connections that force layers to fit residual mapping F(x) = H(x) - x.",
    keyEquation: "y = F(x, \\{W_i\\}) + x",
    equationDescription: "x is the input tensor bypassed directly to output y, allowing gradients to flow unimpeded backwards during backprop.",
    codeSnippet: `import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.relu = nn.ReLU()
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)

    def forward(self, x):
        residual = x
        out = self.relu(self.conv1(x))
        out = self.conv2(out)
        out += residual  # Identity skip connection
        return self.relu(out)`,
    keyTakeaway: "Made it possible to train networks with 100+ to 1000+ layers smoothly.",
    arxivUrl: "https://arxiv.org/abs/1512.03385"
  },
  {
    id: "adam",
    title: "Adam: A Method for Stochastic Optimization",
    authors: "Diederik P. Kingma, Jimmy Ba",
    year: 2014,
    conference: "ICLR 2015",
    domain: "Optimization",
    plainEnglishSummary: "Combines the benefits of AdaGrad (frequent feature updates) and RMSProp (adapting to recent gradient magnitudes).",
    coreInnovation: "First (mean) and second (uncentered variance) moment estimates with bias-correction factors.",
    keyEquation: "m_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^2",
    equationDescription: "m_t tracks momentum direction, v_t scales step sizes inversely proportional to gradient variance.",
    codeSnippet: `# Adam weight update rule snippet
m_t = beta1 * m_prev + (1 - beta1) * grad
v_t = beta2 * v_prev + (1 - beta2) * (grad ** 2)

# Bias correction
m_hat = m_t / (1 - beta1 ** step)
v_hat = v_t / (1 - beta2 ** step)

weight = weight - lr * m_hat / (np.sqrt(v_hat) + eps)`,
    keyTakeaway: "De-facto default optimizer across almost all modern deep learning model training.",
    arxivUrl: "https://arxiv.org/abs/1412.0080"
  },
  {
    id: "lora",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen",
    year: 2021,
    conference: "ICLR 2022",
    domain: "Alignment",
    plainEnglishSummary: "Allows fine-tuning multi-billion parameter LLMs on a single GPU by freezing base weights and adding tiny low-rank matrix pairs.",
    coreInnovation: "Decomposing weight delta matrix ΔW into two low-rank matrices A and B of rank r << min(d, k).",
    keyEquation: "h = W_0 x + \\Delta W x = W_0 x + \\frac{\\alpha}{r} B A x",
    equationDescription: "W_0 stays frozen (d x k), A is (r x k) and B is (d x r). Trainable parameters drop by up to 10,000x.",
    codeSnippet: `import torch.nn as nn

class LoRALayer(nn.Module):
    def __init__(self, in_features, out_features, rank=8, alpha=16):
        super().__init__()
        self.lora_A = nn.Parameter(torch.randn(rank, in_features) * 0.01)
        self.lora_B = nn.Parameter(torch.zeros(out_features, rank))
        self.scaling = alpha / rank

    def forward(self, x):
        # (batch, rank) x (rank, in) = (batch, out)
        return (x @ self.lora_A.T @ self.lora_B.T) * self.scaling`,
    keyTakeaway: "Made consumer-GPU LLM fine-tuning accessible to individual developers worldwide.",
    arxivUrl: "https://arxiv.org/abs/2106.09685"
  }
];

export default function ResearchPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string>("transformer");

  const filteredPapers = paperBreakdowns.filter(
    (p) => selectedDomain === "All" || p.domain === selectedDomain
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto py-6">
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Seminal Papers Readably Explained
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Deconstruct breakthrough AI research papers into plain English intuition, mathematical equations, and minimal PyTorch code implementations.
          </p>
        </section>

        {/* Domain Filters */}
        <section className="mt-6 flex flex-wrap justify-center gap-3">
          {["All", "NLP & LLMs", "Vision", "Optimization", "Alignment"].map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all border ${
                selectedDomain === domain
                  ? "bg-accent/15 text-accent border-accent/40 shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              }`}
            >
              {domain}
            </button>
          ))}
        </section>

        {/* Papers Breakdown Cards */}
        <section className="mt-10 space-y-6">
          {filteredPapers.map((paper) => {
            const isExpanded = expandedId === paper.id;

            return (
              <div
                key={paper.id}
                className="paper-card p-6 transition-all hover:border-accent/40"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-0.5 text-[11px] font-bold text-accent">
                        {paper.domain}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {paper.conference} ({paper.year})
                      </span>
                    </div>

                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
                      {paper.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      {paper.authors}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={paper.arxivUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                    >
                      ArXiv PDF
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      onClick={() => setExpandedId(isExpanded ? "" : paper.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Always-Visible Summary */}
                <div className="mt-4">
                  <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                    <span className="text-accent font-bold">Plain English Summary:</span> {paper.plainEnglishSummary}
                  </p>
                </div>

                {/* Expanded Deep-Dive Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-border space-y-6 animate-in fade-in duration-200">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Core Innovation & Takeaway */}
                      <div className="paper-inner p-5 rounded-[1.5rem] border border-border space-y-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" /> Core Architectural Innovation
                          </div>
                          <p className="mt-1 text-xs text-foreground font-semibold">
                            {paper.coreInnovation}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-border">
                          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Practical Takeaway
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {paper.keyTakeaway}
                          </p>
                        </div>
                      </div>

                      {/* Key Mathematical Formula */}
                      <div className="paper-inner p-5 rounded-[1.5rem] border border-border space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                          <Sigma className="h-3.5 w-3.5" /> Key Mathematical Equation
                        </div>
                        <div className="bg-card p-3 rounded-xl border border-border text-center overflow-x-auto">
                          <code className="font-mono text-sm font-bold text-accent">
                            {paper.keyEquation}
                          </code>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {paper.equationDescription}
                        </p>
                      </div>
                    </div>

                    {/* Python/PyTorch Minimal Code Implementation */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Code2 className="h-3.5 w-3.5 text-accent" /> Minimal PyTorch Implementation
                      </div>
                      <pre className="p-4 rounded-2xl bg-secondary text-xs font-mono border border-border overflow-x-auto text-foreground">
                        <code>{paper.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
