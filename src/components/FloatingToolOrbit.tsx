"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  Code2,
  Sparkles,
  Folder,
  GitMerge,
  Database,
  Cpu,
  Braces,
} from "lucide-react";

const tools = [
  { Icon: Terminal, x: "6%", y: "28%", delay: 0 },
  { Icon: Code2, x: "88%", y: "24%", delay: 0.4 },
  { Icon: Sparkles, x: "12%", y: "62%", delay: 0.8 },
  { Icon: Folder, x: "84%", y: "58%", delay: 1.1 },
  { Icon: GitMerge, x: "4%", y: "48%", delay: 0.2 },
  { Icon: Database, x: "92%", y: "42%", delay: 0.6 },
  { Icon: Cpu, x: "18%", y: "18%", delay: 1.3 },
  { Icon: Braces, x: "78%", y: "72%", delay: 0.9 },
];

/** Antigravity-inspired floating tool chips around the hero */
export default function FloatingToolOrbit() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3] hidden overflow-hidden lg:block"
    >
      {tools.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0c0c14]/80 text-[var(--cyan)] shadow-[0_0_24px_rgba(0,240,255,0.12)] backdrop-blur-md"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{
            opacity: [0.55, 1, 0.55],
            scale: [1, 1.06, 1],
            y: [0, -14, 0],
            rotate: [0, i % 2 === 0 ? 6 : -6, 0],
          }}
          transition={{
            opacity: { duration: 4 + i * 0.3, repeat: Infinity, delay },
            scale: { duration: 4 + i * 0.3, repeat: Infinity, delay },
            y: { duration: 5.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay },
            rotate: { duration: 7 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay },
          }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </motion.div>
      ))}

      {/* Soft “agent cursor” that drifts — Antigravity liftoff cue */}
      <motion.div
        className="absolute top-[42%] left-[50%] h-8 w-8 -translate-x-1/2"
        animate={{
          x: [0, 120, -80, 40, 0],
          y: [0, -60, 40, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-full w-full rounded-full border border-[var(--cyan)]/40 bg-[var(--cyan)]/10 shadow-[0_0_30px_rgba(0,240,255,0.35)]"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cyan)]" />
      </motion.div>
    </div>
  );
}
