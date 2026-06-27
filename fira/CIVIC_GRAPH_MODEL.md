# FIRA Civic Graph Model

**COP v1.0 · Channel H · Spec 85233**

## Reguła nadrzędna

> **FIRA przechowuje obserwacje, dowody i relacje między nimi. Nie przechowuje prawd absolutnych ani ocen podmiotów jako takich.**

Silnik **nie zna świata**. Świat (węzły grafu) zna silnik:

| Typ węzła | Przykład |
|-----------|----------|
| Organizacja obywatelska | `civic_organizations` (Entity) |
| Mieszkaniec / operator | pseudonimowy `operator_node_id` (Layer 0) |
| Rejestr publiczny | `state_registry_nodes` (`POL_NODE_KRS`, …) |
| Sensor / instrument | IOE agregat, `CHANNEL_C_SENSOR` |

**Zaufanie** dotyczy **spójności konkretnej obserwacji** w czasie (wiele niezależnych źródeł), nie „jakości NGO” ani źródła finansowania.

---

## Warstwy danych (oddziel reference od zdarzeń)

```
Entity (organizacja — referencja KRS)
   │
   │ 1:N
   ▼
Activity (civic_action_threads)
   │
   ├── L1 Field Observation  — fakt surowy („wycięto 18 drzew”)
   ├── L2 Assessment         — hipoteza / interpretacja („naruszenie decyzji…”)
   └── L3 Outcome            — kroki: zawiadomienie → wyrok → efekt
   │
   │ N:M
   ▼
COP Observation (civic_observations — sygnał obywatelski / metryka)
   │
   ▼
Evidence (civic_evidence_records — hash, dokument publiczny)
```

**Nie mieszamy** faktów z interpretacją w jednej kolumnie.

Łańcuch semantyczny (zgodny z FOP / AOP):

```
Observation → Feature → Hypothesis → Evidence → Outcome
```

Mapowanie SQL:

| Etap FIRA | Tabela |
|-----------|--------|
| Observation (pole) | `civic_action_field_observations` |
| Feature | `civic_friction_profiles` (wektor wymiarów) |
| Hypothesis | `civic_action_assessments` |
| Evidence | `civic_evidence_records` |
| Outcome | `civic_action_outcomes` |

---

## Tarcie terytorialne — wektor, nie skalar

Zamiast `territorial_friction_score` (1–10) używamy **sześciu wymiarów** (0–10 każdy):

| Wymiar | Pole SQL |
|--------|----------|
| Environment | `environment_score` |
| Mobility | `mobility_score` |
| Public Space | `public_space_score` |
| Safety | `safety_score` |
| Accessibility | `accessibility_score` |
| Administrative | `administrative_score` |

Profil (`civic_friction_profiles`) jest **przypinany do obserwacji terenowej**, nie do encji organizacji.

Widok analityczny: `v_civic_friction_multidim`.

---

## Finansowanie — ujawnienie, nie waga wiarygodności

**Nie** modelujemy „granty zagraniczne vs społecznościowe” jako składnika `trust_score`.

Osobna tabela `civic_funding_disclosures`:

| Pole | Znaczenie |
|------|-----------|
| `source_type` | `PUBLIC` · `PRIVATE` · `MEMBERSHIP` · `DONATION` · `GRANT` · `EU` · `FOUNDATION` · `OTHER` |
| `is_public` | Czy ujawnienie jest publiczne |
| `last_report_date` | Data ostatniego raportu |
| `financial_statement_ref` | Odnośnik do sprawozdania (KRS / MF) |
| `source_reference` | URI / sygnatura dokumentu |

Silnik **może** analizować te dane offline (AOP). **Nie wolno** automatycznie obniżać lub podnosić wiarygodności obserwacji wyłącznie na podstawie typu finansowania.

---

## Graf relacji — property graph z historią

`civic_graph_edges` (zamiast nadpisywalnego PK `(source, target, type)`):

| Pole | Rola |
|------|------|
| `edge_id` | Surrogate key |
| `source_civic_org_id` / `target_civic_org_id` | Węzły |
| `relation_type` | `COALITION` · `FUNDING` · `LEGAL_SUPPORT` · `LOGISTICS` |
| `weight` | Waga strukturalna grafu — **nie** wiarygodność |
| `valid_from` / `valid_to` | Okno ważności relacji |
| `source_reference` | Dowód publiczny na istnienie krawędzi |
| `confidence` | Pewność **faktu relacji**, nie ocena podmiotu |

Nowa koalicja = **nowy wiersz**, nie UPDATE starej krawędzi.

---

## `trust_level_indicator` na encji

Pozostaje w `civic_organizations` jako **głębokość audytu provenance** (czy KRS + drugi rejestr), **nie** ranking NGO i **nie** wynik finansowania.

Zaufanie do **obserwacji** wylicza Layer 0 (`layers-spec-85233.md`) + spójność dowodów.

---

## Migracja

```bash
psql "$DATABASE_URL" -f backend/sql/012_civic_matrix_graph.sql
```

Wymaga: `001`, `002`, `008`.

Widoki operatora:

- `v_civic_org_matrix` — encje + liczniki wątków / obserwacji
- `v_civic_action_pipeline` — L1 → L2 → L3 w jednym wątku
- `v_civic_friction_multidim` — profile tarcia

---

## Powiązane

- [`fira/CIVIC_ORGANIZATION_MATRIX.md`](./CIVIC_ORGANIZATION_MATRIX.md)
- [`docs/protocol/layers-spec-85233.md`](../docs/protocol/layers-spec-85233.md)
- [`backend/sql/008_civic_organizations.sql`](../backend/sql/008_civic_organizations.sql)
