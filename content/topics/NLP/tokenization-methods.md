# Tokenization Methods

**TOPIC:** Tokenization Methods  
**PREREQUISITE TOPICS:** Transformer Architecture, String Processing, Basic Probability  
**LEARNING OUTCOMES:** Compare word-level, character-level, and subword tokenization; execute the Byte-Pair Encoding (BPE) algorithm step-by-step; differentiate BPE, WordPiece, and Unigram; and calculate token-to-word conversion ratios.

---

## 1. CORE CONCEPT (200-250 words)

**Tokenization** is the fundamental pre-processing pipeline in Natural Language Processing (NLP) that converts raw, unstructured text strings into a sequence of discrete numerical identifiers called **tokens** (integer IDs) that Large Language Models (LLMs) can process.

Text tokenization has evolved across three major paradigms:
1. **Word-Level Tokenization:** Splits text on whitespace and punctuation. It creates massive vocabulary sizes ($|V| > 1,000,000$), wastes memory, and fails completely on Out-Of-Vocabulary (OOV) words or typos.
2. **Character-Level Tokenization:** Splits text into individual letters ($|V| \approx 256$). While it eliminates OOV errors, it produces sequence lengths $4\times$ longer, exploding Transformer $O(N^2)$ self-attention memory.
3. **Subword-Level Tokenization (Industry Standard):** Balances vocabulary size and sequence length by breaking rare words into subwords while leaving frequent words intact.

Modern subword algorithms include:
- **Byte-Pair Encoding (BPE):** Iteratively merges the most frequent adjacent byte or character pairs (used by GPT-2/3/4, LLaMA).
- **WordPiece:** Merges character pairs that maximize the likelihood ratio of the corpus (used by BERT).
- **Unigram:** Starts with a massive seed vocabulary and prunes subwords that least decrease corpus likelihood (used by SentencePiece / T5).

The key insight: Subword tokenization guarantees zero Out-Of-Vocabulary (OOV) errors while maintaining efficient sequence lengths for Transformer attention.

---

## 2. THE PROBLEM IT SOLVES (150-200 words)

Suppose a user types an unusual word like *"unfriendliness"* or a typo like *"happpy"* into an AI assistant.

If you use **Word-Level Tokenization**, the word *"unfriendliness"* does not exist in the dictionary. The tokenizer replaces it with an unknown token (`<unk>`), destroying all semantic meaning.

If you use **Character-Level Tokenization**, a 500-word essay expands into $2,500$ individual character tokens. Because Transformer self-attention computes an $N \times N$ attention matrix, memory costs scale by $2500^2 = 6,250,000$ operations, crashing GPU memory.

Subword Tokenization solves both issues. It breaks *"unfriendliness"* into familiar subwords `["un", "friend", "li", "ness"]`, maintaining full semantic meaning without generating `<unk>` tokens or inflating sequence lengths.

---

## 3. FORMAL DEFINITION & NOTATION (200-250 words)

### Byte-Pair Encoding (BPE) Algorithm
Given a text corpus $C$ and target vocabulary size $V_{\text{target}}$:

1. **Initialization:** Initialize vocabulary $\mathcal{V}$ with all unique characters in $C$. Represent each word as a sequence of characters followed by an end-of-word symbol `</w>`.
2. **Iterative Pair Merging:** Count co-occurrence frequency of all adjacent token pairs $(c_A, c_B)$. Find the most frequent pair:
   $$(c_A^*, c_B^*) = \arg\max_{c_A, c_B} \text{Count}(c_A, c_B \text{ in } C)$$
3. **Update:** Merge all occurrences of $(c_A^*, c_B^*)$ into a new unified subword token $c_{\text{new}} = c_A^* c_B^*$ and add $c_{\text{new}}$ to $\mathcal{V}$.
4. **Termination:** Repeat steps 2-3 until $|\mathcal{V}| = V_{\text{target}}$.

### WordPiece Likelihood Metric
WordPiece selects candidate pairs by maximizing the mutual information score:

$$\text{Score}(c_A, c_B) = \frac{\text{Count}(c_A c_B)}{\text{Count}(c_A) \times \text{Count}(c_B)}$$

### Token-to-Word Rule of Thumb (English)
$$1 \text{ Token} \approx 0.75 \text{ Words} \quad \iff \quad 1,000 \text{ Tokens} \approx 750 \text{ Words}$$

| Algorithm | Base Unit | Primary Metric | Primary Models |
|---|---|---|---|
| **BPE** | Characters / Bytes | Pair Frequency | GPT-2/3/4, LLaMA, Mistral |
| **WordPiece** | Characters | Likelihood Ratio ($\frac{P(AB)}{P(A)P(B)}$) | BERT, RoBERTa, Electra |
| **Unigram** | Subwords | Loss Reduction ($L(C)$) | T5, SentencePiece, ALBERT |

---

## 4. INTUITION WITH VISUALS (150-200 words)

Visualize tokenization paradigms using a Lego brick analogy:

- **Word-Level (Pre-built Toy Houses):**  
  You have a toy chest filled with pre-built houses. If a child asks for a "castle", but you only have "houses", you fail completely (`<unk>` error).

- **Character-Level ($1 \times 1$ Individual Studs):**  
  You have millions of tiny individual $1 \times 1$ plastic studs. You can build any structure imaginable, but assembling a simple wall requires 10,000 tedious steps (excessive sequence length).

- **Subword-Level BPE (Modular Bricks):**  
  You store common pre-built walls ("house"), medium 4-dot bricks ("un", "able"), and individual 1-dot studs for rare characters. 
  - Common words ("the", "cat") use 1 modular brick.
  - Rare words ("unbreakable") combine 3 bricks: `["un", "break", "able"]`.
  - Typos or foreign characters combine individual 1-dot studs.

---

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)

**Problem:**  
Execute 2 iterations of the **Byte-Pair Encoding (BPE)** merge algorithm on a mini-corpus to update the vocabulary.

**Given:**  
Corpus word frequencies:
- `"low"` : 5
- `"lower"` : 2
- `"newest"` : 6
- `"widest"` : 3

Initial character vocabulary: $\mathcal{V} = \{\text{l, o, w, e, r, n, s, t, i, d}\}$

**Solution steps:**

01. **Format word representations with character spaces:**
    - `l o w </w>` : 5
    - `l o w e r </w>` : 2
    - `n e w e s t </w>` : 6
    - `w i d e s t </w>` : 3

02. **BPE Iteration 1 - Tally adjacent pair frequencies:**
    - `(e, s)` : 6 (from `"newest"`) + 3 (from `"widest"`) = **9**
    - `(s, t)` : 6 (from `"newest"`) + 3 (from `"widest"`) = **9**
    - `(l, o)` : 5 (from `"low"`) + 2 (from `"lower"`) = 7
    - `(o, w)` : 5 (from `"low"`) + 2 (from `"lower"`) = 7
    *(Select `(e, s)` to merge as top pair).*

03. **Merge `(e, s)` into new token `'es'` and update vocabulary:**
    - New token added: `'es'` $\implies \mathcal{V}_{\text{new}} = \mathcal{V} \cup \{\text{'es'}\}$
    - Updated Corpus:
      - `l o w </w>` : 5
      - `l o w e r </w>` : 2
      - `n e w es t </w>` : 6
      - `w i d es t </w>` : 3

04. **BPE Iteration 2 - Tally pair frequencies on updated corpus:**
    - `(es, t)` : 6 (from `"newest"`) + 3 (from `"widest"`) = **9**
    - `(l, o)` : 5 + 2 = 7
    - `(o, w)` : 5 + 2 = 7
    *(Select `(es, t)` as top pair).*

05. **Merge `(es, t)` into new token `'est'`:**
    - New token added: `'est'` $\implies \mathcal{V}_{\text{final}} = \mathcal{V} \cup \{\text{'es'}, \text{'est'}\}$
    - Updated Corpus:
      - `l o w </w>` : 5
      - `l o w e r </w>` : 2
      - `n e w est </w>` : 6
      - `w i d est </w>` : 3

**Answer:**  
After 2 iterations, BPE merges `'e' + 's' \to 'es'` and `'es' + 't' \to 'est'`, adding `'es'` and `'est'` to the vocabulary.

---

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)

**Problem:**  
Trace how a trained BPE subword tokenizer handles an Out-Of-Vocabulary (OOV) word `"unfriendly"` without producing a `<unk>` error.

**Given:**  
Trained BPE Vocabulary $\mathcal{V}$ containing:  
`[ID 101: "un", ID 102: "friend", ID 103: "ly", ID 104: "friendship", ID 105: "ing"]`

Input string: `"unfriendly"`

**Solution steps:**

01. **Check exact match in vocabulary:**  
    Search for `"unfriendly"` in $\mathcal{V} \implies$ Not found.

02. **Find longest subword match starting at index 0 (`"unfriendly"`):**
    - Candidate subwords: `"u"` (Match), `"un"` (Match).
    - Longest matching token: `"un"` (ID 101).
    - Remaining substring: `"friendly"`.

03. **Find longest subword match starting at index 2 (`"friendly"`):**
    - Candidate subwords: `"f"`, `"fr"`, `"fri"`, `"friend"` (Match).
    - Longest matching token: `"friend"` (ID 102).
    - Remaining substring: `"ly"`.

04. **Find longest subword match starting at index 8 (`"ly"`):**
    - Candidate subwords: `"l"`, `"ly"` (Match).
    - Longest matching token: `"ly"` (ID 103).
    - Remaining substring: `""` (Successfully tokenized).

05. **Construct final Token ID sequence:**
    $$\text{Tokens} = [\text{ID } 101, \text{ID } 102, \text{ID } 103] \equiv [\text{"un"}, \text{"friend"}, \text{"ly"}]$$

**Answer:**  
The tokenizer splits `"unfriendly"` into subwords `["un", "friend", "ly"]` (Token IDs `[101, 102, 103]`), completely avoiding `<unk>` errors.

---

## 7. COMMON MISTAKES (100-150 words)

❌ **MISTAKE:** Assuming leading whitespace is ignored during tokenization (e.g., treating `" word"` and `"word"` as identical tokens).  
✅ **FIX:** Preserve space prefixes in token representations (e.g., Byte-level BPE uses `Ġ` or `Ġword` to denote leading space).  
**WHY:** `" word"` and `"word"` map to completely different token IDs in GPT tokenizers; stripping spaces alters embedding lookups and degrades model performance.

❌ **MISTAKE:** Training a subword tokenizer on English-only text and attempting to process non-English multilingual text.  
✅ **FIX:** Use **Byte-Level BPE** (mapping to 256 UTF-8 bytes) or train on multilingual corpora.  
**WHY:** Unicode characters outside English get converted into long fallback byte sequences, inflating non-English token counts by $4\times$ to $10\times$ and exploding API billing costs.

---

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)

**Tokenizer Selection Guide:**
- **Byte-Level BPE:** Default choice for autoregressive Large Language Models (GPT-4, LLaMA 3, Mistral) with vocabularies of $32,000$ to $128,000$ tokens.
- **WordPiece:** Best for encoder-only models (BERT, RoBERTa) performing classification or embedding extraction.
- **SentencePiece (Unigram):** Best for multilingual models (T5, Gemma, PaLM) where input text is raw unsegmented bytes.

**The Boundary:**  
If building modern LLMs or multi-domain text processing pipelines, use **Subword Tokenization (BPE/WordPiece)**. Never use pure Word-Level or Character-Level tokenization for Transformer architectures.

---

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)

**Builds on:**
- **Transformer Architecture:** Supplies numerical token ID sequences to embedding lookup matrices ($\mathbf{X} = \mathbf{E}_{[\text{tokens}]}$).
- **Basic Probability & Frequency Statistics:** Drives BPE merge pair optimization.

**Enables:**
- **BERT Architecture:** Pre-processing input sentences with `[CLS]` and `[SEP]` WordPiece tokens.
- **GPT Architecture:** Tokenizing prompt inputs for autoregressive text generation.
- **Multilingual NLP:** Managing cross-lingual tokenization efficiency.

---

## 10. REAL-WORLD APPLICATION (200-250 words)

**Industry Use Case:** LLM API Billing & Context Window Management  
Commercial AI providers (OpenAI, Anthropic) charge users per $1,000$ tokens processed and enforce strict context window limits (e.g., 128,000 tokens).

**Implementation Workflow:**
1. **User Request:** A user submits a $10,000$-word technical document for summarization.
2. **Pre-processing:** Pass raw text into the `tiktoken` BPE tokenizer (cl100k_base vocabulary).
3. **Token Count Calculation:**
   - English text: 10,000 words $\implies 13,333$ BPE tokens ($1.33\times$ expansion).
   - Code snippets: 1,000 lines $\implies 4,200$ tokens (higher subword fragmentation).
4. **Validation Check:** Verify that total prompt tokens ($17,533$) fit within the 128,000 context window limit.
5. **Cost Calculation:** Charge API call: $17,533 \text{ tokens} \times \$0.0025 / 1,000 \text{ tokens} = \$0.0438$.
6. **Business Impact:** Prevents out-of-memory GPU runtime crashes while calculating exact commercial API usage metrics.

---

## INTERVIEW QUESTION (100-150 words)

**Difficulty:** Medium  
**Question:** *"Compare Word, Character, and Subword tokenization. How does Byte-Pair Encoding (BPE) construct its vocabulary, and why is Byte-Level BPE preferred for modern LLMs?"*

**Expected Answer:**  
Word-level tokenization causes massive vocabulary sizes ($>1\text{M}$) and frequent Out-Of-Vocabulary (`<unk>`) errors. Character-level tokenization eliminates `<unk>` but creates sequence lengths $4\times$ longer, exploding Transformer $O(N^2)$ attention memory. **Subword tokenization** (BPE) balances both by iteratively merging the most frequent adjacent character pairs in a training corpus until reaching target vocabulary size $V$. Rare words split into subwords (`"un"+"friend"+"ly"`), while common words remain single tokens. **Byte-Level BPE** is preferred for modern LLMs because it initializes its base vocabulary with $256$ raw UTF-8 bytes instead of Unicode characters. This guarantees that *any* text, code, or emoji across any human language can be tokenized with zero `<unk>` fallback tokens.

---

## KEY TAKEAWAYS (50 words max)

- Converts raw text strings into numerical token IDs for LLM inputs.
- **Subword Tokenization (BPE/WordPiece):** Balances vocab size ($32\text{k}-128\text{k}$) and sequence length.
- Eliminates Out-Of-Vocabulary (`<unk>`) errors completely.
- **Byte-Level BPE:** Uses 256 UTF-8 bytes to support all languages.
- **Rule of Thumb:** $1 \text{ Token} \approx 0.75 \text{ Words}$ in English.
