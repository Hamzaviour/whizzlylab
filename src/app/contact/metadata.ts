import type { Metadata } from "next";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Whizzly Lab | Get in Touch",
  description:
    "Reach Whizzly Lab for AI, ML, and full-stack engineering projects. Email or WhatsApp — we reply within 24 hours from Lahore, shipping globally.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact — Whizzly Lab",
    description: "Get in touch with Whizzly Lab — AI engineering studio.",
    url: `${BASE_URL}/contact`,
    images: [ogImage()],
  },
  twitter: {
    title: "Contact — Whizzly Lab",
    description: "Reach Whizzly Lab for AI & full-stack projects.",
    images: [ogImage()],
  },
};
