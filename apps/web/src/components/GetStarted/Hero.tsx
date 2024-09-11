import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import gtcBackground from './images/gtc-background.svg';
import getStartedHeroImage from './images/gs_hero_img.webp';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

const heroContainerClasses = `
  w-full
  flex flex-col sm:flex-row justify-center
  mt-[-96px]
  pt-8 sm:pt-20 lg:pt-40
  font-display text-white
  bg-[#283145]
`;

const textContainerClasses = `
  max-w-full lg:max-w-[450px]
  mr-12 sm:mr-0
  ml-12 sm:ml-16 lg:ml-24 2xl:ml-0
  mt-12 sm:mt-16 lg:mt-24
  mb-6
`;

export default async function Hero() {
  const backgroundStyles = {
    backgroundImage: `url('${gtcBackground.src}')`,
  };

  return (
    <div className={heroContainerClasses} style={backgroundStyles}>
      <Container>
        <div className="flex w-full flex-col justify-between sm:flex-row">
          <div className={textContainerClasses}>
            <Title className="mb-6" level={TitleLevel.Display1}>
              Resources for Builders
            </Title>
            <span className="text-lg sm:text-xl lg:text-2xl">
              Get help to build and grow your project on Base with our Builder Resource Kit
            </span>
          </div>
          <div className="self-end">
            <Image src={getStartedHeroImage as StaticImport} alt="onchain summer" />
          </div>
        </div>
      </Container>
    </div>
  );
}
