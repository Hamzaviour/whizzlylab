"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 180, x: "8%", y: "18%", color: "rgba(138,43,226,0.12)", delay: 0 },
  { size: 120, x: "78%", y: "22%", color: "rgba(43,89,255,0.14)", delay: 0.4 },
  { size: 90, x: "70%", y: "68%", color: "rgba(0,240,255,0.1)", delay: 0.8 },
  { size: 140, x: "12%", y: "72%", color: "rgba(43,89,255,0.1)", delay: 1.2 },
];

export default function MotionObjects() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: s.color,
          }}
          animate={{
            y: [0, -18, 8, 0],
            x: [0, 10, -6, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 14 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}

      <motion.div
        className="absolute top-[28%] right-[12%] h-40 w-40 rounded-full border border-[var(--cyan)]/15"
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.12, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[28%] right-[12%] h-40 w-40 translate-x-4 translate-y-4 rounded-full border border-[var(--purple)]/12"
        animate={{ scale: [1.05, 1.28, 1.05], opacity: [0.28, 0.08, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[10%] h-28 w-28 rounded-full border border-[var(--blue)]/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={`dot-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--cyan)]"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 22}%`,
          }}
          animate={{
            y: [0, -24 - i * 4, 0],
            opacity: [0.15, 0.55, 0.15],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 5.5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
