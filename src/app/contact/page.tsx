"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResponseTimePromise from "@/components/ResponseTimePromise";
import {
  COMPANY_EMAIL,
  WHATSAPP_URL,
  submitWeb3Form,
} from "@/lib/contact";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitWeb3Form({
        subject: `Whizzly Lab Contact — ${String(data.get("name") || "")}`,
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("sent");
      form.reset();
      window.location.href = "/thank-you";
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
            Contact
          </p>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
          <h1
            className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight italic sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Let&apos;s build your next product.
          </h1>
          <p className="mx-auto mt-4 max-w-xl break-words text-sm text-hero-sub/80 sm:text-base">
            Reach Whizzly Lab at{" "}
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {COMPANY_EMAIL}
            </a>
            .
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-foreground/40">
            Plot 377, Shahbaz Block Mustafa Town, Lahore, Pakistan
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/schedule"
              className="liquid-glass-strong font-body inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Schedule a Consult
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-6 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
            >
              WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/pricing"
              className="font-body inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View Pricing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ResponseTimePromise />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <form
            onSubmit={onSubmit}
            className="liquid-glass mx-auto max-w-xl space-y-4 rounded-3xl p-5 sm:p-8"
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
          <textarea
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 outline-none placeholder:text-foreground/30 focus:border-white/25"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-medium transition hover:bg-white/15 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && (
            <p className="text-center text-sm text-emerald-400/90">
              Message sent to Whizzly Lab — we&apos;ll reply soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-400/90">
              Couldn&apos;t send. Try {COMPANY_EMAIL} or WhatsApp.
            </p>
          )}
          </form>

          {/* Map */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">Find us</h2>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5!2d74.3!3d31.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff7b6f5c1b6d%3A0x0!2sMustafa+Town%2C+Lahore!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Whizzly Lab location map"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="space-y-2 text-sm text-hero-sub/70">
              <p>
                <strong className="text-white">Address:</strong> Plot 377,
                Shahbaz Block Mustafa Town, Lahore, Pakistan
              </p>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-foreground underline underline-offset-4 hover:text-white"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
              <p>
                <strong className="text-white">WhatsApp:</strong>{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
                >
                  +92 303 9969903
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
