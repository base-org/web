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
import { Possibilities } from 'apps/web/src/components/Developers/AgentKit/Possibilities';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import Image from 'next/image';

export default async function AgentKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex flex-col items-center gap-1 pt-20">
          <div className="flex items-center gap-2 pb-6">
            <Image src={agentkit} alt="agentkit" width={32} height={32} className="h-5 w-5" />
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
            <Button variant={ButtonVariants.SecondaryOutline} iconName="arrowRight">
              Documentation
            </Button>
          </div>
        </div>

        <Demo />
        <InfoCards />
        <Frameworks />
        <Possibilities />
        <CtaBanner
          title="Ready to launch an AI Agent?"
          description="Start building with a starter template or see documentation."
          cta={
            <>
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                iconName="fork"
                buttonClassNames="flex w-40 items-center justify-between px-4 py-3"
                href="https://login.coinbase.com/signin"
                target="_blank"
                eventName="verifications-get-started"
              >
                For a template
              </ButtonWithLinkAndEventLogging>
              <Button iconName="arrowRight" variant={ButtonVariants.Outlined}>
                Documentation
              </Button>
            </>
          }
        />
      </main>
    </Container>
  );
}
