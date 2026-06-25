# Local Initiative Model — courtyard pivot

**Warstwa dystrybucji WARSZAWASZA.** Nie jest częścią `fira/core/`. Przesuwa fokus z makro-modelu państwa na **jeden dziedziniec → jedna inicjatywa → jeden działający prototyp**.

> **Działające prototypy przekonują skuteczniej niż opisane koncepcje.**

---

## Pivot (kanoniczny kierunek)

| Było | Jest |
|------|------|
| Makro state modeling | Jedno podwórko · jedna inicjatywa · jeden prototyp |
| „Micro Node 17” w UI | **Inicjatywa lokalna** / Place / Community Node |
| Tekst `focus_area` | Relacja `focus_area_id` → `focus_areas.slug` |

**Rozszerzanie poziome:** Muranów → Wola → Praga (dzielnice), **nie** w górę do State/UE w tej warstwie produktowej.

**Wyłączone z tej warstwy:** polityka, konstytucja, wybory — obserwacja miasta tylko.

---

## Model wewnętrzny (kod / SQL)

```
Miasto → Sektor → MicroNode (code) → Signal → Observation → Artifact
```

| Warstwa wewnętrzna | UX (użytkownik) |
|--------------------|-----------------|
| `local_micro_nodes` | Inicjatywa lokalna |
| `focus_areas.slug` | Nazwa wyświetlana (np. FIRA Waste Navigation) |
| `partner_label` | Partner lokalny (np. Partnerstwo Muranów) |
| `district` / sektor | Dzielnica · Place |

Klasa `MicroNode` w kodzie TypeScript jest OK — **użytkownik nigdy nie widzi „Micro Node”**.

---

## Drzewo produktu (docs)

```
Places · Projects · Signals · Initiatives · Artifacts · Observations
```

Bez warstwy wyborów / konstytucji / UE w tym drzewie — to osobne kanały COP (electoral lab, state matrix).

---

## Pilot Muranów (seed 009)

| Pole | Wartość |
|------|---------|
| Partner | Partnerstwo Muranów |
| Focus area slug | `WASTE_NAV` |
| Display (PL) | FIRA Waste Navigation |
| Display (EN) | FIRA Waste Navigation |
| Adres | Dzielna 3A/5 |
| Dzielnica | Muranów |
| Status | Pilot |

**Historia na stronie (warszawasza.online):**

```
Partnerstwo Muranów
↓ FIRA Waste Navigation
↓ Dzielna 3A/5
↓ Status: Pilot
```

---

## Stan implementacji

```
PROCESS — STATE, NEXT STEP
STATE        ● TEST (frontend static seed) · ◐ IMPLEMENTATION (SQL 009) · ○ DRAFT (production DB)
SPEC         COP v1.0 · local initiative layer
TARGET       focus_areas · local_micro_nodes · backend/sql/009_local_initiatives.sql
MIRROR       frontend/lib/localInitiativeRegistry.ts · LocalInitiativePilot.tsx
NEXT STEP    Operator: psql apply 009 · wire API when DATABASE_URL product need exists
```

| Warstwa | Plik |
|---------|------|
| Normatywna | Ten dokument |
| Techniczna | `backend/sql/009_local_initiatives.sql` |
| Klient (seed) | `frontend/lib/localInitiativeRegistry.ts` |
| UI | `frontend/app/components/LocalInitiativePilot.tsx` · `LivingInterface.tsx` |

---

## focus_areas — anty-chaos

Slug (`WASTE_NAV`) jest **jedynym** identyfikatorem maszynowym. `display_name_pl` / `display_name_en` są osobno — unikamy mieszania `WASTE_NAV` z „Waste Navigation” w jednym polu tekstowym.

---

## Powiązane

- [`fira/PROTOCOL.md`](./PROTOCOL.md) — FOP · Observation → Artifact
- [`fira/CIVIC_ORGANIZATION_MATRIX.md`](./CIVIC_ORGANIZATION_MATRIX.md) — Channel H (NGO, nie lokalne inicjatywy)
- [`fira/STATE_DATA_MATRIX.md`](./STATE_DATA_MATRIX.md) — państwowa matryca (osobna warstwa)
- [`backend/sql/README.md`](../backend/sql/README.md) — kolejność migracji
