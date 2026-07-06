from __future__ import annotations

from warsztat.contracts.assessment import Assessment


class Reality:
    """Ostateczny recenzent — zawsze: zaprojektuj test."""

    def review(self, assessment: Assessment) -> list[str]:
        notes = ["Hipoteza wymaga testu terenowego."]
        if assessment.uncertainty == assessment.uncertainty.UNKNOWN:
            notes.append("Brak wystarczających danych — nie klasyfikuj na siłę.")
        return notes
