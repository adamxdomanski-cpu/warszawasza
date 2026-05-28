class WarszawaszaEngine:

    def __init__(self):

        self.personas = ["MOJA", "TWOJA", "WASZA"]

        self.places = ["WARSZAWA", "MURANÓW", "PRAGA", "ŚRÓDMIEŚCIE"]

        self.states = ["", "SZA", "KOLAPS"]

    def process(self, text: str):

        t = text.upper()

        persona = None

        if "MOJA" in t:
            persona = "MOJA"
        elif "TWOJA" in t:
            persona = "TWOJA"
        elif "WASZA" in t:
            persona = "WASZA"

        state = "NORMAL"

        if "SZA" in t:
            state = "SILENCE"

        if "KOLAPS" in t:
            state = "COLLAPSE"

        return {
            "input": text,
            "persona": persona,
            "state": state,
            "output": f"WARSZAWASZA:: {text}"
        }

    def calculate_score(self, text, emotion):

        wearability = 5
        virality = 5
        identity_strength = 5

        if "MOJA" in text:
            identity_strength += 3

        if "TWOJA" in text:
            identity_strength += 2

        if "SZA" in text:
            virality += 2

        if "KOLAPS" in text:
            virality += 3
            wearability -= 1

        if len(text) < 18:
            wearability += 2

        total_score = wearability + virality + identity_strength

        return {
            "wearability": wearability,
            "virality": virality,
            "identity_strength": identity_strength,
            "total_score": total_score
        }

    def drop_001(self):

        drops = []

        for persona in self.personas:
            for place in self.places:
                for state in self.states:

                    text = f"{persona} {place}".strip()

                    if state:
                        text += f" {state}"

                    emotion = "IDENTITY"

                    if state == "SZA":
                        emotion = "SILENCE"

                    if state == "KOLAPS":
                        emotion = "COLLAPSE"

                    scores = self.calculate_score(text, emotion)

                    drops.append({
                        "text": text,
                        "type": "TSHIRT",
                        "emotion": emotion,
                        "channel": "IG_POST",
                        "scores": scores
                    })

        return sorted(
            drops,
            key=lambda x: x["scores"]["total_score"],
            reverse=True
        )

    def top_drops(self):
        return self.drop_001()[:5]