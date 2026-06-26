import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import FadeInUp from "@/components/FadeInUp";
import styles from "@/components/FacultyProfiles.module.css";

export const revalidate = 0;

export default async function AllFacultiesPage() {
  const faculties = await prisma.faculty.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", paddingTop: "8rem", paddingBottom: "5rem" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        <FadeInUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ 
              display: "inline-block", 
              fontSize: "0.875rem", 
              fontWeight: 700, 
              color: "var(--color-primary)", 
              textTransform: "uppercase", 
              letterSpacing: "0.1em",
              marginBottom: "1rem"
            }}>
              Our Team
            </span>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
              fontWeight: 800, 
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}>
              Faculty Directory
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
              Meet the dedicated educators who are committed to academic excellence and holistic student development.
            </p>
          </div>
        </FadeInUp>

        <div className={styles.grid}>
          {faculties.map((faculty, idx) => (
            <FadeInUp key={faculty.id} delay={0.1 + (idx % 6) * 0.1}>
              <Link href={`/faculty/${faculty.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <div className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={faculty.image} 
                      alt={faculty.name} 
                      fill 
                      style={{ objectFit: 'cover', objectPosition: 'top center' }} 
                    />
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.name}>{faculty.name}</h3>
                    <p className={styles.role}>{faculty.role}</p>
                    <p className={styles.desc}>{faculty.description}</p>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          ))}
          {faculties.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--color-text-tertiary)" }}>
              No faculty profiles available.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
