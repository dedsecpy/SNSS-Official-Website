import { Library, Microscope, Monitor, Trophy, Book } from "lucide-react";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Library",
      icon: <Library size={28} />,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      desc: "A well-stocked library with a vast collection of books, journals, and reference publications.",
    },
    {
      title: "Science Laboratory",
      icon: <Microscope size={28} />,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.08)",
      desc: "Fully equipped labs for Physics, Chemistry, and Biology practicals with modern instruments.",
    },
    {
      title: "Computer Lab & Multimedia",
      icon: <Monitor size={28} />,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
      desc: "Modern computer facilities with internet access and multimedia teaching resources.",
    },
    {
      title: "Sports & ECA",
      icon: <Trophy size={28} />,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
      desc: "Excellent grounds and equipment for sports, music, dance, and extracurricular activities.",
    },
    {
      title: "Counseling & Scholarships",
      icon: <Book size={28} />,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.08)",
      desc: "Dedicated student services including academic counseling and merit-based scholarship programs.",
    },
  ];

  return (
    <main>
      {/* Header */}
      <section style={{ padding: "5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <span className="section-label">Facilities</span>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Campus facilities
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "640px" }}>
            We provide comprehensive facilities to support both academic excellence and the holistic development of our students.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {facilities.map((fac, idx) => (
              <div key={idx} className="card" style={{ textAlign: "center", padding: "2.5rem 2rem" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "var(--radius-md)",
                  background: fac.bg,
                  color: fac.color,
                  marginBottom: "1.25rem"
                }}>
                  {fac.icon}
                </div>
                <h3 style={{ fontSize: "1.1875rem", fontWeight: 650, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                  {fac.title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
