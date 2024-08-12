import React from 'react';
import classNames from 'classnames';
import AnalyticsProvider from '../../../contexts/Analytics';
import Hero from '../../../src/components/GoToCommunity/Hero';
import BuildersMostWanted from '../../../src/components/GoToCommunity/BuildersMostWanted';
import Funding from '../../../src/components/GoToCommunity/Funding';
import GetNoticed from '../../../src/components/GoToCommunity/GetNoticed';
import StartBuilding from '../../../src/components/GoToCommunity/StartBuilding';

export default async function GoToCommunity() {
  return (
    <AnalyticsProvider context="builder_resource_kit">
      <Hero />
      <main className="flex w-full flex-col bg-black font-display text-white">
        <BuildersMostWanted />
        <Funding />
        <GetNoticed />
        <StartBuilding />
      </main>
    </AnalyticsProvider>
  );
}

export const sectionContainer = classNames(
  'mx-12 sm:mx-16 lg:mx-24',
  'mb-12 sm:mb-16 lg:mb-20',
  'bg-black',
);

export const titleClasses = classNames(
  'mb-4 sm:mb-6 lg:mb-10',
  'text-3xl sm:text-4xl lg:text-6xl',
  'leading-tight lg:leading-none',
);

export const subtitleClasses = classNames(
  'mt-6 sm:mt-10 lg:mt-12',
  'mb-2 sm:mb-4',
  'text-xl sm:text-2xl lg:text-3xl',
  'leading-none sm:leading-relaxed',
);

export const gridClasses = classNames(
  'mt-4',
  'grid grid-cols-1 md:grid-cols-3',
  'gap-2 gap-y-8 sm:gap-4 sm:gap-y-12 lg:gap-6',
);
