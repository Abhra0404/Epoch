export type Category =
  | "Machine Learning"
  | "Deep Learning"
  | "NLP"
  | "Computer Vision"
  | "Generative AI";

export interface PlaygroundExperiment {
  slug: string;
  title: string;
  category: Category;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  longDescription: string;
  featured: boolean;
  tags: string[];
  /** Link back to Epoch's Learn / Research section */
  learnHref: string;
  learnLabel: string;
}

export const categories: Category[] = [
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Generative AI",
];

export const experiments: PlaygroundExperiment[] = [
  {
    slug: "gradient-descent",
    title: "Gradient Descent",
    category: "Machine Learning",
    difficulty: "Intermediate",
    duration: "~20 min",
    description:
      "Visualize how a model learns by minimizing its loss function step by step.",
    longDescription:
      "Gradient descent is the workhorse of machine learning. Adjust the learning rate, starting point, and loss surface to watch the optimizer navigate toward a minimum — or diverge spectacularly. Compare convex vs. non-convex landscapes to understand why initialization and step size matter.",
    featured: true,
    tags: ["Optimization", "Loss Functions", "Learning Rate"],
    learnHref: "/subjects/machine-learning/loss-function-and-gradient-descent",
    learnLabel: "Gradient Descent Notes",
  },
  {
    slug: "linear-regression",
    title: "Linear Regression",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "~15 min",
    description:
      "Fit a line to data and visualize residual error in real time.",
    longDescription:
      "The simplest supervised learning algorithm. Add or move data points, adjust the slope and intercept, and watch the line fit update along with mean squared error. Build intuition for what 'best fit' really means.",
    featured: false,
    tags: ["Supervised Learning", "MSE", "Best Fit"],
    learnHref: "/subjects/machine-learning/simple-linear-regression",
    learnLabel: "Linear Regression Notes",
  },
  {
    slug: "k-means-clustering",
    title: "K-Means Clustering",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "~15 min",
    description:
      "Experiment with unsupervised clustering by choosing k and watching centroids converge.",
    longDescription:
      "K-Means partitions data into k clusters by iteratively assigning points to the nearest centroid and recomputing centroids. Change k, add noise points, or rearrange the dataset to see how the algorithm responds — and why k matters.",
    featured: false,
    tags: ["Unsupervised Learning", "Clustering", "Centroids"],
    learnHref: "/subjects/machine-learning/decision-tree-fundamentals",
    learnLabel: "Clustering Notes",
  },
  {
    slug: "neural-network",
    title: "Neural Network",
    category: "Deep Learning",
    difficulty: "Intermediate",
    duration: "~25 min",
    description:
      "Build a small network, tweak layers and activations, and watch it learn.",
    longDescription:
      "Construct a feedforward neural network layer by layer. Choose activation functions, adjust hidden unit counts, and observe how the decision boundary evolves during training. See why depth and non-linearity matter for complex patterns.",
    featured: false,
    tags: ["Activations", "Forward Pass", "Backpropagation"],
    learnHref: "/subjects/deep-learning/neural-network-fundamentals",
    learnLabel: "Neural Network Fundamentals Notes",
  },
  {
    slug: "regularization",
    title: "Regularization (L1 vs L2)",
    category: "Machine Learning",
    difficulty: "Intermediate",
    duration: "~15 min",
    description:
      "See how L1 and L2 penalties shrink weights and prevent overfitting.",
    longDescription:
      "Regularization adds a penalty term to the loss function that discourages large weights. L1 (Lasso) drives some weights to exactly zero for feature selection; L2 (Ridge) shrinks all weights smoothly. Tune lambda to see the shrinkage effect on a fixed set of coefficients.",
    featured: false,
    tags: ["L1", "L2", "Overfitting", "Weight Decay"],
    learnHref: "/subjects/machine-learning/ridge-and-lasso-regularization",
    learnLabel: "Regularization Notes",
  },
  {
    slug: "decision-boundary",
    title: "Decision Boundary",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "~15 min",
    description:
      "Visualize how different classifiers split feature space into regions.",
    longDescription:
      "Place data points in 2D and watch a classifier draw its decision boundary. Switch between logistic regression, a linear SVM, and a k-NN classifier to see how model choice changes the shape of the boundary — and where each model struggles.",
    featured: false,
    tags: ["Classification", "SVM", "Logistic Regression"],
    learnHref: "/subjects/machine-learning/simple-linear-regression",
    learnLabel: "Classification Notes",
  },
  {
    slug: "attention-mechanism",
    title: "Attention Mechanism",
    category: "NLP",
    difficulty: "Intermediate",
    duration: "~20 min",
    description:
      "See how transformers focus on different tokens when processing a sentence.",
    longDescription:
      "The self-attention mechanism lets each token in a sequence compute relevance scores with every other token. Enter a sentence and watch the attention weights light up — observing how the model learns syntactic and semantic relationships between words.",
    featured: false,
    tags: ["Transformers", "Self-Attention", "Query-Key-Value"],
    learnHref: "/subjects/deep-learning/transformer-architecture",
    learnLabel: "Transformer Architecture Notes",
  },
  {
    slug: "convolutional-filter",
    title: "Convolutional Filter",
    category: "Computer Vision",
    difficulty: "Beginner",
    duration: "~15 min",
    description:
      "Apply edge-detection and blur filters to see how CNNs extract features.",
    longDescription:
      "Convolutional layers slide small learnable filters across an image to detect edges, textures, and patterns. Choose from preset filters or manually set kernel values to see the output feature map update in real time.",
    featured: false,
    tags: ["CNNs", "Kernels", "Feature Maps"],
    learnHref: "/subjects/deep-learning/cnn-architectures",
    learnLabel: "CNN Architectures Notes",
  },
  {
    slug: "gan-training",
    title: "GAN Training",
    category: "Generative AI",
    difficulty: "Advanced",
    duration: "~25 min",
    description:
      "Watch a generator and discriminator compete in an adversarial game.",
    longDescription:
      "Generative Adversarial Networks train two networks against each other: a generator that creates fake samples and a discriminator that tries to tell real from fake. Adjust the learning rates for each side and observe the training dynamics — including common failure modes like mode collapse.",
    featured: false,
    tags: ["GANs", "Adversarial Training", "Mode Collapse"],
    learnHref: "/subjects/deep-learning/optimization-techniques",
    learnLabel: "Optimization Techniques Notes",
  },
  {
    slug: "word-embeddings",
    title: "Word Embeddings",
    category: "NLP",
    difficulty: "Beginner",
    duration: "~15 min",
    description:
      "Explore vector space relationships between words and run analogies.",
    longDescription:
      "Word embeddings map words to dense vectors where semantic similarity corresponds to geometric proximity. Type words to see their nearest neighbors, run classic analogies like 'king - man + woman = ?', and visualize clusters of related terms.",
    featured: false,
    tags: ["Word2Vec", "Vector Space", "Semantic Similarity"],
    learnHref: "/research/papers/word2vec",
    learnLabel: "Word2Vec Paper",
  },
];

// ── Helpers ──────────────────────────────────────────

export function getExperimentBySlug(
  slug: string
): PlaygroundExperiment | undefined {
  return experiments.find((e) => e.slug === slug);
}

export function getExperimentsByCategory(category: Category): PlaygroundExperiment[] {
  return experiments.filter((e) => e.category === category);
}

export function getFeaturedExperiment(): PlaygroundExperiment {
  return experiments.find((e) => e.featured)!;
}
