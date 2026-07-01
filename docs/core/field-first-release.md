# WARSZAWASZA · Proces terenowy

> **Teren nie ma obowiązku potwierdzać naszych pomysłów. Ma obowiązek pokazać rzeczywistość.**

**To nie jest reguła kodu.** Sposób podejmowania decyzji — na jednej kartce.

> **Ten rejestr jest nadrzędny.** Kod, protokoły i dokumentacja opisują to, czego nauczył Was teren — nie odwrotnie.

> **Każda obserwacja w tym dzienniku dotyczy zachowania człowieka, nie oceny człowieka.**

❌ „Oluś nie zrozumiał.” · ✅ „Oluś zatrzymał się na 5 sekund.”  
❌ „Sąsiad źle kliknął.” · ✅ „Sąsiad wybrał przycisk B zamiast A.”

> **Nie dodajemy funkcji przed obserwacją z terenu.**

```
┌───────────────────────────────────────────────┐
│              WARSZAWASZA PROCESS              │
├───────────────────────────────────────────────┤
│                                               │
│ 1. Co się wydarzyło?                          │
│ 2. Skąd to wiemy?                             │
│ 3. Co zmieniamy?                              │
│ 4. Czy pomiar potwierdził poprawę?            │
│                                               │
├───────────────────────────────────────────────┤
│ Jedna obserwacja                             │
│        ↓                                      │
│ Jedna decyzja                                 │
│        ↓                                      │
│ Jeden pomiar                                  │
└───────────────────────────────────────────────┘
```

> **Nie wdrażamy hipotez. Wdrażamy najstabilniejszą wersję hipotezy, którą jesteśmy gotowi zmierzyć z rzeczywistością.**

> **Nie dotykaj rzeczywistości, której jeszcze nie zmierzyłeś.**

**Typ** w rejestrze: Człowiek · System · Rzeczywistość · **Rozmowa naturalna** (nie „test użytkownika” — zwykła rozmowa, w której projekt się pojawił).  
**Obserwacja ≠ decyzja** — najpierw: *co naprawdę wiemy?*

---

## Słownik

Każde słowo — jedna rzecz. **Teren** ≠ **scenariusz** (patrz T-004).

| Pojęcie | Znaczenie |
|---------|-----------|
| **Teren** | Miejsce, gdzie spotykacie człowieka i obserwujecie rzeczywistość. |
| **Obserwacja** | To, co faktycznie wydarzyło się w terenie. |
| **Ślad** | Konkretny zapis jednej obserwacji. |
| **Dziennik terenowy** | Historia obserwacji i tego, czego nauczył Was teren. *(ten dokument)* |
| **Scenariusz** | Przygotowany przykład lub ćwiczenie (np. Upał 2026). |
| **Symulacja** | Hipotetyczny przebieg zdarzeń — nie jest obserwacją. |
| **Zapis historyczny** | Dawniej wykonany ślad lub zdarzenie. |

Reguła projektowa: **Narracja ≠ Fakt** — użytkownik wie, na który byt patrzy. Szczegóły: [`diamond-protocol-v1.md`](../protocol/diamond-protocol-v1.md).

**Najlepszy teren:** ludzie zapominają, że są testowani. Cenniejsze niż „Czy aplikacja Ci się podoba?” są zdania wypowiedziane przy targu, zakupach, lodach — bez scenariusza testu.

**Warstwa (roboczo):** gdzie opis **żyje w systemie** (UI · API · FOP · archiwum) — warstwa implementacji, nie geometria. **Aspekt:** **co** opisujemy (techniczny · historyczny · obywatelski · epistemiczny). **Perspektywa:** **kto** lub **po co** opisuje (obywatel · operator · badacz · system). ❌ *warstwowość = wielowymiarowość* · to nie synonimy. ❌ *jedno słowo na wszystko* — patrz H-001.

> **Dobry model** nie jest tym, który opisuje wszystko. **Dobry model** jest tym, o którym wiadomo, **czego jeszcze nie opisuje**.

---

## Hipotezy (otwarte)

Nie filary. Pytania do terenu i praktyki — zamknąć dopiero gdy widać, które pojęcie porządkuje rzeczywistość.

| Id | Hipoteza | Status |
|----|----------|--------|
| **H-001** | Może **nie trzeba** zastępować *warstwa* ↔ *aspekt* ↔ *perspektywa* — opisują **trzy różne rzeczy**. **Aspekt** = co opisujemy (semantyka śladu). **Perspektywa** = kto / po co opisuje (punkt widzenia). **Warstwa** = gdzie opis żyje w systemie (implementacja). Jeden ślad: te same aspekty, różne perspektywy obserwatora, różne warstwy reprezentacji — **graf**, nie stos. Sprawdzić na kolejnych śladach; jeśli język naturalny to potwierdzi — zasada; jeśli nie — odrzucenie też jest sukcesem. | ⏳ |
| **H-002** | **Myśl do zapamiętania:** czy da się **własny** kanał obrazu zamiast DisplayLink (USB + kompresja + sterownik)? Nie jako zadanie na teraz — tylko pytanie: co by musiało istnieć (przepustowość, dekodowanie, warstwa w macOS), i czy w ogóle **chodzi o protokół**, czy o **mniej ekranów / natywny Thunderbolt**. Kontekst: Mac + 3 monitory dodatkowe, WindowServer, przegrzanie. | ⏳ · bez implementacji |
| **H-003** | **Gałąź techniczna (horyzont):** rozwijać u siebie kompetencję **własnego kanału obrazu** — od DisplayPort / protokołu / warstwy systemowej po percepcję (okulary, cienki ekran). Nie zamiennik docka na jutro; **kierunek R&D**: kiedy opis wizualny ma żyć w systemie, a kiedy w ogóle nie. Powiązane: H-002, XTPL/UPD (produkcja), Ray-Ban (teren). Zamknąć dopiero gdy widać: protokół · sterowanie · sprzęt — która gałąź realna. | ⏳ · bez implementacji |

> Nie budujecie od razu portu — budujecie gałąź, w której wiecie, czego jeszcze nie opisujecie, i kiedy wyłączacie cudzy sterownik. Pierwszy krok praktyczny (poza repo): `odchudz` / `ekrany` w `~/.zshrc`.

---

## Rejestr obserwacji (dziennik terenowy)

Pierwszy „teren” nie musi być Parczewem ani ulicą — może być salonem. Zapisuj **zachowanie**, nie werdykt na człowieka.

| Id | Typ | Źródło | Obserwacja | Wynik | Wpływ | Pomiar |
|----|-----|--------|------------|-------|-------|--------|
| **T-001** | Rozmowa naturalna | Oluś · salon rodzinny | Projekt pojawił się w zwykłej rodzinnej rozmowie. Nie wymagał tłumaczenia, czym jest AI ani aplikacja. Stał się częścią rozmowy (lodów, Kosmici 23, Megastronariusz, Kosmitka). | Hipoteza potwierdzona częściowo | Projekt powinien być projektowany tak, by można było o nim rozmawiać **przy lodach**, nie tylko podczas prezentacji | ⏳ |
| **T-002** | Człowiek | teren · rower · Ślad `#20260630-231344` | Wieczorem wyszedł na rower; temperatura przyjemna (nie upał), odpoczynek na miejscu. Nagranie głosowe wysłane z terenu. W opisie zgłoszenia widać **urwany tekst**: „wspania" — to fragment słowa *wspaniały* (wspaniały wieczór), nie osobne słowo. Bez GPS; ekran potwierdzenia odebrany. | Pierwszy żywy ślad poza salonem; **tekst urwany przy zapisie** | Pole opisu musi pokazywać **cały** tekst użytkownika, nie pierwszy fragment z rozpoznawania mowy | ⏳ |
| **T-003** | Człowiek | telefon · Kajka Winiarska-Pniewska | Po rowerze zadzwonił; umówił zakupy dla nich **jutro** na targu Ukręglicki. | Umówione | Projekt istnieje obok zwykłych sąsiedzkich zobowiązań — nie zastępuje ich | ⏳ |
| **T-004** | Człowiek | `/field/heat` po śladzie z roweru | `39°C` widoczne **zanim** wiadomo, że to scenariusz (28 VI 2026). Ryzyko pomyłki z pogodą „teraz” — semantyka, nie INP. | P1: etykieta **SCENARIUSZ** nad foldem (nie „terenowy” — to słowo zarezerwowane dla dziennika) | **Narracja ≠ Fakt** | ⏳ |
| **T-005** | Rzeczywistość | wieczór · pokój · parapet | Wieczór. Gorąco w pokoju. Na parapecie siedzą razem. Feluś. *Tak wyglądała moja Warszawa.* | — | — | ⏳ |

---

## Rejestr wydań

Jeden wpis na zmianę.

> **Wiersz jest zamknięty dopiero wtedy, gdy kolumna „Pomiar” zawiera wynik z rzeczywistego użycia, a nie przewidywany efekt zmiany.**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.0 | Rzeczywistość | — | — | cold start + głos | ⏳ test terenowy po deployu |
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | ⏳ zmierz po deployu |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | … |
| 1.3 | System | Chrome Interaction Timing | lang-nav INP ~887 ms | no-op active lang · useTransition · dev panel split | ◐ 887 → 224 ms · zmierz ponownie przed P2 |
| 1.4 | System | warsztat · `b4976a6` | Autoplay po STOP — ryzyko niespójnego zachowania na mobile (Chrome/Safari/Firefox) | TAP biały/czerwony · `[ OD_SŁUCHAJ ]` z gestem użytkownika zamiast autoplay | ⏳ test terenowy · 5 pytań (nagrywa · koniec · odsłuch · wyślij · co dalej) |

**Zamknięte wiersze (przykład):**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | INP: 211 → 63 ms |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | 5/5 testerów zauważyło 🎤 |

❌ *powinno być szybciej* · ✅ *INP: 211 → 63 ms*

---

## Rozdział 1 — zamknięty (produkt i proces)

Kod gotowy. **Proces nie jest dalej projektowany** — dziennik ma wpisy od salonu (**T-001**) po parapet (**T-005**); teren prowadzi kolejne iteracje, nie dokumentacja.

Sprzężenie zwrotne:

**Rzeczywistość → Obserwacja → Decyzja → Pomiar → Rzeczywistość**

Pytanie projektu (nie procesu): **Czy to pomaga człowiekowi podjąć lepszą decyzję?**

Archiwum szczegółów: [`field-first-release-appendix.md`](field-first-release-appendix.md) · checklist: [`final-integration-pass.md`](final-integration-pass.md)
