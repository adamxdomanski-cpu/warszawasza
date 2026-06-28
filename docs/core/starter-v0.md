# COS Core Starter v1.0

> **Cel:** ultra-lekki `.cursorrules` — tylko wykonanie kodu. Zero filozofii w każdej sesji.  
> **Pełny stos (na żądanie):** [`cursor-rules-full.json`](cursor-rules-full.json) · [`babcia-os-v1.md`](../identity/babcia-os-v1.md)

Aksjomat 3 na samym Cursorze: **jeśli reguła zwiększa opór LLM — usuń ją z `.cursorrules`.**

---

## Mikro-rdzeń (canonical)

Plik: [`.cursorrules`](../../.cursorrules)

| Reguła | Co robi |
|--------|---------|
| **RULE 1 GROUNDING** | obserwacja / hipoteza / kod — bez udawania pewności |
| **RULE 2 KISS** | mniej abstrakcji, bez ghost classes i martwych warstw |
| **RULE 3 SEPARATION** | system rejestruje; człowiek decyduje; kod agnostyczny |
| **RULE 4 REASONING** | 5 funkcji przy większych zmianach (bez person w promptcie) |
| **RULE 5 FIELD TEST** | rolloutowo ≠ koniec; kod incomplete bez planu weryfikacji w produkcji |
| **STYLE** | minimalny, samodokumentujący się kod |

**6 reguł.** Reszta w `/docs` — AI sięga po nią **tylko gdy poprosisz**.

---

## Gdzie leży reszta (nie w `.cursorrules`)

| Temat | Plik |
|-------|------|
| Persony (Oluś, Tomek…) | [`personas.md`](../personas.md) |
| Architektura 7 warstw | [`babcia-os-v1.md`](../identity/babcia-os-v1.md) |
| Maile CZŁOWIEK → SYSTEM | [`trace-alert-comms-v1.md`](../protocol/trace-alert-comms-v1.md) |
| Pełne reguły AI | [`cursor-rules-full.json`](cursor-rules-full.json) |

---

## Cursor — overhead

| Always-on | Plik |
|-----------|------|
| Tak | `.cursorrules` + `.cursor/rules/starter.mdc` |
| Przy `frontend/**` | `warszawasza-field.mdc` |
| Przy `fira/**`, `backend/**` | `fira-protocol.mdc` |

Nie ładuj BABCIA OS, COS ani person domyślnie.

---

## Pętla

```
Kod → Rolloutowo → Field → nowa obserwacja → (powtórz)
```

---

*COS Core Starter · ULTRA_LIGHTWEIGHT · expandable via /docs*
