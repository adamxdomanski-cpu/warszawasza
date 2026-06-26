# Log Format DRAFT v1.0 — Handbook (COP / WARSZAWASZA)

> **Log nie służy do opowiadania historii. Log służy do rejestrowania obserwowalnego stanu procesu.**

**Status:** DRAFT v1.0 — five-field template for COP / WARSZAWASZA. Read time target: **~10–15 s**. Structure is stable for now; revise only after dozens of real test entries, not on aesthetic grounds.

---

## Dlaczego ten log wygląda właśnie tak?

Za pół roku otwierasz projekt od nowa. Masz kilka sekund i cztery pytania:

- **Co robiliśmy?**
- **Na jakim etapie jesteśmy?**
- **Co powstało?**
- **Co dalej?**

Ten format istnieje po to, żeby na nie odpowiedzieć — **nie po to, żeby wyglądał profesjonalnie.**

### Pola — ludzkim językiem

| Pole | Co tu wpisujesz |
|------|-----------------|
| **PROCESS** | Co dzieje się z projektem — aktualny stan operacji. Nie dlaczego, nie ocena. |
| **VALIDATION** | Tylko to, co udało się sprawdzić. Nie zgadujemy. Jeśli nie wiemy — nie dopisujemy historii. |
| **OUTPUT** | Jedno krótkie zdanie wyniku. Bez ozdobników, bez marketingu. |
| **NEXT STEP** | Jeden wymagany krok **systemu** — co system robi dalej (np. `Awaiting operator decision.`). **Nie** menu operatora. |
| **ARTIFACT** | Ślad pracy: plik, kod, dokument. Brak śladu? **`N/A`** — to OK. |

### Jedno pytanie na sekcję (semantyka pól)

Każde pole odpowiada na **jedno** pytanie. Nie mieszaj ról.

| Sekcja | Pytanie | Co wpisać | Czego unikać |
|--------|---------|-----------|--------------|
| **PROCESS** | Co robi system / LUCY? | Stan operacji: `● IDLE`, sesja, trwająca komenda | Menu wyboru, lista opcji operatora |
| **VALIDATION** | Co zweryfikowano? | Obserwowalne checki: kolejka, kontekst, exit code | Oceny, prognozy, „wszystko OK” |
| **OUTPUT** | Jaki jest wynik? | Jedna linia: `Listening.` / `System ready.` | Narracja, wall of text |
| **NEXT STEP** | Co system robi dalej? | Akcja systemowa: `Awaiting operator decision.` | Numeryczne menu (`01 Commit`, `02 DR-003`) |
| **ARTIFACT** | Jaki jest ślad? | Ścieżka repo lub **`N/A`** | Puste pole, `None`, `—` |

**AVAILABLE TARGETS** (opcjonalny blok towarzyszący — patrz niżej) odpowiada na inne pytanie: *jakie opcje ma operator?* To **nie** jest pole pięciopolowego LOG.

### Najważniejsza zasada

Log **nie przekonuje** — **pomaga w pracy**. Ma być zrozumiały dziś, za pół roku i dla nowej osoby. Cel: **~10 s czytania** bez ponownego parsowania kontekstu.

### Nasza zasada

**Najpierw fakt. Potem analiza. Na końcu decyzja.** — oddzielenie obserwacji od interpretacji.

---

## Trzy poziomy dokumentacji

Projekt rozdziela trzy warstwy zapisu. **Nie mieszaj ich w jednym bloku.**

| Poziom | Nazwa | Cel |
|--------|-------|-----|
| 1 | **LOG** | Tylko obserwowalne fakty: PROCESS, VALIDATION, OUTPUT, NEXT STEP, ARTIFACT — **nigdy więcej** w zamrożonym bloku |
| 1b | **AVAILABLE TARGETS** | Opcjonalny blok towarzyszący — tylko IDLE / awaiting; menu operatora, **osobno** od NEXT STEP |
| 2 | **DECISION** | Decision Record / ADR-lite — odpowiada na pytanie *dlaczego wybraliśmy to?* To **nie** jest log. |
| 3 | **CODE** | Implementacja |

**Przepływ pracy:** Decision → Log → Code

1. **DECISION** — zapisujesz wybór i uzasadnienie (osobny blok lub plik `fira/DECISION_RECORD.md`).
2. **LOG** — rejestrujesz co się stało i co widać (pięć pól, bez ocen).
3. **CODE** — wdrażasz w repo.

> **DECISION zastępuje COMMENTARY.** Wcześniejsze sekcje `## Commentary` / nagłówek **COMMENTARY** → używaj **`DECISION`**. Log pozostaje zamrożony na pięciu polach.

Stan obecny specyfikacji określa się jako **wersję roboczą DRAFT v1.0**, która podlega dalszej ewolucji na podstawie danych z testów. Reguły Cursor i ten handbook **ograniczają niespójność nazewnictwa** — nie gwarantują braku dryfu koncepcyjnego.

---

## Cztery pytania (decompression)

Before writing a log block, answer these four questions. Each maps to a template field:

| Pytanie | Field | Co wpisać |
|---------|-------|-----------|
| **Co się dzieje?** | **PROCESS** | Operation that ran — command, route, session, deploy step |
| **Skąd wiemy, że to prawda?** | **VALIDATION** | Observable checks — exit codes, row counts, chain state, build output |
| **Co się zmieniło?** | **VALIDATION** (delta) | Observable delta since last known state — `before → after`, `0 → 38 rows`, `DRAFT → IMPLEMENTED` |
| **Co jest wynikiem?** | **OUTPUT** | One-line result — not narrative, not evaluation |

**NEXT STEP** and **ARTIFACT** are mandatory companions — not questions, but closure:

| Field | Role |
|-------|------|
| **NEXT STEP** | Single **system-level** next action — not an operator menu |
| **ARTIFACT** | Concrete repo path when applicable; **`N/A`** otherwise |

Question 3 (delta) lives inside **VALIDATION** when a prior state exists. If nothing changed observably, omit delta lines — do not invent change.

**NEXT STEP ≠ operator menu.** When listing numbered choices for the operator, use the optional **AVAILABLE TARGETS** companion block — never merge targets into NEXT STEP.

---

## Frozen LOG structure (DRAFT v1.0)

Poziom **LOG** — pięć pól, stała kolejność. **Nie zmieniaj** bez podbicia wersji.

| Field | Role |
|-------|------|
| **PROCESS** | Operation that ran |
| **VALIDATION** | Observable system state (not success declaration) |
| **OUTPUT** | Result |
| **NEXT STEP** | Required **system** next action |
| **ARTIFACT** | File path when applicable |

Do not add fields, rename sections, or merge VALIDATION into OUTPUT without a version bump. The frozen five-field LOG structure is unchanged for operational entries. **AVAILABLE TARGETS** is an optional companion block for IDLE / awaiting states only — not a sixth LOG field. This template is **not final** — evolve it from real test entries, not from narrative preference.

---

## Block template

```
PROCESS
──────────────
<operation that ran>

VALIDATION
──────────────
<observable system state — one line per check>
<optional: delta lines — before → after>

OUTPUT
──────────────
<result>

NEXT STEP
──────────────
<single required next action>

ARTIFACT
──────────────
<concrete path or N/A>
```

### Optional companion: AVAILABLE TARGETS (IDLE / awaiting only)

Use when the system is idle and the operator must pick a direction. **Separate block** — never inside NEXT STEP.

```
AVAILABLE TARGETS
──────────────
01  <option label>
02  <option label>
03  <option label>
04  Custom Target
```

**Rule:** AVAILABLE TARGETS = human choices (operator menu). NEXT STEP = what the system does next (e.g. `Awaiting operator decision.`). Do not merge operator menu into NEXT STEP.

---

## Language consistency (within one log block)

Pick **one** language per LOG block — **EN** or **PL** — and use it for all five fields and optional AVAILABLE TARGETS lines. Do not mix (e.g. `Nasłuch aktywny.` in OUTPUT alongside English VALIDATION lines).

**DECISION** prose may remain PL (or any language) — it is a separate block, not part of the LOG.

---

## COP normative rule

> **Log block = observable state only.**

No interpretations, forecasts, evaluations, or metaphors inside PROCESS / VALIDATION / OUTPUT / NEXT STEP / ARTIFACT.

| Good | Bad |
|------|-----|
| `Input Queue ✓ EMPTY` | `City is calm.` |
| `Build ✓ Verified` | `Everything looks great.` |
| `exit 0` (in ARTIFACT / expand-on-demand only) | `Build exit code 0` in VALIDATION (too technical for cognitive layer) |
| `psql: 008 applied, 42 rows` | `Migration succeeded beautifully.` |
| `STATE DRAFT → IMPLEMENTED` | `We made good progress.` |

VALIDATION records **what can be seen or measured** — not whether the operator is satisfied.

---

## Filtr interfejsu poznawczego (LUCY)

LUCY idle log to **interfejs poznawczy operatora**, nie terminal ani dashboard. Każda linia musi przejść filtr sygnał/szum zanim trafi do UI lub bloku LOG.

**Konstytucja UI (motion, kod, commit gate):** [`docs/protocol/lucy-cognitive-interface.md`](./lucy-cognitive-interface.md) · DR-005

### Kryterium kanoniczne

> Po każdej jednostce informacji: czy operator wie **więcej o sytuacji** niż przed chwilą? **Tak = sygnał.** **Nie = szum** — nawet jeśli linia wygląda elegancko.

Dwa filtry pomocnicze (stosuj oba):

| Filtr | Pytanie |
|-------|---------|
| **(a) Akcja** | Czy to zmienia moją następną akcję? |
| **(b) Sytuacja** | Czy wiem więcej o sytuacji niż przed chwilą? |

Jeśli oba = nie → nie dodawaj linii. Pułapka estetyki terminalowej: wygląda głęboko, ale jest dekoracyjna, gdy nie zmienia decyzji operatora.

### Poziomy abstrakcji (nie mieszaj w jednej linii)

Mieszanie stanu systemu, stanu procesu, exit code builda i menu operatora w jednym widoku = **dwa poziomy naraz**. Rozdziel je:

| Poziom | Warstwa | Przykład | Gdzie |
|--------|---------|----------|-------|
| **1 — LOG facts** | Obserwowalny fakt | `Input Queue ✓ EMPTY` | VALIDATION |
| **2 — cognitive summary** | Zwięzły sens dla operatora | `Build ✓ Verified` | VALIDATION |
| **3 — technical detail** | Dowód / ślad techniczny | `exit 0` · `frontend/.next/BUILD_ID` | ARTIFACT lub expand-on-demand |

**AVAILABLE TARGETS** (DR-003) = poziom operatora — osobny blok, nie pole LOG. **NEXT STEP** = postawa systemu, nie czasowniki wykonawcze.

### NEXT STEP — system nie wykonuje

System **nie wykonuje** następnego kroku za operatora. W IDLE:

- Dobrze: `Awaiting operator decision.`
- Źle: `Commit changes.` · `Run build.` · `01 Commit + Push` (to menu, nie NEXT STEP)

Operator pozostaje decydentem — język **„awaiting”**, nie **„executing”**.

### Build w warstwie poznawczej

| Warstwa | Forma | Kiedy |
|---------|-------|-------|
| **VALIDATION (cognitive)** | `Build ✓ Verified` | Domyślnie w IDLE / summary |
| **ARTIFACT / detail** | `exit 0` · ścieżka BUILD_ID | Gdy operator potrzebuje dowodu technicznego |

`exit 0` w VALIDATION jest zbyt techniczne dla warstwy poznawczej LUCY — preferuj `Build ✓ Verified`; surowy exit code przenieś do ARTIFACT lub sekcji expand-on-demand.

### Delta w VALIDATION (IDLE)

Interfejs poznawczy korzysta ze **zmiany od ostatniego cyklu**. Gdy istnieje prior state — dodaj linie delta w VALIDATION:

```
delta                  Build unverified → Build ✓ Verified
delta                  Input Queue 1 → EMPTY
```

Gdy nic się obserwowalnie nie zmieniło — pomiń delta; nie wymyślaj zmiany.

### Intencja projektowa (nie ocena)

Te cechy są **zapisane jako intencja**, nie jako pochwała:

- Krótki, spójny rytm języka w bloku
- Brak spinnerów, toastów, popupów
- Operator = decydent (`awaiting`, nie `executing`)
- Rozszerzalne bloki (LOG + AVAILABLE TARGETS + detail)
- Własny idiom — nie dashboard, nie IDE, nie Unix, nie Grafana

---

## DECISION block (ADR-lite)

Poziom **DECISION** — osobny blok lub wpis w [`fira/DECISION_RECORD.md`](../../fira/DECISION_RECORD.md). **Nie wklejaj** uzasadnień do pól LOG.

```
DECISION
──────────────
Decision: <co wybrano>
Reason: <dlaczego — krótko, bez marketingu>
```

Przykład:

```
DECISION
──────────────
Decision: LayerControl replaces Mixer.
Reason: Simpler terminology. Consistent with current architecture. No implementation need for multi-channel mixer.
```

| Dozwolone w DECISION | Niedozwolone w DECISION |
|----------------------|-------------------------|
| Wybór architektoniczny, scope, ścieżki plików | Oceny bez mierzalnego stanu (`perfect`, `crystallized`) |
| Etykiety wersji (`DRAFT v1.0`) | `guaranteed`, `frozen forever`, metafora zamiast faktu |
| Odwołanie do testów / exit code jako dowód decyzji | Powtórzenie całego LOG w prozie |

### Sformułowania po przeglądzie

Zamiast ocen typu *„Krytyka merytoryczna została zaaplikowana”* używaj:

- *„Uwagi z przeglądu zostały uwzględnione.”*
- *„Wnioski z przeglądu zostały wprowadzone do bieżącej wersji specyfikacji.”*

Te zdania należą do **DECISION** lub narracji operatora — **nie** do VALIDATION ani OUTPUT w bloku LOG.

---

## Rules

### ARTIFACT

- Use **`N/A`** when no artifact applies.
- Use a **concrete repo path** when one does (e.g. `frontend/app/components/DecisionPipeline.tsx`).
- **Never** `None`, `null`, `—`, or empty.

### Strengths

- **Process separated from result** — PROCESS ≠ OUTPUT.
- **VALIDATION = state, not success** — checks describe condition; they do not declare victory.
- **Delta in VALIDATION** — change is observable fact, not story.
- **NEXT STEP mandatory** — every entry ends with one **system-level** step; operator menus go in **AVAILABLE TARGETS**.
- **~10–15 s read** — no narrative, no glyph progress bars, no mixed FLUX strings.
- **Fixed field set** — same five fields, same order, every entry.
- **One language per block** — EN or PL throughout LOG (+ AVAILABLE TARGETS if present); no mixing.

### Scope

Universal. Use for:

- build / CI gates
- SQL deploy and migration apply
- field observation sessions
- VCU operator cycles
- WARSZAWASZA iteration and deploy

### Validation plan

Use this structure **consistently for weeks**. Revisit the template only after **dozens of real test entries** — not after one awkward log line or doc polish.

---

## Examples

### IDLE baseline (operator awaiting · EN)

Canonical companion-block example when the system is listening and the operator must decide. **NEXT STEP** states system posture; **AVAILABLE TARGETS** lists human choices.

```
PROCESS
──────────────
STATE        ● IDLE
SESSION      Awaiting operator input

VALIDATION
──────────────
Input Queue  ✓ EMPTY
Context      ✓ AVAILABLE
Build        ✓ Verified
             (LayerControl → pipelineEngine.ts)

OUTPUT
──────────────
Listening.

NEXT STEP
──────────────
Awaiting operator decision.

ARTIFACT
──────────────
N/A
```

With operator menu (optional companion — **not** merged into NEXT STEP):

```
AVAILABLE TARGETS
──────────────
01  Commit + Push
02  DR-003 LUCY
03  LucyAttention / Micro-Life
04  Custom Target
```

### Frontend build

```
PROCESS
──────────────
cd frontend && npm run build

VALIDATION
──────────────
Exit code       0
TypeScript      ✓ no errors
Routes compiled 12

OUTPUT
──────────────
Production bundle ready in .next/

NEXT STEP
──────────────
git push origin main

ARTIFACT
──────────────
frontend/.next/BUILD_ID
```

### SQL deploy (with delta)

```
PROCESS
──────────────
psql "$DATABASE_URL" -f backend/sql/008_civic_organizations.sql

VALIDATION
──────────────
psql exit code         0
civic_organizations    38 rows
delta                  table absent → 38 rows inserted

OUTPUT
──────────────
008 applied on target DB

NEXT STEP
──────────────
?ngo-watchdog=1 smoke on prod

ARTIFACT
──────────────
N/A
```

### Field observation

```
PROCESS
──────────────
Observation Gate → LivingInterface · place=Muranów

VALIDATION
──────────────
chain           ○●◐◉≈✓■
hypothesis      73%
trace buffer    0 → 1 entry
delta           pipeline stage 6 → 7 (OUTPUT)

OUTPUT
──────────────
Pipeline reached OUTPUT stage

NEXT STEP
──────────────
LeaveTraceControl · copy FOP block

ARTIFACT
──────────────
frontend/lib/pipelineEngine.ts
```

### Project status (legacy STATE variant)

For multi-component status matrices, the STATE/SPEC/TARGET sub-fields inside PROCESS remain valid. See [`fira/OPERATIONAL_LOG.md`](../../fira/OPERATIONAL_LOG.md).

---

## Related

- LUCY cognitive interface constitution: [`docs/protocol/lucy-cognitive-interface.md`](./lucy-cognitive-interface.md) · DR-005
- Quick reference (repo): [`fira/LOG_FORMAT_v1.0.md`](../../fira/LOG_FORMAT_v1.0.md)
- Decision records: [`fira/DECISION_RECORD.md`](../../fira/DECISION_RECORD.md)
- Project status blocks: [`fira/TF_KEY.md`](../../fira/TF_KEY.md)
- Legacy STATE variant: [`fira/OPERATIONAL_LOG.md`](../../fira/OPERATIONAL_LOG.md)
- FOP observation notation: [`fira/PROTOCOL.md`](../../fira/PROTOCOL.md)
- Cursor agent rigor: [`.cursor/rules/warszawasza-prompts.mdc`](../../.cursor/rules/warszawasza-prompts.mdc)
