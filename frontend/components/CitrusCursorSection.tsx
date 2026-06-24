type Props = {
  title: string;
  notLine: string;
  isLine: string;
  traceNote: string;
};

export function CitrusCursorSection({
  title,
  notLine,
  isLine,
  traceNote,
}: Props) {
  return (
    <section className="border-y border-[#E40045]/20 bg-[#0a0a0a] px-4 py-16 sm:px-6 md:px-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.5em] text-[#E40045]/70">
          ` {title}
        </p>

        <div className="space-y-6 border-l-2 border-white/10 pl-6 md:pl-10">
          <p className="text-base text-white/40 line-through decoration-[#E40045]/50 md:text-lg">
            {notLine}
          </p>
          <p className="text-xl font-medium leading-relaxed text-white/90 md:text-2xl lg:text-3xl">
            {isLine}
          </p>
        </div>

        <div
          className="mt-10 h-px w-full max-w-md bg-gradient-to-r from-[#E40045] via-white/20 to-transparent"
          aria-hidden
        />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-white/25">
          {traceNote}
        </p>
      </div>
    </section>
  );
}
