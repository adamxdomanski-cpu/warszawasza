# Civic Organization Matrix (Channel H)

**Warstwa dystrybucji WARSZAWASZA.** Nie jest częścią `fira/core/`. Uzupełnia Matrycę Państwową (`fira/STATE_DATA_MATRIX.md`) o **węzły obywatelskie trzeciego sektora** — organizacje pozarządowe, które ustawiają standardy, nadzorują transparentność lub koordynują sieci grantodawców.

> **Silnik nie zna polityki.** FIRA Core operuje na Source → Signal → Process → Evidence. KRS i klasy operacyjne to metadane COP — nie algebra protokołu.

---

## Cel

Channel H odpowiada na pytanie:

**„Która organizacja obywatelska jest punktem odniesienia dla tego typu obserwacji?”**

Nie odpowiada na: kogo popierać, komu ufać bez weryfikacji, co „powinno” się wydarzyć.

Powiązanie z rejestrem państwowym: metryki KRS-grounded nadal przechodzą przez `POL_NODE_KRS` (`state_registry_nodes`). Channel H rejestruje **konkretne podmioty NGO** wybrane do audytu obywatelskiego — nie zastępuje KRS.

---

## Stan implementacji

```
PROCESS — STATE, NEXT STEP
STATE        ● TEST (frontend intersection) · ◐ IMPLEMENTATION (repo SQL) · ○ DRAFT (production DB)
SPEC         COP v1.0 · Channel H
TARGET       civic_organizations · backend/sql/008_civic_organizations.sql
INTERSECT    frontend/lib/civicOrgRegistry.ts · pipelineEngine.intersectCivicOrg()
NEXT STEP    Operator: ?ngo-watchdog=1 on field entry · psql apply 008 on DATABASE_URL
```

### Pierwsza przecięcie strumienia (TEST)

Pierwszy rekord NGO z seeda SQL (`0000217821` · WATCHDOG · trust 5) przecina strumień obserwacji w silniku pipeline po wejściu w pole z parametrem `?ngo-watchdog=1`:

| Warstwa | Plik | Zachowanie |
|---------|------|------------|
| Registry (klient) | `frontend/lib/civicOrgRegistry.ts` | Lustrzany seed 008 — bez wire do PostgreSQL |
| Silnik | `frontend/lib/pipelineEngine.ts` | `intersectCivicOrg()` · `applyCivicOrgTrustAtStage()` na Filtracja (3) i Walidacja (5) |
| UI | `LivingInterface.tsx` → `DecisionPipeline.tsx` | Blok `CIVIC_ORG ∩` + `console.info('[COP] …')` |

**Trigger testu:** `https://www.warszawasza.online/?ngo-watchdog=1` → gate TRUE/FALSE → interakcja aż pipeline osiągnie Filtrację.

**Wejście obserwacji:** tag `ngo-watchdog` + opcjonalne `civicOrgRef: { krs, operationalClass, trustLevel }` — zero PII.

---

## Warstwa techniczna vs normatywna

| Warstwa | Plik | Zawartość |
|---------|------|-----------|
| **Normatywna** | Ten dokument | Klasy operacyjne, węzły kontaktowe (role), konsekwencje obserwacji |
| **Techniczna** | `backend/sql/008_civic_organizations.sql` | Tabela `civic_organizations` — KRS, nazwa, klasa, trust 0–5 |
| **Państwowa** | `002_state_registry_nodes.sql` | Issuer KRS jako `POL_NODE_KRS` |

---

## Klasy operacyjne (`operational_class`)

| Klasa | Znaczenie | Konsekwencja obserwacji |
|-------|-----------|-------------------------|
| **WATCHDOG** | Standardy, transparentność, rzecznictwo sektorowe | Metryki provenance mogą linkować do tego węzła przy audycie NGO |
| **GRANTMAKER_NETWORK** | Sieć grantodawców / federacja fundacji | Punkt odniesienia dla praktyk przyznawania dotacji (bez oceny politycznej) |

Nowe klasy wymagają wpisu w tej tabeli przed seedem SQL.

---

## Zarejestrowane węzły (`civic_organizations`)

| KRS | Nazwa (KRS) | `operational_class` | trust | Weryfikacja KRS |
|-----|-------------|---------------------|-------|-----------------|
| `0000217821` | Forum Darczyńców w Polsce | WATCHDOG | 5 | ✓ 2026-06-25 — [forumdarczyncow.pl](https://www.forumdarczyncow.pl/pl/page/o-forum/kim-jestesmy), [spis.ngo.pl](https://spis.ngo.pl/146963-forum-darczyncow-w-polsce) |

**Forma prawna (KRS):** Związek Stowarzyszeń · rejestracja 2004-09-22 · siedziba Warszawa.

**Zakres (fakt publiczny):** Zrzesza niezależne organizacje przyznające dotacje na cele społecznie użyteczne; promuje standardy zarządzania i transparentność w filantropii instytucjonalnej. Nie jest grantodawcą indywidualnym — nie przyjmuje wniosków o wsparcie finansowe od osób fizycznych ani podmiotów spoza członkostwa.

**Uwaga KRS:** Numer `0000213765` należy do Eurocash S.A., nie do Forum Darczyńców. Seed COP używa zweryfikowanego numeru `0000217821`.

---

## Węzły kontaktowe (normatywne — nie w SQL)

Zero-PII w schemacie COP (`backend/sql/README.md`) wyklucza kolumny z imionami i nazwiskami osób fizycznych. Role publiczne dokumentujemy tutaj, nie w `civic_organizations`.

| Organizacja | Rola publiczna | Znaczenie dla Channel H |
|-------------|----------------|-------------------------|
| Forum Darczyńców w Polsce | **Magdalena Pękacka** — Dyrektorka (Zespół) | Centralny węzeł operacyjny dla standardów filantropii instytucjonalnej i otoczenia prawnego sektora obywatelskiego; powiązana z organizacją od 2006 r. ([władze i zespół](https://www.forumdarczyncow.pl/pl/page/o-forum/wladze-i-zespol)) |

To nie jest rekomendacja osobista — to **routing provenance**: kto publicznie reprezentuje operacje organizacji w materiałach własnych Forum.

---

## Powiązanie z COP

```
POL_NODE_KRS (002)              civic_organizations (008)
┌─────────────────────┐         ┌──────────────────────────┐
│ KRS issuer          │         │ krs_number (UNIQUE)      │
│ KAPITALOWA layer    │◄─ground─│ org_name                 │
└─────────────────────┘         │ operational_class        │
         │                      │ trust_level_indicator    │
         ▼                      └──────────────────────────┘
civic_observations
  source_node_id → POL_NODE_KRS (registry issuer)
  metric_category → e.g. CIVIC_ORG_WATCHDOG (future, explicit product need)
```

Tabela `civic_organizations` nie ma dziś FK z `civic_observations`. **TEST (2026-06-25):** przecięcie działa po stronie dystrybucji (`civicOrgRegistry` + `pipelineEngine`) bez DB wire. Kolejny krok produktowy: opcjonalne `civic_org_ref` w COP store — tylko po jawnej decyzji operatora.

---

## Zgodność z FOP

| Warstwa FIRA | Rola Channel H |
|--------------|----------------|
| **Core** | Bez zmian |
| **Dystrybucja** | COP PostgreSQL + ten dokument |
| **Społeczność** | Wspólny język: „obserwacja z węzła WATCHDOG / Forum Darczyńców” |

---

## Antywzorce

- ❌ Traktowanie `trust_level_indicator` jako rankingu politycznego
- ❌ Wnoszenie nazwisk do SQL lub `civic_observations`
- ❌ Udawanie rejestru urzędowego — to **matryca obywatelska**, KRS pozostaje u `POL_NODE_KRS`
- ❌ Seed bez weryfikacji numeru KRS

---

## Migracja

Plik: `backend/sql/008_civic_organizations.sql`  
Wymaga: `001_cop_init.sql`, `002_state_registry_nodes.sql` (provenance KRS)  
Seed: **1 węzeł** (Forum Darczyńców w Polsce)

---

## Powiązane dokumenty

- `fira/STATE_DATA_MATRIX.md` — Matryca Państwowa (issuers)
- `backend/sql/README.md` — apply + zero-PII
- `fira/TF_KEY.md` — status SQL 008
