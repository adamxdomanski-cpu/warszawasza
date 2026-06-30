import type { Metadata } from "next";
import { ORIGIN_CHANNEL_LINKS } from "../../lib/channelMap";
import { STUDIO_ANCHOR, STUDIO_BROADCAST_LINES } from "../../lib/studioAnchor";

export const metadata: Metadata = {
  title: "WARSZAWASZA",
  description: "Pracownia przy ul. Dzielnej 3A/7 w Warszawie.",
  robots: { index: false, follow: false },
};

export default function OriginPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6 py-16 sm:px-8">
      <p className="font-mono-field text-sm font-medium tracking-[0.2em] text-accent">
        WARSZAWASZA
      </p>

      <p className="mt-10 text-base leading-relaxed text-ink/88">
        Ten projekt powstał w pracowni przy ul. Dzielnej {STUDIO_ANCHOR.address}{" "}
        w Warszawie.
      </p>

      <div className="mt-8 space-y-1 font-mono-field text-sm leading-relaxed text-ink/72">
        {STUDIO_BROADCAST_LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <p className="mt-8 text-base leading-relaxed text-ink/80">
        Dziękujemy wszystkim, którzy swoimi pytaniami, uwagami i krytyką pomogli
        nadać temu projektowi kształt.
      </p>

      <p className="mt-8 text-sm leading-relaxed text-ink/55">
        Jeżeli tu trafiłeś, to znaczy, że również lubisz zaglądać pod
        powierzchnię.
      </p>

      <section
        className="mt-12 border-t border-ink/10 pt-8"
        aria-labelledby="origin-traces-heading"
      >
        <h2
          id="origin-traces-heading"
          className="font-mono-field text-xs tracking-[0.14em] text-ink/50"
        >
          Ślady projektu
        </h2>
        <img
          src="/origin-pkin.png"
          alt="Pałac Kultury i Nauki — fotografia z pola obserwacji, Warszawa"
          loading="lazy"
          width={683}
          height={1024}
          className="mt-4 max-w-[200px] opacity-70"
        />
      </section>

      <section
        className="mt-12 border-t border-ink/10 pt-8"
        aria-labelledby="origin-channels-heading"
      >
        <h2
          id="origin-channels-heading"
          className="font-mono-field text-xs tracking-[0.14em] text-ink/50"
        >
          Kanały w polu
        </h2>
        <ul className="mt-4 space-y-2 font-mono-field text-sm text-ink/65">
          {ORIGIN_CHANNEL_LINKS.map((channel) => (
            <li key={channel.id}>
              <a
                href={channel.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink/72 underline decoration-ink/20 underline-offset-4 transition hover:text-accent hover:decoration-accent/40"
              >
                {channel.label}
              </a>
              <span className="ml-2 text-[10px] uppercase tracking-[0.12em] text-ink/35">
                {channel.platform}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        width={218}
        height={150}
        className="mt-12 max-w-[5rem] opacity-40"
      />
    </main>
  );
}
