# NumPy Fundamentals

**TOPIC:** NumPy Fundamentals  
**PREREQUISITE TOPICS:** Python Data Types, Basic Vector & Matrix Algebra  
**LEARNING OUTCOMES:** Master N-dimensional array creation, memory layout (strides & memory contiguousness), vectorized array operations, broadcasting mechanics, boolean indexing, linear algebra subroutines, and performance optimization over native Python lists.

---

## 1. CORE CONCEPT

The **NumPy** (`Numerical Python`) library forms the essential core of the scientific Python and Machine Learning ecosystem. The central data structure in NumPy is the **`ndarray`** (N-dimensional array), a multidimensional, homogeneous container for elements of identical data type (`dtype`) stored in contiguous blocks of physical memory.

Unlike native Python lists—which store collections of references to scattered objects wrapped in heap allocation overhead—a NumPy `ndarray` packs numerical data tightly into memory. This physical layout enables SIMD (Single Instruction, Multiple Data) CPU vectorization and permits low-level hardware optimizations written in C and Fortran.

Key characteristics of NumPy arrays include:
- **Homogeneity:** Every element in the array shares the exact same data type (e.g., `float64`, `int32`), avoiding dynamic type-checking during computations.
- **Strided Indexing:** Memory offsets between elements along dimensions are defined by a tuple of strides, allowing instant array slicing and transposition without copying underlying bytes.
- **Vectorization:** Mathematical operations execute as C-level loops over contiguous memory blocks, eliminating slow Python `for` loops.

The key insight: NumPy converts high-level Python operations into low-level vectorized C execution over contiguous memory, delivering 10x–100x computational speedups.

---

## 2. THE PROBLEM IT SOLVES

Suppose you need to compute the element-wise sum of two vectors containing 1,000,000 floating-point numbers.

Using **native Python lists**, you write a `for` loop or list comprehension:
```python
# Native Python loop
result = [a + b for a, b in zip(list_a, list_b)]
```
Under the hood, Python must iterate over 1,000,000 elements, unbox each float object from heap memory, extract its raw numeric value, perform the addition, allocate a new Python float object, and append its reference to a new list. This causes severe CPU cache misses and massive interpreter overhead.

NumPy solves this performance bottleneck by operating directly on raw byte arrays:
```python
# NumPy vectorized addition
result = array_a + array_b
```
Here, NumPy delegates the entire calculation to an optimized C function (`c_array_a + c_array_b`), executing raw CPU instructions over contiguous memory blocks without interpreter overhead.

---

## 3. FORMAL DEFINITION & NOTATION

### 1. Memory Strides Formulation
For an $N$-dimensional array with shape $(d_0, d_1, \dots, d_{N-1})$ and item size $S$ (in bytes), the **stride tuple** $(s_0, s_1, \dots, s_{N-1})$ defines the byte displacement required to move one index forward along each axis.

In C-contiguous (row-major) layout, the byte offset for element index $(i_0, i_1, \dots, i_{N-1})$ is:

$$\text{Byte Offset} = \sum_{k=0}^{N-1} i_k \cdot s_k$$

Where strides are computed as:

$$s_{N-1} = S, \quad s_k = s_{k+1} \cdot d_{k+1} \quad \text{for } k = N-2, N-3, \dots, 0$$

### 2. Broadcasting Rules
When operating on two arrays $A$ and $B$ with shapes $(a_0, a_1, \dots, a_{m-1})$ and $(b_0, b_1, \dots, b_{n-1})$:
1. If arrays differ in rank, prepend $1$s to the shape of the smaller rank array.
2. Two dimensions are **compatible** if they are equal OR if one of them is equal to $1$.
3. If dimensions are incompatible, NumPy raises a `ValueError: operands could not be broadcast together`.

| Concept | Description | Example / Formula |
|---|---|---|
| `ndarray.shape` | Tuple of array dimensions | `(3, 4)` $\implies 3 \text{ rows}, 4 \text{ columns}$ |
| `ndarray.strides` | Bytes to step in memory per dimension | `(32, 8)` for `float64` array of shape `(3, 4)` |
| `ndarray.dtype` | Data type of array elements | `np.float64`, `np.int32`, `np.bool_` |
| `ndarray.ndim` | Number of array axes | Rank of array (e.g., $1\text{D}=1, 2\text{D}=2$) |

---

## 4. INTUITION & MEMORY ARCHITECTURE

Consider a 2D matrix of shape `(3, 4)` containing 64-bit floats (8 bytes per item):

### 1. Conceptual 2D Logical View
| Axis 1 $\to$ | Col 0 | Col 1 | Col 2 | Col 3 |
|---|---|---|---|---|
| **Row 0** | `10.0` | `20.0` | `30.0` | `40.0` |
| **Row 1** | `50.0` | `60.0` | `70.0` | `80.0` |
| **Row 2** | `90.0` | `11.0` | `22.0` | `33.0` |

### 2. Physical 1D Contiguous RAM Layout (C-Order)
| Memory Offset | `0 B` | `8 B` | `16 B` | `24 B` | `32 B` | `40 B` | `48 B` | `56 B` | `64 B` | `72 B` | `80 B` | `88 B` |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Stored Value** | `10.0` | `20.0` | `30.0` | `40.0` | `50.0` | `60.0` | `70.0` | `80.0` | `90.0` | `11.0` | `22.0` | `33.0` |
| **Logical Index** | `(0,0)` | `(0,1)` | `(0,2)` | `(0,3)` | `(1,0)` | `(1,1)` | `(1,2)` | `(1,3)` | `(2,0)` | `(2,1)` | `(2,2)` | `(2,3)` |

### 3. Stride Mechanics
- **Row Step (`axis 0`):** Requires moving $4 \times 8 = 32\text{ bytes}$ forward in memory.
- **Column Step (`axis 1`):** Requires moving $1 \times 8 = 8\text{ bytes}$ forward in memory.
- **Zero-Copy Transposition (`arr.T`):** Swaps strides from `(32, 8)` to `(8, 32)` instantaneously without copying data in physical RAM.

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Compute the broadcasted sum of a 2D matrix $A$ of shape $(3, 1)$ and a 1D row vector $B$ of shape $(4,)$.

**Given:**
$$A = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}, \quad B = \begin{bmatrix} 10 & 20 & 30 & 40 \end{bmatrix}$$

**Step-by-Step Solution:**

01. **Check Shape Alignment:**
    - Shape of $A$: $(3, 1)$
    - Shape of $B$: $(4,)$ $\implies$ prepended with $1$ becomes $(1, 4)$.

02. **Apply Broadcasting Expansion:**
    - Expand $A$ along axis 1 (size $1 \to 4$):
      $$A_{\text{broadcast}} = \begin{bmatrix} 1 & 1 & 1 & 1 \\ 2 & 2 & 2 & 2 \\ 3 & 3 & 3 & 3 \end{bmatrix}$$
    - Expand $B$ along axis 0 (size $1 \to 3$):
      $$B_{\text{broadcast}} = \begin{bmatrix} 10 & 20 & 30 & 40 \\ 10 & 20 & 30 & 40 \\ 10 & 20 & 30 & 40 \end{bmatrix}$$

03. **Compute Element-Wise Sum:**
    $$C = A_{\text{broadcast}} + B_{\text{broadcast}} = \begin{bmatrix} 11 & 21 & 31 & 41 \\ 12 & 22 & 32 & 42 \\ 13 & 23 & 33 & 43 \end{bmatrix}$$

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Given a dataset of 5 sample feature vectors in 3D space, calculate the pairwise Euclidean distance matrix between all pairs of samples using vectorized NumPy operations (without explicit Python loops).

```python
import numpy as np

# 1. Define sample dataset X of shape (5, 3)
X = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0],
    [1.0, 1.0, 1.0],
    [2.0, 0.0, 1.0]
])

# 2. Reshape for broadcasting: X_row shape (5, 1, 3), X shape (1, 5, 3)
X_row = X[:, np.newaxis, :]  # Shape: (5, 1, 3)
X_col = X[np.newaxis, :, :]  # Shape: (1, 5, 3)

# 3. Compute differences: shape (5, 5, 3)
diff = X_row - X_col

# 4. Square differences and sum along feature axis (axis=2)
dist_squared = np.sum(diff ** 2, axis=2)

# 5. Take square root to obtain Euclidean distance matrix (5, 5)
dist_matrix = np.sqrt(dist_squared)

print("Pairwise Distance Matrix Shape:", dist_matrix.shape)
print("Distance between Sample 0 and Sample 1:", np.round(dist_matrix[0, 1], 4))
# Output: Distance = sqrt((1-4)^2 + (2-5)^2 + (3-6)^2) = sqrt(9+9+9) = sqrt(27) = 5.1962
```

---

## 7. CORNER CASES & FAILURES

### 1. View vs. Copy Pitfall
Slicing an array creates a **view** (shared memory), whereas boolean masking or fancy indexing returns a **copy** (allocated memory).
```python
arr = np.array([10, 20, 30, 40])
view_slice = arr[0:2]
view_slice[0] = 999  # Modifies original 'arr'!

fancy_slice = arr[[0, 1]]
fancy_slice[0] = -1  # Does NOT modify original 'arr'!
```

### 2. Incompatible Broadcasting
Attempting to operate on shapes `(3, 4)` and `(3,)` fails because trailing dimensions must align.
```python
A = np.ones((3, 4))
B = np.ones((3,))
# A + B -> ValueError: operands could not be broadcast together with shapes (3,4) (3,)
# Fix: B[:, np.newaxis] shapes B to (3, 1), which broadcasts correctly to (3, 4).
```

---

## 8. SUMMARY & CHEAT SHEET

| Operation | NumPy Function / Syntax | Memory Consequence |
|---|---|---|
| Array Creation | `np.zeros()`, `np.ones()`, `np.arange()`, `np.linspace()` | Allocates new contiguous memory |
| Reshaping | `arr.reshape(shape)`, `arr.ravel()` | Returns view if strides allow, else copy |
| Transposition | `arr.T`, `arr.transpose()` | Instant zero-copy view with swapped strides |
| Boolean Filtering | `arr[arr > 5]` | Allocates new copy array |
| Matrix Multiply | `A @ B` or `np.matmul(A, B)` | Highly optimized BLAS/LAPACK call |
| Reduction | `np.sum(axis=0)`, `np.mean(axis=1)` | Collapses specified dimension |
