import React, { useCallback } from 'react';
import Link from 'next/link';

import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';

import { Button } from '../Button/Button';

export default function ActiveCommunityOfBuilders() {
  const handleClick = useCallback(() => {
    logEvent(
      'join_discord',
      {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'why_base',
      },
      AnalyticsEventImportance.high,
    );
  }, []);
  return (
    <div className="flex flex-col bg-black px-20 pb-10 pt-20">
      <div className="flex flex-row justify-between">
        <div className="h-[320px] min-w-[550px] bg-ocsyellow">Placeholder</div>
        <div className="mx-20 flex grow flex-col gap-4">
          <h2 className="flex font-display text-5xl">
            <span>1.</span>
            <span className="ml-4">Join an active community of Onchain Builders</span>
          </h2>
          <span className="text-white">
            Join a community of over X00+ builders just like you, building some of the coolest
            projects onchain. Need help?
          </span>
          <span className="text-white">Reach out to our Discord support team!</span>
          <Link
            href="https://discord.com/invite/buildonbase"
            target="_blank"
            rel="noreferrer noopener"
            onClick={handleClick}
          >
            <Button className="mt-8 uppercase">Join the Discord</Button>
          </Link>
        </div>
      </div>
      <div className="mt-16 flex flex-row justify-between">
        <div className="h-[320px] w-[400px] bg-ocsyellow">Placeholder</div>
        <div className="h-[320px] w-[400px] bg-ocsyellow">Placeholder</div>
        <div className="h-[320px] w-[400px] bg-ocsyellow">Placeholder</div>
      </div>
    </div>
  );
}
