import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services — Whizzly Lab | AI, ML & Full-Stack Development",
  description:
    "Whizzly Lab offers AI engineering, machine learning, RAG pipelines, web development, automation, data analytics, computer vision, and business solutions — end-to-end from Lahore to the world.",
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    title: "Services — Whizzly Lab",
    description: "AI, ML, data pipelines & full-stack engineering services.",
    url: `${BASE_URL}/services`,
    images: [ogImage()],
  },
  twitter: {
    title: "Services — Whizzly Lab",
    description: "AI, ML & full-stack engineering services.",
    images: [ogImage()],
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />

      <section className="px-4 py-12 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
            Services
          </p>
          <h1
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            What Whizzly Lab ships
          </h1>
          <p className="mt-4 max-w-2xl text-base text-hero-sub/80 sm:text-lg">
            End-to-end AI engineering and product delivery for startups and
            enterprises — from models to interfaces. Open a service for full
            detail.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group liquid-glass overflow-hidden rounded-2xl transition hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`${s.title} — Whizzly Lab service`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_87%_3%)] to-transparent" />
                  {s.tag ? (
                    <span
                      className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-black uppercase"
                      style={{ background: s.accentColor }}
                    >
                      {s.tag}
                    </span>
                  ) : null}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-medium">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-hero-sub/70">
                    {s.short}
                  </p>
                  <span
                    className="mt-4 inline-block text-sm font-semibold"
                    style={{ color: s.accentColor }}
                  >
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
