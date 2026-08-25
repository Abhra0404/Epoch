import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "Mathematics for ML Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on matrix calculus, linear transformations, probability distributions, and convex optimization.",
};

const TOPICS = [
  { slug: "linear-algebra", title: "Linear Algebra Fundamentals", status: "Coming Soon" },
  { slug: "matrix-calculus", title: "Matrix Calculus", status: "Coming Soon" },
  { slug: "probability-distributions", title: "Probability Distributions", status: "Coming Soon" },
  { slug: "convex-optimization", title: "Convex Optimization", status: "Coming Soon" },
  { slug: "information-theory", title: "Information Theory", status: "Coming Soon" },
  { slug: "statistical-inference", title: "Statistical Inference", status: "Coming Soon" },
];

export default function MathematicsSubjectPage() {
  return <ComingSoonView 
    subjectTitle="Mathematics for ML"
    subjectDescription="Essential matrix calculus, linear transformations, probability distributions, and convex optimization."
    topics={TOPICS} 
  />;
}