import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import { InfoCards } from 'apps/web/src/components/Developers/Verifications/InfoCards';
import { ValueProps } from 'apps/web/src/components/Developers/Verifications/ValueProps';
import verification from 'apps/web/src/components/Developers/Verifications/verification.svg';
import Image from 'next/image';

export default async function Verifications() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black pt-20">
        {/* Header  */}
        <div className="flex flex-col items-center gap-1 pt-20">
          <div className="flex items-center gap-2 pb-6">
            <Image
              src={verification}
              alt="verification"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="text-[#44C28D]">
              Verifications
            </Title>
          </div>
          <Title level={TitleLevel.Display3}>Identify your high-quality users</Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-center text-gray-muted">
            Verifications is the link that lets you verify over 500,000+ connected wallets and
            Coinbase accounts of specific attributes.
          </Title>

          <div className="flex gap-6 pt-6">
            <Button iconName="arrowRight" variant={ButtonVariants.Secondary}>
              Get started
            </Button>
          </div>
        </div>

        <InfoCards />
        <ValueProps />
        <CtaBanner
          title="Know your users"
          description="Start building with Verifications today"
          cta={
            <ButtonWithLinkAndEventLogging
              variant={ButtonVariants.Secondary}
              iconName="arrowRight"
              iconSize="12"
              buttonClassNames="flex w-40 items-center justify-between px-4 py-3"
              href=""
              eventName="bottom-cta"
            >
              Get started
            </ButtonWithLinkAndEventLogging>
          }
        />
      </main>
    </Container>
  );
}
