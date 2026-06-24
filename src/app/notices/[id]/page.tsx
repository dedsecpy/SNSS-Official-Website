import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bell, Megaphone, FileText, Calendar, Clock } from "lucide-react";

export const revalidate = 0;

function getTypeIcon(type: string) {
  switch (type) {
    case "Announcement":
      return <Megaphone size={16} />;
    case "Blog":
      return <FileText size={16} />;
    default:
      return <Bell size={16} />;
  }
}

function getTypeStyle(type: string) {
  switch (type) {
    case "Announcement":
      return { bg: "rgba(245, 158, 11, 0.08)", color: "#d97706", border: "rgba(245, 158, 11, 0.18)" };
    case "Blog":
      return { bg: "rgba(59, 130, 246, 0.08)", color: "#2563eb", border: "rgba(59, 130, 246, 0.18)" };
    default:
      return { bg: "rgba(239, 68, 68, 0.08)", color: "#dc2626", border: "rgba(239, 68, 68, 0.18)" };
  }
}

export default async function NoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const notice = await prisma.notice.findUnique({
    where: { id },
  });

  if (!notice || !notice.isPublished) {
    notFound();
  }

  const typeStyle = getTypeStyle(notice.type);

  // Get related notices (same type, excluding current)
  const relatedNotices = await prisma.notice.findMany({
    where: {
      isPublished: true,
      id: { not: notice.id },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <main>
      {/* Header */}
      <section style={{ padding: "5rem 0 2rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: "1.75rem",
              transition: "color 150ms ease",
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Type badge + date */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-full)",
                background: typeStyle.bg,
                color: typeStyle.color,
                border: `1px solid ${typeStyle.border}`,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {getTypeIcon(notice.type)}
              {notice.type}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-text-tertiary)", fontSize: "0.8125rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                <Calendar size={13} />
                {new Date(notice.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                <Clock size={13} />
                {new Date(notice.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            color: "var(--color-text)",
          }}>
            {notice.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBottom: "4rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="card" style={{ padding: "2.5rem" }}>
            <div
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.85,
                color: "var(--color-text-secondary)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {notice.content}
            </div>
          </div>
        </div>
      </section>

      {/* Related Notices */}
      {relatedNotices.length > 0 && (
        <section style={{
          padding: "3.5rem 0",
          borderTop: "1px solid var(--color-border)",
          background: "var(--color-bg-subtle)",
        }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <h2 style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Other Notices
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {relatedNotices.map((related) => {
                const relStyle = getTypeStyle(related.type);
                return (
                  <Link
                    key={related.id}
                    href={`/notices/${related.id}`}
                    className="card"
                    style={{
                      padding: "1.25rem 1.5rem",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          padding: "0.125rem 0.5rem",
                          borderRadius: "var(--radius-full)",
                          background: relStyle.bg,
                          color: relStyle.color,
                          border: `1px solid ${relStyle.border}`,
                          textTransform: "uppercase",
                          letterSpacing: "0.03em",
                          flexShrink: 0,
                        }}>
                          {related.type}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
                          {new Date(related.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--color-text)",
                        letterSpacing: "-0.01em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {related.title}
                      </h3>
                    </div>
                    <ArrowLeft size={16} style={{ transform: "rotate(180deg)", color: "var(--color-text-tertiary)", flexShrink: 0 }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
