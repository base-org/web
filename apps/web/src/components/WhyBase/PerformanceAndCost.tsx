import Image from 'apps/web/node_modules/next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from '../Button/Button';
import section2 from '../TableOfContents/sectionNumbers/section2.svg';

type Stat = {
  value: string;
  description: string;
  footnote?: number;
  units?: string;
};

const stats: Stat[] = [
  {
    value: '$0.002',
    description: 'Lowest cost per txs (among L2s)',
    footnote: 1,
  },
  {
    value: '49.5',
    units: 'TPS',
    description: 'Best txn efficiency (among L2s)',
    footnote: 2,
  },
  {
    value: '9.14',
    units: 'Mgas/Sec',
    description: 'Highest throughput (among L2s)',
    footnote: 2,
  },
];

export const PERFORMANCE_AND_COST_SECTION_ID = 'performanceAndCost';

export default async function PerformanceAndCost() {
  return (
    <div
      id={PERFORMANCE_AND_COST_SECTION_ID}
      className="mb-6 mt-10 flex w-full max-w-[1440px] flex-col px-12 sm:mb-8 sm:mt-8 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        <div className="flex flex-row">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white sm:h-7 sm:w-7 lg:mr-4 lg:mt-2 lg:h-8 lg:w-8">
            <Image src={section2 as StaticImport} alt="section three" />
          </span>
          <div className="ml-4 max-w-[750px] w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl">
              Best-in-class performance & cost efficiency
            </h2>
            <p className="my-2 text-base sm:text-lg lg:my-4 xl:my-6">
              Base leads the way with the lowest transaction costs, highest throughput, and top TPS
              among Layer 2 solutions.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-start gap-4 lg:gap-8">
              <ButtonWithLinkAndEventLogging
                href="https://l2beat.com/scaling/costs"
                eventName="perf_and_cost_l2beat"
                target="_blank"
                rel="noreferrer noopener"
                buttonClassNames="uppercase sm:w-auto font-mono font-medium rounded-[3px]"
              >
                L2Beat
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href="https://rollup.wtf/"
                eventName="perf_and_cost_rollupwtf"
                target="_blank"
                rel="noreferrer noopener"
                variant={ButtonVariants.Secondary}
                buttonClassNames="uppercase sm:w-auto font-mono font-medium rounded-[3px]"
              >
                rollup.wtf
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-center sm:mt-12 sm:divide-y-2 md:flex-row md:divide-x-2 md:divide-y-0 lg:mt-16">
        {stats.map((stat, index) => (
          <div
            key={stat.description}
            className={`flex w-full flex-col items-center justify-center gap-2 p-4 sm:gap-4 sm:p-6 lg:p-8 ${
              index !== 0 ? 'border-t-2 sm:border-t-0' : ''
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="text-5xl text-gray-40 sm:text-6xl lg:text-8xl">
                {stat.value}
                <span className="ml-1 text-2xl sm:text-3xl lg:ml-2 lg:text-4xl">
                  {stat.units ?? ''}
                </span>
              </span>
              <p className="mt-1 text-sm sm:text-base lg:mt-2">
                {stat.description}
                <span className="ml-1 align-super text-xs">{stat.footnote ?? ''}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <span className="mt-6 text-xs text-palette-backgroundAlternate sm:mt-8">
        Figures as of 7/30/2024. Sources: 1. L2Beat 2. Rollup.wtf
      </span>
    </div>
  );
}
