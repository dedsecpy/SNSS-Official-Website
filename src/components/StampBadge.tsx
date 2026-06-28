"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function StampBadge({
  children,
  className = "",
  delay = 0.3
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 4, opacity: 0, rotate: -30 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 30, // High damping stops the bounce dead
        mass: 1,
        delay: delay + 0.6
      }}
    >
      {children}
    </motion.div>
  );
}
