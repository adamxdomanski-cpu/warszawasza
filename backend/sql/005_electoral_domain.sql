-- Electoral domain — technical persistence layer (WARSZAWASZA / COP)
-- Requires 001_cop_init.sql (pgcrypto / gen_random_uuid)
-- Spec: fira/electoral/ARCHITECTURE.md · fira/electoral/DOMAIN_MODEL.md
-- Supersedes lab-only tables in 004 for new domain work (004 retained for migration order)

-- ---------------------------------------------------------------------------
-- Enumerations
-- ---------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE ballot_box_status AS ENUM (
    'SEALED',
    'OPENED',
    'PROCESSING',
    'CLOSED'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- A. Election context and territorial units
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS elections (
  election_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_type           VARCHAR(100) NOT NULL,
  execution_date          DATE NOT NULL,
  calculation_algorithm   VARCHAR(100) NOT NULL,

  CONSTRAINT elections_election_type_nonempty
    CHECK (length(trim(election_type)) > 0),
  CONSTRAINT elections_calculation_algorithm_nonempty
    CHECK (length(trim(calculation_algorithm)) > 0)
);

CREATE TABLE IF NOT EXISTS electoral_districts (
  district_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id             UUID NOT NULL
    REFERENCES elections (election_id) ON DELETE RESTRICT,
  district_number         INT NOT NULL,
  seat_capacity           INT NOT NULL,

  CONSTRAINT electoral_districts_number_positive
    CHECK (district_number > 0),
  CONSTRAINT electoral_districts_seat_capacity_nonnegative
    CHECK (seat_capacity >= 0),
  CONSTRAINT electoral_districts_unique_number_per_election
    UNIQUE (election_id, district_number)
);

CREATE TABLE IF NOT EXISTS polling_stations (
  station_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id             UUID NOT NULL
    REFERENCES electoral_districts (district_id) ON DELETE RESTRICT,
  station_number          INT NOT NULL,
  location_metadata       JSONB NOT NULL,

  CONSTRAINT polling_stations_number_positive
    CHECK (station_number > 0),
  CONSTRAINT polling_stations_location_metadata_object
    CHECK (jsonb_typeof(location_metadata) = 'object'),
  CONSTRAINT polling_stations_unique_number_per_district
    UNIQUE (district_id, station_number)
);

-- ---------------------------------------------------------------------------
-- B. Electoral subjects and funding disclosure
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS electoral_committees (
  committee_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id             UUID NOT NULL
    REFERENCES elections (election_id) ON DELETE RESTRICT,
  committee_name          VARCHAR(255) NOT NULL,

  CONSTRAINT electoral_committees_name_nonempty
    CHECK (length(trim(committee_name)) > 0)
);

CREATE TABLE IF NOT EXISTS funding_records (
  record_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id            UUID NOT NULL
    REFERENCES electoral_committees (committee_id) ON DELETE RESTRICT,
  timestamp               TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  amount                  NUMERIC(12, 2) NOT NULL,
  donor_hash_id           VARCHAR(64) NOT NULL,

  CONSTRAINT funding_records_amount_nonnegative
    CHECK (amount >= 0),
  CONSTRAINT funding_records_donor_hash_format
    CHECK (donor_hash_id ~ '^[a-f0-9]{64}$')
);

CREATE TABLE IF NOT EXISTS candidates (
  candidate_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  committee_id            UUID NOT NULL
    REFERENCES electoral_committees (committee_id) ON DELETE RESTRICT,
  district_id             UUID
    REFERENCES electoral_districts (district_id) ON DELETE RESTRICT,
  candidate_name          VARCHAR(255) NOT NULL,
  ballot_position         INT NOT NULL,

  CONSTRAINT candidates_name_nonempty
    CHECK (length(trim(candidate_name)) > 0),
  CONSTRAINT candidates_ballot_position_positive
    CHECK (ballot_position > 0)
);

-- ---------------------------------------------------------------------------
-- C. Ballot stream and audit log
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ballot_boxes (
  box_id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station_id              UUID NOT NULL
    REFERENCES polling_stations (station_id) ON DELETE RESTRICT,
  box_status              ballot_box_status NOT NULL DEFAULT 'SEALED'
);

CREATE TABLE IF NOT EXISTS ballot_event_stream (
  ballot_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id                  UUID NOT NULL
    REFERENCES ballot_boxes (box_id) ON DELETE RESTRICT,
  candidate_id            UUID NOT NULL
    REFERENCES candidates (candidate_id) ON DELETE RESTRICT,
  timestamp               TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  previous_ballot_hash    VARCHAR(64),
  current_ballot_hash     VARCHAR(64) NOT NULL UNIQUE,

  CONSTRAINT ballot_event_stream_previous_hash_format
    CHECK (
      previous_ballot_hash IS NULL
      OR previous_ballot_hash ~ '^[a-f0-9]{64}$'
    ),
  CONSTRAINT ballot_event_stream_current_hash_format
    CHECK (current_ballot_hash ~ '^[a-f0-9]{64}$')
);

CREATE TABLE IF NOT EXISTS election_audit_records (
  audit_id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id             UUID NOT NULL
    REFERENCES elections (election_id) ON DELETE RESTRICT,
  timestamp               TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  operation_type          VARCHAR(100) NOT NULL,
  operator_node_signature VARCHAR(255) NOT NULL,
  log_payload             JSONB NOT NULL,

  CONSTRAINT election_audit_records_operation_type_nonempty
    CHECK (length(trim(operation_type)) > 0),
  CONSTRAINT election_audit_records_operator_signature_nonempty
    CHECK (length(trim(operator_node_signature)) > 0),
  CONSTRAINT election_audit_records_log_payload_object
    CHECK (jsonb_typeof(log_payload) = 'object')
);

-- ---------------------------------------------------------------------------
-- D. Mandate allocation and published results (domain tree completion)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS electoral_mandates (
  mandate_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id             UUID NOT NULL
    REFERENCES elections (election_id) ON DELETE RESTRICT,
  candidate_id            UUID NOT NULL
    REFERENCES candidates (candidate_id) ON DELETE RESTRICT,
  district_id             UUID
    REFERENCES electoral_districts (district_id) ON DELETE RESTRICT,
  seat_number             INT NOT NULL,
  calculated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT electoral_mandates_seat_number_positive
    CHECK (seat_number > 0)
);

CREATE TABLE IF NOT EXISTS election_results (
  result_id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id                 UUID NOT NULL
    REFERENCES elections (election_id) ON DELETE RESTRICT,
  published_at                TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  result_payload              JSONB NOT NULL,
  verification_artifact_hash  VARCHAR(64),

  CONSTRAINT election_results_payload_object
    CHECK (jsonb_typeof(result_payload) = 'object'),
  CONSTRAINT election_results_verification_hash_format
    CHECK (
      verification_artifact_hash IS NULL
      OR verification_artifact_hash ~ '^[a-f0-9]{64}$'
    )
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_electoral_districts_election_id
  ON electoral_districts (election_id);

CREATE INDEX IF NOT EXISTS idx_polling_stations_district_id
  ON polling_stations (district_id);

CREATE INDEX IF NOT EXISTS idx_electoral_committees_election_id
  ON electoral_committees (election_id);

CREATE INDEX IF NOT EXISTS idx_funding_records_committee_id
  ON funding_records (committee_id);

CREATE INDEX IF NOT EXISTS idx_funding_records_timestamp
  ON funding_records (timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_candidates_committee_id
  ON candidates (committee_id);

CREATE INDEX IF NOT EXISTS idx_candidates_district_id
  ON candidates (district_id);

CREATE INDEX IF NOT EXISTS idx_ballot_boxes_station_id
  ON ballot_boxes (station_id);

CREATE INDEX IF NOT EXISTS idx_ballot_boxes_status
  ON ballot_boxes (box_status);

CREATE INDEX IF NOT EXISTS idx_ballot_event_stream_box_id
  ON ballot_event_stream (box_id);

CREATE INDEX IF NOT EXISTS idx_ballot_event_stream_candidate_id
  ON ballot_event_stream (candidate_id);

CREATE INDEX IF NOT EXISTS idx_ballot_event_stream_timestamp
  ON ballot_event_stream (timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_election_audit_records_election_id
  ON election_audit_records (election_id);

CREATE INDEX IF NOT EXISTS idx_election_audit_records_timestamp
  ON election_audit_records (timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_electoral_mandates_election_id
  ON electoral_mandates (election_id);

CREATE INDEX IF NOT EXISTS idx_electoral_mandates_candidate_id
  ON electoral_mandates (candidate_id);

CREATE INDEX IF NOT EXISTS idx_electoral_mandates_district_id
  ON electoral_mandates (district_id);

CREATE INDEX IF NOT EXISTS idx_election_results_election_id
  ON election_results (election_id);

CREATE INDEX IF NOT EXISTS idx_election_results_published_at
  ON election_results (published_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS uq_electoral_mandates_election_district_seat
  ON electoral_mandates (election_id, district_id, seat_number)
  WHERE district_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_electoral_mandates_election_seat_national
  ON electoral_mandates (election_id, seat_number)
  WHERE district_id IS NULL;
