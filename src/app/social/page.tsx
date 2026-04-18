'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useLocale } from "@/app/context";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

const YouTubeIcon = ({ className }: { className: string }) => (
  <Image className={className} src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1775128758/pngegg_jtfzec.png" alt='YouTube' width={64} height={64} />
);

const TikTokIcon = ({ className }: { className: string }) => (
  <Image className={className} src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1775129280/sllmnhx-tiktok-6338432_1280_wnopl1.png" alt='TikTok' width={64} height={64} />
);

const InstagramIcon = ({ className }: { className: string }) => (
  <Image className={className} src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1775128760/pngegg_1_olxzfw.png" alt='Instagram' width={64} height={64} />
);

function SocialCard({
  platform,
  count,
  countLabel,
  accentClass,
}: {
  platform: string;
  count: string;
  countLabel: string;
  accentClass: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useLocale();

  const t = isRTL ? ar.socialmedia : en.socialmedia;

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="p-8 rounded-xl bg-card border border-border hover:shadow-lg hover:-translate-y-3 transition-all duration-3000">
        <div className={`w-16 h-16 rounded-full ${accentClass} flex items-center justify-center mb-4`}>
          {platform === t.youtube && <YouTubeIcon className="w-8 h-8" />}
          {platform === t.tiktok && <TikTokIcon className="w-8 h-8" />}
          {platform === t.instagram && <InstagramIcon className="w-8 h-8" />}
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          {platform}
        </h3>
        <p className="text-2xl font-bold text-primary mb-1">{count}</p>
        <p className="text-sm text-muted-foreground">{countLabel}</p>
      </div>
    </div>
  );
}

export default function SocialMediaPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useLocale();

  const t = isRTL ? ar.socialmedia : en.socialmedia;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Social media platform constants
  const PLATFORMS = {
    YOUTUBE: {
      name: t.youtube,
      url: 'https://youtube.com/@ELRashedy_7',
      color: 'bg-red-600 hover:bg-red-700',
      subscriberCount: '000',
      accentColor: 'bg-red-600',
    },
    TIKTOK: {
      name: t.tiktok,
      url: 'https://tiktok.com/@elrashedy_7',
      color: 'bg-black hover:bg-gray-900',
      followerCount: '000',
      accentColor: 'bg-black',
    },
    INSTAGRAM: {
      name: t.instagram,
      url: 'https://instagram.com/elrashedy_7',
      color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600',
      followerCount: '000',
      accentColor: 'bg-gradient-to-r from-pink-500 to-purple-500',
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`pt-20 pb-20 transition-opacity duration-1000 ${
          isHeroVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{minHeight: "calc(100vh - 113px)"}}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Profile Photo */}
            <div className="mb-8 relative">
              <div className="w-60 h-60 rounded-full">
                <Image
                  src="https://res.cloudinary.com/dasl9qdnu/image/upload/v1775479618/Channel_Avatar_suag7u.png"
                  alt="Profile"
                  width={160}
                  height={160}
                  className="w-fit h-fit rounded-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 text-balance">
              {t.heading}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl">
              {t.description}
            </p>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={PLATFORMS.YOUTUBE.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PLATFORMS.YOUTUBE.color} text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200`}
              >
                <YouTubeIcon className="w-8 h-8" />
                {t.youtube}
              </a>
              <a
                href={PLATFORMS.TIKTOK.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PLATFORMS.TIKTOK.color} text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200`}
              >
                <TikTokIcon className="w-8 h-8" />
                {t.tiktok}
              </a>
              <a
                href={PLATFORMS.INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PLATFORMS.INSTAGRAM.color} text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200`}
              >
                <InstagramIcon className="w-8 h-8" />
                {t.instagram}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Cards Section */}
      <section className="py-20 bg-card/30 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 text-foreground">
            {t.findme}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <SocialCard
              platform={t.youtube}
              count={PLATFORMS.YOUTUBE.subscriberCount}
              countLabel={t.subscriberCount}
              accentClass="bg-red-600"
            />
            <SocialCard
              platform={t.tiktok}
              count={PLATFORMS.TIKTOK.followerCount}
              countLabel={t.followerCount}
              accentClass="bg-black"
            />
            <SocialCard
              platform={t.instagram}
              count={PLATFORMS.INSTAGRAM.followerCount}
              countLabel={t.followerCount}
              accentClass="bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

