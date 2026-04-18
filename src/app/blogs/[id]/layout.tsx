import { Metadata } from "next";

const getBlog = async (id: string) => {
    // Get the base URL (defaults to localhost if not set in .env)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    const [blogRes] = await Promise.all([
        fetch(`${baseUrl}/api/blogs/${id}`),
    ]);

    if (blogRes.ok) {
        const blogData = await blogRes.json();
        return blogData;
    }
    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // 1. Fetch the blog from your database
  const blog = await getBlog((await params).id); 

  if (!blog) {
    return { 
      title: "Blog Not Found",
      description: "The requested blog post could not be found." 
    };
  }

  return {
    title: blog.title, 
    // Since description is JSON, we use a clean fallback text or a custom 'excerpt' field if you have one
    description: `Read "${blog.title}" by Mahmoud Elrashedy (محمود الرشيدي).`, 
    
    openGraph: {
      title: `${blog.title} | Mahmoud Elrashedy`,
      description: "A new post on Mahmoud Elrashedy's personal blog.",
      type: "article",
      publishedTime: blog.createdAt,
      authors: ["Mahmoud Elrashedy"],
      images: ["https://res.cloudinary.com/dasl9qdnu/image/upload/v1775479618/Channel_Avatar_suag7u.png"],
    },
    
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: "Read the latest post from Mahmoud Elrashedy.",
      images: ["https://res.cloudinary.com/dasl9qdnu/image/upload/v1775479618/Channel_Avatar_suag7u.png"], // Adds the image to Twitter/X previews
    },
  };
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        {children}
    </section>
  );
}