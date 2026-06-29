# Produkt vs laboratorium

**Pytanie:** Co jest produktem, a co laboratorium?

Eksperymenty zostają w repozytorium. **Domyślna ścieżka użytkownika** to tylko rdzeń.

---

## Rdzeń produktu (1.0)

Rzeczy, które pomagają człowiekowi **tu i teraz**:

| Działanie | Gdzie |
|-----------|--------|
| 🎤 Nagraj obserwację | `/`, `/field/heat` |
| 📍 Znajdź wodę i cień | `/field/heat` |
| Proste potwierdzenie zgłoszenia | po wysyłce / L1 |
| Jeden kolejny krok | CTA, nie menu |

**Kod (orientacja):** `frontend/app/components/field/*`, `frontend/lib/field/*`, `CitizenTrace`, `TraceReceiptPanel`, `traceViewModel` (L1).

**Test jutro:** usuń z domyślnej ścieżki narrację „sygnały”, chmurę, Living Interface, animacje — czy użytkownik nadal znajdzie wodę, nagra obserwację i wyśle zgłoszenie? **Tak** → te elementy nie należą do rdzenia.

---

## Laboratorium (nie produkt 1.0)

Wartościowe eksperymenty — **nie muszą być widoczne** dla użytkownika terenowego:

| Obszar | Przykłady |
|--------|-----------|
| Narracja | „Miasto reaguje na sygnały.” |
| Estetyka | chmura ambient, `LivingSignalText`, `SignalFieldEngine` |
| Studio | `LivingInterface`, pipeline, `patternEngine`, pełny FOP jako scenariusz |
| Analityka | klasyfikacja sygnałów, model świata, interference graph |

**Wejście lab:** `/?legacy=1` · `SignalFieldProvider` · `fira/` · strony studia / deliberation / artefaktów.

Nie wyrzucamy — oznaczamy i **nie rozwijamy** bez dowodu z terenu, że rdzeń tego wymaga.

---

## Ślad ≠ funkcja

**Otwarte nagranie ma sens właśnie dlatego**, że rzeczywistość nie mieści się w słowniku upału.

| Przykład | Rozdział 1 |
|----------|------------|
| *„Widziałem dziś jajko.”* | zapis audio + czas + miejsce + ślad |
| *„Przed Dzielną 3A hulajnoga na chodniku — uważajcie.”* | to samo — **bez** kategorii „przeszkoda na chodniku” |

| Tak | Nie (bez obserwacji z pola) |
|-----|------------------------------|
| przyjąć zgłoszenie; nagranie, czas, miejsce, ślad | klasyfikować, grupować, budować model kategorii w UI |

Nie każdy ślad musi zamienić się w funkcję. **Kategorie to materiał do obserwacji** — dopiero gdy np. 30 z 100 nagrań dotyczy przeszkód na chodniku, macie argument na lepszą obsługę. Nie wcześniej.

Interfejs zostaje prosty: **🎤 Nagraj obserwację.** To mieszkańcy swoimi zgłoszeniami pokazują, jakiego miasta doświadczają — nie lista funkcji z biurka.

---

## Ewolucja kategorii (nie lista kategorii)

Chodzi nie o **kategorie**, lecz o **ewolucję kategorii** — subtelna, ale fundamentalna różnica.

> **Każda nowa kategoria musi mieć źródło w powtarzających się obserwacjach, a nie w pojedynczym pomyśle projektowym.**

Użytkownik słyszy tylko: **„Co widzisz?”** — nie *„Wybierz kategorię”*.  
Miasto nie przychodzi z listą problemów; **mieszkańcy ją tworzą**. WARSZAWASZA **odkrywa słownik**, nie narzuca go od pierwszego dnia.

| Etap | Co to znaczy |
|------|----------------|
| **1 zgłoszenie** | ślad (hulajnoga, jajko, zapach asfaltu — *ziarno danych*, nie kategoria) |
| **~10 podobnych** | hipoteza w analizie |
| **~100 podobnych** | kandydat na kategorię |
| **Decyzja zespołu** | dopiero wtedy: czy warto kategorię wprowadzić (najpierw analiza, potem ewentualnie UI) |

Po zebraniu tysięcy nagrań analiza może pokazać **motywy** (tylko w analizie, nie w formularzu):

| Motyw (analiza) | Przykład liczby |
|-----------------|-----------------|
| Przeszkody na chodniku | 384 |
| Brak cienia | 271 |
| Niedziałające źródła wody | 146 |

Dopiero wtedy pytanie: *czy warto stworzyć kategorię?* — nie wcześniej.

> **Kategorie są odkrywane, a nie projektowane.**

Najpierw rzeczywistość → obserwacja → analiza → **dopiero na końcu** struktura (jak w języku: ludzie mówią, potem słowo trafia do słownika — nie odwrotnie).

**Nie** dodawać kategorii automatycznie w interfejsie. **Najpierw** w analizie zgromadzonych nagrań.

```
🎤 Co widzisz?  →  surowe ślady  →  analiza  →  wzorce  →  decyzja o kategorii
```

**Przykład hulajnoga:** pierwsze zgłoszenie → tylko ślad. Setki podobnych motywów → kategoria *Przeszkody na chodniku* wyłoniła się z danych.

*(Typy obserwacji z nagrań ≠ słownik wdrożenia — hydranty, punkty wody to dane terenu.)*

---

## Filtr decyzji

> **Czy to pomaga człowiekowi podjąć lepszą decyzję?**

Najpierw pytanie o **potrzebę**, potem o implementację.

Powiązane: [`project.md`](../project.md) · [`field-first-release.md`](field-first-release.md)
