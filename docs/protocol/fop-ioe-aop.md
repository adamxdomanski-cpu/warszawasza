# FOP · IOE · AOP

Trójwarstwowy podział danych obserwacji obywatelskiej.

## Warstwy

| Warstwa | Nazwa | Rola | Gdzie |
|---------|-------|------|-------|
| 1 | **FOP** — Fact Observation Protocol | Fakty o świecie (trace, miejsce, czas, treść) | Encode/decode, wire format |
| 2 | **IOE** — Interaction Observation Events | Surowe zdarzenia / agregat sesji interakcji | Klient = sensor |
| 3 | **AOP** — Analysis Observation Protocol | Feature Store → modele → intencja, niepewność | Offline / backend |

## Łańcuch semantyczny

```
Observation → Interaction → Intent → Decision
```

Trajektoria ≠ intencja. Identyczna geometria ruchu może oznaczać uważne czytanie albo zagubienie — to AOP wnioskuje offline.

## IOE — zasady klienta

- **Bez interpretacji** w przeglądarce: brak `hesitationScore`, entropii, ocen poznawczych.
- **Pointer Events** (`pointerType`: mouse / touch / pen), nie wyłącznie `mousemove`.
- **Orientacja**: `screen.orientation` + `change`, nie `resize`.
- **Kopiowanie**: zdarzenie `copy`, nie `selectionchange`.
- **Współrzędne**: nadpisywane w RAM, nie logowane centralnie.
- **Agregat v0.2** przy closure (share / continue); docelowo strumień zdarzeń → backend buduje sesję.

## Pola IOE/0.2 (agregat sesji)

Temporal: `decisionTime`, `timeToFirstAction`, `timeToFirstScroll`  
Device: `inputType`, `viewportWidth`, `viewportHeight`, `prefersReducedMotion`  
Spatial: `pointerDistance`, `pointerReversals`, `hoverCount`, `hoverTime`, `scrollDistance`, `scrollReversals`  
Reading: `diagnosticsOpened`, `diagnosticsOpenTime`, `textCopyCount`  
Context: `focusLossCount`, `orientationChanges`, `closureEvent`

## A/B ekranu zapisu

Jedyna zmienna copy: `statusText`

- **A:** „Obserwacja została zapisana.”
- **B:** „Ta chwila została zapisana.”

Route demo: `/zapis?variant=a|b`

## Implementacja

- Ekran: `frontend/app/zapis/`, `ObservationSavedScreen.tsx`
- Sensor: `frontend/lib/ioe/IoeSensor.ts`
- FOP dump: `frontend/lib/savedObservationScreen.ts`
