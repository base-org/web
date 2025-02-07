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
import Image, { StaticImageData } from 'next/image';

export default async function AgentKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex flex-col items-center gap-1 pt-20">
          <div className="flex items-center gap-2 pb-6">
            <Image
              src={agentkit as StaticImageData}
              alt="agentkit"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="text-[#E66020]">
              AgentKit
            </Title>
          </div>
          <Title level={TitleLevel.Display3}>Your AI agent deserves a crypto wallet</Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-center text-gray-muted">
            A production-ready, framework-agnostic toolkit for giving every AI agent a crypto wallet
            and a set of comprehensive onchain interactions.
          </Title>

          <div className="flex gap-6 pt-6">
            <Button variant={ButtonVariants.Secondary} iconName="copy">
              npx create-agentkit-app
            </Button>
            <ButtonWithLinkAndEventLogging
              href={AGENTKIT_DOCS_LINK}
              iconName="arrowRight"
              target="_blank"
              variant={ButtonVariants.Outlined}
              eventName="agentkit-docs"
            >
              Documentation
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>

        <Demo />
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
              >
                For a template
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href={AGENTKIT_DOCS_LINK}
                iconName="arrowRight"
                target="_blank"
                variant={ButtonVariants.Outlined}
                eventName="agentkit-docs"
              >
                Documentation
              </ButtonWithLinkAndEventLogging>
            </>
          }
        />
      </main>
    </Container>
  );
}
