'use client';

import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { AnimatedList } from 'apps/web/src/components/Developers/Shared/AnimatedList';
import { cn } from 'base-ui/utils/cn';

type Action = {
  title: string;
}

const ACTIONS: Action[] = [
  {
    title: 'Deploy an NFT',
  },
  {
    title: 'Deploy tokens',
  },
  {
    title: 'Transfer assets',
  },
  {
    title: 'Deposit via Morpho',
  },
];

const Action = ({ title }: Action) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-xl bg-dark-palette-backgroundAlternate px-6 py-5',
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{title}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export function OnchainActions({ className }: { className?: string }) {
  return (
    <div className="flex min-h-[500px] w-full flex-col">
      <div className="p-4">
        <Title level={TitleLevel.Title1}>All onchain actions at your agent's fingertips.</Title>
      </div>
      <div
        className={cn('bg-background relative flex w-full flex-col overflow-hidden p-4', className)}
      >
        <AnimatedList className="gap-3">
          {ACTIONS.map((item, idx) => (
            <Action {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
