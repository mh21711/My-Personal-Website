import type { Metadata } from "next";

export const metadata: Metadata = {
  // Use "Books & Summaries" as the short title for Google sub-links
  title: "Books & Summaries", 
  description: "Summarized books and reviews by Mahmoud Elrashedy (كتب محمود الرشيدي). Deep insights into personal growth, literature, and science.",
  keywords: [
    "Mahmoud Elrashedy books", 
    "كتب محمود الرشيدي", 
    "summarized books", 
    "تلخيص كتب محمود الرشيدي",
    "reading recommendations",
  ],
  openGraph: {
    title: "Mahmoud Elrashedy - Book Summaries | كتب محمود الرشيدي",
    description: "Reading recommendations and summarized insights by Mahmoud Elrashedy.",
    type: "website",
    images: ["https://res.cloudinary.com/dasl9qdnu/image/upload/v1775479618/Channel_Avatar_suag7u.png"],
  },
};

export default function BooksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}