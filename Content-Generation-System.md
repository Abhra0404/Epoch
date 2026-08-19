# AI-Assisted Content Generation System for ML Learning Platform

## Overview
Create PrepLoom-quality content at scale using a structured prompt system + Claude API. This system trades 30% of your manual writing time for AI-assisted drafting + editing.

---

## Part 1: The Master Content Generation Prompt

Use this with Claude API to generate structured content for any ML topic.

```
You are a world-class ML educator writing for learners aged 18-30 with high school math. 
Your content style matches PrepLoom.com: clear, pedagogical, with concrete examples.

TOPIC: {TOPIC_NAME}
PREREQUISITE_TOPICS: {LIST_OF_PREREQUISITES}
LEARNING_OUTCOMES: {WHAT_LEARNER_SHOULD_KNOW_AFTER}

Generate structured content with these sections in this exact format:

## 1. CORE CONCEPT (200-250 words)
- Explain WHAT this topic is (not HOW to use it yet)
- Use 1 real-world analogy
- Avoid jargon until necessary; define when you use it
- End with "The key insight:" statement

## 2. THE PROBLEM IT SOLVES (150-200 words)
- Give a concrete scenario where learners will need this
- Show the naive approach (why it fails)
- Preview how this topic helps
- Make it relatable (not abstract)

## 3. FORMAL DEFINITION & NOTATION (200-250 words)
- Introduce mathematical notation with a symbol table
- Provide 2-3 equations with variable explanations
- Use a simple table: Symbol | Meaning | Example
- Show one complete equation with all symbols defined

Example table format:
| Symbol | Meaning | Example |
|--------|---------|---------|
| x      | Input feature | Study hours |
| y      | Observed target | Actual marks |

## 4. INTUITION WITH VISUALS (150-200 words)
- Explain the concept visually (describe what a diagram would show)
- Use phrases like "Imagine a scatter plot..." or "Picture a line..."
- Do NOT create actual images; describe them
- Help learners build mental models

Visual example:
"Imagine a scatter plot with points at (1,2), (2,3), (3,5). 
A line is drawn through them—not touching every point, but minimizing 
the vertical distance from each point to the line."

## 5. WORKED EXAMPLE 1: Simple Case (300-400 words)
- Use small numbers (3-5 data points max)
- Show every calculation step-by-step
- Number each step
- Use the format:
  Problem: [State the problem]
  Given: [What you know]
  Solution steps:
  01 [First calculation]
  02 [Second calculation]
  03 [Result]
  Answer: [Clear final answer]

## 6. WORKED EXAMPLE 2: Common Variation (300-400 words)
- Show a slightly different scenario
- Highlight where step 5 differed
- Use same numbered format

## 7. COMMON MISTAKES (100-150 words)
- List 2-3 frequent errors learners make
- For each: what they do wrong + why it fails
- Provide the correction
- Use format:
  ❌ MISTAKE: [What learners do wrong]
  ✅ FIX: [Correct approach]
  WHY: [Why the correction matters]

## 8. WHEN TO USE (vs. When NOT to Use) (150-200 words)
- List scenarios where this topic applies
- List scenarios where it doesn't (equally important)
- Explain the boundary between them

## 9. CONNECTIONS TO OTHER TOPICS (100-150 words)
- List 2-3 topics this builds on (prerequisites)
- List 2-3 topics this enables (what's next)
- Brief 1-sentence explanation of each connection

## 10. REAL-WORLD APPLICATION (200-250 words)
- Give a concrete project or industry example
- Explain step-by-step how this topic is used
- Include numbers/metrics if possible
- Make it tangible (not theoretical)

## INTERVIEW QUESTION (100-150 words)
- Write 1 technical interview question on this topic
- Provide expected answer (2-3 sentences)
- Indicate difficulty level (Easy, Medium, Hard)
- Show what a good answer looks like

## KEY TAKEAWAYS (50 words max)
- 3-4 bullet points
- What learner should remember 6 months from now

---

IMPORTANT:
- Use markdown formatting (headers, bold, bullet points)
- Include 2-3 mathematical equations per section (use LaTeX notation)
- Never write more than 250 words per section unless specified
- Use concrete numbers, not abstract variables
- Make every example reproducible by hand (no complex data)
- Assume high school algebra/geometry as baseline
- Use "you" when speaking to the learner
- Avoid: excessive jargon, theoretical abstractions, multi-page proofs

OUTPUT FORMAT: Return content with markdown headers and proper structure. 
Ready for direct publication.
```

---

## Part 2: Batch Content Production Workflow

### Week-by-Week System (For 44 Topics)

**Goal:** Generate high-quality first drafts in 4-6 weeks using AI + manual editing.

### Timeline Option A: AI-Heavy (Faster, Less Perfect)

```
Week 1-2: Setup & Validation
├─ Define 44 topics from your roadmap
├─ Write 2 topics manually (quality baseline)
├─ Test Claude API prompts
├─ Create topic dependency map

Week 3-4: Batch Generation
├─ Generate drafts for 12-15 topics (Claude API)
├─ 30 min per topic: review + light editing
├─ Collect feedback from 5-10 users
├─ Iterate prompt based on feedback

Week 5-6: Refinement & Launch
├─ Generate remaining 25-30 topics
├─ Edit in parallel (outsource editing if budget allows)
├─ Add worked examples, fix math notation
├─ Cross-link topics, create navigation

Week 7-8: Polish & Test
├─ Full proofread (catch jargon, clarity issues)
├─ Validate all math (spot-check calculations)
├─ Add related resources/links
├─ Soft launch with 100 users
```

### Timeline Option B: Hybrid (Balanced)

```
Week 1-2: Manual + AI Setup
├─ Write 5-7 topics manually (strongest topics)
├─ Set up Claude API batch processing
├─ Build content template system

Week 3-5: AI-Assisted Drafting
├─ Generate drafts for 15 topics
├─ Manually edit + rewrite 50% of content
├─ 1-1.5 hours per topic (AI draft + editing)

Week 6-7: Full Editing Pass
├─ Complete remaining 20 topics
├─ One-pass proofread everything
├─ Add missing examples, math verification

Week 8: Testing & Launch
├─ User feedback cycle (50 users, 1 week)
├─ Fix critical issues
├─ Soft launch
```

**Recommendation for solo founder:** Hybrid (Option B). You get quality + speed.

---

## Part 3: Content Quality Checklist

Before publishing each topic, verify:

### Writing Quality
- [ ] No jargon without definition
- [ ] Paragraphs < 5 sentences
- [ ] Concrete examples for every concept
- [ ] "You" pronouns (speaks to learner)
- [ ] Active voice (not passive)

### Pedagogy
- [ ] Prerequisite topics are listed
- [ ] Core concept explained before formulas
- [ ] 2+ worked examples with all steps shown
- [ ] At least 1 "common mistake" section
- [ ] Real-world application included

### Mathematics
- [ ] All equations use consistent notation
- [ ] Every symbol defined in text or table
- [ ] Worked examples use reproducible numbers (< 5 data points)
- [ ] Calculations verifiable by hand
- [ ] No unexplained jumps between steps

### Structure
- [ ] Headings follow template format
- [ ] Sections are self-contained
- [ ] "Connections to other topics" are accurate
- [ ] Interview question is answerable at that level
- [ ] Key takeaways are memorable

---

## Part 4: Claude API Integration (Code Template)

Use this to batch-generate content:

```python
import anthropic
import json
import time

# Initialize Anthropic client
client = anthropic.Anthropic(api_key="your-api-key")

# Define your topics
TOPICS = [
    {
        "name": "Simple Linear Regression",
        "prerequisites": ["Algebra", "Basic Statistics"],
        "learning_outcomes": ["Fit a regression line using OLS", "Interpret coefficients", "Identify residuals"],
    },
    {
        "name": "Multiple Linear Regression",
        "prerequisites": ["Simple Linear Regression", "Linear Algebra"],
        "learning_outcomes": ["Extend to multiple features", "Understand multicollinearity"],
    },
    # ... add all 44 topics
]

# Master prompt template
CONTENT_PROMPT_TEMPLATE = """
You are a world-class ML educator writing for learners aged 18-30 with high school math.
Your content style matches PrepLoom.com: clear, pedagogical, with concrete examples.

TOPIC: {topic_name}
PREREQUISITE_TOPICS: {prerequisites}
LEARNING_OUTCOMES: {learning_outcomes}

[REST OF MASTER PROMPT - see Part 1]
"""

def generate_topic_content(topic: dict) -> str:
    """Generate content for one topic using Claude API."""
    
    prompt = CONTENT_PROMPT_TEMPLATE.format(
        topic_name=topic["name"],
        prerequisites=", ".join(topic["prerequisites"]),
        learning_outcomes=", ".join(topic["learning_outcomes"]),
    )
    
    message = client.messages.create(
        model="claude-opus-4-8",  # Use Opus for best quality
        max_tokens=4000,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    
    return message.content[0].text

def batch_generate_content(topics: list, output_dir: str = "./content"):
    """Generate content for all topics and save to files."""
    
    results = {}
    
    for i, topic in enumerate(topics):
        print(f"Generating {i+1}/{len(topics)}: {topic['name']}...")
        
        try:
            content = generate_topic_content(topic)
            results[topic["name"]] = {
                "status": "success",
                "content": content
            }
            
            # Save to file
            filename = topic["name"].lower().replace(" ", "-") + ".md"
            with open(f"{output_dir}/{filename}", "w") as f:
                f.write(f"# {topic['name']}\n\n")
                f.write(content)
            
            print(f"  ✓ Saved to {filename}")
            
            # Rate limit: 60 requests per minute for Claude
            time.sleep(1)
            
        except Exception as e:
            print(f"  ✗ Error: {str(e)}")
            results[topic["name"]] = {
                "status": "error",
                "error": str(e)
            }
    
    return results

# Usage
if __name__ == "__main__":
    results = batch_generate_content(TOPICS, output_dir="./content/topics")
    
    # Save results summary
    with open("generation_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    # Print summary
    successes = sum(1 for r in results.values() if r["status"] == "success")
    print(f"\n✓ Generated {successes}/{len(TOPICS)} topics")
```

---

## Part 5: Editing Workflow (After AI Generation)

### Solo Founder Editing Template (30 min per topic)

**For each AI-generated topic, follow this checklist:**

1. **Read full content (5 min)**
   - Does it flow?
   - Do explanations make sense?
   - Any obvious errors?

2. **Check math & examples (10 min)**
   - Verify all calculations by hand
   - Spot-check worked examples
   - Ensure notation is consistent

3. **Improve clarity (10 min)**
   - Remove jargon or define it
   - Simplify long sentences
   - Add "why this matters" statements
   - Fix any weak analogies

4. **Final proofread (5 min)**
   - Spell check
   - Grammar
   - Formatting (headers, bullets, tables)

**Expected result:** 50% of content needs light editing, 30% needs rewriting, 20% is publication-ready as-is.

---

## Part 6: Content Structure in Codebase

```
/content
  /topics
    linear-regression.md
    multiple-regression.md
    gradient-descent.md
    ... (44 total)
  
  /metadata
    topics.json          # Topic definitions, prerequisites, learning outcomes
    dependencies.json    # Topic dependency graph
    difficulty.json      # Difficulty ratings
  
  /resources
    resources.json       # External resources for each topic
  
  /roadmaps
    ml-engineer.json     # Roadmap definitions with topic ordering
    dl-engineer.json
    llm-engineer.json
```

**Example topics.json:**
```json
{
  "topics": [
    {
      "id": "linear-regression",
      "title": "Simple Linear Regression",
      "difficulty": "beginner",
      "duration_hours": 4,
      "prerequisites": ["algebra", "basic-statistics"],
      "learning_outcomes": [
        "Fit a regression line using OLS",
        "Interpret regression coefficients",
        "Identify and calculate residuals"
      ],
      "slug": "linear-regression"
    }
  ]
}
```

---

## Part 7: Quality Assurance Pipeline

### Before Launch QA (Per Topic)

1. **Accuracy Check**
   - [ ] All math verified
   - [ ] All code examples run
   - [ ] All citations correct

2. **Pedagogy Check**
   - [ ] Covers all learning outcomes
   - [ ] Prerequisites listed and correct
   - [ ] No unexplained jumps
   - [ ] Has real-world example

3. **Clarity Check**
   - [ ] Read aloud (sounds natural?)
   - [ ] One colleague reads (makes sense?)
   - [ ] Jargon defined or explained

4. **Structure Check**
   - [ ] All required sections present
   - [ ] Formatting consistent
   - [ ] No broken links

**Time per topic:** 15-20 min

---

## Part 8: Cost Analysis

### Option A: Do It Yourself (Solo)
- **Time:** 44 topics × 2 hours = 88 hours
- **Cost:** Your time (~$2,000-3,000 opportunity cost if freelance rate)
- **Quality:** High (you're familiar with material)
- **Speed:** 8-12 weeks part-time

### Option B: AI-Assisted (Recommended)
- **Claude API cost:** 44 topics × $0.15-0.30/topic = ~$7-13
- **Your editing time:** 44 topics × 0.5 hours = 22 hours (~$500-700)
- **Total cost:** ~$550-750
- **Quality:** Very high (AI draft + your refinement)
- **Speed:** 4-6 weeks

### Option C: Freelance Writers
- **Cost:** 44 topics × $50-100 per topic = $2,200-4,400
- **Your QA time:** 44 topics × 0.25 hours = 11 hours
- **Total cost:** ~$2,500-4,500
- **Quality:** Variable (depends on hiring)
- **Speed:** 3-4 weeks

**Recommendation:** Option B (AI-Assisted). Best ROI for solo founder.

---

## Part 9: Iteration After Launch

### Week 1-4 Post-Launch
- Collect user feedback on content clarity
- Track which topics users struggle with
- Identify missing explanations
- Fix errors and ambiguities

### Feedback Loop
```
User reads topic
     ↓
Completes quiz (if applicable)
     ↓
Rates clarity (1-5 stars)
     ↓
Optional: "This confused me because..."
     ↓
You review feedback, edit topic
     ↓
Re-publish
```

**High-priority edits:**
- Any math errors (fix immediately)
- Jargon without definition (clarify)
- Missing worked examples (add)
- "Common mistakes" section too abstract (make concrete)

---

## Part 10: Scaling Beyond Launch

### Monthly Content Additions
- Add 2-3 new topics per month
- Maintain existing content (reviews, updates)
- Respond to user feedback
- Keep math/code examples up-to-date

### When to Hire Help
- After 100+ active users requesting new topics
- When editing becomes bottleneck
- When you need specialized expertise (research papers, advanced topics)

---

## Quick Start (This Week)

**Day 1-2:**
- [ ] Pick 3 topics you know best
- [ ] Write them manually (2-4 hours total)
- [ ] This is your quality baseline

**Day 3-4:**
- [ ] Set up Claude API (15 min)
- [ ] Generate AI draft for 1 topic (5 min)
- [ ] Edit AI draft (30 min)
- [ ] Compare AI output to manual writing
- [ ] Refine prompt based on results

**Day 5:**
- [ ] Decide: pure manual, AI-assisted, or hybrid?
- [ ] Commit to timeline
- [ ] Start batch generation if going AI route

---

## The Reality Check

**Writing 44 topics of PrepLoom quality:**
- Manual only: 10-12 weeks solo (burnout risk)
- AI-assisted: 4-6 weeks solo (sustainable)
- Hybrid + freelancer: 3-4 weeks (higher cost)

**What NOT to do:**
- Don't launch with 44 half-baked topics
- Don't outsource without quality checks
- Don't use pure AI without editing (it shows)
- Don't launch without user feedback cycle

**What TO do:**
- Launch with 15-20 polished topics
- Use AI for drafts, not final content
- Edit ruthlessly before launch
- Get feedback and iterate
- Add 2-3 topics per month

---

## Final Note

**The differentiator is content quality + structure.**

PrepLoom works because every topic is:
1. Self-contained (can read just this topic)
2. Rigorous (math is correct, examples check out)
3. Pedagogical (teaches reasoning, not just facts)
4. Connected (prerequisites clear, next steps obvious)

Rushing 44 mediocre topics beats launching 0 topics. But 15 excellent topics beats 44 mediocre ones.

Start with quality. Scale thoughtfully. Use AI to save time, not to replace thinking.

---

