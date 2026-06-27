import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { forgeDisabledReason, verifyForgeAdminSecret } from "../../../../lib/flaconForgeAuth";
import type { ForgeArtifact } from "../../../../lib/flaconTokens";

/**
 * POST /api/market/forge — studio-only mint (Dzielna 3A/7).
 * Requires header X-Admin-Secret = FLACON_FORGE_ADMIN_SECRET (server env, min 16 chars).
 */
export async function POST(request: Request) {
  if (!verifyForgeAdminSecret(request)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "FORGE_FORBIDDEN",
          message: forgeDisabledReason(),
        },
      },
      { status: 403 },
    );
  }

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
