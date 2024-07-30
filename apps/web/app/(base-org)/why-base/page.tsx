import React from 'react';

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
    <div className="mt-[-96px] bg-blue-60 text-white font-display">
      <Hero />
      <ActiveCommunityOfBuilders />
      <Divider />
      <PerformanceAndCost />
      <Divider />
      <EvmEquivalent />
      <Divider />
      <WorldclassResources />
      <Divider />
      <EmpoweredByCoinbase />
      <BuildWithUs />
    </div>
  );
}
