# WARSZAWASZA · Proces terenowy

**To nie jest reguła kodu.** To sposób podejmowania decyzji — tak samo lekki, jak interfejs.

> **Nie dodajemy funkcji przed obserwacją z terenu.**

---

## Cztery pytania (cała iteracja)

| Krok | Pytanie |
|------|---------|
| **1. Obserwacja** | Co się wydarzyło? |
| **2. Źródło prawdy** | Skąd to wiemy? |
| **3. Decyzja** | Co zmieniamy? |
| **4. Pomiar** | Czy było lepiej? |

**Reguła:** jedna obserwacja → jedna decyzja → jeden pomiar.  
Nie: jedna obserwacja → pięć poprawek.

**Typ** w rejestrze = źródło prawdy: **Człowiek** · **System** · **Rzeczywistość**  
(INP, cytaty, testy terenowe — to tylko przykłady odpowiedzi na te cztery pytania.)

**Obserwacja ≠ decyzja.** Najpierw: *co naprawdę wiemy?* Potem: *co zmieniamy?*

---

## Rejestr wydań

Jeden wpis na zmianę. Kolumna **Pomiar** — nie „wynik”: pomiar da się zweryfikować, wynik brzmi jak interpretacja.

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.0 | Rzeczywistość | — | — | cold start + głos | ⏳ test terenowy po deployu |
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | ⏳ zmierz po deployu |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | … |

**Po pomiarze (format docelowy):**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | INP = 63 ms |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | 5/5 testerów zauważyło 🎤 |

**Test jakości procesu:** za pół roku nowy członek czyta rejestr i rozumie, *dlaczego* każda zmiana — bez pytania autorów.

---

## Rozdział 1 — zamknięty

Kod Rozdziału 1 jest gotowy. **Najcenniejszym dokumentem nie jest ten plik, lecz pierwszy prawdziwy wiersz rejestru** po testach z Tomkiem, Olusiem i resztą — wtedy proces przestaje być teorią.

> Nie rozwijamy produktu przez dodawanie funkcji. Skracamy drogę między rzeczywistością a działaniem.

---

## Utrzymanie tego dokumentu

Przed dodaniem sekcji zapytaj:

**Czy ta informacja jest potrzebna do podjęcia następnej decyzji?**

Jeśli nie — nie usuwaj od razu; przenieś do [`field-first-release-appendix.md`](field-first-release-appendix.md).

Powiązane: [`final-integration-pass.md`](final-integration-pass.md) · [`WARSZAWASZA-w-dwoch-minutach.md`](../WARSZAWASZA-w-dwoch-minutach.md)
