# Seaborn Statistical Plots

**TOPIC:** Seaborn Statistical Plots  
**PREREQUISITE TOPICS:** Python Basics, Pandas DataFrames, Matplotlib Visualization  
**LEARNING OUTCOMES:** Understand high-level statistical plotting abstractions (`relplot`, `displot`, `catplot`), master distribution plots (`histplot`, `kdeplot`), categorical visualizers (`boxplot`, `violinplot`), matrix plots (`heatmap`, `clustermap`), long-form vs wide-form data structures, and Matplotlib integration.

---

## 1. CORE CONCEPT

**Seaborn** is a high-level statistical visualization library built on top of Matplotlib, designed to integrate seamlessly with Pandas `DataFrames`. 

While Matplotlib requires writing multi-line loops to group data by categories or calculate confidence intervals, Seaborn operates directly on DataFrame columns. It automatically performs statistical estimation (such as mean estimation, bootstrapped confidence intervals, kernel density calculations) and semantic mapping (mapping variables to `hue`, `style`, `col`, and `row` axes).

Seaborn features two tiers of functions:
1. **Axes-level functions (`sns.histplot`, `sns.boxplot`, `sns.scatterplot`):** Plot directly onto a specified pre-existing Matplotlib `Axes` object.
2. **Figure-level functions (`sns.displot`, `sns.catplot`, `sns.relplot`):** Manage their own multi-panel `FacetGrid` figures automatically, allowing easy grid conditioning across categories.

The key insight: Seaborn transforms raw tabular DataFrames into statistical visualizations by automating statistical aggregations and semantic encoding across colors and facets.

---

## 2. THE PROBLEM IT SOLVES

Suppose you have a dataset of customer purchases containing `income`, `spend`, `gender`, and `membership_tier`. You want to compare the distribution of `spend` across `membership_tier`, split by `gender`.

In **Matplotlib**, you must manually slice the DataFrame for every category combination, loop over subplots, compute box coordinates, and assign colors:
```python
# Matplotlib manual grouping (complex & verbose):
tiers = df['membership_tier'].unique()
genders = df['gender'].unique()
for i, tier in enumerate(tiers):
    for gender in genders:
        subset = df[(df['membership_tier'] == tier) & (df['gender'] == gender)]
        # calculate positions, plot manual boxplots...
```

In **Seaborn**, the entire multi-variable comparison requires a single line:
```python
# Seaborn semantic mapping:
sns.boxplot(data=df, x='membership_tier', y='spend', hue='gender')
```
Seaborn automatically groups data by `x`, splits categories by `hue`, applies distinct palette colors, and renders a clean legend.

---

## 3. FORMAL DEFINITION & NOTATION

### 1. Kernel Density Estimation (KDE) Formulation
For a univariate sample $x_1, x_2, \dots, x_n$ drawn from an unknown probability density function $f$, the Kernel Density Estimator $\hat{f}_h(x)$ plotted by `sns.kdeplot` is:

$$\hat{f}_h(x) = \frac{1}{n h} \sum_{i=1}^{n} K\left( \frac{x - x_i}{h} \right)$$

Where $K(\cdot)$ is a standard Gaussian kernel $K(u) = \frac{1}{\sqrt{2\pi}} e^{-\frac{1}{2} u^2}$, and $h > 0$ is the smoothing bandwidth parameter.

### 2. Long-Form vs Wide-Form Data
- **Long-Form Data (Tidy):** Each variable is a column; each observation is a row. Seaborn is optimized for long-form data.
- **Wide-Form Data:** Variables are spread across column headers.

| Seaborn Function | Type | Supported Data | Purpose |
|---|---|---|---|
| `sns.scatterplot()`, `sns.lineplot()` | Axes-level | Long/Wide | Relational point/line plots |
| `sns.histplot()`, `sns.kdeplot()` | Axes-level | Long/Wide | Univariate & bivariate distributions |
| `sns.boxplot()`, `sns.violinplot()` | Axes-level | Long/Wide | Categorical distribution summaries |
| `sns.heatmap()` | Axes-level | Wide (Matrix) | 2D rectangular matrix visualization |
| `sns.catplot()`, `sns.relplot()` | Figure-level | Long-form | Multi-panel FacetGrid wrappers |

---

## 4. INTUITION & FUNCTION TAXONOMY

### Figure-Level vs. Axes-Level Hierarchy

| High-Level Figure Function (FacetGrid) | Underlying Axes-Level Functions | Domain / Use Case |
|---|---|---|
| **`sns.relplot()`** | `scatterplot()`, `lineplot()` | Relational analysis across numerical variables |
| **`sns.displot()`** | `histplot()`, `kdeplot()`, `ecdfplot()` | Distribution density & frequency estimation |
| **`sns.catplot()`** | `boxplot()`, `violinplot()`, `stripplot()`, `barplot()` | Categorical group comparisons |

- **Axes-Level Functions:** Draw directly onto a specific Matplotlib `Axes` object (`ax=ax`), making them ideal for custom subplot grids.
- **Figure-Level Functions:** Create and manage their own `FacetGrid` canvas, ideal for quick multi-panel facet conditioning (`col='category'`).

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Create a annotated correlation matrix heatmap showing pairwise feature correlations for a dataset using `sns.heatmap()`.

**Step-by-Step Solution:**

```python
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# 01. Create Synthetic DataFrame
np.random.seed(42)
data = pd.DataFrame({
    'Feature_A': np.random.normal(0, 1, 100),
    'Feature_B': np.random.normal(5, 2, 100),
    'Target': np.random.normal(10, 5, 100)
})
data['Feature_C'] = data['Feature_A'] * 0.8 + np.random.normal(0, 0.5, 100)

# 02. Compute Pairwise Pearson Correlation Matrix (Wide-Form)
corr_matrix = data.corr()

# 03. Plot Heatmap using Axes-level API
fig, ax = plt.subplots(figsize=(6, 5), dpi=100)
sns.heatmap(
    corr_matrix, 
    annot=True, 
    fmt=".2f", 
    cmap='coolwarm', 
    vmin=-1.0, 
    vmax=1.0, 
    linewidths=0.5,
    ax=ax
)

ax.set_title("Pairwise Feature Correlation Matrix", pad=12)
plt.tight_layout()
plt.show()
```

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Build a complex statistical visualization analyzing model prediction errors across different data drift categories using violin plots and box plot overlays.

```python
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# 1. Create Synthetic Long-Form Dataset
np.random.seed(42)
n = 150
df = pd.DataFrame({
    'Drift_Level': np.repeat(['Low Drift', 'Medium Drift', 'High Drift'], n),
    'Model_Variant': np.tile(np.repeat(['Model_v1', 'Model_v2'], n // 2), 3),
    'Absolute_Error': np.concatenate([
        np.random.gamma(shape=2, scale=1.0, size=n),      # Low Drift
        np.random.gamma(shape=3, scale=1.5, size=n),      # Medium Drift
        np.random.gamma(shape=5, scale=2.5, size=n)       # High Drift
    ])
})

# 2. Set Theme Style
sns.set_theme(style="whitegrid", palette="muted")

# 3. Create Multi-Variable Split Violin Plot
fig, ax = plt.subplots(figsize=(10, 6), dpi=100)

sns.violinplot(
    data=df,
    x='Drift_Level',
    y='Absolute_Error',
    hue='Model_Variant',
    split=True,            # Split violin halves by hue!
    inner='quartile',       # Show quartiles inside violin
    palette={'Model_v1': '#4c72b0', 'Model_v2': '#dd8452'},
    ax=ax
)

# 4. Customize Labels and Title
ax.set_title("Model Prediction Error Distribution Under Data Drift", fontsize=14, fontweight='bold', pad=12)
ax.set_xlabel("Data Drift Severity Group", fontsize=11)
ax.set_ylabel("Absolute Error (|y_true - y_pred|)", fontsize=11)
ax.legend(title="Model Variant", loc='upper left')

plt.tight_layout()
plt.show()
```

---

## 7. CORNER CASES & FAILURES

### 1. Figure-Level vs Axes-Level Subplot Passing
Passing an `ax=` parameter to a **figure-level** function like `sns.catplot()` or `sns.displot()` raises a `TypeError`.
```python
fig, ax = plt.subplots()
# WRONG: sns.catplot(data=df, x='A', y='B', ax=ax) -> TypeError: unexpected keyword argument 'ax'
# CORRECT (Axes-level): sns.boxplot(data=df, x='A', y='B', ax=ax)
```

### 2. KDE Bandwidth Oversmoothing
When data contains sharp spikes or multi-modal distributions, default KDE bandwidth smoothing can obscure true density peaks or extend density curves into impossible negative regions (e.g., negative age or negative price).
```python
# Fix: Adjust bw_adjust or set cut=0
sns.kdeplot(data=df, x='price', bw_adjust=0.5, cut=0)
```

---

## 8. SUMMARY & CHEAT SHEET

| Plot Type | Seaborn Command | Common Parameters |
|---|---|---|
| Scatter Plot | `sns.scatterplot(data=df, x='X', y='Y', hue='Cat', style='Cat2')` | `hue`, `style`, `size`, `alpha` |
| Histogram + KDE | `sns.histplot(data=df, x='X', kde=True, bins=30)` | `kde=True`, `element='step'`, `stat` |
| Box Plot | `sns.boxplot(data=df, x='Group', y='Val', hue='SubGroup')` | `hue`, `notch=True`, `palette` |
| Violin Plot | `sns.violinplot(data=df, x='Group', y='Val', split=True)` | `split=True`, `inner='quartile'` |
| Heatmap | `sns.heatmap(df.corr(), annot=True, cmap='vlag')` | `annot`, `fmt`, `vmin`, `vmax`, `cmap` |
| Multi-Panel Grid | `sns.catplot(data=df, x='X', y='Y', col='FacetVar', kind='box')` | `col`, `row`, `kind='strip/box/bar'` |
