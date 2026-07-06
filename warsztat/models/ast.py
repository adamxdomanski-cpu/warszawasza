from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class ClaimKind(str, Enum):
    UNKNOWN = "unknown"
    OBSERVATION = "observation"
    FACT = "fact"
    HYPOTHESIS = "hypothesis"


@dataclass(frozen=True)
class Claim:
    id: int
    text: str
    sentence_index: int
    paragraph_index: int
    char_start: int
    char_end: int
    kind: ClaimKind = ClaimKind.UNKNOWN


@dataclass(frozen=True)
class Sentence:
    index: int
    text: str
    paragraph_index: int
    char_start: int
    char_end: int
    claims: tuple[Claim, ...] = ()


@dataclass(frozen=True)
class Paragraph:
    index: int
    text: str
    char_start: int
    char_end: int
    sentences: tuple[Sentence, ...] = ()


@dataclass
class DocumentAST:
    """Artefakt decyzji po parsowaniu — nie surowy string."""

    raw: str
    paragraphs: tuple[Paragraph, ...] = field(default_factory=tuple)

    @property
    def claims(self) -> list[Claim]:
        out: list[Claim] = []
        for para in self.paragraphs:
            for sent in para.sentences:
                out.extend(sent.claims)
        return out

    @property
    def sentences(self) -> list[Sentence]:
        out: list[Sentence] = []
        for para in self.paragraphs:
            out.extend(para.sentences)
        return out
