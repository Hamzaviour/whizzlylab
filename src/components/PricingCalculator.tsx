"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type WebsiteType = "basic" | "corporate" | "ecommerce" | "saas";

const TIERS: Record<
  WebsiteType,
  {
    label: string;
    min: number;
    max: number;
    pagesHint: string;
    features: string;
    delivery: string;
    defaultPages: number;
    pageMin: number;
    pageMax: number;
  }
> = {
  basic: {
    label: "Static Portfolio / Basic Business",
    min: 15000,
    max: 60000,
    pagesHint: "3–6 pages",
    features: "Contact form, mobile responsive design",
    delivery: "2–4 weeks",
    defaultPages: 4,
    pageMin: 3,
    pageMax: 6,
  },
  corporate: {
    label: "Standard Business CMS (WordPress)",
    min: 40000,
    max: 150000,
    pagesHint: "5–15 pages",
    features: "Dynamic layouts, premium themes, blog, appointments",
    delivery: "4–8 weeks",
    defaultPages: 10,
    pageMin: 5,
    pageMax: 15,
  },
  ecommerce: {
    label: "Standard E-commerce Store",
    min: 80000,
    max: 350000,
    pagesHint: "Catalogs & checkout",
    features: "WooCommerce / Shopify, local gateways, basic inventory",
    delivery: "6–14 weeks",
    defaultPages: 15,
    pageMin: 8,
    pageMax: 40,
  },
  saas: {
    label: "Enterprise / Custom Web Application",
    min: 400000,
    max: 1500000,
    pagesHint: "Dashboards & systems",
    features: "Custom React/Node apps, ERP linkups, premium dashboards",
    delivery: "12–28+ weeks",
    defaultPages: 20,
    pageMin: 10,
    pageMax: 60,
  },
};

function formatPkr(n: number) {
  return `PKR ${Math.round(n).toLocaleString("en-PK")}`;
}

/**
 * Project estimator — Pakistan market ranges in PKR.
 */
export default function PricingCalculator() {
  const [websiteType, setWebsiteType] = useState<WebsiteType>("basic");
  const tier = TIERS[websiteType];
  const [pages, setPages] = useState(tier.defaultPages);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [rush, setRush] = useState(false);

  const onTypeChange = (type: WebsiteType) => {
    setWebsiteType(type);
    setPages(TIERS[type].defaultPages);
  };

  const estimate = useMemo(() => {
    const t = TIERS[websiteType];
    const span = t.pageMax - t.pageMin || 1;
    const clamped = Math.min(t.pageMax, Math.max(t.pageMin, pages));
    const progress = (clamped - t.pageMin) / span;
    let mid = t.min + progress * (t.max - t.min);

    // Soft add-ons (kept within a sensible ceiling above max)
    if (needContent) mid += clamped * 1500;
    if (needSEO) mid += clamped * 1200;
    if (rush) mid += (t.max - t.min) * 0.15;

    const low = Math.max(t.min, Math.round(mid * 0.92));
    const high = Math.round(
      Math.min(t.max * (rush || needContent || needSEO ? 1.12 : 1), mid * 1.08),
    );
    const typical = Math.round((low + high) / 2);

    const agency = Math.round(typical * 2.4);
    const freelancer = Math.round(typical * 1.55);

    return { low, high, typical, agency, freelancer, delivery: t.delivery };
  }, [websiteType, pages, needContent, needSEO, rush]);

  return (
    <div
      id="calculator-section"
      className="grid w-full min-w-0 overflow-hidden rounded-2xl lg:grid-cols-2"
    >
      <div className="divide-y divide-[#1E1E1E] bg-[#0D0D0D] p-5 sm:p-8 lg:p-12">
        <div className="pb-6">
          <h3 className="mb-3 text-base font-medium">Website type</h3>
          {(Object.keys(TIERS) as WebsiteType[]).map((key) => {
            const item = TIERS[key];
            const active = websiteType === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onTypeChange(key)}
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
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-foreground/40">
                    {formatPkr(item.min)} – {formatPkr(item.max)}
                    {key === "ecommerce" || key === "saas" ? "+" : ""} ·{" "}
                    {item.delivery}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="py-6">
          <h3 className="mb-2 text-base font-medium">
            Scope size: <span className="text-[#FF5656]">{pages}</span>{" "}
            <span className="text-xs font-normal text-foreground/40">
              ({tier.pagesHint})
            </span>
          </h3>
          <input
            type="range"
            min={tier.pageMin}
            max={tier.pageMax}
            step={1}
            value={Math.min(tier.pageMax, Math.max(tier.pageMin, pages))}
            onChange={(e) => setPages(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#1E1E1E] accent-[#FF5656]"
          />
          <div className="mt-2 flex justify-between text-xs text-foreground/40">
            <span>{tier.pageMin}</span>
            <span>{tier.pageMax}</span>
          </div>
          <p className="mt-3 text-xs text-foreground/45">{tier.features}</p>
        </div>

        <div className="py-6">
          <h3 className="mb-3 text-base font-medium">Add-ons</h3>
          {[
            {
              label: "Content writing support",
              checked: needContent,
              set: setNeedContent,
            },
            {
              label: "SEO optimization package",
              checked: needSEO,
              set: setNeedSEO,
            },
            {
              label: "Priority / accelerated delivery",
              checked: rush,
              set: setRush,
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => item.set(!item.checked)}
              className="flex w-full items-center gap-3 py-3 text-left text-sm"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                  item.checked
                    ? "border-[#FF5656] bg-[#FF5656]"
                    : "border-white/25"
                }`}
              >
                {item.checked && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 text-white">
                    <path
                      d="M2 6.5L4.5 9L10 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="min-w-0 space-y-4 border border-white/10 border-t-0 p-5 sm:p-8 lg:min-h-[560px] lg:rounded-r-2xl lg:border-t lg:p-12"
        style={{ background: "hsl(260 87% 4%)" }}
      >
        <h3 className="text-lg font-medium sm:text-xl">Estimated cost</h3>
        <p className="text-sm text-foreground/55">
          Development only (PKR). Infrastructure billed separately. Typical
          delivery:{" "}
          <span className="text-foreground/80">{estimate.delivery}</span>
        </p>

        <div className="space-y-2 rounded-2xl bg-white/5 p-4 sm:space-y-3 sm:p-6">
          <p className="text-sm text-foreground/60">Typical agency range</p>
          <p className="break-words text-2xl font-bold sm:text-4xl">
            {formatPkr(estimate.agency)}+
          </p>
          <p className="text-sm text-foreground/45">
            Higher cost, longer coordination overhead
          </p>
        </div>

        <div className="space-y-2 rounded-2xl bg-white/5 p-4 sm:space-y-3 sm:p-6">
          <p className="text-sm text-foreground/60">Typical freelancer range</p>
          <p className="break-words text-2xl font-bold sm:text-4xl">
            {formatPkr(estimate.freelancer)}+
          </p>
          <p className="text-sm text-foreground/45">
            Variable quality and more back-and-forth
          </p>
        </div>

        <div className="space-y-2 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 p-4 text-white sm:space-y-3 sm:p-6">
          <p className="text-sm text-white/90">With Whizzly Lab</p>
          <p className="break-words text-2xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {formatPkr(estimate.low)} – {formatPkr(estimate.high)}
          </p>
          <p className="text-sm break-words text-white/85">
            Mid estimate ~ {formatPkr(estimate.typical)} · {tier.label}
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
