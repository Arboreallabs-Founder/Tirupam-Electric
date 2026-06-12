"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import styles from "./page.module.css";

const techFaqs = [
  {
    q: "How does 9-minute electric bike charging work?",
    a: "TEM Motorrs uses a high-voltage sodium-ion battery stack with CCS2 fast-charging protocol. The integrated BMS manages thermal load and cell health during rapid charging, enabling consistent 9-minute full charges without battery degradation. The bike also charges via any standard 3-pin home socket overnight.",
  },
  {
    q: "What is a structural battery and why does it matter?",
    a: "A structural battery integrates the battery cells into the vehicle's load-bearing chassis — so the battery IS the frame. This eliminates the weight of a separate structure, enables a larger energy pack, improves crash safety by distributing impact loads, and directly delivers TEM's 300km range target.",
  },
  {
    q: "What is ARAS and how does it protect riders?",
    a: "ARAS (Adaptive Rider Assistance System) is TEM's AI-driven safety layer. It processes rider behavior, road conditions, and environmental data in real-time to intervene before danger is perceived. Fleet-wide machine learning means every TEM on the road contributes data that makes every other TEM safer — a compounding safety advantage.",
  },
  {
    q: "What is a magnetless PCB motor?",
    a: "A magnetless PCB (Printed Circuit Board) motor replaces rare-earth permanent magnets with printed circuit board coil technology. This eliminates supply-chain dependence on geopolitically sensitive rare-earth materials (primarily sourced from China), reduces weight, and maintains consistent torque — without sacrificing performance.",
  },
  {
    q: "Can I charge the TEM bike at home without a special charger?",
    a: "Yes. The integrated BMS-charger connects directly to any standard 3-pin household socket in India. No home charger installation or proprietary charging dock required — plug in overnight for a full charge.",
  },
  {
    q: "How many patents does TEM Motorrs have?",
    a: "TEM Motorrs has filed 24 patents covering vehicle design, the magnetless PCB motor, the structural battery architecture, suspension systems, and the integrated BMS-charger. Two patents were granted by the Indian Patent Office as of early 2025.",
  },
];

const innovations = [
  {
    num: "01",
    title: "9 mins Fast Charging",
    subtitle: "Rapid Turnaround",
    desc: "A high-speed charging architecture that delivers 9-minute fast charging for riders who need minimal downtime and maximum daily usability.",
    detail: "The charging system is engineered for repeatability, thermal stability, and battery health protection even under frequent rapid-charge cycles.",
  },
  {
    num: "02",
    title: "AI-Driven ARAS",
    subtitle: "Intelligent Safety",
    desc: "An adaptive rider assistance system that puts intelligent safety at the core — continuously learning from real-world data to protect every ride.",
    detail: "Fleet-wide learning means every TEM on the road makes every other TEM safer. The system adapts to your riding style while maintaining a protective envelope that responds before you even perceive danger.",
  },
  {
    num: "03",
    title: "Magnetless PCB Motor",
    subtitle: "Rare-Earth Free",
    desc: "A rare-earth-independent motor design that eliminates supply-chain fragility while delivering lightweight efficiency and consistent torque.",
    detail: "This design enables resilient sourcing and cleaner manufacturing while maintaining premium ride performance.",
  },
  {
    num: "04",
    title: "Structural Battery",
    subtitle: "Battery Is The Chassis",
    desc: "The battery becomes the chassis itself — reducing total weight, improving dynamics, and unlocking an industry-leading 300 km range ambition.",
    detail: "Structural battery technology dramatically improves energy density by eliminating redundant structural elements. The result: more range, less weight, better handling.",
  },
  {
    num: "05",
    title: "Integrated BMS-Charger",
    subtitle: "BMS Charger",
    desc: "Integrated BMS charger architecture delivers optimized rapid charging, intelligent balancing, and safer daily charging performance.",
    detail: "The unified BMS-charger architecture reduces component count while adapting charge behavior to battery state and thermal conditions.",
  },
  {
    num: "06",
    title: "Intelligence Layer",
    subtitle: "Software Moat",
    desc: "A proprietary data and software platform that compounds over time — every ride makes the fleet smarter, safer, and harder to replicate.",
    detail: "The intelligence layer creates a defensible competitive advantage that grows stronger with scale. More riders, more data, better predictions, safer rides.",
  },
];

export default function TechnologyPage() {
  return (
    <div className="page-enter">

      {/* ── HERO — dark, no image ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label" style={{ color: "rgba(255,255,255,0.45)" }}>
              Technology
            </span>
            <h1 className={styles.heroTitle}>
              Six Innovations.<br />One Platform.
            </h1>
            <p className={styles.heroSub}>
              Every component is purpose-built to reinforce the others — creating
              a system that no single-feature competitor can replicate.
            </p>
          </motion.div>
        </div>
      </section>

      <Marquee words={["9 mins Fast charging", "ARAS AI", "PCB Motor", "Structural Battery", "BMS Charger", "OTA Updates"]} />

      {/* ── INNOVATIONS — text only, full width ── */}
      {innovations.map((item, i) => (
        <section
          key={item.num}
          className={`section ${i % 2 === 1 ? "section-alt" : ""}`}
          id={item.title.toLowerCase().replace(/\s+/g, "-")}
        >
          <div className="container">
            <ScrollReveal className={styles.innovFull}>
              <div className={styles.innovNum}>{item.num}</div>
              <div className={styles.innovSubtitle}>{item.subtitle}</div>
              <h2 className={styles.innovTitle}>{item.title}</h2>
              <p className={styles.innovDesc}>{item.desc}</p>
              <p className={styles.innovDetail}>{item.detail}</p>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* ── FAQ ── */}
      <section className={`section section-alt ${styles.faqSection}`} aria-label="Technology FAQ">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Technical questions, direct answers</h2>
            <p className="section-desc">
              Everything you want to know about how TEM Motorrs' six innovations actually work.
            </p>
          </ScrollReveal>
          <div className={styles.faqGrid}>
            {techFaqs.map((faq) => (
              <article key={faq.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-dark" style={{ textAlign: "center" }}>
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Reserve Your Spot</span>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Engineered for the rider who demands more.</h2>
            <p className="section-desc" style={{ marginInline: "auto" }}>
              Six patented innovations. One electric motorcycle. Pre-orders open now.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/pre-order" className="btn btn-white">Pre-order Now →</Link>
              <Link href="/bike" className="btn btn-outline-white">Explore the Bike</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
