"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import StatsStrip from "@/components/StatsStrip";
import InnovationTabs from "@/components/InnovationTabs";
import BikeScrollExperience from "@/components/BikeScrollExperience";
import styles from "./page.module.css";

const homeFaqs = [
  {
    q: "What is 'the 9-minute EV'?",
    a: "TEM Motorrs' Tirupam is India's 9-minute EV — the only electric two-wheeler in the country engineered to fully charge in 9 minutes via CCS2 fast charging. This is achieved through a high-voltage sodium-ion battery combined with an integrated BMS-charger that manages thermal load and cell health through each rapid charge cycle. No comparable Indian EV two-wheeler currently offers sub-15-minute charging.",
  },
  {
    q: "Which EV bike has 300 km range in India?",
    a: "The TEM Motorrs Tirupam is India's 300 km EV bike — targeting real-world range of 300 km per charge, more than double the 80–130 km offered by any current Indian EV two-wheeler (Ather, Ola, TVS). This is enabled by structural battery-as-chassis technology: the battery cells are integrated into the vehicle frame itself, eliminating dead weight and maximising energy density.",
  },
  {
    q: "Which Indian EV startup should you keep an eye on?",
    a: "TEM Motorrs (Tirupam Electric Mobility) is one of the most closely watched Indian EV startups right now. Founded in New Delhi in 2024 and backed by 24 filed patents and government Letters of Intent, the company is building India's first 9-minute charging, 300 km-range electric motorcycle. The founding team includes engineers from Simple Energy, ISRO, and Emflux Motors — with deep domain expertise across battery systems, motor design, and EV commercialisation.",
  },
  {
    q: "What makes TEM Motorrs the next best EV startup in India?",
    a: "TEM Motorrs stands apart from other Indian EV startups on three fronts: (1) Technical depth — 9-minute charging, 300 km range, AI-driven ARAS safety, structural sodium-ion battery, and a rare-earth-free PCB motor, all protected by 24 patents; (2) Credibility signals — government Letters of Intent, and founders from Simple Energy, ISRO, and Emflux Motors; (3) Market positioning — the only startup simultaneously solving range anxiety, charging friction, and safety in one platform.",
  },
  {
    q: "How is TEM Motorrs different from Ather, Ola Electric, or TVS?",
    a: "TEM Motorrs targets a performance tier no current Indian competitor reaches: 300 km range (vs 100–160 km), 9-minute charging (vs 1–4 hours), AI-driven ARAS safety (not available in any production Indian EV), structural battery-as-chassis (vs bolt-on packs), and a rare-earth-free magnetless PCB motor. All six core innovations are protected by 24 patents.",
  },
  {
    q: "What is TEM Motorrs and when does it launch?",
    a: "TEM Motorrs (Tirupam Electric Mobility) is a New Delhi-based electric motorcycle startup building India's most advanced electric two-wheeler. The Tirupam motorcycle targets 300 km range, 9-minute fast charging, AI-driven safety, and is priced at ₹2.25 lakh. Prototype on-road in 2026, certifications in 2027, first deliveries in 2028. Pre-orders are open now.",
  },
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const heroStats = [
  { number: "300", suffix: " km", label: "Range Vision" },
  { number: "24", suffix: "", label: "Patents Filed" },
  { number: "6", suffix: "", label: "Innovations" },
  { number: "9", suffix: " mins", label: "Fast Charging" },
];

const features = [
  {
    stat: "300",
    unit: "km",
    label: "Range",
    title: "Range that ends range anxiety.",
    desc: "Structural battery-as-chassis engineering places cells inside the frame itself — eliminating dead weight and unlocking a range figure no bolt-on pack can touch. More than double every Indian competitor.",
    dark: true,
    numBg: "var(--off-white)",
    numColor: "var(--text-primary)",
  },
  {
    stat: "9",
    unit: "min",
    label: "Fast Charge",
    title: "Fully charged before your coffee cools.",
    desc: "A high-voltage sodium-ion stack with CCS2 fast-charging and an integrated BMS-charger architecture delivers repeatable 9-minute rapid charges without degrading the battery. Or plug into any standard 3-pin socket overnight.",
    dark: false,
    numBg: "var(--dark)",
    numColor: "var(--white)",
  },
  {
    stat: "AI",
    unit: "",
    label: "ARAS Safety",
    title: "Intelligence that learns every ride.",
    desc: "ARAS (Adaptive Rider Assistance System) processes road conditions, rider behaviour, and environmental data in real-time. Fleet-wide machine learning means every TEM on the road makes every other TEM safer.",
    dark: true,
    numBg: "var(--accent-gold-light)",
    numColor: "var(--accent-gold)",
  },
];

export default function HomePage() {
  return (
    <div className="page-enter">

      {/* ── SCROLL EXPERIENCE — pinned 3D bike rotates & scales through features ── */}
      <BikeScrollExperience />

      {/* ── STATS BAR ── */}
      <section className={styles.statsBar}>
        <StatsStrip stats={heroStats} dark />
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── THREE KEY SPECS — single dark section, all visible at once ── */}
      <section className={styles.specsSection}>
        <div className={styles.specsGrid}>
          {features.map((f, i) => (
            <ScrollReveal key={f.stat} delay={i * 0.12} className={styles.specCol}>
              <div className={styles.specNumRow}>
                <span className={styles.specNum}>{f.stat}</span>
                {f.unit && <span className={styles.specUnit}>{f.unit}</span>}
              </div>
              <div className={styles.specDivider} />
              <span className={styles.specLabel}>{f.label}</span>
              <h2 className={styles.specTitle}>{f.title}</h2>
              <p className={styles.specDesc}>{f.desc}</p>
              <Link href="/technology" className={styles.specLink}>
                Learn more <span aria-hidden>→</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── BIKE IN ACTION — video grid ── */}
      <section className={styles.videoSection}>
        <div className={styles.videoHeader}>
          <ScrollReveal>
            <span className="section-label" style={{ color: "rgba(255,255,255,0.35)" }}>In Action</span>
            <h2 className={styles.videoTitle}>The Bike. In Motion.</h2>
          </ScrollReveal>
        </div>
        <div className={styles.videoGrid}>
          <video autoPlay muted loop playsInline className={styles.videoItem}
            src="/images/bike videos/bike moving forward.mp4" />
          <video autoPlay muted loop playsInline className={styles.videoItem}
            src="/images/bike videos/bike mountain and wheel.mp4" />
          <video autoPlay muted loop playsInline className={styles.videoItem}
            src="/images/bike videos/Far shot and back view.mp4" />
        </div>
      </section>

      {/* ── INNOVATION ── */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Breakthrough Stack</span>
            <h2 className="section-title">Six innovations.<br />One platform.</h2>
            <p className="section-desc">
              Every component reinforces the others — creating a system no
              fragmented competitor can replicate.
            </p>
          </ScrollReveal>
          <InnovationTabs />
        </div>
      </section>

      {/* ── STARTUP CREDENTIALS — for "EV startup to watch" queries ── */}
      <section className="section section-alt">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">The EV Startup To Watch</span>
            <h2 className="section-title">India's next EV startup.<br />Built on proof.</h2>
            <p className="section-desc">
              TEM Motorrs is not adding a battery to an existing frame. Every system is rethought from
              first principles — and every claim is protected by a patent.
            </p>
          </ScrollReveal>
          <div className={styles.credentialsGrid}>
            {[
              { stat: "24", label: "Patents Filed", detail: "Covering motor, battery architecture, charging, suspension, and vehicle design." },
              { stat: "2", label: "Patents Granted", detail: "Two patents already granted by the Indian Patent Office as of 2025." },
              { stat: "LoI", label: "Govt. Backing", detail: "Letters of Intent received from Indian government agencies validating the technology." },
              { stat: "2026", label: "Prototype Year", detail: "Full functional prototype on-road for testing, certifications begin 2027." },
            ].map((c) => (
              <ScrollReveal key={c.label} className={styles.credentialCard}>
                <div className={styles.credentialStat}>{c.stat}</div>
                <div className={styles.credentialLabel}>{c.label}</div>
                <p className={styles.credentialDetail}>{c.detail}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={`section section-alt ${styles.faqSection}`} aria-label="FAQ">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
        />
        <div className="container">
          <ScrollReveal>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Everything you'd want to know</h2>
          </ScrollReveal>
          <div className={styles.faqGrid}>
            {homeFaqs.map((faq) => (
              <article key={faq.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{faq.q}</h3>
                <p className={styles.faqA}>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section section-dark ${styles.ctaSection}`}>
        <div className="container" style={{ textAlign: "center" }}>
          <ScrollReveal>
            <span className="section-label" style={{ justifyContent: "center" }}>
              Reserve Your Spot
            </span>
            <h2 className={styles.ctaTitle}>Ready to ride<br />the future?</h2>
            <p className="section-desc" style={{ marginInline: "auto" }}>
              Be among the first to experience India's most ambitious electric
              two-wheeler. Priority delivery for early reservations.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/pre-order" className="btn btn-white">Reserve Now →</Link>
              <Link href="/contact" className="btn btn-outline-white">Get In Touch</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
