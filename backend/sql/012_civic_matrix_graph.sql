-- Civic Organization Matrix — entity graph (COP v1.0 / Channel H / Spec 85233)
-- WARSZAWASZA · zero-PII · reference entities separated from events
-- Spec: fira/CIVIC_ORGANIZATION_MATRIX.md · fira/CIVIC_GRAPH_MODEL.md
-- Requires: 001_cop_init.sql, 002_state_registry_nodes.sql, 008_civic_organizations.sql
--
-- FIRA rule: store observations, evidence, and relations — not absolute truths
-- or subject-level credibility scores derived from funding.

-- ---------------------------------------------------------------------------
-- cop_node_classes — reference dictionary (Entity typing)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cop_node_classes (
  class_id              VARCHAR(20) PRIMARY KEY,
  class_name            VARCHAR(100) NOT NULL,
  cop_channel_primary   VARCHAR(50) NOT NULL,
  cop_channel_secondary VARCHAR(50),
  role_summary          TEXT NOT NULL,

  CONSTRAINT cop_node_classes_class_name_nonempty
    CHECK (length(trim(class_name)) > 0)
);

COMMENT ON TABLE cop_node_classes IS
  'Reference: operational class → COP channel routing. Not a ranking or endorsement.';

INSERT INTO cop_node_classes (
  class_id, class_name, cop_channel_primary, cop_channel_secondary, role_summary
) VALUES
  ('WATCHDOG', 'Węzły Strażnicze', 'CHANNEL_H_STATE_AUDIT', 'CHANNEL_F_REGISTRY',
   'Monitorowanie instytucji publicznych, budżetów i legalności działań władzy.'),
  ('LITERACY', 'Edukacja Konstytucyjna', 'CHANNEL_A_CITIZEN', 'CHANNEL_D_DOCUMENT',
   'Przenoszenie wiedzy o prawach w teren — powtarzalna kultura prawna.'),
  ('URBAN', 'Ruchy Miejskie / Terytorialne', 'CHANNEL_L_TERRAIN', 'CHANNEL_B_CITY',
   'Tarcie terytorialne: betonoza, transport, gentryfikacja, sąsiedztwo.'),
  ('CRISIS', 'Interwencja Kryzysowa / Odporność', 'CHANNEL_I_RESILIENCE', 'CHANNEL_A_CITIZEN',
   'Infrastruktura krytyczna gdy państwo jest przeciążone.'),
  ('CIVIC_TECH', 'Civic Tech / Rejestry', 'CHANNEL_F_REGISTRY', 'CHANNEL_C_SENSOR',
   'Narzędzia, otwarte dane, API — instrument techniczny obywatelski.')
ON CONFLICT (class_id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- civic_organizations — Entity (reference only; no actions embedded here)
-- ---------------------------------------------------------------------------
ALTER TABLE civic_organizations
  ADD COLUMN IF NOT EXISTS geo_scope VARCHAR(20),
  ADD COLUMN IF NOT EXISTS voivodeship_code VARCHAR(10),
  ADD COLUMN IF NOT EXISTS established_date DATE,
  ADD COLUMN IF NOT EXISTS system_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  ADD COLUMN IF NOT EXISTS seed_marker VARCHAR(20) NOT NULL DEFAULT 'PUBLIC_KRS',
  ADD COLUMN IF NOT EXISTS krs_source_node_id VARCHAR(50)
    REFERENCES state_registry_nodes (node_id) ON DELETE SET NULL;

DO $$ BEGIN
  ALTER TABLE civic_organizations
    ADD CONSTRAINT civic_organizations_geo_scope_valid
    CHECK (geo_scope IS NULL OR geo_scope IN ('LOCAL', 'REGIONAL', 'NATIONAL'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE civic_organizations
    ADD CONSTRAINT civic_organizations_system_status_valid
    CHECK (system_status IN ('ACTIVE', 'SUSPENDED', 'DORMANT'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE civic_organizations
    ADD CONSTRAINT civic_organizations_seed_marker_valid
    CHECK (seed_marker IN ('PUBLIC_KRS', 'EXTERNAL', 'DEMO'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE civic_organizations
    ADD CONSTRAINT civic_organizations_operational_class_fk
    FOREIGN KEY (operational_class) REFERENCES cop_node_classes (class_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE civic_organizations DROP CONSTRAINT IF EXISTS civic_organizations_krs_number_format;
ALTER TABLE civic_organizations ADD CONSTRAINT civic_organizations_krs_number_format
  CHECK (
    krs_number ~ '^[0-9]{10}$'
    AND (krs_number !~ '^900' OR (krs_number >= '9000000001' AND krs_number <= '9009999999'))
  );

COMMENT ON TABLE civic_organizations IS
  'Entity reference — KRS-grounded NGO node. Actions live in civic_action_threads, not here.';

-- ---------------------------------------------------------------------------
-- civic_friction_profiles — multi-dimensional territorial friction (0–10 each)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_friction_profiles (
  friction_profile_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  environment_score     SMALLINT NOT NULL DEFAULT 0
    CHECK (environment_score BETWEEN 0 AND 10),
  mobility_score        SMALLINT NOT NULL DEFAULT 0
    CHECK (mobility_score BETWEEN 0 AND 10),
  public_space_score    SMALLINT NOT NULL DEFAULT 0
    CHECK (public_space_score BETWEEN 0 AND 10),
  safety_score          SMALLINT NOT NULL DEFAULT 0
    CHECK (safety_score BETWEEN 0 AND 10),
  accessibility_score   SMALLINT NOT NULL DEFAULT 0
    CHECK (accessibility_score BETWEEN 0 AND 10),
  administrative_score  SMALLINT NOT NULL DEFAULT 0
    CHECK (administrative_score BETWEEN 0 AND 10),

  friction_topic        VARCHAR(80),

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE civic_friction_profiles IS
  'Territorial friction vector — six dimensions. Attached to field observations, not entities.';

-- ---------------------------------------------------------------------------
-- civic_action_threads — Activity container (Entity 1:N Activity)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_action_threads (
  thread_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civic_org_id          UUID NOT NULL
    REFERENCES civic_organizations (civic_org_id) ON DELETE CASCADE,

  title                 VARCHAR(255),
  geographic_anchor     VARCHAR(64),
  thread_status         VARCHAR(20) NOT NULL DEFAULT 'OPEN',
  opened_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at             TIMESTAMPTZ,

  CONSTRAINT civic_action_threads_status_valid
    CHECK (thread_status IN ('OPEN', 'CLOSED', 'ARCHIVED'))
);

COMMENT ON TABLE civic_action_threads IS
  'Activity thread — one org may run many threads over time.';

CREATE INDEX IF NOT EXISTS idx_civic_action_threads_org
  ON civic_action_threads (civic_org_id, opened_at DESC);

-- ---------------------------------------------------------------------------
-- L1 Field Observation — raw fact (no interpretation)
-- Observation → Feature (FIRA chain)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_action_field_observations (
  field_observation_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id             UUID NOT NULL
    REFERENCES civic_action_threads (thread_id) ON DELETE CASCADE,

  recorded_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  raw_observation_text  TEXT NOT NULL,
  friction_profile_id   UUID
    REFERENCES civic_friction_profiles (friction_profile_id) ON DELETE SET NULL,
  source_channel        VARCHAR(50),

  CONSTRAINT civic_action_field_obs_text_nonempty
    CHECK (length(trim(raw_observation_text)) > 0)
);

COMMENT ON TABLE civic_action_field_observations IS
  'Layer 1 — raw field fact only (e.g. "wycięto 18 drzew"). No legal labels.';

CREATE INDEX IF NOT EXISTS idx_civic_action_field_obs_thread
  ON civic_action_field_observations (thread_id, recorded_at DESC);

-- ---------------------------------------------------------------------------
-- L2 Assessment — interpretation / hypothesis (separate from fact)
-- Feature → Hypothesis
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_action_assessments (
  assessment_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_observation_id  UUID NOT NULL
    REFERENCES civic_action_field_observations (field_observation_id) ON DELETE CASCADE,

  assessed_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  assessment_text       TEXT NOT NULL,
  assessment_type       VARCHAR(50) NOT NULL DEFAULT 'PROCEDURAL',
  confidence            NUMERIC(5, 4)
    CHECK (confidence IS NULL OR (confidence >= 0 AND confidence <= 1)),

  CONSTRAINT civic_action_assessment_text_nonempty
    CHECK (length(trim(assessment_text)) > 0),
  CONSTRAINT civic_action_assessment_type_valid
    CHECK (assessment_type IN (
      'PROCEDURAL', 'LEGAL', 'ENVIRONMENTAL', 'SOCIAL', 'TECHNICAL', 'OTHER'
    ))
);

COMMENT ON TABLE civic_action_assessments IS
  'Layer 2 — interpretation (e.g. "naruszenie decyzji środowiskowej"). Not merged with L1.';

COMMENT ON COLUMN civic_action_assessments.confidence IS
  'Confidence in this assessment statement — NOT org trust_score.';

-- ---------------------------------------------------------------------------
-- L3 Outcome steps — actions and effects (ordered chain)
-- Hypothesis → Evidence → Outcome
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE civic_outcome_step_type AS ENUM (
    'NOTIFICATION',
    'FILING',
    'PROTEST',
    'LITIGATION',
    'JUDGMENT',
    'ADMIN_DECISION',
    'EFFECT',
    'DATA_RELEASE',
    'RELIEF'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS civic_action_outcomes (
  outcome_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id             UUID NOT NULL
    REFERENCES civic_action_threads (thread_id) ON DELETE CASCADE,
  field_observation_id  UUID
    REFERENCES civic_action_field_observations (field_observation_id) ON DELETE SET NULL,

  sequence_order        SMALLINT NOT NULL DEFAULT 1,
  step_type             civic_outcome_step_type NOT NULL,
  recorded_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  outcome_text          TEXT NOT NULL,
  source_document_url   TEXT,
  source_reference      TEXT,

  CONSTRAINT civic_action_outcome_text_nonempty
    CHECK (length(trim(outcome_text)) > 0),
  CONSTRAINT civic_action_outcome_sequence_positive
    CHECK (sequence_order > 0)
);

COMMENT ON TABLE civic_action_outcomes IS
  'Layer 3 — procedural steps: zawiadomienie → wyrok → decyzja → efekt.';

CREATE INDEX IF NOT EXISTS idx_civic_action_outcomes_thread
  ON civic_action_outcomes (thread_id, sequence_order);

-- ---------------------------------------------------------------------------
-- N:M Activity thread ↔ COP civic_observations (citizen / sensor metrics)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_thread_observation_links (
  thread_id             UUID NOT NULL
    REFERENCES civic_action_threads (thread_id) ON DELETE CASCADE,
  observation_id        UUID NOT NULL
    REFERENCES civic_observations (observation_id) ON DELETE CASCADE,
  link_role             VARCHAR(30) NOT NULL DEFAULT 'RELATED',

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT civic_thread_observation_links_pk
    PRIMARY KEY (thread_id, observation_id),
  CONSTRAINT civic_thread_observation_link_role_valid
    CHECK (link_role IN ('CORROBORATES', 'TRIGGERED_BY', 'RELATED', 'CLOSES'))
);

COMMENT ON TABLE civic_thread_observation_links IS
  'N:M — one thread may relate to many COP observations and vice versa.';

-- ---------------------------------------------------------------------------
-- civic_evidence_records — Evidence supporting observations or outcomes
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE civic_evidence_kind AS ENUM (
    'DOCUMENT',
    'PHOTO_HASH',
    'COURT_RULING',
    'ADMIN_DECISION',
    'REGISTRY_EXTRACT',
    'PUBLIC_REPORT'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS civic_evidence_records (
  evidence_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  observation_id        UUID
    REFERENCES civic_observations (observation_id) ON DELETE CASCADE,
  field_observation_id  UUID
    REFERENCES civic_action_field_observations (field_observation_id) ON DELETE CASCADE,
  outcome_id            UUID
    REFERENCES civic_action_outcomes (outcome_id) ON DELETE CASCADE,

  evidence_kind         civic_evidence_kind NOT NULL,
  content_hash          TEXT,
  source_reference      TEXT NOT NULL,
  captured_at           TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT civic_evidence_exactly_one_anchor
    CHECK (
      (observation_id IS NOT NULL)::int
      + (field_observation_id IS NOT NULL)::int
      + (outcome_id IS NOT NULL)::int = 1
    ),
  CONSTRAINT civic_evidence_source_reference_nonempty
    CHECK (length(trim(source_reference)) > 0)
);

COMMENT ON TABLE civic_evidence_records IS
  'Evidence artifacts — hash / public doc ref. Trust applies to observation coherence, not org.';

-- ---------------------------------------------------------------------------
-- civic_funding_disclosures — public funding facts (NOT credibility weights)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE funding_source_type AS ENUM (
    'PUBLIC', 'PRIVATE', 'MEMBERSHIP', 'DONATION', 'GRANT', 'EU', 'FOUNDATION', 'OTHER'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS civic_funding_disclosures (
  disclosure_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civic_org_id            UUID NOT NULL
    REFERENCES civic_organizations (civic_org_id) ON DELETE CASCADE,

  source_type             funding_source_type NOT NULL,
  is_public               BOOLEAN NOT NULL DEFAULT TRUE,
  last_report_date        DATE,
  financial_statement_ref TEXT,
  source_reference        TEXT NOT NULL,
  recorded_at             TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT civic_funding_disclosure_source_reference_nonempty
    CHECK (length(trim(source_reference)) > 0)
);

COMMENT ON TABLE civic_funding_disclosures IS
  'Public funding disclosure only. Engine may analyze; MUST NOT auto-derive org trust_score.';

CREATE INDEX IF NOT EXISTS idx_civic_funding_disclosures_org
  ON civic_funding_disclosures (civic_org_id, recorded_at DESC);

-- ---------------------------------------------------------------------------
-- civic_graph_edges — property graph (temporal, confidence on edge fact)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_graph_edges (
  edge_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  source_civic_org_id   UUID NOT NULL
    REFERENCES civic_organizations (civic_org_id) ON DELETE CASCADE,
  target_civic_org_id   UUID NOT NULL
    REFERENCES civic_organizations (civic_org_id) ON DELETE CASCADE,

  relation_type         VARCHAR(30) NOT NULL,
  weight                NUMERIC(6, 3),
  valid_from            DATE,
  valid_to              DATE,
  source_reference      TEXT,
  confidence            NUMERIC(5, 4)
    CHECK (confidence IS NULL OR (confidence >= 0 AND confidence <= 1)),
  shared_project_name   VARCHAR(255),

  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT civic_graph_edges_no_self_loop
    CHECK (source_civic_org_id <> target_civic_org_id),
  CONSTRAINT civic_graph_edges_relation_type_valid
    CHECK (relation_type IN ('COALITION', 'FUNDING', 'LEGAL_SUPPORT', 'LOGISTICS')),
  CONSTRAINT civic_graph_edges_valid_range
    CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
);

COMMENT ON TABLE civic_graph_edges IS
  'Temporal property graph between entity nodes. History preserved — no overwrite of past edges.';

COMMENT ON COLUMN civic_graph_edges.weight IS
  'Structural edge weight for graph analytics — NOT funding-based credibility.';

CREATE INDEX IF NOT EXISTS idx_civic_graph_edges_source
  ON civic_graph_edges (source_civic_org_id, valid_from DESC);

CREATE INDEX IF NOT EXISTS idx_civic_graph_edges_active
  ON civic_graph_edges (source_civic_org_id, target_civic_org_id)
  WHERE valid_to IS NULL OR valid_to >= CURRENT_DATE;

-- ---------------------------------------------------------------------------
-- civic_signal_intersections — Entity ∩ COP observation (routing only)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE civic_intersection_status AS ENUM ('PENDING', 'VERIFIED', 'DISSONANCE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS civic_signal_intersections (
  intersection_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signal_id             UUID NOT NULL
    REFERENCES civic_observations (observation_id) ON DELETE CASCADE,
  civic_org_id          UUID NOT NULL
    REFERENCES civic_organizations (civic_org_id) ON DELETE CASCADE,
  validation_status     civic_intersection_status NOT NULL DEFAULT 'PENDING',
  geographic_anchor     VARCHAR(64),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT civic_signal_intersections_unique UNIQUE (signal_id, civic_org_id)
);

COMMENT ON TABLE civic_signal_intersections IS
  'Routing intersection: citizen COP metric ∩ entity class. Distinct from action threads.';

-- ---------------------------------------------------------------------------
-- Views
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW v_civic_org_matrix AS
SELECT
  o.civic_org_id,
  o.krs_number,
  o.org_name,
  o.operational_class,
  c.class_name,
  c.cop_channel_primary,
  o.geo_scope,
  o.voivodeship_code,
  o.trust_level_indicator,
  o.system_status,
  o.seed_marker,
  COUNT(DISTINCT t.thread_id) AS action_thread_count,
  COUNT(DISTINCT l.observation_id) AS linked_observation_count,
  COUNT(DISTINCT i.intersection_id) AS intersection_count
FROM civic_organizations o
JOIN cop_node_classes c ON c.class_id = o.operational_class
LEFT JOIN civic_action_threads t ON t.civic_org_id = o.civic_org_id
LEFT JOIN civic_thread_observation_links l ON l.thread_id = t.thread_id
LEFT JOIN civic_signal_intersections i ON i.civic_org_id = o.civic_org_id
GROUP BY
  o.civic_org_id, o.krs_number, o.org_name, o.operational_class,
  c.class_name, c.cop_channel_primary, o.geo_scope, o.voivodeship_code,
  o.trust_level_indicator, o.system_status, o.seed_marker;

CREATE OR REPLACE VIEW v_civic_friction_multidim AS
SELECT
  o.org_name,
  o.operational_class,
  fo.raw_observation_text,
  fp.environment_score,
  fp.mobility_score,
  fp.public_space_score,
  fp.safety_score,
  fp.accessibility_score,
  fp.administrative_score,
  fp.friction_topic,
  fo.recorded_at
FROM civic_action_field_observations fo
JOIN civic_action_threads t ON t.thread_id = fo.thread_id
JOIN civic_organizations o ON o.civic_org_id = t.civic_org_id
LEFT JOIN civic_friction_profiles fp ON fp.friction_profile_id = fo.friction_profile_id
ORDER BY fo.recorded_at DESC;

CREATE OR REPLACE VIEW v_civic_action_pipeline AS
SELECT
  o.org_name,
  t.thread_id,
  fo.field_observation_id,
  fo.raw_observation_text,
  a.assessment_text,
  a.assessment_type,
  out.step_type,
  out.outcome_text,
  out.sequence_order
FROM civic_action_threads t
JOIN civic_organizations o ON o.civic_org_id = t.civic_org_id
LEFT JOIN civic_action_field_observations fo ON fo.thread_id = t.thread_id
LEFT JOIN civic_action_assessments a ON a.field_observation_id = fo.field_observation_id
LEFT JOIN civic_action_outcomes out ON out.thread_id = t.thread_id
ORDER BY t.opened_at DESC, out.sequence_order NULLS LAST;

-- ---------------------------------------------------------------------------
-- Seeds — Mazowsze + national entities (reference layer)
-- ---------------------------------------------------------------------------
INSERT INTO civic_organizations (
  krs_number, org_name, operational_class, trust_level_indicator,
  geo_scope, voivodeship_code, seed_marker, krs_source_node_id
) VALUES
  ('0000193097', 'Stowarzyszenie Sieć Obywatelska Watchdog Polska', 'WATCHDOG', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000154147', 'Fundacja Panoptykon', 'WATCHDOG', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000121096', 'Helsińska Fundacja Praw Człowieka', 'WATCHDOG', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000656369', 'Stowarzyszenie Sędziów Polskich Iustitia', 'LITERACY', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000494640', 'Stowarzyszenie Miasto Jest Nasze', 'URBAN', 4, 'LOCAL', 'MAZ', 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000030897', 'Fundacja Wielka Orkiestra Świątecznej Pomocy', 'CRISIS', 5, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000184899', 'Fundacja Dajemy Dzieciom Siłę', 'CRISIS', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000087863', 'Polski Czerwony Krzyż', 'CRISIS', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('0000359730', 'Fundacja ePaństwo', 'CIVIC_TECH', 4, 'NATIONAL', NULL, 'PUBLIC_KRS', 'POL_NODE_KRS'),
  ('9000000001', 'Tour de Konstytucja', 'LITERACY', 2, 'NATIONAL', 'MAZ', 'EXTERNAL', NULL),
  ('9000000002', 'Grupa Granica (sieć interwencyjna)', 'CRISIS', 2, 'REGIONAL', 'MAZ', 'EXTERNAL', NULL)
ON CONFLICT (krs_number) DO UPDATE SET
  org_name = EXCLUDED.org_name,
  operational_class = EXCLUDED.operational_class,
  geo_scope = EXCLUDED.geo_scope,
  voivodeship_code = EXCLUDED.voivodeship_code,
  seed_marker = EXCLUDED.seed_marker,
  krs_source_node_id = COALESCE(EXCLUDED.krs_source_node_id, civic_organizations.krs_source_node_id);

UPDATE civic_organizations
SET geo_scope = 'NATIONAL', seed_marker = 'PUBLIC_KRS', krs_source_node_id = 'POL_NODE_KRS'
WHERE krs_number = '0000217821';

-- Sample pipeline: urban planning friction (Miasto Jest Nasze / MAZ)
INSERT INTO civic_friction_profiles (
  environment_score, mobility_score, public_space_score,
  safety_score, accessibility_score, administrative_score, friction_topic
)
SELECT 3, 2, 6, 1, 4, 8, 'BUILDING_LAW'
WHERE NOT EXISTS (
  SELECT 1 FROM civic_friction_profiles WHERE friction_topic = 'BUILDING_LAW' LIMIT 1
);

INSERT INTO civic_action_threads (civic_org_id, title, geographic_anchor, thread_status, opened_at)
SELECT o.civic_org_id, 'MPZP Muranów — wpis do komisji', 'SRD_MUR_01', 'OPEN',
       TIMESTAMPTZ '2025-11-15 12:00:00+00'
FROM civic_organizations o
WHERE o.krs_number = '0000494640'
  AND NOT EXISTS (
    SELECT 1 FROM civic_action_threads t
    WHERE t.civic_org_id = o.civic_org_id AND t.title = 'MPZP Muranów — wpis do komisji'
  );

INSERT INTO civic_action_field_observations (
  thread_id, recorded_at, raw_observation_text, friction_profile_id, source_channel
)
SELECT t.thread_id, TIMESTAMPTZ '2025-11-15 12:00:00+00',
       'Wpis do protokołu komisji urbanistycznej dot. zmian lokalnego planu w rejonie Muranów.',
       (SELECT friction_profile_id FROM civic_friction_profiles WHERE friction_topic = 'BUILDING_LAW' LIMIT 1),
       'CHANNEL_L_TERRAIN'
FROM civic_action_threads t
JOIN civic_organizations o ON o.civic_org_id = t.civic_org_id
WHERE o.krs_number = '0000494640' AND t.title = 'MPZP Muranów — wpis do komisji'
  AND NOT EXISTS (
    SELECT 1 FROM civic_action_field_observations fo
    WHERE fo.thread_id = t.thread_id
      AND fo.raw_observation_text LIKE 'Wpis do protokołu komisji%'
  );

INSERT INTO civic_action_assessments (field_observation_id, assessment_text, assessment_type, confidence)
SELECT fo.field_observation_id,
       'Potencjalne tarcie proceduralne między planem a użytkowaniem sąsiednich działek.',
       'PROCEDURAL', 0.72
FROM civic_action_field_observations fo
JOIN civic_action_threads t ON t.thread_id = fo.thread_id
JOIN civic_organizations o ON o.civic_org_id = t.civic_org_id
WHERE o.krs_number = '0000494640'
  AND fo.raw_observation_text LIKE 'Wpis do protokołu komisji%'
  AND NOT EXISTS (
    SELECT 1 FROM civic_action_assessments a WHERE a.field_observation_id = fo.field_observation_id
  );

INSERT INTO civic_action_outcomes (thread_id, field_observation_id, sequence_order, step_type, outcome_text)
SELECT t.thread_id, fo.field_observation_id, 1, 'FILING'::civic_outcome_step_type,
       'Złożenie interwencji w postępowaniu planistycznym.'
FROM civic_action_threads t
JOIN civic_action_field_observations fo ON fo.thread_id = t.thread_id
JOIN civic_organizations o ON o.civic_org_id = t.civic_org_id
WHERE o.krs_number = '0000494640' AND t.title = 'MPZP Muranów — wpis do komisji'
  AND NOT EXISTS (
    SELECT 1 FROM civic_action_outcomes out
    WHERE out.thread_id = t.thread_id AND out.sequence_order = 1
  );

-- Property graph edges (temporal)
INSERT INTO civic_graph_edges (
  source_civic_org_id, target_civic_org_id, relation_type,
  weight, valid_from, source_reference, confidence, shared_project_name
)
SELECT s.civic_org_id, t.civic_org_id, e.relation_type,
       e.weight, e.valid_from::date, e.source_reference, e.confidence, e.shared_project_name
FROM (
  VALUES
    ('0000193097', '0000154147', 'COALITION', 1.0, '2024-01-01', 'public coalition announcement', 0.85, 'Audyt państwa'),
    ('0000030897', '0000087863', 'LOGISTICS', 0.8, '2025-01-01', 'WOŚP public report', 0.9, 'Wsparcie medyczne — finał'),
    ('0000121096', '0000656369', 'LEGAL_SUPPORT', 0.7, '2023-06-01', 'joint public statement', 0.75, 'Niezależność sądownictwa')
) AS e(src_krs, tgt_krs, relation_type, weight, valid_from, source_reference, confidence, shared_project_name)
JOIN civic_organizations s ON s.krs_number = e.src_krs
JOIN civic_organizations t ON t.krs_number = e.tgt_krs
WHERE NOT EXISTS (
  SELECT 1 FROM civic_graph_edges g
  WHERE g.source_civic_org_id = s.civic_org_id
    AND g.target_civic_org_id = t.civic_org_id
    AND g.relation_type = e.relation_type
    AND g.valid_from = e.valid_from::date
);

-- Funding disclosure sample (no trust derivation)
INSERT INTO civic_funding_disclosures (
  civic_org_id, source_type, is_public, last_report_date, financial_statement_ref, source_reference
)
SELECT o.civic_org_id, 'GRANT'::funding_source_type, TRUE, DATE '2025-12-31',
       'Sprawozdanie finansowe — sekcja publiczna', 'KRS public filing reference'
FROM civic_organizations o
WHERE o.krs_number = '0000154147'
  AND NOT EXISTS (
    SELECT 1 FROM civic_funding_disclosures d
    WHERE d.civic_org_id = o.civic_org_id AND d.source_type = 'GRANT'
  );

-- Demo COP observation + entity intersection (no trace_short_id dependency)
INSERT INTO civic_observations (
  timestamp, metric_category, status_indicator, payload_value
)
SELECT TIMESTAMPTZ '2026-06-27 00:20:29.25+00', 'CHANNEL_A_CITIZEN', 'ALTERED', 3
WHERE NOT EXISTS (
  SELECT 1 FROM civic_observations
  WHERE timestamp = TIMESTAMPTZ '2026-06-27 00:20:29.25+00'
    AND metric_category = 'CHANNEL_A_CITIZEN'
    AND payload_value = 3
);

INSERT INTO civic_signal_intersections (signal_id, civic_org_id, validation_status, geographic_anchor)
SELECT obs.observation_id, org.civic_org_id, 'PENDING'::civic_intersection_status, 'SRD_MUR_01'
FROM civic_observations obs
CROSS JOIN civic_organizations org
WHERE obs.timestamp = TIMESTAMPTZ '2026-06-27 00:20:29.25+00'
  AND obs.metric_category = 'CHANNEL_A_CITIZEN'
  AND org.krs_number = '0000494640'
ON CONFLICT (signal_id, civic_org_id) DO NOTHING;

INSERT INTO civic_thread_observation_links (thread_id, observation_id, link_role)
SELECT t.thread_id, obs.observation_id, 'RELATED'
FROM civic_action_threads t
JOIN civic_organizations org ON org.civic_org_id = t.civic_org_id
CROSS JOIN civic_observations obs
WHERE org.krs_number = '0000494640'
  AND t.title = 'MPZP Muranów — wpis do komisji'
  AND obs.timestamp = TIMESTAMPTZ '2026-06-27 00:20:29.25+00'
  AND obs.metric_category = 'CHANNEL_A_CITIZEN'
ON CONFLICT DO NOTHING;
