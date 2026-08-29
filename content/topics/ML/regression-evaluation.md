# Regression Evaluation

**TOPIC:** Regression Evaluation  
**PREREQUISITE TOPICS:** Simple & Multiple Linear Regression, Basic Statistics (Mean, Standard Deviation)  
**LEARNING OUTCOMES:** Compute and interpret MAE, MSE, RMSE, $R^2$, and Adjusted $R^2$; select appropriate metrics based on outlier sensitivity; and evaluate model goodness-of-fit.

## 1. CORE CONCEPT

After building a regression model, you must measure how accurately it predicts continuous target values. **Regression Evaluation** provides a set of quantitative metrics to evaluate model performance, diagnose errors, and compare different algorithms.

Unlike classification tasks where predictions are simply "right" or "wrong" (accuracy), regression predictions are continuous numbers. A predicted house price of $\$305,000$ for a $\$300,000$ home is very close, whereas a prediction of $\$600,000$ is far off. Evaluation metrics measure the magnitude and distribution of these prediction errors.

Key regression metrics fall into two distinct categories:
1. **Error-Based Metrics (MAE, MSE, RMSE):** Measure average prediction error in raw target units. Lower values mean better performance ($0.0$ is perfect).
2. **Variance-Based Metrics ($R^2$, Adjusted $R^2$):** Measure the proportion of target variance explained by the model relative to a simple baseline average. Higher values mean better fit ($1.0$ is perfect).

Imagine firing arrows at a target target. **MAE** measures the average physical distance between where your arrows land and the bullseye. **RMSE** penalizes wild misses disproportionately harder. **$R^2$** measures how much better your aiming skill is compared to someone shooting randomly at the board center.

The key insight: No single evaluation metric tells the full story; effective evaluation requires pairing unit-level error metrics (RMSE/MAE) with variance-explained metrics ($R^2$).

## 2. THE PROBLEM IT SOLVES

Suppose you deploy a Machine Learning model predicting food delivery arrival times. 

If you present raw training loss to business executives as *"Mean Squared Error = 16.0"*, non-technical stakeholders cannot judge if that is good or bad. Is $16.0$ minutes, percent, or squared dollars? Furthermore, a model might have low average error but occasionally be off by 45 minutes, frustrating customers.

Relying on a single metric causes major blind spots:
- **MAE** provides human-readable error (e.g., *"off by 3 minutes on average"*), but masks catastrophic outliers.
- **Standard $R^2$** increases artificially every time you add *any* random feature to a model, creating a false illusion of improvement.

Regression evaluation solves this by offering a standardized toolkit to measure average error, detect extreme outliers, and penalize feature bloat.

## 3. FORMAL DEFINITION & NOTATION

Given actual target values $y_i$, predicted values $\hat{y}_i$, and sample mean $\bar{y} = \frac{1}{n}\sum y_i$:

### Mean Absolute Error (MAE)
$$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$$

### Mean Squared Error (MSE) & Root Mean Squared Error (RMSE)
$$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 \quad \implies \quad \text{RMSE} = \sqrt{\text{MSE}} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}$$

### Coefficient of Determination ($R^2$)
$$R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}} = 1 - \frac{\sum_{i=1}^{n} (y_i - \hat{y}_i)^2}{\sum_{i=1}^{n} (y_i - \bar{y})^2}$$

### Adjusted $R^2$
$$R^2_{\text{adj}} = 1 - \left[ \frac{(1 - R^2)(n - 1)}{n - p - 1} \right]$$

| Metric | Output Range | Units | Outlier Sensitivity |
|---|---|---|---|
| **MAE** | $[0, \infty)$ | Same as target $y$ | Low (Robust) |
| **MSE** | $[0, \infty)$ | Squared target units ($y^2$) | High |
| **RMSE** | $[0, \infty)$ | Same as target $y$ | High |
| **$R^2$** | $(-\infty, 1.0]$ | Unitless (Percentage ratio) | Medium |
| **Adjusted $R^2$** | $(-\infty, 1.0]$ | Unitless (Penalizes extra features $p$) | Medium |

## 4. INTUITION WITH VISUALS

Picture a 2D scatter plot where the horizontal axis is the Actual Target Value ($y$) and the vertical axis is the Model Predicted Value ($\hat{y}$).

Draw a diagonal $45^\circ$ reference line passing through the origin ($\hat{y} = y$).
- If your model makes 100% perfect predictions, every single data point falls directly on this $45^\circ$ line ($R^2 = 1.0$, $\text{RMSE} = 0$).
- Points floating above the line represent **over-predictions** ($\hat{y} > y$). Points below represent **under-predictions** ($\hat{y} < y$).

Now picture a horizontal baseline line plotted at $\hat{y} = \bar{y}$ (predicting the target mean for every instance). This naive horizontal line represents $R^2 = 0.0$.

$R^2$ measures the percentage reduction in error points achieved by pulling data dots away from the horizontal mean line and aligning them along the diagonal $45^\circ$ perfect-prediction line.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Calculate MAE, MSE, RMSE, $SS_{\text{tot}}$, $SS_{\text{res}}$, and $R^2$ by hand for a small dataset with $n=3$ test observations.

**Given:**  
- Actual targets: $y = [2, 4, 9]$
- Model predictions: $\hat{y} = [3, 4, 8]$

**Solution steps:**

01. **Calculate target mean $\bar{y}$ and prediction errors ($e_i = y_i - \hat{y}_i$):**
    $$\bar{y} = \frac{2 + 4 + 9}{3} = \frac{15}{3} = 5$$
    - Point 1: Error $= 2 - 3 = -1 \implies |e_1| = 1, e_1^2 = 1$
    - Point 2: Error $= 4 - 4 = 0 \implies |e_2| = 0, e_2^2 = 0$
    - Point 3: Error $= 9 - 8 = 1 \implies |e_3| = 1, e_3^2 = 1$

02. **Compute MAE (Mean Absolute Error):**
    $$\text{MAE} = \frac{|-1| + |0| + |1|}{3} = \frac{2}{3} \approx 0.667$$

03. **Compute MSE and RMSE:**
    $$\text{MSE} = \frac{(-1)^2 + (0)^2 + (1)^2}{3} = \frac{1 + 0 + 1}{3} = \frac{2}{3} \approx 0.667$$
    $$\text{RMSE} = \sqrt{\text{MSE}} = \sqrt{\frac{2}{3}} \approx 0.816$$

04. **Compute Total Sum of Squares ($SS_{\text{tot}}$) and Residual Sum of Squares ($SS_{\text{res}}$):**
    - $SS_{\text{res}} = \sum (y_i - \hat{y}_i)^2 = 1 + 0 + 1 = 2$
    - $SS_{\text{tot}} = \sum (y_i - \bar{y})^2$:
      - Point 1: $(2 - 5)^2 = (-3)^2 = 9$
      - Point 2: $(4 - 5)^2 = (-1)^2 = 1$
      - Point 3: $(9 - 5)^2 = (4)^2 = 16$
      $$SS_{\text{tot}} = 9 + 1 + 16 = 26$$

05. **Compute $R^2$:**
    $$R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}} = 1 - \frac{2}{26} = 1 - \frac{1}{13} = \frac{12}{13} \approx 0.923$$

**Answer:**  
$\text{MAE} = 0.667$, $\text{MSE} = 0.667$, $\text{RMSE} = 0.816$, and $R^2 = 0.923$ ($92.3\%$ of target variance explained).

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Demonstrate how a single large outlier impacts MAE vs RMSE differently, showing why RMSE is outlier-sensitive.

**Given:**  
- Dataset from Example 1 ($n=3$): Actuals $y=[2,4,9]$, Predictions $\hat{y}=[3,4,8]$.
- Now add 1 outlier observation ($n=4$ total): $y_4 = 25$, but model predicts $\hat{y}_4 = 5$ (Error $= 25 - 5 = 20$).

**Solution steps:**

01. **Evaluate error metrics for the 4th outlier instance alone:**
    - Absolute error $|e_4| = |20| = 20$
    - Squared error $e_4^2 = (20)^2 = 400$

02. **Recalculate MAE with outlier included ($n=4$):**
    $$\text{MAE}_{\text{new}} = \frac{1 + 0 + 1 + 20}{4} = \frac{22}{4} = 5.50$$
    *(MAE increased from $0.667$ to $5.50$—an $8.25\times$ increase).*

03. **Recalculate MSE and RMSE with outlier included ($n=4$):**
    $$\text{MSE}_{\text{new}} = \frac{1 + 0 + 1 + 400}{4} = \frac{402}{4} = 100.50$$
    $$\text{RMSE}_{\text{new}} = \sqrt{100.50} \approx 10.025$$
    *(RMSE exploded from $0.816$ to $10.025$—a $12.28\times$ increase).*

04. **Compare metric sensitivity:**
    - Adding one outlier increased MAE by $5.50 / 0.667 = 8.25\times$.
    - The same outlier increased RMSE by $10.025 / 0.816 = 12.28\times$.

05. **Key Observation:**  
    Because RMSE squares errors prior to averaging, extreme errors dominate the metric. If severe penalization of large misses is desired, use RMSE; if robust average error is required, use MAE.

**Answer:**  
Outlier causes MAE to rise to $5.50$, while RMSE explodes to $10.025$, proving RMSE's high outlier sensitivity.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Relying on standard $R^2$ when comparing Multiple Linear Regression models with different numbers of features.  
✅ **FIX:** Use **Adjusted $R^2$** for model selection when comparing feature sets.  
**WHY:** Standard $R^2$ is mathematically guaranteed to stay flat or increase whenever *any* feature is added—even completely random noise—whereas Adjusted $R^2$ penalizes feature bloat ($p$).

❌ **MISTAKE:** Believing $R^2$ must always be between $0.0$ and $1.0$.  
✅ **FIX:** Recognize that $R^2$ can be negative ($R^2 < 0$) on out-of-sample test data.  
**WHY:** If your model performs worse on unseen test data than simply predicting the historical mean $\bar{y}$, $SS_{\text{res}} > SS_{\text{tot}}$, driving $R^2$ below zero.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use MAE:**
- Dataset contains uncleaned outliers or noisy sensor spikes that should not distort overall evaluation.
- You need a metric directly interpretable in raw target units.

**When to Use RMSE:**
- Large errors are disproportionately harmful or costly (e.g., medical dosage estimates, financial risk modeling).
- You want an error metric in original target units that aligns mathematically with OLS loss optimization.

**When to Use Adjusted $R^2$:**
- Comparing multiple feature subsets or evaluating feature selection experiments in Multiple Linear Regression.

**The Boundary:**  
If large errors carry catastrophic real-world costs, evaluate with **RMSE**. If errors scale linearly without special outlier penalties, use **MAE**. Always report **Adjusted $R^2$** alongside unit errors.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Simple & Multiple Linear Regression:** Evaluates predictions generated by linear models.
- **Ordinary Least Squares (OLS):** MSE loss directly matches the objective function minimized by OLS algorithms.

**Enables:**
- **Cross-Validation & Hyperparameter Tuning:** Uses RMSE/MAE scores to guide grid search selection for regularization penalties $\lambda$.
- **Model Comparison:** Provides unified, objective metrics to compare Linear Regression against Random Forests or Neural Networks.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Rideshare Estimated Time of Arrival (ETA) Engine  
A mobility platform evaluates an ML pipeline predicting driver arrival times in minutes.

**Implementation Workflow:**
1. **Model Evaluation Metrics:** The engineering team tracks both MAE and RMSE across 50,000 test trips.
2. **Initial Benchmark:** Baseline linear model achieves $\text{MAE} = 2.1\text{ mins}$, $\text{RMSE} = 5.8\text{ mins}$, $R^2 = 0.74$.
3. **Diagnostic Discovery:** The large gap between MAE ($2.1$) and RMSE ($5.8$) alerts engineers that while most ETA predictions are off by just 2 minutes, a small subset of severe traffic outliers are off by over 20 minutes.
4. **Model Iteration:** Engineers add real-time traffic signal features and train a regularized gradient boosted model.
5. **Final Production Results:**
   - $\text{MAE} = 1.4\text{ mins}$
   - $\text{RMSE} = 2.3\text{ mins}$
   - $\text{Adjusted } R^2 = 0.91$
6. **Business Impact:** Narrowing the RMSE gap directly reduces customer support cancellation tickets by $22\%$.

## INTERVIEW QUESTION

**Difficulty:** Medium  
**Question:** *"Why can $R^2$ turn negative when evaluating a model on out-of-sample test data, and what does a negative $R^2$ indicate about model performance?"*

**Expected Answer:**  
$R^2$ is defined as $1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}}$, where $SS_{\text{tot}}$ measures the total squared variation around the target mean $\bar{y}$. On training data, an OLS model's predictions are guaranteed to perform at least as well as predicting $\bar{y}$, bounding $R^2 \ge 0$. However, on unseen test data, a severely overfitted or misspecified model can produce predictions so wildly inaccurate that its residual sum of squares ($SS_{\text{res}}$) exceeds the variance of the baseline target mean ($SS_{\text{tot}}$). This causes $\frac{SS_{\text{res}}}{SS_{\text{tot}}} > 1$, producing a negative $R^2$, indicating the model performs worse than simply guessing the average test value.

## KEY TAKEAWAYS

- **MAE:** Average absolute error; robust against outliers; original target units.
- **RMSE:** Square root of MSE; heavily penalizes large errors; original target units.
- **$R^2$:** Percentage of variance explained relative to mean baseline.
- **Adjusted $R^2$:** Penalizes extra features ($p$); prevents false feature inflation.
