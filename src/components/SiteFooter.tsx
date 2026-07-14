"use client";

import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-8 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-full.png"
            alt="Whizzly Lab"
            width={200}
            height={72}
            className="h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.35)]"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-foreground/45">
          <a href="https://hamzayounas.netlify.app/" target="_blank" rel="noreferrer" className="hover:text-foreground">
            Portfolio
          </a>
          <a href="https://github.com/Hamzaviour" target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href="https://hamzavelous-echosense-ai.hf.space/login" target="_blank" rel="noreferrer" className="hover:text-foreground">
            HF Spaces
          </a>
          <span>© {new Date().getFullYear()} Whizzly Lab</span>
        </div>
      </div>
    </footer>
  );
}
