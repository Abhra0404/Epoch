# Classification Evaluation

**TOPIC:** Classification Evaluation  
**PREREQUISITE TOPICS:** Classification Fundamentals, Logistic Regression, Basic Probability  
**LEARNING OUTCOMES:** Construct a Confusion Matrix, calculate Precision, Recall, Specificity, and F1-Score, interpret ROC and Precision-Recall curves, and select appropriate metrics for imbalanced datasets.

## 1. CORE CONCEPT

Evaluating classification models requires going far beyond simple Accuracy. While accuracy measures the overall percentage of correct predictions, it can be highly misleading when dealing with real-world datasets where classes are imbalanced or where different types of errors carry vastly different costs.

Consider a medical screening test for a rare disease affecting $1\%$ of the population. A dummy model that predicts "Healthy" for every patient achieves $99\%$ accuracy, yet it fails to diagnose a single sick patient.

To properly evaluate classification performance, we use a **Confusion Matrix**—a $2 \times 2$ grid that categorizes predictions into four distinct buckets based on actual vs. predicted classes:
1. **True Positives (TP):** Correctly identified positive instances.
2. **True Negatives (TN):** Correctly identified negative instances.
3. **False Positives (FP):** Negative instances incorrectly labeled as positive (Type I Error / False Alarm).
4. **False Negatives (FN):** Positive instances incorrectly labeled as negative (Type II Error / Missed Detection).

From these four counts, we derive specialized metrics—**Precision**, **Recall**, **F1-Score**, and **ROC-AUC**—to measure model quality under different operational goals.

The key insight: Classification evaluation measures the specific trade-off between false alarms (False Positives) and missed detections (False Negatives).

## 2. THE PROBLEM IT SOLVES

Suppose an e-commerce platform builds an automated fraud detection engine. 

If the team relies solely on **Accuracy**, a model predicting $0$ (Legitimate) for all transactions might score $99.8\%$ accuracy simply because $99.8\%$ of orders are non-fraudulent. However, the business loses millions of dollars because zero fraudulent transactions ($y=1$) are caught.

Alternatively, treating all errors equally fails business logic. Flagging a legitimate customer (False Positive) causes minor inconvenience, whereas letting a major fraud ring pass through (False Negative) results in direct financial loss.

Classification evaluation solves this by separating precision (how trustworthy positive alerts are) from recall (how many actual fraud cases were caught), allowing teams to tune decision thresholds to match business risk priorities.

## 3. FORMAL DEFINITION & NOTATION

### The Confusion Matrix

| | Predicted Negative ($\hat{y}=0$) | Predicted Positive ($\hat{y}=1$) |
|---|---|---|
| **Actual Negative ($y=0$)** | **True Negative (TN)** | **False Positive (FP)** |
| **Actual Positive ($y=1$)** | **False Negative (FN)** | **True Positive (TP)** |

### Core Metrics Equations

- **Accuracy:** Proportion of overall correct predictions:
  $$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}}$$

- **Precision:** Exactness of positive predictions (Out of all flagged positives, how many were actually positive?):
  $$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$$

- **Recall (Sensitivity / True Positive Rate):** Completeness of positive detection (Out of all actual positives, how many did we catch?):
  $$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}$$

- **F1-Score:** Harmonic mean balancing Precision and Recall:
  $$\text{F1} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2\text{TP}}{2\text{TP} + \text{FP} + \text{FN}}$$

- **False Positive Rate (FPR):** Proportion of actual negatives falsely flagged:
  $$\text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}$$

## 4. INTUITION WITH VISUALS

The **ROC Curve (Receiver Operating Characteristic)** visualizes classification performance across all possible decision thresholds $\tau \in [0, 1]$.

Picture a graph where:
- Horizontal axis is **False Positive Rate (FPR)** ($0.0$ to $1.0$).
- Vertical axis is **True Positive Rate (TPR / Recall)** ($0.0$ to $1.0$).

As you sweep decision threshold $\tau$ from $1.0$ down to $0.0$:
- At $\tau = 1.0$, you predict $0$ for everything ($\text{TPR}=0, \text{FPR}=0$ at bottom-left corner).
- At $\tau = 0.0$, you predict $1$ for everything ($\text{TPR}=1, \text{FPR}=1$ at top-right corner).

A random guessing classifier forms a straight diagonal $45^\circ$ line ($\text{AUC} = 0.50$). A perfect classifier arches straight up to the top-left corner $(0, 1)$ before moving right ($\text{AUC} = 1.0$).

**AUC (Area Under Curve)** measures the probability that the model ranks a randomly chosen positive sample higher than a randomly chosen negative sample.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Construct a Confusion Matrix and calculate Accuracy, Precision, Recall, and F1-Score for a test dataset of $n=10$ observations.

**Given:**  
- Ground truth actuals: $y = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]$ ($5$ Positives, $5$ Negatives)
- Model predictions: $\hat{y} = [1, 1, 1, 1, 0, 1, 0, 0, 0, 0]$

**Solution steps:**

01. **Tally Confusion Matrix categories by comparing $y_i$ to $\hat{y}_i$:**
    - For actual $y=1$ samples (first 5):
      - Samples 1, 2, 3, 4: $y=1, \hat{y}=1 \implies \text{TP} = 4$
      - Sample 5: $y=1, \hat{y}=0 \implies \text{FN} = 1$
    - For actual $y=0$ samples (last 5):
      - Sample 6: $y=0, \hat{y}=1 \implies \text{FP} = 1$
      - Samples 7, 8, 9, 10: $y=0, \hat{y}=0 \implies \text{TN} = 4$

02. **Summary Confusion Matrix:**
    - $\text{TP} = 4$, $\text{FN} = 1$
    - $\text{FP} = 1$, $\text{TN} = 4$

03. **Calculate Accuracy:**
    $$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{Total}} = \frac{4 + 4}{10} = \frac{8}{10} = 0.80 \quad (80\%)$$

04. **Calculate Precision and Recall:**
    $$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}} = \frac{4}{4 + 1} = \frac{4}{5} = 0.80 \quad (80\%)$$
    $$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} = \frac{4}{4 + 1} = \frac{4}{5} = 0.80 \quad (80\%)$$

05. **Calculate F1-Score:**
    $$\text{F1} = 2 \cdot \frac{0.80 \times 0.80}{0.80 + 0.80} = 2 \cdot \frac{0.64}{1.60} = 0.80 \quad (80\%)$$

**Answer:**  
$\text{Accuracy} = 80\%$, $\text{Precision} = 80\%$, $\text{Recall} = 80\%$, and $\text{F1-Score} = 80\%$.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Demonstrate the **Precision-Recall Trade-off** by showing how shifting decision threshold $\tau$ from $0.50$ to $0.80$ changes Precision and Recall.

**Given:**  
Predicted probabilities $\hat{p}$ for $n=4$ samples:
- Sample 1: Actual $y_1 = 1$, $\hat{p}_1 = 0.90$
- Sample 2: Actual $y_2 = 1$, $\hat{p}_2 = 0.70$
- Sample 3: Actual $y_3 = 0$, $\hat{p}_3 = 0.60$
- Sample 4: Actual $y_4 = 0$, $\hat{p}_4 = 0.30$

**Solution steps:**

01. **Evaluate at Default Threshold $\tau = 0.50$:**
    - Predictions: $\hat{p} \ge 0.50 \implies \hat{y} = [1, 1, 1, 0]$
    - Matrix: $\text{TP}=2$ (Samples 1,2), $\text{FN}=0$, $\text{FP}=1$ (Sample 3), $\text{TN}=1$ (Sample 4)
    - Compute metrics:
      $$\text{Precision}_{0.50} = \frac{2}{2 + 1} = \frac{2}{3} \approx 0.667 \quad (66.7\%)$$
      $$\text{Recall}_{0.50} = \frac{2}{2 + 0} = 1.00 \quad (100\%)$$

02. **Evaluate at Higher Strict Threshold $\tau = 0.80$:**
    - Predictions: $\hat{p} \ge 0.80 \implies \hat{y} = [1, 0, 0, 0]$
    - Matrix: $\text{TP}=1$ (Sample 1), $\text{FN}=1$ (Sample 2), $\text{FP}=0$, $\text{TN}=2$ (Samples 3,4)
    - Compute metrics:
      $$\text{Precision}_{0.80} = \frac{1}{1 + 0} = 1.00 \quad (100\%)$$
      $$\text{Recall}_{0.80} = \frac{1}{1 + 1} = 0.50 \quad (50\%)$$

03. **Compare Results:**
    - Raising threshold $\tau$ from $0.50 \to 0.80$ eliminated false alarms, increasing Precision from $66.7\% \to 100\%$.
    - However, it caused a missed positive, dropping Recall from $100\% \to 50\%$.

**Answer:**  
Raising threshold $\tau$ boosts Precision ($66.7\% \to 100\%$) but sacrifices Recall ($100\% \to 50\%$).

## 7. COMMON MISTAKES

❌ **MISTAKE:** Optimizing Accuracy on heavily imbalanced datasets (e.g., $99.9\%$ non-fraud data).  
✅ **FIX:** Use **F1-Score**, **Precision-Recall AUC (PR-AUC)**, or set cost matrix penalties.  
**WHY:** Accuracy rewards classifiers for trivially guessing the majority class, masking complete failure on the minority class of interest.

❌ **MISTAKE:** Relying on ROC-AUC when evaluating datasets with massive negative class imbalance.  
✅ **FIX:** Use **Precision-Recall Curves (PR-AUC)** instead of ROC-AUC for severe class imbalance.  
**WHY:** In massive negative datasets, a large number of True Negatives inflates the denominator of $\text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}$, making ROC-AUC look deceptively optimistic even when Precision is terrible.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Prioritize Precision:**
- False Positives carry high cost or penalty (e.g., spam filter blocking crucial business emails, automated content moderation deleting valid posts).

**When to Prioritize Recall:**
- False Negatives are dangerous or fatal (e.g., cancer detection screening, structural failure prediction, security breach detection).

**When to Use ROC-AUC vs PR-AUC:**
- Use **ROC-AUC** when classes are reasonably balanced and you want to measure ranking capability across thresholds.
- Use **PR-AUC** when positive cases are extremely rare ($< 1\%$ positive rate).

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Classification Fundamentals:** Provides formal quantitative validation tools for decision boundaries.
- **Logistic Regression:** Evaluates predicted probability outputs $\hat{p} = \sigma(z)$.

**Enables:**
- **Threshold Tuning:** Selecting optimal operational cutoff $\tau$ based on business cost functions.
- **Cost-Sensitive Learning:** Incorporating financial penalties directly into model selection.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** Hospital Patient Sepsis Early Warning System  
An ICU deploys an ML model to flag patients developing life-threatening sepsis ($y=1$).

**Implementation Workflow:**
1. **Clinical Goal:** Sepsis moves fast; missing a septic patient (False Negative) leads to organ failure and death.
2. **Metric Selection:** The hospital prioritizes **Recall** over Precision.
3. **Threshold Tuning:**
   - Standard threshold $\tau = 0.50$ achieves $\text{Precision} = 70\%$, but $\text{Recall} = 65\%$ (misses $35\%$ of septic patients).
   - Tuning threshold to $\tau = 0.20$ lowers $\text{Precision}$ to $40\%$, but pushes $\text{Recall}$ to $95\%$.
4. **Operational Deployment:**
   - Every time $\hat{p} \ge 0.20$, an alert triggers a nurse to perform a blood culture.
   - Nurses tolerate extra false alarms ($60\%$ false positive rate) because catching $95\%$ of true sepsis cases saves lives.
5. **Business Impact:** Reduces ICU sepsis mortality by $31\%$ across the hospital network.

## INTERVIEW QUESTION

**Difficulty:** Hard  
**Question:** *"Why is Precision-Recall AUC preferred over ROC-AUC when evaluating models on datasets with extreme class imbalance?"*

**Expected Answer:**  
ROC-AUC plots True Positive Rate ($\frac{\text{TP}}{\text{TP}+\text{FN}}$) against False Positive Rate ($\frac{\text{FP}}{\text{FP}+\text{TN}}$). On extremely imbalanced datasets with millions of negative samples, the number of True Negatives (TN) in the denominator of FPR is huge. Consequently, even if a model generates thousands of False Positives, FPR remains near zero, producing a deceptively high ROC-AUC score (e.g., $0.95$). In contrast, Precision-Recall curves replace FPR with Precision ($\frac{\text{TP}}{\text{TP}+\text{FP}}$), which directly compares True Positives against False Positives without being masked by large TN counts.

## KEY TAKEAWAYS

- **Confusion Matrix:** Tracks TP, TN, FP (False Alarm), and FN (Missed Case).
- **Precision:** $\frac{\text{TP}}{\text{TP} + \text{FP}}$ (Avoids false alarms).
- **Recall:** $\frac{\text{TP}}{\text{TP} + \text{FN}}$ (Avoids missed cases).
- **F1-Score:** Harmonic mean balancing Precision and Recall.
- **ROC-AUC / PR-AUC:** Measures ranking quality across all decision thresholds.
