'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from '../../../../contexts/Analytics';
import { Icon } from '../../Icon/Icon';

export type Resource = {
  href: string;
  title: string;
  description: string;
};

export type ResourceCardProps = Resource & {
  counter?: number;
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  colorOne: string;
  colorTwo?: string;
};

export default function ResourceCard({
  href,
  title,
  description,
  topLeft = <span></span>,
  topRight = <span></span>,
  colorOne,
  colorTwo,
}: ResourceCardProps) {
  const { logEventWithContext } = useAnalytics();

  const resourceCardWrapperStyle = classNames(
    'group border-2 p-7 text-white',
    `odd:bg-${colorOne} odd:border-${colorOne}`,
    `even:bg-${colorTwo ?? colorOne} even:border-${colorTwo ?? colorOne}`,
    'duration-200',
    'hover:scale-105 hover:shadow-lg hover:shadow-gray-80',
  );

  const handleClick = useCallback(() => {
    logEventWithContext(title.replace(/ /g, '_').replace(/\W/g, ''), ActionType.click, {
      componentType: ComponentType.link,
    });
  }, [logEventWithContext, title]);

  return (
    <div key={href} className={resourceCardWrapperStyle}>
      <Link href={href} onClick={handleClick}>
        <div className="flex w-full flex-row justify-between">
          <div>{topLeft}</div>
          <div>{topRight}</div>
        </div>
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-lg uppercase sm:text-xl">{title}</h3>
          <p className="font-sans text-sm sm:text-base">{description}</p>
        </div>
      </Link>
    </div>
  );
}
