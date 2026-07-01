"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isPrivacyAudioEnabled, resolvePrivacyAudio } from "../../lib/privacyAudio";
import { privacyCopy } from "../../lib/privacyCopy";

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
  const [listenOpen, setListenOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const copy = privacyCopy("pl");
  const privacyAudio = resolvePrivacyAudio("pl");
  const audioReady = isPrivacyAudioEnabled("pl");

  useEffect(() => {
    document.documentElement.lang = "pl";
  }, []);

  useEffect(() => {
    setListenOpen(false);
  }, [privacyAudio?.src]);

  const scrollToText = () => {
    textRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-8 px-6 py-16 sm:px-8">
      <header className="flex flex-col gap-4">
        <p className="m-0 font-mono-field text-sm font-medium tracking-[0.2em] text-accent">
          WARSZAWASZA
        </p>
        <h1 className="m-0 text-2xl font-light leading-snug tracking-tight text-ink sm:text-3xl">
          {copy.title}
        </h1>
        <p className="m-0 text-base leading-relaxed text-[var(--color-fira-structure-bright)]">
          {copy.intro}
        </p>

        {audioReady ? (
          <nav
            className="flex flex-col items-center gap-4 py-2"
            aria-label={copy.listenNavLabel}
          >
            {!listenOpen ? (
              <>
                <button
                  type="button"
                  onClick={() => setListenOpen(true)}
                  className="privacy-listen-dot touch-manipulation"
                  aria-label={copy.listenAria}
                >
                  <span className="privacy-listen-dot__core" aria-hidden="true" />
                </button>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="m-0 text-base leading-snug text-ink">{copy.listenAction}</p>
                  <p className="m-0 font-mono-field text-xs tracking-wide text-[var(--color-fira-structure-mid)]">
                    {copy.listenDuration}
                  </p>
                </div>
              </>
            ) : (
              <audio
                key={privacyAudio?.src}
                controls
                preload="metadata"
                src={privacyAudio?.src}
                className="privacy-listen-audio w-full max-w-sm"
              />
            )}
            <p className="m-0 font-mono-field text-xs tracking-wide text-[var(--color-fira-structure-mid)]">
              {copy.orLabel}
            </p>
            <button
              type="button"
              onClick={scrollToText}
              className="min-h-11 touch-manipulation text-base leading-snug text-[var(--color-fira-structure-bright)] underline-offset-4 hover:underline"
            >
              {copy.fullPolicy}
            </button>
          </nav>
        ) : null}
      </header>

      <div ref={textRef} className="flex flex-col gap-10 scroll-mt-6">
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
