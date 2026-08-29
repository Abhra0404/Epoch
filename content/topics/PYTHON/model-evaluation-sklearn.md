# Model Evaluation with Scikit-learn

**TOPIC:** Model Evaluation with Scikit-learn  
**PREREQUISITE TOPICS:** Scikit-learn Basics, Feature Engineering  
**LEARNING OUTCOMES:** Master cross-validation strategies (`KFold`, `StratifiedKFold`, `TimeSeriesSplit`), hyperparameter optimization (`GridSearchCV`, `RandomizedSearchCV`), scoring metric selection (Accuracy, Precision, Recall, $F_1$, ROC-AUC, $R^2$, RMSE), confusion matrix analysis, and validation curve diagnostics.

---

## 1. CORE CONCEPT

**Model Evaluation** determines how accurately a trained machine learning model generalizes to unseen data. Proper evaluation protects against two primary modeling traps: **underfitting** (high bias) and **overfitting** (high variance).

Scikit-learn structures model evaluation into three core pillars:
1. **Cross-Validation (`cross_val_score`, `StratifiedKFold`):** Partitions data into $K$ non-overlapping folds to compute stable, out-of-fold generalization performance estimates.
2. **Hyperparameter Tuning (`GridSearchCV`, `RandomizedSearchCV`):** Systematically searches hyperparameter spaces to optimize out-of-fold cross-validation scores.
3. **Scoring Metrics (`sklearn.metrics`):** Quantifies performance using domain-appropriate loss functions (e.g., ROC-AUC for imbalanced classification, Mean Squared Error for regression).

The key insight: Never evaluate models on a single random train-test split or raw Accuracy alone; use Stratified K-Fold Cross-Validation combined with task-appropriate metrics like ROC-AUC or $F_1$ score.

---

## 2. THE PROBLEM IT SOLVES

Suppose you train a Fraud Detection model on a dataset where **99% of transactions are legitimate** and **1% are fraudulent**. 

If you evaluate your model using naive **Accuracy**:
```python
# A dummy predictor that ALWAYS predicts "Legitimate" (0):
y_pred = np.zeros(len(y_test))
acc = accuracy_score(y_test, y_pred) # Output: 99.0% Accuracy!
```
The dummy model achieves a deceptively high score of 99%, yet fails to catch a single fraudulent transaction ($0\%$ Recall).

Scikit-learn metrics solve class imbalance evaluation traps by providing precise diagnostic tools:
```python
# Evaluate using Precision, Recall, F1-Score, and Confusion Matrix:
print(classification_report(y_test, y_pred))
# Precision: 0.0, Recall: 0.0, F1-Score: 0.0 -> Instantly reveals failure!
```

---

## 3. FORMAL DEFINITION & NOTATION

### 1. Confusion Matrix Metrics
Given True Positives ($TP$), False Positives ($FP$), True Negatives ($TN$), and False Negatives ($FN$):

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$

$$\text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall (Sensitivity)} = \frac{TP}{TP + FN}$$

$$F_1 \text{ Score} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2 TP}{2 TP + FP + FN}$$

### 2. K-Fold Cross-Validation Formulation
For a dataset $\mathcal{D}$ partitioned into $K$ disjoint subsets $\mathcal{D}_1, \dots, \mathcal{D}_K$, the $K$-Fold cross-validation estimate $\hat{R}_{\text{CV}}$ is:

$$\hat{R}_{\text{CV}} = \frac{1}{K} \sum_{k=1}^{K} \mathcal{L}\left( f_{\theta^{(-k)}}, \mathcal{D}_k \right)$$

Where $\theta^{(-k)}$ represents model parameters trained on all folds *except* fold $k$.

| CV Strategy | Class Name | Best Used For |
|---|---|---|
| K-Fold | `KFold(n_splits=5, shuffle=True)` | Balanced regression / continuous targets |
| Stratified K-Fold | `StratifiedKFold(n_splits=5)` | Imbalanced classification (preserves class ratios) |
| Time-Series Split | `TimeSeriesSplit(n_splits=5)` | Temporal sequential data (prevents future leakage) |
| Grid Search CV | `GridSearchCV(estimator, param_grid)` | Exhaustive search over discrete hyperparameter grid |
| Random Search CV | `RandomizedSearchCV(estimator, param_distributions)` | Efficient search over continuous distributions |

---

## 4. INTUITION & CROSS-VALIDATION COMPARISON

### Cross-Validation Split Architectures

| Iteration | Stratified K-Fold (Random Shuffled) | Time-Series Split (Expanding Window) |
|---|---|---|
| **Fold 1** | Train: `[2, 3, 4, 5]`, Validation: `[1]` | Train: `[1]`, Validation: `[2]` |
| **Fold 2** | Train: `[1, 3, 4, 5]`, Validation: `[2]` | Train: `[1, 2]`, Validation: `[3]` |
| **Fold 3** | Train: `[1, 2, 4, 5]`, Validation: `[3]` | Train: `[1, 2, 3]`, Validation: `[4]` |
| **Fold 4** | Train: `[1, 2, 3, 5]`, Validation: `[4]` | Train: `[1, 2, 3, 4]`, Validation: `[5]` |

- **Stratified K-Fold:** Guarantees that each fold contains identical target class proportions as the full dataset.
- **Time-Series Split:** Prevents look-ahead data leakage by ensuring training data always precedes validation data temporally.

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Calculate the Confusion Matrix, Precision, Recall, and $F_1$ Score by hand for a binary classification test set with $N = 10$ samples.

**Given Data:**
- Actual Ground Truth ($y$): `[1, 1, 1, 1, 0, 0, 0, 0, 0, 0]`
- Model Predictions ($\hat{y}$): `[1, 1, 1, 0, 1, 0, 0, 0, 0, 0]`

**Step-by-Step Solution:**

01. **Construct Confusion Matrix Counts:**
    - True Positives ($TP$): Actual=1, Pred=1 $\implies 3$
    - False Negatives ($FN$): Actual=1, Pred=0 $\implies 1$
    - False Positives ($FP$): Actual=0, Pred=1 $\implies 1$
    - True Negatives ($TN$): Actual=0, Pred=0 $\implies 5$

02. **Compute Precision:**
    $$\text{Precision} = \frac{TP}{TP + FP} = \frac{3}{3 + 1} = \frac{3}{4} = 0.75 \quad (75\%)$$

03. **Compute Recall:**
    $$\text{Recall} = \frac{TP}{TP + FN} = \frac{3}{3 + 1} = \frac{3}{4} = 0.75 \quad (75\%)$$

04. **Compute $F_1$ Score:**
    $$F_1 = 2 \cdot \frac{0.75 \cdot 0.75}{0.75 + 0.75} = \frac{1.125}{1.50} = 0.75$$

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Perform an end-to-end hyperparameter optimization using `GridSearchCV` inside a preprocessing pipeline, evaluating cross-validated ROC-AUC on an imbalanced classification dataset.

```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix

# 1. Generate Imbalanced Dataset (90% Class 0, 10% Class 1)
X, y = make_classification(
    n_samples=500, n_features=8, weights=[0.90, 0.10], random_state=42
)

# 2. Split Holdout Test Set (20%)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# 3. Create Pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', RandomForestClassifier(random_state=42, class_weight='balanced'))
])

# 4. Define Hyperparameter Search Space
param_grid = {
    'clf__n_estimators': [50, 100],
    'clf__max_depth': [3, 5, None],
    'clf__min_samples_split': [2, 5]
}

# 5. Configure Stratified K-Fold CV Grid Search
cv_strategy = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

grid_search = GridSearchCV(
    estimator=pipe,
    param_grid=param_grid,
    scoring='roc_auc',      # Optimize for ROC-AUC!
    cv=cv_strategy,
    n_jobs=-1
)

# 6. Fit Grid Search on Training Data
grid_search.fit(X_train, y_train)

print(f"Best CV ROC-AUC Score: {grid_search.best_score_:.4f}")
print("Best Hyperparameters:", grid_search.best_params_)

# 7. Evaluate Best Model on Holdout Test Set
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)
y_proba = best_model.predict_proba(X_test)[:, 1]

test_roc_auc = roc_auc_score(y_test, y_proba)
print(f"\nHoldout Test Set ROC-AUC: {test_roc_auc:.4f}")
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
```

---

## 7. CORNER CASES & FAILURES

### 1. Standard K-Fold on Time Series Data
Using standard `KFold(shuffle=True)` on time-series dataset breaks temporal ordering, allowing the model to train on future observations to predict past events (Look-Ahead Leakage).
```python
# WRONG (Time-series data leakage):
cv = KFold(n_splits=5, shuffle=True)

# CORRECT:
from sklearn.model_selection import TimeSeriesSplit
cv = TimeSeriesSplit(n_splits=5)  # Expanding window split
```

### 2. Optimizing Accuracy on Imbalanced Data
Setting `scoring='accuracy'` in `GridSearchCV` on imbalanced datasets causes grid search to pick trivial models that classify everything as the majority class.
```python
# Fix: Always specify domain metrics for imbalanced classification
grid = GridSearchCV(model, param_grid, scoring='roc_auc')  # Or scoring='f1'
```

---

## 8. SUMMARY & CHEAT SHEET

| Task | Scikit-learn Code | Key Takeaway |
|---|---|---|
| Stratified Split | `StratifiedKFold(n_splits=5, shuffle=True)` | Preserves target class ratios per fold |
| Time-Series Split | `TimeSeriesSplit(n_splits=5)` | Strictly respects chronological ordering |
| Cross-Val Scoring | `cross_val_score(pipe, X, y, cv=5, scoring='roc_auc')` | Computes out-of-fold scores |
| Grid Search | `GridSearchCV(pipe, param_grid, scoring='f1', cv=5)` | Exhaustive grid search |
| Random Search | `RandomizedSearchCV(pipe, param_dist, n_iter=20)` | Fast continuous search |
| Metrics Report | `classification_report(y_true, y_pred)` | Precision, Recall, F1, Support |
