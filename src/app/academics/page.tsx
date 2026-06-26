"use client";

import { GraduationCap, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AcademicsPage() {
  const programs = [
    {
      icon: <Briefcase size={28} />,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
      title: "+2 Management Stream",
      desc: "Our Management faculty prepares students for the dynamic world of business, finance, and technology.",
      subjects: ["Accountancy", "Business Studies", "Economics", "Computer Science"],
      slug: "/academics/management",
    },
    {
      icon: <BookOpen size={28} />,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.08)",
      title: "+2 Education Stream",
      desc: "Designed to build the next generation of educators, administrators, and child development specialists.",
      subjects: ["Education Studies", "Child Development", "Educational Psychology", "Teaching Methodology"],
      slug: "/academics/education",
    },
    {
      icon: <GraduationCap size={28} />,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      title: "+2 Science Stream",
      desc: "A rigorous program for students pursuing careers in medicine, engineering, and technology.",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
      slug: "/academics/science",
    },
  ];

  return (
    <main>
      {/* Header */}
      <section style={{ padding: "5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <span className="section-label">Programs</span>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Academic programs
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "640px" }}>
            We offer a complete educational journey from Early Childhood Development up to Higher Secondary (+2) levels.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {programs.map((prog, i) => (
              <Link key={i} href={prog.slug} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div className="card" style={{ padding: "2.5rem", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = "translateY(-4px)";
                       e.currentTarget.style.boxShadow = "var(--shadow-md)";
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = "translateY(0)";
                       e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                     }}>
                  <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "var(--radius-md)",
                      background: prog.bg, color: prog.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0
                    }}>
                      {prog.icon}
                    </div>
                    <div>
                      <h2 style={{ fontSize: "1.375rem", fontWeight: 650, marginBottom: "0.5rem", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {prog.title}
                        <ArrowRight size={16} color="var(--color-primary)" />
                      </h2>
                      <p style={{ color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                        {prog.desc}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {prog.subjects.map((sub, j) => (
                          <span key={j} style={{
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            padding: "0.25rem 0.75rem",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-secondary)",
                            background: "var(--color-bg-subtle)"
                          }}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "3.5rem 0",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
        textAlign: "center"
      }}>
        <div className="container">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.625rem", letterSpacing: "-0.02em" }}>
            Interested in enrolling?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
            Start your application for the upcoming academic session.
          </p>
          <Link href="/admission" className="btn btn-primary btn-lg">
            Apply Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
