# Entropy and Information Gain

**TOPIC:** Entropy and Information Gain  
**PREREQUISITE TOPICS:** Decision Tree Fundamentals, Logarithmic Functions, Basic Probability  
**LEARNING OUTCOMES:** Define Shannon Entropy, calculate dataset impurity, compute Information Gain for candidate splits, and explain how the ID3 algorithm selects optimal features.

## 1. CORE CONCEPT

In decision tree algorithms (specifically ID3 and C4.5), **Entropy** and **Information Gain** are mathematical metrics used to evaluate dataset impurity and determine the single best feature split at each node.

**Entropy** originates from Information Theory (Claude Shannon) and measures the degree of disorder, randomness, or impurity in a group of samples:
- **Maximum Entropy ($H = 1.0$ bit):** The dataset is completely mixed and uncertain ($50\%$ Class A, $50\%$ Class B). Flipping a coin gives no predictable advantage.
- **Minimum Entropy ($H = 0.0$ bits):** The dataset is completely pure ($100\%$ Class A, $0\%$ Class B). There is zero uncertainty.

**Information Gain** measures the reduction in entropy achieved by partitioning a dataset according to a specific feature split. It answers the question: *"How much cleaner and more predictable do our child nodes become if we split the data using Feature A versus Feature B?"*

During tree construction, the algorithm evaluates all candidate feature splits, computes their Information Gain, and picks the split that yields the largest reduction in entropy.

The key insight: Information Gain quantifies how much uncertainty is eliminated after splitting a node on a feature.

## 2. THE PROBLEM IT SOLVES

Suppose you are building a decision tree to classify whether a customer will buy a product based on 20 available features (Age, Gender, Income, Region, Browser Type, etc.).

If you pick feature splits **randomly** or **arbitrarily**, the algorithm might split on unhelpful features like *Browser Type*, creating deep, bloated trees with hundreds of weak rules that fail to purify the target labels.

We need a rigorous mathematical metric to compare all candidate feature cuts objectively and rank which feature provides the most value *right now*.

Entropy and Information Gain solve this. By calculating the exact reduction in entropy for every feature cut, the algorithm greedily selects the most informative feature at every step, constructing the shortest, most efficient decision tree possible.

## 3. FORMAL DEFINITION & NOTATION

### Shannon Entropy $H(S)$
For a dataset $S$ containing $K$ target classes, where $p_k$ is the proportion of samples belonging to class $k$:

$$H(S) = -\sum_{k=1}^{K} p_k \log_2(p_k)$$

*(Note: By convention, if $p_k = 0$, then $0 \log_2(0) \equiv 0$).*

### Weighted Child Entropy $H(S, A)$
When dataset $S$ is split on feature $A$ into sub-datasets $S_v$ for each value $v \in \text{Values}(A)$:

$$H(S, A) = \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)$$

### Information Gain $\text{IG}(S, A)$
The difference between parent node entropy and the weighted average entropy of child nodes:

$$\text{IG}(S, A) = H(S) - H(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)$$

| Symbol | Meaning | Value Range |
|---|---|---|
| $H(S)$ | Parent dataset entropy | $[0.0, \log_2(K)]$ bits |
| $p_k$ | Class proportion ratio | $[0.0, 1.0]$ |
| $|S_v| / |S|$ | Weight fraction of child node $v$ | $[0.0, 1.0]$ |
| $\text{IG}(S, A)$ | Information Gain score for feature $A$ | $[0.0, H(S)]$ bits |

## 4. INTUITION WITH VISUALS

Picture two glass jars filled with 10 marbles each:

- **Jar 1 (Pure - Zero Entropy):**  
  Contains 10 Red marbles and 0 Blue marbles. If you reach in blindfolded, you are $100\%$ certain to draw a Red marble. Uncertainty is zero ($H = 0.0$ bits).

- **Jar 2 (Impure - Maximum Entropy):**  
  Contains 5 Red marbles and 5 Blue marbles. If you reach in blindfolded, your guess is completely uncertain. Impurity is at its peak ($H = 1.0$ bit).

Now imagine a parent node structured like Jar 2 (5 Red, 5 Blue).

If Feature $A$ splits Jar 2 into two child jars:
- Left Child Jar: 5 Red marbles, 0 Blue marbles ($H = 0.0$)
- Right Child Jar: 0 Red marbles, 5 Blue marbles ($H = 0.0$)

The weighted child entropy drops from $1.0 \to 0.0$. The resulting **Information Gain** is $1.0 - 0.0 = 1.0$ bit—a perfect feature split that completely eliminates disorder.

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Calculate the baseline Shannon Entropy $H(S)$ for a parent dataset $S$ containing $n=4$ total samples: 2 Positive ($+$) and 2 Negative ($-$).

**Given:**  
- Dataset $S$: $2$ Positive, $2$ Negative ($n = 4$)
- Class proportions: $p_+ = \frac{2}{4} = 0.50$, $p_- = \frac{2}{4} = 0.50$
- Logarithm values: $\log_2(0.50) = -1.0$

**Solution steps:**

01. **Write out the binary Shannon Entropy formula:**
    $$H(S) = - \left[ p_+ \log_2(p_+) + p_- \log_2(p_-) \right]$$

02. **Substitute class proportions into the equation:**
    $$H(S) = - \left[ 0.50 \cdot \log_2(0.50) + 0.50 \cdot \log_2(0.50) \right]$$

03. **Evaluate the logarithmic terms:**
    $$0.50 \cdot \log_2(0.50) = 0.50 \cdot (-1.0) = -0.50$$

04. **Sum the terms inside brackets:**
    $$H(S) = - \left[ (-0.50) + (-0.50) \right] = - [-1.0] = +1.0\text{ bit}$$

05. **Interpret the score:**  
    An entropy score of $1.0$ bit is the theoretical maximum for binary classification, representing maximum disorder (an equal $50/50$ split).

**Answer:**  
The baseline parent entropy is $H(S) = 1.0\text{ bit}$.

## 6. WORKED EXAMPLE 2: Common Variation

**Problem:**  
Calculate Information Gain $\text{IG}(S, A)$ for a candidate split on Feature $A$ that partitions the parent set $S$ ($n=4$, $H(S)=1.0$) into two equal child nodes.

**Given:**  
- Parent dataset $S$: 2 Positive ($+$), 2 Negative ($-$) $\implies H(S) = 1.0\text{ bit}$
- **Left Child Node ($S_{\text{Left}}$):** 2 Positive, 0 Negative ($n_{\text{left}} = 2$)
- **Right Child Node ($S_{\text{Right}}$):** 0 Positive, 2 Negative ($n_{\text{right}} = 2$)

**Solution steps:**

01. **Calculate Entropy for Left Child ($S_{\text{Left}}$):**
    - Class ratios: $p_+ = \frac{2}{2} = 1.0$, $p_- = \frac{0}{2} = 0.0$
    - $H(S_{\text{Left}}) = - \left[ 1.0 \log_2(1.0) + 0 \right] = - [0 + 0] = 0.0\text{ bits}$

02. **Calculate Entropy for Right Child ($S_{\text{Right}}$):**
    - Class ratios: $p_+ = \frac{0}{2} = 0.0$, $p_- = \frac{2}{2} = 1.0$
    - $H(S_{\text{Right}}) = - \left[ 0 + 1.0 \log_2(1.0) \right] = - [0 + 0] = 0.0\text{ bits}$

03. **Calculate Weighted Child Entropy $H(S, A)$:**
    $$H(S, A) = \left(\frac{n_{\text{left}}}{|S|} \cdot H(S_{\text{Left}})\right) + \left(\frac{n_{\text{right}}}{|S|} \cdot H(S_{\text{Right}})\right)$$
    $$H(S, A) = \left(\frac{2}{4} \cdot 0.0\right) + \left(\frac{2}{4} \cdot 0.0\right) = 0.0 + 0.0 = 0.0\text{ bits}$$

04. **Compute Information Gain $\text{IG}(S, A)$:**
    $$\text{IG}(S, A) = H(S) - H(S, A) = 1.0 - 0.0 = 1.0\text{ bit}$$

05. **Conclusion:**  
    Feature $A$ achieves the maximum possible Information Gain ($1.0$ bit), completely purifying the node in a single split.

**Answer:**  
Information Gain $\text{IG}(S, A) = 1.0\text{ bit}$.

## 7. COMMON MISTAKES

❌ **MISTAKE:** Using raw Information Gain on high-cardinality features like `Transaction_ID`, `Social Security Number`, or `Timestamp`.  
✅ **FIX:** Use **Gain Ratio** (C4.5 algorithm) which penalizes features with large numbers of distinct values: $\text{Gain Ratio} = \frac{\text{IG}}{\text{SplitInfo}}$.  
**WHY:** A unique ID feature creates 1-sample pure leaf nodes for every instance, producing maximum Information Gain ($\text{IG} = 1.0$) despite having zero predictive value for new data.

❌ **MISTAKE:** Confusing base-2 logarithm ($\log_2$) with natural logarithm ($\ln$).  
✅ **FIX:** Use $\log_2$ when expressing entropy in **bits**, or $\ln$ when expressing entropy in **nats**.  
**WHY:** While relative feature rankings remain identical, standard Information Theory metrics are defined in bits using $\log_2$.

## 8. WHEN TO USE (vs. When NOT to Use)

**When to Use:**
- Building decision trees using the ID3 or C4.5 algorithms.
- Performing standalone **Feature Selection** (ranking and filtering top $K$ informative features before model training).
- Analyzing information-theoretic uncertainty in datasets.

**When NOT to Use:**
- High-speed production settings where computing $\log_2$ operations across thousands of features slows down training.
- CART decision tree implementations, which prefer **Gini Impurity** due to faster computational arithmetic.

**The Boundary:**  
If theoretical information gain measurement or C4.5 tree building is required, use **Entropy**. If training speed for large-scale trees (scikit-learn CART default) is priority, use **Gini Impurity**.

## 9. CONNECTIONS TO OTHER TOPICS

**Builds on:**
- **Decision Tree Fundamentals:** Serves as the mathematical splitting engine for tree nodes.
- **Logarithmic Functions:** Uses $\log_2(p_k)$ to measure information bits.

**Enables:**
- **Gini Impurity & Best Split:** Alternative, computationally faster impurity metric.
- **Mutual Information Feature Selection:** Generalizes Information Gain to select features for non-tree ML models.

## 10. REAL-WORLD APPLICATION

**Industry Use Case:** High-Dimensional Gene Expression Feature Selection  
A bioinformatics lab screens 20,000 candidate genes to identify biomarkers for cancer classification.

**Implementation Workflow:**
1. **Challenge:** Training a model directly on 20,000 features with only 200 patient samples causes severe overfitting.
2. **Feature Ranking:** Compute Information Gain $\text{IG}(S, G_i)$ for all 20,000 individual genes relative to the target diagnosis ($0=\text{Healthy}, 1=\text{Tumor}$).
3. **Filtering:**
   - 19,500 genes exhibit $\text{IG} \approx 0.001\text{ bits}$ (uncorrelated noise).
   - Top 50 genes exhibit high $\text{IG} \ge 0.45\text{ bits}$.
4. **Model Training:** Drop the 19,500 uninformative genes and train a classifier exclusively on the top 50 high-IG genes.
5. **Business Impact:** Reduces feature dimensionality by $99.75\%$, speeding up training time from 2 hours to 3 seconds while boosting test accuracy from $71\%$ to $96\%$.

## INTERVIEW QUESTION

**Difficulty:** Medium  
**Question:** *"Why does raw Information Gain favor high-cardinality features like Customer ID, and how does Gain Ratio correct this bias?"*

**Expected Answer:**  
Raw Information Gain measures the reduction in entropy: $\text{IG} = H(S) - \sum \frac{|S_v|}{|S|} H(S_v)$. If a feature has unique values for every sample (like Customer ID), it splits the dataset into $N$ tiny child nodes containing 1 sample each. Because a 1-sample node has zero entropy ($H=0$), weighted child entropy becomes 0, yielding maximum Information Gain. However, this split has no predictive power. **Gain Ratio** corrects this by dividing Information Gain by **Split Information** ($H_A(S) = -\sum \frac{|S_v|}{|S|} \log_2 \frac{|S_v|}{|S|}$), which measures the intrinsic entropy of the feature split itself. High-cardinality features generate huge Split Info denominators, heavily penalizing their Gain Ratio score.

## KEY TAKEAWAYS

- **Entropy $H(S)$:** Measures dataset disorder; $0.0$ is pure, $1.0$ is maximum $50/50$ mixed.
- **Information Gain:** $\text{IG} = H_{\text{parent}} - H_{\text{children}}$.
- Measures reduction in uncertainty after a feature split.
- ID3 algorithm selects feature splits that maximize Information Gain.
- Use Gain Ratio to prevent high-cardinality feature bias.
