export interface Paper {
  slug: string;
  title: string;
  authors: string;
  year: number;
  conference: string;
  area: string;
  tldr: string;
  description: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  foundaional: boolean;
}

export interface ResearchArea {
  name: string;
  slug: string;
  description: string;
  paperCount: number;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  slug: string;
  description: string;
}

export interface Reproduction {
  paperTitle: string;
  paperSlug: string;
  area: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  dataset: string;
  status: "Available" | "In Progress" | "Coming Soon";
}

// ── Research Areas ────────────────────────────────────

export const researchAreas: ResearchArea[] = [
  { name: "Machine Learning", slug: "machine-learning", description: "Classical ML algorithms, statistical learning, and foundational methods", paperCount: 0 },
  { name: "Deep Learning", slug: "deep-learning", description: "Neural network architectures, training methods, and optimization", paperCount: 0 },
  { name: "NLP", slug: "nlp", description: "Natural language processing, text understanding, and generation", paperCount: 0 },
  { name: "Computer Vision", slug: "computer-vision", description: "Image recognition, object detection, and visual understanding", paperCount: 0 },
  { name: "Generative AI", slug: "generative-ai", description: "Text generation, image synthesis, and creative AI systems", paperCount: 0 },
  { name: "LLMs", slug: "llms", description: "Large language models, scaling, and reasoning capabilities", paperCount: 0 },
  { name: "Multimodal AI", slug: "multimodal", description: "Models that process text, images, audio, and video together", paperCount: 0 },
  { name: "Reinforcement Learning", slug: "reinforcement-learning", description: "Agents, reward systems, and decision-making under uncertainty", paperCount: 0 },
  { name: "AI Agents", slug: "ai-agents", description: "Autonomous agents, tool use, and multi-agent systems", paperCount: 0 },
  { name: "AI Safety", slug: "ai-safety", description: "Alignment, robustness, interpretability, and responsible AI", paperCount: 0 },
];

// ── Papers ────────────────────────────────────────────

export const papers: Paper[] = [
  {
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: 2017,
    conference: "NeurIPS",
    area: "NLP",
    tldr: "Introduced the Transformer architecture and fundamentally changed modern NLP.",
    description: "This paper introduced the Transformer, a novel architecture based entirely on attention mechanisms, dispensing with recurrence and convolutions. It demonstrated state-of-the-art results on machine translation while being more parallelizable and faster to train.",
    tags: ["Transformers", "Self-Attention", "NLP", "Foundational"],
    difficulty: "Intermediate",
    foundaional: true,
  },
  {
    slug: "bert-pre-training-of-deep-bidirectional-transformers",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Devlin et al.",
    year: 2018,
    conference: "NAACL",
    area: "NLP",
    tldr: "Showed that bidirectional pre-training dramatically improves language understanding tasks.",
    description: "BERT introduced masked language modeling and next sentence prediction as pre-training objectives, enabling transfer learning that revolutionized NLP benchmarks.",
    tags: ["Transformers", "Pre-training", "Fine-tuning", "NLP"],
    difficulty: "Intermediate",
    foundaional: true,
  },
  {
    slug: "deep-residual-learning-for-image-recognition",
    title: "Deep Residual Learning for Image Recognition",
    authors: "He et al.",
    year: 2015,
    conference: "CVPR",
    area: "Computer Vision",
    tldr: "Introduced skip connections enabling training of very deep neural networks.",
    description: "ResNet introduced residual learning with skip connections, allowing networks to reach 152+ layers while maintaining training stability and achieving state-of-the-art on ImageNet.",
    tags: ["ResNet", "Skip Connections", "CNNs", "Image Classification"],
    difficulty: "Intermediate",
    foundaional: true,
  },
  {
    slug: "generative-adversarial-nets",
    title: "Generative Adversarial Nets",
    authors: "Goodfellow et al.",
    year: 2014,
    conference: "NeurIPS",
    area: "Generative AI",
    tldr: "Introduced GANs — a framework for training generative models via adversarial competition.",
    description: "GANs pit a generator against a discriminator in a minimax game, enabling the generation of realistic synthetic data. This framework became foundational for image synthesis, style transfer, and more.",
    tags: ["GANs", "Generative Models", "Adversarial Training"],
    difficulty: "Advanced",
    foundaional: true,
  },
  {
    slug: "scaling-laws-for-neural-language-models",
    title: "Scaling Laws for Neural Language Models",
    authors: "Kaplan et al.",
    year: 2020,
    conference: "arXiv",
    area: "LLMs",
    tldr: "Discovered predictable power-law relationships between model size, data, and performance.",
    description: "This paper established that language model performance scales as a power law with model size, dataset size, and compute, providing a framework for resource allocation in large-scale training.",
    tags: ["Scaling Laws", "LLMs", "Compute Optimal"],
    difficulty: "Advanced",
    foundaional: true,
  },
  {
    slug: "an-image-is-worth-16x16-words",
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    authors: "Dosovitskiy et al.",
    year: 2020,
    conference: "ICLR",
    area: "Computer Vision",
    tldr: "Proved Transformers can rival CNNs for image classification when pre-trained on sufficient data.",
    description: "ViT applied the pure Transformer architecture to sequences of image patches, demonstrating that with adequate pre-training data, Transformers can match or exceed CNN performance.",
    tags: ["Vision Transformer", "ViT", "Transformers", "Image Classification"],
    difficulty: "Advanced",
    foundaional: true,
  },
  {
    slug: "language-models-are-few-shot-learners",
    title: "Language Models are Few-Shot Learners",
    authors: "Brown et al.",
    year: 2020,
    conference: "NeurIPS",
    area: "LLMs",
    tldr: "GPT-3 demonstrated that large language models can perform tasks with few examples.",
    description: "GPT-3 showed that scaling language models to 175B parameters enables in-context learning, performing many NLP tasks without fine-tuning.",
    tags: ["GPT-3", "Few-Shot Learning", "In-Context Learning", "LLMs"],
    difficulty: "Advanced",
    foundaional: false,
  },
  {
    slug: "denoising-diffusion-probabilistic-models",
    title: "Denoising Diffusion Probabilistic Models",
    authors: "Ho et al.",
    year: 2020,
    conference: "NeurIPS",
    area: "Generative AI",
    tldr: "Revived diffusion models as a powerful class of generative models.",
    description: "DDPM showed that diffusion-based generative models can produce high-quality images by learning to reverse a gradual noising process.",
    tags: ["Diffusion Models", "Generative Models", "Image Synthesis"],
    difficulty: "Advanced",
    foundaional: false,
  },
  {
    slug: "neural-machine-translation-by-jointly-learning-to-align-and-translate",
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Bahdanau et al.",
    year: 2014,
    conference: "ICLR",
    area: "NLP",
    tldr: "Introduced the attention mechanism for sequence-to-sequence models.",
    description: "This paper introduced additive attention for neural machine translation, allowing the model to focus on relevant parts of the input when generating each output token.",
    tags: ["Attention", "Seq2Seq", "Machine Translation", "Foundational"],
    difficulty: "Intermediate",
    foundaional: true,
  },
  {
    slug: "playing-atari-with-deep-reinforcement-learning",
    title: "Playing Atari with Deep Reinforcement Learning",
    authors: "Mnih et al.",
    year: 2013,
    conference: "NeurIPS Workshop",
    area: "Reinforcement Learning",
    tldr: "First deep RL agent to learn control policies directly from pixel inputs.",
    description: "DQN combined deep convolutional networks with Q-learning and experience replay, achieving human-level performance on multiple Atari games.",
    tags: ["DQN", "Deep RL", "Experience Replay"],
    difficulty: "Intermediate",
    foundaional: true,
  },
];

// ── Featured Paper ────────────────────────────────────

export const featuredPaper = papers.find(p => p.slug === "attention-is-all-you-need")!;

// ── Timeline Milestones ───────────────────────────────

export const timelineMilestones: TimelineMilestone[] = [
  { year: "2012", title: "AlexNet", slug: "deep-residual-learning-for-image-recognition", description: "Deep CNN wins ImageNet, kickstarting the deep learning revolution" },
  { year: "2014", title: "GANs & Attention", slug: "generative-adversarial-nets", description: "Generative Adversarial Networks and attention mechanisms emerge" },
  { year: "2015", title: "ResNet", slug: "deep-residual-learning-for-image-recognition", description: "Skip connections enable training of very deep networks" },
  { year: "2017", title: "Transformer", slug: "attention-is-all-you-need", description: "Self-attention replaces recurrence in sequence modeling" },
  { year: "2018", title: "BERT", slug: "bert-pre-training-of-deep-bidirectional-transformers", description: "Bidirectional pre-training transforms NLP" },
  { year: "2020", title: "GPT-3 & ViT", slug: "language-models-are-few-shot-learners", description: "Scaling laws and vision transformers reshape the field" },
  { year: "2022", title: "Diffusion Era", slug: "denoising-diffusion-probabilistic-models", description: "Diffusion models dominate image generation" },
  { year: "2023+", title: "LLM Era", slug: "scaling-laws-for-neural-language-models", description: "Large language models become the dominant paradigm" },
];

// ── Reproductions ─────────────────────────────────────

export const reproductions: Reproduction[] = [
  {
    paperTitle: "U-Net: Convolutional Networks for Biomedical Image Segmentation",
    paperSlug: "deep-residual-learning-for-image-recognition",
    area: "Computer Vision",
    difficulty: "Intermediate",
    progress: 80,
    dataset: "ISBI",
    status: "Available",
  },
  {
    paperTitle: "Attention Is All You Need",
    paperSlug: "attention-is-all-you-need",
    area: "NLP",
    difficulty: "Advanced",
    progress: 45,
    dataset: "WMT 2014 En-De",
    status: "In Progress",
  },
  {
    paperTitle: "Denoising Diffusion Probabilistic Models",
    paperSlug: "denoising-diffusion-probabilistic-models",
    area: "Generative AI",
    difficulty: "Advanced",
    progress: 0,
    dataset: "CIFAR-10",
    status: "Coming Soon",
  },
];

// ── Helper ────────────────────────────────────────────

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find(p => p.slug === slug);
}

export function getPapersByArea(area: string): Paper[] {
  return papers.filter(p => p.area === area);
}
