# Classification Fundamentals

**TOPIC:** Classification Fundamentals  
**PREREQUISITE TOPICS:** Basic Probability, Cartesian Coordinate System, Single Linear Regression  
**LEARNING OUTCOMES:** Distinguish between regression and classification, define decision boundaries, convert continuous probabilities into discrete class predictions using decision thresholds, and compare binary vs. multi-class problems.

## 1. CORE CONCEPT

In machine learning, **Classification** is a supervised learning task where the goal is to predict a discrete categorical label (a class) for a given set of input features, rather than predicting a continuous numerical value.

Imagine sorting mail at a post office. Instead of estimating the exact weight of a package in kilograms (a regression problem), your job is to route each piece of mail into one of three distinct bins: *Local*, *National*, or *International*. Each piece of mail gets assigned a single, specific category.

In machine learning, classification models map input features to discrete outputs:
- **Binary Classification:** Choosing between two mutually exclusive outcomes (e.g., $0$ or $1$, *Spam* or *Not Spam*, *Tumor Benign* or *Malignant*).
- **Multi-Class Classification:** Choosing one outcome from three or more categories (e.g., predicting whether an image is a *Cat*, *Dog*, or *Bird*).
- **Multi-Label Classification:** Assigning multiple non-exclusive labels simultaneously (e.g., tagging a news article as both *Politics* and *Finance*).

To make these decisions, a classification model computes an underlying probability score between $0.0$ and $1.0$ and applies a **decision threshold** to assign the final discrete class label.

The key insight: Classification transforms continuous feature inputs into discrete categorical decisions by establishing a decision boundary across the feature space.

## 2. THE PROBLEM IT SOLVES

Suppose a bank wants to automate credit card transaction approval to catch fraud. 

If you try a **naive approach** by applying Linear Regression to fit targets coded as $0$ (Legitimate) and $1$ (Fraudulent), major mathematical failures occur. A straight linear regression line will predict continuous values like $-0.4$ or $+1.8$, which have no logical meaning as probabilities. Furthermore, adding extreme high-dollar legitimate transactions tilts the regression line, changing predictions for completely unrelated low-dollar transactions.

Classification models solve this fundamental issue. They bound output scores strictly between $0.0$ and $1.0$, producing valid probabilities that directly represent the likelihood of a transaction belonging to a specific class.

## 3. FORMAL DEFINITION & NOTATION

Given an input feature vector $\mathbf{x} \in \mathbb{R}^p$, a classification model estimates the conditional probability of target $y$ belonging to class $k \in \{0, 1, \dots, K-1\}$:

$$P(y = k \mid \mathbf{x})$$

For **Binary Classification** ($y \in \{0, 1\}$), the model estimates the probability of the positive class $p = P(y = 1 \mid \mathbf{x})$. A **decision threshold** $\tau \in (0, 1)$ converts this probability into a discrete prediction $\hat{y}$:

$$\hat{y} = \begin{cases} 1 & \text{if } P(y = 1 \mid \mathbf{x}) \ge \tau \\ 0 & \text{if } P(y = 1 \mid \mathbf{x}) < \tau \end{cases}$$

*(Default threshold is typically set to $\tau = 0.5$).*

| Symbol | Meaning | Example |
|---|---|---|
| $y$ | Ground truth class label | $y = 1$ (Fraudulent) |
| $\hat{y}$ | Predicted discrete class label | $\hat{y} = 0$ (Legitimate) |
| $P(y=1 \mid \mathbf{x})$ | Predicted probability of positive class | $p = 0.87$ ($87\%$ chance of fraud) |
| $\tau$ | Decision threshold cutoff | $\tau = 0.50$ |
| $\mathcal{C}$ | Set of all possible class labels | $\mathcal{C} = \{0, 1\}$ or $\mathcal{C} = \{\text{Cat}, \text{Dog}, \text{Bird}\}$ |

A **Decision Boundary** is the geometric surface in feature space where $P(y=1 \mid \mathbf{x}) = \tau$, dividing space into class regions.

## 4. INTUITION WITH VISUALS

Imagine a 2D scatter plot where the horizontal $x_1$-axis represents a customer's age and the vertical $x_2$-axis represents account balance.

Instead of measuring height or revenue, the data dots are colored: Red dots represent customers who defaulted on a loan ($y=1$), and Blue dots represent customers who repaid on time ($y=0$).

The Red dots cluster mostly in the lower-left region (younger age, lower balance), while Blue dots populate the upper-right region.

A classification model draws a line (or curve) through the scatter plot that cleanest separates the Red dots from the Blue dots. This dividing line is the **decision boundary**.

When a new applicant arrives:
- Plot their age and balance as a white dot.
- If the dot lands on the Red side of the decision boundary, the model predicts default ($\hat{y}=1$).
- If it lands on the Blue side, it predicts repayment ($\hat{y}=0$).

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Evaluate 4 email samples using a feature score $x$ (suspicious link count) and a simple probability function $P(y=1 \mid x) = \frac{x}{10}$. Determine predictions using decision threshold $\tau = 0.5$.

**Given:**  
- Email 1: $x_1 = 2$, actual $y_1 = 0$ (Ham)
- Email 2: $x_2 = 4$, actual $y_2 = 0$ (Ham)
- Email 3: $x_3 = 7$, actual $y_3 = 1$ (Spam)
- Email 4: $x_4 = 9$, actual $y_4 = 1$ (Spam)
- Decision threshold: $\tau = 0.5$

**Solution steps:**

01. **Calculate predicted probability $P(y=1 \mid x_i)$ for each email:**
    - Email 1: $P(y=1 \mid x_1=2) = \frac{2}{10} = 0.20$
    - Email 2: $P(y=1 \mid x_2=4) = \frac{4}{10} = 0.40$
    - Email 3: $P(y=1 \mid x_3=7) = \frac{7}{10} = 0.70$
    - Email 4: $P(y=1 \mid x_4=9) = \frac{9}{10} = 0.90$

02. **Apply decision threshold rule ($\hat{y} = 1$ if $P \ge 0.5$ else $0$):**
    - Email 1: $0.20 < 0.50 \implies \hat{y}_1 = 0$
    - Email 2: $0.40 < 0.50 \implies \hat{y}_2 = 0$
    - Email 3: $0.70 \ge 0.50 \implies \hat{y}_3 = 1$
    - Email 4: $0.90 \ge 0.50 \implies \hat{y}_4 = 1$

03. **Compare predictions $\hat{y}$ against actual labels $y$:**
    - Email 1: Predicted $0$, Actual $0$ (Correct)
    - Email 2: Predicted $0$, Actual $0$ (Correct)
    - Email 3: Predicted $1$, Actual $1$ (Correct)
    - Email 4: Predicted $1$, Actual $1$ (Correct)

04. **Compute Classification Accuracy:**
    $$\text{Accuracy} = \frac{\text{Correct Predictions}}{\text{Total Predictions}} = \frac{4}{4} = 1.0 \quad (100\%)$$

**Answer:**  
Predictions are $\hat{y} = [0, 0, 1, 1]$, achieving $100\%$ accuracy with threshold $\tau = 0.5$.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Perform Multi-Class classification on a single test image using unnormalized model logit scores $z = [z_0, z_1, z_2]$ for $K=3$ classes ($0=\text{Cat}, 1=\text{Dog}, 2=\text{Bird}$) using the **Argmax** decision rule.

**Given:**  
- Raw model outputs: $z_0 = 1.2$, $z_1 = 3.8$, $z_2 = 0.5$
- True class label: $y = 1$ (Dog)
- Decision Rule: $\hat{y} = \arg\max_{k} z_k$

**Solution steps:**

01. **Understand the Argmax decision rule:**  
    In multi-class settings, the model evaluates raw scores across all candidate classes and picks the index $k$ corresponding to the maximum numerical score:
    $$\hat{y} = \arg\max \left( z_0, z_1, z_2 \right)$$

02. **Compare score magnitudes:**
    - Class 0 (Cat): $1.2$
    - Class 1 (Dog): $3.8$
    - Class 2 (Bird): $0.5$

03. **Identify the maximum score and matching index:**
    $$\max(1.2, 3.8, 0.5) = 3.8 \quad \text{at index } k = 1$$

04. **Formulate final discrete prediction:**
    $$\hat{y} = 1 \quad (\text{Dog})$$

05. **Verify correctness against true target:**
    - Predicted: $\hat{y} = 1$
    - Actual: $y = 1$
    - Result: Correct classification.

**Answer:**  
The model predicts Class 1 (Dog) with a maximum logit score of $3.8$.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Encoding nominal multi-class labels as ordered integers in a regression model (e.g., setting $\text{Cat}=1, \text{Dog}=2, \text{Bird}=3$).  
✅ **FIX:** Use proper multi-class algorithms or one-hot encoding.  
**WHY:** Integer encoding forces a fake numerical order where the model assumes $\text{Bird} (3)$ is three times greater than $\text{Cat} (1)$, or that $\text{Dog}$ is the average of $\text{Cat}$ and $\text{Bird}$.

❌ **MISTAKE:** Evaluating imbalanced classification datasets using simple accuracy alone (e.g., $99\%$ negative cases).  
✅ **FIX:** Use specialized metrics like Precision, Recall, F1-Score, or ROC-AUC.  
**WHY:** A dummy classifier that predicts $0$ for every sample achieves $99\%$ accuracy while failing to detect a single positive case.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use:**
- Target variable consists of discrete categories or classes (e.g., Yes/No, Low/Medium/High risk, Disease Diagnosis).
- Outputs require probability scores for decision-making under risk.
- You need clear decision boundaries separating feature space.

**When NOT to Use:**
- Target variable is continuous and unbounded (e.g., stock prices, temperature, house value—use Regression).
- Target categories possess fine-grained numerical continuity where rounding loses critical information.

**The Boundary:**  
If the target is a discrete label or countable distinct set, use **Classification**. If the target is a continuous real number on a continuous scale, use **Regression**.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Basic Probability:** Concepts of conditional probability $P(y \mid \mathbf{x})$ and decision thresholds.
- **Cartesian Geometry:** Defines geometric decision boundaries in $p$-dimensional feature space.

**Enables:**
- **Logistic Regression:** The foundational linear model for binary classification.
- **Classification Evaluation (Confusion Matrix, ROC-AUC):** Frameworks to evaluate classification models.
- **Multi-Class Neural Networks (Softmax):** Scaling binary decisions to thousands of classes.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Automated Medical Screening for Diabetic Retinopathy  
An eye clinic chain deploys an AI system to screen patient eye scans for signs of blindness-inducing retinopathy ($0=\text{Healthy}, 1=\text{Retinopathy}$).

**Implementation Workflow:**
1. **Model Goal:** Input high-resolution retinal scan features ($\mathbf{x}$) and output probability of disease presence $P(y=1 \mid \mathbf{x})$.
2. **Setting Decision Threshold:** Standard threshold $\tau = 0.50$ is deemed unsafe because missing a sick patient (False Negative) causes permanent blindness.
3. **Threshold Tuning:** The medical team lowers the decision threshold to $\tau = 0.15$.
4. **Execution:**
   - Patient A: $P(y=1) = 0.08 < 0.15 \implies \hat{y} = 0$ (Screened healthy).
   - Patient B: $P(y=1) = 0.22 \ge 0.15 \implies \hat{y} = 1$ (Flagged for urgent specialist doctor review).
5. **Business Impact:** Flags $98.5\%$ of true disease cases early, preventing vision loss for over 12,000 patients annually.

## INTERVIEW QUESTION

**Difficulty:** Easy  
**Question:** *"Why is standard Linear Regression mathematically inappropriate for solving binary classification problems?"*

**Expected Answer:**  
Linear Regression is inappropriate for binary classification for two main reasons. First, linear outputs are unbounded ($-\infty$ to $+\infty$), producing predictions below $0$ or above $1$ that cannot be interpreted as valid probabilities. Second, Linear Regression minimizes squared vertical errors; adding extreme, highly-confident positive outliers far away from the decision threshold tilts the fitted line unnecessarily, shifting the decision boundary and causing misclassifications on previously correct samples.

## KEY TAKEAWAYS

- Predicts discrete categorical class labels ($y \in \{0, 1\}$ or multi-class).
- Maps continuous features to probabilities bounded between $0.0$ and $1.0$.
- Decision threshold $\tau$ converts probabilities to hard predictions $\hat{y}$.
- Decision boundaries separate distinct class regions in feature space.
