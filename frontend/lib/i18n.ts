export type Lang = "pl" | "en" | "it";

export const LANGS: Lang[] = ["pl", "en", "it"];

type FlowKey = "signal" | "friction" | "adaptation" | "trajectory";

export type PipelineKey =
  | "reality"
  | "signals"
  | "observation"
  | "filtration"
  | "memory"
  | "validation"
  | "knowledge"
  | "narration";

type PipelineStatusKey =
  | "waiting"
  | "analyzing"
  | "done"
  | "rejected"
  | "hypothesis"
  | "none";

type NarrativeKey =
  | "fira"
  | "diamente"
  | "shafir"
  | "lustra"
  | "griffin"
  | "dissonance";

type Copy = {
  observation: string;
  entry: {
    falseLabel: string;
    trueLabel: string;
  };
  flow: Record<FlowKey, string>;
  pipeline: Record<PipelineKey, string>;
  pipelineStatus: Record<PipelineStatusKey, string>;
  pipelineStateLabel: Record<Exclude<PipelineKey, "narration">, string>;
  pipelineOutcome: {
    trajectory: string;
    trajectoryConfirmed: string;
    hypothesis: string;
    model: string;
    modelMatch: string;
    modelRejected: string;
  };
  filtrationFilter: {
    source: string;
    oneSignal: string;
  };
  pipelineValidationResult: string;
  signalAxiom: string;
  noisePrinciple: string;
  clarityPrinciple: string;
  implicationPrinciple: string;
  pipelineImplication: Record<PipelineKey, string>;
  core: [string, string, string, string];
  principle: [string, string];
  dissonance: string;
  narrativeTitle: string;
  narrative: Record<
    NarrativeKey,
    { name: string; role: string; symbol: string; href?: string }
  >;
  launchFira: string;
  closing: string;
  leaveTrace: string;
  trace: {
    copied: string;
    copyFailed: string;
    logHeader: string;
    civicBridge: string;
    attentionUnits: string;
    registry: string;
  };
  dataCity: string;
  log: Record<string, string>;
};

export const COPY: Record<Lang, Copy> = {
  pl: {
    observation: "OBSERWACJA TRWA",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SYGNAŁ",
      friction: "TARCIE",
      adaptation: "ADAPTACJA",
      trajectory: "TRAJEKTORIA",
    },
    pipeline: {
      reality: "Rzeczywistość",
      signals: "Sygnały",
      observation: "Obserwacja",
      filtration: "Filtracja",
      memory: "Pamięć",
      validation: "Walidacja",
      knowledge: "Wiedza",
      narration: "Narracja",
    },
    pipelineStatus: {
      waiting: "oczekuje",
      analyzing: "analiza",
      done: "zakończono",
      rejected: "odrzucono",
      hypothesis: "hipoteza",
      none: "brak",
    },
    pipelineStateLabel: {
      reality: "aktywna",
      signals: "rejestrowane",
      observation: "trwa",
      filtration: "zawężanie",
      memory: "zapis",
      validation: "sprawdzanie",
      knowledge: "ustalona",
    },
    pipelineOutcome: {
      trajectory: "NARRACJA",
      trajectoryConfirmed: "otwarta",
      hypothesis: "HIPOTEZA",
      model: "MODEL",
      modelMatch: "zgodny",
      modelRejected: "niezgodny",
    },
    filtrationFilter: {
      source: "rzeczywistość",
      oneSignal: "jeden sygnał",
    },
    pipelineValidationResult: "→ zgodne",
    signalAxiom:
      "Małe, lokalne sygnały zawierają informacje o strukturze całego systemu.",
    noisePrinciple:
      "Celem nie jest więcej danych. Celem jest mniej szumu.",
    clarityPrinciple:
      "Budujemy krystalicznie czysty interfejs — maksymalnie zrozumiały, transparentny, bezpieczny i ciekawy.",
    implicationPrinciple:
      "Każda informacja powinna odpowiedzieć na pytanie: co z tego wynika?",
    pipelineImplication: {
      reality: "→ pole wejścia",
      signals: "→ miasto emituje impulsy",
      observation: "→ uwaga staje się sygnałem",
      filtration: "→ widzisz fragment, nie całość",
      memory: "→ struktura się utrwala",
      validation: "→ wzorzec zastępuje szum",
      knowledge: "→ model staje się czytelny",
      narration: "→ wybierasz trajektorię T/F",
    },
    core: [
      "Miasto reaguje na sygnały.",
      "Sygnały ujawniają tarcie.",
      "Tarcie zmienia trajektorie.",
      "Trajektorie zmieniają miasto.",
    ],
    principle: [
      "System nie tłumaczy świata.",
      "System zaprasza uwagę.",
    ],
    dissonance: "Dysonans poznawczy",
    narrativeTitle: "NARRACJA",
    narrative: {
      fira: { name: "FIRA", role: "ruch", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "sygnał",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "tarcie · dysonans poznawczy",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adaptacja",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "trajektoria",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Dysonans Poznawczy",
        role: "kwestionuje założenia",
        symbol: "≠",
        href: "/meta",
      },
    },
    launchFira: "Uruchom FIRA →",
    closing: "Tak wygląda moja Warszawa. A Wasza?",
    leaveTrace: "ZOSTAW SWÓJ ŚLAD →",
    trace: {
      copied: "● skopiowano ślad — otwieram kanał",
      copyFailed: "○ zapis lokalny — wyślij ręcznie",
      logHeader: "LOG:",
      civicBridge:
        "Instrument obserwacji → wspólny ślad obywatelski (civic tech: listening → action)",
      attentionUnits: "impulsów uwagi",
      registry: "● {n} śladów w polu",
    },
    dataCity: "miasto danych",
    log: {
      attention: "uwaga",
      inactivity: "bezczynność",
      pedestrian: "ruch pieszy",
      scroll: "scroll",
    },
  },
  en: {
    observation: "OBSERVATION IN PROGRESS",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SIGNAL",
      friction: "FRICTION",
      adaptation: "ADAPTATION",
      trajectory: "TRAJECTORY",
    },
    pipeline: {
      reality: "Reality",
      signals: "Signals",
      observation: "Observation",
      filtration: "Filtration",
      memory: "Memory",
      validation: "Validation",
      knowledge: "Knowledge",
      narration: "Narration",
    },
    pipelineStatus: {
      waiting: "waiting",
      analyzing: "analysis",
      done: "complete",
      rejected: "rejected",
      hypothesis: "hypothesis",
      none: "none",
    },
    pipelineStateLabel: {
      reality: "active",
      signals: "registered",
      observation: "in progress",
      filtration: "narrowing",
      memory: "storing",
      validation: "checking",
      knowledge: "established",
    },
    pipelineOutcome: {
      trajectory: "NARRATION",
      trajectoryConfirmed: "open",
      hypothesis: "HYPOTHESIS",
      model: "MODEL",
      modelMatch: "consistent",
      modelRejected: "inconsistent",
    },
    filtrationFilter: {
      source: "reality",
      oneSignal: "one signal",
    },
    pipelineValidationResult: "→ match",
    signalAxiom:
      "Small, local signals contain information about the structure of the entire system.",
    noisePrinciple:
      "The goal is not more data. The goal is less noise.",
    clarityPrinciple:
      "We build a crystal-clear interface — maximally understandable, transparent, safe and interesting.",
    implicationPrinciple:
      "Every piece of information should answer: what follows from this?",
    pipelineImplication: {
      reality: "→ entry field",
      signals: "→ the city emits impulses",
      observation: "→ attention becomes signal",
      filtration: "→ you see a fragment, not the whole",
      memory: "→ structure is retained",
      validation: "→ pattern replaces noise",
      knowledge: "→ model becomes legible",
      narration: "→ you choose a trajectory T/F",
    },
    core: [
      "The city reacts to signals.",
      "Signals reveal friction.",
      "Friction changes trajectories.",
      "Trajectories change the city.",
    ],
    principle: [
      "The system does not explain the world.",
      "The system invites attention.",
    ],
    dissonance: "Cognitive dissonance",
    narrativeTitle: "NARRATIVE",
    narrative: {
      fira: {
        name: "FIRA",
        role: "movement",
        symbol: "●",
        href: "/artefacts/fira",
      },
      diamente: {
        name: "Diamente",
        role: "signal",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "friction · cognitive dissonance",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adaptation",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "trajectory",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Cognitive Dissonance",
        role: "challenges assumptions",
        symbol: "≠",
        href: "/meta",
      },
    },
    launchFira: "Launch FIRA →",
    closing: "This is what my Warsaw looks like. And yours?",
    leaveTrace: "LEAVE YOUR TRACE →",
    trace: {
      copied: "● trace copied — opening channel",
      copyFailed: "○ saved locally — send manually",
      logHeader: "LOG:",
      civicBridge:
        "Observation instrument → shared civic trace (civic tech: listening → action)",
      attentionUnits: "attention pulses",
      registry: "● {n} traces in the field",
    },
    dataCity: "city of data",
    log: {
      attention: "attention",
      inactivity: "inactivity",
      pedestrian: "pedestrian motion",
      scroll: "scroll",
    },
  },
  it: {
    observation: "OSSERVAZIONE IN CORSO",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SEGNALE",
      friction: "ATTRITO",
      adaptation: "ADATTAMENTO",
      trajectory: "TRAIETTORIA",
    },
    pipeline: {
      reality: "Realtà",
      signals: "Segnali",
      observation: "Osservazione",
      filtration: "Filtrazione",
      memory: "Memoria",
      validation: "Validazione",
      knowledge: "Conoscenza",
      narration: "Narrazione",
    },
    pipelineStatus: {
      waiting: "in attesa",
      analyzing: "analisi",
      done: "completato",
      rejected: "rifiutato",
      hypothesis: "ipotesi",
      none: "assente",
    },
    pipelineStateLabel: {
      reality: "attiva",
      signals: "registrati",
      observation: "in corso",
      filtration: "restringimento",
      memory: "archivio",
      validation: "verifica",
      knowledge: "acquisita",
    },
    pipelineOutcome: {
      trajectory: "NARRAZIONE",
      trajectoryConfirmed: "aperta",
      hypothesis: "IPOTESI",
      model: "MODELLO",
      modelMatch: "coerente",
      modelRejected: "incoerente",
    },
    filtrationFilter: {
      source: "realtà",
      oneSignal: "un segnale",
    },
    pipelineValidationResult: "→ coerente",
    signalAxiom:
      "I piccoli segnali locali contengono informazioni sulla struttura dell'intero sistema.",
    noisePrinciple:
      "Non serve più dati. Serve meno rumore.",
    clarityPrinciple:
      "Costruiamo un'interfaccia cristallina — comprensibile, trasparente, sicura e interessante.",
    implicationPrinciple:
      "Ogni informazione deve rispondere: cosa ne consegue?",
    pipelineImplication: {
      reality: "→ campo d'ingresso",
      signals: "→ la città emette impulsi",
      observation: "→ l'attenzione diventa segnale",
      filtration: "→ vedi un frammento, non il tutto",
      memory: "→ la struttura si fissa",
      validation: "→ il pattern sostituisce il rumore",
      knowledge: "→ il modello diventa leggibile",
      narration: "→ scegli una traiettoria T/F",
    },
    core: [
      "La città ascolta i segnali.",
      "I segnali rivelano l'attrito.",
      "L'attrito devia il cammino.",
      "Il cammino riscrive la città.",
    ],
    principle: [
      "Il sistema non spiega il mondo.",
      "Il sistema invita l'attenzione.",
    ],
    dissonance: "Dissonanza cognitiva",
    narrativeTitle: "NARRAZIONE",
    narrative: {
      fira: {
        name: "FIRA",
        role: "movimento",
        symbol: "●",
        href: "/artefacts/fira",
      },
      diamente: {
        name: "Diamente",
        role: "segnale",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "attrito · dissonanza cognitiva",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adattamento",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "traiettoria",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Dissonanza Cognitiva",
        role: "mette in dubbio le premesse",
        symbol: "≠",
        href: "/meta",
      },
    },
    launchFira: "Avvia FIRA →",
    closing: "Così appare la mia Varsavia. E la vostra?",
    leaveTrace: "LASCIA IL TUO SEGNO →",
    trace: {
      copied: "● traccia copiata — apro il canale",
      copyFailed: "○ salvato in locale — invia manualmente",
      logHeader: "LOG:",
      civicBridge:
        "Strumento di osservazione → traccia civica condivisa (civic tech: ascolto → azione)",
      attentionUnits: "impulsi di attenzione",
      registry: "● {n} tracce nel campo",
    },
    dataCity: "città dei dati",
    log: {
      attention: "attenzione",
      inactivity: "inattività",
      pedestrian: "passo urbano",
      scroll: "scorrimento",
    },
  },
};

export const FLOW_ORDER: FlowKey[] = [
  "signal",
  "friction",
  "adaptation",
  "trajectory",
];

export const PIPELINE_ORDER: PipelineKey[] = [
  "reality",
  "signals",
  "observation",
  "filtration",
  "memory",
  "validation",
  "knowledge",
  "narration",
];

export const NARRATIVE_ORDER: NarrativeKey[] = [
  "diamente",
  "shafir",
  "lustra",
  "griffin",
  "dissonance",
  "fira",
];
