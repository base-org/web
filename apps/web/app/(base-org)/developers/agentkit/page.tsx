'use client';

import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import agentkit from 'apps/web/src/components/Developers/AgentKit/agentkit.svg';
import { Demo } from 'apps/web/src/components/Developers/AgentKit/Demo';
import { Frameworks } from 'apps/web/src/components/Developers/AgentKit/Frameworks';
import { InfoCards } from 'apps/web/src/components/Developers/AgentKit/InfoCards';
import {
  AGENTKIT_DOCS_LINK,
  FORK_TEMPLATE_LINK,
} from 'apps/web/src/components/Developers/AgentKit/links';
import { OnchainActions } from 'apps/web/src/components/Developers/AgentKit/OnchainActions';
import { Possibilities } from 'apps/web/src/components/Developers/AgentKit/Possibilities';
import { Testmonials } from 'apps/web/src/components/Developers/AgentKit/Testimonials';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image, { StaticImageData } from 'next/image';
import { useCallback } from 'react';

export default function AgentKit() {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npx create-agentkit-app');
  }, []);

  return (
    <Container>
      <main className="mb-24 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex flex-col gap-2 pt-20 sm:items-center">
          <div className="flex items-center gap-2 pb-6 text-[#E66020]">
            <Image
              src={agentkit as StaticImageData}
              alt="agentkit"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="font-bold">
              AgentKit
            </Title>
          </div>
          <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
            Your AI agent deserves a crypto wallet
          </Title>
          <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
            Your AI agent deserves a crypto wallet
          </Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted sm:text-center">
            A production-ready, framework-agnostic toolkit for giving every AI agent a crypto wallet
            and a set of comprehensive onchain interactions.
          </Title>

          <div className="flex gap-4 bg-black pb-24  pt-5 max-sm:max-w-[240px] max-sm:flex-col">
            <Button
              variant={ButtonVariants.Secondary}
              iconName="copy"
              onClick={handleCopy}
              className="flex items-center justify-between px-4 py-3"
            >
              npx create-agentkit-app
            </Button>
            <ButtonWithLinkAndEventLogging
              href={AGENTKIT_DOCS_LINK}
              target="_blank"
              variant={ButtonVariants.SecondaryOutline}
              buttonClassNames="flex items-center justify-between px-4 py-3 group"
              eventName="agentkit-docs"
            >
              <div className="flex items-center gap-4">
                <span>Documentation</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" width={16} height={16} color="white" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>
          </div>
          <Demo />
        </div>

        <InfoCards />
        <OnchainActions />
        <Frameworks />
        <Testmonials />
        <Possibilities />
        <CtaBanner
          title="Ready to launch an AI Agent?"
          description="Start building with a starter template or see documentation."
          cta={
            <>
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                iconName="fork"
                href={FORK_TEMPLATE_LINK}
                target="_blank"
                eventName="agentkit-fork-template"
                buttonClassNames="flex items-center justify-between px-4 py-3"
              >
                Fork a template
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href={AGENTKIT_DOCS_LINK}
                target="_blank"
                variant={ButtonVariants.SecondaryOutline}
                eventName="agentkit-docs"
                buttonClassNames="flex items-center justify-between px-4 py-3 group"
              >
                <div className="flex items-center gap-4">
                  <span>Documentation</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="white" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
            </>
          }
        />
      </main>
    </Container>
  );
}
