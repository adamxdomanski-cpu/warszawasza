# WARSZAWASZA · Interface language

**Not a design system.** A language answers: *what does this mean?*  
Implementation (colour, icon, motion, sound) comes later and may change.

Load when editing UI: `interface-language.mdc` · [`frontend/design/language.ts`](../frontend/design/language.ts)

---

## Identity ≠ signal

| | Identity (rock) | Signal (weather) |
|---|-----------------|------------------|
| Changes | rarely | with facts |
| Examples | rhythm, spacing, tone | heat alert, water point |

Signals never replace identity. Weather does not recolour the brand.

**Identity is not a palette.** It is:

- rhythm  
- proportions  
- typography  
- spacing  
- behaviour  
- tone of communication  

Colour is one implementation detail — not the brand.

---

## Dictionary (meanings)

| Token | Means | Layer |
|-------|-------|-------|
| **Ground** | Canvas, calm (BASE) | Identity |
| **Surface** | Layer, panel | Identity |
| **Text** | Primary reading | Identity |
| **Muted** | Secondary hint | Identity |
| **Decision** | Alert, commit (DECISION) | Identity |
| **Interaction** | Action affordance (INTERACTION) | Identity |
| **Structure** | Shape of the system | Identity |
| **Water** | Water resource (WATER) | Signal |
| **Nature** | Environment / green | Signal |
| **Warning** | Alert — pay attention | Signal |
| **Verified** | Confirmed working | Signal |
| **DayFact** | Ephemeral fact today (marker, not theme) | Signal |

On one screen: **at most two signal tokens** may be visually active.  
A library may hold more; activation is what costs attention.

If a token carries no information → decoration → remove.

---

## Implementation (today only — may change)

| Meaning | CSS var now | Notes |
|---------|-------------|-------|
| Ground | `--color-field` | |
| Text | `--color-ink` | |
| Decision | `--color-accent` | not “burgund” — *decision* |
| Interaction | `--color-citrus` | not “cytrus” — *interaction* |
| Verified | `--color-citrus` | same impl OK if meaning distinct in UI |
| Water | `--color-sapphire` | |
| Warning | `--color-accent` | |

In five years **Water** might be an icon or sound. **Water** stays.

---

*Define meanings in field. Adjust colour, icon, or motion after.*
