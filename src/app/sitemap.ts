import { MetadataRoute } from 'next';
import { books } from '@/app/books/data'; // Your static books data

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // 1. Static Books from data.ts
  const bookEntries: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/books/${book.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 2. Dynamic Blogs from MongoDB
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    // Fetching your blogs from your API
    const response = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
    const blogs = await response.json();
    
    blogEntries = blogs.map((blog: any) => ({
      // Using .blogNumber as requested instead of ._id
      url: `${baseUrl}/blog/${blog.blogNumber}`, 
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // 3. Main Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/social`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...bookEntries, ...blogEntries];
}