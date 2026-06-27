-- Layer 0 validation chain + Trust Engine (Spec 85233 / COP v1.0)
-- WARSZAWASZA · zero-PII · pseudonymous operator_node_id only
-- Spec: docs/protocol/layers-spec-85233.md
-- Requires: 001_cop_init.sql applied

-- ---------------------------------------------------------------------------
-- Enumerations
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE layer0_pipeline_stage AS ENUM (
    'UNVERIFIED',
    'PRESENCE_OK',
    'OBSERVATION_OK',
    'INTEGRITY_OK',
    'CONSENSUS_OK',
    'VERIFIED',
    'REJECTED'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE reputation_event_type AS ENUM (
    'OBSERVATION_CONFIRMED',
    'OBSERVATION_REJECTED',
    'FABRICATION_DETECTED',
    'EXIF_MANIPULATION',
    'CONSENSUS_CONFIRMED',
    'FALSE_POSITIVE',
    'REPEATED_ABUSE',
    'PRESENCE_FAILURE',
    'MANUAL_ADJUSTMENT'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- layer0_validation_records — pipeline state per observation
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS layer0_validation_records (
  validation_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  observation_id        UUID NOT NULL
    REFERENCES civic_observations (observation_id) ON DELETE CASCADE,

  pipeline_stage        layer0_pipeline_stage NOT NULL DEFAULT 'UNVERIFIED',

  -- L0.1 Proof of Presence
  presence_score        NUMERIC(5, 4)
    CHECK (presence_score IS NULL OR (presence_score >= 0 AND presence_score <= 1)),
  anchor_lat            DOUBLE PRECISION,
  anchor_lon            DOUBLE PRECISION,
  operator_lat          DOUBLE PRECISION,
  operator_lon          DOUBLE PRECISION,
  distance_m            DOUBLE PRECISION,
  presence_signals      JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- L0.2 / L0.3 media integrity (hashes only — no binary in DB)
  media_content_hash    TEXT,
  media_exif_hash       TEXT,
  integrity_notes       TEXT,

  -- L0.4 consensus
  consensus_confirmations SMALLINT NOT NULL DEFAULT 0
    CHECK (consensus_confirmations >= 0),
  consensus_required    SMALLINT NOT NULL DEFAULT 2
    CHECK (consensus_required >= 1 AND consensus_required <= 5),

  rejection_reason      TEXT,
  validated_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT layer0_validation_presence_signals_object
    CHECK (jsonb_typeof(presence_signals) = 'object'),
  CONSTRAINT layer0_validation_observation_unique UNIQUE (observation_id)
);

COMMENT ON TABLE layer0_validation_records IS
  'Layer 0 validation pipeline per civic_observation. Spec 85233 — no observer PII.';

COMMENT ON COLUMN layer0_validation_records.presence_signals IS
  'Decomposed L0.1 inputs: gps_confidence, wifi_proximity, bluetooth_beacon, motion_consistency, time_consistency.';

CREATE INDEX IF NOT EXISTS idx_layer0_validation_pipeline_stage
  ON layer0_validation_records (pipeline_stage);

CREATE INDEX IF NOT EXISTS idx_layer0_validation_validated_at
  ON layer0_validation_records (validated_at DESC)
  WHERE validated_at IS NOT NULL;

-- ---------------------------------------------------------------------------
-- user_reputation_events — append-only audit log
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_reputation_events (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Pseudonymous node id (e.g. STUDIO:WAW_DZ3A7). NOT email, name, or IP.
  operator_node_id      VARCHAR(255) NOT NULL,

  timestamp             TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_type            reputation_event_type NOT NULL,
  weight                SMALLINT NOT NULL,

  reason                TEXT,
  anchor_id             UUID,
  observation_id        UUID
    REFERENCES civic_observations (observation_id) ON DELETE SET NULL,

  CONSTRAINT user_reputation_events_operator_node_nonempty
    CHECK (length(trim(operator_node_id)) > 0)
);

COMMENT ON TABLE user_reputation_events IS
  'Trust Engine event log. Every trust_score change must be reconstructible from here.';

CREATE INDEX IF NOT EXISTS idx_user_reputation_events_operator_node_id
  ON user_reputation_events (operator_node_id, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_user_reputation_events_observation_id
  ON user_reputation_events (observation_id)
  WHERE observation_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- user_reputation_scores — current aggregate per operator node
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_reputation_scores (
  operator_node_id      VARCHAR(255) PRIMARY KEY,

  observation_score     NUMERIC(6, 2) NOT NULL DEFAULT 100
    CHECK (observation_score >= 0 AND observation_score <= 100),
  verification_score    NUMERIC(6, 2) NOT NULL DEFAULT 100
    CHECK (verification_score >= 0 AND verification_score <= 100),
  false_positive_score  NUMERIC(6, 2) NOT NULL DEFAULT 0
    CHECK (false_positive_score >= 0 AND false_positive_score <= 100),
  response_time_score   NUMERIC(6, 2) NOT NULL DEFAULT 100
    CHECK (response_time_score >= 0 AND response_time_score <= 100),
  consensus_score       NUMERIC(6, 2) NOT NULL DEFAULT 100
    CHECK (consensus_score >= 0 AND consensus_score <= 100),

  trust_score           NUMERIC(6, 2) NOT NULL DEFAULT 100
    CHECK (trust_score >= 0 AND trust_score <= 100),

  -- 0 = none, 1 = temporary block, 2 = permanent block (operator review)
  sanction_level        SMALLINT NOT NULL DEFAULT 0
    CHECK (sanction_level >= 0 AND sanction_level <= 2),
  sanction_until        TIMESTAMPTZ,

  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT user_reputation_scores_operator_node_nonempty
    CHECK (length(trim(operator_node_id)) > 0)
);

COMMENT ON TABLE user_reputation_scores IS
  'Trust Engine aggregate. Starts at 100; see layers-spec-85233.md for deltas and thresholds.';

-- ---------------------------------------------------------------------------
-- apply_reputation_event — atomic log + aggregate update
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION apply_reputation_event(
  p_operator_node_id TEXT,
  p_event_type reputation_event_type,
  p_weight SMALLINT,
  p_reason TEXT DEFAULT NULL,
  p_anchor_id UUID DEFAULT NULL,
  p_observation_id UUID DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_event_id UUID;
  v_new_trust NUMERIC(6, 2);
  v_abuse_count INT;
BEGIN
  IF length(trim(p_operator_node_id)) = 0 THEN
    RAISE EXCEPTION 'operator_node_id must be non-empty';
  END IF;

  INSERT INTO user_reputation_events (
    operator_node_id,
    event_type,
    weight,
    reason,
    anchor_id,
    observation_id
  ) VALUES (
    trim(p_operator_node_id),
    p_event_type,
    p_weight,
    p_reason,
    p_anchor_id,
    p_observation_id
  )
  RETURNING id INTO v_event_id;

  INSERT INTO user_reputation_scores (operator_node_id)
  VALUES (trim(p_operator_node_id))
  ON CONFLICT (operator_node_id) DO NOTHING;

  UPDATE user_reputation_scores
  SET
    trust_score = GREATEST(0, LEAST(100, trust_score + p_weight)),
    observation_score = CASE
      WHEN p_event_type IN ('OBSERVATION_CONFIRMED', 'OBSERVATION_REJECTED')
        THEN GREATEST(0, LEAST(100, observation_score + p_weight))
      ELSE observation_score
    END,
    verification_score = CASE
      WHEN p_event_type IN ('EXIF_MANIPULATION', 'FABRICATION_DETECTED')
        THEN GREATEST(0, LEAST(100, verification_score + p_weight))
      ELSE verification_score
    END,
    false_positive_score = CASE
      WHEN p_event_type = 'OBSERVATION_REJECTED'
        THEN GREATEST(0, LEAST(100, false_positive_score + ABS(p_weight)))
      WHEN p_event_type = 'FALSE_POSITIVE'
        THEN GREATEST(0, LEAST(100, false_positive_score + 1))
      ELSE false_positive_score
    END,
    consensus_score = CASE
      WHEN p_event_type = 'CONSENSUS_CONFIRMED'
        THEN GREATEST(0, LEAST(100, consensus_score + p_weight))
      ELSE consensus_score
    END,
    updated_at = now()
  WHERE operator_node_id = trim(p_operator_node_id)
  RETURNING trust_score INTO v_new_trust;

  -- Escalating sanctions (no instant permanent ban on first offense)
  IF v_new_trust < 10 THEN
    SELECT COUNT(*) INTO v_abuse_count
    FROM user_reputation_events
    WHERE operator_node_id = trim(p_operator_node_id)
      AND event_type IN ('EXIF_MANIPULATION', 'FABRICATION_DETECTED')
      AND timestamp > now() - INTERVAL '90 days';

    IF v_abuse_count >= 3 THEN
      UPDATE user_reputation_scores
      SET sanction_level = 2, sanction_until = NULL, updated_at = now()
      WHERE operator_node_id = trim(p_operator_node_id);
    END IF;
  ELSIF v_new_trust < 30 THEN
    UPDATE user_reputation_scores
    SET sanction_level = 1,
        sanction_until = now() + INTERVAL '7 days',
        updated_at = now()
    WHERE operator_node_id = trim(p_operator_node_id)
      AND sanction_level < 2;
  ELSIF v_new_trust < 50 THEN
    UPDATE user_reputation_scores
    SET sanction_level = 1,
        sanction_until = now() + INTERVAL '1 day',
        updated_at = now()
    WHERE operator_node_id = trim(p_operator_node_id)
      AND sanction_level < 2;
  END IF;

  IF p_event_type = 'REPEATED_ABUSE' THEN
    UPDATE user_reputation_scores
    SET sanction_level = 1,
        sanction_until = now() + INTERVAL '24 hours',
        updated_at = now()
    WHERE operator_node_id = trim(p_operator_node_id)
      AND sanction_level < 2;
  END IF;

  RETURN v_event_id;
END;
$$;

COMMENT ON FUNCTION apply_reputation_event IS
  'Append reputation event and update user_reputation_scores.trust_score with graduated sanctions.';
