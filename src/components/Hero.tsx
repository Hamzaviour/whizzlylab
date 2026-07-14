"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import LetterReveal from "./LetterReveal";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMesh = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-32"
    >
      <div className="grid-bg absolute inset-0 z-0 opacity-60" />
      <motion.div
        style={{ y: yMesh }}
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
      >
        <Image
          src="/neural-mesh.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-deep)]/40 to-[var(--bg-deep)]" />
      </motion.div>

      <div className="glow-orb left-[15%] top-[25%] h-64 w-64 bg-[var(--purple)]/20" />
      <div className="glow-orb right-[12%] top-[40%] h-72 w-72 bg-[var(--blue)]/18" />

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cyan)]/25 bg-[var(--cyan)]/5 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-[var(--cyan)] uppercase sm:text-xs">
              AI · Neural Systems · Automation
            </span>
          </motion.div>

          <h1 className="font-[family-name:var(--font-grotesk)] text-[2.6rem] leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[4.75rem]">
            <LetterReveal text="Intelligent Solutions." className="block" />
            <span className="mt-1 block text-[var(--text-secondary)] sm:mt-2">
              <LetterReveal text="Built for production." delay={0.5} />
            </span>
          </h1>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Whizzly Lab designs end-to-end AI systems, data pipelines, and full-stack
            products for teams that need more than a prototype.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton href="#services">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0a0f] transition hover:bg-white/90">
                Explore services
                <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <MagneticButton href="#cases">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.06]">
                View case studies
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/[0.08] pt-10"
          >
            {[
              { value: "15+", label: "Systems shipped" },
              { value: "4", label: "Core practices" },
              { value: "24/7", label: "Live pipelines" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[family-name:var(--font-grotesk)] text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[11px] tracking-wide text-[var(--text-muted)] sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
