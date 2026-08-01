"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceAddon, ServicePricing } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency";

/**
 * Project estimator for a single service. Prices are computed in PKR from the
 * service's tier ranges and rendered in the user's chosen currency (PKR/USD).
 */
export default function PricingCalculator({
  service,
}: {
  service: ServicePricing;
}) {
  const { format, currency } = useCurrency();
  const [tierIndex, setTierIndex] = useState(0);
  const tier = service.tiers[Math.min(tierIndex, service.tiers.length - 1)];
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Default add-ons used as fallback if a service has none defined.
  const addons: ServiceAddon[] =
    service.addons ?? [
      { label: "Content writing support", uplift: 0.06 },
      { label: "SEO optimization package", uplift: 0.05 },
      { label: "Priority / accelerated delivery", uplift: 0.15 },
    ];

  const toggleAddon = (label: string) =>
    setChecked((prev) => ({ ...prev, [label]: !prev[label] }));

  const estimate = useMemo(() => {
    // Low anchor stays at the tier floor; high lifts with add-ons but caps at tier max.
    const low = tier.min;
    const totalUplift = addons
      .filter((a) => checked[a.label])
      .reduce((sum, a) => sum + a.uplift, 0);
    const high = Math.round(tier.max * (1 + totalUplift));
    const typical = Math.round((low + high) / 2);

    const agency = Math.round(typical * 2.4);
    const freelancer = Math.round(typical * 1.55);

    return { low, high, typical, agency, freelancer, delivery: tier.delivery };
  }, [tier, addons, checked]);

  return (
    <div
      id="calculator-section"
      className="grid w-full min-w-0 overflow-hidden rounded-2xl lg:grid-cols-2"
    >
      <div className="divide-y divide-[#1E1E1E] bg-[#0D0D0D] p-5 sm:p-8 lg:p-12">
        <div className="pb-6">
          <h3 className="mb-3 text-base font-medium">Package tier</h3>
          {service.tiers.map((t, i) => {
            const active = tierIndex === i;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setTierIndex(i)}
                className="flex w-full items-start gap-3 py-3 text-left"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? "border-[#FF5656]" : "border-white/25"
                  }`}
                >
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#FF5656]" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-foreground/90">
                    {t.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-foreground/40">
                    {format(t.min)} – {format(t.max)} · {t.delivery}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="py-6">
          <h3 className="mb-3 text-base font-medium">Add-ons</h3>
          {addons.map((addon) => {
            const active = !!checked[addon.label];
            return (
              <button
                key={addon.label}
                type="button"
                onClick={() => toggleAddon(addon.label)}
                className="flex w-full items-center gap-3 py-3 text-left text-sm"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                    active
                      ? "border-[#FF5656] bg-[#FF5656]"
                      : "border-white/25"
                  }`}
                >
                  {active && (
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3 text-white"
                    >
                      <path
                        d="M2 6.5L4.5 9L10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </span>
                <span className="min-w-0">{addon.label}</span>
                <span className="ml-auto text-xs text-foreground/45">
                  +{Math.round(addon.uplift * 100)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="min-w-0 space-y-4 border border-white/10 border-t-0 p-5 sm:p-8 lg:min-h-[560px] lg:rounded-r-2xl lg:border-t lg:p-12"
        style={{ background: "hsl(260 87% 4%)" }}
      >
        <h3 className="text-lg font-medium sm:text-xl">Estimated cost</h3>
        <p className="text-sm text-foreground/55">
          Development only (shown in {currency}). Infrastructure billed
          separately. Typical delivery:{" "}
          <span className="text-foreground/80">{estimate.delivery}</span>
        </p>

        <div className="space-y-2 rounded-2xl bg-white/5 p-4 sm:space-y-3 sm:p-6">
          <p className="text-sm text-foreground/60">Typical agency range</p>
          <p className="break-words text-2xl font-bold sm:text-4xl">
            {format(estimate.agency)}+
          </p>
          <p className="text-sm text-foreground/45">
            Higher cost, longer coordination overhead
          </p>
        </div>

        <div className="space-y-2 rounded-2xl bg-white/5 p-4 sm:space-y-3 sm:p-6">
          <p className="text-sm text-foreground/60">Typical freelancer range</p>
          <p className="break-words text-2xl font-bold sm:text-4xl">
            {format(estimate.freelancer)}+
          </p>
          <p className="text-sm text-foreground/45">
            Variable quality and more back-and-forth
          </p>
        </div>

        <div className="space-y-2 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 p-4 text-white sm:space-y-3 sm:p-6">
          <p className="text-sm text-white/90">With Whizzly Lab</p>
          <p className="break-words text-2xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {format(estimate.low)} – {format(estimate.high)}
          </p>
          <p className="text-sm break-words text-white/85">
            Mid estimate ~ {format(estimate.typical)} · {tier.name}
          </p>
          <Link
            href="/schedule"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 sm:mt-4 sm:w-auto"
          >
            Schedule a Consult
          </Link>
        </div>
      </div>
    </div>
  );
}
