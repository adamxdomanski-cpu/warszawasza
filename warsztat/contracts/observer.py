from __future__ import annotations

from typing import Any, Protocol

from warsztat.contracts.observation import Observation


class Observer(Protocol):
    """Adapter źródła — radio, manual, markdown, BLE, pogoda…"""

    source: str

    def ingest(self, raw: Any) -> Observation | None:
        """Przyjęcie surowego wejścia. None = odrzucone / nieobsługiwane."""
        ...
