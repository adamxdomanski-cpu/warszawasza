-- Forced field trace seed — Śródmieście Północ (COP v1.0)
-- Ślad #20260627-224500 · CHANNEL_L_TERRAIN · Scenariusz testowy (impuls f)
-- Spec: docs/protocol/traces/20260627-224500-srodmiescie.md
-- Requires: 001_cop_init.sql, 010_incident_resolution.sql
-- Optional: 012_civic_matrix_graph.sql (NGO intersection)

INSERT INTO civic_observations (
  trace_short_id,
  timestamp,
  metric_category,
  status_indicator,
  payload_value
) VALUES (
  '20260627-224500',
  TIMESTAMPTZ '2026-06-27T20:45:00.000Z',
  'CHANNEL_L_TERRAIN',
  'ALTERED',
  1
)
ON CONFLICT (trace_short_id) WHERE trace_short_id IS NOT NULL DO NOTHING;

-- NGO matrix intersection (Miasto Jest Nasze · URBAN) when 012 applied
INSERT INTO civic_signal_intersections (
  signal_id,
  civic_org_id,
  validation_status,
  geographic_anchor
)
SELECT
  obs.observation_id,
  org.civic_org_id,
  'PENDING'::civic_intersection_status,
  'SRODMIESCIE/022'
FROM civic_observations obs
CROSS JOIN civic_organizations org
WHERE obs.trace_short_id = '20260627-224500'
  AND org.krs_number = '0000494640'
ON CONFLICT (signal_id, civic_org_id) DO NOTHING;

-- Dev test expiry (uncomment after ~60 min or for manual closure):
-- SELECT expire_civic_incident('20260627-224500', 'STUDIO:WAW_DZ3A7', 'PING_TTL', 'Śródmieście');
