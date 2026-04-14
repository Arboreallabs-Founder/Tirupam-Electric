"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import styles from "./StatsStrip.module.css";
import clsx from "clsx";

function runCountUp(target, duration, setValue) {
  const num = parseFloat(target);
  const isFloat = !Number.isInteger(num);
  const steps = 60;
  const increment = num / steps;
  let current = 0;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    current += increment;
    if (step >= steps) {
      setValue(num);
      clearInterval(timer);
    } else {
      setValue(isFloat ? parseFloat(current.toFixed(2)) : Math.floor(current));
    }
  }, (duration * 1000) / steps);
  return timer;
}

function AnimatedNumber({ target, suffix = "", duration = 2, startImmediately = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  /* Hero strip: animate on mount (no in-view gate). Split from scroll-gated path so
     React Strict Mode’s effect replay still completes — a “run once” ref breaks the 2nd run. */
  useEffect(() => {
    if (!startImmediately) return;
    const timer = runCountUp(target, duration, setValue);
    return () => clearInterval(timer);
  }, [startImmediately, target, duration]);

  /* Other pages: wait until in view */
  useEffect(() => {
    if (startImmediately) return;
    if (!isInView) return;
    const timer = runCountUp(target, duration, setValue);
    return () => clearInterval(timer);
  }, [startImmediately, isInView, target, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsStrip({ stats, dark = false, startImmediately = false }) {
  return (
    <div className={clsx(styles.strip, dark && styles.dark)}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.cell}>
          <div className={styles.number}>
            <AnimatedNumber
              target={stat.number}
              suffix={stat.suffix || ""}
              startImmediately={startImmediately}
            />
          </div>
          <div className={styles.label}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
