from __future__ import annotations

from typing import Any

from warsztat.contracts.observation import Observation


class MarkdownObserver:
    """Artefakt dokumentacyjny — mail, propozycja, spec."""

    source = "markdown"

    def ingest(self, raw: Any) -> Observation | None:
        if isinstance(raw, str):
            return Observation(source=self.source, payload=raw, sector="document")
        if isinstance(raw, dict) and "text" in raw:
            return Observation(
                source=self.source,
                payload=str(raw["text"]),
                sector=str(raw.get("sector", "document")),
            )
        return None
