import { timingSafeEqual } from "crypto";

const FORGE_SECRET_HEADER = "x-admin-secret";

/** Studio-only gate for POST /api/market/forge (Dzielna 3A/7 terminal). */
export function verifyForgeAdminSecret(request: Request): boolean {
  const expected = process.env.FLACON_FORGE_ADMIN_SECRET;
  if (!expected || expected.length < 16) {
    return false;
  }

  const provided = request.headers.get(FORGE_SECRET_HEADER);
  if (!provided) {
    return false;
  }

  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

export function forgeDisabledReason(): string {
  if (!process.env.FLACON_FORGE_ADMIN_SECRET) {
    return "FLACON_FORGE_ADMIN_SECRET is not configured on this host.";
  }
  return "Invalid or missing X-Admin-Secret header.";
}
