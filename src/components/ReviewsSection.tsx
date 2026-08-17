"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Chen",
    role: "CTO, FinTech Startup",
    location: "San Francisco, CA",
    rating: 5,
    text: "Whizzly Lab built our real-time fraud detection pipeline in under 6 weeks. The Kafka + ML setup handles 10x our traffic now. Exactly what we needed — production-grade, not a prototype.",
  },
  {
    name: "Marcus Webb",
    role: "Head of Engineering, HealthTech",
    location: "London, UK",
    rating: 5,
    text: "Their RAG implementation for our medical documentation system cut retrieval time by 70%. Hamza and team understood HIPAA requirements from day one. Rare to find that depth in a Pakistan-based team.",
  },
  {
    name: "Ayesha Rahman",
    role: "Founder, E-commerce Platform",
    location: "Dubai, UAE",
    rating: 5,
    text: "OXO Packaging was built end-to-end by Whizzly Lab — from product catalog to wholesale ordering. They shipped on time, on budget, and the site handles 500+ daily orders without a hiccup.",
  },
  {
    name: "David Park",
    role: "VP Product, Cybersecurity",
    location: "Singapore",
    rating: 5,
    text: "COMPLYSECOPS replaced three separate tools with one unified platform. The AI assistant they built for compliance documentation saves our team 15+ hours per week. Worth every rupee.",
  },
  {
    name: "Jennifer Liu",
    role: "Director of Data, NGO",
    location: "Toronto, Canada",
    rating: 5,
    text: "EchoSense changed how we handle crisis alerts. The real-time NLP pipeline catches high-priority signals that our old system missed. Whizzly Lab ships fast and ships right.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-[#fcd34d] text-[#fcd34d]"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="relative px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-foreground/40 uppercase">
            Testimonials
          </p>
          <h2
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
            style={{ fontFamily: "'Syne', 'General Sans', sans-serif" }}
          >
            What clients say
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-hero-sub/70">
            Trusted by engineering teams across 4 continents.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="liquid-glass rounded-2xl p-6 flex flex-col"
            >
              <StarRating count={review.rating} />
              <p className="mt-4 text-sm leading-relaxed text-hero-sub/80 flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{review.name}</p>
                  <p className="text-xs text-hero-sub/60">
                    {review.role}
                  </p>
                  <p className="text-xs text-hero-sub/40">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
