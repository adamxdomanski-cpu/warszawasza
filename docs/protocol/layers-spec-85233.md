# Layer 0 validation chain — Spec 85233 (COP v1.0)

**Teoria Warstw 85233 · Warstwa 0 (ŚWIAT)**  
**Cel:** oddzielić cyfrowy szum od faktów terenowych w obywatelskim protokole obserwacji.

## Zasada nadrzędna

Trzy (docelowo pięć) mechanizmy **nie są niezależnymi filtrami**. Tworzą **łańcuch walidacji** — każdy etap odpowiada na inne pytanie. Pojedynczy sygnał nigdy nie jest jedynym źródłem prawdy.

### Podbudowa teoretyczna — geografia ucieleśniona (Mei-Po Kwan)

**Mei-Po Kwan** (geografia feministyczna, krytyka GIS) opisała pułapkę **„God's eye view”** (*the view from nowhere*): klasyczne mapy i systemy GIS prezentują miasto **z góry**, jako obraz **wszechwiedzący i neutralny**, odcięty od **subiektywnego, lokalnego, ucieleśnionego** doświadczenia na chodniku.

W COP ten problem mapuje się bezpośrednio na **„szum krzesłowy”**:

| Perspektywa „oka Boga” | Perspektywa ucieleśniona (Layer 0) |
|------------------------|-------------------------------------|
| Współrzędne z biurka = „fakt” sektora | **L0.1** — operator w promieniu kotwicy (≤ 50 m) |
| Jedna kropka na mapie całego Muranowa | **Miejsce** w narracji: „Dzielna/Zamenhofa”, nie tylko `anchor=` |
| Spójność pakietu FOP = prawda terenowa | **Warstwa 8 (lustro)** — potok ✓ ≠ fakt ✓ |
| 52 impulsy uwagi = wysoki priorytet | **IOE** — zdarzenia sesji, nie gęstość szkła |
| Dashboard „całe miasto” | **Mikro-sektor** — jeden ślad, jeden przechodni, jedno okno czasu |

**Embodied GIS** (Kwan): przestrzeń jest doświadczana **w czasie, w ciele, w ruchu** — nie jako statyczna warstwa rastrowa. Stąd w Spec 85233:

- `motion_consistency` i `time_consistency` w **L0.1** (ścieżka w czasie, nie teleportacja z biurka),
- wymóg **in-app camera** w **L0.2** (ślad powstaje *tam*, nie w galerii),
- **L0.4 consensus** — inne ciała w tym samym sektorze, nie głos zdalny.

COP **nie odrzuca** notacji abstrakcyjnej (FOP, diagram Data City, łańcuch ○●◐◉) — traktuje je jako **Warstwę 2–3 (interpretacja / hipoteza)**, nigdy jako zastępstwo Warstwy 0. Fałszywa neutralność kartograficzna („system zweryfikował”) jest antywzorcem Layer 8.

**Referencje (operator):** Kwan, M.-P. — embodied GIS, feminist geography, critique of masculinist cartography; por. `fira/DECISION_RECORD.md` (mapa jako narzędzie myślenia, nie ilustracja).

```
ŚWIAT (Layer 0)
   │
   ▼
L0.1 Proof of Presence      — czy operator był na miejscu?
   │
   ▼
L0.2 Proof of Observation   — czy istnieje ślad empiryczny zdarzenia?
   │
   ▼
L0.3 Proof of Integrity     — czy ślad nie został sfałszowany (EXIF, hash, czas)?
   │
   ▼
L0.4 Proof of Consensus     — czy inni niezależni węzły potwierdzają?
   │
   ▼
Trust Engine                — reputacja operatora (agregat + log zdarzeń)
   │
   ▼
VERIFIED                    — dystrybucja jako fakt (publiczny sygnał)
```

Nowe zgłoszenie wchodzi jako **UNVERIFIED** (trajektoria otwarta, kwarantanna). Dopiero przejście całego łańcucha (lub reguły czasu z `trace-lifecycle-v1.md`) zmienia status publiczny.

---

## L0.1 — Proof of Presence (priorytet)

**Pytanie:** czy operator rzeczywiście znajduje się w sektorze obserwacji?

### Wymagania operacyjne

| Reguła | Wartość |
|--------|---------|
| Lokalizacja | Wymagana przy zgłoszeniu incydentu terenowego (brak GPS → odrzucenie lub kolejka `PENDING_PRESENCE`) |
| Promień kotwicy | **≤ 50 m** (domyślnie); tolerancja **100 m** tylko przy `presence_score ≥ 0.85` |
| Geofencing | Zgłoszenie z biurka w sektorze A o zdarzeniu w sektorze B → `REJECTED` lub `LOW_PRIORITY` (bez publicznej dystrybucji) |
| Czas | Sygnał GPS / proximity musi być **w chwili zgłoszenia** (± 2 min vs `timestamp` obserwacji) |

### Confidence Score (wielosygnalowy)

Sam GPS nie wystarcza (multipath, metro, canyon effect). System liczy:

```
presence_score =
  0.45 × gps_confidence
+ 0.20 × wifi_proximity
+ 0.15 × bluetooth_beacon
+ 0.10 × motion_consistency
+ 0.10 × time_consistency
```

| Składnik | Źródło | Uwagi |
|----------|--------|-------|
| `gps_confidence` | Geolocation API, accuracy (m) | accuracy > 100 m → cap 0.3 |
| `wifi_proximity` | BSSID fingerprint vs kotwica sektora | opcjonalne; brak → 0 |
| `bluetooth_beacon` | iBeacon / Eddystone w polu | opcjonalne |
| `motion_consistency` | IOE: brak teleportacji w sesji | patrz `fop-ioe-aop.md` |
| `time_consistency` | `timestamp` vs EXIF vs serwer | spójność ±120 s |

**Próg L0.1:** `presence_score ≥ 0.70` **oraz** odległość od `anchor` ≤ 50 m.

Implementacja referencyjna (klient / edge): `frontend/lib/layer0Validation.ts`  
Migracja DB (presence payload): `backend/sql/011_layer0_validation_reputation.sql` → `layer0_validation_records`.

---

## L0.2 — Proof of Observation

**Pytanie:** czy istnieje wiarygodny ślad empiryczny zdarzenia?

- Zgłoszenia o **tarciu terytorialnym** (np. rozbite szkło, zanieczyszczenie) wymagają **zdjęcia wykonanego w aplikacji** (in-app camera), nie wyłącznie tekstu.
- Brak media → status pozostaje `UNVERIFIED`; może trafić do wewnętrznego nasłuchu, **bez** publikacji jako fakt.
- `payload_value` w DB (0–5) odzwierciedla **siłę dowodu**, nie liczbę kliknięć / impulsów uwagi.

---

## L0.3 — Proof of Integrity

**Pytanie:** czy ślad nie został podmieniony lub zreplayowany?

| Kontrola | Akcja przy niepowodzeniu |
|----------|---------------------------|
| EXIF timestamp + GPS vs kotwica | `VALIDATION_FAILED` |
| Zdjęcie z galerii (stary plik) | odrzucenie L0.2/L0.3 |
| Hash pliku vs nonce sesji | odrzucenie + event `EXIF_MANIPULATION` |
| Czas pliku >> czas zgłoszenia | kwarantanna |

**Uwaga:** EXIF da się usunąć lub zmodyfikować — dlatego L0.3 **następuje po** L0.1, nie zastępuje go.

---

## L0.4 — Proof of Consensus

**Pytanie:** czy obserwację potwierdzają inni niezależni operatorzy w tym samym sektorze?

1. Nowe zgłoszenie: **UNVERIFIED**, trajektoria **open** (`trace-lifecycle-v1.md`).
2. **2–3 niezależne węzły** (różne `operator_node_id`, każdy z L0.1 OK w promieniu sektora) muszą:
   - kliknąć „Potwierdzam”, **lub**
   - złożyć raport zbieżny (ten sam `subject`, spójny sektor, okno czasu ≤ 30 min).
3. Dopiero wtedy → **VERIFIED** i publiczna dystrybucja.

Zamknięcie incydentu (RESOLVED) nadal wymaga **faktu Layer 0** — patrz Scenariusz B w `trace-lifecycle-v1.md`.

---

## Trust Engine — reputacja operatora

**Nie** stosujemy natychmiastowego „spalenia węzła” po jednym błędzie. Pojedyncze fałszywe pozytywy mogą wynikać z: pomyłki, złego GPS, sytuacji już usuniętej, błędnej interpretacji, awarii klienta.

### Model punktowy (start: `trust_score = 100`)

| Zdarzenie | Δ trust | `event_type` |
|-----------|---------|--------------|
| Potwierdzone zgłoszenie (konsensus) | +2 | `OBSERVATION_CONFIRMED` |
| Zgłoszenie odrzucone (fałszywy pozytyw) | −5 | `OBSERVATION_REJECTED` |
| Ewidentna fabrykacja treści | −30 | `FABRICATION_DETECTED` |
| Manipulacja EXIF / hash | −60 | `EXIF_MANIPULATION` |
| Powtarzające się nadużycia | eskalacja sankcji | `REPEATED_ABUSE` |

### Sankcje (progi)

| `trust_score` | Działanie |
|---------------|-----------|
| ≥ 70 | normalny tryb |
| 50–69 | ograniczenie priorytetu dystrybucji |
| 30–49 | **blokada czasowa** 24 h (`sanction_level = 1`) |
| < 30 | **blokada czasowa** 7 d |
| < 10 + ≥3× `EXIF_MANIPULATION` / `FABRICATION` | **blokada stała** (`sanction_level = 2`) — decyzja operatora COP |

Ban na poziomie **edge** (rate limit, fingerprint) może uzupełniać DB, ale COP **nie przechowuje** adresów IP ani tożsamości osobowej — tylko pseudonimowy `operator_node_id` (np. `STUDIO:WAW_DZ3A7`).

### Schemat DB

- **`user_reputation_events`** — append-only log (audyt, odtwarzalność).
- **`user_reputation_scores`** — agregat bieżący (`observation_score`, `verification_score`, `false_positive_score`, `response_time_score`, `consensus_score`, `trust_score`).

Migracja: `backend/sql/011_layer0_validation_reputation.sql`.

Funkcja `apply_reputation_event(operator_node_id, event_type, weight, …)` aktualizuje agregat i zapisuje event w jednej transakcji.

---

## Mapowanie na istniejące artefakty

| Artefakt | Rola w łańcuchu L0 |
|----------|-------------------|
| `civic_observations` | Rekord metryki; `status_indicator` + `payload_value` po weryfikacji |
| `layer0_validation_records` | Stan pipeline per obserwacja (presence_score, etapy, media hash) |
| `trace-lifecycle-v1.md` | OPEN / RESOLVED / EXPIRED **po** kwarantannie L0 |
| `traceLifecycle.ts` | Klient: fazy trajektorii |
| `layer0Validation.ts` | Klient: scoring L0.1, progi, typy zdarzeń reputacji |
| Warstwa 8 (lustro) | Build OK ≠ teren VERIFIED; impulsy uwagi ≠ fakt Layer 0 |

---

## Kolejność wdrożenia (rekomendacja)

1. **Spec + SQL 011** (ten dokument + tabele reputacji + `layer0_validation_records`).
2. **L0.1 w kliencie** — geolocation gate przed POST obserwacji terenowej.
3. **L0.2 / L0.3** — in-app camera + EXIF pipeline (backend validator).
4. **L0.4** — UI „Potwierdzam” + zliczanie węzłów sektora.
5. **Trust Engine** — hook na każde przejście etapu + dashboard operatora.

---

## UI — od „oka Boga” do mikro-perspektywy (wytyczne)

Cel: interfejs **nie symuluje** wszechwiedzy. Domyślny operator to **przechodzień w sektorze**, nie dyspozytor całej Warszawy.

| Antywzorzec (God's eye) | Wzorzec COP (embodied) |
|-------------------------|-------------------------|
| Nagłówek „Zweryfikowano” bez warstwy | **`TraceStatusBadge`** — potok vs Warstwa 0 (`traceStatus.ts`) |
| Mapa / pierścień sektora jako „stan miasta” | **`ObservationFieldRenderer`** — geometria pomocnicza; etykieta: *notacja, nie teren* |
| `anchor` bez odległości od operatora | Pokazać **distanceM** + `presence_score` gdy GPS dostępny |
| Agregat impulsów uwagi na pierwszym ekranie | **WARSTWA 1** — surowa narracja obywatelska przed FOP |
| Dystrybucja push całego miasta | Dystrybucja **geofenced** — tylko węzły w promieniu sektora (po L0.4) |

**Kolejność ekranu meldunku (rekomendacja):**

1. Co widzisz na chodniku? (tekst / zdjęcie in-app)  
2. Gdzie jesteś? (GPS gate L0.1)  
3. Potok techniczny (FOP) — zwinięty, opcjonalny  
4. Status dualny — integralność pakietu **≠** fakt terenowy  

Implementacja referencyjna statusu: `frontend/lib/traceStatus.ts`, `frontend/app/components/civic/TraceStatusBadge.tsx`.  
Komunikaty alertów (email / share): `docs/protocol/trace-alert-comms-v1.md` — alert na górze, telemetria poniżej.

---

## Powiązane dokumenty

- `docs/protocol/trace-lifecycle-v1.md` — Scenariusz B, EXPIRED 12 h
- `docs/protocol/trace-alert-comms-v1.md` — hierarchia alertu (obowatel przed telemetrią)
- `docs/protocol/fop-ioe-aop.md` — IOE jako sensor, bez interpretacji w przeglądarce
- `backend/sql/001_cop_init.sql` — `civic_observations`, zero-PII
- `backend/sql/010_incident_resolution.sql` — RESOLVED / audit
