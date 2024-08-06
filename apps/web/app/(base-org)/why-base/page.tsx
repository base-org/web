import AnalyticsProvider from 'apps/web/contexts/Analytics';

import { Divider } from 'apps/web/src/components/Divider/Divider';
import Hero from 'apps/web/src/components/WhyBase/Hero';
import ActiveCommunityOfBuilders from 'apps/web/src/components/WhyBase/ActiveCommunityOfBuilders';
import PerformanceAndCost from 'apps/web/src/components/WhyBase/PerformanceAndCost';
import EvmEquivalent from 'apps/web/src/components/WhyBase/EvmEquivalent';
import WorldclassResources from 'apps/web/src/components/WhyBase/WorldclassResources';
import EmpoweredByCoinbase from 'apps/web/src/components/WhyBase/EmpoweredByCoinbase';
import BuildWithUs from 'apps/web/src/components/WhyBase/BuildWithUs';

export default async function WhyBase() {
  return (
    <AnalyticsProvider context='why_base'>
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
