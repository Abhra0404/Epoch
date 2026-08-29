# Preference Alignment (RLHF)

**TOPIC:** Preference Alignment (RLHF)  
**PREREQUISITE TOPICS:** GPT Architecture, LoRA Fine-tuning, Loss Functions, Optimization Techniques  
**LEARNING OUTCOMES:** Explain the three-stage RLHF pipeline (SFT → Reward Model → PPO), formulate the Bradley-Terry preference model, derive the PPO clipped surrogate objective, contrast RLHF with Direct Preference Optimization (DPO), and calculate KL-divergence penalties.

---

## 1. CORE CONCEPT (200-250 words)

**Reinforcement Learning from Human Feedback (RLHF)** is the training methodology used to align pre-trained Large Language Models (LLMs) with human values, safety standards, and instruction-following behavior. It transforms a raw **Base Model** — which is only trained to predict the next token — into a helpful, harmless, and honest **Aligned Assistant**.

The canonical RLHF pipeline (Stiennon et al., InstructGPT, Ouyang et al., 2022) consists of three stages:

1. **Supervised Fine-Tuning (SFT):** Fine-tune the base LLM on a curated dataset of high-quality human-written prompt-response pairs to seed instruction-following behavior.
2. **Reward Model (RM) Training:** Collect human annotator **pairwise preference judgments** comparing two model outputs for the same prompt. Train a separate Reward Model to predict preference scores.
3. **Proximal Policy Optimization (PPO):** Use the frozen Reward Model as a reward signal to fine-tune the SFT model using Reinforcement Learning, while penalizing large deviations from the SFT baseline with a **KL-divergence penalty**.

A modern lightweight alternative, **Direct Preference Optimization (DPO)**, eliminates the separate Reward Model and PPO training loop entirely, reformulating alignment as a simple binary cross-entropy objective directly on preference pairs.

The key insight: RLHF teaches LLMs what humans prefer, not just what tokens are statistically likely — shifting models from probability mimicry to value alignment.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose you deploy a raw GPT base model as a chatbot.

The base model is trained purely to minimize Next-Token Prediction loss on internet text. When a user asks *"How do I make my essay more persuasive?"*, the model might output the next most-likely text from its training corpus — which could be a toxic Reddit argument, misleading propaganda, or an unrelated continuation.

Without alignment, raw LLMs:
- Ignore the user's actual instruction intent.
- Reproduce harmful, biased, or dangerous content from the training corpus.
- Hallucinate confident false answers with zero uncertainty calibration.

RLHF solves these failure modes.

By training the model against a reward signal capturing human judgment about *good versus bad responses*, RLHF steers the LLM's output distribution toward helpfulness, factual accuracy, and safety — producing the conversational AI assistants seen in modern commercial products.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

### 1. Bradley-Terry Preference Model (Reward Model Training)
For a prompt $x$ with two completions $y_w$ (preferred / "winner") and $y_l$ (rejected / "loser"), the probability that human annotators prefer $y_w$ is modeled as:

$$P(y_w \succ y_l \mid x) = \sigma\left( r_\phi(x, y_w) - r_\phi(x, y_l) \right) = \frac{e^{r_\phi(x, y_w)}}{e^{r_\phi(x, y_w)} + e^{r_\phi(x, y_l)}}$$

Reward Model Loss (negative log-likelihood over a dataset $\mathcal{D}$ of preference pairs):
$$\mathcal{L}_{\text{RM}}(\phi) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma\left( r_\phi(x, y_w) - r_\phi(x, y_l) \right) \right]$$

### 2. PPO RLHF Objective (with KL Penalty)
$$\mathcal{L}_{\text{RLHF}}(\theta) = \mathbb{E}_{(x, y) \sim \pi_\theta} \left[ r_\phi(x, y) \right] - \beta \cdot D_{\text{KL}}\left[ \pi_\theta(y \mid x) \;\|\; \pi_{\text{ref}}(y \mid x) \right]$$

### 3. DPO Objective (Reward-Model-Free Alternative)
$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{(x, y_w, y_l)} \left[ \log \sigma\left( \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)} \right) \right]$$

| Symbol | Meaning | Role |
|---|---|---|
| $r_\phi(x, y)$ | Reward Model scalar score | Measures human preference for response $y$ to prompt $x$ |
| $\pi_\theta$ | Current policy LLM being trained | Updated via PPO or DPO gradient steps |
| $\pi_{\text{ref}}$ | Reference policy (frozen SFT model) | Baseline for KL-divergence penalty |
| $\beta$ | KL penalty coefficient | Prevents reward hacking (typical: $0.01 - 0.1$) |
| $D_{\text{KL}}$ | KL-divergence penalty | Prevents policy from deviating too far from SFT baseline |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Visualize the three-stage RLHF training pipeline:

1. **Stage 1 — SFT (Seeding Instruction Following):**  
   Raw base model sees curated prompt-response pairs like *("[Prompt]: Summarize this article. [Response]: Here is a clear 3-sentence summary…")* and learns the instruction-response conversation format.

2. **Stage 2 — Reward Model Training (Learning Human Preferences):**  
   Human annotators see two model responses to the same prompt, A and B, and click "A is better". The Reward Model learns to assign higher scalar scores to responses matching annotator preferences.

3. **Stage 3 — PPO RL Training (Optimizing Against Human Reward):**  
   Picture the SFT model as an employee on probation. PPO lets it explore new responses (roll out sequences), the Reward Model grades each response (score), and PPO's KL penalty is a "don't stray too far from what you already know" constraint from the manager (SFT reference model).

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Calculate the **Reward Model preference probability** $P(y_w \succ y_l \mid x)$ given reward scores for a preferred and rejected response.

**Given:**  
- Prompt $x$: *"Explain photosynthesis simply."*
- Preferred response $y_w$: *"Plants use sunlight to convert CO₂ and water into glucose."* → Reward score $r_\phi(x, y_w) = 3.5$
- Rejected response $y_l$: *"Photosynthesis is a biochemical process involving complex enzymatic reactions in chloroplasts and thylakoid membranes."* → Reward score $r_\phi(x, y_l) = 1.5$
- Sigmoid function: $\sigma(z) = \frac{1}{1 + e^{-z}}$
- Exponential value: $e^{-2.0} \approx 0.1353$

**Solution steps:**

01. **Calculate the reward score difference ($\Delta r$):**
    $$\Delta r = r_\phi(x, y_w) - r_\phi(x, y_l) = 3.5 - 1.5 = 2.0$$

02. **Apply the Bradley-Terry Sigmoid formula:**
    $$P(y_w \succ y_l \mid x) = \sigma(\Delta r) = \sigma(2.0) = \frac{1}{1 + e^{-2.0}}$$

03. **Substitute the known exponential value $e^{-2.0} \approx 0.1353$:**
    $$P(y_w \succ y_l \mid x) = \frac{1}{1 + 0.1353} = \frac{1}{1.1353} \approx 0.8808$$

04. **Interpret the result:**  
    Given these reward scores, the Reward Model predicts that human annotators would prefer the simple explanation ($y_w$) over the jargon-heavy explanation ($y_l$) with an **$88.08\%$ probability**.

05. **Compute the Reward Model Training Loss contribution for this pair:**
    $$l_{\text{RM}} = -\log \sigma(2.0) = -\log(0.8808) \approx 0.1269$$

**Answer:**  
Preference probability $P(y_w \succ y_l \mid x) \approx 0.8808$ (88.08%), loss contribution $\approx 0.127$.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Explain how the **KL-divergence penalty** in PPO prevents reward hacking, using a token-level probability example.

**Given:**  
- For prompt $x$ and response token $y_1 = \text{"Paris"}$:
  - SFT Reference Policy probability: $\pi_{\text{ref}}(\text{"Paris"} \mid x) = 0.60$
  - PPO Policy probability after RL training: $\pi_\theta(\text{"Paris"} \mid x) = 0.05$
- Token-level KL-divergence contribution: $\pi_\theta \log \frac{\pi_\theta}{\pi_{\text{ref}}}$
- KL penalty coefficient: $\beta = 0.05$

**Solution steps:**

01. **Define the KL-divergence penalization mechanism:**  
    During PPO training, every token generated by the current policy $\pi_\theta$ is penalized proportionally to how far its probability deviates from the reference (SFT) policy $\pi_{\text{ref}}$.

02. **Compute the token-level KL contribution for $y_1 = \text{"Paris"}$:**
    $$\text{KL contribution} = \pi_\theta(\text{"Paris"} \mid x) \cdot \log \frac{\pi_\theta(\text{"Paris"} \mid x)}{\pi_{\text{ref}}(\text{"Paris"} \mid x)}$$
    $$= 0.05 \times \log\left(\frac{0.05}{0.60}\right) = 0.05 \times \log(0.0833)$$
    $$= 0.05 \times (-2.485) = -0.1243$$

03. **Compute the penalty term (summed over all tokens in a response and multiplied by $\beta$):**
    $$\text{KL Penalty} = -\beta \times (-0.1243) = +0.05 \times 0.1243 = +0.0062$$
    *(Positive KL penalty reduces the effective reward signal from the Reward Model.)*

04. **Analyze: Why KL-divergence prevents reward hacking:**  
    Reward hacking occurs when the policy discovers degenerate outputs that fool the Reward Model (e.g., repeating "great job, excellent answer!" endlessly scores high reward but is useless to users). The KL penalty assigns a heavy cost if the policy distribution deviates dramatically from the SFT baseline, forcing the policy to remain close to sensible pre-trained behavior while still improving.

**Answer:**  
The KL penalty adds a positive cost $\beta \cdot D_{\text{KL}}$ to the RLHF objective whenever the policy deviates from the SFT reference, preventing reward hacking.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Believing RLHF eliminates all model hallucinations and biases.  
✅ **FIX:** Recognize that RLHF aligns outputs with annotator preferences, not with objective truth.  
**WHY:** Reward Models are trained on human annotator judgments which themselves carry subjective biases, cultural assumptions, and are fooled by confident-sounding but factually wrong responses ("sycophancy problem").

❌ **MISTAKE:** Setting the KL penalty coefficient $\beta$ too low ($\beta \approx 0.001$) during PPO training.  
✅ **FIX:** Tune $\beta$ carefully ($0.01 \le \beta \le 0.1$) and monitor KL-divergence during training.  
**WHY:** A near-zero $\beta$ allows the policy to over-optimize against the imperfect Reward Model, causing reward hacking — the policy discovers outputs that score high reward but are incoherent, harmful, or nonsensical to real users.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**Use RLHF (PPO) when:**
- You need precise multi-objective control of output quality (helpfulness AND harmlessness AND honesty) with careful reward shaping.
- Deploying commercial-grade chat assistants (ChatGPT, Claude, Gemini) requiring safety red-teaming.

**Use DPO when:**
- Simpler preference alignment without the operational complexity of separate Reward Model training and PPO infrastructure.
- Resource-constrained settings (single research GPU cluster) where three-stage RLHF is impractical.

**When NOT to Use:**
- Small classification or regression models where standard supervised fine-tuning is sufficient.
- Domains without reliable human preference annotation pipelines (label quality determines alignment quality).

**The Boundary:**  
For safety-critical production LLM products at scale, use **RLHF (PPO)**. For academic research and resource-constrained alignment, use **DPO**.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **GPT Architecture:** SFT and PPO training operate on Decoder-only Transformer policies.
- **Loss Functions (Cross-Entropy / BCE):** Reward Model training uses binary cross-entropy over preference pairs.

**Enables:**
- **Constitutional AI (CAI):** Extending RLHF with AI-generated critique and revision feedback instead of human annotations.
- **RLAIF (RL from AI Feedback):** Replacing expensive human annotators with a frontier AI model as the preference judge.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** Aligning a Commercial AI Chat Assistant  
OpenAI aligns GPT-4 using a multi-stage RLHF pipeline to deploy a safe, helpful production AI assistant.

**Implementation Workflow:**
1. **SFT Dataset (Stage 1):** 40,000 high-quality human-written prompt-response demonstrations collected from expert contractors.
2. **Reward Model Training (Stage 2):** Contractors rank pairs of GPT-4 outputs for 100,000+ prompts. Train a 6B parameter Reward Model on these pairwise labels.
3. **PPO Fine-Tuning (Stage 3):** Fine-tune GPT-4 using PPO with $\beta = 0.02$ KL penalty, running the Reward Model as real-time reward signal.
4. **Iterative Red-Teaming:** Human red-teamers craft adversarial prompts to identify jailbreaks. New failure cases are added back to the SFT/RM dataset.
5. **Business Impact:** Deployed assistant scores $79\%$ higher on helpfulness benchmarks and $92\%$ reduction in harmful output rate compared to unaligned GPT-4 base model.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Hard  
**Question:** *"Explain the three stages of RLHF, formulate the Bradley-Terry Reward Model loss, explain why KL-divergence penalty is required in PPO, and describe how DPO eliminates the Reward Model."*

**Expected Answer:**  
RLHF consists of three stages: (1) **SFT** fine-tunes the base LLM on demonstration data. (2) **Reward Model Training** learns $r_\phi(x,y)$ from human pairwise preference labels using Bradley-Terry: $\mathcal{L}_{\text{RM}} = -\mathbb{E}[\log \sigma(r_\phi(x,y_w) - r_\phi(x,y_l))]$. (3) **PPO** optimizes the policy $\pi_\theta$ against $r_\phi$ with objective $\mathbb{E}[r_\phi(x,y)] - \beta D_{\text{KL}}[\pi_\theta \| \pi_{\text{ref}}]$. The **KL penalty** is critical because without it, PPO over-optimizes against the imperfect Reward Model, discovering degenerate reward-hacking outputs. **DPO** eliminates the Reward Model by reparameterizing $r_\phi$ in terms of the optimal policy ratio $\frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}$, reducing alignment to a simple binary cross-entropy loss directly on preference pairs.

---

## KEY TAKEAWAYS (50 words max)

- **3-Stage Pipeline:** SFT → Reward Model (Bradley-Terry pairwise preference) → PPO RL optimization.
- **KL Penalty ($\beta D_{\text{KL}}$):** Prevents reward hacking by keeping policy close to SFT reference.
- **DPO:** Eliminates separate Reward Model; direct BCE loss on preference pairs.
- Transforms raw base LLMs into safe, helpful AI assistants (ChatGPT, Claude, Gemini).
