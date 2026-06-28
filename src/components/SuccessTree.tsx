"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Microscope, Trophy, Users } from "lucide-react";
import styles from "./SuccessTree.module.css";

const branches = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    desc: "Dedicated educators using modern methodologies.",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.12)",
  },
  {
    icon: Microscope,
    title: "Modern Labs",
    desc: "Fully equipped science & computer labs.",
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.12)",
  },
  {
    icon: Trophy,
    title: "Proven Results",
    desc: "Outstanding board exam performance.",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
  },
  {
    icon: Users,
    title: "Holistic Growth",
    desc: "Sports, arts, debates & extracurriculars.",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.12)",
  },
];

export default function SuccessTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.treeContainer} ${isVisible ? styles.visible : ""}`}
    >
      {/* SVG Curved Branches (Desktop) */}
      <svg className={`${styles.svgLines} ${styles.desktopLines}`} viewBox="0 0 900 520" preserveAspectRatio="none">
        <path d="M 140 260 C 300 260, 400 80, 600 80"   pathLength="1" className={`${styles.branchLine} ${styles.line0}`} />
        <path d="M 140 260 C 330 260, 430 200, 600 200"  pathLength="1" className={`${styles.branchLine} ${styles.line1}`} />
        <path d="M 140 260 C 330 260, 430 320, 600 320"  pathLength="1" className={`${styles.branchLine} ${styles.line2}`} />
        <path d="M 140 260 C 300 260, 400 440, 600 440"  pathLength="1" className={`${styles.branchLine} ${styles.line3}`} />
      </svg>

      {/* SVG Curved Branches (Mobile - Woven Vine Effect) */}
      <svg className={`${styles.svgLines} ${styles.mobileLines}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Branching from top-center (root bottom) to center of each card */}
        <path d="M 50 18 C 20 22, 80 26, 50 32" pathLength="1" className={`${styles.branchLine} ${styles.line0}`} />
        <path d="M 50 18 C 80 30, 20 40, 50 51" pathLength="1" className={`${styles.branchLine} ${styles.line1}`} />
        <path d="M 50 18 C 20 40, 80 55, 50 70" pathLength="1" className={`${styles.branchLine} ${styles.line2}`} />
        <path d="M 50 18 C 80 50, 20 75, 50 89" pathLength="1" className={`${styles.branchLine} ${styles.line3}`} />
      </svg>

      {/* Root Node (Left) */}
      <div className={styles.rootNode}>
        <div className={styles.rootPulse} />
        <div className={styles.rootInner}>
          <span className={styles.rootTitle}>Student Success</span>
        </div>
      </div>

      {/* Branch Nodes (Right) — positioned at curve endpoints */}
      <div className={styles.nodesColumn}>
        {branches.map((branch, i) => (
          <div
            key={branch.title}
            className={styles.branchNode}
            style={{ "--node-delay": `${1.0 + i * 0.25}s`, "--branch-color": branch.color } as React.CSSProperties}
          >
            <div className={styles.nodeCard}>
              <div className={styles.nodeIconWrap} style={{ background: branch.bg, color: branch.color }}>
                <branch.icon size={22} />
              </div>
              <div className={styles.nodeText}>
                <h4 className={styles.nodeTitle}>{branch.title}</h4>
                <p className={styles.nodeDesc}>{branch.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
