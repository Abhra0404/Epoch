import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "Python & ML Tooling Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, and essential data science tooling.",
};

export default function PythonLibrariesSubjectPage() {
  return <ComingSoonView 
    subjectTitle="Python & ML Tooling"
    subjectDescription="NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, and essential data science tooling."
    topics={[
      { slug: "numpy-fundamentals", title: "NumPy Fundamentals", status: "Coming Soon" },
      { slug: "pandas-data-manipulation", title: "Pandas Data Manipulation", status: "Coming Soon" },
      { slug: "scikit-learn-basics", title: "Scikit-learn Basics", status: "Coming Soon" },
      { slug: "matplotlib-visualization", title: "Matplotlib Visualization", status: "Coming Soon" },
      { slug: "seaborn-statistical-plots", title: "Seaborn Statistical Plots", status: "Coming Soon" },
      { slug: "data-preprocessing-pipelines", title: "Data Preprocessing Pipelines", status: "Coming Soon" },
      { slug: "feature-engineering-sklearn", title: "Feature Engineering with Scikit-learn", status: "Coming Soon" },
      { slug: "model-evaluation-sklearn", title: "Model Evaluation with Scikit-learn", status: "Coming Soon" },
    ]} 
  />;
}