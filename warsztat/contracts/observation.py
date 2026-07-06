from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any
from uuid import uuid4


def _new_id() -> str:
    return uuid4().hex[:12]


@dataclass(frozen=True)
class Observation:
    """
    Surowy sygnał z terenu lub artefaktu — przed interpretacją.

    Evidence jest dopiero po Matcher + Reviewer.
    """

    source: str
    payload: str | dict[str, Any]
    sector: str = ""
    timestamp: float | None = None
    metadata: dict[str, str] = field(default_factory=dict)
    observation_id: str = field(default_factory=_new_id)
