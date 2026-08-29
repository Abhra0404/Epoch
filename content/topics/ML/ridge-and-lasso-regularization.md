# Ridge and Lasso Regularization

**TOPIC:** Ridge and Lasso Regularization  
**PREREQUISITE TOPICS:** Multiple Linear Regression, Loss Functions, Matrix Inversion  
**LEARNING OUTCOMES:** Explain the bias-variance tradeoff, derive Ridge ($L_2$) and Lasso ($L_1$) objective functions, compare geometric constraint shapes, and apply regularization to prevent overfitting.

## 1. CORE CONCEPT

Regularization is a technique used in machine learning to prevent models from **overfitting**—the bad behavior where a model learns training data noise instead of true underlying patterns.

Imagine walking a energetic dog on a leash. Without a leash (unregularized OLS), the dog darting after every falling leaf or butterfly represents your model chasing random noise in the training set, producing huge, wild coefficient values. The **regularization penalty** acts as a leash: it allows the dog to explore real signals but pulls back if it strays too far, forcing model weights to stay small and well-behaved.

Mathematically, regularization adds a penalty term directly to the standard Mean Squared Error loss function. This penalty increases whenever coefficient weights ($\beta_j$) grow too large.

There are two primary types of regularization:
1. **Ridge Regression ($L_2$ Regularization):** Penalizes the sum of *squared* coefficient values. It shrinks all weights smoothly toward zero, but rarely sets any weight to exactly zero.
2. **Lasso Regression ($L_1$ Regularization):** Penalizes the sum of *absolute* coefficient values. It shrinks weights and forces irrelevant feature coefficients to become *exactly zero*, performing automatic feature selection.

The key insight: Regularization trades a tiny amount of training accuracy (bias) for a huge increase in generalizability to unseen data (reduced variance).

## 2. THE PROBLEM IT SOLVES

Suppose you are predicting real estate prices with $100$ input features, including noisy or redundant features like *"color of the front door"* or *"number of electrical outlets"*.

An unregularized OLS model will try to fit every tiny fluctuation in the training set. If two features are collinear, OLS might assign absurdly large offsetting weights (e.g., $\beta_1 = +5,000$ and $\beta_2 = -4,990$). When tested on new houses, tiny measurement errors get multiplied by these massive weights, causing predictions to fail catastrophically.

Naive solutions require hand-deleting features based on intuition, which is slow and error-prone.

Ridge and Lasso solve this automatically. By penalizing large weights, they suppress noisy features and stabilize collinear variables without requiring manual feature removal.

## 3. FORMAL DEFINITION & NOTATION

Regularization modifies the standard OLS loss by adding a penalty scaled by hyperparameter $\lambda \ge 0$:

### Ridge Regression ($L_2$ Penalty)
$$J_{\text{Ridge}}(\boldsymbol{\beta}) = \frac{1}{2n} \sum_{i=1}^{n} \left(y_i - \mathbf{x}_i^T\boldsymbol{\beta}\right)^2 + \lambda \sum_{j=1}^{p} \beta_j^2 = \text{MSE} + \lambda \|\boldsymbol{\beta}\|_2^2$$

Closed-form matrix solution for Ridge:
$$\boldsymbol{\beta}_{\text{Ridge}} = \left(\mathbf{X}^T\mathbf{X} + \lambda \mathbf{I}\right)^{-1}\mathbf{X}^T\mathbf{y}$$

### Lasso Regression ($L_1$ Penalty)
$$J_{\text{Lasso}}(\boldsymbol{\beta}) = \frac{1}{2n} \sum_{i=1}^{n} \left(y_i - \mathbf{x}_i^T\boldsymbol{\beta}\right)^2 + \lambda \sum_{j=1}^{p} |\beta_j| = \text{MSE} + \lambda \|\boldsymbol{\beta}\|_1$$

*(Note: The intercept term $\beta_0$ is explicitly excluded from the penalty).*

| Symbol | Meaning | Example |
|---|---|---|
| $\lambda$ | Regularization strength hyperparameter | $\lambda = 1.0$ ($\lambda=0$ is OLS) |
| $\|\boldsymbol{\beta}\|_2^2$ | $L_2$ norm (squared sum of weights) | $\beta_1^2 + \beta_2^2 + \dots + \beta_p^2$ |
| $\|\boldsymbol{\beta}\|_1$ | $L_1$ norm (sum of absolute weights) | $|\beta_1| + |\beta_2| + \dots + |\beta_p|$ |
| $\mathbf{I}$ | Identity matrix | Ensures $(\mathbf{X}^T\mathbf{X} + \lambda\mathbf{I})$ is always invertible |

## 4. INTUITION WITH VISUALS

Picture a 2D contour plot where the horizontal axis is coefficient $\beta_1$ and the vertical axis is coefficient $\beta_2$.

The unregularized OLS loss surface forms elliptical rings around the unconstrained optimal point $\hat{\boldsymbol{\beta}}_{\text{OLS}}$.

Now place a constraint boundary centered at the origin $(0,0)$:
- **Ridge ($L_2$) constraint:** Forms a smooth circle ($\beta_1^2 + \beta_2^2 \le s$). As the elliptical OLS loss rings expand outward from the center, they first touch the smooth Ridge circle at a point along the curve. Both $\beta_1$ and $\beta_2$ shrink toward zero, but because the boundary is round, the intersection rarely hits an axis directly.
- **Lasso ($L_1$) constraint:** Forms a diamond shape rotated at $45^\circ$ ($|\beta_1| + |\beta_2| \le s$) with sharp corners sitting directly on the coordinate axes.

As the expanding OLS ellipse hits the diamond, it almost always touches one of the sharp corners on an axis first. At that point, the other coefficient is forced to be **exactly zero**, creating a sparse model.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Calculate the exact regularized weight $w_{\text{Ridge}}$ for a 1D model $\hat{y} = w \cdot x$ using Ridge Regression with penalty $\lambda = 1.0$.

**Given:**  
- Dataset ($n=2$): $(x_1, y_1) = (1, 2)$ and $(x_2, y_2) = (2, 4)$
- Unregularized OLS weight: $w_{\text{OLS}} = 2.0$
- Penalty strength: $\lambda = 1.0$
- Loss function: $J(w) = \frac{1}{2n} \sum_{i=1}^{n} (w x_i - y_i)^2 + \lambda w^2$

**Solution steps:**

01. **Write out the explicit Ridge loss function:**
    $$J(w) = \frac{1}{2(2)} \left[ (w(1) - 2)^2 + (w(2) - 4)^2 \right] + 1.0 \cdot w^2$$

02. **Simplify the MSE loss portion:**
    - Note that $(2w - 4)^2 = 4(w - 2)^2$
    - Thus: $[(w - 2)^2 + 4(w - 2)^2] = 5(w - 2)^2$
    $$J(w) = \frac{5}{4}(w - 2)^2 + w^2$$
    $$J(w) = \frac{5}{4}(w^2 - 4w + 4) + w^2 = \frac{5}{4}w^2 - 5w + 5 + w^2$$
    $$J(w) = \frac{9}{4}w^2 - 5w + 5$$

03. **Take derivative with respect to $w$ and set to zero:**
    $$\frac{dJ}{dw} = \frac{9}{2}w - 5 = 0$$

04. **Solve for regularized weight $w_{\text{Ridge}}$:**
    $$\frac{9}{2}w = 5 \implies w_{\text{Ridge}} = \frac{10}{9} \approx 1.111$$

05. **Compare to OLS:**
    - Unregularized weight: $w_{\text{OLS}} = 2.0$
    - Ridge weight with $\lambda = 1.0$: $w_{\text{Ridge}} = 1.111$
    - Penalty $\lambda = 1.0$ successfully shrank the weight by nearly $44\%$ to control variance.

**Answer:**  
The exact Ridge solution is $w_{\text{Ridge}} = \frac{10}{9} \approx 1.111$.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Demonstrate how Lasso ($L_1$) regularization applies **soft-thresholding** to force a weight to zero when $\lambda$ is sufficiently large.

**Given:**  
- A single observation model ($n=1$): $(x, y) = (1, 3)$
- Unregularized weight: $w_{\text{OLS}} = 3.0$
- Objective function: $J(w) = \frac{1}{2}(w \cdot 1 - 3)^2 + \lambda |w|$

**Solution steps:**

01. **Assume $w > 0$ and expand loss function:**
    $$J(w) = \frac{1}{2}(w - 3)^2 + \lambda w$$

02. **Take derivative with respect to $w$:**
    $$\frac{dJ}{dw} = (w - 3) + \lambda$$

03. **Set derivative to zero and solve for $w$:**
    $$(w - 3) + \lambda = 0 \implies w_{\text{Lasso}} = 3 - \lambda$$

04. **Evaluate $w_{\text{Lasso}}$ under two penalty levels ($\lambda = 1.0$ vs $\lambda = 3.5$):**
    - **Case A ($\lambda = 1.0$):**
      $$w_{\text{Lasso}} = 3 - 1.0 = 2.0$$
      *(Weight is shrunken from $3.0$ to $2.0$).*
    - **Case B ($\lambda = 3.5$):**
      $$w_{\text{Lasso}} = 3 - 3.5 = -0.5$$
      *Since we assumed $w > 0$, the derivative on the negative side ($\frac{dJ}{dw} = (w-3) - \lambda$) yields a positive slope at $w=0$. Therefore, the minimum hits a hard boundary at zero:*
      $$w_{\text{Lasso}} = 0.0$$

05. **General Formula (Soft-Thresholding Operator):**
    $$w_{\text{Lasso}} = \text{sign}(w_{\text{OLS}}) \cdot \max\left(0, |w_{\text{OLS}}| - \lambda\right)$$

**Answer:**  
For $\lambda = 1.0$, $w_{\text{Lasso}} = 2.0$. For $\lambda = 3.5$, $w_{\text{Lasso}}$ is forced to exactly $0.0$.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Applying Ridge or Lasso regularization without scaling input features first.  
✅ **FIX:** Always standardize features ($z = \frac{x - \mu}{\sigma}$) so all features have zero mean and unit variance.  
**WHY:** Unscaled features measured in large units (e.g., square feet vs. number of bathrooms) naturally receive tiny coefficients and avoid regularization penalties purely due to scale.

❌ **MISTAKE:** Penalizing the intercept term $\beta_0$ in the loss function.  
✅ **FIX:** Exclude $\beta_0$ from the penalty sum: $\sum_{j=1}^{p} \beta_j^2$.  
**WHY:** The intercept merely controls the overall vertical baseline of predictions; shrinking $\beta_0$ biases the model toward predicting zero regardless of target scale.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use Ridge ($L_2$):**
- You have many features that are highly correlated (multicollinearity).
- You believe most features contribute small amounts of true signal to the target.

**When to Use Lasso ($L_1$):**
- You have high-dimensional datasets with many sparse or irrelevant features ($p \gg n$).
- You require a clean, sparse model for easy feature selection and production efficiency.

**When NOT to Use:**
- Simple, small datasets ($n \gg p$) with non-correlated features where unregularized OLS performs well without bias.

**The Boundary:**  
If feature selection is required, use **Lasso**. If features are highly correlated, use **Ridge**. If you need both simultaneously, use **ElasticNet** ($L_1 + L_2$).

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Multiple Linear Regression:** Adds penalty constraints directly onto OLS matrix formulations.
- **Bias-Variance Tradeoff:** Explicitly increases bias to dramatically lower model variance.

**Enables:**
- **ElasticNet Regression:** Blends $L_1$ and $L_2$ penalties into a single hybrid objective function.
- **Weight Decay in Neural Networks:** $L_2$ regularization applied directly to deep learning network weights during gradient descent.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Genomic Biomarker Discovery  
A medical research lab analyzes gene expression profiles to predict patient drug response rates.

**Implementation Workflow:**
1. **Data Dimensions:** The dataset contains $n = 200$ patient samples but $p = 20,000$ gene expression markers ($p \gg n$). Unregularized OLS cannot be computed because $(\mathbf{X}^T\mathbf{X})$ is non-invertible.
2. **Model Choice:** The team chooses **Lasso Regression** because most genes are irrelevant noise, and only a few key biomarkers dictate drug response.
3. **Hyperparameter Tuning:** Cross-validation selects an optimal penalty parameter $\lambda = 0.25$.
4. **Feature Selection Result:** Lasso shrinks $19,985$ gene coefficients to **exactly zero**, isolating a sparse set of $15$ key biomarker genes.
5. **Impact:** Doctors develop a low-cost, targeted diagnostic panel testing only those $15$ genes, reducing diagnostic costs from $\$5,000$ to $\$50$ per patient while maintaining high prediction accuracy.

## INTERVIEW QUESTION

**Difficulty:** Hard  
**Question:** *"Why does Lasso ($L_1$) regularization produce sparse models with exact zeros, whereas Ridge ($L_2$) only shrinks weights close to zero?"*

**Expected Answer:**  
Geometrically, the $L_1$ penalty constraint forms a diamond shape with sharp corners located directly on the coordinate axes ($|\beta_1| + |\beta_2| \le s$). As the elliptical OLS loss contours expand, they are statistically far more likely to intersect one of these sharp corners first, forcing the non-intersecting coordinate to equal exactly zero. Conversely, the $L_2$ penalty forms a smooth, round sphere ($\beta_1^2 + \beta_2^2 \le s$) with no corners; the expanding loss ellipse touches the smooth circle tangentially, shrinking weights proportionally without hitting zero.

## KEY TAKEAWAYS

- Regularization prevents overfitting by penalizing large coefficient weights.
- **Ridge ($L_2$):** Adds $\lambda \sum \beta_j^2$; shrinks weights smoothly; handles multicollinearity.
- **Lasso ($L_1$):** Adds $\lambda \sum |\beta_j|$; sets irrelevant weights to zero; performs feature selection.
- Features must be standardized before training.
