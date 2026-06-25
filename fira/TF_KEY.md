# TF Key — WARSZAWASZA project status

> Format: [`fira/OPERATIONAL_LOG.md`](./OPERATIONAL_LOG.md) · Scenario **A** (main distribution)  
> Snapshot: local `main` @ `50f6bfe` · origin/main aligned · large uncommitted working tree

---

## Scenario A — warszawasza.online (aggregate)

```
PROCESS
──────────────
STATE        ◐ IMPLEMENTED (local) · ○ DEPLOYED (prod unchanged)
SPEC         COP v1.0 · FOP/0.1
TARGET       https://www.warszawasza.online · dystrybucja WARSZAWASZA
NEXT STEP    `t` → `cd frontend && npm run build` → commit → push main

VALIDATION
──────────────
Syntax        ✓ (frontend build gate pending this session)
Flow          ◐ Spec→Code done; Test→Observation awaits operator
Consistency   ✓ względem COP — zgodność ze spec, nie dowód optymalności

OUTPUT
──────────────
Dystrybucja gotowa lokalnie; prod na 50f6bfe do czasu push.
```

---

## Component matrix

| Component | STATE | NEXT STEP |
|-----------|-------|-----------|
| **Obsidian vault** (`WARSZAWASZA`) | OPERATOR_MANAGED | Sync kanon ręcznie po DEPLOYED |
| **Cursor rules** (`.cursor/rules/`) | ◐ IMPLEMENTED | Commit operational-log rule |
| **warszawasza.online / Vercel** | ○ DEPLOYED @ `50f6bfe` | `git push origin main` po build |
| **Frontend** `/` | ◐ IMPLEMENTED | build → push |
| **Branding** `public/logo.png` · OG · favicon | ◐ IMPLEMENTED | — |
| **Frontend** `/meta` | ● DEPLOYED @ `50f6bfe` | — |
| **Frontend** `/learn` | ● DEPLOYED @ `50f6bfe` | — |
| **Frontend** `/deliberation` | ◐ IMPLEMENTED (untracked) | build → push |
| **Frontend** `/electoral-lab` | ◐ IMPLEMENTED (untracked) | build → push |
| **FIRA core** (`fira/core/`) | ● VERIFIED | — |
| **SQL stack** `001`–`009` | ◐ IMPLEMENTED (files) · ○ DRAFT (DB) | `psql "$DATABASE_URL" -f backend/sql/00N_*.sql` |
| **SQL** `008` NGO matrix | ● TEST (pipeline ∩ registry) · ◐ IMPLEMENTED (SQL) | `?ngo-watchdog=1` · apply 008 on DB |
| **SQL** `009` local initiatives | ● TEST (frontend pilot) · ◐ IMPLEMENTED (SQL) | apply 009 · Muranów pilot on `/` |
| **COP validator CI** | ● VERIFIED · legacy FLUX echoes | Optional: migrate workflow to OPERATIONAL_LOG |
| **monitor.py** | ◐ IMPLEMENTED (untracked) | Operator smoke after deploy |
| **electoral_mandate_proof.py** | ● VERIFIED (stdlib) | Run against seeded DB post-migration |
| **Backend API** (`backend/api/main.py`) | ◐ IMPLEMENTED (modified, no DB wire) | Explicit product need + `DATABASE_URL` |

---

## Per-component blocks

### Obsidian vault

```
PROCESS
──────────────
STATE        OPERATOR_MANAGED
SPEC         Kanon FIRA · vault WARSZAWASZA
TARGET       iCloud Obsidian · external
NEXT STEP    Operator sync after DEPLOYED

VALIDATION
──────────────
Syntax        —
Flow          —
Consistency   —

OUTPUT
──────────────
Outside repo; not agent-deployable.
```

### Cursor rules

```
PROCESS
──────────────
STATE        ◐ IMPLEMENTED
SPEC         COP v1.0 · Operational Log Standard
TARGET       .cursor/rules/warszawasza-prompts.mdc
NEXT STEP    commit with fira/OPERATIONAL_LOG.md + TF_KEY.md

VALIDATION
──────────────
Syntax        ✓
Flow          ✓
Consistency   ✓ względem COP

OUTPUT
──────────────
CORE METRIC LOG replaces PROCESSING FLUX in agent status.
```

### Vercel / warszawasza.online

```
PROCESS
──────────────
STATE        ○ DEPLOYED @ 50f6bfe
SPEC         COP v1.0
TARGET       frontend/ · Vercel root
NEXT STEP    push main after local build PASS

VALIDATION
──────────────
Syntax        ✓ (last prod build)
Flow          ✓
Consistency   ✓

OUTPUT
──────────────
Prod lacks deliberation, electoral-lab, SQL stack until push + DB apply.
```

### SQL stack 001–007

```
PROCESS
──────────────
STATE        ● VERIFIED (repo) · ○ DRAFT (production DB)
SPEC         COP v1.0 · backend/sql/README.md
TARGET       PostgreSQL · civic_observations + electoral + referendum
NEXT STEP    psql apply 001→007 on target DATABASE_URL

VALIDATION
──────────────
Syntax        ✓ (idempotent migrations documented)
Flow          ✗ (no DATABASE_URL in deployment today)
Consistency   ✓ względem COP — zero-PII, not PKW authority

OUTPUT
──────────────
Schema ready; backend/api/main.py not wired.
```

### COP validator CI

```
PROCESS
──────────────
STATE        ● VERIFIED
SPEC         COP v1.0
TARGET       .github/workflows/cop-validator.yml · scripts/cop-validate.sh
NEXT STEP    optional: replace PROCESSING FLUX echoes in workflow

VALIDATION
──────────────
Syntax        ✓
Flow          ✓ (PR gate)
Consistency   ✗ (report format still legacy FLUX)

OUTPUT
──────────────
Scanner active; operator report format pending migration.
```

---

## Uncommitted inventory (operator)

| Area | Files |
|------|-------|
| SQL | `backend/sql/001`–`007` + README |
| Frontend routes | `/deliberation`, `/electoral-lab`, GrapheneVote |
| FIRA docs | `fira/electoral/*`, STATE_DATA_MATRIX, COP_ARCHIVE_JSON, OPERATIONAL_LOG |
| Scripts | `monitor.py`, `electoral_mandate_proof.py`, health checks |
| Backend | `backend/api/main.py` (modified) |

---

## Related

- [`fira/OPERATIONAL_LOG.md`](./OPERATIONAL_LOG.md) — block template
- [`fira/LOCAL_INITIATIVE_MODEL.md`](./LOCAL_INITIATIVE_MODEL.md) — courtyard pivot · local initiatives
- [`fira/PROTOCOL.md`](./PROTOCOL.md) — FOP spec
- [`backend/sql/README.md`](../backend/sql/README.md) — migration order
