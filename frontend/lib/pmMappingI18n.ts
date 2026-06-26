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
  bg: {
    title: "Фази PM · pipeline FIRA",
    subtitle: "Педагогическо съпоставяне — не част от core",
    back: "← ●",
    intro:
      "Класическите модели за управление на проекти описват как организацията провежда промяна. FIRA описва как наблюдателят намалява шума до извод. По-долу — съпоставяне без импорт на PM в протокола.",
    chainLabel: "Верига на наблюдение WARSZAWASZA",
    mappingTitle: "Канонично съпоставяне",
    pmColumn: "Фаза PM",
    firaColumn: "Pipeline FIRA",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Инициация · Gate",
        note: "Избор на траектория T/F — посока, не правилен отговор",
      },
      planning: {
        pm: "Планиране · Дефиниция",
        note: "Сигналите се регистрират; вниманието става измеримо",
      },
      design: {
        pm: "Проект · Анализ",
        note: "Филтрация и памет — структура от шума",
      },
      execution: {
        pm: "Изпълнение",
        note: "Валидация на модела — бинарен цикъл",
      },
      closing: {
        pm: "Мониторинг · Затваряне",
        note: "Знание + OUTPUT — последица от наблюдението",
      },
    },
    modelsTitle: "Други модели",
    models: {
      five: {
        title: "5 фази (Wrike / Atlassian)",
        phases: [
          "Инициация → ○",
          "Планиране → ● ◐",
          "Изпълнение → ◉ ≈ ✓",
          "Мониторинг → ■",
          "Затваряне → OUTPUT",
        ],
      },
      six: {
        title: "6 фази (lifecycle)",
        phases: [
          "Инициация → ○",
          "Дефиниция → ●",
          "Проект → ◐ ◉",
          "Развитие → ≈",
          "Имплементация → ✓",
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
    principle: "Всяка фаза трябва да отговори: какво следва за наблюдателя?",
    cta: "Обратно към наблюдението →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  et: {
    title: "PM faasid · FIRA pipeline",
    subtitle: "Pedagoogiline vastavus — mitte core osa",
    back: "← ●",
    intro:
      "Klassikalised projektijuhtimise mudelid kirjeldavad, kuidas organisatsioon muutust viib läbi. FIRA kirjeldab, kuidas vaatleja vähendab müra järelduseni. Allpool — vastavus ilma PM importimata protokolli.",
    chainLabel: "WARSZAWASZA vaatlusahel",
    mappingTitle: "Kanooniline vastavus",
    pmColumn: "PM faas",
    firaColumn: "FIRA pipeline",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Initsiatsioon · Gate",
        note: "T/F trajektoori valik — suund, mitte õige vastus",
      },
      planning: {
        pm: "Planeerimine · Definitsioon",
        note: "Signaalid registreeritud; tähelepanu muutub mõõdetavaks",
      },
      design: {
        pm: "Disain · Analüüs",
        note: "Filtratsioon ja mälu — struktuur mürast",
      },
      execution: {
        pm: "Teostus",
        note: "Mustri valideerimine — binaarne tsükkel",
      },
      closing: {
        pm: "Monitooring · Sulgemine",
        note: "Teadmine + OUTPUT — vaatluse tagajärg",
      },
    },
    modelsTitle: "Teised mudelid",
    models: {
      five: {
        title: "5 faasi (Wrike / Atlassian)",
        phases: [
          "Initsiatsioon → ○",
          "Planeerimine → ● ◐",
          "Teostus → ◉ ≈ ✓",
          "Monitooring → ■",
          "Sulgemine → OUTPUT",
        ],
      },
      six: {
        title: "6 faasi (lifecycle)",
        phases: [
          "Initsiatsioon → ○",
          "Definitsioon → ●",
          "Disain → ◐ ◉",
          "Arendus → ≈",
          "Implementatsioon → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 faasi)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Iga faas peab vastama: mis sellest vaatlejale järgneb?",
    cta: "Tagasi vaatlusse →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  fi: {
    title: "PM-vaiheet · FIRA pipeline",
    subtitle: "Pedagoginen vastaavuus — ei osa corea",
    back: "← ●",
    intro:
      "Klassiset projektinhallintamallit kuvaavat, miten organisaatio toteuttaa muutosta. FIRA kuvaa, miten havainnoija vähentää kohinan johtopäätökseen. Alla — vastaavuus ilman PM:n tuontia protokollaan.",
    chainLabel: "WARSZAWASZA-havaintoketju",
    mappingTitle: "Kanoninen vastaavuus",
    pmColumn: "PM-vaihe",
    firaColumn: "FIRA pipeline",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Aloitus · Gate",
        note: "T/F-trajektoriavalinta — suunta, ei oikea vastaus",
      },
      planning: {
        pm: "Suunnittelu · Määrittely",
        note: "Signaalit rekisteröity; huomio muuttuu mitattavaksi",
      },
      design: {
        pm: "Suunnittelu · Analyysi",
        note: "Suodatus ja muisti — rakenne kohinasta",
      },
      execution: {
        pm: "Toteutus",
        note: "Kuvion validointi — binäärinen sykli",
      },
      closing: {
        pm: "Seuranta · Päättäminen",
        note: "Tieto + OUTPUT — havainnon seuraus",
      },
    },
    modelsTitle: "Muut mallit",
    models: {
      five: {
        title: "5 vaihetta (Wrike / Atlassian)",
        phases: [
          "Aloitus → ○",
          "Suunnittelu → ● ◐",
          "Toteutus → ◉ ≈ ✓",
          "Seuranta → ■",
          "Päättäminen → OUTPUT",
        ],
      },
      six: {
        title: "6 vaihetta (lifecycle)",
        phases: [
          "Aloitus → ○",
          "Määrittely → ●",
          "Suunnittelu → ◐ ◉",
          "Kehitys → ≈",
          "Toteutus → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 vaihetta)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Jokaisen vaiheen on vastattava: mitä seuraa havainnoijalle?",
    cta: "Palaa havaintoon →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  lt: {
    title: "PM fazės · FIRA pipeline",
    subtitle: "Pedagoginis atitikimas — ne core dalis",
    back: "← ●",
    intro:
      "Klasikiniai projektų valdymo modeliai aprašo, kaip organizacija įgyvendina pokyčius. FIRA aprašo, kaip stebėtojas sumažina triukšmą iki išvados. Žemiau — atitikimas neimportuojant PM į protokolą.",
    chainLabel: "WARSZAWASZA stebėjimo grandinė",
    mappingTitle: "Kanoninis atitikimas",
    pmColumn: "PM fazė",
    firaColumn: "FIRA pipeline",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Iniciacija · Gate",
        note: "T/F trajektorijos pasirinkimas — kryptis, ne teisingas atsakymas",
      },
      planning: {
        pm: "Planavimas · Apibrėžimas",
        note: "Signalai registruojami; dėmesys tampa matuojamas",
      },
      design: {
        pm: "Projektas · Analizė",
        note: "Filtracija ir atmintis — struktūra iš triukšmo",
      },
      execution: {
        pm: "Vykdymas",
        note: "Modelio validacija — binarinis ciklas",
      },
      closing: {
        pm: "Monitoringas · Uždarymas",
        note: "Žinios + OUTPUT — stebėjimo pasekmė",
      },
    },
    modelsTitle: "Kiti modeliai",
    models: {
      five: {
        title: "5 fazės (Wrike / Atlassian)",
        phases: [
          "Iniciacija → ○",
          "Planavimas → ● ◐",
          "Vykdymas → ◉ ≈ ✓",
          "Monitoringas → ■",
          "Uždarymas → OUTPUT",
        ],
      },
      six: {
        title: "6 fazės (lifecycle)",
        phases: [
          "Iniciacija → ○",
          "Apibrėžimas → ●",
          "Projektas → ◐ ◉",
          "Plėtra → ≈",
          "Įgyvendinimas → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 fazės)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Kiekviena fazė turi atsakyti: ką tai reiškia stebėtojui?",
    cta: "Grįžti į stebėjimą →",
    protocolLink: "fira/PM_MAPPING.md",
  },
  lv: {
    title: "PM fāzes · FIRA pipeline",
    subtitle: "Pedagoģiskā atbilstība — nav core daļa",
    back: "← ●",
    intro:
      "Klasiskie projektu vadības modeļi apraksta, kā organizācija īsteno izmaiņas. FIRA apraksta, kā novērotājs samazina troksni līdz secinājumam. Zemāk — atbilstība bez PM importa protokolā.",
    chainLabel: "WARSZAWASZA novērošanas ķēde",
    mappingTitle: "Kanoniskā atbilstība",
    pmColumn: "PM fāze",
    firaColumn: "FIRA pipeline",
    coreColumn: "Core",
    buckets: {
      initiation: {
        pm: "Iniciācija · Gate",
        note: "T/F trajektorijas izvēle — virziens, ne pareizā atbilde",
      },
      planning: {
        pm: "Plānošana · Definīcija",
        note: "Signāli reģistrēti; uzmanība kļūst mērāma",
      },
      design: {
        pm: "Projekts · Analīze",
        note: "Filtrācija un atmiņa — struktūra no trokšņa",
      },
      execution: {
        pm: "Izpilde",
        note: "Modeļa validācija — binārais cikls",
      },
      closing: {
        pm: "Monitorings · Slēgšana",
        note: "Zināšanas + OUTPUT — novērojuma sekas",
      },
    },
    modelsTitle: "Citi modeļi",
    models: {
      five: {
        title: "5 fāzes (Wrike / Atlassian)",
        phases: [
          "Iniciācija → ○",
          "Plānošana → ● ◐",
          "Izpilde → ◉ ≈ ✓",
          "Monitorings → ■",
          "Slēgšana → OUTPUT",
        ],
      },
      six: {
        title: "6 fāzes (lifecycle)",
        phases: [
          "Iniciācija → ○",
          "Definīcija → ●",
          "Projekts → ◐ ◉",
          "Attīstība → ≈",
          "Implementācija → ✓",
          "Follow-up → ■ OUTPUT",
        ],
      },
      hermes: {
        title: "HERMES (4 fāzes)",
        phases: [
          "Initiation → ○",
          "Concept → ● ◐ ◉ ≈",
          "Implementation → ✓ ■",
          "Deployment → OUTPUT",
        ],
      },
    },
    principle: "Katrai fāzei jāatbild: kas no tā izriet novērotājam?",
    cta: "Atpakaļ pie novērojuma →",
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
