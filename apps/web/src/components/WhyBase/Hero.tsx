import TableOfContents, { Section } from 'apps/web/src/components/TableOfContents/TableOfContents';

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

export default async function Hero() {
  return (
    <div className="mx-12 mt-12 flex min-h-[504px] flex-col justify-start sm:mx-16 sm:mt-16 lg:mx-24 lg:mt-[96px]">
      <div className="my-8 grid grid-cols-1 gap-8 sm:my-12 lg:my-20 lg:grid-cols-[1fr_1fr] lg:gap-0">
        <div className="max-w-full lg:max-w-[500px]">
          <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl lg:mb-10 lg:text-6xl lg:leading-none">
            5 reasons to choose Base
          </h1>
          <span className="text-lg sm:text-xl lg:text-2xl">
            Five reasons why choosing Base will help you unleash onchain innovation and supercharge
            your project
          </span>
        </div>
        <TableOfContents sections={headerReasons} />
      </div>
    </div>
  );
}
