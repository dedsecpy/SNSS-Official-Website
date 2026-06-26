import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./FacultyProfiles.module.css";
import FadeInUp from "./FadeInUp";
import { prisma } from "@/lib/prisma";

export default async function FacultyProfiles() {
  const faculties = await prisma.faculty.findMany({
    take: 6,
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div className={styles.grid}>
        {faculties.map((faculty, idx) => (
          <FadeInUp key={faculty.id} delay={0.1 + (idx * 0.1)}>
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
      </div>
      
      <FadeInUp delay={0.4}>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/faculty" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 2rem", borderRadius: "var(--radius-full)", fontWeight: 600 }}>
            Explore All Faculty <ArrowRight size={18} />
          </Link>
        </div>
      </FadeInUp>
    </div>
  );
}
