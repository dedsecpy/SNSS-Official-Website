"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function CounterItem({ endValue, suffix, label }: { endValue: number, suffix: string, label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const duration = 2000; // 2 seconds

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing out function (cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setDisplayValue(Math.floor(easeOut * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, endValue]);

  return (
    <div ref={ref}>
      <div style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}>
        {displayValue}{suffix}
      </div>
      <div style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const stats = [
    { value: 500, suffix: "+", label: "Students" },
    { value: 30, suffix: "+", label: "Faculty Members" },
    { value: 3, suffix: "", label: "Academic Streams" },
    { value: 15, suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <section style={{
      padding: "3.5rem 0",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
      background: "var(--color-bg-subtle)"
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map((stat, i) => (
            <CounterItem key={i} endValue={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
