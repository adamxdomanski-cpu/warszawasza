# WARSZAWASZA · Design system

**Meaning first. Colour second.**  
Not in `.cursorrules` — load this when working on UI (`design-system.mdc`).

---

## 1 · Identity ≠ signal

| Layer | Stable (identity) | Variable (signals) |
|-------|-------------------|---------------------|
| Colour | brand tokens | fact/status accents |
| Typography | roles, scale | — |
| Motion | — | only when reality changes |
| Layout | grid, chrome | — |
| Sound | — | optional alerts |

Identity is the rock. Signals are the weather. **Weather must not recolour the brand.**

---

## 2 · Colour carries information

If a token does not carry information → it is decoration → remove it.

You may maintain a **library** of many colours.  
On **one screen**, at most **two signal tokens** may be visually active at once (plus identity base).

---

## 3 · Semantic dictionary (language)

Define what before how. Implementation lives in [`frontend/design/tokens.ts`](../frontend/design/tokens.ts) and [`frontend/app/globals.css`](../frontend/app/globals.css).

| Token | Meaning | Layer | Example use |
|-------|---------|-------|-------------|
| **Ground** | Canvas, calm | Identity | page background |
| **Surface** | Elevated panel | Identity | cards, lists |
| **Text** | Primary reading | Identity | facts, headings |
| **Muted** | Secondary hint | Identity | metadata, hints |
| **Focus** | Decision point | Identity | primary CTA, commit |
| **Flow** | Next step, navigation | Identity | links, continue |
| **Structure** | Topology / system shape | Identity | FIRA structural badges |
| **Water** | Water resource | Signal | hydrant, fountain |
| **Nature** | Environment / green | Signal | park, shade tree |
| **Warning** | Alert, pay attention | Signal | RCB, extreme heat |
| **StatusOk** | Verified working | Signal | open, works |
| **SignalDay** | Ephemeral day fact | Signal | ▲ heat today (marker, not theme) |

---

## 4 · Implementation map (current — may change)

Hex values implement meaning; they are not the language.

| Semantic | CSS var (today) | Notes |
|----------|-----------------|-------|
| Ground | `--color-field` | `#030303` |
| Text | `--color-ink` | |
| Focus | `--color-accent` | decision / alert emphasis |
| StatusOk | `--color-citrus` | working / OK dot |
| Water | `--color-sapphire` | water-related facts |
| Structure | `--color-fira-structure*` | not locale tint |

Do not add new hex values without a semantic token row above.

---

## 5 · Principles (design only)

- WARSZAWASZA colours — inspired by the city, not a copy of MSI or municipal branding.
- No weather-as-theme (no full UI recolour for rain/snow/heat).
- No colour as mood (love, sadness, “vibes”).
- Motion only on state change — not continuous decoration.

---

*Tomorrow: refine tokens in field test. Assign or adjust hex after meaning is stable.*
