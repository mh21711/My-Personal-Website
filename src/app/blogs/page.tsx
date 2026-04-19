'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import { useLocale } from "@/app/context"
import BlogCard from '@/components/blogs/BlogCard';

type SortOption = 'latest' | 'views' | 'likes';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [loading, setLoading] = useState(true);
  const { isRTL } = useLocale();

  const t = isRTL ? ar.blogs : en.blogs;

  console.log(blogs)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        console.log('Fetched blogs:', data);
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'views') {
      return b.views.length - a.views.length;
    } else {
      return b.likes.length - a.likes.length;
    }
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">{t.loading}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="mb-15 min-h-screen bg-background lg:pt-12 lg:px-12 pt-6">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-balance text-4xl font-bold mb-12 text-foreground">
          {isRTL ? "مدوناتي" : "My Blogs"}
        </h1>

        {/* Sort Selector */}
        <div className="mb-12 flex gap-3">
        {/* Styled Select List */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {t.sort_label}
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none cursor-pointer bg-card border border-border text-foreground py-2 pl-4 pr-10 rounded-lg hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="latest">{t.sort_latest}</option>
                <option value="views">{t.sort_views}</option>
                <option value="likes">{t.sort_likes}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={16} />
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.map((blog) => (
            <BlogCard
              key={blog.blogNumber}
              blog={blog}
            />
          ))}
        </div>
      </div>
    </main>
  );
}


