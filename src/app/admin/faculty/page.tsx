import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const revalidate = 0;

async function createFaculty(formData: FormData) {
  "use server";
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");
  
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const qualification = formData.get("qualification") as string;
  const email = formData.get("email") as string;
  const department = formData.get("department") as string;
  const researchInterest = formData.get("researchInterest") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  
  let imageUrl = "/teacher1.jpg"; // Default fallback image
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
  
  if (name && role) {
    await prisma.faculty.create({
      data: { name, role, image: imageUrl, qualification, email, department, researchInterest, description },
    });
    revalidatePath("/admin/faculty");
    revalidatePath("/faculty");
    revalidatePath("/");
  }
}

async function deleteFaculty(formData: FormData) {
  "use server";
  const authed = await isAuthenticated();
  if (!authed) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.faculty.delete({ where: { id } });
  revalidatePath("/admin/faculty");
  revalidatePath("/faculty");
  revalidatePath("/");
}

import styles from "../admin.module.css";

export default async function AdminFaculty() {
  const faculties = await prisma.faculty.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>Manage Faculty Profiles</h1>
      
      <div className={styles.adminGrid}>
        {/* Create Form */}
        <div className="card" style={{ height: "fit-content" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 650, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>Add New Faculty</h2>
          <form action={createFaculty}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="name" required className="form-input" placeholder="e.g. Dr. Ram Prasad" />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input type="text" name="role" required className="form-input" placeholder="e.g. Principal & Science Faculty" />
            </div>
            <div className="form-group">
              <label className="form-label">Qualification</label>
              <input type="text" name="qualification" required className="form-input" placeholder="e.g. M.Sc., Ph.D." />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" required className="form-input" placeholder="e.g. email@snss.edu.np" />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" name="department" required className="form-input" placeholder="e.g. Department of Science" />
            </div>
            <div className="form-group">
              <label className="form-label">Research Interest</label>
              <input type="text" name="researchInterest" required className="form-input" placeholder="e.g. Quantum Mechanics" />
            </div>
            <div className="form-group">
              <label className="form-label">Description (Bio)</label>
              <textarea name="description" required className="form-input" rows={4} placeholder="Detailed bio..."></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Profile Image</label>
              <input type="file" name="image" accept="image/*" required className="form-input" style={{ padding: "0.5rem" }} />
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", marginTop: "0.25rem" }}>
                Maximum file size: 1 MB
              </p>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Add Faculty</button>
          </form>
        </div>

        {/* Faculties List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faculties.map(faculty => (
            <div key={faculty.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <img src={faculty.image} alt={faculty.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "0.2rem", letterSpacing: "-0.01em" }}>{faculty.name}</h3>
                    <p style={{ color: "var(--color-primary)", fontSize: "0.875rem", fontWeight: 500 }}>{faculty.role}</p>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem", marginTop: "0.2rem" }}>{faculty.department}</p>
                  </div>
                </div>
                <form action={deleteFaculty}>
                  <input type="hidden" name="id" value={faculty.id} />
                  <button type="submit" className="btn btn-ghost" style={{ color: "var(--color-error)", fontSize: "0.8125rem" }}>Remove</button>
                </form>
              </div>
            </div>
          ))}
          {faculties.length === 0 && (
            <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>
              No faculty profiles added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
