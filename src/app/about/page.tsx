import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageNavbar from "@/components/PageNavbar";
import CtaFooter from "@/components/CtaFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { BASE_URL, ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About — Whizzly Lab | AI Engineering Studio Lahore",
  description:
    "Whizzly Lab is an AI and full-stack engineering studio founded by Hamza Younas, with a team of developers and engineers shipping intelligent systems from Lahore to the world. Portfolio includes EchoSense, CureCMS, COMPLYSECOPS.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About — Whizzly Lab",
    description:
      "Founded by AI engineer Hamza Younas — a team of full-stack developers, ML engineers, and systems architects.",
    url: `${BASE_URL}/about`,
    images: [ogImage()],
  },
  twitter: {
    title: "About — Whizzly Lab",
    description: "AI engineering studio founded by Hamza Younas in Lahore.",
    images: [ogImage()],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[hsl(260_87%_3%)] text-foreground">
      <PageNavbar />

      <section className="relative overflow-hidden px-4 py-12 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-[#00F0FF]/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
          <h1
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            Whizzly Lab builds intelligent products that ship.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-hero-sub/85">
            We are an AI, ML, and full-stack engineering studio. From real-time
            Kafka pipelines to RAG agents and production web apps — we turn
            ambitious briefs into systems companies rely on.
          </p>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/transparent-logo.png"
                alt="Whizzly Lab"
                fill
                className="object-contain p-8 scale-110"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-5 text-base leading-relaxed text-hero-sub/80">
              <p>
                Founded by AI engineer{" "}
                <a
                  href="https://hamzayounas.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  Hamza Younas
                </a>{" "}
                (Lahore · shipping globally), Whizzly Lab is a growing team of
                full-stack developers, ML engineers, and systems architects
                united by one principle — ship systems people rely on.
              </p>
              <p>
                Portfolio highlights include EchoSense (crisis NLP pipelines),
                CureCMS (healthcare RCM), COMPLYSECOPS (compliance), and OXO
                Packaging (e-commerce) — end-to-end builds with measurable
                outcomes.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/services"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
                >
                  Explore services
                </Link>
                <Link
                  href="/schedule"
                  className="rounded-full bg-gradient-to-r from-[#6366f1] to-[#00f0ff] px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Schedule a consult
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Focus", v: "AI · ML · Full-stack" },
              { k: "Base", v: "Lahore, Pakistan" },
              { k: "Reach", v: "Global clients & remotes" },
            ].map((item) => (
              <div key={item.k} className="liquid-glass rounded-2xl p-6">
                <p className="text-xs tracking-widest text-foreground/40 uppercase">
                  {item.k}
                </p>
                <p className="mt-2 text-xl font-medium">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-5 text-base leading-relaxed text-hero-sub/80 order-2 lg:order-1">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl" style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}>
                The Team Behind the Build
              </h2>
              <p>
                Whizzly Lab is powered by a focused team of engineers who treat
                every project like a product — not a task list. From data
                pipelines to deployed ML models, each member brings deep
                specialization and a bias for shipping systems that scale.
              </p>
              <p>
                Based in Lahore, working across time zones. We partner with
                startups, product teams, and enterprise engineering orgs —
                bringing clarity to complex problems and velocity to ambitious
                timelines.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
                >
                  Our services
                </Link>
                <Link
                  href="/schedule"
                  className="rounded-full bg-gradient-to-r from-[#6366f1] to-[#00f0ff] px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Meet the team
                </Link>
              </div>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-white/10 order-1 lg:order-2">
              <Image
                src="/team-photo.png"
                alt="Whizzly Lab team photo — engineers at work"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <FAQSection />
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}
