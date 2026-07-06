from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class Severity(str, Enum):
    INFO = "info"
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Orientation(str, Enum):
    """Poziom orientacji — wynik agregacji Evidence, nie output recenzenta."""

    CLEAR = "clear"
    ATTENTION = "attention"
    INCIDENT = "incident"
    UNKNOWN = "unknown"


@dataclass(frozen=True)
class Span:
    claim_id: int | None = None
    sentence_index: int | None = None
    paragraph_index: int | None = None
    sector: str | None = None
    char_start: int | None = None
    char_end: int | None = None

    def label(self) -> str:
        if self.claim_id is not None:
            return f"Twierdzenie nr {self.claim_id}"
        if self.sector:
            return f"Sektor {self.sector}"
        if self.sentence_index is not None:
            return f"Zdanie nr {self.sentence_index + 1}"
        if self.paragraph_index is not None:
            return f"Akapit nr {self.paragraph_index + 1}"
        return "dokument"


@dataclass(frozen=True)
class Evidence:
    """Zinterpretowana obserwacja — dowód, nie decyzja operacyjna."""

    reviewer: str
    evidence_type: str
    severity: Severity
    confidence: float
    location: Span
    message: str
    reason: str = ""
    observation_id: str = ""
    recommendation: str | None = None

    def __post_init__(self) -> None:
        if not 0.0 <= self.confidence <= 1.0:
            raise ValueError(f"confidence poza [0,1]: {self.confidence}")
