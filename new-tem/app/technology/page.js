"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import { landscapeGallery } from "@/lib/landscapeGallery";
import styles from "./page.module.css";

const TECH_HERO = landscapeGallery[2];

const innovations = [
  {
    num: "01",
    title: "9 mins Fast charging",
    subtitle: "Rapid Turnaround",
    desc: "A high-speed charging architecture that delivers 9-minute fast charging for riders who need minimal downtime and maximum daily usability.",
    detail: "The charging system is engineered for repeatability, thermal stability, and battery health protection even under frequent rapid-charge cycles.",
    image: landscapeGallery[6].src,
  },
  {
    num: "02",
    title: "AI-Driven ARAS",
    subtitle: "Intelligent Safety",
    desc: "An adaptive rider assistance system that puts intelligent safety at the core — continuously learning from real-world data to protect every ride. ARAS processes rider behavior, road conditions, and environmental factors in real-time.",
    detail: "Fleet-wide learning means every TEM on the road makes every other TEM safer. The system adapts to your riding style while maintaining a protective envelope that responds before you even perceive danger.",
    image: landscapeGallery[9].src,
  },
  {
    num: "03",
    title: "Magnetless PCB Motor",
    subtitle: "9 mins Charging",
    desc: "A rare-earth-independent motor design that eliminates supply-chain fragility while delivering lightweight efficiency and consistent torque. Built on printed circuit board technology, this motor performs without geopolitical material dependencies.",
    detail: "This design enables resilient sourcing and cleaner manufacturing while maintaining premium ride performance.",
    image: landscapeGallery[8].src,
  },
  {
    num: "04",
    title: "Structural Battery",
    subtitle: "Battery Is The Chassis",
    desc: "The battery becomes the chassis itself — reducing total weight, improving dynamics, and unlocking an industry-leading 300 km range ambition. This isn't a battery mounted in a frame; this is a frame that is a battery.",
    detail: "Structural battery technology dramatically improves energy density by eliminating redundant structural elements. The result: more range, less weight, better handling.",
    image: landscapeGallery[4].src,
  },
  {
    num: "05",
    title: "Integrated BMS-Charger",
    subtitle: "BMS Charger",
    desc: "Integrated BMS charger architecture delivers optimized rapid charging, intelligent balancing, and safer daily charging performance.",
    detail: "The unified BMS-charger architecture reduces component count while adapting charge behavior to battery state and thermal conditions.",
    image: landscapeGallery[5].src,
  },
  {
    num: "06",
    title: "Intelligence Layer",
    subtitle: "Software Moat",
    desc: "A proprietary data and software platform that compounds over time — every ride makes the fleet smarter, safer, and harder to replicate. Over-the-air updates continuously evolve your TEM without a single visit to a service center.",
    detail: "The intelligence layer creates a defensible competitive advantage that grows stronger with scale. More riders, more data, better predictions, safer rides.",
    image: landscapeGallery[7].src,
  },
];

export default function TechnologyPage() {
  return (
    <div className="page-enter">
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={TECH_HERO.src}
            alt={TECH_HERO.alt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>
              Technology
            </span>
            <h1 className={styles.heroTitle}>
              Six Innovations.
              <br />
              One Platform.
            </h1>
            <p className={styles.heroSub}>
              Every component is purpose-built to reinforce the others — creating
              a system that no single-feature competitor can replicate.
            </p>
          </motion.div>
        </div>
      </section>

      <Marquee words={["9 mins Fast charging", "ARAS AI", "PCB Motor", "Structural Battery", "BMS Charger", "OTA Updates"]} />

      {innovations.map((item, i) => (
        <section
          key={item.num}
          className={`section ${i % 2 === 1 ? "section-alt" : ""}`}
          id={item.title.toLowerCase().replace(/\s+/g, "-")}
        >
          <div className="container">
            <div className={`${styles.innovRow} ${i % 2 === 1 ? styles.innovReverse : ""}`}>
              <ScrollReveal className={styles.innovText}>
                <div className={styles.innovNum}>{item.num}</div>
                <div className={styles.innovSubtitle}>{item.subtitle}</div>
                <h2 className={styles.innovTitle}>{item.title}</h2>
                <p className={styles.innovDesc}>{item.desc}</p>
                <p className={styles.innovDetail}>{item.detail}</p>
              </ScrollReveal>

              <ScrollReveal className={styles.innovImage} delay={0.2} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={styles.innovImageFrame}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={styles.innovPhoto}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
