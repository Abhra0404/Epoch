import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "neural-network-fundamentals", title: "Neural Network Fundamentals", status: "Coming Soon" },
  { slug: "backpropagation", title: "Backpropagation & Gradient Flow", status: "Coming Soon" },
  { slug: "activation-functions", title: "Activation Functions", status: "Coming Soon" },
  { slug: "loss-functions", title: "Loss Functions", status: "Coming Soon" },
  { slug: "optimization-techniques", title: "Optimization Techniques", status: "Coming Soon" },
  { slug: "cnn-architectures", title: "CNN Architectures", status: "Coming Soon" },
  { slug: "rnn-lstm", title: "RNN & LSTM Networks", status: "Coming Soon" },
  { slug: "transformer-architecture", title: "Transformer Architecture", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Deep Learning`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function DeepLearningTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="Deep Learning & Neural Networks"
    subjectDescription="Multilayer Perceptrons, backpropagation dynamics, loss surfaces, activations, PyTorch, and optimization."
    topics={reorderedTopics}
  />;
}