"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LangNav from "../components/LangNav";
import { initialFieldLang } from "../../lib/field/initialFieldLang";
import type { Lang } from "../../lib/i18n";
import { privacyCopy, privacyLangs } from "../../lib/privacyCopy";

function SectionBlock({ section }: { section: { heading: string; items?: readonly string[]; body?: readonly string[] } }) {
  return (
    <section className="space-y-3">
      <h2 className="m-0 font-mono-field text-xs tracking-[0.14em] text-[var(--color-fira-structure-mid)] uppercase">
        {section.heading}
      </h2>
      {section.items ? (
        <ul className="m-0 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="m-0 text-base leading-relaxed text-ink">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export default function PrivacyPageClient() {
  const [lang, setLang] = useState<Lang>(() => initialFieldLang());
  const copy = privacyCopy(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const onLangChange = (next: Lang) => {
    if (privacyLangs().includes(next as "pl" | "en" | "it")) {
      setLang(next);
    } else {
      setLang("pl");
    }
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-8 px-6 py-16 sm:px-8">
      <header className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangNav lang={lang} onChange={onLangChange} variant="bracket" />
        </div>
        <p className="m-0 font-mono-field text-sm font-medium tracking-[0.2em] text-accent">
          WARSZAWASZA
        </p>
        <h1 className="m-0 text-2xl font-light leading-snug tracking-tight text-ink sm:text-3xl">
          {copy.title}
        </h1>
        <p className="m-0 text-base leading-relaxed text-[var(--color-fira-structure-bright)]">
          {copy.intro}
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <SectionBlock section={copy.collect} />
        <SectionBlock section={copy.notCollect} />
        <SectionBlock section={copy.security} />
        <SectionBlock section={copy.minimize} />
        <SectionBlock section={copy.cookiesWhat} />
        <SectionBlock section={copy.cookiesHere} />
        <SectionBlock section={copy.cookiesNoAnalytics} />
        <SectionBlock section={copy.cookiesElsewhere} />
        <SectionBlock section={copy.deviceStorage} />
        <SectionBlock section={copy.contact} />
        <section className="space-y-3 border-t border-[var(--color-fira-structure)] pt-8">
          <h2 className="m-0 font-mono-field text-xs tracking-[0.14em] text-accent uppercase">
            {copy.promise.heading}
          </h2>
          {copy.promise.body?.map((paragraph) => (
            <p key={paragraph} className="m-0 text-base leading-relaxed text-[var(--color-fira-structure-bright)]">
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      <footer className="mt-4 space-y-3 border-t border-[var(--color-fira-structure)] pt-8">
        <p className="m-0 font-mono-field text-xs text-[var(--color-lang-idle)]">{copy.updated}</p>
        <Link
          href="/"
          className="inline-block min-h-11 font-mono-field text-sm text-accent touch-manipulation underline-offset-4 hover:underline"
        >
          {copy.backHome}
        </Link>
      </footer>
    </main>
  );
}
