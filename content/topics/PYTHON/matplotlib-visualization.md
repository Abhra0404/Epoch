# Matplotlib Visualization

**TOPIC:** Matplotlib Visualization  
**PREREQUISITE TOPICS:** Python Basics, NumPy Arrays  
**LEARNING OUTCOMES:** Master the Figure and Axes object hierarchy, compare the Object-Oriented (OO) API against pyplot's state machine, build multi-panel subplots (`plt.subplots`), customize axes, tick locators, legends, and color maps, and export production-quality graphics.

---

## 1. CORE CONCEPT

**Matplotlib** is the foundation of data visualization in Python. Understanding Matplotlib requires mastering its core structural hierarchy:
- **`Figure` (`fig`):** The top-level canvas object that contains all elements of the graphic, including subplots, legends, titles, and canvas backends.
- **`Axes` (`ax`):** The individual plot region bounded by coordinate axes. A `Figure` can contain multiple `Axes` objects arranged in grids or custom layouts. Every plotting operation (lines, scatters, bar charts, text) is executed directly on an `Axes` instance.
- **`Axis` (`ax.xaxis`, `ax.yaxis`):** The number line objects that control ticks, tick labels, axis bounds, and grid lines.

Matplotlib supports two programming paradigms:
1. **Pyplot State-Machine Interface (`plt.plot()`):** Implicitly tracks the "current" Figure and Axes. Simple for quick scripts, but error-prone for complex multi-plot figures.
2. **Object-Oriented (OO) Interface (`fig, ax = plt.subplots()`):** Explicitly creates Figure and Axes handles, offering fine-grained control over multi-panel layouts and rendering pipeline behavior.

The key insight: Always use the Object-Oriented interface (`fig, ax = plt.subplots()`) to maintain complete control over plot handles without relying on implicit global state.

---

## 2. THE PROBLEM IT SOLVES

Suppose you need to build a multi-panel dashboard comparing model loss curves, precision-recall metrics, and residual distribution plots side by side.

If you rely on the **pyplot state machine** (`plt.plot`, `plt.subplot`):
```python
# State-machine code (Hard to maintain, state confusion):
plt.subplot(1, 2, 1)
plt.plot(train_loss)
plt.subplot(1, 2, 2)
plt.plot(val_loss)
# Modifying title on plot 1 requires switching global state back!
plt.subplot(1, 2, 1)
plt.title("Train Loss")
```
As figure complexity grows, state-machine code quickly degrades into confusing, bug-ridden code where operations accidentally modify the wrong subplot.

The **Object-Oriented API** eliminates global state ambiguity:
```python
# OO explicit API:
fig, (ax1, ax2) = plt.subplots(1, 2)
ax1.plot(train_loss)
ax1.set_title("Train Loss")
ax2.plot(val_loss)
ax2.set_title("Validation Loss")
```
Each plot handle (`ax1`, `ax2`) is an explicit object with clear methods, preventing cross-plot contamination.

---

## 3. FORMAL DEFINITION & NOTATION

### 1. The Canvas Architecture Hierarchy
- **`Figure` Container:** Top-level page/canvas object (`fig`).
  - **`Axes 1` (`ax1`):** Subplot region 1 (title, x-axis, y-axis, plot primitives).
  - **`Axes 2` (`ax2`):** Subplot region 2 (title, x-axis, y-axis, plot primitives).

### 2. Method Naming Mapping (Pyplot vs OO API)
| Feature | Pyplot State-Machine (`plt`) | Object-Oriented API (`ax`) |
|---|---|---|
| Set Title | `plt.title("Name")` | `ax.set_title("Name")` |
| Set X/Y Labels | `plt.xlabel("X")`, `plt.ylabel("Y")` | `ax.set_xlabel("X")`, `ax.set_ylabel("Y")` |
| Set Axis Limits | `plt.xlim(0, 10)`, `plt.ylim(0, 1)` | `ax.set_xlim(0, 10)`, `ax.set_ylim(0, 1)` |
| Toggle Grid | `plt.grid(True)` | `ax.grid(True)` |
| Add Legend | `plt.legend()` | `ax.legend()` |

---

## 4. INTUITION & SUBPLOT GRID INDEXING

Calling `fig, axes = plt.subplots(2, 2)` generates a 2D NumPy array of `Axes` objects:

| | Column 0 (`col=0`) | Column 1 (`col=1`) |
|---|---|---|
| **Row 0 (`row=0`)** | `axes[0, 0]` | `axes[0, 1]` |
| **Row 1 (`row=1`)** | `axes[1, 0]` | `axes[1, 1]` |

Access individual subplots directly via 2D array indexing: `axes[0, 1].scatter(x, y)`.

---

## 5. WORKED EXAMPLE 1: Simple Case

**Problem:**  
Create a clean single-panel plot displaying both a sine wave $y = \sin(x)$ and a cosine wave $y = \cos(x)$ on the interval $x \in [0, 2\pi]$, featuring custom line styles, axis labels, grid lines, and a legend.

**Step-by-Step Solution:**

```python
import numpy as np
import matplotlib.pyplot as plt

# 01. Generate Data
x = np.linspace(0, 2 * np.pi, 100)
y_sin = np.sin(x)
y_cos = np.cos(x)

# 02. Instantiate Figure and Axes using OO API
fig, ax = plt.subplots(figsize=(8, 4), dpi=100)

# 03. Plot Lines with Custom Labels and Colors
ax.plot(x, y_sin, label=r'$y = \sin(x)$', color='#1f77b4', linewidth=2, linestyle='-')
ax.plot(x, y_cos, label=r'$y = \cos(x)$', color='#ff7f0e', linewidth=2, linestyle='--')

# 04. Customize Axes Attributes
ax.set_title("Trigonometric Functions", fontsize=14, pad=10)
ax.set_xlabel("Angle (radians)", fontsize=11)
ax.set_ylabel("Amplitude", fontsize=11)
ax.set_xlim(0, 2 * np.pi)
ax.set_ylim(-1.2, 1.2)
ax.grid(True, linestyle=':', alpha=0.6)
ax.legend(loc='upper right', frameon=True)

# 05. Render / Close
plt.tight_layout()
# plt.savefig("trig_plot.png")
```

---

## 6. WORKED EXAMPLE 2: Realistic Case

**Problem:**  
Build a publication-ready $1 \times 2$ multi-panel diagnostic figure containing a training loss line plot on the left and a model prediction residual scatter plot on the right.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Generate Synthetic Loss and Residual Data
epochs = np.arange(1, 51)
train_loss = 2.5 * np.exp(-0.08 * epochs) + 0.1 * np.random.normal(0, 0.05, 50)
val_loss = 2.7 * np.exp(-0.06 * epochs) + 0.15 + 0.1 * np.random.normal(0, 0.05, 50)

y_true = np.linspace(10, 100, 100)
y_pred = y_true + np.random.normal(0, 5.0, 100)
residuals = y_pred - y_true

# 2. Create 1x2 Subplot Grid
fig, (ax1, ax2) = plt.subplots(nrows=1, ncols=2, figsize=(12, 5), dpi=100)

# Panel 1: Loss Curves
ax1.plot(epochs, train_loss, label='Train Loss', color='#2b5c8f', lw=2)
ax1.plot(epochs, val_loss, label='Validation Loss', color='#d95f02', lw=2, ls='--')
ax1.set_title("Model Training & Validation Loss", fontsize=12, fontweight='bold')
ax1.set_xlabel("Epoch", fontsize=10)
ax1.set_ylabel("Cross-Entropy Loss", fontsize=10)
ax1.grid(True, alpha=0.3)
ax1.legend()

# Panel 2: Residual Scatter Plot
sc = ax2.scatter(y_true, residuals, c=np.abs(residuals), cmap='viridis', alpha=0.8, edgecolors='none')
ax2.axhline(0, color='red', linestyle='--', linewidth=1.5, label='Zero Error Baseline')
ax2.set_title("Prediction Residuals Distribution", fontsize=12, fontweight='bold')
ax2.set_xlabel("True Target Value", fontsize=10)
ax2.set_ylabel("Residual (Predicted - True)", fontsize=10)
ax2.grid(True, alpha=0.3)
ax2.legend()

# Add Colorbar for Scatter Plot
cbar = fig.colorbar(sc, ax=ax2)
cbar.set_label("Absolute Error Magnitude", fontsize=9)

# Adjust Layout Spacing
plt.tight_layout()
plt.show()
```

---

## 7. CORNER CASES & FAILURES

### 1. Unclosed Figures Memory Leak
Creating hundreds of figures in loops without calling `plt.close(fig)` causes Matplotlib to retain all figures in RAM, triggering severe memory leaks.
```python
# WRONG (Memory Leak):
for i in range(1000):
    fig, ax = plt.subplots()
    ax.plot(data[i])
    fig.savefig(f"plot_{i}.png") # Figure stays open in memory!

# CORRECT:
for i in range(1000):
    fig, ax = plt.subplots()
    ax.plot(data[i])
    fig.savefig(f"plot_{i}.png")
    plt.close(fig)              # Releases figure memory explicitly
```

### 2. 1D vs 2D Subplot Array Indexing
When `nrows=1` or `ncols=1`, `plt.subplots()` returns a 1D array of axes instead of a 2D matrix. Accessing `axes[0, 1]` raises an `IndexError`.
```python
fig, axes = plt.subplots(1, 2)
# axes[0, 1].plot(x, y) -> IndexError: too many indices for array
# Fix: axes[1].plot(x, y)
```

---

## 8. SUMMARY & CHEAT SHEET

| Task | Syntax | Notes |
|---|---|---|
| Create Canvas & Subplots | `fig, ax = plt.subplots(nrows, ncols, figsize=(w, h))` | Returns Figure and Axes handles |
| Plot Lines | `ax.plot(x, y, color='blue', linestyle='--', label='Name')` | Line plot |
| Plot Scatter | `ax.scatter(x, y, c=colors, cmap='viridis', alpha=0.7)` | Point scatter with color map |
| Plot Histogram | `ax.hist(data, bins=30, density=True, edgecolor='black')` | Distribution histogram |
| Format Labels | `ax.set_xlabel()`, `ax.set_ylabel()`, `ax.set_title()` | Set text properties |
| Save to File | `fig.savefig("output.pdf", bbox_inches='tight', dpi=300)` | Supports PNG, PDF, SVG |
