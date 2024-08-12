import React from 'react';
import { gridClasses } from '../../../../app/(base-org)/go-to-community/page';
import { Icon } from '../../Icon/Icon';
import { ResourceSectionProps } from '../resourceTypes';
import ResourceCard from './ResourceCard';

export default async function ResourceGrid({ section }: ResourceSectionProps) {
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
