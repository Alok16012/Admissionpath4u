import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admission Path 4u - Find Best Colleges in India",
    template: "%s | Admission Path 4u",
  },
  description:
    "Admission Path 4u helps you find your dream college in India. Compare fees, placements, and courses, get personalized college recommendations, and apply online.",
  keywords: [
    "Admission Path 4u",
    "college admission",
    "best colleges in India",
    "college finder",
    "college fees",
    "placements",
    "apply online",
    "career guidance",
  ],
  openGraph: {
    title: "Admission Path 4u - Find Best Colleges in India",
    description:
      "Find your dream college, compare fees and placements, and apply online with Admission Path 4u.",
    siteName: "Admission Path 4u",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Admission Path 4u - Find Best Colleges in India",
    description:
      "Find your dream college, compare fees and placements, and apply online with Admission Path 4u.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
