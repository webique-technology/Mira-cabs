"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Scroll-triggered fade/slide reveal. Skips motion entirely when the user prefers reduced motion. */
export function Reveal({ children, delay = 0, className, y = 16 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
