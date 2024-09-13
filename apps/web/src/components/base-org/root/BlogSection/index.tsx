'use client';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import Link from 'next/link';
import blogPosts from 'apps/web/scripts/blog_posts.json';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

const interval = 5_000;
const blogPostMaxCount = 6;

export default function BlogSection() {
  const limitedBlogPosts = useMemo(() => blogPosts.slice(0, blogPostMaxCount), []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    if (!isTransitioningRef.current) {
      isTransitioningRef.current = true;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedBlogPosts.length);
      setProgress(0);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 50);
    }
  }, [limitedBlogPosts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const elapsed = timestamp - lastTimestampRef.current;

      if (!isPaused && !isTransitioningRef.current) {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (elapsed / interval) * 100;
          if (newProgress >= 100) {
            nextSlide();
            return 0;
          }
          return newProgress;
        });
      }

      lastTimestampRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const onClickBlogLine = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.dataset.index ?? '0', 10);
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  const wrapperClasses = useMemo(() => classNames('relative overflow-hidden rounded-xl'), []);
  const svgNoiseBackgroundUrl = useMemo(
    () =>
      `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    [],
  );

  const renderBlogPost = useCallback(
    (post: (typeof limitedBlogPosts)[0]) => (
      <div key={post.title} className="relative h-auto w-full flex-shrink-0">
        <figure className="h-full min-h-[20rem] w-full md:min-h-[40rem]">
          <ImageAdaptive
            src={post.publicImagePath}
            alt={post.title}
            className="object-cover"
            fill
          />
        </figure>
      </div>
    ),
    [],
  );

  const renderProgressButton = useCallback(
    (post: (typeof limitedBlogPosts)[0], index: number) => (
      <button
        key={post.url}
        aria-label={`View next blog post: ${post.title}`}
        data-index={index}
        type="button"
        className="transition-background h-2 w-1/6 overflow-hidden rounded-full bg-black/20 backdrop-blur-[0.5rem] hover:h-4"
        onClick={onClickBlogLine}
      >
        <div
          className="h-full bg-[#E3E7E9]"
          style={{
            width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
          }}
        />
      </button>
    ),
    [currentIndex, progress, onClickBlogLine],
  );

  return (
    <section ref={sectionRef}>
      <div
        className="relative mx-auto w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={wrapperClasses}>
          {/* Top blur/gradient for title visibility */}
          <div
            className="absolute left-0 right-0 top-0 z-10 h-[10rem] bg-black/30 backdrop-blur-[3rem]"
            style={{
              maskImage: 'linear-gradient(to bottom, black, transparent)',
              backgroundImage: `${svgNoiseBackgroundUrl}, linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))`,
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            }}
          />
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {limitedBlogPosts.map(renderBlogPost)}
          </div>
          {/* Bottom blur/gradient for progress lines visibility */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 h-[10rem] bg-black/30 backdrop-blur-[3rem]"
            style={{
              maskImage: 'linear-gradient(to top, black, transparent)',
              backgroundImage: `${svgNoiseBackgroundUrl}, linear-gradient(to top, transparent, rgba(0,0,0,0.5))`,
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
            }}
          />
        </div>

        <div className="absolute left-0 top-0 z-20 flex min-h-[17rem] w-full flex-col justify-between gap-4 px-4 pt-4 md:min-h-0 md:flex-row md:px-8 md:pt-6">
          <Title
            level={TitleLevel.Title2}
            className="flex w-full items-center gap-4 text-white drop-shadow-md"
          >
            <span className="hidden md:inline-block">
              <Icon name="blueCircle" color="currentColor" height="1rem" width="1rem" />
            </span>
            {limitedBlogPosts[currentIndex].title}
          </Title>
          <div className="ml-auto flex items-center gap-4">
            <Link href={limitedBlogPosts[currentIndex].url} target="_blank">
              <Button variant={ButtonVariants.Secondary}>Read</Button>
            </Link>
            <Link href="https://base.mirror.xyz/" target="_blank">
              <Button variant={ButtonVariants.Outlined}>Subscribe</Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 z-20 mx-auto flex w-full -translate-x-1/2 items-end justify-center space-x-4 p-4 md:max-w-[66%]">
          {limitedBlogPosts.map(renderProgressButton)}
        </div>
      </div>
    </section>
  );
}
