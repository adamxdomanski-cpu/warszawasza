import { formatPlaceLabelFromAddress, type NominatimAddress } from "../../../../lib/field/placeLabel";

const NOMINATIM = "https://nominatim.openstreetmap.org/reverse";
const USER_AGENT =
  "Warszawasza/1.0 (field observation; https://warszawasza.online; hello@warszawasza.online)";

function parseCoord(raw: string | null): number | null {
  if (raw == null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseCoord(searchParams.get("lat"));
  const lon = parseCoord(searchParams.get("lon"));
  const lang = searchParams.get("lang")?.trim() || "pl";

  if (lat == null || lon == null || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return Response.json({ error: "invalid_coordinates" }, { status: 400 });
  }

  const url = new URL(NOMINATIM);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("zoom", "14");
  url.searchParams.set("accept-language", lang === "uk" ? "uk" : lang === "pl" ? "pl" : "en");

  try {
    const upstream = await fetch(url.toString(), {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 86_400 },
    });

    if (!upstream.ok) {
      return Response.json({ error: "geocode_failed" }, { status: 502 });
    }

    const payload: unknown = await upstream.json();
    const address =
      typeof payload === "object" &&
      payload !== null &&
      typeof (payload as { address?: unknown }).address === "object"
        ? ((payload as { address: NominatimAddress }).address as NominatimAddress)
        : null;

    const label = address ? formatPlaceLabelFromAddress(address) : null;
    return Response.json({ label });
  } catch {
    return Response.json({ error: "geocode_failed" }, { status: 502 });
  }
}
