# Logistic Regression and the Sigmoid Function

**TOPIC:** Logistic Regression and the Sigmoid Function  
**PREREQUISITE TOPICS:** Classification Fundamentals, Multiple Linear Regression, Exponents and Natural Logarithms  
**LEARNING OUTCOMES:** Explain the mathematical formulation of Logistic Regression, derive the Sigmoid function, interpret coefficients as log-odds ratios, and compute Binary Cross-Entropy (Log Loss).

## 1. CORE CONCEPT

**Logistic Regression** is the foundational statistical model for binary classification. Despite having "regression" in its name, it is a classification algorithm that predicts the probability of an observation belonging to one of two discrete classes ($y \in \{0, 1\}$).

To transform unbounded linear equations into valid probability scores bounded strictly between $0.0$ and $1.0$, Logistic Regression takes the standard linear regression formula $z = \boldsymbol{\beta}^T\mathbf{x}$ and passes it through a special mathematical function called the **Sigmoid Function** (also known as the logistic function).

The Sigmoid function acts as a mathematical "squashing" function. It takes any real number from negative infinity to positive infinity ($-\infty$ to $+\infty$) and maps it onto a smooth, S-shaped curve bounded between $0.0$ and $1.0$:
- Extremely negative linear values ($z \to -\infty$) map near $0.0$.
- Extremely positive linear values ($z \to +\infty$) map near $1.0$.
- A linear output of zero ($z = 0$) maps to exactly $0.5$.

Instead of estimating raw values, Logistic Regression models the **log-odds** (logit) of the positive class as a linear combination of features.

The key insight: Logistic Regression combines linear feature weighting with non-linear Sigmoid activation to produce calibrated, interpretable probability predictions.

## 2. THE PROBLEM IT SOLVES

Suppose a medical clinic wants to predict whether a patient has diabetes based on blood glucose levels.

If you use **Linear Regression**, your model equation might predict a target score of $-0.3$ for a low-glucose patient or $+1.6$ for a high-glucose patient. These numbers cannot be interpreted as probabilities. Furthermore, trying to train linear regression using Mean Squared Error (MSE) on binary targets creates a non-convex loss surface full of local minima traps.

Logistic Regression solves both problems. First, the Sigmoid function guarantees all output predictions fall neatly into valid probability ranges $[0, 1]$. Second, pairing Logistic Regression with **Binary Cross-Entropy (Log Loss)** creates a smooth, convex loss landscape where Gradient Descent is guaranteed to converge to the global minimum.

## 3. FORMAL DEFINITION & NOTATION

For a feature vector $\mathbf{x} = (x_1, x_2, \dots, x_p)$, we compute the linear combination $z$:

$$z = \beta_0 + \beta_1 x_1 + \dots + \beta_p x_p = \boldsymbol{\beta}^T\mathbf{x}$$

Passing $z$ through the **Sigmoid Function** $\sigma(z)$ yields predicted probability $\hat{p}$:

$$\hat{p} = P(y = 1 \mid \mathbf{x}) = \sigma(z) = \frac{1}{1 + e^{-z}} = \frac{1}{1 + e^{-(\boldsymbol{\beta}^T\mathbf{x})}}$$

### Odds and Log-Odds (Logit)
- **Odds Ratio:** $\text{Odds} = \frac{p}{1 - p}$
- **Log-Odds (Logit):** $\ln\left(\frac{p}{1 - p}\right) = \boldsymbol{\beta}^T\mathbf{x}$

| Symbol | Meaning | Range |
|---|---|---|
| $z$ | Logit score (linear combination $\boldsymbol{\beta}^T\mathbf{x}$) | $(-\infty, +\infty)$ |
| $\sigma(z)$ | Sigmoid function activation | $(0.0, 1.0)$ |
| $\hat{p}$ | Predicted probability $P(y=1 \mid \mathbf{x})$ | $[0.0, 1.0]$ |
| $e$ | Euler's number | $\approx 2.71828$ |
| $J(\boldsymbol{\beta})$ | Binary Cross-Entropy Loss (Log Loss) | $[0.0, \infty)$ |

### Binary Cross-Entropy Loss (Log Loss)
$$J(\boldsymbol{\beta}) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \ln(\hat{p}_i) + (1 - y_i) \ln(1 - \hat{p}_i) \right]$$

## 4. INTUITION WITH VISUALS

Picture a graph with logit score $z$ on the horizontal axis ($-\infty$ to $+\infty$) and predicted probability $\hat{p}$ on the vertical axis ($0.0$ to $1.0$).

Plotting $\sigma(z) = \frac{1}{1 + e^{-z}}$ reveals a smooth S-shaped curve:

1. **Center Point ($z = 0$):**  
   At $z = 0$, $e^{-0} = 1$, so $\sigma(0) = \frac{1}{1 + 1} = 0.50$. This point corresponds to the decision threshold.

2. **Positive Region ($z > 0$):**  
   As $z$ increases positively (e.g., $z = +2, +5$), $e^{-z}$ drops rapidly toward $0$, causing $\sigma(z)$ to approach $1.0$ asymptotically.

3. **Negative Region ($z < 0$):**  
   As $z$ drops negatively (e.g., $z = -2, -5$), $e^{-z}$ grows rapidly, causing $\sigma(z)$ to approach $0.0$ asymptotically.

The Sigmoid curve squashes the infinite horizontal linear space into a clean, smooth vertical probability strip bounded between $0$ and $1$.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Given a fitted Logistic Regression model predicting loan default ($y=1$) from credit score feature $x$, calculate logit score $z$, predicted probability $\hat{p}$, and final class prediction $\hat{y}$ for a customer with feature $x = 5$.

**Given:**  
- Intercept: $\beta_0 = -2.0$
- Slope coefficient: $\beta_1 = 0.8$
- Customer feature value: $x = 5$
- Decision threshold: $\tau = 0.50$
- Euler's constant approximation: $e^{-2.0} \approx 0.1353$

**Solution steps:**

01. **Calculate the linear combination logit score $z$:**
    $$z = \beta_0 + \beta_1 x = -2.0 + 0.8(5) = -2.0 + 4.0 = +2.0$$

02. **Substitute $z = +2.0$ into the Sigmoid probability function:**
    $$\hat{p} = \sigma(z) = \frac{1}{1 + e^{-z}} = \frac{1}{1 + e^{-2.0}}$$

03. **Perform step-by-step arithmetic:**
    $$\hat{p} = \frac{1}{1 + 0.1353} = \frac{1}{1.1353} \approx 0.8808$$
    *(There is an $88.08\%$ predicted probability of loan default).*

04. **Apply decision threshold $\tau = 0.50$:**
    $$\text{Since } \hat{p} = 0.8808 \ge 0.50 \implies \hat{y} = 1$$

05. **Interpret coefficient meaning:**  
    For every $1$-unit increase in feature $x$, the **log-odds** of default increase by $\beta_1 = 0.8$. Taking $\exp(0.8) \approx 2.225$ means the **odds** of default multiply by $2.225\times$.

**Answer:**  
Logit $z = +2.0$, predicted probability $\hat{p} \approx 0.8808$ ($88.08\%$), and predicted class is $\hat{y} = 1$.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Calculate Binary Cross-Entropy Loss (Log Loss) for a dataset of $n=2$ samples to measure penalty severity for confident wrong predictions versus correct predictions.

**Given:**  
- Sample 1: Actual $y_1 = 1$, Predicted $\hat{p}_1 = 0.80$ (Confident Correct)
- Sample 2: Actual $y_2 = 0$, Predicted $\hat{p}_2 = 0.90$ (Confident Wrong)
- Natural logarithms: $\ln(0.80) \approx -0.2231$, $\ln(0.10) \approx -2.3026$

**Solution steps:**

01. **Recall Binary Cross-Entropy loss formula per instance:**
    $$L_i = -\left[ y_i \ln(\hat{p}_i) + (1 - y_i) \ln(1 - \hat{p}_i) \right]$$

02. **Calculate loss for Sample 1 ($y_1 = 1, \hat{p}_1 = 0.80$):**
    - Since $y_1 = 1$, second term $(1 - y_1)$ drops out:
    $$L_1 = -\ln(0.80) = -(-0.2231) = 0.2231$$

03. **Calculate loss for Sample 2 ($y_2 = 0, \hat{p}_2 = 0.90$):**
    - Since $y_2 = 0$, first term $y_1$ drops out:
    - Note that $(1 - \hat{p}_2) = 1 - 0.90 = 0.10$
    $$L_2 = -\ln(1 - 0.90) = -\ln(0.10) = -(-2.3026) = 2.3026$$

04. **Compute average dataset loss $J(\boldsymbol{\beta})$:**
    $$J = \frac{L_1 + L_2}{2} = \frac{0.2231 + 2.3026}{2} = \frac{2.5257}{2} \approx 1.26285$$

05. **Key Takeaway:**  
    Notice how the confident wrong prediction ($L_2 = 2.3026$) generated over $10\times$ more loss penalty than the confident correct prediction ($L_1 = 0.2231$). Log Loss heavily penalizes models that are confidently wrong.

**Answer:**  
Average Log Loss $J \approx 1.2629$.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Interpreting Logistic Regression coefficients $\beta_1$ as direct changes in raw probability (e.g., claiming $\beta_1 = 0.8$ means probability increases by $80\%$).  
✅ **FIX:** Interpret $\beta_1$ as a linear change in **log-odds**, or exponentiate it ($\exp(\beta_1)$) to get the multiplicative change in **odds ratio**.  
**WHY:** Because the Sigmoid curve is non-linear, the change in raw probability for a $1$-unit feature increase varies depending on the starting baseline probability.

❌ **MISTAKE:** Training Logistic Regression using Mean Squared Error (MSE) loss.  
✅ **FIX:** Always use Binary Cross-Entropy Loss (Log Loss).  
**WHY:** MSE combined with Sigmoid produces a non-convex loss function full of flat regions and local minima where Gradient Descent gets permanently stuck.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use:**
- Binary classification tasks requiring calibrated probability outputs.
- Applications where model interpretability and feature importance (odds ratios) are mandatory (e.g., healthcare, finance).
- Fast, low-latency online inference baselines.

**When NOT to Use:**
- Datasets with highly complex, non-linear decision boundaries (unless using polynomial features or kernel tricks).
- Multi-class problems with non-mutually exclusive labels (without training separate One-vs-Rest models).

**The Boundary:**  
If classes are linearly separable in feature space and probability calibration is needed, use **Logistic Regression**. If boundaries are intricate, non-linear decision trees or Random Forests will outperform it.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Multiple Linear Regression:** Uses the exact same linear combination equation $z = \boldsymbol{\beta}^T\mathbf{x}$.
- **Classification Fundamentals:** Provides the probabilistic engine for binary decisions.

**Enables:**
- **Softmax Regression (Multinomial Logistic Regression):** Generalizes Sigmoid binary probabilities to $K$-class probability distributions.
- **Neural Networks:** Single neuron in a modern neural network is a Logistic Regression unit.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Banking Loan Default Probability Engine  
A retail bank evaluates consumer loan applications to estimate default risk ($y=1$).

**Implementation Workflow:**
1. **Data Collection:** Gather features: debt-to-income ratio ($x_1$), credit score ($x_2$), and income ($x_3$).
2. **Model Fitting:** Train Logistic Regression using Log Loss optimization:
   $$\text{Logit}(p) = 1.2 + 0.05 x_1 - 0.008 x_2 - 0.0001 x_3$$
3. **Odds Ratio Interpretation:**
   - Exponentiating debt-to-income coefficient: $\exp(0.05) \approx 1.051$.
   - For every 1-unit increase in debt-to-income ratio, the odds of default increase by $5.1\%$.
4. **Risk Thresholding:**
   - Applicant with $\hat{p} = 0.04$ ($4\%$ default probability): Approved instantly.
   - Applicant with $\hat{p} = 0.28$ ($28\%$ default probability): Flagged for higher interest rate or collateral requirement.
5. **Business Impact:** Maintains low default rates while satisfying regulatory compliance requiring fully transparent credit decisions.

## INTERVIEW QUESTION

**Difficulty:** Medium  
**Question:** *"Why do we use Binary Cross-Entropy (Log Loss) instead of Mean Squared Error (MSE) to train Logistic Regression models?"*

**Expected Answer:**  
Pairing Mean Squared Error with the non-linear Sigmoid activation function $\sigma(z)$ yields a non-convex loss function with multiple local minima and large flat plateau regions where derivatives approach zero. If Gradient Descent lands on a flat plateau, parameters stop updating, causing training to stall. In contrast, Binary Cross-Entropy loss eliminates Sigmoid saturation in its derivative, resulting in a strictly convex loss landscape. Convexity guarantees that Gradient Descent will always converge to the single unique global minimum.

## KEY TAKEAWAYS

- Models binary probability $\hat{p} = \sigma(\boldsymbol{\beta}^T\mathbf{x}) = \frac{1}{1 + e^{-z}}$.
- Sigmoid squashes $(-\infty, +\infty)$ onto smooth probability range $(0, 1)$.
- Coefficients represent linear changes in log-odds ($\ln \frac{p}{1-p}$).
- Optimized via strictly convex Binary Cross-Entropy (Log Loss).
