"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

function buildDesktopPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  const midX = x1 + (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

function buildMobilePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  index: number
): string {
  const midY = y1 + (y2 - y1) * 0.5;
  const sway = index % 2 === 0 ? -18 : 18;
  return `M ${x1} ${y1} C ${x1 + sway} ${midY}, ${x2 - sway} ${midY}, ${x2} ${y2}`;
}

export default function SuccessTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);

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

  useLayoutEffect(() => {
    const updatePaths = () => {
      const container = containerRef.current;
      const root = rootRef.current;
      if (!container || !root) return;

      const containerRect = container.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 768px)").matches;

      const rootCX = rootRect.left - containerRect.left + rootRect.width / 2;
      const rootCY = rootRect.top - containerRect.top + rootRect.height / 2;
      const rootRadius = rootRect.width / 2;

      const nextPaths: string[] = [];

      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const nodeRect = node.getBoundingClientRect();

        if (mobile) {
          const x1 = rootCX;
          const y1 = rootCY + rootRadius;
          const x2 = nodeRect.left - containerRect.left + nodeRect.width / 2;
          const y2 = nodeRect.top - containerRect.top;
          nextPaths.push(buildMobilePath(x1, y1, x2, y2, i));
        } else {
          const x1 = rootCX + rootRadius;
          const y1 = rootCY;
          const x2 = nodeRect.left - containerRect.left;
          const y2 = nodeRect.top - containerRect.top + nodeRect.height / 2;
          nextPaths.push(buildDesktopPath(x1, y1, x2, y2));
        }
      });

      setPaths(nextPaths);
    };

    updatePaths();

    // Recalculate after fonts/layout settle
    const raf = requestAnimationFrame(updatePaths);
    const t = window.setTimeout(updatePaths, 100);

    const ro = new ResizeObserver(updatePaths);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", updatePaths);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`${styles.treeContainer} ${isVisible ? styles.visible : ""}`}
    >
      <svg
        className={styles.svgLines}
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength="1"
            className={`${styles.branchLine} ${styles[`line${i}` as keyof typeof styles]}`}
          />
        ))}
      </svg>

      <div className={styles.rootNode} ref={rootRef}>
        <div className={styles.rootPulse} />
        <div className={styles.rootInner}>
          <span className={styles.rootTitle}>Student Success</span>
        </div>
      </div>

      <div className={styles.nodesColumn}>
        {branches.map((branch, i) => (
          <div
            key={branch.title}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            style={
              {
                "--node-delay": `${1.0 + i * 0.25}s`,
                "--branch-color": branch.color,
              } as React.CSSProperties
            }
          >
            <div className={styles.nodeCard}>
              <div
                className={styles.nodeIconWrap}
                style={{ background: branch.bg, color: branch.color }}
              >
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
