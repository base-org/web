import React from 'react';
import classNames from 'classnames';
import { Icon } from '../../Icon/Icon';
import { ResourceSectionProps } from '../resourceTypes';
import ResourceCard from './ResourceCard';

export default async function ResourceGrid({ section }: ResourceSectionProps) {
  const gridClasses = classNames(
    'mt-4',
    'grid grid-cols-1 md:grid-cols-3',
    'gap-2 gap-y-8 sm:gap-4 sm:gap-y-12 lg:gap-6',
  );
  return (
    <div className={gridClasses}>
      {section.cards.map((card, index) => (
        <ResourceCard
          key={card.href}
          title={card.title}
          description={card.description}
          href={card.href}
          topLeft={<span className="font-mono">{String(index + 1).padStart(2, '0')}</span>}
          topRight={<Icon name="diagonalUpArrow" width="16px" height="16px" />}
          colorOne={section.colorOne}
          colorTwo={section.colorTwo}
        />
      ))}
    </div>
  );
}
