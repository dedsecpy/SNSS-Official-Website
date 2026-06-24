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
  title: "Shree Narayan Madhyamik Vidyalaya",
  description: "Official website of Shree Narayan Madhyamik Vidyalaya, providing quality education from ECD to Grade 12 in Ishworpur Municipality, Sarlahi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${tiroDevanagari.variable} ${mukta.variable}`} suppressHydrationWarning>
        <TickerTape />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
