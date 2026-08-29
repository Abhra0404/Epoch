import { getAllTopics } from "@/lib/topics";
import { NotesClientView } from "../machine-learning/NotesClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python & ML Tooling Notes | Epoch Platform",
  description: "Comprehensive notes on NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, and essential data science tooling.",
};

export default function PythonLibrariesSubjectPage() {
  const allTopics = getAllTopics();
  const topics = allTopics.filter((t) => t.subject === "python-libraries");
  const defaultSlug = topics[0]?.slug || "numpy-fundamentals";

  return (
    <NotesClientView 
      topics={topics} 
      currentSlug={defaultSlug} 
      subject="python-libraries" 
      subjectTitle="Python & ML Tooling" 
    />
  );
}