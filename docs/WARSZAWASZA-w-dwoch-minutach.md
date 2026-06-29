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

## Gramatyka, nie scenariusze

Scenariuszy może być nieskończenie wiele: upał, rower, Budapeszt, deskorolkarz, zagubione dziecko, awaria windy, zalana ulica, pożar, pies bez właściciela, zamknięty most, koncert, maraton…

Dlatego **nie projektujesz scenariuszy**. Projektujesz **gramatykę**, nie zdania.

| Źle (scenariusze) | Dobrze (gramatyka) |
|-------------------|---------------------|
| ekran dla roweru | 🎤 powiedz, co widzisz |
| ekran dla upału | 📍 potrzebujesz pomocy? |
| ekran dla Budapesztu | system dodaje kontekst |

Język polski nie ma osobnego czasownika dla zgubionego roweru, upału, pożaru ani gradu. Ma **gramatykę**. WARSZAWASZA robi to samo — kilka elementów, z których składa się tysiące sytuacji.

```
Co się dzieje?          (sygnał — opcjonalnie, od systemu)
        ↓
🎤 Powiedz, co widzisz.
        ↓
📍 Potrzebujesz pomocy?
        ↓
System dodaje kontekst. (GPS, czas, język, trace)
        ↓
Działanie.
```

**Pytanie projektowe** — nie *„Jak obsłużyć ten scenariusz?”*, lecz:

> **Czy obecna gramatyka potrafi obsłużyć ten scenariusz?**

- **Tak** → nie dodajesz nic.
- **Nie** → poprawiasz **gramatykę**, nie doklejasz kolejny ekran.

Początkujący projekt rośnie przez dodawanie scenariuszy. Dojrzały — przez wzmacnianie kilku prostych reguł. Przykłady w tej kartce (upał, rower, Budapeszt, kwiaty na balkonie) to **zdania zbudowane z tej samej gramatyki**, nie osobne produkty.

`/field/heat` to **wdrożenie pola** (konkretny sygnał + mapa Warszawy), nie nowy język. Wejście na `/` to ta sama gramatyka bez konkretnego sygnału.

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

### Nie prognoza — decyzja

Aplikacja pogodowa mówi: *Jutro 37°C.* — **fakt**. Koniec.

Interfejs rzeczywistości może iść dalej — **pomóc podjąć jedną małą decyzję**:

```
SYGNAŁ          Jutro 37°C · bardzo gorąco
     ↓
KONTEKST        Może to dotknąć roślin, zwierząt, mieszkania
     ↓
MIKRODECYZJA    🌸 Jeśli masz kwiaty na balkonie — schowaj je dziś wieczorem
```

To **nie są lifehacki** ani portal porad. To **jedna rzecz**, która może się dziś przydać — albo dwie, nie pięćdziesiąt.

Inne przykłady mikrodecyzji (gdy sygnał je uzasadnia):

- 🚲 *Schowaj rower przed burzą.*
- 🌬️ *Zamknij okna — za godzinę silny wiatr.*
- 🧊 *Przygotuj wodę na drogę.*
- 🐶 *Nie wychodź z psem między 13:00 a 16:00.*

**Zasada:** wskazówki są **opcjonalne i kontekstowe** — nie zakładają, że każdy ma balkon, kwiaty ani psa. Formułuj warunkowo: *„Jeśli masz…”*. Nie generuj ich automatycznie **tylko z temperatury**; redaguj je przy wdrożeniu (sygnał + kontekst), tak jak resztę pola.

Na `/field/heat` pod dwoma głównymi CTA może pojawić się np.:

> **💡 Wskazówka na dziś:** Jeśli masz kwiaty na balkonie, warto je schować przed popołudniowym upałem.

Główne działanie nadal: **📍 pomoc w pobliżu** i **🎤 obserwacja** — wskazówka jest dodatkiem, nie centrum ekranu.

---

## Zasada pod stresem

To **nie jest problem języka**. To **obciążenie poznawcze**, gdy serce bije szybciej.

W takiej chwili człowiek **nie powinien** szukać nazwy ulicy, przepisywać adresu ani wypełniać formularza. Powinien móc zrobić **jedno**: powiedzieć, co widzi.

**Człowiek przekazuje fakty. System dodaje kontekst.** Nie odwrotnie.

| Człowiek mówi | System dodaje |
|---------------|---------------|
| „Chłopak spadł z deskorolki. Chyba złamał rękę.” | lokalizację (GPS → adres / punkt orientacyjny) |
| „Leży na chodniku.” | czas |
| (w swoim języku) | język oryginału + tłumaczenie dla operatora |
| | identyfikator zgłoszenia |

Docelowy przepływ — **jedno działanie człowieka** (mówi), reszta w tle:

```
🎤 Powiedz, co widzisz
        ↓
📍 Lokalizacja dodana automatycznie
        ↓
🌍 Tłumaczenie przygotowane automatycznie (oryginał zachowany)
        ↓
✓ Wyślij
```

System ma powiedzieć: *Prawdopodobna lokalizacja: Bartók Béla út 37, Budapeszt* — nie odwrotnie.

---

## Obce miasto, obcy język (np. Budapeszt)

Jesteś świadkiem wypadku. **Nie znasz węgierskiego.** Nie przeczytasz tablicy ulicy. **Stres** — nie masz siły na formularz.

Co możesz zrobić **już dziś** (krok w stronę zasady powyżej):

| Potrzeba | Co robi interfejs |
|----------|-------------------|
| Mówić po swojemu | Wybierz **`[ PL ]`** (lub swój język) — mówisz głosem, nie piszesz |
| Nie znać ulicy | **`📍 Dołącz, gdzie jestem`** — jedno dotknięcie, współrzędne GPS (bez czytania tablic); docelowo **automatycznie po nagraniu** |
| Opisać zdarzenie | 🎤 *„Widzę wypadek deskorolkarza, potrzebuje pomocy”* |

**📍 Znajdź pomoc w pobliżu** w wdrożeniu warszawskim wskazuje **konkretne punkty w Warszawie**. W Budapeszcie ten przycisk na razie **nie zna lokalnej mapy** — to kolejne wdrożenie, ten sam mechanizm.

**Tłumaczenie dla służb** (operator widzi wersję lokalną, oryginał zachowany) — warstwa **systemu / operatora**, nie formularz w stresie. Ty wysyłasz **głos + GPS w swoim języku**; reszta dzieje się po stronie systemu. Na ekranie obywatela: **zero tłumaczenia na siłę**, tylko dwa kierunki.

**Reverse geocoding** (współrzędne → „Bartók Béla út 37”) i **auto-GPS po nagraniu** — kolejne kroki implementacji; zasada jest już zapisana w trace (warstwa obywatela vs operatora).

Uniwersalna definicja na okładce obejmuje ten przypadek: **pomoc + obserwacja** — bez wymogu znajomości języka kraju.

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
| [warszawasza.online/field/heat](https://www.warszawasza.online/field/heat) | Wdrożenie pola (upał 2026) — ta sama gramatyka, konkretny sygnał |

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

Nie numer PR ani FOP — **dwa pytania**, **dwie zasady** i **jedno pytanie filtra**:

- **📍 Kto może mi pomóc?**
- **🎤 Komu mogę powiedzieć, co się stało?**
- **Człowiek przekazuje fakty. System dodaje kontekst.**
- **Gramatyka, nie scenariusze** — *czy obecna gramatyka obsłuży tę sytuację?*

Jeśli za rok ktoś pamięta te pytania i zasady, a nie architekturę — WARSZAWASZA zrobiła swoje. Reszta to implementacja.

---

*Tak wygląda moja Warszawa. A Wasza?*
