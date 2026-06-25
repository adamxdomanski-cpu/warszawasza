# Manifest wyborczy — propozycja do analizy

**Warstwa 1 · normatywna (polityczna)**

> To **nie** jest jedyny możliwy model demokratyczny. To **nie** jest specyfikacja techniczna, **nie** zastępuje PKW ani porady prawnej. To zbiór propozycji reform prawa wyborczego do analizy obywatelskiej — apolitycznie sformułowanych jako hipotezy do deliberacji.

Powiązane warstwy (nie mieszać treści):

| Warstwa | Plik | Rola |
|---------|------|------|
| Normatywna | ten dokument | Propozycje prawne, trade-offy |
| Techniczna | [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Model domeny, SQL, API, audyt |
| Filozoficzna | [`COP_LENS.md`](./COP_LENS.md) | Sygnał, szum, orientacja COP/FIRA |

Instrument obywatelski w dystrybucji: [`/deliberation`](https://www.warszawasza.online/deliberation) — deliberacja grafenowa, nie wybory.

---

## Status

**DRAFT · propozycja do analizy** — każdy punkt wymaga weryfikacji konstytucyjnej, proceduralnej i społecznej przed jakimkolwiek wdrożeniem.

---

## Propozycje (skrót)

### 1. Próg wyborczy

| Wariant | Opis |
|---------|------|
| A | Obniżenie progu do 3–4% (Sejm) |
| B | Brak progu z limitem fragmentacji (np. max N klubów) |
| C | Status quo z jawnością skutków progu |

**Trade-off:** fragmentacja vs reprezentacja mniejszości. Niższy próg zwiększa wielopartyjność kosztem koalicyjnej niestabilności; wyższy próg stabilizuje większość kosztem wykluczenia małych ugrupowań.

### 2. Okręg wyborczy

| Wariant | Opis |
|---------|------|
| A | Jeden okręg krajowy (lista ogólnokrajowa) |
| B | Kilka wielomandatowych okręgów regionalnych |
| C | Mieszany: lista krajowa + okręgi |

**Trade-off:** lokalność vs proporcjonalność krajowa. Pojedynczy okręg maksymalizuje proporcjonalność ogólną; okręgi regionalne wiążą mandaty z terytorium kosztem „lost votes” między okręgami.

### 3. Listy wyborcze

| Wariant | Opis |
|---------|------|
| A | Listy otwarte (głos na kandydata, mandat wg pozycji + preferencje) |
| B | Listy zamknięte (mandat wg pozycji komitetu) |
| C | Listy otwarte z progiem preferencyjnym |

**Trade-off:** kontrola partyjna vs autonomia wyborcy. Listy zamknięte wzmacniają dyscyplinę klubową; otwarte zwiększają szansę „spadków” i niezależnych posłów.

### 4. Finansowanie kampanii

| Wariant | Opis |
|---------|------|
| A | Pełna jawność darczyńców (wszyscy powyżej progu X PLN) |
| B | Jawność z opóźnieniem (np. 30 dni po wyborach) |
| C | Limity + anonimizacja drobnych wpłat |

**Trade-off:** prywatność darczyńcy vs przejrzystość wpływów. Pełna jawność ogranicza ukryte obciążenia; opóźniona lub częściowa anonimizacja chroni drobnych darczyńców kosztem natychmiastowej kontroli.

### 5. Matematyka mandatów

| Wariant | Opis |
|---------|------|
| A | D’Hondt (status quo) |
| B | Sainte-Laguë (korzyść mniejszych list) |
| C | Hare / largest remainder z progiem |

**Trade-off:** przewaga większych list vs sprawiedliwość proporcjonalna. D’Hondt faworyzuje liderów; Sainte-Laguë i warianty remainder łagodzą dysproporcję kosztem przewidywalności koalicyjnej.

---

## Czego ten manifest nie robi

- Nie definiuje schematu bazy danych → [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md)
- Nie opisuje weryfikacji kryptograficznej → [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- Nie jest interpretacją FOP/COP → [`COP_LENS.md`](./COP_LENS.md)
- Nie zastępuje procedur PKW, protokołów obwodowych ani prawa wyborczego

---

## Powiązane artefakty COP

- [`fira/STATE_DATA_MATRIX.md`](../STATE_DATA_MATRIX.md) — provenance metryk państwowych (KRS, MF, NIK…)
- [`fira/COP_ARCHIVE_JSON.md`](../COP_ARCHIVE_JSON.md) — format archiwalny bez kopii dokumentów
- [`backend/sql/README.md`](../../backend/sql/README.md) — migracje PostgreSQL (warstwa techniczna)

---

## Następny krok obywatelski

Deliberacja nad propozycjami odbywa się przez instrument `/deliberation` — zapis obserwacji FOP, nie głos wyborczy. Werdykt normatywny należy do procesu demokratycznego poza tym repozytorium.
