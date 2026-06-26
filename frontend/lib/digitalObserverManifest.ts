import type { MetaLang } from "./metaI18n";

export type ManifestSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type DigitalObserverManifest = {
  title: string;
  version: string;
  distribution: string;
  articleZero: { label: string; text: string };
  sections: readonly ManifestSection[];
  closing: readonly string[];
  operatorVoice: readonly string[];
  operatorCta: string;
};

export const DIGITAL_OBSERVER_MANIFEST: Record<MetaLang, DigitalObserverManifest> = {
  pl: {
    title: "Manifest Cyfrowego Obserwatora",
    version: "v1.0",
    distribution: "Dystrybucja: WARSZAWASZA · Silnik: FIRA Core",
    articleZero: {
      label: "Artykuł Zero",
      text: "Kod jest narzędziem obrony faktów. Interfejs jest przestrzenią odzyskiwania uwagi. System nie zastępuje człowieka — system uzbraja człowieka w proces czystej obserwacji.",
    },
    operatorVoice: [
      "Ten ekran nie należy do algorytmu. Ten ekran należy do Ciebie.",
      "Przez lata karmiono nas szumem. Danymi, z których nic nie wynikało.",
      "Statystykami, które miały nas uspokoić. Obietnicami, które rozpływały się w powietrzu.",
      "WARSZAWASZA nie jest kolejną aplikacją, która chce ukraść Twoją uwagę.",
      "Jest przyrządem laboratoryjnym, który oddajemy w Twoje ręce.",
      "Kiedy widzisz wycinane drzewo na Woli, wyburzany pawilon na Muranowie, albo czujesz, że rytm Twojej ulicy zostaje brutalnie zakłócony — nie jesteś bezradny.",
      "Twój meldunek staje się sygnałem.",
      "FIRA nie pozwoli, by ten sygnał utonął w szumie.",
      "Prześwietli bazy KRS, sprawdzi raporty NIK, odszuka historię tego miejsca.",
      "Połączy kropki. Pokaże niewidzialne wektory siły i powtarzalne cykle.",
      "Udowodni, że to, co dzieje się pod Twoim oknem, jest częścią większego mechanizmu.",
      "Nie dążymy do taniej sensacji. Dążymy do twardej, nienaruszalnej wiedzy.",
      "Masz prawo wiedzieć. Masz prawo widzieć wyraźniej.",
      "Narzędzie jest gotowe.",
    ],
    operatorCta: "Uruchom analizę tkanki →",
    sections: [
      {
        title: "I. Suwerenność poznawcza zamiast algorytmicznej wyroczni",
        paragraphs: [
          "Odrzucamy technofatalizm. Nie wierzymy w nieomylne systemy AI podające wyroki z czarnych skrzynek. Żądamy transparentności procesu.",
        ],
        bullets: [
          "Prawo do weryfikacji ścieżki — od impulsu z ulicy, przez KRS, po audyty NIK/MF.",
          "Prawo do ciszy — gdy fakty nie wykazują korelacji, system mówi: brak podstaw do hipotezy.",
        ],
      },
      {
        title: "II. Miasto jako żywy palimpsest",
        paragraphs: [
          "Dane to nie dekoracja. Ulica i rytm miejski to fizyczne zapisy procesów społeczno-gospodarczych.",
          "Odrzucamy tabelaryczny szum dashboardów. Rzeczywistość opisujemy notacją kinetyczną FIRA — ruch jest dowodem zmiany stanu wiedzy.",
        ],
      },
      {
        title: "III. Narzędzia w służbie społeczeństwa obywatelskiego",
        paragraphs: [
          "Meldunek mieszkańca to impuls wejściowy, nie post o polubienia. Uruchamia rygorystyczną walidację dowodową.",
        ],
        bullets: [
          "Protokół jako wspólny język — dwie osoby mogą opisać to samo zjawisko tą samą notacją.",
          "Nienaruszalność zapisu — wyniki pomiarów nie podlegają nadpisaniu przez interes polityczny ani deweloperski.",
        ],
      },
    ],
    closing: [
      "Szum został odcięty.",
      "Język został skrystalizowany.",
      "Instrument został przekazany ludziom.",
    ],
  },
  en: {
    title: "Digital Observer Manifest",
    version: "v1.0",
    distribution: "Distribution: WARSZAWASZA · Engine: FIRA Core",
    articleZero: {
      label: "Article Zero",
      text: "Code is a tool for defending facts. The interface is a space for reclaiming attention. The system does not replace the human — it arms the human with a process of pure observation.",
    },
    operatorVoice: [
      "This screen does not belong to an algorithm. It belongs to you.",
      "For years we were fed noise. Data that led nowhere.",
      "Statistics meant to calm us. Promises that dissolved in the air.",
      "WARSZAWASZA is not another app trying to steal your attention.",
      "It is a laboratory instrument we place in your hands.",
      "When you see trees cut on Wola, a pavilion demolished in Muranów, or feel your street's rhythm brutally disrupted — you are not helpless.",
      "Your report becomes a signal.",
      "FIRA will not let that signal drown in noise.",
      "It will scan KRS records, check NIK reports, trace the history of the place.",
      "It connects the dots. It shows invisible force vectors and repeating cycles.",
      "It proves that what happens under your window is part of a larger mechanism.",
      "We do not chase cheap sensation. We pursue hard, inviolable knowledge.",
      "You have the right to know. You have the right to see more clearly.",
      "The instrument is ready.",
    ],
    operatorCta: "Start tissue analysis →",
    sections: [
      {
        title: "I. Cognitive sovereignty over algorithmic oracle",
        paragraphs: [
          "We reject technofatalism. We demand process transparency, not black-box verdicts.",
        ],
        bullets: [
          "Right to verify the path — from street impulse through KRS to NIK/MF audits.",
          "Right to silence — when facts show no correlation, the system says: no basis for hypothesis.",
        ],
      },
      {
        title: "II. The city as living palimpsest",
        paragraphs: [
          "Data is not decoration. Streets record social and economic processes in physical form.",
          "We reject dashboard noise. Reality is described with FIRA kinetic notation — movement is evidence of change.",
        ],
      },
      {
        title: "III. Tools for civil society",
        paragraphs: [
          "A citizen report is an input impulse, not a post for likes. It triggers rigorous evidence validation.",
        ],
        bullets: [
          "Protocol as shared language — two strangers can document the same phenomenon with the same notation.",
          "Record immutability — measured trajectories cannot be rewritten by political or developer interest.",
        ],
      },
    ],
    closing: [
      "Noise has been cut.",
      "Language has crystallized.",
      "The instrument has been handed to the people.",
    ],
  },
  it: {
    title: "Manifesto dell'Osservatore Digitale",
    version: "v1.0",
    distribution: "Distribuzione: WARSZAWASZA · Motore: FIRA Core",
    articleZero: {
      label: "Articolo Zero",
      text: "Il codice difende i fatti. L'interfaccia restituisce l'attenzione. Il sistema non sostituisce l'uomo — lo arma con un processo di osservazione pura.",
    },
    operatorVoice: [
      "Questo schermo non appartiene all'algoritmo. Appartiene a te.",
      "Per anni ci hanno nutrito di rumore. Dati che non portavano a nulla.",
      "Statistiche per calmare. Promesse dissolte nell'aria.",
      "WARSZAWASZA non è un'altra app che ruba attenzione.",
      "È uno strumento di laboratorio nelle tue mani.",
      "Quando vedi alberi tagliati a Wola, un padiglione demolito a Muranów, o senti il ritmo della tua strada interrotto — non sei impotente.",
      "La tua segnalazione diventa un segnale.",
      "FIRA non lascerà affogare quel segnale nel rumore.",
      "Esaminerà KRS, controllerà NIK, traccerà la storia del luogo.",
      "Unisce i punti. Mostra vettori invisibili e cicli ripetuti.",
      "Dimostra che ciò che accade sotto la tua finestra fa parte di un meccanismo più grande.",
      "Non cerchiamo sensazione facile. Cerchiamo conoscenza solida.",
      "Hai diritto di sapere. Hai diritto di vedere più chiaramente.",
      "Lo strumento è pronto.",
    ],
    operatorCta: "Avvia analisi del tessuto →",
    sections: [
      {
        title: "I. Sovranità cognitiva",
        paragraphs: ["Rifiutiamo il tecnofatalismo. Esigiamo trasparenza del processo."],
        bullets: [
          "Diritto di verificare il percorso — dall'impulso di strada a KRS e NIK.",
          "Diritto al silenzio — senza correlazione, nessuna ipotesi forzata.",
        ],
      },
      {
        title: "II. La città come palinsesto vivente",
        paragraphs: [
          "I dati non sono decorazione. La strada registra processi sociali ed economici.",
          "Rifiutiamo il rumore delle dashboard. La realtà si descrive con la notazione cinetica FIRA.",
        ],
      },
      {
        title: "III. Strumenti per la società civile",
        paragraphs: ["La segnalazione del cittadino è un impulso d'ingresso, non un post."],
        bullets: [
          "Protocollo come linguaggio comune.",
          "Immutabilità del registro — le traiettorie misurate non si riscrivono.",
        ],
      },
    ],
    closing: [
      "Il rumore è stato tagliato.",
      "Il linguaggio è cristallizzato.",
      "Lo strumento è stato consegnato alle persone.",
    ],
  },
  uk: {
    title: "Маніфест Цифрового Спостерігача",
    version: "v1.0",
    distribution: "Дистрибуція: WARSZAWASZA · Двигун: FIRA Core",
    articleZero: {
      label: "Стаття Нуль",
      text: "Код захищає факти. Інтерфейс повертає увагу. Система не замінює людину — вона озброює її процесом чистого спостереження.",
    },
    operatorVoice: [
      "Цей екран не належить алгоритму. Він належить тобі.",
      "Роками нас годували шумом. Даними, з яких нічого не випливало.",
      "Статистикою для заспокоєння. Обіцянками, що розчинялися в повітрі.",
      "WARSZAWASZA — не ще одна аплікація, що краде увагу.",
      "Це лабораторний інструмент у твоїх руках.",
      "Коли бачиш зрізані дерева на Волі, знесений павільйон на Мuranów, або відчуваєш, що ритм твоєї вулиці brutально порушено — ти не безпорадний.",
      "Твоє повідомлення стає сигналом.",
      "FIRA не дасть цьому сигналу потонути в шумі.",
      "Перевірить KRS, звіти NIK, історію місця.",
      "З'єднає крапки. Покаже невидимі вектори сили.",
      "Доведе, що те, що відбувається під твоїм вікном — частина більшого механізму.",
      "Ми не шукаємо дешевих сенсацій. Ми шукаємо твердого знання.",
      "Ти маєш право знати. Ти маєш право бачити чіткіше.",
      "Інструмент готовий.",
    ],
    operatorCta: "Запустити аналіз тканини →",
    sections: [
      {
        title: "I. Когнітивний суверенітет замість алгоритмічного оракула",
        paragraphs: ["Ми відкидаємо технofatalizm. Вимагаємо прозорості процесу."],
        bullets: [
          "Право перевірити шлях — від імпульсу з вулиці через KRS до аудитів NIK/MF.",
          "Право на тишу — без кореляції система каже: немає підстав для гіпотези.",
        ],
      },
      {
        title: "II. Місто як живий палimpsest",
        paragraphs: [
          "Дані — не декорація. Вулиця фіксує соціально-економічні процеси.",
          "Ми відкидаємо шум дашбордів. Реальність описуємо кінетичною нотацією FIRA.",
        ],
      },
      {
        title: "III. Інструменти для громадянського суспільства",
        paragraphs: ["Повідомлення мешканця — вхідний імпульс, не пост за лайки."],
        bullets: [
          "Протокол як спільна мова.",
          "Незмінність запису — виміряні траєкторії не переписуються.",
        ],
      },
    ],
    closing: [
      "Шум відсічено.",
      "Мову скристалізовано.",
      "Інструмент передано людям.",
    ],
  },
  bg: {
    title: "Манифест на цифровия наблюдател",
    version: "v1.0",
    distribution: "Дистрибуция: WARSZAWASZA · Двигател: FIRA Core",
    articleZero: {
      label: "Член Нула",
      text: "Кодът защитава фактите. Интерфейсът връща вниманието. Системата не замества човека — тя го въоръжава с процес на чисто наблюдение.",
    },
    operatorVoice: [
      "Този екран не принадлежи на алгоритъм. Принадлежи на теб.",
      "Години наред ни хранеха с шум. Данни, от които нищо не следваше.",
      "Статистики, за да ни успокоят. Обещания, разтворени във въздуха.",
      "WARSZAWASZA не е още едно приложение, което краде вниманието.",
      "Това е лабораторен инструмент в твоите ръце.",
      "Когато видиш отрязани дървета на Воля, срутен павилион на Муранов, или усетиш, че ритъмът на улицата ти е brutално нарушен — не си безпомощен.",
      "Твоето съобщение става сигнал.",
      "FIRA няма да позволи този сигнал да потъне в шума.",
      "Ще прегледа KRS, ще провери доклади на NIK, ще проследи историята на мястото.",
      "Свързва точките. Показва невидими вектори на сила.",
      "Доказва, че това, което се случва под прозореца ти, е част от по-голям механизъм.",
      "Не търсим евтина сензация. Търсим твърдо, неприкосновено знание.",
      "Имаш право да знаеш. Имаш право да виждаш по-ясно.",
      "Инструментът е готов.",
    ],
    operatorCta: "Стартирай анализ на тъканта →",
    sections: [
      {
        title: "I. Когнитивен суверенитет вместо алгоритмичен оракул",
        paragraphs: ["Отхвърляме технofatalизма. Изискваме прозрачност на процеса."],
        bullets: [
          "Право да провериш пътя — от импулс от улицата през KRS до одити NIK/MF.",
          "Право на тишина — без корелация системата казва: няма основание за хипотеза.",
        ],
      },
      {
        title: "II. Градът като жив палimpsest",
        paragraphs: [
          "Данните не са декорация. Улицата записва социално-икономически процеси.",
          "Отхвърляме шума на таблата. Реалността описваме с кинетичната нотация FIRA.",
        ],
      },
      {
        title: "III. Инструменти за гражданско общество",
        paragraphs: ["Съобщението на жителя е входен импулс, не пост за харесвания."],
        bullets: [
          "Протокол като общ език.",
          "Неприкосновеност на записа — измерените траектории не се пренаписват.",
        ],
      },
    ],
    closing: [
      "Шумът е отрязан.",
      "Езикът е кристализиран.",
      "Инструментът е предаден на хората.",
    ],
  },
  et: {
    title: "Digitaalse Vaatleja Manifest",
    version: "v1.0",
    distribution: "Distribuutio: WARSZAWASZA · Mootor: FIRA Core",
    articleZero: {
      label: "Artikkel Null",
      text: "Kood kaitseb fakte. Liides tagastab tähelepanu. Süsteem ei asenda inimest — see relvastab teda puhta vaatluse protsessiga.",
    },
    operatorVoice: [
      "See ekraan ei kuulu algoritmile. See kuulub sulle.",
      "Aastaid toideti meid müra. Andmetega, millest midagi ei järgunud.",
      "Statistikaga rahustamiseks. Lubadustega, mis õhus hajusid.",
      "WARSZAWASZA pole järjekordne rakendus, mis varastab tähelepanu.",
      "See on laboriinstrument sinu kätes.",
      "Kui näed maha raiutud puid Wolas, lammutatud paviljoni Muranówis või tunned, et sinu tänava rütm on brutselt katkenud — sa pole abitu.",
      "Sinu teade muutub signaaliks.",
      "FIRA ei lase sellel signaalil müras uppuda.",
      "Kontrollib KRS-i, NIK-i aruandeid, koha ajalugu.",
      "Ühendab punktid. Näitab nähtamatuid jõuvektoreid.",
      "Tõestab, et see, mis toimub sinu akna all, on suurema mehhanismi osa.",
      "Me ei otsi odavat sensatsiooni. Me otsime kindlat teadmist.",
      "Sul on õigus teada. Sul on õigus selgemalt näha.",
      "Instrument on valmis.",
    ],
    operatorCta: "Käivita koeanalüüs →",
    sections: [
      {
        title: "I. Kognitiivne suveräänsus algoritmilise oraakli asemel",
        paragraphs: ["Lükkame tagasi tehnofatalismi. Nõuame protsessi läbipaistvust."],
        bullets: [
          "Õigus kontrollida teed — tänavaimpulssist KRS-i ja NIK/MF audititeni.",
          "Õigus vaikuseni — korrelatsioonita ütleb süsteem: hüpoteesile puudub alus.",
        ],
      },
      {
        title: "II. Linn elava palimpsestina",
        paragraphs: [
          "Andmed pole dekoratsioon. Tänav salvestab sotsiaal-majanduslikke protsesse.",
          "Lükkame tagasi dashboardide müra. Reaalsust kirjeldame FIRA kineetilise notatsiooniga.",
        ],
      },
      {
        title: "III. Tööriistad kodanikuühiskonnale",
        paragraphs: ["Elaniku teade on sisendimpulss, mitte meeldimiste postitus."],
        bullets: [
          "Protokoll ühise keelena.",
          "Kirje puutumatust — mõõdetud trajektoore ei kirjutata üle.",
        ],
      },
    ],
    closing: [
      "Müra on ära lõigatud.",
      "Keel on kristalliseerunud.",
      "Instrument on inimestele antud.",
    ],
  },
  fi: {
    title: "Digitaalisen Havainnoijan Manifesti",
    version: "v1.0",
    distribution: "Jakelu: WARSZAWASZA · Moottori: FIRA Core",
    articleZero: {
      label: "Nollainen artikla",
      text: "Koodi puolustaa faktoja. Käyttöliittymä palauttaa huomion. Järjestelmä ei korvaa ihmistä — se varustaa hänet puhtaan havainnon prosessilla.",
    },
    operatorVoice: [
      "Tämä näyttö ei kuulu algoritmille. Se kuuluu sinulle.",
      "Vuosia ruokittiin meitä kohinalla. Datalla, josta ei seurannut mitään.",
      "Tilastoilla rauhoittamiseen. Lupauksilla, jotka haihtuivat ilmaan.",
      "WARSZAWASZA ei ole uusi sovellus, joka varastaa huomiosi.",
      "Se on laboratorioinstrumentti käsissäsi.",
      "Kun näet kaadettuja puita Wolassa, puretun paviljongin Muranówissa tai tunnet kadun rytmin katkeavan — et ole avuton.",
      "Ilmoituksesi muuttuu signaaliksi.",
      "FIRA ei anna signaalin hukkua kohinaan.",
      "Tarkistaa KRS:n, NIK-raportit, paikan historian.",
      "Yhdistää pisteet. Näyttää näkymättömät voimavektorit.",
      "Todistaa, että ikkunasi alla tapahtuva on osa suurempaa mekanismia.",
      "Emme etsi halpaa sensaatiota. Etsimme kovaa tietoa.",
      "Sinulla on oikeus tietää. Sinulla on oikeus nähdä selvemmin.",
      "Instrumentti on valmis.",
    ],
    operatorCta: "Käynnistä kudosanalyysi →",
    sections: [
      {
        title: "I. Kognitiivinen suvereniteetti algoritmisen oraakelin sijaan",
        paragraphs: ["Hylkäämme teknofatalismin. Vaadimme prosessin läpinäkyvyyttä."],
        bullets: [
          "Oikeus tarkistaa polku — kadun impulssista KRS:ään ja NIK/MF-auditointeihin.",
          "Oikeus hiljaisuuteen — ilman korrelaatiota järjestelmä sanoo: ei perustetta hypoteesille.",
        ],
      },
      {
        title: "II. Kaupunki elävänä palimpsestinä",
        paragraphs: [
          "Data ei ole koriste. Katu tallentaa sosioekonomisia prosesseja.",
          "Hylkäämme dashboard-kohinan. Kuvaamme todellisuutta FIRA-kineettisellä notaatiolla.",
        ],
      },
      {
        title: "III. Työkalut kansalaisyhteiskunnalle",
        paragraphs: ["Asukkaan ilmoitus on tulosignaali, ei tykkäyspostaus."],
        bullets: [
          "Protokolla yhteisenä kielenä.",
          "Kirjausten koskemattomuus — mitatut trajektoriat eivät kirjoitu uudelleen.",
        ],
      },
    ],
    closing: [
      "Kohina on katkaistu.",
      "Kieli on kiteytynyt.",
      "Instrumentti on annettu ihmisille.",
    ],
  },
  lt: {
    title: "Skaitmeninio Stebėtojo Manifestas",
    version: "v1.0",
    distribution: "Distribucija: WARSZAWASZA · Variklis: FIRA Core",
    articleZero: {
      label: "Nulinis straipsnis",
      text: "Kodas gina faktus. Sąsaja grąžina dėmesį. Sistema nekeičia žmogaus — ji ginkluoja jį gryno stebėjimo procesu.",
    },
    operatorVoice: [
      "Šis ekranas nepriklauso algoritmui. Jis priklauso tau.",
      "Metus mus maitino triukšmu. Duomenimis, iš kurių nieko nesekė.",
      "Statistika raminti. Pažadais, kurie išgaravo ore.",
      "WARSZAWASZA — ne dar viena programėlė, vagianti dėmesį.",
      "Tai laboratorinis instrumentas tavo rankose.",
      "Kai matai kertamus medžius Wola, nugriautą paviljoną Muranów, ar jauti, kad tavo gatvės ritmas brutaliai sutrikęs — tu ne bejėgis.",
      "Tavo pranešimas tampa signalu.",
      "FIRA neleis šiam signalui paskęsti triukšme.",
      "Patikrins KRS, NIK ataskaitas, vietos istoriją.",
      "Sujungs taškus. Parodys nematomus jėgos vektorius.",
      "Įrodys, kad tai, kas vyksta po tavo langais, yra didesnio mechanizmo dalis.",
      "Mes neieškome pigios sensacijos. Ieškome tvirtos žinios.",
      "Tu turi teisę žinoti. Tu turi teisę matyti aiškiau.",
      "Instrumentas paruoštas.",
    ],
    operatorCta: "Paleisti audinių analizę →",
    sections: [
      {
        title: "I. Kognityvinis suverenitetas vietoj algoritminio orakulo",
        paragraphs: ["Atmetame technofatalizmą. Reikalaujame proceso skaidrumo."],
        bullets: [
          "Teisė patikrinti kelią — nuo gatvės impulso per KRS iki NIK/MF auditų.",
          "Teisė į tylą — be koreliacijos sistema sako: nėra pagrindo hipotezei.",
        ],
      },
      {
        title: "II. Miestas kaip gyvas palimpsestas",
        paragraphs: [
          "Duomenys — ne dekoracija. Gatvė fiksuoja socialinius ir ekonominius procesus.",
          "Atmetame dashboard triukšmą. Realybę aprašome FIRA kinetine notacija.",
        ],
      },
      {
        title: "III. Įrankiai pilietinei visuomenei",
        paragraphs: ["Gyventojo pranešimas — įvesties impulsas, ne postas dėl like'ų."],
        bullets: [
          "Protokolas kaip bendra kalba.",
          "Įrašo neliečiamybė — išmatuotos trajektorijos neperrašomos.",
        ],
      },
    ],
    closing: [
      "Triukšmas nukirstas.",
      "Kalba kristalizuota.",
      "Instrumentas perduotas žmonėms.",
    ],
  },
  lv: {
    title: "Digitālā Novērotāja Manifests",
    version: "v1.0",
    distribution: "Distribūcija: WARSZAWASZA · Dzinējs: FIRA Core",
    articleZero: {
      label: "Nulles pants",
      text: "Kods aizsargā faktus. Saskarne atdod uzmanību. Sistēma neaizstāj cilvēku — tā bruņo viņu ar tīra novērojuma procesu.",
    },
    operatorVoice: [
      "Šis ekrāns nepieder algoritmam. Tas pieder tev.",
      "Gadiem mūs baroja ar troksni. Ar datiem, no kuriem nekas nesekoja.",
      "Ar statistiku nomierināšanai. Ar solījumiem, kas iztvaikoja gaisā.",
      "WARSZAWASZA nav vēl viena lietotne, kas zog uzmanību.",
      "Tas ir laboratorijas instruments tavās rokās.",
      "Kad redzi nocirstus kokus Wolā, nojaukto paviljonu Muranów vai jūti, ka ielas ritms brutāli pārtraukts — tu neesi bezpalīdzīgs.",
      "Tavs ziņojums kļūst par signālu.",
      "FIRA neļaus šim signālam noslīkt troksnī.",
      "Pārbaudīs KRS, NIK ziņojumus, vietas vēsturi.",
      "Savienos punktus. Parādīs neredzamus spēka vektorus.",
      "Pierādīs, ka tas, kas notiek zem loga, ir lielāka mehānisma daļa.",
      "Mēs nemeklējam lētu sensāciju. Meklējam cietu zināšanu.",
      "Tev ir tiesības zināt. Tev ir tiesības redzēt skaidrāk.",
      "Instruments ir gatavs.",
    ],
    operatorCta: "Sākt auduma analīzi →",
    sections: [
      {
        title: "I. Kognitīvā suverenitāte algoritmiskā orākula vietā",
        paragraphs: ["Noraidām tehnofatalismu. Prasām procesa caurredzamību."],
        bullets: [
          "Tiesības pārbaudīt ceļu — no ielas impulsa caur KRS līdz NIK/MF auditiem.",
          "Tiesības uz klusumu — bez korelācijas sistēma saka: nav pamata hipotēzei.",
        ],
      },
      {
        title: "II. Pilsēta kā dzīvs palimpsests",
        paragraphs: [
          "Dati nav dekorācija. Iela fiksē sociāli ekonomiskos procesus.",
          "Noraidām dashboard troksni. Realitāti aprakstām ar FIRA kinētisko notāciju.",
        ],
      },
      {
        title: "III. Instrumenti pilsoniskajai sabiedrībai",
        paragraphs: ["Iedzīvotāja ziņojums ir ievades impulss, ne postenis par like."],
        bullets: [
          "Protokols kā kopīga valoda.",
          "Ieraksta neaizskaramība — izmērītās trajektorijas netiek pārrakstītas.",
        ],
      },
    ],
    closing: [
      "Troksnis ir nocirsts.",
      "Valoda ir kristalizēta.",
      "Instruments nodots cilvēkiem.",
    ],
  },
  hu: {
    title: "A Digitális Megfigyelő Manifestuma",
    version: "v1.0",
    distribution: "Disztribúció: WARSZAWASZA · Motor: FIRA Core",
    articleZero: {
      label: "Nulladik cikk",
      text: "A kód a tények védelmére szolgál. A felület visszaadja a figyelmet. A rendszer nem helyettesíti az embert — fegyverzi a tiszta megfigyelés folyamatával.",
    },
    operatorVoice: [
      "Ez a képernyő nem az algoritmusé. A tiéd.",
      "Évekig zajjal etettek minket. Adatokkal, amelyek sehová nem vezettek.",
      "Statisztikákkal a megnyugtatásra. Ígéretekkel, amelyek elpárologtak.",
      "A WARSZAWASZA nem egy újabb app, amely el akarja lopni a figyelmedet.",
      "Laboratóriumi eszköz a kezedben.",
      "Amikor kivágott fákat látsz Wola-n, lebontott pavilont Muranów-on, vagy érzed, hogy az utcád ritmusa brutálisan megtörik — nem vagy tehetetlen.",
      "A bejelentésed jellé válik.",
      "A FIRA nem engedi, hogy a jel elvesszen a zajban.",
      "Átvilágítja a KRS-t, ellenőrzi a NIK jelentéseket, feltárja a hely történetét.",
      "Összeköti a pontokat. Megmutatja a láthatatlan erővektorokat.",
      "Bizonyítja, hogy ami az ablakod alatt történik, egy nagyobb mechanizmus része.",
      "Nem olcsó szenzációt keresünk. Szilárd, sérthetetlen tudást.",
      "Jogod van tudni. Jogod van tisztábban látni.",
      "Az eszköz kész.",
    ],
    operatorCta: "Szövetelemzés indítása →",
    sections: [
      {
        title: "I. Kognitív szuverenitás az algoritmikus orákulum helyett",
        paragraphs: ["Elutasítjuk a technofatalizmust. Átlátható folyamatot követelünk."],
        bullets: [
          "Jog az útvonal ellenőrzésére — utcai impulzustól a KRS-en és NIK-en át.",
          "Jog a csendre — korreláció nélkül nincs kényszerített hipotézis.",
        ],
      },
      {
        title: "II. A város mint élő palimpsest",
        paragraphs: [
          "Az adat nem dekoráció. Az utca társadalmi-gazdasági folyamatokat rögzít.",
          "Elutasítjuk a dashboard zajt. A valóságot FIRA kinetikus jelöléssel írjuk le.",
        ],
      },
      {
        title: "III. Eszközök a civil társadalom szolgálatában",
        paragraphs: ["A lakos bejelentése bemeneti impulzus, nem like-ért küzdő poszt."],
        bullets: [
          "Protokoll mint közös nyelv.",
          "A nyilvántartás sérthetetlensége — a mért pályák nem írhatók felül.",
        ],
      },
    ],
    closing: [
      "A zaj el van vágva.",
      "A nyelv kristályosodott.",
      "Az eszköz az emberek kezébe került.",
    ],
  },
};
