'use client';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import Link from 'next/link';

// Do note change this JSON manually, just run yarn workspace @app/web fetch-mirror-blog
import blogPosts from 'apps/web/scripts/blog_posts.json';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

// 5 seconds per slides
const interval = 5_000;

// Only first 6 blog posts
const blogPostMaxCount = 6;
const limitedBlogPosts = blogPosts.slice(0, blogPostMaxCount);

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedBlogPosts.length);
    setProgress(0);
  };

  useEffect(() => {
    const startInterval = (): void => {
      intervalRef.current = window.setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            return 100;
          }
          return prevProgress + 1;
        });
      }, interval / 100); // 100 steps for smooth progress
    };

    if (!isPaused) {
      startInterval();
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    if (progress >= 100) {
      nextSlide();
    }
  }, [progress]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const onClickBlogLine = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    const index = parseInt(target.getAttribute('data-index') ?? '0');
    setCurrentIndex(index);
    setProgress(5);
  }, []);

  const wrapperClasses = classNames('relative overflow-hidden rounded-xl');
  const svgNoiseBackgroundUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <section>
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
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            }}
          >
            <div
              className="absolute inset-0 bg-black/30 mix-blend-multiply"
              style={{
                backgroundImage: svgNoiseBackgroundUrl,
              }}
            />
          </div>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {limitedBlogPosts.map((post) => (
              <div key={post.title} className="relative h-auto w-full flex-shrink-0">
                <Link target="_blank" href={post.url} className="inline-block h-full w-full">
                  <figure className="h-full min-h-[20rem] w-full md:min-h-[40rem]	">
                    <ImageAdaptive
                      src={post.publicImagePath}
                      alt={post.title}
                      className="object-cover"
                      fill
                    />
                  </figure>
                </Link>
              </div>
            ))}
          </div>
          {/* Bottom blur/gradient for progress lines visibility */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 h-[6rem] bg-black/30 backdrop-blur-[3rem]"
            style={{
              maskImage: 'linear-gradient(to top, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
            }}
          >
            <div
              className="absolute inset-0 bg-black/30 mix-blend-multiply"
              style={{
                backgroundImage: svgNoiseBackgroundUrl,
              }}
            />
          </div>
        </div>

        <div className="absolute left-0 top-0 z-20 flex w-full flex-col gap-4 px-8 pt-6 md:flex-row md:justify-between">
          <Title
            level={TitleLevel.Title2}
            className="flex w-full items-center gap-4 text-white drop-shadow-md"
          >
            <span className="hidden md:inline-block">
              <Icon name="blueCircle" color="currentColor" height="1rem" width="1rem" />
            </span>
            {blogPosts[currentIndex].title}
          </Title>
          <div className="flex items-center gap-4 ">
            <Link href={blogPosts[currentIndex].url} target="_blank">
              <Button variant={ButtonVariants.Secondary}>Read</Button>
            </Link>
            <Link href="https://base.mirror.xyz/" target="_blank">
              <Button variant={ButtonVariants.Outlined}>Subscribe</Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 z-20 mx-auto flex w-full -translate-x-1/2 items-end justify-center space-x-4 p-4 md:max-w-[66%]">
          {limitedBlogPosts.map((post, index: number) => (
            <button
              key={post.url}
              aria-label={`View next blog post: ${post.title}`}
              data-index={index}
              type="button"
              className="h-2 w-1/6 overflow-hidden rounded-full bg-black/20 backdrop-blur-[0.5rem] transition-all hover:h-4"
              onClick={onClickBlogLine}
            >
              <div
                className="duration-50 h-full bg-[#E3E7E9] transition-all ease-linear "
                style={{
                  width:
                    index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
