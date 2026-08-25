import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "Generative AI Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on Diffusion models, GANs, VAEs, LLMs, prompt engineering, RAG, and multimodal generation.",
};

const TOPICS = [
  { slug: "diffusion-models", title: "Diffusion Models", status: "Coming Soon" },
  { slug: "gans", title: "Generative Adversarial Networks", status: "Coming Soon" },
  { slug: "vaes", title: "Variational Autoencoders", status: "Coming Soon" },
  { slug: "llm-fundamentals", title: "LLM Fundamentals", status: "Coming Soon" },
  { slug: "prompt-engineering", title: "Prompt Engineering", status: "Coming Soon" },
  { slug: "rag-systems", title: "RAG Systems", status: "Coming Soon" },
  { slug: "multimodal-generation", title: "Multimodal Generation", status: "Coming Soon" },
];

export default function GenerativeAISubjectPage() {
  return <ComingSoonView 
    subjectTitle="Generative AI"
    subjectDescription="Diffusion models, GANs, VAEs, LLMs, prompt engineering, RAG, and multimodal generation."
    topics={TOPICS} 
  />;
}