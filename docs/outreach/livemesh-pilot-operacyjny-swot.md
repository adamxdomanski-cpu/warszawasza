# Pilotaż operacyjny — instrukcja (wersja 0.3)

**Dla:** Tomek Karwowski, zespół prowadzący test  
**Zacznij od:** [`livemesh-propozycja-pilotazu.md`](livemesh-propozycja-pilotazu.md) (~2 min)  
**Data:** lipiec 2026

---

# 1. DLACZEGO

## Jedno pytanie

Czy kilka punktów obserwacji w stałych miejscach pomaga **jednemu operatorowi** szybciej wskazać, **który fragment pola wymaga uwagi**?

To test **metody pracy**. Telefon jest narzędziem — bo już go mamy, bez zakupu sprzętu.

**Wynik dla prowadzącego pilotaż:** albo masz podstawę do kolejnego kroku, albo uczciwe „zamykamy” — oba są dobre.

---

## Dlaczego zaczynamy od naszego zespołu

- znamy się i pracujemy razem,
- poruszamy się po terenie wydarzenia,
- możemy poprawiać sposób działania na bieżąco.

**Wynik dla prowadzącego:** pierwsze wnioski bez angażowania Pokojowego Patrolu. Do Marcina idziemy z obserwacjami — nie z koncepcją.

---

## Dlaczego nie od razu cały festiwal

| | |
|---|---|
| **Czas** | Jeden wieczór lub jedna zmiana |
| **Teren** | 2–3 sektory |
| **Wyjście** | Test można przerwać w dowolnym momencie |

**Wynik dla prowadzącego:** niskie ryzyko dla wydarzenia. Wniosek dotyczy wąskiego fragmentu pola — nie całego Pol’and’Rock.

---

# 2. CO ROBIMY

## EPIC-001 — walidacja pilotażu

**Cel:** sprawdzić, czy metoda orientacji sektorowej wnosi wartość operacyjną.

```
STORY-01  Wyznaczyć sektory
STORY-02  Ustawić punkty obserwacji
STORY-03  Przeprowadzić test (jedna zmiana)
STORY-04  Debrief i decyzja STOP / ITERACJA
```

**Wynik dla prowadzącego:** cztery kroki, cztery momenty „done” — bez rozlewania zakresu.

---

## Co z tego ma osoba decyzyjna (Tomek)

| Co robimy | Co z tego masz |
|-----------|----------------|
| 2–3 telefony z zespołu | Nie kupujesz sprzętu |
| Jeden operator | Nie szkolisz całej załogi |
| Jeden wieczór | Wynik następnego dnia |
| Test można przerwać | Nie ryzykujesz całego eventu |
| Najpierw nasz zespół | Patrol nie jest poligonem |
| Ustawienie po naszej stronie | Zespół w zmianie tego nie obsługuje |

**Wynik dla prowadzącego:** wiesz, co powiedzieć osobie, która liczy koszt czasu ludzi — nie tylko „0 zł za telefony”.

---

# 3. KTO CO ROBI

| Kto | Robi | Nie robi |
|-----|------|----------|
| **Zespół twórców** | Ustawia punkty przed zmianą, ekran operatora, obecność przy starcie, podsumowanie po teście | Nie zastępuje sztabu festiwalu |
| **Operator (wyznaczony)** | Patrzy na ekran, mówi: „sprawdź sektor …” | Nie wydaje rozkazów medycznych |
| **Patrol** | Decyduje w terenie, radio, procedury jak dotąd | Nie obsługuje telefonów w akcji |
| **Tomek** | Ocenia, czy eksperyment ma sens; czy iść dalej | Nie organizuje testu w terenie |
| **Marcin / Patrol** | Dopiero po naszym teście — jeśli w ogóle | Nie jest poligonem na start |

**Wynik dla prowadzącego:** przed zmianą wiesz, kogo do kogo z adresatem problemu.

---

# 4. CO POTRZEBA

## Sprzęt i zasoby

| Potrzebne | Skąd | Koszt |
|-----------|------|-------|
| 2–3 telefony w punktach | Z zasobów zespołu | 0 zł |
| Zasilanie (powerbank / prąd) | Przy ustawieniu | Niski |
| 1 ekran dla operatora | Po stronie zespołu twórców na pilotaż | Po naszej stronie |
| Kartka z szkicem sektorów | — | 0 zł |

Telefony **po ustawieniu działają samodzielnie**. Zespół w trakcie zmiany **nie musi ich obsługiwać**.

## Koszt prawdziwy (czas)

- operator przy ekranie (jedna zmiana),
- ustawienie przed startem,
- ~30 min debrief po teście.

**Wynik dla prowadzącego:** budżet liczysz w godzinach ludzi — nie tylko w sprzęcie.

---

## Ryzyka — krótko

| Ryzyko | Co robimy |
|--------|-----------|
| GSM pada | Ekran może pokazać „brak danych” — to nie znaczy „spokój”. Test można przerwać. |
| Zasilanie | Ustalamy przy ustawieniu — my. |
| „Ekran milczy = OK” | Ustalamy w debriefu — to błąd interpretacji. |
| Zbyt duże oczekiwania | Pilotaż ≠ wdrożenie na całe pole. |

**Wynik dla prowadzącego:** wiesz, co powiedzieć zespołowi, zanim włączysz ekran.

---

# 5. JAK WYGLĄDA TEST

## Schemat pola

```
         OBSERWACJA W TERENIE
              A1  B1  C1
                   │
         informacja z sektorów
                   │
            wspólny obraz
                   │
           operator ocenia
                   │
           decyzja człowieka
                   │
      patrol / radio / procedury

──────────────────────────────
Nie decyduje · nie diagnozuje · nie zastępuje
Pomaga zobaczyć, gdzie warto spojrzeć
──────────────────────────────
```

---

## STORY-01 — Wyznaczyć sektory

- Kartka, ~30 minut wspólnie.
- 2–3 fragmenty pola — **nazwy operacyjne zespołu**.
- Wiadomo, który patrol reaguje na który sektor.

**Done when:**

- [ ] istnieją 3 sektory (lub 2 — jeśli tak ustalicie),
- [ ] mają nazwy,
- [ ] wiadomo, kto odpowiada.

**Wynik dla prowadzącego:** bez szkicu nie startujecie.

---

## STORY-02 — Ustawić punkty obserwacji

- Po jednym telefonie na sektor, w stałym miejscu.
- Nie w kieszeni ratownika.
- Zasilanie podłączone przed zmianą.

**Done when:**

- [ ] telefony stoją,
- [ ] zasilanie działa,
- [ ] operator widzi dane na ekranie.

**Wynik dla prowadzącego:** patrol wchodzi w zmianę — punkty już działają.

---

## STORY-03 — Przeprowadzić test

1. Operator patrzy na ekran.
2. Jeśli sektor wymaga uwagi: **„Sprawdź sektor B.”** — i tyle.
3. Patrol robi to, co zawsze.

Przy słabym GSM: **brak danych ≠ brak problemu**.

**Done when:**

- [ ] jedna zmiana zakończona,
- [ ] operator korzystał z ekranu,
- [ ] patrol pracował normalnie.

**Wynik dla prowadzącego:** jedna zmiana, jeden wieczór — koniec testu, nie kontynuacja „bo może coś się jeszcze wydarzy”.

---

## STORY-04 — Debrief

30 minut. Pytania:

- Czy wskazania były zrozumiałe?
- Czy pomagały?
- Czy przeszkadzały?
- Czy użyłbyś tego drugi raz?

**Done when:**

- [ ] zapisane: co działało, co przeszkadzało,
- [ ] decyzja: **STOP** lub **ITERACJA** (kolejny test z poprawkami).

**Wynik dla prowadzącego:** następnego dnia wiesz, czy idziecie do Marcina — czy zamykacie.

---

# 6. JAK OCENIMY WYNIK

## Sukces (większość „tak”)

- [ ] Operator rozumiał wskazania.
- [ ] Patrol rozumiał komunikaty.
- [ ] Wskazania były pomocne.
- [ ] Test nie przeszkadzał.
- [ ] Bez szkolenia całej załogi.
- [ ] Powtórzylibyście **albo** wiecie dlaczego nie.

**Sukces ≠ wdrożenie na cały festiwal.**

**Wynik dla prowadzącego:** masz argument „idziemy dalej” albo „poprawiamy i powtarzamy” — nie „wdrażamy wszędzie”.

---

## Niepowodzenie (choć jedno)

- [ ] Operator ignorował ekran.
- [ ] Wskazania niezrozumiałe lub mylące.
- [ ] Test rozpraszał ludzi.
- [ ] Utrzymanie punktów > korzyść.
- [ ] Zespół: „nie wnosi wartości”.
- [ ] „Nie pokazało = było OK” — bez korekty w debriefu.

**Niepowodzenie też jest wynikiem.**

**Wynik dla prowadzącego:** masz pozwolenie, żeby zamknąć — bez tłumaczenia się technologią.

---

## SWOT pilotażu (skrót)

Każdy wiersz: **co to znaczy dla osoby decyzyjnej**.

### Mocne

| | Dla decydenta |
|---|---------------|
| Niski koszt sprzętu | Bez budżetu na start |
| 1 operator, 2–3 punkty | Bez przebudowy organizacji |
| Łatwo przerwać | Bez ryzyka całego eventu |
| Test na nas przed Patrolem | Marcin nie jest poligonem |

### Słabe

| | Dla decydenta |
|---|---------------|
| GSM na evencie | Opóźnienia lub przerwanie testu |
| Zasilanie punktów | Ustalone przy ustawieniu — my |
| Tylko 2–3 sektory | Wąski wniosek — świadomie |
| Pierwszy raz | Bez historii z poprzednich edycji |

### Szanse (po „tak” — osobna decyzja)

| | Dla decydenta |
|---|---------------|
| Więcej sektorów | Skalowanie dopiero po teście |
| Osobne telefony festiwalowe | Bez prywatnych urządzeń |
| Wnioski przed Marcinem | Rozmowa z terenu, nie ze slajdów |

### Zagrożenia

| | Dla decydenta |
|---|---------------|
| GSM pada | Mało danych — też wynik |
| Ekran jako „wyrocznia” | Wyłączamy, jeśli przeszkadza |
| Rozszerzanie na inne zespoły przed testem | Nie robimy |

**Wynik dla prowadzącego:** SWOT służy decyzji o **eksperymencie** — nie o „produkcie”.

---

## Plan po teście

```
Test na naszym zespole
        ↓
Omówienie z Tomkiem
        ↓
Marcin / Patrol — tylko jeśli ITERACJA ma sens
        ↓
z obserwacjami, nie z koncepcją
```

---

# Załączniki

## Mail do Tomka

**Temat:** Propozycja pilotażu — proszę o krytykę

**Załącznik:** [`livemesh-propozycja-pilotazu.md`](livemesh-propozycja-pilotazu.md) (zacznij od tego)

Treść maila jest w pierwszej stronie załącznika — list do Tomka na początku dokumentu. Wysyłasz plik, nie kopiujesz całości do body.

Krótko w body wystarczy:

> Master — w załączniku propozycja małego testu. Zacznij od pierwszej strony (list). Jak coś nie gra — powiedz wprost. Pozdro, Adam

---

## Powiązane dokumenty

| Warstwa | Plik |
|---------|------|
| 1 strona · 2 min | [`livemesh-propozycja-pilotazu.md`](livemesh-propozycja-pilotazu.md) |
| Instrukcja operacyjna | ten dokument |
| Granice zakresu | [`livemesh-pilot-manifest.md`](livemesh-pilot-manifest.md) |
| Marcin (po teście) | [`marcin-garczynski-livemesh-brief.md`](marcin-garczynski-livemesh-brief.md) |
| Specyfikacja techniczna | na żądanie (`polandrock-livemesh`) |

---

## Notatka redakcyjna (wewnętrzna)

Miejsca, gdzie nadal przebija język twórcy — do dalszego cięcia przy kolejnej wersji:

| Miejsce | Problem | Propozycja |
|---------|---------|------------|
| „EPIC / STORY” | Język narzędzi projektowych, nie sztabu | Zostawić jako checklistę „krok 1–4” w PDF dla Tomka; w rozmowie mówić „cztery kroki” |
| „walidacja pilotażu” | Brzmi jak produkt IT | „sprawdzenie, czy metoda ma sens” |
| „operator widzi dane” | Architekt | „operator widzi, który sektor wymaga uwagi” |
| „informacja z sektorów” | Nadal abstrakcyjne | „porównanie tego, co dzieje się w A, B i C” |
| Schemat FIELD | Dobry — zostawić | — |
| Mail „eksperyment operacyjny” | Lekko akademickie | „mały test na naszym zespole” |
| Odniesienia do LiveMesh w stopce | Nazwa produktu | Max 1× na końcu dokumentu |

---

Celem testu nie jest udowodnienie, że coś działa. Celem jest sprawdzenie, czy metoda pracy pomaga ludziom w terenie — albo uczciwe zamknięcie.
