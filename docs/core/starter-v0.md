# COS · kernel + project module

> **Universal kernel:** [`.cursor/rules/core.mdc`](../.cursor/rules/core.mdc) (~150 words, any project)  
> **WARSZAWASZA module:** [`.cursor/rules/warszawasza.mdc`](../.cursor/rules/warszawasza.mdc) (this repo only)  
> **Full BABCIA OS (on demand):** [`babcia-os-v1.md`](../identity/babcia-os-v1.md)

---

## Two layers (minimum necessary effort)

Stack design: not “lowest energy” (dead equilibrium) — **smallest effort needed to reach the goal**, without losing contact with reality.

```
AXIOMS          → docs (human)
CORE RULES      → .cursor/rules/core.mdc        alwaysApply
PROJECT MODULE  → .cursor/rules/warszawasza.mdc   globs: frontend, fira, backend, docs…
TASK CONTEXT    → your prompt + open files
ARTIFACT        → code / docs output
```

**Removed from kernel:** „Purpose in 20s”, Rolloutowo, persony, five functions — they live in **warszawasza.mdc** or `/docs`.

---

## What's in core (never project-specific)

- Reality validates · observation / hypothesis / conclusion
- Reduce cognitive resistance · remove useless abstractions
- **Minimum necessary effort:** reach the goal with least cognitive/computational/human cost; no self-inflicted friction
- System vs human · no anthropomorphizing AI
- Simple, explicit, observable, small diffs
- Update the model when evidence contradicts it
- **Evolvability:** rules are provisional; friction → improve process before adding rules; new rules need Field evidence; remove obsolete rules
- Loop: reality → observation → difference → update? → continue (no “final version”)

---

## What's in warszawasza module

- Five functions · Rolloutowo · Field loop
- CZŁOWIEK → SYSTEM comms
- FOP / observation-first / less noise
- Pointers to personas, critique protocol, BABCIA OS docs

---

## Other projects (future)

Copy **core.mdc** unchanged. Add `your-project.mdc` with globs — same pattern.

Legacy full rules: [`cursor-rules-full.json`](cursor-rules-full.json)

---

*BABCIA OS is an adaptive system — mechanism in core, project knowledge in modules · `/docs` for depth*
