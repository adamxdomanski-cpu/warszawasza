from __future__ import annotations

import unittest

from warsztat.adapters.manual.observer import ManualObserver
from warsztat.adapters.radio.matcher import RegexMatcher
from warsztat.adapters.radio.observer import RadioObserver
from warsztat.contracts.case import Case
from warsztat.contracts.evidence import Evidence, Orientation, Severity, Span
from warsztat.engine.pipeline import Pipeline


class StubReviewer:
    name = "stub"
    profile = "field/safety"

    def review(self, case, observations):
        out: list[Evidence] = []
        for obs in observations:
            text = obs.payload if isinstance(obs.payload, str) else str(obs.payload)
            if "mdleje" in text.lower():
                out.append(
                    Evidence(
                        reviewer="medical",
                        evidence_type="Medical",
                        severity=Severity.HIGH,
                        confidence=0.85,
                        location=Span(sector=obs.sector),
                        message="Wzrost ryzyka medycznego",
                        reason=obs.source,
                        observation_id=obs.observation_id,
                    )
                )
        return out


class TestPipeline(unittest.TestCase):
    def test_ingest_observe_match_review_assess_test(self) -> None:
        case = Case(
            id="sobota-2030",
            question="Gdzie skierować uwagę sztabu?",
            profile="field/safety",
        )
        pipeline = Pipeline(
            case=case,
            reviewers=[StubReviewer()],
            observers=[ManualObserver(), RadioObserver()],
            matchers=[RegexMatcher([r"mdleje|zator|incydent"])],
        )
        pipeline.ingest(
            {"source": "radio", "sector": "Mała Scena B", "data": "Człowiek mdleje w trzecim rzędzie"},
            source="radio",
        )
        pipeline.ingest(
            {"source": "radio", "sector": "Allegro", "data": "Na razie spokojnie"},
            source="radio",
        )
        observations = pipeline.match(pipeline.observe())
        self.assertEqual(len(observations), 1)
        assessment = pipeline.assess(pipeline.review(observations))
        self.assertEqual(assessment.orientation, Orientation.INCIDENT)
        notes = pipeline.test(assessment)
        self.assertIn("testu terenowego", notes[0])


if __name__ == "__main__":
    unittest.main()
