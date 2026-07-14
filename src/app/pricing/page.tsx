import type { Metadata } from "next";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import PricingCalculator from "@/components/PricingCalculator";
import {
  INFRASTRUCTURE_FEES,
  PRICING_INTRO_FROM,
  PRICING_INTRO_TO,
  PRICING_TIERS,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — Whizzly Lab",
  description:
    "Whizzly Lab website pricing in PKR — from portfolio sites (PKR 15,000) to enterprise systems (PKR 1,500,000+).",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-7xl min-w-0">
          <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
            Pricing · PKR
          </p>
          <h1
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            Clear package pricing in PKR
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-hero-sub/80 sm:text-base md:text-lg">
            In Pakistan, website development typically runs from{" "}
            <strong className="text-foreground">{PRICING_INTRO_FROM}</strong> for
            a basic portfolio to over{" "}
            <strong className="text-foreground">{PRICING_INTRO_TO}</strong> for
            advanced custom systems. Your investment depends on functionality,
            design complexity, and service tier.
          </p>

          {/* Mobile: stacked cards instead of wide table */}
          <div className="mt-10 space-y-3 md:hidden">
            {PRICING_TIERS.map((row) => (
              <div
                key={row.name}
                className={`rounded-2xl border border-white/10 bg-black/30 p-4 ${
                  row.featured ? "ring-1 ring-[#FF5656]/50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-sm font-semibold leading-snug text-foreground">
                    {row.name}
                  </h2>
                  <p className="shrink-0 text-xs text-foreground/40">
                    {row.delivery}
                  </p>
                </div>
                <p className="mt-2 text-base font-bold text-[#FF5656]">
                  {row.range}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-hero-sub/70">
                  {row.features}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="mt-14 hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/[0.04] text-xs tracking-wider text-foreground/45 uppercase">
                <tr>
                  <th className="px-5 py-4 font-medium">Website type</th>
                  <th className="px-5 py-4 font-medium">Estimated cost (PKR)</th>
                  <th className="px-5 py-4 font-medium">Key features</th>
                  <th className="px-5 py-4 font-medium">Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {PRICING_TIERS.map((row) => (
                  <tr key={row.name} className="bg-black/20">
                    <td className="px-5 py-4 font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#FF5656]">
                      {row.range}
                    </td>
                    <td className="px-5 py-4 text-hero-sub/75">
                      {row.features}
                    </td>
                    <td className="px-5 py-4 text-hero-sub/75">
                      {row.delivery}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 hidden gap-5 sm:grid-cols-2 md:grid lg:grid-cols-4">
            {PRICING_TIERS.map((t) => (
              <div
                key={t.name}
                className={`liquid-glass rounded-2xl p-6 ${
                  t.featured ? "ring-1 ring-[#FF5656]/50" : ""
                }`}
              >
                <p className="text-xs text-foreground/40">{t.delivery}</p>
                <h2 className="mt-2 text-lg font-semibold leading-snug">
                  {t.name}
                </h2>
                <p className="mt-3 text-xl font-bold text-[#FF5656]">
                  {t.range}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-hero-sub/70">
                  {t.features}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 sm:mt-16">
            <h2
              className="mb-2 text-xl font-semibold sm:text-2xl md:text-3xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Mandatory infrastructure fees (annual)
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-hero-sub/70">
              Beyond development, budget for domain, hosting, and security —
              billed yearly (or on a fixed multi-year cycle for some .pk
              domains).
            </p>

            <div className="space-y-3 md:hidden">
              {INFRASTRUCTURE_FEES.map((row) => (
                <div
                  key={row.name}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-sm font-medium text-foreground">
                    {row.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#FF5656]">
                    {row.range}
                  </p>
                  <p className="mt-2 text-xs text-hero-sub/70">{row.note}</p>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs tracking-wider text-foreground/45 uppercase">
                  <tr>
                    <th className="px-5 py-4 font-medium">Item</th>
                    <th className="px-5 py-4 font-medium">Typical cost</th>
                    <th className="px-5 py-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {INFRASTRUCTURE_FEES.map((row) => (
                    <tr key={row.name} className="bg-black/20">
                      <td className="px-5 py-4 font-medium text-foreground">
                        {row.name}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#FF5656]">
                        {row.range}
                      </td>
                      <td className="px-5 py-4 text-hero-sub/75">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <h2
              className="mb-3 text-center text-2xl font-semibold sm:text-3xl md:text-4xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Project estimation calculator
            </h2>
            <p className="mx-auto mb-6 max-w-xl px-1 text-center text-sm text-hero-sub/70 sm:mb-8">
              All estimates shown in PKR. Final quotes confirmed after a short
              consult.
            </p>
            <PricingCalculator />
            <p className="mt-8 text-center text-sm text-foreground/45">
              Ready to start?{" "}
              <Link href="/schedule" className="text-[#00F0FF] hover:underline">
                Schedule a consult
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
