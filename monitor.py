#!/usr/bin/env python3
"""
monitor.py — transparent domain monitor for COP infrastructure.

WHOIS via subprocess only. No pip dependencies.
Exit codes: 0 OK · 1 parse/no data · 2 whois missing · 3 empty response · 124 timeout
"""

from __future__ import annotations

import argparse
import json
import platform
import re
import shutil
import subprocess
import sys
from pathlib import Path

DEFAULT_DOMAIN = "konstytucja.pl"

WHOIS_CANDIDATES = (
    "whois",
    "/usr/bin/whois",
    "/opt/homebrew/bin/whois",
    "/usr/local/bin/whois",
)

TLD_WHOIS_HOSTS: dict[str, str] = {
    "pl": "whois.dns.pl",
}


def find_whois() -> str | None:
    for candidate in WHOIS_CANDIDATES:
        if candidate == "whois":
            found = shutil.which("whois")
            if found:
                return found
        elif Path(candidate).is_file():
            return candidate
    return None


def whois_host_for(domain: str) -> str | None:
    tld = domain.rsplit(".", 1)[-1].lower()
    return TLD_WHOIS_HOSTS.get(tld)


def run_whois(domain: str, whois_bin: str) -> tuple[int, str]:
    cmd = [whois_bin]
    host = whois_host_for(domain)
    if host:
        cmd.extend(["-h", host])
    cmd.append(domain)

    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=30,
        )
    except subprocess.TimeoutExpired:
        return 124, "WHOIS query timed out (30s)"
    except OSError as exc:
        return 1, str(exc)

    output = (proc.stdout or "") + (proc.stderr or "")
    return proc.returncode, output


def _first_match(text: str, patterns: list[re.Pattern[str]]) -> str | None:
    for line in text.splitlines():
        stripped = line.strip()
        for pat in patterns:
            m = pat.match(stripped)
            if m:
                return m.group(1).strip()
    return None


def parse_registrar_block(text: str) -> tuple[str | None, str | None]:
    """dns.pl uses a multi-line REGISTRAR: block."""
    lines = text.splitlines()
    collecting = False
    block: list[str] = []

    for line in lines:
        stripped = line.strip()
        if re.match(r"^REGISTRAR:\s*$", stripped, re.I):
            collecting = True
            continue
        if re.match(r"^REGISTRAR:\s+.+", stripped, re.I):
            collecting = True
            block.append(stripped.split(":", 1)[1].strip())
            continue
        if collecting:
            if not stripped:
                break
            if re.match(r"^[A-Z][A-Z0-9 /_-]+:", stripped):
                break
            block.append(stripped)

    if not block:
        single = _first_match(
            text,
            [
                re.compile(r"^Registrar:\s*(.+)$", re.I),
                re.compile(r"^registrar:\s*(.+)$", re.I),
            ],
        )
        return single, None

    name = block[0]
    address = ", ".join(block[1:3]) if len(block) > 1 else None
    return name, address


def parse_whois(text: str) -> dict[str, str]:
    registrar, registrar_address = parse_registrar_block(text)

    fields: dict[str, str] = {}
    if registrar:
        fields["registrar"] = registrar
    if registrar_address:
        fields["registrar_address"] = registrar_address

    scalar = {
        "domain": [
            re.compile(r"^DOMAIN NAME:\s*(.+)$", re.I),
            re.compile(r"^Domain Name:\s*(.+)$", re.I),
        ],
        "registrant_type": [re.compile(r"^registrant type:\s*(.+)$", re.I)],
        "created": [
            re.compile(r"^created:\s*(.+)$", re.I),
            re.compile(r"^Creation Date:\s*(.+)$", re.I),
        ],
        "last_modified": [
            re.compile(r"^last modified:\s*(.+)$", re.I),
            re.compile(r"^Updated Date:\s*(.+)$", re.I),
        ],
        "renewal": [
            re.compile(r"^renewal date:\s*(.+)$", re.I),
            re.compile(r"^Registry Expiry Date:\s*(.+)$", re.I),
            re.compile(r"^expiration date:\s*(.+)$", re.I),
        ],
        "option_expiration": [
            re.compile(r"^option expiration date:\s*(.+)$", re.I),
        ],
    }

    for key, patterns in scalar.items():
        val = _first_match(text, patterns)
        if val:
            fields[key] = val

    return fields


def print_human(domain: str, whois_bin: str, parsed: dict[str, str]) -> None:
    print(f"● COP monitor · {domain}")
    print(f"  whois: {whois_bin}")
    print()
    print(f"  domena:         {parsed.get('domain', domain)}")

    if parsed.get("registrant_type"):
        print(f"  abonent:        {parsed['registrant_type']}")
    if parsed.get("registrar"):
        print(f"  rejestrator:    {parsed['registrar']}")
        if parsed.get("registrar_address"):
            print(f"                  {parsed['registrar_address']}")
    if parsed.get("created"):
        print(f"  utworzono:      {parsed['created']}")
    if parsed.get("last_modified"):
        print(f"  modyfikacja:    {parsed['last_modified']}")
    if parsed.get("renewal"):
        print(f"  odnowienie:     {parsed['renewal']}")
    if parsed.get("option_expiration"):
        print(f"  opcja do:       {parsed['option_expiration']}")

    print()
    print("  Źródło: publiczny WHOIS · audytowalne · bez API komercyjnego")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="COP domain monitor — transparent WHOIS check (stdlib only).",
    )
    parser.add_argument(
        "domain",
        nargs="?",
        default=DEFAULT_DOMAIN,
        help=f"Domain to check (default: {DEFAULT_DOMAIN})",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit parsed fields as JSON",
    )
    args = parser.parse_args()

    whois_bin = find_whois()
    if not whois_bin:
        print("ERROR: whois not found.", file=sys.stderr)
        if platform.system() == "Darwin":
            print("macOS: install with `brew install whois`", file=sys.stderr)
        else:
            print("Install the whois package for your OS.", file=sys.stderr)
        return 2

    _code, output = run_whois(args.domain, whois_bin)
    if _code == 124:
        print(f"ERROR: {output}", file=sys.stderr)
        return 124
    if not output.strip():
        print("ERROR: empty WHOIS response", file=sys.stderr)
        return 3

    parsed = parse_whois(output)
    core_keys = ("registrar", "renewal", "created", "last_modified")
    has_core = any(k in parsed for k in core_keys)

    if args.json:
        payload = {"domain": args.domain, "whois_bin": whois_bin, **parsed}
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return 0 if has_core else 1

    if not has_core:
        print(f"● COP monitor · {args.domain}", file=sys.stderr)
        print("WARN: could not parse expected fields — raw output:", file=sys.stderr)
        print(output[:3000], file=sys.stderr)
        return 1

    print_human(args.domain, whois_bin, parsed)
    return 0


if __name__ == "__main__":
    sys.exit(main())
