# Electoral protocol — index

Three **separate layers**. Do not merge normative proposals into SQL or FIRA core.

| Layer | File | Scope |
|-------|------|-------|
| **1 · Normative** | [`MANIFEST_DRAFT.md`](./MANIFEST_DRAFT.md) | Reform proposals, trade-offs — *propozycja do analizy* |
| **2 · Technical** | [`ARCHITECTURE.md`](./ARCHITECTURE.md) · [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md) · [`REFERENDUM_ARCHITECTURE.md`](./REFERENDUM_ARCHITECTURE.md) | Domain model → SQL → API → UI |
| **1b · Referendum normative** | [`REFERENDUM_NORMATIVE.md`](./REFERENDUM_NORMATIVE.md) | Art. 235 context — educational, not legal advice |
| **3 · Philosophy** | [`COP_LENS.md`](./COP_LENS.md) | Signal, noise, transparency — COP/FIRA identity |

## SQL migrations

| Order | File | Role |
|-------|------|------|
| 004 | `backend/sql/004_electoral_protocol.sql` | Drop legacy lab schema (normative rules removed from SQL) |
| 005 | `backend/sql/005_electoral_domain.sql` | Canonical electoral domain tables |
| 006 | `backend/sql/006_electoral_audit_views.sql` | Audit views (integrity, audit stream, determinism) |
| 007 | `backend/sql/007_referendum_domain.sql` | Referendum domain + `v_referendum_live_analytics` |

Apply after `001` → `002` → `003`. See [`backend/sql/README.md`](../backend/sql/README.md).

## Civic instrument (not this schema)

- Web: [`/deliberation`](https://www.warszawasza.online/deliberation) — graphene deliberation, FOP notation
- Docs lab: [`/electoral-lab`](https://www.warszawasza.online/electoral-lab) — disclaimer + links only

## Related COP artefacts

- [`fira/STATE_DATA_MATRIX.md`](../STATE_DATA_MATRIX.md) — state open-data provenance
- [`fira/CIVIC_ORGANIZATION_MATRIX.md`](../CIVIC_ORGANIZATION_MATRIX.md) — third-sector org classes (WATCHDOG · LITERACY · URBAN · CIVIC_TECH); KRS via `POL_NODE_KRS`
- [`fira/COP_ARCHIVE_JSON.md`](../COP_ARCHIVE_JSON.md) — archival metadata format
- [`fira/PROTOCOL.md`](../PROTOCOL.md) — FOP algebra (`fira/core/` unchanged)

## Superseded monolith

`fira/ELECTORAL_PROTOCOL_DRAFT.md` — content split into this folder (June 2025 restructuring).
