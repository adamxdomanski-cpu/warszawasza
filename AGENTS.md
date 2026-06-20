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

Run **both** services for the Next.js UI (same browser port **8000**):

```bash
# Terminal 1 — FastAPI (internal API on 8001)
source venv/bin/activate
python3 -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8001 --reload

# Terminal 2 — Next.js frontend (browser UI on 8000, proxies API to 8001)
cd frontend && npm run dev
```

Legacy embedded UI only (no Next.js): run FastAPI alone on **8000** and open http://127.0.0.1:8000/

- Copy `.env.example` to `.env` and set `MIXPANEL_PROJECT_TOKEN` for analytics (optional; tracking is a no-op when unset).
- There is no `requirements.txt`; dependencies are installed into `venv` via the VM update script (`fastapi`, `uvicorn`, `pydantic`, `mixpanel`, `python-dotenv`).
- Run the server from the **repository root** so `backend.*` imports resolve.

**Smoke checks:**

```bash
curl http://127.0.0.1:8001/ping
curl -X POST http://127.0.0.1:8001/generate \
  -H 'Content-Type: application/json' \
  -d '{"input":"MOJA WARSZAWA"}'
curl http://127.0.0.1:8000/topdrops   # proxied through Next.js to 8001
```

Browser UI: `http://127.0.0.1:8000/` — click **GENERATE TOP DROPS**.

**Connection error -102 / ERR_CONNECTION_REFUSED:** nothing is listening on that port. Use **8000** (Next.js) when both services run, not **3000**. Port 3000 is unused in this repo.

**`127.0.0.1 odrzucił połączenie` w Cursor Cloud:** `127.0.0.1` w Twojej lokalnej przeglądarce to Twój komputer, nie VM agenta. Zrób jedno z poniższych:

1. **Ports / forwarded URL** — w Cursorze przekieruj port **8000** i otwórz wygenerowany adres (np. `https://…-8000.app…`), nie lokalne `127.0.0.1`.
2. **Desktop pane** — otwórz przeglądarkę w VM: http://127.0.0.1:8000/
3. **Lokalnie na swoim PC** — uruchom oba serwisy poniżej; dopiero wtedy `http://127.0.0.1:8000/` zadziała u Ciebie.

Szybki start (oba serwisy):

```bash
# tmux sesja API (8001)
tmux new-session -d -s warszawasza-api -c /workspace \
  'source venv/bin/activate && python3 -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8001 --reload'

# tmux sesja frontend (8000)
tmux new-session -d -s warszawasza-web -c /workspace/frontend 'npm run dev'
```

Tylko backend (prostsze, jeden port **8000**, bez Next.js):

```bash
source venv/bin/activate
python3 -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8000 --reload
```

### Mixpanel analytics

Set `MIXPANEL_PROJECT_TOKEN` in `.env` (project token from Mixpanel → Settings → Access Keys).

**Server events:** `api_ping`, `content_generated`, `top_drops_viewed`, `drop001_viewed`

**Browser events:** page view (auto), `top_drops_clicked`, `top_drops_loaded`

The UI sends `X-Distinct-Id` on API calls so server events can link to the same Mixpanel user.

### Frontend (Next.js on port 8000)

```bash
cd frontend && npm ci
cp .env.example .env
npm run dev
```

Axios client: `frontend/lib/api.ts` — uses `window.location.origin` (port **8000**) and Next.js rewrites proxy API calls to FastAPI on **8001**.

### FIRA Flow (optional)

```bash
python3 fira_flow/warsaw_ofp.py
```

The draft pipeline in `warsaw_ofp.py.save` needs extra packages (`pandas`, `numpy`, `h3`, `pydeck`) and local GTFS data; it is not wired to the backend.

### Lint / tests

- No ESLint, Ruff, or pytest configuration in the repo.
- Basic Python syntax check: `python3 -m py_compile backend/api/main.py backend/engine/engine.py`
- Automated tests are not defined yet.
