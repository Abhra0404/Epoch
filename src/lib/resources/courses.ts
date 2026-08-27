export type Cost = "Free" | "Paid";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  title: string;
  url: string;
  provider: string;
  difficulty: Difficulty;
  cost: Cost;
  duration: string;
}

export interface CourseCategory {
  name: string;
  courses: Course[];
}

export const courseCategories: CourseCategory[] = [
  {
    name: "Machine Learning",
    courses: [
      {
        title: "Stanford CS229 — Machine Learning",
        url: "https://cs229.stanford.edu/",
        provider: "Stanford University",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "10 weeks",
      },
      {
        title: "Google Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        provider: "Google",
        difficulty: "Beginner",
        cost: "Free",
        duration: "15 hours",
      },
      {
        title: "Machine Learning Specialization",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        provider: "DeepLearning.AI / Coursera",
        difficulty: "Beginner",
        cost: "Paid",
        duration: "3 months",
      },
    ],
  },
  {
    name: "Deep Learning",
    courses: [
      {
        title: "Deep Learning Specialization",
        url: "https://www.coursera.org/specializations/deep-learning",
        provider: "DeepLearning.AI / Coursera",
        difficulty: "Intermediate",
        cost: "Paid",
        duration: "5 months",
      },
      {
        title: "Practical Deep Learning for Coders",
        url: "https://course.fast.ai/",
        provider: "fast.ai",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "7 weeks",
      },
      {
        title: "MIT 6.S191 — Introduction to Deep Learning",
        url: "https://introtodeeplearning.com/",
        provider: "MIT",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "6 weeks",
      },
    ],
  },
  {
    name: "Mathematics",
    courses: [
      {
        title: "Mathematics for Machine Learning",
        url: "https://www.coursera.org/specializations/mathematics-machine-learning",
        provider: "Imperial College / Coursera",
        difficulty: "Beginner",
        cost: "Paid",
        duration: "4 months",
      },
      {
        title: "MIT 18.06 — Linear Algebra",
        url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
        provider: "MIT OpenCourseWare",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "14 weeks",
      },
    ],
  },
  {
    name: "NLP & Transformers",
    courses: [
      {
        title: "Stanford CS224N — NLP with Deep Learning",
        url: "https://web.stanford.edu/class/cs224n/",
        provider: "Stanford University",
        difficulty: "Advanced",
        cost: "Free",
        duration: "10 weeks",
      },
      {
        title: "Hugging Face LLM Course",
        url: "https://huggingface.co/learn/llm-course",
        provider: "Hugging Face",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "4 weeks",
      },
    ],
  },
  {
    name: "Computer Vision",
    courses: [
      {
        title: "Stanford CS231N — Deep Learning for Computer Vision",
        url: "https://cs231n.stanford.edu/",
        provider: "Stanford University",
        difficulty: "Advanced",
        cost: "Free",
        duration: "10 weeks",
      },
    ],
  },
  {
    name: "Generative AI",
    courses: [
      {
        title: "Hugging Face Diffusion Models Course",
        url: "https://huggingface.co/learn/diffusion-course",
        provider: "Hugging Face",
        difficulty: "Advanced",
        cost: "Free",
        duration: "4 weeks",
      },
      {
        title: "Generative AI with Large Language Models",
        url: "https://www.coursera.org/learn/generative-ai-with-llms",
        provider: "DeepLearning.AI / Coursera",
        difficulty: "Intermediate",
        cost: "Paid",
        duration: "3 weeks",
      },
    ],
  },
  {
    name: "MLOps",
    courses: [
      {
        title: "Full Stack Deep Learning",
        url: "https://fullstackdeeplearning.com/",
        provider: "UC Berkeley",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "8 weeks",
      },
      {
        title: "Made With ML",
        url: "https://madewithml.com/",
        provider: "Made With ML",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "Self-paced",
      },
    ],
  },
  {
    name: "Reinforcement Learning",
    courses: [
      {
        title: "DeepMind — Reinforcement Learning Course",
        url: "https://www.deepmind.com/learning-resources/reinforcement-learning-course",
        provider: "DeepMind",
        difficulty: "Advanced",
        cost: "Free",
        duration: "6 weeks",
      },
    ],
  },
  {
    name: "Agentic AI",
    courses: [
      {
        title: "Hugging Face Agents Course",
        url: "https://huggingface.co/learn/agents-course",
        provider: "Hugging Face",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "4 weeks",
      },
      {
        title: "DeepLearning.AI Short Courses",
        url: "https://www.deeplearning.ai/short-courses/",
        provider: "DeepLearning.AI",
        difficulty: "Intermediate",
        cost: "Free",
        duration: "Self-paced",
      },
    ],
  },
];

export const totalCourseCount = courseCategories.reduce(
  (sum, cat) => sum + cat.courses.length,
  0
);
