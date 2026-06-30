# Filary i klucze — krystaliczna czystość

| | |
|---|---|
| **Status** | Active |
| **Version** | 1.0 |
| **Owner** | WARSZAWASZA |
| **Scope** | Filozofia projektu · interpretacja · procedury |

## Purpose

Trzy poziomy: **na czym stoimy** (filary) → **jak czytać** (klucze) → **jak postępować** (protokoły).

```
FILARY      → publiczne zasady projektu
    ↓
KLUCZE      → sposób interpretacji (wymaga kontekstu)
    ↓
PROTOKOŁY   → konkretne procedury (Diamond QC, FIRA, Babcia OS…)
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

Filary mapują się na aksjomaty Diamond QC (001–003) i reguły pola (T/F).

---

## II. Klucze interpretacyjne

Nie tajne — **klucze do czytania**, nie do logowania. Odpowiadają na: **jak patrzeć?**

Klucz mówi *jak interpretować*, nie *co zrobić w kodzie*.

**Na razie przekazane:** operator projektu · Oluś · profesor.  
Kolejne osoby dostają klucze, gdy znają kontekst — to przekazanie instrumentów do laboratorium, nie ukrywanie wiedzy.

| Id | Nazwa | Treść |
|----|--------|--------|
| **001** | Tożsamość | Nigdy nie pozwól, aby scenariusz stał się tożsamością. |
| **002** | Szum | Jeżeli informacja nie zmienia decyzji, jest szumem. |
| **003** | Dowód | Każde twierdzenie musi wskazywać źródło pomiaru. |
| **004** | Lustro | Każdy model musi dać się obalić. |
| **005** | Pokora | System nigdy nie wie wszystkiego. |

Klucze 001–003 pokrywają się z Domain Identity Leak, filarami 1–4 i warstwą 8 (Lustro) w matrix 85233.

---

## III. Protokoły (procedury)

Odpowiadają na: **jak postępować w konkretnej sytuacji?**

| Protokół | Ścieżka | Kiedy |
|----------|---------|--------|
| **Diamond QC v3** | [`diamond-qc-v3.md`](./diamond-qc-v3.md) | PR · release candidate · deploy produkcji |
| **FIRA / FOP** | [`fira/PROTOCOL.md`](../../fira/PROTOCOL.md) | encode · parse · obserwacja |
| **Babcia OS** | [`docs/identity/babcia-os-v1.md`](../identity/babcia-os-v1.md) | aksjomaty · capabilities · workflow |
| **Log operacyjny** | [`docs/protocol/log-format-v1.md`](./log-format-v1.md) | LOG · DECISION · rejestr |

Diamond QC v3 **implementuje** filary 4–5 i klucze 001–003 w checklistie odbioru technicznego.

---

## Hierarchia w praktyce

| Pytanie | Poziom |
|---------|--------|
| Dlaczego nie mieszamy Mokotów z origin? | Filar 3 + Klucz 001 |
| Czy ten element UI zostaje? | Filar 2 + Klucz 002 |
| Czy mogę oznaczyć Production PASS? | Filar 4 + Klucz 003 + protokół Diamond QC |
| Czy model jest pewny? | Klucz 004 + 005 |

---

## Powiązania

- Origin stały: [`frontend/lib/studioAnchor.ts`](../../frontend/lib/studioAnchor.ts)
- Product vs lab: [`docs/core/product-vs-lab.md`](../core/product-vs-lab.md)
- Reguła Cursor QC: [`.cursor/rules/diamond-qc-v3.mdc`](../../.cursor/rules/diamond-qc-v3.mdc)
