import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import type { ForgeArtifact } from "../../../../lib/flaconTokens";

/**
 * POST /api/market/forge — mint a flacon serial + crypto token.
 * Local fallback when DATABASE_URL is unset; persist via 013_product_flacon_tokens.sql when wired.
 */
export async function POST() {
  try {
    const randomHex = randomBytes(2).toString("hex").toUpperCase();
    const flaconSerial = `WAW-2026-${randomHex}`;
    const cryptographicToken = crypto.randomUUID();
    const qrPayload = `https://warszawasza.online/market/activate?serial=${encodeURIComponent(flaconSerial)}`;

    const payload: ForgeArtifact = {
      flacon_serial_id: flaconSerial,
      cryptographic_token: cryptographicToken,
      lifecycle_state: "FORGED",
      qr_payload: qrPayload,
    };

    return NextResponse.json(
      {
        success: true,
        origin: "STUDIO:WAW_DZ3A7",
        artifact: payload,
        disclaimer:
          "Flacon activation authenticates the product node only — not Layer 0 terrain verification.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "FORGE_EXCEPTION",
          message: "Krytyczny błąd krystalizacji tokenu.",
        },
      },
      { status: 500 },
    );
  }
}
