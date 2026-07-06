from __future__ import annotations

from typing import Any

from warsztat.contracts.observation import Observation


class ManualObserver:
    """Pierwsze źródło w terenie — bez nowej infrastruktury."""

    source = "manual"

    def ingest(self, raw: Any) -> Observation | None:
        if isinstance(raw, Observation):
            return raw
        if isinstance(raw, dict):
            payload = raw.get("data", raw.get("payload", ""))
            return Observation(
                source=self.source,
                payload=payload,
                sector=str(raw.get("sector", "")),
                metadata={k: str(v) for k, v in raw.get("metadata", {}).items()},
            )
        if isinstance(raw, str):
            return Observation(source=self.source, payload=raw)
        return None
