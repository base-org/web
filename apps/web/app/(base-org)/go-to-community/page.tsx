import React from 'react';
import Hero from '../../../src/components/GoToCommunity/Hero';
import BuildersMostWanted from '../../../src/components/GoToCommunity/BuildersMostWanted';
import ResourceSection from '../../../src/components/GoToCommunity/ResourceSection';
import { resourceSections } from '../../../src/components/GoToCommunity/resourceSections';

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
