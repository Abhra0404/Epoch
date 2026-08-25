import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "Agentic AI Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on autonomous agents, tool use, planning, multi-agent systems, LangChain, and agent orchestration.",
};

const TOPICS = [
  { slug: "autonomous-agents", title: "Autonomous Agents", status: "Coming Soon" },
  { slug: "tool-use", title: "Tool Use & Function Calling", status: "Coming Soon" },
  { slug: "planning-reasoning", title: "Planning & Reasoning", status: "Coming Soon" },
  { slug: "multi-agent-systems", title: "Multi-Agent Systems", status: "Coming Soon" },
  { slug: "langchain-agents", title: "LangChain Agent Framework", status: "Coming Soon" },
  { slug: "agent-orchestration", title: "Agent Orchestration", status: "Coming Soon" },
];

export default function AgenticAISubjectPage() {
  return <ComingSoonView 
    subjectTitle="Agentic AI"
    subjectDescription="Autonomous agents, tool use, planning, multi-agent systems, LangChain, and agent orchestration."
    topics={TOPICS} 
  />;
}