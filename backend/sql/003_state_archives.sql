-- State archives retention — COP v1.0 Memory / Palimpsest layer
-- WARSZAWASZA distribution · zero-PII · metadata + signatures only (no document copies)
-- Spec: fira/COP_ARCHIVE_JSON.md · requires 001_cop_init.sql (pgcrypto) applied first

-- ---------------------------------------------------------------------------
-- state_archives
-- Immutable historical reference points (Memory Nexus). Signatures and anchors
-- only — never full archival document bodies.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS state_archives (
  archive_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Issuing archive or corpus code (e.g. NAC, ARCHIWUM_MIASTA, AAN).
  archive_source       VARCHAR(100) NOT NULL,

  -- Official archival signature — unique across COP store.
  document_signature   VARCHAR(255) NOT NULL UNIQUE,

  -- Human-readable title from public catalog metadata (not full document text).
  document_title       VARCHAR(500) NOT NULL,

  -- Creation or catalog year when known (nullable).
  creation_year        INT,

  -- Sector identifier or geographic anchor for Memory rail lookup.
  geographic_anchor    VARCHAR(100),

  -- Structured tags and indexes only. No natural-person names, contact data, or
  -- full document transcriptions.
  metadata_payload     JSONB,

  inserted_timestamp   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE state_archives IS
  'COP Memory layer: archival metadata, signatures, and geographic anchors. Zero PII; no document copies.';

COMMENT ON COLUMN state_archives.archive_id IS
  'Surrogate key for archival retention records.';
COMMENT ON COLUMN state_archives.archive_source IS
  'Archive or open-corpus issuer code (NAC, ARCHIWUM_MIASTA, AAN, etc.).';
COMMENT ON COLUMN state_archives.document_signature IS
  'Official archival signature — unique anchor for cross-reference and palimpsest queries.';
COMMENT ON COLUMN state_archives.document_title IS
  'Public catalog title; not a full document reproduction.';
COMMENT ON COLUMN state_archives.creation_year IS
  'Document or catalog creation year when published by the issuer.';
COMMENT ON COLUMN state_archives.geographic_anchor IS
  'Sector or coordinate anchor (e.g. WARSZAWA_GLOBAL, SRD_MUR_01) for geographic indexing.';
COMMENT ON COLUMN state_archives.metadata_payload IS
  'JSONB tags and indexes only — structural metadata, toponyms, access flags. No PII.';

CREATE INDEX IF NOT EXISTS idx_archive_anchor
  ON state_archives (geographic_anchor);

CREATE INDEX IF NOT EXISTS idx_archive_source
  ON state_archives (archive_source);

-- ---------------------------------------------------------------------------
-- Seed: Warsaw Memory Nexus anchor points (idempotent)
-- ---------------------------------------------------------------------------
INSERT INTO state_archives (
  archive_source,
  document_signature,
  document_title,
  creation_year,
  geographic_anchor,
  metadata_payload
) VALUES
  (
    'NAC',
    'NAC.W_1939_M_01',
    'Plan generalny funkcjonalny rozwoju m.st. Warszawy do roku 1942',
    1936,
    'WARSZAWA_GLOBAL',
    '{"issuing_body": "Biuro Planowania Miasta", "scale": "1:25000", "structural_type": "URBAN_PLAN"}'::jsonb
  ),
  (
    'ARCHIWUM_MIASTA',
    'APP.W_1945_R_87',
    'Rejestr zniszczeń i strat nieruchomości sektora Muranów — Biuro Odbudowy Stolicy',
    1945,
    'SRD_MUR_01',
    '{"context": "BOS", "damage_level": "100_PERCENT", "structural_type": "DAMAGE_REGISTER"}'::jsonb
  )
ON CONFLICT (document_signature) DO NOTHING;
