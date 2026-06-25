# FIRA Observation Protocol (FOP)

**Civic Observation Protocol** — protokół opisu rzeczywistości.

Nie aplikacja. Nie baza. Nie AI. **Język obserwacji.**

Tak jak HTTP opisuje wymianę stron, Markdown opisuje dokumenty, Git opisuje historię zmian — **FOP opisuje obserwacje**.

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
src CHANNEL_A_CITIZEN
sig place=Muranów friction=cisza trajectory=false
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
| `sig` | pary `klucz=wartość` sygnału |
| `proc` | indeks etapu procesu |
| `ev` | dowód `■`/`□` (0–5) |
| `rel` | typ relacji + referencja |
| `res` | wynik: `trajectory` · `hypothesis` · `rejected` · `pending` |

Słowa kluczowe protokołu są **neutralne językowo** (angielskie identyfikatory). Dystrybucja tłumaczy wyświetlanie.

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
