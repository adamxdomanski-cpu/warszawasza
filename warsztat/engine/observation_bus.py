from __future__ import annotations

from dataclasses import dataclass, field

from warsztat.contracts.observation import Observation


@dataclass
class ObservationBus:
    """Magistrala surowych obserwacji — przed Matcher i Evidence."""

    observations: list[Observation] = field(default_factory=list)
    registry: dict[str, Observation] = field(default_factory=dict)

    def publish(self, observation: Observation) -> None:
        self.observations.append(observation)
        self.registry[observation.observation_id] = observation

    def drain(self) -> list[Observation]:
        batch = list(self.observations)
        self.observations.clear()
        return batch

    def peek(self) -> list[Observation]:
        return list(self.observations)
