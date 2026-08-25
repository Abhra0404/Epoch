import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "MLOps & Production Systems Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on containerization, feature stores, experiment tracking, model monitoring, and deployment.",
};

const TOPICS = [
  { slug: "containerization", title: "Containerization with Docker", status: "Coming Soon" },
  { slug: "feature-stores", title: "Feature Store Implementation", status: "Coming Soon" },
  { slug: "experiment-tracking", title: "Experiment Tracking with MLflow", status: "Coming Soon" },
  { slug: "model-monitoring", title: "Model Monitoring & Drift Detection", status: "Coming Soon" },
  { slug: "model-deployment", title: "Model Deployment Strategies", status: "Coming Soon" },
];

export default function MLOpsSubjectPage() {
  return <ComingSoonView 
    subjectTitle="MLOps & Production Systems"
    subjectDescription="Containerization, feature stores, experiment tracking with MLflow, model monitoring, and deployment."
    topics={TOPICS} 
  />;
}