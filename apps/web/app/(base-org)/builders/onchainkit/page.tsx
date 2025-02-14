'use client';

import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { InfoCards } from 'apps/web/src/components/Builders/Onchainkit/InfoCards';
import { Templates } from 'apps/web/src/components/Builders/Onchainkit/Templates';
import { Testmonials } from 'apps/web/src/components/Builders/Onchainkit/Testimonials';
import Image, { StaticImageData } from 'next/image';
import onchainkit from 'apps/web/src/components/Builders/Onchainkit/onchainkit.svg';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback } from 'react';
import { LiveDemo } from 'apps/web/src/components/Builders/Shared/LiveDemo';
import { BottomCta } from 'apps/web/src/components/Builders/Shared/BottomCta';

const ONCHAINKIT_DOCS_LINK = 'https://onchainkit.xyz/';
const demoComponents = ['Transact', 'Pay', 'Earn', 'Buy', 'Mint', 'Fund', 'Wallet'];

export default function OnchainKit() {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
  }, []);

  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col gap-40 bg-black px-2 pt-20 sm:items-center md:px-0">
        {/* Header  */}
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
            Full-stack onchain components
          </Title>
          <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
            Full-stack onchain components
          </Title>
          <Title level={TitleLevel.Title3} className="text-gray-muted">
            All-you-need to build an onchain app in 10 minutes.
          </Title>

          <div className="flex gap-4 pt-5 max-sm:max-w-[240px] max-sm:flex-col">
            <Button
              variant={ButtonVariants.Secondary}
              iconName="copy"
              onClick={handleCopy}
              className="rounded-xl"
            >
              npm create onchain
            </Button>
            <ButtonWithLinkAndEventLogging
              href={ONCHAINKIT_DOCS_LINK}
              iconName="arrowRight"
              target="_blank"
              variant={ButtonVariants.Outlined}
              eventName="onchainkit-docs"
              buttonClassNames="rounded-xl max-sm:w-full"
            >
              Documentation
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>

        <LiveDemo components={demoComponents} />
        <InfoCards />
        <Templates />
        <Testmonials />
        <BottomCta />
      </main>
    </Container>
  );
}
