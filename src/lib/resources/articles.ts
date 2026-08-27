export interface Article {
  title: string;
  url: string;
  description: string;
}

export interface ArticleCategory {
  name: string;
  articles: Article[];
}

export const articleCategories: ArticleCategory[] = [
  {
    name: "Machine Learning",
    articles: [
      {
        title: "Scikit-learn User Guide",
        url: "https://scikit-learn.org/stable/user_guide.html",
        description: "Comprehensive documentation for scikit-learn's machine learning algorithms and tools",
      },
      {
        title: "Google Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        description: "Google's fast-paced, practical introduction to machine learning",
      },
      {
        title: "Machine Learning Mastery",
        url: "https://machinelearningmastery.com/",
        description: "Tutorials and guides for machine learning practitioners",
      },
    ],
  },
  {
    name: "Deep Learning",
    articles: [
      {
        title: "PyTorch Tutorials",
        url: "https://pytorch.org/tutorials/",
        description: "Official PyTorch tutorials covering basics to advanced topics",
      },
      {
        title: "TensorFlow Tutorials",
        url: "https://www.tensorflow.org/tutorials",
        description: "Official TensorFlow tutorials and guides",
      },
      {
        title: "Dive into Deep Learning",
        url: "https://d2l.ai/",
        description: "Interactive deep learning book with code, math, and discussions",
      },
      {
        title: "Stanford CS231n Notes",
        url: "https://cs231n.stanford.edu/",
        description: "Course notes for CNNs for Visual Recognition",
      },
    ],
  },
  {
    name: "NLP & Transformers",
    articles: [
      {
        title: "Stanford CS224N",
        url: "https://web.stanford.edu/class/cs224n/",
        description: "Natural Language Processing with Deep Learning course materials",
      },
      {
        title: "Hugging Face Learn",
        url: "https://huggingface.co/learn",
        description: "Free courses and tutorials on NLP, transformers, and ML",
      },
      {
        title: "The Illustrated Transformer",
        url: "https://jalammar.github.io/illustrated-transformer/",
        description: "Visual walkthrough of the Transformer architecture",
      },
    ],
  },
  {
    name: "Generative AI & LLMs",
    articles: [
      {
        title: "OpenAI Cookbook",
        url: "https://cookbook.openai.com/",
        description: "Examples and guides for using OpenAI APIs",
      },
      {
        title: "Hugging Face LLM Course",
        url: "https://huggingface.co/learn/large-language-course",
        description: "Comprehensive course on building with large language models",
      },
      {
        title: "Lil'Log",
        url: "https://lilianweng.github.io/",
        description: "Lilian Weng's blog on AI, LLMs, and machine learning research",
      },
    ],
  },
  {
    name: "MLOps",
    articles: [
      {
        title: "Made With ML",
        url: "https://madewithml.com/",
        description: "Learn how to develop, deploy, and ship ML products",
      },
      {
        title: "Full Stack Deep Learning",
        url: "https://fullstackdeeplearning.com/",
        description: "Course on building real-world deep learning applications",
      },
      {
        title: "MLflow Documentation",
        url: "https://mlflow.org/docs/latest/index.html",
        description: "Documentation for ML lifecycle management platform",
      },
    ],
  },
  {
    name: "Computer Vision",
    articles: [
      {
        title: "OpenCV Documentation",
        url: "https://docs.opencv.org/4.x/",
        description: "Official OpenCV documentation for computer vision tasks",
      },
      {
        title: "Stanford CS231n",
        url: "https://cs231n.stanford.edu/",
        description: "Course materials for CNNs and visual recognition",
      },
      {
        title: "Papers with Code - CV",
        url: "https://paperswithcode.com/area/computer-vision",
        description: "Computer vision papers with implementations",
      },
    ],
  },
  {
    name: "Research",
    articles: [
      {
        title: "arXiv",
        url: "https://arxiv.org/",
        description: "Open-access archive for scholarly articles in AI, ML, and more",
      },
      {
        title: "Papers with Code",
        url: "https://paperswithcode.com/",
        description: "Latest ML papers with code repositories and benchmarks",
      },
      {
        title: "Google Research",
        url: "https://research.google/",
        description: "Google's research publications and projects in AI",
      },
      {
        title: "Hugging Face Papers",
        url: "https://huggingface.co/papers",
        description: "Daily paper recommendations and discussions from the HF community",
      },
    ],
  },
];

export const totalArticleCount = articleCategories.reduce(
  (sum, cat) => sum + cat.articles.length,
  0
);
