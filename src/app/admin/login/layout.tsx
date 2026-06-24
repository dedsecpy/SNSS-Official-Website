export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page gets a plain layout — no sidebar, no navbar/footer
  return <>{children}</>;
}
