# WARSZAWASZA · Reguła procesu: dowody z pola przed nowymi funkcjami

**To nie jest reguła kodu.** To sposób podejmowania decyzji w zespole.

> **Nie dodajemy nowych funkcji przed zebraniem dowodów z pola.**

To nie ogranicza kreatywności — wymusza kolejność: najpierw obserwacja rzeczywistości, potem zmiana produktu.

Cykl zgodny z FIRA:

**Rzeczywistość → Obserwacja → Kod → Rzeczywistość**

> **Jeżeli dowody z pola przeczą naszym założeniom, zmieniamy założenia — nie próbujemy wyjaśniać danych.**

To brzmi prosto, ale jest trudne w praktyce: zespół łatwo zakochuje się w swoich rozwiązaniach. Ta zasada przypomina, że pierwszeństwo ma **rzeczywistość**, nie narracja o produkcie.

Rdzeń sposobu pracy (jedno zdanie):

**Wypuść małą zmianę. Obserwuj bez uprzedzeń. Popraw tylko to, co rzeczywistość rzeczywiście pokazała.**

---

## Cykl wydania

| Etap | Co robimy? | Czego nie robimy? |
|------|------------|-------------------|
| **Release** | Wypuszczamy zmianę | Nie projektujemy kolejnych funkcji |
| **Obserwacja** | Patrzymy, jak korzystają ludzi | Nie tłumaczymy zachowań teoriami |
| **Analiza** | Zbieramy cytaty i przebieg zadań | Nie zgadujemy intencji |
| **Decyzja** | Wybieramy **jedną** poprawkę o największym wpływie | Nie robimy pięciu zmian naraz |
| **Kolejny release** | Powtarzamy cykl | Nie omijamy etapu obserwacji |

---

## Release 1.0 (Rozdział 1) — zakres zamknięty

- 🎤 Nagraj obserwację  
- 📍 Znajdź wodę i cień  
- prosty ekran potwierdzenia  
- trzy warstwy informacji (L1 na wierzchu)  
- odporność na STT, GPS, awarię mikrofonu  
- brak duplikatów przy „Wyślij”  

**Stop.** Bez sync offline, bez skracania flow, bez backendu wysyłki — dopóki nie ma cytatów z terenu.

`localStorage` na pierwszym etapie jest rozsądny; **rozbudowanej synchronizacji offline nie budujemy**, dopóki nie wiadomo, czy ludzie w ogóle zgłaszają bez internetu.

---

## Jedyny wskaźnik po deployu

Nie: liczba zgłoszeń, nagrań, czas na stronie.

Tak: **tabela zachowań** (5–10 osób spoza zespołu — nie programistów, nie projektantów):

| Tester | Czy zauważył 🎤? | Czy wysłał zgłoszenie? | Czy wiedział, co zrobić? |
|--------|------------------|------------------------|---------------------------|
| …      | ✅ / ❌          | ✅ / ❌ (tekst?)       | ✅ / ⚠️ / ❌              |

Po kilku wierszach widać wzorzec. Release 1.1 wynika z tabeli, nie z burzy mózgów.

Zapisuj **dosłowne cytaty**, np.:

- „Nie wiedziałem, że można nagrywać.”
- „Kliknąłem wodę od razu.”
- „Nie zauważyłem mikrofonu.”

---

## Pytania na test terenowy

**Nie pytaj:**

- „Czy Ci się podoba?”
- „Co byś dodał?”

To zachęca do projektowania zamiast opisu doświadczenia.

**Pytaj o to, co się wydarzyło:**

1. Co było **pierwszą rzeczą**, którą zauważyłeś?
2. Co zrobiłeś **jako pierwsze**?
3. Czy był moment, w którym **nie wiedziałeś, co zrobić dalej**?

Dopiero po kilku takich odpowiedziach decydujemy, czy potrzebna jest kolejna funkcja.

---

## Rejestr wydań (jedna tabela, wypełniana po każdym cyklu)

Nie osobny dokument — **ta sama tabela**, uzupełniana po obserwacji. Po roku: historia **dowodów**, nie implementacji.

**Nie wpisuj:** „Zoptymalizowano JSON.”  
**Wpisuj:** obserwacja → zmiana → wynik pomiaru.

### Zachowanie użytkownika (test terenowy)

| Release | Liczba testerów | Najczęstszy cytat | Jedna poprawka | Status |
|---------|-----------------|-------------------|----------------|--------|
| 1.0 | — | — | — | ⏳ oczekuje testu terenowego po deployu |
| 1.1 | … | … | … | … |

### Wydajność / INP (gdy profil wskaże problem)

| Release | Obserwacja | Zmiana | Wynik |
|---------|------------|--------|-------|
| 1.1 | INP ~211 ms przy rozwijaniu L3 | Lazy render JSON/FOP | ⏳ zmierz po deployu (INP ↓ do … ms) |

Po deployu: **dwa pytania** — czy klik „Dane techniczne” jest natychmiast odczuwalne? Czy profil pokazuje spadek Input Delay? Jeśli tak → **zamknij temat**, nie szukaj kolejnych 10 ms.

Cykl: **jedna obserwacja → jedna poprawka → jeden pomiar.**

**Przykład wpisu behawioralnego** (format docelowy):

| Release | Liczba testerów | Najczęstszy cytat | Jedna poprawka | Status |
|---------|-----------------|-------------------|----------------|--------|
| 1.0 | 8 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA głosu | ✅ |

Opis decyzji **nie**:

> „W wersji 1.1 dodaliśmy X.”

**Tak:**

> „Po ośmiu testach terenowych użytkownicy nie zauważali mikrofonu, więc zmieniliśmy pierwszy ekran.”

---

## Bezpiecznik zespołu (nie reguła AI)

**Każda iteracja powinna być mniejsza od poprzedniej.**

| Faza | Skala zmiany |
|------|----------------|
| Początek | całe ekrany |
| Potem | pojedyncze sekcje |
| Potem | jeden przycisk |
| Potem | jedno słowo |

Przykład dojrzałości: Release 1.6 może sprowadzić się do zmiany „Nagraj obserwację” → „Nagraj” — bo testy pokażą, że kontekst i tak jest zrozumiały.

Pytanie przy każdej decyzji zmienia się z:

> „Jaki mamy pomysł?”

na:

> „Co pokazała rzeczywistość?”

---

## Kryterium projektowe: telefon do kieszeni

Nie mierzymy głównie kliknięć, czasu na stronie ani zaangażowania. **Sukces = człowiek jak najszybciej przestaje potrzebować aplikacji** — zadanie wykonane, decyzja podjęta, telefon wraca do kieszeni.

Intuicja z kartki testowej stała się kryterium mierzalnym. Pilnuj tego przy każdym release.

Powiązane: [`WARSZAWASZA-jedna-kartka.md`](../WARSZAWASZA-jedna-kartka.md) · [`WARSZAWASZA-w-dwoch-minutach.md`](../WARSZAWASZA-w-dwoch-minutach.md)

---

## Kropka (Rozdział 1)

Od tego momentu największą wartością nie jest kolejny commit, lecz **pierwsze wiarygodne dane z terenu**. Rozdział 2 zaczyna się dopiero po nich — nie od pomysłów przy biurku.

**Zdanie zamykające Rozdział 1** (sposób pracy, nie opis kodu):

> **Nie rozwijamy produktu przez dodawanie funkcji. Rozwijamy go przez skracanie drogi między rzeczywistością a działaniem.**

Za pół roku: otwórz rejestr wydań. Jeśli każda zmiana rzeczywiście skróciła tę drogę — projekt zachował kierunek.

---

PR można **approve** z warunkiem:

**Approved with one condition: do not add any new features before collecting field evidence.**

Powiązane: [`final-integration-pass.md`](final-integration-pass.md) · [`WARSZAWASZA-w-dwoch-minutach.md`](../WARSZAWASZA-w-dwoch-minutach.md)
