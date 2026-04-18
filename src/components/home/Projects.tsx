'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

interface ProjectsProps {
  isRTL: boolean;
}

export function Projects({ isRTL }: ProjectsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const t = isRTL ? ar.landingpage.projects : en.landingpage.projects;

  const PROJECTS = [
    {
      type: 'project',
      name: t.Projectone,
      description: t.ProjectoneDesc,
      techStack: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Next-Auth'],
    },
    {
      type: 'project',
      name: t.Projecttwo,
      description: t.ProjecttwoDesc,
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
      link: 'https://lama-dev-ten.vercel.app/',
    },
    {
      type: 'certification',
      name: t.certificateone,
      issuer: t.certificateoneIssuer,
      link: "https://www.freecodecamp.org/certification/fcc68d621e2-5ebb-4b33-a933-1a1311f63d2e/front-end-development-libraries",
      date: '2024',
    },
    {
      type: 'certification',
      name: t.certificatetwo,
      issuer: t.certificatetwoIssuer,
      link: "https://certificates.cs50.io/9d107435-4a2d-44a1-8f92-255950cdf1c6.pdf?size=letter",
      date: '2024',
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

  const scrollBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn(
        'py-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-12 text-center">
          {t.title}
        </h2>

        <div className="mb-12">
          <button
            onClick={() => setShowExperience(!showExperience)}
            className="cursor-pointer flex items-center gap-2 text-xl font-heading font-bold text-foreground mb-2 hover:opacity-80 transition-opacity"
          >
            {t.experience}:
            <span className={cn(
              'transform transition-transform duration-300',
              showExperience ? 'rotate-180' : ''
            )}>
              ▼
            </span>
          </button>
          {showExperience && (
            <p className="text-sm text-muted-foreground max-w-2xl">
              {t.experienceDesc}
            </p>
          )}
        </div>

        {/* Grid of 4 boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {PROJECTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md flex flex-col"
            >
              {item.type === 'project' ? (
                <>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 grow">
                    {item.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {item.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {item.name === t.Projecttwo ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors w-fit"
                    >
                      {t.liveview} <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button onClick={scrollBack} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors w-fit">
                      {t.liveview} <ExternalLink size={16} />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 grow">
                    {item.date}
                  </p>

                  {/* View Button */}
                  <button className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-card transition-colors w-fit">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {t.view} <ExternalLink size={16} />
                    </a>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* External Links Buttons */}
        <div className={cn(
          'flex gap-4 justify-center flex-wrap',
          isRTL && 'flex-row-reverse'
        )}>
          <a
            href="https://github.com/mh21711"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t.github}
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoudelrashedy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-card transition-colors"
          >
            {t.linkedin}
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoudelrashedy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t.mostaql}
          </a>
        </div>
      </div>
    </section>
  );
}
