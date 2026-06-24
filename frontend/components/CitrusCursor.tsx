import type { CitrusMotifCopy } from "../lib/citrusMotif";

type Props = CitrusMotifCopy;

export function CitrusCursor({
  sectionTag,
  motifLabel,
  asciiPrimary,
  asciiAlt,
  flow,
  notLine,
  isLine,
  validationTitle,
  validationTrue,
  validationFalse,
  hudLabel,
  lexicon,
}: Props) {
  return (
    <section
      id="citrus-cursor"
      className="relative border-y border-[#E40045]/25 bg-[#080808] px-4 py-16 sm:px-6 md:px-16 md:py-24"
      aria-labelledby="citrus-cursor-heading"
    >
      <div className="hud-frame pointer-events-none absolute inset-4 border border-white/[0.06] sm:inset-8" />

      <div className="relative mx-auto max-w-5xl">
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-white/35">
          {sectionTag} — {motifLabel}
        </p>
        <p className="mt-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.35em] text-[#E40045]/80">
          {hudLabel}
        </p>

        {/* ASCII motif */}
        <div className="mt-12 overflow-x-auto">
          <p
            id="citrus-cursor-heading"
            className="citrus-ascii whitespace-nowrap font-[family-name:var(--font-mono)] text-[clamp(1.5rem,8vw,3.5rem)] leading-none tracking-[0.08em] text-white"
            aria-label={flow}
          >
            {asciiPrimary}
          </p>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-sm text-white/25 sm:text-base">
            {asciiAlt}
          </p>
        </div>

        {/* Visual trace: change → tail → crystal */}
        <div className="mt-10 flex items-center gap-0 sm:mt-14" aria-hidden>
          <span className="text-2xl text-[#E40045] sm:text-3xl">⚡</span>
          <div className="citrus-tail mx-2 h-px flex-1 max-w-xl sm:mx-4" />
          <span className="text-xl text-white/80 sm:text-2xl">◇</span>
        </div>
        <p className="mt-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.38em] text-white/30">
          {flow}
        </p>

        {/* Definition */}
        <div className="mt-12 space-y-5 border-l border-white/15 pl-6 md:mt-16 md:pl-10">
          <p className="text-base text-white/35 line-through decoration-[#E40045]/40 md:text-lg">
            {notLine}
          </p>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-white/90 md:text-2xl">
            {isLine}
          </p>
        </div>

        {/* TRUE / FALSE validation strip */}
        <div className="mt-12 border border-white/10 bg-[#050505] p-5 sm:p-8">
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.5em] text-white/40">
            {validationTitle}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="font-[family-name:var(--font-mono)] text-sm text-white/85 sm:text-base">
              <span className="mr-2 text-white/50">⌖</span>
              {validationTrue}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-sm text-white/45 sm:text-base">
              <span className="mr-2 text-[#E40045]/60">`</span>
              {validationFalse}
            </p>
          </div>
        </div>

        {/* Lexicon */}
        <ul className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {lexicon.map((item) => (
            <li key={item.name} className="bg-[#0a0a0a] px-4 py-5">
              <p className="font-[family-name:var(--font-mono)] text-lg text-[#E40045] sm:text-xl">
                {item.glyph}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">
                {item.name}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                {item.meaning}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
