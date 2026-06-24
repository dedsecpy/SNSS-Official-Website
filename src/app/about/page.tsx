import { Target, BookOpen, Building, ArrowRight } from "lucide-react";
import Link from "next/link";
import StatsCounter from "@/components/StatsCounter";

export default function AboutPage() {
  return (
    <main>
      {/* Page Header */}
      <section style={{ padding: "5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <span className="section-label">About Us</span>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Our story
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "640px" }}>
            Established in Keshargunj, Ishworpur Municipality, Shree Narayan Higher Secondary School has been a beacon of quality education in Sarlahi, Madhesh Province.
          </p>
        </div>
      </section>

      {/* Mission / Philosophy / Infrastructure */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            <div className="card">
              <div style={{
                width: 48, height: 48, borderRadius: "var(--radius-md)",
                background: "rgba(59,130,246,0.08)", color: "#3b82f6",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <Target size={24} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.625rem", letterSpacing: "-0.01em" }}>
                Our Mission
              </h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                To provide student-centered, interactive learning that fosters critical thinking, academic excellence, and holistic development for every child.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: 48, height: 48, borderRadius: "var(--radius-md)",
                background: "rgba(245,158,11,0.08)", color: "#f59e0b",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <BookOpen size={24} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.625rem", letterSpacing: "-0.01em" }}>
                Educational Philosophy
              </h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                We believe in a holistic approach combining the rigorous National Curriculum with sports, arts, debates, and extracurricular activities.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: 48, height: 48, borderRadius: "var(--radius-md)",
                background: "rgba(34,197,94,0.08)", color: "#22c55e",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem"
              }}>
                <Building size={24} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "0.625rem", letterSpacing: "-0.01em" }}>
                Infrastructure & Growth
              </h2>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                The school is continuously expanding, with major recent projects including a new Administrative Building (2023) and new academic wings (2025).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
            Want to be part of our community?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem", fontSize: "1.0625rem" }}>
            Applications for the 2083 BS academic session are now open.
          </p>
          <Link href="/admission" className="btn btn-primary btn-lg">
            Apply Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
