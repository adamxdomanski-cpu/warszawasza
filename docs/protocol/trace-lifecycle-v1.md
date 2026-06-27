# Trace lifecycle v1 — Scenariusz B (zamknięcie śladu)

**Ślad referencyjny:** `#20260627-022029`  
**Sektor:** Muranów · skrzyżowanie Dzielnej / Zamenhofa  
**Subject:** `core-security`  
**Stan wejściowy:** `ALTERED` · `res trajectory open` · `traceDecision=false`

## Zasada

System **nie zamyka** trajektorii sam. Przejście wymaga faktu z **Warstwy 0** (świat) lub **reguły czasu** (EXPIRED).

| Operacja | Warunek (Layer 0) | `status_indicator` | FOP `res` |
|----------|-------------------|----------------------|-----------|
| **03 OPEN** | Domyślnie; szkło nadal może leżeć | `ALTERED` | `trajectory open` |
| **01 RESOLVED** | Drugi węzeł `CHANNEL_A_CITIZEN`: fizyczne usunięcie tarcia (szkło) | `STABLE` | `trajectory resolved` |
| **02 EXPIRED** | Brak potwierdzenia przez **12 h**; brak nowych impulsów sektora | `DISCONNECTED` | `trajectory expired` |

Implementacja reguł: `frontend/lib/traceLifecycle.ts`

## 01 RESOLVED — co musi zrobić drugi operator

1. Wejść w pole obserwacji (ten sam sektor: Dzielna / Zamenhofa lub Muranów).
2. Zostawić **nowy** ślad z treścią warstwy obserwacji, np.  
   *„Szkło na skrzyżowaniu posprzątane — jezdni i chodnik wolne.”*
3. `subject=core-security` (lub spójny follow-up).
4. `traceDecision=true` na meldunku zamykającym (weryfikacja faktu, nie trajektoria F/T z bramki).
5. W metadanych / notatce operatora: **`closesTraceId=20260627-022029`**.

Wtedy wpis pierwotnego incydentu w `civic_observations` (gdy DB jest podłączona) → **`STABLE`**.

## 02 EXPIRED — kiedy bez sprzątania w systemie

- Minęło **12 godzin** od `@2026-06-27T00:20:29.250Z`.
- Brak drugiego meldunku RESOLVED.
- Brak eskalacji uwagi na tym sektorze.

Wpis → **`DISCONNECTED`** (szum tła / naturalne wygaszenie), nie sukces civic action.

## Mapowanie DB (COP v1.0)

Tabela: `civic_observations` (`backend/sql/001_cop_init.sql`).  
**Nie ma** osobnego `003_incident_stream.sql` w repo — incydent obywatelski to wiersz w `civic_observations`:

```sql
-- Zamknięcie RESOLVED (po Layer 0 fact)
UPDATE civic_observations
SET status_indicator = 'STABLE'
WHERE observation_id = '<uuid-mapowany-z-śladu>';

-- Wygaszenie EXPIRED (job / reguła czasu)
UPDATE civic_observations
SET status_indicator = 'DISCONNECTED'
WHERE observation_id = '<uuid-mapowany-z-śladu>';
```

`payload_value` (0–5) pozostaje wagą impulsów uwagi z momentu zapisu (np. 52 → ev █████ w FOP).

## Co jest obserwacją vs hipotezą

| Obserwacja (potwierdzone) | Hipoteza (do weryfikacji) |
|---------------------------|----------------------------|
| Artefakt 3-warstwowy wygenerowany w przeglądarce | Wpis już trwa w PostgreSQL prod |
| `subject=core-security`, 52 impulsy, anchor studio | `003_incident_stream.sql` jako plik migracji |
| Trajektoria **OPEN** w FOP | RESOLVED/EXPIRED bez Twojej decyzji teraz |

## Decyzja operatora (matryca)

- **01** — tylko jeśli **fizycznie** potwierdzisz sprzątnięcie (lub masz drugi meldunek).
- **02** — po 12 h bez domknięcia (cron / ręczne wygaszenie).
- **03** — **domyślnie teraz** (szkło może nadal leżeć; nasłuch trwa).
