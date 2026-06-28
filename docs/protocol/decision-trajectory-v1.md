# Interaction trace v2 · EVENT → TRACE → PATTERN → HYPOTHESIS

> **Reality → Events → Trace → Pattern → Hypothesis → Human**  
> Interface-agnostic. TRUE/FALSE is one `SELECT` value, not a separate event type.

Powiązane: [`core-and-adapters-v1.md`](../identity/core-and-adapters-v1.md) · implementacja: `frontend/lib/interactionTrace.ts` · typy: `fira/core/interaction.ts`

---

## EVENT vs TRACE

| | EVENT | TRACE |
|---|--------|--------|
| **What** | Single fact | Ordered record of facts |
| **Example** | `SELECT` + value `TRUE` | `START → SELECT(TRUE) → NEXT → BACK → SELECT(FALSE) → COMPLETE` |

System **registers traces**. It does not store psychology.

---

## Event kinds (universal)

| Kind | Value | Use |
|------|-------|-----|
| `START` | — | Trace opens |
| `SELECT` | any string | Choice: `TRUE`, `FALSE`, `Mokotów`, `ZNAJDŹ_WODĘ`, `Linia M2` |
| `CHANGE` | any string | Explicit value change (optional) |
| `NEXT` | — | Forward |
| `BACK` | — | Return |
| `PAUSE` | — | Hesitation / hold |
| `RESUME` | — | Continue after pause |
| `EXIT` | — | Abandon |
| `COMPLETE` | — | Trace closed (export) |

JSON fact:

```json
{ "event": "SELECT", "value": "ZNAJDŹ_WODĘ", "at": 1719580200000 }
```

Quiz, form, map, Jira, mobile — same alphabet.

---

## Layers

```
Reality
    ↓
EVENTS (facts)
    ↓
TRACE (ordered events)
    ↓
PATTERN (detected structure — still observation-level)
    ↓
HYPOTHESIS (provisional — Human validates)
    ↓
VALIDATION (FIELD)
```

Functions: `detectTracePatterns()` · `suggestTraceHypotheses()` — hypotheses never unlabeled in citizen UI.

---

## FOP / export

- `signal.trace_path` — compact, e.g. `S|T|N|B|F|C`
- Full `traceEvents[]` in observation payload — SYSTEM layer

---

## Antywzorce

- ❌ `ANSWER_TRUE` as a core type (use `SELECT` + value)
- ❌ „User learned / is interested” in observation log
- ❌ Purpose restrictions in kernel — scope in [`project.md`](../project.md)

---

*v2 · EVENT/TRACE · MNE: few kinds, full path*
