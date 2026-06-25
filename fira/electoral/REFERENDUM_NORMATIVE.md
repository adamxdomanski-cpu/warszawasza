# Constitutional referendum — normative reference layer

**Layer 1 · educational context (not legal advice)**

> This document cites **public constitutional framing** for deliberation and system design. It is **not** binding legal advice, not an electoral campaign document, and not encoded in SQL. Technical persistence: [`REFERENDUM_ARCHITECTURE.md`](./REFERENDUM_ARCHITECTURE.md) · [`backend/sql/007_referendum_domain.sql`](../../backend/sql/007_referendum_domain.sql).

---

## Scope disclaimer

WARSZAWASZA models **observation infrastructure** — how referendum events, ballot streams, and audit artifacts could be recorded and replayed. It does **not**:

- declare referendum outcomes,
- advise citizens how to vote,
- substitute for Państwowa Komisja Wyborcza (PKW) or courts,
- assert that any threshold in this file is currently satisfied in law or practice.

When in doubt, consult official legal sources and qualified counsel.

---

## Art. 235 Konstytucji RP — reference context

The Constitution of the Republic of Poland provides a **framework** for national referendums (among other forms of direct participation). Article 235 is commonly cited when discussing:

- who may order a national referendum (e.g. Sejm, Senate, President — subject to conditions in the constitutional text),
- that referendum questions concern matters of particular importance to the State,
- procedural requirements that implementing statutes must detail.

**For this project:** `referendums.legal_basis` stores a **text citation** (fact: “this row was scoped under citation X”). The database does not evaluate whether a given referendum was constitutionally valid.

---

## Quorum and majorities — educational tradeoffs

Real referendum binding force depends on **statutory and constitutional rules** that can change and that require legal interpretation. The table below lists **concepts** often discussed in civic education — not parameters enforced by WARSZAWASZA SQL.

| Concept | Typical discussion | System implication |
|---------|-------------------|-------------------|
| **Participation quorum** | Minimum turnout for validity | Not computed in `v_referendum_live_analytics`; normative only |
| **Majority of valid votes** | TAK vs NIE among non-invalid ballots | View exposes `tak_share_valid` / `nie_share_valid` as **descriptive ratios** — not “passed/failed” |
| **Invalid ballots** | Spoiled or ambiguous marks | Stream value `INVALID`; excluded from valid-share denominator in the view |
| **Multiple questions** | Separate questions on one ballot day | One `referendum_questions` row per question; tallies are per `question_id` |
| **Territorial aggregation** | National vs regional reporting | `district_breakdown` JSON in the view — derived from 005 geography |

Design choice: **separate counting from binding verdict.** The protocol can show interim counts; declaring a result “binding” belongs to commission law and published official protocols — outside this schema.

---

## Apolitical posture

| Allowed in normative layer | Forbidden in normative layer |
|----------------------------|------------------------------|
| Explaining constitutional **structure** | Advocacy for TAK/NIE |
| Trade-off tables for civic literacy | Party or campaign messaging |
| “What would need to be true for quorum X” as thought experiment | Presenting thought experiments as current law |
| Links to official legal texts | Implying WARSZAWASZA outputs are official |

---

## Relation to other layers

| Layer | File |
|-------|------|
| Normative (this file) | `REFERENDUM_NORMATIVE.md` |
| Technical | `REFERENDUM_ARCHITECTURE.md` |
| Audit artifacts | `AUDIT_ARTIFACTS.md` (referendum extensions) |
| COP / FIRA identity | `COP_LENS.md` |
| FOP deliberation UI | `/deliberation` — separate from referendum SQL |

---

## Related official sources (external)

Consult current consolidated texts and PKW publications for authoritative rules. This repository does not mirror or supersede them.
