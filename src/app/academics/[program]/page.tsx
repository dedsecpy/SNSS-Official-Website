import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Microscope, BookOpen, GraduationCap } from "lucide-react";
import styles from "./page.module.css";
import FadeInUp from "@/components/FadeInUp";

const programsData = {
  science: {
    title: "+2 Science",
    subtitle: "A rigorous program for students pursuing careers in medicine, engineering, and technology.",
    icon: <Microscope size={36} />,
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.1)",
    class11: {
      compulsory: ["Nepali", "English", "Mathematics"],
      optional: [
        "Physics",
        "Chemistry",
        "Biology / Computer Science"
      ]
    },
    class12: {
      compulsory: ["Nepali", "English", "Life Skills Education / Mathematics"],
      optional: [
        "Physics",
        "Chemistry",
        "Biology / Computer Science"
      ]
    }
  },
  management: {
    title: "+2 Management",
    subtitle: "Business education preparing future leaders, entrepreneurs, and corporate professionals.",
    icon: <BookOpen size={36} />,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
    class11: {
      compulsory: ["Nepali", "English", "Social Studies & Life Skills"],
      optional: [
        "Accountancy",
        "Economics",
        "Business Studies / Computer Science / Hotel Management"
      ]
    },
    class12: {
      compulsory: ["Nepali", "English", "Life Skills Education"],
      optional: [
        "Accountancy",
        "Economics",
        "Business Studies / Computer Science / Hotel Management / Marketing"
      ]
    }
  },
  education: {
    title: "+2 Education",
    subtitle: "Fostering the next generation of educators with modern teaching methodologies.",
    icon: <GraduationCap size={36} />,
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.1)",
    class11: {
      compulsory: ["Nepali", "English", "Social Studies & Life Skills"],
      optional: [
        "Education and Development",
        "Pedagogy",
        "Optional English / Optional Nepali / Optional Mathematics"
      ]
    },
    class12: {
      compulsory: ["Nepali", "English", "Life Skills Education"],
      optional: [
        "Education and Development",
        "Instructional Evaluation",
        "Optional English / Optional Nepali / Optional Mathematics"
      ]
    }
  }
};

export default async function ProgramPage({ params }: { params: Promise<{ program: string }> }) {
  const { program: programParam } = await params;
  const programKey = programParam.toLowerCase() as keyof typeof programsData;
  const program = programsData[programKey];

  if (!program) {
    notFound();
  }

  return (
    <main>
      {/* ─── Hero Section ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContainer}>
          <FadeInUp>
            <div className={styles.programIcon} style={{ background: program.bg, color: program.color }}>
              {program.icon}
            </div>
            <h1 className={styles.heroTitle}>{program.title}</h1>
            <p className={styles.heroSubtitle}>{program.subtitle}</p>
          </FadeInUp>
        </div>
      </section>

      {/* ─── Syllabus Section ─── */}
      <section className={styles.syllabusSection}>
        <div className={styles.grid}>
          {/* Class 11 */}
          <FadeInUp delay={0.1}>
            <div className={styles.classCard}>
              <h2 className={styles.classTitle}>Grade 11 Curriculum</h2>
              
              <div className={styles.tableWrapper}>
                <table className={styles.officialTable}>
                  <thead>
                    <tr>
                      <th>Subject Type</th>
                      <th>Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.typeCol}>Compulsory</td>
                      <td>
                        <ul className={styles.officialList}>
                          {program.class11.compulsory.map((sub, i) => (
                            <li key={i}>{sub}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.typeCol}>Optional (Choose 3)</td>
                      <td>
                        <ul className={styles.officialList}>
                          {program.class11.optional.map((sub, i) => (
                            <li key={i}>{sub}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeInUp>

          {/* Class 12 */}
          <FadeInUp delay={0.2}>
            <div className={styles.classCard}>
              <h2 className={styles.classTitle}>Grade 12 Curriculum</h2>
              
              <div className={styles.tableWrapper}>
                <table className={styles.officialTable}>
                  <thead>
                    <tr>
                      <th>Subject Type</th>
                      <th>Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.typeCol}>Compulsory</td>
                      <td>
                        <ul className={styles.officialList}>
                          {program.class12.compulsory.map((sub, i) => (
                            <li key={i}>{sub}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.typeCol}>Optional (Choose 3)</td>
                      <td>
                        <ul className={styles.officialList}>
                          {program.class12.optional.map((sub, i) => (
                            <li key={i}>{sub}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section style={{
        padding: "4rem 0",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
        textAlign: "center"
      }}>
        <div className="container">
          <FadeInUp>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
              Ready to shape your future?
            </h2>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem", fontSize: "1.125rem" }}>
              Admissions are now open for the {program.title} program.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/admission" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Apply for Admission <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-lg">
                Contact Us
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </main>
  );
}
