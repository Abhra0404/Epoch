import { getAllTopics, getTopicData } from "@/lib/topics";
import { NotesClientView } from "../../machine-learning/NotesClientView";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics().filter((t) => t.subject === "nlp");
  return topics.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicData(slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch NLP`,
    description: topic.learningOutcomes || `${topic.title} study notes and mathematical derivations.`,
  };
}

export default async function NLPTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const allTopics = getAllTopics();
  const topics = allTopics.filter((t) => t.subject === "nlp");
  const topic = getTopicData(slug);

  if (!topic || topic.subject !== "nlp") {
    notFound();
  }

  return <NotesClientView topics={topics} currentSlug={slug} subject="nlp" subjectTitle="NLP & Transformer Models" />;
}
