import type { ReactNode } from "react";

export default function ZapisLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-field text-ink">
      <div className="mx-auto min-h-dvh max-w-[480px] border-x border-accent/35 px-0 sm:border-accent/45">
        {children}
      </div>
    </div>
  );
}
