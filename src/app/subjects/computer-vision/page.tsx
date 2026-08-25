import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "Computer Vision Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on CNNs, residual connections, ViT transformers, segmentation, and diffusion models.",
};

const TOPICS = [
  { slug: "convolutional-networks", title: "Convolutional Neural Networks", status: "Coming Soon" },
  { slug: "residual-connections", title: "Residual Connections & ResNet", status: "Coming Soon" },
  { slug: "vision-transformers", title: "Vision Transformers (ViT)", status: "Coming Soon" },
  { slug: "image-segmentation", title: "Image Segmentation", status: "Coming Soon" },
  { slug: "object-detection", title: "Object Detection", status: "Coming Soon" },
  { slug: "diffusion-models-cv", title: "Diffusion Models for Vision", status: "Coming Soon" },
];

export default function ComputerVisionSubjectPage() {
  return <ComingSoonView 
    subjectTitle="Computer Vision"
    subjectDescription="Convolutional neural networks, residual connections, ViT transformers, segmentation, and diffusion."
    topics={TOPICS} 
  />;
}