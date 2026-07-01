#!/usr/bin/env bash
# Light voice cleanup for WARSZAWASZA privacy brief.
# Keeps the speaker's voice — only clarity, level, and gentle noise reduction.
#
# Usage:
#   ./scripts/enhance-privacy-audio.sh <pl|en|it> [input] [output]
#
# Examples:
#   ./scripts/enhance-privacy-audio.sh pl raw.m4a
#   ./scripts/enhance-privacy-audio.sh en "Nowe nagranie.m4a"

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO_DIR="$ROOT/frontend/public/audio"

LANG_CODE="${1:-pl}"
INPUT="${2:-}"
OUTPUT="${3:-$AUDIO_DIR/prywatnosc-${LANG_CODE}.mp3}"

case "$LANG_CODE" in
  pl | en | it) ;;
  *)
    echo "Language must be pl, en, or it (got: $LANG_CODE)" >&2
    exit 1
    ;;
esac

if [[ -z "$INPUT" ]]; then
  if [[ -f "$AUDIO_DIR/prywatnosc-${LANG_CODE}-raw.mp3" ]]; then
    INPUT="$AUDIO_DIR/prywatnosc-${LANG_CODE}-raw.mp3"
  else
    INPUT="$AUDIO_DIR/prywatnosc-${LANG_CODE}.mp3"
  fi
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Input not found: $INPUT" >&2
  exit 1
fi

TMP="${OUTPUT%.mp3}.enhanced.tmp.mp3"

FILTER_CHAIN="highpass=f=90,"
FILTER_CHAIN+="afftdn=nr=10:nf=-22:nt=w,"
FILTER_CHAIN+="acompressor=threshold=-20dB:ratio=2.5:attack=12:release=120:makeup=1,"
FILTER_CHAIN+="loudnorm=I=-16:TP=-1.5:LRA=11,"
FILTER_CHAIN+="alimiter=limit=0.97:attack=5:release=50"

echo "Lang:   $LANG_CODE"
echo "Input:  $INPUT"
echo "Output: $OUTPUT"

ffmpeg -hide_banner -loglevel error -y \
  -i "$INPUT" \
  -af "$FILTER_CHAIN" \
  -codec:a libmp3lame -qscale:a 3 \
  "$TMP"

mv "$TMP" "$OUTPUT"

ffprobe -hide_banner "$OUTPUT" 2>&1 | rg 'Duration|Audio' || true
echo "Done: $OUTPUT"
echo "Then set privacyAudioEnabled.${LANG_CODE} = true in frontend/lib/privacyAudio.ts"
