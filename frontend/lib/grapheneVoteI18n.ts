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
