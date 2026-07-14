"use client";

import { motion } from "framer-motion";

const tech = [
  "Python",
  "React",
  "Next.js",
  "PySpark",
  "Apache Spark",
  "Hugging Face",
  "Power BI",
  "Tableau",
  "Flask",
  "Git",
  "Kafka",
  "Docker",
  "LangChain",
  "AWS",
  "PostgreSQL",
  "Tailwind",
  "ChromaDB",
  "n8n",
];

export default function TechArsenal() {
  const row = [...tech, ...tech];

  return (
    <section id="tech" className="relative z-10 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-10 max-w-6xl px-4 text-center"
      >
        <p className="text-xs font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase">
          Stack
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-grotesk)] text-3xl font-medium tracking-tight text-white sm:text-5xl">
          Tools we master
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
          Production-proven stack spanning AI research, distributed systems, and polished
          product interfaces.
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-deep)] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-deep)] to-transparent sm:w-40" />

        <div className="animate-marquee flex w-max gap-4 py-2">
          {row.map((name, i) => (
            <motion.div
              key={`${name}-${i}`}
              whileHover={{ scale: 1.06, y: -4 }}
              className="glass flex h-14 shrink-0 items-center gap-3 rounded-2xl px-5 transition hover:border-[var(--blue)]/40 hover:shadow-[0_12px_30px_rgba(43,89,255,0.15)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--purple)] via-[var(--blue)] to-[var(--cyan)] text-xs font-bold text-white">
                {name.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-sm font-medium tracking-wide text-[var(--text-primary)]">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <div
          className="animate-marquee mt-4 flex w-max gap-4 py-2"
          style={{ animationDirection: "reverse", animationDuration: "48s" }}
        >
          {row.map((name, i) => (
            <div
              key={`rev-${name}-${i}`}
              className="glass flex h-14 shrink-0 items-center rounded-full border border-[var(--blue)]/10 px-6 text-sm text-[var(--text-secondary)]"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
