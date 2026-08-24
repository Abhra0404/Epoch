# K-Nearest Neighbors

**TOPIC:** K-Nearest Neighbors (KNN)  
**PREREQUISITE TOPICS:** Classification Fundamentals, Cartesian Coordinate System, Metric Spaces  
**LEARNING OUTCOMES:** Explain instance-based lazy learning, compute Euclidean and Manhattan distances, select optimal $K$ hyperparameter values, explain the Curse of Dimensionality, and implement feature scaling.

---

## 1. CORE CONCEPT (200-250 words)

**K-Nearest Neighbors (KNN)** is a simple, intuitive, non-parametric algorithm used for both classification and regression. It operates on a fundamental principle: *"Birds of a feather flock together"*—similar data points naturally exist in close physical proximity to one another in feature space.

Unlike parametric models (like Linear or Logistic Regression) that compute mathematical equations during a dedicated training phase, KNN is a **lazy learner** (or instance-based learner):
- **Training Phase:** Zero training computation. KNN simply memorizes and stores the entire raw training dataset in memory.
- **Prediction Phase:** When a new query point arrives, KNN calculates the distance between the query point and every single stored training sample. It identifies the $K$ closest training points (its $K$ "nearest neighbors") and aggregates their labels:
  - **Classification:** Majority vote among the $K$ neighbors.
  - **Regression:** Average (mean) target value among the $K$ neighbors.

Hyperparameter $K$ controls the model's complexity:
- **Small $K$ (e.g., $K=1$):** High variance / low bias; highly sensitive to noise and local outliers.
- **Large $K$ (e.g., $K=50$):** High bias / low variance; creates smooth, over-generalized decision boundaries.

The key insight: KNN makes predictions by querying historical training instances located nearest to the target point in feature space.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose you are analyzing customer behavior where purchasing patterns form complex, irregular, non-linear pockets in feature space.

If you apply **Logistic Regression**, the model attempts to force a single, straight linear decision boundary across the data. If the true data topology consists of localized clusters, linear models fail completely.

Alternatively, training complex non-parametric decision trees can require extensive hyperparameter tuning to avoid overfitting global boundaries.

KNN solves this by evaluating decisions strictly **locally**. It makes no global structural assumptions about the data distribution. Whether the decision boundary is a circle, a spiral, or irregular clusters, KNN naturally adapts to the local geometry by simply looking at nearby neighbors.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

Given a query sample $\mathbf{x}_0 \in \mathbb{R}^p$ and a training set $\mathcal{D} = \{(\mathbf{x}_1, y_1), \dots, (\mathbf{x}_N, y_N)\}$:

### Distance Metrics (between vectors $\mathbf{x}$ and $\mathbf{z}$)
- **Euclidean Distance ($L_2$ norm):**
  $$d_{\text{Euclidean}}(\mathbf{x}, \mathbf{z}) = \sqrt{\sum_{j=1}^{p} (x_j - z_j)^2}$$

- **Manhattan Distance ($L_1$ norm):**
  $$d_{\text{Manhattan}}(\mathbf{x}, \mathbf{z}) = \sum_{j=1}^{p} |x_j - z_j|$$

- **Minkowski Distance ($L_q$ norm generalization):**
  $$d_{\text{Minkowski}}(\mathbf{x}, \mathbf{z}) = \left( \sum_{j=1}^{p} |x_j - z_j|^q \right)^{\frac{1}{q}}$$

### Aggregation Rules (over set $\mathcal{N}_K(\mathbf{x}_0)$ of $K$ nearest points)
- **KNN Classification Prediction:**
  $$\hat{y} = \arg\max_{k} \sum_{i \in \mathcal{N}_K(\mathbf{x}_0)} I(y_i = k)$$

- **KNN Regression Prediction:**
  $$\hat{y} = \frac{1}{K} \sum_{i \in \mathcal{N}_K(\mathbf{x}_0)} y_i$$

| Symbol | Meaning | Role |
|---|---|---|
| $K$ | Number of nearest neighbors | Primary hyperparameter (odd integer preferred for binary classification) |
| $\mathcal{N}_K(\mathbf{x}_0)$ | Set of $K$ nearest neighbor indices | Subset of training points minimizing distance to query $\mathbf{x}_0$ |
| $p$ | Feature dimensionality | Vector space dimensions |
| $q$ | Minkowski norm power parameter | $q=1$ is Manhattan; $q=2$ is Euclidean |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Imagine a 2D map showing two towns: Redville (represented by Red dots) and Blueville (represented by Blue dots).

You drop a new visitor at an unknown coordinate $X_{\text{query}}$ on the map:

1. **Setting $K=1$:**  
   Draw an expanding circle around $X_{\text{query}}$ until it touches the single closest town dot. If that dot is Red, classify the visitor as a Redville resident. 
   *(Notice that if a single Blue resident happens to be visiting Redville as an outlier, $K=1$ will incorrectly classify the visitor).*

2. **Setting $K=5$:**  
   Expand the circle until it encompasses the 5 nearest dots. If 4 dots are Red and 1 dot is Blue, majority vote assigns the visitor to Redville ($4 \text{ vs. } 1$).

Expanding the neighbor radius smooths out random individual noise and creates a stable local majority consensus.

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Given $n=4$ training points in 2D space, use $K=3$ Nearest Neighbors with Euclidean distance to classify query point $\mathbf{x}_0 = (2, 3)$.

**Given:**  
Training samples $(\mathbf{x}_i, y_i)$:
- Point 1: $\mathbf{x}_1 = (1, 2)$, Class $y_1 = 0$
- Point 2: $\mathbf{x}_2 = (2, 1)$, Class $y_2 = 0$
- Point 3: $\mathbf{x}_3 = (3, 4)$, Class $y_3 = 1$
- Point 4: $\mathbf{x}_4 = (4, 3)$, Class $y_4 = 1$

Query point: $\mathbf{x}_0 = (2, 3)$, Hyperparameter $K = 3$

**Solution steps:**

01. **Calculate squared Euclidean distance from $\mathbf{x}_0 = (2, 3)$ to all training points:**
    - To Point 1 $(1, 2)$:
      $$d_1^2 = (1 - 2)^2 + (2 - 3)^2 = (-1)^2 + (-1)^2 = 1 + 1 = 2 \implies d_1 = \sqrt{2} \approx 1.414$$
    - To Point 2 $(2, 1)$:
      $$d_2^2 = (2 - 2)^2 + (1 - 3)^2 = (0)^2 + (-2)^2 = 0 + 4 = 4 \implies d_2 = \sqrt{4} = 2.000$$
    - To Point 3 $(3, 4)$:
      $$d_3^2 = (3 - 2)^2 + (4 - 3)^2 = (1)^2 + (1)^2 = 1 + 1 = 2 \implies d_3 = \sqrt{2} \approx 1.414$$
    - To Point 4 $(4, 3)$:
      $$d_4^2 = (4 - 2)^2 + (3 - 3)^2 = (2)^2 + (0)^2 = 4 + 0 = 4 \implies d_4 = \sqrt{4} = 2.000$$

02. **Rank points by distance to find the $K=3$ nearest neighbors:**
    - 1st nearest: Point 1 ($d \approx 1.414$, Class $0$)
    - 2nd nearest: Point 3 ($d \approx 1.414$, Class $1$)
    - 3rd nearest: Point 2 ($d = 2.000$, Class $0$) *(Tie with Point 4 broken arbitrarily)*

03. **Tally majority votes among the 3 nearest neighbors ($\mathcal{N}_3$):**
    - Neighbor labels: $[y_1=0, y_3=1, y_2=0]$
    - Class 0 votes: $2$
    - Class 1 votes: $1$

04. **Determine final prediction:**
    $$\hat{y} = \arg\max(V_0=2, V_1=1) \implies \hat{y} = 0$$

**Answer:**  
The $K=3$ nearest neighbors vote majority Class 0 ($2 \text{ vs. } 1$), so $\hat{y} = 0$.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Demonstrate how **unscaled features** distort KNN distance calculations, proving why Feature Scaling is strictly mandatory.

**Given:**  
Patient dataset with 2 features ($x_1$: Age in years, $x_2$: Income in dollars):
- Patient A: $\mathbf{x}_A = (30\text{ yrs}, \$50,000)$
- Patient B: $\mathbf{x}_B = (30\text{ yrs}, \$50,100)$
- Patient C: $\mathbf{x}_C = (80\text{ yrs}, \$50,000)$

Query Patient: $\mathbf{x}_0 = (30\text{ yrs}, \$50,000)$

**Solution steps:**

01. **Calculate Euclidean distance WITHOUT feature scaling:**
    - Distance to Patient B:
      $$d(\mathbf{x}_0, \mathbf{x}_B) = \sqrt{(30 - 30)^2 + (50000 - 50100)^2} = \sqrt{0 + 100^2} = 100$$
    - Distance to Patient C:
      $$d(\mathbf{x}_0, \mathbf{x}_C) = \sqrt{(30 - 80)^2 + (50000 - 50000)^2} = \sqrt{(-50)^2 + 0} = 50$$

02. **Analyze unscaled result:**  
    - Distance to Patient C ($50\text{ yrs}$ older) is calculated as **closer** than Patient B (identical age, but $\$100$ income difference).
    - Income completely dominates Age because dollar units ($\$100\text{s}$) are numerically larger than age units ($10\text{s}$).

03. **Apply Standard Scaling ($z = \frac{x - \mu}{\sigma}$):**  
    Suppose standardized features become:
    - $\mathbf{x}_0 = (0.0, 0.0)$
    - $\mathbf{x}_B = (0.0, 0.1)$
    - $\mathbf{x}_C = (2.5, 0.0)$

04. **Recalculate Euclidean distance WITH scaling:**
    - $d(\mathbf{x}_0, \mathbf{x}_B) = \sqrt{0^2 + 0.1^2} = 0.10$
    - $d(\mathbf{x}_0, \mathbf{x}_C) = \sqrt{2.5^2 + 0^2} = 2.50$

05. **Conclusion:**  
    After scaling, Patient B ($d=0.10$) is correctly identified as far closer than Patient C ($d=2.50$).

**Answer:**  
Unscaled features distort metric space, making scaling essential for KNN.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Running KNN on raw, unscaled features measured in different units (e.g., age vs. annual income).  
✅ **FIX:** Apply Standard Scaling ($z = \frac{x-\mu}{\sigma}$) or Min-Max Normalization before running KNN.  
**WHY:** Features with larger numerical ranges completely dominate Euclidean distance calculations, rendering smaller-scale features irrelevant.

❌ **MISTAKE:** Selecting an **even number** for hyperparameter $K$ (e.g., $K=4$) in binary classification tasks.  
✅ **FIX:** Always select an **odd number** for $K$ (e.g., $K=3, 5, 7$) when evaluating binary outcomes.  
**WHY:** Even values of $K$ create tie-vote deadlocks (e.g., 2 votes for Class 0, 2 votes for Class 1) requiring arbitrary tie-breaking.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**When to Use:**
- Small-to-medium datasets ($N < 100,000$) with low feature dimensions ($p < 20$).
- You need a simple baseline model requiring zero training time.
- Decision boundaries are localized, irregular, and non-linear.

**When NOT to Use:**
- High-dimensional data ($p > 100$, such as text TF-IDF vectors or raw images) due to the **Curse of Dimensionality**.
- Ultra-low latency production environments where storing raw training data and computing distances to $N$ points per query violates memory or time SLAs.

**The Boundary:**  
If feature count $p$ is low ($p < 20$) and dataset size $N$ is small, use **KNN**. If feature count $p$ is high or inference latency must be fast, use parametric models (Logistic Regression, Linear SVM) or Decision Trees.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Classification Fundamentals:** Uses majority voting to assign discrete class predictions.
- **Metric Spaces:** Relies directly on vector distance functions (Euclidean, Manhattan).

**Enables:**
- **Distance-Weighted KNN:** Scales neighbor votes inversely proportional to their distance ($\frac{1}{d_i}$).
- **Locality-Sensitive Hashing (LSH):** Approximates nearest neighbor searches in large-scale vector databases.
- **Collaborative Filtering:** Powering user-based and item-based recommendation engines.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** E-Commerce Personalized Product Recommendation Engine  
An online retailer recommends products to users based on shopping behavior.

**Implementation Workflow:**
1. **User Embedding:** Represent each user as a vector $\mathbf{x}_i$ using features: browsing categories, average order value, return rate, and active hours.
2. **Standardization:** Apply Min-Max scaling to compress all user features into range $[0, 1]$.
3. **Query Execution:** When User $U_{101}$ logs in, query the database using **KNN** ($K = 10$) with Cosine / Euclidean distance to locate the 10 most similar shoppers.
4. **Recommendation Generation:** Aggregate the recent purchase history of those 10 nearest neighbor shoppers, filtering out items User $U_{101}$ has already bought.
5. **Business Impact:** Recommends highly relevant products, driving a $16\%$ increase in recommendation click-through rate (CTR).

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Medium  
**Question:** *"Why is KNN called a 'lazy learner', and how does the Curse of Dimensionality degrade distance-based classification as feature dimension $p$ increases?"*

**Expected Answer:**  
KNN is called a "lazy learner" because it does not construct a generalized mathematical model during a training phase; it simply stores the raw training instances and defers all distance calculations to prediction time. The **Curse of Dimensionality** refers to the phenomenon where high-dimensional volume grows exponentially, causing data points to become extremely sparse. In high-dimensional space ($p > 100$), the distance between any query point and its nearest neighbor approaches the distance to the furthest point ($\frac{d_{\max} - d_{\min}}{d_{\min}} \to 0$). As all points become nearly equidistant, distance metrics lose discriminative power.

---

## KEY TAKEAWAYS (50 words max)

- **Lazy Learner:** Zero training time; defers compute to prediction.
- **Prediction:** Majority vote (Classification) or mean (Regression) of $K$ neighbors.
- Requires feature standardization before computing distances.
- **Hyperparameter $K$:** Small $K$ overfits (high variance); large $K$ underfits (high bias).
- Vulnerable to the Curse of Dimensionality in high dimensions ($p > 100$).
