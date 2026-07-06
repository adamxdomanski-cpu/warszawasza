from __future__ import annotations

from warsztat.contracts.observation import Observation


class SafetyTriggerMatcher:
    """
    Profil field/safety — wymienny Matcher.
    Silnik nie zna słów kluczowych; profil je dostarcza.
    """

    name = "safety_triggers"

    def __init__(self, triggers: dict[str, str]) -> None:
        self._triggers = {k.lower(): v for k, v in triggers.items()}

    def match(self, observation: Observation) -> bool:
        text = observation.payload if isinstance(observation.payload, str) else str(
            observation.payload.get("text", observation.payload)
        )
        lower = text.lower()
        return any(trigger in lower for trigger in self._triggers)

    def category_for(self, observation: Observation) -> str | None:
        text = observation.payload if isinstance(observation.payload, str) else str(
            observation.payload.get("text", observation.payload)
        )
        lower = text.lower()
        for trigger, category in self._triggers.items():
            if trigger in lower:
                return category
        return None
