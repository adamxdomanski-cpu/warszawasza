# CORE and adapters

> **Warsaw is not a language.** Warsaw is the first deployment. Language and interface are adapters.

---

## Stack

```
                    CORE (language-agnostic)
         Observation → Trajectory → Hypothesis → Validation
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   Deployment            Language            Interface
   (Warsaw today)        pl, en, it…         web, API, email…
   Berlin tomorrow        uk, fi, hu…         mobile, Jira…
```

**CORE** holds facts and structure. Adapters **render** — they do not change what was observed.

---

## Example (same model, many renders)

| Layer | Content (neutral) |
|-------|-------------------|
| **Observation** | `Temperature: 38°C` |
| **Hypothesis** | `High heat may increase park usage.` |
| **Render PL** | „Wysoka temperatura może zwiększyć liczbę osób w parkach.” |
| **Render EN** | “High temperature may increase park attendance.” |
| **Render IT** | “L'elevata temperatura potrebbe aumentare la presenza nei parchi.” |
| **Render UK** | „Висока температура може збільшити кількість людей у парках.” |

Hypothesis stays **provisional** until **Validation** (FIELD, Layer 0, human decision).

---

## Three adapters

### 1 · Deployment (place)

- Concrete city, district, GTFS, hydrants, RCB alerts.
- WARSZAWASZA = Warsaw first; swap seed/API for Gdańsk without touching CORE notation.
- Why start local: **reality is the final validator** — Dzielna workshop → Mokotów streets is the daily loop.

### 2 · Language

- Already exists in repo (`frontend/lib/i18n.ts`).
- Never store UI copy as the observation; store observation keys / values, render per `Lang`.

### 3 · Interface

- Desktop gate (T/F), heat field (`/field/heat`), trace mail, FOP block, future mobile.
- Same EVENT / TRACE model: [`protocol/decision-trajectory-v1.md`](../protocol/decision-trajectory-v1.md).

---

## Events → Trace → Pattern → Hypothesis → Human

```
Reality
    ↓
EVENT (SELECT, NEXT, BACK, … + optional value)
    ↓
TRACE (ordered events)
    ↓
PATTERN (detected structure — still factual)
    ↓
HYPOTHESIS (provisional)
    ↓
Human decides · FIELD validates
```

Implementation: `frontend/lib/interactionTrace.ts` · types: `fira/core/interaction.ts`.

---

## BABCIA OS vs WARSZAWASZA

| | BABCIA OS | WARSZAWASZA |
|---|-----------|-------------|
| What | Methodology · evolvable framework | Civic urban application |
| Scope doc | `babcia-os-v1.md`, `core.mdc` | **`project.md`** |
| Cursor | `core.mdc` (any project) | `warszawasza.mdc` (this repo) |

Purpose limits (no finance, no manipulation) belong in **`docs/project.md`**, not in the universal kernel.

---

*STABLE · adapters change · core stays small*
