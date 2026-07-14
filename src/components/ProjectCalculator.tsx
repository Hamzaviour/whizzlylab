"use client";

import { useMemo, useState } from "react";
import TextRevealOnScroll, { TextRevealWords } from "./TextRevealOnScroll";

type ServiceType = "design" | "development" | "both";
type Timeline = "regular" | "fast" | "rush";

export default function ProjectCalculator() {
  const [serviceType, setServiceType] = useState<ServiceType>("both");
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<Timeline>("regular");

  const prices = useMemo(() => {
    const bases = {
      design: { base: 399, perPage: 100 },
      development: { base: 199, perPage: 100 },
      both: { base: 499, perPage: 200 },
    } as const;
    const { base, perPage } = bases[serviceType];
    let total = Math.max(base, base + (pages - 1) * perPage);
    if (needContent) total += pages * 50;
    if (needSEO) total += pages * 50;
    if (timeline === "rush") total += pages * 100;
    if (timeline === "fast") total += pages * 25;

    const agencyPer = serviceType === "both" ? 1000 : 400;
    const freelancerPer = serviceType === "both" ? 500 : 200;

    return {
      ours: total,
      agency: 8000 + (pages - 1) * agencyPer,
      freelancer: 3000 + (pages - 1) * freelancerPer,
    };
  }, [serviceType, pages, needContent, needSEO, timeline]);

  const money = (n: number) => `$${n.toLocaleString()}`;

  const Radio = ({
    active,
    onClick,
    label,
    price,
  }: {
    active: boolean;
    onClick: () => void;
    label: string;
    price?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 py-3 text-left"
    >
      <span className="flex items-center gap-3 text-sm text-foreground/90">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            active ? "border-[#FF5656]" : "border-white/25"
          }`}
        >
          {active && <span className="h-2 w-2 rounded-full bg-[#FF5656]" />}
        </span>
        {label}
      </span>
      {price && <span className="text-sm text-[#FF5656]">{price}</span>}
    </button>
  );

  return (
    <section
      id="calculator-section"
      className="bg-background px-4 py-16 md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <TextRevealOnScroll
            as="p"
            className="font-mono text-xs tracking-widest text-foreground/45 uppercase"
          >
            Try project estimation calculator
          </TextRevealOnScroll>
          <TextRevealWords
            text="Get premium delivery within your budget"
            className="font-general mt-3 text-3xl font-normal md:text-4xl lg:text-5xl"
          />
        </div>

        <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2">
          {/* LEFT */}
          <div className="divide-y divide-[#1E1E1E] bg-[#0D0D0D] p-8 lg:p-12">
            <div className="pb-6">
              <h3 className="mb-2 text-base font-medium">
                What kind of service do you need?
              </h3>
              <Radio
                active={serviceType === "design"}
                onClick={() => setServiceType("design")}
                label="Only Design"
              />
              <Radio
                active={serviceType === "development"}
                onClick={() => setServiceType("development")}
                label="Only Development"
              />
              <Radio
                active={serviceType === "both"}
                onClick={() => setServiceType("both")}
                label="Design + Development"
              />
            </div>

            <div className="py-6">
              <h3 className="mb-4 text-base font-medium">
                Number of pages:{" "}
                <span className="text-[#FF5656]">{pages}</span>
              </h3>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#1E1E1E] accent-[#FF5656]"
              />
              <div className="mt-2 flex justify-between text-xs text-foreground/40">
                <span>1</span>
                <span>30</span>
              </div>
            </div>

            <div className="py-6">
              <h3 className="mb-3 text-base font-medium">Add-ons</h3>
              {[
                {
                  label: "I will need help with content",
                  price: "+$50/pages",
                  checked: needContent,
                  set: setNeedContent,
                },
                {
                  label: "I want to optimize my website for SEO",
                  price: "+$50/pages",
                  checked: needSEO,
                  set: setNeedSEO,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.set(!item.checked)}
                  className="flex w-full items-center justify-between gap-3 py-3 text-left"
                >
                  <span className="flex items-center gap-3 text-sm">
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
                  </span>
                  <span className="text-sm text-[#FF5656]">{item.price}</span>
                </button>
              ))}
            </div>

            <div className="pt-6">
              <h3 className="mb-2 text-base font-medium">
                How fast do you need this?
              </h3>
              <Radio
                active={timeline === "rush"}
                onClick={() => setTimeline("rush")}
                label="Within 7 Days"
                price="+$100/pages"
              />
              <Radio
                active={timeline === "fast"}
                onClick={() => setTimeline("fast")}
                label="Within 14 Days"
                price="+$25/pages"
              />
              <Radio
                active={timeline === "regular"}
                onClick={() => setTimeline("regular")}
                label="Regular Speed (Based on discussion)"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="min-h-[717.98px] space-y-4 border border-white/10 p-8 lg:rounded-r-2xl lg:p-12"
            style={{ background: "hsl(260 87% 4%)" }}
          >
            <h3 className="text-xl font-medium">Estimated Cost</h3>
            <p className="text-sm text-foreground/55">
              Transparent Whizzly Lab pricing vs typical agency and freelancer
              ranges for similar scope.
            </p>

            <div className="space-y-3 rounded-2xl bg-white/5 p-6">
              <p className="text-sm text-foreground/60">
                Typical Agency charges minimum
              </p>
              <p className="text-4xl font-bold">{money(prices.agency)}</p>
              <p className="text-sm text-foreground/45">
                + Too much extra time & additional cost
              </p>
            </div>

            <div className="space-y-3 rounded-2xl bg-white/5 p-6">
              <p className="text-sm text-foreground/60">
                Regular Freelancer charges minimum
              </p>
              <p className="text-4xl font-bold">{money(prices.freelancer)}</p>
              <p className="text-sm text-foreground/45">
                + Too much headache & back-and-forth
              </p>
            </div>

            <div className="space-y-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 p-6 text-white">
              <p className="text-sm text-white/90">With Whizzly Lab</p>
              <p className="text-5xl font-bold">{money(prices.ours)}</p>
              <p className="text-sm text-white/85">
                Save your money, time & headache
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
