"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./page.module.css";

const roadmap = [
  {
    year: "2025",
    title: "Foundation",
    desc: "Energy architecture finalized, rider pain-points validated, initial concept complete. 24 patents filed across motor, battery, and design.",
    status: "current",
    proofLabel: "Foundation in Practice",
    images: [
      { src: "/images/chasis img.jpeg", caption: "Chassis FEA — Von Mises Stress Validation" },
      { src: "/images/batt img.jpeg", caption: "Battery System — Live Voltage Testing" },
    ],
  },
  {
    year: "2026",
    title: "Prototype",
    desc: "Functional prototype on-road with real-world range, charging, and thermal testing. First ride demonstrations to select investors and partners.",
    status: "next",
    proofLabel: "Prototype in Progress",
    images: [
      { src: "/images/mvp v1 img.jpeg", caption: "MVP V1 — First Physical Prototype" },
    ],
  },
  {
    year: "2027",
    title: "Validation",
    desc: "Design freeze, certifications, pilot fleet deployment, manufacturing partners signed. Regulatory approvals across key markets.",
  },
  {
    year: "2028",
    title: "Launch",
    desc: "Premium metro launch — first customer deliveries through direct-to-consumer model. Flagship experience centers in top-tier cities.",
  },
  {
    year: "2029",
    title: "Scale",
    desc: "Expansion into Tier-II cities and international markets. Fleet intelligence compounding. Platform extensions explored.",
  },
];

function RoadmapSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const active = activeIndex !== null ? roadmap[activeIndex] : null;

  return (
    <div className={styles.roadmapLayout}>

      {/* ── Left: timeline ── */}
      <div className={styles.roadmapLeft}>
        <div className={styles.timelineLine} aria-hidden />
        {roadmap.map((item, i) => {
          const hasContent = i < 2;
          return (
            <div
              key={item.year}
              onMouseEnter={hasContent ? () => setActiveIndex(i) : undefined}
              onMouseLeave={hasContent ? () => setActiveIndex(null) : undefined}
              className={[
                styles.timelineItem,
                item.status === "current" ? styles.timelineCurrent : "",
                hasContent ? styles.timelineHighlighted : styles.timelineFuture,
                activeIndex === i ? styles.timelineActive : "",
              ].join(" ")}
            >
              <div className={styles.timelineDot}>
                {item.status === "current" && <span className={styles.timelinePulse} />}
              </div>
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineBody}>
                <h3 className={styles.timelineTitle}>
                  {item.title}
                  {!hasContent && <span className={styles.comingSoon}>(Coming Soon)</span>}
                </h3>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Right: sticky panel ── */}
      <div className={styles.roadmapRight}>
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.panelIdle}
            >
              <p className={styles.panelIdleText}>Hover a milestone to explore</p>
            </motion.div>
          ) : active?.images ? (
            <motion.div
              key={`img-${activeIndex}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.panelLabel}>{active.proofLabel}</span>
              <div className={`${styles.panelImages} ${active.images.length === 1 ? styles.panelImagesSingle : ""}`}>
                {active.images.map(img => (
                  <div key={img.src} className={styles.panelImageItem}>
                    <div className={styles.panelImageFrame}>
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        className={styles.panelImagePhoto}
                      />
                    </div>
                    <p className={styles.panelCaption}>{img.caption}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function InvestorsPage() {
  return (
    <div className="page-enter">

      {/* ── CTA ── */}
      <section className={`section section-dark ${styles.ctaSection}`} style={{ paddingTop: "calc(var(--nav-height) + 4rem)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <span className="section-label" style={{ justifyContent: "center" }}>Get In Touch</span>
            <h2 className={styles.ctaTitle}>Ready to learn more?</h2>
            <p className="section-desc" style={{ marginInline: "auto" }}>
              We share a full pitch deck, financial model, and patent summary
              under NDA with qualified investors. Reach out directly.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn btn-white">Request Deck →</Link>
              <a href="mailto:finance@temmotorrs.com" className="btn btn-outline-white">Email Us</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Roadmap</span>
            <h2 className="section-title">From vision to road.</h2>
            <p className="section-desc">
              Every milestone is sequenced to compound learning, de-risk execution,
              and build brand desirability before the first sale.
            </p>
          </ScrollReveal>
          <RoadmapSection />
        </div>
      </section>

    </div>
  );
}
