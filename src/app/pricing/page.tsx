import type { Metadata } from "next";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import PricingContent from "@/components/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Whizzly Lab",
  description:
    "Whizzly Lab Pakistan-market pricing for websites, AI & ML, automation, mobile apps, analytics, computer vision, data pipelines and business solutions — in PKR and USD.",
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