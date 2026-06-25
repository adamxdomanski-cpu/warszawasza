#!/usr/bin/env python3
"""
electoral_mandate_proof.py — determinism proof artifact for electoral domain.

Reads a published determinism_input JSON (from v_election_determinism_input or file)
and reproduces mandate assignment for a named calculation_algorithm.

This is a COP laboratory replication tool — NOT Państwowa Komisja Wyborcza output.
Stdlib only. No pip dependencies.

Exit codes: 0 OK · 1 parse/validation error · 2 unsupported algorithm (stub)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from collections import defaultdict
from typing import Any


SUPPORTED_ALGORITHMS = ("D_HONDT", "SAINTE_LAGUE", "HARE_NIEMEYER")


def load_input(path: str | None) -> dict[str, Any]:
    if path and path != "-":
        with open(path, encoding="utf-8") as fh:
            raw = fh.read()
    else:
        raw = sys.stdin.read()
    if not raw.strip():
        raise ValueError("empty input")
    data = json.loads(raw)
    if not isinstance(data, dict):
        raise ValueError("input must be a JSON object")
    return data


def determinism_checksum(payload: dict[str, Any]) -> str:
    canonical = json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def committee_votes_by_district(data: dict[str, Any]) -> dict[int, dict[str, dict[str, Any]]]:
    """district_number -> committee_id -> {committee_name, vote_count, candidates[]}."""
    buckets: dict[int, dict[str, dict[str, Any]]] = defaultdict(
        lambda: defaultdict(
            lambda: {"committee_name": "", "vote_count": 0, "candidates": []}
        )
    )
    for row in data.get("candidates", []):
        if not isinstance(row, dict):
            continue
        district_number = int(row["district_number"])
        committee_id = str(row["committee_id"])
        vote_count = int(row.get("vote_count", 0))
        entry = buckets[district_number][committee_id]
        entry["committee_name"] = str(row.get("committee_name", ""))
        entry["vote_count"] += vote_count
        entry["candidates"].append(row)
    for district in buckets.values():
        for entry in district.values():
            entry["candidates"].sort(
                key=lambda c: (int(c.get("ballot_position", 0)), str(c.get("candidate_name", "")))
            )
    return buckets


def seat_capacity_map(data: dict[str, Any]) -> dict[int, int]:
    capacities: dict[int, int] = {}
    for row in data.get("districts", []):
        if not isinstance(row, dict):
            continue
        capacities[int(row["district_number"])] = int(row["seat_capacity"])
    return capacities


def allocate_dhondt(votes: dict[str, int], seats: int) -> dict[str, int]:
    if seats <= 0:
        return {key: 0 for key in votes}
    assigned = {key: 0 for key in votes}
    for _ in range(seats):
        winner = max(
            votes.keys(),
            key=lambda k: votes[k] / (assigned[k] + 1),
        )
        assigned[winner] += 1
    return assigned


def allocate_sainte_lague(_votes: dict[str, int], _seats: int) -> dict[str, int]:
    raise NotImplementedError("SAINTE_LAGUE: stub — publish divisor spec before enabling")


def allocate_hare_niemeyer(_votes: dict[str, int], _seats: int) -> dict[str, int]:
    raise NotImplementedError("HARE_NIEMEYER: stub — publish largest-remainder spec before enabling")


ALLOCATORS = {
    "D_HONDT": allocate_dhondt,
    "SAINTE_LAGUE": allocate_sainte_lague,
    "HARE_NIEMEYER": allocate_hare_niemeyer,
}


def build_mandates(data: dict[str, Any], algorithm: str) -> dict[str, Any]:
    if algorithm not in ALLOCATORS:
        raise ValueError(f"unknown algorithm: {algorithm}")

    if algorithm != "D_HONDT":
        raise NotImplementedError(f"{algorithm}: stub — publish divisor spec before enabling")

    capacities = seat_capacity_map(data)
    by_district = committee_votes_by_district(data)
    allocator = ALLOCATORS[algorithm]

    mandates: list[dict[str, Any]] = []
    district_results: list[dict[str, Any]] = []

    for district_number in sorted(by_district.keys()):
        committees = by_district[district_number]
        seats = capacities.get(district_number, 0)
        vote_map = {cid: int(info["vote_count"]) for cid, info in committees.items()}
        try:
            seat_map = allocator(vote_map, seats)
        except NotImplementedError as exc:
            raise exc

        district_results.append(
            {
                "district_number": district_number,
                "seat_capacity": seats,
                "committee_seats": [
                    {
                        "committee_id": cid,
                        "committee_name": committees[cid]["committee_name"],
                        "vote_count": vote_map[cid],
                        "seats_assigned": seat_map.get(cid, 0),
                    }
                    for cid in sorted(committees.keys())
                ],
            }
        )

        seat_rank = 1
        for cid in sorted(committees.keys()):
            for _ in range(seat_map.get(cid, 0)):
                candidates = committees[cid]["candidates"]
                if not candidates:
                    continue
                pick = candidates[(seat_rank - 1) % len(candidates)]
                mandates.append(
                    {
                        "district_number": district_number,
                        "seat_number": seat_rank,
                        "committee_id": cid,
                        "candidate_id": pick.get("candidate_id"),
                        "candidate_name": pick.get("candidate_name"),
                    }
                )
                seat_rank += 1

    output = {
        "artifact_type": "determinism_proof",
        "artifact_version": "cop-electoral-audit-1",
        "election_id": data.get("election_id"),
        "calculation_algorithm": algorithm,
        "district_results": district_results,
        "mandates": mandates,
    }
    output["determinism_checksum"] = determinism_checksum(
        {k: v for k, v in data.items() if k != "determinism_checksum"}
    )
    output["proof_checksum"] = determinism_checksum(output)
    return output


def main() -> int:
    parser = argparse.ArgumentParser(
        description="COP electoral mandate determinism proof (stdlib only, not PKW).",
    )
    parser.add_argument(
        "input",
        nargs="?",
        default="-",
        help="Determinism JSON file path (default: stdin)",
    )
    parser.add_argument(
        "--algorithm",
        choices=SUPPORTED_ALGORITHMS,
        help="Override calculation_algorithm from input JSON",
    )
    parser.add_argument(
        "--verify-checksum",
        action="store_true",
        help="Fail if input determinism_checksum does not match recomputed hash",
    )
    args = parser.parse_args()

    try:
        data = load_input(None if args.input == "-" else args.input)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    algorithm = args.algorithm or str(data.get("calculation_algorithm", "")).strip()
    if algorithm not in SUPPORTED_ALGORITHMS:
        print(f"ERROR: missing or unsupported calculation_algorithm: {algorithm!r}", file=sys.stderr)
        return 1

    if args.verify_checksum:
        expected = data.get("determinism_checksum")
        if not expected:
            print("ERROR: --verify-checksum set but input has no determinism_checksum", file=sys.stderr)
            return 1
        recomputed = determinism_checksum(
            {k: v for k, v in data.items() if k != "determinism_checksum"}
        )
        if str(expected).lower() != recomputed:
            print("ERROR: determinism_checksum mismatch", file=sys.stderr)
            return 1

    try:
        result = build_mandates(data, algorithm)
    except NotImplementedError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
