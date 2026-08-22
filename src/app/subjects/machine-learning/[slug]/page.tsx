import { getAllTopics, getTopicData } from "@/lib/topics";
import { NotesClientView } from "../NotesClientView";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicData(slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Machine Learning`,
    description: topic.learningOutcomes || `${topic.title} study notes and mathematical derivations.`,
  };
}

export default async function MachineLearningTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topics = getAllTopics();
  const topic = getTopicData(slug);

  if (!topic) {
    notFound();
  }

  return <NotesClientView topics={topics} currentSlug={slug} />;
}
