# WARSZAWASZA · Project scope & purpose

**Filter:** Czy po dodaniu tego mieszkańcowi Warszawy jest choć odrobinę **łatwiej zrozumieć swoje miasto i podjąć lepszą decyzję**? Nie → nie buduj albo usuń.

**Development principles:** [`.cursor/rules/core.mdc`](../.cursor/rules/core.mdc) (always applied in Cursor).

**Success:** narzędzie znika — zostaje miasto.

**Not a news portal.** WARSZAWASZA does not compete for attention — it helps direct attention where it is needed. No feeds, clickbait, “hot topics”, political debate, marketing CTAs, or artificial engagement loops.

Field test: [warszawasza.online/field/heat](/field/heat) — 10 seconds: what’s happening today, what you can do.

---

## Purpose

WARSZAWASZA is a **reality interface** — not a website, not a news portal. Warsaw is the **first deployment** and daily field lab (Dzielna → Mokotów → reality).

**Describe the human, not the system.** The product succeeds when someone can:

- **Łatwiej znaleźć** — what matters here, now  
- **Łatwiej zrozumieć** — what it means for them  
- **Łatwiej zdecydować** — one concrete next step  

The interface disappears. The person and the city remain.

**Color and motion come from the city**, not from a graphic theme: heat → warm tones, storm → cool, autumn → amber, snow → near-monochrome. When nothing important changes, the UI almost stands still. When reality shifts, the surface may shift subtly — not decoration, **signal**.

**DNA is discovered**, not menu-tabbed — like finding a kamienica, a story, a face; rollout, not “Historia → click”.

---

## Three levels of information

| Level | Human question | Examples | When |
|-------|----------------|----------|------|
| **1 · Find & decide** | Co robię teraz? | 39°C · water 250 m · metro +8 min | First screen, ≤10 s |
| **2 · Understand context** | Co się zmieniło? | Alert since morning · wind from 17:00 | One line below |
| **3 · Discover depth** | Skąd to / kim jesteśmy? | Studio, values, traces | On demand — never blocks level 1 |

Level 1 is not “content”. It is **a decision in the city**.

---

## Design discipline (project — not Cursor rules)

Zobacz · Zrozum · Pomóż · Sprawdź · Powtórz.

Show facts. Do not fight for attention. Do not guess the human. Let reality lead the next change.

## In scope (civic tech)

- **Climate (primary):** extreme heat and cold, heat alerts, hydration, shade, adaptation to weather that affects daily decisions (e.g. 39°C, RCB alerts, public water points, climate plan context). First deployment: [`/field/heat`](/field/heat).
- **Ecology & environment:** heat islands, green space, trees, biological surface — when tied to observable civic action (complements climate; not a substitute for it).
- **Public transport & accessibility:** delays, friction, passenger safety (observable facts).
- **Civic participation:** citizen traces, micro-observations, local action mapping.

---

## What we show (content)

**Reject attention competition**, not observable reality.

| Reject (attention / noise) | Keep (orientation) |
|----------------------------|-------------------|
| Feeds, infinite scroll | One fact, one next step |
| Clickbait headlines | Plain observable statements |
| “Hot topics”, debate, opinion loops | Facts that change what you can do today |
| Marketing CTAs, conversion design | Time-bound useful facts (e.g. free entry *today*) |
| Engagement metrics as product goal | RCB alert, closed bridge, metro delay |

**Filter:** does this help someone take a **concrete decision in their current context**?

Administrative **facts** (alert, closure, delay) stay — **political theatre** and **promotional noise** go.

The interface helps people **see**; they **decide**. It does not replace the world with an editorial feed.

*(Ads, dark patterns, profiling — Out of scope below.)*

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
