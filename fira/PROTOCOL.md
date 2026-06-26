# FIRA Observation Protocol (FOP)

**Civic Observation Protocol** — protokół opisu rzeczywistości.

Nie aplikacja. Nie baza. Nie AI. **Język obserwacji.**

Tak jak HTTP opisuje wymianę stron, Markdown opisuje dokumenty, Git opisuje historię zmian — **FOP opisuje obserwacje**.

Operational log format (build / deploy / field): [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md).

---

## Cztery warstwy

```
┌─────────────────────────────────────────────────────────┐
│ 4. SPOŁECZNOŚĆ — wspólny język opisu zjawisk            │
├─────────────────────────────────────────────────────────┤
│ 3. DYSTRYBUCJA — Warszawa, LUCY, narracja (wymienna)   │
├─────────────────────────────────────────────────────────┤
│ 2. NOTACJA — ASCII jako zapis (czytać · pisać · porównać)│
├─────────────────────────────────────────────────────────┤
│ 1. FIRA CORE — matematyka (nie zna miasta ani polityki) │
└─────────────────────────────────────────────────────────┘
```

### 1. FIRA Core

Silnik. Algebra obserwacji:

```
Source
  ↓
Signal
  ↓
Process
  ↓
Evidence
  ↓
Relation
  ↓
Result
```

Implementacja: `fira/core/types.ts`, `fira/core/pipeline.ts`

### 2. Notacja (FOP)

ASCII **nie jest grafiką** — jest zapisem (jak nuty, PGN, EKG, UML).

Implementacja: `fira/core/notation.ts` · `encodeObservation()` · `parseObservation()`

### 3. Dystrybucja

Pierwsza implementacja: **WARSZAWASZA** (`frontend/`).

Warstwa kulturowa — słownictwo, bohaterowie (LUCY, Griffin), miejsca (Muranów). **Całkowicie wymienna.** Inna dystrybucja = ten sam protokół.

### 4. Społeczność

Cel: obywatel dostaje **wspólny język opisu**, nie AI.

Najpierw obserwacja. Potem interpretacja.

---

## Architektura narzędzi (v2)

```
           FIRA Observation Protocol
                     │
      ┌──────────────┼──────────────┐
      │              │              │
  warszawasza   aplikacja      analiza
      │          mobilna         danych
      └──────────────┼──────────────┘
                     │
              wspólny format FOP
```

Każde narzędzie rozumie ten sam zapis.

---

## Format FOP/0.1

Przykład:

```
FOP/0.1
@2026-06-24T12:00:00.000Z
chain ○●◐◉≈✓■
src CHANNEL_A_CITIZEN ref=10_OBSERWACJE/OBS-VCU-2026-06-18-01.md
sig place=Muranów subject=core-ecology clock=00:00:27 trajectory=true
proc 4
ev ■■■□□
rel capital_vector KRS:0000999888
res hypothesis 73
```

| Linia | Znaczenie |
|-------|-----------|
| `FOP/0.1` | wersja protokołu |
| `@…` | ISO 8601 |
| `chain` | łańcuch glifów procesu |
| `src` | kanał źródła (+ opcjonalnie `ref=`) |
| `sig` | pary `klucz=wartość` sygnału — m.in. `place`, **`subject`** (temat/kategoria obserwacji), `trajectory`, `clock` |
| `proc` | indeks etapu procesu |
| `ev` | dowód `■`/`□` (0–5) |
| `rel` | typ relacji + referencja |
| `res` | wynik: `trajectory` · `hypothesis` · `rejected` · `pending` |

Słowa kluczowe protokołu są **neutralne językowo** (angielskie identyfikatory). Dystrybucja tłumaczy wyświetlanie.

---

## Artefact

> Definicja **semantyczna** — nie element implementacji. Nie wiąże znaczenia z konkretnym formatem danych ani kodem.

### Definicja

Artefakt jest trwałym, możliwym do odczytania zapisem procesu obserwacji.

W modelu FOP artefakt **nie jest** interpretacją, opinią ani ostatecznym werdyktem. Jest **nośnikiem obserwacji** wraz z jej kontekstem, historią sygnałów oraz aktualnym stanem weryfikacji.

Artefakt jest **semantycznie skompresowanym** zapisem procesu obserwacji — redukcja do tego, co ma znaczenie poznawcze, nie kompresja techniczna (algorytm, plik).

Artefakt zachowuje materiał poznawczy, umożliwiając jego ponowny odczyt, porównanie i weryfikację w świetle nowych danych.

### Struktura semantyczna

```
Obserwacja  →  co zostało zauważone
LOG         →  jak przebiegało zbieranie sygnałów
FOP         →  jak obserwacja została zapisana i przetworzona
Artefakt    →  trwały zapis całego procesu
```

### Zasady

1. **Artefakt zachowuje obserwację, nie zamyka jej znaczenia.**
2. Hipoteza nie jest częścią obserwacji; jest późniejszym etapem interpretacji.
3. Stan weryfikacji opisuje bieżący status wiedzy, a nie wartość logiczną obserwacji (`FALSE` w bramce trajektorii ≠ „fałszywa obserwacja”).
4. Artefakt może zostać ponownie odczytany i zestawiony z kolejnymi artefaktami bez utraty pierwotnego kontekstu.

### Antyteza

Artefakt **nie jest** przeciwieństwem hipotezy.

Hipoteza jest kolejnym etapem procesu poznawczego i powstaje na podstawie jednego lub wielu artefaktów.

**Antytezą artefaktu jest ulotność** — własność zjawiska, w którym sygnał przemija bez zachowania materiału poznawczego. **Brak utrwalenia** jest skutkiem ulotności, nie samą antytezą.

```
Sygnał → (utrwalenie) → Artefakt
Sygnał → (brak utrwalenia) → Ulotność
```

Łańcuch poznawczy: **Obserwacja → Artefakt → Hipoteza**.

#### Para kanoniczna

```
Sygnał  ⇄  Artefakt
```

| Sygnał | Artefakt |
|--------|----------|
| chwilowy | trwały |
| płynący | utrwalony |
| jeszcze nie zapisany | zapisany wraz z kontekstem |
| element pola obserwacji | nośnik pamięci operacyjnej |

#### Aksjomat

> **Antytezą artefaktu nie jest błąd, lecz ulotność.**

Błąd może zostać wykryty dzięki artefaktowi.

Ulotność odbiera możliwość weryfikacji, ponieważ nie pozostawia śladu.

Największym ryzykiem nie jest to, że ktoś się pomylił, lecz to, że **nie pozostawiono śladu**, do którego można wrócić. Ciężar przesuwa się z „czy hipoteza była prawdziwa?” na „czy zachowaliśmy materiał, który pozwala ją zweryfikować?”.

### Relacja z AOP

Artefakt stanowi **wejście** do dalszej analizy. Hipotezy powstają **poza** artefaktem — w warstwie **AOP** (Analysis Observation Protocol) — poprzez porównanie wielu artefaktów oraz ich relacji.

Analogie (pedagogiczne, nie implementacyjne): zapis z rejestratora lotu · commit w Git · wpis w dzienniku laboratoryjnym · bursztyn (utrwalony moment, nadal badalny).

---

## Test interoperacyjności (cel v2)

> Czy dwie osoby, które nigdy się nie spotkały, potrafią użyć notacji FIRA do opisania tego samego zjawiska w podobny sposób?

Funkcja: `observationsAlign(a, b)` — porównanie odcisków `observationFingerprint()`.

**Nie więcej ekranów. Nie więcej animacji. Tylko ten test.**

---

## Mapowanie repo → warstwy

| Warstwa | Ścieżki |
|---------|---------|
| Core | `fira/core/` |
| Notacja | `fira/core/notation.ts`, `frontend/lib/symbols.ts` |
| Dystrybucja | `frontend/` (WARSZAWASZA) |
| Most obywatelski | `frontend/lib/observationTrace.ts` (ślad + FOP) |
| Mixer wagowy | `fira/DATA_MIXER.md` (CH_A/F/H/G · macierz korelacji · DRAFT v0.1) |

---

## PM phases ↔ observation pipeline (warstwa dokumentacji)

> **To nie jest część core.** Faza zarządzania projektem nie jest polem FOP. Poniższe mapowanie służy interoperacyjności z językiem PM (Wrike, Atlassian, PRINCE2, HERMES) bez zanieczyszczania `fira/core/`.

### Łańcuch dystrybucji WARSZAWASZA

```
○ → ● → ◐ → ◉ → ≈ → ✓ → ■ → OUTPUT
```

| engineIndex | Etap (`PIPELINE_ORDER`) | Glyph |
|-------------|-------------------------|-------|
| 0 | `reality` | ○ |
| 1 | `signals` | ● |
| 2 | `observation` | ◐ |
| 3 | `filtration` | ◉ |
| 4 | `memory` | ≈ |
| 5 | `validation` | ✓ |
| 6 | `knowledge` | ■ |
| 7 | `narration` | OUTPUT |

### Mapowanie kanoniczne (5–6 faz PM → FIRA)

| Faza PM (zbiorczo) | Etapy FIRA | Core (`CORE_PIPELINE`) |
|--------------------|------------|------------------------|
| Initiation | ○ `reality` · Observation Gate | `source` |
| Planning / Definition | ● `signals` · ◐ `observation` | `source` → `signal` |
| Design / Analysis | ◉ `filtration` · ≈ `memory` | `process` |
| Execution | ✓ `validation` | `evidence` |
| Monitoring / Closing | ■ `knowledge` · OUTPUT | `relation` → `result` |

**HERMES (4 fazy):** Initiation → ○ · Concept → ●◐◉≈ · Implementation → ✓■ · Deployment → OUTPUT.

**Zasada:** FIRA opisuje **obserwację i redukcję szumu**, nie harmonogram ani budżet. PM opisuje **organizację zmiany** — mapowanie jest analogią pedagogiczną, nie importem schematu do core.

Szczegóły, antywzorce i rozszerzone tabele: **`fira/PM_MAPPING.md`**. Moduł edukacyjny dystrybucji: route **`/learn`**.

---

Wersja protokołu: **0.1** (Draft)
