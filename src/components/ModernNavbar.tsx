"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { animate } from "animejs";
import Link from "next/link";
import PAGE_NAV from "@/lib/nav";
import { WHATSAPP_URL } from "@/lib/contact";
import { CurrencyToggle } from "@/lib/currency";

/**
 * Compact black nav hug links (Home → Contact) + separate CTA cards
 * Mobile: hamburger menu only. Desktop (lg+): links + CTAs.
 */
export default function ModernNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = document.querySelector(".modern-nav");
    if (!el) return;
    animate(el, {
      opacity: [0, 1],
      translateY: [-16, 0],
      duration: 700,
      ease: "out(3)",
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="modern-nav relative z-50 w-full px-3 pt-3 opacity-0 sm:px-6 sm:pt-5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 sm:gap-3 lg:gap-4">
        {/* Desktop: width hugs Home…Contact */}
        <nav className="hidden w-fit min-h-[56px] items-center rounded-2xl border border-white/12 bg-black px-4 py-3 lg:inline-flex">
          <div className="flex items-center gap-5 whitespace-nowrap">
            {PAGE_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="interactive-link text-sm font-medium text-foreground/90 transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile / tablet nav shell */}
        <nav className="flex min-h-[48px] w-full max-w-full items-center justify-between rounded-2xl border border-white/12 bg-black px-3.5 py-2.5 sm:min-h-[52px] sm:px-4 lg:hidden">
          <Link
            href="/"
            className="truncate text-sm font-medium text-foreground/90"
          >
            Whizzly Lab
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="shrink-0 rounded-full border border-foreground/20 p-2.5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        <Link
          href="/schedule"
          className="hidden shrink-0 items-center rounded-2xl border border-white/12 bg-black px-5 py-3.5 text-sm font-medium text-foreground transition-all hover:border-white/25 hover:bg-white/5 lg:inline-flex lg:min-h-[56px]"
        >
          Schedule a Consult
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center rounded-2xl border border-emerald-500/30 bg-black px-4 py-3.5 text-sm font-medium text-emerald-400 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/10 lg:inline-flex lg:min-h-[56px]"
        >
          WhatsApp
        </a>
        <CurrencyToggle className="hidden lg:inline-flex" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full right-3 left-3 z-40 mt-2 max-h-[min(70vh,520px)] overflow-y-auto rounded-2xl border border-white/10 bg-black p-3 shadow-2xl sm:right-6 sm:left-6 lg:hidden"
          >
            <div className="flex flex-col gap-0.5">
              {PAGE_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-foreground/90 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/schedule"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm"
              >
                Schedule a Consult
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-400"
              >
                WhatsApp
              </a>
              <div className="mt-2 flex justify-center">
                <CurrencyToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
