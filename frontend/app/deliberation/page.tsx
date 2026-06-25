import type { Metadata } from "next";
import GrapheneVote from "../components/GrapheneVote";

export const metadata: Metadata = {
  title: "Deliberation | WARSZAWASZA · OBSERWACJA TRWA",
  description:
    "Transparent graphene deliberation instrument — auditable FOP notation, not official election voting.",
};

export default function DeliberationPage() {
  return <GrapheneVote />;
}
