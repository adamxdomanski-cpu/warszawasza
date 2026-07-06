from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum

from warsztat.contracts.evidence import Evidence, Orientation


class Uncertainty(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    UNKNOWN = "unknown"


@dataclass(frozen=True)
class Assessment:
    """
    Ocena sytuacji — wynik assess().
    Nie decyzja operacyjna. Nie recommended_action.
    """

    case_id: str
    profile: str
    evidence: tuple[Evidence, ...] = ()
    orientation: Orientation = Orientation.UNKNOWN
    confidence: float = 0.0
    attention_sector: str | None = None
    uncertainty: Uncertainty = Uncertainty.UNKNOWN
