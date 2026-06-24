"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import FadeInUp from "@/components/FadeInUp";

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gradeAppliedFor: "",
    previousSchool: "",
    guardianName: "",
    contactPhone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main>
        <section style={{ padding: "6rem 0", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "560px" }}>
            <div className="card" style={{ padding: "3.5rem 2.5rem" }}>
              <CheckCircle2 size={56} style={{ color: "var(--color-success)", margin: "0 auto 1.25rem" }} />
              <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
                Application received
              </h1>
              <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem", fontSize: "1rem", lineHeight: 1.7 }}>
                Thank you for applying. Our admissions team will review your application and contact you at {formData.contactPhone} shortly.
              </p>
              <button onClick={() => window.location.href = "/"} className="btn btn-primary">
                Return to Home
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Header */}
      <section style={{ padding: "5rem 0 3rem", textAlign: "center" }}>
        <FadeInUp delay={0.1}>
          <div className="container">
            <span className="section-label">Admissions</span>
            <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
              Apply now
            </h1>
            <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "640px" }}>
              Apply for early childhood, primary, secondary, or +2 (Management & Education) programs.
            </p>
          </div>
        </FadeInUp>
      </section>

      {/* Form */}
      <section className="section" style={{ paddingTop: 0 }}>
        <FadeInUp delay={0.2}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <div className="card" style={{ padding: "2.5rem" }}>
              {errorMsg && (
                <div style={{
                  background: "rgba(239, 68, 68, 0.06)",
                  color: "var(--color-error)",
                  padding: "0.875rem 1rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid rgba(239, 68, 68, 0.15)"
                }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.25rem" }}>
                  <div className="form-group">
                    <label className="form-label">Student&apos;s Full Name *</label>
                    <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} className="form-input" placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth *</label>
                    <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="form-input" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.25rem" }}>
                  <div className="form-group">
                    <label className="form-label">Grade Applying For *</label>
                    <select name="gradeAppliedFor" required value={formData.gradeAppliedFor} onChange={handleChange} className="form-input">
                      <option value="">Select grade…</option>
                      <option value="Nursery">Nursery / ECD</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11 - Management">+2 Management</option>
                      <option value="Grade 11 - Education">+2 Education</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Previous School</label>
                    <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} className="form-input" placeholder="Previous school name" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem" }}>
                  <div className="form-group">
                    <label className="form-label">Guardian&apos;s Name *</label>
                    <input type="text" name="guardianName" required value={formData.guardianName} onChange={handleChange} className="form-input" placeholder="Guardian full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone *</label>
                    <input type="tel" name="contactPhone" required value={formData.contactPhone} onChange={handleChange} className="form-input" placeholder="+977-9800000000" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", marginTop: "0.5rem", opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"} <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </FadeInUp>
      </section>
    </main>
  );
}
