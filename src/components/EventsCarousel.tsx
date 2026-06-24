"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./EventsCarousel.module.css";
import FadeInUp from "./FadeInUp";

const initialEvents = [
  {
    id: 1,
    dateDay: "04",
    dateMonth: "MAR",
    title: "Science Exhibition 2026 Winners Announced",
    description: "Our students showcased exceptional projects at the annual district level science exhibition...",
    image: "https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?w=600&q=80"
  },
  {
    id: 2,
    dateDay: "27",
    dateMonth: "FEB",
    title: "SNHSS Wins District Football Championship",
    description: "A thrilling final match resulted in a 2-1 victory for our senior boys football team...",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80"
  },
  {
    id: 3,
    dateDay: "25",
    dateMonth: "FEB",
    title: "Annual Cultural Fest 'Sanskriti' a Huge Success",
    description: "Students from all grades participated in various traditional dances and musical performances...",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80"
  },
  {
    id: 4,
    dateDay: "15",
    dateMonth: "FEB",
    title: "Guest Lecture by Renowned Scientist",
    description: "Dr. Sharma visited our campus to speak about the future of renewable energy and inspire young minds...",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
  },
  {
    id: 5,
    dateDay: "10",
    dateMonth: "FEB",
    title: "New Computer Lab Inauguration",
    description: "We are proud to announce the opening of our new state-of-the-art computer laboratory...",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
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
          <h2 className={styles.sectionTitle}>HAPPENINGS AT SNHSS</h2>
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
