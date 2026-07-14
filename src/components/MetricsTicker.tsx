"use client";

const items = [
  "RAG Systems in Production",
  "Kafka · Spark Pipelines",
  "Agentic AI Workflows",
  "Enterprise Full-Stack",
  "Hugging Face Deployments",
  "Healthcare Platforms",
  "Power BI · Tableau",
];

export default function MetricsTicker() {
  const row = [...items, ...items];

  return (
    <div className="relative z-10 border-y border-white/[0.06] bg-white/[0.02] py-3.5">
      <div className="overflow-hidden">
        <div className="animate-ticker flex w-max gap-10">
          {row.map((text, i) => (
            <div key={`${text}-${i}`} className="flex items-center gap-10">
              <span className="text-xs font-medium tracking-[0.16em] whitespace-nowrap text-white/50 uppercase sm:text-[13px]">
                {text}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
