"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import styles from "./WaterRippleHero.module.css";

export default function WaterRippleHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);

    let scriptJquery: HTMLScriptElement;
    let scriptRipples: HTMLScriptElement;

    const init = async () => {
      if (!(window as any).jQuery) {
        await new Promise((resolve) => {
          scriptJquery = document.createElement("script");
          scriptJquery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
          scriptJquery.onload = resolve;
          document.head.appendChild(scriptJquery);
        });
      }

      if (!(window as any).jQuery.fn.ripples) {
        await new Promise((resolve) => {
          scriptRipples = document.createElement("script");
          scriptRipples.src =
            "https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js";
          scriptRipples.onload = resolve;
          document.head.appendChild(scriptRipples);
        });
      }

      if (heroRef.current && (window as any).jQuery) {
        const $ = (window as any).jQuery;
        try {
          $(heroRef.current).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.03,
            interactive: true,
          });
        } catch (e) {
          console.error("Ripples failed to init:", e);
        }
      }
    };

    init();

    return () => {
      clearTimeout(t);
      if (
        heroRef.current &&
        (window as any).jQuery &&
        (window as any).jQuery.fn.ripples
      ) {
        const $ = (window as any).jQuery;
        try {
          $(heroRef.current).ripples("destroy");
        } catch (e) {}
      }
    };
  }, []);

  /* Word-by-word animation (safe for Devanagari) */
  const line1Words = ["श्री", "नारायण"];
  const line2Words = ["माध्यमिक", "विद्यालय"];

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${entered ? styles.entered : ""}`}
    >
      {/* Background mountain photo */}
      <Image
        src="/new.jpg"
        alt="Himalayan Mountain Range, Nepal"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 35%" }}
        className={styles.bgImage}
      />

      {/* Cinematic overlay */}
      <div className={styles.overlay} />

      {/* Letterbox bars */}
      <div className={`${styles.letterboxTop} ${entered ? styles.lbHide : ""}`} />
      <div className={`${styles.letterboxBot} ${entered ? styles.lbHide : ""}`} />

      {/* Content */}
      <div className={styles.inner}>
        {/* Devanagari name — single line, word-by-word reveal */}
        <h1 className={`${styles.titleHindi} ${entered ? styles.titleIn : ""}`}>
          <span className={styles.wordLine}>
            {[...line1Words, ...line2Words].map((word, i) => (
              <span
                key={`w-${i}`}
                className={styles.word}
                style={{ transitionDelay: `${0.6 + i * 0.15}s` }}
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
          Shree Narayan Madhyamik Vidyalaya
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
