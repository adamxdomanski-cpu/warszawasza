# Trace alert communications v1

**Cel:** mail / SMS / share-card po zapisie śladu obywatelskiego.  
**Zasada:** najpierw obserwacja (Warstwa 1), potem interpretacja. SQL i FOP — za foldem.  
**Tone:** dark editorial · rzemiosło WARSZAWASZA · bez SaaS · bez inwigilacji.

## Dwie linie tożsamości (nie mieszać w jednym zdaniu)

| Warstwa | Co to | Gdzie |
|---------|--------|--------|
| **Rzemiosło** | Odzież, siatki, Zapach WARSZAWASZA, PolakPotrafi | sklepy, Tumblr, konkursy UM |
| **Instrument** | Ślad obywatelski, FOP, warszawasza.online | `/`, `/zapis`, `hello@warszawasza.online` |

Stopka może wspomnieć obie — treść alertu dotyczy **instrumentu**.

---

## Subject (temat maila)

```
◉ WARSZAWASZA · ALERT · Dzielna/Zamenhofa · Ślad #20260627-022029
```

Wariant RESOLVED:

```
◉ WARSZAWASZA · ZAMKNIĘTO · Dzielna/Zamenhofa · trajectory resolved
```

---

## Plain text — szablon OPEN (domyślny)

Skan w ~10 s. Sekcje oddzielone `───`.

```
WARSZAWASZA // TRANSMISJA ŚLADU
Ślad #20260627-022029 · Muranów

─── ALERT (czytaj najpierw) ───
Zdarzenie: rozbite szkło na jezdni / chodniku
Miejsce: skrzyżowanie Dzielnej i Zamenhofa (~180 m od pracowni Dzielna 3A/7)
Status: NIEZWERYFIKOWANA — hipoteza oczekująca weryfikacji terenowej
Co robić: uważaj na opony i pieszych; możesz zostawić potwierdzający ślad na warszawasza.online

─── OBserwacja (Warstwa 1) ───
„W nocy ktoś rzucił butelką. Ta się rozbiła. Szkła leżą na skrzyżowaniu
Dzielnej i Zamenhofa. Uważajcie!”

Czas: 00:03:00 · 52 impulsów uwagi · subject=core-security

─── STATUS OPERACYJNY ───
Trajektoria: OTWARTA (nasłuch sektora trwa)
Potwierdzenie sprzątnięcia: czekamy na drugi węzeł terenowy
Zamknij ślad: nowy meldunek + closesTraceId=20260627-022029

─── TELEMETRIA (dla operatora · opcjonalnie) ───
FOP/0.1 · chain ○●◐◉≈✓■ · ev ■■■■■ · res trajectory open
Kotwica: STUDIO:WAW_DZ3A7 @ 52.24886,20.99241
Pełny artefakt: https://www.warszawasza.online/?trace=<token>

───
Nadajemy ze stołu. Z biurka. Z maty.
warszawasza.online · rzemiosło WARSZAWASZA · Dzielna 3A/7
```

**Czego NIE wkładać do maila obywatelskiego:** surowy `INSERT SQL`, `election_audit_records`, liczba `52` jako `payload_value` (w DB skala 0–5).

---

## Plain text — szablon RESOLVED

```
WARSZAWASZA // ZAMKNIĘCIE ŚLADU
Ślad #20260627-022029 · Muranów

─── ALERT ───
Sektor: Dzielna / Zamenhofa
Status: ZWERYFIKOWANO — tarcie usunięte z pola
Trajektoria: ZAMKNIĘTA (resolved)

─── Fakt Warstwy 0 ───
„Szkło posprzątane — jezdnia i chodnik wolne.”
(potwierdzenie drugiego węzła terenowego)

─── SYSTEM ───
civic_observations → STABLE
FOP → res trajectory resolved

───
Dziękujemy operatorom w polu.
warszawasza.online
```

---

## HTML (opcjonalnie)

- **Tak**, jeśli newsletter / Mailchimp — ale **treść identyczna** jak plain text.
- Kolory: tło `#030303`, tekst `#e8e8e8`, akcent `#E40045` (beetroot), mono dla FOP.
- **Nie** embeduj SQL w `<pre>` w mailu do mieszkańców — link do `/origin` lub share URL wystarczy.
- Jeden przycisk: **„Zobacz ślad”** → `?trace=…`

---

## Licznik odległości w nagłówku

Tylko gdy odbiorca **świadomie** udostępni geolokację (np. w PWA).  
Bez GPS → pokaż stałe: *„~180 m od pracowni (Dzielna 3A/7)”* — bez śledzenia.

---

## Powiązane artefakty repo

- Log operacyjny: `docs/protocol/log-format-v1.md`
- Cykl życia: `docs/protocol/trace-lifecycle-v1.md`
- SQL zamknięcia: `backend/sql/010_incident_resolution.sql`
