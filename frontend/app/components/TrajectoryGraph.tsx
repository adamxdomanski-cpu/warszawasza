import type { TruthPhase } from "../../lib/metaI18n";

const TRAJECTORY_ART = `A
     /
    /
   /
⚡
   \\
    \\
     \\
      B`;

type TrajectoryGraphProps = {
  phase: TruthPhase;
  label?: string;
};

export default function TrajectoryGraph({
  phase,
  label = "TRAJEKTORIA",
}: TrajectoryGraphProps) {
  return (
    <aside
      className={`metaTrajectory metaTrajectory${phase}`}
      aria-hidden="true"
    >
      <pre className="metaTrajectoryArt">{TRAJECTORY_ART}</pre>
      <span className="metaTrajectoryLabel">{label}</span>
    </aside>
  );
}
