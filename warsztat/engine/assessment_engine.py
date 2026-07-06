from __future__ import annotations

from warsztat.contracts.assessment import Assessment, Uncertainty
from warsztat.contracts.evidence import Evidence, Orientation, Severity


def aggregate_orientation(evidence: list[Evidence]) -> Orientation:
    if not evidence:
        return Orientation.UNKNOWN
    severities = {e.severity for e in evidence}
    if Severity.HIGH in severities:
        return Orientation.INCIDENT
    if Severity.MEDIUM in severities or Severity.LOW in severities:
        return Orientation.ATTENTION
    if all(e.severity == Severity.INFO for e in evidence):
        return Orientation.CLEAR
    return Orientation.UNKNOWN


def _attention_sector(evidence: list[Evidence]) -> str | None:
    if not evidence:
        return None
    ranked = sorted(
        evidence,
        key=lambda e: (
            0 if e.severity == Severity.HIGH else 1 if e.severity == Severity.MEDIUM else 2,
            -e.confidence,
        ),
    )
    sector = ranked[0].location.sector
    return sector or None


def _uncertainty(evidence: list[Evidence], orientation: Orientation) -> Uncertainty:
    if not evidence:
        return Uncertainty.UNKNOWN
    if orientation == Orientation.INCIDENT:
        return Uncertainty.LOW if all(e.confidence >= 0.8 for e in evidence) else Uncertainty.MEDIUM
    if orientation == Orientation.ATTENTION:
        return Uncertainty.MEDIUM
    if orientation == Orientation.CLEAR:
        return Uncertainty.LOW
    return Uncertainty.HIGH


class AssessmentEngine:
    """Porządkuje dowody w ocenę sytuacji. Nie podejmuje decyzji."""

    def assess(self, case_id: str, profile: str, evidence: list[Evidence]) -> Assessment:
        orientation = aggregate_orientation(evidence)
        confidence = max((e.confidence for e in evidence), default=0.0)
        return Assessment(
            case_id=case_id,
            profile=profile,
            evidence=tuple(evidence),
            orientation=orientation,
            confidence=confidence,
            attention_sector=_attention_sector(evidence),
            uncertainty=_uncertainty(evidence, orientation),
        )
