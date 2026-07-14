"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ScrollProgress from "./ScrollProgress";
import SplashScreen, { SPLASH_DONE_EVENT } from "./SplashScreen";

/**
 * Site-wide: splash handoff, scroll progress, soft cursor glow (desktop).
 */
export default function InteractiveShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const x = useSpring(mx, { stiffness: 120, damping: 28 });
  const y = useSpring(my, { stiffness: 120, damping: 28 });

  useEffect(() => {
    try {
      if (sessionStorage.getItem("whizzly-splash-seen")) {
        setContentReady(true);
      }
    } catch {
      /* wait for splash event */
    }

    const onDone = () => setContentReady(true);
    window.addEventListener(SPLASH_DONE_EVENT, onDone);
    return () => window.removeEventListener(SPLASH_DONE_EVENT, onDone);
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
    if (!fine || reduce) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[55] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen md:block"
          style={{
            x,
            y,
            background:
              "radial-gradient(circle, rgba(0,240,255,0.22) 0%, rgba(168,85,247,0.12) 35%, transparent 70%)",
          }}
        />
      )}
      <motion.div
        initial={false}
        animate={
          contentReady
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0.35, y: 18, filter: "blur(6px)" }
        }
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
