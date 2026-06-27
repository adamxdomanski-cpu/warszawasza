# Miejski Operator

> **Operator sygnału miejskiego** — nie analityk miasta, nie urbanista, nie projektant UX.  
> Spec: `fira/PROTOCOL.md` · filtr warstw: `docs/protocol/layers-spec-85233.md`

---

## Jedno zdanie

**Miejski Operator** filtruje rzeczywistość miejską: **oddziela sygnał od szumu** i buduje narzędzia, dzięki którym kolejna decyzja opiera się na tym, co da się obronić — nie na tym, co głośniejsze.

---

## Czym **nie** jest fundamentem

| Sformułowanie | Dlaczego słabe jako tożsamość |
|---------------|-------------------------------|
| „Miasto jako system” | Wspólne dla urbanistyki, GIS, cybernetyki od dekad — **tło**, nie wyróżnik |
| „Łączy analitykę z wrażliwością projektową” | Opis tysięcy projektantów — **nie definiuje** nic unikalnego |
| Metafory bez metody | „Rytmy”, „organizm”, „ekosystem” bez filtra → **język**, nie narzędzie |

**Fundament:** metodologia **redukcji szumu i wydobycia sygnału** — reszta jest implementacją.

---

## Czym różni się od innych ról

| Rola | Typowe pytanie | Miejski Operator |
|------|----------------|------------------|
| **Analityk danych** | Co mówią metryki? | Czy ta metryka **nie jest szumem**? Czy ma konsekwencję dla decyzji? |
| **Urbanista** | Jak zaplanować przestrzeń? | Co **w terenie** da się zapisać i oddzielić od interpretacji (Layer 0)? |
| **Projektant UX** | Jak ułatwić zadanie? | Czy każdy element UI przechodzi test: **co z tego wynika?** (T/F) |
| **Miejski Operator** | Co jest sygnałem, a co szumem? | **Filtr + zapis + audyt** — protokół, nie dashboard |

Operator **nie zbiera więcej danych**. Operator **tnie to, co nie niesie konsekwencji**, i utrwala resztę w formie audytowalnej.

---

## Metoda (operacyjna, nie metaforyczna)

```
Pole / strumień → Zapis (FOP) → Filtr szumu → Łańcuch weryfikacji → Decyzja człowieka
```

| Krok | Narzędzie w projekcie | Efekt |
|------|----------------------|--------|
| **Filtr wejścia** | Bramka T/F na `/` | Użytkownik wybiera trajektorię, nie „poprawną odpowiedź” |
| **Redukcja w UI** | Pipeline glifów, Low Entropy | Mniej elementów, każdy z konsekwencją |
| **Oddzielenie sygnału od narracji** | Layer 0 (fakt) ≠ Layer 1 (jakość/sensory) | Brak fałszywego „system zweryfikował” |
| **Łańcuch L0** | L0.1–L0.4 (obecność, camera, integralność, consensus) | Sygnał terenowy ≠ opinia z biurka |
| **Audyt** | SQL, log PROCESS = stan obserwowalny | Twierdzenia da się falsyfikować |

Kanoniczna zasada FOP: *The system remembers. Humans decide.* — operator **nie decyduje za człowieka**; przygotowuje **oczyszczony sygnał** do decyzji.

---

## Epistemologia: relacje, nie obiekty

Większość patrzy na **obiekty** (metro, most, koszulka, strona).  
Operator patrzy na **relacje** (przepływ między stacjami, most ↔ dzielnice, koszulka ↔ tożsamość miejsca, UI ↔ zachowanie).

To już widać w notacji projektu — nie lista punktów, lecz łańcuch:

```
PLACE → SIGNAL → FLOW → TRAJECTORY
```

oraz w grafie obywatelskim (SQL 012): **węzły + krawędzie**, nie same węzły.

---

## Pułapka: nazwa przed obserwacją

Naturalna pokusa: **nazwać system**, zanim wszystkie obserwacje potwierdzą, że do niego należą.

| Źle (teoria-first) | Dobrze (obserwacja-first) |
|--------------------|---------------------------|
| „To jest Layer X, więc tu pasuje” | Zbierz ślady → szukaj **najmniejszej reguły**, która wyjaśnia jak najwięcej |
| Model = tożsamość | Model = **hipoteza** |
| Nowy sygnał zagraża projektowi | Nowy sygnał **ulepsza lub obala** hipotezę |

**Metoda operatora** (filtr sygnał/szum) jest stabilna.  
**Modele** (FIRA, warstwy 85233, nazwy dzielnic, nawet COP v1.0) są **hipotezami do falsyfikacji**.

Pierwsza zasada (Feynman): **nie oszukiwać samego siebie** — gotowość porzucić najlepszy pomysł, gdy kolejna obserwacja mu przeczy. W repo: dual status śladu, Layer 8 (potok ✓ ≠ fakt ✓), krytyka kolapsalna persony v1→v3.

---

## Jedno pytanie kolapsalne

> **Jaka decyzja stanie się lepsza dzięki istnieniu Miejskiego Operatora?**

| Odpowiedź (słaba) | Dlaczego fail |
|-------------------|---------------|
| „Lepiej zrozumiemy miasto” | Nieobserwowalna, niefalsyfikowalna |

| Odpowiedź (silna) | Przykład w WARSZAWASZA |
|-------------------|------------------------|
| **Odróżnimy sygnał od szumu przed działaniem** | T/F + odrzucenie elementu UI bez konsekwencji |
| **Nie uznamy narracji za fakt terenowy** | Dual status śladu (#125750): pipeline ≠ terrain |
| **Nie uznamy produktu za weryfikację Layer 0** | `/market` activate — disclaimer w API |
| **Zapiszemy zmianę zanim zginie w szumie** | Trace short ID, FOP artefakt, SQL 010 |
| **Wykryjemy fałszywą „pewność” systemu** | Layer 8 lustro: potok ✓ ≠ fakt ✓ |

Decyzja nie musi być „policyjna” ani urzędowa. Wystarczy: *czy idę dalej w tej trajektorii, czy odrzucam jako szum?*

---

## Co tworzy (dowód metody, nie CV)

| Artefakt | Co filtruje |
|----------|-------------|
| `fira/PROTOCOL.md` | Język obserwacji vs werdykt |
| `frontend/` — ObservationGate, pipeline | Szum wizualny i poznawczy |
| Spec 85233 + SQL 010–015 | Fałszywa weryfikacja, mieszanie warstw |
| `docs/protocol/log-format-v1.md` | Narracja PROCESS bez dowodu |

WARSZAWASZA (marka, studio, dzielnice) = **nośnik i kontekst sygnału**, nie rdzeń metody.

---

## Dla kogo

- **Obserwator w polu** — zapis bez urzędu  
- **Twórca civic tech** — protokół audytowalny w repo  
- **Projektant** — wzorzec filtra T/F, nie „ładny dashboard”  

---

## Kiedy metoda działa / zawodzi

**Działa**, gdy:

- Da się wskazać, **co zostało odrzucone jako szum** (element UI, claim, warstwa)  
- Decyzja następnego kroku jest **jaśniejsza niż przed filtrem**  
- Dowód: plik, commit, curl — nie sam opis  

**Zawodzi**, gdy:

- Opis br brzmi jak smart city / portfolio designer  
- Metryki rosną bez spadku szumu  
- Layer 1 lub marketing udaje Layer 0  

---

## Blok kontekstu dla AI

```markdown
Miejski Operator = urban SIGNAL operator, not city analyst.
Core method: reduce noise, extract defensible signal, then human decides.
Differentiators: T/F filter, Layer 0 ≠ Layer 1, auditable FOP/COP, no decorative UI.
Collapse test: name the DECISION that improves — not "understand city better".
Do not use "city as system" as identity; use signal/noise methodology.
Evidence: repo paths, build, curl. Smallest diff.
```

---

## Historia wersji

| Wersja | Problem |
|--------|---------|
| v1 | Persona-szeroka, deklaracje bez dowodów |
| v2 | Warstwy, odbiorca, falsyfikacja — nadal zbyt blisko „obserwacji miasta” |
| **v3** | Oś: **operator sygnału** + decyzja, która się poprawia |
| **v3.1** | Epistemologia: **relacje > obiekty**; modele = hipotezy, metoda = filtr |

---

*Metoda, nie manifest kompetencji · modele, nie tożsamość*
