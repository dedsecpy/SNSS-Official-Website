"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.jpg"
            alt="SNHSS Logo"
            width={36}
            height={36}
            style={{ objectFit: "contain", borderRadius: "50%" }}
          />
          <span className={styles.logoText}>
            Shree Narayan <span className={styles.logoTextSub}>Higher Secondary School</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.center}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/academics" className={styles.link}>Programs</Link>
          <Link href="/facilities" className={styles.link}>Facilities</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <Link href="/admission" className={styles.applyBtn}>
            Apply Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/academics" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Programs</Link>
          <Link href="/facilities" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Facilities</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
          <hr className={styles.mobileDivider} />
          <Link href="/admission" className={styles.mobileApply} onClick={() => setMobileOpen(false)}>
            Apply Now <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </nav>
  );
}
