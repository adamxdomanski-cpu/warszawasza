import { NextResponse } from "next/server";
import type { FlaconLifecycleState } from "../../../../lib/flaconTokens";

type ActivateBody = {
  flacon_serial_id?: string;
  cryptographic_token?: string;
};

const SERIAL_RE = /^WAW-2026-[0-9A-F]{4}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * POST /api/market/activate — pair flacon serial + token (customer-facing).
 * Persists via product_flacon_tokens when DATABASE_URL is wired; validates shape locally today.
 */
export async function POST(request: Request) {
  let body: ActivateBody;
  try {
    body = (await request.json()) as ActivateBody;
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_JSON", message: "Nieprawidłowy payload." } },
      { status: 400 },
    );
  }

  const serial = body.flacon_serial_id?.trim() ?? "";
  const token = body.cryptographic_token?.trim() ?? "";

  if (!SERIAL_RE.test(serial)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INVALID_SERIAL", message: "Nieprawidłowy format numeru seryjnego flaconu." },
      },
      { status: 400 },
    );
  }

  if (!UUID_RE.test(token)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INVALID_TOKEN", message: "Nieprawidłowy token kryptograficzny." },
      },
      { status: 400 },
    );
  }

  const lifecycle: FlaconLifecycleState = "ACTIVE";

  return NextResponse.json(
    {
      success: true,
      origin: "STUDIO:WAW_DZ3A7",
      flacon_serial_id: serial,
      lifecycle_state: lifecycle,
      disclaimer:
        "Product node paired. This does NOT verify Layer 0 terrain facts or grant field-operator status.",
    },
    { status: 200 },
  );
}
