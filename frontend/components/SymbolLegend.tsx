import type { SymbolEntry } from "../lib/copy";

export function SymbolLegend({ symbols }: { symbols: SymbolEntry[] }) {
  return (
    <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
      {symbols.map((item) => (
        <div
          key={item.name}
          className="bg-[#0a0a0a] px-4 py-5 transition hover:bg-[#111]"
        >
          <p className="font-[family-name:var(--font-mono)] text-xl text-[#E40045] sm:text-2xl">
            {item.glyph}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/45">
            {item.name}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/55">
            {item.meaning}
          </p>
        </div>
      ))}
    </div>
  );
}
