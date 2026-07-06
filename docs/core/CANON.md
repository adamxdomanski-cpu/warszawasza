# WARSZAWASZA Canon

> **Każdy dokument jest hipotezą do momentu pierwszej obserwacji.**

**Wysoki próg:** nowa zasada trafia do kanonu tylko, gdy jest uniwersalna, potwierdzona przez rzeczywistość (nie tylko rozsądna) i zmienia sposób pracy (nie tylko opisuje obserwację). Kanon to fundamenty — nie kronika doświadczeń.

## Indeks zasad

```
FUNDAMENT
---------
01. Rzeczywistość jest arbitrem.

ARCHITEKTURA
------------
02. Gramatyka ustabilizowana; dystrybucja i punkty wejścia — zmienne.
03. Jedno znaczenie — wiele nośników; tekst jest źródłem prawdy.
04. Kaskada: Rzeczywistość → Znaczenie → Zadanie? → Gramatyka → Nośnik.
05. Nośnik wymienny; znaczenie i gramatyka — dopóki rzeczywistość nie wskaże inaczej.

ROZWÓJ
------
06. Zasada walidacji projektu → zasada-walidacji-projektu.md
07. Rozwijaj słownik częściej niż gramatykę.
08. Zmieniaj gramatykę tylko, gdy rzeczywistość wielokrotnie to uzasadni.

DANE
----
09. Zbieraj tylko informacje z konkretną wartością dla człowieka lub systemu.

PRYWATNOŚĆ
----------
10. Człowiek wie, jakie dane przekazuje, po co i komu.

INTEGRALNOŚĆ ZADANIA
--------------------
11. Interfejs pomaga wykonać aktualne zadanie.
12. Każdy element wnosi mierzalną wartość do zadania.
13. Brak pogorszenia po usunięciu = element nie powinien istnieć.

FILTRY
------
14. Przed zmianą: słownik czy gramatyka? · mniej czy więcej informacji? · zniknięcie elementu pogorszy zadanie?

DYSCYPLINA
----------
15. Projektujemy znaczenia, nie tłumaczenia.
16. Gramatyka > scenariusze; rozmowa > dokument.
17. Minimum informacji, maksimum zrozumienia.
18. Interfejs pokazuje wyłącznie dostępne możliwości.
19. Propagacja przekazu → tomek-lancuch-odpowiedzialnosci.md (outreach, ilustracja)

DOŚWIADCZENIE
-------------
20. Kartka debriefu → debrief.md

KANON PRACY
-----------
21. Heurystyka następnego kroku → heurystyki.md (kolejność myślenia; nie odpowiedzi)
22. Lejek projektowy → project-funnel.md
23. Decision Review System → decision-review-system.md

DECISION ENGINE → EVIDENCE PIPELINE (warsztat/)
-----------------------------------------------
24. Kontrakt architektury → decision-engine-architecture.md · warsztat/CANON.md · @decision-engine-architecture
25. Aksjomat trwałości → decision-engine-architecture.md#aksjomat-trwałości
26. Hierarchia zależności: Rzeczywistość → Zasady → Architektura → Implementacja → Technologia
27. v1.0 poznanie: Observation → Evidence → Assessment → Operator (nie Decision → Action)
28. Aksjomat jednego silnika — profil, nie repo
29. Silnik nie decyduje
30. Zachowanie informacji (traceability)
31. Odwracalność poznawcza
32. Milczenie jest wynikiem

HEURYSTYKA (archiwum nazwy)
----------------------------
→ heurystyka-nastepnego-kroku.md — przekierowanie do heurystyki.md
```

---

## Fundament

Rzeczywistość jest jedynym arbitrem.

## Architektura

Gramatyka jest ustabilizowana.

Dystrybucja i punkty wejścia są zmienne.

Jedno znaczenie może być przekazywane wieloma nośnikami. Nośnik nie zmienia
znaczenia. Tekst pozostaje źródłem prawdy; inne nośniki pomagają człowiekowi
szybciej je zrozumieć w konkretnym kontekście rzeczywistości.

Kaskada pochodzenia. Zadanie nie jest bytem obowiązkowym — jest decyzją
wynikającą z charakteru znaczenia:

```
Rzeczywistość → Znaczenie
                   │
          Czy istnieje zadanie?
             TAK  │  NIE
              ▼   │   ▼
          Zadanie │  Gramatyka → Nośnik
              ▼
          Gramatyka → Nośnik
```

Gramatyka nie istnieje sama dla siebie — służy przekazowi znaczenia albo
wykonaniu zadania, zależnie od kontekstu.

Nośnik jest wymienny. Znaczenie i gramatyka pozostają ustabilizowane, dopóki
rzeczywistość nie wykaże konieczności ich zmiany.

## Rozwój

Rozwijaj słownik częściej niż gramatykę.

Zmieniaj gramatykę wyłącznie wtedy, gdy rzeczywistość wielokrotnie pokaże, że obecna utrudnia wykonanie zadania.

Zasada walidacji: [`zasada-walidacji-projektu.md`](zasada-walidacji-projektu.md)

## Dane

Zbieraj tylko informacje, z których wynika konkretna wartość dla człowieka lub działania systemu.

## Prywatność

Człowiek zawsze wie, jakie dane przekazuje, po co i komu.

## Integralność zadania

Dotyczy interfejsów, w których użytkownik wykonuje konkretne zadanie (nie
dotyczy np. manifestu bez kroku operacyjnego).

Interfejs istnieje wyłącznie po to, aby pomóc użytkownikowi wykonać jego aktualne
zadanie.

Każdy element interfejsu musi wnosić mierzalną wartość do realizacji tego
zadania.

Jeżeli usunięcie elementu nie pogarsza możliwości wykonania zadania, element
nie powinien istnieć.

## Filtry

Przed każdą zmianą zadaj trzy pytania:

1. Czy rozszerzam słownik, czy zmieniam gramatykę?
2. Czy ta zmiana zmniejsza czy zwiększa ilość informacji, których naprawdę potrzebujemy?
3. Gdy jest zadanie operacyjne: gdyby ten element zniknął jutro — czy użytkownik gorzej by je wykonał?

## Dyscyplina

Zasady decyzji projektowych:

- Projektujemy znaczenia, nie tłumaczenia.
- Gramatyka jest ważniejsza niż scenariusze.
- Rozmowa jest ważniejsza niż dokument.
- Minimum informacji, maksimum zrozumienia.
- Interfejs pokazuje wyłącznie dostępne możliwości.
- Projekt jest gotowy do rozmów wtedy, gdy każda kolejna osoba potrafi opowiedzieć go własnymi słowami, zachowując jego sens (test kaskadowy — hipoteza w outreach).

Każda zmiana powinna sprawić, że człowiek szybciej zrozumie, co może zrobić, a nie szybciej zobaczy, co potrafi system.

Outreach (ilustracje, nie kanon): [`../outreach/tomek-lancuch-odpowiedzialnosci.md`](../outreach/tomek-lancuch-odpowiedzialnosci.md) · [`../outreach/orkiestracja-kart.md`](../outreach/orkiestracja-kart.md)  
Heurystyka 0.1: [`heurystyka-nastepnego-kroku.md`](heurystyka-nastepnego-kroku.md) — **do weryfikacji**
