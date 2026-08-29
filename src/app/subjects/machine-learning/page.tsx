import { getAllTopics } from "@/lib/topics";
import { NotesClientView } from "./NotesClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning Notes | Epoch Platform",
  description: "Curated, comprehensive notes with mathematical derivations and Python implementations.",
};

export default function MachineLearningSubjectPage() {
  const allTopics = getAllTopics();
  const topics = allTopics.filter((t) => t.subject === "machine-learning");
  const defaultSlug = topics[0]?.slug || "simple-linear-regression";

  return <NotesClientView topics={topics} currentSlug={defaultSlug} subject="machine-learning" subjectTitle="Machine Learning" />;
}
