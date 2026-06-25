export type MetaLang = "pl" | "it" | "uk" | "hu" | "en";

export const META_LANGS: MetaLang[] = ["pl", "it", "uk", "hu", "en"];

export type SignalKey =
  | "fira"
  | "lucy"
  | "diamente"
  | "shafir"
  | "lustra"
  | "griffin"
  | "dissonance";

export const SIGNAL_ORDER: SignalKey[] = [
  "diamente",
  "shafir",
  "lustra",
  "griffin",
];

export type TruthPhase = "false" | "spark" | "wave" | "diamond" | "true";

export const TRUTH_CHAIN: TruthPhase[] = [
  "false",
  "spark",
  "wave",
  "diamond",
  "true",
];

export type NarrativeStep = {
  head: string;
  tail: string;
};

type SignalDef = {
  symbol: string;
  label: string;
  role: string;
};

type TruthStep = {
  display: string;
  glyph: string;
};

type MetaCopy = {
  observation: string;
  core: [string, string, string, string];
  principle: [string, string];
  signals: Record<SignalKey, SignalDef>;
  stateLabel: string;
  truthChain: Record<TruthPhase, TruthStep>;
  trajectoryLabel: string;
  grafenLabel: string;
  narrativeFlow: NarrativeStep[];
};

export const META_COPY: Record<MetaLang, MetaCopy> = {
  pl: {
    observation: "OBSERWACJA TRWA",
    core: [
      "Miasto reaguje na sygnały.",
      "Sygnały ujawniają tarcie.",
      "Tarcie zmienia trajektorie.",
      "Trajektorie zmieniają miasto.",
    ],
    principle: [
      "System nie tłumaczy świata.",
      "System zaprasza do uwagi.",
    ],
    stateLabel: "stan sygnału",
    trajectoryLabel: "TRAJEKTORIA",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "ruch" },
      lucy: { symbol: "●", label: "LUCY", role: "punkt uwagi" },
      diamente: { symbol: "◇", label: "Diamente", role: "sygnał zweryfikowany" },
      shafir: { symbol: "∥", label: "Shafir", role: "tarcie" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adaptacja" },
      griffin: { symbol: "↗", label: "Griffin", role: "trajektoria" },
      dissonance: {
        symbol: "≠",
        label: "Dysonans Poznawczy",
        role: "kwestionuje założenia",
      },
    },
    truthChain: {
      false: { display: "FAŁSZ (0)", glyph: "FAŁSZ (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "PRAWDA (1)", glyph: "PRAWDA (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Dysonans Poznawczy", tail: "wiele interpretacji" },
      { head: "⚡", tail: "kolaps interpretacji" },
      { head: "Diamente", tail: "oszlifowany sygnał" },
    ],
  },
  en: {
    observation: "OBSERVATION ACTIVE",
    core: [
      "The city responds to signals.",
      "Signals expose friction.",
      "Friction bends trajectories.",
      "Trajectories rewrite the city.",
    ],
    principle: [
      "The system does not explain the world.",
      "The system invites attention.",
    ],
    stateLabel: "signal state",
    trajectoryLabel: "TRAJECTORY",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "movement" },
      lucy: { symbol: "●", label: "LUCY", role: "attention point" },
      diamente: { symbol: "◇", label: "Diamente", role: "validated signal" },
      shafir: { symbol: "∥", label: "Shafir", role: "friction" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adaptation" },
      griffin: { symbol: "↗", label: "Griffin", role: "trajectory" },
      dissonance: {
        symbol: "≠",
        label: "Cognitive Dissonance",
        role: "challenges assumptions",
      },
    },
    truthChain: {
      false: { display: "FALSE (0)", glyph: "FALSE (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "TRUE (1)", glyph: "TRUE (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Cognitive Dissonance", tail: "many interpretations" },
      { head: "⚡", tail: "collapse of interpretations" },
      { head: "Diamente", tail: "polished signal" },
    ],
  },
  it: {
    observation: "OSSERVAZIONE IN ATTO",
    core: [
      "La città risponde ai segnali.",
      "I segnali scoprono l'attrito.",
      "L'attrito piega il cammino.",
      "Il cammino riscrive la città.",
    ],
    principle: [
      "Il sistema non spiega il mondo.",
      "Il sistema invita l'attenzione.",
    ],
    stateLabel: "stato del segnale",
    trajectoryLabel: "TRAIETTORIA",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "movimento" },
      lucy: { symbol: "●", label: "LUCY", role: "punto di attenzione" },
      diamente: { symbol: "◇", label: "Diamente", role: "segnale validato" },
      shafir: { symbol: "∥", label: "Shafir", role: "attrito" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adattamento" },
      griffin: { symbol: "↗", label: "Griffin", role: "traiettoria" },
      dissonance: {
        symbol: "≠",
        label: "Dissonanza Cognitiva",
        role: "mette in dubbio le premesse",
      },
    },
    truthChain: {
      false: { display: "FALSO (0)", glyph: "FALSO (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "VERO (1)", glyph: "VERO (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Dissonanza Cognitiva", tail: "molte interpretazioni" },
      { head: "⚡", tail: "collasso delle interpretazioni" },
      { head: "Diamente", tail: "segnale levigato" },
    ],
  },
  uk: {
    observation: "СПОСТЕРЕЖЕННЯ ТРИВАЄ",
    core: [
      "Місто реагує на сигнали.",
      "Сигнали виявляють тертя.",
      "Тертя змінює траєкторії.",
      "Траєкторії змінюють місто.",
    ],
    principle: [
      "Система не пояснює світ.",
      "Система запрошує до уваги.",
    ],
    stateLabel: "стан сигналу",
    trajectoryLabel: "ТРАЄКТОРІЯ",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "рух" },
      lucy: { symbol: "●", label: "LUCY", role: "точка уваги" },
      diamente: { symbol: "◇", label: "Diamente", role: "затверджений сигнал" },
      shafir: { symbol: "∥", label: "Shafir", role: "тертя" },
      lustra: { symbol: "⌁", label: "Lustra", role: "адаптація" },
      griffin: { symbol: "↗", label: "Griffin", role: "траєкторія" },
      dissonance: {
        symbol: "≠",
        label: "Когнітивний дисонанс",
        role: "ставить під сумнів припущення",
      },
    },
    truthChain: {
      false: { display: "ХИБНІСТЬ (0)", glyph: "ХИБНІСТЬ (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "ІСТИНА (1)", glyph: "ІСТИНА (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Когнітивний дисонанс", tail: "багато інтерпретацій" },
      { head: "⚡", tail: "колапс інтерпретацій" },
      { head: "Diamente", tail: "відполірований сигнал" },
    ],
  },
  hu: {
    observation: "MEGFIGYELÉS FOLYAMATBAN",
    core: [
      "A város reagál a jelzésekre.",
      "A jelzések felfedik a súrlódást.",
      "A súrlódás megváltoztatja a pályákat.",
      "A pályák megváltoztatják a várost.",
    ],
    principle: [
      "A rendszer nem magyarázza a világot.",
      "A rendszer figyelemre hív.",
    ],
    stateLabel: "jelzés állapota",
    trajectoryLabel: "PÁLYA",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "mozgás" },
      lucy: { symbol: "●", label: "LUCY", role: "figyelempont" },
      diamente: { symbol: "◇", label: "Diamente", role: "validált jelzés" },
      shafir: { symbol: "∥", label: "Shafir", role: "súrlódás" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adaptáció" },
      griffin: { symbol: "↗", label: "Griffin", role: "pálya" },
      dissonance: {
        symbol: "≠",
        label: "Kognitív disszonancia",
        role: "kérdőjelezi a feltételezéseket",
      },
    },
    truthChain: {
      false: { display: "HAMIS (0)", glyph: "HAMIS (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "IGAZ (1)", glyph: "IGAZ (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Kognitív disszonancia", tail: "sok értelmezés" },
      { head: "⚡", tail: "értelmezések összeomlása" },
      { head: "Diamente", tail: "csiszolt jelzés" },
    ],
  },
};
