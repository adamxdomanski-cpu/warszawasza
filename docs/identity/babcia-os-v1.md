# BABCIA OS · VERSION 1.0 (FINAL ARCHITECTURE)

> **Status:** STABLE — nie LOCKED.  
> **Intencja:** zachowanie ludzkiego sposobu dochodzenia do decyzji, **zanim** zostanie zapisany w modelach i technologii.  
> **Implementacja techniczna:** [COS v1.0](cos-v1.md) · [Critique Protocol](../protocol/critique-protocol-v1.md)

---

## Jedno zdanie (słuchanie)

**Rzeczywistość przemawia przez opór.** *(Reality speaks through resistance.)*

Nie mówi, jak projektować. Mówi, **jak słuchać świata**, zanim zacznie się go opisywać. Beton od taty, materiał od mamy, Ursus dziadka, pytania Babci, intuicja, pokora, kod i miasto — to różne formy **spotkania z oporem rzeczywistości**.

Opór przestaje być przeszkodą. Staje się **kanałem informacji zwrotnej**. Dlatego *w polu wszystko wyjdzie* — bo rzeczywistość **zawsze odpowiada oporem**.

---

## Stos (sześć warstw)

```
AXIOMS
    │
    ▼
CAPABILITIES
    │
    ▼
FUNCTIONS
    │
    ▼
WORKFLOW
    │
    ▼
ADAPTERS
    │
    ▼
ARTIFACTS
```

```
===================================================================
                            BABCIA OS
                          VERSION 1.0
===================================================================

                    ┌─────────────────────────┐
                    │         AXIOMS          │  STABLE
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      CAPABILITIES       │  zdolności aktorów
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        FUNCTIONS        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        WORKFLOW         │  + pokora (globalna)
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        ADAPTERS         │  wymienne
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       ARTIFACTS         │  wymienne
                    └─────────────────────────┘

===================================================================
```

**CAPABILITIES** — nie „rdzeń systemu”, lecz **zdolności dwóch aktorów** (SYSTEM i CZŁOWIEK). Język zrozumiały dla filozofa i architekta oprogramowania.

---

## I. AXIOMS (nadrzędne ramy)

| # | PL | EN |
|---|----|----|
| **0** | **Opór jest informacją.** Materiał, beton, miasto, użytkownik, bug, tarcie UX — kanały zwrotne, nie szum do ignorowania. | Resistance is information. |
| **1** | **Rzeczywistość jest ostatecznym walidatorem.** *(Każda wiedza zaczyna się i kończy w rzeczywistości.)* | Reality is the final validator. |
| **2** | **Model umożliwia powrót do rzeczywistości.** Kończy się tam, gdzie zaczyna się życie. | A model enables return to reality. |
| **3** | **Każda abstrakcja musi zmniejszać opór poznawczy.** W przeciwnym razie usuń ją. | Every abstraction must reduce cognitive resistance. |
| **4** | **Pokora** = gotowość do zmiany modelu **na każdym etapie**, gdy rzeczywistość dostarczy lepszego wyjaśnienia. | Humility at any stage when reality provides a better explanation. |

**Słuchanie (meta):** *Rzeczywistość przemawia przez opór* — aksjomat 0 wyjaśnia **dlaczego** walidacja działa i **skąd** bierze się informacja zwrotna.

Aksjomat 4 **nie jest krokiem** workflow — własność całego układu. Pokora **przed** pierwszym cięciem, nie dopiero po porażce.

---

## II. CAPABILITIES (zdolności aktorów)

| Aktor | Łańcuch | Zakres |
|-------|---------|--------|
| **SYSTEM** | Rejestruje → Koreluje → Pamięta | bezrefleksyjny log, przetwarzanie, retencja |
| **CZŁOWIEK** | Rozumie → Decyduje → Działa | intencja, sens, moralność, fizyczny czyn |

Nie przypisuj maszynie rozumu, intencji ani woli.

### Wektor AI (ADAPTERS — nie CAPABILITIES)

```
AI  →  Model  →  Człowiek
```

AI = adapter technologiczny (korelacja, filtr szumu). Jedynym ujściem jest **ludzkie działanie**.

---

## III. FUNCTIONS (filtry weryfikacji)

| Funkcja | Pytanie | Test |
|---------|---------|------|
| **SENS** | Czy to ma sens? | abstrakcja kontra fakt |
| **CEL** | Czy wiem, po co to jest? | pierwsze 20 s → intencja |
| **DZIAŁANIE** | Czy to działa? | praktyka pod obciążeniem |
| **CZŁOWIEK** | Co stanie się z człowiekiem, jeśli model odniesie sukces? | skutek ludzki |
| **SKALA** | A co, jeśli zmienimy skalę? | czas, przestrzeń, natężenie |

Ewolucja = więcej **adapterów**, nie więcej pytań. Failure: [`critique-protocol-v1.md`](../protocol/critique-protocol-v1.md).

---

## IV. WORKFLOW (cykl poznawczy)

Nad obiegiem: **pokora** (aksjomat 4). Każdy etap może spotkać **opór** (aksjomat 0) — to sygnał, nie porażka procesu.

```
         [ RZECZYWISTOŚĆ ] ──> opór materii · surowy fakt
                 │
                 ▼
          Doświadczenie
                 │
                 ▼
           [ INTUICJA ]    ──> kompresja doświadczenia · „Szukaj tu”
                 │
                 ▼
           [ HIPOTEZA ]
                 │
                 ▼
            Rozumowanie    ──> 5 FUNCTIONS
                 │
                 ▼
              Decyzja
                 │
                 ▼
             Działanie
                 │
                 ▼
         [ RZECZYWISTOŚĆ ] ──> opór jako odpowiedź · test prawdy
```

**Intuicja:** hipoteza, nie werdykt. Skraca drogę do dobrej hipotezy (aksjomat 3). *„Sprawdź tutaj”*, nie *„To jest prawda”*.

**Krawiec:** materiał puści / nie wolno ciąć — bez wzoru. Pęknięty szew = opór jako informacja; mistrz poprawia model.

---

## V. ADAPTERS (wymienne łączniki)

| Typ | Przykłady |
|-----|-----------|
| **Ludzkie** | persony w [`personas.md`](../personas.md) · mieszkaniec · kierowca · urbanista |
| **Technologiczne** | Cursor, Claude, Jira, SQL, Python, AI |

Mapują doświadczenie na FUNCTIONS. Zmiana adaptera **nie narusza** AXIOMS, CAPABILITIES, FUNCTIONS, WORKFLOW.

**Reguły AI (stable):** [`.cursorrules`](../../.cursorrules)

---

## VI. ARTIFACTS (wyniki działania)

warszawasza.online · dokumentacja · skrypty · raporty · kod — **utylizowalne**, jeśli zwiększają opór bez zrozumienia (aksjomat 3).

---

## Dwie osie (pochodzenie · walidacja)

```
  Pokolenia → Doświadczenie → Człowiek → Model → Technologia   (pochodzenie sensu)
  Technologia → Model → Człowiek → Rzeczywistość               (walidacja)
```

Technologia może dostarczyć informację — **nie zmienia pochodzenia sensu**.

---

## Manifest

```
  WIEDZA      → System potrafi ją zachować.
  ZNACZENIE   → Człowiek potrafi je nadać.
  ROZWAŻNOŚĆ  → Doświadczenie podpowiada, kiedy skorzystać.

  Nad procesem: POKORA · SŁUCHANIE: RZECZYWISTOŚĆ PRZEMAWIA PRZEZ OPÓR

  Jeżeli rzeczywistość przeczy modelowi — zmienia się model.
```

---

## Mapa BABCIA OS ↔ COS

| BABCIA OS | COS |
|-----------|-----|
| AXIOMS | aksjomaty STABLE |
| CAPABILITIES | podział SYSTEM / CZŁOWIEK |
| FUNCTIONS | pięć pytań |
| WORKFLOW | pętla procesowa |
| ADAPTERS | KNOWLEDGE + EXECUTION (narzędzia, persony) |
| ARTIFACTS | artefakty w KNOWLEDGE / EXECUTION |

---

*Używaj kodu z rozwagą.*
