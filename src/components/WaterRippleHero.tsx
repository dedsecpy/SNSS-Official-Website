"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import styles from "./WaterRippleHero.module.css";

export default function WaterRippleHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* Word-by-word animation (safe for Devanagari) */
  const line1Words = ["श्री", "नारायण"];
  const line2Words = ["माध्यमिक", "विद्यालय"];

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${entered ? styles.entered : ""}`}
    >
      {/* Coded Artistic Background */}
      <div className={styles.codedBg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.gridOverlay} />
      </div>

      {/* Cinematic overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.inner}>
        {/* Devanagari name — single line, word-by-word reveal */}
        <h1 className={`${styles.titleHindi} ${entered ? styles.titleIn : ""}`}>
          <span className={styles.wordLine}>
            {[...line1Words, ...line2Words].map((word, i) => (
              <span
                key={`w-${i}`}
                className={styles.word}
                style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Accent line */}
        <span className={`${styles.dividerLine} ${entered ? styles.dividerIn : ""}`} />

        {/* English name */}
        <p className={`${styles.titleEnglish} ${entered ? styles.engIn : ""}`}>
          Shree Narayan Secondary School
        </p>

        {/* Tagline */}
        <p className={`${styles.tagline} ${entered ? styles.tagIn : ""}`}>
          Quality education from ECD to Grade 12 in Sarlahi, Nepal
        </p>

        {/* Location badge */}
        <div className={`${styles.locationBadge} ${entered ? styles.locIn : ""}`}>
          <MapPin size={14} />
          <span>Sarlahi, Madhesh Pradesh</span>
        </div>

        {/* CTA */}
        <div className={`${styles.actions} ${entered ? styles.actIn : ""}`}>
          <Link href="/admission" className={styles.ctaPrimary}>
            Apply for Admission <ArrowRight size={16} />
          </Link>
          <Link href="/about" className={styles.ctaSecondary}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
