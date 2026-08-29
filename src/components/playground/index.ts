"use client";

import dynamic from "next/dynamic";

const GradientDescentExperiment = dynamic(
  () => import("./GradientDescentExperiment").then((m) => m.GradientDescentExperiment),
  { ssr: false }
);
const LinearRegressionExperiment = dynamic(
  () => import("./LinearRegressionExperiment").then((m) => m.LinearRegressionExperiment),
  { ssr: false }
);
const KMeansExperiment = dynamic(
  () => import("./KMeansExperiment").then((m) => m.KMeansExperiment),
  { ssr: false }
);
const NeuralNetworkExperiment = dynamic(
  () => import("./NeuralNetworkExperiment").then((m) => m.NeuralNetworkExperiment),
  { ssr: false }
);
const RegularizationExperiment = dynamic(
  () => import("./RegularizationExperiment").then((m) => m.RegularizationExperiment),
  { ssr: false }
);
const DecisionBoundaryExperiment = dynamic(
  () => import("./DecisionBoundaryExperiment").then((m) => m.DecisionBoundaryExperiment),
  { ssr: false }
);
const AttentionMechanismExperiment = dynamic(
  () => import("./AttentionMechanismExperiment").then((m) => m.AttentionMechanismExperiment),
  { ssr: false }
);
const ConvolutionalFilterExperiment = dynamic(
  () => import("./ConvolutionalFilterExperiment").then((m) => m.ConvolutionalFilterExperiment),
  { ssr: false }
);
const GANTrainingExperiment = dynamic(
  () => import("./GANTrainingExperiment").then((m) => m.GANTrainingExperiment),
  { ssr: false }
);
const WordEmbeddingsExperiment = dynamic(
  () => import("./WordEmbeddingsExperiment").then((m) => m.WordEmbeddingsExperiment),
  { ssr: false }
);

export const experimentComponents: Record<string, React.ComponentType> = {
  "gradient-descent": GradientDescentExperiment,
  "linear-regression": LinearRegressionExperiment,
  "k-means-clustering": KMeansExperiment,
  "neural-network": NeuralNetworkExperiment,
  "regularization": RegularizationExperiment,
  "decision-boundary": DecisionBoundaryExperiment,
  "attention-mechanism": AttentionMechanismExperiment,
  "convolutional-filter": ConvolutionalFilterExperiment,
  "gan-training": GANTrainingExperiment,
  "word-embeddings": WordEmbeddingsExperiment,
};
