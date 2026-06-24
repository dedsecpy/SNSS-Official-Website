import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function updateStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  
  await prisma.admissionForm.update({
    where: { id },
    data: { status },
  });
  
  revalidatePath("/admin/admissions");
}

export default async function AdminAdmissions() {
  const admissions = await prisma.admissionForm.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>Admissions Management</h1>
      
      <div className="card" style={{ overflow: "hidden", padding: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-muted)", borderBottom: "1px solid var(--color-border)" }}>
              <th style={{ padding: "0.875rem 1rem", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Student Name</th>
              <th style={{ padding: "0.875rem 1rem", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Grade Applied</th>
              <th style={{ padding: "0.875rem 1rem", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Contact Phone</th>
              <th style={{ padding: "0.875rem 1rem", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Date Applied</th>
              <th style={{ padding: "0.875rem 1rem", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</th>
              <th style={{ padding: "0.875rem 1rem", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((app) => (
              <tr key={app.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.875rem 1rem", fontSize: "0.9375rem", fontWeight: 500 }}>{app.studentName}</td>
                <td style={{ padding: "0.875rem 1rem", fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>{app.gradeAppliedFor}</td>
                <td style={{ padding: "0.875rem 1rem", fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>{app.contactPhone}</td>
                <td style={{ padding: "0.875rem 1rem", fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <span style={{ 
                    padding: "0.1875rem 0.625rem", 
                    borderRadius: "var(--radius-full)", 
                    fontSize: "0.8125rem",
                    fontWeight: 550,
                    background: app.status === 'Accepted' ? 'rgba(34, 197, 94, 0.1)' : app.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: app.status === 'Accepted' ? 'var(--color-success)' : app.status === 'Rejected' ? 'var(--color-error)' : 'var(--color-accent)'
                  }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <form action={updateStatus} style={{ display: "flex", gap: "0.5rem" }}>
                    <input type="hidden" name="id" value={app.id} />
                    <select name="status" defaultValue={app.status} className="form-input" style={{ padding: "0.25rem 0.5rem", width: "auto", fontSize: "0.8125rem" }}>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button type="submit" className="btn btn-secondary" style={{ padding: "0.25rem 0.625rem", fontSize: "0.8125rem" }}>Update</button>
                  </form>
                </td>
              </tr>
            ))}
            {admissions.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "var(--color-text-tertiary)" }}>No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
