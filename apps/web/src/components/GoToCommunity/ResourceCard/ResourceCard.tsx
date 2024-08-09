import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Icon } from '../../Icon/Icon';

export type Resource = {
  href: string;
  title: string;
  description: string;
};

export type ResourceCardProps = Resource & {
  counter: number;
};

export default function ResourceCard({
  href,
  title,
  description,
  topLeft = <span></span>,
  topRight = <span></span>,
  colorOne,
  colorTwo,
}) {

  const resourceCardWrapperStyle = classNames(
    'group border-2 p-7 text-white',
    `odd:bg-${colorOne} odd:border-${colorOne}`,
    `even:bg-${colorTwo} even:border-${colorTwo}`,
    // `[&:nth-child(4n-2)]:bg-${colorTwo} [&:nth-child(4n-2)]:border-${colorTwo}`,
    // `[&:nth-child(3n)]:bg-${colorTwo} [&:nth-child(3n)]:border-${colorTwo}`,
    // `md:[&:nth-child(odd)]:bg-${colorOne} md:[&:nth-child(odd)]:border-${colorOne}`,
    // `md:[&:nth-child(even)]:bg-${colorTwo} md:[&:nth-child(even)]:border-${colorTwo}`,
    'duration-200',
    'hover:scale-105 hover:shadow-lg hover:shadow-gray-80',
  );

  return (
    <div key={href} className={resourceCardWrapperStyle}>
      <Link href={href}>
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
