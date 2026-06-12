"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import styles from "./SplashIntro.module.css";

/* ─── Config ─── */
const INTRO_DURATION = 3.8; // total seconds

/* ─── Easing curves ─── */
const EXPO_OUT = [0.16, 1, 0.3, 1];
const CIRC_OUT = [0, 0.55, 0.45, 1];

/* ═══════════════════════════════════════════
   Pre-splash: instant black to prevent FOUC
   ═══════════════════════════════════════════ */
function PreSplash() {
  return <div className={styles.preSplash} aria-hidden />;
}

/* ═══════════════════════════════════════════
   Cinematic Splash Overlay
   ═══════════════════════════════════════════ */
function SplashOverlay({ onDone }) {
  const [logoOk, setLogoOk] = useState(true);

  /* Lock scroll & schedule exit */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(onDone, INTRO_DURATION * 1000);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      className={styles.overlay}
      role="presentation"
      aria-hidden
      /* Overlay fades out in last 0.6s */
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{
        duration: INTRO_DURATION,
        times: [0, 0.6, 0.84, 1],
        ease: "easeInOut",
      }}
    >
      {/* ── Ambient background glow ── */}
      <motion.div
        className={styles.ambientGlow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* ── Subtle grid for depth ── */}
      <div className={styles.gridOverlay} />

      {/* ── Floating particles ── */}
      <div className={styles.particles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* ── Corner accents ── */}
      <div className={`${styles.cornerAccent} ${styles.cornerTL}`} />
      <div className={`${styles.cornerAccent} ${styles.cornerTR}`} />
      <div className={`${styles.cornerAccent} ${styles.cornerBL}`} />
      <div className={`${styles.cornerAccent} ${styles.cornerBR}`} />

      {/* ── Expanding ring pulses ── */}
      <div className={styles.ringPulse} />
      <div className={styles.ringPulseTwo} />

      {/* ── Logo ── */}
      <motion.div
        className={styles.logoWrap}
        initial={{ opacity: 0, scale: 0.65 }}
        animate={{
          opacity:  [0,   1,    1,    1,    0.3,  0],
          scale:    [0.65, 1,   1.03, 1,    6,    18],
        }}
        transition={{
          duration: INTRO_DURATION,
          times:    [0,   0.12, 0.18, 0.55, 0.82, 1],
          ease: EXPO_OUT,
        }}
        style={{ transformOrigin: "50% 50%" }}
      >
        {/* Light sweep effect */}
        <div className={styles.lightSweep} />

        {logoOk ? (
          <Image
            src="/images/tem-logo.png"
            alt=""
            width={240}
            height={240}
            priority
            className={styles.logoImage}
            onError={() => setLogoOk(false)}
          />
        ) : (
          <span className={styles.wordmark}>
            TEM
            <br />
            Motors
          </span>
        )}
      </motion.div>

      {/* ── Tagline: "Built To Think" ── */}
      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 12, letterSpacing: "0.6em" }}
        animate={{
          opacity:       [0,   0, 0.7, 0.7, 0],
          y:             [12,  12, 0,    0,   -30],
          letterSpacing: ["0.6em", "0.6em", "0.35em", "0.35em", "0.8em"],
        }}
        transition={{
          duration: INTRO_DURATION,
          times:    [0, 0.28, 0.42, 0.7, 0.88],
          ease: CIRC_OUT,
        }}
      >
        Built To Think
      </motion.p>

      {/* ── Accent line ── */}
      <motion.div
        className={styles.accentLine}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width:   [0,     0,       200,     200,    0],
          opacity: [0,     0,       0.6,     0.6,    0],
        }}
        transition={{
          duration: INTRO_DURATION,
          times:    [0, 0.25, 0.45, 0.7, 0.88],
          ease: EXPO_OUT,
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ClientShell — Root Client Wrapper
   Manages: checking → intro → live
   ═══════════════════════════════════════════ */
export default function ClientShell({ children }) {
  const reduceMotion = useReducedMotion();
  const [gate, setGate] = useState("intro");
  const pathname = usePathname();

  /* Warm up the 3D experience while the splash logo plays:
     importing the canvas chunk also triggers useGLTF.preload of the bike
     model, so by the time the site appears the model is already in cache. */
  useEffect(() => {
    if (pathname === "/" || pathname === "/bike") {
      import("@/components/BikeScrollCanvas");
    }
  }, [pathname]);

  /* If user prefers reduced motion, skip intro immediately */
  useEffect(() => {
    if (gate !== "intro") return;
    if (!reduceMotion) return;
    setGate("live");
  }, [gate, reduceMotion]);

  /* Called when intro animation completes */
  const finishIntro = useCallback(() => {
    document.body.style.overflow = "";
    setGate("live");
  }, []);

  const isLive = gate === "live";

  return (
    <>
      {/* ── Main site content — always mounted so the 3D canvas, model, and
            shaders warm up behind the opaque splash overlay ── */}
      <SmoothScroll enabled={isLive}>
        <div className={styles.siteWrap}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </SmoothScroll>

      {/* ── Cinematic splash intro (covers the site while it warms up) ── */}
      {gate === "intro" && <SplashOverlay onDone={finishIntro} />}
    </>
  );
}
