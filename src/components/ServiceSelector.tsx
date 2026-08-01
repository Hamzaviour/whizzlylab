"use client";

import { SERVICE_PRICING, type ServiceKey } from "@/lib/pricing";

export default function ServiceSelector({
  value,
  onChange,
}: {
  value: ServiceKey;
  onChange: (key: ServiceKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Service type"
      className="flex flex-wrap justify-center gap-2"
    >
      {SERVICE_PRICING.map((s) => {
        const active = s.key === value;
        return (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(s.key)}
            className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm ${
              active
                ? "border-[#FF5656] bg-[#FF5656] text-white"
                : "border-white/15 bg-white/[0.03] text-foreground/70 hover:border-white/30 hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
