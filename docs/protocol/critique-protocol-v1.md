# WARSZAWASZA · CRITIQUE PROTOCOL v1.0

> Ciągła krytyka konstruktywna — **kontrakt** (pięć funkcji) + **adaptery** (ludzie).  
> Aksjomaty: **STABLE** (nie LOCKED).  
> Architektura: [COS v1.0](../identity/cos-v1.md) · filozofia: [BABCIA OS](../identity/babcia-os-v1.md)  
> Reguły AI: [`.cursorrules`](../../.cursorrules) · persony: [`personas.md`](../personas.md)  
> Powiązane: [`docs/identity/miejski-operator.md`](../identity/miejski-operator.md)

## Nadrzędny aksjomat

**Rzeczywistość przemawia przez opór.** **Opór jest informacją** — materiał, miasto, użytkownik, bug, tarcie UX.

**Każda wiedza zaczyna się i kończy w rzeczywistości.** Jeżeli rzeczywistość przeczy modelowi — zmienia się model.

### Cztery aksjomaty (STABLE)

1. Rzeczywistość jest ostatecznym walidatorem.
2. Model umożliwia powrót do rzeczywistości.
3. Każda abstrakcja musi zmniejszać opór poznawczy.
4. **Pokora** — gotowość do zmiany modelu **na każdym etapie** procesu; nie krok workflow, lecz własność całego obiegu.

**Intuicja** nie jest werdyktem — hipoteza (*„Sprawdź tutaj”*). Skraca drogę do dobrej hipotezy i **zmniejsza opór poznawczy** (aksjomat 3), zachowując obowiązek weryfikacji.

## Model funkcjonalny (stały) · Interfejs ludzki (zmienny)

**Lewa strona — ludzie:** zmieniają się (dziś Tomek, jutro ktoś inny). Role społeczne.  
**Prawa strona — funkcje:** trwałe. Architektura. **Pytanie ważniejsze od osoby.**

```
┌──────────────────────────────┐
│      INTERFEJS LUDZKI         │  ← biblioteka perspektyw (rośnie)
│  Oluś · Tomek · Babcia · …    │
└──────────────┬───────────────┘
               │ adapter (tłumaczy perspektywę → kontrakt)
               ▼
┌──────────────────────────────┐
│      MODEL FUNKCJONALNY       │  ← nie rozwijaj liczby pytań
└──────────────────────────────┘

1. SENS      — Czy to ma sens?
2. CEL       — Czy wiem, po co?
3. DZIAŁANIE — Co stanie się z pracą, gdy przyjdzie moment weryfikacji?
4. CZŁOWIEK  — Co stanie się z człowiekiem, jeśli ten model odniesie sukces?
5. SKALA     — A co, jeśli zmienimy skalę?
```

**Babcia** nie *jest* „człowiekiem” w modelu — jest **jedną z osób**, które odpowiadają na pytanie **CZŁOWIEK**.  
Ewolucja systemu = **więcej perspektyw**, nie więcej pytań.

Przykładowa biblioteka (adaptery): Oluś, Profesor, Tomek, Magda, Babcia, Dziadek, Czachor — każdy może odpowiadać na dowolną funkcję ze swojego doświadczenia.

```
===================================================================
                     CRITIQUE ● CONTINUOUS
              (kontrakt · implementacje przez adaptery)
===================================================================

1. SENS
Question:  Czy to ma sens?
Failure:   Model stał się bardziej skomplikowany niż rzeczywistość.
           Abstrakcja zastąpiła obserwację.
Example:   👦 Oluś (adapter)

2. CEL
Question:  Czy wiem, po co to jest?
Failure:   Architektura stała się ważniejsza od użytkownika.
           Pierwsza minuta nie prowadzi do działania.
Example:   👔 Tomek (adapter)

3. DZIAŁANIE
Question:  Co stanie się z pracą, gdy przyjdzie moment weryfikacji?
Failure:   Model działa w warsztacie, ale pada w polu pod obciążeniem.
           Wskaźnik zielony, taśma stoi — człowiek idzie w teren i wszystko wychodzi.
Example:   🚜 Dziadek (adapter) — Ursus: sens dopiero w ziemi, nie na papierze.

4. CZŁOWIEK
Question:  Co stanie się z człowiekiem, jeśli ten model odniesie sukces?
Failure:   Sukces na ekranie = porażka w życiu — samotność, odklejenie, obsługa abstrakcji zamiast więzi.
Example:   👵 Babcia (adapter) — pokój pełen modeli, miasto puste; SQL ✓, człowiek ✗.

5. SKALA
Question:  A co, jeśli zmienimy skalę?
Failure:   Lokalna optymalizacja łamie cały system.
Example:   🦅 Orzeł (adapter)

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
