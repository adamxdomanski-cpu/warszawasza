# LiveMesh — materiał dla Marcina Garczyńskiego (Pokojowy Patrol)

**Cel dokumentu:** odpowiedź na pytanie „chcę wiedzieć więcej” — bez regulaminu, bez architektury w pierwszym akapicie.  
**Odbiorca:** operacja, presja czasu, schematy które nie przeszkadzają.  
**Data:** lipiec 2026

---

## 1. Jedno zdanie

**LiveMesh nie mówi, co się dzieje. LiveMesh mówi, gdzie warto spojrzeć.**

Decyzja — kto jedzie, co robi ratownik, czy to zagrożenie — **zawsze zostaje po stronie człowieka**.

---

## 2. Po co to jest na Pol’and’Rocku

Podczas dużego wydarzenia ratownik nie potrzebuje kolejnego systemu, który „wie lepiej”.  
Potrzebuje **prostego wskazania**: *który fragment pola wymaga uwagi teraz*, gdy:

- nie słychać radia,
- GSM pada,
- w kilku miejscach naraz „coś się dzieje”,
- patrol jest rozciągnięty.

LiveMesh ma **nie zastępować** doświadczenia Pokojowego Patrolu — ma **oszczędzać uwagę**: mniej zgadywania *gdzie patrzeć*, więcej energii na *co zrobić*.

---

## 3. Skąd biorą się sygnały (odpowiedź na najczęstsze pytanie)

**Źródłem są punkty obserwacji na terenie wydarzenia** — telefony (lub inne węzły) ustawione w **wyznaczonych miejscach**, nie w kieszeni ratownika.

Każdy punkt „patrzy” na **swój sektor** (np. A1, B1, C1…) i co kilka sekund wysyła **zagregowany, anonimowy** zestaw informacji:

| Co leci z pola | Co to znaczy operacyjnie |
|----------------|---------------------------|
| Poziom hałasu w sektorze | Czy w tym miejscu rośnie „energia” otoczenia |
| Gęstość anonimowych impulsów Bluetooth w okolicy | Czy rośnie zagęszczenie / ruch w strefie (bez identyfikacji osób) |

**Czego tam nie ma:**

- twarzy, nagrań rozmów, listy uczestników,
- lokalizacji konkretnych osób,
- decyzji medycznych ani alarmów „coś się stało”.

To **nie jest** zgłoszenie od publiczności. To **tło sektorowe** — jak termometr na mapie, nie diagnoza.

**Kto ustawia punkty:** operator / organizator wydarzenia (wspólnie z nami), **przed** startem. Ratownik **nie konfiguruje** telefonów w trakcie akcji.

---

## 4. Jak to wygląda w pracy ratownika (30 sekund)

```
  Sygnały z punktów obserwacji (sektory A1, B1, C1…)
              │
              ▼
  Porównanie z normą dla tego sektora
              │
              ▼
  Ekran ratownika: „SPRAWDŹ SEKTOR B1”
              │
              ▼
  Człowiek patrzy, słucha radia, decyduje
```

**Ratownik widzi:**

- mapę sektorów,
- który sektor ma podniesioną uwagę,
- czy sygnał rośnie, czy opada.

**Ratownik nie widzi:**

- kto stoi w tłumie,
- który telefon należy do kogo.

---

## 5. Podział terenu (schemat do uzupełnienia na miejscu)

Na pilotaż **nie potrzebujemy** precyzyjnej mapy GIS. Wystarczy **szkic**:

```
        [ SCENA ]
            │
    ┌───────┼───────┐
    │  B1   │  B2   │   ← tłum / podscena
    ├───────┼───────┤
    │  C1   │  C2   │   ← gastro / woda
    ├───────┼───────┤
    │  A1   │  A2   │   ← ratownictwo / wejścia
    └───────┴───────┘
```

**Na szkicu zaznaczamy:**

1. **Sektory** — nazwy zgodne z Waszą operacją (mogą być inne niż w tabeli powyżej).
2. **Punkty obserwacji** — gdzie stoi telefon/węzeł (jeden punkt = jeden sektor).
3. **Kto reaguje** — który patrol patrzy na który fragment (to Wasza decyzja, nie systemu).

**Propozycja na pierwszy pilotaż:** 2–3 sektory, nie całe pole. Lepiej krótki test z jasnym wnioskiem niż „wdrożenie na cały festiwal”.

---

## 6. Co proponujemy na Pol’and’Rock (pilotaż)

| Element | Propozycja |
|---------|------------|
| **Czas** | Krótki odcinek wydarzenia (np. jeden wieczór / jedna zmiana), nie cały festiwal |
| **Zakres** | 2–3 sektory + 2–3 punkty obserwacji |
| **Rola Marcina / Patrolu** | Powiedzieć, czy wskazania **pomagają** czy **przeszkadzają** — szczerze, bez grzeczności |
| **Rola systemu** | Tylko „gdzie spojrzeć” — zero automatycznych działań ratowniczych |
| **Sukces pilotażu** | Ratownik mówi: „To mi oszczędziło chwilę orientacji” — albo: „To było zbędne”, i wiemy dlaczego |

**Czego nie prosimy w pilotażu:**

- zmiany procedur medycznych,
- szkolenia załogi od zera,
- instalacji ciężkiej infrastruktury na polu.

---

## 7. Raport po evencie — co dziś jest możliwe

Marcin pytał też o **podsumowanie całego wydarzenia**. Uczciwie:

| Pytanie | Odpowiedź dziś |
|---------|----------------|
| Czy po zakończeniu można dostać **zbiorcze podsumowanie** (bez danych osobowych)? | **Tak, częściowo** — eksport „scorecard”: czas trwania, szczyty aktywności per sektor, oś czasu zdarzeń uwagi (JSON, bez PII) |
| Czy jest **jeden gotowy raport PDF** „cały festiwal dla organizatora”? | **Nie** — tego jeszcze nie ma w jednym pliku |
| Czy serwer **pamięta całą historię** po evencie automatycznie? | **Nie w pełni** — stan bieżący na żywo; dłuższa historia wymaga włączenia eksportu / scorecard podczas pracy |
| Czy raport **zastępuje** debrief zespołu? | **Nie** — to materiał pomocniczy do rozmowy po evencie |

**Dla pilotażu:** ustalamy z góry, że po teście dostajecie **krótkie podsumowanie liczbowe + timeline** — do rozmowy „co było użyteczne”.

---

## 8. Co jest gotowe, a co jeszcze nie (bez zgadywania)

Stan na lipiec 2026 — **Etap 2** (stabilizacja, wiele węzłów, offline-first):

| Gotowe (laboratorium / serwer) | Jeszcze do zamknięcia na polu |
|--------------------------------|-------------------------------|
| Serwer odbioru sygnałów per sektor | Fizyczny węzeł iPhone / Shortcuts **w terenie** z Marcinem |
| Progi alertów per sektor (hałas / BLE) | Store-and-forward przy padnięciu GSM — **test na żywo** |
| Ekran „SPRAWDŹ SEKTOR …” | Szkic terenu i rozmieszczenie punktów **z Pokojowym Patrolem** |
| Brak PII w kontrakcie danych | Jedna wspólna próba pod presją czasu (nie slajdy) |

**Ważne:** to nie jest „gotowy produkt na 700 tys. ludzi”. To **pilotaż orientacji** — zanim cokolwiek uznalibyśmy za standard.

---

## 9. LiveMesh a WARSZAWASZA — dwie rzeczy obok siebie

| | **LiveMesh** | **WARSZAWASZA** |
|---|--------------|-----------------|
| **Gdzie** | Duże wydarzenie (Pol’and’Rock) | Miasto / codzienne pole (Warszawa) |
| **Po co** | Gdzie skierować uwagę ratownika | 🎤 obserwacja + 📍 pomoc — prosty interfejs dla człowieka |
| **Kto mówi** | System wskazuje sektor | Człowiek mówi, co widzi |
| **Relacja** | Osobne repozytoria, wspólna filozofia: **człowiek decyduje** | Miejsce weryfikacji pomysłów przed skalą |

Marcin nie musi znać WARSZAWASZY, żeby ocenić LiveMesh na polu. Link dla ciekawych: [warszawasza.online](https://www.warszawasza.online/)

---

## 10. Zasady, które nie zmienią się po pilotażu

1. **System nie zastępuje ratownika** — tylko oszczędza orientację.
2. **Brak danych osobowych** — tylko sygnały sektorowe.
3. **Jeśli wskazanie przeszkadza** — wyłączamy sektor lub cały pilotaż. Bez tłumaczenia się technologią.
4. **Pole wygrywa** — jeśli coś nie działa pod presją, wraca do szkicu, nie do slajdów.

---

## 11. Proponowany następny krok

1. **Krótka rozmowa** (30 min) lub **wizyta na miejscu** — bez prezentacji, z kartką i ołówkiem.
2. **Wspólny szkic** 2–3 sektorów i punktów obserwacji.
3. **Ustalenie jednej zmiany** pilotażowej — kto patrzy na ekran, kto na radio.
4. **Po evencie:** 30 min debrief + scorecard — „pomogło / nie pomogło / co poprawić”.

---

## Załącznik A — propozycja maila odpowiedzi (do wysłania lub edycji)

**Temat:** LiveMesh — więcej informacji przed pilotażem

Dzień dobry Panie Marcinie,

Dziękuję za wiadomość i za zainteresowanie tematem.

W skrócie: **LiveMesh nie odpowiada na pytanie „co się dzieje?”, tylko pomaga wskazać, gdzie warto skierować uwagę** — gdy pole jest duże, radio szumi, a patrol jest rozciągnięty. **Decyzje zawsze zostają po Pańskiej stronie i po stronie ratowników.**

**Skąd biorą się sygnały:** z **punktów obserwacji** ustawionych na terenie (telefony we wyznaczonych miejscach, nie w kieszeni). Każdy punkt patrzy na swój sektor i wysyła **zagregowane, anonimowe** informacje o poziomie hałasu i zagęszczeniu w strefie — **bez identyfikacji osób**, bez nagrań rozmów.

**Co proponuję dalej:** krótki pilotaż na **2–3 sektorach** — najpierw wspólny **szkic terenu** (gdzie sektory, gdzie punkty, kto reaguje), potem jedna zmiana pod presją czasu. Po evencie — krótki debrief i podsumowanie liczbowe (bez danych osobowych), żebyśmy wiedzieli, czy to **pomaga**, czy **przeszkadza**.

W załączeniu / pod linkiem jest jednostronicowy opis operacyjny (bez technologii na start).

Czy byłby Pan dostępny na 30 minut — rozmowa lub przejście po polu z kartką?

Pozdrawiam serdecznie,  
Adam Domański

---

## Załącznik B — pytania do Marcina na spotkaniu (5 minut)

1. Które **2–3 miejsca** na polu są dziś najtrudniejsze do „ogarnięcia” wzrokiem?
2. Czy wskazanie typu **„sprawdź sektor B1”** jest dla Państwa **zrozumiałe**, czy wolicie inne nazwy (np. Wasze strefy operacyjne)?
3. Kto na zmianie **patrzy na ekran**, a kto **zostaje przy radiu**?
4. Co byłoby dla Państwa **sukcesem** po jednym wieczorze testu?
5. Co byłoby **absolutnym „nie”** — kiedy system powinien być wyłączony?

---

*Dokument operacyjny — nie specyfikacja techniczna. Szczegóły inżynieryjne: repo `polandrock-livemesh`, `docs/RATOWNIK.md`, `docs/ETAP_2_CHECKLIST.md`.*
