"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import BudgetSelect from "@/components/BudgetSelect";
import { useCurrency } from "@/lib/currency";
import {
  COMPANY_EMAIL,
  WHATSAPP_URL,
  submitWeb3Form,
} from "@/lib/contact";

const serviceOptions = [
  "Web Development",
  "AI / RAG",
  "Machine Learning",
  "Data Pipelines",
  "Automation",
  "Data Analytics",
  "Computer Vision",
  "Business Solutions",
  "Other",
];

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule a Consult — Whizzly Lab | AI Strategy Call",
  description:
    "Book a 20–30 minute discovery call with Whizzly Lab. Discuss your AI, ML, or full-stack project and get scope + budget clarity. From Lahore, shipping globally.",
  alternates: {
    canonical: "https://whizzlylab.com/schedule",
  },
  robots: "noindex, follow",
  openGraph: {
    title: "Schedule a Consult — Whizzly Lab",
    description: "Book a strategy call for your AI or full-stack project.",
    url: "https://whizzlylab.com/schedule",
    images: ["https://whizzlylab.com/logo-og.jpg"],
  },
  twitter: {
    title: "Schedule a Consult — Whizzly Lab",
    description: "Book a discovery call with Whizzly Lab.",
    images: ["https://whizzlylab.com/logo-og.jpg"],
  },
};

export default function SchedulePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const { format, currency } = useCurrency();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitWeb3Form({
        subject: `Whizzly Lab Schedule — ${String(data.get("service") || "Consult")}`,
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        service: String(data.get("service") || ""),
        budget: String(data.get("budget") || ""),
        preferred_time: String(data.get("when") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
              Schedule
            </p>
            <h1
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
            >
              Book a strategy consult
            </h1>
            <p className="mt-4 text-base leading-relaxed text-hero-sub/80">
              Tell us what you need — website, AI system, or automation. We
              reply with availability and a clear next step. Portfolio sites
              from{" "}
              <strong className="text-foreground">{format(15000)}</strong>.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-hero-sub/75">
              <li>▸ 20–30 minute discovery call</li>
              <li>▸ Scope + budget clarity in {currency}</li>
              <li>▸ No pressure — just possibilities</li>
            </ul>
            <p className="mt-8 text-sm text-foreground/50">
              Email:{" "}
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {COMPANY_EMAIL}
              </a>
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/pricing"
              className="mt-4 block text-sm text-[#00F0FF] hover:underline"
            >
              See pricing estimator →
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            className="liquid-glass space-y-4 rounded-3xl p-6 sm:p-8"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Work email"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <input
              name="phone"
              placeholder="WhatsApp / phone"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <select
              name="service"
              required
              defaultValue=""
              className="w-full rounded-2xl border border-white/10 bg-[#0c0c10] px-4 py-3.5 outline-none focus:border-white/25"
            >
              <option value="" disabled>
                Service interest
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <BudgetSelect />
            <input
              name="when"
              placeholder="Preferred day / time (optional)"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Project notes"
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#00f0ff] px-6 py-3.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request schedule"}
            </button>
            {status === "sent" && (
              <p className="text-center text-sm text-emerald-400/90">
                Sent — we&apos;ll reply at {COMPANY_EMAIL} shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400/90">
                Something went wrong. Email us at {COMPANY_EMAIL} or try
                WhatsApp.
              </p>
            )}
          </form>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
