'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import Image from 'next/image';

interface SkillsProps {
  isRTL: boolean;
}

const SKILLS = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
  { name: "n8n", icon: "https://avatars.githubusercontent.com/u/45487711?s=200&v=4" },
]

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

function ProgressRing({ percentage, size = 120, strokeWidth = 4 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="transform -rotate-90"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-border"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-primary transition-all duration-1500"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Skills({ isRTL }: SkillsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const t = isRTL ? ar.landingpage.skills : en.landingpage.skills; 

  const SKILL_CATEGORIES = [
    { name: t.frontend, percentage: 85 },
    { name: t.backend, percentage: 65 },
    { name: t.fullstack, percentage: 75 },
    { name: t.ai, percentage: 50 },
  ];

  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate percentages
          const intervals = SKILL_CATEGORIES.map((skill, idx) => {
            let current = 0;
            return setInterval(() => {
              if (current < skill.percentage) {
                current += Math.ceil(skill.percentage / 30);
                setAnimatedPercentages(prev => {
                  const updated = [...prev];
                  updated[idx] = Math.min(current, skill.percentage);
                  return updated;
                });
              }
            }, 30);
          });

          return () => intervals.forEach(clearInterval);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startX.current = e.pageX - scrollRef.current!.offsetLeft
    scrollLeft.current = scrollRef.current!.scrollLeft
  }

  const onMouseLeave = () => { isDown.current = false }
  const onMouseUp = () => { isDown.current = false }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current!.offsetLeft
    const walk = (x - startX.current)
    scrollRef.current!.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-3000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-12 text-center">
          {t.title}
        </h2>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {SKILL_CATEGORIES.map((skill, idx) => (
            <div
              key={skill.name}
              className="flex flex-col items-center justify-center space-y-4 p-6 bg-card rounded-lg border border-border hover:border-primary/20 transition-colors"
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                <ProgressRing percentage={animatedPercentages[idx]} size={120} />
                <div className="absolute text-center">
                  <span className="text-2xl font-bold text-primary">
                    {animatedPercentages[idx]}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground text-center">
                {skill.name}
              </p>
            </div>
          ))}
        </div>

        {/* Scrolling Skills Strip */}
        <div 
          className={cn(
            'cursor-grab relative bg-card/50 rounded-lg border border-border py-8',
            isRTL && 'direction-rtl'
          )} 
        >
          {/* Scrolling container */}
          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove} 
            className="scroll-smooth-touch flex overflow-x-auto gap-4 px-12 scrollbar-h"
          >
            {[...SKILLS].map((skill, idx) => (
              <div
                key={`${skill}-${idx}`}
                className="shrink-0 w-32 sm:w-40 flex flex-col items-center justify-center p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors cursor-grab active:cursor-grabbing"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <Image width={20} height={20} src={skill.icon} alt={skill.name} className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
