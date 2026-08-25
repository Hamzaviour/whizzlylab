"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "whizzly_cookie_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Show after a brief delay for smoother UX
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
      window.dispatchEvent(new CustomEvent("whizzly_consent_update", { detail: "accepted" }));
    } catch {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
      window.dispatchEvent(new CustomEvent("whizzly_consent_update", { detail: "declined" }));
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg sm:bottom-6 sm:left-6 sm:right-auto"
          role="dialog"
          aria-label="Cookie consent banner"
        >
          <div className="liquid-glass relative overflow-hidden rounded-3xl border border-white/15 bg-[#05010f]/90 p-5 sm:p-6 shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner"
              className="absolute top-4 right-4 text-hero-sub/60 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="min-w-0 pr-4">
                <h3 className="text-sm font-semibold text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Privacy &amp; Cookie Preferences
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-hero-sub/80">
                  We use cookies and telemetry to optimize site performance and analyze anonymous traffic. Your data is never sold. Learn more in our{" "}
                  <Link
                    href="/privacy"
                    className="text-cyan-300 underline underline-offset-2 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={handleDecline}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-hero-sub transition hover:bg-white/10 hover:text-white"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#00f0ff] px-5 py-2 text-xs font-semibold text-black shadow-lg transition hover:opacity-90"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
