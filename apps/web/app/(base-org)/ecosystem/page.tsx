import EcosystemHeroLogos from 'apps/web/public/images/ecosystem-hero-logos-new.png';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import type { Metadata } from 'next';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import Content from 'apps/web/src/components/Ecosystem/Content';
import Container from 'apps/web/src/components/base-org/Container';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonSizes, ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Ecosystem`,
  openGraph: {
    title: `Base | Ecosystem`,
    url: `/ecosystem`,
  },
};

async function EcosystemHero() {
  return (
    <div className="flex w-full flex-col items-center bg-black pb-[96px]">
      <Container>
        <div className="flex w-full  flex-col items-center justify-center gap-12 pt-28 md:flex-row">
          <div className="flex w-full flex-col gap-8 md:w-1/2">
            <Title level={TitleLevel.Display2}>Base ecosystem</Title>
            <Title level={TitleLevel.Display4}>
              An overview of apps and integrations in the Base ecosystem.
            </Title>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScKCOjB4wFmb7u-1VpgMZOGLYq4GUBGt3AwQKqUAlTgjnucGQ/viewform"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button
                variant={ButtonVariants.Secondary}
                size={ButtonSizes.Large}
                className="md:w-64"
              >
                Apply
              </Button>
            </a>
          </div>
          <div className="flex w-full md:w-1/2 md:justify-end">
            <ImageAdaptive className="-mr-16" src={EcosystemHeroLogos} alt="ecosystem dapp logos" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default async function Ecosystem() {
  return (
    <main className="flex w-full flex-col items-center bg-black">
      <EcosystemHero />
      <Divider />
      <Container>
        <Content />
      </Container>
    </main>
  );
}
