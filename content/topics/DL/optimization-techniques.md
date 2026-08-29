# Optimization Techniques

**TOPIC:** Optimization Techniques  
**PREREQUISITE TOPICS:** Gradient Descent, Backpropagation & Gradient Flow, Loss Functions  
**LEARNING OUTCOMES:** Compare SGD, Momentum, RMSprop, Adam, and AdamW optimizers; formulate update equations; explain 1st and 2nd moment bias correction; and troubleshoot training instability.

---

## 1. CORE CONCEPT (200-250 words)

**Optimization Techniques** in deep learning are algorithms that update a neural network's weight parameters $\mathbf{W}$ to minimize the loss score $L(\mathbf{W})$. They use parameter gradients ($\nabla_{\mathbf{W}} L$) calculated during backpropagation to navigate the high-dimensional loss landscape.

Deep learning optimization has evolved through key milestones:
1. **Stochastic Gradient Descent (SGD):** Updates weights using noisy mini-batch gradients: $\mathbf{w} := \mathbf{w} - \eta \mathbf{g}$.
2. **SGD with Momentum:** Accumulates a velocity vector $\mathbf{v}$ (an exponential moving average of past gradients) to accelerate downhill and damp oscillations across steep ravine walls.
3. **RMSprop:** Adapts learning rates per parameter by dividing by the square root of an exponential moving average of squared gradients ($\mathbf{s}_t$), scaling down updates for frequently updated parameters.
4. **Adam (Adaptive Moment Estimation):** Combines the benefits of **Momentum** ($1^{\text{st}}$ moment: gradient direction) and **RMSprop** ($2^{\text{nd}}$ moment: uncentered variance) with mathematical bias correction to prevent initial step distortion.
5. **AdamW:** Decouples weight decay regularization from gradient updates, fixing a flaw in standard Adam when applying $L_2$ regularization.

The key insight: Adaptive optimizers (like Adam) compute individual, dynamic learning rates for every parameter in the network, speeding up convergence across ill-conditioned loss surfaces.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose you are training a deep network where the loss landscape contains **saddle points** (flat regions with zero gradient) or **ill-conditioned ravines** (slopes that are thousands of times steeper in one direction than another).

If you use **Vanilla SGD**, the optimizer gets trapped in flat saddle points where gradients approach zero. In ravines, SGD oscillates wildly side-to-side across the steep walls while creeping forward at a snail's pace along the shallow bottom.

Adaptive optimizers solve both issues. 

**Momentum** provides physical inertia, allowing the optimizer to roll straight through shallow saddle points. **RMSprop/Adam** automatically dampens step sizes along steep oscillating dimensions while amplifying step sizes along flat dimensions, accelerating training by orders of magnitude.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

Let $\mathbf{g}_t = \nabla_{\mathbf{w}} L(\mathbf{w}_t)$ be the mini-batch gradient at step $t$, and $\eta$ be the learning rate.

### 1. SGD with Momentum ($\beta$ momentum factor)
$$\mathbf{v}_t = \beta \mathbf{v}_{t-1} + \eta \mathbf{g}_t \quad \implies \quad \mathbf{w}_{t+1} = \mathbf{w}_t - \mathbf{v}_t$$

### 2. RMSprop ($\beta_2$ decay rate, $\epsilon$ smoothing constant)
$$\mathbf{s}_t = \beta_2 \mathbf{s}_{t-1} + (1 - \beta_2) \mathbf{g}_t^2 \quad \implies \quad \mathbf{w}_{t+1} = \mathbf{w}_t - \frac{\eta}{\sqrt{\mathbf{s}_t} + \epsilon} \odot \mathbf{g}_t$$

### 3. Adam Optimizer ($\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-8}$)
- **$1^{\text{st}}$ Moment (Exponential Moving Mean):**
  $$\mathbf{m}_t = \beta_1 \mathbf{m}_{t-1} + (1 - \beta_1) \mathbf{g}_t$$
- **$2^{\text{nd}}$ Moment (Exponential Moving Variance):**
  $$\mathbf{v}_t = \beta_2 \mathbf{v}_{t-1} + (1 - \beta_2) \mathbf{g}_t^2$$
- **Bias Correction (Corrects zero-initialization at step $t$):**
  $$\hat{\mathbf{m}}_t = \frac{\mathbf{m}_t}{1 - \beta_1^t} \quad \text{and} \quad \hat{\mathbf{v}}_t = \frac{\mathbf{v}_t}{1 - \beta_2^t}$$
- **Parameter Update Rule:**
  $$\mathbf{w}_{t+1} = \mathbf{w}_t - \frac{\eta}{\sqrt{\hat{\mathbf{v}}_t} + \epsilon} \odot \hat{\mathbf{m}}_t$$

| Symbol | Meaning | Default Value |
|---|---|---|
| $\eta$ | Base learning rate | $10^{-3}$ (Adam) or $10^{-1}$ (SGD) |
| $\beta_1$ | $1^{\text{st}}$ moment decay coefficient (Momentum) | $0.9$ |
| $\beta_2$ | $2^{\text{nd}}$ moment decay coefficient (RMSprop) | $0.999$ |
| $\epsilon$ | Numerical stability constant | $10^{-8}$ |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Picture a heavy ball rolling down a bumpy, steep mountain loss landscape:

1. **Vanilla SGD (Lightweight Ping-Pong Ball):**  
   Bounces erratically off steep ravine walls, taking tiny steps down the center channel. It easily gets stuck in shallow local dips or flat plateaus.

2. **Momentum (Heavy Bowling Ball):**  
   Gains physical velocity ($\mathbf{v}$) as it rolls downhill. Its momentum carries it straight over small bumps and flat plateaus, smoothing out side-to-side bounces.

3. **Adam (All-Terrain Vehicle with Adaptive Suspension):**  
   Combines momentum (forward engine thrust $\mathbf{m}_t$) with adaptive per-wheel suspension ($\sqrt{\hat{\mathbf{v}}_t}$). If a wheel encounters a rocky, highly erratic surface, the suspension stiffens (shrinking the learning rate). On smooth roads, the suspension relaxes, allowing maximum forward speed.

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Compute parameter updates for 2 steps of **SGD with Momentum** ($\beta = 0.90$, learning rate $\eta = 0.10$).

**Given:**  
- Initial weight: $w_0 = 5.0$
- Initial velocity: $v_0 = 0.0$
- Step 1 gradient: $g_1 = 2.0$
- Step 2 gradient: $g_2 = 1.0$
- Update equations: $v_t = \beta v_{t-1} + \eta g_t$, $w_t = w_{t-1} - v_t$

**Solution steps:**

01. **Execute Step $t=1$ Updates:**
    - Calculate velocity $v_1$:
      $$v_1 = \beta v_0 + \eta g_1 = (0.90 \times 0.0) + (0.10 \times 2.0) = 0.0 + 0.20 = 0.20$$
    - Update weight $w_1$:
      $$w_1 = w_0 - v_1 = 5.0 - 0.20 = 4.80$$

02. **Execute Step $t=2$ Updates:**
    - Calculate velocity $v_2$ (incorporating accumulated momentum $v_1 = 0.20$):
      $$v_2 = \beta v_1 + \eta g_2 = (0.90 \times 0.20) + (0.10 \times 1.0) = 0.18 + 0.10 = 0.28$$
    - Update weight $w_2$:
      $$w_2 = w_1 - v_2 = 4.80 - 0.28 = 4.52$$

03. **Analyze Momentum Accumulation:**  
    Even though the current gradient dropped by half ($g_1 = 2.0 \to g_2 = 1.0$), accumulated momentum boosted the step size from $0.20 \to 0.28$, maintaining downhill momentum.

**Answer:**  
After Step 1: $w_1 = 4.80, v_1 = 0.20$. After Step 2: $w_2 = 4.52, v_2 = 0.28$.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Demonstrate why **Adam Bias Correction** is mathematically necessary at step $t=1$.

**Given:**  
- Hyperparameters: $\beta_1 = 0.90$, $\beta_2 = 0.999$
- Initial moments: $m_0 = 0.0$, $v_0 = 0.0$
- Step 1 Gradient: $g_1 = 10.0$

**Solution steps:**

01. **Calculate uncorrected moments at step $t=1$:**
    $$m_1 = \beta_1 m_0 + (1 - \beta_1) g_1 = (0.90 \times 0.0) + (1 - 0.90)(10.0) = 0.10 \times 10.0 = 1.0$$
    $$v_1 = \beta_2 v_0 + (1 - \beta_2) g_1^2 = (0.999 \times 0.0) + (1 - 0.999)(10.0)^2 = 0.001 \times 100.0 = 0.10$$

02. **Examine the uncorrected values:**  
    The gradient is $10.0$, but $m_1 = 1.0$ and $v_1 = 0.10$. Because $m_0$ and $v_0$ were initialized to zero, uncorrected estimates are severely biased toward zero during early steps.

03. **Apply Adam Bias Correction at $t=1$:**
    $$\hat{m}_1 = \frac{m_1}{1 - \beta_1^1} = \frac{1.0}{1 - 0.90} = \frac{1.0}{0.10} = 10.0$$
    $$\hat{v}_1 = \frac{v_1}{1 - \beta_2^1} = \frac{0.10}{1 - 0.999^1} = \frac{0.10}{0.001} = 100.0$$

04. **Analyze the bias-corrected values:**  
    Bias correction perfectly restores $\hat{m}_1 = 10.0$ and $\hat{v}_1 = 100.0$, matching the true gradient scale ($10.0$ and $10.0^2$).

05. **Asymptotic Behavior as $t \to \infty$:**  
    As step count $t$ grows large, $\beta_1^t \to 0$ and $\beta_2^t \to 0$, causing bias correction factors $\frac{1}{1 - \beta^t} \to 1.0$.

**Answer:**  
Bias correction rescales zero-biased initial moments back to true gradient magnitudes ($\hat{m}_1 = 10.0, \hat{v}_1 = 100.0$).

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Applying standard $L_2$ weight decay inside Adam (`optim.Adam(..., weight_decay=0.01)`).  
✅ **FIX:** Use **AdamW** (`optim.AdamW`) for deep learning models with weight decay.  
**WHY:** In standard Adam, $L_2$ regularization adds $\lambda \mathbf{w}$ directly to the gradient $\mathbf{g}_t$. This regularization gradient gets divided by adaptive variance $\sqrt{\hat{\mathbf{v}}_t}$, suppressing weight decay on parameters with large gradients. AdamW explicitly decouples weight decay from adaptive gradient scaling.

❌ **MISTAKE:** Training deep networks without learning rate schedulers.  
✅ **FIX:** Pair AdamW or SGD with a **Cosine Annealing** scheduler and linear warmup.  
**WHY:** Keeping a constant high learning rate late in training prevents the model from settling into deep, narrow optimal loss minima.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**Optimizer Selection Guide:**
- **Adam / AdamW:** Default first choice for general deep learning, Transformer language models, and complex architectures. Requires minimal hyperparameter tuning ($\eta = 10^{-3}$ or $3 \times 10^{-4}$).
- **SGD with Momentum:** Preferred choice for final competitive Computer Vision models (e.g., ResNet on ImageNet), where SGD+Momentum often achieves slightly better final generalization than Adam.
- **RMSprop:** Effective for Recurrent Neural Networks (RNNs) and Reinforcement Learning algorithms (DQN).

**The Boundary:**  
Start experiments with **AdamW**. If tuning a mature Computer Vision model for maximum test accuracy, experiment with **SGD + Momentum** paired with a Cosine Learning Rate scheduler.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Gradient Descent:** Supplies foundational parameter update concepts.
- **Backpropagation & Gradient Flow:** Provides parameter gradient vectors $\mathbf{g}_t$.

**Enables:**
- **Learning Rate Schedulers:** Modifies base learning rate $\eta$ dynamically across training epochs.
- **Large Language Model (LLM) Pre-training:** AdamW powers multi-billion parameter AI training runs.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** Large Language Model (LLM) Pre-training Cluster  
An AI lab trains a 7-billion parameter language model across 512 GPUs over 30 days.

**Implementation Workflow:**
1. **Optimizer Choice:** Select **AdamW** with $\beta_1 = 0.9$, $\beta_2 = 0.95$, $\epsilon = 10^{-8}$, and weight decay $\lambda = 0.1$.
2. **Learning Rate Schedule:**
   - **Linear Warmup:** Increase learning rate $\eta$ linearly from $0 \to 3 \times 10^{-4}$ over the first 2,000 steps to stabilize early gradient directions.
   - **Cosine Decay:** Decay $\eta$ smoothly down to $3 \times 10^{-5}$ over 1 million steps.
3. **Gradient Clipping:** Clip gradient norm at $\|\mathbf{g}\| \le 1.0$ to prevent exploding gradient instability.
4. **Memory Management:** Use 8-bit Adam (BitsAndBytes) to compress optimizer state memory from 56 GB down to 14 GB per GPU.
5. **Business Impact:** Successfully trains the 7B model without divergence spikes, achieving state-of-the-art language perplexity benchmarks.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Hard  
**Question:** *"Compare SGD+Momentum, RMSprop, and Adam. Explain how Adam combines 1st and 2nd moments, why bias correction is necessary at step $t=1$, and why AdamW is preferred over standard Adam when using weight decay."*

**Expected Answer:**  
SGD+Momentum accelerates training along consistent gradient directions using $1^{\text{st}}$ moment velocity ($\mathbf{v}_t = \beta \mathbf{v}_{t-1} + \eta \mathbf{g}_t$). RMSprop adapts per-parameter learning rates using $2^{\text{nd}}$ moment squared gradients ($\mathbf{s}_t = \beta_2 \mathbf{s}_{t-1} + (1-\beta_2)\mathbf{g}_t^2$). **Adam** combines both: $1^{\text{st}}$ moment $\mathbf{m}_t$ tracks directional momentum, while $2^{\text{nd}}$ moment $\mathbf{v}_t$ scales learning rates inversely to variance ($\frac{\eta}{\sqrt{\hat{\mathbf{v}}_t}+\epsilon}\hat{\mathbf{m}}_t$). **Bias correction** ($\hat{\mathbf{m}}_t = \frac{\mathbf{m}_t}{1-\beta_1^t}$) is required at early steps because initializing $\mathbf{m}_0=\mathbf{0}$ biases uncorrected moments severely toward zero. **AdamW** is preferred over Adam because standard Adam adds weight decay to gradients before dividing by $\sqrt{\hat{\mathbf{v}}_t}$, suppressing regularization on large-gradient parameters; AdamW applies weight decay directly to parameters independently of adaptive scaling.

---

## KEY TAKEAWAYS (50 words max)

- **SGD+Momentum:** Uses $1^{\text{st}}$ moment velocity to roll through flat regions and damp oscillations.
- **RMSprop:** Adapts per-parameter learning rates using $2^{\text{nd}}$ moment squared gradients.
- **Adam:** Combines Momentum ($1^{\text{st}}$ moment) + RMSprop ($2^{\text{nd}}$ moment) + Bias Correction.
- **AdamW:** Decouples weight decay from adaptive gradient scaling.
