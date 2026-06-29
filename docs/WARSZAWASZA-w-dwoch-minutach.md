# WARSZAWASZA w dwóch minutach

**Pierwsza kartka** — dla programisty, projektanta, testera, rodzica, wolontariusza.  
Bez FOP, bez warstw, bez filozofii technologii.

> **WARSZAWASZA** to interfejs rzeczywistości, który pomaga człowiekowi **odnaleźć pomoc** i **przekazać ważną obserwację**.

Jeśli to jedno zdanie jest jasne, reszta dokumentacji będzie łatwiejsza.

**W Warszawie** oznacza to:

- **📍** Miasto pomaga Tobie.
- **🎤** Ty pomagasz miastu.

Ta sama logika działa w szkole (skradziony rower), na festiwalu, w lesie, na lotnisku — **Warszawa to pierwsze wdrożenie**, nie jedyna interpretacja.

---

## Piramida — fundament i implementacja

**Czytanie:** od dołu do góry (od potrzeby do kodu).  
**Architektura:** fundament u dołu — **PO CO**; na górze — **JAK**.

Fundamentem projektu nie jest kod. Fundamentem jest **potrzeba człowieka**. Na niej stoi sens. Dopiero na tym budujesz implementację.

```
                 ┌─────────────┐
                 │     JAK?    │
                 │ kod • API   │
                 │ trace • FOP │
                 └──────┬──────┘
                        │
              ┌─────────┴─────────┐
              │    DLACZEGO?      │
              │ interfejs         │
              │ rzeczywistości    │
              └─────────┬─────────┘
                        │
        ┌───────────────┴───────────────┐
        │            PO CO?             │
        │  📍 Odnaleźć pomoc            │
        │  🎤 Przekazać ważną obserwację │
        └───────────────────────────────┘
```

**Ta kartka = warstwa PO CO (fundament).**  
Potem: *dlaczego tak* — interfejs, test zimnego startu.  
Na górze: *jak* — repozytorium, warstwy, API.

### Spirala

Rzeczywistość nie czeka na koniec testu — **od niej zaczynasz** (upał, zginął rower, przewróciło się drzewo). **Do niej wracasz** (czy znalazł wodę? czy wiedział, co zrobić?).

```
Rzeczywistość
      │
      ▼
  Potrzeba
      │
      ▼
 Interfejs
      │
      ▼
  Działanie
      │
      ▼
Rzeczywistość
```

**Rzeczywistość jest pierwszym i ostatnim recenzentem.**

---

## O co chodzi?

WARSZAWASZA **nie jest** portalem informacyjnym.  
**Nie jest** formularzem.  
**Nie jest** systemem AI.

To **prosty interfejs między człowiekiem a miejscem, w którym jest** — pomoc **tu i teraz** oraz głos obserwacji.

Są tylko **dwa kierunki** (w Warszawie: miasto ↔ ty; wszędzie indziej: miejsce ↔ ty).

**Warszawa** to pierwsze wdrożenie — codzienne pole testów.  
Mechanizm jest szerszy; zmienia się **sytuacja**, nie logika.

---

## 📍 Miasto pomaga Tobie

Potrzebujesz czegoś **tu i teraz**.

Może to być:

- woda podczas upału,
- cień,
- portiernia,
- biblioteka,
- monitoring,
- miejsce, gdzie możesz uzyskać pomoc.

Interfejs pomaga znaleźć **najbliższy właściwy krok**.

---

## 🎤 Ty pomagasz Miastu

Widzisz coś ważnego.

Nie piszesz długiego formularza.

Po prostu mówisz:

**„Powiedz, co widzisz.”**

System odbiera zgłoszenie i przekazuje je dalej.

---

## Przykład 1 — skradziony rower

Kończysz lekcje.  
Twój rower zniknął.

Masz **dwie potrzeby**:

| | |
|---|---|
| **📍** | Gdzie mogę uzyskać pomoc? |
| **🎤** | Co właśnie się stało? |

To wszystko.

*Klikasz mikrofon i mówisz:*  
*„Skończyłem lekcje. Rower stał przy wejściu. Teraz go nie ma.”*

---

## Przykład 2 — upał

Jest 39°C.  
Potrzebujesz wody.

Masz **dwie potrzeby**:

| | |
|---|---|
| **📍** | Gdzie jest najbliższa woda i cień? |
| **🎤** | Powiedz, co widzisz na ulicy. |

**To ten sam interfejs.**  
Zmienia się tylko sytuacja.

---

## Dwa kierunki — jedna rozmowa

```
        MIASTO / MIEJSCE
           │
           ▼
    📍 Pomaga Tobie

        TY
           │
           ▼
    🎤 Pomagasz Miastu
```

Dwa pytania, które człowiek zadaje w trudnej chwili:

- **Kto może mi pomóc?** 📍
- **Komu mogę powiedzieć, co się stało?** 🎤

---

## Jak sprawdzamy, czy działa?

1. Dajemy **link** osobie, która **nic nie wie** o projekcie.
2. **Nie tłumaczymy.** **Nie pomagamy.**
3. Jedno zdanie: *„Otwórz stronę i zrób to, co według ciebie ma sens.”*
4. Po chwili pytamy **tylko raz**:

   **„Jak myślisz, do czego służy ta strona?”**

**Dobrze**, gdy odpowie mniej więcej:

- „Mogę znaleźć pomoc.”
- „Mogę powiedzieć, co widzę.”

**Sygnalizator problemu** (nie wina testera):

- „Nie wiem.”
- „To jakaś strona o Warszawie…”

→ Poprawiamy **jedną rzecz** i sprawdzamy ponownie.

**Rzeczywistość jest pierwszym i ostatnim recenzentem.**

---

## Gdzie to zobaczyć

| Link | Co to |
|------|--------|
| [warszawasza.online](https://www.warszawasza.online/) | Wejście (cold start) |
| [warszawasza.online/field/heat](https://www.warszawasza.online/field/heat) | Scenariusz upału — ten sam interfejs |

Stary pełny UI studia: `/?legacy=1` (warsztat — warstwa **JAK**, nie test terenowy).

---

## Co czytać dalej (kolejność)

| Kolejność | Warstwa | Dokument |
|-----------|---------|----------|
| **1** | PO CO | *Ta kartka* |
| **2** | DLACZEGO | [`final-integration-pass.md`](core/final-integration-pass.md) — test zimnego startu, interfejs |
| **3** | JAK | [`project.md`](project.md), [`fira/PROTOCOL.md`](../fira/PROTOCOL.md), kod w `frontend/` |

---

## Co warto zapamiętać

Nie numer PR ani FOP — **dwa pytania**:

- **📍 Kto może mi pomóc?**
- **🎤 Komu mogę powiedzieć, co się stało?**

Jeśli za rok ktoś pamięta te pytania, a nie architekturę — WARSZAWASZA zrobiła swoje. Reszta to implementacja.

---

*Tak wygląda moja Warszawa. A Wasza?*
