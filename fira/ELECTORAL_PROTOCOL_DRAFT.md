# Protokół Wyborczy — przeniesiony

**Ten monolit został rozdzielony na trzy warstwy.** Nie utrzymuj normatywnych filarów w SQL ani w jednym pliku.

→ [`fira/electoral/README.md`](./electoral/README.md)

| Było tutaj | Jest teraz |
|------------|------------|
| Propozycje reform (progi, okręgi, listy, finanse) | [`electoral/MANIFEST_DRAFT.md`](./electoral/MANIFEST_DRAFT.md) |
| Schemat bazy, stream, audyt | [`electoral/ARCHITECTURE.md`](./electoral/ARCHITECTURE.md) · [`electoral/DOMAIN_MODEL.md`](./electoral/DOMAIN_MODEL.md) |
| COP / FIRA / deliberacja | [`electoral/COP_LENS.md`](./electoral/COP_LENS.md) |
| SQL lab z filarami I–V | `004` (cleanup) + `005_electoral_domain.sql` |

Instrument obywatelski bez zmian: [`/deliberation`](../frontend/app/deliberation/page.tsx).
