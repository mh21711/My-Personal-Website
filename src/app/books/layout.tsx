import type { Metadata } from "next";

export const metadata: Metadata = {
  // Use "Books & Summaries" as the short title for Google sub-links
  title: "Books & Summaries", 
  description: "Summarized books and reviews by Mahmoud Elrashedy محمود. Deep insights into personal growth, literature, and science.",

  keywords: [
    "Mahmoud Elrashedy books", 
    "كتب محمود الرشيدي", 
    "summarized books", 
    "تلخيص كتب محمود الرشيدي",
    "reading recommendations",
  ],
  
  openGraph: {
    title: "Mahmoud Elrashedy - Book Summaries |  محمود الرشيدي - ملخصات الكتب",
    description: "Reading recommendations and summarized insights by Mahmoud Elrashedy.",
    type: "website",
    images: ["/favicon.ico"], // Point to the file in your /public folder
  },
};

export default function BooksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}