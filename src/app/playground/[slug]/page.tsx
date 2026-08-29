"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ChevronLeft,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Code2,
  MessageSquare,
  Compass,
  Lightbulb,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getExperimentBySlug } from "@/lib/playground/data";
import { experimentComponents } from "@/components/playground";

const difficultyColor: Record<string, string> = {
  Beginner: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-rose-600 dark:text-rose-400",
};

const codeSnippets: Record<string, { language: string; code: string; explanation: string }> = {
  "gradient-descent": {
    language: "Python / NumPy",
    explanation: "A minimal gradient descent loop that iteratively adjusts weights to minimize a quadratic loss function.",
    code: `import numpy as np

def gradient_descent(lr=0.1, steps=50, w_init=-2.5):
    w = w_init
    history = []

    for t in range(steps):
        loss = (w - 3)**2 + 1       # f(w) = (w-3)^2 + 1
        grad = 2 * (w - 3)           # f'(w) = 2(w-3)
        w = w - lr * grad             # w_{t+1} = w_t - α·∇f
        history.append((t, w, loss, grad))

    return history

# Try different learning rates:
# lr=0.01 → slow convergence
# lr=0.1  → steady convergence
# lr=0.9  → may overshoot / diverge
history = gradient_descent(lr=0.1)
print(f"Final w: {history[-1][1]:.4f}, Loss: {history[-1][2]:.4f}")`,
  },
  "linear-regression": {
    language: "Python / NumPy",
    explanation: "Ordinary least squares regression using the normal equation to find optimal slope and intercept.",
    code: `import numpy as np

# Data
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
y = np.array([2.1, 3.9, 5.8, 8.3, 10.1, 11.7, 14.2, 15.8, 17.9, 20.3])

# Normal equation: θ = (X^T X)^{-1} X^T y
X_b = np.c_[np.ones(len(X)), X]       # Add bias column
theta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y

slope, intercept = theta[1], theta[0]
print(f"y = {slope:.4f}x + {intercept:.4f}")

# Mean Squared Error
predictions = slope * X + intercept
mse = np.mean((y - predictions) ** 2)
print(f"MSE: {mse:.4f}")`,
  },
  "k-means-clustering": {
    language: "Python / NumPy",
    explanation: "K-Means iteratively assigns points to nearest centroids and recomputes centroids until convergence.",
    code: `import numpy as np

def kmeans(X, k=3, max_iters=50):
    n = len(X)
    # Random initialization
    centroids = X[np.random.choice(n, k, replace=False)]

    for _ in range(max_iters):
        # Assign each point to nearest centroid
        distances = np.linalg.norm(X[:, None] - centroids, axis=2)
        labels = np.argmin(distances, axis=1)

        # Update centroids
        new_centroids = np.array([
            X[labels == i].mean(axis=0) if (labels == i).any() else centroids[i]
            for i in range(k)
        ])

        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids

    return labels, centroids

# Generate sample data
X = np.random.randn(60, 2) * 2
labels, centroids = kmeans(X, k=3)
print(f"Converged: {len(centroids)} clusters")`,
  },
  "neural-network": {
    language: "Python / NumPy",
    explanation: "A minimal two-layer neural network with forward pass, backpropagation, and ReLU activation.",
    code: `import numpy as np

def relu(z):
    return np.maximum(0, z)

def relu_derivative(z):
    return (z > 0).astype(float)

# Network: 2 inputs → 4 hidden → 1 output
np.random.seed(42)
W1 = np.random.randn(2, 4) * 0.5
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1) * 0.5
b2 = np.zeros((1, 1))

lr = 0.01
for epoch in range(1000):
    # Forward
    z1 = X @ W1 + b1
    a1 = relu(z1)
    z2 = a1 @ W2 + b2
    loss = np.mean((z2 - y) ** 2)

    # Backward
    dz2 = 2 * (z2 - y) / len(y)
    dW2 = a1.T @ dz2
    db2 = dz2.sum(axis=0, keepdims=True)
    da1 = dz2 @ W2.T
    dz1 = da1 * relu_derivative(z1)
    dW1 = X.T @ dz1
    db1 = dz1.sum(axis=0, keepdims=True)

    # Update
    W2 -= lr * dW2
    W1 -= lr * dW1`,
  },
  "regularization": {
    language: "Python / NumPy",
    explanation: "L1 and L2 regularization add penalty terms to the loss function, shrinking weights toward zero.",
    code: `import numpy as np

weights = np.array([4.5, -3.2, 0.8, -0.4, 2.1, -1.7, 0.3, -2.9])

def l1_shrinkage(w, lam):
    """L1 (Lasso): soft thresholding → sparse solutions."""
    return np.sign(w) * np.maximum(0, np.abs(w) - lam * 0.5)

def l2_shrinkage(w, lam):
    """L2 (Ridge): smooth shrinkage → dense solutions."""
    return w / (1 + lam * 0.5)

lam = 2.0
print("Original:", weights.round(2))
print("L1:", l1_shrinkage(weights, lam).round(2))  # Some become 0
print("L2:", l2_shrinkage(weights, lam).round(2))  # All shrunk

# L1 sets 3 of 8 weights to exactly zero → feature selection
# L2 shrinks all weights proportionally → no feature selection`,
  },
  "decision-boundary": {
    language: "Python / scikit-learn",
    explanation: "Different classifiers produce different decision boundaries — compare linear vs non-linear approaches.",
    code: `from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# Sample data
X = np.array([[25,30],[35,20],[20,40],[30,35],[15,25],[40,30],
              [70,60],[80,70],[65,75],[75,55],[85,65],[60,80]])
y = np.array([0,0,0,0,0,0,1,1,1,1,1,1])

# Three classifiers, three boundaries
models = {
    "Logistic Regression": LogisticRegression(),
    "Linear SVM": SVC(kernel="linear"),
    "k-NN (k=3)": KNeighborsClassifier(n_neighbors=3),
}

for name, model in models.items():
    model.fit(X, y)
    accuracy = model.score(X, y)
    print(f"{name}: accuracy = {accuracy:.2f}")`,
  },
  "attention-mechanism": {
    language: "Python / NumPy",
    explanation: "Scaled dot-product attention: Q, K, V matrices interact via softmax(QK^T / √d) @ V.",
    code: `import numpy as np

def scaled_dot_product_attention(Q, K, V):
    d_k = Q.shape[-1]
    # Compute attention scores
    scores = Q @ K.T / np.sqrt(d_k)
    # Apply softmax
    weights = np.exp(scores) / np.exp(scores).sum(axis=-1, keepdims=True)
    # Weighted sum of values
    return weights @ V, weights

# Example: 4 tokens, 3-dimensional embeddings
tokens = ["The", "cat", "sat", "on"]
np.random.seed(42)
Q = np.random.randn(4, 3)  # Queries
K = np.random.randn(4, 3)  # Keys
V = np.random.randn(4, 3)  # Values

output, weights = scaled_dot_product_attention(Q, K, V)
print("Attention weights (row = attending token):")
print(np.round(weights, 3))`,
  },
  "convolutional-filter": {
    language: "Python / NumPy",
    explanation: "A 3×3 convolution slides a kernel across an image, computing a weighted sum at each position.",
    code: `import numpy as np

def convolve2d(image, kernel):
    h, w = image.shape
    kh, kw = kernel.shape
    out_h, out_w = h - kh + 1, w - kw + 1
    output = np.zeros((out_h, out_w))

    for i in range(out_h):
        for j in range(out_w):
            patch = image[i:i+kh, j:j+kw]
            output[i, j] = np.sum(patch * kernel)

    return output

# Common kernels
kernels = {
    "edge_horizontal": np.array([[1, 0, -1],
                                  [1, 0, -1],
                                  [1, 0, -1]]),
    "sharpen":         np.array([[ 0, -1,  0],
                                  [-1,  5, -1],
                                  [ 0, -1,  0]]),
    "blur":            np.ones((3, 3)) / 9,
}

image = np.random.rand(8, 8)  # 8x8 grayscale
for name, kernel in kernels.items():
    result = convolve2d(image, kernel)
    print(f"{name}: output shape {result.shape}")`,
  },
  "gan-training": {
    language: "Python / PyTorch (conceptual)",
    explanation: "A GAN alternates between training a generator to fool the discriminator and a discriminator to detect fakes.",
    code: `import torch
import torch.nn as nn

# Generator: noise → fake sample
class Generator(nn.Module):
    def __init__(self, noise_dim=8, out_dim=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(noise_dim, 16),
            nn.ReLU(),
            nn.Linear(16, out_dim),
        )
    def forward(self, z):
        return self.net(z)

# Discriminator: sample → real/fake score
class Discriminator(nn.Module):
    def __init__(self, in_dim=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, 16),
            nn.ReLU(),
            nn.Linear(16, 1),
            nn.Sigmoid(),
        )
    def forward(self, x):
        return self.net(x)

# Training loop (simplified)
G = Generator()
D = Discriminator()
opt_G = torch.optim.Adam(G.parameters(), lr=0.001)
opt_D = torch.optim.Adam(D.parameters(), lr=0.0005)
bce = nn.BCELoss()

for step in range(1000):
    z = torch.randn(32, 8)
    fake = G(z)
    # Train D
    real = torch.randn(32, 2)
    loss_D = bce(D(real), torch.ones(32,1)) + bce(D(fake.detach()), torch.zeros(32,1))
    opt_D.zero_grad(); loss_D.backward(); opt_D.step()
    # Train G
    loss_G = bce(D(fake), torch.ones(32,1))
    opt_G.zero_grad(); loss_G.backward(); opt_G.step()`,
  },
  "word-embeddings": {
    language: "Python / Gensim",
    explanation: "Word2Vec learns dense vectors where semantic relationships become linear operations in vector space.",
    code: `from gensim.models import Word2Vec
import numpy as np

# Training data
sentences = [
    ["the", "king", "sat", "on", "the", "throne"],
    ["the", "queen", "sat", "on", "the", "throne"],
    ["the", "man", "worked", "in", "the", "office"],
    ["the", "woman", "worked", "in", "the", "office"],
    # ... more sentences
]

model = Word2Vec(sentences, vector_size=100, window=5, min_count=1)

# Find similar words
print(model.wv.most_similar("king", topn=3))

# Classic analogy: king - man + woman ≈ queen
result = model.wv.most_similar(
    positive=["king", "woman"],
    negative=["man"]
)
print(f"king - man + woman = {result[0][0]}")

# Inspect vector
print(f"Vector dimension: {model.wv['king'].shape}")`,
  },
};

export default function PlaygroundDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-bold">Experiment not found</h1>
          <Link
            href="/playground"
            className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Playground
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const ExperimentComponent = experimentComponents[slug];
  const codeData = codeSnippets[slug];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/playground" className="hover:text-foreground transition-colors">
            Playground
          </Link>
          <ChevronLeft className="h-3 w-3 rotate-180" />
          <span className="text-foreground font-semibold truncate max-w-[200px]">
            {experiment.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
              {experiment.category}
            </span>
            <span className={`rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${difficultyColor[experiment.difficulty]}`}>
              {experiment.difficulty}
            </span>
            <span className="rounded-full bg-foreground/5 border border-foreground/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {experiment.duration}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {experiment.title}
          </h1>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-2xl">
            Interactive ML Experiment
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-foreground/5 border border-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Interactive Experiment */}
        <section className="py-10">
          <div className="flex items-center gap-2 mb-6">
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-bold text-foreground">Experiment</h2>
          </div>
          {ExperimentComponent && <ExperimentComponent />}
        </section>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Understand Section */}
        <section className="py-10">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-bold text-foreground">Understand</h2>
          </div>
          <div className="paper-card p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {experiment.longDescription}
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href={experiment.learnHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {experiment.learnLabel}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Code Section */}
        {codeData && (
          <>
            <div className="h-px bg-border" />
            <section className="py-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-base font-bold text-foreground">Code</h2>
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary border border-border rounded-md px-2 py-0.5">
                    {codeData.language}
                  </span>
                </div>
                <CopyButton code={codeData.code} />
              </div>

              <div className="paper-card overflow-hidden">
                <p className="px-6 pt-4 text-xs text-muted-foreground leading-relaxed">
                  {codeData.explanation}
                </p>
                <div className="mt-3 bg-secondary border-t border-border p-6 overflow-x-auto">
                  <pre className="text-xs font-mono text-foreground leading-relaxed whitespace-pre">
                    {codeData.code}
                  </pre>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Experiment Further */}
        <section className="py-10">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-bold text-foreground">What did you learn?</h2>
          </div>
          <div className="paper-card p-6">
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li className="flex gap-2">
                <span className="text-accent mt-0.5">→</span>
                <span>What happens when you change the learning rate / key parameter to extremes?</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent mt-0.5">→</span>
                <span>How does the algorithm behave with very few or very many data points?</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent mt-0.5">→</span>
                <span>Which parameter has the biggest impact on the outcome? Why?</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Epoch Connections */}
        <section className="py-10 pb-16">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-bold text-foreground">Continue with Epoch</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { label: "Learn", desc: "Read the notes", href: experiment.learnHref, icon: BookOpen },
              { label: "Practice", desc: "This playground", href: `/playground/${slug}`, icon: FlaskConical },
              { label: "Interview", desc: "Practice questions", href: "/learn", icon: MessageSquare },
              { label: "Build", desc: "Try a project", href: "/projects", icon: Code2 },
              { label: "Research", desc: "Read the paper", href: "/research", icon: Compass },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="paper-card p-4 group hover:border-foreground/20 transition-all text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-secondary mx-auto">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-emerald-500" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy
        </>
      )}
    </button>
  );
}
