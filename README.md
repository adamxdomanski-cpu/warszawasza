# Civic Observation Protocol (COP) v1.0

**FIRA Observation Protocol (FOP)** — apolityczny język obserwacji obywatelskiej.  
Ten repozytorium to **Open Source / Civic Tech**: kod publiczny, audytowalny, bez warstwy komercyjnej.

Pierwsza dystrybucja protokołu: **WARSZAWASZA** → [warszawasza.online](https://www.warszawasza.online)

**Tożsamość operacyjna:** [Miejski Operator](docs/identity/miejski-operator.md) — **operator sygnału miejskiego** (filtr szumu → zapis audytowalny → decyzja człowieka); WARSZAWASZA jako nośnik dystrybucji protokołu.

**Metodologia (STABLE):** [BABCIA OS · FINAL v1.0](docs/identity/babcia-os-v1.md) · [COS v1.0](docs/identity/cos-v1.md) · [Critique Protocol](docs/protocol/critique-protocol-v1.md)

---

## 1. Założenia systemowe

Projekt tworzony na zasadzie **p2p** (ludzie ludziom). System eliminuje szum instytucjonalny i komercyjny.

- Nie zbiera funduszy, nie prowadzi zrzutek ani spekulacji wartością zasobów.
- **Obserwacja trwa** — protokół nie narzuca wniosków; najpierw zapis, potem interpretacja.
- Core (`fira/core/`) nie zna miasta ani polityki; dystrybucja (`frontend/`) jest warstwą wymienną.

Kanoniczna specyfikacja: [`fira/PROTOCOL.md`](fira/PROTOCOL.md)

---

## 2. Status infrastrukturalny (target: konstytucja.pl)

| Pole | Wartość |
|-----------|---------|
| **Typ abonenta** | Osoba fizyczna (potwierdzone przez NASK WHOIS) |
| **Strategia integracji** | Donacja obywatelska / partnerstwo ideowe |
| **Aktualny krok operacyjny** | Nadanie impulsu (Manifestu) przez oficjalny formularz rejestratora |
| **Dystrybucja operacyjna** | [warszawasza.online](https://www.warszawasza.online) — nasłuch bez nowego szumu |

Audyt domeny i werdykt COP: [`fira/FIELD_DOMAIN_konstytucja.md`](fira/FIELD_DOMAIN_konstytucja.md)

Monitor WHOIS (lokalny, bez zależności): `python3 monitor.py [domena]`

---

## 3. Architektura kodu

Wszelkie mechanizmy monitorowania oraz interfejs laboratorium społecznego muszą być **w pełni transparentne i publicznie audytowalne**.

```
fira/core/     — algebra obserwacji (FOP); nie importuje z frontend/
fira/          — spec, notacja, dokumentacja pola
frontend/      — dystrybucja WARSZAWASZA (Next.js → Vercel)
backend/       — engine drops (warstwa produktowa, nie główny UI)
monitor.py     — WHOIS przez subprocess; exit codes pod skrypty
```

### Trasy dystrybucji (frontend)

| Trasa | Rola |
|-------|------|
| `/` | Bramka obserwacji — FALSE / TRUE, wejście w pole |
| `/meta` | Warstwa percepcji (Ray-Ban HUD, uwaga jako interfejs) |
| `/learn` | Notacja i pipeline — jak czytać zapis FOP |
| `/deliberation` | Instrument deliberacji (grafen, notacja audytowalna) |

---

## Uruchomienie (dev)

```bash
cd frontend && npm install && npm run dev
```

Build produkcyjny: `cd frontend && npm run build`

---

*COP v1.0 · The system remembers. Humans decide.*
