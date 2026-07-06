from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Debrief:
    """Po teście terenowym — rzeczywistość nadpisuje założenia."""

    decision_id: str
    first_signal: str = ""
    operator_action: str = ""
    sufficient: bool = False
    connection_worked: bool = False
    notes: list[str] = field(default_factory=list)
