# Decision Tree Fundamentals

**TOPIC:** Decision Tree Fundamentals  
**PREREQUISITE TOPICS:** Classification Fundamentals, Regression Evaluation, Cartesian Coordinate System  
**LEARNING OUTCOMES:** Describe the architecture of a decision tree (nodes, branches, leaves), explain axis-aligned decision boundaries, contrast classification vs. regression trees, and manage tree depth to prevent overfitting.

---

## 1. CORE CONCEPT (200-250 words)

A **Decision Tree** is a versatile non-parametric supervised learning algorithm used for both classification and regression tasks. It models decisions by recursively splitting a dataset into smaller, increasingly homogeneous subsets using a flowchart-like tree structure of binary (IF-THEN) rules.

Imagine playing a game of *20 Questions* to guess an animal. You start by asking broad binary questions like *"Does it live on land?"*. Depending on the answer, you ask a narrower follow-up question like *"Does it have feathers?"*. You follow this path of logic down until you arrive at a confident conclusion like *"Eagle"*.

A decision tree operates identically:
- **Root Node:** The topmost node that receives the entire dataset and performs the first feature split.
- **Internal / Decision Nodes:** Intermediate nodes that test specific feature conditions and branch left or right.
- **Leaf / Terminal Nodes:** The final nodes at the bottom of the tree that contain no further splits and output a final prediction (a class label for classification or a mean number for regression).

Unlike linear models that fit smooth diagonal hyperplanes, decision trees slice feature space into rectangular grid regions using axis-aligned cuts.

The key insight: Decision trees construct interpretable, rule-based hierarchical pathways that natively capture non-linear feature interactions without requiring feature scaling.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose a bank wants to automate personal loan approvals based on applicant age and income. 

If you use **Logistic Regression**, the model assumes a single linear decision boundary across the entire feature space. However, real-world credit policies are naturally rule-based and non-linear (e.g., *"If Age < 25 AND Income > $80k, approve; but if Age >= 25, approve if Income > $40k"*). Fitting linear equations to step-function rules requires complex manual feature interaction terms.

Furthermore, linear models require standardization scaling when combining income in thousands of dollars with age in years.

Decision Trees solve both problems. They discover complex non-linear feature interactions automatically and are completely invariant to feature scaling, generating human-readable IF-THEN rules directly understandable by business auditors.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

A Decision Tree partitions $p$-dimensional feature space $\mathcal{X} \subseteq \mathbb{R}^p$ into $M$ disjoint rectangular regions $R_1, R_2, \dots, R_M$:

$$\bigcup_{m=1}^{M} R_m = \mathcal{X} \quad \text{where } R_i \cap R_j = \emptyset \text{ for } i \neq j$$

For any input sample $\mathbf{x}$ that falls into region $R_m$, the tree outputs a constant prediction $\hat{y}_{R_m}$:

### For Classification Trees
Predicts the majority class in region $R_m$:
$$\hat{p}_{mk} = \frac{1}{N_m} \sum_{\mathbf{x}_i \in R_m} I(y_i = k) \quad \implies \quad \hat{y}_{R_m} = \arg\max_{k} \hat{p}_{mk}$$

### For Regression Trees
Predicts the sample mean of targets in region $R_m$:
$$\hat{y}_{R_m} = \frac{1}{N_m} \sum_{\mathbf{x}_i \in R_m} y_i$$

| Symbol | Meaning | Description |
|---|---|---|
| $R_m$ | Region $m$ | $m$-th leaf node partition in feature space |
| $N_m$ | Node sample count | Number of training instances in region $R_m$ |
| $\hat{p}_{mk}$ | Class probability | Proportion of class $k$ samples in leaf $m$ |
| $I(\cdot)$ | Indicator function | Equals $1$ if condition is true, $0$ otherwise |
| `max_depth` | Hyperparameter | Maximum allowed depth distance from root to leaf |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Picture a 2D scatter plot where the horizontal $x_1$-axis is Applicant Age ($18$ to $70$) and the vertical $x_2$-axis is Annual Income ($0$ to $\$150\text{k}$).

Red dots represent loan defaults; Blue dots represent successful repayments.

Instead of drawing a single diagonal line across the plot, a decision tree makes vertical and horizontal cuts:

1. **First Cut (Root):** Draws a vertical line at $x_1 = 30$ (Age $\le 30$).
2. **Second Cut (Left Branch):** Draws a horizontal line across the left region at $x_2 = 50\text{k}$ (Income $\le \$50\text{k}$).
3. **Third Cut (Right Branch):** Draws a horizontal line across the right region at $x_2 = 30\text{k}$.

These perpendicular cuts divide the 2D plane into a grid of distinct rectangular boxes. Each box corresponds to a leaf node. Any new point falling inside a box receives the majority color of the training dots in that box.

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Trace a classification decision tree traversal to predict loan approval ($y=1$ for Approve, $y=0$ for Deny) for a single applicant.

**Given:**  
Applicant Profile: `Age = 25`, `Income = $60,000`

Decision Tree Rule Hierarchy:
- **Root Node:** Is `Age <= 30`?
  - **Left Branch (True):** Go to Node A.
  - **Right Branch (False):** Go to Leaf 3 (`Predict y = 1`).
- **Node A:** Is `Income <= $50,000`?
  - **Left Branch (True):** Go to Leaf 1 (`Predict y = 0`).
  - **Right Branch (False):** Go to Leaf 2 (`Predict y = 1`).

**Solution steps:**

01. **Evaluate Root Node condition (`Age <= 30`):**
    - Applicant `Age = 25`.
    - Check condition: $25 \le 30 \implies \text{True}$.
    - Traversal Path: Take **Left Branch** to Node A.

02. **Evaluate Node A condition (`Income <= $50,000`):**
    - Applicant `Income = $60,000`.
    - Check condition: $\$60,000 \le \$50,000 \implies \text{False}$.
    - Traversal Path: Take **Right Branch** to Leaf 2.

03. **Extract Prediction from Terminal Leaf Node (Leaf 2):**
    - Leaf 2 output rule: $\hat{y} = 1$ (Approve Loan).

04. **Verify logic flow:**
    - Applicant is under 30 years old, but their income exceeds $\$50,000$, satisfying the specific leaf rule for loan approval.

**Answer:**  
The model follows the path `Root (True) -> Node A (False) -> Leaf 2`, predicting $\hat{y} = 1$ (Approve Loan).

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Calculate the predicted value $\hat{y}_{R_m}$ and leaf Mean Squared Error (MSE) for a **Regression Tree** leaf node containing $n=3$ house price target values.

**Given:**  
Target house prices in leaf region $R_m$ (in thousands of dollars):
$$y = [200, 220, 240]$$

**Solution steps:**

01. **Calculate the predicted leaf value $\hat{y}_{R_m}$:**  
    Regression trees output the average target value of all training instances inside that leaf region:
    $$\hat{y}_{R_m} = \frac{1}{N_m} \sum_{i \in R_m} y_i = \frac{200 + 220 + 240}{3} = \frac{660}{3} = 220$$
    *(The leaf predicts $\$220,000$ for any new test sample landing in this region).*

02. **Calculate individual prediction errors ($y_i - \hat{y}_{R_m}$):**
    - Sample 1: $200 - 220 = -20 \implies (-20)^2 = 400$
    - Sample 2: $220 - 220 = 0 \implies (0)^2 = 0$
    - Sample 3: $240 - 220 = +20 \implies (+20)^2 = 400$

03. **Compute Leaf Mean Squared Error (MSE):**
    $$\text{MSE}_{R_m} = \frac{400 + 0 + 400}{3} = \frac{800}{3} \approx 266.67$$

04. **Interpret regression tree behavior:**  
    Regression trees fit piecewise-constant step functions. Within any single leaf region, all inputs receive the exact same mean scalar prediction.

**Answer:**  
The leaf predicts $\hat{y}_{R_m} = \$220,000$ with an internal leaf $\text{MSE} = 266.67$.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Allowing a decision tree to grow without depth constraints (`max_depth = None`), growing until every leaf contains 1 sample.  
✅ **FIX:** Set stopping hyperparameter constraints like `max_depth`, `min_samples_split`, or `min_samples_leaf`.  
**WHY:** Unconstrained trees memorize noise and outliers in training data, resulting in $100\%$ training accuracy but severe overfitting and poor test performance.

❌ **MISTAKE:** Standardizing or min-max scaling numerical features before feeding them into a Decision Tree.  
✅ **FIX:** Pass raw numerical features directly into the tree without scaling.  
**WHY:** Decision trees evaluate feature conditions using ordinal split thresholds ($x_j \le v$); monotonic scaling transformations do not change the ordering of values or the resulting split decisions.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**When to Use:**
- You need high model interpretability with clear IF-THEN business rules.
- Dataset contains non-linear relationships, step functions, or complex feature interactions.
- Dataset includes a mix of numerical and categorical variables without pre-processing scaling.

**When NOT to Use:**
- Underlying relationship is purely smooth and linear (e.g., $y = 3x_1 + 2x_2$), where OLS regression is far more efficient.
- Small changes in training data cause wild variations in tree structure (high variance).

**The Boundary:**  
If interpretability and rule-based decision paths are paramount, use a **Single Decision Tree**. If predictive accuracy is priority and interpretability can be relaxed, ensemble trees (**Random Forests** or **Gradient Boosting**) are preferred.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Classification & Regression Fundamentals:** Applies classification labels and regression means to leaf partitions.
- **Cartesian Geometry:** Constructs orthogonal, axis-aligned decision boundaries.

**Enables:**
- **Entropy & Information Gain / Gini Impurity:** Mathematical splitting criteria used to select optimal feature cuts.
- **Random Forests:** Ensembles hundreds of decorrelated decision trees using bagging to eliminate individual tree variance.
- **Gradient Boosted Decision Trees (XGBoost/LightGBM):** Sequential tree ensembles built on residual error corrections.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** Bank Mortgage Loan Automated Underwriting  
A financial institution uses a decision tree to automate mortgage pre-approval decisions.

**Implementation Workflow:**
1. **Business Requirement:** Regulatory compliance requires the bank to explain the exact decision logic for every rejected mortgage application.
2. **Model Training:** Fit a decision tree with `max_depth = 4` on historical applicant profiles (credit score, debt-to-income ratio, down payment percentage).
3. **Generated Business Rules:**
   - *Rule 1:* IF `Credit Score > 720` AND `Debt-to-Income < 35%` $\implies$ **Approve**.
   - *Rule 2:* IF `Credit Score <= 620` AND `Down Payment < 10%` $\implies$ **Deny**.
4. **Auditability:** When an applicant is denied, the system prints the precise path traversed (e.g., *"Denied due to Rule 2: Credit Score 600 <= 620"*).
5. **Business Impact:** Automates $78\%$ of routine mortgage applications in under 2 seconds while maintaining $100\%$ legal audit compliance.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Medium  
**Question:** *"Why are single Decision Trees prone to high variance, and how do tree depth hyperparameters mitigate this issue?"*

**Expected Answer:**  
Single Decision Trees are non-parametric models that make no assumptions about data distribution. If allowed to grow unconstrained (`max_depth = None`), a tree will continue splitting until every leaf is pure, creating hyper-specific boundaries that memorize random training noise. A minor perturbation in the training dataset can alter the root split, completely changing the downstream tree structure and causing high variance. Constraining hyperparameters like `max_depth` or `min_samples_leaf` forces early stopping, pruning complex branches and bounding model complexity to ensure robust generalization.

---

## KEY TAKEAWAYS (50 words max)

- Hierarchical flowchart structure: Root Node $\to$ Decision Nodes $\to$ Leaf Nodes.
- Slices feature space using axis-aligned orthogonal cuts.
- Output: Majority class (Classification) or target mean (Regression).
- Invariant to feature scaling; highly interpretable IF-THEN rules.
- Requires depth constraints (`max_depth`) to prevent overfitting.
