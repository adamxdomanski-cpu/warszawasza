# Pole domenowe: konstytucja.pl

**Artefakt pola (warstwa dokumentacji FIRA).** Nie jest częścią `fira/core/`. Nie zmienia protokołu — rejestruje decyzję dystrybucji WARSZAWASZA wobec domeny historycznej i alternatyw COP.

**Data audytu:** 2026-06-25  
**Kanoniczna dystrybucja:** [warszawasza.online](https://www.warszawasza.online)

---

## Werdykt COP (skrót)

| Ścieżka | Werdykt | Uzasadnienie |
|---------|---------|--------------|
| **warszawasza.online** (status quo) | **TRUE** | Aktywna dystrybucja FOP; nasłuch operacyjny bez nowego szumu |
| **konstytucja.pl** — zakup / broker | **FALSE** | HIGH-COST speculative; wartość 20–100k PLN; brak implikacji dla obserwacji |
| **konstytucja.pl** — opcja NASK | **FALSE** | Opcja już zajęta (do 2028-06-09); skuteczność &lt;1% przy domenie odnowionej co rok |
| **Alternatywy gTLD** (dostępne) | **FALSE** | Rejestracja bez jawnej decyzji operatora `[TRUE]` = szum infrastrukturalny |
| **Alternatywy gTLD** (zajęte) | **FALSE** | Brak COP-alignment; wymaga wykupu u obcego abonenta |

Zasada PM/COP (`fira/PM_MAPPING.md`): *„Czy ta faza odpowiada na: co z tego wynika dla obserwatora?”* — domena historyczna nie daje wspólnego języka obserwacji; daje koszt i rozproszenie uwagi.

---

## A) Audyt alternatyw domenowych

Źródło: WHOIS / RDAP (dns.pl, Identity Digital, nic.one), 2026-06-25.

| Domena | Status | Rejestracja / wygaśnięcie | Szac. koszt (nowa rejestracja) | Szac. koszt (wykup) | COP |
|--------|--------|---------------------------|--------------------------------|---------------------|-----|
| **konstytucja.pl** | Zajęta · uśpiona | utw. 2003-10-02 · odnowienie 2026-12-01 | n/d (nie wolna) | 20–100k PLN (spekulacja) + broker | FALSE |
| **konstytucja.online** | Zajęta | utw. 2019-10-07 · wygaśnięcie 2026-10-07 | n/d | negocjacja z abonentem (Dynadot) | FALSE |
| **protokol.live** | Zajęta | utw. 2026-04-10 · wygaśnięcie 2028-04-10 | n/d | negocjacja (GoDaddy) | FALSE |
| **cop.one** | **Wolna** | — | ~8–80 PLN/rok (promo ~2 USD; odnowienie ~80 PLN) | n/d | FALSE* |
| **obserwacja.online** | Zajęta | utw. 2025-07-30 | n/d | negocjacja (GoDaddy) | FALSE |
| **fira.one** | Zajęta | utw. 2025-09-27 | n/d | negocjacja (GoDaddy) | FALSE |
| **obserwacja.one** | **Wolna** | — | ~8–80 PLN/rok | n/d | FALSE* |
| **protokol.online** | Zajęta | utw. 2026-05-18 | n/d | negocjacja | FALSE |
| **fop.online** | Zajęta | utw. 2025-09-06 | n/d | negocjacja | FALSE |

\* Domena technicznie dostępna do rejestracji, ale werdykt COP = FALSE bez jawnej decyzji operatora (patrz § Cisza operacyjna).

**Uwagi techniczne**

- `konstytucja.pl`: NS `aftermarket.hosting` — parking / giełda; brak aktywnej treści FIRA.
- Na `konstytucja.pl` **opcja NASK jest już wykupiona** (utw. opcji 2025-06-09, ważna do 2028-06-09) — kolejka pierwszeństwa zajęta przez podmiot trzeci.
- Wiele nazw COP-aligned (`fira.one`, `obserwacja.online`) zarejestrowanych w 2025–2026 — typowy wzorzec squattingu semantycznego; wykup nie jest celem protokołu.

**Szacunki kosztów gTLD** (orientacyjnie, rejestrator promocyjny → odnowienie standard):

| TLD | 1. rok (promo) | Odnowienie / rok |
|-----|----------------|------------------|
| `.online` | ~4–40 PLN | ~60–160 PLN |
| `.live` | ~12–50 PLN | ~160–180 PLN |
| `.one` | ~8–12 PLN | ~80 PLN |

---

## B) konstytucja.pl — fakty WHOIS i klasyfikacja

### Rekord (NASK / dns.pl)

| Pole | Wartość |
|------|---------|
| Domena | `konstytucja.pl` |
| Utworzona | 2003-10-02 22:18:51 |
| Ostatnia modyfikacja | 2025-11-15 |
| Odnowienie | 2026-12-01 |
| Abonent | typ: individual (dane ukryte RODO) |
| Rejestrator | Aftermarket.pl Limited (Cypr) |
| NS | `ns1.aftermarket.hosting` / `ns2.aftermarket.hosting` |
| Opcja NASK | **aktywna u podmiotu trzeciego** · 2025-06-09 → 2028-06-09 |
| DNSSEC | Signed |

*Notatka:* W kontekście pola podawano też datę 2002-10-30 — rozbieżność ± kilka miesięcy typowa dla wczesnych rejestracji `.pl`; źródło prawdy: WHOIS NASK.

### Klasyfikacja ekonomiczna

| Parametr | Wartość |
|----------|---------|
| Stan | **uśpiona** (parking aftermarket, bez produkcyjnej dystrybucji) |
| Wycena rynkowa (szacunek) | **20 000 – 100 000 PLN** |
| Klasa decyzji | **HIGH-COST speculative** |
| Werdykt COP na zakup | **FALSE** |

**Dlaczego FALSE:** FIRA opisuje obserwację i redukcję szumu (`fira/PROTOCOL.md`), nie aktywa brandingowe. Wysoka cena spekulacyjna bez `observationsAlign()` z protokołem = szum kapitałowy. Dystrybucja już ma adres kanoniczny.

### Powiązanie z dystrybucją

```
FOP (core)  →  notacja ASCII  →  WARSZAWASZA  →  https://www.warszawasza.online
                                      ↑
                              kanoniczny punkt wejścia
                              (nie konstytucja.pl)
```

`konstytucja.pl` może istnieć w polu semantycznym (konstytucja obywatelska), ale **nie jest nośnikiem protokołu** — to warstwa 3 (dystrybucja) jest wymienna; nośnik jest już wybrany.

---

## C) Cisza operacyjna

**Domyślny stan silnika pola:**

| Parametr | Wartość |
|----------|---------|
| Nasłuch | **ON** |
| Endpoint kanoniczny | `warszawasza.online` |
| Akwizycja domen | **OFF** |
| Warunek włączenia | jawna decyzja operatora: `[TRUE]` |

Bez sygnału `[TRUE]` od operatora:

- brak rejestracji nowych domen COP-aligned,
- brak UI / frontendu pod alternatywne domeny,
- brak zmian w `backend/api/main.py` ani `fira/core/` pod tę ścieżkę,
- ten artefakt pozostaje **zapisem pola**, nie backlogiem produktowym.

*„Celem nie jest więcej danych. Celem jest mniej szumu.”* — reguła dystrybucji WARSZAWASZA.

---

## D) Procedura opcji NASK — referencja archiwalna

> **Status dokumentu:** archiwum referencyjne. **Nie jest aktywną procedurą** projektu. **Nie wykonywać zakupu** bez osobnego mandatu operatora `[TRUE]`.

### Co to jest opcja na domenę `.pl`

Usługa NASK dająca **pierwszeństwo rejestracji**, jeśli obecny abonent zwolni domenę (wygaśnięcie, rezygnacja). Szczegóły: [dns.pl/opcje](https://dns.pl/opcje).

| Parametr | Wartość |
|----------|---------|
| Okres opcji | 3 lata (możliwe przedłużenie) |
| Opłata NASK (netto, do rejestratora) | 60 PLN |
| Cena u rejestratora (brutto, orient.) | **~70–110 PLN / 3 lata** |
| Po realizacji opcji | + standardowa rejestracja `.pl` (~15–50 PLN/rok u rejestratora) |
| Gwarancja przejęcia | **brak** — tylko pierwszeństwo w kolejce |
| Szac. prawdopodobieństwo (domena odnowiana 20+ lat) | **&lt;1%** w horyzoncie 3 lat |

### Kroki (referencja)

1. Sprawdź WHOIS na [dns.pl](https://dns.pl) — czy domena aktywna, czy opcja już wykupiona.
2. Wybierz rejestratora z programu partnerskiego NASK (znaczek **OPCJA** na liście rejestratorów).
3. Złóż wniosek o opcję, opłać ~70–110 PLN brutto za 3 lata.
4. Po zarejestrowaniu opcji — wpis w WHOIS (`option created` / `option expiration date`).
5. Przy zwolnieniu domeny — powiadomienie od rejestratora, **14 dni** na rejestrację.
6. Opcjonalnie: wniosek pisemny do NASK (Kolska 12, Warszawa) o dane posiadacza opcji — zgodnie z RODO.

### Stan `konstytucja.pl` (2026-06-25)

Opcja **już istnieje** (2025-06-09 → 2028-06-09). Nowa opcja na tę domenę **niemożliwa** do czasu wygaśnięcia obecnej.

### Ścieżka brokera (referencja kosztów)

Gdy domena nie jest wolna i właściciel skłonny do sprzedaży:

| Element | Orientacyjny koszt |
|---------|-------------------|
| Opłata wstępna brokera | od **~500 PLN** (np. GoDaddy Broker: 549 PLN bezzwrotne) |
| Prowizja od ceny wynegocjowanej | **10–20%** (GoDaddy: 20%; brokerzy PL: często 10–15% + widełki indywidualne) |
| Cena domeny premium `.pl` | indywidualna; dla `konstytucja.pl` szacunek **20–100k PLN** |
| Giełda (Aftermarket.pl) | prowizja sprzedawcy 2–5% — dotyczy strony sprzedającej, nie nabywcy protokołu |

**Werdykt COP na broker + konstytucja.pl:** **FALSE** — koszt spekulacyjny, brak wpływu na `observationsAlign()`.

---

## Powiązane dokumenty

| Dokument | Ścieżka |
|----------|---------|
| Protokół FOP | `fira/PROTOCOL.md` |
| Mapowanie PM / test szumu | `fira/PM_MAPPING.md` |
| Dystrybucja kanoniczna | `https://www.warszawasza.online` |
| NASK — opcje | `https://dns.pl/opcje` |
| NASK — cennik rejestratorów | `https://dns.pl/cennik_dla_rejestratorow` |

---

Wersja artefaktu: **0.1** · zgodna z FOP/0.1 · **archiwum pola, nie mandat zakupu**
