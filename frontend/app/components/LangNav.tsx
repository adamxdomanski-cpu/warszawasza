"use client";

import { LANGS, LANG_ACCESSIBLE_NAMES, type Lang } from "../../lib/i18n";
import SignalControl from "./SignalControl";

type LangNavProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  variant?: "bracket" | "plain";
  surface?: "field" | "orient";
};

export default function LangNav({
  lang,
  onChange,
  variant = "plain",
  surface = "field",
}: LangNavProps) {
  return (
    <nav
      className={`lang-nav flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-field text-sm tracking-wider sm:gap-x-3 sm:text-base${
        surface === "orient" ? " lang-nav--orient" : ""
      }`}
      aria-label="Language"
    >
      {LANGS.map((code, index) => {
        const active = lang === code;
        const visible =
          variant === "bracket" ? `[ ${code.toUpperCase()} ]` : code.toUpperCase();
        const accessibleName = `${visible}, ${LANG_ACCESSIBLE_NAMES[code]}`;
        const btnClass = `lang-nav-btn lang-nav-btn--${code} min-h-11 min-w-11 touch-manipulation px-1.5 sm:px-2 ${
          active ? "lang-nav-btn--active" : ""
        }`;

        if (surface === "orient") {
          return (
            <span key={code} className="inline-flex items-center gap-x-2 sm:gap-x-3">
              {index > 0 ? (
                <span className="lang-nav-sep select-none" aria-hidden="true">
                  ·
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  if (!active) onChange(code);
                }}
                className={btnClass}
                aria-label={accessibleName}
                aria-current={active ? "true" : undefined}
              >
                {visible}
              </button>
            </span>
          );
        }

        return (
          <span key={code} className="inline-flex items-center gap-x-2 sm:gap-x-3">
            {index > 0 ? (
              <span className="lang-nav-sep select-none" aria-hidden="true">
                ·
              </span>
            ) : null}
            <SignalControl
              type="button"
              direction="none"
              onClick={() => {
                if (!active) onChange(code);
              }}
              className={btnClass}
              aria-label={accessibleName}
              aria-current={active ? "true" : undefined}
            >
              {visible}
            </SignalControl>
          </span>
        );
      })}
    </nav>
  );
}
