export type MetaLang = "pl" | "en" | "it";

export const META_LANGS: MetaLang[] = ["pl", "en", "it"];

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
};
