import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, getAllServiceSlugs } from "@/lib/services";
import ServiceDetail from "@/components/ServiceDetail";

import { BASE_URL, ogImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service — Whizzly Lab" };
  const canonicalUrl = `${BASE_URL}/services/${slug}`;
  return {
    title: `${service.title} — Whizzly Lab | Engineering Studio`,
    description: service.short,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} — Whizzly Lab`,
      description: service.short,
      url: canonicalUrl,
      images: [
        {
          url: ogImage("/og-image.png"),
          width: 1200,
          height: 630,
          alt: `${service.title} — Whizzly Lab`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — Whizzly Lab`,
      description: service.short,
      images: [ogImage("/og-image.png")],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
