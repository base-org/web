import type { Metadata } from 'next';
import classNames from 'classnames';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Input from 'apps/web/src/components/Input';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Developers`,
  openGraph: {
    title: `Base | Developers`,
    url: `/developers`,
  },
};

export default async function Developers() {
  return (
    <main className="flex w-full flex-col items-center bg-black">
      <Hero />
    </main>
  );
}

function Hero() {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden bg-black pb-20 pt-20">
      <Container>
        <div className="flex w-full flex-col items-center justify-center py-20">
          <Title level={TitleLevel.Display2}>What do you want to build?</Title>
          <div className="mt-7 flex w-full flex-col items-center">
            <div className="relative w-1/2">
              <Input
                className={classNames(
                  'w-full',
                  'px-6 py-3',
                  'bg-illoblack',
                  'rounded-xl border border-gray-muted',
                )}
                placeholder="Search tools or templates to get started"
              />
              <div className="absolute right-6 top-1/2 flex -translate-y-1/2 gap-1">
                <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                  ⌘
                </div>
                <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                  B
                </div>
              </div>
            </div>
            <div className="mt-4 flex w-1/2 justify-between">
              <Button
                variant={ButtonVariants.Outlined}
                iconName="baseOrgDiagonalUpArrow"
                className="rounded-xl text-sm"
              >
                Launch an AI agent
              </Button>
              <Button
                variant={ButtonVariants.Outlined}
                iconName="baseOrgDiagonalUpArrow"
                className="rounded-xl text-sm"
              >
                Build an onchain store
              </Button>
              <Button
                variant={ButtonVariants.Outlined}
                iconName="baseOrgDiagonalUpArrow"
                className="rounded-xl text-sm"
              >
                Integrate crypto payments
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
