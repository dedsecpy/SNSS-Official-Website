import { prisma } from "@/lib/prisma";
import { Users, FileText, CheckCircle } from "lucide-react";
import styles from "./admin.module.css";

export const revalidate = 0; // Dynamic page

export default async function AdminDashboard() {
  const totalAdmissions = await prisma.admissionForm.count();
  const pendingAdmissions = await prisma.admissionForm.count({ where: { status: 'Pending' } });
  const totalNotices = await prisma.notice.count();

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>Dashboard Overview</h1>
      
      <div className={styles.dashboardGrid}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>Total Applications</h3>
            <Users size={20} style={{ color: "var(--color-text-tertiary)" }} />
          </div>
          <p style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}>{totalAdmissions}</p>
        </div>
        
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>Pending Review</h3>
            <CheckCircle size={20} style={{ color: "var(--color-accent)" }} />
          </div>
          <p style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}>{pendingAdmissions}</p>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>Published Notices</h3>
            <FileText size={20} style={{ color: "var(--color-success)" }} />
          </div>
          <p style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "var(--font-heading)" }}>{totalNotices}</p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>System Status</h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem" }}>
          All systems operational. The SQLite database is connected and syncing correctly.
        </p>
      </div>
    </div>
  );
}
