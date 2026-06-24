type Props = {
  domain: string;
  fieldLabel: string;
  fieldPhase: string;
};

export function MobileStatusBar({ domain, fieldLabel, fieldPhase }: Props) {
  return (
    <div className="safe-top sticky top-0 z-40 border-b border-white/10 bg-[#050505]/92 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between px-4 py-3 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.28em] text-white/45">
        <span className="truncate text-white/60">{domain}</span>
        <span className="shrink-0 pl-2">
          {fieldLabel}{" "}
          <span className="text-lime-300">{fieldPhase}</span>
        </span>
      </div>
    </div>
  );
}
