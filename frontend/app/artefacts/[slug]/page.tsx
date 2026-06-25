import { notFound } from "next/navigation";
import ArtifactView from "../../components/ArtifactView";
import { ARTIFACT_SLUGS, isArtifactSlug } from "../../../lib/artifacts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ARTIFACT_SLUGS.map((slug) => ({ slug }));
}

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isArtifactSlug(slug)) notFound();
  return <ArtifactView slug={slug} />;
}
