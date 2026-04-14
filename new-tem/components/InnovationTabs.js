"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./InnovationTabs.module.css";

const innovations = [
  {
    id: "fast-charging",
    title: "9 mins Fast charging",
    short: "Fast Charging",
    description:
      "A high-speed charging system engineered for 9-minute top-ups, giving riders rapid turnaround without compromising battery health.",
  },
  {
    id: "aras",
    title: "AI-Driven ARAS",
    short: "AI Safety",
    description:
      "An adaptive rider assistance system that puts intelligent safety at the core — continuously learning from real-world fleet data to protect every ride, every rider.",
  },
  {
    id: "motor",
    title: "Magnetless PCB Motor",
    short: "PCB Motor",
    description:
      "A rare-earth-independent motor design that eliminates supply-chain fragility while delivering lightweight efficiency and strong torque response. No magnets. No compromise.",
  },
  {
    id: "battery",
    title: "Structural Battery",
    short: "Battery",
    description:
      "The battery becomes the chassis itself — reducing total weight, improving dynamics, and unlocking an industry-leading 300 km range ambition on a single charge.",
  },
  {
    id: "charger",
    title: "Integrated BMS-Charger",
    short: "BMS Charger",
    description:
      "Integrated BMS charger architecture supports optimized rapid charging, smart charge balancing, and long-term battery protection.",
  },
  {
    id: "intelligence",
    title: "Intelligence Layer",
    short: "Software",
    description:
      "A proprietary data and software moat that compounds over time — every ride makes the fleet smarter, safer, and harder to replicate. Over-the-air updates keep evolving.",
  },
];

export default function InnovationTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {innovations.map((item, i) => (
          <button
            key={item.id}
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => setActive(i)}
          >
            {item.short}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={styles.panel}
          >
            <div className={styles.panelNumber}>0{active + 1}</div>
            <h3 className={styles.panelTitle}>{innovations[active].title}</h3>
            <p className={styles.panelDesc}>{innovations[active].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
