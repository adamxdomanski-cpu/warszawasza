# Miejski Operator

> Tożsamość operacyjna WARSZAWASZA · wersja 2 (po krytyce kolapsalnej)  
> Spec techniczna: `fira/PROTOCOL.md` · warstwy: `docs/protocol/layers-spec-85233.md`

---

## Jedno zdanie

**Miejski Operator** projektuje narzędzia, które pomagają ludziom **obserwować miasto bez nadmiaru szumu** — najpierw zapis faktu i kontekstu, potem interpretacja.

---

## Jaki problem rozwiązuje

| Problem | Objaw | Odpowiedź operatora |
|---------|-------|---------------------|
| Szum „smart city” | Dashboardy, metryki bez konsekwencji, fałszywa neutralność mapy | **COP / FOP** — protokół obserwacji audytowalny w repo |
| Mieszanie faktu z narracją | „System zweryfikował” bez dowodu terenowego | **Warstwa 0 ≠ Warstwa 1** (Spec 85233) |
| Interfejsy dekoracyjne | Więcej animacji niż sensu | **Low Entropy UI** — każdy element musi odpowiadać: *co z tego wynika?* |
| Tożsamość bez kotwicy | Marka oderwana od miejsca | **WARSZAWASZA** — dzielnice, studio Muranów, artefakty + ten sam język w UI |

Rdzeń, który **nie załamuje się** pod krytyką: miasto traktowane jako system sygnałów, zadaniem jest **redukcja szumu** i **czytelne narzędzia**, nie slogan o „inteligentnym mieście”.

---

## Dla kogo

| Odbiorca | Co dostaje | Gdzie w projekcie |
|----------|------------|-------------------|
| **Mieszkańcy / obserwatorzy** | Wejście T/F, ślad, język bez urzędowego pozoru | `/`, `LeaveTraceControl`, trace lifecycle |
| **Twórcy civic tech** | Otwarty protokół, schemat SQL, log format | `fira/`, `backend/sql/`, README |
| **Projektanci UI** | Wzorzec niskiej entropii, mobile-first | `.cursor/rules/warszawasza-field.mdc` |
| **Klient marki (streetwear)** | Artefakt fizyczny + lokalna narracja | Studio, kolekcje dzielnic — **poza** core protokołu |

Operator **nie** jest uniwersalnym konsultantem dla samorządu, kancelarii ani integratora ERP. Używa prawa, danych czy architektury **tylko tam**, gdzie służą obserwacji i czytelności — nie jako lista kompetencji.

---

## Kim jest (wąsko)

Projektant-producent **jednego ekosystemu**: protokół obserwacji (FOP/COP) + dystrybucja (WARSZAWASZA) + selektywne artefakty fizyczne.  
Pracuje z repo, studiem (Dzielna 3A/7) i vaultem notatek — trzy nośniki, **jedna zasada**: mniej szumu, więcej audytu.

---

## Jak pracuje

```
Obserwacja → Zapis → Filtr (T/F) → Test → Wdrożenie z dowodem
```

1. **Obserwacja** — pole, dane, ciało na miejscu (nie „ok Boga” z biurka).  
2. **Zapis** — FOP, SQL, log PROCESS tylko ze stanem obserwowalnym.  
3. **Filtr** — odrzucenie elementu bez konsekwencji (FALSE = szum).  
4. **Test** — `npm run build`, smoke HTTP, `py_compile`; mobile 390px.  
5. **Wdrożenie** — merge git + deploy; **bez** twierdzeń bez curl/logów.

---

## Co tworzy (dowody, nie deklaracje)

| Artefakt | Dowód w repo / polu |
|----------|---------------------|
| Protokół obserwacji | `fira/PROTOCOL.md`, COP v1.0 README |
| Interfejs dystrybucji | `frontend/` — bramka, pipeline glifów, `/meta`, `/learn` |
| Rozdzielenie fakt / narracja | L0 chain + sensory Layer 1 — `layers-spec-85233.md`, SQL 015 |
| Persystencja obywatelska | `backend/sql/001`–`015` (schemat; DB = po `DATABASE_URL`) |
| O2O produkt ≠ weryfikacja terenu | `/market`, `013_product_flacon_tokens.sql`, disclaimer w API |
| Infrastruktura prod (opcja VPS) | `infra/docker-compose.prod.yml`, PR #14 |

To nie „przekłada złożone zjawiska” w próżni — to **konkretne pliki i trasy**, które można otworzyć i sprawdzić.

---

## Słownik (metafory → definicje operacyjne)

| Termin | Definicja w tym projekcie |
|--------|---------------------------|
| **Niska entropia informacyjna** | Każdy element UI/copy ma konsekwencję; brak dekoracji bez funkcji; test T/F |
| **System rytmów / przepływów** | Sygnały miejskie modelowane w FIRA/OFP (fazy, GTFS, H3) — **hipoteza**, nie prawda Layer 0 |
| **Organizm danych** | Miasto = węzły + krawędzie + ślady (`state_registry_nodes`, civic graph SQL 012) |
| **Ekosystem WARSZAWASZA** | Trzy nośniki: **fizyczny** (studio), **cyfrowy** (repo), **narracyjny** (dzielnice) — spięte tożsamością, nie jednym monolitem |

---

## Kiedy praca jest dobra (falsyfikowalność)

Praca **nie** jest dobra, jeśli:

- UI dodaje element bez odpowiedzi na *co z tego wynika?*
- Twierdzi się „wdrożone” bez merge na `main` + smoke URL
- Narracja produktu (Layer 1) udaje weryfikację terenu (Layer 0)
- Build lub mobile acid test (390px, jedna ręka) pada
- Log PROCESS zawiera stany nieweryfikowalne

Praca **jest** dobra, jeśli:

- Nowy użytkownik na `/` rozumie T/F bez instrukcji PDF
- Ślad / API / SQL da się prześledzić end-to-end w dokumentacji
- Diff jest minimalny względem problemu
- Metryka szumu spada: mniej elementów ekranu przy tej samej funkcji

---

## Po co (nie „jakim jestem człowiekiem”)

**Po co:** żeby obywatel mógł **zapisać i oddać** to, co widzi w mieście, bez platformy urzędowej i bez szumu komercyjnego — a potem **sam zdecydować**, co z tego wynika (*The system remembers. Humans decide.*).

Marka streetwear i instalacje Muranów są **nośnikami i kontekstem**, nie celem protokołu.

---

## Blok kontekstu dla AI

```markdown
Miejski Operator: builds tools for low-noise urban observation (COP/FIRA/WARSZAWASZA).
Axis = problem (noise, false verification) + evidence (repo paths, build, curl).
Separate: who (designer-producer of one ecosystem) / how (observe→record→filter→test→ship) /
what (protocol, UI, SQL, optional physical artifacts) / for whom (observers, civic devs, UI refs, brand clients).
Do not claim deploy without git+HTTP proof. Layer 0 ≠ Layer 1. Smallest diff.
```

---

## Wersja 1

Pierwsza wersja (2026-06) była **tożsamościowo-szeroka** — dobra jako kierunek, słaba jako dowód.  
Wersja 2 odpowiada na krytykę kolapsalną: wąski zakres, warstwy rozdzielone, terminy zdefiniowane, kryteria falsyfikacji.

---

*Dokument tożsamości · nie specyfikacja wdrożenia*
