# State Data Matrix (Matryca Państwowa)

**Warstwa dystrybucji WARSZAWASZA.** Nie jest częścią `fira/core/`. Nie zmienia FOP — rejestruje **skąd** pochodzą metryki zapisane w `civic_observations`.

> **Silnik nie zna świata.** FIRA Core operuje na Source → Signal → Process → Evidence. Polskie urzędy, warstwy i API to metadane COP — nie algebra protokołu.

---

## Cel

Cztery pionowe warstwy **otwartych źródeł państwowych** (plus jeden korpus otwarty) karmią tabelę `civic_observations` przez opcjonalne pole `source_node_id`. Matryca odpowiada na pytanie:

**„Z jakiego publicznego rejestru pochodzi ta obserwacja?”**

Nie odpowiada na: kto patrzy, komu co należy, co „powinno” się wydarzyć.

---

## Warstwy

| Warstwa (`data_layer`) | Zakres danych | Przykładowe węzły |
|------------------------|---------------|-------------------|
| **KAPITALOWA** | Rejestry kapitałowe, finanse publiczne, zamówienia | KRS, MF/Trezor, UZP, BZP |
| **KONTROLA** | Audyt, ochrona danych, orzecznictwo administracyjne | NIK, UODO, NSA |
| **FIZYCZNA** | Przestrzeń, środowisko, statystyki terytorialne | GUGiK, Geoportal, GIOŚ, GUS |
| **TOZSAMOŚCI** | Dziedzictwo, archiwa, korpus kulturowy | NID, NAC, Wikidata |

Warstwa (`data_layer`) jest **ortogonalna** do `constitutional_power` (gałąź/funkcja instytucji: WYKONAWCZA, SĄDOWNICZA, KONTROLA, OTWARTE).

---

## Węzły rejestru (`state_registry_nodes`)

| `node_id` | Instytucja | `constitutional_power` | `data_layer` | Otwarte API / portal |
|-----------|------------|------------------------|--------------|----------------------|
| `POL_NODE_KRS` | Krajowy Rejestr Sądowy | SĄDOWNICZA | KAPITALOWA | https://api-krs.ms.gov.pl/ |
| `POL_NODE_MF` | Ministerstwo Finansów (Trezor) | WYKONAWCZA | KAPITALOWA | https://api.treasury.gov.pl/ |
| `POL_NODE_UZP` | Urząd Zamówień Publicznych | WYKONAWCZA | KAPITALOWA | https://ezamowienia.gov.pl/ |
| `POL_NODE_BZP` | Biuletyn Zamówień Publicznych | WYKONAWCZA | KAPITALOWA | https://bzp.uzp.gov.pl/ |
| `POL_NODE_NIK` | Najwyższa Izba Kontroli | KONTROLA | KONTROLA | https://www.nik.gov.pl/ (raporty, otwarte dane) |
| `POL_NODE_UODO` | Urząd Ochrony Danych Osobowych | KONTROLA | KONTROLA | https://uodo.gov.pl/ |
| `POL_NODE_NSA` | Naczelny Sąd Administracyjny | SĄDOWNICZA | KONTROLA | https://orzeczenia.nsa.gov.pl/ (baza orzeczeń) |
| `POL_NODE_GUGIK` | GUGiK | WYKONAWCZA | FIZYCZNA | https://www.gugik.gov.pl/ |
| `POL_NODE_GEOPORTAL` | Geoportal.gov.pl | WYKONAWCZA | FIZYCZNA | https://geoportal.gov.pl/ (WMS/WFS/REST) |
| `POL_NODE_GIOS` | GIOŚ | WYKONAWCZA | FIZYCZNA | https://gios.gov.pl/ |
| `POL_NODE_GUS` | GUS (BDL) | WYKONAWCZA | FIZYCZNA | https://bdl.stat.gov.pl/api/v1/ |
| `POL_NODE_NID` | Narodowy Instytut Dziedzictwa | WYKONAWCZA | TOZSAMOSCI | https://www.nid.pl/ |
| `POL_NODE_ARCHIWA` | Narodowe Archiwum Cyfrowe | WYKONAWCZA | TOZSAMOSCI | https://www.nac.gov.pl/ |
| `POL_NODE_WIKIMEDIA` | Wikimedia / Wikidata | OTWARTE | TOZSAMOSCI | https://query.wikidata.org/ |

Adresy URL mogą się zmieniać — matryca dokumentuje **klasy źródeł**, nie utrzymuje klientów HTTP.

---

## Powiązanie z COP

```
state_registry_nodes          civic_observations
┌─────────────────────┐       ┌──────────────────────────┐
│ node_id (PK)        │◄──────│ source_node_id (FK, NULL)│
│ institution_name    │       │ timestamp                │
│ data_layer          │       │ metric_category          │
│ constitutional_power│       │ status_indicator         │
│ data_format         │       │ payload_value (0–5)      │
└─────────────────────┘       │ asset_ref (FK, NULL)     │──► infrastructure_status
                              └──────────────────────────┘
                                        │
                                        ▼
                              v_operator_console
                              (notation_string + evidence bars)
```

### Semantyka pól

| Pole | Znaczenie |
|------|-----------|
| `source_node_id` | Który publiczny issuer wyprodukował lub uzasadnia metrykę. NULL = metryka globalna lub wewnętrzna COP (np. WHOIS bez przypisania do urzędu). |
| `asset_ref` | Na jakim aktywie infrastrukturalnym (domena) metryka jest osadzona. NULL = metryka niezwiązana z konkretnym FQDN. |
| `metric_category` | Kanał metryki (np. `KRS_ENTITY`, `BZP_NOTICE`, `WHOIS`, `BDL_INDICATOR`). |
| `payload_value` | Siła dowodu 0–5 — ten sam model co w COP v1.0. |

Przykład zapisu (pseudokod SQL, zero PII):

```sql
INSERT INTO civic_observations (
  metric_category,
  status_indicator,
  payload_value,
  source_node_id,
  asset_ref
) VALUES (
  'KRS_ENTITY_STATUS',
  'STABLE',
  4,
  'POL_NODE_KRS',
  (SELECT infrastructure_id FROM infrastructure_status WHERE asset_domain = 'konstytucja.pl')
);
```

---

## Zgodność z FOP

| Warstwa FIRA | Rola Matrycy Państwowej |
|--------------|-------------------------|
| **Core** (`fira/core/`) | Bez zmian. Nie importuje `state_registry_nodes`. |
| **Notacja** | ASCII obserwacji nie koduje urzędu — tylko sygnał i dowód. |
| **Dystrybucja** (WARSZAWASZA) | COP PostgreSQL + ten dokument. |
| **Społeczność** | Wspólny język: „obserwacja z warstwy KAPITALOWA / węzeł KRS”. |

Zasada **zero PII** (`backend/sql/README.md`) obowiązuje: matryca przechowuje metadane instytucji, nie dane osób fizycznych z rejestrów źródłowych.

---

## Antywzorce

- ❌ Traktowanie matrycy jako mapy politycznej lub „rankingu urzędów”
- ❌ Wnoszenie nazwisk, emaili, NIP-ów osób fizycznych do `civic_observations`
- ❌ Importowanie węzłów państwowych do `fira/core/`
- ❌ Udawanie platformy urzędowej — matryca to **provenance**, nie zgłoszenia obywatelskie

---

## Migracja

Plik: `backend/sql/002_state_registry_nodes.sql`  
Wymaga: `001_cop_init.sql`  
Seed: **14 węzłów** (4 + 3 + 4 + 3 per warstwa)

---

## Powiązane dokumenty

- `fira/PROTOCOL.md` — FOP algebra
- `backend/sql/README.md` — apply + zero-PII
- `fira/FIELD_DOMAIN_konstytucja.md` — przykład aktywa (`konstytucja.pl`) linkowanego przez `asset_ref`
- `fira/electoral/` — protokół wyborczy COP (warstwa techniczna może linkować `source_node_id` do KRS/MF/NIK przy metrykach provenance; **nie** przechowuje głosów wyborczych)
