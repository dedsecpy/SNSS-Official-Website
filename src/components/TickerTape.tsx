"use client";

import React from 'react';
import styles from './TickerTape.module.css';
import { Sparkles } from 'lucide-react';

export default function TickerTape() {
  const message = "+2 Science Course NOW AVAILABLE !!!";
  
  // Create an array with enough items to ensure it fills even ultrawide monitors
  const items = Array(15).fill(message);

  return (
    <div className={styles.tickerWrap}>
      <div className={styles.ticker}>
        {/* First Half */}
        {items.map((item, index) => (
          <span key={`first-${index}`} className={styles.tickerItem}>
            <Sparkles size={14} />
            {item}
          </span>
        ))}
        {/* Second Half (duplicate for seamless loop) */}
        {items.map((item, index) => (
          <span key={`second-${index}`} className={styles.tickerItem}>
            <Sparkles size={14} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
