import type { Metadata } from "next";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Schedule a Consult — Whizzly Lab | AI Strategy Call",
  description:
    "Book a 20–30 minute discovery call with Whizzly Lab. Discuss your AI, ML, or full-stack project and get scope + budget clarity — shipping globally.",
  alternates: {
    canonical: `${BASE_URL}/schedule`,
  },
  openGraph: {
    title: "Schedule a Consult — Whizzly Lab",
    description: "Book a strategy call for your AI or full-stack project with Whizzly Lab.",
    url: `${BASE_URL}/schedule`,
    images: [
      {
        url: ogImage("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Schedule a Consult — Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a Consult — Whizzly Lab",
    description: "Book a discovery call with Whizzly Lab.",
    images: [ogImage("/og-image.png")],
  },
};
