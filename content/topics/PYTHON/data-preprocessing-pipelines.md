# Data Preprocessing Pipelines

**TOPIC:** Data Preprocessing Pipelines  
**PREREQUISITE TOPICS:** Pandas Data Manipulation, Scikit-learn Basics  
**LEARNING OUTCOMES:** Master `Pipeline` and `ColumnTransformer` composition, implement numerical imputation (`SimpleImputer`), categorical encoding (`OneHotEncoder`, `OrdinalEncoder`), feature scaling (`StandardScaler`, `MinMaxScaler`), write custom transformers (`BaseEstimator`, `TransformerMixin`), and guarantee zero data leakage during cross-validation.

---

## 1. CORE CONCEPT

In practical machine learning, raw datasets consist of mixed data types (continuous numerical values, ordinal categories, nominal strings) with missing entries (`NaN`). Converting raw data into clean model-ready arrays requires chaining multiple sequential processing steps: missing value imputation, categorical encoding, non-linear scaling, and feature selection.

A **Preprocessing Pipeline** orchestrates these heterogeneous steps into a unified, stateful execution graph. 

Scikit-learn provides two foundational pipeline tools:
1. **`Pipeline`:** Chains sequential transformers where the output of step $k$ becomes the input to step $k+1$, ending in a final estimator.
2. **`ColumnTransformer`:** Enables parallel routing, applying dedicated transformer sub-pipelines to specific column subsets (e.g., numerical vs categorical columns) before concatenating results into a single feature matrix.

The key insight: Pipelines bundle preprocessing steps into a single atomic Estimator, guaranteeing that transformer parameters (means, standard deviations, category mappings) are computed exclusively on training data and seamlessly applied to test sets without data leakage.

---

## 2. THE PROBLEM IT SOLVES

Suppose you fit a `StandardScaler` and `SimpleImputer` on your raw dataset before running $K$-Fold Cross-Validation.

If you scale or impute missing values across the **entire dataset** prior to splitting into folds:
```python
# CRITICAL DATA LEAKAGE ERROR:
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X) # Computes mean/std over ALL samples including validation folds!

scores = cross_val_score(model, X_scaled, y, cv=5)
```
The mean and standard deviation computed during scaling contain global information from test/validation folds. This **data leakage** artificially inflates cross-validation performance, leading to severe model breakdown when deployed to real-world production data.

Scikit-learn `Pipeline` objects fix data leakage completely:
```python
# ZERO DATA LEAKAGE (Pipeline):
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])
# cross_val_score fits scaler ONLY on train folds for every iteration!
scores = cross_val_score(pipe, X, y, cv=5)
```

---

## 3. FORMAL DEFINITION & NOTATION

### 1. Sequential Pipeline Operator
Let $T_1, T_2, \dots, T_k$ be a sequence of $k$ transformers, and $E$ be an estimator. A `Pipeline` defines a composite function $P$:

$$\text{Training Phase: } P.\text{fit}(\mathbf{X}, \mathbf{y}):$$

$$\mathbf{X}^{(1)} = T_1.\text{fit\_transform}(\mathbf{X})$$

$$\mathbf{X}^{(2)} = T_2.\text{fit\_transform}(\mathbf{X}^{(1)})$$

$$\dots$$

$$E.\text{fit}(\mathbf{X}^{(k)}, \mathbf{y})$$

$$\text{Inference Phase: } P.\text{predict}(\mathbf{X}_{\text{new}}) = E.\text{predict}\left( T_k.\text{transform}(\dots T_1.\text{transform}(\mathbf{X}_{\text{new}})) \right)$$

### 2. ColumnTransformer Parallel Routing
Given column indices $C_{\text{num}}$ and $C_{\text{cat}}$:

$$\mathbf{X}_{\text{preprocessed}} = \left[ T_{\text{num}}(\mathbf{X}[:, C_{\text{num}}]) \ \Big\Vert \ T_{\text{cat}}(\mathbf{X}[:, C_{\text{cat}}]) \right]$$

Where $\Vert$ denotes horizontal matrix concatenation.

| Component | Class Name | Input Data | Output Data |
|---|---|---|---|
| Imputer | `SimpleImputer(strategy='median')` | Numerical / Categorical | Array without NaNs |
| Scaler | `StandardScaler()`, `RobustScaler()` | Numerical Features | Zero mean, unit variance |
| Categorical Encoder | `OneHotEncoder(handle_unknown='ignore')` | Categorical Strings | Binary One-Hot Matrix |
| Column Router | `ColumnTransformer(transformers=[...])` | Mixed DataFrame | Single Concatenated Array |
| Pipeline Wrapper | `Pipeline(steps=[...])` | Raw Features + Targets | Predictions or Transformed Data |

---

## 4. INTUITION & COLUMNTRANSFORMER ROUTING

### 1. Feature Ingestion Branching
Raw Input DataFrame $\mathbf{X}$ is split by data types:

| Feature Subset | Numerical Pipeline (`num_cols`) | Categorical Pipeline (`cat_cols`) |
|---|---|---|
| **Step 1: Imputation** | `SimpleImputer(strategy='median')` | `SimpleImputer(strategy='most_frequent')` |
| **Step 2: Transformation** | `StandardScaler()` | `OneHotEncoder(handle_unknown='ignore')` |
| **Output Branch** | Transformed Numerical Matrix $\mathbf{X}_{\text{num}} \in \mathbb{R}^{n \times p_1}$ | Encoded One-Hot Matrix $\mathbf{X}_{\text{cat}} \in \mathbb{R}^{n \times p_2}$ |

### 2. Concatenation & Estimator Fitting
- **Horizontal Merge:** $\mathbf{X}_{\text{prep}} = [\mathbf{X}_{\text{num}} \ \Vert \ \mathbf{X}_{\text{cat}}] \in \mathbb{R}^{n \times (p_1 + p_2)}$
- **Estimator Step:** Fits final estimator (e.g. `Ridge()`, `RandomForestClassifier()`) directly on $\mathbf{X}_{\text{prep}}$.

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Create a custom Transformer class `ClippingTransformer` inheriting from `BaseEstimator` and `TransformerMixin` that clips numerical features to lie strictly within a range $[v_{\min}, v_{\max}]$.

**Step-by-Step Solution:**

```python
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

class ClippingTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, v_min=0.0, v_max=1.0):
        self.v_min = v_min
        self.v_max = v_max
        
    def fit(self, X, y=None):
        # Stateless transformer - no learned attributes required
        return self
        
    def transform(self, X):
        X_array = np.asarray(X)
        return np.clip(X_array, self.v_min, self.v_max)

# Test Custom Transformer
raw_data = np.array([[-5.0, 0.5], [0.8, 12.0], [0.2, 0.4]])
clipper = ClippingTransformer(v_min=0.0, v_max=1.0)
clipped_data = clipper.fit_transform(raw_data)

print("Clipped Output Matrix:\n", clipped_data)
# Output:
# [[0.  0.5]
#  [0.8 1. ]
#  [0.2 0.4]]
```

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Construct a multi-branch `ColumnTransformer` preprocessing pipeline handling numerical imputation/scaling and categorical one-hot encoding on a raw pandas DataFrame, followed by a Ridge Regression model.

```python
import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split

# 1. Generate Synthetic Raw Dataset with Missing Values
df = pd.DataFrame({
    'age': [25.0, 30.0, np.nan, 45.0, 50.0, 23.0],
    'income': [50000.0, 62000.0, 75000.0, np.nan, 110000.0, 48000.0],
    'city': ['NYC', 'London', 'Paris', 'NYC', np.nan, 'London'],
    'house_price': [300000, 450000, 500000, 650000, 800000, 280000]
})

X = df[['age', 'income', 'city']]
y = df['house_price']

# 2. Define Sub-Pipelines for Column Types
num_cols = ['age', 'income']
cat_cols = ['city']

num_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# 3. Assemble ColumnTransformer Router
preprocessor = ColumnTransformer(transformers=[
    ('num', num_pipeline, num_cols),
    ('cat', cat_pipeline, cat_cols)
])

# 4. Create Full End-to-End Estimator Pipeline
full_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', Ridge(alpha=1.0))
])

# 5. Split and Train Pipeline cleanly
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
full_pipeline.fit(X_train, y_train)

# 6. Predict on Test Set
predictions = full_pipeline.predict(X_test)
print("Pipeline Test Predictions:", np.round(predictions, 2))
```

---

## 7. CORNER CASES & FAILURES

### 1. Unseen Categorical Levels at Test Time
If test data contains a category string that did not exist during training, default `OneHotEncoder()` raises a `ValueError`.
```python
# Fix: Set handle_unknown='ignore'
encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=False)
```

### 2. Dense vs Sparse Matrix Mismatch
By default, `OneHotEncoder` produces a `scipy.sparse.csr_matrix`. Passing sparse matrices into standard dense transformers or custom NumPy functions can crash downstream operations.
```python
# Fix: Set sparse_output=False in OneHotEncoder OR use sparse_threshold=0 in ColumnTransformer
preprocessor = ColumnTransformer(transformers=[...], sparse_threshold=0)
```

---

## 8. SUMMARY & CHEAT SHEET

| Processing Task | Transformer Class | Crucial Parameters |
|---|---|---|
| Numerical Imputation | `SimpleImputer()` | `strategy='median' / 'mean' / 'constant'` |
| One-Hot Encoding | `OneHotEncoder()` | `handle_unknown='ignore'`, `drop='first'` |
| Ordinal Encoding | `OrdinalEncoder()` | `categories=[['Low', 'Med', 'High']]` |
| Standard Scaling | `StandardScaler()` | `with_mean=True`, `with_std=True` |
| Multi-Column Routing | `ColumnTransformer()` | `transformers=[(name, pipe, cols)]` |
| Sequential Pipeline | `Pipeline()` | `steps=[(name1, t1), (name2, t2)]` |
