from __future__ import annotations

from warsztat.contracts.case import Case
from warsztat.contracts.evidence import Evidence, Severity, Span
from warsztat.contracts.observation import Observation
from warsztat.profiles.field.safety.matcher import SafetyTriggerMatcher

_CATEGORY_SEVERITY = {
    "ZATOR": Severity.MEDIUM,
    "ZAGROŻENIE_ŻYCIA": Severity.HIGH,
    "SPRZĘT": Severity.LOW,
}


class FieldSafetyReviewer:
    """
    Implementacja Reviewer dla profilu field/safety.
    Zwraca Evidence — nie scenariusz operacyjny.
    """

    name = "field_safety"
    profile = "field/safety"

    def __init__(self, matcher: SafetyTriggerMatcher) -> None:
        self._matcher = matcher

    def review(
        self,
        case: Case,
        observations: list[Observation],
    ) -> list[Evidence]:
        out: list[Evidence] = []
        for obs in observations:
            category = self._matcher.category_for(obs)
            if category:
                out.append(
                    Evidence(
                        reviewer=self.name,
                        evidence_type=category,
                        severity=_CATEGORY_SEVERITY.get(category, Severity.MEDIUM),
                        confidence=0.85,
                        location=Span(sector=obs.sector),
                        message=f"Wykryto barierę: {category}",
                        reason=obs.source,
                        observation_id=obs.observation_id,
                    )
                )
            battery = obs.payload.get("battery") if isinstance(obs.payload, dict) else None
            if battery is not None and int(battery) < 20:
                out.append(
                    Evidence(
                        reviewer=self.name,
                        evidence_type="SPRZĘT",
                        severity=Severity.LOW,
                        confidence=0.9,
                        location=Span(sector=obs.sector),
                        message="Krytyczny stan zasilania stacji",
                        reason=obs.source,
                        observation_id=obs.observation_id,
                    )
                )
        return out
