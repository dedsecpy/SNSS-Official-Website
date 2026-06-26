"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./EventsCarousel.module.css";
import FadeInUp from "./FadeInUp";
import { eventsData } from "@/lib/data/events";

export default function EventsCarousel() {
  const [events, setEvents] = useState(eventsData);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      
      // Wait for the CSS transition to finish before snapping back
      setTimeout(() => {
        setEvents((prev) => {
          const newArr = [...prev];
          const first = newArr.shift();
          if (first) newArr.push(first);
          return newArr;
        });
        setIsSliding(false);
      }, 600); // 600ms matches the CSS transition duration
      
    }, 2500); // Slides every 2.5 seconds (gives a bit more reading time)
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.carouselSection}>
      <div className="container">
        <FadeInUp>
          <h2 className={styles.sectionTitle}>HAPPENINGS AT SNSS</h2>
        </FadeInUp>
        
        <div className={styles.carouselWrapper}>
          <div className={`${styles.carouselTrack} ${isSliding ? styles.sliding : ""}`}>
            {/* Render 4 items so that the upcoming one is ready off-screen */}
            {events.slice(0, 4).map((event, idx) => (
              <Link
                key={`${event.id}-${idx}`}
                href={`/events/${event.id}`}
                className={styles.card}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.dateBadge}>
                    <span className={styles.dateDay}>{event.dateDay}</span>
                    <span className={styles.dateMonth}>{event.dateMonth}</span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDesc}>{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
