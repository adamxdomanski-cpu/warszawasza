export default function GrapheneField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <pre className="animate-breathe m-0 select-none whitespace-pre font-mono-field text-[clamp(10px,2.8vw,14px)] leading-tight tracking-wide text-accent/10">
        {`·   ·     ·
 \\ / \\   /
  ·---·
 /     \\
·       ·`}
      </pre>
    </div>
  );
}
