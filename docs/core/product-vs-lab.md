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

## Kategorie są odkrywane, a nie projektowane

> **Kategorie są odkrywane, a nie projektowane.**

Najpierw rzeczywistość → obserwacja → analiza → **dopiero na końcu** struktura (jak w języku: ludzie mówią, potem słowo trafia do słownika — nie odwrotnie).

**Nie** dodawać kategorii automatycznie w interfejsie. **Najpierw** w analizie zgromadzonych nagrań.

```
🎤 Nagraj obserwację
        │
        ▼
Surowe nagrania
        │
        ▼
Analiza zgłoszeń
        │
        ▼
Wzorce
        │
        ▼
Decyzja: czy potrzebna nowa kategoria?
        │
        ▼
(dopiero wtedy — UI / słownik obserwacji)
```

**Przykład hulajnoga:** pierwsze zgłoszenie *„hulajnoga na chodniku”* → nic w UI. Po miesiącu: 37× hulajnogi, 19× gałęzie, 12× worki → **dopiero wtedy** decyzja: kategoria *Przeszkody na chodniku* — bo wyłoniła się z danych, nie z biurka.

Rola WARSZAWASZA: **usłyszeć** miasto i uporządkować — nie zakładać z góry 25 kategorii, z których 20 nigdy nie będzie użytych.

*(To dotyczy **typów obserwacji** z nagrań. Słownik wdrożenia — hydranty, punkty wody — to dane terenu, nie menu kategorii dla użytkownika.)*

---

## Filtr decyzji

> **Czy to pomaga człowiekowi podjąć lepszą decyzję?**

Najpierw pytanie o **potrzebę**, potem o implementację.

Powiązane: [`project.md`](../project.md) · [`field-first-release.md`](field-first-release.md)
