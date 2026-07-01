# Filary i klucze — krystaliczna czystość

| | |
|---|---|
| **Status** | Active |
| **Version** | 1.3 |
| **Owner** | WARSZAWASZA |
| **Scope** | Filozofia projektu · interpretacja · procedury |

## Purpose

Trzy poziomy: **na czym stoimy** (filary) → **jak czytać** (klucze) → **jak postępować** (protokoły).

```
FILARY      → publiczne zasady projektu
    ↓
KLUCZE      → sposób interpretacji (wymaga kontekstu)
    ↓
PROTOKOŁY   → konkretne procedury (Diamond Protocol v1.0 · Diamond QC v3 · FIRA · Babcia OS…)
```

**Filary** i **klucze** to nie sekrety kryptograficzne (nie API key, nie SSH). To język projektu.

Copy kanoniczne filarów w UI: `frontend/lib/i18n.ts` (`noisePrinciple`, `implicationPrinciple`, `clarityPrinciple`).

---

## I. Filary krystalicznej czystości

Publiczne. Każdy może przeczytać. Odpowiadają na: **na czym stoimy?**

| # | Filar | Zasada |
|---|--------|--------|
| 1 | **Redukcja szumu** | Celem nie jest więcej danych. Celem jest mniej szumu. |
| 2 | **Jasna implikacja** | Każda informacja odpowiada: co z tego wynika? |
| 3 | **Origin ≠ Scenario ≠ Location** | Muranów/Dzielna (origin) · heat/POI (scenario) · GPS użytkownika (location) — nigdy razem w metadata produktu. |
| 4 | **Dowód ponad przypuszczenie** | FAKT · HIPOTEZA · PROGNOZA · NIEZWERYFIKOWANE — merge i deploy nie są dowodem; pomiar na produkcji zamyka pętlę. |
| 5 | **Minimalna zmiana** | Napraw tylko bloker. Bez refaktoru „przy okazji”. |
| 6 | **Minimalizacja danych** | Jeżeli dana nie jest potrzebna do obsługi zgłoszenia, nie zbieraj jej. Redukcja szumu w warstwie prywatności. |

Filary mapują się na aksjomaty Diamond QC (001–003) i reguły pola (T/F). W aplikacji: `/prywatnosc` · copy: `frontend/lib/privacyCopy.ts`.

### Most: uwaga i dane

> **Szanuj uwagę człowieka tak samo, jak szanujesz jego dane.**

Łączy Filar 1 (redukcja szumu w interfejsie) z Filar 6 (minimalizacja danych). Ta sama filozofia w dwóch warstwach: mniej hałasu informacyjnego · mniej danych, których nie potrzebujesz.

---

## II. Klucze interpretacyjne

Nie tajne — **klucze do czytania**, nie do logowania. Odpowiadają na: **jak patrzeć?**

Klucz mówi *jak interpretować*, nie *co zrobić w kodzie*.

**Na razie przekazane:** operator projektu · Oluś · profesor.  
Kolejne osoby dostają klucze, gdy znają kontekst — to przekazanie instrumentów do laboratorium, nie ukrywanie wiedzy.

| Id | Nazwa | Treść |
|----|--------|--------|
| **K001** | Tożsamość | Nigdy nie pozwól, aby scenariusz stał się tożsamością. |
| **K002** | Szum | Jeżeli informacja nie zmienia decyzji, jest szumem. |
| **K003** | Dowód | Każde twierdzenie musi wskazywać źródło pomiaru. |
| **K004** | Lustro | Każdy model musi dać się obalić. |
| **K005** | Pokora | System nigdy nie wie wszystkiego. |

Identyfikatory **K001–K005** są stałe — używaj ich w DECISION, raportach QC i commitach, np. *Decyzja zgodna z K003* · *Naruszenie K001*.

K001–K003 pokrywają się z Domain Identity Leak, filarami 1–4 i warstwą 8 (Lustro) w matrix 85233.

---

## III. Protokoły (procedury)

Odpowiadają na: **jak postępować w konkretnej sytuacji?**

| Protokół | Ścieżka | Kiedy |
|----------|---------|--------|
| **Diamond Protocol v1.0** | [`diamond-protocol-v1.md`](./diamond-protocol-v1.md) | Zasady robocze · Living · opt-in w Cursorze |
| **Diamond QC v3** | [`diamond-qc-v3.md`](./diamond-qc-v3.md) | PR · release candidate · deploy produkcji |
| **FIRA / FOP** | [`fira/PROTOCOL.md`](../../fira/PROTOCOL.md) | encode · parse · obserwacja |
| **Babcia OS** | [`docs/identity/babcia-os-v1.md`](../identity/babcia-os-v1.md) | aksjomaty · capabilities · workflow |
| **Log operacyjny** | [`docs/protocol/log-format-v1.md`](./log-format-v1.md) | LOG · DECISION · rejestr |

Diamond QC v3 **implementuje** filary 4–5 i klucze K001–K003 w checklistie odbioru technicznego.

---

## Hierarchia w praktyce

| Pytanie | Poziom |
|---------|--------|
| Dlaczego nie mieszamy Mokotów z origin? | Filar 3 + **K001** |
| Czy ten element UI zostaje? | Filar 2 + **K002** |
| Czy mogę oznaczyć Production PASS? | Filar 4 + **K003** + protokół Diamond QC |
| Czy model jest pewny? | **K004** + **K005** |

---

## Odwołania w decyzjach

Identyfikatory działają jak norma techniczna — skrót zamiast powtarzania całej rozmowy.

| Przykład | Znaczenie |
|----------|-----------|
| *Naruszenie K001* | Scenariusz w metadata produktu (Domain Identity Leak) |
| *Decyzja zgodna z K003* | Production PASS dopiero po curl / pomiarze |
| *Filar 3 + K001* | Origin ≠ scenario — oba poziomy naraz |

W blokach DECISION (`docs/protocol/log-format-v1.md`) można dopisać jedną linię: `Keys: K003` lub `Violation: K001`.

---

## Powiązania

- Origin stały: [`frontend/lib/studioAnchor.ts`](../../frontend/lib/studioAnchor.ts)
- Product vs lab: [`docs/core/product-vs-lab.md`](../core/product-vs-lab.md)
- Reguła Cursor QC: [`.cursor/rules/diamond-qc-v3.mdc`](../../.cursor/rules/diamond-qc-v3.mdc)
