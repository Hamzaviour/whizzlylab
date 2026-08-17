import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
        {/* 404 */}
        <p className="text-[clamp(6rem,20vw,14rem)] font-extrabold leading-none tracking-tighter text-white/10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          404
        </p>

        <h1 className="mt-[-1rem] text-[clamp(1.5rem,5vw,3rem)] font-extrabold tracking-tight text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-lg text-hero-sub/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Home className="h-4 w-4" />
            Back to homepage
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Schedule a consult
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Internal links */}
        <nav aria-label="Suggested pages" className="mt-16">
          <p className="mb-4 text-xs tracking-[0.2em] text-foreground/30 uppercase">
            Popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/services", label: "Services" },
              { href: "/pricing", label: "Pricing" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-foreground/70 transition hover:border-white/20 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
