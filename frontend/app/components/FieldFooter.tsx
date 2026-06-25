import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";

type FieldFooterProps = {
  lang: Lang;
};

/** Provenance strip — workshop credit, instrument-quiet. */
export default function FieldFooter({ lang }: FieldFooterProps) {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-20 px-5 py-2.5 sm:px-8">
      <p className="m-0 text-right font-mono-field text-[10px] leading-snug tracking-[0.12em] text-[var(--color-lang-idle)] sm:text-[11px]">
        {COPY[lang].workshopCredit}
      </p>
    </footer>
  );
}
