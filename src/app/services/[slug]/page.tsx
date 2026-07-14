import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getAllServiceSlugs } from "@/lib/services";
import ServiceDetail from "@/components/ServiceDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service — Whizzly Lab" };
  return {
    title: `${service.title} — Whizzly Lab`,
    description: service.short,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
