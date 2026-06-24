export type Lang = "pl" | "en" | "it";

export type Dichotomy = {
  trueLabel: string;
  falseLabel: string;
  trueText: string;
  falseText: string;
};

export type SymbolEntry = {
  glyph: string;
  name: string;
  meaning: string;
};

const sharedSymbols: SymbolEntry[] = [
  { glyph: "FIRA", name: "FIRA", meaning: "philosophy" },
  { glyph: "LUCY", name: "LUCY", meaning: "point of attention" },
  { glyph: "⚡", name: "signal", meaning: "change / pulse" },
  { glyph: "`", name: "citrus cursor", meaning: "attention trail" },
  { glyph: "⌖", name: "orientation", meaning: "where to look" },
  { glyph: "◇", name: "signal crystal", meaning: "polished signal / artifact" },
];

export const copy = {
  pl: {
    masthead: "WARSZAWASZA // FIRA // LUCY",
    hud: "Ray-Ban HUD // Midnight Warsaw",
    coreLines: [
      "Miasto jest żywe.",
      "Dane są ulicą.",
      "Styl jest sygnałem.",
    ],
    manifesto: "Warszawa nie jest produktem. Warszawa jest stanem.",
    manifestoSub:
      "Wchodzisz w żywy system miejski — archiwum tożsamości, nie sklep.",
    firaLabel: "FIRA",
    firaRole: "filozofia",
    firaText:
      "Nie projektujemy inwigilacji. Projektujemy uwagę. Nie pokazujemy monitoringu. Pokazujemy orientację.",
    lucyLabel: "LUCY",
    lucyRole: "punkt uwagi",
    lucyText:
      "Tam, gdzie spojrzenie się zatrzymuje — zanim miasto zdąży wyjaśnić siebie do końca.",
    designNote:
      "Nie wyjaśniaj wszystkiego. Zostaw przestrzeń na interpretację.",
    citrusMotif: {
      sectionTag: "MOTIF",
      motifLabel: "cytrusowy_kursar.v1",
      asciiPrimary: "⚡ ~~~~ ◇",
      asciiAlt: "alternatywa: ⚡ ~~~~ ●",
      flow: "zmiana → ślad → sygnał",
      notLine: "Cytrusowy Kursar nie jest wskaźnikiem.",
      isLine:
        "To widoczny ślad uwagi poruszającej się przez sygnał i szum.",
      validationTitle: "TRUE / FALSE",
      validationTrue: "TRUE — sygnał. Miasto mówi przez fragmenty.",
      validationFalse: "FALSE — szum. To nie sklep. To nie monitoring.",
      hudLabel: "Ray-Ban HUD // walidacja pola",
      lexicon: [
        {
          glyph: "⚡",
          name: "błyskawica",
          meaning: "impuls, zmiana, anomalia, moment uwagi",
        },
        {
          glyph: "`~~~~`",
          name: "ogon kursora",
          meaning: "ślad, pamięć ruchu, ścieżka uwagi",
        },
        {
          glyph: "◇",
          name: "kryształ sygnału",
          meaning: "wypolerowany sygnał, artefakt, wzorzec",
        },
        {
          glyph: "T/F",
          name: "walidacja",
          meaning: "TRUE = sygnał · FALSE = szum",
        },
      ],
    },
    trueFalseTitle: "TRUE / FALSE",
    trueFalseSub: "terminal poetry // urban fragments",
    dichotomies: [
      {
        trueLabel: "TRAIL",
        falseLabel: "POINTER",
        trueText: "Cytrusowy Kursar — ślad uwagi w polu sygnału.",
        falseText: "Nie kursor. Nie klik. Nie interfejs sklepu.",
      },
      {
        trueLabel: "TRUE",
        falseLabel: "FALSE",
        trueText: "Sygnał — miasto mówi przez fragmenty.",
        falseText: "Szum — strona nie jest sklepem.",
      },
      {
        trueLabel: "ATTENTION",
        falseLabel: "DISTRACTION",
        trueText: "Orientacja — widzisz kierunek pola.",
        falseText: "Monitoring — nie tu, nie teraz.",
      },
      {
        trueLabel: "SIGNAL",
        falseLabel: "NOISE",
        trueText: "Uliza po deszczu. Neon. Oddech.",
        falseText: "Corporate SaaS. Tęcza. Wyjaśnienia.",
      },
    ] as Dichotomy[],
    symbols: sharedSymbols.map((s) => ({
      ...s,
      meaning:
        s.name === "FIRA"
          ? "filozofia"
          : s.name === "LUCY"
            ? "punkt uwagi"
            : s.name === "signal"
              ? "zmiana / impuls"
              : s.name === "citrus cursor"
                ? "ślad uwagi — nie wskaźnik"
                : s.name === "signal crystal"
                  ? "kryształ sygnału / artefakt"
                  : "orientacja",
    })),
    fieldLabel: "FIELD PHASE",
    fieldPhase: "RECOVERY",
    fieldWatchTitle: "FIELD WATCH",
    fieldWatchSub: "operational output — odczyt pola, nie koszyk",
    reveal: "Inicjuj odczyt pola",
    revealing: "⌖ skanowanie…",
    dropsEmpty: "Pole ciche. Sygnał czeka na uwagę.",
    footer: "Moja. Twoja. Wasza. Warszawa.",
    mobileDomain: "www.warszawasza.online",
    enterFeeling: "Wchodzę w żywy system miejski.",
  },
  en: {
    masthead: "WARSZAWASZA // FIRA // LUCY",
    hud: "Ray-Ban HUD // Midnight Warsaw",
    coreLines: [
      "The city is alive.",
      "Data is a street.",
      "Style is a signal.",
    ],
    manifesto: "Warsaw is not a product. Warsaw is a state.",
    manifestoSub:
      "You enter a living urban system — a cultural archive, not a store.",
    firaLabel: "FIRA",
    firaRole: "philosophy",
    firaText:
      "Do not design for surveillance. Design for attention. Do not show monitoring. Show orientation.",
    lucyLabel: "LUCY",
    lucyRole: "point of attention",
    lucyText:
      "Where the gaze stops — before the city explains itself completely.",
    designNote: "Do not explain everything. Leave space for interpretation.",
    citrusMotif: {
      sectionTag: "MOTIF",
      motifLabel: "citrus_cursor.v1",
      asciiPrimary: "⚡ ~~~~ ◇",
      asciiAlt: "alt: ⚡ ~~~~ ●",
      flow: "change → trace → signal",
      notLine: "The Citrus Cursor is not a pointer.",
      isLine:
        "It is the visible trail left by attention moving through signal and noise.",
      validationTitle: "TRUE / FALSE",
      validationTrue: "TRUE — signal. The city speaks in fragments.",
      validationFalse: "FALSE — noise. Not a shop. Not surveillance.",
      hudLabel: "Ray-Ban HUD // field validation",
      lexicon: [
        {
          glyph: "⚡",
          name: "lightning",
          meaning: "impulse, change, anomaly, moment of attention",
        },
        {
          glyph: "`~~~~`",
          name: "cursor tail",
          meaning: "trace, memory of movement, path of attention",
        },
        {
          glyph: "◇",
          name: "signal crystal",
          meaning: "polished signal, artifact, validated pattern",
        },
        {
          glyph: "T/F",
          name: "validation",
          meaning: "TRUE = signal · FALSE = noise",
        },
      ],
    },
    trueFalseTitle: "TRUE / FALSE",
    trueFalseSub: "terminal poetry // urban fragments",
    dichotomies: [
      {
        trueLabel: "TRAIL",
        falseLabel: "POINTER",
        trueText: "The Citrus Cursor — a trace of attention in the field.",
        falseText: "Not a cursor. Not a click. Not a shop interface.",
      },
      {
        trueLabel: "TRUE",
        falseLabel: "FALSE",
        trueText: "Signal — the city speaks in fragments.",
        falseText: "Noise — this is not a shop.",
      },
      {
        trueLabel: "ATTENTION",
        falseLabel: "DISTRACTION",
        trueText: "Orientation — you read the field.",
        falseText: "Monitoring — not here.",
      },
      {
        trueLabel: "SIGNAL",
        falseLabel: "NOISE",
        trueText: "Streetlights after rain. Terminal glow.",
        falseText: "Startup gradients. Rainbow UI.",
      },
    ] as Dichotomy[],
    symbols: sharedSymbols.map((s) => ({
      ...s,
      meaning:
        s.name === "FIRA"
          ? "philosophy"
          : s.name === "LUCY"
            ? "point of attention"
            : s.name === "signal"
              ? "change / impulse"
              : s.name === "citrus cursor"
                ? "attention trail — not a pointer"
                : s.name === "signal crystal"
                  ? "polished signal / artifact"
                  : "orientation",
    })),
    fieldLabel: "FIELD PHASE",
    fieldPhase: "RECOVERY",
    fieldWatchTitle: "FIELD WATCH",
    fieldWatchSub: "operational output — field read, not cart",
    reveal: "Initiate field read",
    revealing: "⌖ scanning…",
    dropsEmpty: "Field silent. Signal awaits attention.",
    footer: "Mine. Yours. Ours. Warsaw.",
    mobileDomain: "www.warszawasza.online",
    enterFeeling: "I am entering a living urban system.",
  },
  it: {
    masthead: "WARSZAWASZA // FIRA // LUCY",
    hud: "Ray-Ban HUD // Varsavia notturna",
    coreLines: [
      "La città è viva.",
      "I dati sono una strada.",
      "Lo stile è un segnale.",
    ],
    manifesto: "Varsavia non è un prodotto. Varsavia è uno stato.",
    manifestoSub:
      "Entri in un sistema urbano vivo — archivio culturale, non vetrina.",
    firaLabel: "FIRA",
    firaRole: "filosofia",
    firaText:
      "Non progettare la sorveglianza. Progetta l'attenzione. Non mostrare il monitoraggio. Mostra l'orientamento.",
    lucyLabel: "LUCY",
    lucyRole: "punto di attenzione",
    lucyText:
      "Dove lo sguardo si ferma — prima che la città finisca di spiegarsi.",
    designNote:
      "Non spiegare tutto. Lascia spazio all'interpretazione — come in una pagina di rivista.",
    citrusMotif: {
      sectionTag: "MOTIF",
      motifLabel: "cursore_agrumato.v1",
      asciiPrimary: "⚡ ~~~~ ◇",
      asciiAlt: "alternativa: ⚡ ~~~~ ●",
      flow: "cambiamento → scia → segnale",
      notLine: "Il Cursore Agrumato non è un puntatore.",
      isLine:
        "È la scia visibile lasciata dall'attenzione che attraversa segnale e rumore.",
      validationTitle: "TRUE / FALSE",
      validationTrue: "TRUE — segnale. La città parla a frammenti.",
      validationFalse: "FALSE — rumore. Non è un negozio. Non sorveglianza.",
      hudLabel: "Ray-Ban HUD // validazione del campo",
      lexicon: [
        {
          glyph: "⚡",
          name: "fulmine",
          meaning: "impulso, cambiamento, anomalia, momento di attenzione",
        },
        {
          glyph: "`~~~~`",
          name: "coda del cursore",
          meaning: "traccia, memoria del movimento, percorso dell'attenzione",
        },
        {
          glyph: "◇",
          name: "cristallo del segnale",
          meaning: "segnale levigato, artefatto, pattern validato",
        },
        {
          glyph: "T/F",
          name: "validazione",
          meaning: "TRUE = segnale · FALSE = rumore",
        },
      ],
    },
    trueFalseTitle: "TRUE / FALSE",
    trueFalseSub: "poesia terminale // frammenti urbani",
    dichotomies: [
      {
        trueLabel: "TRAIL",
        falseLabel: "POINTER",
        trueText: "Cursore Agrumato — scia dell'attenzione nel campo.",
        falseText: "Non un cursore. Non un click. Non una vetrina.",
      },
      {
        trueLabel: "TRUE",
        falseLabel: "FALSE",
        trueText: "Segnale — la città parla a frammenti.",
        falseText: "Rumore — non è un negozio.",
      },
      {
        trueLabel: "ATTENTION",
        falseLabel: "DISTRACTION",
        trueText: "Orientamento — leggi il campo.",
        falseText: "Sorveglianza — non qui.",
      },
      {
        trueLabel: "SIGNAL",
        falseLabel: "NOISE",
        trueText: "Luci dopo la pioggia. Schermo terminale.",
        falseText: "Gradienti da startup. UI da brochure.",
      },
    ] as Dichotomy[],
    symbols: sharedSymbols.map((s) => ({
      ...s,
      meaning:
        s.name === "FIRA"
          ? "filosofia"
          : s.name === "LUCY"
            ? "punto di attenzione"
            : s.name === "signal"
              ? "cambiamento"
              : s.name === "citrus cursor"
                ? "scia dell'attenzione — non puntatore"
                : s.name === "signal crystal"
                  ? "cristallo del segnale / artefatto"
                  : "orientamento",
    })),
    fieldLabel: "FIELD PHASE",
    fieldPhase: "RECOVERY",
    fieldWatchTitle: "FIELD WATCH",
    fieldWatchSub: "output operativo — lettura del campo, non carrello",
    reveal: "Avvia lettura del campo",
    revealing: "⌖ scansione…",
    dropsEmpty: "Campo silenzioso. Il segnale attende attenzione.",
    footer: "Mia. Tua. Nostra. Varsavia.",
    mobileDomain: "www.warszawasza.online",
    enterFeeling: "Entro in un sistema urbano vivo.",
  },
} as const;

export type Copy = (typeof copy)[Lang];
