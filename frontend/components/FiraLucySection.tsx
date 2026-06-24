type Props = {
  firaLabel: string;
  firaRole: string;
  firaText: string;
  lucyLabel: string;
  lucyRole: string;
  lucyText: string;
  designNote: string;
};

export function FiraLucySection({
  firaLabel,
  firaRole,
  firaText,
  lucyLabel,
  lucyRole,
  lucyText,
  designNote,
}: Props) {
  return (
    <section className="px-4 py-16 sm:px-6 md:px-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <article className="border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-[#E40045]">
            ⌖ {firaLabel} — {firaRole}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/75 md:text-xl">
            {firaText}
          </p>
        </article>

        <article className="border border-white/10 bg-[#111111] p-8 md:p-10">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-white/55">
            ⚡ {lucyLabel} — {lucyRole}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/75 md:text-xl">
            {lucyText}
          </p>
        </article>
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm italic text-white/35 md:text-base">
        {designNote}
      </p>
    </section>
  );
}
