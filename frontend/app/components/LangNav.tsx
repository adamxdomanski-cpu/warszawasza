"use client";

import { LANGS, LANG_ACCESSIBLE_NAMES, type Lang } from "../../lib/i18n";
import SignalControl from "./SignalControl";

type LangNavProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  variant?: "bracket" | "plain";
  surface?: "field" | "orient";
  /** Defaults to all field languages. */
  langs?: readonly Lang[];
};

export default function LangNav({
  lang,
  onChange,
  variant = "plain",
  surface = "field",
  langs = LANGS,
}: LangNavProps) {
  const bracket = variant === "bracket";

  return (
    <nav
      className={`lang-nav flex max-w-full flex-wrap items-center justify-end gap-x-1.5 gap-y-1 font-mono-field text-xs tracking-wide sm:gap-x-2 sm:text-sm md:text-base${
        surface === "orient" ? " lang-nav--orient" : ""
      }${bracket ? " lang-nav--bracket" : ""}`}
      aria-label="Language"
    >
      {langs.map((code, index) => {
        const active = lang === code;
        const visible = bracket ? `[ ${code.toUpperCase()} ]` : code.toUpperCase();
        const accessibleName = `${visible}, ${LANG_ACCESSIBLE_NAMES[code]}`;
        const btnClass = `lang-nav-btn lang-nav-btn--${code} min-h-11 touch-manipulation px-1 sm:px-1.5 md:px-2 ${
          active ? "lang-nav-btn--active" : ""
        }`;
        const showSepBefore = index > 0 || bracket;

        if (surface === "orient") {
          return (
            <span key={code} className="inline-flex items-center gap-x-1.5 sm:gap-x-2">
              {showSepBefore ? (
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
          <span key={code} className="inline-flex items-center gap-x-1.5 sm:gap-x-2">
            {showSepBefore ? (
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
