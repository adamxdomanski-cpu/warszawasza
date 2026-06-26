-- Local Initiative layer — COP v1.0 extension
-- WARSZAWASZA distribution · courtyard pivot · zero-PII place metadata
-- Spec: fira/LOCAL_INITIATIVE_MODEL.md · requires 001_cop_init.sql

-- ---------------------------------------------------------------------------
-- focus_areas
-- Machine slug + human display names (PL/EN). Slug is canonical for code/SQL joins.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS focus_areas (
  focus_area_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Canonical machine identifier (e.g. WASTE_NAV). Unique across COP store.
  slug              VARCHAR(64) NOT NULL,

  display_name_pl   VARCHAR(255) NOT NULL,
  display_name_en   VARCHAR(255) NOT NULL,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT focus_areas_slug_unique
    UNIQUE (slug),
  CONSTRAINT focus_areas_slug_nonempty
    CHECK (length(trim(slug)) > 0),
  CONSTRAINT focus_areas_display_name_pl_nonempty
    CHECK (length(trim(display_name_pl)) > 0),
  CONSTRAINT focus_areas_display_name_en_nonempty
    CHECK (length(trim(display_name_en)) > 0)
);

COMMENT ON TABLE focus_areas IS
  'Local initiative focus domains — slug for code, display names for humans. Spec: fira/LOCAL_INITIATIVE_MODEL.md';

COMMENT ON COLUMN focus_areas.slug IS
  'Machine identifier (WASTE_NAV). Never shown raw in user-facing UI.';
COMMENT ON COLUMN focus_areas.display_name_pl IS
  'Polish display label (e.g. FIRA Waste Navigation).';
COMMENT ON COLUMN focus_areas.display_name_en IS
  'English display label.';

-- ---------------------------------------------------------------------------
-- local_micro_nodes
-- Internal table name — UX: "Inicjatywa lokalna" / Place / Community Node.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS local_micro_nodes (
  micro_node_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  focus_area_id     UUID NOT NULL REFERENCES focus_areas (focus_area_id),

  -- Local partner or community anchor (organization name — not natural person).
  partner_label     VARCHAR(255) NOT NULL,

  -- Street address or courtyard identifier (public place metadata).
  address           VARCHAR(255) NOT NULL,

  -- Warsaw district / sector for horizontal expansion (Muranów, Wola, Praga).
  district          VARCHAR(100) NOT NULL,

  -- Initiative lifecycle (Pilot | Active | Paused).
  status            VARCHAR(32) NOT NULL DEFAULT 'Pilot',

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT local_micro_nodes_partner_label_nonempty
    CHECK (length(trim(partner_label)) > 0),
  CONSTRAINT local_micro_nodes_address_nonempty
    CHECK (length(trim(address)) > 0),
  CONSTRAINT local_micro_nodes_district_nonempty
    CHECK (length(trim(district)) > 0),
  CONSTRAINT local_micro_nodes_status_valid
    CHECK (status IN ('Pilot', 'Active', 'Paused'))
);

COMMENT ON TABLE local_micro_nodes IS
  'Local initiative anchors — one courtyard, one prototype. Internal name; UX: Inicjatywa lokalna.';

COMMENT ON COLUMN local_micro_nodes.partner_label IS
  'Local partner label (e.g. Partnerstwo Muranów).';
COMMENT ON COLUMN local_micro_nodes.district IS
  'District for lateral expansion — Muranów → Wola → Praga.';

CREATE INDEX IF NOT EXISTS idx_local_micro_nodes_focus_area_id
  ON local_micro_nodes (focus_area_id);

CREATE INDEX IF NOT EXISTS idx_local_micro_nodes_district
  ON local_micro_nodes (district);

CREATE INDEX IF NOT EXISTS idx_local_micro_nodes_status
  ON local_micro_nodes (status);

-- ---------------------------------------------------------------------------
-- Seed: Muranów pilot (idempotent)
-- ---------------------------------------------------------------------------
INSERT INTO focus_areas (slug, display_name_pl, display_name_en)
VALUES (
  'WASTE_NAV',
  'FIRA Waste Navigation',
  'FIRA Waste Navigation'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO local_micro_nodes (
  focus_area_id,
  partner_label,
  address,
  district,
  status
)
SELECT
  fa.focus_area_id,
  'Partnerstwo Muranów',
  'Dzielna 3A/7',
  'Muranów',
  'Pilot'
FROM focus_areas fa
WHERE fa.slug = 'WASTE_NAV'
  AND NOT EXISTS (
    SELECT 1
    FROM local_micro_nodes n
    WHERE n.partner_label = 'Partnerstwo Muranów'
      AND n.address = 'Dzielna 3A/7'
  );
