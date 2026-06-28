# WARSZAWASZA · CRITIQUE PROTOCOL v1.0

> Ciągła krytyka konstruktywna — pytania i **Failure** (awaria), nie werdykt dobry/zły.  
> Powiązane: [`docs/identity/miejski-operator.md`](../identity/miejski-operator.md)

```
===================================================================
                     CRITIQUE ● CONTINUOUS
===================================================================

👦 OLUŚ — LOGIC
Question:  Czy to ma sens?
Failure:   Model stał się bardziej skomplikowany niż rzeczywistość.
           Abstrakcja zastąpiła obserwację.

👔 TOMEK — PURPOSE
Question:  Czy wiem, po co to jest?
Failure:   Architektura stała się ważniejsza od użytkownika.
           Pierwsza minuta nie prowadzi do działania.

🚜 DZIADEK — PRACTICE
Question:  Czy to działa?
Failure:   Model działa w warsztacie, ale pada w polu.

👵 BABCIA — HUMAN
Question:  Czy to służy ludziom?
Failure:   System optymalizuje metryki zamiast poprawiać życie.

🦅 ORZEŁ — SCALE
Question:  A co, jeśli zmienimy skalę?
Failure:   Lokalna optymalizacja łamie cały system.

───────────────────────────────────────────────────────────────────
REALITY — Final validator.
If reality disagrees, the model changes. Reality does not.
===================================================================
```

## Rule 0 (nienaruszalna)

**Każda abstrakcja musi zmniejszać opór poznawczy. W przeciwnym razie należy ją usunąć.**

## Zasady towarzyszące

- Model jest zapisem, który umożliwia powrót do rzeczywistości. Model kończy się tam, gdzie zaczyna się życie.
- System rejestruje, koreluje i pamięta. Nie przypisuj mu rozumu ani intencji.
- W polu wszystko wyjdzie — kod, SQL i UI muszą przejść test zderzenia z fizyczną rzeczywistością.
- Przed zatwierdzeniem zmian: **pięć pytań** + sprawdź potencjalne **Failure** dla każdej perspektywy.

*Critique Continuous · nie komitet · nie certyfikat*

## Pętla operacyjna

```
Świat
   │
   ▼
Obserwacje
   │
   ▼
Korelacje (system)
   │
   ▼
Krytyka (ludzie)
   │
   ▼
Nowe reguły
   │
   ▼
Lepsze obserwacje
   │
   └──► (z powrotem do Świata)
```

System **rejestruje i koreluje**. Ludzie **krytykują i decydują**. Reguły **zmniejszają opór**, nie odbierają sprawczości.

---

## Pięć kolapsów (nie mylić)

| # | Rodzaj | Co pęka | Ocena |
|---|--------|---------|--------|
| 1 | **Fizyczny** | materiał, most, silnik — granica wytrzymałości | fakt |
| 2 | **Poznawczy** | człowiek — za dużo ekranów/definicji; *„nie wiem, po co to jest”* (Tomek) | **awaria UX** |
| 3 | **Decyzyjny** | wiele możliwości → jedna decyzja — redukcja przestrzeni | **potrzebny** |
| 4 | **Modelu** | model ≠ rzeczywistość → falsyfikacja | **dobry** (uczysz się) |
| 5 | **Kompresji** | wiele pojęć → prostsza forma (ZIP, origami, wykroj) | **dobry**, jeśli zachowana funkcja |

> **Kolaps nie jest końcem struktury. Jest przejściem do prostszej reprezentacji tej samej rzeczywistości.**

> **Dobry kolaps zachowuje funkcję. Zły kolaps zachowuje tylko formę.**

Test: po kompresji da się **wrócić do rzeczywistości i podjąć decyzję**? Tak → udany kolaps (pięć pytań). Nie → utrata informacji, nie ZIP.

W WARSZAWASZA: **kolaps ≠ katastrofa** — operacja redukcji (krytyka kolapsalna = szukanie, gdzie opis pęka, nie gdzie „ładnie brzmi”).
