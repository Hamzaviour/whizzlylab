import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import PricingContent from "@/components/PricingContent";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — Whizzly Lab | AI & Full-Stack Development Costs (PKR / USD)",
  description:
    "Transparent pricing for AI systems, machine learning, data pipelines, web development, automation, and full-stack products. Prices in PKR and USD. Founded by Hamza Younas in Lahore.",
  alternates: {
    canonical: `${BASE_URL}/pricing`,
  },
  openGraph: {
    title: "Pricing — Whizzly Lab",
    description: "Transparent pricing for AI, ML & full-stack engineering.",
    url: `${BASE_URL}/pricing`,
    images: [ogImage()],
  },
  twitter: {
    title: "Pricing — Whizzly Lab",
    description: "Transparent AI & full-stack pricing in PKR and USD.",
    images: [ogImage()],
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />
      <PricingContent />
      <CtaFooter />
    </main>
  );
}