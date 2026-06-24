import type { TopDrop } from "../lib/api";

type Props = {
  title: string;
  subtitle: string;
  revealLabel: string;
  revealingLabel: string;
  emptyLabel: string;
  loading: boolean;
  error: string | null;
  drops: TopDrop[] | null;
  onReveal: () => void;
};

function emotionTone(emotion: string): string {
  if (emotion === "COLLAPSE") return "text-[#E40045]";
  if (emotion === "SILENCE") return "text-white/55";
  return "text-white/80";
}

export function FieldWatch({
  title,
  subtitle,
  revealLabel,
  revealingLabel,
  emptyLabel,
  loading,
  error,
  drops,
  onReveal,
}: Props) {
  return (
    <section className="border-t border-white/10 bg-[#070707] px-4 py-16 sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-[#E40045]">
              ⌖ {title}
            </p>
            <p className="max-w-xl text-sm text-white/40">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onReveal}
            disabled={loading}
            className="min-h-[48px] w-full border border-white/15 px-6 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.32em] text-white/65 transition hover:border-[#E40045] hover:text-white disabled:opacity-40 sm:w-auto"
          >
            {loading ? revealingLabel : revealLabel}
          </button>
        </div>

        {error ? (
          <p className="font-[family-name:var(--font-mono)] text-sm text-[#E40045]">
            {error}
          </p>
        ) : null}

        {!drops && !error ? (
          <p className="max-w-lg text-white/35">{emptyLabel}</p>
        ) : null}

        {drops ? (
          <ol className="mt-8 space-y-0 border border-white/10">
            {drops.map((drop, index) => (
              <li
                key={drop.text}
                className="grid gap-3 border-b border-white/10 px-5 py-6 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8 md:px-8"
              >
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p
                    className={`font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.35em] ${emotionTone(drop.emotion)}`}
                  >
                    {drop.emotion} · {drop.channel}
                  </p>
                  <p className="mt-2 break-words text-lg font-medium tracking-tight text-white md:text-2xl">
                    {drop.text}
                  </p>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-white/30">
                  field_score {drop.scores.total_score}
                </p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
