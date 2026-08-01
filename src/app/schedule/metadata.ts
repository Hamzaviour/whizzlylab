import type { Metadata } from "next";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Schedule a Consult — Whizzly Lab | AI Strategy Call",
  description:
    "Book a 20–30 minute discovery call with Whizzly Lab. Discuss your AI, ML, or full-stack project and get scope + budget clarity. From Lahore, shipping globally.",
  alternates: {
    canonical: `${BASE_URL}/schedule`,
  },
  robots: "noindex, follow",
  openGraph: {
    title: "Schedule a Consult — Whizzly Lab",
    description: "Book a strategy call for your AI or full-stack project.",
    url: `${BASE_URL}/schedule`,
    images: [ogImage()],
  },
  twitter: {
    title: "Schedule a Consult — Whizzly Lab",
    description: "Book a discovery call with Whizzly Lab.",
    images: [ogImage()],
  },
};
