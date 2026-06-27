import type { Metadata } from "next";
import { Inter, Outfit, Tiro_Devanagari_Hindi, Mukta } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TickerTape from "@/components/TickerTape";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const tiroDevanagari = Tiro_Devanagari_Hindi({ subsets: ["devanagari"], weight: ["400"], style: ["italic"], variable: "--font-nepali" });
const mukta = Mukta({ subsets: ["devanagari"], weight: ["400", "700", "800"], variable: "--font-mukta" });

  export const metadata: Metadata = {
    metadataBase: new URL("https://www.shreenarayan.edu.np"),
    title: {
      default: "Shree Narayan Secondary School | Quality Education",
      template: "%s | Shree Narayan Secondary School",
    },
    description: "Official website of Shree Narayan Secondary School, providing quality education from ECD to Grade 12 in Ishworpur Municipality, Sarlahi, Nepal.",
    keywords: ["Shree Narayan Secondary School", "SNSS", "Education in Sarlahi", "School in Ishworpur", "+2 Science", "+2 Management", "+2 Education"],
    openGraph: {
      title: "Shree Narayan Secondary School",
      description: "Quality education from ECD to Grade 12 in Ishworpur Municipality, Sarlahi.",
      url: "https://www.shreenarayan.edu.np",
      siteName: "Shree Narayan Secondary School",
      images: [
        {
          url: "/block-a.png",
          width: 1200,
          height: 630,
          alt: "Shree Narayan Secondary School",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Shree Narayan Secondary School",
      description: "Quality education from ECD to Grade 12 in Ishworpur Municipality.",
      images: ["/block-a.png"],
    },
  };
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Shree Narayan Secondary School",
      "url": "https://www.shreenarayan.edu.np",
      "logo": "https://www.shreenarayan.edu.np/logo.jpg",
      "image": "https://www.shreenarayan.edu.np/block-a.png",
      "description": "Official website of Shree Narayan Secondary School, providing quality education from ECD to Grade 12 in Ishworpur Municipality, Sarlahi, Nepal.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ishworpur Municipality",
        "addressRegion": "Sarlahi",
        "addressCountry": "NP"
      }
    };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${tiroDevanagari.variable} ${mukta.variable}`} suppressHydrationWarning>
        <TickerTape />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
