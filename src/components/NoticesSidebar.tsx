import { prisma } from "@/lib/prisma";
import NoticesSidebarClient from "./NoticesSidebarClient";

export default async function NoticesSidebar() {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

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
