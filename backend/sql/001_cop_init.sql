-- Civic Observation Protocol (COP) v1.0 — initial schema
-- WARSZAWASZA distribution · zero-PII · objective infrastructure + raw metrics only
-- Spec: fira/PROTOCOL.md · field artefact: fira/FIELD_DOMAIN_konstytucja.md

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- Enumerations
-- ---------------------------------------------------------------------------

-- Lifecycle of an infrastructure asset (domain, endpoint) under COP observation.
-- PENDING_WHOIS_DISCOVERY: asset registered; registrar snapshot not yet ingested.
CREATE TYPE infrastructure_asset_status AS ENUM (
    'PENDING_WHOIS_DISCOVERY',
    'DISCOVERED',
    'STABLE',
    'ALTERED',
    'DISCONNECTED'
);

-- Raw social/infrastructure signal class for operator-console notation (v_operator_console).
CREATE TYPE observation_status_indicator AS ENUM (
    'STABLE',
    'ALTERED',
    'DISCONNECTED',
    'PENDING'
);

-- ---------------------------------------------------------------------------
-- infrastructure_status
-- Registrar snapshot fields store public WHOIS/RDAP facts only (org names, NS, dates).
-- NO subscriber identity, contact email, phone, or IP addresses.
-- ---------------------------------------------------------------------------
CREATE TABLE infrastructure_status (
  infrastructure_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Canonical asset identifier (e.g. konstytucja.pl). Unique across COP store.
  asset_domain        TEXT NOT NULL,

  -- COP lifecycle state for this asset.
  status              infrastructure_asset_status NOT NULL,

  -- Public registrar org name from RDAP/WHOIS (not a natural person).
  registrar_name      TEXT,

  -- Authoritative nameservers at last discovery (public DNS data).
  nameserver_primary  TEXT,
  nameserver_secondary TEXT,

  -- Public registration timeline from registry (no holder PII).
  domain_created_at   TIMESTAMPTZ,
  domain_modified_at  TIMESTAMPTZ,
  domain_renewal_at   TIMESTAMPTZ,

  -- NASK option flag — boolean + expiry only; no option-holder identity.
  nask_option_active  BOOLEAN NOT NULL DEFAULT FALSE,
  nask_option_expires_at TIMESTAMPTZ,

  -- DNSSEC signed flag from public registry record.
  dnssec_signed       BOOLEAN,

  -- When COP last ran WHOIS/RDAP discovery for this asset (NULL until first run).
  discovered_at       TIMESTAMPTZ,

  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT infrastructure_status_asset_domain_unique UNIQUE (asset_domain)
);

COMMENT ON TABLE infrastructure_status IS
  'Objective infrastructure state for COP v1.0. Public registry snapshots only; zero PII.';

COMMENT ON COLUMN infrastructure_status.infrastructure_id IS
  'Surrogate key for FK from civic_observations.asset_ref.';
COMMENT ON COLUMN infrastructure_status.asset_domain IS
  'FQDN or canonical asset label under observation (e.g. konstytucja.pl).';
COMMENT ON COLUMN infrastructure_status.status IS
  'COP asset lifecycle: discovery pending through stable/altered/disconnected.';
COMMENT ON COLUMN infrastructure_status.registrar_name IS
  'Registrar organization name from public WHOIS/RDAP — not subscriber contact data.';
COMMENT ON COLUMN infrastructure_status.nameserver_primary IS
  'Primary NS hostname from public DNS/registry snapshot.';
COMMENT ON COLUMN infrastructure_status.nameserver_secondary IS
  'Secondary NS hostname from public DNS/registry snapshot.';
COMMENT ON COLUMN infrastructure_status.domain_created_at IS
  'Registry creation timestamp (public).';
COMMENT ON COLUMN infrastructure_status.domain_modified_at IS
  'Registry last-modified timestamp (public).';
COMMENT ON COLUMN infrastructure_status.domain_renewal_at IS
  'Registry renewal/expiry timestamp (public).';
COMMENT ON COLUMN infrastructure_status.nask_option_active IS
  'Whether a NASK registration option is recorded as active (public WHOIS flag).';
COMMENT ON COLUMN infrastructure_status.nask_option_expires_at IS
  'Public NASK option expiration date when present in registry data.';
COMMENT ON COLUMN infrastructure_status.dnssec_signed IS
  'DNSSEC signed flag from public registry record.';
COMMENT ON COLUMN infrastructure_status.discovered_at IS
  'UTC timestamp of last successful WHOIS/RDAP ingestion for this asset.';

CREATE INDEX idx_infrastructure_status_status
  ON infrastructure_status (status);

CREATE INDEX idx_infrastructure_status_discovered_at
  ON infrastructure_status (discovered_at);

-- ---------------------------------------------------------------------------
-- civic_observations
-- Raw metric readings for operator console. Links optionally to infrastructure_status.
-- payload_value 0–5 maps to evidence bars in v_operator_console (FOP ev ■/□).
-- ---------------------------------------------------------------------------
CREATE TABLE civic_observations (
  observation_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Observation event time (ISO 8601 stored as TIMESTAMPTZ).
  timestamp           TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Metric channel label (e.g. WHOIS, DNS_NS, REGISTRAR_SNAPSHOT, INFRASTRUCTURE).
  metric_category     TEXT NOT NULL,

  -- Drives notation_string in v_operator_console.
  status_indicator    observation_status_indicator NOT NULL DEFAULT 'PENDING',

  -- Evidence strength 0–5 (0 = empty, 5 = full ■■■■■ in view).
  payload_value       SMALLINT NOT NULL DEFAULT 0
    CHECK (payload_value >= 0 AND payload_value <= 5),

  -- Optional link to observed infrastructure asset.
  asset_ref           UUID REFERENCES infrastructure_status (infrastructure_id)
    ON DELETE SET NULL,

  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE civic_observations IS
  'Raw COP metric readings. No observer identity, IP, or personal data.';

COMMENT ON COLUMN civic_observations.observation_id IS
  'Primary key; exposed in v_operator_console.';
COMMENT ON COLUMN civic_observations.timestamp IS
  'When the metric was recorded (UTC).';
COMMENT ON COLUMN civic_observations.metric_category IS
  'Objective metric class — free-text COP channel identifier.';
COMMENT ON COLUMN civic_observations.status_indicator IS
  'STABLE | ALTERED | DISCONNECTED | PENDING — feeds ASCII notation in operator view.';
COMMENT ON COLUMN civic_observations.payload_value IS
  'Integer evidence level 0–5 for bar glyph rendering.';
COMMENT ON COLUMN civic_observations.asset_ref IS
  'Optional FK to infrastructure_status; NULL for global metrics.';

CREATE INDEX idx_civic_observations_timestamp
  ON civic_observations (timestamp DESC);

CREATE INDEX idx_civic_observations_metric_category
  ON civic_observations (metric_category);

CREATE INDEX idx_civic_observations_asset_ref
  ON civic_observations (asset_ref);

-- ---------------------------------------------------------------------------
-- Operator console view (COP v1.0 notation)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_operator_console AS
SELECT
    observation_id,
    timestamp,
    metric_category,
    CASE
        WHEN status_indicator = 'STABLE' THEN '● ──► [ STABLE ]'
        WHEN status_indicator = 'ALTERED' THEN '●  ≠  [ ALTERED ]'
        WHEN status_indicator = 'DISCONNECTED' THEN '○  ⊗  [ DISCONNECTED ]'
        ELSE '… [ PENDING ]'
    END AS notation_string,
    CASE
        WHEN payload_value >= 4 THEN '■■■■■'
        WHEN payload_value = 3 THEN '■■■□□'
        WHEN payload_value = 2 THEN '■■□□□'
        WHEN payload_value = 1 THEN '■□□□□'
        ELSE '□□□□□'
    END AS evidence_indicator
FROM civic_observations;

COMMENT ON VIEW v_operator_console IS
  'Read-only COP operator surface: FOP-style notation + evidence bars. No PII.';

-- ---------------------------------------------------------------------------
-- Seed: konstytucja.pl — discovery pending (FIELD_DOMAIN artefact)
-- Registrar snapshot columns intentionally NULL until WHOIS ingestion runs.
-- ---------------------------------------------------------------------------
INSERT INTO infrastructure_status (
    asset_domain,
    status
) VALUES (
    'konstytucja.pl',
    'PENDING_WHOIS_DISCOVERY'
);
