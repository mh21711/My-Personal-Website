'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2, Zap, Brain, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

interface ServicesProps {
  isRTL: boolean;
}

export function Services({ isRTL }: ServicesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const t = isRTL ? ar.landingpage.services : en.landingpage.services;

  const SERVICES = [
    {
      icon: Code2,
      title: t.webDevelopment,
      description: t.webDevelopmentDesc,
    },
    {
      icon: Zap,
      title: t.fullStack,
      description: t.fullStackDesc,
    },
    {
      icon: Brain,
      title: t.aiIntegration,
      description: t.aiIntegrationDesc,
    },
    {
      icon: Cog,
      title: t.automation,
      description: t.automationDesc,
    },
  ];

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8 bg-card/50 transition-opacity duration-3000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-12 text-center">
          {t.title}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className={cn(
                  'cursor-pointer p-6 bg-background rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md',
                  isRTL && 'text-right'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4',
                  isRTL && 'ml-0'
                )}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
