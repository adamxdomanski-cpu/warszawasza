from __future__ import annotations

from dataclasses import dataclass, field

from warsztat.models.finding import Finding


@dataclass
class ReviewerSection:
    """Wynik jednego recenzenta."""

    name: str
    findings: list[Finding] = field(default_factory=list)
    metrics: dict[str, float | str | bool] = field(default_factory=dict)

    @property
    def has_warnings(self) -> bool:
        from warsztat.models.finding import FindingKind

        return any(f.kind == FindingKind.WARNING for f in self.findings)


@dataclass
class ReviewReport:
    """Pełny raport pipeline + opcjonalnie Rzeczywistość."""

    document_source: str
    sections: list[ReviewerSection] = field(default_factory=list)
    reality: list[Finding] = field(default_factory=list)

    def section(self, name: str) -> ReviewerSection | None:
        for s in self.sections:
            if s.name == name:
                return s
        return None
