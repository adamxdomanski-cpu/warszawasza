type CardProps = {
  title: string;
  text: string;
  index: number;
};

export function MythCard({ title, text, index }: CardProps) {
  return (
    <article
      className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition duration-500 hover:border-[#E40045]/40 hover:bg-white/[0.04]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E40045]/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.45em] text-white/30">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mb-4 text-sm font-bold tracking-[0.35em] text-[#E40045]">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/65 md:text-base">
        {text}
      </p>
    </article>
  );
}
