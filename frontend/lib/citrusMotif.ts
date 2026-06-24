export type MotifLexiconEntry = {
  glyph: string;
  name: string;
  meaning: string;
};

export type CitrusMotifCopy = {
  sectionTag: string;
  motifLabel: string;
  asciiPrimary: string;
  asciiAlt: string;
  flow: string;
  notLine: string;
  isLine: string;
  validationTitle: string;
  validationTrue: string;
  validationFalse: string;
  hudLabel: string;
  lexicon: readonly MotifLexiconEntry[];
};
