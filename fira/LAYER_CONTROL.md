# Layer Control — COP v1.0

**Status:** IMPLEMENTED (entity) · **UI:** pending v2.0

> Zastępuje metaforyczny „Data Mixer”. Trzy obserwowalne operacje: **włącz**, **wyłącz**, **nadaj wagę** (0–5).

Implementacja: [`frontend/lib/pipelineEngine.ts`](../frontend/lib/pipelineEngine.ts)

## Encje

| Typ | Rola |
|-----|------|
| `DataLayer` | `id`, `name`, `isActive`, `weight` |
| `LayerControlState` | `{ layers: DataLayer[] }` |
| `LayerWeightedSignal` | `{ layerId: string }` — wymagane na sygnale |

## Warstwy bazowe (WARSZAWASZA)

| id | name | default |
|----|------|---------|
| `LAYER_OBSERVATIONS` | Obserwacje mieszkańców | active · weight 3 |
| `LAYER_MAP_GEOMETRY` | Mapa i sektory | active · weight 1 |

## API

- `setLayerActive(state, layerId, isActive)` — włącz / wyłącz
- `setLayerWeight(state, layerId, weight)` — waga 0–5
- `calculateWeightedResult(state, signals)` — filtr sygnałów po aktywnych warstwach
- `activeLayerWeightSum(state)` — suma wag (wejście progu korelacji)

## Zasada

Interfejs modyfikuje wagi numeryczne warstw danych wejściowych w celu rekalkulacji wektora wyniku. Bez ocen, prognoz, metafor.

Draft kanałów CH_A/F/H/G: [`fira/DATA_MIXER.md`](./DATA_MIXER.md) (historyczny, v0.1).
