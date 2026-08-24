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
  order: number;
  content: string;
  sections: { id: string; title: string }[];
}

const TOPICS_DIR = path.join(process.cwd(), "content", "topics");

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
};

export function getAllTopicSlugs(): string[] {
  try {
    if (!fs.existsSync(TOPICS_DIR)) return Object.keys(TOPIC_METADATA_MAP);
    const files = fs.readdirSync(TOPICS_DIR);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch {
    return Object.keys(TOPIC_METADATA_MAP);
  }
}

export function getTopicData(slug: string): TopicItem | null {
  const meta = TOPIC_METADATA_MAP[slug];
  const filePath = path.join(TOPICS_DIR, `${slug}.md`);

  let content = "";
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf8");
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
    moduleName: "Machine Learning Foundations",
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
