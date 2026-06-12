import Link from "next/link";
import styles from "./Footer.module.css";

const navLinks = [
  { href: "/bike", label: "The Bike" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/pre-order", label: "Pre-order" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "mailto:finance@temmotorrs.com", label: "Email" },
  { href: "https://www.temmotorrs.com", label: "Website" },
  { href: "https://www.facebook.com/profile.php?id=61579456566288", label: "Facebook" },
  { href: "https://www.instagram.com/tem_motorrs", label: "Instagram" },
  { href: "https://x.com/Tem_motorrs", label: "Twitter / X" },
  { href: "https://www.linkedin.com/in/tem-motorrs-3626543b8", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>Tem Motorrs</div>
          <p className={styles.tagline}>Built To Think.</p>
          <p className={styles.desc}>
            Premium electric mobility with 9 mins fast charging — engineered for future cities,
            built for riders who think ahead.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.colLink}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Connect</h4>
          {socialLinks.map((l) => (
            <a key={l.label} href={l.href} className={styles.colLink} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; 2026 Tem Motorrs. All rights reserved.</span>
        <span className={styles.bottomRight}>Built To Think.</span>
      </div>
    </footer>
  );
}
