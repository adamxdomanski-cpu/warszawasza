from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class Document:
    """Tekst do recenzji — źródło prawdy dla pipeline."""

    text: str
    source: str = ""
    context: str = ""
    metadata: dict[str, str] = field(default_factory=dict)

    @classmethod
    def from_path(cls, path: str | Path, *, context: str = "") -> Document:
        p = Path(path)
        return cls(text=p.read_text(encoding="utf-8"), source=str(p), context=context)

    @property
    def lines(self) -> list[str]:
        return self.text.splitlines()
