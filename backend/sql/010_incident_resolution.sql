-- Citizen incident resolution — Scenario B (COP v1.0 / FOP/0.1)
-- WARSZAWASZA · CHANNEL_A_CITIZEN · zero PII
-- Spec: docs/protocol/trace-lifecycle-v1.md
-- Requires: 001_cop_init.sql applied
--
-- NOTE: Number 004 is reserved (electoral_protocol). This is migration 010.

-- ---------------------------------------------------------------------------
-- Link short trace ids (Ślad #20260627-022029) to civic_observations rows
-- ---------------------------------------------------------------------------
ALTER TABLE civic_observations
  ADD COLUMN IF NOT EXISTS trace_short_id TEXT;

COMMENT ON COLUMN civic_observations.trace_short_id IS
  'Human trace label without # prefix, e.g. 20260627-022029. Maps browser FOP artefact to DB row.';

CREATE UNIQUE INDEX IF NOT EXISTS idx_civic_observations_trace_short_id
  ON civic_observations (trace_short_id)
  WHERE trace_short_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- civic_incident_audit_records — Layer 6 audit (NOT election_audit_records)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS civic_incident_audit_records (
  audit_id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  observation_id          UUID NOT NULL
    REFERENCES civic_observations (observation_id) ON DELETE RESTRICT,
  timestamp               TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  operation_type          VARCHAR(100) NOT NULL,
  operator_node_signature VARCHAR(255) NOT NULL,
  log_payload             JSONB NOT NULL,

  CONSTRAINT civic_incident_audit_operation_type_nonempty
    CHECK (length(trim(operation_type)) > 0),
  CONSTRAINT civic_incident_audit_operator_signature_nonempty
    CHECK (length(trim(operator_node_signature)) > 0),
  CONSTRAINT civic_incident_audit_log_payload_object
    CHECK (jsonb_typeof(log_payload) = 'object')
);

COMMENT ON TABLE civic_incident_audit_records IS
  'Citizen incident lifecycle audit. RESOLVED / EXPIRED transitions — no voter or observer PII.';

CREATE INDEX IF NOT EXISTS idx_civic_incident_audit_observation_id
  ON civic_incident_audit_records (observation_id);

CREATE INDEX IF NOT EXISTS idx_civic_incident_audit_timestamp
  ON civic_incident_audit_records (timestamp DESC);

-- ---------------------------------------------------------------------------
-- resolve_civic_incident — Protocol 01 RESOLVED
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION resolve_civic_incident(
  p_trace_short_id TEXT,
  p_operator_node TEXT DEFAULT 'STUDIO:WAW_DZ3A7',
  p_resolution TEXT DEFAULT 'PHYSICAL_CLEANUP',
  p_sector TEXT DEFAULT 'Muranów'
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_obs_id UUID;
BEGIN
  UPDATE civic_observations
  SET status_indicator = 'STABLE',
      payload_value = 0
  WHERE trace_short_id = p_trace_short_id
  RETURNING observation_id INTO v_obs_id;

  IF v_obs_id IS NULL THEN
    RAISE EXCEPTION 'No civic_observations row for trace_short_id %', p_trace_short_id;
  END IF;

  INSERT INTO civic_incident_audit_records (
    observation_id,
    operation_type,
    operator_node_signature,
    log_payload
  ) VALUES (
    v_obs_id,
    'INCIDENT_RESOLVED',
    p_operator_node,
    jsonb_build_object(
      'target_id', p_trace_short_id,
      'resolution', p_resolution,
      'sector', p_sector,
      'fop_result', 'trajectory resolved'
    )
  );

  RETURN v_obs_id;
END;
$$;

COMMENT ON FUNCTION resolve_civic_incident IS
  'Close open trajectory: ALTERED → STABLE after Layer 0 physical cleanup fact.';

-- ---------------------------------------------------------------------------
-- expire_civic_incident — Protocol 02 EXPIRED
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION expire_civic_incident(
  p_trace_short_id TEXT,
  p_operator_node TEXT DEFAULT 'STUDIO:WAW_DZ3A7'
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_obs_id UUID;
BEGIN
  UPDATE civic_observations
  SET status_indicator = 'DISCONNECTED',
      payload_value = 0
  WHERE trace_short_id = p_trace_short_id
    AND status_indicator = 'ALTERED'
  RETURNING observation_id INTO v_obs_id;

  IF v_obs_id IS NULL THEN
    RAISE EXCEPTION 'No open (ALTERED) observation for trace_short_id %', p_trace_short_id;
  END IF;

  INSERT INTO civic_incident_audit_records (
    observation_id,
    operation_type,
    operator_node_signature,
    log_payload
  ) VALUES (
    v_obs_id,
    'INCIDENT_EXPIRED',
    p_operator_node,
    jsonb_build_object(
      'target_id', p_trace_short_id,
      'fop_result', 'trajectory expired'
    )
  );

  RETURN v_obs_id;
END;
$$;

-- ---------------------------------------------------------------------------
-- Example: Ślad #20260627-022029 (Dzielna / Zamenhofa · core-security)
-- Run once to register field ingest, then resolve after Layer 0 confirmation.
-- payload_value uses COP evidence scale 0–5 (not raw attention count 52).
-- ---------------------------------------------------------------------------
INSERT INTO civic_observations (
  trace_short_id,
  timestamp,
  metric_category,
  status_indicator,
  payload_value
) VALUES (
  '20260627-022029',
  TIMESTAMPTZ '2026-06-27T00:20:29.250Z',
  'CORE_SECURITY_MURANOW',
  'ALTERED',
  5
)
ON CONFLICT (trace_short_id) WHERE trace_short_id IS NOT NULL DO NOTHING;

-- Operator decision 01 RESOLVED (uncomment after Layer 0 fact confirmed):
-- SELECT resolve_civic_incident(
--   '20260627-022029',
--   'STUDIO:WAW_DZ3A7',
--   'PHYSICAL_CLEANUP',
--   'Muranów'
-- );
