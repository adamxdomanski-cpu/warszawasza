import type { NarrativeStep, TruthPhase } from "../../lib/metaI18n";

type NarrativeFlowProps = {
  steps: NarrativeStep[];
  phase: TruthPhase;
};

function activeStepIndex(phase: TruthPhase): number {
  switch (phase) {
    case "false":
      return 1;
    case "spark":
      return 2;
    case "wave":
      return 0;
    case "diamond":
      return 3;
    case "true":
      return 3;
    default:
      return 0;
  }
}

export default function NarrativeFlow({ steps, phase }: NarrativeFlowProps) {
  const activeIdx = activeStepIndex(phase);

  return (
    <aside className="metaNarrativeFlow" aria-label="Narrative flow">
      {steps.map((step, index) => (
        <div
          key={`${step.head}-${step.tail}`}
          className={`metaNarrativeBlock${
            index === activeIdx ? " metaNarrativeBlockActive" : ""
          }`}
        >
          <div className="metaNarrativeHead">{step.head}</div>
          <div className="metaNarrativeArrow">↓</div>
          <div className="metaNarrativeTail">{step.tail}</div>
        </div>
      ))}
    </aside>
  );
}
