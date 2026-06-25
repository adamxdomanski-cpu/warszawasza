# COP-JSON — Archival Retention Format

**Civic Observation Protocol v1.0 · Memory / Palimpsest layer**

Archival retention in FIRA does **not** copy whole historical documents from state archives (NAC, NAC Digital, AAN, municipal archives, cadastral maps). It preserves **metadata, signatures, and geographic anchors** so past records act as immutable reference points (Memory Nexus) when observing present-day anomalies — excavations, infrastructure change, registry drift.

> **Memory is a service, not a stage.** Filtration rejects descriptive archival noise; only structural metadata crosses into COP.

---

## Relationship to other layers

| Layer | Location | Role |
|-------|----------|------|
| FOP Memory (≈) | `fira/PROTOCOL.md` — pipeline stage `memory` (engineIndex 4) | Process stage: palimpsest comparison, not document storage |
| PostgreSQL persistence | `backend/sql/003_state_archives.sql` → table `state_archives` | Durable signatures + anchors for WARSZAWASZA distribution |
| State Data Matrix | `fira/STATE_DATA_MATRIX.md` — `POL_NODE_ARCHIWA`, `POL_NODE_NID` | Public issuers in `TOZSAMOSCI` layer |
| FIRA Core | `fira/core/` | Geography-agnostic algebra — **no** archival schema in core |

Apply migrations in order: `001_cop_init.sql` → `002_state_registry_nodes.sql` → `003_state_archives.sql`. See `backend/sql/README.md`.

---

## Schema

COP-JSON is a **metadata-only** interchange object. Validators and ingest pipelines MUST reject payloads that embed full document text, scanned page content, or subscriber identity.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string (URI) | yes | Format identifier: `https://fira.protocol/cop-archive/1.0` |
| `archive_source` | string | yes | Issuer code (max 100 chars). Maps to `state_archives.archive_source`. |
| `document_signature` | string | yes | Official archival signature (max 255 chars). Unique key. |
| `document_title` | string | yes | Public catalog title (max 500 chars). Not a document body. |
| `creation_year` | integer | no | Creation or catalog year. |
| `geographic_anchor` | string | no | Sector or coordinate anchor (max 100 chars). Indexed in PostgreSQL. |
| `metadata_payload` | object | no | Tags, toponyms, structural type, access flags. **No PII.** |

### Rules

1. **Metadata only** — signatures, titles, years, anchors, and index tags. Never full document copies.
2. **Zero PII** — no natural-person names, emails, phones, IPs, or free-text narratives tied to identity.
3. **Apolitical** — descriptive provenance (institution codes, structural types), not interpretive or partisan labels.
4. **COP-aligned** — objects feed the Memory / Palimpsest rail; they do not bypass FOP filtration or validation stages.
5. **Idempotent ingest** — PostgreSQL inserts use `ON CONFLICT (document_signature) DO NOTHING`.

### Allowed in `metadata_payload`

- `historical_toponyms` — public place names
- `structural_type` — e.g. `URBAN_MAP`, `DAMAGE_REGISTER`, `CADASTRE`
- `access_restriction` — e.g. `PUBLIC_DOMAIN`
- `issuing_body` — institution name (not a natural person)
- `scale`, `context`, `damage_level` — objective catalog fields

### Forbidden in `metadata_payload`

- Full transcriptions or OCR dumps
- Natural-person names (holders, authors as individuals, subscribers)
- Contact details, credentials, session tokens
- Political commentary or advocacy text

---

## Example (canonical)

When COP parses an archival resource (e.g. a 1936 planning map or a 1945 damage register), it normalizes to this shape:

```json
{
  "$schema": "https://fira.protocol/cop-archive/1.0",
  "archive_source": "ARCHIWUM_AKT_DAWNYCH",
  "document_signature": "AGAD.92.11.04",
  "document_title": "Plan regulacji i pomiaru gruntów terytorium Muranowa",
  "creation_year": 1824,
  "geographic_anchor": "SRD_MUR_01",
  "metadata_payload": {
    "historical_toponyms": ["Nalewki", "Gęsia", "Koszary Wołyńskie"],
    "structural_type": "URBAN_MAP",
    "access_restriction": "PUBLIC_DOMAIN"
  }
}
```

---

## PostgreSQL mapping

| COP-JSON field | `state_archives` column |
|----------------|-------------------------|
| — | `archive_id` (UUID, server-generated) |
| `archive_source` | `archive_source` |
| `document_signature` | `document_signature` |
| `document_title` | `document_title` |
| `creation_year` | `creation_year` |
| `geographic_anchor` | `geographic_anchor` |
| `metadata_payload` | `metadata_payload` (JSONB) |
| — | `inserted_timestamp` (server default) |

Query by anchor:

```sql
SELECT document_signature, document_title, creation_year
FROM state_archives
WHERE geographic_anchor = 'SRD_MUR_01'
ORDER BY creation_year;
```

---

## Seeded anchors (Warszawa)

| archive_source | document_signature | creation_year | geographic_anchor |
|----------------|-------------------|---------------|---------------------|
| NAC | NAC.W_1939_M_01 | 1936 | WARSZAWA_GLOBAL |
| ARCHIWUM_MIASTA | APP.W_1945_R_87 | 1945 | SRD_MUR_01 |

These hard reference points support interference detection when contemporary field observations overlap historical sectors.

---

## Related docs

- `fira/PROTOCOL.md` — FOP/0.1 notation; Memory stage (≈) at engineIndex 4
- `fira/STATE_DATA_MATRIX.md` — State registry nodes for archival issuers
- `fira/electoral/` — electoral domain (orthogonal; protocol metadata only in audit artifacts)
- `backend/sql/README.md` — migration apply order and zero-PII policy
