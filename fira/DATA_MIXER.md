# Data Mixer / Signal Blender — COP v1.0

> **Superseded (entity):** [`fira/LAYER_CONTROL.md`](./LAYER_CONTROL.md) — produkcyjny model to Layer Control (włącz / wyłącz / waga 0–5). Ten dokument zachowuje draft kanałów CH_A/F/H/G na v2.0.

**Status:** DRAFT v0.1 · **warstwa dystrybucji WARSZAWASZA** · nie jest częścią `fira/core/`

> **Mixer nie jest panelem DJ.** To interfejs wagowy dla strumieni danych — obserwowalny, niska entropia. Nie narracja, nie ranking, nie prognoza.

Powiązane: [`fira/PROTOCOL.md`](./PROTOCOL.md) · [`docs/protocol/log-format-v1.md`](../docs/protocol/log-format-v1.md) · [`frontend/lib/signalApi.ts`](../frontend/lib/signalApi.ts) · [`fira/STATE_DATA_MATRIX.md`](./STATE_DATA_MATRIX.md) · [`fira/CIVIC_ORGANIZATION_MATRIX.md`](./CIVIC_ORGANIZATION_MATRIX.md)

---

## 1. Cel

Operator ustawia **wagi kanałów 0–5** dla czterech klas źródeł. Silnik dystrybucji przelicza **macierz korelacji** na współrzędnych pola (miejsce × kategoria metryki × węzeł provenance). Gdy **ważona suma** w komórce przekracza **próg**, na mapie ASCII pojawia się punkt uwagi **`●`**.

Mixer odpowiada na pytanie:

**„Które przecięcia strumieni przekraczają próg przy tych wagach?”**

Nie odpowiada na: co zrobić, kto ma rację, jaka będzie przyszłość.

---

## 2. Encja: `MixerState`

Kanoniczny zapis (parseable, copy-paste, `observationsAlign`-ready w v2):

```
MIX/0.1
@2026-06-25T12:00:00.000Z
ch CH_A:4 CH_F:2 CH_H:3 CH_G:1
thr 12
q   tree_removal ∩ nik_report ∩ capital_link
```

| Pole | Typ | Zakres | Znaczenie |
|------|-----|--------|-----------|
| `CH_A` | int | 0–5 | Waga sygnału obywatelskiego (ulica, instrument) |
| `CH_F` | int | 0–5 | Waga struktury własnościowej (KRS / Rejestr.io) |
| `CH_H` | int | 0–5 | Waga nadzoru państwowego (NIK, MF, audyt) |
| `CH_G` | int | 0–5 | Waga palimpsestu historycznego (archiwa, Wikidata) |
| `thr` | int | 0–20 | Próg aktywacji `●` na współrzędnej (domyślnie: suma wag kanałów aktywnych w zapytaniu) |
| `q` | string | opcjonalne | Filtr semantyczny zapytania (tagi, kategorie metryk) — nie interpretacja |

**Waga 0** = kanał wyłączony z sumy (nie usuwa danych ze store — tylko z macierzy bieżącego przebiegu).

**Fingerprint:** `MIX/0.1` + posortowane `ch` + `thr` (bez `@` i bez `q` dla align stanu samego miksera).

---

## 3. Ontologia kanałów → COP

Cztery **suwaki miksera** mapują się na identyfikatory kanału źródła FOP/COP. Litera w `CH_*` jest **etykietą operatora** (A/F/H/G), nie indeksem alfabetycznym pełnego rejestru kanałów.

| Suwak | Etykieta operatora | Kanał COP | Źródła (dystrybucja) | Warstwa / węzły (`STATE_DATA_MATRIX`) |
|-------|-------------------|-----------|----------------------|----------------------------------------|
| **CH_A** | Street pulse | `CHANNEL_A_CITIZEN` | `civic_observations`, ślad obywatelski, `?ngo-watchdog=1` | URBAN / LITERACY (przez NGO matrix) |
| **CH_F** | Ownership structure | `CHANNEL_F_REGISTRY` | KRS, Rejestr.io, `capital_vector` w FOP | KAPITALOWA · `POL_NODE_KRS`, `POL_NODE_MF` |
| **CH_H** | State oversight | `CHANNEL_H_STATE_AUDIT` | NIK raporty, alerty MF, watchdog ∩ audyt | KONTROLA · `POL_NODE_NIK`, `POL_NODE_MF` |
| **CH_G** | Historical palimpsest | `CHANNEL_G_PALIMPSEST` | Wikipedia / Wikidata, NAC, NID | TOZSAMOŚCI · `POL_NODE_WIKIMEDIA`, `POL_NODE_ARCHIWA`, `POL_NODE_NID` |

### Kanały poza mikserem (nie wyłączane — po prostu bez suwaka)

| Kanał COP | Rola względem miksera |
|-----------|----------------------|
| `CHANNEL_B_CITY` | Pole miejskie — wchodzi do CH_A gdy `metric_category` miejska |
| `CHANNEL_C_SENSOR` | Instrument uwagi (dwell, scroll) — meta-sygnał, nie dowód treści |
| `CHANNEL_D_DOCUMENT` | Dokument edukacyjny — może wzmacniać CH_G gdy `ref` archiwalny |

`CHANNEL_H_STATE_AUDIT` i `CHANNEL_G_PALIMPSEST` są **rozszerzeniami dystrybucji** (jak w `CIVIC_ORGANIZATION_MATRIX.md`) — nie są w `fira/core/` ani w pełnym `SIGNAL_CHANNELS` do czasu v2 ingest.

---

## 4. Reguła master output

### 4.1 Wejście

Dla każdej współrzędnej `coord = (place_id | grid_cell, metric_category, optional source_node_id)`:

1. Zbierz obserwacje `O_c` pasujące do `q` (filtr tagów / kategorii).
2. Dla każdego kanału `k ∈ {A,F,H,G}` oblicz `s_k(c) ∈ [0,5]` — maksymalna lub suma ograniczona `payload_value` obserwacji przypisanych do kanału `k` w `c`.
3. **Ważona suma:** `W(c) = Σ_k w_k · s_k(c)` gdzie `w_k` = waga z `MixerState`.

### 4.2 Próg i punkt uwagi

```
attention(c) := W(c) ≥ thr
```

Gdy `attention(c)`:

- Na mapie ASCII w `c`: glif **`●`** (kanon: `STATE.active` w `frontend/lib/symbols.ts`).
- W logu operacyjnym (Log Format v1.0): linia VALIDATION, nie OUTPUT narracyjny.

Przykład VALIDATION:

```
coord R-7E · W=14 · thr=12 · CH_A:4×3 + CH_F:2×1 + CH_H:3×2 → ●
```

### 4.3 Korelacja / przecięcie (nie suma narracyjna)

Zapytanie operatora wymaga **przecięcia klas**, nie „dowolnego sygnału”:

```
q: tree_removal ∩ nik_report ∩ capital_link
```

Semantyka:

| Składnik `q` | Wymaganie na `c` |
|--------------|------------------|
| `tree_removal` | ≥1 obserwacja CH_A z `metric_category` / tagiem drzewa |
| `nik_report` | ≥1 obserwacja CH_H z `source_node_id = POL_NODE_NIK` |
| `capital_link` | ≥1 obserwacja CH_F z `rel capital_vector` lub `POL_NODE_KRS` |

**Macierz korelacji** `K[i,j]` = liczba współrzędnych, gdzie kanały `i` i `j` mają jednocześnie `s_k > 0`. Przeliczana przy każdej zmianie `MixerState` lub ingest — wynik **obserwowalny** (tabela ASCII), bez komentarza.

Przykład macierzy (n=3 kanały aktywne w `q`):

```
      A   F   H
  A   ·   3   2
  F   3   ·   1
  H   2   1   ·
```

Wartości = liczba współrzędnych z jednoczesnym sygnałem (nie „siła uczucia”).

### 4.5 Powiązanie z pipeline

Mixer działa **przed** etapem ◉ filtracji w sensie UX — dostarcza **wagę wejściową** do `intersectCivicOrg` / `applyCivicOrgTrustAtStage` (`frontend/lib/pipelineEngine.ts`). Nie zastępuje walidacji `✓`.

---

## 5. Rekomendacja interfejsu (normatywna)

### Decyzja: **Opcja C — hybryda**

| Warstwa | Mechanizm | Uzasadnienie |
|---------|-----------|--------------|
| **Wyświetlanie** | ASCII suwaki (Opcja B) | Niska entropia, mobile touch, brak hover-only |
| **Zapis / automacja** | Komendy `SET` / `MIX` (Opcja A) | Parseable FOP, Ray-Ban, clipboard, log v1.0 |
| **Źródło prawdy** | Linia `MIX/0.1` | `observationsAlign` w v2, copy-paste między operatorami |

**Dlaczego nie sama A:** brak natychmiastowej czytelności stanu na polu — wymaga pamięci składni.

**Dlaczego nie sama B:** suwak bez serializacji utrudnia ślad operacyjny i voice/gaze na Ray-Ban.

### 5.1 Wyświetlanie (touch-first)

```
MIXER ── thr 12
CH_A [──■──] 3/5  street
CH_F [────■] 2/5  registry
CH_H [───■─] 4/5  audit
CH_G [■────] 1/5  archive
```

- `■` = pozycja suwaka; `─` = tor (5 segmentów).
- Tap na segmencie ustawia wagę; każda zmiana emituje linię `SET CH_H=4`.
- `prefers-reduced-motion`: statyczny stan bez animacji toru.

### 5.2 Komendy (parseable)

```
SET CH_A=4
SET thr=12
MIX CH_A:4 CH_F:2 CH_H:3 CH_G:1
QUERY tree_removal ∩ nik_report ∩ capital_link
RUN
```

Parser dystrybucji: jedna komenda = jedna linia VALIDATION w logu sesji.

### 5.3 Output sesji (Log Format v1.0)

```
PROCESS
──────────────
MIX RUN · q=tree_removal ∩ nik_report ∩ capital_link

VALIDATION
──────────────
MixerState    CH_A:4 CH_F:2 CH_H:3 CH_G:1 · thr=12
Correlation   A∩F=3 · A∩H=2 · F∩H=1
Attention     2 coords · W≥thr → ●

OUTPUT
──────────────
2 attention points on ASCII grid

NEXT STEP
──────────────
Operator inspect ● at R-7E, M-12

ARTIFACT
──────────────
fira/DATA_MIXER.md
```

---

## 6. Kierunek implementacji

### Rekomendacja: **spec teraz · moduł v2.0 po deploy log format na prod**

| Czynnik | Stan |
|---------|------|
| Log Format v1.0 | Zaimplementowany lokalnie; prod @ `50f6bfe` bez pełnego deploy (`fira/TF_KEY.md`) |
| Kanały H/G | Brak w `SIGNAL_CHANNELS` — wymaga ingest + SQL provenance |
| Macierz korelacji | Wymaga `civic_observations` na DB (migracje 001–008 nieapplied na prod) |
| Koszt stub UI | >50 linii dla sensownego parsera + grid — **poza zakresem teraz** |

**Teraz (v0.1):** ten dokument + cross-link w `PROTOCOL.md` / `TF_KEY.md`.

**v2.0 (po `git push main` + build PASS):**

1. `frontend/lib/mixerState.ts` — parse/serialize `MIX/0.1`, `SET`, `MIX`
2. Rozszerzenie `signalApi.ts`: `CHANNEL_H_STATE_AUDIT`, `CHANNEL_G_PALIMPSEST`
3. Komponent `DataMixerPanel.tsx` — hybryda C, DRAFT marker, route `/` lub panel w `LivingInterface`
4. Hook do `intersectCivicOrg` — wagi jako mnożniki `trustWeight`

**Minimalny stub (<50 linii)** możliwy wyłącznie jako `parseMixerLine()` bez UI — opcjonalny, nie blokuje spec.

---

## 7. Przykład sesji operatora (parseable ASCII)

```
# --- stan początkowy ---
MIX/0.1
@2026-06-25T14:30:00.000Z
ch CH_A:0 CH_F:0 CH_H:0 CH_G:0
thr 10

# --- operator (voice / keyboard / tap → SET) ---
SET CH_A=5
SET CH_F=2
SET CH_H=4
SET CH_G=0
SET thr=11
QUERY tree_removal ∩ nik_report ∩ capital_link
RUN

# --- wynik miksera (nie narracja) ---
MIX/0.1
@2026-06-25T14:30:42.000Z
ch CH_A:5 CH_F:2 CH_H:4 CH_G:0
thr 11
out coords 2
out ● R-7E W=13 breakdown A:15 F:4 H:8
out ● M-12 W=12 breakdown A:10 F:6 H:6
corr
      A   F   H
  A   ·   3   2
  F   3   ·   1
  H   2   1   ·

# --- mapa (fragment) ---
············
····●···○···
············
```

Znaczenie zapytania z briefu:

> „Pokaż obserwacje wycinki drzew (CH_A) przecinające raporty NIK (CH_H) i podmioty kapitałowe (CH_F).”

= `QUERY` powyżej + wagi faworyzujące ulicę i audyt przy słabszym rejestrze.

---

## 8. Antywzorce

- ❌ Metafory DJ / „remixu” w UI copy i logach
- ❌ Hover-only suwaki bez odpowiednika `SET`
- ❌ OUTPUT typu „Miasto ukrywa prawdę” — tylko VALIDATION z liczbami
- ❌ Import miksera do `fira/core/`
- ❌ Waga jako „ocena jakości” organizacji — waga = **uwaga operatora na klasę źródła**, nie verdict

---

## 9. Wersjonowanie

| Wersja | Zakres |
|--------|--------|
| **MIX/0.1** (ten dokument) | 4 kanały, próg skalarny, przecięcie `q`, macierz 3×3 min |
| **MIX/0.2** (plan) | `coord` geohash, export FOP `src` per kanał |
| **v2 moduł** | UI + DB + `observationsAlign(mixerA, mixerB)` |

---

Wersja: **0.1 (DRAFT)** · walidacja operatora: 2026-06-25
