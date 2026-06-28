import { NextResponse } from "next/server";
import { loadKietlinskaSeed } from "../../../../lib/kietlinskaSeed";

/** GET /api/sensory/seed — qualitative thick-mapping records (Kietlińska 2018). */
export async function GET() {
  try {
    const records = await loadKietlinskaSeed();
    return NextResponse.json({
      success: true,
      count: records.length,
      records,
      disclaimer:
        "Qualitative sensory layer — narrative representation, not Layer 0 verified fact.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "SEED_READ_FAILED", message: "Nie udało się wczytać kietlinska_seed.json." },
      },
      { status: 500 },
    );
  }
}
