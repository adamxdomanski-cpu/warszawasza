# Electoral protocol — COP / FIRA lens

**Layer 3 · philosophy (project identity)**

> How WARSZAWASZA observes electoral **processes** — signal, noise, orientation, transparency. This layer links normative questions and technical artifacts without mixing either into SQL or core algebra.

| Layer | File | Question it answers |
|-------|------|---------------------|
| Normative | [`MANIFEST_DRAFT.md`](./MANIFEST_DRAFT.md) | *What rules might we propose?* |
| Technical | [`ARCHITECTURE.md`](./ARCHITECTURE.md) | *How would data be stored and verified?* |
| Philosophy | this document | *Why does COP care, and what is out of scope?* |

---

## OBSERWACJA TRWA

Electoral systems generate enormous **noise**: slogans, predictions, parallel counts, social-media fragments. COP does not add more noise. It asks:

**Co z tego wynika dla obserwatora?**

| Signal (TRUE) | Noise (FALSE) |
|---------------|---------------|
| Published candidate registry delta | Anonymous rumor of “list swap” |
| Staged result with audit stage label | Live tally without commission context |
| Funding disclosure timestamp | Unverified donor meme |
| FOP fingerprint of a deliberation ballot | Claim of “official election result” on `/deliberation` |

---

## FOP chain (electoral context)

```
○ → ● → ◐ → ◉ → ≈ → ✓ → ■ → OUTPUT
```

| Stage | Electoral reading |
|-------|-------------------|
| ○ Reality | Election law + physical ballots exist |
| ● Signal | Registration change, stream event, funding filing |
| ◐ Observation | Operator or citizen records metric without identity |
| ◉ Filtration | Drop PII, drop partisan interpretation from persistence |
| ≈ Memory | Compare to prior election snapshot / archive anchor |
| ✓ Validation | Cross-check stream hash vs published protocol metadata |
| ■ Knowledge | Aggregated result with explicit uncertainty |
| OUTPUT | Narration / hypothesis — not mandate to govern |

Core algebra stays in `fira/core/` — **no import** of electoral tables or Polish law.

---

## Transparency without false authority

WARSZAWASZA is a **distribution** of the FIRA Observation Protocol:

- [`/deliberation`](https://www.warszawasza.online/deliberation) — graphene deliberation instrument; each vote is an FOP observation (`frontend/lib/grapheneVote.ts`)
- `/electoral-lab` (optional) — pointer to docs; **not** PKW, **not** official results

Principles:

1. **Instrument, not platform** — listening + trace export, not zgłoszenia urzędowe
2. **Honest uncertainty** — hypothesis %, not victory calls
3. **Zero voter PII** on any stream persisted to PostgreSQL
4. **Separation** — manifest trade-offs never appear as SQL `CHECK` constraints tied to policy

---

## Relation to State Data Matrix

Public issuers (`state_registry_nodes`) may ground **provenance** of electoral-adjacent metrics (KRS for committees, MF for disclosures, NIK for audit reports) via `civic_observations.source_node_id`. That is **infrastructure observation**, not ballot storage.

See [`fira/STATE_DATA_MATRIX.md`](../STATE_DATA_MATRIX.md).

---

## Relation to COP-JSON / Memory

Historical protocols and maps belong in the **Memory / Palimpsest** rail as metadata signatures — not full scans in COP tables.

See [`fira/COP_ARCHIVE_JSON.md`](../COP_ARCHIVE_JSON.md) and `state_archives`.

---

## Antywzorce

- ❌ Normative thresholds in migration comments
- ❌ `fira/core/` imports of `electoral_*` tables
- ❌ `/deliberation` labeled as official voting
- ❌ `verification_hash` marketed as anonymity without crypto spec
- ❌ Glyph evidence bars on electoral audit (use structured audit records)

---

## Cross-links

- [`MANIFEST_DRAFT.md`](./MANIFEST_DRAFT.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md)
- [`fira/PROTOCOL.md`](../PROTOCOL.md)
- [`backend/sql/README.md`](../../backend/sql/README.md)
