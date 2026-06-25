import type { TruthPhase } from "../../lib/metaI18n";

const GRAFEN_ART = `·   ·     ·
 \\ / \\   /
  ·---·
 /     \\
·       ·`;

type GrafenGraphProps = {
  phase: TruthPhase;
  label?: string;
};

export default function GrafenGraph({ phase, label = "GRAFEN" }: GrafenGraphProps) {
  return (
    <aside className={`metaGrafen metaGrafen${phase}`} aria-hidden="true">
      <pre className="metaGrafenArt">{GRAFEN_ART}</pre>
      <span className="metaGrafenLabel">{label}</span>
    </aside>
  );
}
