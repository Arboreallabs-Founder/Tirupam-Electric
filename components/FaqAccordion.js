"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./FaqAccordion.module.css";

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <div className={styles.list}>
      {faqs.map((faq, index) => {
        const qId = `${baseId}-q-${index}`;
        const aId = `${baseId}-a-${index}`;
        const isOpen = openIndex === index;

        return (
          <ScrollReveal key={qId} delay={index * 0.06}>
            <div className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
              <button
                type="button"
                id={qId}
                aria-expanded={isOpen}
                aria-controls={aId}
                className={styles.trigger}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={styles.question}>{faq.q}</span>
                <motion.span
                  className={styles.icon}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                >
                  <ChevronDown size={18} strokeWidth={1.5} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    role="region"
                    id={aId}
                    aria-labelledby={qId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.answerWrap}
                  >
                    <p className={styles.answer}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
