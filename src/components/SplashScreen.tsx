"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export const SPLASH_DONE_EVENT = "whizzly-splash-done";
const DISPLAY_MS = 5000;
const FADE_MS = 1000;
const STORAGE_KEY = "whizzly-splash-seen";

function finishSplash() {
  document.documentElement.style.overflow = "";
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(SPLASH_DONE_EVENT));
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [armed, setArmed] = useState(false);
  const [phase, setPhase] = useState<"intro" | "logo" | "text" | "progress" | "done">("intro");
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setVisible(false);
        window.dispatchEvent(new CustomEvent(SPLASH_DONE_EVENT));
        return;
      }
    } catch {
      /* private mode */
    }
    setArmed(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    type P = { x: number; y: number; r: number; vx: number; vy: number; color: string; alpha: number };
    let particles: P[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const COLORS = ["#1268E8", "#00f0ff", "#6366f1", "#a855f7", "#fcd34d"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      const count = Math.min(80, Math.floor((w * h) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    spawn();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Phase timing
  useEffect(() => {
    if (!armed || !visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const t1 = window.setTimeout(() => setPhase("logo"), 400);
    const t2 = window.setTimeout(() => setPhase("text"), 1800);
    const t3 = window.setTimeout(() => setPhase("progress"), 3000);

    const startExit = () => {
      setExiting(true);
      window.setTimeout(() => {
        setVisible(false);
        finishSplash();
      }, reduce ? 0 : FADE_MS);
    };

    const timer = window.setTimeout(startExit, reduce ? 2000 : DISPLAY_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [armed, visible]);

  // Progress animation
  useEffect(() => {
    if (phase !== "progress" || exiting) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 600 : 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      progressRef.current = Math.min(1, elapsed / duration);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, exiting]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="splash-screen"
          role="presentation"
          aria-live="polite"
          initial={{ opacity: 1 }}
          animate={
            exiting
              ? { opacity: 0, scale: 1.03, filter: "blur(10px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex min-h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 42%, #0a0e2a 0%, #05010f 55%, #020010 100%)",
          }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Ambient glow */}
          <div aria-hidden className="pointer-events-none absolute top-[36%] left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[480px] sm:w-[480px] md:h-[600px] md:w-[600px]"
            style={{
              background: "radial-gradient(circle, rgba(18,104,232,0.45) 0%, rgba(99,102,241,0.22) 35%, rgba(168,85,247,0.08) 60%, transparent 80%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
            {/* Logo */}
            <motion.div
              className="relative ml-[3vw]"
              initial={{ opacity: 0, scale: 0.3, rotateY: -60 }}
              animate={
                phase === "logo" || phase === "text" || phase === "progress"
                  ? { opacity: 1, scale: 1, rotateY: 0 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{
                scale: { duration: 1.1, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] },
                rotateY: { duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {/* Pulsing glow behind logo */}
              {(phase === "logo" || phase === "text" || phase === "progress") && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 -m-6 rounded-full blur-2xl"
                  style={{
                    background: "radial-gradient(circle, rgba(18,104,232,0.7) 0%, rgba(99,102,241,0.35) 35%, transparent 65%)",
                  }}
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                    scale: [1, 1.12, 1],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <Image
                src="/transparent-icon.png"
                alt="Whizzly Lab"
                width={240}
                height={240}
                className="relative z-10 h-48 w-auto max-w-[min(100%,240px)] object-contain sm:h-56 md:h-64 lg:h-72"
                priority
              />
            </motion.div>

            {/* Brand text — WHIZZLY LAB */}
            <motion.h1
              initial={{ opacity: 0, y: 28, letterSpacing: "0.35em" }}
              animate={
                phase === "text" || phase === "progress"
                  ? { opacity: 1, y: 0, letterSpacing: "0.14em" }
                  : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-[clamp(1.3rem,6vw,3.6rem)] font-extrabold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}
            >
              <span
                style={{
                  color: "#1268E8",
                  textShadow: "0 0 30px rgba(18,104,232,1), 0 0 70px rgba(99,102,241,0.7), 0 0 100px rgba(18,104,232,0.4)",
                }}
              >
                WHIZZLY{" "}
              </span>
              <span
                style={{
                  color: "#1268E8",
                  textShadow: "0 0 30px rgba(18,104,232,1), 0 0 70px rgba(99,102,241,0.7), 0 0 100px rgba(18,104,232,0.4)",
                }}
              >
                LAB
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={phase === "text" || phase === "progress" ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-1.5 text-[clamp(0.6rem,2vw,0.9rem)] font-semibold tracking-[0.2em] text-white/90"
              style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 0 16px rgba(18,104,232,0.6)" }}
            >
              WELCOME TO WHIZZLY LAB
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase === "progress" ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-0.5 text-[clamp(0.45rem,1.2vw,0.65rem)] tracking-[0.28em] text-white/80"
              style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 0 12px rgba(0,240,255,0.5)" }}
            >
              WHERE INNOVATION MEETS EXTRAORDINARY THINKING
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase === "progress" ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex w-full max-w-xs flex-col items-center gap-2 sm:max-w-sm"
            >
              <span className="text-[10px] tracking-[0.28em] text-white/85" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 0 8px rgba(18,104,232,0.5)" }}>
                {phase === "progress" ? "INITIALIZING EXPERIENCE" : phase === "text" ? "PREPARING" : "LOADING"}
              </span>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #1268E8, #00f0ff, #6366f1, #a855f7)",
                    boxShadow: "0 0 12px rgba(18,104,232,0.8), 0 0 24px rgba(0,240,255,0.4)",
                    width: `${progressRef.current * 100}%`,
                  }}
                  animate={phase === "progress" ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.7 }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
