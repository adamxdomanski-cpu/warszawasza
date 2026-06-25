# COP PostgreSQL schema (WARSZAWASZA)

Civic Observation Protocol v1.0 persistence for **objective infrastructure state** and **raw metric readings**. This layer is separate from the FIRA core (`fira/core/`) and the FastAPI drops engine (`backend/engine/`).

## Apply migrations

Requires PostgreSQL 13+ (or any version with `pgcrypto` / `gen_random_uuid()`).

```bash
# From repo root — replace with your connection string
# Order: 001 → 002 → 003 → 004 → 005 → 006 → 007 (003+ require pgcrypto from 001; 007 requires 005)
psql "$DATABASE_URL" -f backend/sql/001_cop_init.sql
psql "$DATABASE_URL" -f backend/sql/002_state_registry_nodes.sql
psql "$DATABASE_URL" -f backend/sql/003_state_archives.sql
psql "$DATABASE_URL" -f backend/sql/004_electoral_protocol.sql
psql "$DATABASE_URL" -f backend/sql/005_electoral_domain.sql
psql "$DATABASE_URL" -f backend/sql/006_electoral_audit_views.sql
psql "$DATABASE_URL" -f backend/sql/007_referendum_domain.sql
```

Or with explicit flags:

```bash
psql -h localhost -U cop -d warszawasza -f backend/sql/001_cop_init.sql
psql -h localhost -U cop -d warszawasza -f backend/sql/002_state_registry_nodes.sql
psql -h localhost -U cop -d warszawasza -f backend/sql/003_state_archives.sql
psql -h localhost -U cop -d warszawasza -f backend/sql/004_electoral_protocol.sql
psql -h localhost -U cop -d warszawasza -f backend/sql/005_electoral_domain.sql
psql -h localhost -U cop -d warszawasza -f backend/sql/006_electoral_audit_views.sql
psql -h localhost -U cop -d warszawasza -f backend/sql/007_referendum_domain.sql
```

**Idempotency:**

| File | Behaviour |
|------|-----------|
| `001_cop_init.sql` | Uses plain `CREATE` on tables/types. Run once on a fresh database. |
| `002_state_registry_nodes.sql` | Uses `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, and `ON CONFLICT DO NOTHING` on seeds. Safe to re-run after 001. |
| `003_state_archives.sql` | Uses `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, and `ON CONFLICT (document_signature) DO NOTHING` on seeds. Requires `001`. Safe to re-run. |
| `004_electoral_protocol.sql` | Legacy lab schema (`electoral_lab_config`, `electoral_candidates`, `electoral_ballot_stream`, views). **Deprecated for new domain work** — retained for migration order. Uses `IF NOT EXISTS`, `CREATE OR REPLACE`. Requires `001`. Safe to re-run. |
| `005_electoral_domain.sql` | Canonical electoral domain (`elections`, districts, stations, committees, funding, candidates, ballot stream, audit, mandates, results). Uses `IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`. Requires `001`. Does not drop `004` objects. Safe to re-run. |
| `006_electoral_audit_views.sql` | Audit read model (`v_ballot_box_integrity`, `v_audit_log_stream`, `v_election_determinism_input`). Uses `CREATE OR REPLACE`. Requires `001`, `005`. Safe to re-run. |
| `007_referendum_domain.sql` | Referendum domain (`referendums`, `referendum_questions`, `referendum_ballot_stream`, `referendum_audit_records`, `v_referendum_live_analytics`). FK to `ballot_boxes` from `005`. Uses `IF NOT EXISTS`, `CREATE OR REPLACE` view. Requires `001`, `005`. Safe to re-run. |

Verify:

```bash
psql "$DATABASE_URL" -c "\dt"
psql "$DATABASE_URL" -c "SELECT asset_domain, status FROM infrastructure_status;"
psql "$DATABASE_URL" -c "SELECT data_layer, count(*) FROM state_registry_nodes GROUP BY 1 ORDER BY 1;"
psql "$DATABASE_URL" -c "SELECT archive_source, document_signature, geographic_anchor FROM state_archives ORDER BY creation_year;"
psql "$DATABASE_URL" -c "SELECT * FROM v_operator_console LIMIT 5;"
psql "$DATABASE_URL" -c "SELECT * FROM v_electoral_live_results LIMIT 5;"
psql "$DATABASE_URL" -c "\d elections"
psql "$DATABASE_URL" -c "\d ballot_event_stream"
psql "$DATABASE_URL" -c "SELECT box_id, ballot_count, chain_head_hash, integrity_status FROM v_ballot_box_integrity LIMIT 5;"
psql "$DATABASE_URL" -c "\d referendums"
psql "$DATABASE_URL" -c "SELECT question_number, tak_count, nie_count, tally_status FROM v_referendum_live_analytics LIMIT 5;"
```

## Objects

| Object | Purpose |
|--------|---------|
| `infrastructure_status` | Domain/asset registry snapshots (WHOIS/RDAP public fields only) |
| `civic_observations` | Timestamped metric readings; optional links to asset + state node |
| `state_registry_nodes` | State Data Matrix — catalog of public-data issuers (14 seeded nodes) |
| `state_archives` | Memory / Palimpsest layer — archival signatures + geographic anchors (2 seeded records) |
| `state_data_layer` | Enum: KAPITALOWA \| KONTROLA \| FIZYCZNA \| TOZSAMOSCI |
| `v_operator_console` | FOP-style `notation_string` + `evidence_indicator` for operators |

Migration files: `001_cop_init.sql`, `002_state_registry_nodes.sql`, `003_state_archives.sql`, `004_electoral_protocol.sql`, `005_electoral_domain.sql`, `006_electoral_audit_views.sql`, `007_referendum_domain.sql`

### Electoral domain (004 + 005)

**Not PKW · not official election results.** Documentation: `fira/electoral/` (three layers):

| Layer | File |
|-------|------|
| Normative (proposals) | `fira/electoral/MANIFEST_DRAFT.md` |
| Technical (SQL/API) | `fira/electoral/ARCHITECTURE.md` · `DOMAIN_MODEL.md` · `REFERENDUM_ARCHITECTURE.md` |
| Referendum (normative) | `fira/electoral/REFERENDUM_NORMATIVE.md` |
| Philosophy (COP/FIRA) | `fira/electoral/COP_LENS.md` |

| Object | Purpose |
|--------|---------|
| `elections` | Root electoral event — type, date, `calculation_algorithm` |
| `electoral_districts` | Districts per election |
| `polling_stations` | Stations per district; `location_metadata` JSONB |
| `electoral_committees` | Committees per election |
| `funding_records` | Committee funding; `donor_hash_id` only (no raw PII) |
| `candidates` | Candidates linked to committee + optional district |
| `ballot_boxes` | Box per station; `ballot_box_status` enum |
| `ballot_event_stream` | Append-only cast events; hash chain columns — **no voter PII** |
| `election_audit_records` | Election-scoped audit log |
| `electoral_mandates` | Seat allocation outcomes |
| `election_results` | Published result payloads + optional verification hash |
| `electoral_lab_config` | *(004 lab only)* national district parameters |
| `electoral_candidates` | *(004 lab only)* open-list demo registry |
| `electoral_ballot_stream` | *(004 lab only)* verification_hash stream |
| `v_electoral_live_results` | *(004 lab only)* derived tally (non-authoritative) |
| `v_ballot_box_integrity` | *(006)* per-box hash-chain integrity |
| `v_audit_log_stream` | *(006)* ordered election audit export |
| `v_election_determinism_input` | *(006)* mandate replication input JSON |
| `referendums` | Referendum root — title, date, `legal_basis` citation text |
| `referendum_questions` | Questions per referendum |
| `referendum_ballot_stream` | Append-only TAK/NIE/INVALID events; FK `box_id` → `ballot_boxes` |
| `referendum_audit_records` | Referendum-scoped audit log |
| `v_referendum_live_analytics` | *(007)* interim per-question tallies (non-authoritative) |

Civic web instrument remains `/deliberation` (GrapheneVote) — separate from this schema. No `/referendum` glyph-bar UI for electoral/referendum audit layer.

## civic_observations ↔ state nodes

Each observation may reference:

- **`asset_ref`** → `infrastructure_status` — which FQDN/asset the metric describes (nullable).
- **`source_node_id`** → `state_registry_nodes` — which public issuer produced or grounds the metric (nullable).

Both FKs are optional. A WHOIS snapshot for `konstytucja.pl` might set `asset_ref` only; a KRS-derived entity-status reading would set `source_node_id = 'POL_NODE_KRS'` and optionally `asset_ref` if tied to a domain under observation.

Full layer map and open-data URLs: `fira/STATE_DATA_MATRIX.md`

## Zero-PII policy

**Allowed:** FQDN, registrar organization name, public NS hostnames, registry dates, DNSSEC/NASK flags, COP enums, metric categories, evidence integers 0–5, institution names, `POL_NODE_*` identifiers, `data_layer` labels, electoral hash columns (`current_ballot_hash`, `donor_hash_id`, `verification_artifact_hash`) and structured JSON payloads without identity fields.

**Forbidden — do not add columns or ingest data for:**

- Names of natural persons (subscribers, observers, operators, **voters**)
- Email addresses
- IP addresses (client, server, or resolver)
- Phone numbers
- Free-text fields that could hold personal narratives tied to identity
- User accounts / sessions / API keys in this schema

COP records **what the infrastructure looks like** and **which public registry grounded a metric**, not **who looked at it**.

## Backend wiring

`backend/api/main.py` has no database connection today. Do not add ORM or API endpoints until there is an explicit product need and a `DATABASE_URL` in deployment config.

## state_archives ↔ Memory layer

Archival retention stores **metadata and signatures only** — never full document copies. COP-JSON interchange format: `fira/COP_ARCHIVE_JSON.md`. Links to FOP Memory stage (≈, engineIndex 4) in `fira/PROTOCOL.md`.

Each row may anchor a historical reference point by `geographic_anchor` (e.g. `WARSZAWA_GLOBAL`, `SRD_MUR_01`) for palimpsest queries against contemporary field observations.

## Related docs

- `fira/PROTOCOL.md` — FOP notation
- `fira/electoral/` — electoral protocol (manifest · architecture · COP lens · domain model)
- `fira/ELECTORAL_PROTOCOL_DRAFT.md` — redirect stub (monolith split)
- `fira/COP_ARCHIVE_JSON.md` — COP-JSON archival retention format
- `fira/STATE_DATA_MATRIX.md` — State Data Matrix (Matryca Państwowa)
- `fira/FIELD_DOMAIN_konstytucja.md` — konstytucja.pl field artefact (seed domain)
