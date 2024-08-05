import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

const stats = [
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

export default async function PerformanceAndCost() {
  return (
    <div
      id="performanceAndCost"
      className="mb-6 mt-10 flex w-full max-w-[1440px] flex-col px-12 sm:mb-8 sm:mt-8 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        <h2 className="flex flex-row font-display text-3xl sm:text-4xl lg:w-1/2 lg:text-5xl">
          <span>2.</span>
          <span className="ml-4">Best-in-class performance & cost efficiency</span>
        </h2>
        <div className="lg:w-1/2">
          <span className="text-base sm:text-lg">
            Base leads the way with the lowest transaction costs, highest throughput, and top TPS
            among Layer 2 solutions.
          </span>
          <div className="mt-4 flex flex-row justify-start gap-4 lg:gap-8">
            <ButtonWithLinkAndEventLogging
              href="https://l2beat.com/scaling/costs"
              eventName="perf_and_cost_l2beat"
              eventContext="why_base"
              target="_blank"
              rel="noreferrer noopener"
              buttonClassNames="uppercase w-full sm:w-auto font-mono font-medium "
            >
              L2Beat
            </ButtonWithLinkAndEventLogging>
            <ButtonWithLinkAndEventLogging
              href="https://l2beat.com/scaling/costs"
              eventName="perf_and_cost_rollupwtf"
              eventContext="why_base"
              target="_blank"
              rel="noreferrer noopener"
              variant="Secondary"
              buttonClassNames="uppercase font-mono font-medium w-full sm:w-auto"
            >
              rollup.wtf
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-center sm:mt-12 sm:divide-y-2 md:flex-row md:divide-x-2 md:divide-y-0 lg:mt-16">
        {stats?.map((stat, index) => (
          <div
            key={stat.description}
            className={`flex w-full flex-col items-center justify-center gap-2 p-4 sm:gap-4 sm:p-6 lg:p-8 ${
              index !== 0 ? 'border-t-2 sm:border-t-0' : ''
            }`}
          >
            <span className="text-5xl text-gray-40 sm:text-6xl lg:text-8xl">
              {stat.value}
              <span className="text-2xl sm:text-3xl lg:text-4xl">{stat.units ?? ''}</span>
            </span>
            <span className="text-center text-sm sm:text-base">
              {stat.description}
              <span className="ml-1 align-super text-xs">{stat.footnote ?? ''}</span>
            </span>
          </div>
        ))}
      </div>
      <span className="mt-6 text-xs text-palette-backgroundAlternate sm:mt-8">
        Figures as of 7/30/2024.
      </span>
      <span className="text-xs text-palette-backgroundAlternate">
        Sources: 1. L2Beat 2. Rollup.wtf
      </span>
    </div>
  );
}
