# VPS production deploy (Docker + Nginx)

Runs **Next.js** and **PostgreSQL 15** on a single Ubuntu VPS. Host **Nginx** terminates TLS and proxies to the web container on port 3000.

## Prerequisites

- Ubuntu 22.04+ with Docker Engine and Compose plugin
- DNS `A` / `AAAA` for `warszawasza.online` → VPS IP
- Repo cloned on the server (e.g. `/opt/warszawasza`)

## 1. Secrets

```bash
cp infra/.env.example infra/.env
# Edit infra/.env — strong POSTGRES_PASSWORD and FLACON_FORGE_ADMIN_SECRET
chmod 600 infra/.env
```

Generate a password:

```bash
openssl rand -hex 32
```

## 2. Start containers

From repository root:

```bash
docker compose -f infra/docker-compose.prod.yml up -d --build
```

On **first boot**, PostgreSQL applies `backend/sql/001` … `015` via `infra/db/init/00-run-migrations.sh`.  
Re-running compose does **not** re-apply SQL if the `pgdata` volume already exists.

Verify:

```bash
docker compose -f infra/docker-compose.prod.yml ps
curl -sS http://127.0.0.1:3000/market | head
curl -sS http://127.0.0.1:3000/api/sensory/seed
docker exec warszawasza_db psql -U "$POSTGRES_USER" -d warszawasza_prod -c '\dt'
```

Use credentials from `infra/.env` for `psql` (export vars or pass `-U` / `-d` explicitly).

## 3. Nginx + Let's Encrypt

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
sudo cp infra/nginx/warszawasza.conf /etc/nginx/sites-available/warszawasza.conf
sudo ln -sf /etc/nginx/sites-available/warszawasza.conf /etc/nginx/sites-enabled/
sudo certbot --nginx -d warszawasza.online -d www.warszawasza.online
sudo nginx -t && sudo systemctl reload nginx
```

## 4. Updates

```bash
git pull
docker compose -f infra/docker-compose.prod.yml up -d --build
```

New SQL after initial deploy: apply manually with `psql "$DATABASE_URL" -f backend/sql/NNN_*.sql` (see `backend/sql/README.md`).

## Architecture

| Service | Container | Host port |
|---------|-----------|-----------|
| Next.js | `warszawasza_nextjs` | `3000` (configurable via `WEB_HOST_PORT`) |
| PostgreSQL | `warszawasza_db` | internal only |

FastAPI (`backend/api`) is **not** part of this stack; civic drops engine remains optional separately.
