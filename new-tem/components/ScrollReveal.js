"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -40px 0px" });

  const offsets = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  const hidden = { opacity: 0, ...offsets[direction] };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
