"use client"

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useLocale } from "@/app/context";

interface Email {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function Page() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isRTL } = useLocale();


  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/emails');
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        setEmails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleMarkAsRead = async (emailId: string) => {
    try {
      const response = await fetch('/api/emails', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark email as read');
      }

      // Update local state
      setEmails(emails.map(email =>
        email._id === emailId ? { ...email, read: true } : email
      ));
    } catch (err) {
      console.error('Error marking email as read:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Loading emails...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">{isRTL ? 'البريد الإلكتروني' : 'Emails'}</h1>

        {emails.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">{isRTL ? 'لا توجد رسائل إلكترونية' : 'No emails yet'}</p>
        ) : (
          <div className="grid gap-6">
            {emails.map((email) => (
              <div
                key={email._id}
                onClick={() => handleMarkAsRead(email._id)}
                className={cn(
                  'p-6 rounded-lg border cursor-pointer transition-all duration-200',
                  email.read
                    ? 'bg-card border-border hover:border-primary/50'
                    : 'bg-card border-primary/50 hover:border-primary ring-1 ring-primary/20'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{email.name}</h3>
                    <p className="text-sm text-muted-foreground">{email.email}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={cn(
                      'text-xs font-medium px-2.5 py-1 rounded-full',
                      email.read
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary/10 text-primary'
                    )}>
                      {isRTL ? (email.read ? 'مقروء' : 'غير مقروء') : (email.read ? 'Read' : 'Unread')}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(email.createdAt)}
                    </p>
                  </div>
                </div>

                <p className="text-foreground/80 leading-relaxed wrap-break-word">
                  {email.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}