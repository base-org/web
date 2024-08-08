import React from 'react';
import { Divider } from 'apps/web/src/components/Divider/Divider';

import Hero from 'apps/web/src/components/GoToCommunity/Hero';
import BuildersMostWanted from 'apps/web/src/components/GoToCommunity/BuildersMostWanted';
import ResourceSection from 'apps/web/src/components/GoToCommunity/ResourceSection';

import { resourceSections } from 'apps/web/src/components/GoToCommunity/resourceSections';

export default async function GoToCommunity() {
  return (
    <>
      <Hero />
      <main className="flex w-full flex-col bg-black font-display text-white">
        <BuildersMostWanted />
        {resourceSections.map((section) => (
          <ResourceSection key={section.title} section={section} />
        ))}
      </main>
    </>
  );
}
