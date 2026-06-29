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

## Interfejs o stałej strukturze

Scenariuszy może być nieskończenie wiele: upał, rower, Budapeszt, deskorolkarz, zagubione dziecko, awaria windy, zalana ulica, pożar…

Dlatego **nie projektujesz scenariuszy**. Budujesz **interfejs o stałej strukturze** — wewnętrznie mówimy też *gramatyka*: **struktura się nie zmienia**, zmienia się tylko **treść** (słownik wdrożenia).

```
        SYTUACJA
            │
            ▼
      Co się dzieje?          (sygnał — opcjonalnie, od systemu)
            │
            ▼
      🎤 Powiedz, co widzisz.
            │
            ▼
      📍 Potrzebujesz pomocy?
            │
            ▼
      System dodaje kontekst
      (czas · miejsce · język)
            │
            ▼
         Jeden krok dalej
```

**Interfejs się nie zmienia. Zmienia się wyłącznie świat.**

| Sytuacja | 🎤 Powiedz, co widzisz | 📍 Potrzebujesz pomocy |
|----------|------------------------|-------------------------|
| 39°C | „Na przystanku zasłabł starszy pan.” | Najbliższa woda, cień |
| Rower | „Nie ma mojego roweru.” | Sekretariat, monitoring |
| Wypadek | „Skateboardzista uderzył w słup.” | Numer alarmowy, lokalizacja |
| Burza | „Drzewo zablokowało ulicę.” | Objazd, zgłoszenie |
| Powódź | „Przejście jest pod wodą.” | Bezpieczna trasa |

**Pytanie projektowe** — nie *„Jak obsłużyć ten scenariusz?”*, lecz:

> **Czy obecna struktura obsłuży tę sytuację?**

- **Tak** → nie dodajesz nic (albo tylko **słownik** — patrz niżej).
- **Nie** → poprawiasz **strukturę**, nie doklejasz kolejny ekran.

### Słownik vs struktura (gramatyka)

Przy każdej nowej funkcji jedno pytanie:

> **Czy rozszerzam słownik, czy zmieniam gramatykę?**

| Słownik (codziennie) | Struktura (bardzo rzadko) |
|----------------------|---------------------------|
| punkty schronienia w upale | nowy sposób zgłaszania |
| hydranty, AED, biblioteki | nowy przepływ interakcji |
| nowe miasto, nowa mapa | zmiana głównych CTA 🎤 / 📍 |

**Reguła:** **Rozwijaj słownik częściej niż gramatykę.**

Nowe miejsca, zdarzenia i wdrożenia powinny mieścić się w istniejącym interfejsie. Zmieniaj strukturę tylko wtedy, gdy **rzeczywistość** pokaże, że obecna nie pozwala użytkownikowi wykonać zadania.

**Analogia mapy:** mapa Polski nie zmienia sposobu działania, gdy otwarto nową drogę — zmienia się **zawartość**. Interfejs pozostaje stabilny; świat dostarcza nowe dane.

`/field/heat` to **wdrożenie** (sygnał 39°C + słownik punktów w Warszawie), nie nowa struktura. Wejście na `/` to ta sama struktura bez konkretnego sygnału.

---

## Jedno znaczenie. Wiele języków

Nie budujesz **10 osobnych stron**. Budujesz **jeden interfejs**, który mówi wieloma językami.

| Zwykła strona | WARSZAWASZA |
|---------------|-------------|
| PL → kopia → EN → kopia → IT… | **Znaczenie** → wyrażenie w PL, IT, HU… |
| Tłumaczenie słów | Tłumaczenie **intencji** |
| Języki konkurują | Języki **współgrają** |

**Projektujemy znaczenia, nie tłumaczenia.** Albo krócej: **Jedno znaczenie. Wiele języków.**

Trzy poziomy:

```
Rzeczywistość
      │
      ▼
  Znaczenie        (🎤 obserwacja · 📍 pomoc — ponad językiem)
      │
      ▼
Interfejs o stałej strukturze
      │
      ▼
PL · IT · EN · HU · BG · LT …
```

**Ikony są pierwszym językiem.** 🎤 i 📍 znaczą to samo w każdym kraju. Tekst jest drugim. Głos — trzecim.

Przykład Budapeszt: ty mówisz po polsku; operator i ratownik dostają wersję po węgiersku; **ty nadal widzisz i słyszysz po polsku**. Tłumaczenie dzieje się **w systemie**, nie w głowie świadka.

W kodzie: wspólne klucze copy (`coldStartI18n`, `heatFieldI18n`) + `[ PL ]` w `LangNav` — ten sam ekran, inne brzmienie intencji.

---

## Obsidian — gdzie jest w projekcie

**Obsidian to nie strona www.** To **osobny vault** (notatki Markdown) — kanon, modele, raporty terenowe, pipeline badawczy operatora.

Vault **nie leży w repozytorium Git** (u autora: iCloud `WARSZAWASZA/warszawasza/`). Strona **nie renderuje** Obsidian — tylko **może wskazać** na notatkę.

```
Teren / obywatel          Operator / badacz
      │                           │
      ▼                           ▼
  🎤 zgłoszenie              Obsidian vault
  trace w przeglądarce     00_DASHBOARD · 02_MODELE
      │                    10_OBSERWACJE · …
      └──── obsidianRef ──────────┘
            (opcjonalny link)
```

| Warstwa | Co widzi człowiek |
|---------|-------------------|
| **Obywatel** | 🎤 · 📍 · proste potwierdzenie — **bez** Obsidian |
| **Operator** | trace + FOP + opcjonalnie `10_OBSERWACJE/OBS-….md` |
| **Badacz** | vault: modele, STAN-SYSTEMU, pipeline Obserwacja→Decyzja |

W aplikacji: pole **„Ref notatki (opcjonalnie)”** w studiu (`LeaveTraceControl`) — ścieżka typu `10_OBSERWACJE/OBS-VCU-2026-06-18-01.md` trafia do FOP jako `source.ref`. Kontrakt: `frontend/lib/domain/traceContract.ts`.

**Źródło prawdy** to domena aplikacji (trace + FOP), nie geometria folderów vaulta.

---

## Potwierdzenie e-mail — co powinno być w środku

E-mail (lub kopia do schowka) to **warstwa 1 — obywatel**: dziadek, babcia, dziecko muszą zrozumieć **bez słownika technicznego**.

**Tak** (prosty język):

```
✓ Odebraliśmy

Co powiedziałeś:
„Chłopak spadł z deskorolki. Chyba złamał rękę.”

Gdzie: Bartók Béla út 37, Budapeszt   (albo: lokalizacja z telefonu)
Kiedy: 28 czerwca, 16:30

Numer zgłoszenia: WZS-20260628-163045
```

**Nie** w mailu obywatela: FOP, kody zdarzeń, „czeka na potwierdzenie w terenie”, współrzędne bez adresu, link na sztywno tylko do `/field/heat`.

**Trzy warstwy exportu** (już w kodzie):

| Warstwa | Dla kogo | Zawartość |
|---------|----------|-----------|
| **1 · Obywatel** | Ty, rodzina | cytat, miejsce, czas, ✓ odebrane, numer |
| **2 · Droga** | Operator | kroki po ludzku („nagranie zakończone”, „dołączono GPS”) |
| **3 · Techniczna** | Dev / archiwum | FOP, trace path — **nigdy** domyślnie w mailu |

Dziś `buildTraceCitizenLayer` jest blisko tego modelu, ale wymaga dopracowania: uniwersalne linki (nie tylko upał), adres z GPS zamiast samych współrzędnych, prostszy temat wiadomości.

### Test Babci

Jeżeli potwierdzenie **nie da się spokojnie przeczytać na głos** osobie starszej — jest zbyt techniczne. Bez: trace, pipeline, FOP, SELECT(…).

### Odarcie języka (nie architektury)

Przed pierwszą akcją użytkownik **nie musi czytać**:

- definicji (*interfejs rzeczywistości*),
- tagline’u,
- marki na środku ekranu,
- słowa *pomoc* / *obserwacja* (zamiast tego: **Znajdź…** / **Powiedz, co widzisz**).

Minimum wdrożenia (upał):

```
39°C
📍 Znajdź wodę i cień
🎤 Powiedz, co widzisz
WARSZAWASZA   ← dyskretnie na dole
```

Reszta — sygnał szczegółowy, RCB, mikrowskazówka — dopiero w *Więcej kontekstu*. Etykiety przy 🎤/📍 zostawiamy **do testu terenowego** (może wystarczą same ikony — nie zgadujemy).

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
- **Interfejs o stałej strukturze** — *czy obecna struktura obsłuży tę sytuację?*
- **Rozwijaj słownik częściej niż gramatykę.**
- **Jedno znaczenie. Wiele języków.**
- **Każda funkcja:** skraca drogę do działania **albo** zwiększa orientację — inaczej out.
- **Sukces:** telefon do kieszeni. *Już wiesz. Idź.*

Jeśli za rok ktoś pamięta te pytania i zasady, a nie architekturę — WARSZAWASZA zrobiła swoje. Reszta to implementacja.

---

## Niski koszt użycia (nie „lekka strona”)

Szybkie ładowanie pomaga, ale celem jest **niski koszt dla człowieka**: uwagi, decyzji, nauki, czasu na ekranie.

```
Rzeczywistość → Interfejs → Lepsza decyzja → Telefon do kieszeni
```

Technologia wygrywa, gdy człowiek **może odejść** — nie gdy zostaje na ekranie.

---

*Tak wygląda moja Warszawa. A Wasza?*
