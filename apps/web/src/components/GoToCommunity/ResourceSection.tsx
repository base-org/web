import { ResourceSectionType } from 'apps/web/src/components/GoToCommunity/resourceSections';

type ResourceSectionProps = {
  section: ResourceSectionType;
};

export default async function ResourceSection({ section }: ResourceSectionProps) {
  return (
    <div className="bg-black p-12 sm:p-16 lg:p-24">
      <div>
        <h1 className="mb-4 text-4xl leading-tight sm:text-5xl lg:mb-6 lg:text-6xl lg:leading-none">
          {section.title}
        </h1>
        <span className="text-lg sm:text-xl lg:text-2xl">{section.description}</span>
      </div>
      <div className="">
        {section.cards.map((card) => (
          <div className="w-300 h-175 bg-ocsyellow">{card.title}</div>
        ))}
      </div>
    </div>
  );
}
