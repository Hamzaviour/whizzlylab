"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

type Props = {
  text: string;
  className?: string;
  /** Characters per reveal step */
  speed?: number;
  /** Delay before start (ms) */
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
};

/**
 * ProTextType — inspired by
 * https://framer.com/m/ProTextType-KXoZ.js@zQQ6Rh7yVYyuhKxBRwZJ
 * Typed reveal with blink caret, powered by anime.js
 */
export default function ProTextType({
  text,
  className = "",
  speed = 28,
  delay = 200,
  as = "span",
}: Props) {
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = textRef.current;
    const caret = caretRef.current;
    if (!el) return;

    el.textContent = "";
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        el.textContent = text.slice(0, i);
        if (i >= text.length) {
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    if (caret) {
      animate(caret, {
        opacity: [1, 0],
        duration: 600,
        ease: "inOut(2)",
        loop: true,
        alternate: true,
      });
    }

    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay]);

  return (
    <Tag className={className}>
      <span ref={textRef} />
      <span
        ref={caretRef}
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-current align-middle"
      />
    </Tag>
  );
}
