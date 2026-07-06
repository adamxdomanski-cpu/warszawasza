#!/usr/bin/env python3
"""Symulacja Sobota 20:30 — profil field/safety."""

from __future__ import annotations

from warsztat.adapters.radio.observer import RadioObserver
from warsztat.contracts.case import Case
from warsztat.contracts.evidence import Orientation
from warsztat.contracts.provenance import explain_assessment
from warsztat.engine.pipeline import Pipeline
from warsztat.engine.report import print_assessment
from warsztat.profiles.field.safety.matcher import SafetyTriggerMatcher
from warsztat.profiles.field.safety.reviewers import FieldSafetyReviewer

SAFETY_TRIGGERS = {
    "tłum gęstnieje": "ZATOR",
    "zator przy wejściu": "ZATOR",
    "mdleje": "ZAGROŻENIE_ŻYCIA",
    "bójka": "ZAGROŻENIE_ŻYCIA",
}


def run_signal(pipeline: Pipeline, label: str, payload: dict) -> None:
    print(f"\n[INGEST] {label}")
    pipeline.ingest(payload, source="radio")
    observations = pipeline.match(pipeline.observe())
    if not observations:
        assessment = pipeline.assess([])
        print(f"→ {assessment.orientation.name} · {assessment.uncertainty.name} — milczenie.")
        return
    assessment = pipeline.assess(pipeline.review(observations))
    print_assessment(assessment, reality_notes=pipeline.test(assessment))
    for line in explain_assessment(assessment, pipeline.bus.registry):
        print(f"  [audyt] {line}")


def main() -> None:
    case = Case(
        id="sobota-2030",
        question="Gdzie skierować uwagę sztabu?",
        profile="field/safety",
    )
    matcher = SafetyTriggerMatcher(SAFETY_TRIGGERS)
    pipeline = Pipeline(
        case=case,
        reviewers=[FieldSafetyReviewer(matcher)],
        observers=[RadioObserver()],
        matchers=[matcher],
    )

    print("=" * 70)
    print("Evidence Pipeline · warsztat/ · profil field/safety")
    print("=" * 70)

    run_signal(
        pipeline,
        "Radio Allegro: ekipa kończy montaż, na razie spokojnie.",
        {"source": "radio", "sector": "Strefa Allegro", "data": "Przy Allegro ekipa kończy montaż."},
    )
    run_signal(
        pipeline,
        "Radio: tłum gęstnieje przy wejściu do sektora B.",
        {"source": "radio", "sector": "Mała Scena B", "data": "Tłum gęstnieje przy wejściu do sektora B."},
    )
    run_signal(
        pipeline,
        "Radio: incydent — człowiek mdleje w tłumie.",
        {"source": "radio", "sector": "Mała Scena B", "data": "Mamy incydent! Człowiek mdleje w tłumie!"},
    )


if __name__ == "__main__":
    main()
