import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";

const FOOTER_ARTIFACTS = [
  { key: "fira", href: "/artefacts/fira" },
  { key: "lucy", href: "/" },
  { key: "diamente", href: "/artefacts/diamente" },
  { key: "shafir", href: "/artefacts/shafir" },
  { key: "lustra", href: "/artefacts/lustra" },
  { key: "griffin", href: "/artefacts/griffin" },
] as const;

type FieldFooterProps = {
  lang: Lang;
};

export default function FieldFooter({ lang }: FieldFooterProps) {
  const narrative = COPY[lang].narrative;

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-20 hidden border-t border-accent-muted/40 bg-field/90 px-6 py-2.5 backdrop-blur-[2px] lg:block"
      aria-label="Field symbols"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono-field text-[11px] tracking-[0.14em] text-accent/55 sm:text-xs">
        {FOOTER_ARTIFACTS.map(({ key, href }) => {
          const item =
            key === "lucy"
              ? { symbol: "●", name: "LUCY" }
              : {
                  symbol: narrative[key as keyof typeof narrative].symbol,
                  name: narrative[key as keyof typeof narrative].name.toUpperCase(),
                };
          return (
            <Link
              key={key}
              href={href}
              className="inline-flex min-h-8 items-center gap-1.5 touch-manipulation"
            >
              <span className="text-accent/75">{item.symbol}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
