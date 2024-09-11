import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import gtcBackground from './images/gtc-background.svg';
import getStartedHeroImage from './images/gs_hero_img.png';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

const heroContainerClasses = `
  w-full
  flex flex-col sm:flex-row justify-center
  mt-[-96px]
  font-display text-white
  bg-[#283145]
  relative
`;

const textContainerClasses = `
  max-w-full lg:max-w-[450px]
  mt-20
  py-12 sm:py-16 lg:py-40
  relative z-20
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
            <Title className="drop mb-6 drop-shadow-md" level={TitleLevel.Display1}>
              Resources for Builders
            </Title>
            <span className="text-lg sm:text-xl lg:text-2xl">
              Get help to build and grow your project on Base with our Builder Resource Kit
            </span>
          </div>
          <div className="absolute bottom-0 right-0 top-40 z-10">
            <Image
              src={getStartedHeroImage as StaticImport}
              alt="onchain summer"
              quality={100}
              className="max-h-full w-auto"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
