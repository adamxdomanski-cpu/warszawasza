import Link from "next/link";

type WarszawaszaLogoLinkProps = {
  label: string;
  variant?: "field" | "default";
};

export default function WarszawaszaLogoLink({ label, variant = "default" }: WarszawaszaLogoLinkProps) {
  const className =
    variant === "field"
      ? "inline-flex items-center gap-2 font-mono-field text-xs tracking-[0.14em] text-accent/70 uppercase hover:text-accent sm:text-sm"
      : "font-mono-field text-sm tracking-[0.12em] text-accent/70 hover:text-accent";

  return (
    <Link href="/" className={className}>
      <span aria-hidden="true">◉</span>
      {label}
    </Link>
  );
}
