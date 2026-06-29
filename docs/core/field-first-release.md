# WARSZAWASZA · Proces terenowy

**To nie jest reguła kodu.** Sposób podejmowania decyzji — na jednej kartce.

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

**Typ** w rejestrze: Człowiek · System · Rzeczywistość.  
**Obserwacja ≠ decyzja** — najpierw: *co naprawdę wiemy?*

---

## Rejestr wydań

Jeden wpis na zmianę.

> **Wiersz jest zamknięty dopiero wtedy, gdy kolumna „Pomiar” zawiera wynik z rzeczywistego użycia, a nie przewidywany efekt zmiany.**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.0 | Rzeczywistość | — | — | cold start + głos | ⏳ test terenowy po deployu |
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | ⏳ zmierz po deployu |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | … |

**Zamknięte wiersze (przykład):**

| Release | Typ | Źródło | Obserwacja | Decyzja | Pomiar |
|---------|-----|--------|------------|---------|--------|
| 1.1 | System | Chrome Profiler | INP = 211 ms | Lazy render JSON/FOP | INP: 211 → 63 ms |
| 1.2 | Człowiek | Tester #4 | „Nie zauważyłem mikrofonu.” | Powiększyć CTA 🎤 | 5/5 testerów zauważyło 🎤 |

❌ *powinno być szybciej* · ✅ *INP: 211 → 63 ms*

---

## Rozdział 1 — zamknięty (produkt i proces)

Kod gotowy. **Proces nie jest dalej projektowany** — następny krok to pierwszy prawdziwy wiersz rejestru po teście terenowym.

Sprzężenie zwrotne:

**Rzeczywistość → Obserwacja → Decyzja → Pomiar → Rzeczywistość**

Pytanie projektu (nie procesu): **Czy to pomaga człowiekowi podjąć lepszą decyzję?**

Archiwum szczegółów: [`field-first-release-appendix.md`](field-first-release-appendix.md) · checklist: [`final-integration-pass.md`](final-integration-pass.md)
