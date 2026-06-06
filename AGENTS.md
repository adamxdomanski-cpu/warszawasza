# AGENTS.md

## Project overview

`warszawasza` is a small monorepo with three related products:

| Product | Location | Runnable today? |
|---------|----------|-----------------|
| **Warszawasza Engine** | `backend/` | Yes — FastAPI API + embedded HTML UI at `/` |
| **FIRA Field Phase Engine** | `fira_flow/warsaw_ofp.py` | Yes — stdlib-only CLI script |
| **FIRA Flow V3** | `fira_flow/deck_map.html` | Partial — static map artifact; pipeline in `warsaw_ofp.py.save` needs GTFS + scientific Python deps |

The `frontend/` directory has a `package.json` with Next.js/React dependencies but **no application source** (`app/`, `pages/`, etc.), so `npm run dev` is not available yet.

There is no `requirements.txt`, `docker-compose`, database, or CI configuration in the repo.

## Cursor Cloud specific instructions

### Python PATH

`pip3 install --user` installs `uvicorn` to `~/.local/bin`. Ensure it is on `PATH` before starting the backend:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

### Running the Warszawasza backend

From the repo root, set `PYTHONPATH` so the `backend` package resolves (there are no `__init__.py` files):

```bash
export PATH="$HOME/.local/bin:$PATH"
cd /workspace
PYTHONPATH=/workspace uvicorn backend.api.main:app --host 0.0.0.0 --port 8000 --reload
```

Key endpoints:

- `GET /ping` — health check
- `GET /topdrops` — ranked drop ideas
- `POST /generate` — body `{"input": "..."}` 
- `GET /` — embedded HTML UI with a "GENERATE TOP DROPS" button

### FIRA Field Phase Engine (CLI)

No extra dependencies:

```bash
python3 fira_flow/warsaw_ofp.py
```

### FIRA Flow map (static)

Open `fira_flow/deck_map.html` in a browser. It loads deck.gl and Carto basemaps from CDNs, so network access is required for full rendering.

### Frontend

`cd frontend && npm install` installs declared deps. There is no `dev` script or app entry point yet.

### Lint / tests

No linter configuration or automated test suite is defined in this repository.
