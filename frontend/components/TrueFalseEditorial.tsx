import type { Dichotomy } from "../lib/copy";

type Props = {
  title: string;
  subtitle: string;
  dichotomies: Dichotomy[];
};

export function TrueFalseEditorial({ title, subtitle, dichotomies }: Props) {
  return (
    <section
      id="terminal"
      className="border-y border-white/10 bg-[#080808] px-4 py-16 sm:px-6 md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.5em] text-white/30">
          ` // {subtitle}
        </p>
        <h2 className="cursor-blink text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>

        <ul className="mt-12 space-y-6">
          {dichotomies.map((pair, index) => (
            <li
              key={`${pair.trueLabel}-${index}`}
              className="border border-white/10 bg-[#050505] p-5 sm:p-8"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-white/70">
                    {pair.trueLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                    {pair.trueText}
                  </p>
                </div>
                <div className="md:border-l md:border-white/10 md:pl-6">
                  <p className="mb-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-[#E40045]/80">
                    {pair.falseLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-white/45 sm:text-base">
                    {pair.falseText}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-[family-name:var(--font-mono)] text-xs text-white/25">
          <span className="pulse-glow mr-2 inline-block text-[#E40045]">⚡</span>
          awaiting_next_fragment…
        </p>
      </div>
    </section>
  );
}
