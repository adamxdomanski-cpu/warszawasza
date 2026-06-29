# WARSZAWASZA · Integration Pass · Cold Start Validation

**Goal:** Prepare the smallest possible product state for a real cold-start test.  
**Do not** redesign, add concepts, or new architecture.

Everything supports one question:

> Can a person who has never seen WARSZAWASZA understand what to do within 10 seconds?

---

## 1. Cold start

Visitor knows nothing: no WARSZAWASZA, FOP, civic-tech, Warsaw, prior discussions.  
The interface must explain itself.

## 2. Primary actions (above the fold)

Only two primary actions visible first:

- 📍 Find help nearby
- 🎤 Tell us what you see

Everything else is secondary (collapsed or below).

## 3. Voice first

Preferred field flow:

`START → Record → (optional transcription) → Review → Send → ✓ Report received → two choices`

Typing remains secondary.

## 4. Three audience layers

| Layer | Default | Content |
|-------|---------|---------|
| Citizen | visible | received, verification, next actions |
| Journey | collapsed | human steps only |
| Technical | collapsed | trace, FOP, telemetry, hypotheses |

Never expose technical details by default.

## 5. Navigation

`/` and `/field/heat` share the same interaction model.  
After every completed task, only:

- Find help nearby
- Leave another observation

Legacy studio UI: `/?legacy=1`

## 6. Validation metric

Optimise **task completion** only — not scroll depth, pause, or click count.

`START → VOICE → SEND → COMPLETE`

## 7. Cold start test protocol

1. Send **only the link** (e.g. `https://www.warszawasza.online/` or `/field/heat`).
2. One instruction: *„Otwórz stronę i zrób to, co według Ciebie ma sens.”*
3. After ~10 seconds, **one question:**  
   **„Jak myślisz, do czego służy ta strona?”**

**Pass** (architecture works):

- „Mogę znaleźć pomoc.”
- „Mogę zgłosić / powiedzieć, co widzę.”
- „Do zgłaszania i szukania informacji.”

**Fail** (first screen, not tester):

- „Strona o Warszawie…”
- „Nie wiem.”
- „Jakiś projekt?”

→ Change **one thing**, test again. Reality decides.

**Hypothesis under test:** Do two primary actions suffice to explain WARSZAWASZA?  
(not whether a specific label is perfect)

---

## Code map

| Area | Files |
|------|--------|
| Cold start `/` | `ColdStartClient.tsx`, `HomeEntry.tsx` |
| Field / heat | `HeatFieldClient.tsx`, `FieldVoiceReport.tsx` |
| Trace layers | `observationTrace.ts`, `traceJourney.ts` |
| Copy / langs | `heatFieldI18n.ts`, `coldStartI18n.ts` |

## Build check

```bash
cd frontend && npm run build
```

---

## Cursor task (copy-paste)

```
@docs/core/final-integration-pass.md
Prepare WARSZAWASZA for cold-start validation. Smallest diff only.
Do not redesign. One hypothesis: two actions above the fold + voice-first completion.
```
