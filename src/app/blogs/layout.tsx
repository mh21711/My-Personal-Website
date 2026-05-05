import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blog & Writings",
  description: "The personal blog of Mahmoud Elrashedy. Thoughts on life, science, and technology.",
  
  icons: {
    icon: "/favicon.ico", // Point to the file in your /public folder
    apple: "/apple-touch-icon.png", // For iPhones
  },
  
  keywords: [
    "Mahmoud Elrashedy blog", 
    "مدونات محمود الرشيدي", 
    "Mahmoud Elrashedy articles", 
    "مقالات محمود الرشيدي"
  ],
  openGraph: {
    title: "Mahmoud Elrashedy Blog | مدونة محمود الرشيدي",
    description: "Insights and writings by Mahmoud Elrashedy.",
    type: "website",
    images: ["/favicon.ico"],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
        {/* Main Content Area */}
        <section>
            {children}
        </section>
    </div>
  );
}