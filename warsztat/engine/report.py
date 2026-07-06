from __future__ import annotations

from warsztat.contracts.assessment import Assessment


def print_assessment(assessment: Assessment, *, reality_notes: list[str] | None = None) -> None:
    print("=" * 70)
    print(f"ASSESSMENT · {assessment.case_id} · profil: {assessment.profile}")
    print("=" * 70)

    if not assessment.evidence:
        print(f"Orientacja: {assessment.orientation.name}")
        print(f"Niepewność: {assessment.uncertainty.name}")
        print("→ Brak dopasowania w profilu. Silnik milczy.")
    else:
        print(f"Orientacja: {assessment.orientation.name}")
        print(f"Pewność: {assessment.confidence:.2f} · Niepewność: {assessment.uncertainty.name}")
        if assessment.attention_sector:
            print(f"Sektor uwagi: {assessment.attention_sector}")
        for ev in assessment.evidence:
            print("-" * 40)
            print(f"[{ev.reviewer}] {ev.evidence_type} · {ev.severity.name}")
            print(f"  {ev.message} ({ev.reason})")

    if reality_notes:
        print("-" * 40)
        for note in reality_notes:
            print(f"Reality: {note}")

    print("=" * 70)
    print("Decyzja operacyjna → Operator (człowiek / procedura organizacji)")
