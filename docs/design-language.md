# WARSZAWASZA · Design language

How the interface **communicates meaning**. Not in `.cursorrules`.

**Hierarchy:** Reality → Constraints → Meaning → Interaction → Visual language → Implementation

| Layer | Lives in |
|-------|----------|
| How AI works | `.cursorrules` |
| Meanings | this file + `frontend/design/semantic-tokens.ts` |
| Colours, icons, motion | `frontend/design/tokens.ts` + `globals.css` |

Load when editing UI: `design-language.mdc`

---

## Constraints (reality)

Design for: **light** (glare, night) · **temperature** (device, weather) · **network** · **battery** · **time** (≤10 s) · **accessibility**.

Not mood. Not decoration. If it carries no information → remove.

---

## Identity ≠ signal

Identity = rhythm, proportions, typography, spacing, behaviour, tone — **not a palette**.

Signals = facts (heat, water, delay). Signals never replace identity. Weather does not recolour the brand.

**At most two signal meanings visually active on one screen.**

---

## Semantic dictionary

| Token | Means | Layer |
|-------|-------|-------|
| **Base** | Structure, rhythm, canvas | Identity |
| **Surface** | Panel, layer | Identity |
| **Text** | Primary reading | Identity |
| **Muted** | Secondary hint | Identity |
| **Interaction** | Action, next step | Identity |
| **Decision** | Alert, commit | Identity |
| **Structure** | System shape | Identity |
| **Water** | Water resource | Signal |
| **Nature** | Environment / green | Signal |
| **Transport** | Movement, delays | Signal |
| **Warning** | Pay attention | Signal |
| **Verified** | Confirmed working | Signal |
| **DayFact** | Ephemeral today (marker, not theme) | Signal |

Add tokens here — not in `.cursorrules`.

---

## 39°C field (example)

- **Base** — large contrast type: `39°C`, no ornaments  
- **Water** — one focal meaning: nearest water  
- **Interaction** — click → `CLICK_MAP`  
- **Decision** — human knows hydrant → phone away → water  

Tool disappears. Reality remains.

---

*Meanings from field first. Implementation second.*
