import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import { BASE_URL, ogImage } from "@/lib/seo";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import ServiceCarousel3D from "@/components/ServiceCarousel3D";
import CaseStudies from "@/components/CaseStudies";
import BenefitsSection from "@/components/BenefitsSection";
import CtaFooter from "@/components/CtaFooter";
import ThreeNeuralField from "@/components/ThreeNeuralField";
import HomePricing from "@/components/HomePricing";
import CursorParticles from "@/components/CursorParticles";
import { TextRevealWords } from "@/components/TextRevealOnScroll";
import ReviewsSection from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Whizzly Lab — AI, ML & Full-Stack Engineering Studio",
  description:
    "Whizzly Lab builds intelligent AI systems, real-time Kafka data pipelines, RAG agents, and production-grade full-stack products. Founded by AI engineer Hamza Younas — shipping globally.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship. Founded by Hamza Younas.",
    images: [ogImage()],
  },
  twitter: {
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship.",
    images: [ogImage()],
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

          <ReviewsSection />

          <section id="learning" className="relative px-4 py-20 sm:px-8 sm:py-32">
            <div className="liquid-glass relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-14 shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
              <ThreeNeuralField className="opacity-35" />
              <div className="relative z-10 max-w-3xl">
                <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400/90 uppercase">
                  Technical Enablement
                </span>
                <TextRevealWords
                  text="Custom Workshops & Engineering Mentorship"
                  className="font-general mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl"
                />
                <p className="mt-4 text-base leading-relaxed text-hero-sub/80 sm:text-lg">
                  Hands-on engineering workshops on production RAG systems, autonomous agent workflows, distributed Kafka/Spark streams, Hugging Face deployments, and MLOps best practices — led by AI engineer{" "}
                  <a
                    href="https://hamzayounas.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white underline underline-offset-4 hover:text-cyan-300"
                  >
                    Hamza Younas
                  </a>{" "}
                  (shipping globally).
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ Production RAG &amp; Vector Databases
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ Autonomous Multi-Agent Workflows
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ High-Throughput Kafka/Spark Pipelines
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-hero-sub/80">
                    ✦ Hugging Face &amp; MLOps Delivery
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="/schedule"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Request Team Workshop →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <CtaFooter />
        </div>
      </div>
    </main>
  );
}