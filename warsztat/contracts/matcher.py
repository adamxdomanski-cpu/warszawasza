from __future__ import annotations

from typing import Protocol

from warsztat.contracts.observation import Observation


class Matcher(Protocol):
    """Wymienny adapter — RegexMatcher, RuleMatcher, LLMMatcher… Pipeline nie wie który."""

    name: str

    def match(self, observation: Observation) -> bool:
        ...
