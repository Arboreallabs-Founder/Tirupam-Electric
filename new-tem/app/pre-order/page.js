"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { landscapeGallery } from "@/lib/landscapeGallery";
import styles from "./page.module.css";

const preOrderBike = landscapeGallery[3];
const PREORDER_FORMSPREE_URL = "https://formspree.io/f/mzdyzrre";

export default function PreOrderPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(PREORDER_FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.city,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errText =
          data?.errors?.[0]?.message ||
          data?.error ||
          "Could not submit. Please try again.";
        throw new Error(errText);
      }
      try {
        sessionStorage.setItem(
          "tem-preorder-draft",
          JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            city: form.city,
            at: Date.now(),
          })
        );
      } catch {
        /* ignore */
      }
      router.push("/pre-order/success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      <section className={styles.hero}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Reserve Yours</span>
            <h1 className={styles.heroTitle}>Pre-order the TEM Electric</h1>
            <p className="section-desc">
              Join the priority list with a refundable reservation. Be among the first to ride
              India&apos;s most ambitious electric two-wheeler.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <ScrollReveal className={styles.summaryCol}>
              <div className={styles.bikeCard}>
                <div className={styles.bikeImage}>
                  <Image
                    src={preOrderBike.src}
                    alt={preOrderBike.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className={styles.bikePhoto}
                  />
                </div>
                <h3 className={styles.bikeName}>TEM Electric</h3>
                <p className={styles.bikeTagline}>Premium urban electric motorcycle</p>

                <div className={styles.highlights}>
                  <div className={styles.highlight}>
                    <div className={styles.hlValue}>300 km</div>
                    <div className={styles.hlLabel}>Range</div>
                  </div>
                  <div className={styles.highlight}>
                    <div className={styles.hlValue}>9 mins Fast</div>
                    <div className={styles.hlLabel}>Charging</div>
                  </div>
                  <div className={styles.highlight}>
                    <div className={styles.hlValue}>AI ARAS</div>
                    <div className={styles.hlLabel}>Safety</div>
                  </div>
                </div>

                <div className={styles.depositInfo}>
                  <p className={styles.depositNote}>
                    Reservation terms are fully refundable and secure your priority delivery slot.
                    Our team will contact you to confirm details and next steps—nothing is due on
                    this form.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.formCol} delay={0.15}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Your Details</h2>

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className={styles.hpField}
                />

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    className="form-input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    className="form-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    className="form-input"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="city">City</label>
                  <input
                    className="form-input"
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Mumbai, Delhi, Bangalore..."
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className={`btn btn-dark ${styles.submitBtn}`} disabled={loading}>
                  {loading ? "Submitting..." : "Submit reservation request →"}
                </button>

                {error ? <p className={styles.formError}>{error}</p> : null}

                <p className={styles.secure}>
                  We&apos;ll reach out at{" "}
                  <a href="mailto:finance@temmotorrs.com">finance@temmotorrs.com</a>{" "}
                  to confirm your reservation and next steps.
                </p>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
