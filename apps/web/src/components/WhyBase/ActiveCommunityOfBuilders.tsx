'use client';

import { useCallback } from 'react';
import Link from 'apps/web/node_modules/next/link';

import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'libs/base-ui/utils/logEvent';

import { Button } from '../Button/Button';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { AnalyticsEventData } from 'libs/base-ui/utils/logEvent';

const communityCards = [
  {
    title: 'Aerodrome',
    href: 'aerodrome.finance',
    description: 'A next-generation DeFi protocol and AMM with friendly user experience',
    tag: 'defi',
  },
  {
    title: 'Doodles',
    href: 'doodles.app',
    description: 'Immersive storytelling through the creation of live and digital experiences',
    tag: 'nft',
  },
  {
    title: 'Morpho',
    href: 'morpho.org',
    description: 'A permissionless and non-custodial lending protocol',
    tag: 'defi',
  },
];

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
    <div id="communityOfBuilders" className="flex flex-col bg-black px-20 pb-10 pt-20">
      <div className="flex flex-row justify-between">
        <div className="h-[320px] min-w-[550px] bg-[url('../public/images/CommunityOfBuilders.png')]" />
        <div className="mx-20 flex grow flex-col justify-around">
          <h2 className="flex font-display text-5xl">
            <span>1.</span>
            <span className="ml-4">Join an active community of Onchain Builders</span>
          </h2>
          <span className="text-white">
            Join a community of thousands builders just like you, building some of the coolest
            projects onchain. Reach out to our Discord support team for help.
          </span>
          <div>
            <ButtonWithLinkAndEventLogging
              href="https://discord.com/invite/buildonbase"
              event={event}
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames='inline-block'
              buttonClassNames="uppercase"
            >
              Join the Discord
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <span>Community Spotlight</span>
        <div className="mt-4 flex flex-row justify-between gap-4">
          {communityCards?.map((card) => (
            <div key={card.href} className="grid h-[330px] w-[400px] grid-rows-[1fr_1fr]">
              <Link
                href={`https://${card.href}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-row justify-end bg-ocsyellow pr-10 pt-8"
              >
                <span className="flex h-6 items-center justify-center rounded-xl bg-black px-2 py-1 text-sm uppercase">
                  {card.tag}
                </span>
              </Link>
              <div className="bg-gray-90 p-6">
                <div className="mb-4 flex flex-col">
                  <span className="uppercase">{card.title}</span>
                  <span className="text-sm lowercase text-dark-palette-foregroundMuted">
                    {card.href}
                  </span>
                </div>
                <span>{card.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const event: AnalyticsEventData = {
  name: 'join_discord',
  event: {
    action: ActionType.click,
    componentType: ComponentType.button,
    context: 'why_base'
  },
  importance: AnalyticsEventImportance.high,
}
