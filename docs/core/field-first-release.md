# WARSZAWASZA · Proces terenowy

**To nie jest reguła kodu.** Sposób podejmowania decyzji — na jednej kartce.

> **Nie dodajemy funkcji przed obserwacją z terenu.**

**Dziennik wiedzy** — trzy poziomy: *co zaobserwowaliśmy?* · *jaką podjęliśmy decyzję?* · *czy decyzja zadziałała?* (commit odpowiada tylko na „co zmieniliśmy?”).

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
│              WARSZAWASZA PROCESS              │
├───────────────────────────────────────────────┤
│                                               │
│ 1. Co się wydarzyło?                          │
│ 2. Skąd to wiemy?                             │
│ 3. Co zmieniamy?                              │
│ 4. Czy pomiar potwierdził poprawę? (Wynik)    │
│                                               │
├───────────────────────────────────────────────┤
│ Jedna obserwacja                             │
│        ↓                                      │
│ Jedna decyzja                                 │
│        ↓                                      │
│ Jeden pomiar                                  │
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

**Filtr PR (Zasada 001):** Czy zmiana wynika z obserwacji terenowej? Czy mamy dowód realnego problemu? Czy potrafimy zmierzyć efekt? Jeśli „nie” — zmiana czeka.

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.0 | Rzeczywistość | Adam, teren | Pierwszy ślad wysłany (ID `20260630-174909`); brak GPS; copy techniczne | cold start + głos — przepływ działa bez kategorii, FOP w UI, dodatkowych ekranów | ✅ wysyłka bez tarcia; copy wymaga poprawy (→ 1.3) |
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | ⏳ zmierz po deployu |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | … |
| 1.3 | Rzeczywistość | Adam, teren | Cztery źródła tarcia na ekranie potwierdzenia (GPS, audio, duplikat, obietnica e-mail) | Wyłącznie poprawki copy L1 — PR #26 | ⏳ retest terenowy po deployu |

**Zamknięte wiersze (przykład):**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | INP: 211 → 63 ms |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | 5/5 testerów zauważyło 🎤 |

❌ *powinno być szybciej* · ✅ *INP: 211 → 63 ms*

---

## Rozdział 1 — zamknięty (produkt i proces)

Kod gotowy. **Proces nie jest dalej projektowany** — rejestr rośnie wyłącznie z obserwacji terenowych.

Sprzężenie zwrotne:

**Rzeczywistość → Obserwacja → Decyzja → Pomiar → Rzeczywistość**

Pytanie projektu (nie procesu): **Czy to pomaga człowiekowi podjąć lepszą decyzję?**

Archiwum szczegółów: [`field-first-release-appendix.md`](field-first-release-appendix.md) · checklist: [`final-integration-pass.md`](final-integration-pass.md)

---

## Zasada 001

Każda nowa funkcja musi wynikać z obserwacji terenowej.

Nie dodajemy funkcji wyłącznie dlatego, że wydają się przydatne.

**Potwierdzenie z pierwszego testu (Release 1.0):** pierwszy prawdziwy użytkownik przeszedł cały proces bez kategorii, klasyfikacji, silnika reguł, FOP w UI ani dodatkowych ekranów. Najprostszy możliwy przepływ działa w praktyce — to punkt odniesienia: najpierw ślady z terenu, potem rozbudowa tam, gdzie pojawia się potrzeba.

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

Wprowadzono wyłącznie poprawki copy.

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

| Obserwacja | Decyzja | Hipoteza | Wynik |
|------------|---------|----------|-------|
| Copy GPS było zbyt techniczne | Zmieniono komunikat lokalizacji | Mniejsze tarcie przy braku GPS | ⏳ Oczekuje |
| Placeholder „[nagranie głosowe]” | Etykieta nagrania z czasem trwania | Użytkownik rozumie, co wysłał | ⏳ Oczekuje |
| Powtórzone potwierdzenie wysłania | Jeden ekran potwierdzenia | Mniej szumu informacyjnego | ⏳ Oczekuje |
| Obietnica e-mail w przyszłości | Komunikat o zapisie na urządzeniu | Jasny stan obecny, bez fałszywej obietnicy | ⏳ Oczekuje |
| **Łącznie** | **PR #26 — copy L1** | **Tarcie ↓, skuteczność wysyłki bez zmian** | **⏳ Oczekuje** |

Po retescie zamień ⏳ na ✅ / ◐ / ❌ i zaktualizuj wiersz **1.3** w tabeli rejestru.

### Pomiar

Do wykonania po deployu:

- [ ] ślad bez GPS
- [ ] ślad tylko audio
- [ ] ślad z długim opisem
- [ ] brak poziomego przewijania
- [ ] użytkownik rozumie zakończenie zgłoszenia bez dodatkowych wyjaśnień

**Status:** ⏳ oczekuje na retest terenowy

---

## Fakty vs interpretacja (testy spoza zespołu)

Pierwszy użytkownik spoza zespołu (np. dziecko, osoba starsza) to **inny rodzaj danych** niż własne testy. Zapisuj najpierw fakt, potem — dopiero jeśli trzeba — hipotezę i decyzję.

**Szablon notatki terenowej:**

| Pole | Przykład |
|------|----------|
| **Obserwacja (fakt)** | Oluś przez ~5 s szukał sposobu rozpoczęcia nagrywania; nie pytał o pomoc. |
| **Hipoteza** | CTA nagrywania niewystarczająco widoczne na cold start. |
| **Decyzja** | *(pusta do czasu powtórzenia u ≥2 osób lub retestu)* |

Obserwacja = to, co widać na nagraniu / w czasie. Hipoteza = interpretacja. Decyzja = dopiero po wzorcu, nie po jednym zdarzeniu.

---

## Etap po Retest #2 — panel 5–10 osób

Po merge PR #26 i retescie **nie budujemy od razu nowych funkcji**. Zbieramy **5–10 rzeczywistych testów** od różnych profili:

- dziecko (np. Oluś),
- osoba starsza,
- użytkownik techniczny,
- użytkownik nietechniczny,
- *(inne, jeśli relevantne)*

**Kolejna decyzja produktowa dopiero wtedy**, gdy ten sam problem powtórzy się w kilku testach. To przejście od produktu testowanego przez twórców do produktu rozwijanego na podstawie zachowań w terenie.
