import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonView } from "../ComingSoonView";

const TOPICS = [
  { slug: "convolutional-networks", title: "Convolutional Neural Networks", status: "Coming Soon" },
  { slug: "residual-connections", title: "Residual Connections & ResNet", status: "Coming Soon" },
  { slug: "vision-transformers", title: "Vision Transformers (ViT)", status: "Coming Soon" },
  { slug: "image-segmentation", title: "Image Segmentation", status: "Coming Soon" },
  { slug: "object-detection", title: "Object Detection", status: "Coming Soon" },
  { slug: "diffusion-models-cv", title: "Diffusion Models for Vision", status: "Coming Soon" },
];

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found | Epoch" };

  return {
    title: `${topic.title} Notes | Epoch Computer Vision`,
    description: `${topic.title} study notes - Coming Soon`,
  };
}

export default async function ComputerVisionTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const currentIndex = TOPICS.findIndex((t) => t.slug === slug);
  const reorderedTopics = [...TOPICS.slice(currentIndex), ...TOPICS.slice(0, currentIndex)];

  return <ComingSoonView 
    subjectTitle="Computer Vision"
    subjectDescription="Convolutional neural networks, residual connections, ViT transformers, segmentation, and diffusion."
    topics={reorderedTopics}
  />;
}