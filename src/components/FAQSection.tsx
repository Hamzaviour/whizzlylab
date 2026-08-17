"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What services does Whizzly Lab offer?",
    a: "We offer AI engineering, machine learning, RAG agents, real-time data pipelines (Kafka/Spark), full-stack web development, automation, computer vision, and business solutions — all production-grade and shipped from Lahore to global clients.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary by scope. A simple website takes 2–4 weeks, an AI pipeline 4–8 weeks, and a full SaaS product 3–6 months. We provide a detailed timeline after the discovery call.",
  },
  {
    q: "Do you sign NDAs before discussing projects?",
    a: "Absolutely. We sign NDAs before any detailed project discussion. Your ideas and data are treated as confidential, and we can work under your NDA or our own.",
  },
  {
    q: "What is your response time?",
    a: "We respond to all inquiries within 24 hours. For urgent matters, reach us on WhatsApp for a faster response.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Yes. We offer team augmentation, dedicated engineers, and collaborative delivery models. We plug into your workflows — whether that&apos;s Slack, GitHub, or your own project management tools.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
          FAQ
        </p>
        <h2
          className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
          style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
        >
          Frequently asked questions
        </h2>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/5"
                aria-expanded={open === i}
              >
                <span className="text-base font-medium text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-foreground/50 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm leading-relaxed text-hero-sub/75">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
