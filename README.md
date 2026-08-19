# Epoch

> **Epoch** is a structured, AI-assisted learning platform designed to guide developers and engineers through the complex landscape of Machine Learning, Deep Learning, and LLM Engineering.

Instead of presenting an overwhelming index of disjointed tutorials, **Epoch** structures external, world-class resources (from MIT, Stanford, fast.ai, and research papers) into sequential, visual roadmaps, connected by highly-pedagogical, AI-assisted original connector notes.

---

## Key Features

*   **Curated Learning Paths (DAGs):** Sequential, dependency-mapped paths (e.g., ML Engineer, Deep Learning Engineer) visualised as a Directed Acyclic Graph (DAG).
*   **Three-Tier Curated Resources:** Every learning module contains exactly three hand-picked external resources:
    1.  *Conceptual Foundation* (e.g., lectures/videos)
    2.  *Deep Dive* (e.g., academic chapters, papers)
    3.  *Implementation* (e.g., Jupyter Notebooks, GitHub repos)
*   **Progress Tracking:** Track roadmap progress, resource completions, and project milestones.
*   **AI-Assisted Drafting Pipeline:** Integrates with the Anthropic Claude API to generate structured content drafts utilizing custom educational prompts.
*   **QA Pipeline & Math Verification:** Strict checklists to ensure technical rigor, consistent LaTeX notation, and hand-verifiable worked examples.

---

## Tech Stack & Architecture

### Stack
*   **Frontend:** React, Next.js, TypeScript, Tailwind CSS
*   **Backend:** Python (FastAPI) or Node.js (Express)
*   **Database:** PostgreSQL (for user progress, auth, and analytics)
*   **Hosting:** Vercel (Frontend), Railway / Render (Backend)
*   **Content Storage:** Git-versioned Markdown + JSON structures

### Repository Directory Structure
```
epoch/
├── content/
│   ├── topics/          # Markdown generated & edited topics (e.g., gradient-descent.md)
│   ├── metadata/
│   │   ├── topics.json  # Topic details, prerequisites, and learning outcomes
│   │   └── roadmaps.json# Sequenced lists of topic IDs per learning path
│   └── resources/       # Curated external resource metadata
├── scripts/
│   └── batch_gen.py     # Batch content generation script utilizing Claude API
├── plan.md              # Master execution & implementation roadmap
└── README.md            # Project overview and developer guide
```

---

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   Python (v3.10+)
*   PostgreSQL database instance
*   Anthropic Claude API Key (for the content generation pipeline)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/epoch.git
    cd epoch
    ```

2.  **Frontend Setup:**
    ```bash
    npm install
    npm run dev
    ```

3.  **Backend Setup (FastAPI):**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

### Environment Variables
Configure a `.env` file in the root directory:
```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-key

# Backend & Curation Scripts
DATABASE_URL=postgresql://user:password@localhost:5432/epoch
ANTHROPIC_API_KEY=your-claude-api-key
```

---

## Content Generation System

Epoch uses a custom hybrid framework to generate high-quality pedagogical drafts using Claude 3.5 Sonnet / Opus.

```bash
# To batch generate draft topics defined in content/metadata/topics.json:
python scripts/batch_gen.py
```

### The Curation & QA Gate
Every generated topic undergoes a strict manual review process before merging into the main branch:
*   [ ] **Pedagogical Check:** Real-world analogies used, concepts explained before formulas.
*   [ ] **Rigorous Math:** Hand-verify calculations in all worked examples.
*   [ ] **Style Guidelines:** Keep paragraphs to under 5 sentences and write using active voice.
*   [ ] **Code & Links:** Ensure all NumPy/PyTorch code samples are executable.

---

## Project Roadmap

For details on the week-by-week implementation details, timeline estimates, and risk mitigations, please refer to the [plan.md](file:///Users/abhra/Documents/Epoch/plan.md) file.

---

## License
This project is licensed under the MIT License - see the LICENSE file for details.
