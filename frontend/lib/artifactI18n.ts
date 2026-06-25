import type { Lang } from "./i18n";
import type { ArtifactSlug } from "./artifacts";

export type TrajectoryChoice = "false" | "true";

type EntryCopy = {
  observationMark: string;
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
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "FALSE — zatrzymuję się; nic dalej nie wynika",
    trueHint: "TRUE — wynika kierunek: idę od sygnału do struktury",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Nie wybrałeś odpowiedzi.",
    revealLine2: "Wybrałeś kierunek.",
    enterField: "wejdź w pole →",
  },
  en: {
    observationMark: "● OBSERVATION IN PROGRESS",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "FALSE — I stop; nothing further follows",
    trueHint: "TRUE — a direction follows: signal toward structure",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "You did not choose an answer.",
    revealLine2: "You chose a direction.",
    enterField: "enter the field →",
  },
  it: {
    observationMark: "● OSSERVAZIONE IN CORSO",
    falseLabel: "FALSE",
    trueLabel: "TRUE",
    falseHint: "FALSE — mi fermo; non consegue nulla",
    trueHint: "TRUE — ne consegue una direzione: segnale verso struttura",
    revealSpark: "⚡",
    revealWave: "~~~~",
    revealLine1: "Non hai scelto una risposta.",
    revealLine2: "Hai scelto una direzione.",
    enterField: "entra nel campo →",
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
};

export const TRAJECTORY_KEY = "warszawasza-trajectory";
