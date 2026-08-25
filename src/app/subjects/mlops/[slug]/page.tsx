import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "containerization", title: "Containerization with Docker", status: "Coming Soon" },
  { slug: "feature-stores", title: "Feature Store Implementation", status: "Coming Soon" },
  { slug: "experiment-tracking", title: "Experiment Tracking with MLflow", status: "Coming Soon" },
  { slug: "model-monitoring", title: "Model Monitoring & Drift Detection", status: "Coming Soon" },
  { slug: "model-deployment", title: "Model Deployment Strategies", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch MLOps`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function MLOpsTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="MLOps & Production Systems"
    subjectDescription="Containerization, feature stores, experiment tracking with MLflow, model monitoring, and deployment."
    topics={reorderedTopics}
  />;
}