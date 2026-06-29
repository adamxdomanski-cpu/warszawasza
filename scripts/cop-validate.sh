#!/usr/bin/env bash
# COP v1.0 Rigor Validator — Civic Observation Protocol syntax scanner
# Scans PR diff (added lines only) for decorative noise vs FIRA constitution.
#
# Two tiers (see docs/core/field-first-release.md):
#   - Strict: components / logic / JSX — FIRA symbols only (symbols.ts)
#   - Exempt: field deployment copy + i18n — meaningful UI glyphs (mic/pin CTAs)
set -euo pipefail

BASE_REF="${COP_BASE_REF:-origin/main}"
SCAN_ROOT="${COP_SCAN_ROOT:-frontend}"

echo "[ INFO ] Inicjacja skanera Civic Observation Protocol v1.0"
echo "PROCESSING FLUX: ■■■■□"
echo "────────────────────────────────────────────────"
echo "[ PROCES ] Skanowanie diff pod kątem szumu (tylko linie +)..."

if ! git rev-parse --verify "${BASE_REF}" >/dev/null 2>&1; then
  echo "[ INFO ] Brak ref ${BASE_REF} — pomijam skan (pierwszy push / lokalny run)."
  echo "STATUS WYNIKU: ✓ CONFIRMED"
  exit 0
fi

CHANGED=()
while IFS= read -r f; do
  CHANGED+=("$f")
done < <(
  git diff "${BASE_REF}"...HEAD --name-only --diff-filter=ACMR \
    -- "${SCAN_ROOT}/" "*.html" "fira/" 2>/dev/null \
    | grep -E '\.(ts|tsx|html|css|js|jsx|mdc)$' || true
)

if ((${#CHANGED[@]} == 0)); then
  echo "[ INFO ] Brak plików źródłowych w zakresie COP do analizy."
  echo "STATUS WYNIKU: ✓ CONFIRMED"
  exit 0
fi

VIOLATIONS=0

report_reject() {
  echo "⊗ REJECTED: $1"
  echo "  Rygor COP v1.0: $2"
  VIOLATIONS=$((VIOLATIONS + 1))
}

# Field / i18n copy — 🎤 📍 are deployment grammar (docs/project.md), not decorative noise.
cop_copy_exempt() {
  case "$1" in
    frontend/lib/field/*|frontend/lib/i18n.ts|frontend/app/layout.tsx|frontend/lib/traceViewModel.ts)
      return 0
      ;;
  esac
  return 1
}

for file in "${CHANGED[@]}"; do
  [[ -f "$file" ]] || continue

  while IFS= read -r line; do
    # Skip diff metadata
    [[ "$line" == +++* ]] && continue

    content="${line#+}"

    # Skip comment-only additions
    trimmed="${content#"${content%%[![:space:]]*}"}"
    if [[ "$trimmed" == //* ]] || [[ "$trimmed" == \** ]] || [[ "$trimmed" == \*/* ]]; then
      continue
    fi

    # 1. Dekoracyjne animacje pętlowe (Zasada 6 — ruch ze stanu silnika, nie ozdoba)
    if echo "$content" | grep -qE 'animation[^;{]*infinite|infinite[^;{]*animation'; then
      report_reject "Wykryto nieautoryzowaną animację pętlową w: ${file}" \
        "Ruch musi wynikać wyłącznie ze zmiany stanu silnika, nie z CSS-dekoracji."
      echo "  └─ ${content}"
    fi

    # 2. Emotikony / obce glify graficzne (poza kanonicznym alfabetem FIRA)
    if ! cop_copy_exempt "$file"; then
      if echo "$content" | grep -P '[\x{1F300}-\x{1F6FF}\x{1F900}-\x{1F9FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}]' >/dev/null 2>&1; then
        report_reject "Wykryto dekoracyjny szum wizualny (emotikony/ikony) w: ${file}" \
          "Dopuszczalny jest wyłącznie kanoniczny alfabet FIRA (symbols.ts)."
        echo "  └─ ${content}"
      fi
    fi

    # 3. Antywzorzec: autonomiczny index.html poza Next.js
    if [[ "$file" == *.html ]] && [[ "$file" != frontend/* ]]; then
      report_reject "Autonomiczny plik HTML poza dystrybucją Next.js: ${file}" \
        "Źródło prawdy: frontend/ (Draft 0.98 · warszawasza-prompts.mdc)."
    fi

    # 4. Dekoracyjny hover (konstytucja: instrument pomiarowy, nie landing)
    if echo "$content" | grep -qE ':hover[^}]*(box-shadow|filter:|drop-shadow|scale\()'; then
      report_reject "Wykryto dekoracyjny hover w: ${file}" \
        "Interfejs laboratoryjny — bez ukrytych efektów hover (warszawasza-field.mdc)."
      echo "  └─ ${content}"
    fi
  done < <(git diff "${BASE_REF}"...HEAD --unified=0 -- "$file" | grep '^+' || true)
done

echo "────────────────────────────────────────────────"
if ((VIOLATIONS > 0)); then
  echo "STATUS WYNIKU: ⊗ REJECTED"
  echo "[ ERROR ] Wykryto ${VIOLATIONS} naruszeń konstytucji protokołu FIRA."
  exit 1
fi

echo "STATUS WYNIKU: ✓ CONFIRMED"
echo "[ SUCCESS ] Strumień przetwarzania czysty. Brak wykrytego szumu."
exit 0
