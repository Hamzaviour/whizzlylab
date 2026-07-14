"use client";

const brands = [
  "EchoSense",
  "CureCMS",
  "COMPLYSECOPS",
  "OXO",
  "Kafka",
  "Spark",
  "LangChain",
  "Hugging Face",
  "Next.js",
  "RAG",
];

function BrandChip({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
      <div className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-foreground">
        {name[0]}
      </div>
      <span className="text-base font-semibold text-foreground">{name}</span>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <footer className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-8 px-6 pb-10 md:flex-row md:items-center md:gap-12">
      <div className="max-w-[200px] shrink-0 text-sm leading-tight text-foreground/50">
        Trusted across AI builds
        <br />
        and production platforms
      </div>

      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <div className="animate-marquee flex w-max gap-16 hover:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-16">
            {brands.map((logo, idx) => (
              <BrandChip key={`logo-1-${idx}`} name={logo} />
            ))}
          </div>
          <div className="flex shrink-0 gap-16" aria-hidden>
            {brands.map((logo, idx) => (
              <BrandChip key={`logo-2-${idx}`} name={logo} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
