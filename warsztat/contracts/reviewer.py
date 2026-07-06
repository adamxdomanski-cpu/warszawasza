from warsztat.contracts.case import Case
from warsztat.contracts.evidence import Evidence
from warsztat.contracts.observation import Observation


class Reviewer:
    """
    Jeden kontrakt — wiele profili.

    Profesor = epistemic · Gil = communication · field/safety = teren
    """

    name: str
    profile: str

    def review(self, case: Case, observations: list[Observation]) -> list[Evidence]:
        raise NotImplementedError
