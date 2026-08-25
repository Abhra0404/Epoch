import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "tokenization", title: "Tokenization Methods", status: "Coming Soon" },
  { slug: "self-attention", title: "Self-Attention Mechanism", status: "Coming Soon" },
  { slug: "bert-architecture", title: "BERT Architecture", status: "Coming Soon" },
  { slug: "gpt-architecture", title: "GPT Architecture", status: "Coming Soon" },
  { slug: "lora-fine-tuning", title: "LoRA Fine-tuning", status: "Coming Soon" },
  { slug: "preference-alignment", title: "Preference Alignment (RLHF)", status: "Coming Soon" },
  { slug: "multilingual-nlp", title: "Multilingual NLP", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch NLP`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function NLPTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="NLP & Transformer Models"
    subjectDescription="Self-attention mechanisms, tokenization, BERT, GPT architecture, LoRA, and preference alignment."
    topics={reorderedTopics}
  />;
}