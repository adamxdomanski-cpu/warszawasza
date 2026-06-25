# Referendum domain — technical architecture

**Layer 2 · technical (not normative law)**

> Describes **how** referendum data could be modeled alongside the electoral domain — not **whether** a referendum should be held or how citizens should vote. Normative context: [`REFERENDUM_NORMATIVE.md`](./REFERENDUM_NORMATIVE.md). Electoral base: [`ARCHITECTURE.md`](./ARCHITECTURE.md) · [`backend/sql/005_electoral_domain.sql`](../../backend/sql/005_electoral_domain.sql).

---

## Design order

```
Domain tree → SQL (007) → Audit views (006 patterns) → API → Interface
     │              │                    │                 │        │
     └──────────────┴────────────────────┴─────────────────┴────────┘
              REFERENDUM_ARCHITECTURE.md (this file)
              backend/sql/007_referendum_domain.sql
              fira/electoral/AUDIT_ARTIFACTS.md (referendum section)
              (API + UI: future — no /referendum glyph UI)
```

Do **not** embed quorum thresholds, campaign language, or binding verdicts in SQL comments or seed data.

---

## Domain tree

```
Referendum (referendums)
├── ReferendumQuestion (referendum_questions)
├── District → PollingStation → BallotBox → ReferendumBallot
│    └── (005) electoral_districts → polling_stations → ballot_boxes
│         └── (007) referendum_ballot_stream
└── AuditRecord (referendum_audit_records)
```

Referendum does **not** duplicate district or station tables. Territorial units come from [`005_electoral_domain.sql`](../../backend/sql/005_electoral_domain.sql). A referendum ballot event attaches to an existing `ballot_boxes.box_id`.

---

## Entity → table map

| Domain entity | PostgreSQL object | Notes |
|---------------|-------------------|-------|
| Referendum | `referendums` | `title`, `execution_date`, `legal_basis` (citation text) |
| ReferendumQuestion | `referendum_questions` | `question_number` unique per referendum |
| BallotBox | `ballot_boxes` | **005** — shared with parliamentary elections |
| ReferendumBallot | `referendum_ballot_stream` | Append-only; `vote_value` ∈ TAK, NIE, INVALID |
| AuditRecord | `referendum_audit_records` | Parallel to `election_audit_records` |
| Live analytics | `v_referendum_live_analytics` | Derived tallies — non-authoritative |

---

## Entity → stream → analytics

```
referendums
    │
    ├── referendum_questions ─────────────┐
    │                                      │
    └── referendum_audit_records         │
                                           ▼
ballot_boxes (005) ──► referendum_ballot_stream (events)
                                           │
                                           ▼
                              v_referendum_live_analytics (read model)
```

### Ballot stream invariants

1. **No voter PII** — same zero-PII policy as `ballot_event_stream` ([`backend/sql/README.md`](../../backend/sql/README.md)).
2. Each event: `box_id`, `question_id`, `vote_value`, `previous_hash`, `current_hash`, `timestamp`.
3. `current_hash` UNIQUE — duplicate chain links fail on insert.
4. `vote_value` CHECK — only `TAK`, `NIE`, `INVALID`.
5. Interim tallies in the view are **organizational observation**, not PKW results.

---

## FK to `ballot_boxes` (005)

```text
referendum_ballot_stream.box_id  →  ballot_boxes.box_id
ballot_boxes.station_id          →  polling_stations.station_id
polling_stations.district_id     →  electoral_districts.district_id
```

`v_referendum_live_analytics.district_breakdown` aggregates through this join path. No `referendum_id` column on districts — geographic scope is implied by which boxes receive stream events for a given referendum’s questions.

**Operational note:** Production would need an explicit scope policy (which elections/districts participate in a referendum day). That policy is application configuration, not enforced in `007`.

---

## View: `v_referendum_live_analytics`

| Column | Meaning |
|--------|---------|
| `tak_count`, `nie_count`, `invalid_count` | Raw event counts per question |
| `valid_ballots` | TAK + NIE only |
| `tak_share_valid`, `nie_share_valid` | Descriptive ratios over valid ballots |
| `district_breakdown` | JSON array of per-district counts (via 005 chain) |
| `tally_status` | `PENDING` (no events) or `ACTIVE` (≥1 event) |

The view does **not** compute quorum satisfaction or binding pass/fail. See [`REFERENDUM_NORMATIVE.md`](./REFERENDUM_NORMATIVE.md).

---

## Audit artifacts (referendum)

Published audit surfaces reuse the **measurable** pattern from [`AUDIT_ARTIFACTS.md`](./AUDIT_ARTIFACTS.md):

| Artifact | Referendum source |
|----------|-------------------|
| `integrity_hash` | Tip of `referendum_ballot_stream.current_hash` per `(box_id, question_id)` chain |
| `audit_log_stream` | `referendum_audit_records` ordered export |
| `determinism_proof` | Future: canonical JSON of question tallies + hash for third-party replay |

**Rejected for electoral/referendum layer:** narrative glyph bars (`■■■■■`) or ASCII progress UI tied to official results. Infrastructure COP may still use FOP notation elsewhere; referendum audit stays structured fields only.

---

## Migration

Apply after `001` and `005`:

```bash
psql "$DATABASE_URL" -f backend/sql/007_referendum_domain.sql
```

Verify:

```bash
psql "$DATABASE_URL" -c "\d referendums"
psql "$DATABASE_URL" -c "\d referendum_ballot_stream"
psql "$DATABASE_URL" -c "SELECT question_number, tak_count, nie_count, tally_status FROM v_referendum_live_analytics LIMIT 5;"
```

---

## API surface (future)

No FastAPI routes today. When wired:

- `GET /referendum/{referendum_id}/analytics` — read `v_referendum_live_analytics`
- `POST /referendum/{referendum_id}/stream` — append `referendum_ballot_stream` (commission role only)
- `GET /referendum/{referendum_id}/audit` — `referendum_audit_records`

---

## Related

- [`REFERENDUM_NORMATIVE.md`](./REFERENDUM_NORMATIVE.md) — Art. 235 context, quorum as education
- [`AUDIT_ARTIFACTS.md`](./AUDIT_ARTIFACTS.md) — integrity_hash, audit_log_stream, determinism_proof
- [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md) — parliamentary election ER (005)
- [`backend/sql/006_electoral_audit_views.sql`](../../backend/sql/006_electoral_audit_views.sql) — election audit view patterns
