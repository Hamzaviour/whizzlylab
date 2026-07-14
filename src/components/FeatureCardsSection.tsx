"use client";

import { motion } from "framer-motion";
import { Brain, Database, Workflow, type LucideIcon } from "lucide-react";
import TextRevealOnScroll, { TextRevealWords } from "./TextRevealOnScroll";
import TiltCard from "./TiltCard";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  delay: number;
};

function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
  delay,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="group relative mx-auto flex w-full max-w-[min(100%,300px)] flex-col items-start justify-start md:max-w-[300px]"
    >
      <motion.div
        className="pointer-events-none absolute h-[260px] w-full rounded-[40px] opacity-60 md:h-[300px]"
        style={{ background: gradient, filter: "blur(45px)" }}
        whileHover={{ opacity: 0.85, scale: 1.04 }}
        transition={{ duration: 0.4 }}
      />
      <TiltCard className="relative z-10 w-full">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative h-[260px] w-full self-stretch overflow-hidden rounded-[40px] border-8 border-transparent md:h-[300px]"
          style={{
            background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`,
          }}
        >
          <div className="flex h-full w-full flex-col justify-between p-7">
            <motion.div
              className="text-white/90"
              whileHover={{ rotate: -8, scale: 1.1 }}
            >
              <Icon size={32} strokeWidth={2.5} />
            </motion.div>
            <div>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white">
                {title}
              </h3>
              <p className="text-[14px] leading-[1.6] font-normal text-gray-400 selection:bg-white/20">
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

const cards = [
  {
    title: "AI & ML Systems",
    description:
      "Custom models, RAG agents, and Hugging Face deployments built for production — not demos.",
    icon: Brain,
    gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
    delay: 0.1,
  },
  {
    title: "Data Pipelines",
    description:
      "Kafka, Spark, and PySpark streams that turn raw events into real-time intelligence.",
    icon: Database,
    gradient: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
    delay: 0.2,
  },
  {
    title: "Full-Stack Products",
    description:
      "React, Next.js, and Flask platforms with automation, dashboards, and cloud delivery.",
    icon: Workflow,
    gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
    delay: 0.3,
  },
];

export default function FeatureCardsSection() {
  return (
    <section
      id="features"
      className="relative flex min-h-[80vh] flex-col items-center justify-center bg-[#0A0A0B]/70 p-6 font-sans backdrop-blur-[1px] md:p-12"
    >
      <div className="mb-14 max-w-2xl text-center">
        <TextRevealOnScroll
          as="p"
          className="text-xs tracking-[0.2em] text-white/40 uppercase"
        >
          Capabilities
        </TextRevealOnScroll>
        <TextRevealWords
          text="Three pillars of Whizzly Lab"
          className="font-general mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl"
        />
      </div>

      <div className="grid w-full max-w-[936px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-3 lg:gap-3">
        {cards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
