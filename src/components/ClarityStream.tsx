"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * Clarity Stream — visual recreation of
 * https://app.spline.design/community/file/de399826-b9f3-4b1d-890f-7c261b47ebea
 * ("Smooth animated gradient stripe") using anime.js.
 * Official Spline community files require remixing for a public .splinecode URL.
 */
export default function ClarityStream() {
  const stripeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripeRef.current;
    if (!el) return;

    const anim = animate(el, {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      duration: 8000,
      ease: "linear",
      loop: true,
    });

    const float = animate(el, {
      translateY: [-12, 12],
      rotate: [-2, 2],
      duration: 6000,
      ease: "inOut(2)",
      loop: true,
      alternate: true,
    });

    return () => {
      anim.pause();
      float.pause();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={stripeRef}
        className="h-[42vh] w-[140vw] max-w-none rounded-full opacity-50 blur-2xl"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #6366f1, #a855f7, #fcd34d, #6366f1, #22d3ee, #a855f7)",
          backgroundSize: "300% 300%",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
