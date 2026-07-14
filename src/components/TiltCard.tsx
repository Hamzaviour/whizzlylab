"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/** 3D tilt card that follows the cursor with spring damping. */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });
  const transform = useTransform(
    [springRx, springRy],
    ([x, y]) => `perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`,
  );

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * maxTilt * 2);
    rx.set((0.5 - py) * maxTilt * 2);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
