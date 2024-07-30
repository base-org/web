import React from 'react';

import { Divider } from '../src/components/Divider/Divider';
import Hero from '../src/components/WhyBase/Hero';
import ActiveCommunityOfBuilders from '../src/components/WhyBase/ActiveCommunityOfBuilders';
import PerformanceAndCost from '../src/components/WhyBase/PerformanceAndCost';
import EvmEquivalent from '../src/components/WhyBase/EvmEquivalent';
import WorldclassResources from '../src/components/WhyBase/WorldclassResources';
import EmpoweredByCoinbase from '../src/components/WhyBase/EmpoweredByCoinbase';

export default function WhyBase() {
  return (
    <div className="mt-[-96px] bg-blue-60 text-white">
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
    </div>
  );
}
