import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import styles from "../admin.module.css";

export const revalidate = 0;

async function createEvent(formData: FormData) {
  "use server";
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");
  
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  
  let imageUrl = "/new.jpg"; // Default fallback image
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {}

    const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadsDir, filename);
    
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }
  
  if (title && date && description) {
    await prisma.event.create({
      data: { title, date, description, image: imageUrl },
    });
    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath("/");
  }
}

async function deleteEvent(formData: FormData) {
  "use server";
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
}

export default async function AdminEvents() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>Manage Events</h1>
      
      <div className={styles.adminGrid}>
        {/* Create Form */}
        <div className="card" style={{ height: "fit-content" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>Add New Event</h2>
          <form action={createEvent}>
            <div className="form-group">
              <label className="form-label">Event Name (Title)</label>
              <input type="text" name="title" required className="form-input" placeholder="e.g. Annual Sports Meet" />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="text" name="date" required className="form-input" placeholder="e.g. 15 March, 2026 or 15 MAR" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" required className="form-input" rows={4} placeholder="Event details..."></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Event Image</label>
              <input type="file" name="image" accept="image/*" required className="form-input" style={{ padding: "0.5rem" }} />
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", marginTop: "0.25rem" }}>
                Maximum file size: 1 MB
              </p>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Add Event</button>
          </form>
        </div>

        {/* Events List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {events.map(event => (
            <div key={event.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <img src={event.image} alt={event.title} style={{ width: "80px", height: "60px", borderRadius: "8px", objectFit: "cover" }} />
                  <div>
                    <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "0.2rem", letterSpacing: "-0.01em" }}>{event.title}</h3>
                    <p style={{ color: "var(--color-primary)", fontSize: "0.875rem", fontWeight: 500 }}>{event.date}</p>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem", marginTop: "0.2rem" }}>{event.description.substring(0, 100)}...</p>
                  </div>
                </div>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={event.id} />
                  <button type="submit" className="btn btn-ghost" style={{ color: "var(--color-error)", fontSize: "0.8125rem" }}>Remove</button>
                </form>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
              No events added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
