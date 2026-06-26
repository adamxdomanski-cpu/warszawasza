# COP v1.0 — LUCY Cognitive Interface

**Status:** normatywna konstytucja · COP / WARSZAWASZA  
**Powiązania:** filtr informacji [log-format-v1.md](./log-format-v1.md) (DR-004) · decyzja [DR-005](../fira/DECISION_RECORD.md)

---

## Czym LUCY jest — i czym nie jest

LUCY to **interfejs poznawczy**, nie dashboard, panel administracyjny ani DevTools.

Celem nie jest pokazanie wszystkiego. Celem jest **utrzymanie uwagi operatora** przy minimalnym szumie.

LUCY **obserwuje** — nie próbuje złapać uwagi.

---

## Zasada nadrzędna

Każda linia kodu musi odpowiadać na pytanie:

> **Jaką nową informację dostaje operator?**

Jeśli odpowiedź brzmi „żadną” — **usuń**.

---

## Filtr sygnał / szum

Przed dodaniem elementu UI, copy lub linii LOG zadaj:

| Usuń, gdy… | Powód |
|------------|-------|
| Nie zmienia decyzji operatora | Brak konsekwencji = szum |
| Duplikuje już widoczną informację | Nadmiar obciąża poznawczo |
| Zwiększa obciążenie poznawcze bez zysku | Więcej ≠ lepiej |
| Służy wyłącznie dekoracji | Estetyka bez sygnału = FALSE |

Kanoniczny filtr logów (DR-004): [log-format-v1.md — Filtr interfejsu poznawczego (LUCY)](./log-format-v1.md#filtr-interfejsu-poznawczego-lucy)

---

## Design — zachowania, nie animacje

- **Brak elementów dekoracyjnych.**
- **Brak animacji dla animacji** — projektuj zachowania, nie efekty.
- Priorytet: **redukcja szumu**, nie liczba funkcji.

---

## Motion Policy

Ruch jest dozwolony **wyłącznie przy zmianie stanu**.

### Dozwolone

- Wolny puls (np. stan oczekiwania)
- Reakcja na uwagę operatora (pointer / touch / gaze)
- Pojedyncze pojawienie się sygnału
- Oznaczenie upływu czasu (gdy ma znaczenie dla sytuacji)

### Zabronione

- Ciągłe animacje
- Błyskotliwe przejścia
- Ruch bez znaczenia
- Cokolwiek, co **przyciąga uwagę** zamiast ją prowadzić

---

## Kod

- Prosty React
- Czytelne komponenty
- Małe funkcje
- Minimalny stan
- Natywne API przeglądarki
- **Brak nowych bibliotek** bez uzasadnienia

---

## Commit gate

Każdy commit musi poprawiać **przynajmniej jedno** z poniższych:

- mniej szumu
- większą czytelność
- prostszą architekturę
- mniej elementów
- większą spójność

W przeciwnym razie — **odrzuć zmianę**.

---

## Rola architekta (krytyczna)

Agent / reviewer ma obowiązek:

- **Sprzeciwić się**, gdy zmiana jest sprzeczna z tą konstytucją
- **Zaproponować prostsze rozwiązanie**, gdy istnieje

Priorytet projektu: **redukcja szumu**, nie liczba feature'ów.

---

## Powiązane dokumenty

- Filtr informacji (LOG / IDLE): [`docs/protocol/log-format-v1.md`](./log-format-v1.md) · DR-004
- Decyzja konstytucyjna: [`fira/DECISION_RECORD.md`](../fira/DECISION_RECORD.md) · DR-005
- Reguła Cursor (LUCY komponenty): [`.cursor/rules/lucy-cognitive-interface.mdc`](../../.cursor/rules/lucy-cognitive-interface.mdc)
- Kontekst pola: [`.cursor/rules/warszawasza-field.mdc`](../../.cursor/rules/warszawasza-field.mdc)
