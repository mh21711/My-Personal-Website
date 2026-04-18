'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import  { useLocale } from "@/app/context"

// Import the Editor dynamically to avoid SSR issues
const BlockNoteEditor = dynamic(() => import('@/components/dashboard/BlogEditor'), { 
  ssr: false,
  loading: () => (
    <div className="h-100 flex items-center justify-center bg-card border border-border rounded-lg">
      <Spinner className="h-6 w-6 mr-2" />
      <span>Loading Editor...</span>
    </div>
  )
});

export default function CreateBlogPage() {
  const { status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [contentJson, setContentJson] = useState(''); // Stores the editor data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { isRTL } = useLocale();

  // The 't' constant for conditional translations
  const t = isRTL ? {
    pageTitle: "إنشاء مقال جديد",
    titleLabel: "عنوان المقال",
    titlePlaceholder: "أدخل عنوان المقال هنا...",
    contentLabel: "المحتوى",
    editorLoading: "جاري تحميل المحرر...",
    tip: "نصيحة: اكتب '/' لإدراج الصور أو العناوين أو القوائم مباشرة.",
    cancel: "إلغاء",
    publish: "نشر المقال",
    publishing: "جاري النشر...",
    errTitle: "يرجى إدخال عنوان للمقال",
    errContent: "يرجى إضافة محتوى للمقال",
    errFail: "فشل في إنشاء المقال"
  } : {
    pageTitle: "Create New Post",
    titleLabel: "Blog Title",
    titlePlaceholder: "Enter your blog post title",
    contentLabel: "Content",
    editorLoading: "Loading Editor...",
    tip: "Tip: Type '/' to insert images, headers, or lists directly.",
    cancel: "Cancel",
    publish: "Publish Post",
    publishing: "Publishing...",
    errTitle: "Please enter a blog title",
    errContent: "Please add some content to your blog post",
    errFail: "Failed to create blog post"
  };

  const handlePublish = async () => {
    setError('');

    // 1. Validate Title
    if (!title.trim()) {
      setError(t.errTitle);
      return;
    }

    // 2. Validate Content
    // contentJson will be empty if the user hasn't typed anything
    if (!contentJson || contentJson === '[]') {
      setError(t.errContent);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: contentJson, 
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog post');
      }

      router.push('/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Title Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.titleLabel}
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              className="text-lg font-semibold"
            />
          </div>

          {/* Editor Container */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.contentLabel}
            </label>
            <div className="border border-border rounded-lg overflow-hidden bg-card min-h-100">
              {/* Pass the setContentJson function to the editor component */}
              <BlockNoteEditor onChange={(json) => setContentJson(json)} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t.tip}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="min-w-30"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="h-4 w-4 mr-2" />
                  {t.publishing}
                </>
              ) : (
                t.publish
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}