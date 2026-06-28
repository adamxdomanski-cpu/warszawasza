#!/bin/bash
# Runs COP SQL migrations 001→015 in lexical order on first PostgreSQL boot only.
set -euo pipefail

MIGRATIONS_DIR="/docker-entrypoint-initdb.d/migrations"

if [[ ! -d "$MIGRATIONS_DIR" ]]; then
  echo "No migrations directory mounted at $MIGRATIONS_DIR" >&2
  exit 1
fi

for f in "$MIGRATIONS_DIR"/*.sql; do
  [[ -e "$f" ]] || continue
  echo "Applying $(basename "$f")"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$f"
done

echo "COP migrations complete."
