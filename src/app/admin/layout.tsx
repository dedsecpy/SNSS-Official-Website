import Link from "next/link";
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If not authenticated, render children without sidebar.
  // This covers the login page (middleware allows /admin/login without auth).
  // Protected pages redirect via middleware before reaching this layout.
  const authed = await isAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "var(--color-bg-subtle)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "260px",
        background: "var(--color-bg)",
        borderRight: "1px solid var(--color-border)",
        padding: "2rem 1rem",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}>
        <h2 style={{
          padding: "0 0.75rem",
          marginBottom: "1.75rem",
          fontSize: "1.0625rem",
          fontWeight: 650,
          letterSpacing: "-0.01em"
        }}>
          Admin Portal
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          <Link
            href="/admin"
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.625rem 0.75rem", borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)", fontWeight: 500, fontSize: "0.9375rem",
              textDecoration: "none", transition: "all 150ms ease"
            }}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            href="/admin/admissions"
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.625rem 0.75rem", borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)", fontWeight: 500, fontSize: "0.9375rem",
              textDecoration: "none", transition: "all 150ms ease"
            }}
          >
            <Users size={18} /> Admissions
          </Link>
          <Link
            href="/admin/notices"
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.625rem 0.75rem", borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)", fontWeight: 500, fontSize: "0.9375rem",
              textDecoration: "none", transition: "all 150ms ease"
            }}
          >
            <FileText size={18} /> Notices & Blogs
          </Link>
        </nav>

        {/* Logout */}
        <form action={logout}>
          <button
            type="submit"
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.625rem 0.75rem", borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)", fontWeight: 500, fontSize: "0.9375rem",
              width: "100%", textAlign: "left", cursor: "pointer",
              background: "none", border: "none", fontFamily: "var(--font-body)",
              transition: "all 150ms ease"
            }}
          >
            <LogOut size={18} /> Sign out
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
