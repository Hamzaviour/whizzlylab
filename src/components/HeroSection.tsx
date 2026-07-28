"use client";

import ModernNavbar from "./ModernNavbar";
import HeroVideoBackground from "./HeroVideoBackground";
import ProTextType from "./ProTextType";
import LogoMarquee from "./LogoMarquee";
import MagneticButton from "./MagneticButton";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    >
      <HeroVideoBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[527px] w-[984px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-visible bg-gray-950 opacity-90 blur-[82px]"
      />

      <div className="relative z-10 flex w-full flex-1 flex-col justify-between">
        <ModernNavbar />

        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          {/* ── 3D Floating Logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="perspective-[1200px] mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="relative"
            >
              {/* Outer ambient glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -m-8 rounded-full opacity-50 blur-[64px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(168,85,247,0.45) 0%, rgba(99,102,241,0.3) 40%, transparent 70%)",
                }}
              />
              {/* Inner focused glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -m-3 rounded-full opacity-60 blur-[32px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,240,255,0.35) 0%, rgba(168,85,247,0.2) 50%, transparent 75%)",
                }}
              />
              {/* Bottom reflection / ground glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full opacity-40 blur-[28px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(0,240,255,0.4))",
                }}
              />
              <Image
                src="/logo-full.png"
                alt="Whizzly Lab"
                width={520}
                height={180}
                className="relative z-10 h-20 max-w-[min(100%,280px)] w-auto object-contain sm:h-36 sm:max-w-none md:h-44 lg:h-52"
                style={{
                  filter:
                    "drop-shadow(0 0 24px rgba(0,240,255,0.5)) drop-shadow(0 0 60px rgba(168,85,247,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.6))",
                }}
                priority
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-general text-[clamp(2.4rem,12vw,140px)] leading-[1.05] font-normal tracking-[-0.024em]"
          >
            <span>Whizzly </span>
            <span className="bg-gradient-to-l from-[#6366f1] via-[#a855f7] to-[#fcd34d] bg-clip-text text-transparent">
              Lab
            </span>
          </motion.h1>

          <div className="mt-[9px] max-w-md">
            <ProTextType
              as="p"
              className="text-[hsl(var(--hero-sub))] text-base leading-7 opacity-80 whitespace-pre-line sm:text-xl sm:leading-8"
              text="Intelligent AI systems. Real-time data pipelines. Production-grade full-stack products."
              speed={18}
              delay={350}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-[25px] flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
          >
            <MagneticButton href="/schedule">
              <span className="inline-flex w-full items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 px-6 py-4 text-base font-semibold transition-all hover:bg-foreground/20 sm:w-auto sm:px-[29px] sm:py-[24px]">
                Schedule a Consult
              </span>
            </MagneticButton>
            <MagneticButton href="/#work" strength={0.25}>
              <span className="inline-flex w-full items-center justify-center rounded-full border border-foreground/20 bg-transparent px-6 py-3.5 text-sm font-medium text-foreground/85 transition-all hover:bg-foreground/10 hover:text-foreground sm:w-auto sm:px-7 sm:py-4">
                View Case Studies
              </span>
            </MagneticButton>
          </motion.div>
        </main>

        <LogoMarquee />
      </div>
    </div>
  );
}
