# Civic Organization Matrix (Trzeci Sektor)

**Warstwa dystrybucji WARSZAWASZA.** Nie jest częścią `fira/core/`. Rejestruje **operacyjną klasę** organizacji trzeciego sektora, które mogą **przecinać się** z sygnałami obywatelskimi zapisanymi w `civic_observations`.

> **To nie jest ranking NGO.** Matryca odpowiada na pytanie: *„Jaki typ actorów trzeciego sektora może skrzyżować się z tym sygnałem i przez jaki kanał COP?”*

Nie odpowiada na: kogo wspierać, komu ufać emocjonalnie, kto „wygrywa” debatę.

---

## Cel

Cztery **klasy operacyjne** opisują funkcję strukturalną w polu obserwacji — nie program polityczny:

| Klasa (`operational_class`) | Przykładowi actorzy (nazwy publiczne) | Rola strukturalna |
|-----------------------------|----------------------------------------|-------------------|
| **WATCHDOG** | Watchdog Polska, Panoptykon, HFHR | Nadzór nad państwem, prawami, przejrzystością |
| **LITERACY** | Tour de Konstytucja, Iustitia | Edukacja obywatelska, świadomość prawna |
| **URBAN** | Miasto Jest Nasze, lokalne stowarzyszenia (Muranów, Wola) | Partycypacja miejska, sąsiedztwo |
| **CRISIS** | WOŚP, PCK, Dajemy Dzieciom Siłę, sieci interwencyjne | Odporność społeczna, interwencja kryzysowa |
| **CIVIC_TECH** | Koduj dla Polski, Moje Państwo, Rejestr.io | Narzędzia, otwarte dane, rejestry |

Wpisy w SQL to **katalog instytucji** (nazwa + opcjonalny publiczny KRS). Brak danych o darczyńcach, członkach, adresach osób.

---

## Model grafu (Entity → Activity → Observation → Evidence)

**Reguła FIRA:** silnik przechowuje obserwacje, dowody i relacje — nie prawdy absolutne ani oceny podmiotów.

Szczegóły: [`fira/CIVIC_GRAPH_MODEL.md`](./CIVIC_GRAPH_MODEL.md) · SQL: `backend/sql/012_civic_matrix_graph.sql`

| Warstwa | Tabela | Rola |
|---------|--------|------|
| Entity | `civic_organizations` | Referencja KRS — bez działań w tym wierszu |
| Activity | `civic_action_threads` | Wątek działań (1:N od encji) |
| L1 Observation | `civic_action_field_observations` | Fakt surowy |
| L2 Assessment | `civic_action_assessments` | Interpretacja / hipoteza |
| L3 Outcome | `civic_action_outcomes` | Kroki proceduralne |
| Friction vector | `civic_friction_profiles` | 6 wymiarów 0–10 |
| N:M | `civic_thread_observation_links` | Wątek ↔ `civic_observations` |
| Evidence | `civic_evidence_records` | Dowód (hash, dokument) |
| Funding | `civic_funding_disclosures` | Ujawnienie — **bez** auto-wagi wiarygodności |
| Graph | `civic_graph_edges` | Property graph z `valid_from` / `valid_to` |

**Nie używamy** `civic_activity_vectors` (pojedynczy skalar + tekst mieszany) — zastąpione pipeline L1/L2/L3.

---

## Mapowanie kanałów COP

Klasy łączą się z kanałami źródła sygnału (`frontend/lib/signalApi.ts`, `fira/PROTOCOL.md`):

| Klasa | Kanał(y) COP | Znaczenie |
|-------|--------------|-----------|
| **WATCHDOG** | `CHANNEL_H_STATE_AUDIT` · `CHANNEL_F_REGISTRY` | Audyt państwa + rejestry publiczne |
| **LITERACY** | `CHANNEL_A_CITIZEN` · `CHANNEL_D_DOCUMENT` | Sygnał obywatelski + materiał edukacyjny |
| **URBAN** | `CHANNEL_L_TERRAIN` · `CHANNEL_B_CITY` | Pole miejskie + uwaga mieszkańców |
| **CRISIS** | `CHANNEL_I_RESILIENCE` · `CHANNEL_A_CITIZEN` | Infrastruktura krytyczna, interwencja |
| **CIVIC_TECH** | `CHANNEL_F_REGISTRY` · `CHANNEL_C_SENSOR` | Rejestr / API + instrument techniczny |

`CHANNEL_H_STATE_AUDIT` — rozszerzenie dystrybucji WARSZAWASZA dla **przecięcia sygnału z audytem państwowym** (NIK, KRS, NGO watchdog). Nie jest w `fira/core/`.

---

## `trust_level_indicator` (1–5)

**Głębokość weryfikacji audytowej** — nie popularność, nie „ocena jakości” organizacji.

| Poziom | Znaczenie |
|--------|-----------|
| 1 | Tylko wpis rejestrowy / placeholder DEMO — niezweryfikowany |
| 2 | Pojedyncze źródło publiczne (np. strona programu bez KRS) |
| 3 | KRS + jeden rejestr publiczny (domyślny seed) |
| 4 | KRS + spójność z `POL_NODE_KRS` / drugim rejestrem |
| 5 | Wieloźródłowe potwierdzenie (KRS + archiwum + obserwacja niezależna) |

Operator ustawia poziom po **dowodzie**, nie po sympatii.

---

## Powiązanie z Matrycą Państwową

Organizacje z numerem KRS linkują provenance przez:

```
civic_organizations.krs_source_node_id → state_registry_nodes.node_id
```

Typowy węzeł: **`POL_NODE_KRS`** (Krajowy Rejestr Sądowy). Szczegóły węzła i API: [`fira/STATE_DATA_MATRIX.md`](./STATE_DATA_MATRIX.md).

Relacja FOP (przykład notacji):

```
rel capital_vector KRS:0000181348
src CHANNEL_F_REGISTRY
```

---

## Graf relacji (ASCII)

```
                    ┌─────────────────────────┐
                    │  state_registry_nodes   │
                    │  POL_NODE_KRS           │
                    └───────────┬─────────────┘
                                │ krs_source_node_id
                                ▼
┌──────────────┐    krs_number ┌─────────────────────┐
│ Resident /   │               │ civic_organizations │
│ instrument   │               │ operational_class   │
│ signal       │               │ trust_level (1–5)   │
└──────┬───────┘               └──────────┬──────────┘
       │                                  │ org_id
       │ signal_id                        │
       ▼                                  ▼
┌──────────────────────┐       ┌────────────────────────────┐
│ civic_observations   │◄──────│ civic_signal_intersections │
│ metric_category      │       │ validation_status          │
│ source_node_id       │       │ geographic_anchor (opt.)   │
│ payload_value 0–5    │       └────────────────────────────┘
└──────────────────────┘
       │
       ▼
 v_operator_console
 (notation_string + evidence bars)
```

**Przepływ:** sygnał mieszkaniec/instrument → `civic_observations` → przecięcie z NGO → opcjonalna weryfikacja względem KRS (`POL_NODE_KRS`).

---

## Węzły zewnętrzne (bez poparcia)

| Wpis | `seed_marker` | Uwaga |
|------|---------------|-------|
| **Tour de Konstytucja** | `EXTERNAL` | Węzeł edukacyjny LITERACY — inicjatywa Roberta Hojdy; **brak numeru KRS w seedzie**. Obecność w matrycy = klasa operacyjna, nie rekomendacja. |
| **Koduj dla Polski** | `EXTERNAL` | Program społecznościowy; podmiot prawny seedu CIVIC_TECH: Fundacja Moje Państwo (`0000359730`). |
| **Rejestr.io** | `EXTERNAL` | Serwis agregujący dane KRS — actor narzędziowy, nie NGO. |
| Stowarzyszenia Muranów / Wola | `DEMO` | Placeholdery `SRD_MUR_01` / `SRD_WOL_01` — zastąp realnym KRS przy wdrożeniu. |

---

## `validation_status` (przecięcie)

| Status | Znaczenie |
|--------|-----------|
| `PENDING` | Przecięcie zarejestrowane, brak audytu |
| `VERIFIED` | Metryka zgodna z publicznym rejestrem / dokumentem |
| `DISSONANCE` | Metryka w konflikcie z publicznym ground truth (≠ „NGO złe”) |

---

## Migracja

| Plik | Wymaga |
|------|--------|
| `backend/sql/008_civic_organizations.sql` | `001_cop_init.sql`, `002_state_registry_nodes.sql` |
| `backend/sql/012_civic_matrix_graph.sql` | `001`, `002`, `008` — entity graph + action pipeline |

```bash
psql "$DATABASE_URL" -f backend/sql/008_civic_organizations.sql
psql "$DATABASE_URL" -f backend/sql/012_civic_matrix_graph.sql
```

**Seed:** 11 organizacji (6 × `PUBLIC_KRS`, 2 × `DEMO`, 3 × `EXTERNAL`) + 1 obserwacja DEMO + 1 przecięcie DEMO.

**FK `signal_id`:** `civic_signal_intersections.signal_id` → `civic_observations.observation_id` (tabela z `001`). Usunięcie obserwacji kaskaduje do przecięć.

**Widok:** `v_civic_org_matrix` — klasa, KRS, liczniki przecięć.

---

## Zero PII · antywzorce

**Dozwolone:** nazwa instytucji, publiczny KRS, klasa operacyjna, sector ref, status weryfikacji.

**Zabronione:** darczyńcy, członkowie, adresy osób, NIP osób fizycznych, treści kampanii.

- ❌ Traktowanie matrycy jako listy „polecanych NGO”
- ❌ `trust_level` jako ranking popularności
- ❌ Polityczne poparcie w SQL lub docs
- ❌ Import do `fira/core/`

---

## Powiązane dokumenty

- [`fira/STATE_DATA_MATRIX.md`](./STATE_DATA_MATRIX.md) — `POL_NODE_KRS` i warstwy państwowe
- [`backend/sql/README.md`](../backend/sql/README.md) — apply + zero-PII
- [`fira/PROTOCOL.md`](./PROTOCOL.md) — FOP algebra (`src`, `rel`)
- [`fira/electoral/README.md`](./electoral/README.md) — protokół wyborczy (osobna warstwa)
- [`fira/COP_ARCHIVE_JSON.md`](./COP_ARCHIVE_JSON.md) — `geographic_anchor` (`SRD_MUR_01`)
