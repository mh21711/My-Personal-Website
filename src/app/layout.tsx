import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  // Replace with your actual domain once you buy it from EgyHosting
  metadataBase: new URL("https://your-domain.com"), 
  
  title: {
    template: "%s | Mahmoud Elrashedy",
    default: "Mahmoud Elrashedy",
  },
  
  description: "Mahmoud Elrashedy (محمود الرشيدي) - Professional Full Stack Developer, UI/UX Designer, and AI Automation Engineer. Specialized in Next.js, Python, and scalable software solutions for global and Middle Eastern markets.",
  
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
    url: "https://your-domain.com",
    siteName: "Mahmoud Elrashedy",
    title: "Mahmoud Elrashedy | محمود الرشيدي",
    description: "Expert software engineering, AI automation, and high-end UI/UX design. هندسة البرمجيات وأتمتة الذكاء الاصطناعي",
    images: [
      {
        url: "https://res.cloudinary.com/dasl9qdnu/image/upload/v1774020802/My_Picture_aljolv.png",
        width: 1200,
        height: 630,
        alt: "Mahmoud Elrashedy - Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Elrashedy | Full Stack Developer",
    description: "Full Stack Developer & AI Automation Specialist specialized in Next.js and Python.",
    images: ["https://res.cloudinary.com/dasl9qdnu/image/upload/v1774020802/My_Picture_aljolv.png"],
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
