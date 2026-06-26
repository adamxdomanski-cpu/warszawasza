# FIRA Log Format DRAFT v1.0

> **Canonical handbook:** [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) — three documentation levels (LOG / DECISION / CODE), four human questions, DECISION block, examples, scope.

**Status:** DRAFT v1.0 — five-field template. Read time target: **~10–15 s**. Revise after real test entries, not on narrative grounds.

---

## Template structure (DRAFT v1.0)

| Field | Role |
|-------|------|
| **PROCESS** | Operation that ran |
| **VALIDATION** | Observable system state (not success declaration) |
| **OUTPUT** | Result |
| **NEXT STEP** | Required next action |
| **ARTIFACT** | File path when applicable |

Do not add fields, rename sections, or merge VALIDATION into OUTPUT without a version bump.

---

## Block template

```
PROCESS
──────────────
<operation that ran>

VALIDATION
──────────────
<observable system state — one line per check>

OUTPUT
──────────────
<result>

NEXT STEP
──────────────
<single required next action>

ARTIFACT
──────────────
<concrete path or N/A>
```

---

## Three levels (summary)

| Level | Block | Purpose |
|-------|-------|---------|
| **LOG** | Five fields below | Observable facts only |
| **DECISION** | `Decision:` + `Reason:` | Why we chose this (ADR-lite) — **replaces COMMENTARY** |
| **CODE** | repo diff | Implementation |

Flow: **Decision → Log → Code**. Never mix evaluative prose into LOG.

## COP rule (one line)

**LOG block** = observable state only — no interpretations inside PROCESS / VALIDATION / OUTPUT / NEXT STEP / ARTIFACT.

| Good | Bad |
|------|-----|
| `Input Queue ✓ EMPTY` | `City is calm.` |

Full rule, DECISION template, four-question mapping: [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) · examples: [`fira/DECISION_RECORD.md`](./DECISION_RECORD.md).

---

## Related

- **Handbook (canonical):** [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md)
- Decision records: [`fira/DECISION_RECORD.md`](./DECISION_RECORD.md)
- Project status blocks: [`fira/TF_KEY.md`](./TF_KEY.md)
- Legacy block variant (STATE/SPEC/TARGET): [`fira/OPERATIONAL_LOG.md`](./OPERATIONAL_LOG.md)
- FOP observation notation: [`fira/PROTOCOL.md`](./PROTOCOL.md)
