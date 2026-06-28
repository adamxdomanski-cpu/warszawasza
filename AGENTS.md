# AGENTS.md

## Project

**warszawasza** — FIRA Observation Protocol; primary UI in `frontend/` (Next.js), API/engine in `backend/`.

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

## Cursor

- **Always on:** `.cursorrules` + `.cursor/rules/starter.mdc` (minimal)
- **On demand:** `docs/core/cursor-rules-full.json`, `docs/identity/babcia-os-v1.md`
- **By path:** `warszawasza-field.mdc` (frontend), `fira-protocol.mdc` (fira/backend)

Do not load full BABCIA OS stack unless the task requires architecture or methodology review.
