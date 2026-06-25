"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./EventsCarousel.module.css";
import FadeInUp from "./FadeInUp";

const initialEvents = [
  {
    id: 1,
    dateDay: "12",
    dateMonth: "MAY",
    title: "National Cadet Corps (NCC) Program",
    description: "Students participating in the NCC training program with officials, promoting discipline and leadership.",
    image: "/event-1.jpg"
  },
  {
    id: 2,
    dateDay: "08",
    dateMonth: "MAY",
    title: "Women's Sports Team Excellence",
    description: "Our outstanding girls' sports team proudly representing SNSS in regional tournaments.",
    image: "/event-2.jpg"
  },
  {
    id: 3,
    dateDay: "24",
    dateMonth: "APR",
    title: "Taekwondo Championship Winners",
    description: "Proud students showcasing their medals from the 25th ITF Taekwondo National Championship.",
    image: "/event-3.jpg"
  },
  {
    id: 4,
    dateDay: "15",
    dateMonth: "APR",
    title: "Faculty Cultural Celebration",
    description: "Our dedicated faculty members gathering to celebrate a vibrant cultural event at the school premises.",
    image: "/event-4.jpg"
  },
  {
    id: 5,
    dateDay: "02",
    dateMonth: "APR",
    title: "Annual Sports Day Prize Distribution",
    description: "Honoring our top athletes and sports teams for their incredible performance in the annual sports meet.",
    image: "/event-5.jpg"
  }
];

export default function EventsCarousel() {
  const [events, setEvents] = useState(initialEvents);
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
              <div
                key={`${event.id}-${idx}`}
                className={styles.card}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
