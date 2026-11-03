"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Continuously floating badge — used for decorative accents. */
export function FloatBadge({
  children,
  className,
  delay = 0,
  amplitude = 10,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration: 5 + delay * 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
