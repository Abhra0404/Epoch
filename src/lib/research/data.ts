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
  foundational: boolean;
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
  { name: "Machine Learning", slug: "machine-learning", description: "Classical ML algorithms, statistical learning, and foundational methods", paperCount: 3 },
  { name: "Deep Learning", slug: "deep-learning", description: "Neural network architectures, training methods, and optimization", paperCount: 3 },
  { name: "NLP", slug: "nlp", description: "Natural language processing, text understanding, and generation", paperCount: 3 },
  { name: "Computer Vision", slug: "computer-vision", description: "Image recognition, object detection, and visual understanding", paperCount: 3 },
  { name: "Generative AI", slug: "generative-ai", description: "Text generation, image synthesis, and creative AI systems", paperCount: 3 },
  { name: "LLMs", slug: "llms", description: "Large language models, scaling, and reasoning capabilities", paperCount: 3 },
  { name: "Multimodal AI", slug: "multimodal", description: "Models that process text, images, audio, and video together", paperCount: 3 },
  { name: "Reinforcement Learning", slug: "reinforcement-learning", description: "Agents, reward systems, and decision-making under uncertainty", paperCount: 3 },
  { name: "AI Agents", slug: "ai-agents", description: "Autonomous agents, tool use, and multi-agent systems", paperCount: 3 },
  { name: "AI Safety", slug: "ai-safety", description: "Alignment, robustness, interpretability, and responsible AI", paperCount: 3 },
];

// ── Papers ────────────────────────────────────────────

export const papers: Paper[] = [
  // ── Machine Learning ──────────────────────────────
  {
    slug: "random-forests",
    title: "Random Forests",
    authors: "Breiman",
    year: 2001,
    conference: "Machine Learning",
    area: "Machine Learning",
    tldr: "Introduced ensemble methods using bagged decision trees with random feature selection.",
    description: "Random Forests combine multiple decision trees trained on random subsets of data and features, achieving strong performance with minimal hyperparameter tuning. The method introduced out-of-bag error estimation and variable importance measures.",
    tags: ["Ensemble Methods", "Decision Trees", "Bagging", "Classical ML"],
    difficulty: "Beginner",
    foundational: true,
  },
  {
    slug: "xgboost",
    title: "XGBoost: A Scalable Tree Boosting System",
    authors: "Chen & Guestrin",
    year: 2016,
    conference: "KDD",
    area: "Machine Learning",
    tldr: "Scaled gradient boosting to handle massive data with regularization and distributed computing.",
    description: "XGBoost introduced a scalable, portable, and accurate gradient boosting system with novel regularization techniques, sparsity-aware algorithms, and a weighted quantile sketch for efficient computation.",
    tags: ["Gradient Boosting", "Ensemble Methods", "Scalable ML", "Classical ML"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "automl-methods-systems-challenges",
    title: "AutoML: Methods, Systems, Challenges",
    authors: "Hutter et al.",
    year: 2018,
    conference: "AutoML",
    area: "Machine Learning",
    tldr: "Comprehensive survey of automated machine learning across model selection, hyperparameter tuning, and neural architecture search.",
    description: "This work provides a systematic overview of AutoML methods covering hyperparameter optimization, neural architecture search, meta-learning, and automated feature engineering, along with practical systems like Auto-WEKA and Auto-sklearn.",
    tags: ["AutoML", "Hyperparameter Optimization", "Neural Architecture Search", "Meta-Learning"],
    difficulty: "Advanced",
    foundational: true,
  },

  // ── Deep Learning ─────────────────────────────────
  {
    slug: "imagenet-classification-with-deep-convolutional-networks",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: "Krizhevsky et al.",
    year: 2012,
    conference: "NeurIPS",
    area: "Deep Learning",
    tldr: "AlexNet won ImageNet 2012 by a large margin, kickstarting the deep learning revolution.",
    description: "AlexNet demonstrated the power of deep convolutional neural networks trained on GPUs with ReLU activations, dropout regularization, and data augmentation, achieving a breakthrough top-5 error rate on ImageNet.",
    tags: ["CNNs", "ImageNet", "ReLU", "GPU Training", "Deep Learning"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "deep-residual-learning-for-image-recognition",
    title: "Deep Residual Learning for Image Recognition",
    authors: "He et al.",
    year: 2015,
    conference: "CVPR",
    area: "Deep Learning",
    tldr: "Introduced skip connections enabling training of very deep neural networks.",
    description: "ResNet introduced residual learning with skip connections, allowing networks to reach 152+ layers while maintaining training stability and achieving state-of-the-art on ImageNet.",
    tags: ["ResNet", "Skip Connections", "CNNs", "Image Classification"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "adam-optimizer",
    title: "Adam: A Method for Stochastic Optimization",
    authors: "Kingma & Ba",
    year: 2015,
    conference: "ICLR",
    area: "Deep Learning",
    tldr: "Introduced the Adam optimizer combining momentum and RMSProp for efficient deep learning training.",
    description: "Adam computes adaptive learning rates for each parameter using estimates of first and second moments of gradients, combining the advantages of AdaGrad and RMSProp with bias correction.",
    tags: ["Optimizer", "Adaptive Learning Rate", "Training", "Deep Learning"],
    difficulty: "Intermediate",
    foundational: true,
  },

  // ── NLP ───────────────────────────────────────────
  {
    slug: "word2vec",
    title: "Efficient Estimation of Word Representations in Vector Space",
    authors: "Mikolov et al.",
    year: 2013,
    conference: "ICLR Workshop",
    area: "NLP",
    tldr: "Introduced Word2Vec, learning meaningful word embeddings from large corpora.",
    description: "Word2Vec demonstrated that neural network-based word embeddings capture semantic relationships, enabling analogies like king - man + woman = queen. The CBOW and Skip-gram architectures became foundational for NLP.",
    tags: ["Word Embeddings", "Word2Vec", "Distributed Representations", "NLP"],
    difficulty: "Beginner",
    foundational: true,
  },
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
    foundational: true,
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
    foundational: true,
  },

  // ── Computer Vision ───────────────────────────────
  {
    slug: "alexnet-deep-learning-computer-vision",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: "Krizhevsky et al.",
    year: 2012,
    conference: "NeurIPS",
    area: "Computer Vision",
    tldr: "AlexNet won ImageNet 2012 by a large margin, kickstarting the deep learning revolution.",
    description: "AlexNet demonstrated the power of deep convolutional neural networks trained on GPUs with ReLU activations, dropout regularization, and data augmentation, achieving a breakthrough top-5 error rate on ImageNet.",
    tags: ["CNNs", "ImageNet", "Object Recognition", "Computer Vision"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "faster-r-cnn",
    title: "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks",
    authors: "Ren et al.",
    year: 2015,
    conference: "NeurIPS",
    area: "Computer Vision",
    tldr: "Unified object detection with region proposal networks for near real-time detection.",
    description: "Faster R-CNN introduced Region Proposal Networks (RPNs) that share full-image convolutional features with the detection network, enabling efficient and accurate object detection at near real-time speeds.",
    tags: ["Object Detection", "Region Proposal", "R-CNN", "Computer Vision"],
    difficulty: "Advanced",
    foundational: true,
  },
  {
    slug: "vit-image-recognition",
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    authors: "Dosovitskiy et al.",
    year: 2020,
    conference: "ICLR",
    area: "Computer Vision",
    tldr: "Proved Transformers can rival CNNs for image classification when pre-trained on sufficient data.",
    description: "ViT applied the pure Transformer architecture to sequences of image patches, demonstrating that with adequate pre-training data, Transformers can match or exceed CNN performance.",
    tags: ["Vision Transformer", "ViT", "Transformers", "Image Classification"],
    difficulty: "Advanced",
    foundational: true,
  },

  // ── Generative AI ─────────────────────────────────
  {
    slug: "auto-encoding-variational-bayes",
    title: "Auto-Encoding Variational Bayes",
    authors: "Kingma & Welling",
    year: 2013,
    conference: "ICLR Workshop",
    area: "Generative AI",
    tldr: "Introduced Variational Autoencoders (VAEs) combining deep learning with variational inference.",
    description: "VAEs frame generative modeling as an encoding-decoding process with a learned latent space, enabling both generation and representation learning through the reparameterization trick.",
    tags: ["VAE", "Variational Inference", "Latent Space", "Generative Models"],
    difficulty: "Advanced",
    foundational: true,
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
    foundational: true,
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
    foundational: true,
  },

  // ── LLMs ──────────────────────────────────────────
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
    foundational: true,
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
    foundational: true,
  },
  {
    slug: "llama-open-and-efficient-foundation-language-models",
    title: "LLaMA: Open and Efficient Foundation Language Models",
    authors: "Touvron et al.",
    year: 2023,
    conference: "arXiv",
    area: "LLMs",
    tldr: "Released high-performing open-weight language models trained on public data.",
    description: "LLaMA demonstrated that open-weight models trained on publicly available data can match or exceed proprietary models, democratizing access to large language model research and enabling community-driven innovation.",
    tags: ["LLaMA", "Open Weights", "LLMs", "Efficient Training"],
    difficulty: "Advanced",
    foundational: true,
  },

  // ── Multimodal AI ─────────────────────────────────
  {
    slug: "clip-learning-transferable-visual-models",
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    authors: "Radford et al.",
    year: 2021,
    conference: "ICML",
    area: "Multimodal AI",
    tldr: "CLIP learned visual concepts from natural language supervision, enabling zero-shot image classification.",
    description: "CLIP trained on 400M image-text pairs learned a shared embedding space for images and text, enabling zero-shot transfer to downstream visual tasks without task-specific training.",
    tags: ["CLIP", "Vision-Language", "Zero-Shot Learning", "Contrastive Learning"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "flamingo-visual-language-model",
    title: "Flamingo: a Visual Language Model for Few-Shot Learning",
    authors: "Alayrac et al.",
    year: 2022,
    conference: "NeurIPS",
    area: "Multimodal AI",
    tldr: "Introduced a visual language model that excels at few-shot learning across vision-language tasks.",
    description: "Flamingo combines frozen language models with vision encoders through gated cross-attention layers, enabling powerful few-shot performance on a wide range of visual and multimodal tasks.",
    tags: ["Visual Language Model", "Few-Shot Learning", "Cross-Attention", "Multimodal"],
    difficulty: "Advanced",
    foundational: true,
  },
  {
    slug: "blip-2-bootstrapping-language-image-pretraining",
    title: "BLIP-2: Bootstrapping Language-Image Pretraining with Frozen Image Encoders and Large Language Models",
    authors: "Li et al.",
    year: 2023,
    conference: "ICML",
    area: "Multimodal AI",
    tldr: "Efficiently bridged frozen vision and language models with a lightweight query transformer.",
    description: "BLIP-2 introduces Q-Former, a lightweight module that bridges frozen image encoders and frozen LLMs, achieving strong performance with significantly reduced training cost compared to end-to-end approaches.",
    tags: ["BLIP-2", "Vision-Language", "Q-Former", "Efficient Pretraining"],
    difficulty: "Advanced",
    foundational: true,
  },

  // ── Reinforcement Learning ────────────────────────
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
    foundational: true,
  },
  {
    slug: "proximal-policy-optimization",
    title: "Proximal Policy Optimization Algorithms",
    authors: "Schulman et al.",
    year: 2017,
    conference: "arXiv",
    area: "Reinforcement Learning",
    tldr: "Introduced PPO, a simple and stable policy gradient method widely used in practice.",
    description: "PPO clipped surrogate objective provides a simple yet effective method for policy optimization, balancing ease of implementation, sample efficiency, and reliability. It became the default algorithm for training RLHF systems.",
    tags: ["PPO", "Policy Gradient", "RLHF", "Policy Optimization"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "mastering-the-game-of-go-with-deep-neural-networks",
    title: "Mastering the Game of Go with Deep Neural Networks and Tree Search",
    authors: "Silver et al.",
    year: 2016,
    conference: "Nature",
    area: "Reinforcement Learning",
    tldr: "AlphaGo combined deep learning with Monte Carlo tree search to defeat a world champion.",
    description: "AlphaGo used deep neural networks for policy and value functions combined with MCTS to achieve superhuman performance in Go, demonstrating the potential of AI in complex strategic reasoning.",
    tags: ["AlphaGo", "Monte Carlo Tree Search", "Game AI", "Deep RL"],
    difficulty: "Advanced",
    foundational: true,
  },

  // ── AI Agents ─────────────────────────────────────
  {
    slug: "react-synergizing-reasoning-and-acting",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Yao et al.",
    year: 2022,
    conference: "ICLR",
    area: "AI Agents",
    tldr: "Unified reasoning and acting in a single prompt for more capable language model agents.",
    description: "ReAct interleaves reasoning traces with actions, allowing language models to maintain coherent thought processes while interacting with external tools and environments.",
    tags: ["ReAct", "Agents", "Tool Use", "Reasoning"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "toolformer-language-models-can-teach-themselves-to-use-tools",
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
    authors: "Schick et al.",
    year: 2023,
    conference: "NeurIPS",
    area: "AI Agents",
    tldr: "Language models can learn to use external tools through self-supervised training.",
    description: "Toolformer demonstrated that language models can autonomously learn when and how to use external tools like calculators, search engines, and APIs by annotating training data with API calls.",
    tags: ["Tool Use", "Self-Learning", "API Integration", "Agents"],
    difficulty: "Advanced",
    foundational: true,
  },
  {
    slug: "autogen-enabling-next-gen-llm-apps",
    title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
    authors: "Wu et al.",
    year: 2023,
    conference: "arXiv",
    area: "AI Agents",
    tldr: "Framework for building multi-agent systems with customizable and conversable agents.",
    description: "AutoGen provides a framework for creating multi-agent conversations where agents can be LLMs, tools, or humans, enabling complex workflows through collaborative problem-solving.",
    tags: ["Multi-Agent", "Framework", "Conversational AI", "Agents"],
    difficulty: "Advanced",
    foundational: true,
  },

  // ── AI Safety ─────────────────────────────────────
  {
    slug: "concrete-problems-in-ai-safety",
    title: "Concrete Problems in AI Safety",
    authors: "Amodei et al.",
    year: 2016,
    conference: "arXiv",
    area: "AI Safety",
    tldr: "Defined five practical research problems in AI safety accessible to ML practitioners.",
    description: "This paper framed AI safety as a set of concrete, measurable ML problems including avoiding negative side effects, avoiding reward hacking, scalable oversight, safe exploration, and robustness to distributional shift.",
    tags: ["AI Safety", "Alignment", "Robustness", "Reward Hacking"],
    difficulty: "Intermediate",
    foundational: true,
  },
  {
    slug: "training-language-models-to-follow-instructions",
    title: "Training Language Models to Follow Instructions with Human Feedback",
    authors: "Ouyang et al.",
    year: 2022,
    conference: "NeurIPS",
    area: "AI Safety",
    tldr: "InstructGPT aligned language models with human intent using RLHF.",
    description: "This paper demonstrated that fine-tuning language models with reinforcement learning from human feedback (RLHF) significantly improves their ability to follow user instructions and produce helpful, honest, and harmless outputs.",
    tags: ["RLHF", "InstructGPT", "Alignment", "Human Feedback"],
    difficulty: "Advanced",
    foundational: true,
  },
  {
    slug: "constitutional-ai",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Bai et al.",
    year: 2022,
    conference: "arXiv",
    area: "AI Safety",
    tldr: "Used AI self-critique and a set of principles to align models with fewer human labels.",
    description: "Constitutional AI trains models to critique and revise their own outputs according to a set of principles, reducing reliance on human feedback while improving both helpfulness and harmlessness.",
    tags: ["Constitutional AI", "Self-Critique", "Alignment", "Scalable Oversight"],
    difficulty: "Advanced",
    foundational: true,
  },
];

// ── Featured Paper ────────────────────────────────────

export const featuredPaper = papers.find(p => p.slug === "attention-is-all-you-need")!;

// ── Timeline Milestones ───────────────────────────────

export const timelineMilestones: TimelineMilestone[] = [
  { year: "2012", title: "AlexNet", slug: "alexnet-deep-learning-computer-vision", description: "Deep CNN wins ImageNet, kickstarting the deep learning revolution" },
  { year: "2013", title: "Word2Vec", slug: "word2vec", description: "Neural word embeddings capture semantic relationships" },
  { year: "2014", title: "GANs", slug: "generative-adversarial-nets", description: "Generative Adversarial Networks enable synthetic data generation" },
  { year: "2015", title: "ResNet", slug: "deep-residual-learning-for-image-recognition", description: "Skip connections enable training of very deep networks" },
  { year: "2017", title: "Transformer", slug: "attention-is-all-you-need", description: "Self-attention replaces recurrence in sequence modeling" },
  { year: "2018", title: "BERT", slug: "bert-pre-training-of-deep-bidirectional-transformers", description: "Bidirectional pre-training transforms NLP" },
  { year: "2020", title: "GPT-3 & ViT", slug: "language-models-are-few-shot-learners", description: "Scaling laws and vision transformers reshape the field" },
  { year: "2022", title: "RLHF & Diffusion", slug: "training-language-models-to-follow-instructions", description: "Instruction tuning and diffusion models go mainstream" },
  { year: "2023+", title: "LLM Era", slug: "llama-open-and-efficient-foundation-language-models", description: "Open-weight LLMs and multi-agent systems emerge" },
];

// ── Reproductions ─────────────────────────────────────

export const reproductions: Reproduction[] = [
  {
    paperTitle: "Random Forests",
    paperSlug: "random-forests",
    area: "Machine Learning",
    difficulty: "Beginner",
    progress: 90,
    dataset: "Iris / MNIST",
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

// ── Helpers ───────────────────────────────────────────

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find(p => p.slug === slug);
}

export function getPapersByArea(area: string): Paper[] {
  return papers.filter(p => p.area === area);
}
