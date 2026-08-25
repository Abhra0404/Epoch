import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "autonomous-agents", title: "Autonomous Agents", status: "Coming Soon" },
  { slug: "tool-use", title: "Tool Use & Function Calling", status: "Coming Soon" },
  { slug: "planning-reasoning", title: "Planning & Reasoning", status: "Coming Soon" },
  { slug: "multi-agent-systems", title: "Multi-Agent Systems", status: "Coming Soon" },
  { slug: "langchain-agents", title: "LangChain Agent Framework", status: "Coming Soon" },
  { slug: "agent-orchestration", title: "Agent Orchestration", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Agentic AI`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function AgenticAITopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="Agentic AI"
    subjectDescription="Autonomous agents, tool use, planning, multi-agent systems, LangChain, and agent orchestration."
    topics={reorderedTopics}
  />;
}