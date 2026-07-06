from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class FindingKind(str, Enum):
    OK = "ok"
    WARNING = "warning"
    INFO = "info"


@dataclass(frozen=True)
class Finding:
    kind: FindingKind
    message: str
    excerpt: str | None = None

    @classmethod
    def ok(cls, message: str = "brak błędów") -> Finding:
        return cls(FindingKind.OK, message)

    @classmethod
    def warning(cls, message: str, *, excerpt: str | None = None) -> Finding:
        return cls(FindingKind.WARNING, message, excerpt)

    @classmethod
    def info(cls, message: str, *, excerpt: str | None = None) -> Finding:
        return cls(FindingKind.INFO, message, excerpt)
