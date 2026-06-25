# PM phases ↔ FIRA observation pipeline

**Warstwa dokumentacji (nie core).** Ten dokument porównuje klasyczne modele faz zarządzania projektami z łańcuchem obserwacji WARSZAWASZA / FOP. Nie zmienia protokołu — tłumaczy go na język PM.

---

## Dlaczego to mapowanie istnieje

Modele PM opisują **jak organizacja przeprowadza zmianę**. FIRA opisuje **jak obywatel dochodzi do wniosku z pola**. Oba są sekwencjami redukcji niepewności — ale:

| PM | FIRA |
|----|------|
| Deliverable, milestone, stakeholder | Sygnał, dowód, trajektoria |
| Plan → wykonanie → zamknięcie | Obserwacja → filtracja → walidacja |
| Sukces = scope on time | Sukces = wspólny zapis obserwacji (`observationsAlign`) |

FIRA **nie zastępuje** PRINCE2 ani HERMES. Daje **wspólny język obserwacji**, który można zestawić z fazami PM bez mieszania warstw.

---

## Łańcuch WARSZAWASZA (dystrybucja)

UI kompresuje 8 etapów silnika do glifów (`DecisionPipeline` · `PROCESS_CHAIN`):

```
○ → ● → ◐ → ◉ → ≈ → ✓ → ■ → OUTPUT
```

| Glyph | `PIPELINE_ORDER` | engineIndex | Znaczenie operacyjne |
|-------|------------------|-------------|----------------------|
| ○ | `reality` | 0 | Pole wejścia — rzeczywistość przed wyborem trajektorii |
| ● | `signals` | 1 | Miasto emituje impulsy; uwaga rejestruje |
| ◐ | `observation` | 2 | Obserwacja trwa — domyślna granica przy wejściu w pole |
| ◉ | `filtration` | 3 | Kompresja — jeden sygnał z wielu |
| ≈ | `memory` | 4 | Struktura się utrwala (ASCII w UI) |
| ✓ | `validation` | 5 | Wzorzec zastępuje szum — cykl binarny |
| ■ | `knowledge` | 6 | Model czytelny; interferencja relacji |
| OUTPUT | `narration` | 7 | NARRACJA / HIPOTEZA % — wybór T/F ma konsekwencję |

Silnik: `frontend/lib/pipelineEngine.ts` · leksykon: `frontend/lib/symbols.ts`

---

## FIRA Core (warstwa 1)

Core nie zna faz PM. Algebra:

```
Source → Signal → Process → Evidence → Relation → Result
```

Most dystrybucja → core: `engineIndexToCoreStage()` w `fira/core/pipeline.ts` (lub `frontend/lib/fira-core/pipeline.ts`).

| engineIndex | Core stage |
|-------------|------------|
| 0–1 | `source` |
| 2 | `signal` |
| 3–4 | `process` |
| 5 | `evidence` |
| 6 | `relation` |
| 7 | `result` |

---

## Model 5 faz (Wrike / Atlassian / PMI)

| Faza PM | FIRA pipeline | Glify | Co się dzieje |
|---------|---------------|-------|---------------|
| **Initiation** | Wejście · Rzeczywistość | ○ · Observation Gate | Wybór trajektorii (FALSE/TRUE) — nie „poprawna odpowiedź”, lecz kierunek |
| **Planning** | Sygnały · Obserwacja | ● · ◐ | Rejestr impulsów; uwaga staje się mierzalnym sygnałem |
| **Execution** | Filtracja · Pamięć · Walidacja | ◉ · ≈ · ✓ | Redukcja szumu, zapis struktury, sprawdzenie wzorca |
| **Monitoring** | Wiedza | ■ | Model widoczny; relacje (np. KRS) jako interferencja |
| **Closing** | Narracja · OUTPUT | OUTPUT | Trajektoria potwierdzona lub hipoteza % — ślad do `observationTrace` |

**Uwaga:** W PM „Execution” często obejmuje budowę. W FIRA wykonaniem jest **przejście przez filtrację i walidację**, nie deploy kodu.

---

## Model 6 faz (rozszerzony lifecycle)

| Faza PM | Mapowanie FIRA |
|---------|----------------|
| Initiation | ○ `reality` + Observation Gate |
| Definition | ● `signals` — co wchodzi do pola |
| Design | ◐ `observation` + ◉ `filtration` — projektowanie uwagi (co zostaje) |
| Development | ≈ `memory` — struktura rośnie w zapisie |
| Implementation | ✓ `validation` — test wzorca |
| Follow-up | ■ `knowledge` + OUTPUT — wiedza + konsekwencja trajektorii |

„Follow-up” w FIRA = **czy obserwacja daje wspólny ślad**, nie retrospektywa sprintu.

---

## HERMES (4 fazy)

| HERMES | FIRA | Uwagi |
|--------|------|-------|
| Initiation | ○ | Mandat obserwacji — wejście w pole |
| Concept | ● · ◐ · ◉ · ≈ | Faza koncepcyjna = sygnały + filtracja + pamięć |
| Implementation | ✓ · ■ | Walidacja + wiedza operacyjna |
| Deployment | OUTPUT | „Wdrożenie” = wynik widoczny dla obywatela (narracja / hipoteza) |

HERMES „Deployment” ≠ serwer produkcyjny. W dystrybucji WARSZAWASZA to **moment, w którym obserwacja ma konsekwencję** (T/F, ślad, mailto most).

---

## PRINCE2 (skrót)

PRINCE2 rozdziela **Managing** i **Delivering**. FIRA mapuje się na **Delivering** (produkowanie wniosku), nie na strukturę zarządzania:

| PRINCE2 (uproszczone) | FIRA |
|-----------------------|------|
| Starting up / Initiating | ○ Observation Gate |
| Planning | ● ◐ |
| Controlling stage | ◉ ≈ (filtracja bieżąca) |
| Managing product delivery | ✓ |
| Closing a project | ■ OUTPUT |

Business Case w PRINCE2 ≈ **pytanie „co z tego wynika?”** (`implicationPrinciple` w dystrybucji).

---

## Antywzorce

- ❌ Traktowanie OUTPUT jako „raportu PM” — to wynik obserwacji, nie status RAG
- ❌ Dodawanie faz PM do `fira/core/` — to warstwa 3/4 (dystrybucja + dokumentacja)
- ❌ Mapowanie 1:1 bez kompresji — PM ma 5–6 faz, pipeline ma 8 etapów silnika / 7 glifów + OUTPUT
- ❌ AI jako etap PM lub FIRA — protokół nie narzuca interpretacji

---

## Test zgodności

Po przejściu przez mapowanie zadaj jedno pytanie:

> Czy ta faza PM odpowiada na: **co z tego wynika dla obserwatora?**

Jeśli nie — to szum w interfejsie (FALSE). Jeśli tak — zostaje (TRUE).

Cel v2 protokołu: `observationsAlign()` — dwie niezależne obserwacje tego samego zjawiska dają zgodny fingerprint.

---

## Ścieżki w repo

| Zasób | Ścieżka |
|-------|---------|
| Protokół (formalny mapping) | `fira/PROTOCOL.md` § PM phases |
| Ten dokument | `fira/PM_MAPPING.md` |
| Moduł edukacyjny (dystrybucja) | `/learn` · `frontend/app/learn/` |
| Silnik | `frontend/lib/pipelineEngine.ts` |
| i18n modułu | `frontend/lib/pmMappingI18n.ts` |

Wersja: **0.1** (Draft) · zgodna z FOP/0.1
