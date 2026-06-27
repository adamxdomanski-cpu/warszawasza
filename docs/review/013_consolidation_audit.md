# Recenzja stosu — PR #12 / #13 (2026-06-27)

Audyt **faktycznego** stanu repozytorium. Narracja PROCESS (DEPLOYED, STABLE na produkcji) **nie** zastępuje weryfikacji git/CI.

## Bilans T / F (skrót)

| Stwierdzenie | T / F |
|--------------|-------|
| PR #12 (`consolidation-merge-f727`) scalony z `main` | **F** — otwarty PR |
| PR #13 (`field-trace-224500-f727`) — flacon + ślad 224500 | **T** — branch + PR |
| `013_product_flacon_tokens.sql` w repo | **T** |
| `TraceStatusBadge` w UI | **T** (po tej recenzji) |
| `push_inhibition_service.ts` | **F** — nie wdrożony (brak push infra + enum) |
| `LandingPage` pełny checkout | **F** — minimalny `/market` |
| `npm run build` na branchu #13 | **T** (po stubach UI) |
| PostgreSQL produkcyjny + migracje | **F** — nie weryfikowane z VM |
| Tunel Cursor HTTP:8000 | **T** — po stronie operatora |

## Migracje SQL — numeracja

| Fikcyjna nazwa w sesji | Prawidłowy plik |
|------------------------|-----------------|
| `003_incident_stream.sql` | `010_incident_resolution.sql` |
| `004_incident_resolution.sql` | `010_incident_resolution.sql` |
| `005_critical_trauma.sql` | seed/docs + `011` reputation |
| `006_forced_terrain.sql` | `014_terrain_pulse_srodmiescie.sql` |
| `007_flacon_tokens.sql` | **`013_product_flacon_tokens.sql`** (`007` = referendum) |

## `013_product_flacon_tokens.sql`

**Poprawnie (COP):**

- Brak tabeli `users` — zero PII.
- `associated_operator_node VARCHAR(255)` — pseudonim węzła (`STUDIO:WAW_DZ3A7`), spójny z `user_reputation_scores.operator_node_id` w `011`.
- Flakon = węzeł produktu O2O, **nie** Layer 0 verification.

**Nie stosować:** `FOREIGN KEY … REFERENCES users(id)` — sprzeczne z zero-PII.

## API `/api/market/forge`

**Luka (naprawiona):** publiczny POST umożliwiał masowe mintowanie tokenów.

**Remediacja:**

- Nagłówek `X-Admin-Secret` = `FLACON_FORGE_ADMIN_SECRET` (min. 16 znaków, tylko serwer).
- Terminal pracowni: `curl -X POST … -H "X-Admin-Secret: …"`.
- Klient końcowy: **`POST /api/market/activate`** (serial + token z etykiety).

## Ślady operacyjne

| Ślad | Layer 0 | Uwagi |
|------|---------|--------|
| `#20260627-022029` | OPEN / higiena STABLE bez fizycznego RESOLVED | Muranów, szkło |
| `#20260627-125750` | OPEN / UNVERIFIED | Aleje 92 — **112/999 poza aplikacją** |
| `#20260627-224500` | OPEN / UNVERIFIED | Śródmieście + ping O2O |

UI: „Zweryfikowano” w eksporcie = **potok FOP**, nie fakt terenowy — `traceStatus.ts` / `TraceStatusBadge`.

## Kolejność merge (rekomendacja)

1. **#12** → `main` (010, 011, 012, dual-status)
2. **#13** → po #12 (013, 014, market O2O)
3. Push inhibition — osobny PR po infrastrukturze powiadomień
4. Stripe / checkout — osobny PR

## Weryfikacja lokalna

```bash
cd frontend && npm run build
export FLACON_FORGE_ADMIN_SECRET='studio-dev-secret-min16'
curl -s -X POST http://127.0.0.1:3000/api/market/forge -H "X-Admin-Secret: studio-dev-secret-min16"
curl -s -X POST http://127.0.0.1:3000/api/market/activate \
  -H 'Content-Type: application/json' \
  -d '{"flacon_serial_id":"WAW-2026-AB12","cryptographic_token":"00000000-0000-4000-8000-000000000001"}'
```
