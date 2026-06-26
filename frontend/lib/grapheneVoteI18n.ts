import type { Lang } from "./i18n";
import type { VoteOptionId } from "./grapheneVote";

export type GrapheneVoteCopy = {
  back: string;
  subtitle: string;
  title: string;
  disclaimer: string;
  propositionLabel: string;
  proposition: string;
  readAction: string;
  voteLabel: string;
  tallyLabel: string;
  tallyEmpty: string;
  tallyRow: string;
  hypothesisLabel: string;
  fingerprintLabel: string;
  notationLabel: string;
  copyAction: string;
  copied: string;
  copyFailed: string;
  leaveTrace: string;
  registry: string;
  options: Record<
    VoteOptionId,
    { label: string; consequence: string; glyph: string }
  >;
  footerLines: string[];
};

export const GRAPHENE_VOTE_COPY: Record<Lang, GrapheneVoteCopy> = {
  pl: {
    back: "← pole",
    subtitle: "DELIBERACJA · NIE GŁOSOWANIE URZĘDOWE",
    title: "Graphene deliberation",
    disclaimer:
      "Instrument słuchania i deliberacji. Żadnej władzy wyborczej. Każdy głos = obserwacja zapisana w notacji FOP.",
    propositionLabel: "PROPOZYCJA",
    proposition:
      "Czy sygnały tarcia sąsiedzkiego powinny wejść do pola deliberacji przed walidacją w pipeline?",
    readAction: "CZYTAJ KONSEKWENCJE →",
    voteLabel: "TWÓJ SYGNAŁ",
    tallyLabel: "LIVE TALLY (lokalny rejestr)",
    tallyEmpty: "brak głosów w rejestrze",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HIPOTEZA",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "NOTACJA FOP",
    copyAction: "KOPIUJ NOTACJĘ",
    copied: "skopiowano",
    copyFailed: "kopiowanie niedostępne",
    leaveTrace: "ZOSTAW ŚLAD →",
    registry: "rejestr: {n} obserwacji",
    options: {
      open: {
        glyph: "◇",
        label: "OTWARTY SYGNAŁ",
        consequence:
          "Sygnał widoczny w tally natychmiast. Brak wiążącej decyzji — tylko waga hipotezy publicznej.",
      },
      validate: {
        glyph: "◉",
        label: "NAJPIERW WALIDACJA",
        consequence:
          "Sygnał czeka na etap filtracji pipeline. Wolniejszy tally, wyższy próg dowodu.",
      },
      abstain: {
        glyph: "○",
        label: "OBSERWUJ BEZ POZYCJI",
        consequence:
          "Obecność w deliberacji bez wagi opcji. Liczone jako abstencja obserwacyjna.",
      },
    },
    footerLines: [
      "WARSZAWASZA // DELIBERACJA GRAFENOWA",
      "Nie jest to głosowanie wyborcze ani platforma urzędowa.",
    ],
  },
  en: {
    back: "← field",
    subtitle: "DELIBERATION · NOT OFFICIAL ELECTION",
    title: "Graphene deliberation",
    disclaimer:
      "Listening and deliberation instrument. No electoral authority. Each vote = observation in FOP notation.",
    propositionLabel: "PROPOSITION",
    proposition:
      "Should neighborhood friction signals enter the deliberation field before pipeline validation?",
    readAction: "READ CONSEQUENCES →",
    voteLabel: "YOUR SIGNAL",
    tallyLabel: "LIVE TALLY (local registry)",
    tallyEmpty: "no votes in registry",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HYPOTHESIS",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "FOP NOTATION",
    copyAction: "COPY NOTATION",
    copied: "copied",
    copyFailed: "copy unavailable",
    leaveTrace: "LEAVE TRACE →",
    registry: "registry: {n} observations",
    options: {
      open: {
        glyph: "◇",
        label: "OPEN SIGNAL",
        consequence:
          "Signal visible in tally immediately. No binding decision — public hypothesis weight only.",
      },
      validate: {
        glyph: "◉",
        label: "VALIDATE FIRST",
        consequence:
          "Signal waits for pipeline filtration stage. Slower tally, higher evidence threshold.",
      },
      abstain: {
        glyph: "○",
        label: "OBSERVE WITHOUT POSITION",
        consequence:
          "Presence in deliberation without option weight. Counted as observational abstention.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "This is not an election ballot or municipal platform.",
    ],
  },
  it: {
    back: "← campo",
    subtitle: "DELIBERAZIONE · NON ELEZIONE UFFICIALE",
    title: "Deliberazione graphene",
    disclaimer:
      "Strumento di ascolto e deliberazione. Nessuna autorità elettorale. Ogni voto = osservazione in notazione FOP.",
    propositionLabel: "PROPOSIZIONE",
    proposition:
      "I segnali di attrito di quartiere dovrebbero entrare nel campo di deliberazione prima della validazione nel pipeline?",
    readAction: "LEGGI LE CONSEGUENZE →",
    voteLabel: "IL TUO SEGNALE",
    tallyLabel: "TALLY LIVE (registro locale)",
    tallyEmpty: "nessun voto nel registro",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "IPOTESI",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "NOTAZIONE FOP",
    copyAction: "COPIA NOTAZIONE",
    copied: "copiato",
    copyFailed: "copia non disponibile",
    leaveTrace: "LASCIA TRACCIA →",
    registry: "registro: {n} osservazioni",
    options: {
      open: {
        glyph: "◇",
        label: "SEGNALE APERTO",
        consequence:
          "Segnale visibile nel tally subito. Nessuna decisione vincolante — solo peso ipotetico pubblico.",
      },
      validate: {
        glyph: "◉",
        label: "PRIMA VALIDAZIONE",
        consequence:
          "Segnale attende la filtrazione del pipeline. Tally più lento, soglia di evidenza più alta.",
      },
      abstain: {
        glyph: "○",
        label: "OSSERVA SENZA POSIZIONE",
        consequence:
          "Presenza nella deliberazione senza peso di opzione. Contata come astensione osservativa.",
      },
    },
    footerLines: [
      "WARSZAWASZA // DELIBERAZIONE GRAPHENE",
      "Non è una scheda elettorale né una piattaforma comunale.",
    ],
  },
  uk: {
    back: "← поле",
    subtitle: "ДЕЛІБЕРАЦІЯ · НЕ ОФІЦІЙНІ ВИБОРИ",
    title: "Graphene deliberation",
    disclaimer:
      "Інструмент слухання й деліберації. Без виборчої влади. Кожен голос = спостереження в нотації FOP.",
    propositionLabel: "ПРОПОЗИЦІЯ",
    proposition:
      "Чи повинні сигнали сусідського тертя входити в поле деліберації до валідації в pipeline?",
    readAction: "ЧИТАТИ НАСЛІДКИ →",
    voteLabel: "ВАШ СИГНАЛ",
    tallyLabel: "LIVE TALLY (локальний реєстр)",
    tallyEmpty: "немає голосів у реєстрі",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "ГІПОТЕЗА",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "НОТАЦІЯ FOP",
    copyAction: "КОПІЮВАТИ НОТАЦІЮ",
    copied: "скопійовано",
    copyFailed: "копіювання недоступне",
    leaveTrace: "ЗАЛИШИТИ СЛІД →",
    registry: "реєстр: {n} спостережень",
    options: {
      open: {
        glyph: "◇",
        label: "ВІДКРИТИЙ СИГНАЛ",
        consequence:
          "Сигнал одразу видимий у tally. Без обов'язкового рішення — лише вага публічної гіпотези.",
      },
      validate: {
        glyph: "◉",
        label: "СПОЧАТКУ ВАЛІДАЦІЯ",
        consequence:
          "Сигнал чекає етапу фільтрації pipeline. Повільніший tally, вищий поріг доказу.",
      },
      abstain: {
        glyph: "○",
        label: "СПОСТЕРІГАТИ БЕЗ ПОЗИЦІЇ",
        consequence:
          "Присутність у деліберації без ваги опції. Рахується як спостережна абстенція.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "Це не виборчий бюлетень і не муніципальна платформа.",
    ],
  },
  bg: {
    back: "← поле",
    subtitle: "ДЕЛИБЕРАЦИЯ · НЕ ОФИЦИАЛНИ ИЗБОРИ",
    title: "Graphene deliberation",
    disclaimer:
      "Инструмент за слушане и делиберация. Без изборна власт. Всеки глас = наблюдение в нотация FOP.",
    propositionLabel: "ПРЕДЛОЖЕНИЕ",
    proposition:
      "Трябва ли сигналите на съседско триене да влязат в полето на делиберация преди валидация в pipeline?",
    readAction: "ПРОЧЕТИ ПОСЛЕДИЦИТЕ →",
    voteLabel: "ТВОЯТ СИГНАЛ",
    tallyLabel: "LIVE TALLY (локален регистър)",
    tallyEmpty: "няма гласове в регистъра",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "ХИПОТЕЗА",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "НОТАЦИЯ FOP",
    copyAction: "КОПИРАЙ НОТАЦИЯТА",
    copied: "копирано",
    copyFailed: "копирането е недостъпно",
    leaveTrace: "ОСТАВИ СЛЕД →",
    registry: "регистър: {n} наблюдения",
    options: {
      open: {
        glyph: "◇",
        label: "ОТВОРЕН СИГНАЛ",
        consequence:
          "Сигналът е видим в tally веднага. Без обвързващо решение — само тегло на публична хипотеза.",
      },
      validate: {
        glyph: "◉",
        label: "ПЪРВО ВАЛИДАЦИЯ",
        consequence:
          "Сигналът чака етапа на филтрация в pipeline. По-бавен tally, по-висок праг на доказателство.",
      },
      abstain: {
        glyph: "○",
        label: "НАБЛЮДАВАЙ БЕЗ ПОЗИЦИЯ",
        consequence:
          "Присъствие в делиберация без тегло на опция. Брои се като наблюдателна абстенция.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "Това не е изборен бюлетин и не общинска платформа.",
    ],
  },
  et: {
    back: "← väli",
    subtitle: "DELIBERATSIOON · MITTE AMETLIK VALIMINE",
    title: "Graphene deliberation",
    disclaimer:
      "Kuulamise ja deliberatsiooni instrument. Valimisvolitusi pole. Iga hääl = vaatlus FOP notatsioonis.",
    propositionLabel: "ETTEPANEK",
    proposition:
      "Kas naabruskonna hõõrdumissignaalid peaksid siseneda deliberatsiooniväljale enne pipeline valideerimist?",
    readAction: "LOE TAGAJÄRGED →",
    voteLabel: "SINU SIGNAAL",
    tallyLabel: "LIVE TALLY (kohalik register)",
    tallyEmpty: "registris hääli pole",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HÜPOTEES",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "FOP NOTATSIOON",
    copyAction: "KOPEERI NOTATSIOON",
    copied: "kopeeritud",
    copyFailed: "kopeerimine pole saadaval",
    leaveTrace: "JÄTA JÄLG →",
    registry: "register: {n} vaatlust",
    options: {
      open: {
        glyph: "◇",
        label: "AVATUD SIGNAAL",
        consequence:
          "Signaal kohe tallys nähtav. Siduvat otsust pole — ainult avaliku hüpoteesi kaal.",
      },
      validate: {
        glyph: "◉",
        label: "ESMALT VALIDEERIMINE",
        consequence:
          "Signaal ootab pipeline filtreerimisetappi. Aeglasem tally, kõrgem tõenduslävi.",
      },
      abstain: {
        glyph: "○",
        label: "VAATLE ILMA POSITSIOONITA",
        consequence:
          "Kohalolu deliberatsioonis ilma valiku kaaluta. Loetakse vaatluslikuks erapooletuseks.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "See pole valimissedel ega omavalitsuse platvorm.",
    ],
  },
  fi: {
    back: "← kenttä",
    subtitle: "DELIBERAATIO · EI VIRALLINEN VAALI",
    title: "Graphene deliberation",
    disclaimer:
      "Kuuntelun ja deliberaation instrumentti. Ei vaalivaltaa. Jokainen ääni = havainto FOP-notaatiossa.",
    propositionLabel: "EHDOTUS",
    proposition:
      "Pitäisikö naapuruston kitkasignaalien päästä deliberaatiokentälle ennen pipeline-validointia?",
    readAction: "LUE SEURAUKSET →",
    voteLabel: "SIGNALISI",
    tallyLabel: "LIVE TALLY (paikallinen rekisteri)",
    tallyEmpty: "ei ääniä rekisterissä",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HYPOTEESI",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "FOP-NOTAATIO",
    copyAction: "KOPIOI NOTAATIO",
    copied: "kopioitu",
    copyFailed: "kopiointi ei käytettävissä",
    leaveTrace: "JÄTÄ JÄLKI →",
    registry: "rekisteri: {n} havaintoa",
    options: {
      open: {
        glyph: "◇",
        label: "AVOIN SIGNAALI",
        consequence:
          "Signaali näkyy tallyssa heti. Ei sitovaa päätöstä — vain julkisen hypoteesin paino.",
      },
      validate: {
        glyph: "◉",
        label: "ENSIN VALIDOINTI",
        consequence:
          "Signaali odottaa pipeline-suodatusvaihetta. Hitaampi tally, korkeampi todistekynnys.",
      },
      abstain: {
        glyph: "○",
        label: "HAVAINNOI ILMAN KANTAA",
        consequence:
          "Läsnäolo deliberaatiossa ilman vaihtoehdon painoa. Lasketaan havainnolliseksi pidättymiseksi.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "Tämä ei ole vaalilippu eikä kunnallinen alusta.",
    ],
  },
  lt: {
    back: "← laukas",
    subtitle: "DELIBERACIJA · NE OFICIALŪS RINKIMAI",
    title: "Graphene deliberation",
    disclaimer:
      "Klausymo ir deliberacijos instrumentas. Be rinkimų valdžios. Kiekvienas balsas = stebėjimas FOP notacija.",
    propositionLabel: "PASIŪLYMAS",
    proposition:
      "Ar kaimynystės trinties signalai turėtų patekti į deliberacijos lauką prieš pipeline validaciją?",
    readAction: "SKAITYTI PASEKMES →",
    voteLabel: "TAVO SIGNALAS",
    tallyLabel: "LIVE TALLY (vietinis registras)",
    tallyEmpty: "registre nėra balsų",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HIPOTEZĖ",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "FOP NOTACIJA",
    copyAction: "KOPIJUOTI NOTACIJĄ",
    copied: "nukopijuota",
    copyFailed: "kopijavimas nepasiekiamas",
    leaveTrace: "PALIKTI PĖDSAKĄ →",
    registry: "registras: {n} stebėjimų",
    options: {
      open: {
        glyph: "◇",
        label: "ATVIRAS SIGNALAS",
        consequence:
          "Signalas iškart matomas tally. Jokio privalomo sprendimo — tik viešos hipotezės svoris.",
      },
      validate: {
        glyph: "◉",
        label: "PIRMIAU VALIDACIJA",
        consequence:
          "Signalas laukia pipeline filtravimo etapo. Lėtesnis tally, aukštesnis įrodymų slenkstis.",
      },
      abstain: {
        glyph: "○",
        label: "STEBĖK BE POZICIJOS",
        consequence:
          "Buvimas deliberacijoje be opcijos svorio. Skaičiuojama kaip stebėjimo susilaikymas.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "Tai ne rinkimų biuletenis ir ne savivaldybės platforma.",
    ],
  },
  lv: {
    back: "← lauks",
    subtitle: "DELIBERĀCIJA · NE OFICIĀLAS VĒLĒŠANAS",
    title: "Graphene deliberation",
    disclaimer:
      "Klausīšanās un deliberācijas instruments. Bez vēlēšanu varas. Katrs balss = novērojums FOP notācijā.",
    propositionLabel: "PRIEKŠLIKUMS",
    proposition:
      "Vai kaimiņu berzes signāliem jānonāk deliberācijas laukā pirms pipeline validācijas?",
    readAction: "LASĪT SEKAS →",
    voteLabel: "TAVS SIGNĀLS",
    tallyLabel: "LIVE TALLY (vietējais reģistrs)",
    tallyEmpty: "reģistrā nav balsu",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HIPOTĒZE",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "FOP NOTĀCIJA",
    copyAction: "KOPĒT NOTĀCIJU",
    copied: "nokopēts",
    copyFailed: "kopēšana nav pieejama",
    leaveTrace: "ATSTĀT PĒDU →",
    registry: "reģistrs: {n} novērojumi",
    options: {
      open: {
        glyph: "◇",
        label: "ATVĒRTS SIGNĀLS",
        consequence:
          "Signāls uzreiz redzams tally. Nav saistoša lēmuma — tikai publiskas hipotēzes svars.",
      },
      validate: {
        glyph: "◉",
        label: "VISPIRMS VALIDĀCIJA",
        consequence:
          "Signāls gaida pipeline filtrācijas posmu. Lēnāks tally, augstāks pierādījumu slieksnis.",
      },
      abstain: {
        glyph: "○",
        label: "NOVĒRO BEZ POZĪCIJAS",
        consequence:
          "Klātbūtne deliberācijā bez opcijas svara. Skaitās kā novērojoša atturēšanās.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "Tas nav vēlēšanu zīmējums un nav pašvaldības platforma.",
    ],
  },
  hu: {
    back: "← mező",
    subtitle: "DELIBERÁCIÓ · NEM HIVATALOS VÁLASZTÁS",
    title: "Graphene deliberation",
    disclaimer:
      "Hallgatás és deliberáció eszköz. Nincs választási hatalom. Minden szavazat = megfigyelés FOP jelölésben.",
    propositionLabel: "JAVASLAT",
    proposition:
      "A szomszédsági súrlódási jelek a pipeline validációja előtt lépjenek be a deliberációs mezőbe?",
    readAction: "KÖVETKEZMÉNYEK →",
    voteLabel: "A TE JELED",
    tallyLabel: "LIVE TALLY (helyi nyilvántartás)",
    tallyEmpty: "nincs szavazat a nyilvántartásban",
    tallyRow: "{label}: {n} ({pct}%)",
    hypothesisLabel: "HIPOTÉZIS",
    fingerprintLabel: "FINGERPRINT",
    notationLabel: "FOP JELÖLÉS",
    copyAction: "JELÖLÉS MÁSOLÁSA",
    copied: "másolva",
    copyFailed: "másolás nem elérhető",
    leaveTrace: "NYOM HAGYÁSA →",
    registry: "nyilvántartás: {n} megfigyelés",
    options: {
      open: {
        glyph: "◇",
        label: "NYÍLT JEL",
        consequence:
          "A jel azonnal látható a tally-ban. Nincs kötelező döntés — csak nyilvános hipotézis súly.",
      },
      validate: {
        glyph: "◉",
        label: "ELŐSZÖR VALIDÁCIÓ",
        consequence:
          "A jel vár a pipeline szűrésére. Lassabb tally, magasabb bizonyítési küszöb.",
      },
      abstain: {
        glyph: "○",
        label: "MEGFIGYELÉS POZÍCIÓ NÉLKÜL",
        consequence:
          "Jelenlét a deliberációban opciós súly nélkül. Megfigyelői tartózkodásként számít.",
      },
    },
    footerLines: [
      "WARSZAWASZA // GRAPHENE DELIBERATION",
      "Ez nem választási szavazólap és nem önkormányzati platform.",
    ],
  },
};

export const VOTE_OPTION_ORDER: VoteOptionId[] = ["open", "validate", "abstain"];
