'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCreateBlockNote } from "@blocknote/react"; // Use this instead
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useLocale } from "@/app/context"
import {
  Heart,
  Eye,
  Trash2,
  Edit,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import BlogEditor from '@/components/dashboard/BlogEditor';

interface BlogPost {
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

interface Comment {
  blogId: number;
  user: {
    _id: string;
    name: string;
    image: string;
  }
  text: string;
  createdAt: string | Date;
  _id: string;
}

interface RendererProps {
  content: string; // This is the JSON string from your DB
  isRTL: boolean;
}

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isediting, setIsEditing] = useState(false);
  const [submitChanges, setSubmitChanges] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const viewedRef = useRef(false);
  const blogId = params.id as string;

  const { isRTL } = useLocale();

  // The 't' constant
  const t = isRTL ? {
    views: "مشاهدة",
    likes: "إعجاب",
    deleteConfirm: "هل أنت متأكد من حذف هذا المقال؟",
    comments: "التعليقات",
    writeComment: "اكتب تعليقاً...",
    submit: "نشر",
    submitting: "جاري النشر...",
    signInToComment: "سجل الدخول لتتمكن من التعليق",
    delete: "حذف",
    loading: "جاري التحميل...",
    notFound: "المقال غير موجود",
    save: "حفظ",
    cancel: "إلغاء",
  } : {
    views: "views",
    likes: "likes",
    deleteConfirm: "Are you sure you want to delete this blog?",
    comments: "Comments",
    writeComment: "Write a comment...",
    submit: "Submit",
    submitting: "Submitting...",
    signInToComment: "Sign in to leave a comment",
    delete: "Delete",
    loading: "Loading...",
    notFound: "Blog not found",
    save: "Save",
    cancel: "Cancel",
  };


  function BlogRenderer({ content, isRTL }: RendererProps) {
    const { resolvedTheme } = useTheme();

    // 1. Parse the JSON back into blocks
    const initialContent = content ? JSON.parse(content) : undefined;

    // 2. Initialize the editor in read-only mode
    const editor = useCreateBlockNote({
      initialContent,
      editable: false, // This is the key!
    });

    return (
      <div className="bn-rtl" dir="rtl">
        <BlockNoteView 
          editor={editor} 
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          editable={false}
        />
      </div>
    );
  }

  // Fetch blog and comments
  useEffect(() => {
    async function fetchData() {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          fetch(`/api/blogs/${blogId}`),
          fetch(`/api/comments?blogId=${blogId}`),
        ]);

        if (blogRes.ok) {
          const blogData = await blogRes.json();
          setBlog(blogData);
        }

        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [blogId]);

  // Increment view count (only once)
  useEffect(() => {
    if (!viewedRef.current && blog) {
      viewedRef.current = true;
      fetch(`/api/blogs/${blogId}/view`, { method: 'POST' }).catch((error) =>
        console.error('Failed to increment views:', error)
      );
    }
  }, [blog, blogId]);

  const handleLike = async () => {
    if (!session?.user) return;

    setLikeLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        if (blog) {
          setBlog({
            ...blog,
            likes: isLiked ? blog.likes.filter((id) => id !== session.user.id) : [...blog.likes, session.user.id],
          });
        }
      }
    } catch (error) {
      console.error('Failed to like:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/blogs');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(blog?.title || "");
    setEditContent(blog?.description || "");
  }

 const handleSaveChanges = async () => {
    // 1. Prevent empty titles or descriptions if necessary
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setSubmitChanges(true); // Start a loading state for the button

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editContent, // This is the JSON string from BlockNote
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update blog");
      }

      // 2. Get the updated blog from the server
      const updatedBlog = await response.json();

      // 3. Update the local 'blog' state so the UI reflects changes immediately
      setBlog(updatedBlog);

      // 4. Exit editing mode
      setIsEditing(false);
      setSubmitChanges(false); // End loading state
      
      // Optional: Add a success toast here if you use a library like sonner or react-hot-toast
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };
  
  const handleAddComment = async () => {
    if (!session?.user || !commentText.trim()) return;

    setSubmitLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId: parseInt(blogId),
          text: commentText,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId: parseInt(blogId),
          commentId,
        }),
      });

      if (response.ok) {
        setComments(comments.filter((c) => c._id !== commentId));
        setOpenMenuId(null);
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <div className="container text-center mx-auto px-4">
          <div>{t.loading}</div>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4">
          <div>{t.notFound}</div>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const isAdmin = session?.user?.role === 'admin';
  const canDeleteComment = (comment: Comment) =>
    comment.user._id === session?.user?.id || isAdmin;

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <article className="container mx-auto px-4 max-w-5xl mb-24">
        {/* Header with Admin Controls */}
        <div dir='ltr' className="flex flex-col sm:flex-row justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={blog.author.image}
                    alt={blog.author.name}
                    fill
                    sizes='100%'
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{blog.author.name}</p>
                  <p className="text-left text-sm text-muted-foreground">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground text-sm border-l border-border pl-4">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{blog.views.length} {t.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={16} />
                  <span>{blog.likes.length} {t.likes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex gap-2 mt-5 sm:mt-0">
              <button
                onClick={handleEdit}
                className="cursor-pointer p-2 rounded-lg bg-card border border-border hover:border-primary transition-colors"
              >
                <Edit size={18} className="text-foreground" />
              </button>
              <button
                onClick={handleDeleteBlog}
                className="cursor-pointer p-2 rounded-lg bg-card border border-border hover:border-destructive transition-colors"
              >
                <Trash2 size={18} className="text-destructive" />
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-b border-border mb-8" />

        {isediting ? (
          <>
            <div className="mb-8">
              <Input
                type="text"
                value={editTitle} // Use the editTitle state, not blog.title
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-lg font-semibold"
              />
            </div>

            {/* Reuse your BlogEditor here */}
            <div className="mb-12 border rounded-xl p-2 bg-card">
              <BlogEditor 
                initialContent={blog.description} 
                onChange={(json) => setEditContent(json)} 
              />
            </div>

            <div className="flex gap-4 justify-end mb-12">
              <Button disabled={submitChanges} variant="default" onClick={handleSaveChanges}>
                {t.save}
              </Button>
              <Button disabled={submitChanges} variant="secondary" onClick={() => setIsEditing(false)}>
                {t.cancel}
              </Button>
            </div>
          </>
        ) : (
          <div className="view-only-blocks mx-auto mb-12">
            <BlogRenderer content={blog.description} isRTL={isRTL} />
          </div>
        )}

        {/* Divider */}
        <div className="border-b border-border my-12" />

        {/* Likes Section */}
        <div className="mb-12">
          <button
            onClick={handleLike}
            disabled={!session?.user || likeLoading}
            className={`mx-auto cursor-pointer flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isLiked
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'bg-card border border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="ml-2 text-sm">{blog.likes.length}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-b border-border mb-12" />

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {t.comments} ({comments.length})
          </h2>

          {/* Add Comment */}
          {session?.user ? (
            <div className='mb-8 flex flex-wrap justify-end'>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={t.writeComment}
                className="w-full p-4 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                rows={4}
              />
              <button
                onClick={handleAddComment}
                disabled={submitLoading || !commentText.trim()}
                className="cursor-pointer mt-3 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"              
              >
                {submitLoading ? t.submitting : t.submit}
              </button>
            </div>
          ) : (
            <p className="text-muted-foreground mb-8">
              {t.signInToComment}
            </p>
          )}

          {/* Comments List */}
          <div className="space-y-6" dir='ltr'>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 rounded-lg bg-card border border-border"
              >
                <div className="flex gap-4 mb-3">
                  <div className="flex-1 flex-col flex items-start gap-3">
                    <div className='flex gap-3 items-center'>
                      <div className="relative w-8 h-8 shrink-0">
                        <Image
                          src={comment.user.image}
                          alt={comment.user.name}
                          fill
                          sizes='100%'
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {comment.user.name}
                        </p>
                      </div>
                    </div>
                    <p className="px-2 text-foreground mt-2">{comment.text}</p>
                  </div>

                  {/* Delete Menu */}
                  {canDeleteComment(comment) && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === comment._id
                              ? null
                              : comment._id
                          )
                        }
                        className="cursor-pointer p-1 hover:bg-muted rounded-lg transition-colors"
                      >
                        <MoreHorizontal size={18} className="text-muted-foreground" />
                      </button>

                      {openMenuId === comment._id && (
                        <div className=" absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-10">
                          <button
                            onClick={() =>
                              handleDeleteComment(comment._id)
                            }
                            className="cursor-pointer w-full text-left px-4 py-2 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors rounded-lg"
                          >
                            {t.delete}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-right">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
