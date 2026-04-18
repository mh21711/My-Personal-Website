'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

interface HeroProps {
  isRTL: boolean;
}

export function Hero({ isRTL }: HeroProps) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const t = isRTL ? ar.landingpage.hero : en.landingpage.hero; 

  const TYPING_TEXTS = [
    t.typeing.one,
    t.typeing.two,
    t.typeing.three,
    t.typeing.four
  ];

  // Typing effect
  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, 50);
      } else {
        setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, textIndex]);

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

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactMe = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={cn(
        'h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-opacity duration-3000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <div className="max-w-6xl w-full" style={{marginTop: "-100px"}}>
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
            isRTL && 'flex-row-reverse'
          )}
        >
          {/* Left Side - Text */}
          <div className={cn('space-y-6', isRTL && 'text-right')}>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {t.hello}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                {t.iam}{' '}
                <span className="text-primary">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              {t.description}
            </p>

            <div
              className="flex gap-4 flex-row"
            >
              <button
                onClick={handleViewProjects}
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                {t.ViewProjectsButton}
              </button>
              <button
                onClick={handleContactMe}
                className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-card transition-colors cursor-pointer"
              >
                {t.contactButton}
              </button>
            </div>
          </div>

          {/* Right Side - Profile Photo */}
          <div className={cn('flex justify-center', isRTL && 'lg:justify-start')}>
            <div className="relative w-64 h-64 sm:w-90 sm:h-90 lg:w-120 lg:h-120">
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary via-primary/50 to-transparent opacity-30 blur-xl" />

              {/* Profile image placeholder */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm flex items-center justify-center">
                <div className="w-full h-full bg-linear-to-br from-primary/10 to-background flex items-center justify-center text-muted-foreground">
                  <Image style={{ width: "90%" }} className='rounded-full' src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1774020802/My_Picture_aljolv.png" alt="Profile Photo" width={350} height={350} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
