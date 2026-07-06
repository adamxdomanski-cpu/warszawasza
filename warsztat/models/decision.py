from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

from warsztat.io.simple_yaml import load_simple_yaml


@dataclass(frozen=True)
class Decision:
    """
    Przedmiot silnika — nie tekst.

    Tekst (artefakt) jest załącznikiem do pytania decyzyjnego.
    """

    id: str
    title: str
    question: str
    profile: str = "default"
    context: dict[str, str] = field(default_factory=dict)
    artifact_source: str = ""
    artifact_text: str = ""

    @classmethod
    def from_yaml(cls, path: str | Path) -> Decision:
        data = load_simple_yaml(path)
        artifact_path = data.get("artifact", "")
        artifact_text = ""
        if artifact_path:
            p = Path(artifact_path)
            if not p.is_absolute():
                p = Path(path).parent / p
            if p.exists():
                artifact_text = p.read_text(encoding="utf-8")
                artifact_source = str(p.resolve())
        return cls(
            id=str(data.get("id", "unnamed")),
            title=str(data.get("title", "")),
            question=str(data.get("question", "")),
            profile=str(data.get("profile", "default")),
            context={str(k): str(v) for k, v in data.get("context", {}).items()},
            artifact_source=artifact_source,
            artifact_text=artifact_text,
        )
