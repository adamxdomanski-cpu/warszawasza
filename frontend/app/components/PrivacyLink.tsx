import Link from "next/link";
import { privacyCopy } from "../../lib/privacyCopy";
import type { Lang } from "../../lib/i18n";

type PrivacyLinkProps = {
  lang: Lang;
  className?: string;
};

export default function PrivacyLink({ lang, className }: PrivacyLinkProps) {
  const label = privacyCopy(lang).navLabel;
  return (
    <Link
      href="/prywatnosc"
      className={`touch-manipulation underline-offset-4 hover:underline ${className ?? ""}`}
    >
      {label}
    </Link>
  );
}
