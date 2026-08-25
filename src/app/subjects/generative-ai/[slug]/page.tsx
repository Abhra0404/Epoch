import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "diffusion-models", title: "Diffusion Models", status: "Coming Soon" },
  { slug: "gans", title: "Generative Adversarial Networks", status: "Coming Soon" },
  { slug: "vaes", title: "Variational Autoencoders", status: "Coming Soon" },
  { slug: "llm-fundamentals", title: "LLM Fundamentals", status: "Coming Soon" },
  { slug: "prompt-engineering", title: "Prompt Engineering", status: "Coming Soon" },
  { slug: "rag-systems", title: "RAG Systems", status: "Coming Soon" },
  { slug: "multimodal-generation", title: "Multimodal Generation", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Generative AI`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function GenerativeAITopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="Generative AI"
    subjectDescription="Diffusion models, GANs, VAEs, LLMs, prompt engineering, RAG, and multimodal generation."
    topics={reorderedTopics}
  />;
}