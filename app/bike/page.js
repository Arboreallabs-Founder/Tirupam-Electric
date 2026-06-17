"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./page.module.css";

const Bike3DViewer = dynamic(() => import("@/components/Bike3DViewer"), {
  ssr: false,
  loading: () => <div className={styles.modelFallback}><span className={styles.modelFallbackLabel}>Loading 3D Model</span></div>,
});

const specs = [
  { label: "Range", value: "300 km", note: "Structural battery target" },
  { label: "Motor", value: "PCB Magnetless", note: "Rare-earth independent" },
  { label: "Battery", value: "Structural", note: "Battery-as-chassis" },
  { label: "Charging", value: "9 mins Fast", note: "BMS charger architecture" },
  { label: "Design", value: "Performance", note: "Rider-first architecture" },
  { label: "Safety", value: "AI ARAS", note: "Adaptive assistance" },
  { label: "Weight", value: "Ultra-light", note: "PCB motor enabled" },
  { label: "Segment", value: "Urban premium", note: "India-first design" },
];

const features = [
  {
    num: "01",
    title: "9 mins Fast Charging. Ride More.",
    desc: "The rapid charging system is engineered for 9-minute top-ups, reducing downtime and keeping urban riders moving throughout the day.",
  },
  {
    num: "02",
    title: "A Battery That Is The Bike.",
    desc: "The structural battery isn't inside the chassis — it is the chassis. This radical approach slashes weight, improves center of gravity, and delivers a 300 km range ambition that no bolt-on battery pack can match.",
  },
  {
    num: "03",
    title: "Intelligence That Learns Every Ride.",
    desc: "The AI-Driven ARAS system doesn't just react — it anticipates. Drawing on fleet-wide riding data, it adapts to road conditions, rider behavior, and environmental factors to provide a protective cocoon that gets smarter over time.",
  },
];

export default function BikePage() {
  return (
    <div className="page-enter">

      {/* ── HERO — full-screen video ── */}
      <section className={styles.hero}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
          src="/images/bike.mp4"
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label" style={{ color: "rgba(255,255,255,0.45)" }}>
              The Machine
            </span>
            <h1 className={styles.heroTitle}>TEM Electric.</h1>
            <p className={styles.heroSub}>
              9 mins fast charging. 300 km range. AI-driven safety.
              <br />
              This is not an evolution — it&apos;s a rethink.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/pre-order" className="btn btn-white">Reserve Now →</Link>
              <Link href="/technology" className="btn btn-outline-white">See the Tech</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Specifications</span>
            <h2 className="section-title">Every detail, purposeful.</h2>
          </ScrollReveal>
          <div className={styles.specsGrid}>
            {specs.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className={styles.specCard}>
                  <div className={styles.specLabel}>{s.label}</div>
                  <div className={styles.specValue}>{s.value}</div>
                  <div className={styles.specNote}>{s.note}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIDE PROFILE SHOWCASE ── */}
      <section className={styles.profileSection}>
        <div className={styles.profileImageWrap}>
          <Image
            src="/images/side bike imge.png"
            alt="TEM Electric — Side Profile"
            fill
            className={styles.profilePhoto}
          />
          <div className={styles.profileOverlay} aria-hidden />
          <div className={styles.profileCaption}>
            <span className={styles.profileCaptionLabel}>Side Profile</span>
            <p className={styles.profileCaptionText}>TEM Electric — 2025</p>
          </div>
        </div>
      </section>

      {/* ── FEATURE DEEP DIVES ── */}
      {features.map((f, i) => (
        <section key={f.num} className={`section ${i % 2 === 1 ? "section-alt" : ""}`}>
          <div className="container">
            {i === 0 ? (
              <div className={styles.featureRow}>
                <ScrollReveal>
                  <span className={styles.featureKicker}>
                    <span className={styles.featureKickerLine} aria-hidden />
                    {f.num}
                  </span>
                  <h2 className={styles.featureTitle}>{f.title}</h2>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </ScrollReveal>
                <ScrollReveal delay={0.15} className={styles.featureImageCol}>
                  <div className={styles.featureImageFrame}>
                    <Image
                      src="/images/front bike image.png"
                      alt="TEM Electric — Front View"
                      fill
                      className={styles.featurePhoto}
                    />
                  </div>
                </ScrollReveal>
              </div>
            ) : (
              <ScrollReveal>
                <span className={styles.featureKicker}>
                  <span className={styles.featureKickerLine} aria-hidden />
                  {f.num}
                </span>
                <h2 className={styles.featureTitle}>{f.title}</h2>
                <p className={styles.featureDesc}>{f.desc}</p>
              </ScrollReveal>
            )}
          </div>
        </section>
      ))}

      {/* ── 3D MODEL ── */}
      <section className={styles.modelSection}>
        <div className={styles.modelHeaderRow}>
          <div>
            <span className="section-label" style={{ color: "rgba(255,255,255,0.35)" }}>
              Interactive 3D Model
            </span>
            <h2 className={styles.modelTitle}>Explore Every Angle.</h2>
          </div>
          <p className={styles.modelHint}>Drag to rotate</p>
        </div>
        <Bike3DViewer height="70vh" className={styles.modelCanvas} />
      </section>

      {/* ── STICKY CTA ── */}
      <div className={styles.stickyCta}>
        <div className={styles.stickyInner}>
          <div>
            <strong>TEM Electric</strong>
            <span className={styles.stickyTagline}>Priority reservation available</span>
          </div>
          <Link href="/pre-order" className="btn btn-white">
            Pre-order Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
