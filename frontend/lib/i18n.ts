export type Lang =
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

export const LANGS: Lang[] = [
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

/** Full language names for accessible labels (must include visible ISO code). */
export const LANG_ACCESSIBLE_NAMES: Record<Lang, string> = {
  pl: "Polski, PL",
  it: "Italiano, IT",
  uk: "Українська, UA",
  bg: "Български, BG",
  et: "Eesti, ET",
  fi: "Suomi, FI",
  lt: "Lietuvių, LT",
  lv: "Latviešu, LV",
  hu: "Magyar, HU",
  en: "English, EN",
};

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
  processOutput: string;
  processChainLabel: string;
  signalAxiom: readonly [string, string];
  noisePrinciple: string;
  clarityPrinciple: string;
  implicationPrinciple: string;
  pipelineImplication: Record<PipelineKey, string>;
  core: [string, string, string, string];
  principle: [string, string];
  dissonance: string;
  narrativeTitle: string;
  narrativeLexicon: string;
  narrativeLexiconClose: string;
  narrativeMore: string;
  narrativeLess: string;
  narrativeMetaHint: string;
  learnHint: string;
  deliberationHint: string;
  narrative: Record<
    NarrativeKey,
    { name: string; role: string; symbol: string; href?: string }
  >;
  beginObservation: string;
  workshopCredit: string;
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
  localInitiative: {
    title: string;
    statusLabel: string;
  };
  interference: {
    title: string;
    secondarySource: string;
    relation: string;
    evidence: string;
    griffin: string;
    capitalTrajectory: string;
    sameDominant: string;
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
    processOutput: "OUTPUT",
    processChainLabel: "Proces obserwacji",
    signalAxiom: [
      "Małe, lokalne sygnały",
      "niosą informację o strukturze całego systemu.",
    ],
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
    narrativeLexicon: "słownik narracji ↓",
    narrativeLexiconClose: "zwiń ↑",
    narrativeMore: "więcej ↓",
    narrativeLess: "mniej ↑",
    narrativeMetaHint: "warstwa percepcji",
    learnHint: "fazy PM · pipeline FIRA",
    deliberationHint: "deliberacja grafenowa · nie wybory",
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
    beginObservation: "Obserwuj →",
    workshopCredit: "Zaprojektowano w warsztacie WARSZAWASZA",
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
    localInitiative: {
      title: "Inicjatywa lokalna",
      statusLabel: "Status",
    },
    interference: {
      title: "INTERFERENCJA MATRYCY",
      secondarySource: "Źródło wtórne",
      relation: "Relacja",
      evidence: "Poziom dowodu",
      griffin: "Griffin wykryty",
      capitalTrajectory: "Trajektoria kapitałowa potwierdzona",
      sameDominant: "Identyczny podmiot dominujący jak w",
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
    processOutput: "OUTPUT",
    processChainLabel: "Observation process",
    signalAxiom: [
      "Small, local signals",
      "carry information about the structure of the whole system.",
    ],
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
    narrativeLexicon: "narrative lexicon ↓",
    narrativeLexiconClose: "collapse ↑",
    narrativeMore: "more ↓",
    narrativeLess: "less ↑",
    narrativeMetaHint: "perception layer",
    learnHint: "PM phases · FIRA pipeline",
    deliberationHint: "graphene deliberation · not elections",
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
    beginObservation: "Observe →",
    workshopCredit: "Designed in the WARSZAWASZA workshop",
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
    localInitiative: {
      title: "Local initiative",
      statusLabel: "Status",
    },
    interference: {
      title: "MATRIX INTERFERENCE",
      secondarySource: "Secondary source",
      relation: "Relation",
      evidence: "Evidence level",
      griffin: "Griffin detected",
      capitalTrajectory: "Capital trajectory confirmed",
      sameDominant: "Same dominant entity as in",
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
    processOutput: "OUTPUT",
    processChainLabel: "Processo di osservazione",
    signalAxiom: [
      "I piccoli segnali locali",
      "contengono la struttura dell'intero sistema.",
    ],
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
    narrativeLexicon: "lessico narrativo ↓",
    narrativeLexiconClose: "chiudi ↑",
    narrativeMore: "altro ↓",
    narrativeLess: "meno ↑",
    narrativeMetaHint: "strato di percezione",
    learnHint: "fasi PM · pipeline FIRA",
    deliberationHint: "deliberazione graphene · non elezioni",
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
    beginObservation: "Osserva →",
    workshopCredit: "Progettato nel laboratorio WARSZAWASZA",
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
    localInitiative: {
      title: "Iniziativa locale",
      statusLabel: "Stato",
    },
    interference: {
      title: "INTERFERENZA MATRICE",
      secondarySource: "Fonte secondaria",
      relation: "Relazione",
      evidence: "Livello di prova",
      griffin: "Griffin rilevato",
      capitalTrajectory: "Traiettoria capitale confermata",
      sameDominant: "Stesso soggetto dominante come in",
    },
    dataCity: "città dei dati",
    log: {
      attention: "attenzione",
      inactivity: "inattività",
      pedestrian: "passo urbano",
      scroll: "scorrimento",
    },
  },
  uk: {
    observation: "СПОСТЕРЕЖЕННЯ ТРИВАЄ",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "СИГНАЛ",
      friction: "ТЕРТЯ",
      adaptation: "АДАПТАЦІЯ",
      trajectory: "ТРАЄКТОРІЯ",
    },
    pipeline: {
      reality: "Реальність",
      signals: "Сигнали",
      observation: "Спостереження",
      filtration: "Фільтрація",
      memory: "Пам'ять",
      validation: "Валідація",
      knowledge: "Знання",
      narration: "Нарація",
    },
    pipelineStatus: {
      waiting: "очікує",
      analyzing: "аналіз",
      done: "завершено",
      rejected: "відхилено",
      hypothesis: "гіпотеза",
      none: "немає",
    },
    pipelineStateLabel: {
      reality: "активна",
      signals: "реєструються",
      observation: "триває",
      filtration: "звуження",
      memory: "запис",
      validation: "перевірка",
      knowledge: "встановлено",
    },
    pipelineOutcome: {
      trajectory: "НАРАЦІЯ",
      trajectoryConfirmed: "відкрита",
      hypothesis: "ГІПОТЕЗА",
      model: "МОДЕЛЬ",
      modelMatch: "узгоджено",
      modelRejected: "неузгоджено",
    },
    filtrationFilter: {
      source: "реальність",
      oneSignal: "один сигнал",
    },
    pipelineValidationResult: "→ узгоджено",
    processOutput: "OUTPUT",
    processChainLabel: "Процес спостереження",
    signalAxiom: [
      "Малі, локальні сигнали",
      "несуть інформацію про структуру всієї системи.",
    ],
    noisePrinciple: "Не потрібно більше даних. Потрібно менше шуму.",
    clarityPrinciple:
      "Будуємо кристально чистий інтерфейс — зрозумілий, прозорий, безпечний і цікавий.",
    implicationPrinciple:
      "Кожна інформація має відповідати на питання: що з цього випливає?",
    pipelineImplication: {
      reality: "→ поле входу",
      signals: "→ місто випромінює імпульси",
      observation: "→ увага стає сигналом",
      filtration: "→ бачиш фрагмент, не ціле",
      memory: "→ структура зберігається",
      validation: "→ патерн замінює шум",
      knowledge: "→ модель стає читабельною",
      narration: "→ обираєш траєкторію T/F",
    },
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
    dissonance: "Когнітивний дисонанс",
    narrativeTitle: "НАРАЦІЯ",
    narrativeLexicon: "словник нарації ↓",
    narrativeLexiconClose: "згорнути ↑",
    narrativeMore: "більше ↓",
    narrativeLess: "менше ↑",
    narrativeMetaHint: "шар сприйняття",
    learnHint: "фази PM · pipeline FIRA",
    deliberationHint: "graphene deliberation · не вибори",
    narrative: {
      fira: { name: "FIRA", role: "рух", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "сигнал",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "тертя · когнітивний дисонанс",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "адаптація",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "траєкторія",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Когнітивний дисонанс",
        role: "ставить під сумнів припущення",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Спостерігай →",
    workshopCredit: "Створено в \u043c\u0430\u0439\u0441\u0442\u0435\u0440\u043d\u0456 WARSZAWASZA",
    closing: "Так виглядає моя Варшава. А ваша?",
    leaveTrace: "ЗАЛИШ СВІЙ СЛІД →",
    trace: {
      copied: "● слід скопійовано — відкриваю канал",
      copyFailed: "○ збережено локально — надішли вручну",
      logHeader: "LOG:",
      civicBridge:
        "Інструмент спостереження → спільний громадянський слід (civic tech: слухання → дія)",
      attentionUnits: "імпульсів уваги",
      registry: "● {n} слідів у полі",
    },
    localInitiative: {
      title: "Локальна ініціатива",
      statusLabel: "Статус",
    },
    interference: {
      title: "ІНТЕРФЕРЕНЦІЯ МАТРИЦІ",
      secondarySource: "Вторинне джерело",
      relation: "Відношення",
      evidence: "Рівень доказу",
      griffin: "Griffin виявлено",
      capitalTrajectory: "Капітальна траєкторія підтверджена",
      sameDominant: "Той самий домінуючий суб'єкт, що в",
    },
    dataCity: "місто даних",
    log: {
      attention: "увага",
      inactivity: "бездіяльність",
      pedestrian: "пішохідний рух",
      scroll: "прокрутка",
    },
  },
  bg: {
    observation: "НАБЛЮДЕНИЕТО ПРОДЪЛЖАВА",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "СИГНАЛ",
      friction: "ТРИЕНЕ",
      adaptation: "АДАПТАЦИЯ",
      trajectory: "ТРАЕКТОРИЯ",
    },
    pipeline: {
      reality: "Реалност",
      signals: "Сигнали",
      observation: "Наблюдение",
      filtration: "Филтрация",
      memory: "Памет",
      validation: "Валидация",
      knowledge: "Знание",
      narration: "Нарация",
    },
    pipelineStatus: {
      waiting: "изчаква",
      analyzing: "анализ",
      done: "завършено",
      rejected: "отхвърлено",
      hypothesis: "хипотеза",
      none: "няма",
    },
    pipelineStateLabel: {
      reality: "активна",
      signals: "регистрирани",
      observation: "трива",
      filtration: "стесняване",
      memory: "запис",
      validation: "проверка",
      knowledge: "установено",
    },
    pipelineOutcome: {
      trajectory: "НАРАЦИЯ",
      trajectoryConfirmed: "отворена",
      hypothesis: "ХИПОТЕЗА",
      model: "МОДЕЛ",
      modelMatch: "съгласувано",
      modelRejected: "несъгласувано",
    },
    filtrationFilter: {
      source: "реалност",
      oneSignal: "един сигнал",
    },
    pipelineValidationResult: "→ съгласувано",
    processOutput: "OUTPUT",
    processChainLabel: "Процес на наблюдение",
    signalAxiom: [
      "Малките, локални сигнали",
      "носят структурата на цялата система.",
    ],
    noisePrinciple: "Не са нужни повече данни. Нужно е по-малко шум.",
    clarityPrinciple:
      "Изграждаме кристално чист интерфейс — разбираем, прозрачен, безопасен и интересен.",
    implicationPrinciple:
      "Всяка информация трябва да отговори: какво следва от това?",
    pipelineImplication: {
      reality: "→ поле за влизане",
      signals: "→ градът излъчва импулси",
      observation: "→ вниманието става сигнал",
      filtration: "→ виждаш фрагмент, не цялото",
      memory: "→ структурата се запазва",
      validation: "→ моделът замества шума",
      knowledge: "→ моделът става четим",
      narration: "→ избираш траектория T/F",
    },
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
    dissonance: "Когнитивен дисонанс",
    narrativeTitle: "НАРАЦИЯ",
    narrativeLexicon: "нарративен лексикон ↓",
    narrativeLexiconClose: "свий ↑",
    narrativeMore: "още ↓",
    narrativeLess: "по-малко ↑",
    narrativeMetaHint: "слой на възприятие",
    learnHint: "фази PM · pipeline FIRA",
    deliberationHint: "graphene deliberation · не избори",
    narrative: {
      fira: { name: "FIRA", role: "движение", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "сигнал",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "триене · когнитивен дисонанс",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "адаптация",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "траектория",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Когнитивен дисонанс",
        role: "поставя под въпрос предположенията",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Наблюдавай →",
    workshopCredit: "Създадено в ателието WARSZAWASZA",
    closing: "Така изглежда моята Варшава. А вашата?",
    leaveTrace: "ОСТАВИ СЛЕДА →",
    trace: {
      copied: "● следът е копиран — отварям канал",
      copyFailed: "○ запазено локално — изпрати ръчно",
      logHeader: "LOG:",
      civicBridge:
        "Инструмент за наблюдение → общ граждански след (civic tech: слушане → действие)",
      attentionUnits: "импулси на внимание",
      registry: "● {n} следа в полето",
    },
    localInitiative: {
      title: "Локална инициатива",
      statusLabel: "Статус",
    },
    interference: {
      title: "ИНТЕРФЕРЕНЦИЯ НА МАТРИЦАТА",
      secondarySource: "Вторичен източник",
      relation: "Отношение",
      evidence: "Ниво на доказателство",
      griffin: "Griffin открит",
      capitalTrajectory: "Капиталова траектория потвърдена",
      sameDominant: "Същият доминиращ субект като в",
    },
    dataCity: "град на данни",
    log: {
      attention: "внимание",
      inactivity: "бездействие",
      pedestrian: "пешеходно движение",
      scroll: "превъртане",
    },
  },
  et: {
    observation: "VAATLUS JÄTKUB",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SIGNAAL",
      friction: "HÕÕRDUMINE",
      adaptation: "KOHANEMINE",
      trajectory: "TRAJEKTOOR",
    },
    pipeline: {
      reality: "Reaalsus",
      signals: "Signaalid",
      observation: "Vaatlus",
      filtration: "Filtratsioon",
      memory: "Mälu",
      validation: "Valideerimine",
      knowledge: "Teadmine",
      narration: "Narratsioon",
    },
    pipelineStatus: {
      waiting: "ootab",
      analyzing: "analüüs",
      done: "lõpetatud",
      rejected: "tagasi lükatud",
      hypothesis: "hüpotees",
      none: "puudub",
    },
    pipelineStateLabel: {
      reality: "aktiivne",
      signals: "registreeritakse",
      observation: "jätkub",
      filtration: "kitsendamine",
      memory: "salvestus",
      validation: "kontroll",
      knowledge: "kehtestatud",
    },
    pipelineOutcome: {
      trajectory: "NARRATSIOON",
      trajectoryConfirmed: "avatud",
      hypothesis: "HÜPOTEES",
      model: "MUDEL",
      modelMatch: "kooskõlas",
      modelRejected: "ebakooskõlas",
    },
    filtrationFilter: {
      source: "reaalsus",
      oneSignal: "üks signaal",
    },
    pipelineValidationResult: "→ kooskõlas",
    processOutput: "OUTPUT",
    processChainLabel: "Vaatlusprotsess",
    signalAxiom: [
      "Väikesed, kohalikud signaalid",
      "kandvad kogu süsteemi struktuuri.",
    ],
    noisePrinciple: "Rohkem andmeid pole vaja. Vaja on vähem müra.",
    clarityPrinciple:
      "Ehitame kristallselge liidese — arusaadav, läbipaistev, turvaline ja huvitav.",
    implicationPrinciple:
      "Iga info peab vastama küsimusele: mis sellest järgneb?",
    pipelineImplication: {
      reality: "→ sisenemisväli",
      signals: "→ linn kiirgab impulsse",
      observation: "→ tähelepanu muutub signaaliks",
      filtration: "→ näed fragmendi, mitte tervikut",
      memory: "→ struktuur säilib",
      validation: "→ muster asendab müra",
      knowledge: "→ mudel muutub loetavaks",
      narration: "→ valid trajektoori T/F",
    },
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
    dissonance: "Kognitiivne dissonants",
    narrativeTitle: "NARRATSIOON",
    narrativeLexicon: "narratiivi leksikon ↓",
    narrativeLexiconClose: "ahenda ↑",
    narrativeMore: "rohkem ↓",
    narrativeLess: "vähem ↑",
    narrativeMetaHint: "tajukihi",
    learnHint: "PM faasid · pipeline FIRA",
    deliberationHint: "graphene deliberation · mitte valimised",
    narrative: {
      fira: { name: "FIRA", role: "liikumine", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "signaal",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "hõõrdumine · kognitiivne dissonants",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "kohanemine",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "trajektoor",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Kognitiivne dissonants",
        role: "paneb eeldused kahtluse alla",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Vaatle →",
    workshopCredit: "Loodud WARSZAWASZA töökojas",
    closing: "Nii näeb välja minu Varssavi. A sinu oma?",
    leaveTrace: "JÄTA JÄLG →",
    trace: {
      copied: "● jälg kopeeritud — avan kanali",
      copyFailed: "○ salvestatud kohapeal — saada käsitsi",
      logHeader: "LOG:",
      civicBridge:
        "Vaatlusinstrument → ühine kodaniku jälg (civic tech: kuulamine → tegevus)",
      attentionUnits: "tähelepanu impulsse",
      registry: "● {n} jäge väljal",
    },
    localInitiative: {
      title: "Kohalik algatus",
      statusLabel: "Olek",
    },
    interference: {
      title: "MAATRIKSI INTERFERENTS",
      secondarySource: "Teisene allikas",
      relation: "Seos",
      evidence: "Tõendusaste",
      griffin: "Griffin tuvastatud",
      capitalTrajectory: "Kapitalitrajektoor kinnitatud",
      sameDominant: "Sama domineeriv subjekt nagu",
    },
    dataCity: "andmelinn",
    log: {
      attention: "tähelepanu",
      inactivity: "tegevusetus",
      pedestrian: "jalakäijaliikumine",
      scroll: "kerimine",
    },
  },
  fi: {
    observation: "HAVAINTO JATKUU",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SIGNAALI",
      friction: "KITKA",
      adaptation: "ADAPTAATIO",
      trajectory: "TRAJEKTORIA",
    },
    pipeline: {
      reality: "Todellisuus",
      signals: "Signaalit",
      observation: "Havainto",
      filtration: "Suodatus",
      memory: "Muisti",
      validation: "Validointi",
      knowledge: "Tieto",
      narration: "Narratiivi",
    },
    pipelineStatus: {
      waiting: "odottaa",
      analyzing: "analyysi",
      done: "valmis",
      rejected: "hylätty",
      hypothesis: "hypoteesi",
      none: "ei mitään",
    },
    pipelineStateLabel: {
      reality: "aktiivinen",
      signals: "rekisteröidään",
      observation: "jatkuu",
      filtration: "kaventuminen",
      memory: "tallennus",
      validation: "tarkistus",
      knowledge: "vahvistettu",
    },
    pipelineOutcome: {
      trajectory: "NARRATIIVI",
      trajectoryConfirmed: "avoin",
      hypothesis: "HYPOTEESI",
      model: "MALLI",
      modelMatch: "yhteensopiva",
      modelRejected: "ristiriidassa",
    },
    filtrationFilter: {
      source: "todellisuus",
      oneSignal: "yksi signaali",
    },
    pipelineValidationResult: "→ yhteensopiva",
    processOutput: "OUTPUT",
    processChainLabel: "Havaintoprosessi",
    signalAxiom: [
      "Pienet, paikalliset signaalit",
      "kantavat koko järjestelmän rakennetta.",
    ],
    noisePrinciple: "Ei tarvita enempää dataa. Tarvitaan vähemmän kohinaa.",
    clarityPrinciple:
      "Rakennamme kristallinkirkkaan käyttöliittymän — ymmärrettävä, läpinäkyvä, turvallinen ja kiinnostava.",
    implicationPrinciple:
      "Jokaisen tiedon on vastattava: mitä siitä seuraa?",
    pipelineImplication: {
      reality: "→ sisääntulokenttä",
      signals: "→ kaupunki säteilee impulsseja",
      observation: "→ huomio muuttuu signaaliksi",
      filtration: "→ näet fragmentin, et kokonaisuutta",
      memory: "→ rakenne säilyy",
      validation: "→ kuvio korvaa kohinan",
      knowledge: "→ malli muuttuu luettavaksi",
      narration: "→ valitset trajektorian T/F",
    },
    core: [
      "Kaupunki kuuntelee signaaleja.",
      "Signaalit paljastavat kitkan.",
      "Kitka kallistaa trajektoria.",
      "Trajektoria kirjoittaa kaupungin uudelleen.",
    ],
    principle: [
      "Järjestelmä ei selitä maailmaa.",
      "Järjestelmä kutsuu huomion.",
    ],
    dissonance: "Kognitiivinen dissonanssi",
    narrativeTitle: "NARRATIIVI",
    narrativeLexicon: "narratiivinen leksikko ↓",
    narrativeLexiconClose: "supista ↑",
    narrativeMore: "lisää ↓",
    narrativeLess: "vähemmän ↑",
    narrativeMetaHint: "havaintokerros",
    learnHint: "PM-vaiheet · pipeline FIRA",
    deliberationHint: "graphene deliberation · ei vaaleja",
    narrative: {
      fira: { name: "FIRA", role: "liike", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "signaali",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "kitka · kognitiivinen dissonanssi",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adaptaatio",
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
        name: "Kognitiivinen dissonanssi",
        role: "kyseenalaistaa oletukset",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Havainnoi →",
    workshopCredit: "Luotu WARSZAWASZA-työpajassa",
    closing: "Näin näyttää minun Varsova. Entä sinun?",
    leaveTrace: "JÄTÄ JÄLKI →",
    trace: {
      copied: "● jälki kopioitu — avaan kanavan",
      copyFailed: "○ tallennettu paikallisesti — lähetä käsin",
      logHeader: "LOG:",
      civicBridge:
        "Havaintoväline → yhteinen kansalaisen jälki (civic tech: kuuntelu → toiminta)",
      attentionUnits: "huomioimpulsseja",
      registry: "● {n} jälkeä kentällä",
    },
    localInitiative: {
      title: "Paikallinen aloite",
      statusLabel: "Tila",
    },
    interference: {
      title: "MATRIISIN HÄIRIÖ",
      secondarySource: "Toissijainen lähde",
      relation: "Suhde",
      evidence: "Todisteaste",
      griffin: "Griffin havaittu",
      capitalTrajectory: "Pääomatrajektoria vahvistettu",
      sameDominant: "Sama hallitseva subjekti kuin",
    },
    dataCity: "datakaupunki",
    log: {
      attention: "huomio",
      inactivity: "toimettomuus",
      pedestrian: "jalankulkuliike",
      scroll: "vieritys",
    },
  },
  lt: {
    observation: "STEBĖJIMAS TĘSIASI",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SIGNALAS",
      friction: "TRINTIS",
      adaptation: "ADAPTACIJA",
      trajectory: "TRAJEKTORIJA",
    },
    pipeline: {
      reality: "Realybė",
      signals: "Signalai",
      observation: "Stebėjimas",
      filtration: "Filtracija",
      memory: "Atmintis",
      validation: "Validacija",
      knowledge: "Žinios",
      narration: "Naratyvas",
    },
    pipelineStatus: {
      waiting: "laukia",
      analyzing: "analizė",
      done: "baigta",
      rejected: "atmesta",
      hypothesis: "hipotezė",
      none: "nėra",
    },
    pipelineStateLabel: {
      reality: "aktyvi",
      signals: "registruojami",
      observation: "tęsiasi",
      filtration: "siaurėjimas",
      memory: "įrašas",
      validation: "tikrinimas",
      knowledge: "nustatyta",
    },
    pipelineOutcome: {
      trajectory: "NARATYVAS",
      trajectoryConfirmed: "atvira",
      hypothesis: "HIPOTEZĖ",
      model: "MODELIS",
      modelMatch: "sutampa",
      modelRejected: "nesutampa",
    },
    filtrationFilter: {
      source: "realybė",
      oneSignal: "vienas signalas",
    },
    pipelineValidationResult: "→ sutampa",
    processOutput: "OUTPUT",
    processChainLabel: "Stebėjimo procesas",
    signalAxiom: [
      "Maži, vietiniai signalai",
      "neša visos sistemos struktūrą.",
    ],
    noisePrinciple: "Nereikia daugiau duomenų. Reikia mažiau triukšmo.",
    clarityPrinciple:
      "Kuriame krištolo skaidrią sąsają — suprantamą, skaidrią, saugią ir įdomią.",
    implicationPrinciple:
      "Kiekviena informacija turi atsakyti: ką iš to seka?",
    pipelineImplication: {
      reality: "→ įėjimo laukas",
      signals: "→ miestas spinduliuoja impulsus",
      observation: "→ dėmesys tampa signalu",
      filtration: "→ matai fragmentą, ne visumą",
      memory: "→ struktūra išsaugoma",
      validation: "→ modelis pakeičia triukšmą",
      knowledge: "→ modelis tampa skaitomas",
      narration: "→ renkiesi trajektoriją T/F",
    },
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
    dissonance: "Kognityvinis disonansas",
    narrativeTitle: "NARATYVAS",
    narrativeLexicon: "naratyvo leksikonas ↓",
    narrativeLexiconClose: "suskleisti ↑",
    narrativeMore: "daugiau ↓",
    narrativeLess: "mažiau ↑",
    narrativeMetaHint: "suvokimo sluoksnis",
    learnHint: "PM fazės · pipeline FIRA",
    deliberationHint: "graphene deliberation · ne rinkimai",
    narrative: {
      fira: { name: "FIRA", role: "judėjimas", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "signalas",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "trintis · kognityvinis disonansas",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adaptacija",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "trajektorija",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Kognityvinis disonansas",
        role: "kelia abejonę prielaidomis",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Stebėk →",
    workshopCredit: "Sukurta WARSZAWASZA dirbtuvėse",
    closing: "Taip atrodo mano Varšuva. O tavo?",
    leaveTrace: "PALIKTI PĖDSAKĄ →",
    trace: {
      copied: "● pėdsakas nukopijuotas — atidarau kanalą",
      copyFailed: "○ išsaugota vietoje — siųsk rankiniu būdu",
      logHeader: "LOG:",
      civicBridge:
        "Stebėjimo instrumentas → bendras pilietinis pėdsakas (civic tech: klausymas → veiksmas)",
      attentionUnits: "dėmesio impulsai",
      registry: "● {n} pėdsakų lauke",
    },
    localInitiative: {
      title: "Vietinė iniciatyva",
      statusLabel: "Būsena",
    },
    interference: {
      title: "MATRICOS INTERFERENCIJA",
      secondarySource: "Antrinis šaltinis",
      relation: "Ryšys",
      evidence: "Įrodymų lygis",
      griffin: "Griffin aptiktas",
      capitalTrajectory: "Kapitalo trajektorija patvirtinta",
      sameDominant: "Tas pats dominuojantis subjektas kaip",
    },
    dataCity: "duomenų miestas",
    log: {
      attention: "dėmesys",
      inactivity: "neveiklumas",
      pedestrian: "pėsčiųjų judėjimas",
      scroll: "slinkimas",
    },
  },
  lv: {
    observation: "NOVĒROJUMS TURPINĀS",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "SIGNĀLS",
      friction: "BERZE",
      adaptation: "ADAPTĀCIJA",
      trajectory: "TRAJEKTORIJA",
    },
    pipeline: {
      reality: "Realitāte",
      signals: "Signāli",
      observation: "Novērojums",
      filtration: "Filtrācija",
      memory: "Atmiņa",
      validation: "Validācija",
      knowledge: "Zināšanas",
      narration: "Naratīvs",
    },
    pipelineStatus: {
      waiting: "gaida",
      analyzing: "analīze",
      done: "pabeigts",
      rejected: "noraidīts",
      hypothesis: "hipotēze",
      none: "nav",
    },
    pipelineStateLabel: {
      reality: "aktīva",
      signals: "reģistrēti",
      observation: "turpinās",
      filtration: "sašaurināšana",
      memory: "ieraksts",
      validation: "pārbaude",
      knowledge: "noteikts",
    },
    pipelineOutcome: {
      trajectory: "NARATĪVS",
      trajectoryConfirmed: "atvērts",
      hypothesis: "HIPOTĒZE",
      model: "MODELIS",
      modelMatch: "saskan",
      modelRejected: "nesaskan",
    },
    filtrationFilter: {
      source: "realitāte",
      oneSignal: "viens signāls",
    },
    pipelineValidationResult: "→ saskan",
    processOutput: "OUTPUT",
    processChainLabel: "Novērošanas process",
    signalAxiom: [
      "Mazi, lokāli signāli",
      "nes visas sistēmas struktūru.",
    ],
    noisePrinciple: "Nav vajadzīgi vairāk datu. Vajadzīgs mazāk trokšņa.",
    clarityPrinciple:
      "Veidojam kristāldzidru saskarni — saprotamu, caurspīdīgu, drošu un interesantu.",
    implicationPrinciple:
      "Katrai informācijai jāatbild: kas no tā izriet?",
    pipelineImplication: {
      reality: "→ ieejas lauks",
      signals: "→ pilsēta izstaro impulsus",
      observation: "→ uzmanība kļūst par signālu",
      filtration: "→ redzi fragmentu, ne visumu",
      memory: "→ struktūra saglabājas",
      validation: "→ modelis aizstāj troksni",
      knowledge: "→ modelis kļūst lasāms",
      narration: "→ izvēlies trajektoriju T/F",
    },
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
    dissonance: "Kognitīvais disonans",
    narrativeTitle: "NARATĪVS",
    narrativeLexicon: "naratīva leksikons ↓",
    narrativeLexiconClose: "sakļaut ↑",
    narrativeMore: "vairāk ↓",
    narrativeLess: "mazāk ↑",
    narrativeMetaHint: "uztveres slānis",
    learnHint: "PM fāzes · pipeline FIRA",
    deliberationHint: "graphene deliberation · ne vēlēšanas",
    narrative: {
      fira: { name: "FIRA", role: "kustība", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "signāls",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "berze · kognitīvais disonans",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adaptācija",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "trajektorija",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Kognitīvais disonans",
        role: "apšauba pieņēmumus",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Novēro →",
    workshopCredit: "Radīts WARSZAWASZA darbnīcā",
    closing: "Tā izskatās mana Varšava. Bet tava?",
    leaveTrace: "ATSTĀT PĒDU →",
    trace: {
      copied: "● pēda nokopēta — atveru kanālu",
      copyFailed: "○ saglabāts lokāli — sūti manuāli",
      logHeader: "LOG:",
      civicBridge:
        "Novērošanas instruments → kopīga pilsoniskā pēda (civic tech: klausīšanās → darbība)",
      attentionUnits: "uzmanības impulsi",
      registry: "● {n} pēdas laukā",
    },
    localInitiative: {
      title: "Vietējā iniciatīva",
      statusLabel: "Statuss",
    },
    interference: {
      title: "MATRICAS INTERFERENCE",
      secondarySource: "Sekundārais avots",
      relation: "Attiecība",
      evidence: "Pierādījuma līmenis",
      griffin: "Griffin konstatēts",
      capitalTrajectory: "Kapitāla trajektorija apstiprināta",
      sameDominant: "Tas pats dominējošais subjekts kā",
    },
    dataCity: "datu pilsēta",
    log: {
      attention: "uzmanība",
      inactivity: "bezdarbība",
      pedestrian: "gājēju kustība",
      scroll: "ritināšana",
    },
  },
  hu: {
    observation: "MEGFIGYELÉS FOLYAMATBAN",
    entry: { falseLabel: "FALSE", trueLabel: "TRUE" },
    flow: {
      signal: "JELZÉS",
      friction: "SÚRLÓDÁS",
      adaptation: "ADAPTÁCIÓ",
      trajectory: "PÁLYA",
    },
    pipeline: {
      reality: "Valóság",
      signals: "Jelzések",
      observation: "Megfigyelés",
      filtration: "Szűrés",
      memory: "Memória",
      validation: "Validáció",
      knowledge: "Tudás",
      narration: "Narráció",
    },
    pipelineStatus: {
      waiting: "várakozik",
      analyzing: "elemzés",
      done: "kész",
      rejected: "elutasítva",
      hypothesis: "hipotézis",
      none: "nincs",
    },
    pipelineStateLabel: {
      reality: "aktív",
      signals: "regisztrálva",
      observation: "folyamatban",
      filtration: "szűkítés",
      memory: "rögzítés",
      validation: "ellenőrzés",
      knowledge: "megállapítva",
    },
    pipelineOutcome: {
      trajectory: "NARRÁCIÓ",
      trajectoryConfirmed: "nyitott",
      hypothesis: "HIPOTÉZIS",
      model: "MODELL",
      modelMatch: "összhangban",
      modelRejected: "ellentmondás",
    },
    filtrationFilter: {
      source: "valóság",
      oneSignal: "egy jelzés",
    },
    pipelineValidationResult: "→ egyezés",
    processOutput: "OUTPUT",
    processChainLabel: "Megfigyelési folyamat",
    signalAxiom: [
      "A kis, helyi jelzések",
      "információt hordoznak az egész rendszer szerkezetéről.",
    ],
    noisePrinciple: "A cél nem több adat. A cél kevesebb zaj.",
    clarityPrinciple:
      "Kristálytiszta felületet építünk — érthető, átlátható, biztonságos és érdekes.",
    implicationPrinciple:
      "Minden információnak válaszolnia kell: miből következik ez?",
    pipelineImplication: {
      reality: "→ belépési mező",
      signals: "→ a város impulzusokat bocsát ki",
      observation: "→ a figyelem jelzéssé válik",
      filtration: "→ töredéket látsz, nem az egészet",
      memory: "→ a szerkezet megmarad",
      validation: "→ a minta felváltja a zajt",
      knowledge: "→ a modell olvashatóvá válik",
      narration: "→ pályát választasz T/F",
    },
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
    dissonance: "Kognitív disszonancia",
    narrativeTitle: "NARRÁCIÓ",
    narrativeLexicon: "narratív szótár ↓",
    narrativeLexiconClose: "összecsuk ↑",
    narrativeMore: "több ↓",
    narrativeLess: "kevesebb ↑",
    narrativeMetaHint: "észlelési réteg",
    learnHint: "PM fázisok · FIRA pipeline",
    deliberationHint: "graphene deliberation · nem választás",
    narrative: {
      fira: { name: "FIRA", role: "mozgás", symbol: "●", href: "/artefacts/fira" },
      diamente: {
        name: "Diamente",
        role: "jelzés",
        symbol: "◇",
        href: "/artefacts/diamente",
      },
      shafir: {
        name: "Shafir",
        role: "súrlódás · kognitív disszonancia",
        symbol: "∥",
        href: "/artefacts/shafir",
      },
      lustra: {
        name: "Lustra",
        role: "adaptáció",
        symbol: "⌁",
        href: "/artefacts/lustra",
      },
      griffin: {
        name: "Griffin",
        role: "pálya",
        symbol: "↗",
        href: "/artefacts/griffin",
      },
      dissonance: {
        name: "Kognitív disszonancia",
        role: "kérdőjelezi a feltételezéseket",
        symbol: "≠",
        href: "/meta",
      },
    },
    beginObservation: "Figyelj →",
    workshopCredit: "A WARSZAWASZA műhelyében tervezve",
    closing: "Így néz ki az én Varsóm. És a tiétek?",
    leaveTrace: "HAGYD A NYOMOD →",
    trace: {
      copied: "● nyom másolva — csatorna megnyitása",
      copyFailed: "○ helyben mentve — küldd kézzel",
      logHeader: "LOG:",
      civicBridge:
        "Megfigyelő eszköz → közös polgári nyom (civic tech: hallgatás → cselekvés)",
      attentionUnits: "figyelem-impulzus",
      registry: "● {n} nyom a mezőben",
    },
    localInitiative: {
      title: "Helyi kezdeményezés",
      statusLabel: "Állapot",
    },
    interference: {
      title: "MÁTRIX INTERFERENCIA",
      secondarySource: "Másodlagos forrás",
      relation: "Kapcsolat",
      evidence: "Bizonyíték szint",
      griffin: "Griffin észlelve",
      capitalTrajectory: "Tőkepálya megerősítve",
      sameDominant: "Ugyanaz a domináns szereplő, mint",
    },
    dataCity: "adatváros",
    log: {
      attention: "figyelem",
      inactivity: "tétlenülés",
      pedestrian: "gyalogos mozgás",
      scroll: "görgetés",
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

/** Citizen trace artifact — three-layer export (PL / EN / IT). */
export type TraceArtifactCopy = {
  documentTitle: string;
  layer1: string;
  layer2: string;
  layer3: string;
  separator: string;
  statusVerified: string;
  statusUnverified: string;
  statusPipelineVerified: string;
  statusTerrainUnverified: string;
  statusTerrainVerified: string;
  emergencyHint: string;
  tracePrefix: string;
  fopChainLabel: string;
  chainStages: string;
  fopPipeline: string;
  fopCoherence: string;
  fopResultLabel: string;
  fopHypothesis: string;
  fopTrajectory: string;
  fopPending: string;
};

export const TRACE_ARTIFACT: Record<"pl" | "en" | "it", TraceArtifactCopy> = {
  pl: {
    documentTitle: "WARSZAWASZA // ŚLAD OBYWATELSKI",
    layer1: "WARSTWA 1 — ŚLAD",
    layer2: "WARSTWA 2 — LOG",
    layer3: "WARSTWA 3 — TELEMETRIA FOP",
    separator: "────────────────",
    statusVerified: "STATUS ✓ Zweryfikowano",
    statusUnverified: "Status: NIEZWERYFIKOWANA — hipoteza oczekująca weryfikacji",
    statusPipelineVerified: "POTOK TECHNICZNY: ✓ ZWERYFIKOWANY (INTEGRALNY)",
    statusTerrainUnverified:
      "STAN TERENOWY (WARSTWA 0): ⚠ NIEPOTWIERDZONY — nasłuch otwarty",
    statusTerrainVerified: "STAN TERENOWY (WARSTWA 0): ✓ POTWIERDZONY",
    emergencyHint:
      "Pilność: w razie aktualnego zagrożenia zadzwoń 112 lub 999. Aplikacja nie zastępuje służb ratunkowych.",
    tracePrefix: "Ślad",
    fopChainLabel: "Łańcuch",
    chainStages: "OBS → SIG → PROC → FIL → PAM → WAL → WIE",
    fopPipeline: "Pipeline / {n} etapów",
    fopCoherence: "Spójność",
    fopResultLabel: "Rezultat",
    fopHypothesis: "Hipoteza #{value}",
    fopTrajectory: "Trajektoria otwarta",
    fopPending: "Oczekuje",
  },
  en: {
    documentTitle: "WARSZAWASZA // CITIZEN TRACE",
    layer1: "LAYER 1 — TRACE",
    layer2: "LAYER 2 — LOG",
    layer3: "LAYER 3 — FOP TELEMETRY",
    separator: "────────────────",
    statusVerified: "STATUS ✓ Verified",
    statusUnverified: "Status: UNVERIFIED — hypothesis awaiting verification",
    statusPipelineVerified: "TECHNICAL PIPELINE: ✓ VERIFIED (INTEGRITY OK)",
    statusTerrainUnverified:
      "FIELD STATE (LAYER 0): ⚠ UNCONFIRMED — open monitoring",
    statusTerrainVerified: "FIELD STATE (LAYER 0): ✓ CONFIRMED",
    emergencyHint:
      "Urgent: if danger is ongoing, call 112 or 999. This app does not replace emergency services.",
    tracePrefix: "Trace",
    fopChainLabel: "Chain",
    chainStages: "OBS → SIG → PROC → FIL → MEM → VAL → KNO",
    fopPipeline: "Pipeline / {n} stages",
    fopCoherence: "Coherence",
    fopResultLabel: "Result",
    fopHypothesis: "Hypothesis #{value}",
    fopTrajectory: "Trajectory open",
    fopPending: "Pending",
  },
  it: {
    documentTitle: "WARSZAWASZA // TRACCIA CIVICA",
    layer1: "STRATO 1 — TRACCIA",
    layer2: "STRATO 2 — LOG",
    layer3: "STRATO 3 — TELEMETRIA FOP",
    separator: "────────────────",
    statusVerified: "STATUS ✓ Verificato",
    statusUnverified: "Stato: NON VERIFICATA — ipotesi in attesa di verifica",
    statusPipelineVerified: "PIPELINE TECNICO: ✓ VERIFICATO (INTEGRITÀ OK)",
    statusTerrainUnverified:
      "STATO TERRITORIALE (LIVELLO 0): ⚠ NON CONFERMATO — monitoraggio aperto",
    statusTerrainVerified: "STATO TERRITORIALE (LIVELLO 0): ✓ CONFERMATO",
    emergencyHint:
      "Urgenza: se il pericolo è attuale, chiama 112 o 999. L'app non sostituisce i servizi di emergenza.",
    tracePrefix: "Traccia",
    fopChainLabel: "Catena",
    chainStages: "OBS → SIG → PROC → FIL → MEM → VAL → KNO",
    fopPipeline: "Pipeline / {n} fasi",
    fopCoherence: "Coerenza",
    fopResultLabel: "Risultato",
    fopHypothesis: "Ipotesi #{value}",
    fopTrajectory: "Traiettoria aperta",
    fopPending: "In attesa",
  },
};

export function traceArtifactCopy(lang: Lang): TraceArtifactCopy {
  if (lang === "pl" || lang === "it") return TRACE_ARTIFACT[lang];
  return TRACE_ARTIFACT.en;
}

/** Human-facing trace export — no WARSTWA / FOP headers. */
export type TraceResidentCopy = {
  cityDefault: string;
  statusReceived: string;
  statusAwaitingField: string;
  statusUnverified: string;
  findWaterShade: string;
  reportObservation: string;
  technicalData: string;
  minutesAgo: string;
  hoursAgo: string;
  justNow: string;
};

export const TRACE_RESIDENT: Partial<Record<Lang, TraceResidentCopy>> = {
  pl: {
    cityDefault: "Warszawa",
    statusReceived: "✓ Zgłoszenie odebrane",
    statusAwaitingField: "⚠ Część danych czeka na potwierdzenie w terenie",
    statusUnverified: "Status: niezweryfikowane",
    findWaterShade: "Znajdź wodę i cień",
    reportObservation: "Zgłoś obserwację",
    technicalData: "Dane techniczne",
    minutesAgo: "{n} min temu",
    hoursAgo: "{n} godz. temu",
    justNow: "przed chwilą",
  },
  en: {
    cityDefault: "Warsaw",
    statusReceived: "✓ Report received",
    statusAwaitingField: "⚠ Some data awaits field confirmation",
    statusUnverified: "Status: unverified",
    findWaterShade: "Find water and shade",
    reportObservation: "Report an observation",
    technicalData: "Technical data",
    minutesAgo: "{n} min ago",
    hoursAgo: "{n} h ago",
    justNow: "just now",
  },
  it: {
    cityDefault: "Varsavia",
    statusReceived: "✓ Segnalazione ricevuta",
    statusAwaitingField: "⚠ Alcuni dati attendono conferma sul campo",
    statusUnverified: "Stato: non verificato",
    findWaterShade: "Trova acqua e ombra",
    reportObservation: "Segnala un'osservazione",
    technicalData: "Dati tecnici",
    minutesAgo: "{n} min fa",
    hoursAgo: "{n} h fa",
    justNow: "proprio ora",
  },
  uk: {
    cityDefault: "Варшава",
    statusReceived: "✓ Звернення прийнято",
    statusAwaitingField: "⚠ Частина даних очікує підтвердження в полі",
    statusUnverified: "Статус: не перевірено",
    findWaterShade: "Знайти воду та тінь",
    reportObservation: "Повідомити спостереження",
    technicalData: "Технічні дані",
    minutesAgo: "{n} хв тому",
    hoursAgo: "{n} год тому",
    justNow: "щойно",
  },
};

export function traceResidentCopy(lang: Lang): TraceResidentCopy {
  return TRACE_RESIDENT[lang] ?? TRACE_RESIDENT.en!;
}
