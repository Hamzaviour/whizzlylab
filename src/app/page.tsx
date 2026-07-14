import HeroSection from "@/components/HeroSection";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import ServiceCarousel3D from "@/components/ServiceCarousel3D";
import CaseStudies from "@/components/CaseStudies";
import BenefitsSection from "@/components/BenefitsSection";
import CtaFooter from "@/components/CtaFooter";
import ThreeNeuralField from "@/components/ThreeNeuralField";
import PricingCalculator from "@/components/PricingCalculator";
import CursorParticles from "@/components/CursorParticles";
import { TextRevealWords } from "@/components/TextRevealOnScroll";
import Link from "next/link";

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

          <section
            id="pricing"
            className="bg-transparent px-4 py-16 sm:px-8 md:px-16 md:py-28"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                <p className="font-mono text-xs tracking-widest text-foreground/45 uppercase">
                  Pricing · PKR
                </p>
                <TextRevealWords
                  text="Packages from PKR 15,000"
                  className="font-general mt-3 text-3xl font-normal md:text-4xl lg:text-5xl"
                />
                <p className="mx-auto mt-4 max-w-xl text-sm text-hero-sub/75">
                  Portfolio through enterprise — market ranges in PKR. Fine-tune
                  with the estimator, or{" "}
                  <Link
                    href="/pricing"
                    className="text-[#00F0FF] hover:underline"
                  >
                    view full pricing table
                  </Link>
                  .
                </p>
              </div>
              <PricingCalculator />
            </div>
          </section>

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
