import React, { useCallback } from 'react';
import Link from 'next/link';

import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';

import { Button } from '../Button/Button';

export default function EvmEquivalent() {
  const handleClick = useCallback(() => {
    logEvent(
      'evm_compatible_migration',
      {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'why_base',
      },
      AnalyticsEventImportance.high,
    );
  }, []);

  return (
    <div className="flex flex-row gap-32 bg-black px-20 pb-10 pt-10">
      <div className="h-[320px] min-w-[550px] bg-ocsyellow">Placeholder</div>
      <div className="flex flex-col justify-around">
        <h2 className="flex font-display text-5xl">
          <span>3.</span>
          <span className="ml-4">EVM Compatible for effortless migration</span>
        </h2>
        <div>
          <span>
            Base leads the way with the lowest transaction costs, highest throughput, and top TPS
            among Layer 2 solutions.
          </span>
          <Link
            href="https://docs.base.org/docs"
            target="_blank"
            rel="noreferrer noopener"
            onClick={handleClick}
          >
            <Button className="mt-4 uppercase">Start Migrating</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
