# Decision Records — COP / WARSZAWASZA

**Status:** DRAFT v1.0 · poziom 2 dokumentacji (Decision → Log → Code)

Handbook: [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md)

---

## Szablon

```
DECISION
──────────────
Decision: <krótki opis wyboru>
Reason: <uzasadnienie — punkty lub zdania>
```

Przykład języka inżynierskiego (nie ocena): *Wnioski z przeglądu zostały wprowadzone do bieżącej wersji specyfikacji.*

---

## DR-001 · LayerControl zamiast Mixer

```
DECISION
──────────────
Decision: LayerControl replaces Data Mixer (CH_A/F/H/G faders).
Reason: Prostsze nazewnictwo (włącz / wyłącz / waga 0–5). Zgodne z aktualną architekturą pipelineEngine.ts. Brak zaplecza DB dla czterech kanałów miksera w v1.0 — implementacja miksera odłożona na v2.0.
```

**Log powiązany:** build verify LayerControl · `frontend/lib/pipelineEngine.ts`  
**Draft miksera (historyczny):** [`fira/DATA_MIXER.md`](./DATA_MIXER.md)

---

## DR-002 · Log Format DRAFT v1.0

```
DECISION
──────────────
Decision: Five-field log template (PROCESS / VALIDATION / OUTPUT / NEXT STEP / ARTIFACT) as DRAFT v1.0.
Reason: Stan obecnej specyfikacji podlega dalszej ewolucji na podstawie danych z testów. Reguły ograniczają niespójność nazewnictwa — nie gwarantują braku dryfu koncepcyjnego.
```

**Handbook:** [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md)

---

## DR-003 · IDLE log: system state vs operator targets

```
DECISION
──────────────
Decision: IDLE / awaiting logs use NEXT STEP for system posture; operator menu lives in optional AVAILABLE TARGETS companion block.
Reason: NEXT STEP must answer "what does the system do next?" (e.g. Awaiting operator decision.) — not "what can the operator pick?" Merging numbered targets into NEXT STEP was the prior error. Frozen five-field LOG unchanged; AVAILABLE TARGETS is optional, IDLE/awaiting only. One language per LOG block (EN or PL); DECISION prose may stay PL.
```

**Handbook:** [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) · IDLE baseline + AVAILABLE TARGETS rule

---

## DR-004 · Cognitive interface information filter (LUCY)

```
DECISION
──────────────
Decision: LUCY idle log uses explicit abstraction tiers and a signal/noise filter before any UI copy or LOG line.
Reason:
  Canonical filter — after each information unit: does the operator know more about the situation than before? Yes = signal; no = noise (even if elegant).
  Auxiliary filters — (a) does this change my next action? (b) do I know more about the situation?
  Abstraction mixing risk — system state + process state + build exit code + operator menu in one view = two levels. Fix: AVAILABLE TARGETS separate (DR-003); document tiers: LOG facts / cognitive summary / technical detail on demand.
  NEXT STEP semantics — system does not execute; operator decides. IDLE: "Awaiting operator decision." — not action verbs, not numbered menu.
  Build presentation — cognitive VALIDATION: "Build ✓ Verified"; raw "exit 0" in ARTIFACT or expand-on-demand only.
  Terminal aesthetic trap — decorative depth that does not change operator action is noise.
  State delta — when prior state exists, VALIDATION carries delta lines (e.g. Build unverified → Build ✓ Verified).
  Design intent (not praise): short language rhythm; no spinners/toasts/popups; operator remains decider; extensible blocks; own idiom (not dashboard/IDE/Unix/Grafana).
```

**Handbook:** [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) · sekcja „Filtr interfejsu poznawczego (LUCY)”

---

## DR-005 · LUCY Cognitive Interface constitution (COP v1.0)

```
DECISION
──────────────
Decision: Adopt COP v1.0 — LUCY Cognitive Interface as normative UI constitution for operator-facing components.
Reason:
  LUCY is a cognitive interface — not dashboard, admin panel, or DevTools. Goal: maintain operator attention with minimal noise.
  Every line of code must answer: what new information does the operator get? None → remove.
  No decorative elements; no animation-for-animation — design behaviors, not animations.
  Signal/noise filters: remove what does not change decision, duplicates visible info, increases cognitive load, or is decoration only.
  Motion Policy — motion only on state change. Allowed: slow pulse, attention reaction, single signal appearance, time passage. Forbidden: continuous animation, flashy transitions, meaningless motion, attention-grabbing.
  Code: simple React, readable components, small functions, minimal state, native browser APIs; no new libs without justification.
  Commit gate — each change must improve noise reduction, clarity, simpler architecture, fewer elements, or consistency; otherwise reject.
  Architect role: disagree when inconsistent; propose simpler alternative. Priority: noise reduction over feature count. LUCY observes — does not grab attention.
  Extends DR-004 (LOG/copy filter) with full UI, motion, and implementation norms.
```

**Konstytucja (PL):** [`docs/protocol/lucy-cognitive-interface.md`](../docs/protocol/lucy-cognitive-interface.md) · **Cursor:** [`.cursor/rules/lucy-cognitive-interface.mdc`](../.cursor/rules/lucy-cognitive-interface.mdc)

---

## DR-006 · WARSZAWASZA operator chain (distribution layer 3)

```
DECISION
──────────────
Decision: Adopt map-as-thinking-tool and a six-operator chain (Orzeł → Kot → Lustro → Norka → Dratewka → Świat' → Orzeł) as WARSZAWASZA distribution lexicon; Lustro is an epistemic operator, not a graph node or fira/core import.
Reason:
  Map as thinking tool — workflow: data → map → structure discovery. Map is not illustration; it is where relations become visible. Words before images: Obsidian notes and prose precede visual layout; map follows written observation.
  Odwzorowanie vs reprezentacja — a mirror (Lustro) shows relation between observer and observed; it does not create a new world. Each mirror instance differs by context and placement; no single canonical mirror artifact.
  Operator chain (layer 3 only — frontend/distribution, NOT fira/core/):
    Orzeł — observation (signals from field).
    Kot — interpretation / hypotheses (operator-owned; not AI verdict, not automated conclusion).
    Lustro — epistemic operator: "What would have to be false for this conclusion to be wrong?" Applied across the graph; not a pipeline stage glyph or UI module.
    Norka — decision (binds world-state to operator choice).
    Dratewka — integration (craft/seam between layers; where observation meets action).
    Feedback — Świat' (post-decision world) returns to Orzeł; operational loop, not fractal recursion or Möbius fold.
  Moretti alignment — map/FIRA does not claim truth. It surfaces anomalies: "something doesn't fit — check." Explanation demand, not verdict.
  Layer rule — Orzeł, Kot, Norka, Dratewka = WARSZAWASZA operator lexicon (distribution i18n). Lustro = epistemic operator for the whole observation graph. None of these import into fira/core/; core remains city-agnostic algebra (Source → Signal → Process → Evidence → Relation → Result).
  Antipatterns — (a) map stops at analysis with no decision path; (b) Lustro implemented as standalone UI module or graph node; (c) Möbius pattern where interpretation folds back into observation undifferentiated; (d) treating operator chain as fira/core notation.
```

**Distribution:** `frontend/` · operator i18n · **Core boundary:** `fira/core/` unchanged
