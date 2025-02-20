'use client';

import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { StaticImageData } from 'next/image';
import onchainkit from 'apps/web/src/components/Builders/Onchainkit/onchainkit.svg';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';

const ONCHAINKIT_DOCS_LINK = 'docs.base.org/builderkits/onchainkit/getting-started';

export function Hero() {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
  }, []);

  return (
    <div className="flex flex-col gap-2 pt-20 sm:items-center">
      <div className="flex items-center gap-2 pb-6 text-[#C9A4FA]">
        <Image
          src={onchainkit as StaticImageData}
          alt="onchainkit"
          width={32}
          height={32}
          className="h-5 w-5"
        />
        <Title level={TitleLevel.Title3} className="font-bold">
          OnchainKit
        </Title>
      </div>
      <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
        Build onchain apps in minutes
      </Title>
      <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
        Build onchain apps in minutes
      </Title>
      <Title level={TitleLevel.Title3} className="text-gray-muted">
        Ready-to-use, full-stack components to make building onchain faster and easier.
      </Title>

      <div className="flex gap-4 pt-5 max-sm:max-w-[240px] max-sm:flex-col">
        <Button
          variant={ButtonVariants.Secondary}
          iconName="copy"
          onClick={handleCopy}
          className="flex items-center justify-between px-4 py-3"
          iconSize="16"
        >
          npm create onchain
        </Button>
        <ButtonWithLinkAndEventLogging
          variant={ButtonVariants.SecondaryOutline}
          buttonClassNames="flex items-center justify-between px-4 py-3 group"
          href={ONCHAINKIT_DOCS_LINK}
          eventName="onchainkit-documentation-click"
        >
          <div className="flex items-center gap-4">
            <span>Documentation</span>
            <div className="transition-transform duration-200 group-hover:translate-x-1">
              <Icon name="arrowRight" width={16} height={16} color="white" />
            </div>
          </div>
        </ButtonWithLinkAndEventLogging>
      </div>
    </div>
  );
}
