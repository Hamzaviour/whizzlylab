import type { Metadata } from "next";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Whizzly Lab | Get in Touch",
  description:
    "Reach Whizzly Lab for AI, ML, and full-stack engineering projects. Email or WhatsApp — we reply within 24 hours, shipping globally.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact — Whizzly Lab | Get in Touch",
    description: "Get in touch with Whizzly Lab — AI, ML & full-stack engineering studio.",
    url: `${BASE_URL}/contact`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Contact Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Whizzly Lab | AI Engineering Studio",
    description: "Reach Whizzly Lab for AI & full-stack projects.",
    images: [ogImage("/og-image.png")],
  },
};
