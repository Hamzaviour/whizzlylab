"use client";

import ModernNavbar from "./ModernNavbar";
import HeroVideoBackground from "./HeroVideoBackground";
import ProTextType from "./ProTextType";
import LogoMarquee from "./LogoMarquee";
import MagneticButton from "./MagneticButton";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

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
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "1200px" }}
            className="relative flex flex-col items-center"
          >
            {/* Ambient glow behind logo */}
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.45)_0%,rgba(168,85,247,0.25)_40%,rgba(0,240,255,0.12)_60%,transparent_80%)] blur-2xl sm:h-[400px] sm:w-[400px] md:h-[480px] md:w-[480px]" />
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-[50%] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.3)_0%,rgba(99,102,241,0.15)_60%,transparent_80%)] blur-xl sm:h-[260px] sm:w-[260px] md:h-[320px] md:w-[320px]" />

            {/* Cursor-following particles */}
            <HeroCursorParticles />

            {/* Logo */}
            <Image
              src="/transparent-icon.png"
              alt="Whizzly Lab"
              width={400}
              height={400}
              className="relative z-10 mb-6 mt-8 h-48 w-auto max-w-[min(100%,280px)] object-contain sm:mt-10 sm:mb-8 sm:h-56 sm:max-w-none md:h-64 lg:h-72"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[-20px] font-general text-[clamp(2.4rem,12vw,140px)] leading-[1.05] font-normal tracking-[-0.024em] sm:mt-[-24px]"
          >
            <span className="text-white">Whizzly</span>{" "}
            <span
              className="bg-gradient-to-br from-[#fcd34d] via-[#1268E8] to-[#a855f7] bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 40px rgba(18,104,232,0.5))" }}
            >
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

function HeroCursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; color: string };
    let particles: P[] = [];
    let w = 0;
    let h = 0;

    const COLORS = ["#6366f1", "#a855f7", "#00f0ff", "#60a5fa", "#c084fc"];

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (cx: number, cy: number) => {
      const count = 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        particles.push({
          x: cx + (Math.random() - 0.5) * 20,
          y: cy + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 2 + 1,
          life: 1,
          maxLife: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) {
        mouse.current.active = false;
        return;
      }
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      if (mouse.current.active) {
        spawn(mouse.current.x, mouse.current.y);
      }

      particles = particles.filter((p) => p.life > 0);
          for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.018;

        if (p.life <= 0) continue;

        const alpha = Math.max(0, p.life * 0.8);
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
