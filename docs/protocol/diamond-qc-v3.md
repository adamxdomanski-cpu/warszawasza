# Diamond QC v3

| | |
|---|---|
| **Status** | Active |
| **Version** | 3.0 |
| **Owner** | WARSZAWASZA |
| **Scope** | Pull Requests · Release Candidates · Production Deployments |

## Purpose

**Cel (biznesowy):** upewnić się, że **tożsamość produktu nie zależy od aktualnego scenariusza wdrożenia**.

Dopiero potem: build, curl, diff, metadata.

Evidence-first quality gate before production — udowodnij gotowość do kolejnego kroku i wskaż granice wiedzy. Raport QC opisuje **architekturę znaczeń** (produkt · scenariusz · lokalizacja · fakt · prognoza), nie tylko kod.

**Powiązania:** [`diamond-protocol-v1.md`](./diamond-protocol-v1.md) · [`docs/core/product-vs-lab.md`](../core/product-vs-lab.md) · [`filary-i-klucze.md`](./filary-i-klucze.md) · [`frontend/lib/studioAnchor.ts`](../../frontend/lib/studioAnchor.ts) · [`AGENTS.md`](../../AGENTS.md)

---

## Cel promptu

Jesteś głównym inżynierem odpowiedzialnym za jakość projektu WARSZAWASZA.

Twoim zadaniem **NIE** jest rozwijanie projektu.

Twoim zadaniem jest **udowodnić, że produkt jest gotowy do kolejnego kroku** — i **wyraźnie wskazać granice tej wiedzy**.

---

## Aksjomaty

**AXIOM 001** — HTTP 200 potwierdza **dostępność**. Nigdy nie potwierdza **poprawności treści**.

**AXIOM 002** — Build PASS potwierdza **poprawność kompilacji**. Nigdy nie potwierdza **poprawności modelu domenowego**.

**AXIOM 003** — Pewność kończy się tam, gdzie **kończy się pomiar**. (Kanonicznie: [`diamond-protocol-v1.md`](./diamond-protocol-v1.md))

---

## Zasady

1. Nigdy nie zgaduj.

2. Oddzielaj:

   **FAKT** · **HIPOTEZA** · **PROGNOZA** · **NIEZWERYFIKOWANE ZAŁOŻENIE**

3. Nie wyciągaj wniosków z logów HTTP (patrz AXIOM 001).

4. Nie zakładaj stanu produkcji na podstawie kodu.

5. Nie zakładaj stanu kodu na podstawie produkcji.

6. **Dostępność ≠ tożsamość** — produkcja może być PASS (serwuje) i FAIL (metadata / model domenowy) jednocześnie.

---

## Kolejność

1. **DIAGNOZA**
2. **POMIAR**
3. **DOWODY**
4. **WNIOSEK**
5. **DOPIERO POTEM** — propozycja poprawki

---

## Build

Uruchom:

```bash
cd frontend && npm run build
```

Jeżeli build nie przejdzie:

- znajdź **pierwszy** rzeczywisty błąd
- zatrzymaj analizę
- napraw **tylko** ten błąd
- uruchom build ponownie

Nigdy nie naprawiaj wielu rzeczy jednocześnie.

---

## Tożsamość

Zweryfikuj **niezależnie**:

| Warstwa | Znaczenie | Nigdy |
|---------|-----------|--------|
| **ORIGIN** | Miejsce narodzin projektu (Muranów · Dzielna · pracownia) | nie zmienia się |
| **SCENARIO** | Eksperyment (heat, noise, waste, …) | nie w metadata projektu |
| **LOCATION** | Miejsce użytkownika (GPS, reverse geocode) | nie mylić z origin |
| **FIXTURES** | Dane demonstracyjne (POI, mocki, nazwy przykładowe) | nie wpływają na origin |

### Domain Identity Leak

**Nazwa klasy (zachować):** Domain Identity Leak.

**Opis klasy (kanoniczny):** *Scenario leaked into product identity* — scenariusz wszedł na poziom tożsamości produktu.

**Definicja:** warstwa **SCENARIO** (np. heat, copy „Znajdź wodę i cień”) w globalnych metadanych **ORIGIN** (np. `layout.tsx`, Open Graph domyślny).

**Klasa błędu:** semantyczny / model domenowy — nie techniczny. Kod działa, build przechodzi, deploy odpowiada.

**Przykład (instancja, nie definicja):** Mokotów / heat CTA w `<title>` globalnym — jeden przypadek wycieku, nie nazwa błędu.

**Severity typowa:** **Medium** — build działa, użytkownik może korzystać, branding i metadane niespójne.

**Filary i klucze:** ten dokument to **protokół** (warstwa III). Filozofia projektu → [`filary-i-klucze.md`](./filary-i-klucze.md).

---

## Severity

Ocena wpływu — **osobno** od PASS/FAIL w STATUS.

| Poziom | Znaczenie |
|--------|-----------|
| **Critical** | Produkt niedostępny lub utrata danych / bezpieczeństwa |
| **High** | Rdzeń produktu zablokowany; użytkownik nie może wykonać głównej akcji |
| **Medium** | Działa, ale niespójność modelu domenowego, branding, metadata |
| **Low** | Kosmetyka, copy, edge case bez wpływu na rdzeń |
| **Informational** | Obserwacja bez wymogu naprawy przed deploy |

---

## Dowody

Każde twierdzenie oznacz jako: **FAKT** · **HIPOTEZA** · **PROGNOZA** · **NIEZWERYFIKOWANE**

---

## Accessibility

Uruchom **axe** (color-contrast, wcag2aa).

Jeżeli są błędy — napraw **najmniejszą** możliwą zmianą.

```bash
cd frontend
npx @axe-core/cli https://www.warszawasza.online/ --tags wcag2aa,color-contrast --exit
```

Jeżeli axe nie uruchomi się (ChromeDriver, brak sieci) — wpisz **NIEZWERYFIKOWANE**, nie zgaduj.

---

## Produkcja

Nigdy nie zakładaj stanu produkcji. Mierz **dwa wymiary**:

| Wymiar | Pytanie | Dowód |
|--------|---------|--------|
| **Production Availability** | Czy serwis odpowiada? | HTTP status, curl reachability |
| **Production Identity** | Czy metadata / branding = ORIGIN, nie SCENARIO? | curl fragment HTML head |

```bash
# Availability (nie wnioskuj z tego o treści)
curl -sS -o /dev/null -w "%{http_code}" -A "Diamond-QC-v3/1.0" "https://www.warszawasza.online/"

# Identity (osobny pomiar)
curl -sS -A "Diamond-QC-v3/1.0" "https://www.warszawasza.online/" | rg 'title|description|og:title|og:description'
```

Preview deployment — ten sam podział: **Availability** · **Identity**. Brak dostępu → **NIEZWERYFIKOWANE**.

---

## Raport (szablon wyjścia)

### CEL

**Pierwsze zdanie (biznesowe, obowiązkowe):**

> Upewnić się, że tożsamość produktu nie zależy od aktualnego scenariusza wdrożenia.

**Drugie zdanie (kontekst kontroli):** dlaczego wykonano kontrolę teraz (PR · RC · deploy).

Potem dopiero: build, curl, diff, metadata.

---

### STATUS

| Obszar | PASS / FAIL / NIEZWERYFIKOWANE | Etykieta |
|--------|--------------------------------|----------|
| Build | | **FAKT** (log lokalny) |
| TypeScript | | **FAKT** (w ramach build) |
| Accessibility (axe) | | **FAKT** lub **NIEZWERYFIKOWANE** |
| Preview Availability | | **NIEZWERYFIKOWANE** bez URL |
| Preview Identity | | **NIEZWERYFIKOWANE** bez URL |
| **Production Availability** | | **FAKT** (HTTP) |
| **Production Identity** | | **FAKT** (curl metadata) |

> **Rozdzielenie pewności:** Build PASS = **fakt**. HTTP 200 = **fakt**. Produkcja po push = **prognoza**. Preview bez dostępu = **niewiadoma**.

> **Uwaga:** Production Availability PASS + Production Identity FAIL = **brak awarii**, błąd semantyczny. Nie skracaj do jednego „Production FAIL”.

---

### SEVERITY

| Problem | Severity | Uzasadnienie (jedno zdanie) |
|---------|----------|-----------------------------|
| | Critical / High / Medium / Low / Informational | |

---

### CONFIDENCE

| Obszar | 0–100% |
|--------|--------|
| Repo | |
| Build | |
| Origin | |
| Scenario | |
| Location | |
| Preview | |
| Production (Availability) | |
| Production (Identity) | |

Pewność kończy się tam, gdzie zaczyna się deploy (AXIOM 003).

---

### FAKTY

Lista wyłącznie rzeczy potwierdzonych (plik, curl, log z datą).

---

### HIPOTEZY

Lista rzeczy wymagających dalszego sprawdzenia.

---

### PROGNOZY

Wyłącznie przewidywania (przyszłość, deploy po push).

---

### NIEZWERYFIKOWANE

Lista rzeczy, których nie udało się sprawdzić.

---

### NAPRAWY

Minimalna liczba zmian. Nie refaktoryzuj. Nie zmieniaj architektury. Nie dodawaj funkcji.

---

### ROOT CAUSE

Jedno zdanie — po pół roku bezcenne. Opisuj **klasę** błędu, nie pojedynczy przypadek.

Przykład (Domain Identity Leak):

> Scenario leaked into product identity — global metadata inherited scenario copy instead of product identity.

---

### RELEASE DECISION

| Obszar | Status |
|--------|--------|
| Build | ✅ READY / ❌ BLOCKED |
| Architecture | ✅ READY / ⏳ / ❌ |
| Identity | ✅ OK / ⚠️ FIX REQUIRED / ❌ |
| Deployment | ✅ DEPLOYED / ⏳ WAITING FOR PUSH / ❌ |

**GO / NO-GO**

| Decyzja | Warunek |
|---------|---------|
| **GO** | Wszystkie wymagane wiersze ✅; Identity OK na produkcji (curl) |
| **NO-GO** | Identity FIX REQUIRED nie wdrożony · build FAIL · Critical/High open |

Przykład:

> **NO-GO** — until metadata fix is deployed and Production Identity verified by curl.

---

### NASTĘPNY KROK

Podaj **dokładnie jeden**.

---

## Zasada końcowa

```
Dowód > opinia
Pomiar > intuicja
Minimalna zmiana > duży refaktor
Krystaliczna prostota > złożoność
```

---

## Uruchomienie w Cursor

```
@docs/protocol/diamond-qc-v3.md — uruchom Diamond QC v3 przed deployem
```

---

## Przykład (skrót) — Domain Identity Leak · 2026-06-30

### CEL

Upewnić się, że tożsamość produktu nie zależy od aktualnego scenariusza wdrożenia.

### STATUS

| | |
|--------|--|
| Production Availability | **PASS** (HTTP 200) — **FAKT** |
| Production Identity | **FAIL** — **FAKT** (scenario CTA w `<title>` / `og:description`) |

### SEVERITY

| Problem | Severity |
|---------|----------|
| Domain Identity Leak (*Scenario leaked into product identity*) | **Medium** |

**ROOT CAUSE:** Scenario leaked into product identity — global metadata inherited scenario copy instead of product identity.

### RELEASE DECISION

| Build | Architecture | Identity | Deployment |
|-------|--------------|----------|------------|
| ✅ READY | ✅ READY | ⚠️ FIX REQUIRED | ⏳ WAITING FOR PUSH |

**GO / NO-GO:** **NO-GO** — until metadata fix is deployed and Production Identity verified by curl.

**NASTĘPNY KROK:** commit + push fix metadata → curl weryfikujący `OBSERWACJA TRWA` w produkcji.
