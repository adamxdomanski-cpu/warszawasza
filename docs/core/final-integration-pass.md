# WARSZAWASZA — Final Integration Pass

Single integration task for Cursor. Describes **what to build**, not project philosophy.

---

## Reality interface (primary)

Implement the next iteration of WARSZAWASZA as a **reality interface**.

### GOAL

Reduce the energy required to understand the city and leave an observation.

### 1. THREE AUDIENCE LAYERS

Split the observation export into three progressive layers.

**LEVEL 1 — Citizen (default)**

Visible immediately. Show only:

- ✓ Observation received
- Verification status
- Primary action buttons
- Relevant links

Nothing else. Default clipboard and mailto use this layer only.

**LEVEL 2 — Journey**

Collapsed by default. Title: `▼ How was this observation processed?` (PL: `▼ Jak przebiegało zgłoszenie?`)

Human-readable trajectory, e.g.:

```
START
↓
Location selected
↓
Confirmation
↓
Sent
↓
Completed
```

No internal codes.

**LEVEL 3 — Technical**

Collapsed by default. Developer artifacts only: trace, pipeline, FOP, telemetry, hypotheses, debug.

Never mix this layer with citizen-facing content. Hypotheses never appear in Level 1.

**Code:** `frontend/lib/observationTrace.ts`, `frontend/lib/traceJourney.ts`, `LeaveTraceControl.tsx`

### 2. FIELD INPUT

Add voice reporting as a **primary** interaction on `/field/heat`. Place it next to the map.

Primary CTA: **🎤 Tell us what you see** / **🎤 Powiedz, co widzisz**

Flow: Record → optional transcription → Review → Send

Voice is preferred; typing remains optional.

**Code:** `frontend/app/components/field/FieldVoiceReport.tsx`, `HeatFieldClient.tsx`

Trace path on success: `START → RECORD → SEND → COMPLETE`

### 3. NAVIGATION

Shallow navigation. After every completed action, two choices only:

- Find nearby help → `/field/heat`
- Leave another observation → `/`

Avoid dead ends.

### 4. DESIGN

Outdoor conditions: high contrast, large typography, minimal animation, functional motion only. Heat indicators may use slow breathing animation. No decorative animation.

### 5. VALIDATION

Success = task completion, not scroll depth.

Example completion path: START → RECORD → SEND → COMPLETE

Implement the **smallest possible working version**.

---

## Build pass (secondary)

When features above are done, finish without changing philosophy:

```bash
cd frontend
npm install
npm run build
```

Optional hygiene (only if scripts exist): lint, typecheck, remove unused imports.

**Do not** rewrite working code. **Do not** invent features beyond this document.

### Output when done

```markdown
## Summary
- Files modified
- Problems fixed
- Remaining issues (if any)

## Validation
✅ Build
```

---

## Persona reference (context only)

**Miejski Operator** — creator and analyst of the city; Warsaw as a system of rhythms, structures, and dependencies. Communicates clearly, avoids jargon, designs for low information entropy. Not a rule for the agent — context for copy and UX decisions.

---

## Key URLs

| Action | URL |
|--------|-----|
| Field / heat | https://www.warszawasza.online/field/heat |
| Leave observation | https://www.warszawasza.online/ |

Closing line: *Tak wygląda moja Warszawa. A Wasza?*
