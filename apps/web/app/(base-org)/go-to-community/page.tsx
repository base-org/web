import { Divider } from 'apps/web/src/components/Divider/Divider';

import Hero from 'apps/web/src/components/GoToCommunity/Hero';
import BuildersMostWanted from 'apps/web/src/components/GoToCommunity/BuildersMostWanted';
import ResourceSection from 'apps/web/src/components/GoToCommunity/ResourceSection';

import { resourceSections } from 'apps/web/src/components/GoToCommunity/resourceSections';

export default async function GoToCommunity() {
  return (
    <div className="mt-[-96px] bg-blue-60 bg-repeat font-display text-white">
      <Hero />
      <BuildersMostWanted />
      <Divider />
      {resourceSections.map((section) => (
        <ResourceSection key={section.title} section={section} />
      ))}
    </div>
  );
}
