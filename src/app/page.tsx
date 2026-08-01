import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import ServiceCarousel3D from "@/components/ServiceCarousel3D";
import CaseStudies from "@/components/CaseStudies";
import BenefitsSection from "@/components/BenefitsSection";
import CtaFooter from "@/components/CtaFooter";
import ThreeNeuralField from "@/components/ThreeNeuralField";
import HomePricing from "@/components/HomePricing";
import CursorParticles from "@/components/CursorParticles";
import { TextRevealWords } from "@/components/TextRevealOnScroll";

export const metadata: Metadata = {
  title: "Whizzly Lab — AI, ML & Full-Stack Engineering Studio",
  description:
    "Whizzly Lab builds intelligent AI systems, real-time Kafka data pipelines, RAG agents, and production-grade full-stack products. Founded by AI engineer Hamza Younas in Lahore — shipping globally.",
  alternates: {
    canonical: "https://whizzlylab.com",
  },
  openGraph: {
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship. Founded by Hamza Younas in Lahore.",
    images: ["https://whizzlylab.com/logo-og.jpg"],
  },
  twitter: {
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship.",
    images: ["https://whizzlylab.com/logo-og.jpg"],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <HeroSection />

      {/* Cursor-reactive particles behind all content below the hero */}
      <div className="relative">
          {/* Sticky full-viewport particle field while scrolling section content */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <CursorParticles />
            </div>
          </div>

        <div className="relative z-10">
          <FeatureCardsSection />

          <CaseStudies />

          <ServiceCarousel3D />

          <BenefitsSection />

          <HomePricing />

          <section id="learning" className="relative px-4 py-20 sm:px-8">
            <div className="liquid-glass relative mx-auto max-w-6xl overflow-hidden rounded-2xl p-8 sm:p-12">
              <ThreeNeuralField className="opacity-40" />
              <div className="relative z-10">
                <TextRevealWords
                  text="Enablement & workshops"
                  className="font-general text-3xl font-medium sm:text-4xl"
                />
                <p className="mt-4 max-w-2xl text-hero-sub/80">
                  Team enablement on RAG, agentic workflows, Kafka/Spark
                  pipelines, Hugging Face deployments, and production MLOps —
                  led by AI engineer{" "}
                  <a
                    href="https://hamzayounas.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Hamza Younas
                  </a>{" "}
                  (Lahore · shipping globally).
                </p>
              </div>
            </div>
          </section>

          <CtaFooter />
        </div>
      </div>
    </main>
  );
}