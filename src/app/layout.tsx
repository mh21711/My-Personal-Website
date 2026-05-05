import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

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
    template: "%s | Mahmoud Elrashedy",
    default: "Mahmoud Elrashedy",
  },
  
  description: "Mahmoud Elrashedy - Professional Full Stack Developer, UI/UX Designer.",

  icons: {
    icon: "/favicon.ico", // Point to the file in your /public folder
    apple: "/apple-touch-icon.png", // For iPhones
  },

  keywords: [
    "Mahmoud Elrashedy", 
    "محمود الرشيدي", 
    "Full Stack Developer Egypt", 
    "مطور برمجيات", 
    "Software Engineer", 
    "AI and Automation", 
    "الذكاء الاصطناعي",
    "Front end Developer", 
    "Back end Developer"
  ],

  // 1. Alternates: This tells Google you have versions for both languages
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-EG": "/ar",
    },
  },

  authors: [{ name: "Mahmoud Elrashedy" }],
  creator: "Mahmoud Elrashedy",

  openGraph: {
    type: "website",
    locale: "en_US",
    // 2. Alternate Locale: Helps Facebook/WhatsApp recognize the Arabic version
    alternateLocale: ["ar_EG"],
    url: "https://mahmoudelrashedy.vercel.app",
    siteName: "Mahmoud Elrashedy",
    title: "Mahmoud Elrashedy | محمود الرشيدي",
    description: "Expert software engineering, AI automation, and high-end UI/UX design.",
    images: [
      {
        url: "/favicon.ico", // Point to the file in your /public folder
        width: 1200,
        height: 630,
        alt: "Mahmoud Elrashedy - Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Mahmoud Elrashedy | Full Stack Developer",
    description: "Full Stack Developer & AI Automation Specialist specialized in Next.js and Python.",
    images: ["/favicon.ico"], // Point to the file in your /public folder
  },

  verification: {
    google: "Oyrj7AOutyW6fAmUPZaTXlMlxRvkAWqHgZzzZ7Q8_dg",
  },
};

import Providers from "./providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
