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
      className="flex gap-1 font-mono-field text-sm tracking-wider sm:gap-2 sm:text-base"
      aria-label="Language"
    >
      {LANGS.map((code) => {
        const active = lang === code;
        const label =
          variant === "bracket" ? `[ ${code.toUpperCase()} ]` : code.toUpperCase();
        return (
          <SignalControl
            key={code}
            type="button"
            direction="none"
            onClick={() => onChange(code)}
            className={`min-h-11 min-w-11 touch-manipulation px-2 ${
              active ? "text-accent opacity-100" : "text-graphite opacity-35"
            }`}
          >
            {label}
          </SignalControl>
        );
      })}
    </nav>
  );
}
