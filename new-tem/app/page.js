"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import StatsStrip from "@/components/StatsStrip";
import InnovationTabs from "@/components/InnovationTabs";
import {
  IconHomeCharging,
  IconRange,
  IconAiSafety,
} from "@/components/BenefitIcons";
import { landscapeGallery, landscapeSlice } from "@/lib/landscapeGallery";
import styles from "./page.module.css";

const homeHero = landscapeGallery[0];
const homeShowcase = landscapeGallery[4];
const homeStrip = landscapeSlice(0, 4);

const showcaseSpecs = [
  {
    index: "01",
    value: "300 km",
    label: "Range per charge",
    desc: "Structural battery-as-chassis delivers industry-leading range for daily urban and inter-city commutes.",
  },
  {
    index: "02",
    value: "3-Pin",
    label: "Home socket charging",
    desc: "No proprietary infrastructure needed. Plug into any standard household outlet overnight.",
  },
  {
    index: "03",
    value: "9 mins",
    label: "Fast charging",
    desc: "Advanced BMS charger architecture enables rapid 9-minute charging for high-uptime urban riding.",
  },
];

const showcaseSpecsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const showcaseSpecsItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const benefitsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const benefitsItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroStats = [
  { number: "300", suffix: " km", label: "Range Vision" },
  { number: "24", suffix: "", label: "Patents Filed" },
  { number: "6", suffix: "", label: "Innovations" },
  { number: "9", suffix: " mins", label: "Fast charging" },
];

const benefits = [
  {
    Icon: IconHomeCharging,
    title: "9 mins Fast charging",
    desc: "Advanced BMS charger delivers 9-minute rapid charging for quick turnarounds and daily convenience.",
  },
  {
    Icon: IconRange,
    title: "300 km Range",
    desc: "Structural battery-as-chassis engineering unlocks range that eliminates anxiety completely.",
  },
  {
    Icon: IconAiSafety,
    title: "AI-First Safety",
    desc: "ARAS continuously learns from fleet data to deliver adaptive, intelligent rider protection.",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div className={styles.heroBg} style={{ scale: heroScale }}>
          <Image
            src={homeHero.src}
            alt={homeHero.alt}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
          <div className={styles.heroOverlay} />
        </motion.div>

        <div className={styles.heroMain}>
        <motion.div className={styles.heroContent} style={{ opacity: heroOpacity }}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Future Luxury Mobility
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Rethinking Urban
            <br />
            Electric Mobility.
          </motion.h1>

          <motion.p
            className={styles.heroLead}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            An electric two-wheeler fusing AI-driven safety, structural
            battery engineering, and 9-minute fast charging into a single
            premium machine.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/bike" className="btn btn-white">
              Explore the Bike
            </Link>
            <Link href="/pre-order" className="btn btn-outline-white">
              Pre-order Now →
            </Link>
          </motion.div>
        </motion.div>
        </div>

        <motion.div
          className={styles.heroStatsWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <StatsStrip stats={heroStats} dark startImmediately />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── BIKE SHOWCASE ── */}
      <section className={`section ${styles.showcase}`}>
        <div className="container-wide">
          <ScrollReveal>
            <span className="section-label">The Machine</span>
            <h2 className="section-title">
              Designed to perform. Engineered to charge in 9 minutes.
            </h2>
            <p className="section-desc">
              Every line, every material, every mechanism is purpose-built for a new
              kind of rider — one who demands luxury, intelligence,
              and rapid charging performance
              in a single platform.
            </p>
          </ScrollReveal>

          <motion.div
            className={styles.showcaseSpecs}
            variants={showcaseSpecsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px", amount: 0.25 }}
          >
            {showcaseSpecs.map((spec) => (
              <motion.article
                key={spec.index}
                className={styles.specCard}
                variants={showcaseSpecsItem}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div className={styles.specCardGlow} aria-hidden />
                <span className={styles.specIndex}>{spec.index}</span>
                <div className={styles.specCardBody}>
                  <div className={styles.specHead}>
                    <div className={styles.specValue}>{spec.value}</div>
                    <div className={styles.specLabel}>{spec.label}</div>
                  </div>
                  <p className={styles.specDesc}>{spec.desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className={`section section-alt ${styles.benefitsSection}`}>
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Rider Benefits</span>
            <motion.h2
              className={`section-title ${styles.benefitsHeadline}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              Built for real riders. Solving real problems.
            </motion.h2>
          </ScrollReveal>

          <motion.div
            className={`grid-3 ${styles.benefitsGrid}`}
            variants={benefitsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px", amount: 0.15 }}
          >
            {benefits.map((b) => (
              <motion.article
                key={b.title}
                className={styles.benefitCard}
                variants={benefitsItem}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <div className={styles.benefitCardGlow} aria-hidden />
                <div className={styles.benefitCardInner}>
                  <motion.div
                    className={styles.benefitIconWrap}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <b.Icon className={styles.benefitIconSvg} />
                  </motion.div>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INNOVATION TABS ── */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Breakthrough Stack</span>
            <h2 className="section-title">
              Six innovations. One platform.
            </h2>
            <p className="section-desc">
              Every component is engineered to reinforce the others — creating
              barriers to entry that fragmented competitors cannot replicate.
            </p>
          </ScrollReveal>
          <InnovationTabs />
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className={styles.galleryStrip}>
        <div className={styles.galleryScroll}>
          {homeStrip.map((item, i) => (
            <ScrollReveal key={item.src} delay={i * 0.1}>
              <div className={styles.galleryItem}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={styles.galleryStripPhoto}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section section-dark ${styles.cta}`}>
        <div className="container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <h2 className={styles.ctaTitle}>Ready to ride the future?</h2>
            <p className={`section-desc ${styles.ctaDesc}`}>
              Be among the first to experience the TEM — India&apos;s most
              ambitious electric two-wheeler. Reserve your spot today.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/pre-order" className="btn btn-white">
                Pre-order Now →
              </Link>
              <Link href="/contact" className="btn btn-outline-white">
                Get In Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
