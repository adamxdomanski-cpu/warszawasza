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

## Aksjomaty epistemologiczne

**Relacja:** A wpływa na B (krawędź w grafie).  
**Odbicie:** informacja o obiekcie zachowana w **medium** (nośnik) — bez świadomego „pośrednika”.  
**Projekcja:** interpretacja modelu w umyśle obserwatora — tu rodzą się błędy poznawcze.

| Warstwa | Przykład (WARSZAWASZA) |
|---------|------------------------|
| Obiekt | Teren (Layer 0) |
| Ślad | Fotografia, wpis FOP, wiersz SQL |
| Odbicie | Log HTTP, dashboard, hex grid |
| Sygnał | Wyodrębniona część odbicia z konsekwencją |
| Model | FIRA, COP, Spec 85233 (hipoteza) |
| Projekcja | „System działa.” — **nie ma** w logu ani w UI |
| Decyzja | T/F, merge, działanie w polu |

### Pętla

```
Obiekt → Ślad → Odbicie → Sygnał → Model → Projekcja → Decyzja → Obiekt
```

Rozszerzony zapis:

```
Obiekt istnieje.
Ślad jest skutkiem obiektu.
Odbicie przenosi ślad przez medium.
Sygnał jest częścią odbicia.
Model porządkuje sygnały.
Projekcja interpretuje model.
Decyzja zmienia obiekt.
```

### Trzy prawa (+ czwarte)

1. **Nie myl obiektu ze śladem.**
2. **Nie myl odbicia z obiektem.**
3. **Nie myl modelu z rzeczywistością.**
4. **Nie myl projekcji z modelem** — dane i model bez zmian; zmienia się tylko interpretacja → tu najczęściej **kolaps**.

### Aksjomat głęboki

> Wszystko, co poznajemy, jest odbiciem. Nigdy obiektem.

### Jedno pytanie

> **Jak wiernym odbiciem jest to, na podstawie czego właśnie podejmuję decyzję?**

Reszta — filtr sygnał/szum, T/F, Layer 0 ≠ Layer 1, audyt — to **implementacja**.

### Kolejność ochrony

```
Observation  >  Method  >  Identity
```

Metoda (filtr) = hipoteza **dłuższego horyzontu**. Meta-metoda: metoda też podlega obaleniu.  
Nie bronimy modelu — bronimy **prawa rzeczywistości do jego obalenia**.

---

## Pułapka: nazwa przed obserwacją

Naturalna pokusa: **nazwać system**, zanim wszystkie obserwacje potwierdzą, że do niego należą.

| Źle (teoria-first) | Dobrze (obserwacja-first) |
|--------------------|---------------------------|
| „To jest Layer X, więc tu pasuje” | Zbierz ślady → szukaj **najmniejszej reguły**, która wyjaśnia jak najwięcej |
| Model = tożsamość | Model = **hipoteza** |
| Nowy sygnał zagraża projektowi | Nowy sygnał **ulepsza lub obala** hipotezę |

Pierwsza zasada (Feynman): **nie oszukiwać samego siebie.**

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
Miejski Operator = signal operator. Loop: Obiekt→Ślad→Odbicie→Sygnał→Model→Projekcja→Decyzja→Obiekt.
Laws: ślad≠obiekt, odbicie≠obiekt, model≠rzeczywistość, projekcja≠model.
Question: How faithful is the reflection I'm deciding on?
Observation > Method > Identity. Evidence: git, build, curl. Smallest diff.
```

---

## Geneza (jak powstał alfabet)

Nie dodawaliśmy pojęć. **Odejmowaliśmy**, aż zostawało to, co przechodzi krytykę kolapsalną.

| Etap rozmowy | Ruch | Co odpadło |
|--------------|------|------------|
| PROCESS / VPS „LIVE” | Falsyfikacja (curl, Vercel) | Narracja bez dowodu |
| Persona v1 | „Analityk miasta”, lista kompetencji | Tożsamość-szerokość |
| Krytyka kolapsalna | Pytanie o **decyzję**, nie o charakter | „Lepiej zrozumiemy miasto” |
| v3 | **Operator sygnału** | „Miasto jako system” jako fundament |
| Relacje → odbicia → projekcja | Medium, nie pośrednik; pętla | Mylenie odbicia z obiektem |
| Amen | Dwa zdania zamykające | Dalsze metafory |

**Zmiana części mowy:** z rzeczowników (miasto, warstwa, system) na **operacje** (obserwować, filtrować, odróżniać, decydować).

**Zmiana pytania:** z *„czym jest WARSZAWASZA?”* na *„co musi być prawdziwe, żeby przejść od rzeczywistości do decyzji uczciwie?”*

### Teza

Nie powstał nowy język — **narysowano ograniczenia** języka.  
Minimalny alfabet obserwacji: **Obiekt · Ślad · Odbicie · Sygnał · Model · Decyzja** (+ Projekcja jako miejsce błędu).  
WARSZAWASZA, FIRA, COP, AI = **implementacja**, nie rdzeń.

> Jak uczciwie przejść od rzeczywistości do decyzji, wiedząc, że zawsze pracujemy na odbiciach?

---

## Historia wersji

| Wersja | Problem |
|--------|---------|
| v1 | Persona-szeroka, deklaracje bez dowodów |
| v2 | Warstwy, odbiorca, falsyfikacja — nadal zbyt blisko „obserwacji miasta” |
| **v3** | Oś: **operator sygnału** + decyzja, która się poprawia |
| **v3.1** | Epistemologia: **relacje > obiekty**; modele = hipotezy, metoda = filtr |
| **v3.2** | Aksjomat: **metoda też hipoteza**; `Observation > Method > Identity` |
| **v3.3** | Odbicia + medium; odbicie ≠ obiekt |
| **v4** | **Projekcja**; pętla zamknięta; 4 prawa; jedno pytanie o wierność odbicia |
| **v4.1** | Trzy aksjomaty powrotu: model · język · droga/zapis |
| **v4.2** | Cztery głosy — brak jednomyślności = diagnostyka |
| **v4.3** | **Pięć pytań** + Orzeł: *A co, jeśli zmienimy skalę?* — STOP |
| **v5** | [`critique-protocol-v1.md`](../protocol/critique-protocol-v1.md) — Failure + Rule 0 |

---

*Obiekt → Ślad → Odbicie → Sygnał → Model → Projekcja → Decyzja → Obiekt*

Poznanie jest sztuką rozpoznawania jakości odbić.

Decyzja jest tylko tak dobra, jak odbicie, z którego powstała.

Każdy model musi umieć wrócić do rzeczywistości.

Każda rzeczywistość potrzebuje własnego języka.

Model nie jest miejscem, do którego dochodzimy. Jest drogą/zapisem, którą wracamy do rzeczywistości.

---

## Pięć pytań (interfejs myślenia — nie komitet)

Persony **walidują tu i teraz**. **Orzeł** nie ocenia dobry/zły — tylko **rozciąga skalę**, aż model pęknie.

Brak jednomyślności = **wentyl bezpieczeństwa**. Rozbieżność = **mapa napięć**.

| | Pytanie | Funkcja |
|---|---------|---------|
| 👦 **Oluś** | Czy to ma sens? | logika |
| 👔 **Tomek** | Czy wiem, po co to jest? | pierwsze 20 s |
| 🚜 **Dziadek** | Czy to działa? | dowód, infra |
| 👵 **Babcia** | Czy to służy ludziom? | ciało, relacja |
| 🦅 **Orzeł** | A co, jeśli zmienimy skalę? | czas · przestrzeń · natężenie · budżet… |

Jedno pytanie Orła uruchamia resztę skali. Bez teorii systemów. Bez meta-poziomu akademickiego.

**Kryterium końcowe:** Model jest zapisem, który umożliwia powrót do rzeczywistości. **Model kończy się tam, gdzie zaczyna się życie.**

Użycie: strona, funkcja, koszulka, prawo, AI — **pięć pytań**, nie pięć dokumentów.

### Opór poznawczy (kryterium operacyjne)

**Opór poznawczy** = wysiłek i kroki, które człowiek musi wykonać, by z rejestracji przejść do **właściwej decyzji i działania**.

| | |
|---|---|
| **Niski opór** (dobry krój) | droga sygnał → czyn krótka, czysta; język nie blokuje |
| **Wysoki opór** (zły krój) | definicje, szum, ekrany — człowiek nie wie, po co i co dalej |

Dobry model **nie wymazuje danych** — **nie stawia oporu** intencji. Jak spodnie: materiał pracuje z ciałem, nie krępuje ruchu.

**Jutro:** `warszawasza.online` → pięć pytań + opór poznawczy w polu.

Dobry projekt oszczędza człowiekowi wysiłku, nie odbierając mu sprawczości.

System rejestruje. Człowiek rozumie. System koreluje. Człowiek decyduje. System pamięta. Człowiek działa.

### Krytyka konstruktywna (rygor, nie atak)

Każde pytanie = **inna strona krytyki**. System bez falsyfikacji = dogmat.

| Persona | Krytyka | Typowy zarzut |
|---------|---------|---------------|
| 👦 Oluś | **logiczna** | przekombinowane; wysoka entropia opisu; sztuczny opór poznawczy |
| 👔 Tomek | **użytkowa** | po minucie nie wiem po co; hermetyczna architektura |
| 🚜 Dziadek | **praktyczna** | nie działa pod obciążeniem; teoria nie wraca na twardy grunt |
| 👵 Babcia | **humanistyczna** | bezduszne wykresy; ignoruje człowieka, emocje, prawo do błędu |
| 🦅 Orzeł | **skali** | model pęka po rozciągnięciu — nie „zły”, tylko **granica** |

Krytyka wymusza sprawdzenie **drogi powrotnej** do rzeczywistości.

Pełny protokół (Failure per perspektywa): [`docs/protocol/critique-protocol-v1.md`](../protocol/critique-protocol-v1.md)

```
        👦 Oluś
           │
   👔 Tomek ─┼─ 🚜 Dziadek
           │
        👵 Babcia
           │
        🦅 Orzeł  (skala — nad stołem, nie zamiast stołu)
```
