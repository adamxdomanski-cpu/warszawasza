from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from warsztat.contracts.assessment import Assessment
from warsztat.contracts.case import Case
from warsztat.contracts.evidence import Evidence
from warsztat.contracts.matcher import Matcher
from warsztat.contracts.observation import Observation
from warsztat.contracts.observer import Observer
from warsztat.contracts.reviewer import Reviewer
from warsztat.engine.assessment_engine import AssessmentEngine
from warsztat.engine.observation_bus import ObservationBus
from warsztat.reality.experiment import Reality


def load_profile(path: str | Path) -> dict[str, Any]:
    p = Path(path)
    data = json.loads(p.read_text(encoding="utf-8"))
    if "reviewers" not in data:
        raise ValueError(f"Profil bez reviewers: {p}")
    return data


class Pipeline:
    """
    Evidence Pipeline — jeden przepływ, wiele profili.

    ingest → observe → match → review → assess → test
    """

    def __init__(
        self,
        case: Case,
        reviewers: list[Reviewer],
        observers: list[Observer] | None = None,
        matchers: list[Matcher] | None = None,
        bus: ObservationBus | None = None,
        engine: AssessmentEngine | None = None,
        reality: Reality | None = None,
    ) -> None:
        self.case = case
        self.reviewers = reviewers
        self.observers = observers or []
        self.matchers = matchers or []
        self.bus = bus or ObservationBus()
        self.engine = engine or AssessmentEngine()
        self.reality = reality or Reality()

    def ingest(self, raw: Any, *, source: str | None = None) -> Observation | None:
        for observer in self.observers:
            if source and observer.source != source:
                continue
            observation = observer.ingest(raw)
            if observation is not None:
                self.bus.publish(observation)
                return observation
        return None

    def observe(self) -> list[Observation]:
        return self.bus.drain()

    def match(self, observations: list[Observation]) -> list[Observation]:
        if not self.matchers:
            return observations
        return [o for o in observations if any(m.match(o) for m in self.matchers)]

    def review(self, observations: list[Observation]) -> list[Evidence]:
        evidence: list[Evidence] = []
        for reviewer in self.reviewers:
            evidence.extend(reviewer.review(self.case, observations))
        return evidence

    def assess(self, evidence: list[Evidence]) -> Assessment:
        return self.engine.assess(self.case.id, self.case.profile, evidence)

    def test(self, assessment: Assessment) -> list[str]:
        return self.reality.review(assessment)

    def run(self, raw_inputs: list[Any]) -> tuple[Assessment, list[str]]:
        for raw in raw_inputs:
            self.ingest(raw)
        observations = self.match(self.observe())
        assessment = self.assess(self.review(observations))
        return assessment, self.test(assessment)
