"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import clsx from "clsx";

const links = [
  { href: "/bike", label: "The Bike" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navTheme = mounted ? (isHome && !scrolled ? "transparent" : "solid") : "transparent";

  return (
    <>
      <nav className={clsx(styles.nav, styles[navTheme], scrolled && styles.scrolled)}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            Tem Motorrs
          </Link>

          <div className={styles.links}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(styles.link, pathname === l.href && styles.active)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link href="/pre-order" className={clsx("btn btn-white", styles.ctaBtn)}>
            Pre-order
          </Link>

          <button
            className={clsx(styles.burger, menuOpen && styles.burgerOpen)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={clsx(styles.mobileMenu, menuOpen && styles.mobileMenuOpen)}>
        <div className={styles.mobileMenuInner}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.mobileLink}>
              {l.label}
            </Link>
          ))}
          <Link href="/pre-order" className={clsx("btn btn-dark", styles.mobileCta)}>
            Pre-order Now
          </Link>
        </div>
      </div>
    </>
  );
}
