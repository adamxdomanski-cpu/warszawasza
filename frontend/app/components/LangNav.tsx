"use client";

import { LANGS, type Lang } from "../../lib/i18n";
import SignalControl from "./SignalControl";

type LangNavProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  variant?: "bracket" | "plain";
};

export default function LangNav({
  lang,
  onChange,
  variant = "plain",
}: LangNavProps) {
  return (
    <nav
      className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-field text-sm tracking-wider sm:gap-x-3 sm:text-base"
      aria-label="Language"
    >
      {LANGS.map((code, index) => {
        const active = lang === code;
        const label =
          variant === "bracket" ? `[ ${code.toUpperCase()} ]` : code.toUpperCase();
        return (
          <span key={code} className="inline-flex items-center gap-x-2 sm:gap-x-3">
            {index > 0 ? (
              <span className="select-none text-accent/25" aria-hidden="true">
                ·
              </span>
            ) : null}
            <SignalControl
              type="button"
              direction="none"
              onClick={() => onChange(code)}
              className={`min-h-11 min-w-11 touch-manipulation px-1.5 sm:px-2 ${
                active ? "text-accent opacity-100" : "text-graphite opacity-35"
              }`}
            >
              {label}
            </SignalControl>
          </span>
        );
      })}
    </nav>
  );
}
