# AGENTS.md

## Project overview

**warszawasza** is a small monorepo with:

- **Backend (primary):** FastAPI app (`backend/api/main.py`) serving the Warszawasza content engine API and a minimal HTML UI at `/`.
- **Frontend (scaffold):** `frontend/package.json` lists Next.js/React dependencies only; there is no app source yet.
- **FIRA Flow (optional):** Standalone scripts in `fira_flow/` (phase classifier, static deck.gl map).

## Cursor Cloud specific instructions

### System prerequisites

Fresh Ubuntu VMs need the Python venv module before creating `/workspace/venv`:

```bash
sudo apt-get install -y python3.12-venv
```

### Backend (required for E2E)

From repo root:

```bash
source venv/bin/activate
python3 -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8000 --reload
```

- No `.env` or secrets are required.
- There is no `requirements.txt`; dependencies are installed into `venv` via the VM update script (`fastapi`, `uvicorn`, `pydantic`).
- Run the server from the **repository root** so `backend.*` imports resolve.

**Smoke checks:**

```bash
curl http://127.0.0.1:8000/ping
curl -X POST http://127.0.0.1:8000/generate \
  -H 'Content-Type: application/json' \
  -d '{"input":"MOJA WARSZAWA"}'
curl http://127.0.0.1:8000/topdrops
```

Browser UI: `http://127.0.0.1:8000/` — click **GENERATE TOP DROPS**.

### Frontend (optional, not runnable as an app)

```bash
cd frontend && npm ci
```

`npm test` exits with an error by design (`no test specified`). There are no `dev`/`build` scripts until a Next.js app is added.

### FIRA Flow (optional)

```bash
python3 fira_flow/warsaw_ofp.py
```

The draft pipeline in `warsaw_ofp.py.save` needs extra packages (`pandas`, `numpy`, `h3`, `pydeck`) and local GTFS data; it is not wired to the backend.

### Lint / tests

- No ESLint, Ruff, or pytest configuration in the repo.
- Basic Python syntax check: `python3 -m py_compile backend/api/main.py backend/engine/engine.py`
- Automated tests are not defined yet.
