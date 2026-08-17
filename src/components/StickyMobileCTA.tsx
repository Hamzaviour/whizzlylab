"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex gap-2 p-3 bg-[hsl(260_87%_3%)]/90 backdrop-blur-lg border-t border-white/10 transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Quick actions"
    >
      <Link
        href="/schedule"
        className="flex-1 rounded-full bg-white py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
      >
        Schedule
      </Link>
      <a
        href="https://wa.me/923039969903"
        target="_blank"
        rel="noreferrer"
        className="flex-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 py-3 text-center text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
      >
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex-1 rounded-full border border-white/15 bg-white/5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
      >
        Contact
      </Link>
    </div>
  );
}
