from __future__ import annotations

from typing import Any

from warsztat.contracts.observation import Observation


class RadioObserver:
    source = "radio"

    def ingest(self, raw: Any) -> Observation | None:
        if isinstance(raw, dict) and raw.get("source", "radio") == "radio":
            return Observation(
                source=self.source,
                payload=str(raw.get("data", "")),
                sector=str(raw.get("sector", "")),
            )
        return None
