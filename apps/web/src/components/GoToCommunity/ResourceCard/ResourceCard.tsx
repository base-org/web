import Link from 'apps/web/node_modules/next/link';

import { Icon } from 'apps/web/src/components/Icon/Icon';

import { ResourceCardProps } from './resourceCardTypes';

export default async function ResourceCard({
  counter,
  title,
  description,
  href,
}: ResourceCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="w-full sm:w-[calc(50%-12px)] lg:w-[330px]"
    >
      <div className="flex h-[180px] w-full flex-col gap-6 bg-gray-90 p-4 sm:h-[230px] sm:gap-8 sm:p-6 lg:h-[180px]">
        <div className="flex justify-between">
          <span>{String(counter + 1).padStart(2, '0')}</span>
          <Icon name="diagonalUpArrow" />
        </div>
        <div>
          <h3 className="mb-2 font-mono text-lg uppercase sm:text-xl">{title}</h3>
          <span className="font-sans text-sm sm:text-base">{description}</span>
        </div>
      </div>
    </Link>
  );
}
