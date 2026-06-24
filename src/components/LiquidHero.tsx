"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import FadeInUp from "@/components/FadeInUp";
import styles from "@/app/page.module.css";

export default function LiquidHero() {
  const ref = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Primary tracking spring
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });
  
  // Secondary trailing spring with lower stiffness creates the liquid split/merge effect
  const springX2 = useSpring(mouseX, { stiffness: 60, damping: 25, mass: 0.8 });
  const springY2 = useSpring(mouseY, { stiffness: 60, damping: 25, mass: 0.8 });

  const scale = useMotionValue(0);
  const springScale = useSpring(scale, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const handleMouseEnter = () => scale.set(1);
    const handleMouseLeave = () => scale.set(0);

    const el = ref.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      
      mouseX.set(el.clientWidth / 2);
      mouseY.set(el.clientHeight / 2);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseX, mouseY, scale]);

  return (
    <section 
      ref={ref}
      className={`${styles.hero} mesh-bg`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Primary Blob */}
      <motion.div 
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          x: springX,
          y: springY,
          scale: springScale,
          width: 400,
          height: 400,
          background: "var(--color-primary)",
          opacity: 0.15,
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      
      {/* Secondary Trailing Blob */}
      <motion.div 
        style={{
          position: "absolute",
          top: -150,
          left: -150,
          x: springX2,
          y: springY2,
          scale: springScale,
          width: 300,
          height: 300,
          background: "var(--color-accent)",
          opacity: 0.15,
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

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
