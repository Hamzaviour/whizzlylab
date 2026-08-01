"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceSelector from "./ServiceSelector";
import PricingCalculator from "./PricingCalculator";
import { getServicePricing, type ServiceKey } from "@/lib/pricing";
import { useCurrency, CurrencyToggle } from "@/lib/currency";

export default function HomePricing() {
  const { format, currency } = useCurrency();
  const [serviceKey, setServiceKey] = useState<ServiceKey>("web");
  const service = getServicePricing(serviceKey);
  const from = Math.min(...service.tiers.map((t) => t.min));

  return (
    <section
      id="pricing"
      className="bg-transparent px-4 py-16 sm:px-8 md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-widest text-foreground/45 uppercase">
            Pricing · {service.label}
          </p>
          <h2 className="font-general mt-3 text-3xl font-normal md:text-4xl lg:text-5xl">
            {service.label} from {format(from)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-hero-sub/75">
            {service.blurb} Fine-tune with the estimator, or{" "}
            <Link href="/pricing" className="text-[#00F0FF] hover:underline">
              view full pricing table
            </Link>
            .
          </p>
          <div className="mt-6">
            <ServiceSelector value={serviceKey} onChange={setServiceKey} />
          </div>
          <div className="mt-5 flex justify-center">
            <CurrencyToggle />
          </div>
        </div>
        <PricingCalculator service={service} />
        <p className="mt-6 text-center text-xs text-foreground/40">
          Prices shown in {currency}. Switch currency from the top bar.
        </p>
      </div>
    </section>
  );
}
