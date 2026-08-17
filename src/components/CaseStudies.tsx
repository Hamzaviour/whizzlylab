"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { TextRevealWords } from "./TextRevealOnScroll";
import TiltCard from "./TiltCard";

const cases = [
  {
    title: "EchoSense",
    tag: "AI · Real-time Pipeline",
    description:
      "Real-time crisis intervention pipeline using Kafka and Spark NLP to detect and flag high-priority indicators — with RAG and live Hugging Face deployment.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    live: "https://hamzavelous-echosense-ai.hf.space/login",
  },
  {
    title: "CureCMS Solution",
    tag: "Healthcare · AI Agents",
    description:
      "AI-powered medical billing and revenue cycle management for healthcare providers — HIPAA-conscious with intelligent RCM agents.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    live: "https://curercmsolution.com/",
  },
  {
    title: "COMPLYSECOPS",
    tag: "Cybersecurity · Next.js",
    description:
      "Cybersecurity and compliance consulting platform with an AI assistant, GRC services, penetration testing, and global SOC support.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    live: "https://complysecops.netlify.app/",
  },
  {
    title: "OXO Packaging",
    tag: "E-commerce · Full-Stack",
    description:
      "Custom packaging e-commerce with product categories, quote flows, and wholesale ordering built for USA clients.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    live: "https://umairpackaging.netlify.app/",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="relative z-10 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <p className="text-xs font-medium tracking-[0.2em] text-foreground/40 uppercase">
            Selected work
          </p>
          <TextRevealWords
            text="Built for production"
            className="font-general mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
          />
          <p className="mt-4 max-w-2xl text-hero-sub/80">
            AI systems, data pipelines, and product platforms shipped under
            Whizzly Lab — from{" "}
            <a
              href="https://hamzayounas.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="interactive-link text-foreground"
            >
              Hamza Younas
            </a>
            .
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {cases.map((item, i) => (
            <TiltCard key={item.title}>
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="liquid-glass group overflow-hidden rounded-2xl"
              >
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.tag.replace(' · ', ' case study: ')}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_87%_3%)] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-cyan-400/0 transition duration-500 group-hover:bg-cyan-400/10" />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs tracking-widest text-foreground/45 uppercase">
                    {item.tag}
                  </p>
                  <h3 className="font-general mt-2 text-2xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-hero-sub/75">
                    {item.description}
                  </p>
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300/90 transition group-hover:gap-3 hover:text-cyan-200"
                  >
                    View live <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
