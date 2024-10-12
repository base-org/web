import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import Hero from 'apps/web/src/components/WhyBase/Hero';
import ActiveCommunityOfBuilders from 'apps/web/src/components/WhyBase/ActiveCommunityOfBuilders';
import PerformanceAndCost from 'apps/web/src/components/WhyBase/PerformanceAndCost';
import EvmEquivalent from 'apps/web/src/components/WhyBase/EvmEquivalent';
import WorldclassResources from 'apps/web/src/components/WhyBase/WorldclassResources';
import EmpoweredByCoinbase from 'apps/web/src/components/WhyBase/EmpoweredByCoinbase';
import BuildWithUs from 'apps/web/src/components/WhyBase/BuildWithUs';

export const whyBaseSharedClassNames = {
  section:
    'mb-6 mt-10 flex w-full max-w-[1440px] flex-col px-12 sm:mb-8 sm:mt-8 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24',
  sectionGrid: 'gap-8 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-16',
  sectionNumberIcon:
    'mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white sm:h-7 sm:w-7 lg:mr-4 lg:mt-2 lg:h-8 lg:w-8',
  title: 'text-3xl sm:text-4xl lg:text-6xl',
  bodyText: 'my-2 text-base sm:text-lg lg:my-4 xl:my-6',
  ctaButton: 'uppercase font-mono font-medium mt-4 rounded-[3px]',
};

export default async function WhyBase() {
  return (
    <AnalyticsProvider context="why_base">
      <Hero />
      <main className="flex w-full flex-col items-center bg-black font-display text-white">
        <ActiveCommunityOfBuilders />
        <Divider />
        <PerformanceAndCost />
        <Divider />
        <EvmEquivalent />
        <Divider />
        <WorldclassResources />
        <Divider />
        <EmpoweredByCoinbase />
        <Divider />
        <BuildWithUs />
      </main>
    </AnalyticsProvider>
  );
}
