# GPT Architecture

**TOPIC:** GPT Architecture  
**PREREQUISITE TOPICS:** Transformer Architecture, Self-Attention Mechanism, Activation Functions, Tokenization Methods  
**LEARNING OUTCOMES:** Explain the Generative Pre-trained Transformer (GPT) Decoder-only architecture, formulate Causal Language Modeling (CLM), implement Causal Attention Masking, calculate KV Cache memory, and analyze in-context learning.

---

## 1. CORE CONCEPT (200-250 words)

**GPT** (Generative Pre-trained Transformer, Radford et al., OpenAI) is an autoregressive, **Decoder-only** Transformer architecture designed for causal text generation, reasoning, and code synthesis.

Unlike BERT (which uses bidirectional attention to understand fixed text), GPT uses **Causal Self-Attention** to generate text one token at a time from left to right. At any given position $t$, the model can only attend to past tokens ($x_1, \dots, x_{t-1}$) and the current token ($x_t$). It is strictly prevented from peering into future tokens ($x_{t+1} \dots x_N$).

GPT is pre-trained on vast internet text corpora using a single self-supervised objective: **Causal Language Modeling (CLM)**, also known as Next-Token Prediction.

During inference, token generation is accelerated using **KV Caching (Key-Value Caching)**. Instead of recomputing Key ($\mathbf{K}$) and Value ($\mathbf{V}$) matrices for all past tokens at every new step, past KV tensors are cached in GPU memory, reducing generation time per token from $O(N^2)$ to $O(N)$.

The key insight: By pre-training a Decoder-only Transformer on next-token prediction at scale, GPT develops emergent in-context zero-shot and few-shot reasoning capabilities.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose you are building an AI assistant to write code or generate human-like conversational responses.

If you use an **Encoder-Decoder architecture** (like T5) or an **RNN**, training requires complex cross-attention layers or sequential step-by-step loops that cannot scale to hundreds of billions of parameters. Furthermore, training separate models for every unique NLP task (summarization, translation, coding) requires expensive task-specific datasets.

GPT solves both scaling and task-generalization challenges. 

By unifying all NLP tasks into a single **Decoder-only architecture** trained on next-token prediction, GPT scales cleanly to hundreds of billions of parameters across GPU clusters, learning to perform diverse tasks in-context simply by reading user prompts.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

### Causal Language Modeling (CLM) Objective
Given a sequence of tokens $\mathbf{X} = (x_1, x_2, \dots, x_N)$, GPT maximizes the likelihood of predicting each token given its preceding context:

$$\mathcal{L}_{\text{CLM}}(\boldsymbol{\theta}) = -\sum_{t=1}^{N} \log P\left(x_t \mid x_1, x_2, \dots, x_{t-1}; \boldsymbol{\theta}\right)$$

### Causal Attention Masking Matrix ($\mathbf{M}$)
To enforce autoregressive text generation, a upper-triangular mask matrix $\mathbf{M} \in \mathbb{R}^{N \times N}$ is added to the scaled dot-product attention logits before Softmax:

$$M_{ij} = \begin{cases} 0 & \text{if } i \ge j \quad (\text{Current or past token}) \\ -\infty & \text{if } i < j \quad (\text{Future token}) \end{cases}$$

$$\text{CausalAttention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{Softmax}\left( \frac{\mathbf{Q} \mathbf{K}^T}{\sqrt{d_k}} + \mathbf{M} \right) \mathbf{V}$$

*(Since $\exp(-\infty) = 0$, Softmax assigns exactly $0\%$ attention to all future tokens).*

### KV Cache Memory Formula (Bytes per Sequence)
For sequence length $N$, hidden layers $L$, hidden dimension $d_{\text{model}}$, using 16-bit float (2 bytes):

$$\text{KV Cache Size (Bytes)} = 2 \times L \times N \times d_{\text{model}} \times 2$$

| Symbol | Meaning | Example / Range |
|---|---|---|
| $\mathbf{M}$ | Causal mask matrix | Upper-triangle filled with $-\infty$ |
| $x_t$ | Target token at step $t$ | Next token to predict |
| $\text{KV}_{\text{cache}}$ | Cached Key/Value tensors | Stored in GPU VRAM during generation |
| $d_{\text{model}}$ | Hidden embedding dimension | $4,096$ (LLaMA-7B) to $12,288$ (GPT-3 175B) |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Visualize the core mechanics of GPT:

1. **Causal Lower-Triangular Masking Matrix:**  
   Picture an $N \times N$ attention grid where rows represent the current token generating an output, and columns represent tokens being attended to:
   - Row 1 ("The"): Can only attend to ["The"]. Upper row elements are blocked ($-\infty$).
   - Row 2 ("cat"): Can attend to ["The", "cat"].
   - Row 3 ("sat"): Can attend to ["The", "cat", "sat"].
   The lower-triangular mask ensures information flows strictly from left to right.

2. **KV Caching During Inference:**  
   - **Without KV Cache:** Generating token 100 requires running the full Transformer model across all 100 tokens from scratch ($1 + 2 + \dots + 100 = 5,050$ calculations).
   - **With KV Cache:** Past Keys and Values for tokens 1-99 are retrieved from GPU memory. The model computes Query, Key, and Value ONLY for token 100 (1 single calculation).

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Demonstrate how **Causal Attention Masking** alters attention probabilities for a $N=2$ token sequence (`["Deep", "Learning"]`).

**Given:**  
- Unscaled dot-product matrix: $\mathbf{A} = \mathbf{Q}\mathbf{K}^T = \begin{bmatrix} 2.0 & 5.0 \\ 1.0 & 3.0 \end{bmatrix}$
- Scaling factor $\sqrt{d_k} = 1.0$ (for calculation simplicity)
- Causal Mask Matrix: $\mathbf{M} = \begin{bmatrix} 0 & -\infty \\ 0 & 0 \end{bmatrix}$
- Exponentials: $e^{1.0} \approx 2.7183$, $e^{3.0} \approx 20.0855$

**Solution steps:**

01. **Add Causal Mask $\mathbf{M}$ to unscaled attention matrix $\mathbf{A}$:**
    $$\mathbf{A}_{\text{masked}} = \mathbf{A} + \mathbf{M} = \begin{bmatrix} 2.0 & 5.0 \\ 1.0 & 3.0 \end{bmatrix} + \begin{bmatrix} 0 & -\infty \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 2.0 & -\infty \\ 1.0 & 3.0 \end{bmatrix}$$

02. **Compute Row 1 Softmax ($\text{Token 1: "Deep"}$):**
    - Numerators: $e^{2.0} \approx 7.3891$, $e^{-\infty} = 0.0000$
    - Denominator sum: $7.3891 + 0.0000 = 7.3891$
    - Probabilities:
      $$S_{11} = \frac{7.3891}{7.3891} = 1.00 \quad (100\%)$$
      $$S_{12} = \frac{0.0000}{7.3891} = 0.00 \quad (0\%)$$
    $$\text{Row 1 Weights} = [1.00, 0.00]$$

03. **Compute Row 2 Softmax ($\text{Token 2: "Learning"}$):**
    - Numerators: $e^{1.0} \approx 2.7183$, $e^{3.0} \approx 20.0855$
    - Denominator sum: $2.7183 + 20.0855 = 22.8038$
    - Probabilities:
      $$S_{21} = \frac{2.7183}{22.8038} \approx 0.1192 \quad (11.92\%)$$
      $$S_{22} = \frac{20.0855}{22.8038} \approx 0.8808 \quad (88.08\%)$$
    $$\text{Row 2 Weights} = [0.1192, 0.8808]$$

04. **Analyze Result:**  
    Token 1 ("Deep") is forced to assign $0.00\%$ attention weight to future Token 2 ("Learning"). Token 2 attends to both Token 1 ($11.92\%$) and itself ($88.08\%$).

**Answer:**  
Causal masking yields attention matrix $\mathbf{S} = \begin{bmatrix} 1.00 & 0.00 \\ 0.1192 & 0.8808 \end{bmatrix}$.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Calculate the exact **KV Cache GPU VRAM footprint** (in Gigabytes) required to serve 1 user request generating a $N = 2,000$ token context window on a LLaMA-7B model using FP16 precision.

**Given:**  
Model specifications for LLaMA-7B:
- Hidden layers ($L$): $32$
- Model embedding dimension ($d_{\text{model}}$): $4,096$
- Precision: 16-bit Float (FP16 $\implies 2$ bytes per scalar)
- Sequence length: $N = 2,000$ tokens
- Formula: $\text{Memory (Bytes)} = 2 \times L \times N \times d_{\text{model}} \times \text{bytes\_per\_num}$

**Solution steps:**

01. **Identify terms in the KV Cache memory equation:**
    - Factor $2$: Stores both Key ($\mathbf{K}$) and Value ($\mathbf{V}$) matrices.
    - $L = 32$ layers
    - $N = 2,000$ tokens
    - $d_{\text{model}} = 4,096$ dimensions
    - Bytes per number $= 2$ bytes (FP16)

02. **Substitute values into the memory equation:**
    $$\text{Bytes} = 2 \times 32 \times 2,000 \times 4,096 \times 2$$

03. **Perform step-by-step arithmetic:**
    $$\text{Bytes} = 64 \times 2,000 \times 4,096 \times 2$$
    $$\text{Bytes} = 128,000 \times 8,192 = 1,048,576,000\text{ bytes}$$

04. **Convert Bytes to Gigabytes ($\text{GB} = \frac{\text{Bytes}}{1024^3}$ or $\frac{\text{Bytes}}{10^9}$):**
    $$\text{Memory (GB)} = \frac{1,048,576,000}{1,073,741,824} \approx 0.9765\text{ GiB} \quad (\approx 1.05\text{ GB})$$

05. **Practical Significance:**  
    A single user session with a 2,000-token context consumes $\approx 1.0\text{ GB}$ of GPU VRAM *just for the KV cache*, independent of the model's 14 GB weight footprint. Serving 50 concurrent users requires 50 GB of KV cache VRAM!

**Answer:**  
The KV Cache memory footprint is $\approx 1.05\text{ GB}$ per user sequence.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Confusing GPT (Decoder-only, Causal CLM) with BERT (Encoder-only, Bidirectional MLM).  
✅ **FIX:** Recognize that GPT uses causal masking to generate text left-to-right, whereas BERT uses unmasked bidirectional attention to encode fixed text.  
**WHY:** Applying bidirectional attention to GPT allows the model to "cheat" by looking at future tokens, destroying autoregressive text generation capabilities.

❌ **MISTAKE:** Omitting KV Caching during LLM inference loops.  
✅ **FIX:** Store past Key and Value tensors in GPU memory (`past_key_values` in HuggingFace Transformers).  
**WHY:** Without KV Caching, generating token $N$ requires re-running the entire Transformer across all $N-1$ prompt tokens, causing inference latency to explode from $O(N) \to O(N^2)$.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**When to Use:**
- Autoregressive text generation tasks (chat assistants, code generation, creative writing, story completion).
- In-context zero-shot and few-shot learning applications without task-specific fine-tuning.
- Multi-task AI systems driven by natural language prompts.

**When NOT to Use:**
- Standalone feature extraction for fixed-text search indexing (where BERT or bi-encoders like SBERT perform better).
- Extremely low-latency edge applications where storing multi-gigabyte KV Caches violates RAM limits.

**The Boundary:**  
If the goal is generating continuous text or following conversational prompts, use **GPT / Decoder-only LLMs**. If the goal is extracting dense semantic embeddings for fixed text search, use **BERT / Encoder models**.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Transformer Architecture:** Uses the Decoder block (minus cross-attention) as its foundation.
- **Self-Attention Mechanism:** Applies causal lower-triangular attention masking.

**Enables:**
- **LoRA Fine-Tuning:** Efficiently adapting heavy pre-trained GPT weights to custom domains.
- **Preference Alignment (RLHF / DPO):** Aligning raw GPT base models with human preferences for safety and helpfulness.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** Enterprise Conversational AI Code Assistant  
A cloud developer platform deploys a 13-billion parameter GPT model to provide real-time code completions inside code editors.

**Implementation Workflow:**
1. **Model Architecture:** 40-layer Decoder-only Transformer ($d_{\text{model}} = 5120$).
2. **Pre-training:** Pre-trained on 1.5 trillion tokens of code and technical documentation using Next-Token Prediction.
3. **High-Throughput Serving:** Deployed using **vLLM** with PagedAttention to manage KV Cache memory dynamically across GPU VRAM.
4. **Latency Optimization:**
   - User types code: `def calculate_fibonacci(n):`
   - KV Cache loads past file context; model generates next token in 15 milliseconds.
5. **Business Impact:** Serves 200,000 software engineers simultaneously, boosting developer coding velocity by $38\%$.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Hard  
**Question:** *"Explain the GPT architecture, how Causal Masking enforces autoregressive text generation, how KV Caching optimizes inference latency, and how to calculate KV Cache memory footprint."*

**Expected Answer:**  
GPT is a **Decoder-only** Transformer pre-trained on Next-Token Prediction (Causal Language Modeling: $\max \sum \log P(x_t \mid x_{<t})$). **Causal Masking** adds an upper-triangular matrix filled with $-\infty$ to unscaled attention logits $\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}} + \mathbf{M}$ before Softmax. Because $\exp(-\infty) = 0$, Softmax assigns $0\%$ attention to future tokens ($x_{t+1} \dots x_N$), forcing the model to generate text autoregressively left-to-right. During inference, **KV Caching** eliminates $O(N^2)$ redundant re-computations by storing past Key and Value tensors in GPU VRAM, allowing the model to compute Q, K, V only for the single new token at step $t$, dropping latency to $O(N)$. **KV Cache Memory** is calculated as $2 \times L \times N \times d_{\text{model}} \times \text{bytes\_per\_num}$.

---

## KEY TAKEAWAYS (50 words max)

- **Decoder-only Transformer:** Pre-trained on Next-Token Prediction (CLM).
- **Causal Masking:** Sets future attention logits to $-\infty$, enforcing left-to-right text generation.
- **KV Caching:** Caches past Key/Value tensors in GPU VRAM, dropping latency from $O(N^2) \to O(N)$.
- Core foundation architecture powering modern LLMs (GPT-4, LLaMA, Claude).
