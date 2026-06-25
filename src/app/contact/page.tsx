"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      {/* Header */}
      <section style={{ padding: "5rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <span className="section-label">Contact</span>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Get in touch
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "640px" }}>
            We are located in the heart of Ishworpur Municipality. Reach out for admissions or general inquiries.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {/* Contact Info */}
            <div className="card" style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "1.75rem", letterSpacing: "-0.01em" }}>
                Contact Information
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "var(--radius-md)",
                    background: "var(--color-bg-muted)", color: "var(--color-text)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>Address</h3>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      Keshargunj, Ishworpur 45801, Sarlahi, Madhesh Province, Nepal
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "var(--radius-md)",
                    background: "var(--color-bg-muted)", color: "var(--color-text)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>Phone</h3>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>9854027017</p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.0625rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--color-text)" }}>Email Us</h3>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>narayanssks@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 650, marginBottom: "1.75rem", letterSpacing: "-0.01em" }}>
                Send us a message
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We will get back to you shortly."); }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email or Phone</label>
                  <input type="text" className="form-input" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={4} placeholder="How can we help?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
