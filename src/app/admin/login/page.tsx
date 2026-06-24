import { login, isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // If already logged in, redirect to admin dashboard
  const authed = await isAuthenticated();
  if (authed) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-bg-subtle)",
      padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "var(--radius-lg)",
            background: "var(--color-bg-muted)",
            color: "var(--color-text)",
            marginBottom: "1.25rem",
          }}>
            <Lock size={26} />
          </div>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.375rem",
          }}>
            Admin Portal
          </h1>
          <p style={{
            color: "var(--color-text-secondary)",
            fontSize: "0.9375rem",
          }}>
            Sign in to access the dashboard
          </p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          {error && (
            <div style={{
              background: "rgba(239, 68, 68, 0.06)",
              color: "var(--color-error)",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.25rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "1px solid rgba(239, 68, 68, 0.15)",
              textAlign: "center",
            }}>
              Invalid username or password
            </div>
          )}

          <form action={login}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                required
                className="form-input"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                required
                className="form-input"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", marginTop: "0.25rem" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
