import type { Lang } from "../lib/copy";

const labels: Record<Lang, string> = {
  pl: "Język",
  en: "Language",
  it: "Lingua",
};

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export function LanguageToggle({ lang, onChange }: Props) {
  const options: Lang[] = ["pl", "en", "it"];

  return (
    <nav
      aria-label={labels[lang]}
      className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.35em] text-white/45"
    >
      {options.map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 ? <span className="text-white/20">/</span> : null}
          <button
            type="button"
            onClick={() => onChange(code)}
            className={`transition ${
              lang === code
                ? "text-[#E40045]"
                : "hover:text-white/80"
            }`}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </nav>
  );
}
