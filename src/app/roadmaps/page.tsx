"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Clock, 
  Award, 
  Sparkles, 
  ChevronRight, 
  BookOpen,
  Terminal,
  Brain,
  Cpu,
  Calculator
} from "lucide-react";

interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  prerequisite: string;
  linkedSlug?: string;
  isMilestone?: boolean;
}

interface RoadmapPath {
  id: string;
  title: string;
  icon: any;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  steps: RoadmapStep[];
}

const roadmaps: RoadmapPath[] = [
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer Path",
    icon: Compass,
    duration: "8 Weeks",
    level: "Intermediate",
    description: "Master supervised learning, loss optimization, regularization, and model evaluation from mathematical roots to python code.",
    steps: [
      {
        id: "ml-1",
        stepNumber: 1,
        title: "Simple & Multiple Linear Regression",
        duration: "Week 1-2",
        description: "Learn closed-form Normal Equations, feature matrices, and residual error minimization.",
        prerequisite: "Basic Algebra & Matrix Operations",
        linkedSlug: "multiple-linear-regression"
      },
      {
        id: "ml-2",
        stepNumber: 2,
        title: "Loss Functions & Gradient Descent",
        duration: "Week 3",
        description: "Derive gradients for MSE loss, step size tuning, learning rates, and stochastic gradient descent (SGD).",
        prerequisite: "Partial Derivatives",
        linkedSlug: "loss-function-and-gradient-descent"
      },
      {
        id: "ml-3",
        stepNumber: 3,
        title: "Ridge (L2) & Lasso (L1) Regularization",
        duration: "Week 4",
        description: "Understand shrinkage penalties, bias-variance tradeoff, and sparsity in linear models.",
        prerequisite: "Linear Regression & Gradient Descent",
        linkedSlug: "ridge-and-lasso-regularization"
      },
      {
        id: "ml-4",
        stepNumber: 4,
        title: "Regression Model Evaluation",
        duration: "Week 5",
        description: "Analyze metrics: MSE, RMSE, MAE, R-squared, Adjusted R-squared, and residual plots.",
        prerequisite: "Model Fitting Basics",
        linkedSlug: "regression-evaluation"
      },
      {
        id: "ml-5",
        stepNumber: 5,
        title: "Decision Trees & Ensemble Methods",
        duration: "Week 6-7",
        description: "Explore Gini Impurity, Information Gain, Random Forests, and Gradient Boosting.",
        prerequisite: "Probability & Classification",
        linkedSlug: "decision-tree-fundamentals"
      },
      {
        id: "ml-6",
        stepNumber: 6,
        title: "Capstone Milestone: End-to-End Valuation Pipeline",
        duration: "Week 8",
        description: "Build a production-grade machine learning model pipeline with cross-validation and feature scaling.",
        prerequisite: "All ML Modules",
        isMilestone: true
      }
    ]
  },
  {
    id: "deep-learning",
    title: "Deep Learning & GenAI Specialist",
    icon: Brain,
    duration: "10 Weeks",
    level: "Advanced",
    description: "Build deep neural networks, computational autograd engines, transformer architectures, and LLM fine-tuning pipelines.",
    steps: [
      {
        id: "dl-1",
        stepNumber: 1,
        title: "Perceptrons & Multilayer Neural Networks",
        duration: "Week 1-2",
        description: "Study forward propagation, activation functions (ReLU, Sigmoid, GELU), and weight initialization.",
        prerequisite: "Linear Algebra & Gradient Descent",
        linkedSlug: "logistic-regression-and-the-sigmoid-function"
      },
      {
        id: "dl-2",
        stepNumber: 2,
        title: "Backpropagation & Autograd Graphs",
        duration: "Week 3-4",
        description: "Understand automatic differentiation, chain rule execution graphs, and PyTorch autograd engine.",
        prerequisite: "Multivariable Calculus",
        linkedSlug: "loss-function-and-gradient-descent"
      },
      {
        id: "dl-3",
        stepNumber: 3,
        title: "Transformer Architectures & Self-Attention",
        duration: "Week 5-7",
        description: "Derive Scaled Dot-Product Attention, Query-Key-Value matrices, and multi-head attention blocks.",
        prerequisite: "Neural Networks & PyTorch",
      },
      {
        id: "dl-4",
        stepNumber: 4,
        title: "Capstone Milestone: Custom LLM LoRA Fine-Tuning",
        duration: "Week 8-10",
        description: "Implement Low-Rank Adaptation (LoRA) and Direct Preference Optimization (DPO) on open weights.",
        prerequisite: "Transformer Architectures",
        isMilestone: true
      }
    ]
  },
  {
    id: "math-foundations",
    title: "Mathematics & Foundations Path",
    icon: Calculator,
    duration: "6 Weeks",
    level: "Beginner",
    description: "The mathematical backbone required for AI/ML: Matrix Calculus, Probability Theory, and Vector Spaces.",
    steps: [
      {
        id: "math-1",
        stepNumber: 1,
        title: "Vector Spaces, Matrices & Eigenvalues",
        duration: "Week 1-2",
        description: "Matrix multiplications, rank, determinants, eigenvectors, and Singular Value Decomposition (SVD).",
        prerequisite: "High School Algebra",
      },
      {
        id: "math-2",
        stepNumber: 2,
        title: "Multivariable Calculus & Gradients",
        duration: "Week 3-4",
        description: "Partial derivatives, Jacobians, Hessians, directional gradients, and Taylor expansions.",
        prerequisite: "Single Variable Calculus",
      },
      {
        id: "math-3",
        stepNumber: 3,
        title: "Probability & Maximum Likelihood Estimation",
        duration: "Week 5-6",
        description: "Gaussian distributions, Bayes rule, joint distributions, cross-entropy, and KL Divergence.",
        prerequisite: "Calculus & Matrix Operations",
        isMilestone: true
      }
    ]
  },
  {
    id: "mlops-systems",
    title: "MLOps & Systems Engineering Path",
    icon: Cpu,
    duration: "8 Weeks",
    level: "Intermediate",
    description: "Bridge model prototyping and real-time production serving with automated CI/CD and drift monitoring.",
    steps: [
      {
        id: "ops-1",
        stepNumber: 1,
        title: "Data Pipelines & Feature Stores",
        duration: "Week 1-2",
        description: "Version control datasets, schema enforcement, and feature store architectures.",
        prerequisite: "Python & SQL Basics",
      },
      {
        id: "ops-2",
        stepNumber: 2,
        title: "Experiment Tracking & Model Registries",
        duration: "Week 3-4",
        description: "Track hyperparameters, artifacts, and metrics with MLflow and Weights & Biases.",
        prerequisite: "Model Training Basics",
      },
      {
        id: "ops-3",
        stepNumber: 3,
        title: "FastAPI Model Serving & Docker",
        duration: "Week 5-6",
        description: "Package PyTorch/Scikit models inside lightweight Docker containers with REST endpoints.",
        prerequisite: "Docker & Python APIs",
      },
      {
        id: "ops-4",
        stepNumber: 4,
        title: "Capstone Milestone: Continuous Deployment & Monitoring",
        duration: "Week 7-8",
        description: "Deploy a production model API with telemetry, data drift detection, and automated rollback.",
        prerequisite: "Docker & MLflow",
        isMilestone: true
      }
    ]
  }
];

export default function RoadmapsPage() {
  const [activePathId, setActivePathId] = useState<string>("ml-engineer");
  const [completedSteps, setCompletedSteps] = useState<string[]>(["ml-1"]);

  const activePath = roadmaps.find((r) => r.id === activePathId) || roadmaps[0];

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const pathCompletedCount = activePath.steps.filter((s) => completedSteps.includes(s.id)).length;
  const progressPercent = Math.round((pathCompletedCount / activePath.steps.length) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Header section */}
        <section className="text-center max-w-3xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-accent shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Curated Career & Skill Paths
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Structured Roadmaps to AI & ML Mastery
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Follow DAG-based sequence flows designed by ML engineers. Step through prerequisite notes, hand-calculable math examples, and capstone milestone projects.
          </p>
        </section>

        {/* Roadmap Path Selectors */}
        <section className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {roadmaps.map((path) => {
            const Icon = path.icon;
            const isSelected = path.id === activePathId;

            return (
              <button
                key={path.id}
                onClick={() => setActivePathId(path.id)}
                className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-accent/15 text-accent border-accent/40 shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {path.title}
              </button>
            );
          })}
        </section>

        {/* Selected Roadmap Overview Card */}
        <section className="mt-10 paper-card-elevated p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                  {activePath.duration}
                </span>
                <span className="rounded-full bg-secondary border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {activePath.level} Level
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {activePath.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {activePath.description}
              </p>
            </div>

            {/* Path Progress Widget */}
            <div className="paper-inner p-4 rounded-[1.5rem] min-w-64 border border-border">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Path Completion</span>
                <span className="text-accent">{progressPercent}%</span>
              </div>
              <div className="mt-2 h-2 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {pathCompletedCount} of {activePath.steps.length} milestones completed
              </p>
            </div>
          </div>

          {/* DAG Visual Node Timeline */}
          <div className="mt-8 space-y-6 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-border/60">
            {activePath.steps.map((step) => {
              const isDone = completedSteps.includes(step.id);

              return (
                <div
                  key={step.id}
                  className={`relative flex items-start gap-4 sm:gap-6 pl-2 ${
                    step.isMilestone ? "paper-inner p-4 sm:p-6 rounded-[2rem] border border-accent/30" : ""
                  }`}
                >
                  {/* Node Toggle Button */}
                  <button
                    onClick={() => toggleStepCompleted(step.id)}
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isDone
                        ? "border-accent bg-accent text-accent-foreground shadow-xs"
                        : "border-border bg-background text-muted-foreground hover:border-accent hover:text-accent"
                    }`}
                    title={isDone ? "Mark as incomplete" : "Mark as completed"}
                  >
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </button>

                  <div className="flex-grow pt-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                          Step 0{step.stepNumber}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </span>
                      </div>

                      {step.isMilestone && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 border border-accent/30 px-3 py-0.5 text-[10px] font-bold text-accent">
                          <Award className="h-3 w-3" />
                          Capstone Milestone
                        </span>
                      )}
                    </div>

                    <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border">
                        <span className="font-semibold text-foreground/80">Prerequisites:</span> {step.prerequisite}
                      </span>

                      {step.linkedSlug && (
                        <Link
                          href={`/subjects/machine-learning/${step.linkedSlug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Read Epoch Note
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
