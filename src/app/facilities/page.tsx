import { Library, Microscope, Monitor, Trophy, Book } from "lucide-react";
import Image from "next/image";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Library",
      icon: <Library size={24} />,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80",
      desc: "A well-stocked library with a vast collection of books, journals, and reference publications.",
    },
    {
      title: "Science Laboratory",
      icon: <Microscope size={24} />,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.08)",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
      desc: "Fully equipped labs for Physics, Chemistry, and Biology practicals with modern instruments.",
    },
    {
      title: "Computer Lab & Multimedia",
      icon: <Monitor size={24} />,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
      desc: "Modern computer facilities with internet access and multimedia teaching resources.",
    },
    {
      title: "Sports & ECA",
      icon: <Trophy size={24} />,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
      desc: "Excellent grounds and equipment for sports, music, dance, and extracurricular activities.",
    },
    {
      title: "Counseling & Scholarships",
      icon: <Book size={24} />,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.08)",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {facilities.map((fac, idx) => (
              <div key={idx} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", width: "100%", height: "240px" }}>
                  <Image src={fac.image} alt={fac.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: fac.bg,
                      color: fac.color,
                      flexShrink: 0
                    }}>
                      {fac.icon}
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
                      {fac.title}
                    </h3>
                  </div>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
