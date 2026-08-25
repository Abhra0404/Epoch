import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "numpy-fundamentals", title: "NumPy Fundamentals", status: "Coming Soon" },
  { slug: "pandas-data-manipulation", title: "Pandas Data Manipulation", status: "Coming Soon" },
  { slug: "scikit-learn-basics", title: "Scikit-learn Basics", status: "Coming Soon" },
  { slug: "matplotlib-visualization", title: "Matplotlib Visualization", status: "Coming Soon" },
  { slug: "seaborn-statistical-plots", title: "Seaborn Statistical Plots", status: "Coming Soon" },
  { slug: "data-preprocessing-pipelines", title: "Data Preprocessing Pipelines", status: "Coming Soon" },
  { slug: "feature-engineering-sklearn", title: "Feature Engineering with Scikit-learn", status: "Coming Soon" },
  { slug: "model-evaluation-sklearn", title: "Model Evaluation with Scikit-learn", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Python & ML Tooling`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function PythonLibrariesTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="Python & ML Tooling"
    subjectDescription="NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, and essential data science tooling."
    topics={reorderedTopics}
  />;
}