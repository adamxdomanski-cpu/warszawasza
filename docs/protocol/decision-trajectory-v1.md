# Decision trajectory v1

> **Rejestracja → obserwacja → hipoteza → walidacja**  
> Obserwowalny sygnał interakcji — bez modelu „co użytkownik myślał”.

Powiązane: [`log-format-v1.md`](log-format-v1.md) · [`trace-alert-comms-v1.md`](trace-alert-comms-v1.md) · implementacja: `frontend/lib/decisionTrajectory.ts`

---

## Zasada

| Warstwa | Przykład | Status |
|---------|----------|--------|
| **Obserwacja** | `ANSWER_TRUE`, `BACK`, `NEXT` | Fakt — zdarzenie UI |
| **Hipoteza** | „Pytanie może być niejednoznaczne” | Do sprawdzenia — nie fakt |
| **Wniosek** | „Użytkownik zmienił poglądy” | Tylko po walidacji w FIELD |

**Nie** budujemy skomplikowanego modelu zachowania. Rejestrujemy **trajektorię decyzji** — sekwencję zdarzeń, z której da się odtworzyć ścieżkę.

---

## Zdarzenia (alfabet)

| Kod | Znaczenie |
|-----|-----------|
| `ANSWER_TRUE` | Wybór T / TRUE |
| `ANSWER_FALSE` | Wybór F / FALSE |
| `NEXT` | Przejście dalej (np. orient → pytanie, reveal → pole) |
| `BACK` | Powrót do poprzedniego kroku |
| `PAUSE` | Zawahanie (pointer down przed commit) |
| `EXIT` | Porzucenie sesji (opcjonalnie) |
| `FINISH` | Zamknięcie śladu / eksport trace |

Wystarczy kilka typów — cała ścieżka jest **rekonstruowalna** z kolejności.

---

## Przykłady trajektorii (obserwacja)

```
TRUE → TRUE → FALSE → BACK → TRUE → EXIT
```

```
FALSE → FALSE → FALSE → FINISH
```

Zapis ASCII w śladzie:

```
TRUE ↓ TRUE ↓ FALSE ↓ BACK ↓ TRUE ↓ NEXT
```

---

## Hipotezy (generowane później)

Hipotezy **nie** trafiają do warstwy obserwacji. Powstają w analizie (DECISION / raport), zawsze oznaczone jako hipoteza.

**Obserwacja:** użytkownik zmienił odpowiedź trzy razy (`ANSWER_*` × 3, ewentualnie `BACK`).

**Hipoteza:** pytanie może być niejednoznaczne.

**Obserwacja:** kolejne `ANSWER_FALSE` bez `BACK`.

**Hipoteza:** prezentowany opis nie przekonał — *do sprawdzenia*, nie werdykt.

Funkcja referencyjna: `suggestTrajectoryHypotheses()` w `decisionTrajectory.ts` — wyłącznie propozycje, nigdy auto-wnioski w UI obywatela.

---

## Przepływ

```
REJESTRACJA (zdarzenia + timestamp)
        ↓
OBSERWACJA (ścieżka, log, FOP signal.decision_path)
        ↓
HIPOTEZA (analiza operatora / batch — opcjonalnie)
        ↓
WALIDACJA (FIELD, Layer 0, drugi węzeł)
```

---

## FOP / ślad

W bloku FOP/0.1 pole sygnału:

- `decision_path` — skrót ścieżki, np. `T|F|B|T|N`
- Pełna lista zdarzeń w payloadzie trace (`decisionEvents`) — warstwa SYSTEM.

---

## Antywzorce

- ❌ „Użytkownik jest zainteresowany” w logu obserwacji
- ❌ Profile psychograficzne z samej sekwencji kliknięć
- ❌ Wysokie cardinality eventów (scroll co piksel) — to szum, nie trajektoria decyzji
- ❌ Hipoteza w mailu do obywatela bez etykiety *hipoteza*

---

*v1 · obserwacja przed interpretacją · MNE: mało zdarzeń, pełna ścieżka*
