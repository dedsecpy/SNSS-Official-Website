"use client";

import { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react";
import Link from "next/link";

interface PopAnnouncementProps {
  announcement: {
    id: string;
    title: string;
    content: string;
  } | null;
}

export default function PopAnnouncement({ announcement }: PopAnnouncementProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;

    // Check if the user has already seen this announcement in this session
    const seenKey = `hasSeenAnnouncement_${announcement.id}`;
    const hasSeen = sessionStorage.getItem(seenKey);

    if (!hasSeen) {
      // Small delay to allow the page to render first before popping up
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  const handleClose = () => {
    if (announcement) {
      sessionStorage.setItem(`hasSeenAnnouncement_${announcement.id}`, "true");
    }
    setIsVisible(false);
  };

  if (!announcement || !isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 0.3s ease-out forwards"
        }}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--color-bg)",
          borderRadius: "var(--radius-xl)",
          padding: "2rem",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          zIndex: 9999,
          animation: "popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          border: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        <button 
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-tertiary)",
            padding: "0.25rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s, background-color 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-bg-muted)";
            e.currentTarget.style.color = "var(--color-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-text-tertiary)";
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "rgba(220, 38, 38, 0.1)",
            color: "#dc2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <Megaphone size={24} />
          </div>
          <div>
            <span style={{ 
              fontSize: "0.75rem", 
              fontWeight: 700, 
              color: "#dc2626", 
              textTransform: "uppercase", 
              letterSpacing: "0.05em" 
            }}>
              Important Announcement
            </span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "0.25rem", letterSpacing: "-0.01em" }}>
              {announcement.title}
            </h2>
          </div>
        </div>

        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
          {announcement.content}
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <Link 
            href={`/notices/${announcement.id}`}
            onClick={handleClose}
            className="btn btn-primary"
            style={{ flex: 1, textAlign: "center" }}
          >
            Read More
          </Link>
          <button 
            onClick={handleClose}
            className="btn btn-outline"
            style={{ flex: 1 }}
          >
            Dismiss
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { 
            opacity: 0; 
            transform: translate(-50%, -45%) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}} />
    </>
  );
}
