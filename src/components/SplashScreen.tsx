"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const SPLASH_DONE_EVENT = "whizzly-splash-done";
const DISPLAY_MS = 2200;
const FADE_MS = 900;
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

/**
 * Clean first-visit splash — then lifts / fades into the home page.
 */
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [armed, setArmed] = useState(false);

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

  useEffect(() => {
    if (!armed || !visible) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startExit = () => {
      setExiting(true);
      window.setTimeout(() => {
        setVisible(false);
        finishSplash();
      }, reduce ? 0 : FADE_MS);
    };

    const hold = reduce ? 350 : DISPLAY_MS;
    const timer = window.setTimeout(startExit, hold);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [armed, visible]);

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
              ? { opacity: 0, y: "-8%", filter: "blur(12px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex min-h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden bg-[hsl(260_87%_3%)]"
        >
          {/* Soft ambient — minimal */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[42%] left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[90px] sm:h-80 sm:w-80"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={
                exiting
                  ? { opacity: 0, y: -28 }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: exiting ? 0.55 : 0.75,
                delay: exiting ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-lg text-[1.75rem] leading-[1.15] font-normal tracking-tight text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Welcome to{" "}
              <span className="italic">
                Whizzly
                <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] bg-clip-text text-transparent">
                  Lab
                </span>
                !
              </span>
            </motion.h1>

            {armed && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.4 }}
                animate={
                  exiting
                    ? { opacity: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-10 h-px w-24 origin-center overflow-hidden rounded-full bg-white/12 sm:w-32"
              >
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: exiting ? 1 : 1 }}
                  transition={{
                    duration: DISPLAY_MS / 1000,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
