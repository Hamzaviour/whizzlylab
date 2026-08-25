"use client";

import { motion } from "framer-motion";
import { Brain, Database, Workflow, ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import TextRevealOnScroll, { TextRevealWords } from "./TextRevealOnScroll";
import TiltCard from "./TiltCard";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
  tags: string[];
  link: string;
  delay: number;
};

function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
  accent,
  tags,
  link,
  delay,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className="group relative flex w-full flex-col"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: gradient }}
      />
      <TiltCard className="relative z-10 h-full w-full">
        <div className="liquid-glass relative flex h-full min-h-[360px] w-full flex-col justify-between rounded-[32px] border border-white/10 p-8 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center justify-between">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${accent}15`,
                  borderColor: `${accent}40`,
                  color: accent,
                }}
              >
                <Icon size={28} strokeWidth={2.2} />
              </div>
              <Link
                href={link}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-hero-sub transition hover:border-white/30 hover:bg-white/15 hover:text-white"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white" style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}>
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
              {description}
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-hero-sub/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

const cards: FeatureCardProps[] = [
  {
    title: "AI & ML Systems",
    description:
      "Custom neural models, multi-stage RAG agents, and Hugging Face deployments built for mission-critical production.",
    icon: Brain,
    gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
    accent: "#FF3D77",
    tags: ["RAG Agents", "Hugging Face", "LLM Fine-Tuning", "PyTorch"],
    link: "/services/ai",
    delay: 0.1,
  },
  {
    title: "Real-Time Data Pipelines",
    description:
      "Kafka, Spark, and PySpark streaming architectures that convert high-velocity event streams into real-time business decisions.",
    icon: Database,
    gradient: "linear-gradient(137deg, #00F0FF 0%, #7DD3FC 45%, #06B6D4 100%)",
    accent: "#00F0FF",
    tags: ["Apache Kafka", "Apache Spark", "Event Streaming", "MLOps"],
    link: "/services/data-pipelines",
    delay: 0.2,
  },
  {
    title: "Full-Stack Platforms",
    description:
      "Modern React, Next.js, and cloud-native applications with automated workflows, dashboards, and zero-downtime releases.",
    icon: Workflow,
    gradient: "linear-gradient(137deg, #6366f1 0%, #E0AEFF 45%, #F72585 100%)",
    accent: "#a855f7",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Microservices"],
    link: "/services/web-development",
    delay: 0.3,
  },
];

export default function FeatureCardsSection() {
  return (
    <section
      id="features"
      className="relative flex flex-col items-center justify-center px-4 py-20 font-sans sm:px-8 sm:py-32"
    >
      <div className="mb-16 max-w-3xl text-center">
        <TextRevealOnScroll
          as="p"
          className="text-xs tracking-[0.2em] text-cyan-400/80 uppercase font-semibold"
        >
          Core Capabilities
        </TextRevealOnScroll>
        <TextRevealWords
          text="Engineering precision for every layer of your stack"
          className="font-general mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl"
        />
        <p className="mt-4 text-base text-hero-sub/80 max-w-2xl mx-auto">
          We combine deep algorithmic AI expertise with production-grade full-stack architecture to turn complex concepts into reliable software.
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
        {cards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
