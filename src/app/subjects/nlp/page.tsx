import { getAllTopics } from "@/lib/topics";
import { NotesClientView } from "../machine-learning/NotesClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NLP & Transformer Models Notes | Epoch Platform",
  description: "Comprehensive notes on self-attention, tokenization, BERT, GPT, LoRA, and preference alignment.",
};

export default function NLPSubjectPage() {
  const allTopics = getAllTopics();
  const topics = allTopics.filter((t) => t.subject === "nlp");
  const defaultSlug = topics[0]?.slug || "tokenization-methods";

  return <NotesClientView topics={topics} currentSlug={defaultSlug} subject="nlp" subjectTitle="NLP & Transformer Models" />;
}
