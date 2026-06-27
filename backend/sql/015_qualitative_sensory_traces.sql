-- Qualitative sensory traces — thick mapping (Kietlińska 2018)
-- COP v1.0 · narrative / semiotic layer · NOT Layer 0 verification
-- Seed: backend/data/kietlinska_seed.json
-- Requires: 001_cop_init.sql (optional link via trace_short_id after 010)

CREATE TABLE IF NOT EXISTS qualitative_sensory_traces (
  trace_id                TEXT PRIMARY KEY,
  linked_trace_short_id   TEXT,
  sense                   VARCHAR(10) NOT NULL,
  temperature             VARCHAR(20) NOT NULL,
  category_general        TEXT NOT NULL,
  category_detailed       TEXT NOT NULL,
  narrative_excerpt       TEXT NOT NULL,
  anchor_lat              DOUBLE PRECISION NOT NULL,
  anchor_lng              DOUBLE PRECISION NOT NULL,
  sector                  TEXT NOT NULL,
  theme                   TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT chk_qualitative_sense
    CHECK (sense IN ('WECH', 'WZROK', 'SLUCH', 'DOTYK', 'SMAK')),
  CONSTRAINT chk_qualitative_temperature
    CHECK (temperature IN ('POSITIVE', 'NEUTRAL', 'AMBIVALENT', 'NEGATIVE')),
  CONSTRAINT chk_qualitative_narrative_nonempty
    CHECK (length(trim(narrative_excerpt)) > 0)
);

COMMENT ON TABLE qualitative_sensory_traces IS
  'Thick-mapping qualitative layer (Kietlińska 2018). Embodied narratives — separate from civic_observations metrics.';

CREATE INDEX IF NOT EXISTS idx_qualitative_sensory_linked_trace
  ON qualitative_sensory_traces (linked_trace_short_id)
  WHERE linked_trace_short_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_qualitative_sensory_sector
  ON qualitative_sensory_traces (sector);

CREATE INDEX IF NOT EXISTS idx_qualitative_sensory_temperature
  ON qualitative_sensory_traces (temperature);

-- Seed from backend/data/kietlinska_seed.json (thick-mapping layer)
INSERT INTO qualitative_sensory_traces (
  trace_id, linked_trace_short_id, sense, temperature,
  category_general, category_detailed, narrative_excerpt,
  anchor_lat, anchor_lng, sector, theme
) VALUES
(
  '20260627-022029-SENSORY', '20260627-022029', 'DOTYK', 'NEGATIVE',
  'nawierzchnia', 'szkło',
  'W nocy ktoś rzucił butelką. Ta się rozbiła. Szkła leżą na skrzyżowaniu Dzielnej i Zamenhofa. Uważajcie!',
  52.24886, 20.99241, 'Muranów', NULL
),
(
  '20260627-125750-SENSORY', '20260627-125750', 'WZROK', 'NEGATIVE',
  'bezpieczeństwo', 'uraz / mobilność',
  'Ktoś wyrżnął orła na rowerze. Potrzebna pomoc.',
  52.2247, 21.0042, 'Aleje Jerozolimskie', NULL
),
(
  '20260627-224500-SENSORY', '20260627-224500', 'WZROK', 'AMBIVALENT',
  'infrastruktura', 'oświetlenie / mobilność',
  'Test drożności bramki O2O. Przy wjeździe na ścieżkę rowerową od ul. Siennej świeci tylko jedna latarnia.',
  52.232, 21.012, 'Śródmieście', NULL
),
(
  '20260627-ZAPACH-WAW', NULL, 'WECH', 'POSITIVE',
  'przyroda', 'zapach miasta',
  'Inspiracja rzemieślnicza ze stołu na Dzielnej 3A/7. Nuty liści pomidorów z podwórek i ozonu po burzy.',
  52.24886, 20.99241, 'Muranów', 'Zapach WARSZAWASZA (PolakPotrafi 2015)'
)
ON CONFLICT (trace_id) DO NOTHING;
