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
    <div id="performanceAndCost" className="flex flex-col bg-black px-20 pb-10 pt-10">
      <div className="flex flex-row">
        <h2 className="flex font-display text-5xl">
          <span>2.</span>
          <span className="ml-4">Best-in-class performance & cost efficiency</span>
        </h2>
        <div>
          <span>
            Base leads the way with the lowest transaction costs, highest throughput, and top TPS
            among Layer 2 solutions.
          </span>
          <div className="flex flex-row justify-start gap-8">
            <ButtonWithLinkAndEventLogging
              href="https://l2beat.com/scaling/costs"
              eventName="perf_and_cost_l2beat"
              eventContext="why_base"
              target="_blank"
              rel="noreferrer noopener"
              buttonClassNames="mt-8 uppercase"
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
              buttonClassNames="mt-8 uppercase"
            >
              rollup.wtf
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-row justify-center divide-x-2">
        {stats?.map((stat) => (
          <div
            key={stat.description}
            className="flex w-full flex-col items-center justify-center gap-4 p-8"
          >
            <span className="text-8xl text-gray-40">
              {stat.value}
              <span className="text-4xl">{stat.units ?? ''}</span>
            </span>
            <span>
              {stat.description}
              <span className="ml-1 align-super text-xs">{stat.footnote ?? ''}</span>
            </span>
          </div>
        ))}
      </div>
      <span className="mt-8 text-xs text-palette-backgroundAlternate">
        Figures as of 7/30/2024.
      </span>
      <span className="text-xs text-palette-backgroundAlternate">
        Sources: 1. L2Beat 2. Rollup.wtf
      </span>
    </div>
  );
}
