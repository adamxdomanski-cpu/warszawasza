# WARSZAWASZA / FIRA — Citrus Cursor Motif

Visual identity layer for the landing page. **Not** LiveMesh runtime logic.

## Core motif

```
⚡ ~~~~ ◇
```

Alternate: `⚡ ~~~~ ●` (attention node instead of polished crystal)

**Reading:** change → trace → validated signal

## Symbols

| Glyph | Name | Meaning |
|-------|------|---------|
| ⚡ | lightning | impulse, change, anomaly, moment of attention |
| `~~~~` | cursor tail | trace, memory of movement, path of attention |
| ◇ | signal crystal | polished signal, artifact, validated pattern |
| TRUE | validation | signal |
| FALSE | validation | noise |

## Definition

The Citrus Cursor is **not** a pointer.

It is the visible trail left by attention moving through signal and noise.

## Design constraints

- Dark editorial streetwear mood
- Accent: `#E40045` (beetroot)
- No SaaS gradients, no surveillance UI, no rainbow
- Minimal motion only (subtle tail glow)
- PL / EN / IT via `frontend/lib/copy.ts` → `citrusMotif`

## Implementation

- Component: `frontend/components/CitrusCursor.tsx`
- Styles: `frontend/app/globals.css` → `.citrus-tail`, `.hud-frame`
