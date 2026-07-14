"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { animate } from "animejs";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  delay?: number;
};

/**
 * Text Reveal on Scroll — inspired by
 * https://framer.com/m/Text-Reveal-on-Scroll-iAEwo4.js@r5fIqIUYTgYRry5w2nRx
 */
export default function TextRevealOnScroll({
  children,
  className = "",
  as = "div",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Tag = as;

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    animate(el, {
      opacity: [0, 1],
      translateY: [48, 0],
      filter: ["blur(8px)", "blur(0px)"],
      duration: 900,
      delay,
      ease: "out(3)",
    });
  }, [inView, delay]);

  return (
    <Tag ref={ref as never} className={`opacity-0 ${className}`}>
      {children}
    </Tag>
  );
}

/** Word-staggered headline reveal */
export function TextRevealWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const words = ref.current.querySelectorAll(".tr-word");
    animate(words, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 700,
      delay: ((_: HTMLElement, i: number) => i * 60) as never,
      ease: "out(3)",
    });
  }, [inView]);

  return (
    <h2 ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="tr-word mr-[0.28em] inline-block opacity-0"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}
