"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — wraps children with Lenis-powered inertia scrolling.
 *
 * - Buttery 60 fps momentum scroll with configurable lerp (smoothness)
 * - Respects prefers-reduced-motion automatically
 * - Integrates with Framer Motion's scroll detection out of the box
 * - Pauses while the splash intro is active (enabled prop)
 */
export default function SmoothScroll({ children, enabled = true }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    /* Respect user preference — skip smooth scroll entirely */
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const lenis = new Lenis({
      /* How smooth the scroll feels: higher = snappier, lower = floatier */
      lerp: 0.14,

      /* Duration factor for momentum */
      duration: 1.0,

      /* easeOutCubic — still smooth but responds faster */
      easing: (t) => 1 - Math.pow(1 - t, 3),

      /* Smooth only vertical scrolling */
      orientation: "vertical",

      /* Allow smooth scroll on touch devices too */
      gestureOrientation: "vertical",

      /* Don't fight with native scroll on inputs/textareas */
      smoothWheel: true,

      /* Enable touch smooth scroll for mobile premium feel */
      touchMultiplier: 1.5,

      /* Infinite scroll prevention */
      infinite: false,
    });

    lenisRef.current = lenis;

    /* RAF loop to drive Lenis */
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Pause / resume based on enabled prop (e.g. during splash intro) */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (enabled) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [enabled]);

  return children;
}
