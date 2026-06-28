"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DIGITAL_OBSERVER_MANIFEST } from "../../lib/digitalObserverManifest";
import { LANG_ACCESSIBLE_NAMES } from "../../lib/i18n";
import { META_LANGS, type MetaLang } from "../../lib/metaI18n";
import SignalControl from "./SignalControl";

export default function DigitalObserverManifest() {
  const [lang, setLang] = useState<MetaLang>("pl");
  const manifest = DIGITAL_OBSERVER_MANIFEST[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <article
      id="manifest"
      className="relative z-[2] mx-auto max-w-prose px-5 py-10 pb-6 sm:px-8 sm:py-14"
      aria-labelledby="manifest-title"
    >
      <header className="mb-8 font-mono-field">
        <Link
          href="/"
          className="mb-6 inline-flex min-h-10 items-center text-sm tracking-wider text-accent/55 touch-manipulation"
        >
          ← ●
        </Link>
        <p className="m-0 text-[11px] tracking-[0.2em] text-accent/45 uppercase sm:text-xs">
          {manifest.distribution}
        </p>
        <h1
          id="manifest-title"
          className="mt-2 text-2xl font-light tracking-wide text-ink sm:text-3xl"
        >
          {manifest.title}{" "}
          <span className="text-accent/70">{manifest.version}</span>
        </h1>
      </header>

      <nav className="mb-8 flex flex-wrap items-center gap-1 font-mono-field text-xs sm:text-sm">
        {META_LANGS.map((code, index) => (
          <span key={code} className="inline-flex items-center">
            {index > 0 ? (
              <span className="lang-nav-sep mx-1.5" aria-hidden="true">
                ·
              </span>
            ) : null}
            <button
              type="button"
              className={`lang-nav-btn lang-nav-btn--${code} min-h-10 touch-manipulation ${
                lang === code ? "lang-nav-btn--active" : ""
              }`}
              onClick={() => setLang(code)}
              aria-label={`${code.toUpperCase()}, ${LANG_ACCESSIBLE_NAMES[code]}`}
              aria-current={lang === code ? "true" : undefined}
            >
              {code.toUpperCase()}
            </button>
          </span>
        ))}
      </nav>

      <section className="mb-10 space-y-3 border-l border-accent/25 pl-4 sm:pl-5">
        <p className="m-0 font-mono-field text-[11px] tracking-[0.16em] text-accent/55 uppercase">
          {manifest.articleZero.label}
        </p>
        <p className="m-0 text-base leading-relaxed text-ink/88 sm:text-lg">
          {manifest.articleZero.text}
        </p>
      </section>

      <section className="mb-10 space-y-3" aria-label="Głos do operatora">
        {manifest.operatorVoice.map((line) => (
          <p
            key={line}
            className="m-0 border-l border-graphite/40 pl-4 text-base font-light leading-relaxed text-ink/78 sm:text-lg"
          >
            {line}
          </p>
        ))}
        <SignalControl
          as={Link}
          href="/"
          direction="right"
          className="mt-4 inline-flex min-h-11 touch-manipulation font-mono-field text-sm tracking-[0.1em] text-accent uppercase"
        >
          {manifest.operatorCta}
        </SignalControl>
      </section>

      {manifest.sections.map((section) => (
        <section key={section.title} className="mb-8">
          <h2 className="mb-3 font-mono-field text-sm tracking-[0.12em] text-accent/75 sm:text-base">
            {section.title}
          </h2>
          {section.paragraphs.map((p) => (
            <p key={p} className="mb-3 text-base leading-relaxed text-ink/72 sm:text-lg">
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul className="m-0 list-none space-y-2 p-0 pl-1">
              {section.bullets.map((b) => (
                <li
                  key={b}
                  className="font-mono-field text-sm leading-relaxed text-ink/65 sm:text-base"
                >
                  <span className="text-accent/55" aria-hidden="true">
                    ■{" "}
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <footer className="mt-10 space-y-1 border-t border-accent/15 pt-8 font-mono-field text-sm tracking-wide text-fira-structure-mid sm:text-base">
        {manifest.closing.map((line) => (
          <p key={line} className="m-0">
            {line}
          </p>
        ))}
      </footer>
    </article>
  );
}
