import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { HeaderAnimation } from 'apps/web/src/components/Builders/MiniKit/HeaderAnimation';
import { InfoCards } from 'apps/web/src/components/Builders/MiniKit/InfoCards';
import minikit from 'apps/web/src/components/Builders/MiniKit/minikit.svg';
import { SupportedPlatforms } from 'apps/web/src/components/Builders/MiniKit/SupportedPlatforms';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image, { StaticImageData } from 'next/image';

const GET_STARTED_URL = 'https://replit.com/@tina-he/ock-frames-template?v=1#README.md';

export default async function AgentKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
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
              All-you-need to build and grow your mini app.
            </Title>
            <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
              All-you-need to build and grow your mini app.
            </Title>
            <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted">
              Feature your mini app on Warpcast and Coinbase Wallet with a few lines of code.
            </Title>
            <div className="flex gap-6 pt-5">
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                buttonClassNames="flex items-center justify-between px-4 py-3 group"
                href={GET_STARTED_URL}
                target="_blank"
                eventName="minikit-get-started"
              >
                <div className="flex items-center gap-4">
                  <span>Get started</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="black" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>

          <HeaderAnimation />
        </div>

        <InfoCards />
        <SupportedPlatforms />
        <CtaBanner
          title="Grow your app today."
          description="Start building with a starter template or see documentation."
          cta={
            <ButtonWithLinkAndEventLogging
              variant={ButtonVariants.Secondary}
              buttonClassNames="flex items-center justify-between px-4 py-3 group"
              href={GET_STARTED_URL}
              target="_blank"
              eventName="minikit-get-started"
            >
              <div className="flex items-center gap-4">
                <span>Get started</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" width={16} height={16} color="black" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>
          }
        />
      </main>
    </Container>
  );
}
