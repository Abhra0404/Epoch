import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "NLP & Transformer Models Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on self-attention, tokenization, BERT, GPT, LoRA, and preference alignment.",
};

const TOPICS = [
  { slug: "tokenization", title: "Tokenization Methods", status: "Coming Soon" },
  { slug: "self-attention", title: "Self-Attention Mechanism", status: "Coming Soon" },
  { slug: "bert-architecture", title: "BERT Architecture", status: "Coming Soon" },
  { slug: "gpt-architecture", title: "GPT Architecture", status: "Coming Soon" },
  { slug: "lora-fine-tuning", title: "LoRA Fine-tuning", status: "Coming Soon" },
  { slug: "preference-alignment", title: "Preference Alignment (RLHF)", status: "Coming Soon" },
  { slug: "multilingual-nlp", title: "Multilingual NLP", status: "Coming Soon" },
];

export default function NLPSubjectPage() {
  return <ComingSoonView 
    subjectTitle="NLP & Transformer Models"
    subjectDescription="Self-attention mechanisms, tokenization, BERT, GPT architecture, LoRA, and preference alignment."
    topics={TOPICS} 
  />;
}