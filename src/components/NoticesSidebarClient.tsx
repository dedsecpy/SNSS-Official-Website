"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Megaphone, FileText, ArrowRight, Calendar, X } from "lucide-react";
import styles from "./NoticesSidebar.module.css";

type NoticeProps = {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
};

function getTypeIcon(type: string) {
  switch (type) {
    case "Announcement":
      return <Megaphone size={14} />;
    case "Blog":
      return <FileText size={14} />;
    default:
      return <Bell size={14} />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "Announcement":
      return { bg: "rgba(245, 158, 11, 0.1)", color: "#d97706", border: "rgba(245, 158, 11, 0.2)" };
    case "Blog":
      return { bg: "rgba(59, 130, 246, 0.1)", color: "#2563eb", border: "rgba(59, 130, 246, 0.2)" };
    default:
      return { bg: "rgba(239, 68, 68, 0.1)", color: "#dc2626", border: "rgba(239, 68, 68, 0.2)" };
  }
}

export default function NoticesSidebarClient({ notices }: { notices: NoticeProps[] }) {
  const [closedIds, setClosedIds] = useState<Set<string>>(new Set());

  const visibleNotices = notices.filter(n => !closedIds.has(n.id));

  return (
    <AnimatePresence>
      {visibleNotices.length > 0 && (
        <motion.aside 
          className={styles.sidebarInner}
          initial={{ opacity: 1, width: 320 }}
          exit={{ opacity: 0, width: 0, margin: 0, overflow: "hidden" }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Latest Notices</h3>
            <button 
              className={styles.clearAllBtn}
              onClick={() => {
                const allIds = notices.map(n => n.id);
                setClosedIds(new Set(allIds));
              }}
              aria-label="Clear all notices"
            >
              Clear All
            </button>
          </div>
          <AnimatePresence>
            {visibleNotices.map((notice, index) => {
              const typeStyle = getTypeColor(notice.type);
              return (
                <motion.div 
                  key={notice.id} 
                  className={styles.noticeItem}
                  initial={{ opacity: 0, x: 80, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.8, height: 0, marginBottom: 0, padding: 0, overflow: "hidden" }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: index * 0.15 
                  }}
                >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const newSet = new Set(closedIds);
                    newSet.add(notice.id);
                    setClosedIds(newSet);
                  }} 
                  className={styles.closeBtn}
                  aria-label="Close notice"
                >
                  <X size={14} />
                </button>
                <Link
                  href={`/notices/${notice.id}`}
                  className={styles.noticeLink}
                >
                  <div className={styles.noticeTop}>
                    <span
                      className={styles.noticeBadge}
                      style={{
                        background: typeStyle.bg,
                        color: typeStyle.color,
                        borderColor: typeStyle.border,
                      }}
                    >
                      {getTypeIcon(notice.type)}
                      {notice.type}
                    </span>
                    <span className={styles.noticeDate}>
                      <Calendar size={11} />
                      {new Date(notice.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className={styles.noticeTitle}>{notice.title}</h3>
                  <p className={styles.noticeSnippet}>
                    {notice.content.length > 80
                      ? notice.content.substring(0, 80) + "…"
                      : notice.content}
                  </p>
                  <span className={styles.readMore}>
                    Read more <ArrowRight size={12} />
                  </span>
                </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
