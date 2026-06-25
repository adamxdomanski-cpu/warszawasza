-- Referendum domain — technical persistence layer (WARSZAWASZA / COP)
-- Requires: 001_cop_init.sql (pgcrypto), 005_electoral_domain.sql (ballot_boxes)
-- Spec: fira/electoral/REFERENDUM_ARCHITECTURE.md
-- Territorial path: electoral_districts → polling_stations → ballot_boxes (005) — not duplicated here.

-- ---------------------------------------------------------------------------
-- A. Referendum context and questions
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS referendums (
  referendum_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                   VARCHAR(500) NOT NULL,
  execution_date          DATE NOT NULL,
  legal_basis             TEXT NOT NULL,

  CONSTRAINT referendums_title_nonempty
    CHECK (length(trim(title)) > 0),
  CONSTRAINT referendums_legal_basis_nonempty
    CHECK (length(trim(legal_basis)) > 0)
);

COMMENT ON TABLE referendums IS
  'Root aggregate for a referendum event. legal_basis stores a cited text reference only — not a normative endorsement.';

COMMENT ON COLUMN referendums.legal_basis IS
  'Factual citation of governing text (e.g. constitutional article label). Interpretation belongs in normative docs, not this column.';

CREATE TABLE IF NOT EXISTS referendum_questions (
  question_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referendum_id           UUID NOT NULL
    REFERENCES referendums (referendum_id) ON DELETE RESTRICT,
  question_number         INT NOT NULL,
  question_text           TEXT NOT NULL,

  CONSTRAINT referendum_questions_number_positive
    CHECK (question_number > 0),
  CONSTRAINT referendum_questions_text_nonempty
    CHECK (length(trim(question_text)) > 0),
  CONSTRAINT referendum_questions_unique_number_per_referendum
    UNIQUE (referendum_id, question_number)
);

COMMENT ON TABLE referendum_questions IS
  'Ballot questions scoped to one referendum. question_text is the published wording snapshot.';

-- ---------------------------------------------------------------------------
-- B. Referendum ballot stream (reuses ballot_boxes from 005)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS referendum_ballot_stream (
  ballot_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id                  UUID NOT NULL
    REFERENCES ballot_boxes (box_id) ON DELETE RESTRICT,
  question_id             UUID NOT NULL
    REFERENCES referendum_questions (question_id) ON DELETE RESTRICT,
  vote_value              VARCHAR(10) NOT NULL,
  timestamp               TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  previous_hash           VARCHAR(64),
  current_hash            VARCHAR(64) NOT NULL UNIQUE,

  CONSTRAINT referendum_ballot_stream_vote_value_check
    CHECK (vote_value IN ('TAK', 'NIE', 'INVALID')),
  CONSTRAINT referendum_ballot_stream_previous_hash_format
    CHECK (
      previous_hash IS NULL
      OR previous_hash ~ '^[a-f0-9]{64}$'
    ),
  CONSTRAINT referendum_ballot_stream_current_hash_format
    CHECK (current_hash ~ '^[a-f0-9]{64}$')
);

COMMENT ON TABLE referendum_ballot_stream IS
  'Append-only referendum cast events per ballot box and question. Hash chain columns — no voter PII.';

COMMENT ON COLUMN referendum_ballot_stream.vote_value IS
  'Mark classification: TAK, NIE, or INVALID (spoiled/ambiguous). Not a political outcome label.';

COMMENT ON COLUMN referendum_ballot_stream.previous_hash IS
  'Prior link in per-box-per-question hash chain. NULL for genesis row.';

COMMENT ON COLUMN referendum_ballot_stream.current_hash IS
  'Unique chain link digest for this event. Replay detects duplicates.';

-- ---------------------------------------------------------------------------
-- C. Referendum audit log
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS referendum_audit_records (
  audit_id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referendum_id           UUID NOT NULL
    REFERENCES referendums (referendum_id) ON DELETE RESTRICT,
  timestamp               TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  operation_type          VARCHAR(100) NOT NULL,
  operator_node_signature VARCHAR(255) NOT NULL,
  log_payload             JSONB NOT NULL,

  CONSTRAINT referendum_audit_records_operation_type_nonempty
    CHECK (length(trim(operation_type)) > 0),
  CONSTRAINT referendum_audit_records_operator_signature_nonempty
    CHECK (length(trim(operator_node_signature)) > 0),
  CONSTRAINT referendum_audit_records_log_payload_object
    CHECK (jsonb_typeof(log_payload) = 'object')
);

COMMENT ON TABLE referendum_audit_records IS
  'Referendum-scoped audit log. operation_type + log_payload — no voter or observer PII.';

-- ---------------------------------------------------------------------------
-- D. Live analytics view (derived, non-authoritative)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW v_referendum_live_analytics AS
WITH question_totals AS (
  SELECT
    rq.referendum_id,
    rq.question_id,
    rq.question_number,
    rq.question_text,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value = 'TAK')::BIGINT AS tak_count,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value = 'NIE')::BIGINT AS nie_count,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value = 'INVALID')::BIGINT AS invalid_count,
    COUNT(rbs.ballot_id)::BIGINT AS total_ballots,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value IN ('TAK', 'NIE'))::BIGINT AS valid_ballots
  FROM referendum_questions rq
  LEFT JOIN referendum_ballot_stream rbs ON rbs.question_id = rq.question_id
  GROUP BY
    rq.referendum_id,
    rq.question_id,
    rq.question_number,
    rq.question_text
),
district_totals AS (
  SELECT
    rq.referendum_id,
    rq.question_id,
    ed.district_id,
    ed.district_number,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value = 'TAK')::BIGINT AS district_tak_count,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value = 'NIE')::BIGINT AS district_nie_count,
    COUNT(rbs.ballot_id) FILTER (WHERE rbs.vote_value = 'INVALID')::BIGINT AS district_invalid_count,
    COUNT(rbs.ballot_id)::BIGINT AS district_total_ballots
  FROM referendum_questions rq
  JOIN referendum_ballot_stream rbs ON rbs.question_id = rq.question_id
  JOIN ballot_boxes bb ON bb.box_id = rbs.box_id
  JOIN polling_stations ps ON ps.station_id = bb.station_id
  JOIN electoral_districts ed ON ed.district_id = ps.district_id
  GROUP BY
    rq.referendum_id,
    rq.question_id,
    ed.district_id,
    ed.district_number
)
SELECT
  r.referendum_id,
  r.title,
  r.execution_date,
  r.legal_basis,
  qt.question_id,
  qt.question_number,
  qt.question_text,
  qt.tak_count,
  qt.nie_count,
  qt.invalid_count,
  qt.total_ballots,
  qt.valid_ballots,
  CASE
    WHEN qt.valid_ballots > 0
      THEN ROUND(qt.tak_count::NUMERIC / qt.valid_ballots::NUMERIC, 6)
    ELSE NULL
  END AS tak_share_valid,
  CASE
    WHEN qt.valid_ballots > 0
      THEN ROUND(qt.nie_count::NUMERIC / qt.valid_ballots::NUMERIC, 6)
    ELSE NULL
  END AS nie_share_valid,
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'district_id', dt.district_id,
          'district_number', dt.district_number,
          'tak_count', dt.district_tak_count,
          'nie_count', dt.district_nie_count,
          'invalid_count', dt.district_invalid_count,
          'total_ballots', dt.district_total_ballots
        )
        ORDER BY dt.district_number
      )
      FROM district_totals dt
      WHERE dt.referendum_id = r.referendum_id
        AND dt.question_id = qt.question_id
    ),
    '[]'::jsonb
  ) AS district_breakdown,
  CASE
    WHEN qt.total_ballots = 0 THEN 'PENDING'
    ELSE 'ACTIVE'
  END AS tally_status
FROM referendums r
JOIN question_totals qt ON qt.referendum_id = r.referendum_id;

COMMENT ON VIEW v_referendum_live_analytics IS
  'Interim per-question tallies from referendum_ballot_stream. Non-authoritative — not PKW or official results.';

COMMENT ON COLUMN v_referendum_live_analytics.tak_share_valid IS
  'Ratio tak_count / valid_ballots. Quorum and binding thresholds are normative — not computed here.';

COMMENT ON COLUMN v_referendum_live_analytics.district_breakdown IS
  'Per-district aggregates via ballot_boxes → polling_stations → electoral_districts (005).';

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_referendum_questions_referendum_id
  ON referendum_questions (referendum_id);

CREATE INDEX IF NOT EXISTS idx_referendum_ballot_stream_box_id
  ON referendum_ballot_stream (box_id);

CREATE INDEX IF NOT EXISTS idx_referendum_ballot_stream_question_id
  ON referendum_ballot_stream (question_id);

CREATE INDEX IF NOT EXISTS idx_referendum_ballot_stream_timestamp
  ON referendum_ballot_stream (timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_referendum_audit_records_referendum_id
  ON referendum_audit_records (referendum_id);

CREATE INDEX IF NOT EXISTS idx_referendum_audit_records_timestamp
  ON referendum_audit_records (timestamp DESC);
