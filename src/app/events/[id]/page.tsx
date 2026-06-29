import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import styles from "./page.module.css";
import FadeInUp from "@/components/FadeInUp";
import { eventsData } from "@/lib/data/events";
import { prisma } from "@/lib/prisma";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) {
    notFound();
  }
  
  const dateParts = event.date.split(" ");
  const dateDay = dateParts[0] || "";
  const dateMonth = dateParts[1]?.substring(0, 3) || "";

  return (
    <main className={styles.eventPage}>
      <div className="container" style={{ maxWidth: "800px", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <Link href="/events" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Events
        </Link>
        
        <FadeInUp>
          <h1 className={styles.title}>{event.title}</h1>
          
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <Calendar size={18} className={styles.metaIcon} />
              {dateMonth} {dateDay}
            </div>
            {/* Keeping placeholders in case we add time/location later */}
            <div className={styles.metaItem}>
              <Clock size={18} className={styles.metaIcon} />
              TBA
            </div>
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
              {event.description}
            </p>
          </div>
        </FadeInUp>
      </div>
    </main>
  );
}
