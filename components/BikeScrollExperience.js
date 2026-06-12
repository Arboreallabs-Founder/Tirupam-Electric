"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useScroll, transform } from "framer-motion";
import styles from "./BikeScrollExperience.module.css";

const BikeScrollCanvas = dynamic(() => import("./BikeScrollCanvas"), { ssr: false });

const stages = [
  {
    range: [0.16, 0.34],
    side: "right",
    label: "300 km Range",
    title: "Range that ends range anxiety.",
    desc: "Structural battery-as-chassis engineering places the cells inside the frame itself — more than double the range of any Indian competitor.",
  },
  {
    range: [0.36, 0.54],
    side: "left",
    label: "9-Minute Charge",
    title: "Charged before your coffee cools.",
    desc: "A high-voltage sodium-ion stack with CCS2 fast charging delivers repeatable 9-minute charges. Or plug into any 3-pin socket overnight.",
  },
  {
    range: [0.56, 0.74],
    side: "right",
    label: "ARAS Safety",
    title: "It thinks while you ride.",
    desc: "AI-driven ARAS processes road conditions, rider behaviour, and environment in real time — every TEM on the road makes every other TEM safer.",
  },
];

/*
 * NOTE: styles are written imperatively from a progress subscription instead
 * of motion.div style bindings — the bound-MotionValue path went stale against
 * useScroll's post-mount target measurement (kept reading page-level progress).
 */
function useScrollStyle(progress, apply) {
  const ref = useRef(null);
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    const update = (p) => {
      if (ref.current) applyRef.current(ref.current, p);
    };
    update(progress.get());
    return progress.on("change", update);
  }, [progress]);

  return ref;
}

function fade(el, opacity, y) {
  el.style.opacity = opacity;
  el.style.transform = `translateY(${y}px)`;
  el.style.visibility = opacity < 0.02 ? "hidden" : "visible";
}

function Stage({ progress, stage }) {
  const [a, b] = stage.range;
  const ref = useScrollStyle(progress, (el, p) => {
    fade(
      el,
      transform(p, [a, a + 0.05, b - 0.05, b], [0, 1, 1, 0]),
      transform(p, [a, b], [50, -50]),
    );
  });

  return (
    <div
      ref={ref}
      className={`${styles.stage} ${stage.side === "left" ? styles.stageLeft : styles.stageRight}`}
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <span className={styles.stageLabel}>{stage.label}</span>
      <h2 className={styles.stageTitle}>{stage.title}</h2>
      <p className={styles.stageDesc}>{stage.desc}</p>
    </div>
  );
}

export default function BikeScrollExperience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const heroRef = useScrollStyle(scrollYProgress, (el, p) => {
    fade(el, transform(p, [0, 0.1], [1, 0]), transform(p, [0, 0.12], [0, -60]));
  });

  const finalRef = useScrollStyle(scrollYProgress, (el, p) => {
    fade(el, transform(p, [0.78, 0.88], [0, 1]), transform(p, [0.78, 0.92], [50, 0]));
  });

  const hintRef = useScrollStyle(scrollYProgress, (el, p) => {
    el.style.opacity = transform(p, [0, 0.05], [1, 0]);
  });

  const railRef = useScrollStyle(scrollYProgress, (el, p) => {
    el.style.transform = `scaleY(${p})`;
  });

  return (
    <section ref={trackRef} className={styles.track} aria-label="TEM Tirupam — interactive scroll experience">
      <div className={styles.sticky}>
        <div className={styles.bgGlow} aria-hidden />

        <BikeScrollCanvas progress={scrollYProgress} />

        {/* Stage 0 — hero */}
        <div ref={heroRef} className={styles.heroBlock}>
          <span className={styles.eyebrow}>India · New Delhi · Est. 2024</span>
          <h1 className={styles.heroTitle}>
            India's Most<br />Advanced<br />Electric<br />Machine.
          </h1>
          <div className={styles.specLine}>
            <span>300 km</span>
            <span className={styles.dot} aria-hidden />
            <span>9 min charge</span>
            <span className={styles.dot} aria-hidden />
            <span>24 patents</span>
          </div>
          <div className={styles.ctas}>
            <Link href="/bike" className="btn btn-white">Explore the Bike</Link>
            <Link href="/pre-order" className="btn btn-outline-white">Reserve Now →</Link>
          </div>
        </div>

        {/* Stages 1–3 — feature reveals as the bike rotates */}
        {stages.map((stage) => (
          <Stage key={stage.label} progress={scrollYProgress} stage={stage} />
        ))}

        {/* Final stage — centered finale + CTA */}
        <div ref={finalRef} className={styles.finalBlock} style={{ opacity: 0, visibility: "hidden" }}>
          <span className={styles.eyebrow}>The 9-Minute EV</span>
          <h2 className={styles.finalTitle}>Tirupam.</h2>
          <p className={styles.finalDesc}>300 km range · 9-minute charge · 24 patents · ₹2.25 lakh</p>
          <div className={styles.ctas} style={{ justifyContent: "center" }}>
            <Link href="/bike" className="btn btn-white">Explore the Bike</Link>
            <Link href="/pre-order" className="btn btn-outline-white">Reserve Now →</Link>
          </div>
        </div>

        {/* Scroll hint — visible only at the very top */}
        <div ref={hintRef} className={styles.scrollHint} aria-hidden>
          <span>Scroll</span>
          <span className={styles.scrollLine} />
        </div>

        {/* Progress rail */}
        <div className={styles.progressRail} aria-hidden>
          <div ref={railRef} className={styles.progressFill} style={{ transform: "scaleY(0)" }} />
        </div>
      </div>
    </section>
  );
}
