"use client";

import Link from "next/link";
import type { EntryCopy } from "../../lib/artifactI18n";
import type { Lang } from "../../lib/i18n";
import LangNav from "./LangNav";
import PrivacyLink from "./PrivacyLink";
import SignalControl from "./SignalControl";

type OrientationScreenProps = {
  lang: Lang;
  copy: EntryCopy;
  exiting: boolean;
  onLangChange: (lang: Lang) => void;
  onContinue: () => void;
  onFadeComplete: () => void;
};

export default function OrientationScreen({
  lang,
  copy,
  exiting,
  onLangChange,
  onContinue,
  onFadeComplete,
}: OrientationScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#0a0a0a] p-5 transition-opacity duration-500 sm:p-8 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={(e) => {
        if (exiting && e.propertyName === "opacity") onFadeComplete();
      }}
    >
      <div className="flex justify-end">
        <LangNav lang={lang} onChange={onLangChange} />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-6">
        <p className="accent-signal m-0 font-mono-field text-xs tracking-[0.18em] uppercase">
          {copy.gateOrient}
        </p>
        <h1 className="m-0 text-3xl font-light tracking-tight sm:text-4xl">{copy.gateOrientTitle}</h1>
        <div className="max-w-md space-y-2 text-lg font-light leading-relaxed text-accent/85">
          {copy.gatePurpose.map((line) => (
            <p key={line} className="m-0">
              {line}
            </p>
          ))}
        </div>
        <p className="m-0 font-mono-field text-accent/55">{copy.gateOrientPrompt}</p>
        <SignalControl
          type="button"
          direction="down"
          onClick={onContinue}
          className="accent-signal min-h-11 self-start font-mono-field text-sm tracking-[0.12em] uppercase"
        >
          {copy.gateOrientAction}
        </SignalControl>
      </div>
      <footer className="flex flex-col gap-2 font-mono-field text-xs text-accent/35">
        <Link href="/origin" className="hover:text-accent/60">
          STUDIO:WAW_DZ3A7
        </Link>
        <PrivacyLink lang={lang} className="text-accent/35 hover:text-accent/60" />
      </footer>
    </div>
  );
}
