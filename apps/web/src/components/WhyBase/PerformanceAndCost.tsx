import React, { useCallback } from 'react';
import Link from 'next/link';

import { Button } from '../Button/Button';
import logEvent, {
  ActionType,
  ComponentType,
  AnalyticsEventImportance,
} from 'base-ui/utils/logEvent';

export default function PerformanceAndCost() {
  const createHandleClick = useCallback((eventName: string) => {
    return () => {
      logEvent(
        eventName,
        {
          action: ActionType.click,
          componentType: ComponentType.button,
          context: 'why_base',
        },
        AnalyticsEventImportance.high,
      );
    };
  }, []);
  return (
    <div className="flex flex-col bg-black px-20 pb-10 pt-10">
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
          <div className='flex flex-row justify-start gap-8'>
            <Link
              href="https://l2beat.com/scaling/costs"
              target="_blank"
              rel="noreferrer noopener"
              onClick={createHandleClick('l2beat')}
            >
              <Button className="mt-8 uppercase">L2Beat</Button>
            </Link>
            <Link
              href="https://rollup.wtf/"
              target="_blank"
              rel="noreferrer noopener"
              onClick={createHandleClick('rollup_wtf')}
            >
              <Button variant='secondary' className="mt-8 uppercase">Rollup.wtf</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-row justify-between">
        <div className="h-[200px] w-[300px] bg-ocsyellow">Placeholder</div>
        <div className="h-[200px] w-[300px] bg-ocsyellow">Placeholder</div>
        <div className="h-[200px] w-[300px] bg-ocsyellow">Placeholder</div>
      </div>
    </div>
  );
}
