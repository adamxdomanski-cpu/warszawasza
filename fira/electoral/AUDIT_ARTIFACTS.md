# Published Audit Artifacts — electoral domain

**Layer 2 · universal infrastructure (not normative law)**

> Replaces narrative glyph bars (`■■■■■`) with **measurable audit parameters**: `integrity_hash`, `audit_sequence_id`, `determinism_checksum`. Normative election proposals remain in [`MANIFEST_DRAFT.md`](./MANIFEST_DRAFT.md). Referendum normative context: [`REFERENDUM_NORMATIVE.md`](./REFERENDUM_NORMATIVE.md). Technical persistence: [`backend/sql/005_electoral_domain.sql`](../../backend/sql/005_electoral_domain.sql), [`007_referendum_domain.sql`](../../backend/sql/007_referendum_domain.sql). Views: [`backend/sql/006_electoral_audit_views.sql`](../../backend/sql/006_electoral_audit_views.sql).

---

## Separation: manifest vs infrastructure

| Document / layer | Role |
|------------------|------|
| [`MANIFEST_DRAFT.md`](./MANIFEST_DRAFT.md) | External **proposal** — thresholds, finance gates, citizen-facing claims |
| **This document** | **Universal infrastructure** — what any election modeled in 005 can publish for independent audit |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | How entities, streams, and views connect |

Manifest content must not be silently encoded as if it were law. Audit artifacts describe **what was recorded** and **how to replay** it.

---

## Three artifact types

### 1. Integrity Hash (Suma Kontrolna Urny)

**Purpose:** Detect tampering with the ballot event stream per urn (ballot box).

| Field | Source | Meaning |
|-------|--------|---------|
| `integrity_hash` | `v_ballot_box_integrity.chain_head_hash` | Tip of the per-box hash chain |
| `integrity_status` | `VALID` \| `BROKEN` \| `PENDING` | Chain link verification result |
| `integrity_model` | Always `HASH_CHAIN` in current schema | Crypto model label |
| `ballot_count` | Count of rows in `ballot_event_stream` for `box_id` | Events in chain |
| `merkle_root_hash` | `NULL` (reserved) | Not computed until a Merkle leaf-pairing spec is published |

**Crypto model (honest):**

- `005` stores a **sequential hash chain**: each `ballot_event_stream` row has `previous_ballot_hash` → `current_ballot_hash`.
- `v_ballot_box_integrity` verifies that the first row has `previous_ballot_hash IS NULL` and each subsequent row links to `LAG(current_ballot_hash)`.
- A **full Merkle tree** over the stream is **not** implied by `005`. Merkle would require a published spec (leaf canonicalization, pairing order, odd-leaf promotion). Until then, `merkle_root_hash` stays `NULL`.
- Marketing “Merkle verification” without that spec is **FALSE** for this schema.

**Published file:**

```text
artifacts/{election_id}/integrity/{box_id}.json
```

Example:

```json
{
  "artifact_type": "integrity_hash",
  "artifact_version": "cop-electoral-audit-1",
  "election_id": "8f3c2e1a-4b5d-6c7e-8f9a-0b1c2d3e4f5a",
  "box_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "integrity_hash": "9c3f…head",
  "integrity_model": "HASH_CHAIN",
  "integrity_status": "VALID",
  "ballot_count": 412,
  "merkle_root_hash": null
}
```

**URL pattern (distribution):**

```text
https://www.warszawasza.online/artifacts/electoral/{election_id}/integrity/{box_id}.json
```

---

### 2. Audit Log Stream

**Purpose:** Sequential, exportable index of commission / system operations (no voter PII).

| Field | Source | Meaning |
|-------|--------|---------|
| `audit_sequence_id` | `ROW_NUMBER()` per `election_id` in `v_audit_log_stream` | Stable export order |
| `operation_type` | `election_audit_records.operation_type` | e.g. `BOX_UNSEAL`, `VOTE_REGISTERED`, `ALGORITHM_TRIGGER` |
| `operator_node_signature` | Opaque node / role signature string | **Not** a natural-person name |
| `log_payload` | JSONB context | Box id, algorithm name, artifact refs — no voter identity |
| `audit_record_digest` | SHA-256 of canonical row fields | Export checksum |

**Published files:**

```text
artifacts/{election_id}/audit/stream.ndjson     # one JSON object per line, ordered by audit_sequence_id
artifacts/{election_id}/audit/stream.json     # optional array wrapper for small elections
```

Example line (NDJSON):

```json
{
  "audit_sequence_id": 3,
  "audit_id": "…",
  "election_id": "…",
  "recorded_at": "2026-06-25T18:04:12Z",
  "operation_type": "ALGORITHM_TRIGGER",
  "operator_node_signature": "node:calc-worker-02",
  "log_payload": {"calculation_algorithm": "D_HONDT", "district_number": 1},
  "audit_record_digest": "ab12…"
}
```

**URL pattern:**

```text
https://www.warszawasza.online/artifacts/electoral/{election_id}/audit/stream.ndjson
```

---

### 3. Determinism Proof

**Purpose:** Allow any third party to reproduce mandate assignment from published counts and config.

| Field | Source | Meaning |
|-------|--------|---------|
| `determinism_input` | `v_election_determinism_input.determinism_input` | Raw JSON input artifact |
| `determinism_checksum` | SHA-256 of `determinism_input::text` (PostgreSQL) | Verify download integrity |
| `calculation_algorithm` | `elections.calculation_algorithm` | `D_HONDT`, `SAINTE_LAGUE`, `HARE_NIEMEYER` |
| Replication script | [`scripts/electoral_mandate_proof.py`](../../scripts/electoral_mandate_proof.py) | Stdlib Python; **not PKW** |

**Algorithms (technical labels only):**

| Name | Status in proof script |
|------|------------------------|
| `D_HONDT` | Implemented |
| `SAINTE_LAGUE` | Stub (`NotImplementedError`) |
| `HARE_NIEMEYER` | Stub (`NotImplementedError`) |

**Published files:**

```text
artifacts/{election_id}/determinism/input.json
artifacts/{election_id}/determinism/proof.json          # optional: output of proof script
artifacts/{election_id}/determinism/electoral_mandate_proof.py   # copy of script version used
```

**URL pattern:**

```text
https://www.warszawasza.online/artifacts/electoral/{election_id}/determinism/input.json
```

**Replication workflow:**

```bash
psql "$DATABASE_URL" -t -A -c \
  "SELECT determinism_input FROM v_election_determinism_input WHERE election_id = '…'" \
  > input.json

python3 scripts/electoral_mandate_proof.py input.json --algorithm D_HONDT > proof.json
```

**Checksum note:** `determinism_checksum` in the SQL view is computed over PostgreSQL `jsonb::text`. The Python script uses its own canonical JSON for `--verify-checksum`. For byte-exact verification against a DB export, hash the served file bytes; do not re-serialize unless you document the canonicalization rules.

---

## Example determinism input JSON

Shape emitted by `v_election_determinism_input.determinism_input`:

```json
{
  "artifact_type": "determinism_input",
  "artifact_version": "cop-electoral-audit-1",
  "election_id": "8f3c2e1a-4b5d-6c7e-8f9a-0b1c2d3e4f5a",
  "election_type": "SEJM",
  "execution_date": "2026-10-15",
  "calculation_algorithm": "D_HONDT",
  "districts": [
    {
      "district_id": "d1111111-1111-1111-1111-111111111111",
      "district_number": 1,
      "seat_capacity": 12
    }
  ],
  "candidates": [
    {
      "candidate_id": "c1111111-1111-1111-1111-111111111111",
      "candidate_name": "Anna Example",
      "ballot_position": 1,
      "committee_id": "k1111111-1111-1111-1111-111111111111",
      "committee_name": "Komitet Przykładowy A",
      "district_id": "d1111111-1111-1111-1111-111111111111",
      "district_number": 1,
      "vote_count": 4200
    }
  ]
}
```

Example proof script output (abbreviated):

```json
{
  "artifact_type": "determinism_proof",
  "artifact_version": "cop-electoral-audit-1",
  "election_id": "8f3c2e1a-4b5d-6c7e-8f9a-0b1c2d3e4f5a",
  "calculation_algorithm": "D_HONDT",
  "district_results": [
    {
      "district_number": 1,
      "seat_capacity": 12,
      "committee_seats": [
        {
          "committee_id": "k1111111-1111-1111-1111-111111111111",
          "committee_name": "Komitet Przykładowy A",
          "vote_count": 4200,
          "seats_assigned": 7
        }
      ]
    }
  ],
  "mandates": [
    {
      "district_number": 1,
      "seat_number": 1,
      "committee_id": "k1111111-1111-1111-1111-111111111111",
      "candidate_id": "c1111111-1111-1111-1111-111111111111",
      "candidate_name": "Anna Example"
    }
  ],
  "determinism_checksum": "…",
  "proof_checksum": "…"
}
```

---

## SQL views (read model)

| View | Role |
|------|------|
| `v_ballot_box_integrity` | Per-box `chain_head_hash`, `integrity_status`, `ballot_count` |
| `v_audit_log_stream` | Ordered audit events with `audit_sequence_id` |
| `v_election_determinism_input` | `determinism_input` JSON + `determinism_checksum` per election |

Apply after `005`:

```bash
psql "$DATABASE_URL" -f backend/sql/006_electoral_audit_views.sql
```

Verify:

```bash
psql "$DATABASE_URL" -c "SELECT box_id, ballot_count, chain_head_hash, integrity_status FROM v_ballot_box_integrity LIMIT 5;"
psql "$DATABASE_URL" -c "SELECT audit_sequence_id, operation_type FROM v_audit_log_stream LIMIT 5;"
psql "$DATABASE_URL" -c "SELECT election_id, determinism_checksum FROM v_election_determinism_input LIMIT 1;"
```

---

## Zero voter PII

Audit artifacts may include:

- Election and district identifiers
- Committee and candidate **registration** names (public ballot labels)
- Aggregated vote counts
- Hash digests and operator **node** signatures (role labels)

Audit artifacts must **not** include:

- Voter name, PESEL, address, contact data
- Client IP, session tokens, device fingerprints
- Free-text fields that could identify a natural person as voter

---

---

## Referendum domain (`007`)

Migration: [`backend/sql/007_referendum_domain.sql`](../../backend/sql/007_referendum_domain.sql)  
Architecture: [`REFERENDUM_ARCHITECTURE.md`](./REFERENDUM_ARCHITECTURE.md)  
Normative context (not encoded in SQL): [`REFERENDUM_NORMATIVE.md`](./REFERENDUM_NORMATIVE.md)

Referendum audit uses the **same artifact vocabulary** as parliamentary elections — structured hashes and exportable logs, **not** narrative glyph bars (`■■■■■`) or ASCII tally bars in the electoral/referendum layer.

### Integrity hash (referendum ballot stream)

| Field | Source | Meaning |
|-------|--------|---------|
| `integrity_hash` | Latest `referendum_ballot_stream.current_hash` per `(box_id, question_id)` | Chain tip for replay |
| `integrity_model` | `HASH_CHAIN` | Same honesty as `005` / `006` — not Merkle unless spec published |
| `vote_value` | `TAK` \| `NIE` \| `INVALID` | Mark class only — no binding verdict in SQL |

Published path pattern:

```text
artifacts/{referendum_id}/integrity/{box_id}/{question_id}.json
```

### Audit log stream (referendum)

| Field | Source | Meaning |
|-------|--------|---------|
| `audit_sequence_id` | `ROW_NUMBER()` per `referendum_id` over `referendum_audit_records` | Export order (application or future view) |
| `operation_type` | e.g. `BOX_UNSEAL`, `BALLOT_REGISTERED`, `TALLY_EXPORT` | Commission/system ops |
| `log_payload` | JSONB | Box id, question id, artifact refs — no voter identity |

```text
artifacts/{referendum_id}/audit/stream.ndjson
```

### Determinism proof (referendum)

| Field | Source | Meaning |
|-------|--------|---------|
| `determinism_input` | Canonical JSON of per-question tallies + district breakdown | Replay input artifact |
| `determinism_checksum` | SHA-256 of canonical input text | Download integrity |

**Not in schema today:** dedicated `v_referendum_determinism_input` view (election has `v_election_determinism_input`). Interim read model: `v_referendum_live_analytics` (`tak_count`, `nie_count`, `district_breakdown`). A future `008` migration may add a determinism view when a replication script exists.

### Live analytics vs audit

| Object | Role |
|--------|------|
| `v_referendum_live_analytics` | Interim observation tallies — **non-authoritative** |
| Published integrity + audit NDJSON | Third-party verification artifacts |

Do not present `v_referendum_live_analytics` as PKW or official results. Do not build `/referendum` UI with glyph progress bars for this layer.

Apply order:

```bash
psql "$DATABASE_URL" -f backend/sql/007_referendum_domain.sql
```

---

## Related

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — view model section, entity → stream → view
- [`REFERENDUM_ARCHITECTURE.md`](./REFERENDUM_ARCHITECTURE.md) — referendum domain tree, FK to `ballot_boxes`
- [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md) — ER diagram (election 005)
- [`backend/sql/README.md`](../../backend/sql/README.md) — migration order through `007`
