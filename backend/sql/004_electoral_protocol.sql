-- Electoral Protocol COP v1.0 DRAFT — legacy laboratory stream (004)
-- WARSZAWASZA distribution · zero voter PII · NOT PKW · NOT binding law
-- Spec: fira/ELECTORAL_PROTOCOL_DRAFT.md · requires 001_cop_init.sql (pgcrypto) applied first
-- Separate from civic deliberation instrument: frontend /deliberation (GrapheneVote)
--
-- CANONICAL DOMAIN MODEL: backend/sql/005_electoral_domain.sql (elections, committees, …)
-- This file (004) remains for backward-compatible lab stream + mandate-cost views.

-- ---------------------------------------------------------------------------
-- Enumerations
-- ---------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE electoral_campaign_finance_status AS ENUM (
      'TRANSPARENT_MICRO',
      'PENDING_AUDIT',
      'REJECTED_OPAQUE'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- electoral_lab_config
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS electoral_lab_config (
  config_id              SMALLINT PRIMARY KEY DEFAULT 1
    CHECK (config_id = 1),
  protocol_version       VARCHAR(32) NOT NULL DEFAULT 'COP-ELECTORAL-DRAFT-1.0',
  district_label         VARCHAR(64) NOT NULL DEFAULT 'NATIONAL'
    CHECK (district_label = 'NATIONAL'),
  seat_count             INT NOT NULL DEFAULT 460
    CHECK (seat_count > 0 AND seat_count <= 1000),
  is_laboratory_model    BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE electoral_lab_config IS
  'Legacy lab parameters. Canonical domain: 005_electoral_domain.sql.';

INSERT INTO electoral_lab_config (config_id, protocol_version, district_label, seat_count, is_laboratory_model)
VALUES (1, 'COP-ELECTORAL-DRAFT-1.0', 'NATIONAL', 460, TRUE)
ON CONFLICT (config_id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- electoral_candidates
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS electoral_candidates (
  candidate_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_name         VARCHAR(255) NOT NULL,
  committee_name         VARCHAR(255) NOT NULL,
  campaign_vault_id      VARCHAR(100) NOT NULL UNIQUE,
  campaign_finance_status electoral_campaign_finance_status NOT NULL DEFAULT 'PENDING_AUDIT',
  is_demo                BOOLEAN NOT NULL DEFAULT FALSE,
  registered_timestamp   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT electoral_candidates_name_nonempty
    CHECK (length(trim(candidate_name)) > 0),
  CONSTRAINT electoral_candidates_committee_nonempty
    CHECK (length(trim(committee_name)) > 0),
  CONSTRAINT electoral_candidates_vault_id_nonempty
    CHECK (length(trim(campaign_vault_id)) > 0)
);

COMMENT ON TABLE electoral_candidates IS
  'Legacy lab candidate registry. Canonical: candidates table in 005.';

CREATE INDEX IF NOT EXISTS idx_electoral_candidates_name
  ON electoral_candidates (candidate_name);

CREATE INDEX IF NOT EXISTS idx_electoral_candidates_finance_status
  ON electoral_candidates (campaign_finance_status);

CREATE INDEX IF NOT EXISTS idx_electoral_candidates_is_demo
  ON electoral_candidates (is_demo);

-- ---------------------------------------------------------------------------
-- electoral_ballot_stream
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS electoral_ballot_stream (
  ballot_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  target_candidate_id    UUID NOT NULL
    REFERENCES electoral_candidates (candidate_id)
    ON DELETE RESTRICT,
  verification_hash      VARCHAR(64) NOT NULL UNIQUE,
  ballot_payload         JSONB NOT NULL,

  CONSTRAINT electoral_ballot_stream_hash_format
    CHECK (verification_hash ~ '^[a-f0-9]{64}$'),
  CONSTRAINT electoral_ballot_stream_payload_is_object
    CHECK (jsonb_typeof(ballot_payload) = 'object')
);

COMMENT ON TABLE electoral_ballot_stream IS
  'Legacy lab ballot stream. Canonical: ballots table in 005.';

CREATE INDEX IF NOT EXISTS idx_electoral_ballot_stream_candidate
  ON electoral_ballot_stream (target_candidate_id);

CREATE INDEX IF NOT EXISTS idx_electoral_ballot_stream_timestamp
  ON electoral_ballot_stream (timestamp DESC);

CREATE OR REPLACE FUNCTION electoral_ballot_stream_guard_finance()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  finance electoral_campaign_finance_status;
BEGIN
  SELECT campaign_finance_status INTO finance
  FROM electoral_candidates
  WHERE candidate_id = NEW.target_candidate_id;

  IF finance = 'REJECTED_OPAQUE' THEN
    RAISE EXCEPTION 'electoral_ballot_stream: candidate finance status REJECTED_OPAQUE';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_electoral_ballot_stream_guard_finance ON electoral_ballot_stream;
CREATE TRIGGER trg_electoral_ballot_stream_guard_finance
  BEFORE INSERT ON electoral_ballot_stream
  FOR EACH ROW
  EXECUTE FUNCTION electoral_ballot_stream_guard_finance();

-- ---------------------------------------------------------------------------
-- mandate_cost functions + views
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_electoral_valid_vote_count()
RETURNS BIGINT
LANGUAGE sql
STABLE
AS $$
  SELECT COUNT(*)::BIGINT
  FROM electoral_ballot_stream b
  JOIN electoral_candidates c ON c.candidate_id = b.target_candidate_id
  WHERE c.campaign_finance_status <> 'REJECTED_OPAQUE';
$$;

CREATE OR REPLACE FUNCTION fn_electoral_mandate_cost()
RETURNS NUMERIC(20, 6)
LANGUAGE sql
STABLE
AS $$
  SELECT CASE
    WHEN cfg.seat_count > 0 AND fn_electoral_valid_vote_count() > 0
      THEN (fn_electoral_valid_vote_count()::NUMERIC / cfg.seat_count::NUMERIC)
    ELSE NULL
  END
  FROM electoral_lab_config cfg
  WHERE cfg.config_id = 1;
$$;

CREATE OR REPLACE VIEW v_electoral_live_results AS
SELECT
    c.candidate_id,
    c.committee_name,
    c.candidate_name,
    c.campaign_finance_status,
    c.is_demo,
    COUNT(b.ballot_id) AS raw_vote_count,
    fn_electoral_mandate_cost() AS mandate_cost_live,
    CASE
        WHEN c.campaign_finance_status = 'REJECTED_OPAQUE' THEN 'REJECTED'
        WHEN COUNT(b.ballot_id) > 0 THEN 'ACTIVE'
        ELSE 'PENDING'
    END AS status_indicator
FROM electoral_candidates c
LEFT JOIN electoral_ballot_stream b ON c.candidate_id = b.target_candidate_id
GROUP BY
    c.candidate_id,
    c.committee_name,
    c.candidate_name,
    c.campaign_finance_status,
    c.is_demo
ORDER BY c.candidate_name ASC;

CREATE OR REPLACE VIEW v_electoral_lab_summary AS
SELECT
    cfg.protocol_version,
    cfg.district_label,
    cfg.seat_count,
    cfg.is_laboratory_model,
    fn_electoral_valid_vote_count() AS total_valid_votes,
    fn_electoral_mandate_cost() AS mandate_cost,
    (SELECT COUNT(*) FROM electoral_candidates) AS candidate_count,
    (SELECT COUNT(*) FROM electoral_ballot_stream) AS ballot_stream_count
FROM electoral_lab_config cfg
WHERE cfg.config_id = 1;
