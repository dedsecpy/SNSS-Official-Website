import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/EventsCarousel.module.css";
import FadeInUp from "@/components/FadeInUp";

export const revalidate = 0;

export default async function EventsPage() {
  const allEvents = await prisma.event.findMany();

  // Sort descending by parsed date
  const events = allEvents.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main style={{ padding: "80px 0 60px", minHeight: "80vh" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .events-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1200px) { .events-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 900px) { .events-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .events-grid { grid-template-columns: repeat(1, 1fr); } }
        
        .small-card {
          width: 100% !important;
          min-width: 0 !important;
          max-width: none !important;
        }
        .small-card .cardContent { padding: 1rem; }
        .small-card h3 { font-size: 0.95rem; line-height: 1.3; margin-bottom: 0.4rem; }
        .small-card p { font-size: 0.8rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}} />
      <div className="container">
        <FadeInUp>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-0.02em" }}>All Events</h1>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
              Explore the upcoming and past events at Shree Narayan Secondary School.
            </p>
          </div>
        </FadeInUp>

        <div className="events-grid">
          {events.map((event, idx) => {
            const d = new Date(event.date);
            let formattedDate = event.date;
            if (!isNaN(d.getTime())) {
              formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth()+1).padStart(2, '0')}-${d.getFullYear()}`;
            }

            return (
              <FadeInUp key={event.id} delay={idx * 0.05}>
                <Link
                  href={`/events/${event.id}`}
                  className={`${styles.card} small-card`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div className={styles.imageWrapper} style={{ height: "160px" }}>
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
                  <div className={`cardContent ${styles.cardContent}`} style={{ flex: 1, padding: "1rem" }}>
                    <h3 className={styles.cardTitle} style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{event.title}</h3>
                    <p className={styles.cardDesc} style={{ fontSize: "0.8125rem" }}>{event.description}</p>
                  </div>
                </Link>
              </FadeInUp>
            );
          })}

          {events.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", background: "var(--color-bg-subtle)", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>No events found</h3>
              <p style={{ color: "var(--color-text-tertiary)", marginTop: "0.5rem" }}>Check back later for updates.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
