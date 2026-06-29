import type { Lang } from "./i18n";
import { SECTOR_REGISTRY } from "./knowledge/sectorRegistry";

export type TraceFormCopy = {
  heading: string;
  lead: string;
  place: string;
  placePlaceholder: string;
  time: string;
  timePlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  subjectOptionalHint: string;
  relations: string;
  relationsPlaceholder: string;
  decision: string;
  decisionNone: string;
  decisionTrue: string;
  decisionFalse: string;
  obsidianRef: string;
  obsidianRefPlaceholder: string;
  submit: string;
  sectorLabels: Record<string, string>;
};

const SECTOR_LABELS_PL: Record<string, string> = {
  "core-climate": "Klimat",
  "core-security": "Bezpieczeństwo",
  "core-infrastructure": "Infrastruktura",
  "core-ecology": "Ekologia",
  "core-telemetry": "Telemetria",
};

const SECTOR_LABELS_EN: Record<string, string> = {
  "core-climate": "Climate",
  "core-security": "Security",
  "core-infrastructure": "Infrastructure",
  "core-ecology": "Ecology",
  "core-telemetry": "Telemetry",
};

const SECTOR_LABELS_IT: Record<string, string> = {
  "core-climate": "Clima",
  "core-security": "Sicurezza",
  "core-infrastructure": "Infrastruttura",
  "core-ecology": "Ecologia",
  "core-telemetry": "Telemetria",
};

function sectorLabelsFor(lang: Lang): Record<string, string> {
  if (lang === "en") return SECTOR_LABELS_EN;
  if (lang === "it") return SECTOR_LABELS_IT;
  return SECTOR_LABELS_PL;
}

export const TRACE_FORM_COPY: Record<Lang, TraceFormCopy> = {
  pl: {
    heading: "Ślad obserwacji",
    lead: "Miasto reaguje na sygnały. Zapisz to, co widzisz.",
    place: "Miejsce",
    placePlaceholder: "np. Muranów, przystanek, dziedziniec",
    time: "Czas",
    timePlaceholder: "np. 18:42",
    subject: "Temat",
    subjectPlaceholder: "Opcjonalnie — wybierz temat",
    subjectOptionalHint: "Nie musisz wybierać kategorii — wystarczy opis w polu poniżej.",
    relations: "Inne obserwacje (linki)",
    relationsPlaceholder: "Krótki opis lub odniesienie do innych śladów",
    decision: "Decyzja (ślad)",
    decisionNone: "— brak —",
    decisionTrue: "T — wynika kierunek",
    decisionFalse: "F — zatrzymuję się",
    obsidianRef: "Ref notatki (opcjonalnie)",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Zostaw ślad →",
    sectorLabels: SECTOR_LABELS_PL,
  },
  en: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Place",
    placePlaceholder: "e.g. Muranów, stop, courtyard",
    time: "Time",
    timePlaceholder: "e.g. 18:42",
    subject: "Subject",
    subjectPlaceholder: "Optional — pick a topic",
    subjectOptionalHint: "No category required — a short description is enough.",
    relations: "Related observations (links)",
    relationsPlaceholder: "Short description or link to other traces",
    decision: "Decision (trace)",
    decisionNone: "— none —",
    decisionTrue: "T — direction follows",
    decisionFalse: "F — I stop here",
    obsidianRef: "Note ref (optional)",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Leave trace →",
    sectorLabels: SECTOR_LABELS_EN,
  },
  it: {
    heading: "Traccia di osservazione",
    lead: "La città ascolta i segnali. Registra ciò che vedi.",
    place: "Luogo",
    placePlaceholder: "es. Muranów, fermata, cortile",
    time: "Tempo",
    timePlaceholder: "es. 18:42",
    subject: "Tema",
    subjectPlaceholder: "Facoltativo — scegli un tema",
    subjectOptionalHint: "Nessuna categoria obbligatoria — basta una breve descrizione.",
    relations: "Altre osservazioni (link)",
    relationsPlaceholder: "Breve descrizione o riferimento ad altre tracce",
    decision: "Decisione (traccia)",
    decisionNone: "— nessuna —",
    decisionTrue: "T — segue una direzione",
    decisionFalse: "F — mi fermo",
    obsidianRef: "Ref nota (opzionale)",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Lascia traccia →",
    sectorLabels: SECTOR_LABELS_IT,
  },
  uk: {
    heading: "Слід спостереження",
    lead: "Місто реагує на сигнали. Зафіксуйте, що бачите.",
    place: "Місце",
    placePlaceholder: "напр. Muranów, зупинка",
    time: "Час",
    timePlaceholder: "напр. 18:42",
    subject: "Тема",
    subjectPlaceholder: "За бажанням — оберіть тему",
    subjectOptionalHint: "Категорія не обов’язкова — достатньо короткого опису.",
    relations: "Інші спостереження",
    relationsPlaceholder: "Короткий опис або посилання",
    decision: "Рішення",
    decisionNone: "— немає —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Залишити слід →",
    sectorLabels: sectorLabelsFor("pl"),
  },
  bg: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Място",
    placePlaceholder: "e.g. Muranów",
    time: "Време",
    timePlaceholder: "e.g. 18:42",
    subject: "Тема",
    subjectPlaceholder: "По избор — изберете тема",
    subjectOptionalHint: "Категорията не е задължителна — достатъчен е кратък опис.",
    relations: "Други наблюдения",
    relationsPlaceholder: "Short description or link",
    decision: "Решение",
    decisionNone: "— няма —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Остави след →",
    sectorLabels: sectorLabelsFor("en"),
  },
  et: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Koht",
    placePlaceholder: "e.g. Muranów",
    time: "Aeg",
    timePlaceholder: "e.g. 18:42",
    subject: "Teema",
    subjectPlaceholder: "Valikuline — vali teema",
    subjectOptionalHint: "Kategooria pole kohustuslik — piisab lühikirjeldus.",
    relations: "Seotud vaatlused",
    relationsPlaceholder: "Short description or link",
    decision: "Otsus",
    decisionNone: "— puudub —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Jäta jälje →",
    sectorLabels: sectorLabelsFor("en"),
  },
  fi: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Paikka",
    placePlaceholder: "e.g. Muranów",
    time: "Aika",
    timePlaceholder: "e.g. 18:42",
    subject: "Aihe",
    subjectPlaceholder: "Valinnainen — valitse aihe",
    subjectOptionalHint: "Kategoriaa ei vaadita — lyhyt kuvaus riittää.",
    relations: "Liittyvät havainnot",
    relationsPlaceholder: "Short description or link",
    decision: "Päätös",
    decisionNone: "— ei —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Jätä jälki →",
    sectorLabels: sectorLabelsFor("en"),
  },
  lt: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Vieta",
    placePlaceholder: "e.g. Muranów",
    time: "Laikas",
    timePlaceholder: "e.g. 18:42",
    subject: "Tema",
    subjectPlaceholder: "Neprivaloma — pasirinkite temą",
    subjectOptionalHint: "Kategorija neprivaloma — pakanka trumpo aprašymo.",
    relations: "Kitos stebėsenos",
    relationsPlaceholder: "Short description or link",
    decision: "Sprendimas",
    decisionNone: "— nėra —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Palikti pėdsaką →",
    sectorLabels: sectorLabelsFor("en"),
  },
  lv: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Vieta",
    placePlaceholder: "e.g. Muranów",
    time: "Laiks",
    timePlaceholder: "e.g. 18:42",
    subject: "Temats",
    subjectPlaceholder: "Pēc izvēles — izvēlieties tematu",
    subjectOptionalHint: "Kategorija nav obligāta — pietiek ar īsu aprakstu.",
    relations: "Citas novērojumi",
    relationsPlaceholder: "Short description or link",
    decision: "Lēmums",
    decisionNone: "— nav —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Atstāt pēdu →",
    sectorLabels: sectorLabelsFor("en"),
  },
  hu: {
    heading: "Observation trace",
    lead: "The city reacts to signals. Note what you see.",
    place: "Hely",
    placePlaceholder: "e.g. Muranów",
    time: "Idő",
    timePlaceholder: "e.g. 18:42",
    subject: "Téma",
    subjectPlaceholder: "Opcionális — válasszon témát",
    subjectOptionalHint: "A kategória nem kötelező — elég egy rövid leírás.",
    relations: "Kapcsolódó megfigyelések",
    relationsPlaceholder: "Short description or link",
    decision: "Döntés",
    decisionNone: "— nincs —",
    decisionTrue: "T",
    decisionFalse: "F",
    obsidianRef: "Ref",
    obsidianRefPlaceholder: "10_OBSERWACJE/…",
    submit: "Nyom hagyása →",
    sectorLabels: sectorLabelsFor("en"),
  },
};

export function traceSubjectOptions(lang: Lang): { value: string; label: string }[] {
  const labels = TRACE_FORM_COPY[lang]?.sectorLabels ?? SECTOR_LABELS_PL;
  return SECTOR_REGISTRY.map((s) => ({
    value: s.subjectKey,
    label: labels[s.subjectKey] ?? s.subjectKey,
  }));
}
