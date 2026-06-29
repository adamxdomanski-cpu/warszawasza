# Test terenowy · 5 sekund → telefon do kieszeni

**Cel:** sprawdzić, czy interfejs **nie zatrzymuje** człowieka, tylko **wpuszcza go z powrotem w rzeczywistość**.

**Metryka sukcesu:** efektywność wyjścia — nie retention, nie scroll depth.

```
Wejście → Zrozumienie → Decyzja → Telefon do kieszeni
```

---

## Kiedy uruchamiać

- Po merge PR z cold start (`/` + `/field/heat` voice-first).
- **Przed** PWA, native, nowymi feature’ami.
- Jedna zmiana na obrót spirali po każdym failu.

---

## Materiały

| Co wysyłasz | Czego **nie** wysyłasz |
|-------------|------------------------|
| Sam link: `https://www.warszawasza.online/` **lub** `/field/heat` | Wyjaśnienia, demo, FOP, kontekst projektu |
| Jedno zdanie (patrz niżej) | Pomoc, podpowiedzi, „kliknij tutaj” |

**Jedyna instrukcja (PL):**

> Otwórz link i zrób to, co według ciebie ma sens.

---

## Obserwator (Ty)

Cicho, bez pomocy. Notuj **zachowanie**, nie opinię estetyczną.

### T₀–5 s (pierwsze wrażenie)

- Gdzie patrzy?
- Czy dotyka ekranu bez czytania długich bloków?
- Czy **wie, że może coś zrobić** (nawet jeśli nie wie co)?

### T₀–30 s (decyzja)

- Czy wybiera 🎤, 📍, czy nic?
- Ile tapnięć do pierwszej sensownej akcji?
- Czy **schował telefon** po pierwszej decyzji? (to jest **PASS** operacyjny)

### Po ~10 s — **jedno pytanie**

> Jak myślisz, do czego służy ta strona?

Zapisz dosłownie. Nie dopytuj.

---

## Werdykt

### PASS (architektura działa)

Odpowiedź bliska:

- „Mogę znaleźć pomoc / wodę / coś w pobliżu.”
- „Mogę powiedzieć / zgłosić, co widzę.”
- Krótki opis dwóch kierunków bez żargonu.

**Plus:** użytkownik **kończy** interakcję w sensownym czasie (< ~60 s dla prostego zadania).

### FAIL (sygnalizator UI/copy, nie wina testera)

- „Strona o Warszawie…”
- „Nie wiem.” / „Jakiś projekt?”
- Długie czytanie przed pierwszym tapem.
- Paraliż wyboru (5+ s bez akcji).

→ **Jedna zmiana** (copy, kolejność, jeden element szumu). Retest.

---

## Warianty (opcjonalnie, osobne sesje)

| Wariant | Link | Hipoteza |
|---------|------|----------|
| A · cold | `/` | Dwa kierunki bez sygnału |
| B · upał | `/field/heat` | Sygnał 39°C + słownik wody |
| C · stress | `/field/heat` | „Wyobraź sobie, że jest bardzo gorąco” — bez kontekstu projektu |

Nie mieszaj wariantów w jednej sesji z tym samym testerem.

---

## Arkusz notatek (skrót)

```
Data:
Tester: (zero kontekstu projektu)
Link:
Wariant: A / B / C

T+5s:  zachowanie:
T+10s: odpowiedź na pytanie (cytat):
Akcja: 🎤 / 📍 / brak / inne
Tapy do akcji:
Schował telefon? TAK / NIE
PASS / FAIL
Jedna zmiana na następną spiralę:
```

---

## Powiązane

- [final-integration-pass.md](final-integration-pass.md) — integracja techniczna
- [WARSZAWASZA w dwóch minutach](../WARSZAWASZA-w-dwoch-minutach.md) — PO CO
- Issue: [.github/ISSUE_TEMPLATE/feature-proposal.yml](../../.github/ISSUE_TEMPLATE/feature-proposal.yml)
