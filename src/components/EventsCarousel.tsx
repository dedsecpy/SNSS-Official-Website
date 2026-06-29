"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./EventsCarousel.module.css";
import FadeInUp from "./FadeInUp";
type EventProp = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

export default function EventsCarousel({ events }: { events: EventProp[] }) {
  return (
    <section className={styles.carouselSection}>
      <div className="container">
        <FadeInUp>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className={styles.sectionTitle}>HAPPENINGS AT SNSS</h2>
            <Link href="/events" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
              Explore all events →
            </Link>
          </div>
        </FadeInUp>
        
        <div className={styles.eventsGrid}>
          {events.map((event, idx) => {
            const d = new Date(event.date);
            let formattedDate = event.date;
            if (!isNaN(d.getTime())) {
              formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth()+1).padStart(2, '0')}-${d.getFullYear()}`;
            }

            return (
              <Link
                key={`${event.id}-${idx}`}
                href={`/events/${event.id}`}
                className={styles.card}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.imageWrapper} style={{ height: "180px" }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {formattedDate}
                  </div>
                </div>
                <div className={styles.cardContent} style={{ padding: "1rem" }}>
                  <h3 className={styles.cardTitle} style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{event.title}</h3>
                  <p className={styles.cardDesc} style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>{event.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
