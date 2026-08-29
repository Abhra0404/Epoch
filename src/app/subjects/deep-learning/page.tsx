import { getAllTopics } from "@/lib/topics";
import { NotesClientView } from "../machine-learning/NotesClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deep Learning Notes | Epoch Platform",
  description: "Comprehensive notes on neural networks, backpropagation, architectures, and PyTorch implementations.",
};

export default function DeepLearningSubjectPage() {
  const allTopics = getAllTopics();
  const topics = allTopics.filter((t) => t.subject === "deep-learning");
  const defaultSlug = topics[0]?.slug || "neural-network-fundamentals";

  return <NotesClientView topics={topics} currentSlug={defaultSlug} subject="deep-learning" subjectTitle="Deep Learning" />;
}
