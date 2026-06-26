# Operational Log Format

> **Normative (frozen):** [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) — Log Format v1.0 handbook.  
> Quick ref: [`fira/LOG_FORMAT_v1.0.md`](./LOG_FORMAT_v1.0.md). This file adds lifecycle and validation check guidance; it does not alter the v1.0 block structure.

Standard status notation for COP / WARSZAWASZA. Replaces mixed `PROCESSING FLUX` / `FOCUS` / `STATUS` strings.

Use in CI output, operator notes, and `fira/TF_KEY.md`.

---

## Block template

See [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) · [`LOG_FORMAT_v1.0.md`](./LOG_FORMAT_v1.0.md). Fixed sections:

`PROCESS` · `VALIDATION` · `OUTPUT` · `NEXT STEP` · `ARTIFACT`

**ARTIFACT:** `N/A` when no file applies; concrete path when it does (never `None`).

**COP:** Log describes only observable state — no interpretations, forecasts, evaluations, or metaphors.

---

## State lifecycle (PROCESS / TARGET context)

```
DRAFT → REVIEW → VERIFIED → IMPLEMENTED → DEPLOYED
```

| State | Meaning |
|-------|---------|
| **DRAFT** | Spec or code exists locally; not reviewed |
| **REVIEW** | Under review (PR, spec audit, operator check) |
| **VERIFIED** | Passes validation against spec; not yet wired or live |
| **IMPLEMENTED** | Built and testable in repo / CI |
| **DEPLOYED** | Live in target environment (Vercel, DB, vault sync) |

---

## Work principle

**Spec → Code → Test → Observation → Fix**

Do not add manifest layers, glyph progress bars, or narrative status strings when this block suffices.

---

## Validation semantics

Optional sub-lines under **VALIDATION** (observable checks only):

| Check | Question |
|-------|----------|
| **Syntax** | Parses / builds / applies without error |
| **Flow** | End-to-end path works for the stated target |
| **Consistency** | Aligns with COP spec and related artefacts |

**COP compliance** = passes criteria defined in the spec (notation, anti-patterns, zero-PII, layer boundaries). It is **not** objective proof of optimality, correctness in production, or official institutional authority.

---

## Example

```
PROCESS
──────────────
COP validator CI · scripts/cop-validate.sh

VALIDATION
──────────────
Syntax        ✓
Flow          ✓
Consistency   ✗ — report format still legacy FLUX

OUTPUT
──────────────
Scanner runs on PR; operator report format pending migration.

NEXT STEP
──────────────
Replace PROCESSING FLUX echoes with Log Format v1.0 block in workflow.

ARTIFACT
──────────────
.github/workflows/cop-validator.yml
```

---

## Related

- Handbook (canonical): [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md)
- Frozen spec (quick ref): [`fira/LOG_FORMAT_v1.0.md`](./LOG_FORMAT_v1.0.md)
- Current project status: [`fira/TF_KEY.md`](./TF_KEY.md)
- FOP spec: [`fira/PROTOCOL.md`](./PROTOCOL.md)
