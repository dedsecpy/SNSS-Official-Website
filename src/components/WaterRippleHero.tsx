"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";
import styles from "@/app/page.module.css";

export default function WaterRippleHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let scriptJquery: HTMLScriptElement;
    let scriptRipples: HTMLScriptElement;

    const init = async () => {
      // 1. Load jQuery if not present
      if (!(window as any).jQuery) {
        await new Promise((resolve) => {
          scriptJquery = document.createElement("script");
          scriptJquery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
          scriptJquery.onload = resolve;
          document.head.appendChild(scriptJquery);
        });
      }

      // 2. Load jQuery.ripples if not present
      if (!(window as any).jQuery.fn.ripples) {
        await new Promise((resolve) => {
          scriptRipples = document.createElement("script");
          scriptRipples.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js";
          scriptRipples.onload = resolve;
          document.head.appendChild(scriptRipples);
        });
      }

      // 3. Initialize ripples
      if (heroRef.current && (window as any).jQuery) {
        const $ = (window as any).jQuery;
        try {
          $(heroRef.current).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
            interactive: true,
          });
        } catch (e) {
          console.error("Ripples failed to init:", e);
        }
      }
    };

    init();

    return () => {
      if (heroRef.current && (window as any).jQuery && (window as any).jQuery.fn.ripples) {
        const $ = (window as any).jQuery;
        try {
          $(heroRef.current).ripples("destroy");
        } catch (e) {}
      }
      // Optional: remove scripts if you want, but usually leaving them is fine
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className={`${styles.hero}`}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        // jQuery ripples requires a background image to distort
        backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to ensure text readability over the background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 0
      }} />

      <div className={`container ${styles.heroInner}`} style={{ position: "relative", zIndex: 10 }}>
        <FadeInUp delay={0.1}>
          <h1 className={`${styles.heroTitle}`}>
            श्री नारायण <span className="text-gradient">उच्च माध्यमिक विद्यालय</span>
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className={`${styles.heroSubtitle}`}>
            Shree Narayan Higher Secondary School provides
          </p>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <p className={`${styles.heroSubtitle}`}>
            quality education from ECD to Grade 12 in Sarlahi.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.4}>
          <div className={styles.heroAction}>
            <Link href="/admission" className={styles.heroCta}>
              Apply Now <ArrowRight size={18} />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
