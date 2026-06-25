import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";

type FieldFooterProps = {
  lang: Lang;
};

/** Minimal footer — instrument first, no universe lexicon on first screen. */
export default function FieldFooter({ lang }: FieldFooterProps) {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-20 hidden border-t border-accent-muted/30 bg-field/90 px-6 py-2 backdrop-blur-[2px] lg:block"
      aria-hidden="true"
    >
      <p className="m-0 text-center font-mono-field text-[10px] tracking-[0.16em] text-accent/35">
        {COPY[lang].observation}
      </p>
    </footer>
  );
}
