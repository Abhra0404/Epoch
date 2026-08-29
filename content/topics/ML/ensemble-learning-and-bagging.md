# Ensemble Learning and Bagging

**TOPIC:** Ensemble Learning and Bagging  
**PREREQUISITE TOPICS:** Decision Tree Fundamentals, Classification Evaluation, Basic Probability  
**LEARNING OUTCOMES:** Explain the wisdom of the crowd concept, define Bootstrap Aggregating (Bagging), derive the mathematical variance reduction formula, compute Out-Of-Bag (OOB) probability, and contrast parallel vs. sequential ensemble methods.

## 1. CORE CONCEPT

**Ensemble Learning** is a powerful machine learning paradigm that combines the predictions of multiple individual models (called *base models* or *weak learners*) to produce a single aggregated prediction that is more accurate and robust than any single model alone.

**Bagging**, short for **Bootstrap Aggregating**, is a parallel ensemble technique designed specifically to reduce model **variance** and eliminate overfitting without increasing model bias.

Bagging operates in three distinct steps:
1. **Bootstrapping:** Given a training dataset of $N$ observations, create $B$ separate bootstrap datasets by sampling $N$ observations uniformly at random **with replacement**. Each bootstrap sample contains roughly $63.2\%$ unique original data points, with the remaining $36.8\%$ being duplicates.
2. **Parallel Training:** Train an independent, unconstrained base model (typically a deep decision tree) on each of the $B$ bootstrap datasets in parallel.
3. **Aggregating:** Combine predictions across all $B$ models:
   - For **Regression:** Take the average prediction ($\frac{1}{B} \sum \hat{f}_b(\mathbf{x})$).
   - For **Classification:** Take a majority vote among all base models.

The key insight: Bagging averages out random fluctuations and noise from individual high-variance models, stabilizing predictions through the wisdom of the crowd.

## 2. THE PROBLEM IT SOLVES

Suppose you train a single, deep, unconstrained Decision Tree on a complex dataset.

A single decision tree has **high variance** and low bias. Because it splits until leaves are pure, minor perturbations or noisy data points in the training set cause the tree structure to change radically. On new test data, a single tree overfits and performs unpredictably.

Alternatively, pruning the single tree reduces variance but increases **bias**, causing the model to underfit and miss genuine non-linear patterns.

Bagging solves this bias-variance dilemma. By training dozens of deep, low-bias decision trees on different bootstrap samples and averaging their predictions, Bagging cancels out individual tree variance while preserving the low-bias capability of deep trees.

## 3. FORMAL DEFINITION & NOTATION

Given a training dataset $\mathcal{D} = \{(\mathbf{x}_1, y_1), \dots, (\mathbf{x}_N, y_N)\}$, we generate $B$ bootstrap samples $\mathcal{D}_1^*, \mathcal{D}_2^*, \dots, \mathcal{D}_B^*$ of size $N$.

We train $B$ base estimators $\hat{f}_1(\mathbf{x}), \hat{f}_2(\mathbf{x}), \dots, \hat{f}_B(\mathbf{x})$.

### Aggregation Equations
- **Bagged Regression Prediction:**
  $$\hat{f}_{\text{bag}}(\mathbf{x}) = \frac{1}{B} \sum_{b=1}^{B} \hat{f}_b(\mathbf{x})$$

- **Bagged Classification Prediction (Majority Vote):**
  $$\hat{f}_{\text{bag}}(\mathbf{x}) = \arg\max_{k} \sum_{b=1}^{B} I\left(\hat{f}_b(\mathbf{x}) = k\right)$$

### Ensemble Variance Formula
If $B$ base models each have variance $\sigma^2$ and pairwise correlation $\rho$:

$$\text{Var}(\hat{f}_{\text{bag}}) = \rho \sigma^2 + \frac{1 - \rho}{B} \sigma^2$$

*(As $B \to \infty$, the second term approaches $0$, leaving $\text{Var} = \rho \sigma^2$. Lowering model correlation $\rho$ maximizes variance reduction).*

| Symbol | Meaning | Description |
|---|---|---|
| $B$ | Number of bootstrap trees | Total base estimators in ensemble (e.g., $B=100$) |
| $N$ | Sample size | Total training instances |
| $\mathcal{D}_b^*$ | $b$-th bootstrap dataset | Random sample of size $N$ drawn with replacement |
| $\rho$ | Pairwise correlation | Degree of similarity between base model predictions |
| OOB | Out-Of-Bag samples | Samples left out of a specific bootstrap set ($\approx 36.8\%$) |

## 4. INTUITION WITH VISUALS

Imagine a county fair contest to guess the weight of a giant bull.

- **Single Model:** A single expert steps up and guesses $1,350\text{ lbs}$. Their estimate might be off by $150\text{ lbs}$ due to personal bias or poor angle.
- **Ensemble (Bagging):** 500 diverse people independently guess the weight. Some guess high ($1,500\text{ lbs}$), others guess low ($1,100\text{ lbs}$).

When you average all 500 independent guesses:
- Random individual errors cancel each other out (the high guesses balance the low guesses).
- The resulting average estimate ($1,225\text{ lbs}$) comes remarkably close to the bull's actual weight ($1,223\text{ lbs}$).

In Bagging, each bootstrap tree is one contestant guessing the target. Averaging their predictions cancels out individual errors, producing a smooth, stable ensemble estimate.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Calculate the final aggregated **Bagging Majority Vote** prediction for a binary classification problem ($y \in \{0, 1\}$) evaluated across $B=5$ bootstrap base classifiers.

**Given:**  
Predictions from $B=5$ independent base models for a single test input $\mathbf{x}$:
- Model 1: $\hat{f}_1(\mathbf{x}) = 1$
- Model 2: $\hat{f}_2(\mathbf{x}) = 1$
- Model 3: $\hat{f}_3(\mathbf{x}) = 0$
- Model 4: $\hat{f}_4(\mathbf{x}) = 1$
- Model 5: $\hat{f}_5(\mathbf{x}) = 0$

**Solution steps:**

01. **Tally votes for Class 1 ($k=1$):**
    $$V_1 = \sum_{b=1}^{5} I(\hat{f}_b(\mathbf{x}) = 1) = 1 + 1 + 0 + 1 + 0 = 3\text{ votes}$$

02. **Tally votes for Class 0 ($k=0$):**
    $$V_0 = \sum_{b=1}^{5} I(\hat{f}_b(\mathbf{x}) = 0) = 0 + 0 + 1 + 0 + 1 = 2\text{ votes}$$

03. **Calculate predicted ensemble probability for Class 1:**
    $$\hat{P}(y=1 \mid \mathbf{x}) = \frac{V_1}{B} = \frac{3}{5} = 0.60 \quad (60\%)$$

04. **Apply Majority Vote decision rule ($\arg\max_k V_k$):**
    $$\text{Compare } V_1 = 3 \quad \text{vs.} \quad V_0 = 2 \implies V_1 > V_0$$
    $$\hat{f}_{\text{bag}}(\mathbf{x}) = 1$$

05. **Interpret stability:**  
    Even though Model 3 and Model 5 predicted Class 0 due to local noise in their bootstrap sets, the majority vote correctly overrides individual errors.

**Answer:**  
The Bagging ensemble predicts Class 1 with $60\%$ majority vote consensus ($3$ out of $5$ votes).

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Mathematically derive the exact probability that a specific training observation $\mathbf{x}_i$ is **left out** of a bootstrap sample (Out-Of-Bag) for sample size $N=3$, and compare it to the asymptotic limit as $N \to \infty$.

**Given:**  
- Sample size: $N = 3$
- Sampling method: Uniform random selection with replacement

**Solution steps:**

01. **Probability of selecting sample $i$ in 1 single random draw:**
    $$P(\text{Selected in 1 draw}) = \frac{1}{N} = \frac{1}{3}$$

02. **Probability of NOT selecting sample $i$ in 1 single random draw:**
    $$P(\text{Not selected in 1 draw}) = 1 - \frac{1}{N} = 1 - \frac{1}{3} = \frac{2}{3}$$

03. **Probability of NOT selecting sample $i$ in ALL $N=3$ independent draws:**  
    Since draws are independent with replacement:
    $$P(\text{OOB}) = \left(1 - \frac{1}{N}\right)^N = \left(\frac{2}{3}\right)^3 = \frac{8}{27} \approx 0.2963 \quad (29.63\%)$$

04. **Evaluate the asymptotic limit as $N \to \infty$:**  
    Using the standard limit definition $e^{-1} = \lim_{N \to \infty} (1 - \frac{1}{N})^N$:
    $$P(\text{OOB}_{\infty}) = \frac{1}{e} = \frac{1}{2.71828} \approx 0.3679 \quad (36.8\%)$$

05. **Practical Significance:**  
    For large datasets, roughly $36.8\%$ of training samples are left out of each bootstrap tree. These **Out-Of-Bag (OOB)** samples act as a built-in validation dataset, allowing model evaluation without setting aside a separate validation set.

**Answer:**  
For $N=3$, $P(\text{OOB}) = 29.63\%$. As $N \to \infty$, $P(\text{OOB}) \to 36.8\%$.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Expecting Bagging to improve the performance of high-bias (underfitted) models like shallow Linear Regression.  
✅ **FIX:** Use Bagging exclusively on high-variance, low-bias base models (like deep Decision Trees).  
**WHY:** Bagging reduces model variance; it cannot reduce model bias. If base models are too simple to capture underlying patterns, averaging them yields the same underfitted result.

❌ **MISTAKE:** Training base models on identical datasets without bootstrap sampling.  
✅ **FIX:** Always use random sampling with replacement (bootstrapping).  
**WHY:** Without bootstrapping, all base models become identical ($\rho = 1$). According to the variance formula $\text{Var} = \rho \sigma^2 + \frac{1-\rho}{B}\sigma^2$, if $\rho=1$, ensemble variance reduction drops to zero.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use:**
- You have high-variance, complex base models (unconstrained decision trees) prone to overfitting.
- Parallel computing infrastructure (multi-core CPUs/GPUs) is available to train trees simultaneously.
- You want reliable performance evaluation without creating a separate test split using Out-Of-Bag (OOB) error.

**When NOT to Use:**
- Base models have high bias (underfitting)—use **Boosting** instead.
- Real-time prediction latency requires ultra-compact models (storing 500 trees increases memory footprint and inference latency).

**The Boundary:**  
If base models overfit (high variance), use **Bagging**. If base models underfit (high bias), use **Boosting**.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Decision Tree Fundamentals:** Deep decision trees serve as the standard base estimators for Bagging.
- **Classification & Regression Evaluation:** Uses voting/averaging to compute ensemble evaluation metrics.

**Enables:**
- **Random Forest:** Enhances Bagging by adding random feature subspace selection at every node split.
- **Extra-Trees (Extremely Randomized Trees):** Introduces random thresholds alongside feature bootstrapping.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Financial Portfolio Volatility Prediction  
A quantitative hedge fund builds an algorithmic trading system to predict stock price volatility regimes.

**Implementation Workflow:**
1. **Challenge:** Financial market data contains extreme noise and regime shifts. A single decision tree overfits short-term market noise, executing bad trades.
2. **Model Architecture:** Deploy a Bagging Ensemble with $B = 200$ deep decision trees.
3. **Training Execution:** Generate 200 bootstrap datasets sampling $N = 50,000$ historical market indicator snapshots. Train 200 trees concurrently across 16 CPU cores.
4. **Validation via OOB:** Evaluate model stability using Out-Of-Bag samples. The OOB error score reaches $0.12$, matching formal k-fold cross-validation results.
5. **Business Impact:** The Bagging ensemble smooths out false market signals, reducing trade drawdown by $34\%$ and generating stable annualized returns.

## INTERVIEW QUESTION

**Difficulty:** Medium  
**Question:** *"Why does Bagging reduce prediction variance without changing model bias, and what is the mathematical role of pairwise correlation $\rho$ in ensemble variance reduction?"*

**Expected Answer:**  
Bagging trains $B$ low-bias, high-variance base models on independent bootstrap samples. Because expected values are linear ($\mathbb{E}[\frac{1}{B}\sum \hat{f}_b] = \mathbb{E}[\hat{f}]$), averaging predictions preserves the low bias of individual trees. The ensemble variance equation is $\text{Var} = \rho \sigma^2 + \frac{1 - \rho}{B} \sigma^2$. As $B$ grows, the second term vanishes, leaving $\rho \sigma^2$. Pairwise correlation $\rho$ represents how similarly base models behave. Lowering model correlation $\rho$ directly decreases overall ensemble variance, explaining why creating diverse base models is critical.

## KEY TAKEAWAYS

- Combines predictions from $B$ parallel models to reduce variance.
- **Bootstrapping:** Random sampling with replacement of size $N$.
- **Aggregation:** Average for Regression, Majority Vote for Classification.
- Out-Of-Bag (OOB) samples ($\approx 36.8\%$) provide built-in validation.
- Requires low-bias, high-variance base estimators.
