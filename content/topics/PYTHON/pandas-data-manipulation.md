# Pandas Data Manipulation

**TOPIC:** Pandas Data Manipulation  
**PREREQUISITE TOPICS:** Python Data Structures, NumPy Fundamentals  
**LEARNING OUTCOMES:** Master `Series` and `DataFrame` internals, index alignment mechanics, missing data imputation strategies, conditional filtering (`loc`/`iloc`), split-apply-combine GroupBy aggregations, data reshaping (`pivot`, `melt`), and high-performance dataset merging.

---

## 1. CORE CONCEPT

**Pandas** is the definitive tabular data manipulation library in Python. Built directly on top of NumPy, Pandas introduces labeled array data structures: the 1D **`Series`** and the 2D **`DataFrame`**. 

While raw NumPy arrays operate using purely integer position indices, Pandas objects bind explicit semantic row labels (`Index`) and column labels (`Columns`) to the data. This metadata enables automated index alignment during arithmetic operations, rich missing data handling (`NaN`/`NA`), and intuitive database-style aggregations and joins.

Under the hood:
- A `Series` contains an `array` (NumPy ndarray or ExtensionArray) plus an `index`.
- A `DataFrame` acts as a dict-like container of aligned `Series` columns, managed internally by a **`BlockManager`** that groups columns of identical dtypes for fast vectorized operations.

The key insight: Pandas pairs labeled metadata with vectorized NumPy backends to deliver SQL-like expressiveness with C-speed numerical performance.

---

## 2. THE PROBLEM IT SOLVES

Suppose you receive two CSV files containing customer transaction logs recorded on different dates. 

If you use pure **NumPy matrices**, row $i$ in Dataset A may refer to Customer #101, whereas row $i$ in Dataset B refers to Customer #205. Performing matrix addition (`A + B`) silently produces incorrect results because row positions do not match.

Pandas solves index misalignment automatically:
```python
# Automatic alignment by index labels
s1 = pd.Series([100, 200], index=['Cust_A', 'Cust_B'])
s2 = pd.Series([150, 300], index=['Cust_B', 'Cust_C'])

result = s1 + s2
# 'Cust_A': NaN (missing in s2)
# 'Cust_B': 350 (aligned & summed correctly!)
# 'Cust_C': NaN (missing in s1)
```
Pandas aligns data based on explicit keys rather than fragile array coordinates, preventing catastrophic data corruption in production pipelines.

---

## 3. FORMAL DEFINITION & NOTATION

### 1. Label-Based Selection (`loc`) vs Integer-Based Selection (`iloc`)
For a DataFrame $D$ with index set $I$ and column set $C$:

$$\text{Selection by Label: } D.\text{loc}[r, c] \quad \text{where } r \subseteq I, c \subseteq C$$

$$\text{Selection by Position: } D.\text{iloc}[i, j] \quad \text{where } i, j \in \mathbb{Z}_{\ge 0}$$

### 2. Split-Apply-Combine Formalization
Given a dataset $X$ and a grouping key $g(x) \in K$:
1. **Split:** Partition dataset into subsets $\{X_k\}_{k \in K}$ where $X_k = \{x \in X \mid g(x) = k\}$.
2. **Apply:** Evaluate aggregation function $f: X_k \to y_k$ (e.g., $\text{mean}$, $\text{sum}$).
3. **Combine:** Reassemble results into a unified structure indexed by $K$: $Y = \{(k, y_k)\}_{k \in K}$.

| Method | Purpose | Input / Output |
|---|---|---|
| `df.loc[row_label, col_label]` | Label-based explicit indexing | Returns scalar, Series, or DataFrame |
| `df.iloc[row_pos, col_pos]` | Pure integer position-based indexing | Returns scalar, Series, or DataFrame |
| `df.groupby(by).agg()` | Split-Apply-Combine aggregation | Grouped DataFrame |
| `df.merge(right, on, how)` | Database-style JOIN operation | Merged DataFrame |
| `df.pivot_table(index, cols, values)` | Reshape long-to-wide with aggregation | Pivoted DataFrame |

---

## 4. INTUITION & SPLIT-APPLY-COMBINE FLOW

### 1. Initial Input Table
| Index | Category | Sales Amount |
|---|---|---|
| 0 | `Electronics` | `$100` |
| 1 | `Clothing` | `$50` |
| 2 | `Electronics` | `$300` |
| 3 | `Clothing` | `$80` |

### 2. Step 1: Split
Partitions rows into homogeneous groups matching each unique key:
- **Group A (`Electronics`):** `[$100, $300]`
- **Group B (`Clothing`):** `[$50, $80]`

### 3. Step 2: Apply (`sum()`)
Applies the aggregation function to each partition independently:
- **Group A Reduction:** $100 + 300 = 400$
- **Group B Reduction:** $50 + 80 = 130$

### 4. Step 3: Combine
Reassembles the reduced values into a clean summary DataFrame:
| Category Key | Total Sales (`sum`) |
|---|---|
| `Electronics` | `$400` |
| `Clothing` | `$130` |

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Given a DataFrame of employee scores with missing values (`NaN`), filter out employees in the "Engineering" department with scores $\ge 80$, and compute the average score after filling missing values with the department median.

**Given Data:**
```text
  Department  Score
0 Eng         85.0
1 Eng         NaN
2 HR          70.0
3 Eng         95.0
4 HR          NaN
```

**Step-by-Step Solution:**

01. **Calculate Department Medians:**
    - Engineering median: $\text{median}(85.0, 95.0) = 90.0$
    - HR median: $\text{median}(70.0) = 70.0$

02. **Impute Missing Values:**
    ```text
      Department  Score
    0 Eng         85.0
    1 Eng         90.0  <-- imputed
    2 HR          70.0
    3 Eng         95.0
    4 HR          70.0  <-- imputed
    ```

03. **Apply Boolean Mask (`Department == 'Eng'` AND `Score >= 80`):**
    - Row 0: Eng (85.0) $\ge 80 \implies \text{True}$
    - Row 1: Eng (90.0) $\ge 80 \implies \text{True}$
    - Row 3: Eng (95.0) $\ge 80 \implies \text{True}$

04. **Compute Filtered Mean:**
    $$\text{Mean} = \frac{85.0 + 90.0 + 95.0}{3} = \frac{270.0}{3} = 90.0$$

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Perform an end-to-end data cleaning, reshaping, and aggregation analysis on a multi-store retail dataset.

```python
import pandas as pd
import numpy as np

# 1. Create synthetic transaction DataFrame
df = pd.DataFrame({
    'store_id': ['Store_A', 'Store_A', 'Store_B', 'Store_B', 'Store_A', 'Store_B'],
    'category': ['Tech', 'Furniture', 'Tech', 'Tech', 'Furniture', 'Furniture'],
    'revenue': [1200.0, np.nan, 800.0, 1500.0, 450.0, 600.0],
    'units_sold': [4, 2, 3, 5, np.nan, 3]
})

# 2. Impute missing numeric values using GroupBy transform (Category Median)
df['revenue'] = df.groupby('category')['revenue'].transform(lambda x: x.fillna(x.median()))
df['units_sold'] = df['units_sold'].fillna(1)

# 3. Create derived feature (Average Order Value)
df['aov'] = df['revenue'] / df['units_sold']

# 4. Perform Pivot Table (Stores as rows, Categories as columns)
pivot_res = df.pivot_table(
    index='store_id',
    columns='category',
    values='revenue',
    aggfunc='sum',
    fill_value=0
)

print("Imputed Clean DataFrame:")
print(df)
print("\nStore x Category Revenue Pivot Table:")
print(pivot_res)
```

---

## 7. CORNER CASES & FAILURES

### 1. `SettingWithCopyWarning`
Attempting chained assignment triggers ambiguity on whether a view or copy is modified.
```python
# WRONG (Chained Assignment):
df[df['score'] > 80]['status'] = 'Pass'  # Triggers SettingWithCopyWarning!

# CORRECT (Using loc):
df.loc[df['score'] > 80, 'status'] = 'Pass'
```

### 2. NaN Propagation in Integer Columns
Classic NumPy integer arrays (`int64`) cannot represent `NaN`. Storing missing values casts entire integer columns to `float64` unless using nullable integer types (`Int64`).
```python
s = pd.Series([1, 2, np.nan])  # Type automatically becomes float64!
s_nullable = pd.Series([1, 2, np.nan], dtype="Int64")  # Remains integer representation
```

---

## 8. SUMMARY & CHEAT SHEET

| Task | Syntax | Key Notes |
|---|---|---|
| Selection by Label | `df.loc[row_mask, ['colA', 'colB']]` | Inclusive of endpoints |
| Selection by Position | `df.iloc[0:5, 0:2]` | Exclusive of end index |
| Filter Data | `df[(df['A'] > 0) & (df['B'] == 'X')]` | Must use bitwise `&` / `\|` with `()` |
| Group Aggregation | `df.groupby('cat').agg({'rev': 'sum', 'aov': 'mean'})` | Multi-column flexible stats |
| Merge / Join | `pd.merge(df1, df2, on='key', how='inner')` | SQL inner/left/right/outer join |
| Reshape (Wide to Long) | `pd.melt(df, id_vars=['id'], value_vars=['col1', 'col2'])` | Unpivots columns to rows |
