# Operational Log Format

Standard status notation for WARSZAWASZA / COP. Replaces mixed `PROCESSING FLUX` / `FOCUS` / `STATUS` strings.

Use in CI output, operator notes, and `fira/TF_KEY.md`.

---

## Block template

```
PROCESS
──────────────
STATE        ● VERIFIED | DRAFT | REVIEW | IMPLEMENTED | DEPLOYED
SPEC         COP v1.0
TARGET       (channel / component)
NEXT STEP    (single actionable step)

VALIDATION
──────────────
Syntax        ✓ | ✗
Flow          ✓ | ✗
Consistency   ✓ | ✗

OUTPUT
──────────────
(one line outcome)
```

---

## State lifecycle

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

| Check | Question |
|-------|----------|
| **Syntax** | Parses / builds / applies without error |
| **Flow** | End-to-end path works for the stated TARGET |
| **Consistency** | Aligns with COP spec and related artefacts |

**COP compliance** = passes criteria defined in the spec (notation, anti-patterns, zero-PII, layer boundaries). It is **not** objective proof of optimality, correctness in production, or official institutional authority.

---

## Example

```
PROCESS
──────────────
STATE        ● REVIEW
SPEC         COP v1.0
TARGET       scripts/cop-validate.sh
NEXT STEP    replace PROCESSING FLUX echoes with this block in CI

VALIDATION
──────────────
Syntax        ✓
Flow          ✓
Consistency   ✗

OUTPUT
──────────────
Scanner runs on PR; report format still legacy
```

---

## Related

- Current project status: [`fira/TF_KEY.md`](./TF_KEY.md)
- FOP spec: [`fira/PROTOCOL.md`](./PROTOCOL.md)
