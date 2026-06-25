import type { Metadata } from "next";
import PmFiraLearn from "../components/PmFiraLearn";

export const metadata: Metadata = {
  title: "PM · FIRA | WARSZAWASZA · OBSERWACJA TRWA",
  description:
    "Mapowanie faz zarządzania projektami do łańcucha obserwacji FIRA — moduł edukacyjny dystrybucji WARSZAWASZA.",
};

export default function LearnPage() {
  return <PmFiraLearn />;
}
