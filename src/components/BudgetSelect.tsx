"use client";

import { getServicePricing } from "@/lib/pricing";
import { useCurrency } from "@/lib/currency";

const WEB_TIERS = getServicePricing("web").tiers;

export default function BudgetSelect() {
  const { format, currency } = useCurrency();
  return (
    <select
      name="budget"
      defaultValue=""
      className="w-full rounded-2xl border border-white/10 bg-[#0c0c10] px-4 py-3.5 outline-none focus:border-white/25"
    >
      <option value="" disabled>
        Approximate budget ({currency})
      </option>
      {WEB_TIERS.map((t, i) => {
        const suffix = `${Math.round(t.min / 1000)}k-${Math.round(t.max / 1000)}k`;
        return (
          <option key={suffix} value={suffix}>
            {format(t.min)} – {format(t.max)}
            {i === WEB_TIERS.length - 1 ? "+" : ""}
          </option>
        );
      })}
      <option value="unsure">Not sure yet</option>
    </select>
  );
}
