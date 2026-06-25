-- Civic Organization Matrix (Channel H) — COP v1.0 extension
-- WARSZAWASZA distribution · zero-PII · public registry metadata only
-- Spec: fira/CIVIC_ORGANIZATION_MATRIX.md · requires 001_cop_init.sql, 002_state_registry_nodes.sql

-- ---------------------------------------------------------------------------
-- civic_organizations
-- Third-sector civic nodes grounded in KRS public registry facts.
-- No natural-person names, emails, or contact PII — see matrix doc for role references.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_organizations (
  civic_org_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- KRS number as published (10 digits, zero-padded). Unique across COP store.
  krs_number              VARCHAR(10) NOT NULL,

  -- Registered legal name from KRS (organization only — not a natural person).
  org_name                VARCHAR(255) NOT NULL,

  -- Operational class for civic audit routing (e.g. WATCHDOG, GRANTMAKER_NETWORK).
  -- Descriptive label — not a political endorsement.
  operational_class       VARCHAR(50) NOT NULL,

  -- Trust / evidence strength indicator 0–5 (same scale as civic_observations.payload_value).
  trust_level_indicator   SMALLINT NOT NULL,

  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT civic_organizations_krs_number_unique
    UNIQUE (krs_number),
  CONSTRAINT civic_organizations_krs_number_format
    CHECK (krs_number ~ '^[0-9]{10}$'),
  CONSTRAINT civic_organizations_org_name_nonempty
    CHECK (length(trim(org_name)) > 0),
  CONSTRAINT civic_organizations_operational_class_nonempty
    CHECK (length(trim(operational_class)) > 0),
  CONSTRAINT civic_organizations_trust_level_range
    CHECK (trust_level_indicator BETWEEN 0 AND 5)
);

COMMENT ON TABLE civic_organizations IS
  'Channel H — civic organization registry. KRS-grounded NGO metadata only; zero natural-person PII.';

COMMENT ON COLUMN civic_organizations.krs_number IS
  'Public KRS identifier. Verify against api-krs.ms.gov.pl or Rejestr.io before seeding.';
COMMENT ON COLUMN civic_organizations.org_name IS
  'Registered organization name from KRS — not a trade name alias unless that is the KRS entry.';
COMMENT ON COLUMN civic_organizations.operational_class IS
  'Civic audit routing class (WATCHDOG | GRANTMAKER_NETWORK | etc.). Normative defs: fira/CIVIC_ORGANIZATION_MATRIX.md.';
COMMENT ON COLUMN civic_organizations.trust_level_indicator IS
  'Evidence strength 0–5 for provenance routing — not a popularity score.';

CREATE INDEX IF NOT EXISTS idx_civic_organizations_operational_class
  ON civic_organizations (operational_class);

-- ---------------------------------------------------------------------------
-- Seed: Civic Organization Matrix (idempotent)
-- KRS verified 2026-06-25: Forum Darczyńców w Polsce = 0000217821 (Związek Stowarzyszeń).
-- Note: 0000213765 is Eurocash S.A. — not this organization.
-- ---------------------------------------------------------------------------
INSERT INTO civic_organizations (
  krs_number, org_name, operational_class, trust_level_indicator
) VALUES (
  '0000217821',
  'Forum Darczyńców w Polsce',
  'WATCHDOG',
  5
)
ON CONFLICT (krs_number) DO NOTHING;
