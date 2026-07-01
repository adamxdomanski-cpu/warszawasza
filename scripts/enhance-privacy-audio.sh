#!/usr/bin/env bash
# Light voice cleanup for WARSZAWASZA privacy brief.
# Keeps the speaker's voice — only clarity, level, and gentle noise reduction.
#
# Usage:
#   ./scripts/enhance-privacy-audio.sh [input.mp3] [output.mp3]
#
# Defaults:
#   input  → frontend/public/audio/prywatnosc-pl-raw.mp3 (or prywatnosc-pl.mp3)
#   output → frontend/public/audio/prywatnosc-pl.mp3

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO_DIR="$ROOT/frontend/public/audio"

INPUT="${1:-}"
OUTPUT="${2:-$AUDIO_DIR/prywatnosc-pl.mp3}"

if [[ -z "$INPUT" ]]; then
  if [[ -f "$AUDIO_DIR/prywatnosc-pl-raw.mp3" ]]; then
    INPUT="$AUDIO_DIR/prywatnosc-pl-raw.mp3"
  else
    INPUT="$AUDIO_DIR/prywatnosc-pl.mp3"
  fi
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Input not found: $INPUT" >&2
  exit 1
fi

TMP="${OUTPUT%.mp3}.enhanced.tmp.mp3"

# Preset: highpass → light FFT denoise → gentle compression → loudness norm → limiter
FILTER_CHAIN="highpass=f=90,"
FILTER_CHAIN+="afftdn=nr=10:nf=-22:nt=w,"
FILTER_CHAIN+="acompressor=threshold=-20dB:ratio=2.5:attack=12:release=120:makeup=1,"
FILTER_CHAIN+="loudnorm=I=-16:TP=-1.5:LRA=11,"
FILTER_CHAIN+="alimiter=limit=0.97:attack=5:release=50"

echo "Input:  $INPUT"
echo "Output: $OUTPUT"
echo "Filter: $FILTER_CHAIN"

ffmpeg -hide_banner -loglevel error -y \
  -i "$INPUT" \
  -af "$FILTER_CHAIN" \
  -codec:a libmp3lame -qscale:a 3 \
  "$TMP"

mv "$TMP" "$OUTPUT"

ffprobe -hide_banner "$OUTPUT" 2>&1 | rg 'Duration|Audio' || true
echo "Done: $OUTPUT"
