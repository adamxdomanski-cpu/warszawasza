from __future__ import annotations

import unittest

from warsztat.contracts.evidence import Evidence, Orientation, Severity, Span
from warsztat.contracts.observation import Observation
from warsztat.contracts.provenance import explain_assessment, trace_evidence
from warsztat.engine.assessment_engine import AssessmentEngine, aggregate_orientation


class TestAssessmentEngine(unittest.TestCase):
    def test_empty_is_unknown(self) -> None:
        self.assertEqual(aggregate_orientation([]), Orientation.UNKNOWN)

    def test_high_is_incident(self) -> None:
        ev = Evidence(
            reviewer="radio",
            evidence_type="Medical",
            severity=Severity.HIGH,
            confidence=0.9,
            location=Span(sector="B"),
            message="mdleje",
            reason="radio",
            observation_id="obs1",
        )
        self.assertEqual(aggregate_orientation([ev]), Orientation.INCIDENT)

    def test_provenance_chain(self) -> None:
        obs = Observation(source="radio", payload="mdleje", sector="B", observation_id="obs1")
        ev = Evidence(
            reviewer="field_safety",
            evidence_type="ZAGROŻENIE_ŻYCIA",
            severity=Severity.HIGH,
            confidence=0.9,
            location=Span(sector="B"),
            message="bariera",
            reason="radio",
            observation_id="obs1",
        )
        registry = {"obs1": obs}
        self.assertIs(trace_evidence(ev, registry), obs)
        assessment = AssessmentEngine().assess("case1", "field/safety", [ev])
        lines = explain_assessment(assessment, registry)
        self.assertTrue(any("obs1" in line for line in lines))


if __name__ == "__main__":
    unittest.main()
