import type { ReactNode } from "react";
import FieldBackdrop from "../components/FieldBackdrop";
import GrapheneField from "../components/GrapheneField";
import "../components/meta-hud.css";

export default function MetaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-field text-ink">
      <GrapheneField />
      <FieldBackdrop />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(8,8,10,0.42), transparent 58%), radial-gradient(circle at 18% 8%, rgba(228,0,69,0.06), transparent 40%)",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
