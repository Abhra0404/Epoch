import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "linear-algebra", title: "Linear Algebra Fundamentals", status: "Coming Soon" },
  { slug: "matrix-calculus", title: "Matrix Calculus", status: "Coming Soon" },
  { slug: "probability-distributions", title: "Probability Distributions", status: "Coming Soon" },
  { slug: "convex-optimization", title: "Convex Optimization", status: "Coming Soon" },
  { slug: "information-theory", title: "Information Theory", status: "Coming Soon" },
  { slug: "statistical-inference", title: "Statistical Inference", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Mathematics for ML`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function MathematicsTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="Mathematics for ML"
    subjectDescription="Essential matrix calculus, linear transformations, probability distributions, and convex optimization."
    topics={reorderedTopics}
  />;
}