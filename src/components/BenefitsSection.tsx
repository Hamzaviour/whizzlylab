"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative w-full bg-black/50 px-4 py-12 backdrop-blur-[1px] sm:px-6 sm:py-20 md:px-10"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <h2
            className="mb-12 text-center text-3xl font-light text-white sm:mb-24 sm:text-4xl md:text-5xl"
            style={{
              fontFamily: "'Futura Md BT Medium', system-ui, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            Key Benefits
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <Reveal delay={0.05}>
            <motion.div
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative h-[380px] cursor-default overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8"
            >
              <motion.div
                className="absolute top-1/2 -left-[420px] h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[#1e3a8a] opacity-40 blur-3xl"
                whileHover={{ opacity: 0.65, x: 40 }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="text-xl leading-tight font-light text-white sm:text-2xl">
                  Preemptive Risk
                  <br />
                  Detection & Response
                </h3>
                <p className="mt-12 max-w-[280px] text-[13px] leading-relaxed font-light text-white/70 sm:mt-20 sm:text-[14px]">
                  Whizzly Lab monitors streams, models, and system behaviors to
                  surface anomalies early — before they become production
                  failures.
                </p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-neutral-950 sm:h-[460px]"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ height: "75%" }}
              >
                <video
                  className="block h-full w-full object-cover transition duration-700 hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4"
                />
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
              </div>
              <div className="flex flex-1 items-center justify-start p-6 sm:p-8">
                <h3 className="text-left text-xl leading-tight font-light text-white sm:text-2xl">
                  Domain Know-how
                  <br />
                  & Sector Awareness
                </h3>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.18}>
            <motion.div
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative h-[380px] cursor-default overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8"
            >
              <motion.div
                className="absolute -top-28 -right-28 h-56 w-56 rounded-full bg-[#1e3a8a] opacity-40 blur-3xl"
                whileHover={{ opacity: 0.7, scale: 1.15 }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="text-xl leading-tight font-light text-white sm:text-2xl">
                  Production AI
                  <br />
                  That Ships
                </h3>
                <p className="mt-auto max-w-[320px] text-[13px] leading-relaxed font-light text-white/70 sm:text-[14px]">
                  From EchoSense to CureCMS — we deliver RAG, agents,
                  Spark/Kafka pipelines, and full-stack platforms companies
                  actually rely on.
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
