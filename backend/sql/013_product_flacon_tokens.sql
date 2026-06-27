-- Product flacon hardware auth registry (COP v1.0 / O2O loop)
-- WARSZAWASZA · Zapach WARSZAWASZA · zero natural-person PII
-- Spec: branch F / PR #13 — flacon token ≠ Layer 0 terrain verification
-- Requires: 001_cop_init.sql (pgcrypto / gen_random_uuid)

-- ---------------------------------------------------------------------------
-- product_flacon_tokens — physical scent unit ↔ telemetry grid binding
-- associated_operator_id references a COP operator NODE (e.g. state_registry
-- or studio anchor UUID), never a natural-person user account.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_flacon_tokens (
  flacon_serial_id      VARCHAR(16) PRIMARY KEY,
  cryptographic_token   UUID NOT NULL DEFAULT gen_random_uuid(),
  associated_operator_id UUID DEFAULT NULL,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lifecycle_state       VARCHAR(20) NOT NULL DEFAULT 'FORGED',

  CONSTRAINT chk_product_flacon_lifecycle_state
    CHECK (lifecycle_state IN ('FORGED', 'SOLD', 'ACTIVE')),
  CONSTRAINT chk_product_flacon_serial_nonempty
    CHECK (length(trim(flacon_serial_id)) > 0)
);

COMMENT ON TABLE product_flacon_tokens IS
  'Hardware flacon serial ↔ crypto token. Purchase/activation does NOT grant verified field-operator status (Layer 0).';

COMMENT ON COLUMN product_flacon_tokens.associated_operator_id IS
  'Optional COP operator node UUID (studio / registry anchor). Not end-user identity.';

CREATE UNIQUE INDEX IF NOT EXISTS idx_flacon_crypto_token
  ON product_flacon_tokens (cryptographic_token);

CREATE INDEX IF NOT EXISTS idx_flacon_lifecycle_state
  ON product_flacon_tokens (lifecycle_state);
