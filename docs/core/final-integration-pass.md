# WARSZAWASZA · Final integration pass — Chapter 1

**Concrete build list.** No philosophy. Implement gaps only.

Human context: [WARSZAWASZA-jedna-kartka.md](../WARSZAWASZA-jedna-kartka.md).

---

## Current status

| Requirement | Status | Notes |
|-------------|--------|--------|
| Draft autosave (localStorage) | ✅ | `voiceDraft.ts` — cleared on SEND only |
| Draft restore prompt | ✅ | `FieldVoiceReport.tsx` |
| Clear submission screen | ✅ | `CitizenTrace.tsx` — ref, status, saved, email note |
| Safe reset — submit another only | ✅ | No auto-clear after SEND |
| Three layers L1/L2/L3 | ✅ | `CitizenTrace` + collapsed L2/L3 |
| Two primary CTAs on `/` | ✅ | `ColdStartClient.tsx` |
| Email honesty (no auto-send) | ✅ | Explicit copy + optional mailto |
| Field test | ⏳ | Link + two questions |

---

## 1. Draft protection

- Autosave while recording/reviewing → `localStorage`
- On return: *We found an unfinished report. Restore it?*
- Draft removed **only** after successful SEND

## 2. Clear submission state

After SEND:

- ✓ Observation received
- Reference: Trace #…
- Status: awaiting field verification
- Saved on this device
- Email: future version (honest) + optional mailto

## 3. Safe reset

After SEND → **[ Submit another observation ]** only then new form.

## 4. Three layers

- **L1:** status · location · time · next action · delivery clarity
- **L2:** process (collapsed, human language)
- **L3:** technical (collapsed, FOP/JSON nested)

## 5. Validation

Success = task complete + user confidence report was received + time to understanding.

---

## Code map

| Area | Files |
|------|--------|
| Draft | `lib/field/voiceDraft.ts` |
| Voice flow | `FieldVoiceReport.tsx` |
| Confirmation UI | `CitizenTrace.tsx`, `TraceReceiptPanel.tsx` |
| View model | `lib/traceViewModel.ts` |
| Copy | `lib/i18n.ts` (`TRACE_RESIDENT`) |

## Build check

```bash
cd frontend && npm run build
```
