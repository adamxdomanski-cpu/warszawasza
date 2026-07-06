# Evidence Pipeline · kontrakt architektury v1.0

**Status:** kontrakt architekta · lipiec 2026  
**Nazwa:** **Evidence Pipeline** (nie Decision Engine, nie silnik poznawczy)  
**Kod:** [`warsztat/`](../../warsztat/) · [`warsztat/CANON.md`](../../warsztat/CANON.md)

> Evidence Pipeline nie podejmuje decyzji. Jego jedynym celem jest zmniejszenie niepewności operatora poprzez przekształcenie obserwacji w audytowalną ocenę sytuacji.

Cursor: [`.cursor/rules/decision-engine-architecture.mdc`](../../.cursor/rules/decision-engine-architecture.mdc) · `@decision-engine-architecture`

---

## v0.x → v1.0

| v0.x sterowanie | v1.0 poznanie |
|-----------------|---------------|
| Observation → Decision → Action | Observation → Evidence → Assessment → Operator |
| System wie, co robić | System pomaga zrozumieć sytuację |
| `decide()` | `assess()` |
| `DecisionSupport` | `Assessment` |

---

## STOP

Nie projektujesz aplikacji.

Projektujesz **Evidence Pipeline** — architekturę poznania, nie sterowania.

Każda propozycja architektury przechodzi przez ten filtr.

---

## Cel

Buduj **framework**, nie produkt.

Każdy komponent:

- testowalny,
- wymienialny,
- walidowalny,
- skalowalny,
- niezależny od konkretnego modelu AI.

Jeżeli projekt wiąże architekturę z GPT, Claude lub innym modelem — zaproponuj lepszą architekturę.

**LLM jest implementacją. Nigdy fundamentem.**

---

## Warstwy (kolejność obowiązkowa)

```
Decision
    ↓
Parser
    ↓
Knowledge Model
    ↓
Review Pipeline
    ↓
Evidence
    ↓
Decision Report
    ↓
Reality (Test)
```

Nigdy odwrotnie.

**Przedmiot silnika to decyzja.** Tekst, mail, dokumentacja — artefakt załączony do pytania decyzyjnego.

---

## Kontrakt recenzenta

```text
review(context) -> Evidence[]
```

Recenzent:

- **nie** podejmuje decyzji,
- **nie** poprawia dokumentu,
- **nie** proponuje nowej architektury,
- odpowiada **wyłącznie** za swój obszar (→ decision-review-system.md).

---

## Evidence

Recenzenci nie zwracają opinii. Zwracają **dowody**.

| Pole | Znaczenie |
|------|-----------|
| `reviewer` | która rola |
| `severity` | waga dowodu |
| `confidence` | pewność recenzenta co do dowodu (nie „jakość tekstu”) |
| `location` | gdzie w artefakcie (claim, zdanie, span) |
| `message` | co wykryto |
| `recommendation` | opcjonalnie; tylko gdy rola na to pozwala |

Nigdy luźnych komentarzy.

---

## Struktura repozytorium

**Jeden silnik:** `warsztat/`. **Nie** `festival_secure/`, `festival_medical/`, …

Pol'and'Rock = profil `profiles/field/safety/` — pierwszy poligon walidacyjny, nie osobny produkt.

```
warsztat/
├── contracts/     observer · matcher · reviewer · observation · evidence · decision
├── engine/        observation_bus · decision_engine · pipeline
├── profiles/      communication/mail · architecture · field/safety · …
├── adapters/      radio · manual · markdown · ble · weather · llm
├── reality/       experiment · debrief
└── tests/
```

---

## Pipeline silnika

```
ingest → observe → match → review → decide → test
```

| Etap | Odpowiedzialność |
|------|------------------|
| `ingest()` | Adapter przyjmuje surowe wejście |
| `observe()` | Observation Bus zbiera obserwacje |
| `match()` | Matcher filtruje (wymienny: regex, reguły, LLM…) |
| `review()` | Reviewer zwraca `Evidence[]` |
| `decide()` | Decision Engine agreguje orientację |
| `test()` | Reality — czy jest najmniejszy test terenowy? |

---

## Observation → Evidence

**Evidence** to już zinterpretowana obserwacja. Z radia najpierw przychodzi coś wcześniejszego:

```
Radio / Manual / Markdown / BLE / …
            ↓
      Observation
            ↓
         Matcher
            ↓
         Evidence
            ↓
         Reviewer
            ↓
      Decision Engine
            ↓
         Operator (człowiek)
            ↓
         Reality
```

**Observation Bus** — nie Evidence Bus. Magistrala surowych obserwacji przed interpretacją.

---

## Reviewer + profil (nie osobne silniki recenzentów)

Nie istnieje `SafetyReviewer` jako osobna architektura. Istnieje **Reviewer** z profilem:

| Rola / domena | Profil |
|---------------|--------|
| Profesor | `epistemic` |
| Gil | `communication` |
| Jurek | `responsibility` |
| Tłum / medycyna / radio w terenie | `field/safety` (i sibling: `field/logistics`, `field/weather`) |

Ten sam kontrakt `review(context, observations) -> Evidence[]`. Zmienia się **profil w pipeline**, nie fundament.

Profile w `profiles/` (JSON/YAML), np.:

- `communication/mail`
- `architecture`
- `field/safety` ← Pol'and'Rock

---

## Aksjomat 28 · jeden silnik

> **Nowe zastosowanie nie uzasadnia nowego silnika.**

Jeżeli nowy problem można wyrazić jako **profil** istniejącej architektury — rozszerz profil. Nie buduj kolejnego repozytorium.

Chroni przed mnożeniem `festival_*` dla podobnych problemów.

---

## Profile (przykłady)

Kolejność recenzentów w konfiguracji — nie na sztywno w kodzie.

```json
{ "profile": "field/safety", "reviewers": ["crowd_density", "medical", "radio", "operator"] }
{ "profile": "communication/mail", "reviewers": ["profesor", "gil", "operator"] }
{ "profile": "architecture", "reviewers": ["profesor", "cietrzew", "orzel", "jurek", "operator"] }
```

Jutro: `field/safety` · pojutrze: `communication/mail` · za miesiąc: `warszawasza` — **silnik ten sam**.

---

## Modele AI

Adaptery implementujące `review()`. Wymienne.

Framework **nie zależy** od dostawcy.

---

## Testowalność

- każdy moduł — testy jednostkowe,
- każdy recenzent — wejście → oczekiwane `Evidence` → assert,
- recenzenci sami podlegają walidacji.

To nie jest lint tekstu. To walidacja **decyzji** na podstawie dowodów.

---

## Rzeczywistość

Framework **nigdy** nie wydaje ostatecznej decyzji.

Ostatni etap:

> Czy zaprojektowaliśmy najmniejszy możliwy test?

Jeżeli nie — projekt nie jest gotowy.

`Reality` zawsze zwraca wariant: **„Zaprojektuj test.”**

---

## Zasada główna

Nie projektuj systemu, który **generuje odpowiedzi**.

Projektuj system, który **redukuje niepewność** i wspiera odpowiedzialne decyzje.

Wybór: więcej funkcji **vs** prostsza architektura → **prostsza architektura**.

Framework ma opisywać **prawa organizacji, komunikacji i podejmowania decyzji** — nie możliwości aktualnych narzędzi.

> Dobra architektura nie przewiduje przyszłości. Projektuje takie zależności, które pozostają poprawne niezależnie od przyszłości.

---

## Aksjomat trwałości

**Cel projektowy**

> Projektuj takie zasady, których ważność nie zależy od technologii użytej do ich implementacji.

**Granica poznawcza**

> Nie zakładaj, że którakolwiek zasada jest ostateczna. Każda pozostaje hipotezą aż do wielokrotnej weryfikacji przez rzeczywistość.

**Konsekwencja architektoniczna**

Technologia jest wymienna. Implementacja jest wymienna. Architektura również może ewoluować. **Najwolniej powinny zmieniać się zasady.**

---

## Hierarchia zależności

```
Rzeczywistość
      │
      ▼
Zasady
      │
      ▼
Architektura
      │
      ▼
Implementacja
      │
      ▼
Technologia
```

**Każda warstwa może zmieniać warstwę poniżej. Nigdy odwrotnie.**

Nie definiujemy czasu („100 lat”). Definiujemy **kierunek zależności**:

> Jeżeli rzeczywistość obali którąś z naszych zasad — zmieniamy zasadę.  
> Jeżeli zmieni się technologia — nie musimy zmieniać zasad.

To jest różnica między dogmatem a metodą: ambicja trwałego systemu bez twierdzenia, że jest nieomylny.

| Umiera z technologią | Ma szansę przetrwać |
|----------------------|---------------------|
| „Wywołaj GPT i zrób X.” | „Istnieje recenzent, który odpowiada za weryfikację hipotez.” |

Zmienia się **implementacja**. Nie zmienia się **odpowiedzialność**.

W warsztacie odkrywasz nie GPT ani Python — lecz **relację, szum, następny krok, walidację, odpowiedzialność**. Szukasz zasad **bardziej trwałych niż technologie** — i pozwalasz **rzeczywistości** zdecydować, które z nich okażą się naprawdę ponadczasowe.

---

## Aksjomaty Evidence Pipeline (28–32)

Pełna treść: [`warsztat/CANON.md`](../../warsztat/CANON.md)

| # | Zasada |
|---|--------|
| 28 | Nowe zastosowanie = profil, nie nowy silnik |
| 29 | Silnik nie decyduje — porządkuje obserwacje, tworzy dowody, przygotowuje ocenę |
| 30 | Zachowanie informacji — Assessment → Evidence → `observation_id` |
| 31 | Odwracalność poznawcza — `contracts/provenance.py` |
| 32 | Milczenie jest wynikiem — `UNKNOWN`, bez „wszystko OK” |

---

## Architektoniczny test czasu

Przed dodaniem modułu — trzy pytania:

1. Czy moduł ma **jedną** odpowiedzialność?
2. Czy można go **wymienić** bez przebudowy całego systemu?
3. Czy opisuje **prawo / odpowiedzialność**, czy **konkretną technologię**? Technologia → adapter, nie fundament.

Jeżeli na którekolwiek: **nie** — wróć do projektu.

**Architektura jest ważniejsza od implementacji.**
