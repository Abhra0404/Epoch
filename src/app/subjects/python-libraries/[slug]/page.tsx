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
  const topics = getAllTopics().filter((t) => t.subject === "python-libraries");
  return topics.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicData(slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Python & ML Tooling`,
    description: topic.learningOutcomes || `${topic.title} study notes and code implementations.`,
  };
}

export default async function PythonLibrariesTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const allTopics = getAllTopics();
  const topics = allTopics.filter((t) => t.subject === "python-libraries");
  const topic = getTopicData(slug);

  if (!topic || topic.subject !== "python-libraries") {
    notFound();
  }

  return (
    <NotesClientView 
      topics={topics} 
      currentSlug={slug} 
      subject="python-libraries" 
      subjectTitle="Python & ML Tooling" 
    />
  );
}