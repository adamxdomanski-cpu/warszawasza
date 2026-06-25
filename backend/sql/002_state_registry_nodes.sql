-- State Data Matrix (Matryca Państwowa) — COP v1.0 extension
-- WARSZAWASZA distribution · zero-PII · open registry metadata only
-- Spec: fira/STATE_DATA_MATRIX.md · requires 001_cop_init.sql applied first

-- ---------------------------------------------------------------------------
-- Enumerations
-- ---------------------------------------------------------------------------

-- Four vertical data layers feeding civic_observations (Polish state open-data topology).
-- Orthogonal to constitutional_power (branch/function of the issuing institution).
DO $$ BEGIN
  CREATE TYPE state_data_layer AS ENUM (
      'KAPITALOWA',
      'KONTROLA',
      'FIZYCZNA',
      'TOZSAMOSCI'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- state_registry_nodes
-- Catalog of Polish public-data issuers. No subscriber, observer, or holder PII.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS state_registry_nodes (
  node_id               VARCHAR(50) PRIMARY KEY,

  -- Full legal name of the issuing institution or open corpus operator.
  institution_name      VARCHAR(255) NOT NULL,

  -- Branch or constitutional function (WYKONAWCZA, SĄDOWNICZA, KONTROLA, OTWARTE).
  -- Descriptive label for provenance routing — not a political classification.
  constitutional_power  VARCHAR(100) NOT NULL,

  -- Vertical layer in the State Data Matrix (see fira/STATE_DATA_MATRIX.md).
  data_layer            state_data_layer NOT NULL,

  -- Expected payload shape from the issuer (metadata only; no credentials stored here).
  data_format           VARCHAR(50) NOT NULL DEFAULT 'JSON_API',

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE state_registry_nodes IS
  'State Data Matrix node catalog. Maps civic_observations to public registry issuers. Zero PII.';

COMMENT ON COLUMN state_registry_nodes.node_id IS
  'Stable COP identifier (POL_NODE_*). Referenced by civic_observations.source_node_id.';
COMMENT ON COLUMN state_registry_nodes.institution_name IS
  'Official institution or open-corpus name as published by the issuer.';
COMMENT ON COLUMN state_registry_nodes.constitutional_power IS
  'Branch/function label (WYKONAWCZA | SĄDOWNICZA | KONTROLA | OTWARTE) for provenance.';
COMMENT ON COLUMN state_registry_nodes.data_layer IS
  'Vertical layer: KAPITALOWA | KONTROLA | FIZYCZNA | TOZSAMOSCI.';
COMMENT ON COLUMN state_registry_nodes.data_format IS
  'Expected open-data format (JSON_API, XML_OWS, RDF_SPARQL, HTML_SCRAPE, etc.).';

CREATE INDEX IF NOT EXISTS idx_state_registry_nodes_data_layer
  ON state_registry_nodes (data_layer);

CREATE INDEX IF NOT EXISTS idx_state_registry_nodes_constitutional_power
  ON state_registry_nodes (constitutional_power);

-- ---------------------------------------------------------------------------
-- civic_observations — optional link to state registry issuer
-- ---------------------------------------------------------------------------
ALTER TABLE civic_observations
  ADD COLUMN IF NOT EXISTS source_node_id VARCHAR(50)
    REFERENCES state_registry_nodes (node_id)
    ON DELETE SET NULL;

COMMENT ON COLUMN civic_observations.source_node_id IS
  'Optional FK to state_registry_nodes: which public issuer produced or grounds this metric.';

CREATE INDEX IF NOT EXISTS idx_civic_observations_source_node_id
  ON civic_observations (source_node_id);

-- ---------------------------------------------------------------------------
-- Seed: State Data Matrix nodes (idempotent)
-- ---------------------------------------------------------------------------

-- Layer 1 — KAPITAŁOWA (capital, contracts, corporate registry)
INSERT INTO state_registry_nodes (
  node_id, institution_name, constitutional_power, data_layer, data_format
) VALUES
  ('POL_NODE_KRS',  'Krajowy Rejestr Sądowy',              'SĄDOWNICZA',  'KAPITALOWA', 'JSON_API'),
  ('POL_NODE_MF',   'Ministerstwo Finansów (Trezor)',      'WYKONAWCZA',  'KAPITALOWA', 'JSON_API'),
  ('POL_NODE_UZP',  'Urząd Zamówień Publicznych',          'WYKONAWCZA',  'KAPITALOWA', 'JSON_API'),
  ('POL_NODE_BZP',  'Biuletyn Zamówień Publicznych',     'WYKONAWCZA',  'KAPITALOWA', 'JSON_API')
ON CONFLICT (node_id) DO NOTHING;

-- Layer 2 — KONTROLA (audit, data protection, administrative judiciary)
INSERT INTO state_registry_nodes (
  node_id, institution_name, constitutional_power, data_layer, data_format
) VALUES
  ('POL_NODE_NIK',  'Najwyższa Izba Kontroli',             'KONTROLA',    'KONTROLA',   'JSON_API'),
  ('POL_NODE_UODO', 'Urząd Ochrony Danych Osobowych',      'KONTROLA',    'KONTROLA',   'JSON_API'),
  ('POL_NODE_NSA',  'Naczelny Sąd Administracyjny',        'SĄDOWNICZA',  'KONTROLA',   'JSON_API')
ON CONFLICT (node_id) DO NOTHING;

-- Layer 3 — FIZYCZNA (geospatial, environment, statistics)
INSERT INTO state_registry_nodes (
  node_id, institution_name, constitutional_power, data_layer, data_format
) VALUES
  ('POL_NODE_GUGIK',     'Główny Urząd Geodezji i Kartografii', 'WYKONAWCZA', 'FIZYCZNA', 'JSON_API'),
  ('POL_NODE_GEOPORTAL', 'Geoportal.gov.pl',                    'WYKONAWCZA', 'FIZYCZNA', 'XML_OWS'),
  ('POL_NODE_GIOS',      'Główny Inspektorat Ochrony Środowiska','WYKONAWCZA', 'FIZYCZNA', 'JSON_API'),
  ('POL_NODE_GUS',       'Główny Urząd Statystyczny',           'WYKONAWCZA', 'FIZYCZNA', 'JSON_API')
ON CONFLICT (node_id) DO NOTHING;

-- Layer 4 — TOŻSAMOŚCI (heritage, archives, open cultural corpus)
INSERT INTO state_registry_nodes (
  node_id, institution_name, constitutional_power, data_layer, data_format
) VALUES
  ('POL_NODE_NID',       'Narodowy Instytut Dziedzictwa',       'WYKONAWCZA', 'TOZSAMOSCI', 'JSON_API'),
  ('POL_NODE_ARCHIWA',   'Narodowe Archiwum Cyfrowe',           'WYKONAWCZA', 'TOZSAMOSCI', 'JSON_API'),
  ('POL_NODE_WIKIMEDIA', 'Wikimedia Foundation (Wikidata)',     'OTWARTE',    'TOZSAMOSCI', 'RDF_SPARQL')
ON CONFLICT (node_id) DO NOTHING;
