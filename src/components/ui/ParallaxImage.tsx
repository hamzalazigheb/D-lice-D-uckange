"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps any element and shifts it vertically by `factor * scrollProgress`
 * relative to its container — creates a subtle parallax depth effect.
 */
export function ParallaxImage({
  children,
  factor = 60,
  className,
}: {
  children: ReactNode;
  factor?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-factor / 2, factor / 2]);

  return (
    /* overflow:hidden clips the taller inner div; position:relative is required
       by Next.js <Image fill> when this div is the direct parent.              */
    <div ref={ref} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <motion.div style={{ y }} className="relative h-[115%] w-full">
        {children}
      </motion.div>
    </div>
  );
}
