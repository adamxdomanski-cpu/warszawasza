# Decision Engine — struktura

**Jeden silnik:** `warsztat/`  
**Pol'and'Rock:** profil `profiles/field/safety/` — nie `festival_secure/`.

## Pipeline

```
ingest → observe → match → review → assess → test
```

```
Radio / Manual / Markdown / BLE / …
            ↓
      Observation Bus
            ↓
         Matcher
            ↓
         Evidence
            ↓
         Reviewer (profil: epistemic | communication | field/safety | …)
            ↓
      Decision Engine
            ↓
         Operator (człowiek)
            ↓
         Reality
```

Kanon: [`docs/core/decision-engine-architecture.md`](../../docs/core/decision-engine-architecture.md)
