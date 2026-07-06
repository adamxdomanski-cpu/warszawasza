from __future__ import annotations

from warsztat.contracts.assessment import Assessment
from warsztat.contracts.evidence import Evidence
from warsztat.contracts.observation import Observation


def trace_evidence(
    evidence: Evidence,
    registry: dict[str, Observation],
) -> Observation | None:
    """Evidence → Observation (Aksjomat 31)."""
    if not evidence.observation_id:
        return None
    return registry.get(evidence.observation_id)


def explain_assessment(
    assessment: Assessment,
    registry: dict[str, Observation],
) -> list[str]:
    """Na podstawie czego powstała ocena? (Aksjomat 30)."""
    if not assessment.evidence:
        return ["Brak dowodów — milczenie (Aksjomat 32)."]
    lines: list[str] = []
    for ev in assessment.evidence:
        obs = trace_evidence(ev, registry)
        if obs:
            payload = obs.payload if isinstance(obs.payload, str) else str(obs.payload)
            lines.append(
                f"{ev.evidence_type} ← {ev.reviewer} ← obs:{obs.observation_id} "
                f"({obs.source}/{obs.sector}): {payload[:80]}"
            )
        else:
            lines.append(f"{ev.evidence_type} ← {ev.reviewer} (brak obserwacji w rejestrze)")
    return lines
