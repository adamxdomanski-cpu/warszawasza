#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMUX_BIN="${TMUX_BIN:-tmux}"
TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"
TMUX_CMD=("$TMUX_BIN" -f "$TMUX_CONF")

"${TMUX_CMD[@]}" kill-session -t warszawasza-api 2>/dev/null || true
"${TMUX_CMD[@]}" kill-session -t warszawasza-web 2>/dev/null || true

"${TMUX_CMD[@]}" new-session -d -s warszawasza-api -c "$ROOT" \
  'source venv/bin/activate && python3 -m uvicorn backend.api.main:app --host 0.0.0.0 --port 8001 --reload'

"${TMUX_CMD[@]}" new-session -d -s warszawasza-web -c "$ROOT/frontend" 'npm run dev'

sleep 3
curl -sf http://127.0.0.1:8001/ping >/dev/null && echo "API OK: http://127.0.0.1:8001/ping"
curl -sf http://127.0.0.1:8000/ >/dev/null && echo "UI OK:  http://127.0.0.1:8000/"
