import TableOfContents, { Section } from '../TableOfContents/TableOfContents';
import WhyBaseHeroBackground from './images/why-base-hero-bg.png';
import { COMMUNITY_OF_BUILDERS_SECTION_ID } from './ActiveCommunityOfBuilders';
import { PERFORMANCE_AND_COST_SECTION_ID } from './PerformanceAndCost';
import { EVM_COMPATIBILITY_SECTION_ID } from './EvmEquivalent';
import { WORLDCLASS_RESOURCES_SECTION_ID } from './WorldclassResources';
import { EMPOWERED_BY_COINBASE_SECTION_ID } from './EmpoweredByCoinbase';

const headerReasons: Section[] = [
  {
    title: 'Community of Builders',
    id: COMMUNITY_OF_BUILDERS_SECTION_ID,
  },
  {
    title: 'Performance & cost efficiency',
    id: PERFORMANCE_AND_COST_SECTION_ID,
  },
  {
    title: 'EVM compatibility',
    id: EVM_COMPATIBILITY_SECTION_ID,
  },
  {
    title: 'World class tools',
    id: WORLDCLASS_RESOURCES_SECTION_ID,
  },
  {
    title: 'Empowered by Coinbase',
    id: EMPOWERED_BY_COINBASE_SECTION_ID,
  },
];

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
