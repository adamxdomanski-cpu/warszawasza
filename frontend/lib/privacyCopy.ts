import type { Lang } from "./i18n";

export type PrivacySection = {
  heading: string;
  items?: readonly string[];
  body?: readonly string[];
};

export type PrivacyCopy = {
  navLabel: string;
  title: string;
  intro: string;
  listenNavLabel: string;
  listenAction: string;
  fullPolicy: string;
  collect: PrivacySection;
  notCollect: PrivacySection;
  security: PrivacySection;
  minimize: PrivacySection;
  cookiesWhat: PrivacySection;
  cookiesHere: PrivacySection;
  cookiesNoAnalytics: PrivacySection;
  cookiesElsewhere: PrivacySection;
  deviceStorage: PrivacySection;
  promise: PrivacySection;
  contact: PrivacySection;
  backHome: string;
  updated: string;
};

const PL: PrivacyCopy = {
  navLabel: "Jak chronimy dane",
  title: "Jak chronimy Twoje dane",
  intro:
    "Odpowiedź na pytania, które ludzie naprawdę zadają — nie regulamin do wkuwania. Szczegóły znajdziesz poniżej.",
  listenNavLabel: "Sposób odbioru",
  listenAction: "▶️ Posłuchaj, jak chronimy Twoje dane (ok. 2 min)",
  fullPolicy: "📖 Pełna polityka prywatności",
  collect: {
    heading: "Co zapisujemy — tylko gdy Ty zdecydujesz",
    items: [
      "nagranie głosu, które sam rozpoczynasz i kończysz,",
      "zdjęcie, jeśli je dodasz,",
      "lokalizację — wyłącznie jeśli wyrazisz zgodę w urządzeniu.",
    ],
  },
  notCollect: {
    heading: "Czego nie zbieramy",
    items: [
      "historii przeglądania,",
      "kontaktów ani wiadomości z telefonu,",
      "mikrofonu poza momentem nagrywania,",
      "lokalizacji w tle — poza jednym zgłoszeniem, na które się zgodzisz.",
    ],
  },
  security: {
    heading: "Bezpieczeństwo",
    body: [
      "Twoje zgłoszenie jest przesyłane wyłącznie po Twojej decyzji.",
      "Nic nie jest nagrywane w tle.",
      "Nie tworzymy profili użytkowników ani nie sprzedajemy danych.",
    ],
  },
  minimize: {
    heading: "Nasza zasada",
    body: [
      "Nie zbieramy danych tylko dlatego, że możemy.",
      "Zbieramy wyłącznie informacje potrzebne do obsługi zgłoszenia — i tylko wtedy, gdy świadomie zdecydujesz się je przekazać.",
    ],
  },
  cookiesWhat: {
    heading: "Czym są cookies?",
    body: [
      "Cookies („ciasteczka”) to małe pliki zapisywane przez stronę internetową w Twojej przeglądarce.",
      "Nie wszystkie cookies robią to samo. Warto wiedzieć, po co są:",
    ],
    items: [
      "niezbędne — strona działa poprawnie (np. sesja, ustawienia),",
      "analityczne — właściciel serwisu widzi, jak ludzie z niego korzystają,",
      "marketingowe — personalizacja treści, reklam, pomiar kampanii.",
    ],
  },
  cookiesHere: {
    heading: "Dlaczego tu nie prosimy o zgodę na cookies?",
    body: [
      "WARSZAWASZA nie używa reklam ani narzędzi śledzących użytkowników.",
      "Nie tworzymy profili. Nie sprzedajemy danych.",
      "Jeśli strona zapisuje coś w przeglądarce, to wyłącznie mechanizmy techniczne potrzebne do działania serwisu.",
      "Nie prosimy o zgodę na cookies marketingowe ani analityczne — bo ich po prostu nie używamy.",
    ],
  },
  cookiesNoAnalytics: {
    heading: "Dlaczego nie używamy analitycznych cookies?",
    body: [
      "WARSZAWASZA powstała z prostego założenia: nie zbieramy danych, których nie potrzebujemy.",
      "Wiele stron wykorzystuje cookies do analizy ruchu, reklam lub personalizacji. My zdecydowaliśmy inaczej.",
      "Jeżeli informacja nie jest potrzebna do działania aplikacji, nie zbieramy jej. Mniej danych o użytkownikach — więcej prywatności.",
    ],
  },
  cookiesElsewhere: {
    heading: "Jak podejmować decyzje na innych stronach?",
    body: [
      "Na wielu stronach zobaczysz baner z prośbą o zgodę. To normalne — różne serwisy podejmują różne decyzje.",
      "Jeśli wyrazisz zgodę, strona może używać dodatkowych cookies do analizy ruchu, zapamiętywania preferencji lub reklam.",
      "Warto poświęcić chwilę na sprawdzenie, na co dokładnie wyrażasz zgodę. „Akceptuj wszystko” to wybór — nie obowiązek.",
    ],
  },
  deviceStorage: {
    heading: "Pamięć Twojego urządzenia",
    body: [
      "Oprócz cookies strona może zapisać dane lokalnie w przeglądarce (pamięć sesji) — preferencje języka, ostatnie ślady obserwacji.",
      "To dzieje się na Twoim urządzeniu, żeby aplikacja działała — nie po to, żeby budować profil ani śledzić Cię między stronami.",
    ],
  },
  promise: {
    heading: "Nasza obietnica",
    body: [
      "Jeżeli kiedyś zmienimy sposób przetwarzania danych, poinformujemy o tym jasno i prostym językiem.",
      "Nie ukrywamy takich zmian w długich dokumentach ani niezrozumiałych komunikatach.",
    ],
  },
  contact: {
    heading: "Pytania",
    body: [
      "Inicjatywa WARSZAWASZA · pracownia przy ul. Dzielnej 3A/7, Warszawa.",
      "Masz wątpliwości przed wysłaniem zgłoszenia — przeczytaj powyższe i zdecyduj, czy chcesz kontynuować.",
    ],
  },
  backHome: "← Strona główna",
  updated: "Ostatnia aktualizacja: czerwiec 2026",
};

const EN: PrivacyCopy = {
  navLabel: "How we protect data",
  title: "How we protect your data",
  intro:
    "Answers to questions people actually ask — not a legal wall of text. Details are below.",
  listenNavLabel: "How to read this",
  listenAction: "▶️ Listen: how we protect your data (about 2 min)",
  fullPolicy: "📖 Full privacy policy",
  collect: {
    heading: "What we store — only when you decide",
    items: [
      "a voice recording you start and stop yourself,",
      "a photo if you add one,",
      "location — only if you allow it on your device.",
    ],
  },
  notCollect: {
    heading: "What we do not collect",
    items: [
      "browsing history,",
      "contacts or messages from your phone,",
      "microphone use outside recording,",
      "background location — only for a submission you approve.",
    ],
  },
  security: {
    heading: "Security",
    body: [
      "Your report is sent only after you decide.",
      "Nothing is recorded in the background.",
      "We do not build user profiles or sell data.",
    ],
  },
  minimize: {
    heading: "Our principle",
    body: [
      "We do not collect data just because we can.",
      "We only take information needed to handle a report — and only when you consciously choose to share it.",
    ],
  },
  cookiesWhat: {
    heading: "What are cookies?",
    body: [
      "Cookies are small files a website stores in your browser.",
      "Not all cookies do the same thing. It helps to know why they exist:",
    ],
    items: [
      "essential — the site works correctly (e.g. session, settings),",
      "analytics — the site owner sees how people use the service,",
      "marketing — content and ad personalisation, campaign measurement.",
    ],
  },
  cookiesHere: {
    heading: "Why we do not ask for cookie consent here",
    body: [
      "WARSZAWASZA does not use ads or user-tracking tools.",
      "We do not build profiles. We do not sell data.",
      "If the site stores something in your browser, it is only technical mechanisms required to run the service.",
      "We do not ask for marketing or analytics cookies — because we simply do not use them.",
    ],
  },
  cookiesNoAnalytics: {
    heading: "Why we do not use analytics cookies",
    body: [
      "WARSZAWASZA started from a simple premise: we do not collect data we do not need.",
      "Many sites use cookies for traffic analysis, ads, or personalisation. We chose differently.",
      "If information is not needed for the app to work, we do not collect it. Less data about users — more privacy.",
    ],
  },
  cookiesElsewhere: {
    heading: "How to decide on other websites",
    body: [
      "On many sites you will see a consent banner. That is normal — different services make different choices.",
      "If you agree, a site may use additional cookies for traffic analysis, preferences, or ads.",
      "Take a moment to check what you are agreeing to. “Accept all” is a choice — not an obligation.",
    ],
  },
  deviceStorage: {
    heading: "Your device storage",
    body: [
      "Besides cookies, the site may store data locally in your browser (session storage) — language preference, recent observation traces.",
      "This stays on your device so the app works — not to build a profile or track you across sites.",
    ],
  },
  promise: {
    heading: "Our promise",
    body: [
      "If we ever change how data is processed, we will say so clearly and in plain language.",
      "We will not hide such changes in long documents or unclear notices.",
    ],
  },
  contact: {
    heading: "Questions",
    body: [
      "WARSZAWASZA initiative · studio at Dzielna 3A/7, Warsaw.",
      "If unsure before submitting — read the above and decide whether to continue.",
    ],
  },
  backHome: "← Home",
  updated: "Last updated: June 2026",
};

const IT: PrivacyCopy = {
  navLabel: "Come proteggiamo i dati",
  title: "Come proteggiamo i tuoi dati",
  intro:
    "Risposte alle domande che le persone si fanno davvero — non un regolamento da memorizzare. I dettagli sono sotto.",
  listenNavLabel: "Come leggere",
  listenAction: "▶️ Ascolta: come proteggiamo i tuoi dati (circa 2 min)",
  fullPolicy: "📖 Informativa completa sulla privacy",
  collect: {
    heading: "Cosa registriamo — solo se decidi tu",
    items: [
      "una registrazione vocale che avvii e interrompi tu,",
      "una foto se la aggiungi,",
      "la posizione — solo se la autorizzi sul dispositivo.",
    ],
  },
  notCollect: {
    heading: "Cosa non raccogliamo",
    items: [
      "cronologia di navigazione,",
      "contatti o messaggi del telefono,",
      "microfono al di fuori della registrazione,",
      "posizione in background — solo per una segnalazione che approvi.",
    ],
  },
  security: {
    heading: "Sicurezza",
    body: [
      "La segnalazione viene inviata solo dopo la tua decisione.",
      "Nulla viene registrato in background.",
      "Non creiamo profili utente né vendiamo dati.",
    ],
  },
  minimize: {
    heading: "Il nostro principio",
    body: [
      "Non raccogliamo dati solo perché possiamo.",
      "Prendiamo solo le informazioni necessarie a gestire una segnalazione — e solo quando decidi consapevolmente di condividerle.",
    ],
  },
  cookiesWhat: {
    heading: "Cosa sono i cookie?",
    body: [
      "I cookie sono piccoli file che un sito salva nel browser.",
      "Non tutti i cookie fanno la stessa cosa. Vale la pena sapere a cosa servono:",
    ],
    items: [
      "necessari — il sito funziona correttamente (es. sessione, impostazioni),",
      "analitici — il proprietario vede come le persone usano il servizio,",
      "marketing — personalizzazione di contenuti e annunci, misurazione campagne.",
    ],
  },
  cookiesHere: {
    heading: "Perché qui non chiediamo il consenso sui cookie",
    body: [
      "WARSZAWASZA non usa pubblicità né strumenti di tracciamento.",
      "Non creiamo profili. Non vendiamo dati.",
      "Se il sito salva qualcosa nel browser, sono solo meccanismi tecnici necessari al funzionamento.",
      "Non chiediamo cookie marketing o analitici — perché semplicemente non li usiamo.",
    ],
  },
  cookiesNoAnalytics: {
    heading: "Perché non usiamo cookie analitici",
    body: [
      "WARSZAWASZA nasce da un presupposto semplice: non raccogliamo dati di cui non abbiamo bisogno.",
      "Molti siti usano i cookie per analisi del traffico, annunci o personalizzazione. Noi abbiamo scelto diversamente.",
      "Se un'informazione non serve al funzionamento dell'app, non la raccogliamo. Meno dati sugli utenti — più privacy.",
    ],
  },
  cookiesElsewhere: {
    heading: "Come decidere su altri siti",
    body: [
      "Su molti siti vedrai un banner di consenso. È normale — servizi diversi fanno scelte diverse.",
      "Se acconsenti, un sito può usare cookie aggiuntivi per analisi, preferenze o annunci.",
      "Prenditi un momento per capire a cosa acconsenti. «Accetta tutto» è una scelta — non un obbligo.",
    ],
  },
  deviceStorage: {
    heading: "Memoria del tuo dispositivo",
    body: [
      "Oltre ai cookie, il sito può salvare dati localmente nel browser — lingua, tracce recenti.",
      "Resta sul tuo dispositivo perché l'app funzioni — non per costruire un profilo o tracciarti tra siti.",
    ],
  },
  promise: {
    heading: "La nostra promessa",
    body: [
      "Se un giorno cambieremo il modo in cui trattiamo i dati, lo diremo chiaramente e in linguaggio semplice.",
      "Non nasconderemo tali cambiamenti in documenti lunghi o comunicati incomprensibili.",
    ],
  },
  contact: {
    heading: "Domande",
    body: [
      "Iniziativa WARSZAWASZA · laboratorio in Dzielna 3A/7, Varsavia.",
      "Se hai dubbi prima di inviare — leggi quanto sopra e decidi se continuare.",
    ],
  },
  backHome: "← Home",
  updated: "Ultimo aggiornamento: giugno 2026",
};

const COPY: Record<"pl" | "en" | "it", PrivacyCopy> = { pl: PL, en: EN, it: IT };

export function privacyCopy(lang: Lang): PrivacyCopy {
  if (lang in COPY) return COPY[lang as keyof typeof COPY];
  return PL;
}

export function privacyLangs(): readonly ("pl" | "en" | "it")[] {
  return ["pl", "en", "it"];
}
