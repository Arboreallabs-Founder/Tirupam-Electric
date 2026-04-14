"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";

export default function SuccessPage() {
  return (
    <div className="page-enter">
      <section className={styles.wrapper}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.checkmark}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#3A8FC2" strokeWidth="3" />
              <motion.path
                d="M20 32 L28 40 L44 24"
                stroke="#3A8FC2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          <h1 className={styles.title}>Request received</h1>
          <p className={styles.desc}>
            Thanks for your interest in the TEM Electric. Your pre-order details have been
            noted. Our team will contact you shortly to confirm your reservation and outline
            the next steps.
          </p>

          <div className={styles.infoBox}>
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>We review your request and reach out by email or phone</li>
              <li>You confirm your priority delivery slot</li>
              <li>Reservation details and paperwork are arranged directly with our team</li>
              <li>Exclusive updates as we move toward launch</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <Link href="/" className="btn btn-dark">
              Back to Home
            </Link>
            <Link href="/bike" className="btn btn-outline">
              Explore the Bike
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
