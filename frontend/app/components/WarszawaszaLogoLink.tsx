import Link from "next/link";

type WarszawaszaLogoLinkProps = {
  label: string;
  variant?: "field" | "default";
  className?: string;
};

export default function WarszawaszaLogoLink({
  label,
  variant = "default",
  className = "",
}: WarszawaszaLogoLinkProps) {
  const baseClass =
    variant === "field"
      ? "inline-flex items-center gap-2 font-mono-field text-xs tracking-[0.14em] text-accent/70 uppercase hover:text-accent sm:text-sm"
      : "font-mono-field text-sm tracking-[0.12em] text-accent/70 hover:text-accent";

  return (
    <Link href="/" className={`${baseClass} ${className}`.trim()}>
      <span aria-hidden="true">◉</span>
      {label}
    </Link>
  );
}
