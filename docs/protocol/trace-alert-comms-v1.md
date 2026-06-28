# Trace alert communications v2

**Cel:** mail / SMS / share-card po zapisie śladu lub sygnale produktowym.  
**Tone:** dark editorial · rzemiosło WARSZAWASZA · bez SaaS · bez inwigilacji.  
**Architektura:** [BABCIA OS — CAPABILITIES](../identity/babcia-os-v1.md) · persony: [Tomek → PURPOSE](../personas.md)

---

## Zasada nadrzędna (kolejność poznawcza)

Odbiorca **nie zaczyna od logu**. Zaczyna od **sensu**.

| Kolejność dla człowieka | ❌ Odwrócony porządek (błąd) |
|-------------------------|------------------------------|
| Co się wydarzyło? | Session ID, pipeline, hex |
| Dlaczego to ważne? | Telemetria, 52 impulsy |
| Co proponujemy? | Dopiero potem — „a co to właściwie było?” |
| Jakie są dane? (opcjonalnie) | |

**CZŁOWIEK** czyta narrację. **SYSTEM** trzyma pełny zapis. Nie mieszaj tych światów w jednym akapicie.

```
CZŁOWIEK
──────────────
Co się wydarzyło?
Dlaczego to ważne?
Co proponujemy?

══════════════════════════════

SYSTEM
Pełny log techniczny (za foldem / pod spodem)
```

---

## Rygor epistemiczny (nie przesadzaj)

| Warstwa | Przykład |
|---------|----------|
| **Obserwacja** | W mailu widać sekwencję zdarzeń scroll i metadane sesji. |
| **Hipoteza** | Wygląda na raport techniczny oparty na zachowaniu użytkownika. |
| **Wniosek** | Nie pisz: „to zwykły licznik kliknięć” — **chyba że** pełny audyt systemu to potwierdza. |

Nie wykraczaj poza to, co wynika z **fragmentu danych**, który pokazujesz.

---

## Dwa dokumenty w jednej wiadomości

### 1. Raport dla człowieka (dostaje np. Tomek · PURPOSE)

Skan w ~20 s. Język operacyjny, bez FOP na wierzchu.

```
WARSZAWASZA — Nowa obserwacja
Mokotów · sesja użytkownika

Co zauważyliśmy?

Podczas sesji użytkownik przez ponad 25 minut wracał do podobnych
elementów interfejsu. Zarejestrowaliśmy 32 sygnały uwagi.

Dlaczego to ważne?

To może oznaczać, że w tym miejscu użytkownicy szukają informacji,
których nie znajdują wystarczająco szybko — albo że treść szczególnie
przyciąga uwagę. To hipoteza, nie werdykt.

Co proponujemy?

Dobry kandydat do dalszej obserwacji i rozmowy z użytkownikami.
Jeżeli podobny wzorzec pojawi się u większej liczby osób, może
wskazywać kierunek rozwoju produktu.

Szczegółowe dane techniczne — sekcja SYSTEM poniżej.
```

### 2. Log techniczny (SYSTEM · za foldem)

Dopiero **pod** raportem ludzkim:

```
══════════════════════════════
SYSTEM · log techniczny
══════════════════════════════

Session ID: …
Timeline: …
GPS / kotwica: … (tylko za zgodą · inaczej stały opis miejsca)
Events: scroll, focus, …
Pipeline / FOP: …
Hypothesis tags: …
Artefakt: https://www.warszawasza.online/?trace=<token>
```

**Czego NIE wkładać do sekcji CZŁOWIEK:** surowy SQL, `election_audit_records`, surowe `payload_value` bez kontekstu, identyfikatory w pierwszym akapicie.

---

## Ślad obywatelski (alert terenowy) — ten sam układ

Subject bez zmian:

```
◉ WARSZAWASZA · ALERT · Dzielna/Zamenhofa · Ślad #20260627-022029
```

### CZŁOWIEK (OPEN)

```
WARSZAWASZA — Alert śladu
Muranów · #20260627-022029

Co się wydarzyło?

Na skrzyżowaniu Dzielnej i Zamenhofa zgłoszono rozbite szkło
na jezdni / chodniku (~180 m od pracowni Dzielna 3A/7).

Dlaczego to ważne?

Ryzyko dla opon i pieszych. Status: NIEZWERYFIKOWANE — czekamy
na potwierdzenie w terenie.

Co proponujemy?

Uważaj w sektorze. Możesz zostawić potwierdzający ślad na
warszawasza.online (closesTraceId=20260627-022029 po sprzątnięciu).

Cytat obywatelski (Warstwa 0):
„W nocy ktoś rzucił butelką. Ta się rozbiła. Szkła leżą na
skrzyżowaniu Dzielnej i Zamenhofa. Uważajcie!”
```

### SYSTEM (OPEN)

```
══════════════════════════════
SYSTEM
══════════════════════════════

Czas: 00:03:00 · subject=core-security
Trajektoria: OTWARTA · nasłuch sektora
FOP/0.1 · chain ○●◐◉≈✓■ · res trajectory open
Kotwica: STUDIO:WAW_DZ3A7 @ 52.24886,20.99241
Pełny artefakt: https://www.warszawasza.online/?trace=<token>
```

### RESOLVED — CZŁOWIEK

```
Co się wydarzyło?

Sektor Dzielna / Zamenhofa — tarcie usunięte z pola (drugi węzeł terenowy).

Dlaczego to ważne?

Trajektoria zamknięta. Można uznać sektor za STABLE w polu.

Co proponujemy?

Dziękujemy operatorom w polu. Kolejna obserwacja — tylko jeśli tarcie wróci.
```

### RESOLVED — SYSTEM

```
civic_observations → STABLE
FOP → res trajectory resolved
```

---

## HTML (opcjonalnie)

- Treść **identyczna** jak plain text: blok CZŁOWIEK na górze, SYSTEM w `<details>` / zwiniętym `<pre>`.
- Kolory: tło `#030303`, tekst `#e8e8e8`, akcent `#E40045`.
- Jeden przycisk: **„Zobacz ślad”** → `?trace=…`
- **Nie** embeduj SQL w mailu do mieszkańców.

---

## Licznik odległości

Tylko gdy odbiorca **świadomie** udostępni geolokację.  
Bez GPS → *„~180 m od pracowni (Dzielna 3A/7)”* — bez śledzenia.

---

## Dwie linie tożsamości (stopka)

| Warstwa | Gdzie |
|---------|--------|
| **Rzemiosło** | sklepy, Tumblr, PolakPotrafi |
| **Instrument** | `/`, `/zapis`, `hello@warszawasza.online` |

Treść alertu dotyczy **instrumentu**. Stopka może wspomnieć obie.

---

## Powiązane

- [`log-format-v1.md`](log-format-v1.md)
- [`trace-lifecycle-v1.md`](trace-lifecycle-v1.md)
- [`../identity/babcia-os-v1.md`](../identity/babcia-os-v1.md) — FIELD zwraca nową obserwację do SYSTEM

*v2 · CZŁOWIEK first · SYSTEM below · observation / hypothesis / conclusion*
