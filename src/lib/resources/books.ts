export interface BookItem {
  title: string;
  author: string;
}

export const booksBySubcategory: Record<string, BookItem[]> = {
  "ML Foundations": [
    { title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow", author: "Aurélien Géron" },
    { title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop" },
    { title: "The Elements of Statistical Learning", author: "Hastie, Tibshirani, Friedman" },
    { title: "An Introduction to Statistical Learning", author: "James, Witten, Hastie, Tibshirani" },
  ],
  "Mathematics": [
    { title: "Mathematics for Machine Learning", author: "Deisenroth, Faisal, Ong" },
    { title: "Probabilistic Machine Learning: An Introduction", author: "Kevin Murphy" },
    { title: "All of Statistics", author: "Larry Wasserman" },
  ],
  "Deep Learning": [
    { title: "Deep Learning", author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville" },
    { title: "Dive into Deep Learning", author: "Zhang et al." },
    { title: "Understanding Deep Learning", author: "Simon J.D. Prince" },
  ],
  "NLP / LLMs": [
    { title: "Speech and Language Processing", author: "Jurafsky & Martin" },
    { title: "Natural Language Processing with Transformers", author: "Tunstall, von Werra, Wolf" },
    { title: "Build a Large Language Model (From Scratch)", author: "Sebastian Raschka" },
  ],
  "Computer Vision": [
    { title: "Computer Vision: Algorithms and Applications", author: "Richard Szeliski" },
    { title: "Deep Learning for Vision Systems", author: "Mohamed Elgendy" },
  ],
  "Reinforcement Learning": [
    { title: "Reinforcement Learning: An Introduction", author: "Sutton & Barto" },
  ],
  "MLOps / ML Systems": [
    { title: "Designing Machine Learning Systems", author: "Chip Huyen" },
    { title: "Machine Learning Engineering", author: "Andriy Burkov" },
    { title: "Reliable Machine Learning", author: "Cathy Chen et al." },
  ],
  "Research": [
    { title: "The Scientist and Engineer's Guide to Digital Signal Processing", author: "Steven W. Smith" },
  ],
};

export const totalBookCount = Object.values(booksBySubcategory).reduce(
  (sum, books) => sum + books.length,
  0
);
