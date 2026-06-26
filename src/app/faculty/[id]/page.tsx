import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import FadeInUp from "@/components/FadeInUp";
import { prisma } from "@/lib/prisma";

export default async function FacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faculty = await prisma.faculty.findUnique({
    where: { id }
  });

  if (!faculty) {
    notFound();
  }

  return (
    <main className={styles.facultyPage}>
      {/* ─── Top Banner ─── */}
      <div className={styles.banner}>
        <div className="container">
          <FadeInUp>
            <h1 className={styles.bannerTitle}>OUR FACULTY</h1>
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              {" > "}Faculty{" > "}{faculty.name}
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ─── Profile Content ─── */}
      <section className={styles.profileSection}>
        <div className={styles.profileGrid}>
          {/* Left Column */}
          <FadeInUp delay={0.1}>
            <div className={styles.imageContainer}>
              <Image
                src={faculty.image}
                alt={faculty.name}
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
            </div>
          </FadeInUp>

          {/* Right Column */}
          <FadeInUp delay={0.2}>
            <div className={styles.details}>
              <div>
                <h2 className={styles.name}>{faculty.name}</h2>
                <p className={styles.role}>{faculty.role}</p>
                {faculty.department && <p className={styles.role}>{faculty.department}</p>}
              </div>

              <div className={styles.divider} />

              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Qualification:</span>
                <span className={styles.infoValue}>{faculty.qualification}</span>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Email:</span>
                <a href={`mailto:${faculty.email}`} className={styles.link}>{faculty.email}</a>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Specialization:</span>
                <span className={styles.infoValue}>{faculty.researchInterest}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.infoBlock} style={{ flexDirection: "column", gap: "1rem" }}>
                <span className={styles.infoLabel} style={{ fontSize: "1.25rem" }}>About</span>
                <span className={styles.infoValue} style={{ fontSize: "1.125rem" }}>{faculty.description}</span>
              </div>

            </div>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
