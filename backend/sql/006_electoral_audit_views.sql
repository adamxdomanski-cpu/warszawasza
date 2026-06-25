-- Published Audit Artifacts — electoral domain views (WARSZAWASZA / COP)
-- Requires: 001_cop_init.sql (pgcrypto), 005_electoral_domain.sql
-- Spec: fira/electoral/AUDIT_ARTIFACTS.md · fira/electoral/ARCHITECTURE.md
-- Crypto honesty: 005 stores a per-ballot HASH CHAIN (previous_ballot_hash → current_ballot_hash).
--   These views verify that chain. They do NOT implement a full Merkle tree without a separate spec.

-- ---------------------------------------------------------------------------
-- Integrity status enum (view output label)
-- ---------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE electoral_integrity_status AS ENUM (
    'VALID',
    'BROKEN',
    'PENDING'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- fn_electoral_ballot_chain_link_ok
-- Returns FALSE when a single stream row breaks the hash-chain rules.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION fn_electoral_ballot_chain_link_ok(
  p_seq BIGINT,
  p_previous_ballot_hash VARCHAR(64),
  p_expected_previous_hash VARCHAR(64)
)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_seq = 1 THEN p_previous_ballot_hash IS NULL
    ELSE p_previous_ballot_hash IS NOT NULL
      AND p_previous_ballot_hash = p_expected_previous_hash
  END;
$$;

COMMENT ON FUNCTION fn_electoral_ballot_chain_link_ok IS
  'Hash-chain link check for ballot_event_stream. Seq 1 must have NULL previous; later rows must match LAG(current).';

-- ---------------------------------------------------------------------------
-- v_ballot_box_integrity — Suma Kontrolna Urny (chain head, not Merkle root)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW v_ballot_box_integrity AS
WITH ordered_events AS (
  SELECT
    bes.box_id,
    bes.ballot_id,
    bes.previous_ballot_hash,
    bes.current_ballot_hash,
    bes.timestamp,
    ROW_NUMBER() OVER (
      PARTITION BY bes.box_id
      ORDER BY bes.timestamp ASC, bes.ballot_id ASC
    ) AS event_sequence,
    LAG(bes.current_ballot_hash) OVER (
      PARTITION BY bes.box_id
      ORDER BY bes.timestamp ASC, bes.ballot_id ASC
    ) AS expected_previous_hash
  FROM ballot_event_stream bes
),
per_box AS (
  SELECT
    oe.box_id,
    COUNT(*)::BIGINT AS ballot_count,
    BOOL_AND(
      fn_electoral_ballot_chain_link_ok(
        oe.event_sequence,
        oe.previous_ballot_hash,
        oe.expected_previous_hash
      )
    ) AS chain_links_ok
  FROM ordered_events oe
  GROUP BY oe.box_id
),
chain_heads AS (
  SELECT DISTINCT ON (oe.box_id)
    oe.box_id,
    oe.current_ballot_hash AS chain_head_hash
  FROM ordered_events oe
  ORDER BY oe.box_id, oe.event_sequence DESC
)
SELECT
  bb.box_id,
  ps.station_id,
  ed.election_id,
  COALESCE(pb.ballot_count, 0::BIGINT) AS ballot_count,
  ch.chain_head_hash,
  'HASH_CHAIN'::TEXT AS integrity_model,
  NULL::VARCHAR(64) AS merkle_root_hash,
  CASE
    WHEN COALESCE(pb.ballot_count, 0) = 0 THEN 'PENDING'::electoral_integrity_status
    WHEN pb.chain_links_ok THEN 'VALID'::electoral_integrity_status
    ELSE 'BROKEN'::electoral_integrity_status
  END AS integrity_status
FROM ballot_boxes bb
JOIN polling_stations ps ON ps.station_id = bb.station_id
JOIN electoral_districts ed ON ed.district_id = ps.district_id
LEFT JOIN per_box pb ON pb.box_id = bb.box_id
LEFT JOIN chain_heads ch ON ch.box_id = bb.box_id;

COMMENT ON VIEW v_ballot_box_integrity IS
  'Per-urn hash-chain integrity: chain_head_hash + VALID/BROKEN/PENDING. merkle_root_hash is NULL until a Merkle spec is published.';

COMMENT ON COLUMN v_ballot_box_integrity.chain_head_hash IS
  'Tip of the per-box ballot_event_stream hash chain (integrity_hash publish field).';

COMMENT ON COLUMN v_ballot_box_integrity.merkle_root_hash IS
  'Reserved. Full Merkle verification requires a published leaf-pairing spec — not implied by 005.';

-- ---------------------------------------------------------------------------
-- v_audit_log_stream — sequential election_audit_records export shape
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW v_audit_log_stream AS
SELECT
  ROW_NUMBER() OVER (
    PARTITION BY ear.election_id
    ORDER BY ear.timestamp ASC, ear.audit_id ASC
  )::BIGINT AS audit_sequence_id,
  ear.audit_id,
  ear.election_id,
  ear.timestamp AS recorded_at,
  ear.operation_type,
  ear.operator_node_signature,
  ear.log_payload,
  encode(
    digest(
      ear.audit_id::TEXT
        || '|' || ear.election_id::TEXT
        || '|' || ear.timestamp::TEXT
        || '|' || ear.operation_type
        || '|' || ear.log_payload::TEXT,
      'sha256'
    ),
    'hex'
  ) AS audit_record_digest
FROM election_audit_records ear;

COMMENT ON VIEW v_audit_log_stream IS
  'Ordered audit log for publication. operation_type examples: BOX_UNSEAL, VOTE_REGISTERED, ALGORITHM_TRIGGER.';

COMMENT ON COLUMN v_audit_log_stream.audit_sequence_id IS
  'Monotonic sequence per election_id for deterministic export ordering.';

COMMENT ON COLUMN v_audit_log_stream.audit_record_digest IS
  'SHA-256 digest of canonical audit row fields — export checksum, not legal signature.';

-- ---------------------------------------------------------------------------
-- v_election_determinism_input — JSON artifact for mandate replication
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW v_election_determinism_input AS
WITH candidate_votes AS (
  SELECT
    ed.election_id,
    ed.district_id,
    ed.district_number,
    ed.seat_capacity,
    c.candidate_id,
    c.candidate_name,
    c.ballot_position,
    ec.committee_id,
    ec.committee_name,
    COUNT(bes.ballot_id)::BIGINT AS vote_count
  FROM elections e
  JOIN electoral_districts ed ON ed.election_id = e.election_id
  JOIN candidates c ON c.district_id = ed.district_id
  JOIN electoral_committees ec ON ec.committee_id = c.committee_id
  LEFT JOIN ballot_event_stream bes ON bes.candidate_id = c.candidate_id
  GROUP BY
    ed.election_id,
    ed.district_id,
    ed.district_number,
    ed.seat_capacity,
    c.candidate_id,
    c.candidate_name,
    c.ballot_position,
    ec.committee_id,
    ec.committee_name
),
district_agg AS (
  SELECT
    cv.election_id,
    jsonb_agg(
      jsonb_build_object(
        'district_id', cv.district_id,
        'district_number', cv.district_number,
        'seat_capacity', cv.seat_capacity
      )
      ORDER BY cv.district_number
    ) AS districts
  FROM (
    SELECT DISTINCT
      election_id,
      district_id,
      district_number,
      seat_capacity
    FROM candidate_votes
  ) cv
  GROUP BY cv.election_id
),
candidate_agg AS (
  SELECT
    cv.election_id,
    jsonb_agg(
      jsonb_build_object(
        'candidate_id', cv.candidate_id,
        'candidate_name', cv.candidate_name,
        'ballot_position', cv.ballot_position,
        'committee_id', cv.committee_id,
        'committee_name', cv.committee_name,
        'district_id', cv.district_id,
        'district_number', cv.district_number,
        'vote_count', cv.vote_count
      )
      ORDER BY cv.district_number, cv.ballot_position, cv.candidate_name
    ) AS candidates
  FROM candidate_votes cv
  GROUP BY cv.election_id
),
payload AS (
  SELECT
    e.election_id,
    jsonb_build_object(
      'artifact_type', 'determinism_input',
      'artifact_version', 'cop-electoral-audit-1',
      'election_id', e.election_id,
      'election_type', e.election_type,
      'execution_date', e.execution_date,
      'calculation_algorithm', e.calculation_algorithm,
      'districts', COALESCE(da.districts, '[]'::jsonb),
      'candidates', COALESCE(ca.candidates, '[]'::jsonb)
    ) AS determinism_input
  FROM elections e
  LEFT JOIN district_agg da ON da.election_id = e.election_id
  LEFT JOIN candidate_agg ca ON ca.election_id = e.election_id
)
SELECT
  p.election_id,
  p.determinism_input,
  encode(digest(p.determinism_input::TEXT, 'sha256'), 'hex') AS determinism_checksum
FROM payload p;

COMMENT ON VIEW v_election_determinism_input IS
  'Published raw JSON input for independent mandate replication via scripts/electoral_mandate_proof.py.';

COMMENT ON COLUMN v_election_determinism_input.determinism_checksum IS
  'SHA-256 of determinism_input JSON text — verify downloaded artifact before running proof script.';
