import type { Metadata } from "next";
import MetaPerception from "../components/MetaPerception";

export const metadata: Metadata = {
  title: "Warszawasza Meta | OBSERWACJA TRWA",
  description:
    "Warstwa percepcji dla smart glasses. Uwaga jako wejście. Miasto jako tło.",
};

export default function MetaPage() {
  return <MetaPerception />;
}
