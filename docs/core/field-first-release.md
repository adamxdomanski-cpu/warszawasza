# WARSZAWASZA · Proces terenowy

**To nie jest reguła kodu.** Sposób podejmowania decyzji — na jednej kartce.

> **Nie dodajemy funkcji przed obserwacją z terenu.**

**Dziennik wiedzy** — *co zaobserwowaliśmy?* · *jaką podjęliśmy decyzję?* · *czy zadziałała?* · *jaki ma to trwały wpływ?* (commit odpowiada tylko na „co zmieniliśmy?”).

**Cykl hipotezy:** Obserwacja → Hipoteza → Decyzja → Pomiar → Wynik → **Wpływ** *(Wpływ ≠ Zasada — patrz trzy poziomy poniżej)*.

### Trzy poziomy (nie mylić)

| Poziom | Zakres | Przykład |
|--------|--------|----------|
| **1. Hipoteza** | Jedna zmiana, jeden test | „Komunikat GPS jest zbyt techniczny.” |
| **2. Wpływ** | Co zostaje w produkcie po ✅/◐ | „Stosujemy język użytkownika zamiast języka systemowego.” |
| **3. Zasada** | Wniosek z **wielu** niezależnych obserwacji | Dopiero gdy ten sam wzorzec powtórzy się w kilku testach |

> **Nie twórz Zasad 002, 003… zbyt szybko.** Każda potwierdzona hipoteza to Wpływ, nie nowa Zasada. Inaczej za kilka miesięcy masz kilkadziesiąt „Zasad” z lokalnych decyzji.

Przy każdym **Wpływie** dopisz **Dowód** (skąd wiemy):

```
Dowód: Retest #2 · Test #7 (Oluś) · Test #11 · Test #14
```

Po roku widać, że wniosek nie jest opinią autora, tylko wynikiem wielu obserwacji.

### Metryka hipotez

> Aktualizuj po każdym zamkniętym wpisie (Retest #N). Nie ścigamy się na procenty — chodzi o to, jak często intuicje znajdują potwierdzenie w terenie.

| | Liczba |
|---|--------|
| ✅ Potwierdzone | 0 |
| ◐ Częściowo | 0 |
| ❌ Odrzucone | 0 |
| ⏳ Oczekuje | 5 |

**Skuteczność zmian:** — *(brak zamkniętych hipotez; wzór: ✅ ÷ (✅ + ◐ + ❌))*

```
┌───────────────────────────────────────────────┐
│            PROCES WARSZAWASZA                   │
├───────────────────────────────────────────────┤
│                                               │
│ 1. Co się wydarzyło?                          │
│ 2. Skąd to wiemy?                             │
│ 3. Co zmieniamy?                              │
│ 4. Czy pomiar potwierdził poprawę? (Wynik)    │
│ 5. Co zostaje w produkcie? (Wpływ — ✅/◐)      │
│                                               │
├───────────────────────────────────────────────┤
│ Obserwacja → Hipoteza → Decyzja              │
│        ↓                                      │
│ Pomiar → Wynik → Wpływ → (Zasada — rzadko)    │
└───────────────────────────────────────────────┘
```

**Typ** w rejestrze: Człowiek · System · Rzeczywistość.  
**Obserwacja ≠ decyzja** — najpierw: *co naprawdę wiemy?*

---

## Rejestr wydań

Jeden wpis na zmianę.

> **Wiersz jest zamknięty dopiero wtedy, gdy kolumna „Pomiar” zawiera wynik z rzeczywistego użycia, a nie przewidywany efekt zmiany.**

W rozszerzonych wpisach (np. Retest #N) każda hipoteza dostaje kolumnę **Wynik**:

| Wynik | Znaczenie |
|-------|-----------|
| ⏳ Oczekuje | Decyzja wdrożona; pomiar terenowy jeszcze nie wykonany |
| ✅ Potwierdzono | Hipoteza zweryfikowana pozytywnie w terenie |
| ◐ Częściowo potwierdzono | Efekt widoczny, ale nie w pełni lub z zastrzeżeniami |
| ❌ Odrzucono | Brak oczekiwanego efektu — wracamy do obserwacji |

**Wpływ** — tylko gdy Wynik to ✅ lub ◐. Jedno zdanie: co zostaje w produkcie (komunikaty, przepływ, proces). **Dowód:** lista testów / retestów.

| Wynik | Przykład wpływu | Dowód (przykład) |
|-------|-----------------|------------------|
| ✅ | „Format ‚🎤 Nagranie (Xs)’ — stosować wszędzie przy samym audio.” | Retest #2 |
| ◐ | „Nie wracać do komunikatów o planowanych funkcjach.” | Retest #2 · Test #7 |
| ❌ | *(puste — wracamy do obserwacji)* | — |

**Filtr PR (Zasada 001):** Czy zmiana wynika z obserwacji terenowej? Czy mamy dowód realnego problemu? Czy potrafimy zmierzyć efekt? Jeśli „nie” — zmiana czeka.

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.0 | Rzeczywistość | Adam, teren | Pierwszy ślad wysłany (ID `20260630-174909`); brak GPS; komunikaty techniczne | Ekran startowy + głos — przepływ działa bez kategorii, FOP w UI, dodatkowych ekranów | ✅ wysyłka bez tarcia; komunikaty wymagają poprawy (→ 1.3) |
| 1.1 | System | Chrome Profiler | INP = 211 ms | Opóźnione renderowanie JSON/FOP | ⏳ zmierz po wdrożeniu |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć przycisk 🎤 | … |
| 1.3 | Rzeczywistość | Adam, teren | Cztery źródła tarcia na ekranie potwierdzenia (GPS, audio, duplikat, obietnica e-mail) | Wyłącznie poprawki tekstów warstwy L1 — PR #26 | ⏳ retest terenowy po wdrożeniu |
| 1.4 | Rzeczywistość | Panel rodzinny, Parczew / okolice | Pilot: Oluś, Maja, rodzice, dziadkowie — prawdziwe obserwacje z okolicy | Scenariusz w arkuszu; bez nowych funkcji | ⏳ 5–10 testów |

**Zamknięte wiersze (przykład):**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.1 | System | Chrome Profiler | INP = 211 ms | Opóźnione renderowanie JSON/FOP | INP: 211 → 63 ms |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć przycisk 🎤 | 5/5 testerów zauważyło 🎤 |

❌ *powinno być szybciej* · ✅ *INP: 211 → 63 ms*

---

## Rozdział 1 — zamknięty (produkt i proces)

Kod gotowy. **Proces nie jest dalej projektowany** — rejestr rośnie wyłącznie z obserwacji terenowych.

Sprzężenie zwrotne:

**Rzeczywistość → Obserwacja → Decyzja → Pomiar → Wynik → Wpływ → Rzeczywistość**

Pytanie projektu (nie procesu): **Czy to pomaga człowiekowi podjąć lepszą decyzję?**

Archiwum szczegółów: [`field-first-release-appendix.md`](field-first-release-appendix.md) · lista kontrolna: [`final-integration-pass.md`](final-integration-pass.md)

---

## Zasada 001

Każda nowa funkcja musi wynikać z obserwacji terenowej.

Nie dodajemy funkcji wyłącznie dlatego, że wydają się przydatne.

**Potwierdzenie z pierwszego testu (Release 1.0):** pierwszy prawdziwy użytkownik przeszedł cały proces bez kategorii, klasyfikacji, silnika reguł, FOP w interfejsie ani dodatkowych ekranów. Najprostszy możliwy przepływ działa w praktyce — to punkt odniesienia: najpierw ślady z terenu, potem rozbudowa tam, gdzie pojawia się potrzeba.

**Przykład Zasady 002** *(nie tworzyć od razu — dopiero po wielu testach)*:

> Komunikaty opisują **stan obecny** produktu.  
> Nigdy nie opisują funkcji planowanych.

Taka zasada wynika z wielu obserwacji (np. obietnica e-mailu, „w kolejnej wersji”), nie z jednego PR.

---

## Retest #2 — ekran potwierdzenia

**Data:** 2026-06-30

**Release:** 1.3 · **PR:** [#26](https://github.com/adamxdomanski-cpu/warszawasza/pull/26)

### Obserwacja

Pierwszy terenowy ślad ujawnił cztery źródła niepotrzebnego tarcia:

1. techniczny komunikat o GPS,
2. placeholder nagrania audio,
3. powtarzające się potwierdzenie wysłania,
4. komunikat opisujący przyszłą funkcję zamiast obecnego stanu.

### Decyzja

Wprowadzono wyłącznie poprawki tekstów interfejsu.

Nie dodano nowych funkcji.
Nie zmieniono architektury.
Nie zmieniono przebiegu zgłoszenia.

### Zmiany

- „Miejsce nieznane (bez GPS)”
  → „📍 Lokalizacja nie została dołączona.”

- „[nagranie głosowe]”
  → „🎤 Nagranie (8 s)”
  lub
  → „🎤 Nagranie gotowe”

- usunięto zduplikowane potwierdzenie wysłania

- usunięto komunikat o przyszłej wersji
  → „Zgłoszenie zostało zapisane na tym urządzeniu.”

### Hipoteza

Mniejsza liczba komunikatów technicznych zmniejszy tarcie
bez wpływu na skuteczność wysyłania zgłoszeń.

### Wynik hipotez

| Obserwacja | Decyzja | Hipoteza | Wynik | Wpływ | Dowód |
|------------|---------|----------|-------|-------|-------|
| Komunikat GPS zbyt techniczny | Zmieniono tekst lokalizacji | Mniejsze tarcie przy braku GPS | ⏳ Oczekuje | — | — |
| Placeholder „[nagranie głosowe]” | Etykieta nagrania z czasem trwania | Użytkownik rozumie, co wysłał | ⏳ Oczekuje | — | — |
| Powtórzone potwierdzenie wysłania | Jeden ekran potwierdzenia | Mniej szumu informacyjnego | ⏳ Oczekuje | — | — |
| Obietnica e-mailu w przyszłości | Komunikat o zapisie na urządzeniu | Jasny stan obecny | ⏳ Oczekuje | — | — |
| **Łącznie** | **PR #26 — warstwa L1** | **Tarcie ↓, wysyłka bez zmian** | **⏳ Oczekuje** | — | — |

Po retescie: uzupełnij Wynik, **Wpływ** i **Dowód** (np. `Retest #2`).

**Przykład po zamknięciu retestu** *(Wpływ, nie nowa Zasada)*:

| Obserwacja | Wynik | Wpływ | Dowód |
|------------|-------|-------|-------|
| Komunikat GPS był techniczny | ✅ | Standard tekstów L1 — język użytkownika | Retest #2 |
| Placeholder nagrania był niejasny | ✅ | Format „🎤 Nagranie (Xs)” w całym systemie | Retest #2 |
| Komunikat o e-mailu | ◐ | Nie wracać do komunikatów o planowanych funkcjach | Retest #2 |

Po retescie zaktualizuj wiersz **1.3** w tabeli rejestru i metrykę hipotez u góry dokumentu.

### Pomiar

Do wykonania po wdrożeniu:

- [ ] ślad bez GPS
- [ ] ślad tylko audio
- [ ] ślad z długim opisem
- [ ] brak poziomego przewijania
- [ ] użytkownik rozumie zakończenie zgłoszenia bez dodatkowych wyjaśnień

**Status:** ⏳ oczekuje na retest terenowy

---

## Test #7 (Oluś) — szkic obserwacji

**Data:** *(uzupełnij)* · **Profil:** dziecko · **Źródło:** rozmowa przy teście strony

### Obserwacja (fakty)

- Tester rozumie **model użycia**: można zgłosić drzewa, rower, sytuację przy szkole (*„ktoś zabrał rower”*), grę na boisku — i że inni mogliby coś widzieć.
- Obserwator (**Adam**) sprawdzał **skrzynkę e-mail**, czy „coś przyszło” po wysłaniu zgłoszenia.
- Tester mylił etykietę języka: *„UK is EN. UK is Ukraine.”* — przycisk **UK** w pasku języków wyglądał jak angielski (Wielka Brytania), a chodzi o **ukraiński**.
- Zachęcono do testowania: *„Only I will get it, I will see it”* (tylko obserwator zobaczy zgłoszenie).

### Cytaty / modele mentalne *(„A czego się spodziewałeś?” — do uzupełnienia przy kolejnym teście)*

- Use case rower: zostawiasz szkołę, nie ma roweru → nagranie / opis → aplikacja szuka świadków.
- Use case boisko: ktoś gra w piłkę → może wyjść na to, że chłopcy będą wołać, żeby grać.

### Hipoteza *(nie decyzja — pojedynczy test)*

| # | Hipoteza |
|---|----------|
| H1 | Tester **oczekuje automatycznego e-maila** do obserwatora po wysłaniu; produkt zapisuje ślad **na urządzeniu** (+ opcjonalnie „Otwórz e-mail”). |
| H2 | Kod **UK** w pasku języków myli z angielskim (Wielka Brytania). |

### Wpływ / decyzja

| # | Wynik | Wpływ | Dowód |
|---|-------|-------|-------|
| H2 | *(po wdrożeniu)* | W pasku języków ukraiński jako **UA**, nie UK | Test #7 — zmiana w `LangNav` |
| H1 | ⏳ | — | Powtórzyć u ≥2 testerów; nie obiecywać e-maila bez backendu |

**Decyzja produktowa:** H1 — **brak** (jeden test, możliwa rozbieżność w wyjaśnieniu oralnym vs aplikacja). H2 — **etykieta UA** (drobna poprawka z terenu).

---

## Fakty vs interpretacja (testy spoza zespołu)

Pierwszy użytkownik spoza zespołu (np. dziecko, osoba starsza) to **inny rodzaj danych** niż własne testy. Zapisuj najpierw fakt, potem — dopiero jeśli trzeba — hipotezę i decyzję.

**Arkusz do wydruku / notatek:** [`field-observation-sheet.md`](field-observation-sheet.md)

**Szablon notatki terenowej (po teście):**

| Pole | Przykład |
|------|----------|
| **Obserwacja (fakt)** | Oluś przez ~5 s szukał sposobu rozpoczęcia nagrywania; nie pytał o pomoc. |
| **Hipoteza** | Przycisk nagrywania niewystarczająco widoczny na ekranie startowym. |
| **Decyzja** | *(pusta do czasu powtórzenia u ≥2 osób lub retestu)* |

Obserwacja = to, co widać na nagraniu / w czasie. Hipoteza = interpretacja. Decyzja = dopiero po wzorcu, nie po jednym zdarzeniu.

---

## Etap po Retest #2 — panel 5–10 osób

Po scaleniu PR #26 i retescie **nie budujemy od razu nowych funkcji**. Zbieramy **5–10 rzeczywistych testów** od różnych profili.

### Panel rodzinny — Parczew / Lubartów *(pilot)*

**Przewaga małego miasta:** naturalna sieć zaufanych testerów — tego nie da się łatwo zorganizować w dużym mieście.

| Tester | Profil | Co może pokazać |
|--------|--------|-----------------|
| Oluś (~12 lat) | dziecko | czy interfejs jest intuicyjny dla młodszych |
| Maja | dziecko / inny wiek | inne zatrzymania niż u brata |
| Mama, tata | dorośli | codzienne użycie, inne oczekiwania |
| Babcia, dziadek | seniorzy | czy UI jest zrozumiały bez „nowych technologii” |

**Nie chodzi o liczbę opinii — chodzi o różne modele myślenia.**

Scenariusz i arkusz: [`field-observation-sheet.md`](field-observation-sheet.md) — jedno zadanie, trzy pytania po teście, **prawdziwa obserwacja** z okolicy każdego.

**Pytanie pomiarowe (ważniejsze niż „czy UI ładne”):**

> Czy aplikacja **zachęca ludzi do patrzenia na swoje otoczenie**?

**Rdzeń produktu (nie „co jest zepsute?”):**

> **„Co zauważyłeś?”** — szersze niż zgłoszenie usterki. Może to być dziura w chodniku, piękne drzewo, cień w upale albo stary młyn, o którym dziadek wspomina. Wtedy to nie tylko formularz — **lokalne historie i obserwacje**.

**Sygnały do słuchania po teście** *(zapisuj cytaty dosłownie)*:

| Sygnał | Przykład | Znaczenie |
|--------|----------|-----------|
| ✅ Historia miejsca | „Tu kiedyś był młyn…” | Ludzie opowiadają o swoim miejscu — silniejsze niż „fajna apka” |
| ✅ Obserwacja codzienności | „Dzieci jeżdżą rowerami, nie ma przejścia” | Rzeczywistość, nie scenariusz testowy |
| ✅ Miejsce spotkań | „Tu wszyscy stoją po szkole” | Aplikacja otwiera patrzenie, nie tylko skargę |
| ⏳ Naturalna potrzeba | „A co już ktoś zgłosił?” / „Też chcę coś dodać” | **Dopiero wtedy** rozważamy kolejny krok (np. wspólna lista) — nie wcześniej |

**Na razie:** jak najmniej funkcji, jak najwięcej rozmów. Każda rozmowa z Olusiem, tatą, sąsiadem może powiedzieć więcej niż tydzień nad kolejnym ekranem.

Jeśli tak — to silniejszy sygnał niż „formularz działa”. WARSZAWASZA zrodziła się na Muranowie; mechanizm obserwacji miejsca sprawdzamy też **poza Warszawą** (Parczew, Lubartów, …). Warszawa pozostaje głównym polem projektu; **rdzeniem jest lokalna obserwacja**, miasto to etykieta.

**Kolejna decyzja produktowa dopiero wtedy**, gdy ten sam problem powtórzy się w kilku testach.

**Sąsiedzi** (po rodzinie): ten sam arkusz, krótszy briefing — patrz [`field-observation-sheet.md`](field-observation-sheet.md), sekcja *Sąsiedzi*. Osobista historia (*Muranów → rodzinne miasto*) zamiast technologii.
