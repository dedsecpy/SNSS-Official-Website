"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function AnimatedNumber({ endValue, duration = 2000 }: { endValue: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // cubic ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setDisplayValue(Math.floor(easeOut * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, endValue, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
