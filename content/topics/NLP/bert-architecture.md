# BERT Architecture

**TOPIC:** BERT Architecture  
**PREREQUISITE TOPICS:** Transformer Architecture, Self-Attention Mechanism, Tokenization Methods  
**LEARNING OUTCOMES:** Explain Bidirectional Encoder Representations from Transformers (BERT), detail Masked Language Modeling (MLM) and Next Sentence Prediction (NSP) pre-training, explain the 80/10/10 masking rule, analyze `[CLS]` and `[SEP]` tokens, and fine-tune BERT for downstream tasks.

---

## 1. CORE CONCEPT (200-250 words)

**BERT** (Bidirectional Encoder Representations from Transformers, Devlin et al., 2018) is a milestone deep learning architecture designed to learn rich, deep **bidirectional contextual representations** from unannotated text.

Unlike traditional autoregressive language models (like GPT) that read text sequentially left-to-right, BERT is an **Encoder-only** Transformer architecture. Its self-attention mechanism processes every token in a sequence by attending to both left and right context simultaneously across all layers.

BERT is pre-trained on large text corpora using two self-supervised objectives:
1. **Masked Language Modeling (MLM):** Randomly masks $15\%$ of input tokens and trains the model to predict the original masked words based on surrounding bidirectional context.
2. **Next Sentence Prediction (NSP):** Trains the model to predict whether a second sentence logically follows the first sentence.

BERT uses three specialized embeddings added together: **Token Embeddings**, **Segment Embeddings** (distinguishing Sentence A from Sentence B), and **Position Embeddings**.

The key insight: BERT conditions on both left and right context simultaneously across all layers, extracting deep bidirectional semantic representations for natural language understanding tasks.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose you are building an NLP system to perform sentiment analysis or question answering on the sentence: *"He deposited money at the bank by the river bank."*

The word *"bank"* appears twice with two completely different meanings (financial institution vs. river edge).

If you use a **unidirectional model** (like an LSTM or GPT decoder), when the model processes the first *"bank"*, it can only look to the left (*"He deposited money at the"*). It has not yet seen the right-side context (*"by the river"*), making it difficult to disambiguate homonyms.

BERT solves this context limitation. 

By allowing unmasked bidirectional self-attention across all tokens simultaneously, BERT incorporates full left and right context ($x_1 \dots x_N$) for every token, providing precise word sense disambiguation.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

### Input Representation
For token $x_i$ in sequence pair $(A, B)$, its input embedding $\mathbf{E}_i$ is the sum of three vectors:

$$\mathbf{E}_i = \text{TokenEmbedding}(x_i) + \text{SegmentEmbedding}(x_i) + \text{PositionEmbedding}(i)$$

### 1. Masked Language Modeling (MLM) Loss
Let $M$ be the set of masked token indices ($15\%$ of sequence length):

$$\mathcal{L}_{\text{MLM}}(\boldsymbol{\theta}) = -\sum_{i \in M} \log P(x_i \mid \mathbf{X}_{\backslash M}; \boldsymbol{\theta})$$

### 2. Next Sentence Prediction (NSP) Loss
Given final hidden state $\mathbf{h}_{\text{[CLS]}} \in \mathbb{R}^H$ for special token `[CLS]`:

$$\mathcal{L}_{\text{NSP}}(\boldsymbol{\theta}) = -\log P(\text{IsNext} \mid \mathbf{h}_{\text{[CLS]}}; \boldsymbol{\theta})$$

### Total Pre-training Objective
$$\mathcal{L}_{\text{BERT}} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{NSP}}$$

### Model Configurations

| Variant | Layers ($L$) | Hidden Size ($H$) | Attention Heads ($A$) | Parameters |
|---|---|---|---|---|
| **BERT-Base** | $12$ | $768$ | $12$ | $110\text{M}$ |
| **BERT-Large** | $24$ | $1024$ | $16$ | $340\text{M}$ |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Visualize BERT's architecture and input sequence structure:

1. **Bidirectional vs. Unidirectional Attention:**  
   - **Unidirectional (GPT):** Token $t$ only looks LEFT to tokens $1 \dots t-1$.
   - **Bidirectional (BERT):** Token $t$ looks LEFT and RIGHT to all tokens $1 \dots N$ simultaneously.

2. **Sequence Formatting:**  
   `[CLS] Sentence A [SEP] Sentence B [SEP]`

   - **`[CLS]` (Classification Token):** Inserted at the very beginning of every sequence. Its final hidden state $\mathbf{h}_{\text{[CLS]}}$ serves as the aggregate sentence representation for classification.
   - **`[SEP]` (Separator Token):** Inserted between sentences and at the end of the sequence.
   - **`[MASK]` Token:** Placed over $15\%$ of words during pre-training to force the model to predict hidden words.

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Calculate the exact token selection count and apply the **80/10/10 Masking Rule** for a pre-training sentence of $N = 20$ tokens.

**Given:**  
- Input sentence length: $N = 20$ tokens
- Pre-training MLM sampling rate: $15\%$
- 80/10/10 Rule:
  - $80\%$ replaced with `[MASK]` token.
  - $10\%$ replaced with a random dictionary token.
  - $10\%$ kept unchanged as original token.

**Solution steps:**

01. **Calculate total number of candidate tokens selected for MLM:**
    $$\text{Selected Count} = N \times 0.15 = 20 \times 0.15 = 3\text{ tokens}$$

02. **Apply $80\%$ replacement rule to selected tokens:**
    $$\text{Mask Replacements} = 3 \times 0.80 = 2.4 \approx 2\text{ tokens}$$
    *(2 selected tokens are replaced with the literal `[MASK]` token ID).*

03. **Apply $10\%$ random replacement rule:**
    $$\text{Random Replacements} = 3 \times 0.10 = 0.3 \approx 1\text{ token}$$
    *(1 selected token is replaced with a random word, e.g., `"apple"`).*

04. **Apply $10\%$ unchanged rule:**
    $$\text{Unchanged Count} = 3 \times 0.10 = 0.3 \approx 0\text{ tokens}$$
    *(0 tokens kept unchanged in this rounding split).*

05. **Why the 80/10/10 Rule is Critical:**  
    If $100\%$ of selected tokens were replaced with `[MASK]`, the network would never see `[MASK]` tokens during downstream fine-tuning tasks, creating a distribution mismatch. Including $10\%$ random words and $10\%$ unchanged words forces BERT to maintain continuous representations for all input tokens.

**Answer:**  
Out of 3 selected tokens, 2 become `[MASK]`, 1 becomes a random word, and 0 remains unchanged.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Trace the fine-tuning workflow of **BERT-Base** for binary sentiment classification ($y \in \{0, 1\}$) on the sentence: `"Great movie"`.

**Given:**  
- BERT-Base hidden dimension: $H = 768$
- Input sequence: `"[CLS] Great movie [SEP]"`
- Classifier Head: Linear layer $\mathbf{W}_{\text{classifier}} \in \mathbb{R}^{1 \times 768}$ and bias $b \in \mathbb{R}^1$

**Solution steps:**

01. **Format input token IDs and pass through BERT Encoder:**
    $$\mathbf{X} = [\text{ID}_{\text{[CLS]}}, \text{ID}_{\text{Great}}, \text{ID}_{\text{movie}}, \text{ID}_{\text{[SEP]}}]$$

02. **Extract final hidden state tensor from Layer 12:**  
    The output tensor shape is $N \times H = 4 \times 768$.

03. **Isolate the `[CLS]` token representation vector ($\mathbf{h}_{\text{[CLS]}}$):**
    $$\mathbf{h}_{\text{[CLS]}} = \mathbf{H}_{[0, :]} \quad (\text{Vector of size } 1 \times 768)$$

04. **Pass $\mathbf{h}_{\text{[CLS]}}$ through classification head:**
    $$z = \mathbf{W}_{\text{classifier}} \mathbf{h}_{\text{[CLS]}} + b$$

05. **Compute predicted probability using Sigmoid:**
    $$\hat{y} = \sigma(z) = \frac{1}{1 + e^{-z}}$$

06. **Fine-Tuning Parameter Updates:**  
    During fine-tuning, backpropagation updates both the classification head ($\mathbf{W}_{\text{classifier}}$) and all 110M pre-trained BERT parameters end-to-end.

**Answer:**  
Fine-tuning extracts the $1 \times 768$ vector $\mathbf{h}_{\text{[CLS]}}$ and applies a linear classifier head to predict sentiment.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Attempting to use BERT for autoregressive text generation (e.g., writing essays or code generation).  
✅ **FIX:** Use **Decoder-only models (GPT-4, LLaMA)** for text generation.  
**WHY:** BERT is an Encoder-only model that uses bidirectional self-attention; it does not contain causal attention masks and cannot generate text word-by-word naturally.

❌ **MISTAKE:** Extracting sentence embeddings by simply taking the average of all final hidden states without using specialized fine-tuning.  
✅ **FIX:** Use **Sentence-BERT (SBERT)** for semantic search embeddings.  
**WHY:** Raw BERT `[CLS]` or average token embeddings perform poorly out-of-the-box for semantic similarity search without contrastive fine-tuning.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**When to Use:**
- Natural Language Understanding (NLU) tasks: Text Classification, Named Entity Recognition (NER), Sentiment Analysis, Part-of-Speech tagging.
- Question Answering (extractive QA) and passage comprehension.
- Information Retrieval and Dense Passage Retrieval (DPR) bi-encoder scoring.

**When NOT to Use:**
- Causal, open-ended text generation (story writing, chat assistants, code generation).
- Long-document processing ($N > 512$ tokens) without using sparse variants like Longformer.

**The Boundary:**  
If the task requires understanding fixed text (Classification/NER/Search), use **BERT / RoBERTa / DeBERTa**. If the task requires generating new text, use **GPT / LLaMA**.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Transformer Architecture:** Uses the Transformer Encoder block as its structural foundation.
- **Self-Attention Mechanism:** Uses unmasked bidirectional self-attention across all tokens.

**Enables:**
- **RoBERTa / DeBERTa:** Enhanced BERT variants removing NSP and adding disentangled attention.
- **Sentence-BERT (SBERT):** Fine-tuning BERT with triplet loss for fast vector similarity search.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** Search Engine Query Intent Understanding  
Google Search uses BERT to understand complex search queries and rank web results.

**Implementation Workflow:**
1. **Challenge:** Pre-2019 keyword search struggled with prepositions and complex queries (e.g., *"2019 brazil traveler to usa need visa"*).
2. **Old Keyword System:** Missed the importance of the word *"to"*, returning articles for US citizens traveling to Brazil.
3. **BERT Deployment:** Deploy a fine-tuned BERT Encoder model processing full query strings bidirectionally.
4. **Contextual Understanding:** BERT's bidirectional attention connects *"traveler"* $\to$ *"to"* $\to$ *"usa"*, recognizing that the user is a Brazilian traveling *into* the United States.
5. **Business Impact:** Improved search result relevance for 1 in 10 organic search queries, representing one of the biggest leaps in search history.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Medium  
**Question:** *"Explain the BERT architecture, why it is bidirectional, how Masked Language Modeling (MLM) works including the 80/10/10 masking rule, and why `[CLS]` is used for classification."*

**Expected Answer:**  
BERT is a Transformer **Encoder-only** model that learns **bidirectional contextual representations** by allowing self-attention to attend to both left and right tokens simultaneously across all layers. **MLM** pre-trains BERT by randomly selecting $15\%$ of input tokens. Of those $15\%$: $80\%$ are replaced with `[MASK]`, $10\%$ with a random token, and $10\%$ remain unchanged. The **80/10/10 rule** is necessary to prevent pre-training/fine-tuning mismatch, ensuring the network maintains active representations even when `[MASK]` tokens are absent during downstream tasks. **`[CLS]`** is a special token prepended to every input sequence; because its representation attends bidirectionally to all sequence tokens across 12+ encoder layers, its final hidden state $\mathbf{h}_{\text{[CLS]}}$ serves as an aggregate sentence embedding for downstream classification heads.

---

## KEY TAKEAWAYS (50 words max)

- **Encoder-only Transformer:** Learns deep bidirectional contextual representations.
- **Pre-training Tasks:** Masked Language Modeling (MLM, 15% tokens) + Next Sentence Prediction (NSP).
- **80/10/10 Masking Rule:** Prevents pre-training vs fine-tuning domain mismatch.
- **`[CLS]` Token:** Aggregate representation used for downstream classification fine-tuning.
- Ideal for text classification, NER, and search query understanding.
