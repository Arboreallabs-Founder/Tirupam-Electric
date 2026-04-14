"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { landscapeGallery } from "@/lib/landscapeGallery";
import styles from "./page.module.css";

import imgFeatBridge from "../../public/images/bike-bridge.jpeg";
import imgFeatAlps from "../../public/images/bike-alps.jpeg";
import imgFeatRohtang from "../../public/images/bike-rohtang.jpeg";

/** One full loop through every hero/gallery slide (ms). */
const HERO_ROTATION_MS = 7000;

/** All landscape assets from lib/landscapeGallery (dynamic list). */
const gallery = landscapeGallery;

/** Previous value during render (for mounting only active± crossfade slides). */
function usePrevious(value) {
  const ref = useRef(undefined);
  const prev = ref.current;
  ref.current = value;
  return prev;
}

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
    title: "9 mins Fast charging. Ride More.",
    desc: "The rapid charging system is engineered for 9-minute top-ups, reducing downtime and keeping urban riders moving throughout the day.",
    image: imgFeatBridge,
  },
  {
    title: "A Battery That Is The Bike.",
    desc: "The structural battery isn't inside the chassis — it is the chassis. This radical approach slashes weight, improves center of gravity, and delivers a 300 km range ambition that no bolt-on battery pack can match.",
    image: imgFeatAlps,
  },
  {
    title: "Intelligence That Learns Every Ride.",
    desc: "The AI-Driven ARAS system doesn't just react — it anticipates. Drawing on fleet-wide riding data, it adapts to road conditions, rider behavior, and environmental factors to provide a protective cocoon that gets smarter over time.",
    image: imgFeatRohtang,
  },
];

function useGalleryAutoplay({ length, paused }) {
  const reduceMotion = useReducedMotion();
  const slideMs = Math.max(900, HERO_ROTATION_MS / length);
  const crossfadeSec = Math.min(0.85, Math.max(0.32, (slideMs / 1000) * 0.34));
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const [active, setActive] = useState(0);

  const goTo = useCallback((index) => {
    setActive(((index % length) + length) % length);
  }, [length]);

  useEffect(() => {
    if (reduceMotion || length < 2) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((i) => (i + 1) % length);
    }, slideMs);
    return () => window.clearInterval(id);
  }, [reduceMotion, length, slideMs]);

  return { active, setActive: goTo, slideMs, crossfadeSec, reduceMotion };
}

export default function BikePage() {
  const [heroPaused, setHeroPaused] = useState(false);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const thumbRefs = useRef([]);
  const thumbsScrollRef = useRef(null);

  const {
    active: heroIndex,
    setActive: setHeroIndex,
    slideMs,
    crossfadeSec,
    reduceMotion,
  } = useGalleryAutoplay({
    length: gallery.length,
    paused: heroPaused || galleryPaused,
  });

  const activeImg = heroIndex;
  const previousSlide = usePrevious(heroIndex);
  const heroGalleryIndices =
    previousSlide !== undefined && previousSlide !== heroIndex
      ? new Set([heroIndex, previousSlide])
      : new Set([heroIndex]);

  useEffect(() => {
    const row = thumbsScrollRef.current;
    const el = thumbRefs.current[activeImg];
    if (!row || !el) return;
    const rowW = row.clientWidth;
    const maxScroll = row.scrollWidth - rowW;
    if (maxScroll <= 0) return;
    const target =
      el.offsetLeft - rowW / 2 + el.offsetWidth / 2;
    row.scrollTo({
      left: Math.max(0, Math.min(maxScroll, target)),
      behavior: "smooth",
    });
  }, [activeImg]);

  const onPickThumb = (i) => {
    setHeroIndex(i);
  };

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section
        className={styles.hero}
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div className={styles.heroBg} aria-hidden>
          {gallery.map((img, i) =>
            heroGalleryIndices.has(i) ? (
            <motion.div
              key={img.src}
              className={styles.heroSlide}
              initial={false}
              animate={{
                opacity: i === activeImg ? 1 : 0,
                scale: i === activeImg && !reduceMotion && slideMs >= 2600 ? 1.04 : 1,
              }}
              transition={{
                opacity: { duration: crossfadeSec, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: slideMs / 1000, ease: "linear" },
              }}
            >
              <Image
                src={img.src}
                alt=""
                fill
                priority={i === 0 && activeImg === 0}
                loading={i === activeImg ? "eager" : "lazy"}
                sizes="100vw"
                quality={80}
                className={styles.heroPhoto}
              />
            </motion.div>
            ) : null,
          )}
          <div className={styles.heroOverlay} />
        </div>

        {!reduceMotion && gallery.length > 1 && (
          <div className={styles.heroProgress} aria-hidden>
            <motion.div
              key={activeImg}
              className={styles.heroProgressBar}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: slideMs / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        )}

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="section-label"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              The Machine
            </span>
            <h1 className={styles.heroTitle}>TEM Electric</h1>
            <p className={styles.heroSub}>
              9 mins fast charging. Intelligent. 300 km range. BMS-charged.
              <br />
              This is not an evolution — it&apos;s a rethink.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        className={`section ${styles.gallerySection}`}
        onMouseEnter={() => setGalleryPaused(true)}
        onMouseLeave={() => setGalleryPaused(false)}
      >
        <div className="container-wide">
          <div className={styles.galleryMain}>
            {gallery.map((img, i) =>
              heroGalleryIndices.has(i) ? (
              <motion.div
                key={img.src}
                className={styles.gallerySlide}
                initial={false}
                animate={{ opacity: i === activeImg ? 1 : 0 }}
                transition={{
                  duration: crossfadeSec,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 1200px"
                  loading={i === activeImg ? "eager" : "lazy"}
                  quality={80}
                  className={styles.galleryPhoto}
                />
              </motion.div>
              ) : null,
            )}
          </div>

          {!reduceMotion && gallery.length > 1 && (
            <div className={styles.galleryProgress} aria-hidden>
              <motion.div
                key={activeImg}
                className={styles.galleryProgressBar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: slideMs / 1000, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          )}

          <div
            ref={thumbsScrollRef}
            className={styles.galleryThumbs}
            role="tablist"
            aria-label="Gallery views"
          >
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={i === activeImg}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ""}`}
                onClick={() => onPickThumb(i)}
              >
                <span className={styles.thumbInner}>
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="152px"
                    className={styles.thumbPhoto}
                  />
                </span>
              </button>
            ))}
          </div>
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

      {/* ── FEATURE DEEP DIVES ── */}
      {features.map((f, i) => (
        <section key={f.title} className={`section ${i % 2 === 1 ? "section-alt" : ""}`}>
          <div className="container">
            <div className={`${styles.featureRow} ${i % 2 === 1 ? styles.featureReverse : ""}`}>
              <ScrollReveal className={styles.featureText} delay={0.1}>
                <span className={styles.featureKicker}>
                  <span className={styles.featureKickerLine} aria-hidden />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className={styles.featureTitle}>{f.title}</h2>
                <p className={styles.featureDesc}>{f.desc}</p>
              </ScrollReveal>
              <ScrollReveal className={styles.featureImage} delay={0.2} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={styles.featureImageFrame}>
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    placeholder="blur"
                    className={styles.featurePhoto}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── STICKY CTA ── */}
      <div className={styles.stickyCta}>
        <div className={styles.stickyInner}>
          <div>
            <strong>TEM Electric</strong>
            <span className={styles.stickyTagline}>Priority reservation available</span>
          </div>
          <Link href="/pre-order" className="btn btn-dark">
            Pre-order Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
