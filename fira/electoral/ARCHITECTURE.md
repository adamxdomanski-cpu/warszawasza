# Electoral domain — technical architecture

**Layer 2 · technical (not normative law)**

> Describes **how** electoral data could be modeled, verified, and published — not **what** the law should say. Normative proposals live in [`MANIFEST_DRAFT.md`](./MANIFEST_DRAFT.md). COP/FIRA identity lives in [`COP_LENS.md`](./COP_LENS.md).

---

## Design order

```
Domain model → Relations → SQL → Audit views → API → Interface
     │            │         │         │          │        │
     └────────────┴─────────┴─────────┴──────────┴────────┘
              fira/electoral/DOMAIN_MODEL.md
              backend/sql/005_electoral_domain.sql
              backend/sql/006_electoral_audit_views.sql
              (API + UI: future, explicit product need)
```

Do **not** embed manifest thresholds, partisan labels, or legal mandates in SQL comments or seed data.

---

## Domain tree

```
Election (elections)
├── Committee (electoral_committees) ─── FundingRecord (funding_records)
├── District (electoral_districts)
│    └── PollingStation (polling_stations)
│         └── BallotBox (ballot_boxes)
│              └── Ballot event (ballot_event_stream)
├── Candidate (candidates)
├── Mandate (electoral_mandates)
├── AuditRecord (election_audit_records)
└── Result (election_results)
```

Full ER mapping: [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md).

---

## Entity → event stream → view

| Layer | Object | Role |
|-------|--------|------|
| Entity | `candidates`, `electoral_committees`, `ballot_boxes`, … | Slow-changing registration facts |
| Event stream | `ballot_event_stream` | Append-only cast events with hash chain (zero voter PII) |
| Audit stream | `election_audit_records` | Sequential operator / system log |
| Outcome | `electoral_mandates`, `election_results` | Calculated seats and published aggregates |
| View | `v_ballot_box_integrity`, `v_audit_log_stream`, `v_election_determinism_input` | Published audit read model (`006`) |

```
elections
    │
    ├── candidates ────────────────┐
    ├── electoral_committees       │
    ├── ballot_boxes ──────────────┼──► ballot_event_stream (hash chain)
    └── electoral_districts        │              │
                                   │              ├──► v_ballot_box_integrity
                                   │              ├──► v_election_determinism_input
                                   ├──► electoral_mandates
                                   ├──► election_results
                                   └── election_audit_records ──► v_audit_log_stream
```

Full artifact spec (formats, URLs, crypto honesty): [`AUDIT_ARTIFACTS.md`](./AUDIT_ARTIFACTS.md).

### Published audit view model

Electoral audit surfaces use **measurable parameters**, not glyph bars:

| Audit parameter | View / artifact | Replaces |
|-----------------|-----------------|----------|
| `integrity_hash` | `v_ballot_box_integrity.chain_head_hash` | Urn “health” metaphors |
| `integrity_status` | `VALID` / `BROKEN` / `PENDING` | Qualitative trust glyphs |
| `audit_sequence_id` | `v_audit_log_stream.audit_sequence_id` | Unordered log dumps |
| `determinism_checksum` | `v_election_determinism_input.determinism_checksum` | Opaque mandate tables |

Independent mandate replication: [`scripts/electoral_mandate_proof.py`](../../scripts/electoral_mandate_proof.py) (stdlib Python; not PKW).

### Ballot stream invariants

1. **No voter PII** — no name, PESEL, address, phone, email, IP, session token, or biometric handle.
2. Each event carries: `box_id`, `candidate_id`, `previous_ballot_hash`, `current_ballot_hash`, `timestamp`.
3. `current_ballot_hash` UNIQUE — one row per chain link; `v_ballot_box_integrity` verifies `previous_ballot_hash` links.
4. **Hash chain ≠ Merkle tree** — `merkle_root_hash` in audit views stays `NULL` until a Merkle spec is published. See [`AUDIT_ARTIFACTS.md`](./AUDIT_ARTIFACTS.md).
5. Live or interim tallies derived from the stream have **organizational implications** (parallel counts, embargo). Production needs commission rules and staged publication — not only SQL.

---

## Technical parameters (honest scope)

### `calculation_algorithm` on `elections`

Configurable per election row (e.g. `D_HONDT`, `SAINTE_LAGUE`, `HARE_NIEMEYER`). This is a **technical parameter** naming which allocator implementation to run — not a political endorsement of any electoral system. The allocator itself is application code, not defined in `005`.

### Hash chain on `ballot_event_stream`

`previous_ballot_hash` → `current_ballot_hash` links rows into an append-only chain. This is **not** a full Merkle tree unless a separate spec defines tree construction, leaf format, and root publication. Without that spec, validators can only check:

- per-row hash format (64 hex chars),
- uniqueness of `current_ballot_hash`,
- optional consistency of `previous_ballot_hash` with the prior row's `current_ballot_hash` (application-enforced).

Document the chosen crypto model before claiming tamper-evidence or third-party verifiability.

### `donor_hash_id` on `funding_records`

Stores a 64-character hex digest — **not** raw donor PII. Privacy depends entirely on the hash function, salt/pepper policy, and collision resistance defined outside this schema. SQL enforces format only; it does not define the hashing protocol.

### `verification_artifact_hash` on `election_results`

Optional digest of a published result artifact (canonical JSON, PDF hash, etc.). Same caveat: column presence ≠ verified election without an explicit artifact spec.

---

## Honest caveats (production gap list)

| Topic | In 005 | Real system needs |
|-------|--------|-------------------|
| Void / spoiled ballots | not modeled | Explicit void reasons, reconciliation with paper |
| Commission workflow | `operator_node_signature` on audit rows only | Quorum, challenge windows, role model |
| Protocol documents | not stored | Scanned protocols as separate artifact pipeline |
| Audit stages | `operation_type` free text | Pre-election, election-day, post-election, recount taxonomy |
| Recount | not automated | Immutable snapshot + diff against stream |
| Allocator | `calculation_algorithm` label | Tested implementation + reproducible inputs |
| Lab schema `004` | retained | `electoral_candidates` / `electoral_ballot_stream` — deprecated for new domain work |

Evidence in operator surfaces should use **structured audit fields** — not glyph bars like `■■■■■` (those remain in `v_operator_console` for infrastructure COP only).

---

## Verification model (draft)

| Artifact type | View / file | Key fields |
|---------------|-------------|------------|
| Integrity hash | `v_ballot_box_integrity` → `integrity/{box_id}.json` | `integrity_hash`, `integrity_status`, `integrity_model` |
| Audit log stream | `v_audit_log_stream` → `audit/stream.ndjson` | `audit_sequence_id`, `operation_type`, `audit_record_digest` |
| Determinism proof | `v_election_determinism_input` + `electoral_mandate_proof.py` | `determinism_input`, `determinism_checksum`, `calculation_algorithm` |
| Candidate registry snapshot | export | Public registration fields only |
| `election_results.result_payload` | staged | Aggregates per election (structure in payload) |
| `funding_records` | disclosure export | Committee-level amounts + `donor_hash_id` only |

Details: [`AUDIT_ARTIFACTS.md`](./AUDIT_ARTIFACTS.md).

Validators reject stream or funding ingest containing forbidden PII patterns (same policy as [`backend/sql/README.md`](../../backend/sql/README.md)).

---

## API surface (future)

No FastAPI routes today (`backend/api/main.py` has no DB). When wired:

- `GET /electoral/{election_id}/results` — read `election_results`, staged publication flag
- `POST /electoral/{election_id}/stream` — append `ballot_event_stream` row (authenticated commission role only)
- `GET /electoral/{election_id}/audit/stream` — `v_audit_log_stream`
- `GET /electoral/{election_id}/integrity` — `v_ballot_box_integrity`
- `GET /electoral/{election_id}/determinism/input` — `v_election_determinism_input`
- `GET /electoral/{election_id}/mandates` — `electoral_mandates`

All responses: public electoral facts only; never observer identity.

---

## Interface (future)

- **Current instrument:** [`/deliberation`](https://www.warszawasza.online/deliberation) — FOP deliberation, not this schema
- **Optional lab page:** `/electoral-lab` — disclaimer + links to this folder only
- Do not present SQL-derived tallies as official election results

---

## Related

- [`AUDIT_ARTIFACTS.md`](./AUDIT_ARTIFACTS.md) — three published artifact types, URL patterns, crypto honesty
- [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md) — ER diagram → table map
- [`backend/sql/005_electoral_domain.sql`](../../backend/sql/005_electoral_domain.sql) — canonical migration
- [`backend/sql/006_electoral_audit_views.sql`](../../backend/sql/006_electoral_audit_views.sql) — audit read-model views
- [`scripts/electoral_mandate_proof.py`](../../scripts/electoral_mandate_proof.py) — determinism replication (stdlib)
- [`backend/sql/004_electoral_protocol.sql`](../../backend/sql/004_electoral_protocol.sql) — deprecated lab schema (retained)
- [`fira/STATE_DATA_MATRIX.md`](../STATE_DATA_MATRIX.md) — state open-data provenance (orthogonal)
- [`fira/COP_ARCHIVE_JSON.md`](../COP_ARCHIVE_JSON.md) — archival metadata format
