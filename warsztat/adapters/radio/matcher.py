from __future__ import annotations

import re

from warsztat.contracts.observation import Observation


class RegexMatcher:
    """Prototyp — wymienny adapter Matcher."""

    name = "regex"

    def __init__(self, patterns: list[str]) -> None:
        self._patterns = [re.compile(p, re.IGNORECASE) for p in patterns]

    def match(self, observation: Observation) -> bool:
        text = observation.payload if isinstance(observation.payload, str) else str(observation.payload)
        return any(p.search(text) for p in self._patterns)
