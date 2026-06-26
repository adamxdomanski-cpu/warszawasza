export type MetaLang =
  | "pl"
  | "it"
  | "uk"
  | "bg"
  | "et"
  | "fi"
  | "lt"
  | "lv"
  | "hu"
  | "en";

export const META_LANGS: MetaLang[] = [
  "pl",
  "it",
  "uk",
  "bg",
  "et",
  "fi",
  "lt",
  "lv",
  "hu",
  "en",
];

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
      "Місто вслухається в сигнали.",
      "Сигнали виявляють тертя.",
      "Тертя зводить з траєкторії.",
      "Траєкторія переписує місто.",
    ],
    principle: [
      "Система не пояснює світ.",
      "Система кличе увагу.",
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
  bg: {
    observation: "НАБЛЮДЕНИЕТО ПРОДЪЛЖАВА",
    core: [
      "Градът слуша сигналите.",
      "Сигналите разкриват триенето.",
      "Триенето отклонява траекторията.",
      "Траекторията пренаписва града.",
    ],
    principle: [
      "Системата не обяснява света.",
      "Системата кани вниманието.",
    ],
    stateLabel: "състояние на сигнала",
    trajectoryLabel: "ТРАЕКТОРИЯ",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "движение" },
      lucy: { symbol: "●", label: "LUCY", role: "точка на внимание" },
      diamente: { symbol: "◇", label: "Diamente", role: "валидиран сигнал" },
      shafir: { symbol: "∥", label: "Shafir", role: "триене" },
      lustra: { symbol: "⌁", label: "Lustra", role: "адаптация" },
      griffin: { symbol: "↗", label: "Griffin", role: "траектория" },
      dissonance: {
        symbol: "≠",
        label: "Когнитивен дисонанс",
        role: "поставя под въпрос предположенията",
      },
    },
    truthChain: {
      false: { display: "ЛЪЖА (0)", glyph: "ЛЪЖА (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "ИСТИНА (1)", glyph: "ИСТИНА (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Когнитивен дисонанс", tail: "много интерпретации" },
      { head: "⚡", tail: "колапс на интерпретациите" },
      { head: "Diamente", tail: "излъскан сигнал" },
    ],
  },
  et: {
    observation: "VAATLUS JÄTKUB",
    core: [
      "Linn kuulab signaale.",
      "Signaalid paljastavad hõõrdumise.",
      "Hõõrdumine kaldub trajektoori.",
      "Trajektoor kirjutab linna ümber.",
    ],
    principle: [
      "Süsteem ei seleta maailma.",
      "Süsteem kutsub tähelepanu.",
    ],
    stateLabel: "signaali olek",
    trajectoryLabel: "TRAJEKTOOR",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "liikumine" },
      lucy: { symbol: "●", label: "LUCY", role: "tähelepanupunkt" },
      diamente: { symbol: "◇", label: "Diamente", role: "kinnitatud signaal" },
      shafir: { symbol: "∥", label: "Shafir", role: "hõõrdumine" },
      lustra: { symbol: "⌁", label: "Lustra", role: "kohanemine" },
      griffin: { symbol: "↗", label: "Griffin", role: "trajektoor" },
      dissonance: {
        symbol: "≠",
        label: "Kognitiivne dissonants",
        role: "paneb eeldused kahtluse alla",
      },
    },
    truthChain: {
      false: { display: "VÄÄR (0)", glyph: "VÄÄR (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "TÕENE (1)", glyph: "TÕENE (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Kognitiivne dissonants", tail: "palju tõlgendusi" },
      { head: "⚡", tail: "tõlgenduste kollaps" },
      { head: "Diamente", tail: "lihvitud signaal" },
    ],
  },
  fi: {
    observation: "HAVAINTO JATKUU",
    core: [
      "Kaupunki kuuntelee signaaleja.",
      "Signaalit paljastavat kitkan.",
      "Kitka kallistaa trajektoriaa.",
      "Trajektoria kirjoittaa kaupungin uudelleen.",
    ],
    principle: [
      "Järjestelmä ei selitä maailmaa.",
      "Järjestelmä kutsuu huomion.",
    ],
    stateLabel: "signaalin tila",
    trajectoryLabel: "TRAJEKTORIA",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "liike" },
      lucy: { symbol: "●", label: "LUCY", role: "huomiopiste" },
      diamente: { symbol: "◇", label: "Diamente", role: "validoitu signaali" },
      shafir: { symbol: "∥", label: "Shafir", role: "kitka" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adaptaatio" },
      griffin: { symbol: "↗", label: "Griffin", role: "trajektoria" },
      dissonance: {
        symbol: "≠",
        label: "Kognitiivinen dissonanssi",
        role: "kyseenalaistaa oletukset",
      },
    },
    truthChain: {
      false: { display: "EPÄTOSI (0)", glyph: "EPÄTOSI (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "TOSI (1)", glyph: "TOSI (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Kognitiivinen dissonanssi", tail: "monta tulkintaa" },
      { head: "⚡", tail: "tulkintojen romahdus" },
      { head: "Diamente", tail: "hiottu signaali" },
    ],
  },
  lt: {
    observation: "STEBĖJIMAS TĘSIASI",
    core: [
      "Miestas klauso signalų.",
      "Signalai atskleidžia trintį.",
      "Trintis nukreipia trajektoriją.",
      "Trajektorija perrašo miestą.",
    ],
    principle: [
      "Sistema neaiškina pasaulio.",
      "Sistema kviečia dėmesį.",
    ],
    stateLabel: "signalo būsena",
    trajectoryLabel: "TRAJEKTORIJA",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "judėjimas" },
      lucy: { symbol: "●", label: "LUCY", role: "dėmesio taškas" },
      diamente: { symbol: "◇", label: "Diamente", role: "patvirtintas signalas" },
      shafir: { symbol: "∥", label: "Shafir", role: "trintis" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adaptacija" },
      griffin: { symbol: "↗", label: "Griffin", role: "trajektorija" },
      dissonance: {
        symbol: "≠",
        label: "Kognityvinis disonansas",
        role: "kelia abejonę prielaidomis",
      },
    },
    truthChain: {
      false: { display: "NETIESA (0)", glyph: "NETIESA (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "TIESA (1)", glyph: "TIESA (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Kognityvinis disonansas", tail: "daug interpretacijų" },
      { head: "⚡", tail: "interpretacijų žlugimas" },
      { head: "Diamente", tail: "nublizgtas signalas" },
    ],
  },
  lv: {
    observation: "NOVĒROJUMS TURPINĀS",
    core: [
      "Pilsēta klausās signālus.",
      "Signāli atklāj berzi.",
      "Berze novirza trajektoriju.",
      "Trajektorija pārraksta pilsētu.",
    ],
    principle: [
      "Sistēma nesaskaidro pasauli.",
      "Sistēma aicina uzmanību.",
    ],
    stateLabel: "signāla stāvoklis",
    trajectoryLabel: "TRAJEKTORIJA",
    grafenLabel: "GRAFEN",
    signals: {
      fira: { symbol: "●", label: "FIRA", role: "kustība" },
      lucy: { symbol: "●", label: "LUCY", role: "uzmanības punkts" },
      diamente: { symbol: "◇", label: "Diamente", role: "validēts signāls" },
      shafir: { symbol: "∥", label: "Shafir", role: "berze" },
      lustra: { symbol: "⌁", label: "Lustra", role: "adaptācija" },
      griffin: { symbol: "↗", label: "Griffin", role: "trajektorija" },
      dissonance: {
        symbol: "≠",
        label: "Kognitīvais disonans",
        role: "apšauba pieņēmumus",
      },
    },
    truthChain: {
      false: { display: "NEPATIESĪBA (0)", glyph: "NEPATIESĪBA (0)" },
      spark: { display: "⚡", glyph: "⚡" },
      wave: { display: "~~~~", glyph: "~~~~" },
      diamond: { display: "◇", glyph: "◇" },
      true: { display: "PATIESĪBA (1)", glyph: "PATIESĪBA (1)" },
    },
    narrativeFlow: [
      { head: "⚡", tail: "~~~~" },
      { head: "Kognitīvais disonans", tail: "daudz interpretāciju" },
      { head: "⚡", tail: "interpretāciju sabrukums" },
      { head: "Diamente", tail: "noslīpēts signāls" },
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
