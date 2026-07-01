# WARSZAWASZA · Proces terenowy — załącznik

Materiał pomocniczy: **nie jest potrzebny do każdej decyzji**. Główny dokument: [`field-first-release.md`](field-first-release.md) · słownik pojęć: ten sam plik, sekcja **Słownik**.

---

## Trzy źródła prawdy (szczegóły)

| Źródło prawdy | Odpowiada na pytanie | Przykład |
|---------------|----------------------|----------|
| **Człowiek** | Czy interfejs był zrozumiały? | Cytat: „Nie zauważyłem mikrofonu.” |
| **System** | Czy aplikacja działała sprawnie? | INP 211 ms, logi, profiler |
| **Rzeczywistość** | Czy cel został osiągnięty? | Woda, wysyłka, telefon w kieszeni |

**Nie myl — żadne źródło nie zastępuje pozostałych:**

- Chrome Profiler nie powie, czy interfejs jest intuicyjny.  
- Cytat użytkownika nie powie, czy `JSON.stringify()` blokuje wątek.  
- Oba razem nie powiedzą, czy człowiek rozwiązał problem.

| Typ (rejestr) | Kiedy wpisujesz |
|---------------|-----------------|
| Człowiek | cytat, test terenowy, zachowanie w UI |
| **Rozmowa naturalna** | projekt wszedł w zwykłą rozmowę — bez scenariusza „testu użytkownika” |
| System | profiler, INP, logi, awaria techniczna |
| Rzeczywistość | cel osiągnięty / nie |

**Zachowanie, nie ocena:** zapisuj co się wydarzyło (*zatrzymał się na 5 s*), nie werdykt (*nie zrozumiał*).

---

## Cykl wydania (rozwinięcie)

| Etap | Co robimy? | Czego nie robimy? |
|------|------------|-------------------|
| **Release** | Wypuszczamy zmianę | Nie projektujemy kolejnych funkcji |
| **Obserwacja** | Patrzymy, jak korzystają ludzi | Nie tłumaczymy zachowań teoriami |
| **Analiza** | Zbieramy cytaty i przebieg zadań | Nie zgadujemy intencji |
| **Decyzja** | **Jedna** poprawka | Nie pięć naraz |
| **Kolejny release** | Powtarzamy cykl | Nie omijamy obserwacji |

Cykl FIRA: **Rzeczywistość → Obserwacja → Kod → Rzeczywistość**

> Jeżeli dowody z pola przeczą założeniom, zmieniamy założenia — nie wyjaśniamy danych.

---

## Release 1.0 — zakres zamknięty (Rozdział 1)

- 🎤 Nagraj obserwację  
- 📍 Znajdź wodę i cień  
- prosty ekran potwierdzenia  
- trzy warstwy (L1 na wierzchu)  
- odporność na STT, GPS, awarię mikrofonu  
- brak duplikatów przy „Wyślij”  

**Stop:** bez sync offline, bez skracania flow, bez backendu wysyłki — dopóki nie ma obserwacji z terenu.

`localStorage` na start jest OK; rozbudowanej synchronizacji offline nie budujemy bez dowodu, że ludzie zgłaszają bez sieci.

Checklist techniczna: [`final-integration-pass.md`](final-integration-pass.md)

---

## Test terenowy (Rozdział 2)

**Tabela zachowań** (5–10 osób spoza zespołu):

| Tester | Czy zauważył 🎤? | Czy wysłał zgłoszenie? | Czy wiedział, co robić? |
|--------|------------------|------------------------|---------------------------|
| …      | ✅ / ❌          | ✅ / ❌                | ✅ / ⚠️ / ❌              |

**Pytaj o to, co się wydarzyło** (nie: „Czy Ci się podoba?” / „Co byś dodał?”):

1. Co było **pierwszą rzeczą**, którą zauważyłeś?
2. Co zrobiłeś **jako pierwsze**?
3. Czy był moment, w którym **nie wiedziałeś, co dalej**?

Jeden test → **jeden wiersz** w rejestrze.

**Przykładowe cytaty:** „Nie wiedziałem, że można nagrywać.” · „Kliknąłem wodę od razu.” · „Nie zauważyłem mikrofonu.”

---

## Pomiar wydajności (Typ = System)

Po deployu (decyzja dot. INP): czy klik L3 jest natychmiast odczuwalny? Czy profil pokazuje spadek Input Delay?  
Jeśli tak — **zamknij temat**; nie poluj na kolejne 10 ms bez nowej obserwacji.

---

## Bezpiecznik zespołu

Każda iteracja powinna być **mniejsza** od poprzedniej: ekran → sekcja → przycisk → słowo.

Pytanie zmienia się z „Jaki mamy pomysł?” na „Co pokazała rzeczywistość?”

---

## Kryterium: telefon do kieszeni

Sukces = człowiek jak najszybciej **przestaje potrzebować aplikacji** — zadanie wykonane, telefon w kieszeni.

[`WARSZAWASZA-jedna-kartka.md`](../WARSZAWASZA-jedna-kartka.md) · [`WARSZAWASZA-w-dwoch-minutach.md`](../WARSZAWASZA-w-dwoch-minutach.md)

---

## COP v1.0 — dwie warstwy (CI)

Walidator (`scripts/cop-validate.sh`):

| Warstwa | Zakres | Glify |
|---------|--------|-------|
| Kod / docs techniczne | komponenty, JSX | tylko FIRA (`symbols.ts`) |
| UI / i18n | `frontend/lib/field/*`, `*i18n.ts` | 🎤 📍 w copy terenowym |

Błąd CI przy emoji w copy → przenieś do i18n; nie osłabiaj reguły dla kodu.

---

## PR / merge (Rozdział 1)

**Approved with one condition:** do not add new features before field evidence.
