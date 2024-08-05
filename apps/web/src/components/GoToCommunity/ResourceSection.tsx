import ResourceCard from 'apps/web/src/components/GoToCommunity/ResourceCard/ResourceCard';
import { Resource } from 'apps/web/src/components/GoToCommunity/ResourceCard/resourceCardTypes';

export default async function ResourceSection({ section }: ResourceSectionProps) {
  return (
    <div className="bg-black p-12 sm:p-16 lg:p-24">
      <div>
        <h1 className="mb-4 text-4xl leading-tight sm:text-5xl lg:mb-6 lg:text-6xl lg:leading-none">
          {section.title}
        </h1>
        <span className="text-lg sm:text-xl lg:text-2xl">{section.description}</span>
      </div>
      <div className="mt-10 flex flex-row flex-wrap justify-center gap-4 sm:mt-12 sm:gap-6 lg:mt-16 lg:gap-8">
        {section.cards.map((card, index) => (
          <ResourceCard
            key={card.title}
            title={card.title}
            description={card.description}
            href={card.href}
            counter={index}
          />
        ))}
      </div>
    </div>
  );
}

export type ResourceSectionType = {
  title: string;
  description: string;
  cards: Resource[];
};

type ResourceSectionProps = {
  section: ResourceSectionType;
};
