import TableOfContents, { Section } from 'apps/web/src/components/TableOfContents/TableOfContents';

import WhyBaseHeroBackground from './images/why-base-hero-bg.png';

export default async function Hero() {
  const backgroundStyles = {
    backgroundImage: `url('${WhyBaseHeroBackground.src}')`,
  };
  return (
    <div
      className="mt-[-96px] flex flex-col items-center bg-blue-60 font-display text-white"
      style={backgroundStyles}
    >
      <div className="mt-12 flex min-h-[504px] w-full max-w-[1440px] flex-col justify-start px-12 sm:mt-16 sm:px-16 lg:mt-[96px] lg:px-24">
        <div className="my-8 grid grid-cols-1 gap-8 sm:my-12 lg:my-20 lg:grid-cols-[1fr_1fr] lg:gap-0">
          <div className="max-w-full lg:max-w-[500px]">
            <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl lg:mb-10 lg:text-6xl lg:leading-none">
              5 reasons to choose Base
            </h1>
            <span className="text-lg sm:text-xl lg:text-2xl">
              Five reasons why choosing Base will help you unleash onchain innovation and
              supercharge your project
            </span>
          </div>
          <TableOfContents sections={headerReasons} />
        </div>
      </div>
    </div>
  );
}

const headerReasons: Section[] = [
  {
    title: 'Community of Builders',
    id: 'communityOfBuilders',
  },
  {
    title: 'Performance & cost efficiency',
    id: 'performanceAndCost',
  },
  {
    title: 'EVM compatibility',
    id: 'evmCompatibility',
  },
  {
    title: 'World class tools',
    id: 'worldClassTools',
  },
  {
    title: 'Empowered by Coinbase',
    id: 'empoweredByCoinbase',
  },
];
