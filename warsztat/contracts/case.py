from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Case:
    """Sprawa do oceny — pytanie, nie decyzja. Decyzję podejmuje Operator."""

    id: str
    question: str
    profile: str
    title: str = ""
    context: dict[str, str] = field(default_factory=dict)
