export type Lang = "pl" | "it" | "uk" | "hu" | "en";

export const LANGS: Lang[] = ["pl", "it", "uk", "hu", "en"];

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
    noisePrinciple: "Мета — не більше даних. Мета — менше шуму.",
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
      "Місто реагує на сигнали.",
      "Сигнали виявляють тертя.",
      "Тертя змінює траєкторії.",
      "Траєкторії змінюють місто.",
    ],
    principle: [
      "Система не пояснює світ.",
      "Система запрошує до уваги.",
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
