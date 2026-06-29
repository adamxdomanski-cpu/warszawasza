# AGENTS.md

## Język odpowiedzi

**Domyślnie zawsze po polsku.** Użytkownik czyta po polsku; angielski tylko na wyraźną prośbę (np. „odpowiedz po angielsku”). Nie przełączać na EN tylko dlatego, że użytkownik wkleił angielski tekst, cytat lub komunikat UI — to nie jest prośba o zmianę języka agenta.

## Project

**warszawasza** — FIRA Observation Protocol; primary UI in `frontend/` (Next.js), API/engine in `backend/`.

**Pierwsza kartka (każdy nowy człowiek):** [`docs/WARSZAWASZA-w-dwoch-minutach.md`](docs/WARSZAWASZA-w-dwoch-minutach.md)

**COS Core Starter v1.0:** [`docs/core/starter-v0.md`](docs/core/starter-v0.md) · [`.cursorrules`](.cursorrules)

## Dev (from repo root)

```bash
# Backend smoke
source venv/bin/activate  # create with: python3 -m venv venv && pip install fastapi uvicorn pydantic
python3 -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend
cd frontend && npm ci && npm run dev
```

```bash
curl http://127.0.0.1:8000/ping
python3 -m py_compile backend/api/main.py backend/engine/engine.py
cd frontend && npm run build
```

**Cold start (default `/`):** dwa CTA + głos — `ColdStartClient.tsx`; stary UI: `/?legacy=1`.  
**Field / heat:** `/field/heat` — 🎤 Nagraj obserwację + 📍 Znajdź wodę i cień; kontekst w *Więcej kontekstu*.

## Proces zespołu (nie kod)

**Reguła:** nie dodajemy funkcji przed obserwacją z terenu.  
Jedna kartka: [`docs/core/field-first-release.md`](docs/core/field-first-release.md)

Build checklist Rozdziału 1: [`docs/core/final-integration-pass.md`](docs/core/final-integration-pass.md).

## Cursor

| Layer | File | When |
|-------|------|------|
| Principles | `.cursorrules` + `.cursor/rules/core.mdc` | same rules; core.mdc also `alwaysApply` |
| Project | `.cursor/rules/warszawasza.mdc` | globs: `frontend/`, `fira/`, `backend/`, … |
| Depth | `fira-protocol.mdc`, `warszawasza-field.mdc` | narrower globs, on demand |

Historical methodology lives in `docs/` only — not in core rules.
