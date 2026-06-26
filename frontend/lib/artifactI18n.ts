import type { Lang } from "./i18n";
import type { ArtifactSlug } from "./artifacts";

export type TrajectoryChoice = "false" | "true";

export type EntryCopy = {
  observationMark: string;
  gateOrient: string;
  gateOrientTitle: string;
  gatePurpose: readonly [string, string];
  gateOrientPrompt: string;
  gateOrientAction: string;
  logoLinkLabel: string;
  gateObserve: string;
  gateObserveAction: string;
  gateQuestion: string;
  gateHesitation: string;
  falseLabel: string;
  trueLabel: string;
  falseHint: string;
  trueHint: string;
  revealSpark: string;
  revealWave: string;
  revealLine1: string;
  revealLine2: string;
  enterField: string;
};

type ArtifactLayer = {
  symbol: string;
  name: string;
  role: string;
  lead: string;
  body: string[];
  signal: string;
};

export type ArtifactCopy = Record<ArtifactSlug, ArtifactLayer>;

export const ENTRY_COPY: Record<Lang, EntryCopy> = {
  pl: {
    observationMark: "● OBSERWACJA TRWA",
    gateOrient: "Wstęp",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "To nie jest portal o Warszawie.",
      "To interfejs obserwacji.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "kontynuuj",
    logoLinkLabel: "WARSZAWASZA — pracownia projektu",
    gateObserve: "OBSERWUJ",
    gateObserveAction: "kontynuuj ↓",
    gateQuestion: "PYTANIE",
    gateHesitation: "Klik to zawahanie — dopiero potem T albo F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — zatrzymuję się; nic dalej nie wynika",
    trueHint: "T — wynika kierunek: idę od sygnału do struktury",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Nie wybrałeś odpowiedzi.",
    revealLine2: "Wybrałeś kierunek.",
    enterField: "Obserwuj →",
  },
  en: {
    observationMark: "● OBSERVATION IN PROGRESS",
    gateOrient: "Opening",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "This is not a portal about Warsaw.",
      "This is an observation interface.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "continue",
    logoLinkLabel: "WARSZAWASZA — project origin",
    gateObserve: "OBSERVE",
    gateObserveAction: "continue ↓",
    gateQuestion: "QUESTION",
    gateHesitation: "Click is hesitation — only then T or F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — I stop; nothing further follows",
    trueHint: "T — a direction follows: signal toward structure",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "You did not choose an answer.",
    revealLine2: "You chose a direction.",
    enterField: "Observe →",
  },
  it: {
    observationMark: "● OSSERVAZIONE IN CORSO",
    gateOrient: "Apertura",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Non è un portale su Varsavia.",
      "È un'interfaccia di osservazione.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "continua",
    logoLinkLabel: "WARSZAWASZA — origine del progetto",
    gateObserve: "OSSERVA",
    gateObserveAction: "continua ↓",
    gateQuestion: "DOMANDA",
    gateHesitation: "Il clic è esitazione — poi T o F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — mi fermo; non consegue nulla",
    trueHint: "T — ne consegue una direzione: segnale verso struttura",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Non hai scelto una risposta.",
    revealLine2: "Hai scelto una direzione.",
    enterField: "Osserva →",
  },
  uk: {
    observationMark: "● СПОСТЕРЕЖЕННЯ ТРИВАЄ",
    gateOrient: "Вступ",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Це не портал про Варшаву.",
      "Це інтерфейс спостереження за містом.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "далі",
    logoLinkLabel: "WARSZAWASZA — майстерня проєкту",
    gateObserve: "СПОСТЕРІГАЙ",
    gateObserveAction: "далі ↓",
    gateQuestion: "ПИТАННЯ",
    gateHesitation: "Клік — це зволікання; потім лише T або F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — зупиняюсь; далі нічого не випливає",
    trueHint: "T — випливає напрямок: від сигналу до структури",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Відповіді не було.",
    revealLine2: "Був напрямок.",
    enterField: "Спостерігай →",
  },
  bg: {
    observationMark: "● НАБЛЮДЕНИЕТО ПРОДЪЛЖАВА",
    gateOrient: "Вход",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Това не е портал за Варшава.",
      "Това е интерфейс за наблюдение на града.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "напред",
    logoLinkLabel: "WARSZAWASZA — работилница на проекта",
    gateObserve: "НАБЛЮДАВАЙ",
    gateObserveAction: "напред ↓",
    gateQuestion: "ВЪПРОС",
    gateHesitation: "Кликът е колебание — едва тогава T или F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — спирам; нищо повече не следва",
    trueHint: "T — следва посока: от сигнал към структура",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Не избра отговор.",
    revealLine2: "Избра посока.",
    enterField: "Наблюдавай →",
  },
  et: {
    observationMark: "● VAATLUS JÄTKUB",
    gateOrient: "Sissejuhatus",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "See pole Varssavi portaal.",
      "See on linna vaatluse liides.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "edasi",
    logoLinkLabel: "WARSZAWASZA — projekti päritolu",
    gateObserve: "VAATLE",
    gateObserveAction: "edasi ↓",
    gateQuestion: "KÜSIMUS",
    gateHesitation: "Klikk on kõhklemine — alles siis T või F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — peatun; edasi ei järgne midagi",
    trueHint: "T — järgneb suund: signaalist struktuurini",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Sa ei valinud vastust.",
    revealLine2: "Sa valisid suuna.",
    enterField: "Vaatle →",
  },
  fi: {
    observationMark: "● HAVAINTO JATKUU",
    gateOrient: "Avaus",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Tämä ei ole portaali Varsovasta.",
      "Tämä on kaupungin havainnoinnin käyttöliittymä.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "jatka",
    logoLinkLabel: "WARSZAWASZA — projektin alkuperä",
    gateObserve: "HAVAINNOI",
    gateObserveAction: "jatka ↓",
    gateQuestion: "KYSYMYS",
    gateHesitation: "Klikkaus on epäröintiä — vasta sitten T tai F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — pysähdyn; mitään ei seuraa",
    trueHint: "T — seuraa suunta: signaalista rakenteeseen",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Et valinnut vastausta.",
    revealLine2: "Valitsit suunnan.",
    enterField: "Havainnoi →",
  },
  lt: {
    observationMark: "● STEBĖJIMAS TĘSIASI",
    gateOrient: "Įvadas",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Tai ne portalas apie Varšuvą.",
      "Tai miesto stebėjimo sąsaja.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "toliau",
    logoLinkLabel: "WARSZAWASZA — projekto kilmė",
    gateObserve: "STEBĖK",
    gateObserveAction: "toliau ↓",
    gateQuestion: "KLAUSIMAS",
    gateHesitation: "Paspaudimas — dvejonė; tik tada T arba F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — sustoju; nieko daugiau neseka",
    trueHint: "T — seka kryptis: nuo signalo iki struktūros",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Nepasirinkai atsakymo.",
    revealLine2: "Pasirinkai kryptį.",
    enterField: "Stebėk →",
  },
  lv: {
    observationMark: "● NOVĒROJUMS TURPINĀS",
    gateOrient: "Ievads",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Šī nav portāls par Varšavu.",
      "Šī ir pilsētas novērošanas saskarne.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "tālāk",
    logoLinkLabel: "WARSZAWASZA — projekta izcelsme",
    gateObserve: "NOVĒRO",
    gateObserveAction: "tālāk ↓",
    gateQuestion: "JAUTĀJUMS",
    gateHesitation: "Klikšķis ir vilcināšanās — tad tikai T vai F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — apstājos; nekas vairs neseko",
    trueHint: "T — seko virziens: no signāla līdz struktūrai",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Tu neizvēlējies atbildi.",
    revealLine2: "Tu izvēlējies virzienu.",
    enterField: "Novēro →",
  },
  hu: {
    observationMark: "● MEGFIGYELÉS FOLYAMATBAN",
    gateOrient: "Nyitás",
    gateOrientTitle: "WARSZAWASZA",
    gatePurpose: [
      "Ez nem varsói portál.",
      "Ez a város megfigyelésének felülete.",
    ],
    gateOrientPrompt: "> █",
    gateOrientAction: "tovább",
    logoLinkLabel: "WARSZAWASZA — a projekt eredete",
    gateObserve: "FIGYELJ",
    gateObserveAction: "tovább ↓",
    gateQuestion: "KÉRDÉS",
    gateHesitation: "Kattintás = habozás — aztán T vagy F.",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "F — megállok; semmi nem következik",
    trueHint: "T — irány következik: jelzésből szerkezet",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Nem választottál választ.",
    revealLine2: "Irányt választottál.",
    enterField: "Figyelj →",
  },
};

export const ARTIFACT_COPY: Record<Lang, ArtifactCopy> = {
  pl: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "zwalidowany sygnał",
      lead: "Sygnał, który przeszedł przez tarcie i nie rozpadł się.",
      body: [
        "Diamente to moment, gdy szum ustępuje przed wzorcem.",
        "Nie jest prawdą — jest nośnikiem prawdy.",
      ],
      signal: "◇ → walidacja",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "tarcie · dysonans poznawczy",
      lead: "Dwie interpretacje idą równolegle. Żadna nie chce ustąpić.",
      body: [
        "Shafir to opór materii na zbyt proste narracje.",
        "Tarcie nie jest błędem. Tarcie jest informacją.",
      ],
      signal: "∥ → opór",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adaptacja",
      lead: "Miasto odbija sygnał z powrotem do obserwatora.",
      body: [
        "Lustra nie kopiują — przekładają.",
        "Adaptacja to nie kapitulacja. To nowa trajektoria.",
      ],
      signal: "⌁ → odbicie",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "trajektoria",
      lead: "Kierunek, który nie był widoczny, dopóki nie ruszyła uwaga.",
      body: [
        "Griffin nie prowadzi. Griffin wskazuje wektor.",
        "Trajektoria zmienia miasto szybciej niż deklaracja.",
      ],
      signal: "↗ → wektor",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "ruch · operating system",
      lead: "System pamięta. Człowiek decyduje.",
      body: [
        "FIRA to pole, w którym obserwacja staje się wpływem.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → ruch",
    },
  },
  en: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "validated signal",
      lead: "A signal that passed through friction and did not collapse.",
      body: [
        "Diamente is the moment when noise yields to pattern.",
        "It is not truth — it is the carrier of truth.",
      ],
      signal: "◇ → validation",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "friction · cognitive dissonance",
      lead: "Two interpretations run parallel. Neither wants to yield.",
      body: [
        "Shafir is matter resisting narratives that are too simple.",
        "Friction is not error. Friction is information.",
      ],
      signal: "∥ → resistance",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adaptation",
      lead: "The city reflects the signal back to the observer.",
      body: [
        "Lustra do not copy — they translate.",
        "Adaptation is not surrender. It is a new trajectory.",
      ],
      signal: "⌁ → reflection",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "trajectory",
      lead: "A direction invisible until attention began to move.",
      body: [
        "Griffin does not lead. Griffin indicates a vector.",
        "Trajectory changes the city faster than declaration.",
      ],
      signal: "↗ → vector",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "movement · operating system",
      lead: "The system remembers. Humans decide.",
      body: [
        "FIRA is the field where observation becomes influence.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → movement",
    },
  },
  it: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "segnale validato",
      lead: "Un segnale che ha attraversato l'attrito senza collassare.",
      body: [
        "Diamente è il momento in cui il rumore cede al pattern.",
        "Non è verità — è il vettore della verità.",
      ],
      signal: "◇ → validazione",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "attrito · dissonanza cognitiva",
      lead: "Due interpretazioni corrono in parallelo. Nessuna cede.",
      body: [
        "Shafir è la materia che resiste a narrazioni troppo semplici.",
        "L'attrito non è errore. L'attrito è informazione.",
      ],
      signal: "∥ → resistenza",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adattamento",
      lead: "La città riflette il segnale verso l'osservatore.",
      body: [
        "Lustra non copiano — traducono.",
        "L'adattamento non è resa. È una nuova traiettoria.",
      ],
      signal: "⌁ → riflesso",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "traiettoria",
      lead: "Una direzione invisibile finché l'attenzione non si muove.",
      body: [
        "Griffin non guida. Griffin indica un vettore.",
        "La traiettoria cambia la città più in fretta di una dichiarazione.",
      ],
      signal: "↗ → vettore",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "movimento · operating system",
      lead: "Il sistema ricorda. L'umano decide.",
      body: [
        "FIRA è il campo in cui l'osservazione diventa influenza.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → movimento",
    },
  },
  uk: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "затверджений сигнал",
      lead: "Сигнал, що пройшов крізь тертя і не розпався.",
      body: [
        "Diamente — момент, коли шум поступається патерну.",
        "Це не істина — це носій істини.",
      ],
      signal: "◇ → валідація",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "тертя · когнітивний дисонанс",
      lead: "Дві інтерпретації йдуть паралельно. Жодна не поступається.",
      body: [
        "Shafir — опір матерії надто простим нараціям.",
        "Тертя — не помилка. Тертя — інформація.",
      ],
      signal: "∥ → опір",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "адаптація",
      lead: "Місто відбиває сигнал назад до спостерігача.",
      body: [
        "Lustra не копіюють — перекладають.",
        "Адаптація — не капітуляція. Це нова траєкторія.",
      ],
      signal: "⌁ → відбиття",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "траєкторія",
      lead: "Напрямок, невидимий, доки не зрушила увага.",
      body: [
        "Griffin не веде. Griffin вказує вектор.",
        "Траєкторія змінює місто швидше за декларацію.",
      ],
      signal: "↗ → вектор",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "рух · operating system",
      lead: "Система пам'ятає. Людина вирішує.",
      body: [
        "FIRA — поле, де спостереження стає впливом.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → рух",
    },
  },
  bg: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "валидиран сигнал",
      lead: "Сигнал, преминал през триенето и не се разпаднал.",
      body: [
        "Diamente е моментът, когато шумът отстъпва пред модела.",
        "Не е истина — е носител на истината.",
      ],
      signal: "◇ → валидация",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "триене · когнитивен дисонанс",
      lead: "Две интерпретации вървят паралелно. Никоя не отстъпва.",
      body: [
        "Shafir е съпротивата на материята срещу прекалено простите нарации.",
        "Триенето не е грешка. Триенето е информация.",
      ],
      signal: "∥ → съпротива",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "адаптация",
      lead: "Градът отразява сигнала обратно към наблюдателя.",
      body: [
        "Lustra не копират — превеждат.",
        "Адаптацията не е капитулация. Това е нова траектория.",
      ],
      signal: "⌁ → отражение",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "траектория",
      lead: "Посока, невидима, докато вниманието не тръгне.",
      body: [
        "Griffin не води. Griffin указва вектор.",
        "Траекторията променя града по-бързо от декларация.",
      ],
      signal: "↗ → вектор",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "движение · operating system",
      lead: "Системата помни. Човекът решава.",
      body: [
        "FIRA е полето, в което наблюдението става влияние.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → движение",
    },
  },
  et: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "kinnitatud signaal",
      lead: "Signaal, mis läbis hõõrdumise ja ei varisenud.",
      body: [
        "Diamente on hetk, mil müra annab mustrile järele.",
        "See pole tõde — see on tõe kandja.",
      ],
      signal: "◇ → valideerimine",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "hõõrdumine · kognitiivne dissonants",
      lead: "Kaks tõlgendust kulgevad paralleelselt. Kumbki ei anna järele.",
      body: [
        "Shafir on aine vastupanu liiglihtsatele narratiividele.",
        "Hõõrdumine pole viga. Hõõrdumine on informatsioon.",
      ],
      signal: "∥ → vastupanu",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "kohanemine",
      lead: "Linn peegeldab signaali tagasi vaatleja poole.",
      body: [
        "Lustra ei kopeeri — tõlgivad.",
        "Kohanemine pole alistumine. See on uus trajektoor.",
      ],
      signal: "⌁ → peegeldus",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "trajektoor",
      lead: "Suund, mis oli nähtamatu, kuni tähelepanu liikus.",
      body: [
        "Griffin ei juhi. Griffin näitab vektorit.",
        "Trajektoor muudab linna kiiremini kui deklaratsioon.",
      ],
      signal: "↗ → vektor",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "liikumine · operating system",
      lead: "Süsteem mäletab. Inimene otsustab.",
      body: [
        "FIRA on väli, kus vaatlus muutub mõjuks.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → liikumine",
    },
  },
  fi: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "validoitu signaali",
      lead: "Signaali, joka kulki kitkan läpi eikä romahtanut.",
      body: [
        "Diamente on hetki, jolloin kohina väistyy kuviolle.",
        "Se ei ole totuus — se on totuuden kantaja.",
      ],
      signal: "◇ → validointi",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "kitka · kognitiivinen dissonanssi",
      lead: "Kaksi tulkintaa kulkee rinnakkain. Kumpikaan ei väisty.",
      body: [
        "Shafir on aineen vastustus liian yksinkertaisille narratiiveille.",
        "Kitka ei ole virhe. Kitka on informaatiota.",
      ],
      signal: "∥ → vastus",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adaptaatio",
      lead: "Kaupunki heijastaa signaalin takaisin havainnoijalle.",
      body: [
        "Lustra eivät kopioi — kääntävät.",
        "Adaptaatio ei ole antautuminen. Se on uusi trajektoria.",
      ],
      signal: "⌁ → heijastus",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "trajektoria",
      lead: "Suunta, joka oli näkymätön, kunnes huomio liikahti.",
      body: [
        "Griffin ei johda. Griffin osoittaa vektorin.",
        "Trajektoria muuttaa kaupunkia nopeammin kuin julistus.",
      ],
      signal: "↗ → vektori",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "liike · operating system",
      lead: "Järjestelmä muistaa. Ihminen päättää.",
      body: [
        "FIRA on kenttä, jossa havainto muuttuu vaikutukseksi.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → liike",
    },
  },
  lt: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "patvirtintas signalas",
      lead: "Signalas, praeinantis trintį ir nesusiliejęs.",
      body: [
        "Diamente — akimirka, kai triukšmas cedeia raštui.",
        "Tai ne tiesa — tai tiesos nešėjas.",
      ],
      signal: "◇ → validacija",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "trintis · kognityvinis disonansas",
      lead: "Dvi interpretacijos eina lygiagrečiai. Nė viena nenusileidžia.",
      body: [
        "Shafir — materijos pasipriešinimas per daug paprastoms naratyvoms.",
        "Trintis nėra klaida. Trintis yra informacija.",
      ],
      signal: "∥ → pasipriešinimas",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adaptacija",
      lead: "Miestas atspindi signalą atgal stebėtojui.",
      body: [
        "Lustra nekopijuoja — verčia.",
        "Adaptacija nėra kapituliacija. Tai nauja trajektorija.",
      ],
      signal: "⌁ → atspindys",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "trajektorija",
      lead: "Kryptis, nematoma, kol dėmesys nepajudėjo.",
      body: [
        "Griffin neveda. Griffin rodo vektorių.",
        "Trajektorija keičia miestą greičiau nei deklaracija.",
      ],
      signal: "↗ → vektorius",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "judėjimas · operating system",
      lead: "Sistema atsimena. Žmogus sprendžia.",
      body: [
        "FIRA — laukas, kur stebėjimas tampa įtaka.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → judėjimas",
    },
  },
  lv: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "validēts signāls",
      lead: "Signāls, kas izgājis cauri berzei un nav sabrukis.",
      body: [
        "Diamente — brīdis, kad troksnis atkāpjas rakstam.",
        "Tā nav patiesība — tā ir patiesības nesējs.",
      ],
      signal: "◇ → validācija",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "berze · kognitīvais disonans",
      lead: "Divas interpretācijas iet paralēli. Neviena nepakļaujas.",
      body: [
        "Shafir — materijas pretestība pārāk vienkāršām naratīvām.",
        "Berze nav kļūda. Berze ir informācija.",
      ],
      signal: "∥ → pretestība",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adaptācija",
      lead: "Pilsēta atspoguļo signālu atpakaļ novērotājam.",
      body: [
        "Lustra nekopē — tulkojas.",
        "Adaptācija nav kapitulācija. Tā ir jauna trajektorija.",
      ],
      signal: "⌁ → atspīdums",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "trajektorija",
      lead: "Virziens, neredzams, kamēr uzmanība nepakustējās.",
      body: [
        "Griffin neved. Griffin norāda vektoru.",
        "Trajektorija maina pilsētu ātrāk nekā deklarācija.",
      ],
      signal: "↗ → vektors",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "kustība · operating system",
      lead: "Sistēma atceras. Cilvēks lemj.",
      body: [
        "FIRA — lauks, kur novērojums kļūst par ietekmi.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → kustība",
    },
  },
  hu: {
    diamente: {
      symbol: "◇",
      name: "Diamente",
      role: "validált jelzés",
      lead: "Jelzés, amely átment a súrlódáson és nem omlott össze.",
      body: [
        "Diamente: a pillanat, amikor a zaj enged a mintának.",
        "Nem igazság — az igazság hordozója.",
      ],
      signal: "◇ → validáció",
    },
    shafir: {
      symbol: "∥",
      name: "Shafir",
      role: "súrlódás · kognitív disszonancia",
      lead: "Két értelmezés párhuzamosan fut. Egyik sem enged.",
      body: [
        "Shafir: az anyag ellenállása a túl egyszerű narratíváknak.",
        "A súrlódás nem hiba. A súrlódás információ.",
      ],
      signal: "∥ → ellenállás",
    },
    lustra: {
      symbol: "⌁",
      name: "Lustra",
      role: "adaptáció",
      lead: "A város visszatükrözi a jelzést a megfigyelő felé.",
      body: [
        "Lustra nem másol — fordít.",
        "Az adaptáció nem megadás. Új pálya.",
      ],
      signal: "⌁ → tükrözés",
    },
    griffin: {
      symbol: "↗",
      name: "Griffin",
      role: "pálya",
      lead: "Irány, amely láthatatlan volt, amíg a figyelem el nem indult.",
      body: [
        "Griffin nem vezet. Griffin vektort jelez.",
        "A pálya gyorsabban változtatja a várost, mint a nyilatkozat.",
      ],
      signal: "↗ → vektor",
    },
    fira: {
      symbol: "●",
      name: "FIRA",
      role: "mozgás · operating system",
      lead: "A rendszer emlékezik. Az ember dönt.",
      body: [
        "FIRA: a mező, ahol a megfigyelés befolyássá válik.",
        "PLACE → SIGNAL → FLOW → TRAJECTORY.",
      ],
      signal: "● → mozgás",
    },
  },
};

export const TRAJECTORY_KEY = "warszawasza-trajectory";
