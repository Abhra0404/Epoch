import { getAllTopics } from "@/lib/topics";
import { NotesClientView } from "./NotesClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning Notes | Epoch Platform",
  description: "Curated, comprehensive notes with mathematical derivations and Python implementations.",
};

export default function MachineLearningSubjectPage() {
  const topics = getAllTopics();
  // Default to simple-linear-regression (first topic)
  const defaultSlug = "simple-linear-regression";

  return <NotesClientView topics={topics} currentSlug={defaultSlug} />;
}
