'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { HeaderAnimation } from 'apps/web/src/components/Builders/MiniKit/HeaderAnimation';
import minikit from 'apps/web/src/components/Builders/MiniKit/minikit.svg';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image, { StaticImageData } from 'next/image';
import Button from 'apps/web/src/components/base-org/Button';
import { useCallback } from 'react';
const GET_STARTED_URL = 'https://replit.com/@tina-he/ock-frames-template?v=1#README.md';

export function Hero() {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create-onchain --mini');
  }, []);

  return (
    <div className="flex items-center justify-between gap-10 pt-20 max-sm:flex-col">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="flex items-center gap-2 pb-6 text-[#D058C1]">
          <Image
            src={minikit as StaticImageData}
            alt="minikit"
            width={32}
            height={32}
            className="h-5 w-5"
          />
          <Title level={TitleLevel.Title3} className="font-bold">
            MiniKit
          </Title>
        </div>
        <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
          All-you-need to build and grow your mini apps
        </Title>
        <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
          All-you-need to build and grow your mini apps
        </Title>
        <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted">
          MiniKit makes it simple to build and supercharge distribution across decentralized
          platforms.
        </Title>

        <div className="flex gap-4 pt-5 max-sm:max-w-[240px] max-sm:flex-col">
          <Button
            variant={ButtonVariants.Secondary}
            iconName="copy"
            onClick={handleCopy}
            className="flex items-center justify-between px-4 py-3 font-medium"
            iconSize="16"
          >
            npm create-onchain --mini
          </Button>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 py-3 group font-medium"
            href={GET_STARTED_URL}
            eventName="minikit-get-started"
            target="_blank"
          >
            <div className="flex items-center gap-4">
              <span>Get started</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>

      <HeaderAnimation />
    </div>
  );
}
