"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Hls from "hls.js";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { WHATSAPP_URL } from "@/lib/contact";

const HLS_SRC =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export default function CtaFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-black px-4 py-20 text-center sm:px-6 sm:py-32 md:px-16 lg:px-24"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-[1]"
        style={{
          height: "200px",
          background: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-[1]"
        style={{
          height: "200px",
          background: "linear-gradient(to top, black, transparent)",
        }}
      />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading mx-auto mb-4 max-w-3xl text-4xl leading-[0.95] font-normal tracking-tight text-white italic sm:text-5xl md:text-6xl lg:text-7xl md:leading-[0.85]"
        >
          Schedule a consult.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body mx-auto mb-8 max-w-xl text-sm font-light text-white/60 md:text-base"
        >
          Book a free strategy call. Portfolio sites from PKR 15,000. No
          commitment, no pressure. Just possibilities.
        </motion.p>

        <div className="flex flex-col items-stretch justify-center gap-3 px-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:gap-6">
          <MagneticButton href="/schedule">
            <span className="liquid-glass-strong font-body flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 sm:w-auto">
              Schedule a Consult
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </MagneticButton>
          <MagneticButton href={WHATSAPP_URL} strength={0.28}>
            <span className="font-body flex w-full items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-6 py-3 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-500/30 sm:w-auto">
              WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </MagneticButton>
          <MagneticButton href="/pricing" strength={0.28}>
            <span className="font-body flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 sm:w-auto">
              View Pricing
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </MagneticButton>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-16 rounded-2xl border border-white/10 bg-black px-4 py-5 sm:mt-32 sm:px-6 sm:py-6 md:px-8 md:py-7"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body text-xs font-light text-white/40">
              &copy; {new Date().getFullYear()} Whizzly Lab. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/about"
                className="interactive-link font-body text-xs font-light text-white/40 hover:text-white/70"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="interactive-link font-body text-xs font-light text-white/40 hover:text-white/70"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="interactive-link font-body text-xs font-light text-white/40 hover:text-white/70"
              >
                Contact
              </Link>
              <a
                href="https://hamzayounas.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="interactive-link font-body text-xs font-light text-white/40 hover:text-white/70"
              >
                Portfolio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
