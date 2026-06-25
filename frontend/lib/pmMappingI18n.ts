import type { Lang } from "./i18n";

export type PmBucketKey =
  | "initiation"
  | "planning"
  | "design"
  | "execution"
  | "closing";

type PmModelBlock = {
  title: string;
  phases: readonly string[];
};

type LearnCopy = {
  title: string;
  subtitle: string;
  back: string;
  intro: string;
  chainLabel: string;
  mappingTitle: string;
  pmColumn: string;
  firaColumn: string;
  coreColumn: string;
  buckets: Record<PmBucketKey, { pm: string; note: string }>;
  modelsTitle: string;
  models: {
    five: PmModelBlock;
    six: PmModelBlock;
    hermes: PmModelBlock;
  };
  principle: string;
  cta: string;
  protocolLink: string;
};

export const PM_MAPPING_COPY: Record<Lang, LearnCopy> = {
  pl: {
    title: "Fazy PM · pipeline FIRA",
    subtitle: "Mapowanie pedagogiczne — nie część core",
    back: "← ●",
    intro:
      "Klasyczne modele zarządzania projektami opisują organizację zmiany. FIRA opisuje, jak obserwator redukuje szum do wniosku. Poniżej — zestawienie bez importu PM do protokołu.",
    chainLabel: "Łańcuch obserwacji WARSZAWASZA",
    mappingTitle: "Mapowanie kanoniczne",
    pmColumn: "Faza PM",
    firaColumn: "Pipeline FIRA",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Inicjacja · Gate",
        note: "Wybór trajektorii T/F — kierunek, nie poprawna odpowiedź",
      },
      planning: {
        pm: "Planowanie · Definicja",
        note: "Sygnały rejestrowane; uwaga staje się mierzalna",
      },
      design: {
        pm: "Projekt · Analiza",
        note: "Filtracja i pamięć — struktura z szumu",
      },
      execution: {
        pm: "Wykonanie",
        note: "Walidacja wzorca — cykl binarny",
      },
      closing: {
        pm: "Monitoring · Zamknięcie",
        note: "Wiedza + OUTPUT — konsekwencja obserwacji",
      },
    },
    modelsTitle: "Inne modele",
    models: {
      five: {
        title: "5 faz (Wrike / Atlassian)",
        phases: [
          "Inicjacja → ○",
          "Planowanie → ● ◐",
          "Wykonanie → ◉ ≈ ✓",
          "Monitoring → ■",
          "Zamknięcie → OUTPUT",
        ],
      },
      six: {
        title: "6 faz (lifecycle)",
        phases: [
          "Inicjacja → ○",
          "Definicja → ●",
          "Projekt → ◐ ◉",
          "Rozwój → ≈",
          "Implementacja → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 fazy)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Każda faza musi odpowiedzieć: co z tego wynika dla obserwatora?",
    cta: "Wróć do obserwacji →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  en: {
    title: "PM phases · FIRA pipeline",
    subtitle: "Pedagogical mapping — not part of core",
    back: "← ●",
    intro:
      "Classic project-management models describe how organizations deliver change. FIRA describes how an observer reduces noise to a conclusion. Below — alignment without importing PM into the protocol.",
    chainLabel: "WARSZAWASZA observation chain",
    mappingTitle: "Canonical mapping",
    pmColumn: "PM phase",
    firaColumn: "FIRA pipeline",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Initiation · Gate",
        note: "T/F trajectory choice — direction, not a correct answer",
      },
      planning: {
        pm: "Planning · Definition",
        note: "Signals registered; attention becomes measurable",
      },
      design: {
        pm: "Design · Analysis",
        note: "Filtration and memory — structure from noise",
      },
      execution: {
        pm: "Execution",
        note: "Pattern validation — binary cycle",
      },
      closing: {
        pm: "Monitoring · Closing",
        note: "Knowledge + OUTPUT — consequence of observation",
      },
    },
    modelsTitle: "Other models",
    models: {
      five: {
        title: "5 phases (Wrike / Atlassian)",
        phases: [
          "Initiation → ○",
          "Planning → ● ◐",
          "Execution → ◉ ≈ ✓",
          "Monitoring → ■",
          "Closing → OUTPUT",
        ],
      },
      six: {
        title: "6 phases (lifecycle)",
        phases: [
          "Initiation → ○",
          "Definition → ●",
          "Design → ◐ ◉",
          "Development → ≈",
          "Implementation → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 phases)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Each phase must answer: what follows for the observer?",
    cta: "Return to observation →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  it: {
    title: "Fasi PM · pipeline FIRA",
    subtitle: "Mappatura pedagogica — non parte del core",
    back: "← ●",
    intro:
      "I modelli classici di project management descrivono come un'organizzazione consegna il cambiamento. FIRA descrive come un osservatore riduce il rumore fino a una conclusione. Di seguito — allineamento senza importare il PM nel protocollo.",
    chainLabel: "Catena di osservazione WARSZAWASZA",
    mappingTitle: "Mappatura canonica",
    pmColumn: "Fase PM",
    firaColumn: "Pipeline FIRA",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Iniziazione · Gate",
        note: "Scelta traiettoria T/F — direzione, non risposta corretta",
      },
      planning: {
        pm: "Pianificazione · Definizione",
        note: "Segnali registrati; l'attenzione diventa misurabile",
      },
      design: {
        pm: "Progetto · Analisi",
        note: "Filtrazione e memoria — struttura dal rumore",
      },
      execution: {
        pm: "Esecuzione",
        note: "Validazione del pattern — ciclo binario",
      },
      closing: {
        pm: "Monitoraggio · Chiusura",
        note: "Conoscenza + OUTPUT — conseguenza dell'osservazione",
      },
    },
    modelsTitle: "Altri modelli",
    models: {
      five: {
        title: "5 fasi (Wrike / Atlassian)",
        phases: [
          "Iniziazione → ○",
          "Pianificazione → ● ◐",
          "Esecuzione → ◉ ≈ ✓",
          "Monitoraggio → ■",
          "Chiusura → OUTPUT",
        ],
      },
      six: {
        title: "6 fasi (lifecycle)",
        phases: [
          "Iniziazione → ○",
          "Definizione → ●",
          "Progetto → ◐ ◉",
          "Sviluppo → ≈",
          "Implementazione → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 fasi)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Ogni fase deve rispondere: cosa ne consegue per l'osservatore?",
    cta: "Torna all'osservazione →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  uk: {
    title: "Фази PM · pipeline FIRA",
    subtitle: "Педагогічне зіставлення — не частина core",
    back: "← ●",
    intro:
      "Класичні моделі управління проєктами описують, як організація проводить зміни. FIRA описує, як спостерігач зменшує шум до висновку. Нижче — зіставлення без імпорту PM у протокол.",
    chainLabel: "Ланцюг спостереження WARSZAWASZA",
    mappingTitle: "Канонічне зіставлення",
    pmColumn: "Фаза PM",
    firaColumn: "Pipeline FIRA",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Ініціація · Gate",
        note: "Вибір траєкторії T/F — напрям, не правильна відповідь",
      },
      planning: {
        pm: "Планування · Визначення",
        note: "Сигнали реєструються; увага стає вимірюваною",
      },
      design: {
        pm: "Проєкт · Аналіз",
        note: "Фільтрація і пам'ять — структура з шуму",
      },
      execution: {
        pm: "Виконання",
        note: "Валідація патерну — бінарний цикл",
      },
      closing: {
        pm: "Моніторинг · Закриття",
        note: "Знання + OUTPUT — наслідок спостереження",
      },
    },
    modelsTitle: "Інші моделі",
    models: {
      five: {
        title: "5 фаз (Wrike / Atlassian)",
        phases: [
          "Ініціація → ○",
          "Планування → ● ◐",
          "Виконання → ◉ ≈ ✓",
          "Моніторинг → ■",
          "Закриття → OUTPUT",
        ],
      },
      six: {
        title: "6 фаз (lifecycle)",
        phases: [
          "Ініціація → ○",
          "Визначення → ●",
          "Проєкт → ◐ ◉",
          "Розвиток → ≈",
          "Імплементація → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 фази)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Кожна фаза має відповісти: що з цього випливає для спостерігача?",
    cta: "Повернутися до спостереження →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  hu: {
    title: "PM fázisok · FIRA pipeline",
    subtitle: "Pedagógiai leképezés — nem része a core-nak",
    back: "← ●",
    intro:
      "A klasszikus projektmenedzsment-modellek azt írják le, hogyan visz végig változást egy szervezet. A FIRA azt, hogyan csökkenti a megfigyelő a zajt következtetésig. Alább — összevetés PM import nélkül a protokollba.",
    chainLabel: "WARSZAWASZA megfigyelési lánc",
    mappingTitle: "Kanonikus leképezés",
    pmColumn: "PM fázis",
    firaColumn: "FIRA pipeline",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Indítás · Gate",
        note: "T/F pályaválasztás — irány, nem helyes válasz",
      },
      planning: {
        pm: "Tervezés · Definíció",
        note: "Jelek regisztrálva; a figyelem mérhetővé válik",
      },
      design: {
        pm: "Tervezés · Analízis",
        note: "Szűrés és memória — struktúra a zajból",
      },
      execution: {
        pm: "Végrehajtás",
        note: "Minta validálása — bináris ciklus",
      },
      closing: {
        pm: "Monitoring · Lezárás",
        note: "Tudás + OUTPUT — a megfigyelés következménye",
      },
    },
    modelsTitle: "Más modellek",
    models: {
      five: {
        title: "5 fázis (Wrike / Atlassian)",
        phases: [
          "Indítás → ○",
          "Tervezés → ● ◐",
          "Végrehajtás → ◉ ≈ ✓",
          "Monitoring → ■",
          "Lezárás → OUTPUT",
        ],
      },
      six: {
        title: "6 fázis (lifecycle)",
        phases: [
          "Indítás → ○",
          "Definíció → ●",
          "Tervezés → ◐ ◉",
          "Fejlesztés → ≈",
          "Implementáció → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 fázis)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Minden fázisnak válaszolnia kell: mi következik a megfigyelő számára?",
    cta: "Vissza a megfigyeléshez →",
    protocolLink: "fira/PM_MAPPING.md",
  },
};
