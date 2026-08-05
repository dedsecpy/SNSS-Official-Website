import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FadeInUp from "@/components/FadeInUp";

export const revalidate = 0;

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", paddingTop: "8rem", paddingBottom: "5rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        <FadeInUp>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ 
              display: "inline-block", 
              fontSize: "0.875rem", 
              fontWeight: 700, 
              color: "var(--color-primary)", 
              textTransform: "uppercase", 
              letterSpacing: "0.1em",
              marginBottom: "1rem"
            }}>
              Updates
            </span>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
              fontWeight: 800, 
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}>
              Notice Board
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
              Stay updated with the latest news, announcements, and notices from Shree Narayan Secondary School.
            </p>
          </div>
        </FadeInUp>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {notices.map((notice, idx) => {
            const typeColor = notice.type === "Announcement" 
              ? "var(--color-error)" 
              : notice.type === "Blog" 
              ? "var(--color-success)" 
              : "var(--color-primary)";

            return (
              <FadeInUp key={notice.id} delay={0.1 + (idx % 5) * 0.1}>
                <Link href={`/notices/${notice.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="card" style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "pointer" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.25rem 0.75rem",
                          borderRadius: "var(--radius-full)",
                          backgroundColor: `${typeColor}15`,
                          color: typeColor,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {notice.type}
                        </span>
                        <span style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)" }}>
                          {new Date(notice.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.01em", margin: "0.5rem 0" }}>
                        {notice.title}
                      </h2>
                      <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                        {notice.content.substring(0, 180)}{notice.content.length > 180 ? '...' : ''}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeInUp>
            );
          })}
          
          {notices.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "var(--color-text-tertiary)", backgroundColor: "var(--color-bg-subtle)", borderRadius: "var(--radius-lg)" }}>
              No notices published yet.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
