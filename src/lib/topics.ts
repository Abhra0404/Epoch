import fs from "fs";
import path from "path";

export interface TopicItem {
  slug: string;
  title: string;
  prerequisites: string;
  learningOutcomes: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  moduleName: string;
  subject: "machine-learning" | "deep-learning" | "nlp" | "python-libraries";
  order: number;
  content: string;
  sections: { id: string; title: string }[];
}

const TOPICS_DIR = path.join(process.cwd(), "content", "topics");
const ML_TOPICS_DIR = path.join(TOPICS_DIR, "ML");
const DL_TOPICS_DIR = path.join(TOPICS_DIR, "DL");
const NLP_TOPICS_DIR = path.join(TOPICS_DIR, "NLP");
const PYTHON_TOPICS_DIR = path.join(TOPICS_DIR, "PYTHON");

const TOPIC_METADATA_MAP: Record<string, { title: string; difficulty: "Beginner" | "Intermediate" | "Advanced"; readTime: string; order: number }> = {
  "simple-linear-regression": {
    title: "Simple Linear Regression",
    difficulty: "Beginner",
    readTime: "10 mins read",
    order: 1,
  },
  "multiple-linear-regression": {
    title: "Multiple Linear Regression",
    difficulty: "Intermediate",
    readTime: "15 mins read",
    order: 2,
  },
  "loss-function-and-gradient-descent": {
    title: "Loss Function & Gradient Descent",
    difficulty: "Intermediate",
    readTime: "15 mins read",
    order: 3,
  },
  "ridge-and-lasso-regularization": {
    title: "Ridge & Lasso Regularization",
    difficulty: "Advanced",
    readTime: "18 mins read",
    order: 4,
  },
  "regression-evaluation": {
    title: "Regression Model Evaluation",
    difficulty: "Intermediate",
    readTime: "12 mins read",
    order: 5,
  },
  "logistic-regression-and-the-sigmoid-function": {
    title: "Logistic Regression & Sigmoid Function",
    difficulty: "Intermediate",
    readTime: "14 mins read",
    order: 6,
  },
  "entropy-and-information-gain": {
    title: "Entropy & Information Gain",
    difficulty: "Intermediate",
    readTime: "13 mins read",
    order: 7,
  },
  "gini-impurity-and-the-best-split": {
    title: "Gini Impurity & Best Split",
    difficulty: "Intermediate",
    readTime: "12 mins read",
    order: 8,
  },
  "decision-tree-fundamentals": {
    title: "Decision Tree Fundamentals",
    difficulty: "Intermediate",
    readTime: "14 mins read",
    order: 9,
  },
  "random-forest": {
    title: "Random Forest",
    difficulty: "Advanced",
    readTime: "16 mins read",
    order: 10,
  },
  "ensemble-learning-and-bagging": {
    title: "Ensemble Learning & Bagging",
    difficulty: "Advanced",
    readTime: "15 mins read",
    order: 11,
  },
  "boosting-fundamentals": {
    title: "Boosting Fundamentals",
    difficulty: "Advanced",
    readTime: "16 mins read",
    order: 12,
  },
  "naive-bayes": {
    title: "Naive Bayes",
    difficulty: "Intermediate",
    readTime: "12 mins read",
    order: 13,
  },
  "k-nearest-neighbors": {
    title: "K-Nearest Neighbors",
    difficulty: "Beginner",
    readTime: "10 mins read",
    order: 14,
  },
  "support-vector-machines": {
    title: "Support Vector Machines",
    difficulty: "Advanced",
    readTime: "18 mins read",
    order: 15,
  },
  "linear-polynomial-and-rbf-kernels": {
    title: "Linear, Polynomial & RBF Kernels",
    difficulty: "Advanced",
    readTime: "17 mins read",
    order: 16,
  },
  "classification-fundamentals": {
    title: "Classification Fundamentals",
    difficulty: "Beginner",
    readTime: "11 mins read",
    order: 17,
  },
  "classification-evaluation": {
    title: "Classification Evaluation",
    difficulty: "Intermediate",
    readTime: "13 mins read",
    order: 18,
  },
  "time-series-and-forecasting": {
    title: "Time Series & Forecasting",
    difficulty: "Advanced",
    readTime: "19 mins read",
    order: 19,
  },
  // ── Deep Learning Topics ─────────────────────────
  "neural-network-fundamentals": {
    title: "Neural Network Fundamentals",
    difficulty: "Intermediate",
    readTime: "18 mins read",
    order: 100,
  },
  "backpropagation-and-gradient-flow": {
    title: "Backpropagation & Gradient Flow",
    difficulty: "Intermediate",
    readTime: "20 mins read",
    order: 101,
  },
  "activation-functions": {
    title: "Activation Functions",
    difficulty: "Intermediate",
    readTime: "16 mins read",
    order: 102,
  },
  "loss-functions": {
    title: "Loss Functions",
    difficulty: "Intermediate",
    readTime: "18 mins read",
    order: 103,
  },
  "optimization-techniques": {
    title: "Optimization Techniques",
    difficulty: "Advanced",
    readTime: "20 mins read",
    order: 104,
  },
  "cnn-architectures": {
    title: "CNN Architectures",
    difficulty: "Advanced",
    readTime: "20 mins read",
    order: 105,
  },
  "rnn-and-lstm-networks": {
    title: "RNN & LSTM Networks",
    difficulty: "Advanced",
    readTime: "22 mins read",
    order: 106,
  },
  "transformer-architecture": {
    title: "Transformer Architecture",
    difficulty: "Advanced",
    readTime: "22 mins read",
    order: 107,
  },
  // ── NLP Topics ─────────────────────────────────
  "tokenization-methods": {
    title: "Tokenization Methods",
    difficulty: "Intermediate",
    readTime: "18 mins read",
    order: 200,
  },
  "self-attention-mechanism": {
    title: "Self-Attention Mechanism",
    difficulty: "Intermediate",
    readTime: "20 mins read",
    order: 201,
  },
  "bert-architecture": {
    title: "BERT Architecture",
    difficulty: "Intermediate",
    readTime: "18 mins read",
    order: 202,
  },
  "gpt-architecture": {
    title: "GPT Architecture",
    difficulty: "Intermediate",
    readTime: "20 mins read",
    order: 203,
  },
  "lora-fine-tuning": {
    title: "LoRA Fine-tuning",
    difficulty: "Advanced",
    readTime: "18 mins read",
    order: 204,
  },
  "preference-alignment-rlhf": {
    title: "Preference Alignment (RLHF)",
    difficulty: "Advanced",
    readTime: "20 mins read",
    order: 205,
  },
  "multilingual-nlp": {
    title: "Multilingual NLP",
    difficulty: "Advanced",
    readTime: "20 mins read",
    order: 206,
  },
  // ── Python & ML Tooling Topics ─────────────────
  "numpy-fundamentals": {
    title: "NumPy Fundamentals",
    difficulty: "Beginner",
    readTime: "12 mins read",
    order: 300,
  },
  "pandas-data-manipulation": {
    title: "Pandas Data Manipulation",
    difficulty: "Intermediate",
    readTime: "15 mins read",
    order: 301,
  },
  "scikit-learn-basics": {
    title: "Scikit-learn Basics",
    difficulty: "Beginner",
    readTime: "14 mins read",
    order: 302,
  },
  "matplotlib-visualization": {
    title: "Matplotlib Visualization",
    difficulty: "Intermediate",
    readTime: "12 mins read",
    order: 303,
  },
  "seaborn-statistical-plots": {
    title: "Seaborn Statistical Plots",
    difficulty: "Intermediate",
    readTime: "13 mins read",
    order: 304,
  },
  "data-preprocessing-pipelines": {
    title: "Data Preprocessing Pipelines",
    difficulty: "Intermediate",
    readTime: "16 mins read",
    order: 305,
  },
  "feature-engineering-sklearn": {
    title: "Feature Engineering with Scikit-learn",
    difficulty: "Advanced",
    readTime: "18 mins read",
    order: 306,
  },
  "model-evaluation-sklearn": {
    title: "Model Evaluation with Scikit-learn",
    difficulty: "Advanced",
    readTime: "17 mins read",
    order: 307,
  },
};

export function getAllTopicSlugs(): string[] {
  try {
    const slugs: string[] = [];
    const dirsToCheck = [ML_TOPICS_DIR, TOPICS_DIR, DL_TOPICS_DIR, NLP_TOPICS_DIR, PYTHON_TOPICS_DIR];
    for (const dir of dirsToCheck) {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (file.endsWith(".md")) {
            const slug = file.replace(/\.md$/, "");
            if (!slugs.includes(slug)) {
              slugs.push(slug);
            }
          }
        }
      }
    }
    return slugs.length > 0 ? slugs : Object.keys(TOPIC_METADATA_MAP);
  } catch {
    return Object.keys(TOPIC_METADATA_MAP);
  }
}

export function getTopicData(slug: string): TopicItem | null {
  const meta = TOPIC_METADATA_MAP[slug];
  // Check ML subfolder first, then root topics, DL, NLP, and PYTHON subfolders
  const mlSubPath = path.join(ML_TOPICS_DIR, `${slug}.md`);
  const mlRootPath = path.join(TOPICS_DIR, `${slug}.md`);
  const dlPath = path.join(DL_TOPICS_DIR, `${slug}.md`);
  const nlpPath = path.join(NLP_TOPICS_DIR, `${slug}.md`);
  const pythonPath = path.join(PYTHON_TOPICS_DIR, `${slug}.md`);

  let content = "";
  let subject: "machine-learning" | "deep-learning" | "nlp" | "python-libraries" = "machine-learning";
  if (fs.existsSync(mlSubPath)) {
    content = fs.readFileSync(mlSubPath, "utf8");
  } else if (fs.existsSync(mlRootPath)) {
    content = fs.readFileSync(mlRootPath, "utf8");
  } else if (fs.existsSync(dlPath)) {
    content = fs.readFileSync(dlPath, "utf8");
    subject = "deep-learning";
  } else if (fs.existsSync(nlpPath)) {
    content = fs.readFileSync(nlpPath, "utf8");
    subject = "nlp";
  } else if (fs.existsSync(pythonPath)) {
    content = fs.readFileSync(pythonPath, "utf8");
    subject = "python-libraries";
  } else {
    return null;
  }

  // Parse Prerequisite and Learning Outcomes from header text
  let prerequisites = "Machine Learning Fundamentals";
  let learningOutcomes = "";

  const prereqMatch = content.match(/\*\*PREREQUISITE TOPICS:\*\*\s*(.*)/i);
  if (prereqMatch && prereqMatch[1]) {
    prerequisites = prereqMatch[1].trim();
  }

  const outcomesMatch = content.match(/\*\*LEARNING OUTCOMES:\*\*\s*(.*)/i);
  if (outcomesMatch && outcomesMatch[1]) {
    learningOutcomes = outcomesMatch[1].trim();
  }

  // Extract section headers (## 1. CORE CONCEPT, ## 2. THE PROBLEM IT SOLVES, etc.)
  const sectionRegex = /^##\s+(.+)$/gm;
  const sections: { id: string; title: string }[] = [];
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const rawTitle = match[1].trim();
    const id = rawTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    sections.push({ id, title: rawTitle });
  }

  return {
    slug,
    title: meta ? meta.title : slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
    prerequisites,
    learningOutcomes,
    difficulty: meta ? meta.difficulty : "Intermediate",
    readTime: meta ? meta.readTime : "12 mins read",
    moduleName: subject === "python-libraries" ? "Python & ML Tooling" : subject === "nlp" ? "NLP & Transformer Models" : subject === "deep-learning" ? "Deep Learning & Neural Networks" : "Machine Learning Foundations",
    subject,
    order: meta ? meta.order : 99,
    content,
    sections,
  };
}

export function getAllTopics(): TopicItem[] {
  const slugs = getAllTopicSlugs();
  return slugs
    .map((slug) => getTopicData(slug))
    .filter((topic): topic is TopicItem => topic !== null)
    .sort((a, b) => a.order - b.order);
}
