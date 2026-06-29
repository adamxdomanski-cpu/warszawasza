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

**Reguła operacyjna** (chroni przed feature creepem):

> **Jedna obserwacja → jedna decyzja → jeden pomiar.**

Nie: jedna obserwacja → pięć poprawek.

---

## Trzy źródła prawdy (nie mieszaj warstw)

| Źródło prawdy | Odpowiada na pytanie | Przykład |
|---------------|----------------------|----------|
| **Człowiek** | Czy interfejs był zrozumiały? | Cytat testera: „Nie zauważyłem mikrofonu.” |
| **System** | Czy aplikacja działała sprawnie? | INP 211 ms, logi, profiler |
| **Rzeczywistość** | Czy cel został osiągnięty? | Znalazł wodę, wysłał zgłoszenie, schował telefon |

**Nie myl — żadne źródło nie zastępuje pozostałych:**

- Chrome Profiler **nie powie**, czy interfejs jest intuicyjny.  
- Cytat użytkownika **nie powie**, czy `JSON.stringify()` blokuje główny wątek.  
- Oba razem **nie powiedzą**, czy człowiek rzeczywiście rozwiązał swój problem.

Potrzebne są **wszystkie trzy** źródła. Każda obserwacja ma własną kategorię i własny sposób odpowiedzi.

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

Dopiero po kilku takich odpowiedziach decydujemy, czy potrzebna jest kolejna funkcja. Wynik testu → **jeden wiersz** w rejestrze (Typ = Człowiek lub Rzeczywistość — zależnie od tego, co obserwowałeś).

---

## Rejestr wydań — jedna tabela, jeden ślad na zmianę

**Nie** pięć dokumentów na każdą poprawkę. **Tak:** każda zmiana zostawia **dokładnie jeden trwały wpis** w tej tabeli.

| Źródło prawdy (Typ) | Kiedy wpisujesz |
|---------------------|-----------------|
| Człowiek | cytat, test terenowy, zrozumiałość interfejsu |
| System | profiler, INP, logi, awaria techniczna |
| Rzeczywistość | cel osiągnięty / nie — woda, wysyłka, telefon w kieszeni |

**Obserwacja** i **Decyzja** to dwa etapy — nie mieszaj ich w jednej kolumnie:

| Etap | Przykład |
|------|----------|
| Obserwacja | „INP = 211 ms przy L3.” |
| Decyzja | „Lazy mount JSON/FOP.” |

**Nie wpisuj:** „Zoptymalizowano JSON.”  
**Wpisuj:** źródło → obserwacja → decyzja → wynik.

| Release | Typ | Źródło | Obserwacja | Decyzja | Wynik |
|---------|-----|--------|------------|---------|-------|
| 1.0 | Rzeczywistość | — | — | cold start + głos | ⏳ test terenowy po deployu |
| 1.1 | System | Chrome Profiler | INP ~211 ms przy L3 | Lazy render JSON/FOP | ⏳ zmierz po deployu |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu” | Większe CTA głosu | … |

**Przykłady po pomiarze:**

| Release | Typ | Źródło | Obserwacja | Decyzja | Wynik |
|---------|-----|--------|------------|---------|-------|
| 1.1 | System | Chrome Profiler | INP 211 ms przy L3 | Lazy render JSON/FOP | INP ↓ 68 ms |
| 1.2 | Człowiek | 5 testerów terenowych | 3/5 nie widziało 🎤 | Większe CTA | 5/5 zauważyło |
| 1.3 | Rzeczywistość | 8 sesji terenowych | 6/8 wysłało zgłoszenie | — | ✅ cel osiągnięty |

Opis **nie**: „W wersji 1.1 dodaliśmy X.”  
**Tak:** „Chrome Profiler: INP 211 ms przy L3 → decyzja: lazy render → wynik: 68 ms.”

Po deployu (Typ = System): czy klik L3 jest natychmiast odczuwalny? Czy profil pokazuje spadek Input Delay? Jeśli tak — **zamknij temat**, nie poluj na kolejne 10 ms bez nowej obserwacji.

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

**Test jakości procesu (za pół roku):** nowy członek zespołu czyta rejestr wydań i **rozumie, dlaczego każda zmiana została wprowadzona** — bez pytania autorów projektu. Jeśli rejestr to umożliwia, jest nie tylko dokumentacją, lecz **pamięcią projektu**.

---

## COP v1.0 — dwie warstwy reguł (CI)

Walidator (`scripts/cop-validate.sh`) **nie osłabia** konstytucji — **rozdziela** ją:

| Warstwa | Zakres | Emoji / glify |
|---------|--------|----------------|
| **Kod i dokumentacja techniczna** | komponenty, logika, JSX | tylko alfabet FIRA (`symbols.ts`) |
| **UI użytkownika i tłumaczenia** | `frontend/lib/field/*`, `i18n.ts`, meta layout | symbole ze znaczeniem (🎤 📍 w copy terenowym) |

Błąd CI „dekoracyjny szum wizualny” przy emoji w **copy** = wpisz w warstwę i18n albo rozszerz wyjątek świadomie — nie usuwaj reguły dla kodu.

---

PR można **approve** z warunkiem:

**Approved with one condition: do not add any new features before collecting field evidence.**

Powiązane: [`final-integration-pass.md`](final-integration-pass.md) · [`WARSZAWASZA-w-dwoch-minutach.md`](../WARSZAWASZA-w-dwoch-minutach.md)
