# Civic Operating System (COS) v1.0

> **Aksjomaty:** STABLE — nie LOCKED. Bronimy je tak długo, jak dobrze opisują rzeczywistość.  
> **Test architektury:** COS jest **niezależny od narzędzi** — zmiana Jiry, Cursora lub Pythona nie wymaga przebudowy rdzenia.  
> Powiązane: [`babcia-os-v1.md`](babcia-os-v1.md) · [`../protocol/critique-protocol-v1.md`](../protocol/critique-protocol-v1.md)

---

## Nadrzędny aksjomat (STABLE)

**Każda wiedza zaczyna się i kończy w rzeczywistości.**

### Cztery aksjomaty CORE (STABLE)

| # | Aksjomat |
|---|----------|
| **1** | Rzeczywistość jest ostatecznym walidatorem. |
| **2** | Model umożliwia powrót do rzeczywistości. |
| **3** | Każda abstrakcja musi zmniejszać opór poznawczy. |
| **4** | Pokora = gotowość do zmiany modelu na każdym etapie, gdy rzeczywistość dostarczy lepszego wyjaśnienia. |

Beton od taty, szycie od mamy, praktyka dziadka, pytania Babci, modele, AI i kod — wszystko to jest **pośrodku**. Ani początkiem. Ani końcem.

---

## Stos (separacja modelu od implementacji)

```
===================================================================
                    CIVIC OPERATING SYSTEM (COS)
                            VERSION 1.0
===================================================================

                            ┌─────────┐
                            │  CORE   │  ← STABLE · bez person i oprogramowania
                            └────┬────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
   [ KNOWLEDGE ]           [ WORKFLOW ]            [ EXECUTION ]
  Repozytoria wiedzy      Pętla procesowa         Narzędzia i kod
  (Markdown/SQL/Wiki)    (Jira/Git/Kanban)       (Cursor/AI/Python)

===================================================================
```

| Warstwa | Rola | Wymienność |
|---------|------|------------|
| **CORE** | epistemologia, pięć funkcji, podział SYSTEM/CZŁOWIEK | **nie** — STABLE, falsyfikowalny |
| **KNOWLEDGE** | ślady, logi, zapisy strukturalne | agnostyczna technologicznie |
| **WORKFLOW** | przepływ zadań i uczenia | mapowanie na Jira/Linear/GitHub |
| **EXECUTION** | adaptery ludzkie i technologiczne | **całkowicie** wymienna |

---

## 1. CORE (rdzeń epistemiczny)

Nienaruszalna, stała matematyczno-logiczna struktura. **Całkowicie niezależna** od person i oprogramowania.

### A. Podział kompetencji procesowych

| | Łańcuch | Zakres |
|---|---------|--------|
| **SYSTEM** | Rejestruje → Koreluje → Pamięta | bezrefleksyjny zapis, korelacja, retencja |
| **CZŁOWIEK** | Rozumie → Decyduje → Działa | intencjonalność, sens, sprawczość |

Nie przypisuj maszynie rozumu, intencji ani moralności.

### B. Pięć funkcji weryfikacji (matryca pytań)

| Funkcja | Pytanie | Test |
|---------|---------|------|
| **SENS** | Czy to ma sens? | abstrakcja kontra surowy fakt |
| **CEL** | Czy wiem, po co to jest? | pierwsze 20 s → intencja |
| **DZIAŁANIE** | Czy to działa? | praktyka pod obciążeniem |
| **CZŁOWIEK** | Co stanie się z człowiekiem, jeśli model odniesie sukces? | skutek ludzki i społeczny |
| **SKALA** | A co, jeśli zmienimy skalę? | czas, przestrzeń, natężenie |

> W WARSZAWASZA funkcja **DZIAŁANIE** używa sformułowania konsekwencji: *„Co stanie się z pracą, gdy przyjdzie moment weryfikacji?”* — to adapter krytyki, nie zmiana kontraktu.

Ewolucja systemu = **więcej perspektyw** (adapterów), **nie więcej pytań**.

---

## 2. KNOWLEDGE (zarządzanie wiedzą)

Warstwa przechowywania śladów i logów strukturalnych. Agnostyczna technologicznie.

### Kryterium prawdy (aksjomat 2)

Model jest zapisem, który umożliwia powrót do rzeczywistości. **Model kończy się tam, gdzie zaczyna się życie.**

Rule 0 = **aksjomat 3** w CORE.

### Przykładowe implementacje (wymienne)

- Markdown / Obsidian — notatki lokalne
- Confluence — wiedza zespołowa
- SQL — rejestracja stanów miasta
- Git — historia zmian artefaktów

---

## 3. WORKFLOW (zamknięta pętla procesu)

Dynamiczny przepływ zadań. COS przetwarza sygnały na czyny. Ten sam schemat mapuje się na dowolny system zarządzania (Jira, Linear, GitHub Issues).

```
  [ REJESTRACJA ]  ──>  [ OBSERWACJA ]  ──>  [ INTERPRETACJA ]
 (Surowy sygnał)        (Wybór celu)         (Nadanie znaczenia)
                                                      │
                                                      ▼
   [ HISTORIA ]    <──   [ WALIDACJA ]  <──     [ DECYZJA ]
 (Zapis do bazy)         (W polu / Real)      (Epistemiczny kolaps)
        │                                             │
        ▼                                             ▼
[ NOWA OBSERWACJA ]                             [ DZIAŁANIE ]
                                              (Ruch fizyczny / kod)
```

| Etap | Kto | Co |
|------|-----|-----|
| **Rejestracja** | SYSTEM | pasywny, masowy zapis faktów |
| **Obserwacja** | CZŁOWIEK | wybór wycinka rejestracji istotnego dla celu |
| **Interpretacja** | CZŁOWIEK | filtry pięciu funkcji CORE + mapowanie perspektyw |
| **Decyzja** | CZŁOWIEK | kolaps epistemiczny — jedna droga, odcięcie niepewności |
| **Działanie** | CZŁOWIEK | krok fizyczny lub programistyczny w rzeczywistości |
| **Walidacja** | RZECZYWISTOŚĆ | *W polu wszystko wyjdzie* — zderzenie skutku z faktem |
| **Historia** | SYSTEM | wnioski z walidacji jako nowy ślad |
| **Nowa obserwacja** | — | kolejny cykl na zaktualizowanych danych |

---

## 4. EXECUTION (wykonanie i adaptery)

Wymienne wtyczki technologiczne i ludzkie. Zmiana narzędzia lub roli **nie narusza CORE**.

### A. Adaptery ludzkie

Dowolna rola wchodzi jako adapter mapujący doświadczenie na pięć funkcji CORE:

| Przykład adaptera | Funkcje |
|-------------------|---------|
| Mieszkaniec | SENS, CEL |
| Inżynier / kierowca | DZIAŁANIE |
| Urzędnik / planista | SKALA |
| Oluś, Tomek, Babcia, Dziadek, Orzeł | biblioteka perspektyw WARSZAWASZA |

Wejście nowego użytkownika (np. osoby niewidomej) **nie wymaga przebudowy CORE** — mapujemy doświadczenie na CZŁOWIEK / DZIAŁANIE.

### B. Adaptery technologiczne

**Wektor AI (nie decyduje — dostarcza surowy materiał):**

```
AI  →  Model  →  Człowiek
```

| Warstwa | Rola |
|---------|------|
| **AI** | korelacja, filtr szumu → sygnał (najniższa warstwa techniczna) |
| **Model** | zapis, struktura, drogowskaz powrotu |
| **Człowiek** | rozumienie, decyzja, czyn — jedyna instancja sprawcza |

AI może wykryć wzorzec w danych, ale **pochodzenie sensu** pozostaje po stronie człowieka, doświadczenia i rzeczywistości ([BABCIA OS](babcia-os-v1.md) · dwie osie).

Konfiguracja AI (Cursor, Claude, ChatGPT): [`docs/protocol/cos-cursor-rules.json`](../protocol/cos-cursor-rules.json)

Implementacja w repozytorium: [`.cursor/rules/miejski-operator.mdc`](../../.cursor/rules/miejski-operator.mdc)

---

## Test architektury (checklist)

| Pytanie | Odpowiedź |
|---------|-----------|
| Nowy użytkownik wymaga przebudowy CORE? | **Nie** — nowy adapter |
| Jira → Linear wymaga zmiany modelu? | **Nie** — ten sam 8-etapowy workflow |
| Usunięcie skryptu Python niszczy metodologię? | **Nie** — kod to artefakt EXECUTION |

---

## Relacja BABCIA OS ↔ COS

| | BABCIA OS | COS |
|---|-----------|-----|
| **Czym jest** | zachowanie ludzkiego sposobu decyzji **przed** zapisem w modelu i technologii | architektura systemowa · separacja warstw |
| **Mechanika** | oś pochodzenia znaczenia + oś walidacji (nie władza) | CORE STABLE + KNOWLEDGE / WORKFLOW / EXECUTION |
| **AI** | AI → Model → Człowiek | EXECUTION · wektor technologiczny |
| **Intuicja** | hipoteza · skraca drogę do dobrej hipotezy · zmniejsza opór (aksjomat 3) | interpretacja przez CZŁOWIEKA w WORKFLOW |
| **Pokora** | aksjomat 4 · meta-własność procesu — nie etap workflow | falsyfikacja · STABLE axioms |

---

*Używaj kodu z rozwagą.*
