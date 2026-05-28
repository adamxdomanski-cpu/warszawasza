# =========================================================
# FIRA FIELD PHASE ENGINE
# DYNAMIC URBAN PHASES
#
# IDEA:
# city is not only a state
# city is a dynamic phase process
#
# =========================================================

# =========================================================
# FIELD PHASES
# =========================================================

def classify_field_phase(

    ufhi,
    trend,
    volatility,
    regeneration,
    entropy,
    synchronization,
    resonance_risk

):

    # -----------------------------------------------------
    # systemic collapse
    # -----------------------------------------------------

    if ufhi < 20:

        return {

            "phase": "SYSTEMIC COLLAPSE",

            "description":

                "field fragmentation "
                "and operational failure"
        }

    # -----------------------------------------------------
    # saturated
    # -----------------------------------------------------

    if (

        ufhi < 40

        and

        volatility > 10

    ):

        return {

            "phase": "SATURATED",

            "description":

                "persistent overload "
                "without recovery"
        }

    # -----------------------------------------------------
    # resonant
    # -----------------------------------------------------

    if (

        resonance_risk > 0.7

        and

        synchronization > 0.75

    ):

        return {

            "phase": "RESONANT",

            "description":

                "self-amplifying field "
                "synchronization"
        }

    # -----------------------------------------------------
    # fragmented
    # -----------------------------------------------------

    if (

        entropy > 0.8

        and

        synchronization < 0.25

    ):

        return {

            "phase": "FRAGMENTED",

            "description":

                "loss of coherent "
                "field structure"
        }

    # -----------------------------------------------------
    # recovery
    # -----------------------------------------------------

    if (

        trend > 4

        and

        regeneration > 4

    ):

        return {

            "phase": "RECOVERY",

            "description":

                "field rebuilding "
                "dynamic equilibrium"
        }

    # -----------------------------------------------------
    # dissipating
    # -----------------------------------------------------

    if (

        trend < -4

        and

        volatility < 5

    ):

        return {

            "phase": "DISSIPATING",

            "description":

                "controlled release "
                "of field pressure"
        }

    # -----------------------------------------------------
    # biophilic
    # -----------------------------------------------------

    if (

        ufhi > 85

        and

        entropy > 0.35

        and

        entropy < 0.65

    ):

        return {

            "phase": "BIOPHILIC",

            "description":

                "healthy adaptive "
                "urban ecosystem"
        }

    # -----------------------------------------------------
    # stable
    # -----------------------------------------------------

    return {

        "phase": "STABLE",

        "description":

            "operational equilibrium"
    }

# =========================================================
# EXAMPLE
# =========================================================

ufhi = 64

trend = 5.9

volatility = 3.4

regeneration = 5.9

entropy = 0.48

synchronization = 0.61

resonance_risk = 0.22

# =========================================================
# PHASE
# =========================================================

phase = classify_field_phase(

    ufhi,
    trend,
    volatility,
    regeneration,
    entropy,
    synchronization,
    resonance_risk

)

# =========================================================
# DISPLAY
# =========================================================

print()
print("======================================")
print("FIRA FIELD PHASE ENGINE")
print("======================================")
print()

print(
    f"[UFHI] {ufhi}"
)

print(
    f"[TREND] {trend}"
)

print(
    f"[VOLATILITY] {volatility}"
)

print(
    f"[REGENERATION] {regeneration}"
)

print()

print(
    f"[PHASE] "
    f"{phase['phase']}"
)

print()

print(
    f"[DESCRIPTION] "
    f"{phase['description']}"
)

print()
print("======================================")
