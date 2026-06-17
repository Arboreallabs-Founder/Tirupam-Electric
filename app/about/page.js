"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import StatsStrip from "@/components/StatsStrip";
import styles from "./page.module.css";

const roadmap = [
  {
    year: "2025",
    title: "Foundation",
    desc: "Energy architecture finalized, rider pain-points validated, initial concept complete. 24 patents filed across motor, battery, and design.",
    status: "current",
  },
  {
    year: "2026",
    title: "Prototype",
    desc: "Functional prototype on-road with real-world range, charging, and thermal testing. First ride demonstrations to select investors and partners.",
    status: "next",
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

const stats = [
  { number: "24", suffix: "", label: "Patents Filed" },
  { number: "6", suffix: "", label: "Core Innovations" },
  { number: "300", suffix: " km", label: "Range Target" },
  { number: "2026", suffix: "", label: "Prototype Year" },
];

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safety First",
    desc: "Every rider deserves intelligent protection — not as an add-on, but as a core design principle.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: "Engineering Truth",
    desc: "No shortcuts. No spec-sheet theater. Every claim is backed by rigorous validation.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Rider Empathy",
    desc: "We don't design for riders — we design with them. Every feature solves a real pain point.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Long-Term Thinking",
    desc: "We build for decades, not quarters. Modular design and OTA updates ensure longevity.",
  },
];

const valuesContainerAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const valuesItemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* ── Hero — dark, no image ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroCentered}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.heroEyebrow}>About Tem Motorrs</span>
            <h1 className={styles.heroTitle}>Built To Think.</h1>
            <p className={styles.heroSub}>
              We&apos;re not building another electric scooter. We&apos;re reimagining
              what urban mobility can be when you start from first principles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsStrip stats={stats} />

      {/* ── Manifesto ── */}
      <section className={`section ${styles.manifesto}`}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.manifestoInner}>
              <blockquote className={styles.manifestoQuote}>
                &ldquo;What would urban mobility look like if you could bring the bike
                to the power, instead of the other way around?&rdquo;
              </blockquote>
              <div className={styles.manifestoAttr}>
                <div className={styles.manifestoRole}>The Question That Started It All</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section section-alt">
        <div className="container">
          <div className={styles.missionGrid}>
            <ScrollReveal className={styles.missionText}>
              <span className="section-label">Our Mission</span>
              <h2 className={styles.missionTitle}>
                The world&apos;s most intelligent, fast-charging, and safe electric two-wheeler.
              </h2>
              <p className={styles.missionDesc}>
                India&apos;s EV two-wheeler market is growing fast, but riders still face the same three
                barriers: limited charging infrastructure, range anxiety, and safety concerns.
              </p>
              <p className={styles.missionDesc}>
                Tem Motorrs was founded to eliminate all three — not by incrementally improving what
                exists, but by fundamentally rethinking the vehicle itself. The future of urban mobility
                is intelligent, safer, and powered by 9-minute fast charging.
              </p>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className={`section ${styles.visionSection}`}>
        <div className="container">
          <div className={styles.visionLayout}>
            <ScrollReveal className={styles.visionTextCol}>
              <span className="section-label">Our Vision</span>
              <h2 className={styles.visionTitle}>Building what doesn&apos;t exist yet.</h2>
              <div className={styles.visionDivider} />
              <p className={styles.visionDesc}>
                Tem Motorrs was born from a first-principles approach to product development —
                questioning every assumption about what an electric two-wheeler should be.
              </p>
              <p className={styles.visionDesc}>
                Our team of innovators is committed to making premium electric mobility
                accessible, safe, and truly practical for daily use. Every decision is guided by engineering
                truth and rider empathy.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What we stand for.</h2>
          </ScrollReveal>

          <motion.div
            className={styles.valuesGrid}
            variants={valuesContainerAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px", amount: 0.15 }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                variants={valuesItemAnim}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div className={styles.valueIcon}>{v.icon}</div>
                <div className={styles.valueContent}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section section-dark ${styles.ctaSection}`}>
        <div className="container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <span className="section-label">Join Us</span>
            <h2 className={styles.ctaTitle}>
              Join the journey.
            </h2>
            <p className="section-desc" style={{ marginInline: "auto", textAlign: "center" }}>
              Tem Motorrs is building something that hasn&apos;t existed before.
              If that excites you, we&apos;d love to hear from you.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/pre-order" className="btn btn-white">Pre-order Now →</Link>
              <Link href="/contact" className="btn btn-outline-white">Get In Touch</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
