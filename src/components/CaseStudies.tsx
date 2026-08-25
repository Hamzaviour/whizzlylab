"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";
import { TextRevealWords } from "./TextRevealOnScroll";
import TiltCard from "./TiltCard";

const cases = [
  {
    title: "EchoSense",
    tag: "AI · Real-Time Crisis NLP",
    outcome: "70% Faster Signal Detection",
    description:
      "Real-time crisis intervention pipeline using Kafka and Spark NLP to detect and flag high-priority indicators — with RAG and live Hugging Face deployment.",
    stack: ["Kafka", "Spark NLP", "RAG", "Hugging Face"],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    live: "https://hamzavelous-echosense-ai.hf.space/login",
  },
  {
    title: "CureCMS Solution",
    tag: "Healthcare · AI Agents",
    outcome: "HIPAA Compliant Automation",
    description:
      "AI-powered medical billing and revenue cycle management for healthcare providers — HIPAA-conscious with intelligent RCM agents.",
    stack: ["AI Agents", "Healthcare RCM", "HIPAA", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    live: "https://curercmsolution.com/",
  },
  {
    title: "COMPLYSECOPS",
    tag: "Cybersecurity · SaaS Platform",
    outcome: "15+ Hours Saved Weekly",
    description:
      "Cybersecurity and compliance consulting platform with an AI assistant, GRC services, penetration testing, and global SOC support.",
    stack: ["Next.js", "AI Assistant", "Compliance GRC", "Cloud SOC"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    live: "https://complysecops.netlify.app/",
  },
  {
    title: "OXO Packaging",
    tag: "E-Commerce · Custom Engine",
    outcome: "500+ Daily Bulk Orders",
    description:
      "Custom packaging e-commerce with product categories, quote flows, and wholesale ordering built for international clients.",
    stack: ["Full-Stack", "Custom Pricing Engine", "E-Commerce", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    live: "https://umairpackaging.netlify.app/",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="relative z-10 px-4 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400/80 uppercase">
              Proven Production Builds
            </p>
            <TextRevealWords
              text="Shipped systems with measurable impact"
              className="font-general mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
            />
            <p className="mt-4 max-w-2xl text-hero-sub/80 text-base">
              Explore deployed systems engineered by Whizzly Lab — spanning real-time NLP streaming, healthcare agents, cybersecurity, and enterprise e-commerce.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-md self-start md:self-auto">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-medium text-hero-sub/90">
              100% Live In Production
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {cases.map((item, i) => (
            <TiltCard key={item.title}>
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="liquid-glass group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.tag} production case study by Whizzly Lab`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-[#05010f]/40 to-transparent" />
                  
                  {/* Top outcome badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full border border-cyan-500/30 bg-[#05010f]/80 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-lg">
                      {item.outcome}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <p className="text-xs font-medium tracking-widest text-hero-sub/60 uppercase">
                      {item.tag}
                    </p>
                    <h3 className="font-general mt-2 text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-hero-sub/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                    >
                      Live App <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
