'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

interface ContactFormProps {
  isRTL: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function ContactForm({ isRTL }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const t = isRTL ? ar.landingpage.contact : en.landingpage.contact;



  // Intersection Observer for fade-in
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setFormState({
        status: 'error',
        message: t.nameerror,
      });
      return;
    }

    if (!formData.email.trim()) {
      setFormState({
        status: 'error',
        message: t.emailerr,
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormState({
        status: 'error',
        message: t.emailerror,
      });
      return;
    }

    if (!formData.message.trim()) {
      setFormState({
        status: 'error',
        message: t.messageerror,
      });
      return;
    }

    setFormState({
      status: 'loading',
      message: '',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState({
        status: 'success',
        message: '',
      });
      setShowModal(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Auto-hide modal after 5 seconds
      setTimeout(() => {
        setShowModal(false);
        setFormState({
          status: 'idle',
          message: '',
        });
      }, 5000);
    } catch (error) {
      setFormState({
        status: 'error',
        message: t.error,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8 bg-card/50 transition-opacity duration-1000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-12 text-center">
          {t.title}
        </h2>
        
        <p className="text-center text-amber-700 mb-8">"{t.description}"</p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className={cn(
            'space-y-6 p-8 bg-background rounded-lg border border-border',
            isRTL && 'text-right'
          )}
        >
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t.namePlaceholder}
              className={cn(
                'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                isRTL && 'text-right'
              )}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t.emailPlaceholder}
              className={cn(
                'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                isRTL && 'text-right'
              )}
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              {t.message}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t.messagePlaceholder}
              rows={6}
              className={cn(
                'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none',
                isRTL && 'text-right'
              )}
            />
          </div>

          {/* Error Message */}
          {formState.status === 'error' && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive">{formState.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.status === 'loading'}
            className="cursor-pointer w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {formState.status === 'loading' ? t.loading : t.sendButton}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className={cn(
            'bg-card rounded-lg border border-border p-8 max-w-sm shadow-lg',
            isRTL && 'text-right'
          )}>
            <div className={cn(
              'w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4',
              isRTL && 'mx-auto'
            )}>
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              {t.messagesent}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.messagesentdesc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
