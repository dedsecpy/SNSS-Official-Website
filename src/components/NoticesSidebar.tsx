import { prisma } from "@/lib/prisma";
import NoticesSidebarClient from "./NoticesSidebarClient";

export default async function NoticesSidebar() {
  let notices = [];
  try {
    notices = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    // Return null to gracefully hide the sidebar if the DB fails
    return null;
  }

  if (notices.length === 0) {
    return null;
  }

  const serializedNotices = notices.map((n) => ({
    id: n.id,
    title: n.title,
    content: n.content,
    type: n.type,
    createdAt: n.createdAt.toISOString(),
  }));

  return <NoticesSidebarClient notices={serializedNotices} />;
}
