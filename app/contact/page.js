"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./page.module.css";

const socialLinks = [
  {
    title: "Instagram",
    value: "@tem_motorrs",
    href: "https://www.instagram.com/tem_motorrs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Twitter / X",
    value: "@Tem_motorrs",
    href: "https://x.com/Tem_motorrs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    title: "LinkedIn",
    value: "TEM Motorrs",
    href: "https://www.linkedin.com/in/tem-motorrs-3626543b8",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    title: "Facebook",
    value: "TEM Motorrs",
    href: "https://www.facebook.com/profile.php?id=61579456566288",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const containerAnim = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const CONTACT_FORMSUBMIT_URL = "https://formsubmit.co/ajax/bhanu@temmotorrs.com";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);
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
      const res = await fetch(CONTACT_FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false" || data.success === false) {
        const errText =
          data?.message ||
          "Could not send your message. Please try again.";
        throw new Error(errText);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Contact</span>
            <h1 className={styles.heroTitle}>Let&apos;s Talk.</h1>
            <p className={styles.heroDesc}>
              Whether you&apos;re interested in pre-ordering, investing, partnering, or
              just curious — we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* ── Left: Info + Socials ── */}
            <div className={styles.infoCol}>
              <ScrollReveal>
                <div className={styles.emailBlock}>
                  <div className={styles.emailIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.emailLabel}>Email us directly</div>
                    <a href="mailto:finance@temmotorrs.com" className={styles.emailValue}>
                      finance@temmotorrs.com
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className={styles.webBlock}>
                  <div className={styles.emailIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.emailLabel}>Visit our website</div>
                    <a href="https://www.temmotorrs.com" target="_blank" rel="noopener noreferrer" className={styles.emailValue}>
                      www.temmotorrs.com
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className={styles.socialSection}>
                  <h3 className={styles.socialHeading}>Follow Us</h3>
                  <motion.div
                    className={styles.socialGrid}
                    variants={containerAnim}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {socialLinks.map((s) => (
                      <motion.a
                        key={s.title}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialCard}
                        variants={itemAnim}
                        whileHover={{
                          y: -3,
                          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                        }}
                      >
                        <div className={styles.socialIcon}>{s.icon}</div>
                        <div className={styles.socialInfo}>
                          <div className={styles.socialName}>{s.title}</div>
                          <div className={styles.socialHandle}>{s.value}</div>
                        </div>
                        <svg className={styles.socialArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className={styles.investorBox}>
                  <div className={styles.investorBadge}>Investors</div>
                  <h3 className={styles.investorTitle}>Partner with us</h3>
                  <p className={styles.investorDesc}>
                    Tem Motorrs is raising to fast-track product development, establish
                    testing infrastructure, and scale the core team. Reach out to
                    discuss investment opportunities.
                  </p>
                  <a href="mailto:finance@temmotorrs.com" className={styles.investorLink}>
                    finance@temmotorrs.com →
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Right: Form ── */}
            <ScrollReveal className={styles.formCol} delay={0.15}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Send a Message</h2>
                  <p className={styles.formSubtitle}>We typically respond within 24 hours.</p>
                </div>

                {submitted ? (
                  <motion.div
                    className={styles.success}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={styles.successIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3>Message Sent</h3>
                    <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                    <button className="btn btn-dark" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "", website: "" }); setError(""); }}>
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
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
                    <div className={styles.formRow}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="c-name">Full Name</label>
                        <input className="form-input" id="c-name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="c-email">Email</label>
                        <input className="form-input" id="c-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="c-subject">Subject</label>
                      <input className="form-input" id="c-subject" name="subject" type="text" placeholder="Pre-order, partnership, investment..." value={form.subject} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="c-message">Message</label>
                      <textarea className="form-input" id="c-message" name="message" placeholder="Tell us what's on your mind..." value={form.message} onChange={handleChange} required rows={6} />
                    </div>

                    <button type="submit" className={`btn btn-dark ${styles.submitBtn}`} disabled={loading}>
                      {loading ? "Sending…" : "Send Message →"}
                    </button>
                    {error ? <p className={styles.formError}>{error}</p> : null}
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
