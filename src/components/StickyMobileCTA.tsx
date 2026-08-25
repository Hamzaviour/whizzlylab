"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Calendar, Send } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-white/15 bg-[#05010f]/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-2xl transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Quick actions"
    >
      <Link
        href="/schedule"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#00f0ff] py-2.5 text-center text-xs font-semibold text-black shadow-lg"
      >
        <Calendar className="h-3.5 w-3.5" />
        Schedule
      </Link>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 py-2.5 text-center text-xs font-semibold text-emerald-300"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 py-2.5 text-center text-xs font-medium text-white"
      >
        <Send className="h-3.5 w-3.5" />
        Contact
      </Link>
    </div>
  );
}
