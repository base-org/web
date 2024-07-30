'use client';

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
      <div className="h-[520px] min-w-[550px] bg-[url('../public/images/EVM-compatibility-chains.png')] bg-no-repeat" />
      <div className="flex flex-col justify-center gap-16 max-w-[550px]">
        <h2 className="flex font-display text-5xl">
          <span>3.</span>
          <span className="ml-4">EVM Compatible for effortless migration</span>
        </h2>
        <div>
          <span>
            Move your project to Base in minutes from any other EVM-compatible chain and unlock the
            full potential of the Superchain and OP stack
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
