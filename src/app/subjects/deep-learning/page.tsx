import { Metadata } from "next";
import { ComingSoonView } from "./ComingSoonView";

export const metadata: Metadata = {
  title: "Deep Learning Notes | Epoch Platform",
  description: "Coming soon: Comprehensive notes on neural networks, backpropagation, architectures, and PyTorch implementations.",
};

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

export default function DeepLearningSubjectPage() {
  return <ComingSoonView 
    subjectTitle="Deep Learning & Neural Networks"
    subjectDescription="Multilayer Perceptrons, backpropagation dynamics, loss surfaces, activations, PyTorch, and optimization."
    topics={TOPICS} 
  />;
}