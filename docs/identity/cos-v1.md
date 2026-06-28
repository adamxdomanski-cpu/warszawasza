# Civic Operating System (COS) v1.0

> **Aksjomaty:** STABLE — nie LOCKED. Bronimy je tak długo, jak dobrze opisują rzeczywistość.  
> **Test architektury:** COS jest **niezależny od narzędzi** — zmiana Jiry, Cursora lub Pythona nie wymaga przebudowy rdzenia.  
> Powiązane: [`babcia-os-v1.md`](babcia-os-v1.md) · [`../protocol/critique-protocol-v1.md`](../protocol/critique-protocol-v1.md)

---

## Nadrzędne aksjomaty (STABLE)

**Rzeczywistość przemawia przez opór.** *(Reality speaks through resistance.)*

**Każda wiedza zaczyna się i kończy w rzeczywistości.**

| # | Aksjomat |
|---|----------|
| **0** | **Opór jest informacją** — materiał, miasto, użytkownik, bug, tarcie to kanały zwrotne. |
| **1** | Rzeczywistość jest ostatecznym walidatorem. |
| **2** | Model umożliwia powrót do rzeczywistości. |
| **3** | Każda abstrakcja musi zmniejszać opór poznawczy. |
| **4** | Pokora = gotowość do zmiany modelu na każdym etapie procesu. |

Kanoniczny stos 6 warstw: [`babcia-os-v1.md`](babcia-os-v1.md) · AXIOMS → **CAPABILITIES** → FUNCTIONS → WORKFLOW → ADAPTERS → ARTIFACTS.

---

## Stos (separacja modelu od implementacji)

```
===================================================================
                    CIVIC OPERATING SYSTEM (COS)
                            VERSION 1.0
===================================================================

                            ┌─────────┐
                            │ STABLE  │  ← AXIOMS + CAPABILITIES + FUNCTIONS
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
| **STABLE** | AXIOMS, CAPABILITIES (SYSTEM/CZŁOWIEK), FUNCTIONS | **nie** — falsyfikowalny |
| **KNOWLEDGE** | ślady, logi, zapisy strukturalne | agnostyczna technologicznie |
| **WORKFLOW** | przepływ zadań i uczenia | mapowanie na Jira/Linear/GitHub |
| **EXECUTION** | adaptery ludzkie i technologiczne | **całkowicie** wymienna |

---

## 1. STABLE · CAPABILITIES (zdolności aktorów)

Stały podział kompetencji — **nie rdzeń systemu**, lecz zdolności dwóch aktorów. Niezależny od person i oprogramowania.

### A. CAPABILITIES

| | Łańcuch | Zakres |
|---|---------|--------|
| **SYSTEM** | Rejestruje → Koreluje → Pamięta | bezrefleksyjny zapis, korelacja, retencja |
| **CZŁOWIEK** | Rozumie → Decyduje → Działa | intencjonalność, sens, sprawczość |

Nie przypisuj maszynie rozumu, intencji ani moralności.

### B. FUNCTIONS (filtry weryfikacji)

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

Rule 0 = **aksjomat 3**.

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
| **Interpretacja** | CZŁOWIEK | filtry pięciu FUNCTIONS + mapowanie perspektyw |
| **Decyzja** | CZŁOWIEK | kolaps epistemiczny — jedna droga, odcięcie niepewności |
| **Działanie** | CZŁOWIEK | krok fizyczny lub programistyczny w rzeczywistości |
| **Walidacja** | RZECZYWISTOŚĆ | opór jako informacja zwrotna — zderzenie skutku z faktem |
| **Historia** | SYSTEM | wnioski z walidacji jako nowy ślad |
| **Nowa obserwacja** | — | kolejny cykl na zaktualizowanych danych |

---

## 4. EXECUTION (wykonanie i adaptery)

Wymienne wtyczki. Zmiana narzędzia **nie narusza** warstwy STABLE.

### A. Adaptery ludzkie

Dowolna rola mapuje doświadczenie na pięć FUNCTIONS:

| Przykład adaptera | Funkcje |
|-------------------|---------|
| Mieszkaniec | SENS, CEL |
| Inżynier / kierowca | DZIAŁANIE |
| Urzędnik / planista | SKALA |
| Oluś, Tomek, Babcia, Dziadek, Orzeł | biblioteka perspektyw WARSZAWASZA |

Wejście nowego użytkownika **nie wymaga przebudowy CAPABILITIES** — nowy adapter.

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

Reguły AI (stable): [`.cursorrules`](../../.cursorrules) · persony: [`docs/personas.md`](../personas.md)

---

## Test architektury (checklist)

| Pytanie | Odpowiedź |
|---------|-----------|
| Nowy użytkownik wymaga przebudowy STABLE? | **Nie** — nowy adapter |
| Jira → Linear wymaga zmiany modelu? | **Nie** — ten sam 8-etapowy workflow |
| Usunięcie skryptu Python niszczy metodologię? | **Nie** — kod to artefakt EXECUTION |

---

## Relacja BABCIA OS ↔ COS

BABCIA OS (6 warstw) ↔ COS:

| BABCIA OS | COS |
|-----------|-----|
| **AXIOMS** | STABLE · aksjomaty |
| **CAPABILITIES** | STABLE · SYSTEM / CZŁOWIEK |
| **FUNCTIONS** | STABLE · pięć pytań |
| **WORKFLOW** | WORKFLOW |
| **ADAPTERS** | KNOWLEDGE + EXECUTION (narzędzia, persony) |
| **ARTIFACTS** | pliki, deploy, kod |

Kanoniczny szablon filozoficzny: [`babcia-os-v1.md`](babcia-os-v1.md) · **FINAL ARCHITECTURE v1.0**

---

*Używaj kodu z rozwagą.*
