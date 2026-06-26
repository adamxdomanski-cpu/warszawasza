import type { Lang } from "./i18n";

export type CorePrintRole = "friction" | "trajectory" | "city";

export type CorePrintPart = {
  text: string;
  role?: CorePrintRole;
};

/** Core chain — printable parts for typewriter + stress animation. */
export const CORE_PRINT_PARTS: Record<Lang, CorePrintPart[][]> = {
  pl: [
    [{ text: "Miasto reaguje na sygnały." }],
    [
      { text: "Sygnały ujawniają " },
      { text: "tarcie", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Tarcie zmienia " },
      { text: "trajektorie", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Trajektorie zmieniają " },
      { text: "miasto", role: "city" },
      { text: "." },
    ],
  ],
  en: [
    [{ text: "The city reacts to signals." }],
    [
      { text: "Signals reveal " },
      { text: "friction", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Friction changes " },
      { text: "trajectories", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Trajectories change the " },
      { text: "city", role: "city" },
      { text: "." },
    ],
  ],
  it: [
    [{ text: "La città ascolta i segnali." }],
    [
      { text: "I segnali rivelano l'" },
      { text: "attrito", role: "friction" },
      { text: "." },
    ],
    [
      { text: "L'attrito devia il " },
      { text: "cammino", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Il cammino riscrive la " },
      { text: "città", role: "city" },
      { text: "." },
    ],
  ],
  uk: [
    [{ text: "Місто реагує на сигнали." }],
    [
      { text: "Сигнали виявляють " },
      { text: "тертя", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Тертя змінює " },
      { text: "траєкторії", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Траєкторії змінюють " },
      { text: "місто", role: "city" },
      { text: "." },
    ],
  ],
  bg: [
    [{ text: "Градът слуша сигналите." }],
    [
      { text: "Сигналите разкриват " },
      { text: "триенето", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Триенето отклонява " },
      { text: "траекторията", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Траекторията пренаписва " },
      { text: "града", role: "city" },
      { text: "." },
    ],
  ],
  et: [
    [{ text: "Linn kuulab signaale." }],
    [
      { text: "Signaalid paljastavad " },
      { text: "hõõrdumise", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Hõõrdumine muudab " },
      { text: "trajektoore", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Trajektoorid kirjutavad ümber " },
      { text: "linna", role: "city" },
      { text: "." },
    ],
  ],
  fi: [
    [{ text: "Kaupunki kuuntelee signaaleja." }],
    [
      { text: "Signaalit paljastavat " },
      { text: "kitkan", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Kitka muuttaa " },
      { text: "trajektorioita", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Trajektoriat kirjoittavat uudelleen " },
      { text: "kaupungin", role: "city" },
      { text: "." },
    ],
  ],
  lt: [
    [{ text: "Miestas klauso signalų." }],
    [
      { text: "Signalai atskleidžia " },
      { text: "trintį", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Trintis keičia " },
      { text: "trajektorijas", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Trajektorijos perrašo " },
      { text: "miestą", role: "city" },
      { text: "." },
    ],
  ],
  lv: [
    [{ text: "Pilsēta klausās signālus." }],
    [
      { text: "Signāli atklāj " },
      { text: "berzi", role: "friction" },
      { text: "." },
    ],
    [
      { text: "Berze maina " },
      { text: "trajektorijas", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "Trajektorijas pārraksta " },
      { text: "pilsētu", role: "city" },
      { text: "." },
    ],
  ],
  hu: [
    [{ text: "A város reagál a jelzésekre." }],
    [
      { text: "A jelzések felfedik a " },
      { text: "súrlódást", role: "friction" },
      { text: "." },
    ],
    [
      { text: "A súrlódás megváltoztatja a " },
      { text: "pályákat", role: "trajectory" },
      { text: "." },
    ],
    [
      { text: "A pályák megváltoztatják a " },
      { text: "várost", role: "city" },
      { text: "." },
    ],
  ],
};

export function corePrintPlain(parts: CorePrintPart[]): string {
  return parts.map((p) => p.text).join("");
}
