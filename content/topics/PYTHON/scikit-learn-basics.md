# Scikit-learn Basics

**TOPIC:** Scikit-learn Basics  
**PREREQUISITE TOPICS:** Python Object-Oriented Programming, NumPy, Pandas, Basic ML Principles  
**LEARNING OUTCOMES:** Understand the unified Estimator API architecture (`fit`, `transform`, `predict`, `fit_transform`), train-test splitting protocols, hyperparameter instantiation vs parameter learning, state inspection using trailing underscore conventions (`_`), and model serialization.

---

## 1. CORE CONCEPT

**Scikit-learn** (`sklearn`) is the flagship Machine Learning library in Python for classical statistical modeling. The centerpiece of Scikit-learn's architecture is its **Unified Estimator API**, built around object-oriented design principles consistency, inspection, and composition.

Every machine learning algorithm or data transformer in Scikit-learn implements a standard interface:
- **Estimators (`fit`):** Learn parameters from training data $\mathbf{X}$ (and optionally targets $\mathbf{y}$). Learned state parameters are stored directly on the object with trailing underscores (e.g., `model.coef_`, `scaler.mean_`).
- **Transformers (`transform` / `fit_transform`):** Modify input data $\mathbf{X}$ based on learned parameters (e.g., scaling features, imputing missing values, encoding categories).
- **Predictors (`predict` / `predict_proba`):** Make predictions on new feature data $\mathbf{X}_{\text{new}}$ using fitted parameters.

The key insight: Scikit-learn enforces a strict stateful contract across all algorithms—separating hyperparameter configuration at object creation from learned parameter storage during `fit()`.

---

## 2. THE PROBLEM IT SOLVES

Before Scikit-learn, different machine learning libraries in Python used disjointed interfaces. One library might require `model.train(X, y)`, another `model.fit_model(y, X)`, and a third `transformer.apply(X)`. Rebuilding ML pipelines or swapping algorithms required rewriting large chunks of glue code.

Scikit-learn solves interface fragmentation through an open, unified API contract:
```python
# Swapping algorithms is seamless thanks to identical Estimator APIs:
model = Ridge(alpha=1.0)          # Model 1
# model = RandomForestRegressor() # Model 2 - Zero structural code changes!

model.fit(X_train, y_train)
predictions = model.predict(X_test)
```
Because every model implements `.fit()` and `.predict()`, algorithms can be seamlessly interchanged, evaluated, and chained into complex production pipelines.

---

## 3. FORMAL DEFINITION & NOTATION

### 1. Estimator State Lifecycle
Let $\mathcal{H}$ denote the hyperparameter configuration set specified at instantiation, $\mathcal{D}_{\text{train}} = (\mathbf{X}, \mathbf{y})$ denote the training dataset, and $\theta$ denote learned state parameters.

$$\text{Instantiation: } E = \text{Estimator}(\mathcal{H}) \quad \implies \quad \theta = \emptyset$$

$$\text{Fitting: } E.\text{fit}(\mathbf{X}, \mathbf{y}) \quad \implies \quad \theta^* = \arg\min_\theta \mathcal{L}(\theta; \mathbf{X}, \mathbf{y}, \mathcal{H})$$

$$\text{Inference: } \hat{\mathbf{y}}_{\text{test}} = E.\text{predict}(\mathbf{X}_{\text{test}}) = f_{\theta^*}(\mathbf{X}_{\text{test}})$$

### 2. Parameter Convention
- **Hyperparameters:** Parameters set *before* training (passed as arguments to `__init__`, e.g., `n_estimators=100`, `C=1.0`).
- **Learned Parameters:** Parameters estimated *during* training (appended with `_`, e.g., `coef_`, `intercept_`, `classes_`).

| Method | Role | Data Inputs | Output |
|---|---|---|---|
| `fit(X, y)` | Learns model parameters $\theta^*$ | $X \in \mathbb{R}^{n \times p}, y \in \mathbb{R}^n$ | Returns `self` |
| `transform(X)` | Applies transformation using $\theta^*$ | $X \in \mathbb{R}^{m \times p}$ | Transformed $X' \in \mathbb{R}^{m \times p'}$ |
| `fit_transform(X, y)`| Fits transformer AND transforms $X$ | $X \in \mathbb{R}^{n \times p}$ | Transformed $X' \in \mathbb{R}^{n \times p'}$ |
| `predict(X)` | Generates target predictions | $X \in \mathbb{R}^{m \times p}$ | Predictions $\hat{y} \in \mathbb{R}^m$ |
| `score(X, y)` | Evaluates default model performance | $X \in \mathbb{R}^{m \times p}, y \in \mathbb{R}^m$ | Scalar accuracy or $R^2$ score |

---

## 4. INTUITION & ESTIMATOR LIFECYCLE

### Stage 1: Instantiation (Configuration Phase)
- **Action:** Call constructor, e.g., `scaler = StandardScaler(with_mean=True)`
- **Internal State:** $\theta = \emptyset$ (No learned parameters yet)
- **Key Property:** Hyperparameters set at instantiation dictate algorithm behavior during fitting.

### Stage 2: Fitting (Learning Phase)
- **Action:** Execute `scaler.fit(X_train)`
- **Internal State:** Computes sample statistics $\mu = \text{mean}(X_{\text{train}})$ and $\sigma = \text{std}(X_{\text{train}})$.
- **Key Property:** Learned attributes are written directly to instance parameters ending with an underscore (`scaler.mean_`, `scaler.scale_`).

### Stage 3: Transformation / Inference (Application Phase)
- **Action:** Execute `X_test_scaled = scaler.transform(X_test)`
- **Internal State:** Applies the transformation formula $(X_{\text{test}} - \mu) / \sigma$ using saved attributes.
- **Key Property:** Reuses learned attributes from training set exclusively, preventing data leakage.

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Using Scikit-learn's `StandardScaler`, calculate the learned mean ($\mu$) and standard deviation ($\sigma$) from a 1D training dataset $X_{\text{train}} = [[2.0], [4.0], [6.0]]$, then transform a test dataset $X_{\text{test}} = [[8.0]]$.

**Given:**
- $X_{\text{train}} = [2.0, 4.0, 6.0]^T$
- $X_{\text{test}} = [8.0]^T$

**Step-by-Step Solution:**

01. **Execute `.fit(X_train)` to Learn Parameters:**
    $$\mu = \text{scaler.mean\_} = \frac{2.0 + 4.0 + 6.0}{3} = \frac{12.0}{3} = 4.0$$
    $$\sigma^2 = \text{scaler.var\_} = \frac{(2-4)^2 + (4-4)^2 + (6-4)^2}{3} = \frac{4 + 0 + 4}{3} = \frac{8}{3} \approx 2.6667$$
    $$\sigma = \text{scaler.scale\_} = \sqrt{2.6667} \approx 1.6330$$

02. **Execute `.transform(X_test)` on Test Point $x = 8.0$:**
    $$x_{\text{scaled}} = \frac{x - \mu}{\sigma} = \frac{8.0 - 4.0}{1.6330} = \frac{4.0}{1.6330} \approx 2.4495$$

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Build a complete end-to-end Machine Learning workflow: split a dataset into train and test sets, fit a Logistic Regression model, inspect learned attributes, generate predictions, and score performance.

```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# 1. Generate synthetic binary classification dataset
X, y = make_classification(n_samples=200, n_features=4, random_state=42)

# 2. Split data into 80% Training / 20% Testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# 3. Instantiate Estimator with hyperparameters
clf = LogisticRegression(C=1.0, solver='lbfgs')

# 4. Fit Estimator on Training Data
clf.fit(X_train, y_train)

# 5. Inspect Learned Parameters (trailing underscore)
print("Learned Weights (coef_):", np.round(clf.coef_, 4))
print("Learned Intercept (intercept_):", np.round(clf.intercept_, 4))
print("Classes learned:", clf.classes_)

# 6. Predict on Test Set
y_pred = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)[:3]  # Probabilities for first 3 test samples

# 7. Evaluate Accuracy
acc = accuracy_score(y_test, y_pred)
print(f"\nTest Set Accuracy: {acc:.4f}")
```

---

## 7. CORNER CASES & FAILURES

### 1. Data Leakage via `fit_transform` on Test Set
Calling `.fit_transform()` on test data recalculates scaling/imputation parameters using test set statistics, corrupting model evaluation with future information.
```python
# WRONG (Data Leakage!):
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.fit_transform(X_test)  # NEVER call .fit() on test data!

# CORRECT:
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)       # Reuses mean/var learned from X_train
```

### 2. Accessing Unfitted Parameters
Attempting to read parameters with a trailing underscore before calling `.fit()` raises a `NotFittedError`.
```python
model = LogisticRegression()
# print(model.coef_) -> NotFittedError: This LogisticRegression instance is not fitted yet.
```

---

## 8. SUMMARY & CHEAT SHEET

| Operation | Scikit-learn Code | Key Rule |
|---|---|---|
| Split Dataset | `train_test_split(X, y, test_size=0.2, stratify=y)` | Always stratify classification targets |
| Fit Model | `estimator.fit(X_train, y_train)` | Learns state stored in `_` attributes |
| Predict Classes | `estimator.predict(X_test)` | Returns predicted class labels array |
| Predict Probabilities | `estimator.predict_proba(X_test)` | Returns shape `(n_samples, n_classes)` |
| Transform Features | `transformer.transform(X_test)` | Uses state learned exclusively from train |
| Save Model | `joblib.dump(clf, 'model.joblib')` | Serializes fitted estimator to disk |
