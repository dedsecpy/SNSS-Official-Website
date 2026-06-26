import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import styles from "./page.module.css";
import FadeInUp from "@/components/FadeInUp";
import { eventsData } from "@/lib/data/events";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <main className={styles.eventPage}>
      <div className="container" style={{ maxWidth: "800px", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <FadeInUp>
          <h1 className={styles.title}>{event.title}</h1>
          
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <Calendar size={18} className={styles.metaIcon} />
              {event.dateMonth} {event.dateDay}, 2026
            </div>
            {event.time && (
              <div className={styles.metaItem}>
                <Clock size={18} className={styles.metaIcon} />
                {event.time}
              </div>
            )}
            {event.location && (
              <div className={styles.metaItem}>
                <MapPin size={18} className={styles.metaIcon} />
                {event.location}
              </div>
            )}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className={styles.imageContainer}>
            <Image
              src={event.image}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
              className={styles.image}
              priority
            />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className={styles.contentSection}>
            <p className={styles.description}>
              {event.fullDescription || event.description}
            </p>
          </div>
        </FadeInUp>
      </div>
    </main>
  );
}
