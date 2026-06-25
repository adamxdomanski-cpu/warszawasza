# [OPERACJA: EMISJA IMPULSU OBYWATELSKIEGO]

**TARGET:** `konstytucja.pl`  
**METODA:** Formularz pośredniczący rejestratora krajowego (.pl)  
**Data przygotowania:** 2026-06-25  
**Status:** przygotowane — **nie wysłane** (wymaga danych operatora + Captcha)

**Powiązany artefakt pola:** `fira/FIELD_DOMAIN_konstytucja.md` (audyt COP, werdykt FALSE na zakup — ta operacja to **kontakt obywatelski**, nie akwizycja)

---

## Werdykt COP (emisja)

| Parametr | Wartość |
|----------|---------|
| Inicjator | Operator `[TRUE]` — świadomy impuls obywatelski |
| Automatyzacja | **FALSE** — brak masowego wysyłania; jeden ręczny formularz |
| Cel | Dialog o współpracy non-profit / Civic Tech — nie spam, nie broker |
| Relacja do zakupu domeny | **FALSE** — zgodnie z `FIELD_DOMAIN_konstytucja.md` nie uruchamia ścieżki HIGH-COST |

*„Celem nie jest więcej danych. Celem jest mniej szumu.”* — emisja jest pojedynczym sygnałem, nie kampanią.

---

## WHOIS — wynik CLI (2026-06-25)

Źródło: `whois konstytucja.pl` → `whois.dns.pl`

| Pole | Wartość |
|------|---------|
| Domena | `konstytucja.pl` |
| Utworzona | 2003-10-02 22:18:51 |
| Ostatnia modyfikacja | 2025-11-15 13:12:00 |
| Odnowienie | 2026-12-01 21:18:51 |
| Abonent | typ: individual (dane ukryte RODO) |
| **Rejestrator** | **Aftermarket.pl Limited** (Chytron 3, Office 301, 1075 Nicosia, Cypr) |
| Kontakt rejestratora | `domains@dropped.pl` · Tel. +357.22761649 |
| NS | `ns1.aftermarket.hosting` / `ns2.aftermarket.hosting` |
| Opcja NASK | aktywna u podmiotu trzeciego · 2025-06-09 → 2028-06-09 |
| DNSSEC | Signed |

**WHOIS online (NASK):** https://www.dns.pl/whois  
**Odpowiedzi bazy WHOIS:** https://dns.pl/en/whois

### Czy formularz pośredniczący NASK?

| Pytanie | Odpowiedź |
|---------|-----------|
| Rejestrator = NASK? | **NIE** — rejestratorem jest **Aftermarket.pl Limited** |
| Link „Formularz kontaktowy z abonentem” na dns.pl/whois? | **Nie dotyczy** (pojawia się przy rejestratorze NASK) |
| Właściwa bramka kontaktowa | Formularz **Aftermarket.pl** — sekcja WHOIS / kontakt z abonentem |
| URL kontaktu rejestratora (z WHOIS) | http://www.AfterMarket.pl/contact.php |

Operator sprawdza na stronie rejestratora, czy dostępny jest formularz „Kontakt z abonentem domeny” dla `konstytucja.pl`. Jeśli nie — kanał `domains@dropped.pl` jako zapasowy (ręczny e-mail, nie masowy).

---

## KROK 1: POBRANIE PARAMETRÓW TRANZYTOWYCH (WHOIS)

Przed wysłaniem komunikatu należy ustalić węzeł rejestratora:

1. Uruchom przeglądarkę i przejdź pod adres: **https://www.dns.pl/whois**
2. Wprowadź target: `konstytucja.pl` i przejdź test Captcha.
3. Zlokalizuj pole **„Rejestrator / Registrar”**.

**Wynik dla tej operacji (CLI, bez Captcha):** `Aftermarket.pl Limited` — nie NASK.

---

## KROK 2: AKTYWACJA BRAMKI KONTAKTOWEJ

- **Jeżeli Rejestrator = NASK:** Kliknij link bezpośredni pod wynikiem: **„Formularz kontaktowy z abonentem”** (na stronie wyniku WHOIS dns.pl).
- **Jeżeli Rejestrator = inny podmiot** ← **TEN PRZYPADEK:** Wejdź na stronę danego rejestratora w sekcję WHOIS i aktywuj formularz **„Kontakt z abonentem”**.

**Dla `konstytucja.pl` (2026-06-25):**

1. Potwierdź rejestratora na https://www.dns.pl/whois (opcjonalnie — już znany z CLI).
2. Przejdź do formularza rejestratora: **http://www.AfterMarket.pl/contact.php**
3. Wybierz ścieżkę kontaktu z abonentem domeny (jeśli oferowana w panelu WHOIS Aftermarket.pl).

---

## KROK 3: ŁADOWANIE PAYLOADU (TREŚĆ MANIFESTU)

Skopiuj poniższy blok tekstowy i umieść go w polu wiadomości formularza.

**Przed wysłaniem uzupełnij placeholdery** — agent nie wstawia danych osobowych operatora.

```
--- BEGIN PAYLOAD ---
Temat: Zapytanie o współpracę obywatelską (projekt non-profit / Civic Tech) – domena konstytucja.pl

Dzień dobry,

Kontaktuję się z Panem/Panią jako z osobą fizyczną dysponującą domeną konstytucja.pl, korzystając z oficjalnego systemu pośredniczącego rejestratora.

Zwracam się z zapytaniem o przyszłość tego adresu w kontekście niezależnego projektu społecznego. Intencją nie jest zakup komercyjny, składanie ofert finansowych ani organizowanie publicznych zbiórek. Wychodzimy z założenia, że fundamenty obywatelskie nie powinny być przedmiotem handlu ani spekulacji rynkowej.

Rozwijamy inicjatywę o charakterze Civic Tech i Open Source (kod źródłowy dostępny publicznie dla każdego), działającą według założeń Civic Observation Protocol. Naszym celem jest stworzenie transparentnego, apolitycznego narzędzia obserwacji i laboratorium społecznego służącego wszystkim obywatelom – realizując ideę działań tworzonych przez ludzi dla ludzi.

Chcielibyśmy zaproponować Panu/Pani udział w tym przedsięwzięciu poprzez wniesienie domeny konstytucja.pl jako wkładu własnego (donacji dla dobra wspólnego) lub objęcie roli patrona/współtwórcy tego cyfrowego narzędzia.

Jeśli idea budowy transparentnego, niezależnego systemu rezonuje z Pana/Pani wartościami i jest Pan/Pani otwarty(-a) na rozmowę o bezinteresownym partnerstwie obywatelskim, prosimy o sygnał zwrotny.

Z wyrazami szacunku,
[IMIĘ/PROJEKT]

Kanał zwrotny: [EMAIL]
--- END PAYLOAD ---
```

| Placeholder | Operator uzupełnia przed wysłaniem |
|-------------|-------------------------------------|
| `[IMIĘ/PROJEKT]` | Imię lub nazwa projektu (np. WARSZAWASZA / FIRA) |
| `[EMAIL]` | Adres zwrotny — ten sam w polu „E-mail nadawcy” formularza |

---

## KROK 4: SFINALIZOWANIE TRANSMISJI

1. W polu **„E-mail nadawcy”** w formularzu wpisz swój adres zwrotny (identyczny jak `[EMAIL]` w Payloadzie).
2. Wyślij formularz ręcznie.
3. Po wysłaniu przez rejestratora/NASK: system pośredniczący wysyła automatyczną pętlę zwrotną potwierdzającą nadanie do skrzynki odbiorcy (jeśli ścieżka NASK — przy rejestratorze zewnętrznym procedura zależy od Aftermarket.pl).

**Nie wykonywać automatycznie:** Captcha, dane osobowe, wielokrotne wysyłki.

---

## Cross-reference: `fira/FIELD_DOMAIN_konstytucja.md`

| Fakt z artefaktu pola | Implikacja dla emisji |
|-----------------------|----------------------|
| Domena uśpiona (parking aftermarket) | Kontakt ma sens jako zapytanie o intencję abonenta — nie zakup |
| Wycena 20–100k PLN, COP FALSE na broker | Payload wyraźnie wyklucza ofertę finansową |
| Opcja NASK zajęta do 2028-06-09 | Emisja nie konkuruje z kolejką opcji |
| Kanoniczna dystrybucja: `warszawasza.online` | Propozycja dotyczy wkładu domeny, nie migracji protokołu bez decyzji |
| Cisza operacyjna domyślna | Ta operacja wymaga osobnego sygnału operatora `[TRUE]` — spełniony przez zlecenie emisji |

---

## Checklist operatora (przed SEND)

- [ ] Uzupełniono `[IMIĘ/PROJEKT]` i `[EMAIL]`
- [ ] Potwierdzono rejestratora na dns.pl/whois (opcjonalnie)
- [ ] Otwarto formularz Aftermarket.pl (nie NASK dns.pl)
- [ ] Payload wklejony bez zmian merytorycznych
- [ ] Jedna transmisja — brak powtórek / masowego wysyłania

---

Wersja artefaktu: **0.1** · zgodna z FOP/0.1 · **mandat emisji, nie mandat zakupu**
