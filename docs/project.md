# WARSZAWASZA · Project scope & purpose

**Filter:** Czy po dodaniu tego mieszkańcowi Warszawy jest choć odrobinę **łatwiej zrozumieć swoje miasto i podjąć lepszą decyzję**? Nie → nie buduj albo usuń.

**Development principles:** [`.cursor/rules/core.mdc`](../.cursor/rules/core.mdc) (always applied in Cursor).

**Success:** narzędzie znika — zostaje miasto.

Field test: [warszawasza.online/field/heat](/field/heat) — 10 seconds: what’s happening today, what you can do.

---

## Purpose

WARSZAWASZA applies an agnostic observation framework to support **observation, understanding, and action** in the **public urban environment**. Warsaw is the **first deployment** and daily field lab (Dzielna → Mokotów → reality).

---

## In scope (civic tech)

- **Climate (primary):** extreme heat and cold, heat alerts, hydration, shade, adaptation to weather that affects daily decisions (e.g. 39°C, RCB alerts, public water points, climate plan context). First deployment: [`/field/heat`](/field/heat).
- **Ecology & environment:** heat islands, green space, trees, biological surface — when tied to observable civic action (complements climate; not a substitute for it).
- **Public transport & accessibility:** delays, friction, passenger safety (observable facts).
- **Civic participation:** citizen traces, micro-observations, local action mapping.

---

## Out of scope (this product)

- Financial prediction, algorithmic trading, stock speculation.
- Advertising optimization, behavioural targeting, conversion loops.
- Dark patterns, psychological profiling, automated opinion conditioning.

*(Purpose limits live here — not in `.cursorrules`.)*

---

## Adapters (replaceable)

| Adapter | Example |
|---------|---------|
| Place | Warsaw / Mokotów today |
| Language | pl, en, uk, … |
| Interface | web, mail trace, API |

Core pipeline: **Observation → Trajectory → Hypothesis → Validation** — [`protocol/decision-trajectory-v1.md`](protocol/decision-trajectory-v1.md).

Short rules that matter: *Najpierw uszyj spodnie.* · *W polu wszystko wyjdzie.*

---

*Build the page first. Methodology follows evidence.*
