import Link from "next/link";
import { LayoutDashboard, Users, FileText, LogOut, GraduationCap } from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";

import styles from "./admin.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 style={{
          padding: "0 0.75rem",
          marginBottom: "1.75rem",
          fontSize: "1.0625rem",
          fontWeight: 650,
          letterSpacing: "-0.01em",
          display: "none", /* hide the title on mobile if needed, or keep it */
        }}>
          Admin Portal
        </h2>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </Link>
          <Link href="/admin/admissions" className={styles.navLink}>
            <Users size={18} /> <span>Admissions</span>
          </Link>
          <Link href="/admin/notices" className={styles.navLink}>
            <FileText size={18} /> <span>Notices & Blogs</span>
          </Link>
          <Link href="/admin/faculty" className={styles.navLink}>
            <GraduationCap size={18} /> <span>Faculty Profiles</span>
          </Link>
          <Link href="/admin/events" className={styles.navLink}>
            <FileText size={18} /> <span>Events</span>
          </Link>
        </nav>

        {/* Logout */}
        <form action={logout} style={{ marginTop: "auto", paddingTop: "1rem" }}>
          <button type="submit" className={styles.navLink} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <LogOut size={18} /> <span>Sign out</span>
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
