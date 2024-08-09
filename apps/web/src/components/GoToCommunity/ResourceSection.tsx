import React from 'react';
import { Icon } from '../Icon/Icon';
import ResourceCard, { Resource } from './ResourceCard/ResourceCard';

export type ResourceSectionType = {
  title: string;
  colorOne: string;
  colorTwo: string;
  cards: Resource[];
};

type ResourceSectionProps = {
  section: ResourceSectionType;
};

export default async function ResourceSection({ section }: ResourceSectionProps) {
  return (
    <div className="mx-12 mb-12 bg-black sm:mx-16 sm:mb-16 lg:mx-24 lg:mb-20">
      <div>
        <h1 className="mb-4 text-4xl leading-tight sm:text-5xl lg:mb-6 lg:text-6xl lg:leading-none">
          {section.title}
        </h1>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-2 gap-y-8 sm:mt-12 sm:gap-4 sm:gap-y-12 md:grid-cols-3 lg:mt-16 lg:gap-6">
        {section.cards.map((card, index) => (
          <ResourceCard
            key={card.href}
            title={card.title}
            description={card.description}
            href={card.href}
            topLeft={<span className="font-mono">{String(index + 1).padStart(2, '0')}</span>}
            topRight={<Icon name="diagonalUpArrow" width='16px' height='16px' />}
            colorOne={section.colorOne}
            colorTwo={section.colorTwo}
          />
        ))}
      </div>
    </div>
  );
}
