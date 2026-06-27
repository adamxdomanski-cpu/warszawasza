# Miejski Operator

> Tożsamość operacyjna projektu WARSZAWASZA i dystrybucji COP/FIRA.  
> Dla AI: stały kontekst intencji — nie zastępuje specyfikacji technicznej (`fira/PROTOCOL.md`, `docs/protocol/`).

---

## Definicja

**Miejski Operator** to twórca, analityk i projektant systemów miejskich, który postrzega Warszawę jako dynamiczną sieć rytmów, struktur, przepływów i zależności. Łączy analityczne myślenie z wrażliwością projektową, przekładając złożone zjawiska na czytelne modele, narzędzia i rozwiązania.

Porusza się swobodnie między designem, analizą danych, sztuczną inteligencją, prawem, architekturą oraz komunikacją wizualną, traktując je jako elementy jednego miejskiego ekosystemu. Komunikuje się jasno, rzeczowo i bez zbędnego żargonu. Upraszcza zamiast komplikować, wydobywa strukturę zamiast mnożyć informacje.

Miasto rozumie jako organizm danych, relacji i procesów, który można obserwować, analizować i świadomie projektować. Tworzy rozwiązania oparte na minimalizmie, spójności i **niskiej entropii informacyjnej**. Grafika jest narzędziem orientacji i tożsamości, a dane służą lepszemu rozumieniu rzeczywistości i podejmowaniu trafniejszych decyzji.

Jego projekty łączą warstwę **fizyczną**, **cyfrową** i **narracyjną**. WARSZAWASZA nie jest wyłącznie marką ani aplikacją — jest systemem interpretowania miasta poprzez dane, obserwację, projektowanie i lokalną tożsamość. Każdy element, od interfejsu po artefakt fizyczny, powinien wnosić wartość informacyjną i pozostawać częścią spójnego ekosystemu.

Miejski Operator pracuje iteracyjnie: obserwuje, analizuje, upraszcza, testuje i wdraża. Projektuje rozwiązania trwałe, użyteczne i **audytowalne**, dbając o to, aby każda zmiana zmniejszała szum i zwiększała czytelność całego systemu.

---

## Relacja do WARSZAWASZA (repo)

| Pojęcie | Implementacja |
|---------|----------------|
| Niska entropia | Low Entropy UI — `frontend/`, reguła `.cursor/rules/warszawasza-field.mdc` |
| Obserwacja | COP / FOP — `fira/PROTOCOL.md`, bramka T/F, ślady terenowe |
| Warstwy | Layer 0 (fakt) ≠ Layer 1 (narracja/sensory) ≠ dystrybucja — `docs/protocol/layers-spec-85233.md` |
| Fizyczne ↔ cyfrowe | Studio Dzielna 3A/7, flacon O2O `/market` — produkt ≠ weryfikacja terenu |
| Iteracja z dowodem | merge git + `npm run build` + smoke HTTP — nie bloki PROCESS bez walidacji |

---

## Blok kontekstu dla AI (skrót)

```markdown
You work with Miejski Operator on WARSZAWASZA: Warsaw as a system of signals and flows.
Principles: low information entropy, clarity over decoration, auditability, smallest useful diff.
WARSZAWASZA = physical + digital + narrative layers; COP/FIRA = protocol; frontend = distribution.
Do not claim deploy/production unless verified (git, curl, server logs).
Every UI or copy change must answer: what follows from this?
```

---

*Dokument tożsamości · nie specyfikacja wdrożenia*
