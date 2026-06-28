# BABCIA OS · VERSION 1.0 (FINAL ARCHITECTURE)

> **Status:** STABLE — nie LOCKED.  
> **Intencja:** zachowanie ludzkiego sposobu dochodzenia do decyzji, **zanim** zostanie zapisany w modelach i technologii.  
> **Implementacja techniczna:** [COS v1.0](cos-v1.md) · [Critique Protocol](../protocol/critique-protocol-v1.md)

---

## Stos (interfejs myślenia i działania)

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
                    │          CORE           │
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
                    │   ADAPTERS & ARTIFACTS  │  wymienne
                    └─────────────────────────┘

===================================================================
```

---

## I. AXIOMS (nadrzędne ramy)

| # | PL | EN |
|---|----|----|
| **1** | **Rzeczywistość jest ostatecznym walidatorem.** *(Każda wiedza zaczyna się i kończy w rzeczywistości.)* | Reality is the final validator. |
| **2** | **Model jest zapisem, który umożliwia powrót do rzeczywistości.** Kończy się tam, gdzie zaczyna się życie. | A model is a record that enables a return to reality. |
| **3** | **Każda abstrakcja musi zmniejszać opór poznawczy.** W przeciwnym razie należy ją usunąć. | Every abstraction must reduce cognitive resistance. Otherwise remove it. |
| **4** | **Pokora** = gotowość do zmiany modelu **na każdym etapie**, gdy rzeczywistość dostarczy lepszego wyjaśnienia. | Humility = willingness to change the model at any stage when reality provides a better explanation. |

Aksjomat 4 **nie jest krokiem** workflow — jest **własnością całego układu** (HUMILITY · ENFORCED_GLOBAL). Rygor przy ostrzeniu nożyc, przy pierwszej hipotezie, w trakcie rozumowania — **zanim** pęknie wylewka lub rozpruje się szew.

---

## II. CORE (podział kompetencji)

| | Łańcuch | Zakres |
|---|---------|--------|
| **SYSTEM** | Rejestruje → Koreluje → Pamięta | bezrefleksyjny log, przetwarzanie danych, retencja |
| **CZŁOWIEK** | Rozumie → Decyduje → Działa | intencjonalność, sens, moralność, fizyczny czyn |

Nie przypisuj maszynie rozumu, intencji ani woli.

### Wektor AI (w ADAPTERS — nie w CORE)

```
AI  →  Model  →  Człowiek
```

AI = najniższa warstwa techniczna (korelacja, filtr szumu). Jedynym ujściem łańcucha jest **ludzkie działanie**. Łańcuch nie zapętla się w maszynie.

---

## III. FUNCTIONS (filtry weryfikacji)

| Funkcja | Pytanie | Test |
|---------|---------|------|
| **SENS** | Czy to ma sens? | abstrakcja kontra surowy fakt |
| **CEL** | Czy wiem, po co to jest? | pierwsze 20 s → intencja |
| **DZIAŁANIE** | Czy to działa? | praktyka operacyjna · stabilność pod obciążeniem |
| **CZŁOWIEK** | Co stanie się z człowiekiem, jeśli model odniesie sukces? | długofalowy skutek ludzki i społeczny |
| **SKALA** | A co, jeśli zmienimy skalę? | czas, przestrzeń, natężenie |

> W WARSZAWASZA **DZIAŁANIE** może używać sformułowania konsekwencji (*„Co stanie się z pracą przy weryfikacji?”*) — adapter krytyki, nie nowa funkcja.

Ewolucja = **więcej adapterów**, nie więcej pytań. Pełny protokół Failure: [`critique-protocol-v1.md`](../protocol/critique-protocol-v1.md).

---

## IV. WORKFLOW (czysty cykl poznawczy)

Nad całością obiegu nieustannie unosi się **aksjomat 4** (pokora wobec rzeczywistości).

```
         [ RZECZYWISTOŚĆ ] ──> punkt wyjścia · surowy fakt · opór materii
                 │
                 ▼
          Doświadczenie    ──> baza logów z wcześniejszych kontaktów
                 │
                 ▼
           [ INTUICJA ]    ──> mechanizm kompresji (redukcja oporu: „Szukaj tu”)
                 │
                 ▼
           [ HIPOTEZA ]    ──> operacyjne sformułowanie przypuszczenia
                 │
                 ▼
            Rozumowanie    ──> rygorystyczny test przez 5 FUNCTIONS
                 │
                 ▼
              Decyzja      ──> epistemiczny kolaps · redukcja niepewności
                 │
                 ▼
             Działanie     ──> kod, szew, wylewka · fizyczny czyn
                 │
                 ▼
         [ RZECZYWISTOŚĆ ] ──> w polu wszystko wyjdzie · test prawdy
```

### Intuicja

- **Nie** ostatni sędzia — **hipoteza** (*„Sprawdź tutaj”*, nie *„To jest prawda”*).
- **Nie** poetycka zagadka — **ultra-szybki algorytm kompresji** doświadczenia: skraca drogę do trafnej hipotezy (aksjomat 3).
- **Nie** zwalnia z myślenia — wskazuje, **gdzie zacząć myśleć**.
- Dobra intuicja **najczęściej** wynika z bogatego doświadczenia; błędna — z uprzedzeń i złudzeń poznawczych.

**Przykład (krawiec):** „Tutaj materiał puści.” / „Tutaj nie wolno ciąć.” — bez wzoru na naprężenia. Jeśli szew pęka — rzeczywistość falsyfikuje; mistrz poprawia model, nie broni ego.

---

## V. ADAPTERS & ARTIFACTS (wymienne)

| Typ | Przykłady | Rola |
|-----|----------|------|
| **Adaptery ludzkie** | Oluś, Tomek, Babcia, Dziadek, Orzeł · mieszkaniec · kierowca · urbanista | mapowanie doświadczenia na 5 FUNCTIONS |
| **Adaptery technologiczne** | Cursor, Claude, Jira, Linear, GitHub, SQL, Python | EXECUTION · rejestracja, korelacja, pamięć |
| **Artefakty** | warszawasza.online, dokumentacja, skrypty, raporty | wyniki działania — utylizowalne, jeśli łamią aksjomat 3 |

Zmiana adaptera **nie narusza** AXIOMS, CORE, FUNCTIONS, WORKFLOW.

**Reguły AI (stable):** [`.cursorrules`](../../.cursorrules) — tylko reguły wykonania, bez person i technologii.

**Persony (adapter):** [`docs/personas.md`](../personas.md)

Most Cursor: [`.cursor/rules/miejski-operator.mdc`](../../.cursor/rules/miejski-operator.mdc)

---

## Dwie osie (pochodzenie znaczenia · walidacja)

Uzupełnienie stosu — **nie** łańcuch władzy, **tak** — łańcuch pochodzenia:

```
  [ POCHODZENIE ]                    [ WALIDACJA ]
  Pokolenia → Doświadczenie          Technologia → Model
       → Człowiek → Model                  → Człowiek → Rzeczywistość
            → Technologia
```

Technologia może dostarczyć **nową informację** (wzorzec w danych), ale **nie zmienia pochodzenia sensu**.

---

## Manifest (WIEDZA · ZNACZENIE · ROZWAŻNOŚĆ)

```
===================================================================
                            BABCIA OS
===================================================================

  WIEDZA      → System potrafi ją zachować.
  ZNACZENIE   → Człowiek potrafi je nadać.
  ROZWAŻNOŚĆ  → Doświadczenie podpowiada, kiedy skorzystać.

  Nad procesem: POKORA WOBEC RZECZYWISTOŚCI (aksjomat 4)

  Rzeczywistość pozostaje ostatecznym walidatorem.
  Jeżeli rzeczywistość przeczy modelowi — zmienia się model.
===================================================================
```

---

## Mapa BABCIA OS ↔ COS

| BABCIA OS | COS |
|-----------|-----|
| AXIOMS | CORE (STABLE) |
| CORE | podział SYSTEM / CZŁOWIEK |
| FUNCTIONS | pięć pytań weryfikacji |
| WORKFLOW | 8-etapowa pętla + cykl poznawczy |
| ADAPTERS & ARTIFACTS | KNOWLEDGE + EXECUTION |

---

*Używaj kodu z rozwagą.*
