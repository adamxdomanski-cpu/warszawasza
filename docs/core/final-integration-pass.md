# WARSZAWASZA · Final integration pass

**Use this file as the single Cursor task.** It says **what to build**, not product philosophy.  
Human context: [WARSZAWASZA w dwóch minutach](../WARSZAWASZA-w-dwoch-minutach.md).

---

## Copy-paste for Cursor

```
@docs/core/final-integration-pass.md

Implement the next iteration of WARSZAWASZA as a reality interface.

GOAL: Reduce the energy required to understand the city and leave an observation.
Smallest possible working version. Do not redesign architecture.

See sections 1–5 below. Check "Current status" — implement only gaps.
Run: cd frontend && npm run build
```

---

## Current status (branch `cursor/cold-start-prep-f727`)

| Requirement | Status | Notes |
|-------------|--------|--------|
| `/` cold start, two CTAs above fold | ✅ | `ColdStartClient.tsx` |
| Voice on `/field/heat` | ✅ | `FieldVoiceReport.tsx`, lean header CTA |
| Record → review → send | ✅ | STT optional, typing fallback |
| After send: two choices only | ✅ | 📍 nearby · say again |
| Trace L1/L2/L3 builders | ✅ | `observationTrace.ts`, `traceJourney.ts` |
| L1/L2/L3 in post-send UI on field | ⚠️ | Clipboard = L1 only; L2/L3 not in sent panel |
| L1 citizen copy (Grandma test) | ⚠️ | `buildTraceCitizenLayer` still heat-specific links |
| Technical block on `/field/heat` | ⚠️ | Collapsed `details` — hide from field test or `?dev=1` |
| Cold-start field test | ⏳ | Link + one question — not run yet |

---

## 1. Three audience layers

Split observation export into three progressive layers.

### LEVEL 1 — Citizen (default)

Visible immediately. Show only:

- ✓ Observation received
- Verification status (plain language)
- Primary action buttons
- Relevant links

Nothing else.

**Code:** `buildTraceCitizenLayer()` · post-send UI · mailto body.

### LEVEL 2 — Journey (collapsed by default)

Title: **▼ How was this observation processed?**

Human trajectory only, e.g.:

```
START → Location selected → Confirmation → Sent → Completed
```

No internal codes (`SELECT`, event IDs).

**Code:** `buildTraceJourneyLayer()` · `formatJourneyBlock()` in `traceJourney.ts`.

### LEVEL 3 — Technical (collapsed by default)

Developer artifacts only: trace, pipeline, FOP, telemetry, hypotheses, debug.

**Never mix with Level 1.**

**Code:** `buildTraceTechnicalLayer()` · legacy studio `LeaveTraceControl.tsx` · `/field/heat` technical `details` (dev-only target).

---

## 2. Field input

Voice reporting is **primary** on `/field/heat` (and `/`).

Primary CTA: **🎤 Tell us what you see** (intent-matched copy per lang).

Flow:

```
Record → optional transcription → Review → Send
```

Voice preferred. Typing optional.

**Code:** `FieldVoiceReport.tsx` · `HeatFieldClient.tsx` · `ColdStartClient.tsx`.

---

## 3. Navigation

Shallow. After every completed action, only:

- Find nearby help (deployment-specific: e.g. water/shade, not generic “help”)
- Leave another observation

No dead ends. Legacy studio: `/?legacy=1`.

---

## 4. Design

Outdoor / stress use:

- High contrast
- Large typography, touch targets ≥ 44px
- Minimal animation; functional motion only
- Heat urgency: slow breathing on signal (CSS `data-urgency`)

No decorative animation.

---

## 5. Validation

Success = **task completion**, not scroll depth.

```
START → RECORD → SEND → COMPLETE
```

### Cold-start protocol

1. Send **only** `https://www.warszawasza.online/` or `/field/heat`.
2. *„Otwórz stronę i zrób to, co według ciebie ma sens.”*
3. After ~10 s, once: **„Jak myślisz, do czego służy ta strona?”**

**Pass:** help + tell what you see. **Fail:** “strona o Warszawie”, “nie wiem”. → **One change**, retest.

---

## Distribution (what to build when)

**Nie trzy produkty — jeden interfejs, różne kanały (adaptery):**

```
              INTERFEJS RZECZYWISTOŚCI
                      │
     ┌────────────────┼────────────────┐
     │                │                │
   WWW              PWA          Native App
     │                │                │
 link / QR      ikona telefonu   gdy naprawdę potrzebna
```

Struktura 🎤/📍 **ta sama**. Zmienia się tylko **sposób dotarcia**.

| Kanał | Kiedy |
|-------|--------|
| **WWW** | **Teraz** — link → klik, bez instalacji |
| **PWA** | Po teście terenowym — cache, ikona, ten sam kod |
| **Native** | Gdy przeglądarka przestaje wystarczać (offline długo, tło, służby) |

Do **not** build native before the interface is proven on web/PWA.

---

## Code map

| Area | Files |
|------|--------|
| Cold start `/` | `ColdStartClient.tsx`, `HomeEntry.tsx` |
| Field / heat | `HeatFieldClient.tsx`, `FieldVoiceReport.tsx` |
| Trace layers | `observationTrace.ts`, `traceJourney.ts` |
| Copy / langs | `heatFieldI18n.ts`, `coldStartI18n.ts` |
| Studio / L3 dev | `LeaveTraceControl.tsx`, `/?legacy=1` |

## Build check

```bash
cd frontend && npm run build
```
