# warsztat/ · Evidence Pipeline v1.0

> **Evidence Pipeline nie podejmuje decyzji.** Jego jedynym celem jest zmniejszenie niepewności operatora poprzez przekształcenie obserwacji w audytowalną ocenę sytuacji.

Kanon produktu WARSZAWASZA: [`docs/core/CANON.md`](../docs/core/CANON.md)  
Kontrakt architekta: [`docs/core/decision-engine-architecture.md`](../docs/core/decision-engine-architecture.md)

---

## v0.x sterowanie → v1.0 poznanie

**v0.x (odrzucone)**

```
Observation → Review → Decision → Action
```

Ukryte założenie: *system wie, co robić.*

**v1.0 (kanon)**

```
Rzeczywistość
      ↓
Observation
      ↓
Matcher
      ↓
Evidence
      ↓
Assessment
      ↓
Operator (decyzja człowieka)
      ↓
Rzeczywistość
```

Ukryte założenie: *system pomaga człowiekowi lepiej zrozumieć sytuację.*

Pipeline: `ingest → observe → match → review → assess → test`

Pol'and'Rock = profil `profiles/field/safety/` — nie osobny silnik.

---

## Aksjomaty warsztatu

### 28 · Jeden silnik

Nowe zastosowanie nie uzasadnia nowego silnika. Rozszerz profil w `profiles/`, nie twórz `festival_*`.

### 29 · Silnik nie decyduje

Silnik porządkuje obserwacje, tworzy dowody i przygotowuje ocenę sytuacji. Decyzję podejmuje człowiek lub procedura organizacji.

### 30 · Zachowanie informacji

Każda transformacja musi zachować możliwość prześledzenia źródła dowodu. `Assessment` odwołuje się do `Evidence`; `Evidence` do `observation_id`.

### 31 · Odwracalność poznawcza

Tok rozumowania musi być odtwarzalny wstecz:

`Assessment → Evidence → Observation → źródło`

Implementacja: `contracts/provenance.py` · rejestr w `ObservationBus.registry`.

### 32 · Milczenie jest wynikiem

Brak barier → `UNKNOWN`. System nie mówi „wszystko w porządku”. Milczenie jest poprawnym wynikiem w systemie redukującym szum.

---

## Struktura

```
warsztat/
├── contracts/     observation · evidence · assessment · case · provenance
├── engine/        observation_bus · assessment_engine · pipeline
├── profiles/      communication · architecture · field/safety
├── adapters/      manual · radio · markdown
├── reality/       experiment · debrief
└── tests/
```
