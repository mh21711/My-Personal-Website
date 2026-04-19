import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Eye, Heart, MessageCircle } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  blog: BlogCard;
}

interface BlogCard {
  blogNumber: number;
  title: string;
  description: string; // Note: This contains the BlockNote JSON string
  author: {
    _id: string;
    name: string;
    image: string;
  };
  createdAt: string | Date; 
  likes: string[]; // Array of User IDs
  views: string[]; // Array of User IDs
}

function BlogCard({ blog }: BlogCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement>(null);

  // ... inside your component
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  useEffect(() => {
    async function countComments(blogId: number) {
      const commentsResponse = await fetch(`/api/comments?blogId=${blogId}`);
      if (commentsResponse.ok) {
        const comments = await commentsResponse.json();
        setCommentCount(comments.length);
      }  
    }

    countComments(blog.blogNumber);
  }, [blog]);

  const handleNavigation = (e: React.MouseEvent) => {
    // 1. Prevent the default <Link> behavior if you're still using one
    // or just change the outer tag to a <div>
    if (!session) {
      e.preventDefault();
      signIn('google', { callbackUrl: `/blogs/${blog.blogNumber}` });
    } else {
      // 2. Navigate directly without waiting for a state update
      router.push(`/blogs/${blog.blogNumber}`);
    }
  };


  return (
    <div
      ref={ref}
      className={`opacity-0 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : ''
      }`}
      onClick={handleNavigation}
    >
      <div className="h-full rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer overflow-hidden hover:shadow-lg">
        {/* Card Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Title */}
          <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
            {blog.title}
          </h2>

          {/* Author and Date */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="relative w-8 h-8">
              <Image
                src={blog.author.image}
                alt={blog.author.name}
                fill
                
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {blog.author.name}
              </p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4" dir="ltr">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Eye size={16} />
              <span>{blog.views.length}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Heart size={16} />
              <span>{blog.likes.length}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MessageCircle size={16} />
              {commentCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;