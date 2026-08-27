export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Research";

export interface Project {
  slug: string;
  title: string;
  difficulty: Difficulty;
  domains: string[];
  skills: string[];
  type: string;
  overview: string;
  prerequisites: string[];
  techStack: string[];
  datasets: { name: string; source: string }[];
  buildPlan: { step: string; description: string }[];
  evaluation: { metric: string; target: string }[];
  extensions: string[];
  relatedTopics: { name: string; href: string }[];
  resources: { title: string; type: string; url: string }[];
}

export const domains = [
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Generative AI",
  "LLMs",
  "Agentic AI",
  "MLOps",
  "Reinforcement Learning",
  "Multimodal AI",
];

export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced", "Research"];

export const projects: Project[] = [
  // ── Beginner ──────────────────────────────────────
  {
    slug: "house-price-prediction",
    title: "House Price Prediction",
    difficulty: "Beginner",
    domains: ["Machine Learning"],
    skills: ["Regression", "Feature Engineering", "Evaluation"],
    type: "Regression",
    overview: "Build a regression model to predict house prices based on features like square footage, number of bedrooms, location, and more. This project teaches the fundamentals of supervised learning, feature engineering, and model evaluation.",
    prerequisites: [
      "Linear Algebra Basics",
      "Simple Linear Regression",
      "Multiple Linear Regression",
      "Loss Function & Gradient Descent",
    ],
    techStack: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "NumPy"],
    datasets: [
      { name: "Ames Housing Dataset", source: "Kaggle" },
      { name: "Boston Housing Dataset", source: "UCI ML Repository" },
    ],
    buildPlan: [
      { step: "1. Load & Explore Data", description: "Load the dataset, explore distributions, check for missing values, and understand feature types." },
      { step: "2. Feature Engineering", description: "Handle missing values, encode categorical variables, create new features (e.g., price per sqft), and scale numerical features." },
      { step: "3. Train/Test Split", description: "Split data into training (80%) and test (20%) sets. Consider cross-validation for robust evaluation." },
      { step: "4. Model Training", description: "Start with Linear Regression, then try Ridge and Lasso regularization. Compare performance." },
      { step: "5. Evaluation & Tuning", description: "Evaluate using RMSE, MAE, and R². Tune hyperparameters using grid search or cross-validation." },
      { step: "6. Visualization", description: "Plot residuals, feature importance, and predicted vs actual values to understand model behavior." },
    ],
    evaluation: [
      { metric: "RMSE", target: "< 30,000" },
      { metric: "R² Score", target: "> 0.85" },
      { metric: "MAE", target: "< 20,000" },
    ],
    extensions: [
      "Add geospatial features using latitude/longitude",
      "Try ensemble methods (Random Forest, Gradient Boosting)",
      "Build an interactive dashboard for predictions",
      "Deploy as a REST API with FastAPI",
    ],
    relatedTopics: [
      { name: "Simple Linear Regression", href: "/subjects/machine-learning/simple-linear-regression" },
      { name: "Multiple Linear Regression", href: "/subjects/machine-learning/multiple-linear-regression" },
      { name: "Regression Model Evaluation", href: "/subjects/machine-learning/regression-evaluation" },
    ],
    resources: [
      { title: "Scikit-learn Regression Guide", type: "Documentation", url: "https://scikit-learn.org/stable/supervised_learning.html" },
      { title: "Kaggle House Prices Competition", type: "Dataset", url: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques" },
    ],
  },
  {
    slug: "spam-detection",
    title: "Spam Detection",
    difficulty: "Beginner",
    domains: ["NLP", "Machine Learning"],
    skills: ["NLP", "Classification", "TF-IDF"],
    type: "Classification",
    overview: "Build a text classifier that detects spam emails or messages using NLP techniques. Learn how to convert text to features, handle imbalanced classes, and evaluate classification models.",
    prerequisites: [
      "Classification Fundamentals",
      "Naive Bayes",
      "Text Preprocessing Basics",
    ],
    techStack: ["Python", "NLTK", "Scikit-learn", "Pandas", "TF-IDF Vectorizer"],
    datasets: [
      { name: "SMS Spam Collection", source: "UCI ML Repository" },
      { name: "Enron Spam Dataset", source: "Kaggle" },
    ],
    buildPlan: [
      { step: "1. Load & Explore Data", description: "Load the SMS/email dataset, examine class distribution, and preview messages." },
      { step: "2. Text Preprocessing", description: "Lowercase, remove punctuation, tokenize, remove stopwords, and optionally stem/lemmatize." },
      { step: "3. Feature Extraction", description: "Convert text to numerical features using TF-IDF or Bag of Words." },
      { step: "4. Model Training", description: "Train Naive Bayes, Logistic Regression, and SVM classifiers." },
      { step: "5. Evaluation", description: "Evaluate using precision, recall, F1-score, and confusion matrix. Pay attention to class imbalance." },
      { step: "6. Pipeline", description: "Create a scikit-learn pipeline that chains preprocessing and classification." },
    ],
    evaluation: [
      { metric: "F1 Score", target: "> 0.95" },
      { metric: "Precision", target: "> 0.90" },
      { metric: "Recall", target: "> 0.95" },
    ],
    extensions: [
      "Add n-gram features for better context",
      "Try deep learning approaches (LSTM, CNN for text)",
      "Build a real-time email classifier",
      "Add explainability with LIME or SHAP",
    ],
    relatedTopics: [
      { name: "Naive Bayes", href: "/subjects/machine-learning/naive-bayes" },
      { name: "Classification Fundamentals", href: "/subjects/machine-learning/classification-fundamentals" },
      { name: "Classification Evaluation", href: "/subjects/machine-learning/classification-evaluation" },
    ],
    resources: [
      { title: "NLTK Documentation", type: "Documentation", url: "https://www.nltk.org/" },
      { title: "TF-IDF Explained", type: "Article", url: "https://scikit-learn.org/stable/modules/feature_extraction.html" },
    ],
  },
  {
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    difficulty: "Beginner",
    domains: ["Machine Learning"],
    skills: ["Classification", "EDA", "Feature Engineering"],
    type: "Classification",
    overview: "Predict which customers are likely to churn (cancel a subscription) based on their behavior and usage patterns. This project teaches exploratory data analysis, feature engineering for tabular data, and business-oriented ML.",
    prerequisites: [
      "Classification Fundamentals",
      "Loss Function & Gradient Descent",
      "Regression Model Evaluation",
    ],
    techStack: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    datasets: [
      { name: "Telco Customer Churn", source: "Kaggle" },
      { name: "Bank Customer Churn", source: "Kaggle" },
    ],
    buildPlan: [
      { step: "1. EDA", description: "Explore customer demographics, usage patterns, and churn distribution. Create visualizations to understand drivers of churn." },
      { step: "2. Feature Engineering", description: "Encode categorical variables, create tenure buckets, compute usage ratios, and handle missing values." },
      { step: "3. Handle Class Imbalance", description: "Apply SMOTE, undersampling, or class weights to address imbalanced churn data." },
      { step: "4. Model Training", description: "Train Logistic Regression, Random Forest, and XGBoost. Compare performance." },
      { step: "5. Evaluation", description: "Focus on recall (catching churning customers) and precision (not flagging loyal customers). Use ROC-AUC." },
      { step: "6. Interpret Results", description: "Extract feature importances and SHAP values to understand what drives churn." },
    ],
    evaluation: [
      { metric: "ROC-AUC", target: "> 0.85" },
      { metric: "Recall", target: "> 0.80" },
      { metric: "F1 Score", target: "> 0.75" },
    ],
    extensions: [
      "Build a churn risk dashboard",
      "Add time-series features (usage trends over time)",
      "Deploy with a real-time prediction API",
      "A/B test retention strategies based on predictions",
    ],
    relatedTopics: [
      { name: "Classification Fundamentals", href: "/subjects/machine-learning/classification-fundamentals" },
      { name: "Classification Evaluation", href: "/subjects/machine-learning/classification-evaluation" },
      { name: "Random Forest", href: "/subjects/machine-learning/random-forest" },
    ],
    resources: [
      { title: "Kaggle Churn Dataset", type: "Dataset", url: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn" },
      { title: "SHAP Documentation", type: "Documentation", url: "https://shap.readthedocs.io/" },
    ],
  },

  // ── Intermediate ──────────────────────────────────
  {
    slug: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection",
    difficulty: "Intermediate",
    domains: ["Machine Learning"],
    skills: ["Imbalanced Learning", "XGBoost", "Anomaly Detection"],
    type: "Classification",
    overview: "Detect fraudulent credit card transactions from highly imbalanced data. This project teaches advanced techniques for handling class imbalance, anomaly detection, and building production-ready fraud systems.",
    prerequisites: [
      "Classification Fundamentals",
      "Random Forest",
      "Ensemble Learning & Bagging",
      "Classification Evaluation",
    ],
    techStack: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Imbalanced-learn"],
    datasets: [
      { name: "Credit Card Fraud Detection", source: "Kaggle" },
    ],
    buildPlan: [
      { step: "1. Understand the Data", description: "Explore the highly imbalanced dataset (0.17% fraud). Understand PCA-transformed features." },
      { step: "2. Resampling Strategies", description: "Apply SMOTE, ADASYN, or random undersampling to balance the training data." },
      { step: "3. Model Training", description: "Train XGBoost, LightGBM, and Isolation Forest for anomaly detection." },
      { step: "4. Threshold Tuning", description: "Optimize classification threshold using precision-recall tradeoff." },
      { step: "5. Evaluation", description: "Use PR-AUC (not ROC-AUC) for imbalanced data. Track precision at high recall." },
      { step: "6. Pipeline", description: "Build an end-to-end pipeline with proper train/validation/test splits." },
    ],
    evaluation: [
      { metric: "PR-AUC", target: "> 0.85" },
      { metric: "Recall", target: "> 0.90" },
      { metric: "Precision @ 90% Recall", target: "> 0.50" },
    ],
    extensions: [
      "Add real-time streaming detection with Kafka",
      "Implement concept drift detection",
      "Build a dashboard for monitoring fraud rates",
      "Try graph neural networks for fraud ring detection",
    ],
    relatedTopics: [
      { name: "Random Forest", href: "/subjects/machine-learning/random-forest" },
      { name: "Ensemble Learning & Bagging", href: "/subjects/machine-learning/ensemble-learning-and-bagging" },
      { name: "Boosting Fundamentals", href: "/subjects/machine-learning/boosting-fundamentals" },
    ],
    resources: [
      { title: "XGBoost Documentation", type: "Documentation", url: "https://xgboost.readthedocs.io/" },
      { title: "Imbalanced-learn Documentation", type: "Documentation", url: "https://imbalanced-learn.org/" },
    ],
  },
  {
    slug: "image-classification-system",
    title: "Image Classification System",
    difficulty: "Intermediate",
    domains: ["Deep Learning", "Computer Vision"],
    skills: ["CNN", "Transfer Learning", "PyTorch"],
    type: "Classification",
    overview: "Build an image classifier using convolutional neural networks and transfer learning. Learn how modern computer vision systems work, from data augmentation to fine-tuning pretrained models.",
    prerequisites: [
      "Neural Network Fundamentals",
      "Activation Functions",
      "Loss Function & Gradient Descent",
    ],
    techStack: ["Python", "PyTorch", "Torchvision", "Matplotlib", "Google Colab"],
    datasets: [
      { name: "CIFAR-10", source: "torchvision.datasets" },
      { name: "Food-101", source: "torchvision.datasets" },
    ],
    buildPlan: [
      { step: "1. Data Loading & Augmentation", description: "Load dataset with PyTorch DataLoaders. Apply augmentation: random crop, horizontal flip, normalization." },
      { step: "2. Baseline CNN", description: "Build a simple CNN from scratch (Conv → ReLU → Pool → FC) to establish a baseline." },
      { step: "3. Transfer Learning", description: "Load a pretrained ResNet-18, replace the final layer, and fine-tune on your dataset." },
      { step: "4. Training Loop", description: "Implement training with learning rate scheduling, early stopping, and mixed precision." },
      { step: "5. Evaluation", description: "Compute accuracy, per-class precision/recall, and confusion matrix. Visualize predictions." },
      { step: "6. Export & Serve", description: "Export the model to ONNX and build a simple inference API." },
    ],
    evaluation: [
      { metric: "Top-1 Accuracy", target: "> 90%" },
      { metric: "Top-5 Accuracy", target: "> 98%" },
      { metric: "Inference Time", target: "< 50ms" },
    ],
    extensions: [
      "Try different architectures (EfficientNet, ViT)",
      "Add Grad-CAM for explainability",
      "Build a web demo with Gradio",
      "Deploy to edge devices with ONNX Runtime",
    ],
    relatedTopics: [
      { name: "Neural Network Fundamentals", href: "/subjects/deep-learning/neural-network-fundamentals" },
      { name: "Activation Functions", href: "/subjects/deep-learning/activation-functions" },
      { name: "Backpropagation", href: "/subjects/deep-learning/backpropagation" },
    ],
    resources: [
      { title: "PyTorch Vision Tutorials", type: "Documentation", url: "https://pytorch.org/tutorials/" },
      { title: "CS231n: CNNs for Visual Recognition", type: "Course", url: "https://cs231n.stanford.edu/" },
    ],
  },
  {
    slug: "recommendation-engine",
    title: "Recommendation Engine",
    difficulty: "Intermediate",
    domains: ["Machine Learning", "Deep Learning"],
    skills: ["Collaborative Filtering", "Embeddings", "Ranking"],
    type: "Ranking",
    overview: "Build a recommendation system that suggests items to users based on their behavior. Learn collaborative filtering, content-based methods, and hybrid approaches using modern embedding techniques.",
    prerequisites: [
      "Linear Algebra Basics",
      "Multiple Linear Regression",
      "Neural Network Fundamentals",
    ],
    techStack: ["Python", "PyTorch", "Pandas", "Scikit-learn", "Surprise"],
    datasets: [
      { name: "MovieLens 100K", source: "GroupLens" },
      { name: "Amazon Product Reviews", source: "Kaggle" },
    ],
    buildPlan: [
      { step: "1. Data Exploration", description: "Analyze user-item interactions, rating distributions, and sparsity patterns." },
      { step: "2. Collaborative Filtering", description: "Implement user-based and item-based collaborative filtering using cosine similarity." },
      { step: "3. Matrix Factorization", description: "Use SVD or ALS to decompose the user-item matrix into latent factors." },
      { step: "4. Neural Embeddings", description: "Train a neural network to learn user and item embeddings jointly." },
      { step: "5. Evaluation", description: "Evaluate using RMSE for ratings and Precision@K, Recall@K for top-N recommendations." },
      { step: "6. Hybrid System", description: "Combine collaborative and content-based signals for a hybrid recommender." },
    ],
    evaluation: [
      { metric: "RMSE", target: "< 0.90" },
      { metric: "Precision@10", target: "> 0.15" },
      { metric: "NDCG@10", target: "> 0.20" },
    ],
    extensions: [
      "Add session-based recommendations with RNNs",
      "Implement A/B testing framework",
      "Handle cold-start problem with content features",
      "Build a real-time recommendation API",
    ],
    relatedTopics: [
      { name: "Linear Algebra Basics", href: "/subjects/mathematics/linear-algebra" },
      { name: "Neural Network Fundamentals", href: "/subjects/deep-learning/neural-network-fundamentals" },
    ],
    resources: [
      { title: "Surprise Library", type: "Documentation", url: "https://surpriselib.com/" },
      { title: "Recommendation Systems Book", type: "Book", url: "https://www.oreilly.com/library/view/recommender-systems-handbook/9781489976376/" },
    ],
  },

  // ── Advanced ──────────────────────────────────────
  {
    slug: "medical-image-segmentation",
    title: "Medical Image Segmentation",
    difficulty: "Advanced",
    domains: ["Deep Learning", "Computer Vision"],
    skills: ["U-Net", "Computer Vision", "Dice Loss"],
    type: "Segmentation",
    overview: "Build a U-Net model for segmenting organs or tumors in medical images. This project teaches semantic segmentation, specialized loss functions, and working with medical imaging data formats.",
    prerequisites: [
      "Neural Network Fundamentals",
      "Backpropagation",
      "Activation Functions",
      "Loss Function & Gradient Descent",
    ],
    techStack: ["Python", "PyTorch", "MONAI", "SimpleITK", "Matplotlib"],
    datasets: [
      { name: "ISBI Challenge (Brain Tumor)", source: "Medical Segmentation Decathlon" },
      { name: "Liver Tumor Segmentation", source: "LiTS Challenge" },
    ],
    buildPlan: [
      { step: "1. Data Preparation", description: "Load medical images (NIfTI/DICOM), normalize intensities, and create patches." },
      { step: "2. U-Net Architecture", description: "Implement U-Net with skip connections, downsampling, and upsampling paths." },
      { step: "3. Loss Functions", description: "Implement Dice loss, BCE+Dice hybrid, and focal loss for class imbalance." },
      { step: "4. Training", description: "Train with mixed precision, learning rate scheduling, and data augmentation." },
      { step: "5. Evaluation", description: "Evaluate using Dice coefficient, IoU, and Hausdorff distance." },
      { step: "6. Visualization", description: "Overlay predictions on input images and create animated training progress." },
    ],
    evaluation: [
      { metric: "Dice Score", target: "> 0.85" },
      { metric: "IoU", target: "> 0.75" },
      { metric: "Hausdorff Distance", target: "< 5mm" },
    ],
    extensions: [
      "Try nnU-Net for automatic architecture selection",
      "Add uncertainty estimation with Monte Carlo dropout",
      "Build a 3D segmentation pipeline",
      "Deploy as a clinical decision support tool",
    ],
    relatedTopics: [
      { name: "Neural Network Fundamentals", href: "/subjects/deep-learning/neural-network-fundamentals" },
      { name: "Backpropagation", href: "/subjects/deep-learning/backpropagation" },
    ],
    resources: [
      { title: "MONAI Documentation", type: "Documentation", url: "https://monai.io/" },
      { title: "U-Net Paper", type: "Paper", url: "https://arxiv.org/abs/1505.04597" },
    ],
  },
  {
    slug: "document-intelligence-system",
    title: "Document Intelligence System",
    difficulty: "Advanced",
    domains: ["Deep Learning", "Computer Vision", "NLP"],
    skills: ["OCR", "Vision Models", "RAG"],
    type: "Pipeline",
    overview: "Build an end-to-end document intelligence system that extracts text, tables, and key information from documents using OCR, vision models, and retrieval-augmented generation (RAG).",
    prerequisites: [
      "Neural Network Fundamentals",
      "Self-Attention",
      "BERT Architecture",
    ],
    techStack: ["Python", "PyTorch", "Tesseract", "FAISS", "OpenAI API"],
    datasets: [
      { name: "DocVQA", source: "HuggingFace" },
      { name: "FUNSD", source: "Kaggle" },
    ],
    buildPlan: [
      { step: "1. OCR Pipeline", description: "Build text extraction using Tesseract and compare with LayoutLM for document understanding." },
      { step: "2. Document Parsing", description: "Extract structured information: headers, paragraphs, tables, and key-value pairs." },
      { step: "3. Embedding & Indexing", description: "Chunk documents, generate embeddings, and index in FAISS for retrieval." },
      { step: "4. RAG Pipeline", description: "Build a retrieval-augmented generation system that answers questions from documents." },
      { step: "5. Evaluation", description: "Evaluate extraction accuracy, retrieval relevance, and answer quality." },
      { step: "6. API & UI", description: "Build a FastAPI backend and simple Streamlit UI for document upload and querying." },
    ],
    evaluation: [
      { metric: "OCR Accuracy", target: "> 95%" },
      { metric: "Retrieval Recall@5", target: "> 0.90" },
      { metric: "Answer Quality (Human Eval)", target: "> 4/5" },
    ],
    extensions: [
      "Add table extraction with TableFormer",
      "Support multi-language documents",
      "Implement document summarization",
      "Add audit trail and versioning",
    ],
    relatedTopics: [
      { name: "Self-Attention", href: "/subjects/nlp/self-attention" },
      { name: "BERT Architecture", href: "/subjects/nlp/bert-architecture" },
    ],
    resources: [
      { title: "LayoutLM Paper", type: "Paper", url: "https://arxiv.org/abs/1912.13318" },
      { title: "FAISS Documentation", type: "Documentation", url: "https://faiss.ai/" },
    ],
  },
  {
    slug: "real-time-ml-pipeline",
    title: "Real-Time ML Pipeline",
    difficulty: "Advanced",
    domains: ["MLOps", "Machine Learning"],
    skills: ["Streaming", "Model Serving", "Monitoring"],
    type: "Infrastructure",
    overview: "Build a production-grade real-time ML pipeline that ingests streaming data, makes predictions, and monitors model performance. Learn the fundamentals of MLOps and ML systems design.",
    prerequisites: [
      "Python Fundamentals",
      "Classification Fundamentals",
      "Regression Model Evaluation",
    ],
    techStack: ["Python", "Apache Kafka", "FastAPI", "Redis", "Docker", "Grafana"],
    datasets: [
      { name: "NYC Taxi Trip Data", source: "NYC TLC" },
      { name: "Online Retail Dataset", source: "UCI ML Repository" },
    ],
    buildPlan: [
      { step: "1. Data Ingestion", description: "Set up Kafka producers to stream data from a source into topics." },
      { step: "2. Feature Store", description: "Implement a feature store using Redis for low-latency feature retrieval." },
      { step: "3. Model Training", description: "Train a model offline and register it in a model registry." },
      { step: "4. Prediction Service", description: "Build a FastAPI service that consumes from Kafka, fetches features, and returns predictions." },
      { step: "5. Monitoring", description: "Track prediction latency, throughput, data drift, and model performance with Grafana dashboards." },
      { step: "6. Containerization", description: "Dockerize all services and create a docker-compose setup for local development." },
    ],
    evaluation: [
      { metric: "Prediction Latency (p99)", target: "< 100ms" },
      { metric: "Throughput", target: "> 1000 req/s" },
      { metric: "Uptime", target: "> 99.9%" },
    ],
    extensions: [
      "Add A/B testing for model comparison",
      "Implement automated retraining triggers",
      "Add canary deployments",
      "Set up CI/CD with GitHub Actions",
    ],
    relatedTopics: [
      { name: "Regression Model Evaluation", href: "/subjects/machine-learning/regression-evaluation" },
      { name: "Classification Fundamentals", href: "/subjects/machine-learning/classification-fundamentals" },
    ],
    resources: [
      { title: "Designing Machine Learning Systems", type: "Book", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/" },
      { title: "FastAPI Documentation", type: "Documentation", url: "https://fastapi.tiangolo.com/" },
    ],
  },

  // ── Research ──────────────────────────────────────
  {
    slug: "reproduce-a-research-paper",
    title: "Reproduce a Research Paper",
    difficulty: "Research",
    domains: ["Machine Learning", "Deep Learning"],
    skills: ["Paper Reading", "Implementation", "Experimentation"],
    type: "Research",
    overview: "Select a foundational ML/DL paper and reproduce its results from scratch. This project teaches critical paper reading, faithful implementation, and rigorous experimental methodology.",
    prerequisites: [
      "Neural Network Fundamentals",
      "Backpropagation",
      "Loss Function & Gradient Descent",
      "Python Proficiency",
    ],
    techStack: ["Python", "PyTorch", "Weights & Biases", "LaTeX"],
    datasets: [
      { name: "Depends on chosen paper", source: "Various" },
    ],
    buildPlan: [
      { step: "1. Paper Selection", description: "Choose a paper with available code or clear methodology. Read it 3 times: overview, details, implementation." },
      { step: "2. Setup Experiment", description: "Recreate the experimental setup: same hyperparameters, same data preprocessing, same evaluation metrics." },
      { step: "3. Implement from Scratch", description: "Write the model, training loop, and evaluation without copying existing implementations." },
      { step: "4. Run Experiments", description: "Train the model, log metrics with W&B, and compare against reported results." },
      { step: "5. Analyze Discrepancies", description: "If results differ, investigate: data preprocessing, hyperparameters, random seeds, hardware differences." },
      { step: "6. Write Report", description: "Document your reproduction: what matched, what didn't, and what you learned." },
    ],
    evaluation: [
      { metric: "Metric Match", target: "Within 5% of reported results" },
      { metric: "Code Quality", target: "Clean, documented, reproducible" },
      { metric: "Report Quality", target: "Clear analysis of discrepancies" },
    ],
    extensions: [
      "Add ablation studies not in the original paper",
      "Try the method on a different dataset",
      "Write a blog post about your reproduction",
      "Submit to a reproduction workshop",
    ],
    relatedTopics: [
      { name: "Neural Network Fundamentals", href: "/subjects/deep-learning/neural-network-fundamentals" },
      { name: "Backpropagation", href: "/subjects/deep-learning/backpropagation" },
    ],
    resources: [
      { title: "Papers With Code", type: "Website", url: "https://paperswithcode.com/" },
      { title: "Reproducing ML Papers Guide", type: "Article", url: "https://www.reddit.com/r/MachineLearning/comments/reproducibility/" },
    ],
  },
  {
    slug: "train-a-mini-transformer",
    title: "Train a Mini Transformer",
    difficulty: "Research",
    domains: ["Deep Learning", "NLP"],
    skills: ["Attention", "Transformers", "PyTorch"],
    type: "Research",
    overview: "Implement the Transformer architecture from scratch and train it on a small-scale task. Understand every component: self-attention, positional encoding, multi-head attention, and the encoder-decoder structure.",
    prerequisites: [
      "Self-Attention",
      "Neural Network Fundamentals",
      "Backpropagation",
      "Linear Algebra Basics",
    ],
    techStack: ["Python", "PyTorch", "tiktoken", "Weights & Biases"],
    datasets: [
      { name: "WMT14 En-De (small subset)", source: "torchtext" },
      { name: "Custom character-level dataset", source: "Generated" },
    ],
    buildPlan: [
      { step: "1. Scaled Dot-Product Attention", description: "Implement the core attention mechanism: Q, K, V projections and softmax scaling." },
      { step: "2. Multi-Head Attention", description: "Extend to multiple attention heads with separate projection matrices." },
      { step: "3. Positional Encoding", description: "Implement sinusoidal positional encoding and understand why it works." },
      { step: "4. Encoder & Decoder", description: "Build the encoder (self-attention + FFN) and decoder (masked self-attention + cross-attention)." },
      { step: "5. Training Loop", description: "Implement label smoothing, learning rate warmup, and the full training loop." },
      { step: "6. Evaluation & Analysis", description: "Visualize attention weights, evaluate on test set, and compare with the original paper." },
    ],
    evaluation: [
      { metric: "Perplexity", target: "< 5.0" },
      { metric: "BLEU Score", target: "> 20" },
      { metric: "Attention Visualization", target: "Meaningful patterns" },
    ],
    extensions: [
      "Add RoPE (Rotary Position Embeddings)",
      "Implement Flash Attention for efficiency",
      "Scale to a larger dataset (WMT full)",
      "Add beam search decoding",
    ],
    relatedTopics: [
      { name: "Self-Attention", href: "/subjects/nlp/self-attention" },
      { name: "Neural Network Fundamentals", href: "/subjects/deep-learning/neural-network-fundamentals" },
    ],
    resources: [
      { title: "Attention Is All You Need", type: "Paper", url: "https://arxiv.org/abs/1706.03762" },
      { title: "The Annotated Transformer", type: "Article", url: "https://nlp.seas.harvard.edu/annotated-transformer/" },
    ],
  },
  {
    slug: "build-a-multimodal-model",
    title: "Build a Multimodal Model",
    difficulty: "Research",
    domains: ["Deep Learning", "Multimodal AI"],
    skills: ["Vision-Language", "Transformers", "Evaluation"],
    type: "Research",
    overview: "Build a vision-language model that can understand and reason about both images and text. Learn how modern multimodal systems like CLIP and LLaVA work by implementing a simplified version.",
    prerequisites: [
      "Self-Attention",
      "Neural Network Fundamentals",
      "Backpropagation",
      "Image Classification basics",
    ],
    techStack: ["Python", "PyTorch", "HuggingFace Transformers", "CLIP", "Weights & Biases"],
    datasets: [
      { name: "COCO Captions", source: "Microsoft" },
      { name: "Flickr30k", source: "HuggingFace" },
    ],
    buildPlan: [
      { step: "1. Vision Encoder", description: "Use a pretrained ViT or ResNet as the vision encoder. Understand how images become token sequences." },
      { step: "2. Text Encoder", description: "Use a pretrained text encoder (BERT or similar) to encode captions." },
      { step: "3. Alignment Training", description: "Train a projection layer to align vision and text embeddings in a shared space (contrastive learning)." },
      { step: "4. Generative Extension", description: "Add a language model decoder that conditions on vision features for image captioning." },
      { step: "5. Evaluation", description: "Evaluate retrieval (image→text, text→image), captioning (CIDEr, METEOR), and VQA accuracy." },
      { step: "6. Inference Demo", description: "Build a Gradio demo that lets users upload images and ask questions." },
    ],
    evaluation: [
      { metric: "Image-Text Retrieval (R@1)", target: "> 0.60" },
      { metric: "Captioning CIDEr", target: "> 100" },
      { metric: "VQA Accuracy", target: "> 65%" },
    ],
    extensions: [
      "Add video understanding capabilities",
      "Implement grounding (point to regions in images)",
      "Try LoRA for efficient fine-tuning",
      "Add audio modality for true multimodal",
    ],
    relatedTopics: [
      { name: "Self-Attention", href: "/subjects/nlp/self-attention" },
      { name: "Neural Network Fundamentals", href: "/subjects/deep-learning/neural-network-fundamentals" },
      { name: "Backpropagation", href: "/subjects/deep-learning/backpropagation" },
    ],
    resources: [
      { title: "CLIP Paper", type: "Paper", url: "https://arxiv.org/abs/2103.00020" },
      { title: "LLaVA Paper", type: "Paper", url: "https://arxiv.org/abs/2304.08485" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByDifficulty(difficulty: Difficulty): Project[] {
  return projects.filter((p) => p.difficulty === difficulty);
}

export function getProjectsByDomain(domain: string): Project[] {
  return projects.filter((p) => p.domains.includes(domain));
}
