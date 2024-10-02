'use client';
import { useErrors } from 'apps/web/contexts/Errors';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

import Text from 'apps/web/src/components/base-org/typography/Text';
import Card from 'apps/web/src/components/base-org/Card';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Link from 'next/link';
import { useCallback, useState, useRef, useEffect } from 'react';
import cubes from './assets/cubes.webm';

export default function BuildAndRewardSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { logError } = useErrors();

  const [isVisible, setIsVisible] = useState(true);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVisibilityChange = useCallback(() => {
    setIsWindowFocused(!document.hidden);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }, // Adjust this value as needed
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && isWindowFocused) {
      videoRef.current.play().catch((error) => {
        logError(error, 'failed to play video');
      });
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible, isWindowFocused]);

  return (
    <section>
      <div
        ref={containerRef}
        className="mb-12 mt-8 flex w-full flex-col items-center gap-4 md:flex-row"
      >
        <div className="relative flex w-full flex-row gap-4">
          <div className="relative flex w-full flex-row gap-4">
            <Card>
              <video
                src={cubes}
                muted
                playsInline
                className="mx-auto p-2 motion-reduce:hidden"
                autoPlay={false}
                ref={videoRef}
              />
            </Card>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:pl-20">
          <Title level={TitleLevel.Display2} className="text-[#E3E7E9]">
            Build and you will be rewarded
          </Title>
          <Text>
            Base supports passionate builders making apps for everyday life with grants, marketing,
            and as part of the Superchain, Base builders are eligible for consideration in
            Optimism&apos;s retroactive public goods funding.
          </Text>

          <div>
            <Link href="https://retrofunding.optimism.io/" target="_blank">
              <Button
                variant={ButtonVariants.Primary}
                iconName="baseOrgDiagonalUpArrow"
                className="md:ml-auto"
              >
                Get rewarded
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
