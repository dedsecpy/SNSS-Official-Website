import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import styles from "../admin.module.css";

export const revalidate = 0;

async function createNotice(formData: FormData) {
  "use server";
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const type = formData.get("type") as string;
  
  if (title && content && type) {
    await prisma.notice.create({
      data: { title, content, type },
    });
    revalidatePath("/admin/notices");
    revalidatePath("/");
  }
}

async function deleteNotice(formData: FormData) {
  "use server";
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.notice.delete({ where: { id } });
  revalidatePath("/admin/notices");
  revalidatePath("/");
}

export default async function AdminNotices() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>Content Management</h1>
      
      <div className={styles.adminGrid}>
        {/* Create Form */}
        <div className="card" style={{ height: "fit-content" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>Create New Post</h2>
          <form action={createNotice}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" name="title" required className="form-input" placeholder="Post title" />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select name="type" required className="form-input">
                <option value="Notice">Notice</option>
                <option value="Announcement">Announcement</option>
                <option value="Blog">Blog</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea name="content" required className="form-input" rows={6} placeholder="Write your content here…"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Publish Post</button>
          </form>
        </div>

        {/* Notices List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {notices.map(notice => (
            <div key={notice.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.125rem 0.5rem",
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-bg-muted)",
                    color: "var(--color-text-secondary)",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  }}>
                    {notice.type}
                  </span>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "0.375rem", letterSpacing: "-0.01em" }}>{notice.title}</h3>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {notice.content.substring(0, 150)}...
                  </p>
                </div>
                <form action={deleteNotice}>
                  <input type="hidden" name="id" value={notice.id} />
                  <button type="submit" className="btn btn-ghost" style={{ color: "var(--color-error)", fontSize: "0.8125rem" }}>Delete</button>
                </form>
              </div>
            </div>
          ))}
          {notices.length === 0 && (
            <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
              No notices published yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
